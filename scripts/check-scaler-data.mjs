// Re-checks src/data/scaler.ts (egg weights, cup and spoon arithmetic, the measures the tool prints) and every figure written on the
// recipe scaler page against research/sources/scaler.json (USDA FoodData Central 171287, NIST SP 811 B.9).
// Usage: node scripts/check-scaler-data.mjs   (Node 22.18+ for TypeScript imports; exit 1 on any mismatch)
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.removeAllListeners("warning"); // the TypeScript import below prints an ExperimentalWarning on Node 22

const read = (p) => readFileSync(new URL(p, import.meta.url), "utf8");
const data = read("../src/data/scaler.ts");
const page = read("../src/app/(instrument)/recipe-scaler/page.tsx");
const ref = JSON.parse(read("../research/sources/scaler.json"));
let checked = 0, failed = 0;
const ok = (cond, label) => { checked++; if (!cond) { failed++; console.error("FAIL", label); } };

// 1. egg weights = USDA's portion list
const E = ref.egg.values;
for (const [size, g] of Object.entries(E)) ok(ref.egg.portionOptions.includes(`1 ${size} (${g} g)`), `USDA portion: 1 ${size} = ${g} g`);
ok(data.includes(`export const EGG_G = { small: ${E.small}, medium: ${E.medium}, large: ${E.large}, "extra large": ${E["extra large"]}, jumbo: ${E.jumbo} } as const;`), "EGG_G = USDA");

// 2. NIST: cup = 16 tbsp, tbsp = 3 tsp to the printed precision
const N = ref.nist.factors;
ok(Math.abs(N.cup_mL / N.tbsp_mL - 16) < 1e-5 && Math.abs(N.tbsp_mL / N.tsp_mL - 3) < 1e-5, "NIST cup/tbsp = 16, tbsp/tsp = 3");

// 3. the shipped functions, imported from a temp copy (units.ts import rewritten for Node)
const dir = mkdtempSync(join(tmpdir(), "ck-scaler-"));
writeFileSync(join(dir, "units.ts"), read("../src/data/units.ts"));
writeFileSync(join(dir, "scaler.ts"), data.replace('from "./units"', 'from "./units.ts"'));
let S = null;
try {
  S = await import(join(dir, "scaler.ts"));
} catch (e) {
  ok(false, `import scaler.ts (${e.message})`);
}
if (S) {
  ok(S.TBSP_PER_CUP === 16 && S.TSP_PER_TBSP === 3, "TBSP_PER_CUP 16, TSP_PER_TBSP 3 from units.ts");
  const M = (q, u) => S.measure(S.toTsp(q, u));
  const want = [
    [[1 / 2, "cup"], "½ cup"], [[3 / 8, "cup"], "¼ cup + 2 tbsp"], [[1 / 3, "cup"], "⅓ cup"], [[1 / 4, "cup"], "¼ cup"], [[1 / 6, "cup"], "2 tbsp + 2 tsp"],
    [[1 / 8, "cup"], "2 tbsp"], [[1 / 2, "tbsp"], "1½ tsp"], [[1 / 2, "tsp"], "½ tsp"], [[1 / 8, "tsp"], "⅛ tsp"], [[2, "cup"], "2 cups"], [[3 / 2, "cup"], "1½ cups"],
    [[4 / 3, "cup"], "1⅓ cups"], [[1, "cup"], "1 cup"], [[2, "tbsp"], "2 tbsp"], [[2, "tsp"], "2 tsp"], [[9 / 8, "cup"], "1 cup + 2 tbsp"], [[6, "tbsp"], "¼ cup + 2 tbsp"],
  ];
  for (const [[q, u], s] of want) ok(M(q, u) === s, `measure ${q} ${u} = "${s}" (got "${M(q, u)}")`);
  const line = (t, f) => S.scaleLine(S.parseLine(t), f);
  ok(line("3/4 cup sugar", 0.5).amount === "¼ cup + 2 tbsp" && line("3/4 cup sugar", 0.5).note === "= ⅜ cup", "scale ¾ cup by ½");
  ok(line("3 large eggs", 0.5).amount === "1½" && line("3 large eggs", 0.5).note.startsWith(`${1.5 * E.large} g beaten egg`), "1½ large eggs = 75 g");
  ok(line("2 jumbo eggs", 0.25).note.startsWith(`${0.5 * E.jumbo} g beaten egg`), "½ jumbo egg = 31.5 g");
  ok(line("3 egg yolks", 0.5).note === "", "yolks get no whole-egg weight");
  ok(line("250 g blueberries", 1.5).amount === "375 g", "250 g x 1.5 = 375 g");
  ok(line("2-3 cups broth", 0.5).amount === "1–1½ cups", "range 2-3 cups halved");
  ok(line("1 1/2 Tbsp honey", 1).amount === "1 tbsp + 1½ tsp", "1½ Tbsp as scoops");
  ok(line("Salt to taste", 2).scaled === false, "no amount: as written");
  ok(S.parseNum("1 1/2") === 1.5 && S.parseNum("1½") === 1.5 && S.parseNum("½") === 0.5 && S.parseNum("2.25") === 2.25 && S.parseNum("1/0") === null, "parseNum forms");
}

