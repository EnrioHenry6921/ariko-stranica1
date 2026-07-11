const DEFAULT_COLORS = ["var(--clay)", "var(--ochre)", "var(--sage)", "var(--teal)", "var(--berry)", "var(--pale-clay)"];

export function BlanketEdge({ colors = DEFAULT_COLORS }: { colors?: string[] }) {
  return (
    <div className="blanket-edge" aria-hidden="true">
      {colors.map((c, i) => (
        <span key={i} className="ariko-stitch" style={{ background: c }} />
      ))}
    </div>
  );
}
