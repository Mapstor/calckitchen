// Re-checks src/data/coffee.ts (SCA Standard 310-2021, NCA brewing guides, USDA water) and every figure written on the coffee
// ratio page against research/sources/coffee.json.
// Usage: node scripts/check-coffee-data.mjs   (Node 22.18+ for the TypeScript import; exit 1 on any mismatch)
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.removeAllListeners("warning"); // the TypeScript import below prints an ExperimentalWarning on Node 22
const read = (p) => readFileSync(new URL(p, import.meta.url), "utf8");
const data = read("../src/data/coffee.ts");
const page = read("../src/app/(instrument)/coffee-ratio-calculator/page.tsx");
const ref = JSON.parse(read("../research/sources/coffee.json"));
let checked = 0, failed = 0;
const ok = (cond, label) => { checked++; if (!cond) { failed++; console.error("FAIL", label); } };
const r1 = (x) => (Math.round(x * 10) / 10).toString();

const dir = mkdtempSync(join(tmpdir(), "ck-coffee-"));
writeFileSync(join(dir, "units.ts"), read("../src/data/units.ts"));
writeFileSync(join(dir, "coffee.ts"), data.replace('from "./units"', 'from "./units.ts"'));
let C = null;
try {
  C = await import(join(dir, "coffee.ts"));
} catch (e) {
  ok(false, `import coffee.ts (${e.message})`);
}

const S = ref.sca.values, N = ref.nca.values, Q = ref.sca.quotes.join(" | "), P = ref.nca.pages;
// 1. snapshot quotes carry the values
ok(Q.includes(`${S.gPerKg} g of coffee per 1.000 kg of water`) && Q.includes(`${S.tempLoC} to ${S.tempHiC}°C range`), "SCA quotes: 55 g/kg, 90 to 96°C");
const page_ = (k) => P[`https://www.aboutcoffee.org/brewing/${k}/`].join(" | ");
ok(page_("drip-coffee").includes(`${N.tbspLo} to ${N.tbspHi} tablespoons of ground coffee for every ${N.perFlOz} ounces of water`), "NCA drip quote");
ok(page_("pour-over-coffee").includes(`(1:${N.pourover[0]} to 1:${N.pourover[1]})`) && page_("pour-over-coffee").includes(`${N.tempC} ± ${N.tempPlusMinus}°C`), "NCA pour-over quote");
ok(page_("french-press-coffee").includes(`(1:${N.frenchpress[0]} to 1:${N.frenchpress[1]})`) && page_("french-press-coffee").includes(`${N.tempC} ± ${N.tempPlusMinus}°C`), "NCA French press quote");
ok(page_("cold-brew-coffee").includes(`(1:${N.coldbrew[0]} to 1:${N.coldbrew[1]})`) && page_("cold-brew-coffee").includes(`${N.coldBrewHours} hours, or overnight`), "NCA cold brew quote");
ok(page_("espresso").includes("(1:2)"), "NCA espresso quote");
ok(ref.water.measures["1 liter"] === 1000, "USDA water 1 L = 1000 g");

