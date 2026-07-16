// Mirrors the future Sanity "pattern" documents.
// Each pattern is the downloadable PDF guide for one of the signature "Ikone" bags,
// so it carries the bag's name; `style*` is the honest silhouette descriptor.

export interface PatternDetail {
  hr: string;
  en: string;
  styleHr: string;
  styleEn: string;
  levelHr: string;
  levelEn: string;
  time: string;
  pages: number;
  price: number;
  accent: string;
  materialsHr: string;
  materialsEn: string;
  descHr: string;
  descEn: string;
}

export const patternDetails: Record<string, PatternDetail> = {
  "birkin-30": {
    hr: "Crochet Birkin 30 Inspired Bag", en: "Crochet Birkin 30 Inspired Bag",
    styleHr: "Strukturirana torbica s preklopom", styleEn: "Structured flap bag",
    levelHr: "Napredno", levelEn: "Advanced", time: "16–20 h", pages: 28, price: 14, accent: "var(--berry)",
    materialsHr: "Merino pređa, igla 3.5 mm", materialsEn: "Merino yarn, 3.5 mm hook",
    descHr: "Strukturirana torbica čvrste baze, s preklopom i ručkom na vrhu. Detaljne upute korak po korak, s fotografijama svake faze i shemama redova.",
    descEn: "A structured bag with a firm base, flap and top handle. Detailed step-by-step instructions with photos of every stage and row charts.",
  },
  "birkin-25": {
    hr: "Crochet Birkin 25 Inspired Bag", en: "Crochet Birkin 25 Inspired Bag",
    styleHr: "Manja torbica s preklopom", styleEn: "Smaller flap bag",
    levelHr: "Napredno", levelEn: "Advanced", time: "14–18 h", pages: 26, price: 13, accent: "var(--clay)",
    materialsHr: "Merino pređa, igla 3.5 mm", materialsEn: "Merino yarn, 3.5 mm hook",
    descHr: "Manja verzija strukturirane torbe s preklopom, s istom čvrstom bazom i zlatnim detaljima, u kompaktnijem formatu. Uključuje sheme za oba ovješenja ručke.",
    descEn: "A smaller version of the structured flap bag with the same firm base and gold details in a more compact format. Includes charts for both handle attachments.",
  },
  "mini-kelly": {
    hr: "Crochet Mini Kelly Inspired Bag", en: "Crochet Mini Kelly Inspired Bag",
    styleHr: "Mini torbica s ručkom i kopčom", styleEn: "Mini top-handle bag with clasp",
    levelHr: "Srednje", levelEn: "Intermediate", time: "10–14 h", pages: 22, price: 12, accent: "var(--teal)",
    materialsHr: "Pamučni konac, igla 4 mm", materialsEn: "Cotton thread, 4 mm hook",
    descHr: "Mala torbica s ručkom i preklopom na kopču. Elegantna silueta koja drži oblik. Upute uključuju i podstavu.",
    descEn: "A small top-handle bag with a clasp flap. An elegant silhouette that holds its shape. Lining instructions included.",
  },
  "skirt-bag": {
    hr: "Crochet Skirt Bag", en: "Crochet Skirt Bag",
    styleHr: "Plisirana torbica (Lacoste Lenglen)", styleEn: "Pleated bag (Lacoste Lenglen)",
    levelHr: "Srednje", levelEn: "Intermediate", time: "8–12 h", pages: 18, price: 10, accent: "var(--sage)",
    materialsHr: "Pamučni konac, igla 4 mm", materialsEn: "Cotton thread, 4 mm hook",
    descHr: "Razigrana torbica nabranog, plisiranog oblika. Prozračna struktura s ritmom nabora, a upute vode kroz svaki pregib.",
    descEn: "A playful bag with a pleated, skirt-like shape. An airy structure with a rhythm of folds, and the instructions walk through every pleat.",
  },
};
