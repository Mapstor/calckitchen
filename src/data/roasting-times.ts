// Roasting and cooking times. Every figure traces to research/data-sources.csv (FSGOV-ROAST, FSGOV-TEMP).
// Source: FoodSafety.gov "Meat and Poultry Roasting Charts" (date last reviewed 2023-09-21), read from
// https://www.foodsafety.gov/print/pdf/node/13. Checked by scripts/check-roast-data.mjs against research/sources/roasting-times.json.
// Left out: the chart's lamb leg bone-in 7 to 9 lb row (10 to 15 min/lb), which gives a shorter total time than a 7-lb leg in the 5 to 7 lb row.

export type Kind = "beef" | "lamb" | "pork" | "veal" | "ham" | "poultry";

export type RoastRow = {
  id: string;
  kind: Kind;
  /** section of the source chart */
  section: "red" | "ham-raw" | "ham-cooked" | "ham-fresh" | "poultry";
  name: string;
  /** weight range in lb; null when the chart gives none */
  lbLo: number | null;
  lbHi: number | null;
  /** weight shown as the chart writes it, e.g. "4 to 6 lb", "6 to 8 oz" */
  weightText: string;
  ovenLo: number;
  ovenHi: number;
  /** minutes per pound */
  perLbLo?: number;
  perLbHi?: number;
  /** total minutes, independent of weight */
  totalLo?: number;
  totalHi?: number;
  /** may be stuffed (poultry chart: add 15 to 30 minutes) */
  stuffable?: boolean;
};

