"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/LangProvider";
import { reviews } from "@/lib/data";
import { Eyebrow } from "./ui/Eyebrow";
import { ReviewCard } from "./ui/ReviewCard";
import { SectionDivider } from "./ui/SectionDivider";

const INTERVAL_MS = 4000;

export function Recenzije() {
  const { t } = useLang();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % reviews.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") setIndex((i) => (i + 1) % reviews.length);
    if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + reviews.length) % reviews.length);
  };

  const r = reviews[index];

  return (
    <section
      id="recenzije"
      className="reviews-section ariko-stitch"
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={handleKeyDown}
      aria-label="Recenzije kupaca — strelicama mijenjaj recenziju"
    >
      <SectionDivider accent="var(--pale-ochre)" onDark />
      <div className="container">
        <div className="section-heading">
          <Eyebrow color="var(--pale-ochre)">{t.recenzijeEyebrow}</Eyebrow>
          <h2 style={{ color: "var(--cream)" }}>{t.recenzijeH}</h2>
        </div>
        <div className="reviews-wrap" aria-live="polite">
          <ReviewCard key={index} name={r.name} role={r.role} rating={r.rating} quote={r.quote} />
          <div className="review-dots">
            {reviews.map((_, i) => (
              <button key={i} onClick={() => setIndex(i)} aria-label={`Recenzija ${i + 1}`} className={i === index ? "active" : ""} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
