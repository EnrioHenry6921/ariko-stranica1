// Mirrors the future Sanity documents, exactly as seeded in Konfigurator.dc.html.

export type BagShape = "clutch" | "fringe" | "crossbody" | "pouch" | "birkin30" | "birkin25" | "kelly" | "skirt";

export interface ConfigBag {
  hr: string;
  en: string;
  chip?: string;
  base: number;
  accent: string;
  group: "classic" | "premium";
  shape: BagShape;
}

export const configBags: Record<string, ConfigBag> = {
  "clutch": { hr: "Clutch", en: "Clutch", base: 58, accent: "var(--accent-clutch)", group: "classic", shape: "clutch" },
  "torba-s-resama": { hr: "Torba s resama", en: "Fringe bag", base: 78, accent: "var(--accent-fringe)", group: "classic", shape: "fringe" },
  "crossbody-na-lancu": { hr: "Crossbody na lancu", en: "Chain crossbody", base: 74, accent: "var(--accent-crossbody)", group: "classic", shape: "crossbody" },
  "mini-pouch": { hr: "Mini pouch", en: "Mini pouch", base: 45, accent: "var(--accent-mini)", group: "classic", shape: "pouch" },
  "birkin-30": { hr: "Crochet Birkin 30 Inspired Bag", en: "Crochet Birkin 30 Inspired Bag", chip: "Birkin 30", base: 120, accent: "var(--berry)", group: "premium", shape: "birkin30" },
  "birkin-25": { hr: "Crochet Birkin 25 Inspired Bag", en: "Crochet Birkin 25 Inspired Bag", chip: "Birkin 25", base: 110, accent: "var(--clay)", group: "premium", shape: "birkin25" },
  "mini-kelly": { hr: "Crochet Mini Kelly Inspired Bag", en: "Crochet Mini Kelly Inspired Bag", chip: "Mini Kelly", base: 98, accent: "var(--teal)", group: "premium", shape: "kelly" },
  "skirt-bag": { hr: "Crochet Skirt Bag", en: "Crochet Skirt Bag", chip: "Skirt Bag", base: 88, accent: "var(--sage)", group: "premium", shape: "skirt" },
};

// Preview silhouettes — dims at size "srednja", plus feature flags.
export interface ShapeDef {
  w: number;
  h: number;
  r: string;
  slot?: boolean;
  fringe?: boolean;
  handle?: boolean;
  flap?: boolean;
  lock?: boolean;
  pleats?: boolean;
  /** Built-in metal chain strap that always shows (e.g. the Skirt bag). */
  chain?: boolean;
}

export const shapes: Record<BagShape, ShapeDef> = {
  clutch: { w: 220, h: 170, r: "18px 18px 26px 26px", slot: true },
  fringe: { w: 210, h: 175, r: "18px 18px 22px 22px", fringe: true },
  crossbody: { w: 190, h: 150, r: "18px 18px 26px 26px" },
  pouch: { w: 170, h: 155, r: "34px 34px 26px 26px" },
  birkin30: { w: 250, h: 190, r: "12px 12px 20px 20px", handle: true, flap: true, lock: true },
  birkin25: { w: 220, h: 170, r: "12px 12px 20px 20px", handle: true, flap: true, lock: true },
  kelly: { w: 190, h: 160, r: "12px 12px 18px 18px", handle: true, flap: true, lock: true },
  skirt: { w: 215, h: 190, r: "10px 10px 34px 34px", pleats: true, chain: true },
};

export const MAX_COLORS = 3;

export const sizes = [
  { id: "mini", hr: "Mini", en: "Mini", mod: 0, f: 0.82 },
  { id: "srednja", hr: "Srednja", en: "Medium", mod: 10, f: 1 },
  { id: "velika", hr: "Velika", en: "Large", mod: 20, f: 1.18 },
] as const;

export const inserts = [
  { id: "bez", hr: "Bez", en: "Without", mod: 0 },
  { id: "sa", hr: "Sa", en: "With", mod: 0 },
] as const;

export const straps = [
  { id: "bez", hr: "Bez", en: "None", mod: 0, tone: null },
  { id: "heklana", hr: "Heklana", en: "Crochet", mod: 8, tone: null },
  { id: "srebrni", hr: "Srebrni lanac", en: "Silver chain", mod: 12, tone: "#C7CBD1" },
  { id: "zlatni", hr: "Zlatni lanac", en: "Gold chain", mod: 12, tone: "#D6A748" },
] as const;

// [hex, hr name, en name]
export const yarns: [string, string, string][] = [
  ["#6E3A52", "Bordo", "Bordeaux"], ["#8A4A66", "Malina", "Raspberry"], ["#CC8264", "Terakota", "Terracotta"],
  ["#D98F5E", "Cimet", "Cinnamon"], ["#D6A748", "Senf", "Mustard"], ["#E8C77A", "Med", "Honey"],
  ["#93A36F", "Kadulja", "Sage"], ["#6E9B95", "Žad", "Jade"], ["#4F6E7A", "Petrol", "Petrol"],
  ["#3E5C6E", "Denim", "Denim"], ["#B8829A", "Lila", "Lilac"], ["#E7B7C4", "Rumenilo", "Blush"],
  ["#8C6F52", "Lješnjak", "Hazelnut"], ["#C7B48F", "Pijesak", "Sand"], ["#FBF6EC", "Krem", "Cream"],
  ["#33291F", "Espresso", "Espresso"],
];

export const charmDefs = [
  { id: "srce", hr: "Srce", en: "Heart" },
  { id: "zvijezda", hr: "Zvijezda", en: "Star" },
  { id: "cvijet", hr: "Cvijet", en: "Flower" },
  { id: "leptir", hr: "Leptir", en: "Butterfly" },
  { id: "skoljka", hr: "Školjka", en: "Shell" },
  { id: "masnica", hr: "Mašnica", en: "Bow" },
  { id: "inicijal", hr: "Inicijal", en: "Initial" },
  { id: "perlica", hr: "Perlica", en: "Bead" },
  { id: "drugo", hr: "Drugo", en: "Other" },
] as const;

export const CHARM_MOD = 4;
export const WA_NUMBER = "385955612182";

// Where orders are sent. Used for the mailto fallback and, by default, as the
// FormSubmit relay target below. Change it when the destination changes.
export const ORDER_EMAIL = "henryknez4@gmail.com";

// The order form posts straight to FormSubmit.co (https://formsubmit.co) — a
// free form-to-email relay, so the site needs no backend to send orders.
//
// One-time setup: the first submission triggers an activation email to this
// address; click the link once and delivery is on. After activating you can
// replace the email below with the random alias FormSubmit gives you, to keep
// the address out of the page source.
export const FORMSUBMIT_TARGET = ORDER_EMAIL;

// One metal finish drives every metal part: ARIKO plate, clasp, and charms.
export const metals = {
  gold: { grad: "linear-gradient(#E4BD6A, #C79433)", solid: "#C79433", stroke: "#8A6A24", plateText: "#3A2F14", hr: "Zlatna", en: "Gold" },
  silver: { grad: "linear-gradient(#EDEFF2, #AEB3BB)", solid: "#B4B9C0", stroke: "#7E838B", plateText: "#2B2F36", hr: "Srebrna", en: "Silver" },
} as const;
export type MetalId = keyof typeof metals;

export type SizeId = (typeof sizes)[number]["id"];
export type InsertId = (typeof inserts)[number]["id"];
export type StrapId = (typeof straps)[number]["id"];
export type CharmId = (typeof charmDefs)[number]["id"];