// 4. every figure written on the page
const flat = (s) => s.replace(/\{" "\}/g, " ").replace(/<[^>]+>/g, "").replace(/&apos;/g, "'").replace(/\s+/g, " ");
const T = flat(page);
ok(T.includes(`From 4 servings to 6 that's 6 ÷ 4 = ${6 / 4}.`), "hero sub 6 ÷ 4 = 1.5");
ok(T.includes("A US cup is 16 tablespoons and a tablespoon is 3 teaspoons"), "NIST sentence");
const faq = Object.fromEntries([...page.matchAll(/question: "([^"]+)",\s*answer:\s*"([^"]+)"/g)].map((m) => [m[1], m[2]]));
const expect = {
  "How do I scale a recipe up or down?": `Divide the servings you need by the servings the recipe makes, and multiply every ingredient by the result. From 4 servings to 10 is 10 ÷ 4 = ${10 / 4}.`,
  "What is half of ¾ cup?": `¼ cup plus ${(48 * (3 / 8) - 12) / 3} tablespoons, which is ⅜ cup or ${(48 * (3 / 8)) / 3} tablespoons. A cup holds 16 tablespoons.`,
  "What is half of ⅓ cup?": `2 tablespoons plus 2 teaspoons. ⅓ cup is ${48 / 3} teaspoons, so half is ${48 / 6}.`,
  "How many tablespoons are in a cup?": `16. A tablespoon is 3 teaspoons, so a cup is ${16 * 3} teaspoons.`,
  "How do I use half an egg?": `Beat the egg and use half by weight. USDA FoodData Central puts a large egg at ${E.large} g out of the shell, so half is ${E.large / 2} g.`,
  "How do I scale a recipe that uses grams?": `Multiply the grams by the same factor; weights need no fractions. 250 g at × 1.5 is ${250 * 1.5} g.`,
  "How do I scale a recipe for a different cake pan?": "Scale by pan area, not servings. The cake pan converter works out that factor from the two pan sizes.",
};
ok(48 / 6 === 2 * 3 + 2, "8 tsp = 2 tbsp + 2 tsp");
ok(Object.keys(faq).length === Object.keys(expect).length, `FAQ count ${Object.keys(faq).length}, want ${Object.keys(expect).length}`);
for (const [q, a] of Object.entries(expect)) ok(faq[q] === a, `FAQ "${q}"\n   page: ${faq[q]}\n   want: ${a}`);
console.log(`scaler data: ${checked} checked, ${failed} failed, 0 skipped`);
process.exit(failed ? 1 : 0);
