"use client";

import { useEffect, useRef, useState } from "react";
import { ORDER_EMAIL } from "@/lib/configuratorData";
import { Button, LinkButton } from "./ui/Button";

export interface OrderDetails {
  bag: string;
  size: string;
  colors: string;
  metal: string;
  strap: string;
  insert: string;
  charms: string;
  note: string;
}

interface OrderModalProps {
  open: boolean;
  onClose: () => void;
  lang: "hr" | "en";
  accent?: string;
  total: number;
  waHref: string;
  order: OrderDetails;
}

const M = {
  hr: {
    title: "Dovrši narudžbu",
    intro: "Ostavi svoje podatke i Ariana ti javlja za potvrdu, plaćanje i dostavu.",
    firstName: "Ime", lastName: "Prezime", email: "Email", phone: "Telefon",
    address: "Adresa (ulica i broj)", city: "Grad", postalCode: "Poštanski broj", country: "Država",
    message: "Poruka (nije obavezno)", messagePh: "Nešto što bismo trebali znati?",
    summary: "Sažetak narudžbe", total: "Ukupno",
    submit: "Pošalji narudžbu", sending: "Šaljem…", cancel: "Odustani",
    required: "Ovo polje je obavezno.", badEmail: "Provjeri email adresu.",
    sentTitle: "Hvala ti!", sentBody: "Narudžba je zaprimljena. Ariana ti se javlja uskoro na email ili telefon.",
    fallbackTitle: "Skoro gotovo!", fallbackBody: "Otvorili smo tvoju e-poštu s pripremljenom narudžbom — samo je pošalji. Ako se nije otvorila, kopiraj podatke ili nas kontaktiraj na WhatsApp.",
    openMail: "Otvori e-poštu", whatsapp: "Pošalji na WhatsApp", close: "Zatvori",
    errTitle: "Nešto je pošlo po zlu", errBody: "Pokušaj ponovno ili nas kontaktiraj na WhatsApp.",
  },
  en: {
    title: "Complete your order",
    intro: "Leave your details and Ariana will reach out to confirm, arrange payment and shipping.",
    firstName: "First name", lastName: "Last name", email: "Email", phone: "Phone",
    address: "Address (street & number)", city: "City", postalCode: "Postal code", country: "Country",
    message: "Message (optional)", messagePh: "Anything we should know?",
    summary: "Order summary", total: "Total",
    submit: "Send order", sending: "Sending…", cancel: "Cancel",
    required: "This field is required.", badEmail: "Check your email address.",
    sentTitle: "Thank you!", sentBody: "Your order was received. Ariana will get back to you shortly by email or phone.",
    fallbackTitle: "Almost there!", fallbackBody: "We opened your email app with the order ready — just hit send. If it didn't open, copy the details or reach us on WhatsApp.",
    openMail: "Open email", whatsapp: "Send on WhatsApp", close: "Close",
    errTitle: "Something went wrong", errBody: "Please try again or reach us on WhatsApp.",
  },
} as const;

