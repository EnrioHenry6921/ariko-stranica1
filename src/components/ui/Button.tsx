import type { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

type Variant = "primary" | "secondary";
type Size = "sm" | "md" | "lg";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  accent?: string;
  accentHover?: string;
  children: ReactNode;
}

function accentStyle(accent?: string, accentHover?: string): CSSProperties {
  if (!accent) return {};
  return { ["--btn-accent" as string]: accent, ["--btn-accent-hover" as string]: accentHover || accent };
}

export function Button({
  variant = "primary",
  size = "md",
  accent,
  accentHover,
  children,
  className,
  style,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`btn btn-${size} btn-${variant} ${className || ""}`}
      style={{ ...accentStyle(accent, accentHover), ...style }}
      {...rest}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  variant = "primary",
  size = "md",
  accent,
  accentHover,
  children,
  className,
  style,
  ...rest
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={`btn btn-${size} btn-${variant} ${className || ""}`}
      style={{ ...accentStyle(accent, accentHover), ...style }}
      {...rest}
    >
      {children}
    </a>
  );
}
