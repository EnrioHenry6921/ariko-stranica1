export type BagGroup = "classic" | "premium";

export interface BagDef {
  slug: string;
  hr: string;
  en: string;
  base: number;
  accentVar: string;
  group: BagGroup;
  photo: string | null;
  alt: string;
  blurbHr: string;
  blurbEn: string;
  subtitleHr?: string;
  subtitleEn?: string;
}

export const bagDefs: BagDef[] = [
  {
    slug: "clutch", hr: "Clutch", en: "Clutch", base: 58, accentVar: "var(--accent-clutch)", group: "classic",
    photo: "/images/clutch-bordo-studio.jpg", alt: "Bordo heklani clutch s crno-bijelim detaljima",
    blurbHr: "Elegantna večernja torbica sa zlatnom niti.", blurbEn: "An elegant evening bag with a golden thread.",
  },
  {
    slug: "torba-s-resama", hr: "Torba s resama", en: "Fringe bag", base: 78, accentVar: "var(--accent-fringe)", group: "classic",
    photo: "/images/fringe-blue.jpg", alt: "Plava heklana torba s resama",
    blurbHr: "Mekana torba s resama, za svaki dan.", blurbEn: "A soft fringed bag for every day.",
  },
  {
    slug: "crossbody-na-lancu", hr: "Crossbody na lancu", en: "Chain crossbody", base: 74, accentVar: "var(--accent-crossbody)", group: "classic",
    photo: "/images/crossbody-orange.jpg", alt: "Narančasto-krem heklana crossbody torbica na zlatnom lancu",
    blurbHr: "Manja torbica na lančiću, preko ramena.", blurbEn: "A smaller bag on a chain, worn across the shoulder.",
  },
  {
    slug: "mini-pouch", hr: "Mini pouch", en: "Mini pouch", base: 45, accentVar: "var(--accent-mini)", group: "classic",
    photo: "/images/pouch-blue-white.jpg", alt: "Mala plavo-bijela heklana torbica",
    blurbHr: "Sitna torbica za najnužnije.", blurbEn: "A tiny pouch for the essentials.",
  },
  {
    slug: "birkin-30", hr: "Crochet Birkin 30 Inspired Bag", en: "Crochet Birkin 30 Inspired Bag", base: 120, accentVar: "var(--berry)", group: "premium",
    photo: "/images/birkin-30.jpg", alt: "Strukturirana heklana torba boje karamele s preklopom i zlatnim detaljima",
    blurbHr: "Strukturirana torba s preklopom, ručkama i zlatnim detaljima.", blurbEn: "A structured flap bag with handles and gold details.",
  },
  {
    slug: "birkin-25", hr: "Crochet Birkin 25 Inspired Bag", en: "Crochet Birkin 25 Inspired Bag", base: 110, accentVar: "var(--clay)", group: "premium",
    photo: "/images/birkin-25.jpg", alt: "Manja strukturirana heklana torba u periwinkle plavoj s preklopom",
    blurbHr: "Manja verzija strukturirane torbe s preklopom.", blurbEn: "The smaller version of the structured flap bag.",
  },
  {
    slug: "mini-kelly", hr: "Crochet Mini Kelly Inspired Bag", en: "Crochet Mini Kelly Inspired Bag", base: 98, accentVar: "var(--teal)", group: "premium",
    photo: null, alt: "Mala heklana torbica s ručkom, preklopom i kopčom",
    blurbHr: "Mala torbica s ručkom, preklopom i kopčom.", blurbEn: "A small top-handle bag with a flap and clasp.",
  },
  {
    slug: "skirt-bag", hr: "Crochet Skirt Bag", en: "Crochet Skirt Bag", base: 88, accentVar: "var(--sage)", group: "premium",
    subtitleHr: "Inspirirano modelom Lacoste Lenglen", subtitleEn: "Inspired by the Lacoste Lenglen",
    photo: "/images/skirt-bag.jpg", alt: "Razigrana roza heklana torbica plisiranog oblika sa zlatnim lancem",
    blurbHr: "Razigrana torbica nabranog, plisiranog oblika.", blurbEn: "A playful bag with a pleated, skirt-like shape.",
  },
];

export interface PatternDef {
  slug: string;
  hr: string;
  en: string;
  /** Honest silhouette descriptor shown under the pattern name. */
  styleHr: string;
  styleEn: string;
  levelHr: string;
  levelEn: string;
  pages: number;
  price: number;
  accentVar: string;
  /** Cover photo path, e.g. "/images/birkin-30-pattern.jpg". null = placeholder. */
  photo: string | null;
}