type Status = "idle" | "sending" | "sent" | "fallback" | "error";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export function OrderModal({ open, onClose, lang, accent, total, waHref, order }: OrderModalProps) {
  const t = M[lang];
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState(lang === "en" ? "Croatia" : "Hrvatska");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const mailtoRef = useRef<string>("");
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const id = setTimeout(() => firstFieldRef.current?.focus(), 40);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      clearTimeout(id);
    };
  }, [open, onClose]);

  if (!open) return null;

  const summaryRows = (
    [
      [lang === "en" ? "Model" : "Model", order.bag],
      [lang === "en" ? "Size" : "Veličina", order.size],
      [lang === "en" ? "Colors" : "Boje", order.colors],
      ["Metal", order.metal],
      [lang === "en" ? "Strap" : "Naramenica", order.strap],
      [lang === "en" ? "Insert" : "Umetak", order.insert],
      [lang === "en" ? "Charms" : "Privjesci", order.charms],
      [lang === "en" ? "Note" : "Napomena", order.note],
    ] as [string, string][]
  ).filter(([, v]) => v && v !== "—");

  const buildMailto = () => {
    const lines = [
      `${t.firstName}: ${firstName} ${lastName}`,
      `${t.email}: ${email}`,
      `${t.phone}: ${phone}`,
      `${t.address}: ${address}, ${postalCode} ${city}, ${country}`,
      "",
      `${t.summary}:`,
      ...summaryRows.map(([k, v]) => `• ${k}: ${v}`),
      `${t.total}: €${total}`,
    ];
    if (message.trim()) lines.push("", `${t.message}: ${message.trim()}`);
    const subject = `${lang === "en" ? "Order" : "Narudžba"} — ${firstName} ${lastName} · ${order.bag}`;
    return `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!firstName.trim()) e.firstName = t.required;
    if (!lastName.trim()) e.lastName = t.required;
    if (!email.trim()) e.email = t.required;
    else if (!isEmail(email.trim())) e.email = t.badEmail;
    if (!phone.trim()) e.phone = t.required;
    if (!address.trim()) e.address = t.required;
    if (!city.trim()) e.city = t.required;
    if (!postalCode.trim()) e.postalCode = t.required;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    mailtoRef.current = buildMailto();
    setStatus("sending");
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: { firstName, lastName, email, phone, address, city, postalCode, country },
          order: { ...order, total },
          message,
          company,
        }),
      });
      const json = await res.json().catch(() => ({ ok: false }));
      if (json.ok) {
        setStatus("sent");
      } else {
        // No server mailer (or a soft failure) — fall back to the customer's email app.
        setStatus("fallback");
        window.location.href = mailtoRef.current;
      }
    } catch {
      setStatus("fallback");
      window.location.href = mailtoRef.current;
    }
  };

  const done = status === "sent" || status === "fallback";

  return (
    <div className="order-modal" role="dialog" aria-modal="true" aria-label={t.title} onMouseDown={onClose}>
      <div className="order-modal__panel" onMouseDown={(e) => e.stopPropagation()}>
        <button type="button" className="order-modal__close" aria-label={t.close} onClick={onClose}>
          ✕
        </button>

        {!done && (
          <form onSubmit={submit} noValidate>
            <h2 className="order-modal__title">{t.title}</h2>
            <p className="order-modal__intro">{t.intro}</p>

            <div className="order-modal__grid">
              <Field label={t.firstName} value={firstName} onChange={setFirstName} error={errors.firstName} inputRef={firstFieldRef} autoComplete="given-name" />
              <Field label={t.lastName} value={lastName} onChange={setLastName} error={errors.lastName} autoComplete="family-name" />
              <Field label={t.email} value={email} onChange={setEmail} error={errors.email} type="email" autoComplete="email" />
              <Field label={t.phone} value={phone} onChange={setPhone} error={errors.phone} type="tel" autoComplete="tel" />
              <Field label={t.address} value={address} onChange={setAddress} error={errors.address} full autoComplete="street-address" />
              <Field label={t.city} value={city} onChange={setCity} error={errors.city} autoComplete="address-level2" />
              <Field label={t.postalCode} value={postalCode} onChange={setPostalCode} error={errors.postalCode} autoComplete="postal-code" />
              <Field label={t.country} value={country} onChange={setCountry} autoComplete="country-name" />
            </div>

            <label className="field" style={{ marginTop: 14 }}>
              <span className="field__label">{t.message}</span>
              <textarea rows={2} value={message} onChange={(e) => setMessage(e.target.value.slice(0, 500))} placeholder={t.messagePh} />
            </label>

            {/* Honeypot — hidden from users */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
              aria-hidden="true"
            />

            <div className="order-modal__summary">
              <div className="order-modal__summary-head">
                <span>{t.summary}</span>
                <strong>{t.total}: €{total}</strong>
              </div>
              <div className="order-modal__summary-body">
                {summaryRows.map(([k, v]) => (
                  <div key={k} className="order-modal__summary-row">
                    <span>{k}</span>
                    <span>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-modal__actions">
              <Button type="submit" accent={accent} size="lg" disabled={status === "sending"}>
                {status === "sending" ? t.sending : `${t.submit} · €${total}`}
              </Button>
              <button type="button" className="order-modal__cancel" onClick={onClose}>
                {t.cancel}
              </button>
            </div>
          </form>
        )}

        {status === "sent" && (
          <div className="order-modal__result">
            <div className="order-modal__check" aria-hidden="true">✓</div>
            <h2 className="order-modal__title">{t.sentTitle}</h2>
            <p className="order-modal__intro">{t.sentBody}</p>
            <div className="order-modal__actions">
              <Button type="button" accent={accent} size="lg" onClick={onClose}>{t.close}</Button>
            </div>
          </div>
        )}

        {status === "fallback" && (
          <div className="order-modal__result">
            <div className="order-modal__check" aria-hidden="true">✉</div>
            <h2 className="order-modal__title">{t.fallbackTitle}</h2>
            <p className="order-modal__intro">{t.fallbackBody}</p>
            <div className="order-modal__actions">
              <LinkButton href={mailtoRef.current} accent={accent} size="lg">{t.openMail}</LinkButton>
              <LinkButton href={waHref} target="_blank" rel="noreferrer" variant="secondary" size="lg">{t.whatsapp}</LinkButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label, value, onChange, error, type = "text", full, autoComplete, inputRef,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  full?: boolean;
  autoComplete?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
}) {
  return (
    <label className={`field${full ? " order-modal__field--full" : ""}`}>
      <span className="field__label">{label}</span>
      <input
        ref={inputRef}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        style={error ? { borderColor: "#B4453F" } : undefined}
      />
      {error && <span className="order-modal__error">{error}</span>}
    </label>
  );
}