if (C) {
  // 2. data module = sources
  ok(C.SCA.gPerKg === S.gPerKg && C.SCA.tempLoC === S.tempLoC && C.SCA.tempHiC === S.tempHiC, "SCA constants");
  ok(C.NCA.tbspLo === N.tbspLo && C.NCA.tbspHi === N.tbspHi && C.NCA.perFlOz === N.perFlOz && C.NCA_TEMP.c === N.tempC && C.NCA_TEMP.plusMinus === N.tempPlusMinus && C.COLD_BREW_HOURS === N.coldBrewHours, "NCA constants");
  const M = (k) => C.METHODS.find((m) => m.key === k);
  ok(Math.abs(M("drip").lo - 1000 / S.gPerKg) < 1e-12 && M("drip").hi === M("drip").lo, "drip = 1000/55");
  for (const k of ["pourover", "frenchpress", "coldbrew", "espresso"]) ok(M(k).lo === N[k][0] && M(k).hi === N[k][1], `${k} 1:${N[k][0]}-1:${N[k][1]}`);
  ok(C.WATER_G_PER_L === ref.water.measures["1 liter"], "water constant");

  // 3. page text
  const T = page.replace(/\{" "\}/g, " ").replace(/<[^>]+>/g, "").replace(/&apos;/g, "'").replace(/\s+/g, " ");
  ok(T.includes(`Use ${S.gPerKg} g of coffee per liter of water in a drip brewer: the SCA's standard ratio, about 1:${Math.round(1000 / S.gPerKg)}.`), "hero answer");
  ok(T.includes(`gives 1:${N.pourover[0]} to 1:${N.pourover[1]} for pour-over, 1:${N.frenchpress[0]} to 1:${N.frenchpress[1]} for French press, 1:${N.coldbrew[0]} to 1:${N.coldbrew[1]} for cold brew and 1:2 for espresso, or ${N.tbspLo} to ${N.tbspHi} tablespoons per ${N.perFlOz} ounces of water`), "hero sub");
  ok(T.includes(`which also requires ${S.tempLoC} to ${S.tempHiC}°C while brewing`) && T.includes(`both with water at ${N.tempC} ± ${N.tempPlusMinus}°C`) && T.includes(`steeped ${N.coldBrewHours} hours or overnight`), "sources list");
  const desc = page.match(/const DESC =\s*"([^"]+)"/)[1];
  ok(desc.includes(`${S.gPerKg} g per liter for drip`) && desc.includes(`1:${N.pourover[0]} to 1:${N.pourover[1]} pour-over`) && desc.includes(`1:${N.frenchpress[0]} to 1:${N.frenchpress[1]} French press`) && desc.includes(`1:${N.coldbrew[0]} to 1:${N.coldbrew[1]} cold brew`), "meta description");
  const flOz = C.ML_PER_FLOZ;
  const lo = (r) => r1(1000 / r), cF = (c) => c * 9 / 5 + 32;
  const faq = Object.fromEntries([...page.matchAll(/question: "([^"]+)",\s*answer:\s*"([^"]+)"/g)].map((m) => [m[1], m[2]]));
  const expect = {
    "What is the best coffee to water ratio?": `It depends on the method. The SCA's standard for drip brewers is ${S.gPerKg} g of coffee per liter of water, about 1:${Math.round(1000 / S.gPerKg)}; the National Coffee Association gives 1:${N.pourover[0]} to 1:${N.pourover[1]} for pour-over and 1:${N.frenchpress[0]} to 1:${N.frenchpress[1]} for French press.`,
    "How much coffee for 1 liter of water?": `${S.gPerKg} g in a drip brewer, at the SCA's standard ratio. For pour-over at the NCA's 1:${N.pourover[1]} to 1:${N.pourover[0]}, it's ${lo(N.pourover[1])} to ${lo(N.pourover[0])} g.`,
    "What is the cold brew ratio?": `1 g of coffee to ${N.coldbrew[0]} to ${N.coldbrew[1]} g of water, steeped ${N.coldBrewHours} hours or overnight, says the National Coffee Association. A liter of water takes ${1000 / N.coldbrew[1]} to ${1000 / N.coldbrew[0]} g of coffee.`,
    "What is the espresso ratio?": `1:2 by weight: 1 g of dry coffee to 2 g of liquid espresso, per the NCA. An 18 g dose makes ${18 * 2} g of espresso.`,
    "How many tablespoons of coffee per cup?": `${N.tbspLo} to ${N.tbspHi} tablespoons per ${N.perFlOz} ounces of water, the NCA's Golden Ratio for drip coffee. An 8-ounce mug takes 1⅓ to 2⅔ tablespoons.`,
    "What water temperature is best for coffee?": `${N.tempC} ± ${N.tempPlusMinus}°C, about ${Math.round(cF(N.tempC - N.tempPlusMinus))} to ${Math.round(cF(N.tempC + N.tempPlusMinus))}°F, for pour-over and French press, per the NCA. The SCA's home brewer standard holds ${S.tempLoC} to ${S.tempHiC}°C while brewing.`,
    "How many grams of coffee for a 12-ounce cup?": `${r1((12 * flOz * S.gPerKg) / 1000)} g in a drip brewer at the SCA ratio: 12 fl oz is ${r1(12 * flOz)} mL of water.`,
    "What does a 1:16 ratio mean?": `1 g of coffee for every 16 g of water, so 1 liter of water takes ${1000 / 16} g of coffee.`,
  };
  ok(Math.abs((8 / N.perFlOz) * N.tbspLo - 4 / 3) < 1e-12 && Math.abs((8 / N.perFlOz) * N.tbspHi - 8 / 3) < 1e-12, "8 oz mug: 1⅓ to 2⅔ tbsp");
  ok(Object.keys(faq).length === Object.keys(expect).length, `FAQ count ${Object.keys(faq).length}, want ${Object.keys(expect).length}`);
  for (const [q, a] of Object.entries(expect)) ok(faq[q] === a, `FAQ "${q}"\n   page: ${faq[q]}\n   want: ${a}`);
  ok(page.includes("value={55}") && Math.abs(C.coffeeRange(1000, M("drip")).lo - S.gPerKg) < 1e-9, "dial starts at 55 g for 1 L");
}
console.log(`coffee data: ${checked} checked, ${failed} failed, 0 skipped`);
process.exit(failed ? 1 : 0);
