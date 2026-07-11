"use client";

import { useLang } from "@/lib/LangProvider";
import { bagDefs, type BagDef } from "@/lib/data";
import { Eyebrow } from "./ui/Eyebrow";
import { Badge } from "./ui/Badge";
import { LinkButton } from "./ui/Button";
import { PlaceholderTile } from "./ui/PlaceholderTile";
import { SectionDivider } from "./ui/SectionDivider";
import type { Lang } from "@/lib/translations";

function BagCard({ bag, lang, madeToOrder, customize, od, icon }: { bag: BagDef; lang: Lang; madeToOrder: string; customize: string; od: string; icon?: boolean }) {
  const name = bag[lang];
  const blurb = lang === "en" ? bag.blurbEn : bag.blurbHr;
  const subtitle = lang === "en" ? bag.subtitleEn : bag.subtitleHr;
  const slotLabel = (lang === "en" ? "Photo: " : "Fotografija: ") + name;

  return (
    <div data-reveal="card" className="bag-card">
      <div className="bag-card__bar" style={{ background: bag.accentVar }} />
      <div className="bag-card__media">
        <PlaceholderTile id={`bag-${bag.slug}`} label={slotLabel} defaultSrc={bag.photo ?? undefined} />
      </div>
      <div className="bag-card__body">
        <div className={`bag-card__head ${icon ? "bag-card__head--icon" : ""}`}>
          <h4 className={`bag-card__title ${icon ? "bag-card__title--icon" : ""}`}>{name}</h4>
          <Badge tone="accent" accent={bag.accentVar}>
            {od} €{bag.base}
          </Badge>
        </div>
        {subtitle && <div className="bag-card__subtitle">{subtitle}</div>}
        <span className="bag-card__made">{madeToOrder}</span>
        <p className="bag-card__blurb">{blurb}</p>
        <div className="bag-card__cta">
          <LinkButton href={`/konfigurator?bag=${bag.slug}`} accent={bag.accentVar} size="sm">
            {customize}
          </LinkButton>
        </div>
      </div>
    </div>
  );
}

export function Kolekcija() {
  const { lang, t } = useLang();
  const classicBags = bagDefs.filter((b) => b.group === "classic");
  const premiumBags = bagDefs.filter((b) => b.group === "premium");

  return (
    <section id="kolekcija" style={{ background: "var(--cream)", padding: "var(--space-section) 24px" }}>
      <SectionDivider accent="var(--berry)" />
      <div className="container">
        <div className="section-heading" data-reveal>
          <Eyebrow>{t.kolekcijaEyebrow}</Eyebrow>
          <h2>{t.kolekcijaH}</h2>
        </div>

        <div className="group-label">
          <h3>{t.classicsH}</h3>
          <span>{t.classicsSub}</span>
        </div>
        <div className="card-grid" style={{ marginBottom: 48 }}>
          {classicBags.map((bag) => (
            <BagCard key={bag.slug} bag={bag} lang={lang} madeToOrder={t.madeToOrder} customize={t.customize} od={t.od} />
          ))}
        </div>

        <div className="group-label">
          <h3>{t.iconsH}</h3>
          <span>{t.iconsSub}</span>
        </div>
        <div className="card-grid">
          {premiumBags.map((bag) => (
            <BagCard key={bag.slug} bag={bag} lang={lang} madeToOrder={t.madeToOrder} customize={t.customize} od={t.od} icon />
          ))}
        </div>
      </div>
    </section>
  );
}