// Patterns are the PDF guides for the signature "Ikone" bags — named after the bag.
export const patternDefs: PatternDef[] = [
  {
    slug: "birkin-30", hr: "Crochet Birkin 30 Inspired Bag", en: "Crochet Birkin 30 Inspired Bag",
    styleHr: "Strukturirana torbica s preklopom", styleEn: "Structured flap bag", levelHr: "Napredno", levelEn: "Advanced",
    pages: 28, price: 14, accentVar: "var(--berry)", photo: null,
  },
  {
    slug: "birkin-25", hr: "Crochet Birkin 25 Inspired Bag", en: "Crochet Birkin 25 Inspired Bag",
    styleHr: "Manja torbica s preklopom", styleEn: "Smaller flap bag", levelHr: "Napredno", levelEn: "Advanced",
    pages: 26, price: 13, accentVar: "var(--clay)", photo: null,
  },
  {
    slug: "mini-kelly", hr: "Crochet Mini Kelly Inspired Bag", en: "Crochet Mini Kelly Inspired Bag",
    styleHr: "Mini torbica s ručkom i kopčom", styleEn: "Mini top-handle bag with clasp", levelHr: "Srednje", levelEn: "Intermediate",
    pages: 22, price: 12, accentVar: "var(--teal)", photo: null,
  },
  {
    slug: "skirt-bag", hr: "Crochet Skirt Bag", en: "Crochet Skirt Bag",
    styleHr: "Plisirana torbica (Lacoste Lenglen)", styleEn: "Pleated bag (Lacoste Lenglen)", levelHr: "Srednje", levelEn: "Intermediate",
    pages: 18, price: 10, accentVar: "var(--sage)", photo: null,
  },
];

export interface Review {
  name: string;
  role: string;
  rating: number;
  quote: string;
}

export const reviews: Review[] = [
  { name: "Marija K.", role: "Zagreb", rating: 5, quote: "Torba je još ljepša uživo, svaka petlja savršena. Vrijedilo je čekati." },
  { name: "Ivana P.", role: "Split", rating: 5, quote: "Ariana je izašla ususret svim mojim željama. Dobila sam točno ono što sam zamislila." },
  { name: "Emma S.", role: "Beč, Austrija", rating: 5, quote: "The bag arrived beautifully packaged and even prettier in person. Worth every week of waiting." },
  { name: "Petra M.", role: "Rijeka", rating: 5, quote: "Kupila sam pattern i sve je tako jasno objašnjeno. Prva torba mi je uspjela iz prve!" },
  { name: "Sophie L.", role: "München, Njemačka", rating: 5, quote: "Wonderful craftsmanship, you can feel the care in every stitch. Ariana was so kind throughout." },
  { name: "Lucija B.", role: "Osijek", rating: 5, quote: "Prekrasna izrada i topla boja. Nosim je svaki dan." },
  { name: "Giulia R.", role: "Trst, Italija", rating: 5, quote: "Il mio pattern era chiarissimo, con foto per ogni passaggio. La borsa è venuta perfetta!" },
  { name: "Hana N.", role: "Ljubljana, Slovenija", rating: 5, quote: "Naročila sem crossbody v barvi žada, popolna. Priporočam vsem!" },
];

export const galleryImages: { src: string | null; alt: string; height: number }[] = [
  { src: "/images/clutch-white.jpg", alt: "Bijeli heklani clutch sa srebrnom niti", height: 360 },
  { src: "/images/clutch-pink-orange.jpg", alt: "Roza i narančasti heklani clutch sa zlatnom niti", height: 300 },
  { src: "/images/summer-pool.jpg", alt: "Šarena heklana torbica uz bazen", height: 320 },
  { src: "/images/clutch-navy.jpg", alt: "Teget heklani clutch", height: 300 },
  { src: "/images/clutch-red-vogue.jpg", alt: "Bordo heklani clutch uz Vogue magazin", height: 340 },
  { src: "/images/birkin-pink.jpg", alt: "Roza strukturirana heklana torba sa zlatnom kopčom", height: 380 },
  { src: "/images/grey-pink-packaging.jpg", alt: "Heklane torbe u ARIKO pakiranju", height: 300 },
  { src: "/images/pink-blanket.jpg", alt: "Roza heklana torbica u ARIKO pakiranju", height: 300 },
  { src: "/images/fringe-mustard.jpg", alt: "Heklana torba s resama u boji senfa sa zlatnim privjescima", height: 380 },
  { src: "/images/clutch-speckled.jpg", alt: "Šareni heklani clutch s resicama", height: 300 },
  { src: "/images/clutch-bordo-blue.jpg", alt: "Bordo i svijetloplavi prugasti heklani clutch", height: 300 },
  { src: "/images/bags-packaging.jpg", alt: "Heklane torbe u ARIKO pakiranju", height: 320 },
];

// ─────────────────────────────────────────────────────────────────────────
//  SITE PHOTOS
//  To add a photo: drop the image file into the `public/images` folder, then
//  write its path here as "/images/your-file-name.jpg". Leave a value as null
//  to keep an empty placeholder for now. (Bag photos live on each bag above in
//  `bagDefs` → `photo`; gallery photos in `galleryImages` → `src`.)
// ─────────────────────────────────────────────────────────────────────────
export const siteImages = {
  heroMain: "/images/clutch-bordo-studio.jpg" as string | null, // big photo on the home page
  heroTopRight: "/images/skirt-bag.jpg" as string | null,
  heroBottomRight: "/images/birkin-25.jpg" as string | null,
  aboutAriana: null as string | null, // photo on the "O meni / About me" section
};
