// Baker's percentages and the Pizza Napoletana rules. Every figure traces to research/data-sources.csv (KA-BAKERS, EU-NAPOLETANA).
// King Arthur Baking, "Baker's Percentage": each ingredient is a percentage of the flour weight; flour is always 100%.
// Commission Regulation (EU) No 97/2010, Annex II (Pizza Napoletana TSG): 1 litre water, 50-55 g sea salt, 3 g brewer's yeast,
//   1.8 kg flour; dough balls 180-250 g; disc up to 35 cm; baked at 485°C for no more than 60 to 90 seconds.
// Checked by scripts/check-bakers-data.mjs against research/sources/bakers.json.

export const NAPOLETANA = {
  waterG: 1000,
  flourG: 1800,
  saltLoG: 50,
  saltHiG: 55,
  yeastG: 3,
  ballLoG: 180,
  ballHiG: 250,
  kneadMin: 20,
  firstRiseH: 2,
  fermentC: 25,
  secondRiseLoH: 4,
  secondRiseHiH: 6,
  diameterMaxCm: 35,
  ovenC: 485,
  bakeLoS: 60,
  bakeHiS: 90,
};

/** baker's percentage of an ingredient: weight / flour weight x 100 (King Arthur) */
export const bakersPct = (g: number, flourG: number) => (g / flourG) * 100;

const N = NAPOLETANA;
/** EU quantities as baker's percentages; salt at the middle of 50-55 g */
export const NAPOLETANA_PCT = {
  water: bakersPct(N.waterG, N.flourG),
  salt: bakersPct((N.saltLoG + N.saltHiG) / 2, N.flourG),
  yeast: bakersPct(N.yeastG, N.flourG),
};

export type Part = { name: string; pct: number };

/** Weights from a dough total and baker's percentages: flour = total / (1 + sum of the other percentages / 100). */
export function weightsFromTotal(totalG: number, parts: Part[]) {
  const sum = parts.reduce((a, p) => a + p.pct, 0);
  const flour = totalG / (1 + sum / 100);
  return { flour, parts: parts.map((p) => ({ ...p, g: (flour * p.pct) / 100 })) };
}

/** One decimal, trailing .0 dropped. */
export const d1 = (n: number) => {
  const r = Math.round(n * 10) / 10;
  return Number.isInteger(r) ? String(r) : r.toFixed(1);
};

export const SRC_BAKERS = {
  ka: "https://www.kingarthurbaking.com/pro/reference/bakers-percentage",
  eu: "https://www.legislation.gov.uk/eur/2010/97/annexes",
};
