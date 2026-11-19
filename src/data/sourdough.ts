// Sourdough figures for /sourdough-calculator. research/data-sources.csv rows:
//   KA-SD-LOAF: King Arthur Baking, "Naturally Leavened Sourdough Bread": 454 g ripe starter, 600 g all-purpose or bread flour, 85 g whole wheat
//     flour, 397 g water, 15 g table salt; 2 loaves; oven 450°F; bake about 35 to 40 minutes.
//   KA-SD-GUIDE: King Arthur Baking, "Sourdough Baking" guide, Maintain and Create pages: keep 113 g and feed it 113 g each water and flour;
//     every 12 hours at room temperature, at least once a week in the fridge; a recipe needing more than 227 g: feed without discarding up to
//     the amount needed plus 113 g to keep; example: keep 189 g, feed 189 g each; rest 6 to 8 hours; ready when it doubles within 6 to 8 hours.
//   KA-BAKERS: baker's percentage = ingredient weight ÷ flour weight × 100.
// Snapshot: research/sources/sourdough.json · check: scripts/check-sourdough-data.mjs

export const SRC_SD = {
  loaf: "https://www.kingarthurbaking.com/recipes/naturally-leavened-sourdough-bread-recipe",
  maintain: "https://www.kingarthurbaking.com/learn/guides/sourdough/maintain",
  create: "https://www.kingarthurbaking.com/learn/guides/sourdough/create",
  bakers: "https://www.kingarthurbaking.com/pro/reference/bakers-percentage",
};

/** King Arthur, Naturally Leavened Sourdough Bread */
export const KA_LOAF = { starterG: 454, apFlourG: 600, wwFlourG: 85, waterG: 397, saltG: 15, loaves: 2, ovenF: 450, bakeLoMin: 35, bakeHiMin: 40 };
export const KA_FLOUR = KA_LOAF.apFlourG + KA_LOAF.wwFlourG;

/** King Arthur sourdough guide: maintenance feed, building for a recipe, readiness */
export const KA_FEED = { keepG: 113, roomHours: 12, buildAboveG: 227, exampleNeedG: 454, exampleEachG: 189, restLoH: 6, restHiH: 8 };

/** a starter fed equal weights of flour and water: 100% hydration */
export const FEED_HYDRATION = (KA_FEED.keepG / KA_FEED.keepG) * 100;

/** baker's percentage: weight ÷ flour weight × 100 */
export const pctOf = (g: number, flourG: number) => (g / flourG) * 100;

/** a starter of a given hydration (its water as % of its flour), split into flour and water */
export function starterSplit(starterG: number, hydrationPct: number) {
  const flour = (starterG * 100) / (100 + hydrationPct);
  return { flour, water: starterG - flour };
}

/** dough from flour weight and baker's percentages; overall hydration counts the starter's own flour and water */
export function dough(flourG: number, waterPct: number, starterPct: number, saltPct: number, starterHydPct: number) {
  const water = (flourG * waterPct) / 100;
  const starter = (flourG * starterPct) / 100;
  const salt = (flourG * saltPct) / 100;
  const s = starterSplit(starter, starterHydPct);
  return { water, starter, salt, total: flourG + water + starter + salt, overall: ((water + s.water) / (flourG + s.flour)) * 100, sFlour: s.flour, sWater: s.water };
}

/** one feeding at starter : flour : water = 1 : f : w */
export const feed = (keepG: number, f: number, w: number) => ({ flour: keepG * f, water: keepG * w, total: keepG * (1 + f + w), hydration: (w / f) * 100 });

/** King Arthur's build, as one 1:1:1 feeding: equal weights of starter, flour and water that make the amount needed plus 113 g to keep */
export function build(needG: number, keepG: number = KA_FEED.keepG) {
  const each = (needG + keepG) / 3;
  return { each, makes: needG + keepG };
}

/** whole grams; one decimal under 10 g */
export const gr = (g: number) => (g < 10 ? (Math.round(g * 10) / 10).toString() : Math.round(g).toLocaleString("en-US"));
export const p1 = (x: number) => (Math.round(x * 10) / 10).toString();
