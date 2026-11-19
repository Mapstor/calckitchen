// Recipe scaling for /recipe-scaler. research/data-sources.csv rows:
//   NIST-SI-B9: US cup, tablespoon and teaspoon (units.ts holds the exact definitions: cup = 16 tbsp, tbsp = 3 tsp).
//   USDA-FDC-EGG: USDA FoodData Central, Egg, whole, raw, fresh (SR Legacy 171287): 1 small 38 g, medium 44 g, large 50 g,
//     extra large 56 g, jumbo 63 g; 1 cup = 4.86 large eggs = 243 g.
// Snapshot: research/sources/scaler.json · check: scripts/check-scaler-data.mjs
import { UNITS } from "./units";

export const SRC_SCALE = {
  egg: "https://fdc.nal.usda.gov/food-details/171287/nutrients",
  nist: "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9",
};

/** USDA FoodData Central 171287: whole egg out of the shell, grams per egg */
export const EGG_G = { small: 38, medium: 44, large: 50, "extra large": 56, jumbo: 63 } as const;
export type EggSize = keyof typeof EGG_G;

export const TBSP_PER_CUP = Math.round(UNITS.cup.base / UNITS.tbsp.base); // 16
export const TSP_PER_TBSP = Math.round(UNITS.tbsp.base / UNITS.tsp.base); // 3
const TSP_PER_CUP = TBSP_PER_CUP * TSP_PER_TBSP; // 48

const VULGAR: Record<string, number> = { "½": 1 / 2, "⅓": 1 / 3, "⅔": 2 / 3, "¼": 1 / 4, "¾": 3 / 4, "⅛": 1 / 8, "⅜": 3 / 8, "⅝": 5 / 8, "⅞": 7 / 8, "⅙": 1 / 6, "⅚": 5 / 6 };
const V = Object.keys(VULGAR).join("");
const TOKEN = `(?:\\d+\\s+\\d+\\/\\d+|\\d+\\/\\d+|\\d+\\s*[${V}]|\\d+(?:\\.\\d+)?|[${V}])`;
const LEAD = new RegExp(`^(${TOKEN})(?:\\s*(?:-|–|to)\\s*(${TOKEN}))?\\s*`);

export function parseNum(t: string): number | null {
  const s = t.trim();
  let m = s.match(/^(\d+)\s+(\d+)\/(\d+)$/);
  if (m) return +m[3] ? +m[1] + +m[2] / +m[3] : null;
  m = s.match(/^(\d+)\/(\d+)$/);
  if (m) return +m[2] ? +m[1] / +m[2] : null;
  m = s.match(new RegExp(`^(\\d+)\\s*([${V}])$`));
  if (m) return +m[1] + VULGAR[m[2]];
  if (VULGAR[s] !== undefined) return VULGAR[s];
  return /^\d+(?:\.\d+)?$/.test(s) ? Number(s) : null;
}

export type Unit = "cup" | "tbsp" | "tsp" | "fl oz" | "oz" | "lb" | "g" | "kg" | "ml" | "l" | "";
const UNIT_RE: [Unit, RegExp][] = [
  ["fl oz", /^(?:fl\.?\s*oz\.?|fluid\s+ounces?)(?=\s|$|,)/i],
  ["cup", /^(?:cups?|c\.?)(?=\s|$|,)/i],
  ["tbsp", /^(?:[Tt]ablespoons?|TABLESPOONS?|[Tt]bsps?\.?|TBSPS?|[Tt]bs\.?|[Tt]bl\.?|T)(?=\s|$|,)/],
  ["tsp", /^(?:[Tt]easpoons?|TEASPOONS?|[Tt]sps?\.?|TSPS?|t)(?=\s|$|,)/],
  ["oz", /^(?:ounces?|oz\.?)(?=\s|$|,)/i],
  ["lb", /^(?:pounds?|lbs?\.?)(?=\s|$|,)/i],
  ["kg", /^(?:kilograms?|kilos?|kg)(?=\s|$|,)/i],
  ["g", /^(?:grams?|g)(?=\s|$|,)/i],
  ["ml", /^(?:milliliters?|millilitres?|ml)(?=\s|$|,)/i],
  ["l", /^(?:liters?|litres?|l)(?=\s|$|,)/i],
];

