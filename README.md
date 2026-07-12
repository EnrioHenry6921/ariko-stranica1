# Ariko Studio

Next.js 14 web store for Ariko Studio — hand-crocheted bags with a live
configurator (model, size, yarn colours, metal, charms) and an order form.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Orders & email

The configurator's **Naruči / Order** button opens a form that collects the
customer's name, email, phone and shipping address, shows the calculated price,
and submits to `POST /api/order`, which emails the order to the studio.

Email sending uses SMTP credentials from the environment. Copy `.env.example`
to `.env.local` and fill in the values:

| Variable | Purpose |
| --- | --- |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_SECURE` | SMTP server + login (for Gmail, use an [App Password](https://myaccount.google.com/apppasswords)) |
| `ORDER_TO_EMAIL` | where orders are delivered (defaults to `henryknez4@gmail.com`) |
| `ORDER_FROM_EMAIL` | from-address on the order email (defaults to `SMTP_USER`) |

If SMTP isn't configured, the form still works: it falls back to opening the
customer's email app with a pre-filled message to `ORDER_EMAIL`
(`src/lib/configuratorData.ts`), plus a WhatsApp option — so no order is lost.
Change the destination address in both `.env.local` and that constant.
