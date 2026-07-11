import type { CSSProperties, ReactNode } from "react";

type Tone = "neutral" | "accent" | "soft";

export function Badge({
  tone = "neutral",
  accent = "var(--berry)",
  children,
}: {
  tone?: Tone;
  accent?: string;
  children: ReactNode;
}) {
  const style: CSSProperties = tone === "accent" ? { ["--badge-accent" as string]: accent } : {};
  return (
    <span className={`badge badge-${tone}`} style={style}>
      {children}
    </span>
  );
}
