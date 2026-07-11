"use client";

import { useLang } from "@/lib/LangProvider";
import { Eyebrow } from "./ui/Eyebrow";
import { PlaceholderTile } from "./ui/PlaceholderTile";
import { SectionDivider } from "./ui/SectionDivider";

export function OMeni() {
  const { lang, t } = useLang();

  return (
    <section id="o-meni" style={{ background: "var(--pale-sage)", padding: "var(--space-section) 24px" }}>
      <SectionDivider accent="var(--sage)" />
      <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: 48, alignItems: "center" }}>
        <div style={{ position: "relative", aspectRatio: "4 / 5", maxWidth: 420 }}>
          <PlaceholderTile id="ariana" label={lang === "en" ? "Photo: Ariana" : "Fotografija: Ariana"} radius="var(--radius-xl)" />
        </div>
        <div data-reveal="card">
          <Eyebrow>{t.omeniEyebrow}</Eyebrow>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 500, color: "var(--ink)", fontSize: "clamp(2rem, 3.5vw, 3.25rem)", letterSpacing: "var(--ls-display)", lineHeight: 1.05, margin: "6px 0 0" }}>
            Ariana Kovačić
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-lg)", color: "var(--ink-soft)", lineHeight: 1.6, margin: "18px 0 0" }}>{t.omeniP1}</p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-md)", color: "var(--ink-soft)", lineHeight: 1.6, margin: "14px 0 0" }}>{t.omeniP2}</p>
        </div>
      </div>
    </section>
  );
}
