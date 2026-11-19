// Re-checks src/data/butter.ts, the unit factors in src/data/units.ts and every figure written on the butter converter page
// against research/sources/butter.json (Land O'Lakes stick table, USDA FoodData Central 173410, NIST SP 811 B.9).
// Usage: node scripts/check-butter-data.mjs   (exit 1 on any mismatch)
import { readFileSync } from "node:fs";

const read = (p) => readFileSync(new URL(p, import.meta.url), "utf8");
const data = read("../src/data/butter.ts");
const units = read("../src/data/units.ts");
const page = read("../src/app/(instrument)/butter-converter/page.tsx");
const comp = read("../src/components/calculators/ButterConverter.tsx");
const ref = JSON.parse(read("../research/sources/butter.json"));
let checked = 0, failed = 0;
const ok = (cond, label) => { checked++; if (!cond) { failed++; console.error("FAIL", label); } };
const num = (s) => String(s).split(" ").reduce((a, p) => { const [n, d] = p.split("/").map(Number); return a + (d ? n / d : n); }, 0);
const near = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol;
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;

// 1. Land O'Lakes stick definition in the data module
const L = ref.lol;
const stickRow = L.table.find((r) => r.sticks === "1");
ok(L.quotes.includes("One full stick of butter equals 1/2 cup, or 8 tablespoons."), "LOL quote: stick = 1/2 cup = 8 tbsp");
ok(L.quotes.some((q) => q.includes("1 pound of butter equals 4 full sticks")), "LOL quote: 1 lb = 4 sticks");
ok(L.quotes.includes("Each mark is one tablespoon."), "LOL quote: one mark per tablespoon");
const STICK = { cup: num(stickRow.cups), tbsp: num(stickRow.tbsp), lb: num(stickRow.lb), oz: num(stickRow.oz), perLb: num(L.table.find((r) => r.lb === "1").sticks) };
ok(data.includes(`export const STICK = { cup: 1 / 2, tbsp: 8, lb: 1 / 4, oz: 4, perLb: 4 } as const;`) && STICK.cup === 1 / 2 && STICK.tbsp === 8 && STICK.lb === 1 / 4 && STICK.oz === 4 && STICK.perLb === 4, "STICK constants = LOL stick row");
ok(data.includes("export const STICK_G = STICK.oz * UNITS.oz.base;"), "STICK_G = 4 oz in grams");

// 2. exact units (units.ts) against NIST's printed factors
const LB_G = 453.59237, GAL_ML = 3785.411784;
ok(units.includes("lb: { kind: \"mass\", base: 453.59237 }") && units.includes("oz: { kind: \"mass\", base: 453.59237 / 16 }"), "units.ts lb and oz");
ok(units.includes("const GAL_ML = 3785.411784;"), "units.ts gallon");
for (const [u, d] of [["cup", 16], ["\"fl oz\"", 128], ["tbsp", 256], ["tsp", 768]]) ok(units.includes(`${u}: { kind: "volume", base: GAL_ML / ${d} }`), `units.ts ${u} = gal / ${d}`);
const F = ref.nist.factors;
ok(+(LB_G / 16).toPrecision(7) === F.oz_g, "NIST oz = 28.34952 g");
ok(+(LB_G / 1000).toPrecision(7) === F.lb_kg, "NIST lb = 0.4535924 kg");
ok(+(GAL_ML / 16).toPrecision(7) === F.cup_mL, "NIST cup = 236.5882 mL");
ok(+(GAL_ML / 128).toPrecision(7) === F.floz_mL, "NIST fl oz = 29.57353 mL");
ok(+(GAL_ML / 256).toPrecision(7) === F.tbsp_mL, "NIST tbsp = 14.78676 mL");
ok(+(GAL_ML / 768).toPrecision(7) === F.tsp_mL, "NIST tsp = 4.928922 mL");

// 3. our model reproduces every row of Land O'Lakes' table (cups, tbsp, lb, oz, tsp exactly; grams to the whole gram)
const STICK_G = STICK.oz * (LB_G / 16);
for (const row of L.table) {
  const s = num(row.sticks);
  ok(near(s * STICK.cup, num(row.cups)), `LOL ${row.sticks} sticks: ${row.cups} cups`);
  ok(near(s * STICK.tbsp, num(row.tbsp)), `LOL ${row.sticks} sticks: ${row.tbsp} tbsp`);
  ok(near(s * STICK.lb, num(row.lb)), `LOL ${row.sticks} sticks: ${row.lb} lb`);
  ok(near(s * STICK.oz, num(row.oz)), `LOL ${row.sticks} sticks: ${row.oz} oz`);
  ok(near(s * STICK.tbsp * 3, row.tsp), `LOL ${row.sticks} sticks: ${row.tsp} tsp`);
  ok(Math.round(s * STICK_G) === row.g, `LOL ${row.sticks} sticks: ${row.g} g (model ${(s * STICK_G).toFixed(2)})`);
}

