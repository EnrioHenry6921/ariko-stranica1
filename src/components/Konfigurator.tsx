"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLang } from "@/lib/LangProvider";
import {
  configBags, shapes, sizes, inserts, straps, yarns, charmDefs, metals,
  CHARM_MOD, WA_NUMBER, MAX_COLORS,
  type SizeId, type InsertId, type StrapId, type CharmId, type MetalId,
} from "@/lib/configuratorData";
import { Eyebrow } from "./ui/Eyebrow";
import { Badge } from "./ui/Badge";
import { Button, LinkButton } from "./ui/Button";
import { CharmGlyph } from "./ui/charmIcons";
import { PlaceholderTile } from "./ui/PlaceholderTile";

const T = {
  hr: {
    back: "← Natrag na kolekciju", eyebrow: "Prilagodi",
    madeToOrder: "Izrađeno po narudžbi · šalje se za 2–4 tjedna",
    iconNote: "Ikone se izrađuju u fiksnom kroju — prilagodi boju, metal i privjeske.",
    model: "Model", classics: "Klasici", icons: "Ikone",
    size: "Veličina", insert: "Umetak za ruku (besplatno)", strap: "Naramenica", yarn: "Boja pređe", yarnHint: "do 3 boje",
    metal: "Metal (pločica i privjesci)", metalGold: "Zlatna", metalSilver: "Srebrna",
    charms: "Privjesci · +€4 po privjesku (više odabira)",
    customCharmLabel: "Koji privjesak želiš?", customCharmPh: "npr. slovo A, srebrna zvjezdica…",
    wishes: "Posebne želje", wishesPh: "npr. inicijali na privjesku, tamnija podstava…",
    order: "Naruči i plati", whatsapp: "Dogovori na WhatsApp",
    protoLabel: "Prototip:", stripeNote: "ovdje se otvara Stripe Checkout (kartice, Apple Pay, Google Pay). Cijena se prije naplate ponovno izračunava na serveru iz odabranih opcija — iznos iz preglednika se ne koristi.",
    orLine: "Ili: Instagram @arikostudio · hello@arikostudio.hr",
    examplesLabel: "Primjeri izrade", examplePh: "Primjer",
    total: "Ukupno", from: "od", strapWord: "Naramenica", insertWord: "Umetak", charmsWord: "Privjesci", metalWord: "Metal", colorWord: "Boje",
    waIntro: "Pozdrav Ariana! Zanima me narudžba:", waSize: "Veličina", waInsert: "Umetak za ruku", waStrap: "Naramenica", waYarn: "Boje pređe", waMetal: "Metal", waCharms: "Privjesci", waNote: "Napomena", waPrice: "Cijena na stranici",
  },
  en: {
    back: "← Back to the collection", eyebrow: "Customize",
    madeToOrder: "Made to order · ships in 2–4 weeks",
    iconNote: "Icons are made to a fixed cut — customize the color, metal and charms.",
    model: "Model", classics: "Classics", icons: "Icons",
    size: "Size", insert: "Hand insert (free)", strap: "Strap", yarn: "Yarn color", yarnHint: "up to 3 colors",
    metal: "Metal (plate & charms)", metalGold: "Gold", metalSilver: "Silver",
    charms: "Charms · +€4 each (multi-select)",
    customCharmLabel: "Which charm would you like?", customCharmPh: "e.g. letter A, a small silver star…",
    wishes: "Special requests", wishesPh: "e.g. initials on the charm, darker lining…",
    order: "Order & pay", whatsapp: "Arrange on WhatsApp",
    protoLabel: "Prototype:", stripeNote: "this opens Stripe Checkout (cards, Apple Pay, Google Pay). The price is recalculated server-side from the selected options before charging — the browser amount is never trusted.",
    orLine: "Or: Instagram @arikostudio · hello@arikostudio.hr",
    examplesLabel: "Made examples", examplePh: "Example",
    total: "Total", from: "from", strapWord: "Strap", insertWord: "Insert", charmsWord: "Charms", metalWord: "Metal", colorWord: "Colors",
    waIntro: "Hi Ariana! I would like to order:", waSize: "Size", waInsert: "Hand insert", waStrap: "Strap", waYarn: "Yarn colors", waMetal: "Metal", waCharms: "Charms", waNote: "Note", waPrice: "Price on the site",
  },
} as const;

const NOTE_MAX = 200;

// Seeded example photos per bag (replaceable). Only the clutch has a real photo.
const exampleDefaults: Record<string, (string | undefined)[]> = {
  clutch: ["/images/clutch-bordo.jpg"],
};

