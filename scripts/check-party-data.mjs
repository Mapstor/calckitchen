// Re-checks src/data/party.ts (FDA and FSIS reference amounts) and every figure written on the party food page
// against research/sources/party.json.
// Usage: node scripts/check-party-data.mjs   (Node 22.18+ for the TypeScript import; exit 1 on any mismatch)
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.removeAllListeners("warning"); // the TypeScript import below prints an ExperimentalWarning on Node 22
const read = (p) => readFileSync(new URL(p, import.meta.url), "utf8");
const data = read("../src/data/party.ts");
const page = read("../src/app/(instrument)/party-food-calculator/page.tsx");
const ref = JSON.parse(read("../research/sources/party.json"));
let checked = 0, failed = 0;
const ok = (cond, label) => { checked++; if (!cond) { failed++; console.error("FAIL", label); } };
const LB = 453.59237;
const r1 = (x) => (Math.round(x * 10) / 10).toString();
const r2 = (x) => (Math.round(x * 100) / 100).toString();

const dir = mkdtempSync(join(tmpdir(), "ck-party-"));
writeFileSync(join(dir, "units.ts"), read("../src/data/units.ts"));
writeFileSync(join(dir, "party.ts"), data.replace('from "./units"', 'from "./units.ts"'));
let P = null;
try {
  P = await import(join(dir, "party.ts"));
} catch (e) {
  ok(false, `import party.ts (${e.message})`);
}

const F = ref.fda.values, S = ref.fsis.values;
// 1. snapshot rows carry the values
ok(ref.fda.rows["Breads (excluding sweet quick type), rolls"] === `${F.bread} g` && ref.fda.rows["Cookies"] === `${F.cookies} g` && ref.fda.rows["Pastas, plain"] === `${F.cookedGrain} g prepared; ${F.pastaDry} g dry` && ref.fda.rows["Grains, e.g., rice, barley, plain"] === `${F.cookedGrain} g prepared; ${F.riceDry} g dry`, "FDA rows: bread, cookies, pasta, rice");
ok(ref.fda.rows["Ice cream, frozen yogurt, sherbet, ..."] === "2/3 cup" && F.iceCreamCup === 2 / 3, "FDA ice cream 2/3 cup");
ok(ref.fda.rows["Carbonated and noncarbonated beverages, wine coolers, water"].startsWith(`${F.drinkMl} mL`) && ref.fda.rows["Carbonated and noncarbonated beverages, wine coolers, water"].includes("12 fl oz (360 mL)"), "FDA drinks 360 mL, 12 fl oz");
ok(Object.values(ref.fsis.rows)[0] === `${S.cutsReadyToServe} g | ${S.cutsReadyToCook} g` && Object.values(ref.fsis.rows)[3] === `${S.cutsReadyToServe} g | ${S.cutsReadyToCook}g`, "FSIS cuts 85 g ready-to-serve, 114 g ready-to-cook (meat and poultry)");
ok(ref.fda.footnote1.includes("edible portion") && ref.fda.footnote1.includes("1977-1978") && ref.fda.footnote1.includes("1987-1988") && ref.fda.footnote1.includes("2007-2008"), "FDA footnote 1");

if (P) {
  // 2. every item = its regulation's amount
  const want = { meat: [S.cutsReadyToCook, "g"], bbq: [S.bbq, "g"], hotdogs: [S.sausage, "g"], casserole: [F.casseroleCup, "cup"], pizza: [F.pizza, "g"], potatoes: [F.potatoes, "g"], pasta: [F.pastaDry, "g"], rice: [F.riceDry, "g"], veg: [F.veg, "g"], "pasta-salad": [F.pastaSalad, "g"], salad: [F.salad, "g"], fruit: [F.fruit, "g"], bread: [F.bread, "g"], chips: [F.chips, "g"], dip: [F.dipTbsp, "tbsp"], cheese: [F.cheese, "g"], cake: [F.cake, "g"], cheesecake: [F.cheesecake, "g"], pie: [F.pie, "g"], cookies: [F.cookies, "g"], "ice-cream": [F.iceCreamCup, "cup"], drinks: [1, "drink"] };
  ok(P.ITEMS.length === Object.keys(want).length, `${P.ITEMS.length} items, want ${Object.keys(want).length}`);
  for (const i of P.ITEMS) ok(want[i.key] && Math.abs(i.amount - want[i.key][0]) < 1e-12 && i.unit === want[i.key][1], `${i.key}: ${i.amount} ${i.unit}`);
  ok(P.MEAT_COOKED_G === S.cutsReadyToServe && P.DRINK_ML === F.drinkMl, "cooked meat 85 g, drink 360 mL");
  ok(P.ITEMS.find((i) => i.key === "meat").per === `${S.cutsReadyToCook} g (4 oz) raw, ${S.cutsReadyToServe} g (3 oz) cooked` && Math.round(S.cutsReadyToCook / (LB / 16)) === 4 && Math.round(S.cutsReadyToServe / (LB / 16)) === 3, "meat per-guest text: 4 oz raw, 3 oz cooked");
  ok(P.totalText(P.ITEMS.find((i) => i.key === "meat"), 25) === `${r2((25 * 114) / LB)} lb (${r2(2.85)} kg)`, "25 guests meat total text");
  ok(P.totalText(P.ITEMS.find((i) => i.key === "ice-cream"), 24) === "16 cups (1 gal)", "24 x 2/3 cup = 1 gal");
  ok(P.totalText(P.ITEMS.find((i) => i.key === "dip"), 25) === "3.13 cups", "25 x 2 tbsp = 3.13 cups");
  ok(P.totalText(P.ITEMS.find((i) => i.key === "drinks"), 50) === "50 drinks (18 L)", "50 drinks = 18 L");
}