// 4. USDA FoodData Central: portions agree with the model; FDC_BUTTER = snapshot; portion values = per-100 g values x weight
const D = ref.fdc, P = D.per100g;
const port = (m) => D.portions.find((p) => p.measure === m);
ok(Math.round(STICK_G) === port("1 stick").g && Math.round(2 * STICK_G) === port("1 cup").g && r1(STICK_G / 8) === port("1 tbsp").g, "USDA stick 113 g, cup 227 g, tbsp 14.2 g = model");
const rows = [...data.matchAll(/\{ measure: "([^"]+)", g: ([\d.]+), kcal: ([\d.]+), fat: ([\d.]+), sat: ([\d.]+) \}/g)].map((m) => ({ g: +m[2], kcal: +m[3], fat: +m[4], sat: +m[5] }));
const want = [...D.portions, { g: 100, kcal: P.kcal, fat: P.fatG, sat: P.satG }].map(({ g, kcal, fat, sat }) => ({ g, kcal, fat, sat }));
ok(rows.length === want.length, `FDC_BUTTER: ${rows.length} rows, want ${want.length}`);
want.forEach((w, i) => ok(JSON.stringify(rows[i]) === JSON.stringify(w), `FDC_BUTTER row ${i + 1} (${w.g} g)`));
// FDC prints values to 3 significant figures (1630, 102, 35.8, 7.3), so allow half a unit in the third significant digit of each, scaled by the weight
const halfUnit = (x) => 0.5 * 10 ** (Math.floor(Math.log10(Math.abs(x))) - 2);
const scaled = (per100, shown, g) => Math.abs((per100 * g) / 100 - shown) <= halfUnit(shown) + (halfUnit(per100) * g) / 100 + 1e-9;
for (const p of D.portions) {
  ok(scaled(P.kcal, p.kcal, p.g), `USDA ${p.measure}: ${p.kcal} kcal = ${P.kcal} x ${p.g} g / 100`);
  ok(scaled(P.fatG, p.fat, p.g), `USDA ${p.measure}: fat ${p.fat} g`);
  ok(scaled(P.satG, p.sat, p.g), `USDA ${p.measure}: saturated fat ${p.sat} g`);
}

// 5. every figure written on the page and in the component
const flat = (s) => s.replace(/\{" "\}/g, " ").replace(/<[^>]+>/g, "").replace(/&apos;/g, "'").replace(/\s+/g, " ");
const T = flat(page);
const g0 = Math.round(STICK_G), g1 = r1(STICK_G);
const answer = `A stick of butter is ½ cup, ${STICK.tbsp} tablespoons, ${STICK.oz} ounces or ${g0} grams.`;
ok(T.includes(answer), "hero answer");
ok(T.includes(`A stick of butter is 1/2 cup, ${STICK.tbsp} tablespoons, ${STICK.oz} ounces or ${g0} grams.`), "meta description");
ok(T.includes(`and four sticks make a pound.`) && STICK.perLb === 4, "sub: four sticks a pound");
ok(T.includes(`weighs a cup of butter at ${port("1 cup").g} g and a tablespoon at ${port("1 tbsp").g} g.`), "sub: USDA cup and tbsp");
ok(T.includes(`1 stick = ½ cup = ${STICK.tbsp} tbsp = ${STICK.oz} oz = ${g1} g`), "formula line");
const lolG = L.table.map((r) => r.g).sort((a, b) => a - b);
ok(T.includes(`rounds the same rows to whole grams: ${lolG.slice(0, -1).join(", ")} and ${lolG.at(-1)} g.`), "LOL whole grams note");
ok(T.includes(`Divide the grams by ${g1} for sticks, by ${r1(2 * STICK_G)} for cups or by ${r2(STICK_G / 8)} for tablespoons.`), "grams divisors");
const half = L.table.find((r) => r.sticks === "1/2"), third = L.table.find((r) => r.cups === "1/3"), threeq = L.table.find((r) => r.cups === "3/4");
ok(T.includes(`¼ cup: half a stick, ${half.tbsp} marks.`) && half.cups === "1/4", "wrapper 1/4 cup");
ok(T.includes(`⅓ cup: 5⅓ marks, which is 5 tablespoons and 1 teaspoon.`) && third.tbsp === "5 1/3" && near(num(third.tsp) - 5 * 3, 1), "wrapper 1/3 cup");
ok(T.includes(`¾ cup: a full stick and 4 marks of the next, ${threeq.tbsp} tablespoons.`) && num(threeq.tbsp) === STICK.tbsp + 4, "wrapper 3/4 cup");
ok(T.includes(`1 pound: ${STICK.perLb} sticks.`), "wrapper 1 lb");
ok(T.includes(`salted butter is ${P.fatG}% fat and ${P.waterG}% water by weight.`), "USDA fat and water note");

// FAQ answers rebuilt from the sources, compared word for word
const faq = Object.fromEntries([...page.matchAll(/question: "([^"]+)",\s*answer:\s*"([^"]+)"/g)].map((m) => [m[1], m[2]]));
const g250 = 250 / STICK_G;
const tsp = port("1 tbsp").g / 3;
const expect = {
  "How many cups is a stick of butter?": `Half a cup. One stick is also ${STICK.tbsp} tablespoons, ${STICK.oz} ounces and ${g0} grams, and two sticks make a cup.`,
  "How many tablespoons are in a stick of butter?": `${STICK.tbsp}. Land O'Lakes marks its wrappers with one line per tablespoon, so you can cut 1 to ${STICK.tbsp} tablespoons without a measuring spoon.`,
  "How many grams is a stick of butter?": `${g0} grams. A stick weighs ${STICK.oz} ounces and an ounce is ${r2(LB_G / 16)} grams, so ${STICK.oz} × ${r2(LB_G / 16)} = ${r1(STICK.oz * r2(LB_G / 16))} g. USDA FoodData Central lists a stick at ${port("1 stick").g} g.`,
  "How many grams is a cup of butter?": `${port("1 cup").g} grams: two sticks, or half a pound.`,
  "How many grams is a tablespoon of butter?": `${port("1 tbsp").g} grams, by USDA's weight. A teaspoon is a third of a tablespoon, about ${r1(tsp)} grams.`,
  "How many sticks of butter are in a pound?": `Four. A pound of butter is also ${STICK.perLb * STICK.cup} cups or ${STICK.perLb * STICK.tbsp} tablespoons.`,
  "How much is half a stick of butter?": `¼ cup, ${STICK.tbsp / 2} tablespoons, ${STICK.oz / 2} ounces or ${r1(STICK_G / 2)} grams.`,
  "How many sticks of butter is 250 grams?": `${r1(g250)} sticks: two full sticks plus ${r1((g250 - 2) * STICK.tbsp)} tablespoons of a third. That is ${r1(g250 * STICK.cup)} cups.`,
  "Is a stick of butter 4 ounces by weight or by volume?": `Both come to ${STICK.oz}. By weight a stick is ${STICK.oz} ounces, a quarter pound. By volume it is half a cup, and half a US cup is ${(GAL_ML / 16 / (GAL_ML / 128)) * STICK.cup} fluid ounces.`,
  "How many calories are in a tablespoon of butter?": `${port("1 tbsp").kcal}, with ${port("1 tbsp").fat} g of fat, ${port("1 tbsp").sat} g of it saturated, according to USDA FoodData Central for salted butter. A stick has ${port("1 stick").kcal} calories.`,
};
ok(Object.keys(faq).length === Object.keys(expect).length, `FAQ count ${Object.keys(faq).length}, want ${Object.keys(expect).length}`);
for (const [q, a] of Object.entries(expect)) ok(faq[q] === a, `FAQ "${q}"\n   page: ${faq[q]}\n   want: ${a}`);
ok(STICK.lb === 1 / 4 && STICK.perLb * STICK.lb === 1, "quarter pound and half pound wording");

const C = flat(comp);
ok(C.includes(`One stick is ½ cup and weighs ${STICK.oz} ounces (${g1} g), the stick in Land O'Lakes' conversion table.`), "component basis line");
console.log(`butter data: ${checked} checked, ${failed} failed, 0 skipped`);
process.exit(failed ? 1 : 0);