export type Line = { text: string; q: number | null; q2: number | null; unit: Unit; unitText: string; rest: string };

export function parseLine(text: string): Line {
  const t = text.trim();
  const m = t.match(LEAD);
  if (!m) return { text: t, q: null, q2: null, unit: "", unitText: "", rest: t };
  const q = parseNum(m[1]);
  const q2 = m[2] ? parseNum(m[2]) : null;
  let rest = t.slice(m[0].length);
  let unit: Unit = "";
  let unitText = "";
  for (const [u, re] of UNIT_RE) {
    const um = rest.match(re);
    if (um) {
      unit = u;
      unitText = um[0];
      rest = rest.slice(um[0].length).trim();
      break;
    }
  }
  return { text: t, q, q2, unit, unitText, rest };
}

const GLYPHS: [number, string][] = [
  [1 / 8, "⅛"],
  [1 / 6, "⅙"],
  [1 / 4, "¼"],
  [1 / 3, "⅓"],
  [3 / 8, "⅜"],
  [1 / 2, "½"],
  [5 / 8, "⅝"],
  [2 / 3, "⅔"],
  [3 / 4, "¾"],
  [5 / 6, "⅚"],
  [7 / 8, "⅞"],
];

/** nearest eighth or third as a kitchen fraction (1½, ⅔); 2 decimals when no such fraction is within 1% */
export function kitchen(x: number): string {
  let whole = Math.floor(x);
  const f = x - whole;
  let best: [number, string] = [0, ""];
  for (const g of [[0, ""] as [number, string], ...GLYPHS, [1, ""] as [number, string]]) if (Math.abs(g[0] - f) < Math.abs(best[0] - f)) best = g;
  if (Math.abs(best[0] - f) > Math.max(0.01 * x, 0.004)) return (Math.round(x * 100) / 100).toString();
  if (best[0] === 1) whole += 1;
  if (!best[1]) return String(whole);
  return whole ? `${whole}${best[1]}` : best[1];
}

const CUP_PARTS: [number, string][] = [
  [36, "¾"],
  [32, "⅔"],
  [24, "½"],
  [16, "⅓"],
  [12, "¼"],
];
const TSP_PARTS: [number, string][] = [
  [7 / 8, "⅞"],
  [3 / 4, "¾"],
  [2 / 3, "⅔"],
  [1 / 2, "½"],
  [3 / 8, "⅜"],
  [1 / 3, "⅓"],
  [1 / 4, "¼"],
  [1 / 8, "⅛"],
];

/** teaspoons as the fewest standard scoops: whole cups and one cup measure (¼ ⅓ ½ ⅔ ¾), then tablespoons, then teaspoons to the nearest ⅛;
 * ties go to the version with fewer teaspoon scoops */
