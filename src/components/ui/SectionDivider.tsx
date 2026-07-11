/**
 * A slim, elegant section opener: a hairline that fades in from both sides to a
 * small stitch-textured diamond in the section's accent. On-brand (crochet
 * motif) but quiet enough to sit above any heading.
 */
export function SectionDivider({ accent = "var(--berry)", onDark = false }: { accent?: string; onDark?: boolean }) {
  const line = onDark ? "rgba(251,246,236,0.32)" : "var(--line)";
  return (
    <div
      aria-hidden="true"
      data-reveal
      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, maxWidth: 460, margin: "0 auto 48px" }}
    >
      <span style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${line})` }} />
      <span
        className="ariko-stitch"
        style={{ width: 11, height: 11, background: accent, borderRadius: 3, transform: "rotate(45deg)", flex: "none" }}
      />
      <span style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${line})` }} />
    </div>
  );
}