export function Konfigurator() {
  const { lang } = useLang();
  const t = T[lang];
  const searchParams = useSearchParams();

  const urlBag = searchParams.get("bag");
  const initialBag = urlBag && configBags[urlBag] ? urlBag : "clutch";

  const [bagSlug, setBagSlug] = useState(initialBag);
  const [size, setSize] = useState<SizeId>("mini");
  const [insert, setInsert] = useState<InsertId>("bez");
  const [strap, setStrap] = useState<StrapId>("bez");
  const [colors, setColors] = useState<string[]>(["Bordo"]);
  const [metal, setMetal] = useState<MetalId>("gold");
  const [charms, setCharms] = useState<CharmId[]>([]);
  const [customCharm, setCustomCharm] = useState("");
  const [note, setNote] = useState("");
  const [stripeNote, setStripeNote] = useState(false);

  const bag = configBags[bagSlug];
  const shape = shapes[bag.shape];
  const isPremium = bag.group === "premium";

  const sizeDef = sizes.find((x) => x.id === size)!;
  const insertDef = inserts.find((x) => x.id === insert)!;
  const strapDef = straps.find((x) => x.id === strap)!;

  // ---- Colors (1–3) ----
  const colorDefs = colors.map((n) => yarns.find((y) => y[1] === n) || yarns[0]);
  const colorHexes = colorDefs.map((c) => c[0]);
  const colorLabels = colorDefs.map((c) => (lang === "en" ? c[2] : c[1]));
  const primaryHex = colorHexes[0];
  const colorsLabel = colorLabels.join(", ");

  const toggleColor = (name: string) =>
    setColors((cur) => {
      if (cur.includes(name)) return cur.length > 1 ? cur.filter((x) => x !== name) : cur;
      if (cur.length >= MAX_COLORS) return cur;
      return [...cur, name];
    });

  const metalDef = metals[metal];
  const metalLabel = lang === "en" ? metalDef.en : metalDef.hr;

  // Icon bags are a fixed cut: only color, metal and charms apply.
  const sizeMod = isPremium ? 0 : sizeDef.mod;
  const insertMod = isPremium ? 0 : insertDef.mod;
  const strapMod = isPremium ? 0 : strapDef.mod;
  const charmsTotal = charms.length * CHARM_MOD;
  const total = bag.base + sizeMod + insertMod + strapMod + charmsTotal;

  const chipName = bag.chip || bag[lang];
  const showStrap = !isPremium && strap !== "bez";
  const showInsert = !isPremium && insert === "sa";

  const charmLabel = (id: CharmId) => {
    const d = charmDefs.find((c) => c.id === id)!;
    if (id === "drugo" && customCharm.trim()) return d[lang] + ": " + customCharm.trim();
    return d[lang];
  };

  const breakdown: { label: string; amt: string }[] = [];
  if (isPremium) {
    breakdown.push({ label: chipName, amt: `€${bag.base}` });
  } else {
    breakdown.push({ label: `${chipName} (${sizeDef[lang]})`, amt: `€${bag.base + sizeMod}` });
    if (strapMod) breakdown.push({ label: `${t.strapWord} — ${strapDef[lang]}`, amt: `+€${strapMod}` });
  }
  if (charmsTotal) breakdown.push({ label: `${t.charmsWord} × ${charms.length}`, amt: `+€${charmsTotal}` });

  const summaryLine = isPremium
    ? `${chipName} · ${colorsLabel} · ${t.metalWord}: ${metalLabel}`
    : `${chipName} · ${sizeDef[lang]} · ${colorsLabel} · ${t.metalWord}: ${metalLabel} · ${t.strapWord}: ${strapDef[lang]} · ${t.insertWord}: ${insertDef[lang]}`;

  const waHref = useMemo(() => {
    const lines = [t.waIntro, `• ${bag[lang]}`];
    if (!isPremium) {
      lines.push(`• ${t.waSize}: ${sizeDef[lang]}`);
      lines.push(`• ${t.waInsert}: ${insertDef[lang]}`);
      lines.push(`• ${t.waStrap}: ${strapDef[lang]}`);
    }
    lines.push(`• ${t.waYarn}: ${colorsLabel}`);
    lines.push(`• ${t.waMetal}: ${metalLabel}`);
    lines.push(`• ${t.waCharms}: ${charms.map(charmLabel).join(", ") || "—"}`);
    lines.push(`• ${t.waNote}: ${note || "—"}`);
    lines.push(`${t.waPrice}: €${total}`);
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, bagSlug, size, insert, strap, colors, metal, charms, customCharm, note, total]);

  const toggleCharm = (id: CharmId) =>
    setCharms((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  const optText = (label: string, mod: number) => (mod > 0 ? `${label} · +€${mod}` : label);

  // ---- Preview geometry (proportional to the shown size) ----
  const f = isPremium ? 1 : sizeDef.f;
  const bagW = Math.round(shape.w * f);
  const bagH = Math.round(shape.h * f);

  // Bag body fill: solid for one color, horizontal stripes for 2–3.
  const stripeGradient =
    colorHexes.length > 1
      ? `linear-gradient(180deg, ${colorHexes
          .map((c, i) => `${c} ${((i * 100) / colorHexes.length).toFixed(2)}% ${(((i + 1) * 100) / colorHexes.length).toFixed(2)}%`)
          .join(", ")})`
      : null;
  const dotLayer = "radial-gradient(circle at 4px 4px, rgba(255,255,255,0.14) 2.2px, rgba(255,255,255,0) 3.2px)";
  const bagBgImage = [dotLayer, "var(--stitch)", ...(stripeGradient ? [stripeGradient] : [])].join(", ");
  const bagBgSize = ["11px 11px", "7px 7px", "7px 7px", ...(stripeGradient ? ["100% 100%"] : [])].join(", ");

  const hasChain = !!shape.chain;
  const showAnyStrap = showStrap || hasChain;
  const chainMode = !showStrap && hasChain; // skirt chain uses the metal finish
  const strapThick = chainMode ? 5 : strapDef.tone ? 5 : 6;
  const strapStroke = chainMode ? metalDef.solid : strapDef.tone || primaryHex;
  const strapDashed = chainMode || !!strapDef.tone;
  const strapSvgW = Math.round(bagW * 0.86);
  const strapSvgH = Math.round(bagH * 0.52);
  const strapRx = (strapSvgW - strapThick) / 2;
  const strapRy = strapSvgH - strapThick / 2;
  const strapPath = `M ${strapThick / 2} ${strapSvgH} A ${strapRx} ${strapRy} 0 0 1 ${strapSvgW - strapThick / 2} ${strapSvgH}`;

  const handleThick = Math.max(7, Math.round(9 * f));
  const handleW = Math.round(bagW * 0.36);
  const handleH = Math.round(bagW * 0.22);
  const hRx = (handleW - handleThick) / 2;
  const hRy = handleH - handleThick / 2;
  const handlePath = `M ${handleThick / 2} ${handleH} A ${hRx} ${hRy} 0 0 1 ${handleW - handleThick / 2} ${handleH}`;

  const topAreaH = Math.max(shape.handle ? handleH : 0, showAnyStrap ? strapSvgH : 0) + 14;
  const fringeH = Math.round(30 * f);
  const fringeW = Math.round(bagW * 0.9);

  // Charms hang below the flap / slot so they never sit over the opening.
  const charmAnchorTop = shape.flap ? "44%" : shape.slot ? "27%" : "13%";
  const glyphSize = Math.max(13, Math.round(15 * f));

  // Hand insert sits clear of the opening slot.
  const insertTop = shape.slot ? "64%" : "50%";
  const insertH = Math.max(12, Math.round(bagH * 0.1));

  const modelChips = (group: "classic" | "premium") =>
    Object.entries(configBags)
      .filter(([, b]) => b.group === group)
      .map(([sl, b]) => (
        <button key={sl} type="button" className="chip" aria-pressed={sl === bagSlug} onClick={() => setBagSlug(sl)}>
          {b.chip || b[lang]}
        </button>
      ));

  return (
    <main style={{ background: "var(--oat)", minHeight: "100vh" }}>
      <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "24px 24px 96px" }}>
        <a href="/#kolekcija" style={{ display: "inline-block", color: "var(--ink-soft)", fontSize: 14, fontFamily: "var(--font-body)", padding: "8px 0", textDecoration: "none" }}>
          {t.back}
        </a>

        <div className="konf-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", gap: 48, marginTop: 12 }}>
          {/* Left: live preview */}
          <div className="konf-preview-col">
            <div style={{ background: "var(--cream)", borderRadius: "var(--radius-xl)", padding: "40px 40px 48px", boxShadow: "var(--shadow-card)", display: "flex", flexDirection: "column", alignItems: "center" }}>
              {/* Straps + handles */}
              <div style={{ height: topAreaH, position: "relative", width: "100%", transition: "height var(--dur-base) var(--ease-soft)" }}>
                {showAnyStrap && (
                  <svg width={strapSvgW} height={strapSvgH} viewBox={`0 0 ${strapSvgW} ${strapSvgH}`} style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", overflow: "visible" }} aria-hidden="true">
                    <path d={strapPath} fill="none" stroke={strapStroke} strokeWidth={strapThick} strokeLinecap="round" style={{ transition: "stroke var(--dur-base) var(--ease-soft)" }} />
                    {strapDashed ? (
                      <path d={strapPath} fill="none" stroke="rgba(0,0,0,0.28)" strokeWidth={strapThick} strokeLinecap="round" strokeDasharray="0.5 5.5" />
                    ) : (
                      <path d={strapPath} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={strapThick - 3} strokeLinecap="round" strokeDasharray="1 5" />
                    )}
                  </svg>
                )}
                {shape.handle && (
                  <svg width={handleW} height={handleH} viewBox={`0 0 ${handleW} ${handleH}`} style={{ position: "absolute", bottom: -2, left: "50%", transform: "translateX(-50%)", overflow: "visible" }} aria-hidden="true">
                    <path d={handlePath} fill="none" stroke={primaryHex} strokeWidth={handleThick} strokeLinecap="round" style={{ transition: "stroke var(--dur-base) var(--ease-soft)" }} />
                    <path d={handlePath} fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth={handleThick - 4} strokeLinecap="round" strokeDasharray="1 5" />
                  </svg>
                )}
              </div>

              {/* Bag body */}
              <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
                {!shape.fringe && (
                  <div style={{ position: "absolute", left: "12%", right: "12%", bottom: -12, height: 18, background: "radial-gradient(ellipse at center, rgba(51,41,31,0.22), transparent 72%)", filter: "blur(3px)", zIndex: 0 }} />
                )}
                <div
                  className="ariko-stitch"
                  style={{
                    width: bagW, height: bagH, backgroundColor: primaryHex,
                    backgroundImage: bagBgImage,
                    backgroundSize: bagBgSize,
                    borderRadius: shape.r,
                    transition: "background-color var(--dur-base) var(--ease-soft), width var(--dur-base) var(--ease-soft), height var(--dur-base) var(--ease-soft)",
                    boxShadow: "inset 0 8px 18px rgba(255,255,255,0.12), inset 0 -22px 44px rgba(0,0,0,0.12)",
                    position: "relative", overflow: "hidden", zIndex: 1,
                  }}
                >
                  {shape.flap && (
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "38%", backgroundColor: primaryHex, backgroundImage: dotLayer, backgroundSize: "11px 11px", borderRadius: "0 0 18px 18px", boxShadow: "0 4px 8px rgba(0,0,0,0.16)", transition: "background-color var(--dur-base) var(--ease-soft)" }} />
                  )}
                  {shape.pleats && (
                    <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(90deg, rgba(0,0,0,0.08) 0 2px, rgba(255,255,255,0.05) 2px 4px, transparent 4px 20px)" }} />
                  )}
                  {shape.slot && (
                    <div style={{ position: "absolute", top: "14%", left: "50%", transform: "translateX(-50%)", width: "46%", height: 14, borderRadius: 10, background: "rgba(0,0,0,0.16)", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.2)" }} />
                  )}

                  {/* Hand insert — a raised grab strap, clear of the opening */}
                  {showInsert && (
                    <div style={{ position: "absolute", top: insertTop, left: "50%", transform: "translate(-50%, -50%)", width: "46%", height: insertH, borderRadius: 999, backgroundColor: primaryHex, backgroundImage: "linear-gradient(rgba(255,255,255,0.28), rgba(0,0,0,0.16))", boxShadow: "0 4px 7px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.4)", zIndex: 2 }} />
                  )}

                  {/* Clasp — follows the metal finish */}
                  {shape.lock && (
                    <div style={{ position: "absolute", top: "38%", left: "50%", transform: "translate(-50%, -45%)", width: 16, height: 20, borderRadius: 4, background: metalDef.grad, boxShadow: `0 1px 3px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4)`, transition: "background var(--dur-base) var(--ease-soft)", zIndex: 3 }} />
                  )}

                  {/* Charms hanging on the bag front */}
                  {charms.length > 0 && (
                    <div style={{ position: "absolute", top: charmAnchorTop, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "flex-start", gap: 4, pointerEvents: "none", zIndex: 3 }}>
                      {charms.map((c, i) => (
                        <div key={c} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                          <div style={{ width: 1.5, height: 7 + (i % 3) * 6, background: metalDef.stroke, opacity: 0.8 }} />
                          <CharmGlyph id={c} color={metalDef.solid} stroke={metalDef.stroke} size={glyphSize} initial={customCharm || "A"} />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ARIKO plate — follows the metal finish */}
                  <div style={{ position: "absolute", bottom: "12%", left: "50%", transform: "translateX(-50%)", padding: "3px 10px", borderRadius: 3, background: metalDef.grad, color: metalDef.plateText, fontFamily: "var(--font-body)", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", boxShadow: "0 1px 2px rgba(0,0,0,0.2)", transition: "background var(--dur-base) var(--ease-soft), color var(--dur-base) var(--ease-soft)", zIndex: 4 }}>
                    ARIKO
                  </div>
                </div>

                {/* Fringe — individual strands, hanging below */}
                {shape.fringe && (
                  <svg width={fringeW} height={fringeH} viewBox={`0 0 ${fringeW} ${fringeH}`} style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", zIndex: 1 }} aria-hidden="true">
                    {Array.from({ length: Math.max(8, Math.round(fringeW / 6)) }).map((_, i, arr) => {
                      const x = 2 + (i * (fringeW - 4)) / (arr.length - 1);
                      const len = fringeH - 3 - (i % 3) * 4;
                      return <line key={i} x1={x} y1={0} x2={x} y2={len} stroke={primaryHex} strokeWidth={2.6} strokeLinecap="round" style={{ transition: "stroke var(--dur-base) var(--ease-soft)" }} />;
                    })}
                  </svg>
                )}
              </div>

              {/* Color chips + charm labels under the bag */}
              {(colors.length > 1 || charms.length > 0) && (
                <div style={{ marginTop: 22, display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
                  {colors.length > 1 &&
                    colorDefs.map((c, i) => (
                      <span key={`c${i}`} title={colorLabels[i]} style={{ width: 18, height: 18, borderRadius: "50%", background: c[0], boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.15)" }} />
                    ))}
                  {charms.map((c) => (
                    <Badge key={c} tone="soft">{charmLabel(c)}</Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Made examples for the selected bag — drop real photos here (replaceable) */}
            <div className="konf-examples">
              <div className="konf-examples__label">{t.examplesLabel} — {chipName}</div>
              <div className="konf-examples__grid">
                {[0, 1, 2].map((i) => (
                  <div className="konf-ex-tile" key={i}>
                    <PlaceholderTile id={`konf-ex-${bagSlug}-${i}`} label={t.examplePh} radius="var(--radius-md)" defaultSrc={exampleDefaults[bagSlug]?.[i]} />
                  </div>
                ))}
              </div>
            </div>

            {/* Summary card */}
            <div style={{ marginTop: 16, background: "var(--cream)", borderRadius: "var(--radius-lg)", border: "1px solid var(--line)", padding: "20px 22px" }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-soft)" }}>{t.total}</span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 600, color: "var(--ink)" }}>€{total}</span>
              </div>
              <div style={{ height: 1, background: "var(--line)", margin: "12px 0" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {breakdown.map((b, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 12, fontFamily: "var(--font-body)", fontSize: 13, color: "var(--ink-soft)" }}>
                    <span>{b.label}</span>
                    <span style={{ color: "var(--ink)", fontWeight: 500 }}>{b.amt}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12, fontFamily: "var(--font-body)", fontSize: 12, color: "var(--ink-soft)", lineHeight: 1.5 }}>{summaryLine}</div>
            </div>
          </div>

          {/* Right: options */}
          <div>
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 500, color: "var(--ink)", fontSize: "clamp(2rem, 3vw, 2.25rem)", letterSpacing: "var(--ls-display)", margin: "6px 0 8px", lineHeight: 1.1 }}>
              {bag[lang]}
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4, flexWrap: "wrap" }}>
              <Badge tone="accent" accent={bag.accent}>{t.from} €{bag.base}</Badge>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--ink-soft)" }}>{t.madeToOrder}</span>
            </div>

            <div style={{ height: 1, background: "var(--line)", margin: "24px 0" }} />

            <div className="option-group">
              <div className="option-group__label">{t.model}</div>
              <div className="option-group__sublabel">{t.classics}</div>
              <div className="option-row" style={{ marginBottom: 14 }}>{modelChips("classic")}</div>
              <div className="option-group__sublabel">{t.icons}</div>
              <div className="option-row">{modelChips("premium")}</div>
            </div>

            {isPremium && (
              <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--ink-soft)", background: "var(--pale-ochre)", borderRadius: "var(--radius-md)", padding: "12px 14px", margin: "0 0 24px", lineHeight: 1.5 }}>
                {t.iconNote}
              </p>
            )}

            {!isPremium && (
              <>
                <div className="option-group">
                  <div className="option-group__label">{t.size}</div>
                  <div className="option-row">
                    {sizes.map((o) => (
                      <button key={o.id} type="button" className="chip" aria-pressed={size === o.id} onClick={() => setSize(o.id)}>
                        {optText(o[lang], o.mod)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="option-group">
                  <div className="option-group__label">{t.insert}</div>
                  <div className="option-row">
                    {inserts.map((o) => (
                      <button key={o.id} type="button" className="chip" aria-pressed={insert === o.id} onClick={() => setInsert(o.id)}>
                        {o[lang]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="option-group">
                  <div className="option-group__label">{t.strap}</div>
                  <div className="option-row">
                    {straps.map((o) => (
                      <button key={o.id} type="button" className="chip" aria-pressed={strap === o.id} onClick={() => setStrap(o.id)}>
                        {optText(o[lang], o.mod)}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="option-group">
              <div className="option-group__label">
                {t.yarn} <span style={{ fontWeight: 400, color: "var(--ink-soft)" }}>({t.yarnHint})</span> — {colorsLabel}
              </div>
              <div className="option-row">
                {yarns.map(([hex, hr, en]) => {
                  const name = lang === "en" ? en : hr;
                  const selected = colors.includes(hr);
                  const atMax = colors.length >= MAX_COLORS && !selected;
                  return (
                    <button
                      key={hr}
                      type="button"
                      className="swatch"
                      title={name}
                      aria-label={name}
                      aria-pressed={selected}
                      onClick={() => toggleColor(hr)}
                      style={{ background: hex, opacity: atMax ? 0.4 : 1 }}
                    />
                  );
                })}
              </div>
            </div>

            <div className="option-group">
              <div className="option-group__label">{t.metal}</div>
              <div className="option-row">
                {(Object.keys(metals) as MetalId[]).map((m) => (
                  <button key={m} type="button" className="chip" aria-pressed={metal === m} onClick={() => setMetal(m)} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 14, height: 14, borderRadius: "50%", background: metals[m].grad, boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.15)" }} />
                    {m === "gold" ? t.metalGold : t.metalSilver}
                  </button>
                ))}
              </div>
            </div>

            <div className="option-group">
              <div className="option-group__label">{t.charms}</div>
              <div className="option-row">
                {charmDefs.map((c) => (
                  <button key={c.id} type="button" className="chip" aria-pressed={charms.includes(c.id)} onClick={() => toggleCharm(c.id)}>
                    {c[lang]}
                  </button>
                ))}
              </div>
              {charms.includes("drugo") && (
                <div style={{ marginTop: 12, maxWidth: 420 }}>
                  <label className="field">
                    <span className="field__label">{t.customCharmLabel}</span>
                    <input type="text" value={customCharm} onChange={(e) => setCustomCharm(e.target.value.slice(0, 60))} placeholder={t.customCharmPh} />
                  </label>
                </div>
              )}
            </div>

            <div className="option-group" style={{ marginBottom: 28 }}>
              <div className="option-group__label">{t.wishes}</div>
              <label className="field">
                <textarea rows={3} maxLength={NOTE_MAX} value={note} onChange={(e) => setNote(e.target.value.slice(0, NOTE_MAX))} placeholder={t.wishesPh} />
              </label>
              <span style={{ display: "block", textAlign: "right", fontSize: "var(--text-xs)", color: "var(--ink-soft)", marginTop: 4 }}>
                {note.length}/{NOTE_MAX}
              </span>
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              <Button accent={bag.accent} size="lg" onClick={() => setStripeNote(true)}>
                {t.order} · €{total}
              </Button>
              <LinkButton href={waHref} target="_blank" rel="noreferrer" variant="secondary" size="lg">
                {t.whatsapp}
              </LinkButton>
            </div>
            {stripeNote && (
              <div style={{ marginTop: 14, padding: "14px 16px", background: "var(--pale-ochre)", borderRadius: "var(--radius-md)", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.6, maxWidth: 520 }}>
                <b style={{ color: "var(--ink)" }}>{t.protoLabel}</b> {t.stripeNote}
              </div>
            )}
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--ink-soft)", margin: "16px 0 0" }}>{t.orLine}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
