"use client";

import { useState } from "react";
import { useLang } from "@/lib/LangProvider";
import { patternDetails } from "@/lib/patternData";
import { Eyebrow } from "./ui/Eyebrow";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { GrannyDivider } from "./ui/GrannyDivider";
import { PlaceholderTile } from "./ui/PlaceholderTile";

const T = {
  hr: {
    back: "← Natrag na patterne", instant: "Trenutno preuzimanje",
    coverPh: "Naslovna fotografija patterna", resultPh: "Gotov rad", detailPh: "Detalj",
    metaLevel: "Razina", metaTime: "Vrijeme izrade", metaPages: "Broj stranica", metaMaterials: "Materijali i igla", metaLang: "Jezik uputa", metaLangVal: "Hrvatski", pagesShort: "str.",
    buy: "Kupi i preuzmi",
    protoLabel: "Prototip:", stripeNote: "ovdje se otvara Stripe Checkout. Nakon plaćanja webhook šalje potpisani, vremenski ograničeni link za preuzimanje PDF-a na email — i prikazuje ga na stranici potvrde.",
    afterPay1: "Nakon plaćanja:", afterPay2: "PDF stiže na email i odmah je dostupan za preuzimanje.",
    licenceLabel: "Licenca:", licenceText: "pattern je za osobnu upotrebu. Dijeljenje, preprodaja ili objavljivanje PDF-a nije dozvoljeno. Gotove torbe izrađene po patternu smiješ prodavati uz napomenu autora patterna.",
    morePatterns: "Još patterna",
  },
  en: {
    back: "← Back to patterns", instant: "Instant download",
    coverPh: "Pattern cover photo", resultPh: "Finished piece", detailPh: "Detail",
    metaLevel: "Level", metaTime: "Time to make", metaPages: "Page count", metaMaterials: "Materials & hook", metaLang: "Instruction language", metaLangVal: "Croatian", pagesShort: "p.",
    buy: "Buy & download",
    protoLabel: "Prototype:", stripeNote: "this opens Stripe Checkout. After payment, a webhook emails a signed, time-limited PDF download link — and shows it on the confirmation page.",
    afterPay1: "After payment:", afterPay2: "the PDF arrives by email and is available for download right away.",
    licenceLabel: "Licence:", licenceText: "the pattern is for personal use. Sharing, reselling or publishing the PDF is not allowed. Finished bags made from the pattern may be sold with credit to the pattern author.",
    morePatterns: "More patterns",
  },
} as const;

export function PatternDetail({ slug }: { slug: string }) {
  const { lang } = useLang();
  const t = T[lang];
  const [stripeNote, setStripeNote] = useState(false);

  const p = patternDetails[slug];

  const metaPairs: [string, string][] = [
    [t.metaLevel, lang === "en" ? p.levelEn : p.levelHr],
    [t.metaTime, p.time],
    [t.metaPages, `${p.pages} ${t.pagesShort}`],
    [t.metaMaterials, lang === "en" ? p.materialsEn : p.materialsHr],
    [t.metaLang, t.metaLangVal],
  ];

  const others = Object.entries(patternDetails).filter(([s]) => s !== slug);

  return (
    <main style={{ background: "var(--oat)", minHeight: "100vh" }}>
      <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "24px 24px 80px" }}>
        <a href="/#patterni" style={{ display: "inline-block", color: "var(--ink-soft)", fontSize: 14, fontFamily: "var(--font-body)", padding: "8px 0", textDecoration: "none" }}>
          {t.back}
        </a>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", gap: 48, marginTop: 12 }}>
          {/* Left: photos */}
          <div>
            <div style={{ position: "relative", aspectRatio: "4 / 5", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
              <PlaceholderTile id={`pattern-${slug}-cover`} label={t.coverPh} radius="var(--radius-xl)" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 12 }}>
              <div style={{ position: "relative", aspectRatio: "1" }}>
                <PlaceholderTile id={`pattern-${slug}-r1`} label={t.resultPh} radius="var(--radius-md)" />
              </div>
              <div style={{ position: "relative", aspectRatio: "1" }}>
                <PlaceholderTile id={`pattern-${slug}-r2`} label={t.resultPh} radius="var(--radius-md)" />
              </div>
              <div style={{ position: "relative", aspectRatio: "1" }}>
                <PlaceholderTile id={`pattern-${slug}-d`} label={t.detailPh} radius="var(--radius-md)" />
              </div>
            </div>
          </div>

          {/* Right: details */}
          <div>
            <Eyebrow>Pattern · PDF</Eyebrow>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 500, color: "var(--ink)", fontSize: "clamp(2rem, 3vw, 2.25rem)", letterSpacing: "var(--ls-display)", margin: "6px 0 6px", lineHeight: 1.1 }}>
              {p[lang]}
            </h1>
            <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 15, color: "var(--ink-soft)", marginBottom: 12 }}>
              {lang === "en" ? p.styleEn : p.styleHr}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <Badge tone="accent" accent={p.accent}>€{p.price}</Badge>
              <Badge tone="soft">{t.instant}</Badge>
            </div>

            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-md)", color: "var(--ink-soft)", lineHeight: 1.6, margin: "20px 0 24px" }}>
              {lang === "en" ? p.descEn : p.descHr}
            </p>

            <div style={{ background: "var(--cream)", borderRadius: "var(--radius-lg)", padding: 20, border: "1px solid var(--line)" }}>
              {metaPairs.map(([k, v], i) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "9px 0", borderTop: i ? "1px solid var(--line)" : "none", fontFamily: "var(--font-body)", fontSize: 14 }}>
                  <span style={{ color: "var(--ink-soft)" }}>{k}</span>
                  <span style={{ color: "var(--ink)", fontWeight: 500, textAlign: "right" }}>{v}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 24 }}>
              <Button accent={p.accent} size="lg" onClick={() => setStripeNote(true)}>
                {t.buy} · €{p.price}
              </Button>
            </div>
            {stripeNote && (
              <div style={{ marginTop: 14, padding: "14px 16px", background: "var(--pale-ochre)", borderRadius: "var(--radius-md)", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.6 }}>
                <b style={{ color: "var(--ink)" }}>{t.protoLabel}</b> {t.stripeNote}
              </div>
            )}
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--ink-soft)", margin: "14px 0 0", lineHeight: 1.6 }}>
              {t.afterPay1} <b style={{ color: "var(--ink)" }}>{t.afterPay2}</b>
            </p>

            <div id="licenca" style={{ marginTop: 20, padding: 16, background: "var(--pale-clay)", borderRadius: "var(--radius-md)", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.6 }}>
              <b style={{ color: "var(--ink)" }}>{t.licenceLabel}</b> {t.licenceText}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 48 }}>
          <GrannyDivider />
        </div>

        <div style={{ textAlign: "center" }}>
          <Eyebrow>{t.morePatterns}</Eyebrow>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))", gap: 24, marginTop: 24 }}>
          {others.map(([s, x]) => (
            <a
              key={s}
              href={`/patterni/${s}`}
              className="related-pattern-card"
              style={{
                textDecoration: "none", background: "var(--cream)", borderRadius: "var(--radius-lg)", overflow: "hidden",
                boxShadow: "var(--shadow-soft)", display: "flex", flexDirection: "column",
                transition: "transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
              }}
            >
              <div style={{ height: 6, background: x.accent }} />
              <div className="ariko-stitch" style={{ backgroundColor: x.accent, height: 110 }} />
              <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 500, color: "var(--ink)", lineHeight: 1.2 }}>{x[lang]}</div>
                <div>
                  <Badge tone="accent" accent={x.accent}>€{x.price}</Badge>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
