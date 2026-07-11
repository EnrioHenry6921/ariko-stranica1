"use client";

import { useLang } from "@/lib/LangProvider";
import { galleryImages } from "@/lib/data";
import { Eyebrow } from "./ui/Eyebrow";
import { PlaceholderTile } from "./ui/PlaceholderTile";
import { SectionDivider } from "./ui/SectionDivider";

export function Galerija() {
  const { lang, t } = useLang();
  const addPhotoLabel = lang === "en" ? "Add a photo" : "Dodaj fotografiju";

  return (
    <section id="galerija" style={{ background: "var(--pale-clay)", padding: "var(--space-section) 24px" }}>
      <SectionDivider accent="var(--clay)" />
      <div className="container">
        <div className="section-heading" data-reveal>
          <Eyebrow>{t.galerijaEyebrow}</Eyebrow>
          <h2>{t.galerijaH}</h2>
        </div>
        <div className="gallery-columns">
          {galleryImages.map((img, i) => (
            <div key={i} data-reveal="card" className="gallery-tile" style={{ position: "relative", height: img.height }}>
              <PlaceholderTile id={`galerija-${i}`} label={addPhotoLabel} radius="var(--radius-xl)" defaultSrc={img.src ?? undefined} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
