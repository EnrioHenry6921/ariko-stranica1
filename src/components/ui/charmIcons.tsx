import type { CharmId } from "@/lib/configuratorData";

/**
 * Small metal charm silhouettes for the configurator preview. Rendered in the
 * selected metal finish (gold/silver). `initial` shows the first letter of the
 * custom text; `drugo` (other) is a small engraved tag.
 */
export function CharmGlyph({
  id,
  color,
  stroke,
  size = 16,
  initial = "A",
}: {
  id: CharmId;
  color: string;
  stroke: string;
  size?: number;
  initial?: string;
}) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", "aria-hidden": true as const };
  const sheen = <stop offset="0" stopColor="#fff" stopOpacity="0.5" />;
  const gid = `charm-${id}`;
  const grad = (
    <defs>
      <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
        {sheen}
        <stop offset="0.4" stopColor={color} />
        <stop offset="1" stopColor={stroke} />
      </linearGradient>
    </defs>
  );
  const fill = `url(#${gid})`;

  switch (id) {
    case "srce":
      return (
        <svg {...common}>{grad}
          <path d="M12 20.5C6 16.5 3 13 3 9.5 3 7 5 5.2 7.3 5.2c1.6 0 3 .9 3.7 2.2.7-1.3 2.1-2.2 3.7-2.2C20 5.2 21 7 21 9.5c0 3.5-3 7-9 11z" fill={fill} stroke={stroke} strokeWidth="0.6" />
        </svg>
      );
    case "zvijezda":
      return (
        <svg {...common}>{grad}
          <path d="M12 2.5l2.6 5.9 6.4.6-4.8 4.3 1.4 6.3L12 16.9 6.4 19.6l1.4-6.3L3 9l6.4-.6z" fill={fill} stroke={stroke} strokeWidth="0.6" strokeLinejoin="round" />
        </svg>
      );
    case "cvijet":
      return (
        <svg {...common}>{grad}
          <g fill={fill} stroke={stroke} strokeWidth="0.5">
            <circle cx="12" cy="6.5" r="3.3" /><circle cx="12" cy="17.5" r="3.3" />
            <circle cx="6.5" cy="12" r="3.3" /><circle cx="17.5" cy="12" r="3.3" />
          </g>
          <circle cx="12" cy="12" r="3" fill={stroke} />
        </svg>
      );
    case "leptir":
      return (
        <svg {...common}>{grad}
          <g fill={fill} stroke={stroke} strokeWidth="0.5">
            <ellipse cx="7.5" cy="9" rx="5" ry="5.5" /><ellipse cx="16.5" cy="9" rx="5" ry="5.5" />
            <ellipse cx="8" cy="16" rx="4" ry="4.2" /><ellipse cx="16" cy="16" rx="4" ry="4.2" />
          </g>
          <rect x="11.3" y="5" width="1.4" height="14.5" rx="0.7" fill={stroke} />
        </svg>
      );
    case "skoljka":
      return (
        <svg {...common}>{grad}
          <path d="M12 21C6.5 21 3 16 3 11a9 9 0 0118 0c0 5-3.5 10-9 10z" fill={fill} stroke={stroke} strokeWidth="0.6" />
          <g stroke={stroke} strokeWidth="0.7" fill="none" opacity="0.7">
            <path d="M12 4v16M8 5l-1 14M16 5l1 14" />
          </g>
        </svg>
      );
    case "masnica":
      return (
        <svg {...common}>{grad}
          <g fill={fill} stroke={stroke} strokeWidth="0.5">
            <path d="M11.5 12L4 7.5v9z" /><path d="M12.5 12L20 7.5v9z" />
          </g>
          <circle cx="12" cy="12" r="2.3" fill={stroke} />
        </svg>
      );
    case "perlica":
      return (
        <svg {...common}>{grad}
          <circle cx="12" cy="12" r="6.5" fill={fill} stroke={stroke} strokeWidth="0.6" />
          <circle cx="10" cy="10" r="1.6" fill="#fff" opacity="0.55" />
        </svg>
      );
    case "inicijal":
      return (
        <svg {...common}>{grad}
          <circle cx="12" cy="12" r="8" fill={fill} stroke={stroke} strokeWidth="0.7" />
          <text x="12" y="16" textAnchor="middle" fontFamily="Georgia, serif" fontSize="10" fontWeight="600" fill={stroke}>
            {(initial || "A").charAt(0).toUpperCase()}
          </text>
        </svg>
      );
    case "drugo":
    default:
      return (
        <svg {...common}>{grad}
          <path d="M4 8.5A1.5 1.5 0 015.5 7H13l7 5-7 5H5.5A1.5 1.5 0 014 15.5z" fill={fill} stroke={stroke} strokeWidth="0.6" />
          <circle cx="7.5" cy="12" r="1.1" fill={stroke} />
        </svg>
      );
  }
}
