// Re-checks src/data/sourdough.ts, the King Arthur preset in the calculator and every figure written on the sourdough page
// against research/sources/sourdough.json (King Arthur Baking recipe and sourdough guide).
// Usage: node scripts/check-sourdough-data.mjs   (exit 1 on any mismatch)
import { readFileSync } from "node:fs";

const read = (p) => readFileSync(new URL(p, import.meta.url), "utf8");
const data = read("../src/data/sourdough.ts");
const page = read("../src/app/(instrument)/sourdough-calculator/page.tsx");
const comp = read("../src/components/calculators/SourdoughCalculator.tsx");
const ref = JSON.parse(read("../research/sources/sourdough.json"));
let checked = 0, failed = 0;
const ok = (cond, label) => { checked++; if (!cond) { failed++; console.error("FAIL", label); } };
const r1 = (x) => Math.round(x * 10) / 10;

// 1. snapshot values = the recipe's printed weights and the guide's quotes
const L = ref.loaf.values, G = ref.guide.values;
const ing = ref.loaf.ingredients.join(" | ");
for (const [k, s] of [["starterG", "(454g) ripe sourdough starter"], ["apFlourG", "(600g) King Arthur Unbleached All-Purpose Flour"], ["wwFlourG", "(85g) King Arthur Whole Wheat Flour"], ["waterG", "(397g) water"], ["saltG", "(15g) table salt"]])
  ok(ing.includes(s) && s.includes(`(${L[k]}g)`), `recipe ${k} = ${L[k]} g`);
ok(ref.loaf.yield === `${L.loaves} loaves`, "recipe yield 2 loaves");
ok(ref.loaf.quotes.some((q) => q.includes(`to ${L.ovenF}°F`)) && ref.loaf.quotes.some((q) => q.includes(`about ${L.bakeLoMin} to ${L.bakeHiMin} minutes`)), "recipe oven and bake time");
const Q = ref.guide.quotes.join(" | ");
ok(Q.includes(`discard all but ${G.keepG}g, and feed that ${G.keepG}g starter with ${G.keepG}g each water and flour`) && Q.includes(`every ${G.roomHours} hours (twice a day)`), "guide: 113 g each, every 12 h");
ok(Q.includes("refrigerated starter at least once a week"), "guide: fridge at least weekly");
ok(Q.includes(`more than ${G.buildAboveG}g (about 1 cup) of starter`) && Q.includes(`plus ${G.keepG}g to keep and feed again`), "guide: build above 227 g, plus 113 g");
ok(Q.includes(`Discard all but ${G.exampleEachG}g, then feed it ${G.exampleEachG}g of water and ${G.exampleEachG}g of flour.`), "guide: 189 g example");
ok(Q.includes(`for ${G.restLoH} to ${G.restHiH} hours; it should be active, with bubbles breaking the surface`) && Q.includes(`doubling in size within ${G.restLoH} to ${G.restHiH} hours of feeding`), "guide: 6 to 8 hours");
ok(Q.includes("revived by feeding it every 12 hours until it's healthy"), "guide: revive");
ok((G.exampleNeedG + G.keepG) / 3 === G.exampleEachG && G.exampleNeedG === L.starterG, "(454 + 113) / 3 = 189, and 454 is the loaf's starter");

// 2. data module constants
ok(data.includes(`export const KA_LOAF = { starterG: ${L.starterG}, apFlourG: ${L.apFlourG}, wwFlourG: ${L.wwFlourG}, waterG: ${L.waterG}, saltG: ${L.saltG}, loaves: ${L.loaves}, ovenF: ${L.ovenF}, bakeLoMin: ${L.bakeLoMin}, bakeHiMin: ${L.bakeHiMin} };`), "KA_LOAF");
ok(data.includes(`export const KA_FEED = { keepG: ${G.keepG}, roomHours: ${G.roomHours}, buildAboveG: ${G.buildAboveG}, exampleNeedG: ${G.exampleNeedG}, exampleEachG: ${G.exampleEachG}, restLoH: ${G.restLoH}, restHiH: ${G.restHiH} };`), "KA_FEED");

// 3. the calculator's King Arthur preset reproduces the recipe's grams
const flour = L.apFlourG + L.wwFlourG;
const pre = comp.match(/const KA = \{ flour: "([\d.]+)", water: "([\d.]+)", starter: "([\d.]+)", salt: "([\d.]+)", hyd: "([\d.]+)", loaves: "([\d.]+)" \};/);
ok(pre !== null, "KA preset present");
if (pre) {
  const [, f, w, s, sa, h, lv] = pre.map(Number);
  ok(f === flour && h === 100 && lv === L.loaves, "preset flour 685, starter hydration 100, 2 loaves");
  ok(Math.round((f * w) / 100) === L.waterG && Math.round((f * s) / 100) === L.starterG && Math.round((f * sa) / 100) === L.saltG, "preset % -> 397 g, 454 g, 15 g");
  ok(Math.round(f + (f * w) / 100 + (f * s) / 100 + (f * sa) / 100) === flour + L.waterG + L.starterG + L.saltG, "preset total = 1551 g");
}

