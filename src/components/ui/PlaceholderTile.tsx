/**
 * A photo slot. Give it `defaultSrc` — a path to a file in the `public/images`
 * folder, e.g. "/images/clutch.jpg" — and it shows that photo. With no src it
 * shows a plain placeholder. Images are fixed content: visitors cannot add,
 * change or remove them; the studio sets them via the image paths in the data.
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
  if (defaultSrc) {
    return (
      <div className="photo-slot photo-slot--filled" style={{ borderRadius: radius }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={defaultSrc} alt={label} />
      </div>
    );
  }

  return (
    <div className="placeholder-tile" style={{ borderRadius: radius }} aria-label={label}>
      <span>{label}</span>
    </div>
  );
}
