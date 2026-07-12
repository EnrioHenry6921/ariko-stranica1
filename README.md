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
and emails the order to the studio.

Sending goes through [**FormSubmit.co**](https://formsubmit.co) — a free
form-to-email relay — so the site needs **no backend** and can be deployed as a
fully static site. The browser posts straight to
`https://formsubmit.co/ajax/<address>`; no API keys or SMTP credentials.

**One-time activation:** the first order sent triggers a confirmation email from
FormSubmit to the destination address. Click the link in it once and delivery is
switched on for good.

- Destination address: `ORDER_EMAIL` / `FORMSUBMIT_TARGET` in
  `src/lib/configuratorData.ts` (currently `henryknez4@gmail.com`).
- After activating, FormSubmit gives you a random alias string you can paste
  into `FORMSUBMIT_TARGET` instead of the email, to keep the address out of the
  page source.

If the relay is ever unreachable, the form falls back to opening the customer's
email app with a pre-filled message (plus a WhatsApp option) — so no order is
lost.
