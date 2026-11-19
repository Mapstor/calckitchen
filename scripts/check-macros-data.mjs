// Re-checks src/data/macros.ts (23 USDA FoodData Central SR Legacy foods) and every figure written on the recipe macro page
// against research/sources/macros.json.
// Usage: node scripts/check-macros-data.mjs   (Node 22.18+ for the TypeScript import; exit 1 on any mismatch)
import { readFileSync } from "node:fs";

process.removeAllListeners("warning"); // the TypeScript import below prints an ExperimentalWarning on Node 22
const read = (p) => readFileSync(new URL(p, import.meta.url), "utf8");
const page = read("../src/app/(instrument)/recipe-macro-calculator/page.tsx");
const ref = JSON.parse(read("../research/sources/macros.json"));
let checked = 0, failed = 0;
const ok = (cond, label) => { checked++; if (!cond) { failed++; console.error("FAIL", label); } };
const r1 = (x) => (Math.round(x * 10) / 10).toString();
const r0 = (x) => Math.round(x).toLocaleString("en-US");

let M = null;
try {
  M = await import(new URL("../src/data/macros.ts", import.meta.url));
} catch (e) {
  ok(false, `import macros.ts (${e.message})`);
}

if (M) {
  // 1. every food = its FoodData Central entry
  ok(M.FOODS.length === ref.foods.length && M.FOODS.length === 23, `${M.FOODS.length} foods, snapshot ${ref.foods.length}`);
  for (const f of M.FOODS) {
    const s = ref.foods.find((x) => x.fdcId === f.fdc);
    ok(!!s, `${f.name}: FDC ${f.fdc} in snapshot`);
    if (!s) continue;
    ok(s.description.startsWith(f.desc), `${f.name}: description "${f.desc}"`);
    ok(f.kcal === s.kcal && f.p === s.protein && f.c === s.carbs && f.f === s.fat && f.fib === s.fiber, `${f.name}: ${f.kcal} kcal, ${f.p}/${f.c}/${f.f} g, fiber ${f.fib} g`);
    for (const [label, g] of f.m) ok(Object.values(s.measures).includes(g), `${f.name}: 1 ${label} = ${g} g is a USDA measure`);
  }

  // 2. sample recipe and hero sentence
  const food = (k) => M.FOODS.find((f) => f.key === k);
  const rows = M.SAMPLE.map((s) => ({ s, g: M.grams(food(s.key), Number(s.amount), s.unit) }));
  ok(rows.every((r) => r.g !== null), "sample units resolve to grams");
  const tot = M.sumMacros(rows.map((r) => M.macrosFor(food(r.s.key), r.g)));
  const n = M.SAMPLE_SERVINGS;
  const T = page.replace(/\{" "\}/g, " ").replace(/<[^>]+>/g, "").replace(/&apos;/g, "'").replace(/\s+/g, " ");
  ok(T.includes(`works out to ${r0(tot.kcal / n)} calories, ${r1(tot.p / n)} g protein, ${r1(tot.c / n)} g carbs and ${r1(tot.f / n)} g fat a serving.`), `hero sample: ${r0(tot.kcal / n)} kcal, ${r1(tot.p / n)}/${r1(tot.c / n)}/${r1(tot.f / n)} g`);
  ok(page.includes(`value={${Math.round(tot.kcal / n)}}`), "dial starts at the sample's calories");
  ok(T.includes(`Pick from ${M.FOODS.length} ingredients`) && page.includes(`title="USDA values for ${M.FOODS.length} common ingredients"`) && page.includes(`USDA FoodData Central values for ${M.FOODS.length} common ingredients`), "food count in text, title and description");

  // 3. FAQ answers rebuilt from the data
  const faq = Object.fromEntries([...page.matchAll(/question: "([^"]+)",\s*answer:\s*"([^"]+)"/g)].map((m) => [m[1], m[2]]));
  const fl = food("flour"), ch = food("chicken"), oil = food("olive-oil"), egg = food("egg");
  const mg = (f, l) => f.m.find(([x]) => x === l)[1];
  const expect = {
    "How do I calculate the macros in a recipe?": "For each ingredient, multiply its value per 100 g by its weight in grams and divide by 100. Add the ingredients up, then divide by the number of servings.",
    "How many calories are in a cup of all-purpose flour?": `${r0((fl.kcal * mg(fl, "cup")) / 100)}. USDA FoodData Central weighs a cup of all-purpose flour at ${mg(fl, "cup")} g and lists ${fl.kcal} calories per 100 g.`,
    "How much protein is in a chicken breast?": `${ch.p} g per 100 g of raw, skinless, boneless breast, according to USDA FoodData Central. 4 oz (${mg(ch, "4 oz")} g) raw holds ${r1((ch.p * mg(ch, "4 oz")) / 100)} g.`,
    "How many calories are in a tablespoon of olive oil?": `${r0((oil.kcal * mg(oil, "tbsp")) / 100)}. USDA weighs a tablespoon of olive oil at ${mg(oil, "tbsp")} g, at ${oil.kcal} calories per 100 g.`,
    "How many calories are in an egg?": `${r0((egg.kcal * mg(egg, "large egg")) / 100)} in a large egg: USDA weighs it at ${mg(egg, "large egg")} g out of the shell, at ${egg.kcal} calories per 100 g.`,
    "Should I weigh ingredients raw or cooked?": "Raw, with these figures: every USDA entry in this calculator is raw or dry. Weigh ingredients as they go into the pot.",
    "What if my ingredient isn't on the list?": "Choose Other and type its calories, protein, carbs and fat per 100 g from the package label or from USDA FoodData Central.",
  };
  ok(Object.keys(faq).length === Object.keys(expect).length, `FAQ count ${Object.keys(faq).length}, want ${Object.keys(expect).length}`);
  for (const [q, a] of Object.entries(expect)) ok(faq[q] === a, `FAQ "${q}"\n   page: ${faq[q]}\n   want: ${a}`);
  ok(/raw|dry/i.test(ref.foods.map((f) => f.description).join(" ")) && ref.foods.every((f) => /raw|dry|flour|Sugars|Butter|Oil|Milk|Cream|Cheese|Honey|Nuts/.test(f.description)), "entries are raw, dry or as-sold");
}
console.log(`macros data: ${checked} checked, ${failed} failed, 0 skipped`);
process.exit(failed ? 1 : 0);
