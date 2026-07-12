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

## Adding photos

Photos are fixed content set in the code — visitors **cannot** upload or change
them on the live site. To add or change a photo:

1. Put the image file in the **`public/images/`** folder (e.g. `public/images/clutch.jpg`).
2. Write its path — always starting with `/images/` — in the right place in the
   data files under `src/lib/`:

   | Photo | Where to set it |
   | --- | --- |
   | Collection bag photos | `src/lib/data.ts` → `bagDefs` → each bag's `photo` |
   | Gallery photos | `src/lib/data.ts` → `galleryImages` → each `src` |
   | Home hero + About photo | `src/lib/data.ts` → `siteImages` |
   | Pattern cover photos | `src/lib/data.ts` → `patternDefs` → each `photo` |

   Example: `photo: "/images/clutch.jpg"`. Leave a value as `null` to keep an
   empty placeholder for now.
3. Commit and redeploy. The photo then shows for everyone, permanently.

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
