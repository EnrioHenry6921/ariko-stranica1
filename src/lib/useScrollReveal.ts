"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Mirrors the prototype's reveal behavior: staggered fade+rise on scroll into
 * view. Re-scans on route change so client-navigated pages animate too. Under
 * prefers-reduced-motion, elements are left fully visible and no observer runs.
 */
export function useScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.reveal-visible)");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => {
      el.classList.add("reveal-init");
      const delay = Number(el.dataset.i || 0) * 110;
      el.style.transitionDelay = `${delay}ms`;
      io.observe(el);
    });

    return () => io.disconnect();
  }, [pathname]);
}
