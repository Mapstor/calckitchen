// Re-checks src/data/measures.ts (25 USDA FoodData Central household measures, NIST units) and every figure written on the
// cooking measurement converter page against research/sources/measures.json.
// Usage: node scripts/check-measures-data.mjs   (Node 22.18+ for the TypeScript import; exit 1 on any mismatch)
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.removeAllListeners("warning"); // the TypeScript import below prints an ExperimentalWarning on Node 22
const read = (p) => readFileSync(new URL(p, import.meta.url), "utf8");
const data = read("../src/data/measures.ts");
const page = read("../src/app/(instrument)/cooking-measurement-converter/page.tsx");
const ref = JSON.parse(read("../research/sources/measures.json"));
let checked = 0, failed = 0;
const ok = (cond, label) => { checked++; if (!cond) { failed++; console.error("FAIL", label); } };
const r1 = (x) => (Math.round(x * 10) / 10).toString();
const r2 = (x) => (Math.round(x * 100) / 100).toString();

const dir = mkdtempSync(join(tmpdir(), "ck-measures-"));
writeFileSync(join(dir, "units.ts"), read("../src/data/units.ts"));
writeFileSync(join(dir, "measures.ts"), data.replace('from "./units"', 'from "./units.ts"'));
let M = null;
try {
  M = await import(join(dir, "measures.ts"));
} catch (e) {
  ok(false, `import measures.ts (${e.message})`);
}

