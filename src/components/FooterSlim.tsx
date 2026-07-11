import { BlanketEdge } from "./ui/BlanketEdge";

export function FooterSlim() {
  return (
    <footer>
      <BlanketEdge />
      <div style={{ background: "var(--ink)", color: "var(--cream)", padding: "32px 24px" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600 }}>
            Ariko <em style={{ fontWeight: 500 }}>Studio</em>
          </div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(251,246,236,0.6)" }}>© 2026 Ariko Studio · Ariana Kovačić</div>
        </div>
      </div>
    </footer>
  );
}
