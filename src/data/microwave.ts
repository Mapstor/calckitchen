// Microwave conversion. Every figure traces to research/data-sources.csv (GE-MWCONV).
// GE Appliances, "Microwave - Recipe Conversion": cook 1/4 to 1/3 of the conventional time (1 hour -> 15-20 minutes);
//   use the power level of a similar microwave recipe, or power level 10 if none; reduce liquid by about 1/3 (not always
//   necessary); to halve a recipe cut the time by 1/3 at the same power; to double it add 1/2 to 2/3 more time and cut the
//   liquid by 1/4 to 1/2.
// Wattage: an equal-energy estimate (watts x seconds), stated as such on the page; no source gives a wattage formula.
// Checked by scripts/check-microwave-data.mjs against research/sources/microwave.json.

export const GE_MW = {
  fracLo: 1 / 4,
  fracHi: 1 / 3,
  powerLevel: 10,
  liquidCut: 1 / 3,
  halfTimeCut: 1 / 3,
  doubleAddLo: 1 / 2,
  doubleAddHi: 2 / 3,
  doubleLiquidCutLo: 1 / 4,
  doubleLiquidCutHi: 1 / 2,
};

/** conventional minutes -> microwave minutes (lo, hi) */
export const toMicrowave = (min: number) => ({ lo: min * GE_MW.fracLo, hi: min * GE_MW.fracHi });
/** the same rule run backwards: microwave minutes -> conventional minutes (lo, hi) */
export const toConventional = (min: number) => ({ lo: min / GE_MW.fracHi, hi: min / GE_MW.fracLo });
/** equal-energy estimate for a different wattage */
export const forWattage = (min: number, recipeW: number, yourW: number) => (min * recipeW) / yourW;

/** "15 min", "1 min 30 s" */
export const mmss = (min: number) => {
  const s = Math.round(min * 60);
  const m = Math.floor(s / 60);
  const r = s % 60;
  if (!m) return `${r} s`;
  return r ? `${m} min ${r} s` : `${m} min`;
};

export const SRC_MW = "https://products.geappliances.com/appliance/gea-support-search-content?contentId=18793";
