// Air fryer conversion. Every figure traces to research/data-sources.csv (ILL-AIRFRYER).
// University of Illinois Extension, "Kitchen Appliances: Air Fryers" (last modified 2024-12):
// convert most conventional oven recipes by reducing the temperature by 25 to 30°F and the cooking time by 20%.
// Checked by scripts/check-airfryer-data.mjs against research/sources/air-fryer.json.

export const AF_RULE = { dropLoF: 25, dropHiF: 30, timeCutPct: 20 };
/** Illinois: preheat typically 3 minutes (follow the instruction manual); reheat at 350°F to an internal 165°F. */
export const AF_TIPS = { preheatMin: 3, reheatF: 350, reheatInternalF: 165 };

/** Oven -> air fryer: temperature range in °F (hotter first: oven - 25, then oven - 30). */
export const toAirFryerF = (ovenF: number) => ({ hi: ovenF - AF_RULE.dropLoF, lo: ovenF - AF_RULE.dropHiF });
/** Oven minutes -> air fryer minutes (20% less). */
export const toAirFryerMin = (ovenMin: number) => ovenMin * (1 - AF_RULE.timeCutPct / 100);
/** The same rule run backwards: air fryer -> oven. */
export const toOvenF = (afF: number) => ({ lo: afF + AF_RULE.dropLoF, hi: afF + AF_RULE.dropHiF });
export const toOvenMin = (afMin: number) => afMin / (1 - AF_RULE.timeCutPct / 100);

export const SRC_AF = {
  illinois: "https://extension.illinois.edu/sites/default/files/2024-12/air_fryer.pdf",
};
