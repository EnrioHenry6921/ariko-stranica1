import type { CSSProperties, ReactNode } from "react";

export function Eyebrow({ children, color }: { children: ReactNode; color?: string }) {
  return (
    <p className="eyebrow" style={{ color } as CSSProperties}>
      {children}
    </p>
  );
}
