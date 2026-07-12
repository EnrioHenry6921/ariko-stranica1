"use client";

import { useRef, useState } from "react";

/** A ball of yarn drawn in SVG, tinted to `color`. */
function YarnBall({ color = "#8A4A66", size = 54 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <radialGradient id="yb" cx="0.36" cy="0.32" r="0.75">
          <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="0.45" stopColor={color} />
          <stop offset="1" stopColor="rgba(0,0,0,0.35)" />
        </radialGradient>
      </defs>
      <path d="M48 40c6 3 12 1 14-2" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" opacity="0.85" />
      <circle cx="30" cy="34" r="24" fill="url(#yb)" />
      <g fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.6" strokeLinecap="round">
        <path d="M12 28c10-8 24-9 35-2" />
        <path d="M8 36c12-6 27-4 38 5" />
        <path d="M14 46c8-10 22-14 34-9" />
      </g>
      <g fill="none" stroke="rgba(0,0,0,0.22)" strokeWidth="1.4" strokeLinecap="round">
        <path d="M20 14c-6 10-7 24 0 36" />
        <path d="M34 12c8 10 9 26 1 40" />
        <path d="M46 18c5 9 5 22-2 32" />
      </g>
    </svg>
  );
}

const ORBS = [
  { c: "var(--pale-clay)", s: 120, top: "8%", left: "-4%", dur: "13s", delay: "0s" },
  { c: "var(--pale-ochre)", s: 84, top: "62%", left: "4%", dur: "17s", delay: "1.5s" },
  { c: "var(--pale-teal)", s: 100, top: "12%", left: "88%", dur: "15s", delay: "0.8s" },
  { c: "var(--pale-sage)", s: 70, top: "72%", left: "82%", dur: "19s", delay: "2.2s" },
];

/** Soft, slowly drifting colour blobs behind content. Decorative only. */
export function FloatingOrbs() {
  return (
    <div className="floating-orbs" aria-hidden="true">
      {ORBS.map((o, i) => (
        <span
          key={i}
          className="floating-orb"
          style={{
            width: o.s, height: o.s, top: o.top, left: o.left,
            background: o.c,
            animationDuration: o.dur, animationDelay: o.delay,
          }}
        />
      ))}
    </div>
  );
}

/**
 * A ball of yarn the visitor can grab and drag around. It bobs gently on its
 * own; while held it follows the pointer. Purely playful — pointer events only.
 */
export function DraggableYarn({
  color = "#8A4A66",
  size = 54,
  start = { x: 12, y: 12 },
  hint,
}: {
  color?: string;
  size?: number;
  start?: { x: number; y: number };
  hint?: string;
}) {
  const [pos, setPos] = useState(start);
  const [dragging, setDragging] = useState(false);
  const [moved, setMoved] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const offset = useRef({ x: 0, y: 0 });

  const onDown = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const parent = el.offsetParent as HTMLElement | null;
    const pr = parent?.getBoundingClientRect();
    offset.current = {
      x: e.clientX - (pr ? pr.left : 0) - pos.x,
      y: e.clientY - (pr ? pr.top : 0) - pos.y,
    };
    setDragging(true);
    setMoved(true);
    el.setPointerCapture(e.pointerId);
  };

  const onMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const el = ref.current;
    const parent = el?.offsetParent as HTMLElement | null;
    if (!parent) return;
    const pr = parent.getBoundingClientRect();
    const maxX = pr.width - size;
    const maxY = pr.height - size;
    const nx = Math.max(0, Math.min(maxX, e.clientX - pr.left - offset.current.x));
    const ny = Math.max(0, Math.min(maxY, e.clientY - pr.top - offset.current.y));
    setPos({ x: nx, y: ny });
  };

  const onUp = (e: React.PointerEvent) => {
    setDragging(false);
    ref.current?.releasePointerCapture(e.pointerId);
  };

  return (
    <div
      ref={ref}
      className={`draggable-yarn${dragging ? " is-dragging" : ""}${moved ? " has-moved" : ""}`}
      style={{ left: pos.x, top: pos.y, width: size, height: size }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      role="button"
      aria-label={hint || "Yarn"}
      title={hint}
    >
      <YarnBall color={color} size={size} />
    </div>
  );
}
