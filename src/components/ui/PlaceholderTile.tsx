"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/LangProvider";
import { fileToScaledDataURL } from "@/lib/image";

/**
 * A photo slot. Empty, it's an elegant dashed tile; click it or drag an image
 * onto it and the photo appears and is remembered in localStorage (keyed by
 * `id`). `defaultSrc` seeds a starting image that can still be replaced (and a
 * replacement can be removed to revert to it). In production these become
 * Sanity image fields.
 */
export function PlaceholderTile({
  id,
  label,
  radius,
  defaultSrc,
}: {
  id?: string;
  label: string;
  radius?: number | string;
  defaultSrc?: string;
}) {
  const { lang } = useLang();
  const [uploaded, setUploaded] = useState<string | null>(null);
  const [over, setOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const storeKey = id ? `ariko-photo:${id}` : null;

  useEffect(() => {
    if (!storeKey) {
      setUploaded(null);
      return;
    }
    try {
      setUploaded(localStorage.getItem(storeKey));
    } catch {
      setUploaded(null);
    }
  }, [storeKey]);

  const effective = uploaded || defaultSrc || null;

  const persist = (data: string) => {
    setUploaded(data);
    if (storeKey) {
      try {
        localStorage.setItem(storeKey, data);
      } catch {
        /* quota exceeded — kept for this session via state */
      }
    }
  };

  const handleFile = (file?: File | null) => {
    if (!file || !file.type.startsWith("image/")) return;
    fileToScaledDataURL(file)
      .then(persist)
      .catch(() => {
        // Fallback: store the original if scaling failed for any reason.
        const reader = new FileReader();
        reader.onload = () => persist(String(reader.result));
        reader.readAsDataURL(file);
      });
  };

  const remove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUploaded(null);
    if (storeKey) {
      try {
        localStorage.removeItem(storeKey);
      } catch {
        /* ignore */
      }
    }
  };

  const open = () => inputRef.current?.click();
  const borderRadius = radius;
  const hintEmpty = lang === "en" ? "Click or drop a photo" : "Klikni ili povuci fotografiju";
  const hintReplace = lang === "en" ? "Click to replace" : "Klikni za zamjenu";

  const dnd = {
    role: "button" as const,
    tabIndex: 0,
    onClick: open,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    },
    onDragOver: (e: React.DragEvent) => {
      e.preventDefault();
      setOver(true);
    },
    onDragLeave: () => setOver(false),
    onDrop: (e: React.DragEvent) => {
      e.preventDefault();
      setOver(false);
      handleFile(e.dataTransfer.files?.[0]);
    },
  };

  const fileInput = <input ref={inputRef} type="file" accept="image/*" hidden onChange={(e) => handleFile(e.target.files?.[0])} />;

  if (effective) {
    return (
      <div className={`photo-slot photo-slot--filled ${over ? "is-over" : ""}`} style={{ borderRadius }} aria-label={`${label} — ${hintReplace}`} {...dnd}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={effective} alt={label} />
        <span className="photo-slot__replace">{hintReplace}</span>
        {uploaded && (
          <button type="button" className="photo-slot__remove" onClick={remove} aria-label={lang === "en" ? "Remove photo" : "Ukloni fotografiju"}>
            ×
          </button>
        )}
        {fileInput}
      </div>
    );
  }

  return (
    <div className={`placeholder-tile photo-slot ${over ? "is-over" : ""}`} style={{ borderRadius }} aria-label={`${label} — ${hintEmpty}`} {...dnd}>
      <span>
        {label}
        <span className="photo-slot__hint">{hintEmpty}</span>
      </span>
      {fileInput}
    </div>
  );
}
