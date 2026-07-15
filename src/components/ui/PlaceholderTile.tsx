"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A photo slot. Give it `defaultSrc` — a path to a file in the `public/images`
 * folder, e.g. "/images/clutch.jpg" — and it shows that photo. With no src (or
 * if the file isn't there yet) it shows a plain placeholder. Images are fixed
 * content: visitors cannot add, change or remove them; the studio sets them via
 * the image paths in the data.
 */
export function PlaceholderTile({
  label,
  radius,
  defaultSrc,
}: {
  /** Kept for call-site compatibility; no longer used. */
  id?: string;
  label: string;
  radius?: number | string;
  defaultSrc?: string;
}) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // An image that 404s before hydration has already fired its error event, so
  // onError won't run again — check for that case once mounted.
  useEffect(() => {
    setFailed(false);
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, [defaultSrc]);

  if (defaultSrc && !failed) {
    return (
      <div className="photo-slot photo-slot--filled" style={{ borderRadius: radius }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={imgRef} src={defaultSrc} alt={label} onError={() => setFailed(true)} />
      </div>
    );
  }

  return (
    <div className="placeholder-tile" style={{ borderRadius: radius }} aria-label={label}>
      <span>{label}</span>
    </div>
  );
}
