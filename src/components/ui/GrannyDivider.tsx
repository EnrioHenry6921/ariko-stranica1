const DEFAULT_COLORS = ["var(--clay)", "var(--ochre)", "var(--sage)", "var(--teal)", "var(--berry)"];

export function GrannyDivider({ colors = DEFAULT_COLORS, size = 26, gap = 10 }: { colors?: string[]; size?: number; gap?: number }) {
  return (
    <div
      role="separator"
      aria-hidden="true"
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: `${gap}px`, padding: "var(--space-5) 0" }}
    >
      {colors.map((c, i) => (
        <span
          key={i}
          className="ariko-stitch"
          data-reveal
          data-i={i}
          style={{ width: size, height: size, borderRadius: 6, background: c, display: "inline-block" }}
        />
      ))}
    </div>
  );
}