export function measure(tsp: number): string {
  const t = tsp + 1e-9;
  const whole = t >= 12 ? Math.floor(t / TSP_PER_CUP) : 0;
  const options: { parts: string[]; scoops: number; tspScoops: number }[] = [];
  for (const part of [null, ...CUP_PARTS]) {
    let rem = t - whole * TSP_PER_CUP;
    if (part) {
      if (part[0] > rem) continue;
      rem -= part[0];
    }
    const parts: string[] = [];
    const n = whole && part ? `${whole}${part[1]}` : whole ? `${whole}` : part ? part[1] : "";
    if (n) parts.push(`${n} ${whole > 1 || (whole === 1 && part) ? "cups" : "cup"}`);
    const tb = Math.floor(rem / TSP_PER_TBSP);
    if (tb) {
      parts.push(`${tb} tbsp`);
      rem -= tb * TSP_PER_TBSP;
    }
    const wholeTsp = Math.floor(rem);
    const frac = rem - wholeTsp;
    const fp = TSP_PARTS.find(([v]) => Math.abs(v - frac) < 1 / 16) ?? (frac > 15 / 16 ? ([1, ""] as [number, string]) : null);
    const tspN = wholeTsp + (fp && fp[0] === 1 ? 1 : 0);
    const glyph = fp && fp[0] !== 1 ? fp[1] : "";
    if (tspN || glyph) parts.push(`${tspN ? tspN : ""}${glyph} tsp`);
    const tspScoops = tspN + (glyph ? 1 : 0);
    options.push({ parts, scoops: whole + (part ? 1 : 0) + tb + tspScoops, tspScoops });
  }
  const best = options.filter((o) => o.parts.length).sort((a, b) => a.scoops - b.scoops || a.tspScoops - b.tspScoops)[0];
  return best ? best.parts.join(" + ") : "a pinch (under ⅛ tsp)";
}

export const toTsp = (q: number, unit: "cup" | "tbsp" | "tsp") => q * (unit === "cup" ? TSP_PER_CUP : unit === "tbsp" ? TSP_PER_TBSP : 1);

const dec = (x: number, dp: number) => (Math.round(x * 10 ** dp) / 10 ** dp).toString();

/** unit as printed after a scaled amount */
export const unitLabel = (unit: Unit, n: number) => (unit === "cup" ? (n > 1 ? "cups" : "cup") : unit === "l" ? "L" : unit);

/** a scaled amount in its own unit, kitchen style */
export function amountText(q: number, unit: Unit): string {
  switch (unit) {
    case "g":
    case "ml":
      return q < 10 ? dec(q, 1) : Math.round(q).toLocaleString("en-US");
    case "kg":
    case "l":
      return dec(q, 3);
    case "oz":
    case "fl oz":
    case "lb":
      return dec(q, 2);
    default:
      return kitchen(q);
  }
}

const EGG_RE = /^(?:(small|medium|large|extra[- ]large|jumbo)\s+)?(?:whole\s+)?eggs?\b(?!\s*(?:yolks?|whites?|noodles?|wash|replacer|substitute))/i;

/** egg size from the ingredient text (none given: large), or null when the line isn't whole eggs */
export function eggSize(rest: string): EggSize | null {
  const m = rest.match(EGG_RE);
  if (!m) return null;
  const s = (m[1] || "large").toLowerCase().replace("-", " ") as EggSize;
  return s in EGG_G ? s : "large";
}

export type Scaled = { amount: string; note: string; scaled: boolean };

/** one ingredient line scaled by factor */
export function scaleLine(line: Line, factor: number): Scaled {
  if (line.q === null) return { amount: "", note: "", scaled: false };
  const a = line.q * factor;
  const b = line.q2 !== null ? line.q2 * factor : null;
  const top = b ?? a;
  const u = line.unit ? ` ${unitLabel(line.unit, top)}` : "";
  if (b !== null) return { amount: `${amountText(a, line.unit)}–${amountText(b, line.unit)}${u}`, note: "", scaled: true };
  if (line.unit === "cup" || line.unit === "tbsp" || line.unit === "tsp") {
    const own = `${kitchen(a)} ${unitLabel(line.unit, a)}`;
    const m = measure(toTsp(a, line.unit));
    return { amount: m, note: m === own ? "" : `= ${own}`, scaled: true };
  }
  const egg = line.unit === "" ? eggSize(line.rest) : null;
  if (egg) {
    const whole = Math.abs(a - Math.round(a)) < 1e-9;
    return { amount: kitchen(a), note: whole ? "" : `${dec(a * EGG_G[egg], 1)} g beaten egg (${egg} eggs, USDA weight)`, scaled: true };
  }
  return { amount: `${amountText(a, line.unit)}${u}`, note: "", scaled: true };
}
