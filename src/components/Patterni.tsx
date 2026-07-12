"use client";

import { useLang } from "@/lib/LangProvider";
import { patternDefs } from "@/lib/data";
import { Eyebrow } from "./ui/Eyebrow";
import { Badge } from "./ui/Badge";
import { PlaceholderTile } from "./ui/PlaceholderTile";
import { SectionDivider } from "./ui/SectionDivider";

export function Patterni() {
  const { lang, t } = useLang();

  return (
    <section id="patterni" style={{ background: "var(--pale-ochre)", padding: "var(--space-section) 24px" }}>
      <SectionDivider accent="var(--ochre)" />
      <div className="container">
        <div data-reveal style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 36 }}>
          <div>
            <Eyebrow>{t.patterniEyebrow}</Eyebrow>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 500, color: "var(--ink)", fontSize: "clamp(2rem, 3.5vw, 3.25rem)", letterSpacing: "var(--ls-display)", lineHeight: 1.05, margin: "6px 0 0" }}>
              {t.patterniH}
            </h2>
          </div>
          <Badge tone="soft">{t.pdfBadge}</Badge>
        </div>
        <div className="card-grid">
          {patternDefs.map((p) => {
            const name = p[lang];
            const style = lang === "en" ? p.styleEn : p.styleHr;
            const level = lang === "en" ? p.levelEn : p.levelHr;
            return (
              <div key={p.slug} data-reveal="card" className="pattern-card">
                <div className="pattern-card__bar" style={{ background: p.accentVar }} />
                <div className="pattern-card__media">
                  <PlaceholderTile label={t.patternSlotPh} defaultSrc={p.photo ?? undefined} />
                </div>
                <div className="pattern-card__body">
                  <div className="pattern-card__name">{name}</div>
                  <div className="pattern-card__inspired">{style}</div>
                  <div className="pattern-card__badges">
                    <Badge>{level}</Badge>
                    <Badge>
                      {p.pages} {t.pagesShort}
                    </Badge>
                  </div>
                  <div className="pattern-card__foot">
                    <Badge tone="accent" accent={p.accentVar}>
                      €{p.price}
                    </Badge>
                    <a href={`/patterni/${p.slug}`} className="pattern-card__buy">
                      {t.buyDl}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