export const ROASTS: RoastRow[] = [
  { id: "beef-rib-bone", kind: "beef", section: "red", name: "Rib roast, bone-in", lbLo: 4, lbHi: 6, weightText: "4 to 6 lb", ovenLo: 325, ovenHi: 325, perLbLo: 23, perLbHi: 25 },
  { id: "beef-rib-boneless", kind: "beef", section: "red", name: "Rib roast, boneless", lbLo: 4, lbHi: 6, weightText: "4 to 6 lb", ovenLo: 325, ovenHi: 325, perLbLo: 28, perLbHi: 33 },
  { id: "beef-round", kind: "beef", section: "red", name: "Round or rump roast", lbLo: 2.5, lbHi: 4, weightText: "2½ to 4 lb", ovenLo: 325, ovenHi: 325, perLbLo: 30, perLbHi: 35 },
  { id: "beef-tenderloin", kind: "beef", section: "red", name: "Tenderloin roast, whole", lbLo: 4, lbHi: 6, weightText: "4 to 6 lb", ovenLo: 425, ovenHi: 425, totalLo: 45, totalHi: 60 },
  { id: "lamb-leg-bone", kind: "lamb", section: "red", name: "Leg, bone-in", lbLo: 5, lbHi: 7, weightText: "5 to 7 lb", ovenLo: 325, ovenHi: 325, perLbLo: 20, perLbHi: 25 },
  { id: "lamb-leg-boneless", kind: "lamb", section: "red", name: "Leg, boneless, rolled", lbLo: 4, lbHi: 7, weightText: "4 to 7 lb", ovenLo: 325, ovenHi: 325, perLbLo: 25, perLbHi: 30 },
  { id: "lamb-shoulder", kind: "lamb", section: "red", name: "Shoulder roast", lbLo: 3, lbHi: 4, weightText: "3 to 4 lb", ovenLo: 325, ovenHi: 325, perLbLo: 30, perLbHi: 35 },
  { id: "pork-loin", kind: "pork", section: "red", name: "Loin roast, bone-in or boneless", lbLo: 2, lbHi: 5, weightText: "2 to 5 lb", ovenLo: 350, ovenHi: 350, perLbLo: 20, perLbHi: 20 },
  { id: "pork-crown", kind: "pork", section: "red", name: "Crown roast", lbLo: 10, lbHi: 10, weightText: "10 lb", ovenLo: 350, ovenHi: 350, perLbLo: 12, perLbHi: 12 },
  { id: "pork-tenderloin", kind: "pork", section: "red", name: "Tenderloin", lbLo: 0.5, lbHi: 1.5, weightText: "½ to 1½ lb", ovenLo: 425, ovenHi: 450, totalLo: 20, totalHi: 27 },
  { id: "pork-butt", kind: "pork", section: "red", name: "Boston butt", lbLo: 3, lbHi: 6, weightText: "3 to 6 lb", ovenLo: 350, ovenHi: 350, perLbLo: 45, perLbHi: 45 },
  { id: "pork-ribs", kind: "pork", section: "red", name: "Ribs", lbLo: 2, lbHi: 4, weightText: "2 to 4 lb", ovenLo: 350, ovenHi: 350, totalLo: 90, totalHi: 120 },
  { id: "veal-rib", kind: "veal", section: "red", name: "Rib roast", lbLo: 4, lbHi: 5, weightText: "4 to 5 lb", ovenLo: 325, ovenHi: 325, perLbLo: 25, perLbHi: 27 },
  { id: "veal-loin", kind: "veal", section: "red", name: "Loin", lbLo: 3, lbHi: 4, weightText: "3 to 4 lb", ovenLo: 325, ovenHi: 325, perLbLo: 34, perLbHi: 36 },
  { id: "ham-raw-whole", kind: "ham", section: "ham-raw", name: "Smoked, cook before eating: whole, bone-in", lbLo: 10, lbHi: 14, weightText: "10 to 14 lb", ovenLo: 325, ovenHi: 325, perLbLo: 18, perLbHi: 20 },
  { id: "ham-raw-half", kind: "ham", section: "ham-raw", name: "Smoked, cook before eating: half, bone-in", lbLo: 5, lbHi: 7, weightText: "5 to 7 lb", ovenLo: 325, ovenHi: 325, perLbLo: 22, perLbHi: 25 },
  { id: "ham-raw-shank", kind: "ham", section: "ham-raw", name: "Smoked, cook before eating: shank or butt portion, bone-in", lbLo: 3, lbHi: 4, weightText: "3 to 4 lb", ovenLo: 325, ovenHi: 325, perLbLo: 35, perLbHi: 40 },
  { id: "ham-raw-picnic", kind: "ham", section: "ham-raw", name: "Smoked, cook before eating: arm picnic shoulder, boneless", lbLo: 5, lbHi: 8, weightText: "5 to 8 lb", ovenLo: 325, ovenHi: 325, perLbLo: 30, perLbHi: 35 },
  { id: "ham-raw-roll", kind: "ham", section: "ham-raw", name: "Smoked, cook before eating: shoulder roll (butt), boneless", lbLo: 2, lbHi: 4, weightText: "2 to 4 lb", ovenLo: 325, ovenHi: 325, perLbLo: 35, perLbHi: 40 },
  { id: "ham-cooked-whole", kind: "ham", section: "ham-cooked", name: "Smoked, cooked, to reheat: whole, bone-in", lbLo: 10, lbHi: 14, weightText: "10 to 14 lb", ovenLo: 325, ovenHi: 325, perLbLo: 15, perLbHi: 18 },
  { id: "ham-cooked-half", kind: "ham", section: "ham-cooked", name: "Smoked, cooked, to reheat: half, bone-in", lbLo: 5, lbHi: 7, weightText: "5 to 7 lb", ovenLo: 325, ovenHi: 325, perLbLo: 18, perLbHi: 24 },
  { id: "ham-cooked-picnic", kind: "ham", section: "ham-cooked", name: "Smoked, cooked, to reheat: arm picnic shoulder, boneless", lbLo: 5, lbHi: 8, weightText: "5 to 8 lb", ovenLo: 325, ovenHi: 325, perLbLo: 25, perLbHi: 30 },
  { id: "ham-cooked-canned", kind: "ham", section: "ham-cooked", name: "Smoked, cooked, to reheat: canned, boneless", lbLo: 3, lbHi: 10, weightText: "3 to 10 lb", ovenLo: 325, ovenHi: 325, perLbLo: 15, perLbHi: 20 },
  { id: "ham-cooked-vacuum", kind: "ham", section: "ham-cooked", name: "Smoked, cooked, to reheat: vacuum packed, boneless", lbLo: 6, lbHi: 12, weightText: "6 to 12 lb", ovenLo: 325, ovenHi: 325, perLbLo: 10, perLbHi: 15 },
  { id: "ham-cooked-spiral", kind: "ham", section: "ham-cooked", name: "Smoked, cooked, to reheat: spiral cut, whole or half", lbLo: 7, lbHi: 9, weightText: "7 to 9 lb", ovenLo: 325, ovenHi: 325, perLbLo: 10, perLbHi: 18 },
  { id: "ham-fresh-whole", kind: "ham", section: "ham-fresh", name: "Fresh, uncooked: whole leg, bone-in", lbLo: 12, lbHi: 16, weightText: "12 to 16 lb", ovenLo: 325, ovenHi: 325, perLbLo: 22, perLbHi: 26 },
  { id: "ham-fresh-boneless", kind: "ham", section: "ham-fresh", name: "Fresh, uncooked: whole leg, boneless", lbLo: 10, lbHi: 14, weightText: "10 to 14 lb", ovenLo: 325, ovenHi: 325, perLbLo: 24, perLbHi: 28 },
  { id: "ham-fresh-half", kind: "ham", section: "ham-fresh", name: "Fresh, uncooked: half, bone-in", lbLo: 5, lbHi: 8, weightText: "5 to 8 lb", ovenLo: 325, ovenHi: 325, perLbLo: 35, perLbHi: 40 },
  { id: "chicken-3-4", kind: "poultry", section: "poultry", name: "Chicken, whole", lbLo: 3, lbHi: 4, weightText: "3 to 4 lb", ovenLo: 350, ovenHi: 350, totalLo: 75, totalHi: 90, stuffable: true },
  { id: "chicken-5-7", kind: "poultry", section: "poultry", name: "Chicken, whole", lbLo: 5, lbHi: 7, weightText: "5 to 7 lb", ovenLo: 350, ovenHi: 350, totalLo: 120, totalHi: 135, stuffable: true },
  { id: "chicken-breast-bone", kind: "poultry", section: "poultry", name: "Chicken breast halves, bone-in", lbLo: null, lbHi: null, weightText: "6 to 8 oz each", ovenLo: 350, ovenHi: 350, totalLo: 30, totalHi: 40 },
  { id: "chicken-breast-boneless", kind: "poultry", section: "poultry", name: "Chicken breast halves, boneless", lbLo: null, lbHi: null, weightText: "4 oz each", ovenLo: 350, ovenHi: 350, totalLo: 20, totalHi: 30 },
  { id: "capon", kind: "poultry", section: "poultry", name: "Capon, whole", lbLo: 4, lbHi: 8, weightText: "4 to 8 lb", ovenLo: 350, ovenHi: 350, totalLo: 120, totalHi: 180, stuffable: true },
  { id: "cornish-hen", kind: "poultry", section: "poultry", name: "Cornish hen, whole", lbLo: null, lbHi: null, weightText: "18 to 24 oz", ovenLo: 350, ovenHi: 350, totalLo: 50, totalHi: 60, stuffable: true },
  { id: "duck-whole", kind: "poultry", section: "poultry", name: "Duck, whole (do not stuff)", lbLo: 4, lbHi: 6, weightText: "4 to 6 lb", ovenLo: 350, ovenHi: 350, perLbLo: 30, perLbHi: 35 },
  { id: "duck-legs", kind: "poultry", section: "poultry", name: "Duck legs or thighs", lbLo: null, lbHi: null, weightText: "Any", ovenLo: 325, ovenHi: 325, totalLo: 75, totalHi: 90 },
  { id: "goose-whole", kind: "poultry", section: "poultry", name: "Young goose, whole", lbLo: 8, lbHi: 12, weightText: "8 to 12 lb", ovenLo: 325, ovenHi: 325, totalLo: 150, totalHi: 180, stuffable: true },
  { id: "goose-pieces", kind: "poultry", section: "poultry", name: "Young goose, pieces or cut up", lbLo: null, lbHi: null, weightText: "Any", ovenLo: 325, ovenHi: 325, totalLo: 120, totalHi: 120 },
];

