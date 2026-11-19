// Slow cooker conversion. Every figure traces to research/data-sources.csv (CROCKPOT-3850, FSIS-SLOW).
// Crock-Pot 3850 instruction manual, "Guide to Adapting Recipes" (via ManualsLib): if the recipe says 15-30 min, cook 4-6 h
//   on LOW or 1 1/2-2 h on HIGH; 35-45 min: 6-10 h LOW or 3-4 h HIGH; 50 min-3 h: 8-18 h LOW or 4-6 h HIGH. Most uncooked
//   meat and vegetable combinations need at least 8 hours on LOW. Milk, sour cream or cream go in during the last hour.
// USDA FSIS, Slow Cookers and Food Safety: thaw meat and poultry first; fill half to two-thirds full; vegetables in first;
//   keep the lid on except to stir or check.
// Checked by scripts/check-slowcooker-data.mjs against research/sources/slow-cooker.json.

export type Band = { ovenLo: number; ovenHi: number; lowLo: number; lowHi: number; highLo: number; highHi: number };

/** oven or stovetop minutes -> slow cooker hours */
export const BANDS: Band[] = [
  { ovenLo: 15, ovenHi: 30, lowLo: 4, lowHi: 6, highLo: 1.5, highHi: 2 },
  { ovenLo: 35, ovenHi: 45, lowLo: 6, lowHi: 10, highLo: 3, highHi: 4 },
  { ovenLo: 50, ovenHi: 180, lowLo: 8, lowHi: 18, highLo: 4, highHi: 6 },
];

export const CROCKPOT = { minLowHoursRawMeatVeg: 8, dairyLastHours: 1 };
export const FSIS_FILL = { lo: 1 / 2, hi: 2 / 3 };

/** band for an oven time; exact = inside a row, otherwise the nearest row within 5 minutes */
export function bandForOven(min: number): { band: Band; exact: boolean } | null {
  const inside = BANDS.find((b) => min >= b.ovenLo && min <= b.ovenHi);
  if (inside) return { band: inside, exact: true };
  const near = BANDS.map((b) => ({ b, d: min < b.ovenLo ? b.ovenLo - min : min - b.ovenHi })).sort((x, y) => x.d - y.d)[0];
  return near.d <= 5 ? { band: near.b, exact: false } : null;
}

/** oven range for a slow cooker time on a setting: the span of every row whose range holds it */
export function ovenForSlow(hours: number, setting: "low" | "high"): { lo: number; hi: number } | null {
  const rows = BANDS.filter((b) => (setting === "low" ? hours >= b.lowLo && hours <= b.lowHi : hours >= b.highLo && hours <= b.highHi));
  if (!rows.length) return null;
  return { lo: Math.min(...rows.map((r) => r.ovenLo)), hi: Math.max(...rows.map((r) => r.ovenHi)) };
}

/** 1.5 -> "1½", 90 (minutes) -> "1 hr 30 min" */
export const hrs = (h: number) => (Number.isInteger(h) ? String(h) : h === 1.5 ? "1½" : String(h));
export const minsText = (m: number) => (m < 60 ? `${m} minutes` : m % 60 ? `${Math.floor(m / 60)} hr ${m % 60} min` : `${m / 60} hours`);

export const SRC_SLOW = {
  crockpot: "https://www.manualslib.com/manual/398830/Crock-Pot-3850.html?page=8",
  fsis: "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/slow-cookers-and-food-safety",
};