// 3. every figure written on the page
const T = page.replace(/\{" "\}/g, " ").replace(/<[^>]+>/g, "").replace(/&apos;/g, "'").replace(/\s+/g, " ");
const meat25 = r1((25 * S.cutsReadyToCook) / LB);
ok(T.includes(`Plan 4 ounces of raw boneless meat or poultry per guest: USDA's reference serving, 3 ounces once cooked.`), "hero answer");
ok(T.includes(`For 25 guests that's ${meat25} lb of raw meat.`) && page.includes(`value={${meat25}}`), "hero sub and dial: 6.3 lb");
ok(T.includes("taken from USDA's 1977–78 and 1987–88 Nationwide Food Consumption Surveys and updated with CDC survey data from 2003–2008"), "survey sentence");
const faq = Object.fromEntries([...page.matchAll(/question: "([^"]+)",\s*answer:\s*"([^"]+)"/g)].map((m) => [m[1], m[2]]));
const expect = {
  "How much meat do I need per person?": `4 oz (${S.cutsReadyToCook} g) of raw boneless meat or poultry, which is about 3 oz (${S.cutsReadyToServe} g) cooked: USDA's reference amounts for cuts of meat and poultry. For 25 guests, buy ${meat25} lb (${r2((25 * S.cutsReadyToCook) / 1000)} kg).`,
  "How much pasta per person?": `${F.pastaDry} g (about 2 oz) dry, or ${F.cookedGrain} g cooked, the FDA reference amount. A 1-lb box holds ${Math.floor(LB / F.pastaDry)} servings.`,
  "How much rice per person?": `${F.riceDry} g dry, or ${F.cookedGrain} g cooked, the FDA reference amount: ${Math.floor(LB / F.riceDry)} servings to a pound of dry rice.`,
  "How many drinks per person?": `One 12 fl oz (${F.drinkMl} mL) drink per serving, the FDA reference amount for soft drinks and water. 25 guests having 2 drinks each need ${25 * 2}.`,
  "How much ice cream do I need for a party?": `⅔ cup per guest, the FDA reference amount, so a gallon serves ${16 / F.iceCreamCup}.`,
  "How much cake per person?": `${F.cake} g of iced layer cake or cupcakes, FDA's reference amount for mediumweight cakes, or ${F.cheesecake} g of cheesecake.`,
  "How much chips and dip per person?": `${F.chips} g (about 1 oz) of chips and ${F.dipTbsp} tbsp of dip, the FDA reference amounts. For 25 guests: ${r2((25 * F.chips) / LB)} lb of chips and ${25 * F.dipTbsp} tbsp, or 3⅛ cups, of dip.`,
  "Where do these portion sizes come from?": "From the reference amounts customarily consumed per eating occasion that FDA and USDA set for food labels, based on national food consumption surveys. They describe one eating occasion, so add servings for guests who go back for more.",
};
ok((25 * F.dipTbsp) / 16 === 3.125 && Math.abs(F.pastaDry - 2 * (LB / 16)) < 2 && Math.abs(F.chips - LB / 16) < 2, "3⅛ cups; 55 g about 2 oz; 30 g about 1 oz");
ok(Object.keys(faq).length === Object.keys(expect).length, `FAQ count ${Object.keys(faq).length}, want ${Object.keys(expect).length}`);
for (const [q, a] of Object.entries(expect)) ok(faq[q] === a, `FAQ "${q}"\n   page: ${faq[q]}\n   want: ${a}`);
console.log(`party data: ${checked} checked, ${failed} failed, 0 skipped`);
process.exit(failed ? 1 : 0);
