"use client";

import { useState } from "react";
import { useLang } from "@/lib/LangProvider";
import { Eyebrow } from "./ui/Eyebrow";
import { Button } from "./ui/Button";
import { SectionDivider } from "./ui/SectionDivider";

export function Kontakt() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);

  return (
    <section id="kontakt" style={{ background: "var(--pale-teal)", padding: "var(--space-section) 24px" }}>
      <SectionDivider accent="var(--teal)" />
      <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: 48 }}>
        <div data-reveal="card">
          <Eyebrow>{t.kontaktEyebrow}</Eyebrow>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 500, color: "var(--ink)", fontSize: "clamp(2rem, 3.5vw, 3.25rem)", letterSpacing: "var(--ls-display)", lineHeight: 1.05, margin: "6px 0 0" }}>
            {t.kontaktH}
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-md)", color: "var(--ink-soft)", lineHeight: 1.6, margin: "16px 0 24px" }}>{t.kontaktP}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
            <a href="https://wa.me/385955612182" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
              <Button accent="var(--sage)">WhatsApp · +385 95 561 2182</Button>
            </a>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--ink-soft)" }}>Instagram @arikostudio · hello@arikostudio.hr</div>
          </div>
        </div>
        <form
          data-reveal="card"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          style={{ background: "var(--cream)", borderRadius: "var(--radius-lg)", padding: 28, boxShadow: "var(--shadow-soft)", display: "flex", flexDirection: "column", gap: 14 }}
        >
          <label className="field">
            <span className="field__label">{t.formName}</span>
            <input type="text" name="name" placeholder={t.formNamePh} required />
          </label>
          <label className="field">
            <span className="field__label">Email</span>
            <input type="email" name="email" placeholder="ime@email.com" required />
          </label>
          <label className="field">
            <span className="field__label">{t.formMsg}</span>
            <textarea name="message" rows={3} placeholder={t.formMsgPh} required />
          </label>
          <Button type="submit">{t.send}</Button>
          {sent && (
            <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--status-success)", lineHeight: 1.5 }}>{t.sentNote}</div>
          )}
        </form>
      </div>
    </section>
  );
}
