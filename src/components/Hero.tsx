"use client";

import { useLang } from "@/lib/LangProvider";
import { Eyebrow } from "./ui/Eyebrow";
import { LinkButton } from "./ui/Button";
import { PlaceholderTile } from "./ui/PlaceholderTile";
import { FloatingOrbs } from "./ui/FloatingDecor";

export function Hero() {
  const { lang, t } = useLang();
  const addPhotoLabel = lang === "en" ? "Add a photo" : "Dodaj fotografiju";

  return (
    <section id="vrh" className="hero">
      <FloatingOrbs />
      <div className="hero__grid">
        <div data-reveal="hero" data-i="0" className="hero__panel">
          <Eyebrow>Ariko Studio</Eyebrow>
          <h1>
            {t.h1a}
            <br />
            <em>{t.h1b}</em>
          </h1>
          <p className="hero__lead">{t.heroLead}</p>
          <div className="hero__ctas">
            <LinkButton href="/konfigurator" size="lg">
              {t.ctaBuild}
            </LinkButton>
            <LinkButton href="#patterni" size="lg" variant="secondary">
              {t.ctaPatterns}
            </LinkButton>
          </div>
        </div>
        <div className="hero__media">
          <div data-reveal="hero" data-i="1" className="hero__media-main">
            <PlaceholderTile id="hero-main" label={addPhotoLabel} defaultSrc="/images/clutch-bordo.jpg" />
          </div>
          <div data-reveal="hero" data-i="2" className="hero__media-tile">
            <PlaceholderTile id="hero-1" label={addPhotoLabel} />
          </div>
          <div data-reveal="hero" data-i="3" className="hero__media-tile">
            <PlaceholderTile id="hero-2" label={addPhotoLabel} />
          </div>
        </div>
      </div>
    </section>
  );
}
