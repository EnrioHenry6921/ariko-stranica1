export type Lang = "hr" | "en";

export interface Translations {
  navKolekcija: string; navPatterni: string; navGalerija: string; navRecenzije: string; navOMeni: string; navKontakt: string;
  h1a: string; h1b: string;
  heroLead: string;
  ctaBuild: string; ctaPatterns: string;
  kolekcijaEyebrow: string; kolekcijaH: string;
  classicsH: string; classicsSub: string;
  iconsH: string; iconsSub: string;
  madeToOrder: string; customize: string;
  patterniEyebrow: string; patterniH: string;
  pdfBadge: string; buyDl: string; patternSlotPh: string;
  galerijaEyebrow: string; galerijaH: string;
  recenzijeEyebrow: string; recenzijeH: string;
  omeniEyebrow: string;
  omeniP1: string;
  omeniP2: string;
  kontaktEyebrow: string; kontaktH: string;
  kontaktP: string;
  formName: string; formNamePh: string; formMsg: string; formMsgPh: string;
  send: string; sentNote: string;
  footerBlurb: string;
  footerShop: string; footerShipping: string; footerLicence: string; footerTerms: string; footerPrivacy: string;
  od: string; pagesShort: string;
}

export const translations: Record<Lang, Translations> = {
  hr: {
    navKolekcija: "Kolekcija", navPatterni: "Patterni", navGalerija: "Galerija", navRecenzije: "Recenzije", navOMeni: "O meni", navKontakt: "Kontakt",
    h1a: "Heklane torbe,", h1b: "petlja po petlja",
    heroLead: "Ručno heklane torbe u malim serijama — svaka petlja izrađena pažljivo, baš za tebe. Cijene od €45.",
    ctaBuild: "Složi svoju torbu", ctaPatterns: "Pogledaj patterne",
    kolekcijaEyebrow: "Kolekcija", kolekcijaH: "Odaberi svoju torbu",
    classicsH: "Klasici", classicsSub: "Naši svakodnevni modeli",
    iconsH: "Ikone", iconsSub: "Inspirirano ikonama visoke mode",
    madeToOrder: "Izrađeno po narudžbi · šalje se za 2–4 tjedna", customize: "Prilagodi →",
    patterniEyebrow: "Patterni", patterniH: "Digitalni uzorci za heklanje",
    pdfBadge: "PDF · trenutno preuzimanje", buyDl: "Kupi i preuzmi →", patternSlotPh: "Naslovnica patterna",
    galerijaEyebrow: "Galerija", galerijaH: "Gotovi radovi",
    recenzijeEyebrow: "Recenzije", recenzijeH: "Što kažu kupci",
    omeniEyebrow: "O meni",
    omeniP1: "Svaku torbu heklam sama, u malim serijama. Volim da svaka torba ima svoju priču — i da traje.",
    omeniP2: "Ako želiš nešto sasvim po svom, javi mi se — dogovorit ćemo boje, veličinu i detalje.",
    kontaktEyebrow: "Kontakt", kontaktH: "Javi mi se",
    kontaktP: "Za narudžbe po mjeri i pitanja, najbrže preko WhatsAppa.",
    formName: "Ime", formNamePh: "Tvoje ime", formMsg: "Poruka", formMsgPh: "Što bi željela naručiti?",
    send: "Pošalji upit", sentNote: "Hvala na upitu! Javit ću se uskoro.",
    footerBlurb: "Ručno heklane torbe i digitalni uzorci. Male serije, izrađene s pažnjom.",
    footerShop: "Trgovina", footerShipping: "Dostava i rok", footerLicence: "Licenca patterna", footerTerms: "Uvjeti", footerPrivacy: "Privatnost",
    od: "od", pagesShort: "str.",
  },
  en: {
    navKolekcija: "Collection", navPatterni: "Patterns", navGalerija: "Gallery", navRecenzije: "Reviews", navOMeni: "About me", navKontakt: "Contact",
    h1a: "Crochet bags,", h1b: "loop by loop",
    heroLead: "Hand-crocheted bags in small batches — every stitch made with care, just for you. Prices from €45.",
    ctaBuild: "Build your bag", ctaPatterns: "Browse patterns",
    kolekcijaEyebrow: "Collection", kolekcijaH: "Choose your bag",
    classicsH: "Classics", classicsSub: "Our everyday models",
    iconsH: "Icons", iconsSub: "Inspired by high-fashion icons",
    madeToOrder: "Made to order · ships in 2–4 weeks", customize: "Customize →",
    patterniEyebrow: "Patterns", patterniH: "Digital crochet patterns",
    pdfBadge: "PDF · instant download", buyDl: "Buy & download →", patternSlotPh: "Pattern cover photo",
    galerijaEyebrow: "Gallery", galerijaH: "Finished work",
    recenzijeEyebrow: "Reviews", recenzijeH: "What customers say",
    omeniEyebrow: "About me",
    omeniP1: "I crochet every bag myself, in small batches. I love for every bag to have its own story — and to last.",
    omeniP2: "If you'd like something entirely your own, message me — we'll agree on colors, size and details.",
    kontaktEyebrow: "Contact", kontaktH: "Get in touch",
    kontaktP: "For custom orders and questions, WhatsApp is fastest.",
    formName: "Name", formNamePh: "Your name", formMsg: "Message", formMsgPh: "What would you like to order?",
    send: "Send enquiry", sentNote: "Thank you! I'll get back to you soon.",
    footerBlurb: "Hand-crocheted bags and digital patterns. Small batches, made with care.",
    footerShop: "Shop", footerShipping: "Shipping & lead time", footerLicence: "Pattern licence", footerTerms: "Terms", footerPrivacy: "Privacy",
    od: "from", pagesShort: "p.",
  },
};
