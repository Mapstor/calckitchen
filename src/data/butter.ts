// Butter measures for /butter-converter. research/data-sources.csv rows:
//   LOL-BUTTER: Land O'Lakes, "Cooking Measurements & Abbreviations": one stick = 1/2 cup = 8 tablespoons; a half stick = 1/4 cup = 4 tbsp;
//     1 pound = 4 sticks; each wrapper mark is one tablespoon; its table puts 1 stick at 1/4 lb and 4 oz.
//   USDA-FDC-BUTTER: USDA FoodData Central, Butter, salted (SR Legacy, FDC ID 173410): portions and nutrients as FDC displays them.
//   NIST-SI-B9: exact US customary units through units.ts (1 oz = 28.349523125 g; cup = 16 tbsp; tbsp = 3 tsp).
// Snapshot: research/sources/butter.json · check: scripts/check-butter-data.mjs
import { UNITS } from "./units";

export const SRC_BUTTER = {
  lol: "https://www.landolakes.com/kitchen-reference/measurements-abbreviations/",
  fdc: "https://fdc.nal.usda.gov/food-details/173410/nutrients",
  nist: "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9",
};

/** Land O'Lakes: one stick = 1/2 cup = 8 tablespoons = 1/4 pound = 4 ounces; 4 sticks = 1 pound */
export const STICK = { cup: 1 / 2, tbsp: 8, lb: 1 / 4, oz: 4, perLb: 4 } as const;

/** a stick's weight in grams: 4 oz × 28.349523125 g = 113.398 g */
export const STICK_G = STICK.oz * UNITS.oz.base;

export type ButterUnit = "stick" | "cup" | "tbsp" | "tsp" | "g" | "oz" | "lb";

export const BUTTER_UNITS: { key: ButterUnit; label: string; one: string; many: string }[] = [
  { key: "stick", label: "sticks", one: "stick", many: "sticks" },
  { key: "cup", label: "cups", one: "cup", many: "cups" },
  { key: "tbsp", label: "tablespoons", one: "tbsp", many: "tbsp" },
  { key: "tsp", label: "teaspoons", one: "tsp", many: "tsp" },
  { key: "g", label: "grams", one: "g", many: "g" },
  { key: "oz", label: "ounces (weight)", one: "oz", many: "oz" },
  { key: "lb", label: "pounds", one: "lb", many: "lb" },
];

const TBSP_PER_CUP = UNITS.cup.base / UNITS.tbsp.base; // 16
const TSP_PER_TBSP = UNITS.tbsp.base / UNITS.tsp.base; // 3

/** sticks in one of each unit */
const STICKS_PER: Record<ButterUnit, number> = {
  stick: 1,
  cup: 1 / STICK.cup,
  tbsp: 1 / STICK.tbsp,
  tsp: 1 / (STICK.tbsp * TSP_PER_TBSP),
  g: 1 / STICK_G,
  oz: 1 / STICK.oz,
  lb: STICK.perLb,
};

export const toSticks = (amount: number, unit: ButterUnit) => amount * STICKS_PER[unit];
export const fromSticks = (sticks: number, unit: ButterUnit) => sticks / STICKS_PER[unit];

export const CHECK_UNITS = { TBSP_PER_CUP, TSP_PER_TBSP };

const GLYPHS: [number, string][] = [
  [1 / 16, "1⁄16"],
  [1 / 8, "⅛"],
  [1 / 6, "⅙"],
  [1 / 4, "¼"],
  [1 / 3, "⅓"],
  [3 / 8, "⅜"],
  [1 / 2, "½"],
  [5 / 8, "⅝"],
  [2 / 3, "⅔"],
  [3 / 4, "¾"],
  [7 / 8, "⅞"],
];

/** kitchen number: an exact common fraction as a glyph (½, 1⅓), anything else to dp decimals without trailing zeros */
export function amt(x: number, dp: number): string {
  const whole = Math.floor(x + 1e-9);
  const f = x - whole;
  if (Math.abs(f) < 1e-9) return String(whole);
  const g = GLYPHS.find(([v]) => Math.abs(v - f) < 1e-9);
  if (g) return whole ? `${whole}${g[1]}` : g[1];
  return (Math.round(x * 10 ** dp) / 10 ** dp).toString();
}

/** singular for exactly 1 or a fraction below 1 shown as a glyph (½ cup, ⅜ stick); plural otherwise (0.22 sticks, 1½ sticks) */
export const unitWord = (shown: string, one: string, many: string) => (shown === "1" || GLYPHS.some(([, g]) => g === shown) ? one : many);

/** grams: one decimal under 100 g, whole grams from 100 g */
export const grams = (g: number) => (g < 100 ? (Math.round(g * 10) / 10).toString() : Math.round(g).toString());

/** where to cut on a wrapper marked in tablespoons */
export function cutText(sticks: number): string {
  let whole = Math.floor(sticks + 1e-9);
  let marks = Math.round((sticks - whole) * STICK.tbsp * 10) / 10;
  if (marks >= STICK.tbsp) {
    whole += 1;
    marks = 0;
  }
  const m = `${amt(marks, 1)} tablespoon ${marks === 1 ? "mark" : "marks"}`;
  if (whole === 0) return marks < 1 ? "Less than one tablespoon mark" : `Cut at ${m}`;
  if (marks === 0) return `${whole} whole ${whole === 1 ? "stick" : "sticks"}`;
  return `${whole} ${whole === 1 ? "stick" : "sticks"} + ${m}`;
}

/** conversion chart rows, in sticks (Land O'Lakes' rows plus 3 sticks) */
export const CHART_STICKS = [1 / 8, 1 / 2, 2 / 3, 1, 3 / 2, 2, 3, 4];

/** grams to sticks rows for recipes that weigh butter */
export const CHART_GRAMS = [25, 50, 75, 100, 125, 150, 200, 250, 500];

/** USDA FoodData Central, Butter, salted (SR Legacy 173410): its measures and values as displayed */
export const FDC_BUTTER: { measure: string; g: number; kcal: number; fat: number; sat: number }[] = [
  { measure: "1 pat (1 in. square, ⅓ in. high)", g: 5, kcal: 35.8, fat: 4.06, sat: 2.57 },
  { measure: "1 tablespoon", g: 14.2, kcal: 102, fat: 11.5, sat: 7.3 },
  { measure: "1 stick", g: 113, kcal: 810, fat: 91.6, sat: 58.1 },
  { measure: "1 cup", g: 227, kcal: 1630, fat: 184, sat: 117 },
  { measure: "100 grams", g: 100, kcal: 717, fat: 81.1, sat: 51.4 },
];