/** Poultry chart: add 15 to 30 minutes for stuffed birds. */
export const STUFFED_ADD = { lo: 15, hi: 30 };

/** Done-when per chart section (FoodSafety.gov roasting charts; safe minimum chart for ham reheat). */
export const DONE: Record<RoastRow["section"], { f: number; c: number; restMin: number; alt?: { f: number; c: number } }> = {
  red: { f: 145, c: 63, restMin: 3 },
  "ham-raw": { f: 145, c: 63, restMin: 3 },
  "ham-fresh": { f: 145, c: 63, restMin: 3 },
  "ham-cooked": { f: 165, c: 74, restMin: 0, alt: { f: 140, c: 60 } },
  poultry: { f: 165, c: 74, restMin: 0 },
};

export const KINDS: { key: Kind; label: string }[] = [
  { key: "beef", label: "Beef" },
  { key: "lamb", label: "Lamb" },
  { key: "pork", label: "Pork" },
  { key: "veal", label: "Veal" },
  { key: "ham", label: "Ham" },
  { key: "poultry", label: "Chicken, duck, goose" },
];

/** "115 to 125 minutes" style range in hours and minutes: 115 -> "1 hr 55 min". */
export const hm = (min: number) => {
  const m = Math.round(min);
  const h = Math.floor(m / 60);
  const r = m % 60;
  if (!h) return `${r} min`;
  return r ? `${h} hr ${r} min` : `${h} hr`;
};

/** Time range for a row at a weight in lb; null when the weight is outside the chart's weight range for that row. */
export function roastTime(row: RoastRow, lb: number, stuffed: boolean): { lo: number; hi: number } | null {
  if (row.lbLo !== null && row.lbHi !== null && (lb < row.lbLo || lb > row.lbHi)) return null;
  let lo: number;
  let hi: number;
  if (row.totalLo !== undefined && row.totalHi !== undefined) {
    lo = row.totalLo;
    hi = row.totalHi;
  } else {
    lo = lb * (row.perLbLo ?? 0);
    hi = lb * (row.perLbHi ?? 0);
  }
  if (stuffed && row.stuffable) {
    lo += STUFFED_ADD.lo;
    hi += STUFFED_ADD.hi;
  }
  return { lo: Math.round(lo), hi: Math.round(hi) };
}

export const SRC_ROAST = {
  chart: "https://www.foodsafety.gov/food-safety-charts/meat-poultry-charts",
  temps: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures",
};