const food = (id) => ref.foods.find((f) => f.fdcId === id);
if (M) {
  // 1. every ingredient's measure = USDA's
  ok(M.INGREDIENTS.length === 25 && ref.foods.length === 25, `${M.INGREDIENTS.length} ingredients`);
  for (const i of M.INGREDIENTS) {
    const f = food(i.fdc);
    ok(!!f, `${i.name}: FDC ${i.fdc} in snapshot`);
    if (!f) continue;
    const key = Object.keys(f.measures).find((k) => k === i.measure || k.startsWith(i.measure) || (i.measure === "8 fl oz" && k === "1 serving 8 fl oz") || (i.measure === "1 cup, fluid" && k.startsWith("1 cup, fluid")));
    ok(key !== undefined && f.measures[key] === i.g, `${i.name}: ${i.measure} = ${i.g} g`);
    ok(i.per === (i.measure.includes("tsp") ? "tsp" : "cup"), `${i.name}: basis ${i.per}`);
  }
  // 2. NIST: units.ts agrees with the printed factors
  const N = ref.nist.factors, ml = (k) => M.VOL.find((v) => v.key === k).ml, g = (k) => M.MASS.find((m) => m.key === k).g;
  ok(+ml("cup").toPrecision(7) === N.cup_mL && +ml("floz").toPrecision(7) === N.floz_mL && +ml("tbsp").toPrecision(7) === N.tbsp_mL && +ml("tsp").toPrecision(7) === N.tsp_mL, "cup, fl oz, tbsp, tsp = NIST");
  ok(+(ml("gallon") / 1000).toPrecision(7) === N.gal_L && +g("oz").toPrecision(7) === N.oz_g && +(g("lb") / 1000).toPrecision(7) === N.lb_kg, "gallon, oz, lb = NIST");
  ok(Math.abs(ml("pint") - 2 * ml("cup")) < 1e-9 && Math.abs(ml("quart") - 4 * ml("cup")) < 1e-9 && Math.abs(ml("gallon") - 16 * ml("cup")) < 1e-9, "pint 2 cups, quart 4, gallon 16");
  // 3. cup basis for spoon-measured ingredients
  const soda = M.INGREDIENTS.find((i) => i.key === "baking-soda");
  ok(Math.abs(M.gramsPerCup(soda) - 4.6 * 48) < 1e-9, "baking soda: 4.6 g per tsp x 48 per cup");

  // 4. page text
  const T = page.replace(/\{" "\}/g, " ").replace(/<[^>]+>/g, "").replace(/&apos;/g, "'").replace(/\s+/g, " ");
  const G = (k) => M.INGREDIENTS.find((i) => i.key === k).g;
  ok(T.includes(`A cup of all-purpose flour weighs ${G("ap-flour")} g, a cup of sugar ${G("sugar")} g and a cup of butter ${G("butter")} g.`), "hero answer");
  ok(T.includes(`a US cup is 16 tablespoons, 8 fluid ounces or ${r1(ml("cup"))} mL`) && ml("cup") / ml("tbsp") - 16 < 1e-9 && Math.abs(ml("cup") / ml("floz") - 8) < 1e-9, "hero sub: cup = 16 tbsp = 8 fl oz = 236.6 mL");
  ok(T.includes(`USDA lists brown sugar at ${food(168833).measures["1 cup packed"]} g packed and ${food(168833).measures["1 cup unpacked"]} g unpacked`), "brown sugar note");
  ok(page.includes(`Cups to grams for ${M.INGREDIENTS.length} ingredients`) && T.includes(`the converter has them for ${M.INGREDIENTS.length} ingredients`), "ingredient count");
  const faq = Object.fromEntries([...page.matchAll(/question: "([^"]+)",\s*answer:\s*"([^"]+)"/g)].map((m) => [m[1], m[2]]));
  const water = food(173647).measures["1 serving 8 fl oz"];
  const expect = {
    "How many grams are in a cup of flour?": `${G("ap-flour")} g of all-purpose flour, by USDA FoodData Central's measure. A cup of bread flour weighs ${G("bread-flour")} g and whole wheat flour ${G("ww-flour")} g.`,
    "How many grams are in a cup of sugar?": `${G("sugar")} g of granulated sugar. A cup of packed brown sugar weighs ${G("brown-sugar")} g and unsifted powdered sugar ${G("powdered-sugar")} g, by USDA's measures.`,
    "How many tablespoons are in a cup?": `${r1(ml("cup") / ml("tbsp"))}. A tablespoon is ${r1(ml("tbsp") / ml("tsp"))} teaspoons, and a cup is ${r1(ml("cup") / ml("floz"))} fluid ounces or ${r1(ml("cup"))} mL.`,
    "How many ounces are in a cup?": `8 fluid ounces by volume. By weight it depends on the ingredient: a cup of all-purpose flour weighs ${r2(G("ap-flour") / g("oz"))} oz and a cup of water ${r2(water / g("oz"))} oz, from USDA's ${G("ap-flour")} g and ${water} g.`,
    "How many cups are in a quart?": `${ml("quart") / ml("cup")} cups, or ${ml("quart") / ml("pint")} pints. A gallon is ${ml("gallon") / ml("quart")} quarts, which is ${ml("gallon") / ml("cup")} cups.`,
    "How many grams are in a teaspoon of salt?": `${food(173468).measures["1 tsp"]} g of table salt, by USDA's measure. A teaspoon of baking soda or baking powder weighs ${food(175040).measures["1 tsp"]} g.`,
    "How many grams is a tablespoon of butter?": `${r1(G("butter") / 16)} g. USDA weighs a cup of butter at ${G("butter")} g, and a cup is 16 tablespoons.`,
    "How many milliliters are in a cup?": `${r1(ml("cup"))} mL in a US cup; NIST lists it as ${ref.nist.factors.cup_mL} mL. A tablespoon is ${r1(ml("tbsp"))} mL and a teaspoon ${r1(ml("tsp"))} mL.`,
  };
  ok(food(172803).measures["1 tsp"] === food(175040).measures["1 tsp"], "baking powder tsp = baking soda tsp (4.6 g)");
  ok(Object.keys(faq).length === Object.keys(expect).length, `FAQ count ${Object.keys(faq).length}, want ${Object.keys(expect).length}`);
  for (const [q, a] of Object.entries(expect)) ok(faq[q] === a, `FAQ "${q}"\n   page: ${faq[q]}\n   want: ${a}`);
}
console.log(`measures data: ${checked} checked, ${failed} failed, 0 skipped`);
process.exit(failed ? 1 : 0);
