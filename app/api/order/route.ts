import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Receives a configured-bag order and emails it to the studio.
 *
 * Sending uses SMTP credentials from the environment. Configure these in your
 * deployment (see .env.example):
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE
 *   ORDER_TO_EMAIL   (defaults to henryknez4@gmail.com)
 *   ORDER_FROM_EMAIL (defaults to SMTP_USER)
 *
 * When SMTP is not configured the route returns { ok:false, code:"not_configured" }
 * so the browser can fall back to a pre-filled mailto: link — no order is lost.
 */

type OrderPayload = {
  customer?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  };
  order?: {
    bag?: string;
    size?: string;
    colors?: string;
    metal?: string;
    strap?: string;
    insert?: string;
    charms?: string;
    note?: string;
    total?: number | string;
  };
  message?: string;
  // honeypot — real users never fill this
  company?: string;
};

const clean = (v: unknown, max = 300) =>
  typeof v === "string" ? v.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(req: Request) {
  let data: OrderPayload;
  try {
    data = (await req.json()) as OrderPayload;
  } catch {
    return Response.json({ ok: false, code: "bad_request" }, { status: 400 });
  }

  // Silently accept bots that trip the honeypot.
  if (clean(data.company)) return Response.json({ ok: true });

  const c = data.customer || {};
  const o = data.order || {};

  const firstName = clean(c.firstName, 80);
  const lastName = clean(c.lastName, 80);
  const email = clean(c.email, 160);
  const phone = clean(c.phone, 40);
  const address = clean(c.address, 200);
  const city = clean(c.city, 80);
  const postalCode = clean(c.postalCode, 20);
  const country = clean(c.country, 80);

  if (!firstName || !lastName || !email || !phone || !address || !city || !postalCode) {
    return Response.json({ ok: false, code: "missing_fields" }, { status: 422 });
  }
  if (!isEmail(email)) {
    return Response.json({ ok: false, code: "bad_email" }, { status: 422 });
  }

  const to = process.env.ORDER_TO_EMAIL || "henryknez4@gmail.com";
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  const rows = ([
    ["Model", clean(o.bag, 120)],
    ["Veličina / Size", clean(o.size, 60)],
    ["Boje / Colors", clean(o.colors, 160)],
    ["Metal", clean(o.metal, 60)],
    ["Naramenica / Strap", clean(o.strap, 80)],
    ["Umetak / Insert", clean(o.insert, 80)],
    ["Privjesci / Charms", clean(o.charms, 240)],
    ["Napomena / Note", clean(o.note, 240)],
    ["Ukupno / Total", `€${clean(String(o.total ?? ""), 20)}`],
  ] as [string, string][]).filter(([, v]) => v && v !== "€");

  const name = `${firstName} ${lastName}`;
  const shipping = [address, `${postalCode} ${city}`, country].filter(Boolean).join(", ");

  const textLines = [
    `Nova narudžba — ${name}`,
    "",
    "KUPAC / CUSTOMER",
    `Ime i prezime: ${name}`,
    `Email: ${email}`,
    `Telefon: ${phone}`,
    `Adresa dostave: ${shipping}`,
    "",
    "NARUDŽBA / ORDER",
    ...rows.map(([k, v]) => `${k}: ${v}`),
  ];
  if (clean(data.message, 800)) {
    textLines.push("", "PORUKA / MESSAGE", clean(data.message, 800));
  }
  const text = textLines.join("\n");

  const esc = (s: string) => s.replace(/[<>&]/g, (m) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[m]!));
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#33291f;line-height:1.6;max-width:560px">
      <h2 style="margin:0 0 4px">Nova narudžba</h2>
      <p style="margin:0 0 18px;color:#5b4f42">${esc(name)}</p>
      <h3 style="margin:0 0 6px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#8a4a66">Kupac</h3>
      <table style="border-collapse:collapse;margin:0 0 18px;font-size:14px">
        <tr><td style="padding:2px 12px 2px 0;color:#5b4f42">Ime i prezime</td><td>${esc(name)}</td></tr>
        <tr><td style="padding:2px 12px 2px 0;color:#5b4f42">Email</td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
        <tr><td style="padding:2px 12px 2px 0;color:#5b4f42">Telefon</td><td>${esc(phone)}</td></tr>
        <tr><td style="padding:2px 12px 2px 0;color:#5b4f42;vertical-align:top">Adresa dostave</td><td>${esc(shipping)}</td></tr>
      </table>
      <h3 style="margin:0 0 6px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#8a4a66">Narudžba</h3>
      <table style="border-collapse:collapse;font-size:14px">
        ${rows.map(([k, v]) => `<tr><td style="padding:2px 12px 2px 0;color:#5b4f42">${esc(k)}</td><td>${esc(v)}</td></tr>`).join("")}
      </table>
      ${clean(data.message, 800) ? `<h3 style="margin:18px 0 6px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#8a4a66">Poruka</h3><p style="margin:0;font-size:14px">${esc(clean(data.message, 800))}</p>` : ""}
    </div>`;

  if (!host || !user || !pass) {
    return Response.json({ ok: false, code: "not_configured" });
  }

  try {
    const port = Number(process.env.SMTP_PORT || 587);
    const secure = process.env.SMTP_SECURE
      ? process.env.SMTP_SECURE === "true"
      : port === 465;
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });
    await transporter.sendMail({
      from: process.env.ORDER_FROM_EMAIL || user,
      to,
      replyTo: `${name} <${email}>`,
      subject: `Nova narudžba — ${name}${o.bag ? ` · ${clean(o.bag, 60)}` : ""}`,
      text,
      html,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("order email failed", err);
    return Response.json({ ok: false, code: "send_failed" }, { status: 502 });
  }
}