// 4. every figure written on the page
const flat = (s) => s.replace(/\{" "\}/g, " ").replace(/<[^>]+>/g, "").replace(/&apos;/g, "'").replace(/\s+/g, " ");
const T = flat(page);
const half = L.starterG / 2;
const pW = r1((L.waterG / flour) * 100), pS = r1((L.starterG / flour) * 100), pSa = r1((L.saltG / flour) * 100);
const overall = r1(((L.waterG + half) / (flour + half)) * 100);
ok(T.includes(`King Arthur's sourdough makes two loaves from ${flour} g flour, ${L.waterG} g water, ${L.starterG} g starter and ${L.saltG} g salt.`), "hero answer");
ok(T.includes(`That's ${pW}% water, ${pS}% starter and ${pSa}% salt by flour weight`) && T.includes(`the dough is ${overall}% hydration.`), "hero sub");
ok(T.includes(`King Arthur's ${L.starterG} g of starter holds ${half} g of flour and ${half} g of water. Count them in and the loaf goes from ${pW}% to ${overall}% hydration`), "hydration paragraph");
ok(T.includes(`(${L.waterG} + ${half}) ÷ (${flour} + ${half}) = ${overall}%`), "hydration formula");
ok(T.includes(`King Arthur keeps ${G.keepG} g of starter, discards the rest or bakes with it, and feeds the ${G.keepG} g with ${G.keepG} g each of flour and water`), "feeding paragraph");
ok(T.includes(`At room temperature: every ${G.roomHours} hours.`) && T.includes("In the fridge: at least once a week.") && T.includes(`every ${G.roomHours} hours until it's healthy`), "feeding list");
ok(T.includes(`needs more than ${G.buildAboveG} g of starter`) && T.includes(`plus ${G.keepG} g to keep`), "build: above 227 g, plus 113 g");
ok(T.includes(`For its loaf's ${G.exampleNeedG} g, the guide keeps ${G.exampleEachG} g and feeds it ${G.exampleEachG} g each of flour and water: ${3 * G.exampleEachG} g, of which ${G.exampleNeedG} g goes in the dough.`), "build: 189 g example");
ok(T.includes(`starter = flour = water = (needed + ${G.keepG} g) ÷ 3`), "build formula");
ok(T.includes(`Let it rest ${G.restLoH} to ${G.restHiH} hours at room temperature, until it's active with bubbles breaking the surface.`), "build rest");

const faq = Object.fromEntries([...page.matchAll(/question: "([^"]+)",\s*answer:\s*"([^"]+)"/g)].map((m) => [m[1], m[2]]));
const expect = {
  "What ratio should I feed my sourdough starter?": `King Arthur feeds it 1:1:1 by weight: ${G.keepG} g of starter with ${G.keepG} g of flour and ${G.keepG} g of water.`,
  "How often do I feed a sourdough starter?": `Every ${G.roomHours} hours at room temperature, and at least once a week if it lives in the fridge, according to King Arthur.`,
  "How do I know when my starter is ready to bake with?": `King Arthur says it's ready when it reliably turns very bubbly and doubles in size within ${G.restLoH} to ${G.restHiH} hours of feeding.`,
  "How much starter do I need for a loaf of sourdough?": `King Arthur's Naturally Leavened Sourdough Bread uses ${L.starterG} g of ripe starter for two loaves, with ${flour} g of flour.`,
  "How do I make more starter for a recipe?": `Feed equal weights of starter, flour and water that add up to what the recipe needs plus ${G.keepG} g to keep. For ${G.exampleNeedG} g, that's ${G.exampleEachG} g of each, making ${G.exampleNeedG + G.keepG} g.`,
  "What is starter hydration?": "The water in the starter as a percentage of its flour. Equal weights of flour and water, as in King Arthur's feeding, make a 100% hydration starter.",
  "Does the starter change my dough's hydration?": `Yes. A 100% hydration starter is half water, so King Arthur's ${L.starterG} g adds ${half} g of water and ${half} g of flour, taking the loaf from ${pW}% to ${overall}% hydration.`,
  "How much salt goes in sourdough bread?": `King Arthur's loaf uses ${L.saltG} g of table salt for ${flour} g of flour: ${pSa}%.`,
  "What temperature do I bake sourdough at?": `King Arthur bakes its sourdough loaves at ${L.ovenF}°F for about ${L.bakeLoMin} to ${L.bakeHiMin} minutes, until crusty and golden.`,
  "How do I revive a neglected starter?": `Feed it every ${G.roomHours} hours until it's healthy, then put it back on its regular schedule, King Arthur says.`,
};
ok(Object.keys(faq).length === Object.keys(expect).length, `FAQ count ${Object.keys(faq).length}, want ${Object.keys(expect).length}`);
for (const [q, a] of Object.entries(expect)) ok(faq[q] === a, `FAQ "${q}"\n   page: ${faq[q]}\n   want: ${a}`);
console.log(`sourdough data: ${checked} checked, ${failed} failed, 0 skipped`);
process.exit(failed ? 1 : 0);
