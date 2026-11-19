// Re-checks src/data/microwave.ts and the times written on the microwave page against research/sources/microwave.json.
// Usage: node scripts/check-microwave-data.mjs   (exit 1 on any mismatch)
import { readFileSync } from "node:fs";

const read = (p) => readFileSync(new URL(p, import.meta.url), "utf8");
const data = read("../src/data/microwave.ts");
const page = read("../src/app/(instrument)/microwave-to-oven-converter/page.tsx");
const ref = JSON.parse(read("../research/sources/microwave.json"));
let checked = 0, failed = 0;
const ok = (cond, label) => { checked++; if (!cond) { failed++; console.error("FAIL", label); } };
const V = ref.values;
const frac = { 0.25: "1 / 4", 0.3333333333333333: "1 / 3", 0.5: "1 / 2", 0.6666666666666666: "2 / 3" };
for (const [k, v] of Object.entries(V)) ok(data.includes(`${k}: ${frac[v] ?? v},`), `GE_MW.${k} = ${frac[v] ?? v}`);
ok(ref.quotes.some((q) => q.includes("1/4 to 1/3")) && ref.quotes.some((q) => q.includes("15 - 20 minutes")), "quotes present");

const T = page.replace(/\{" "\}/g, " ").replace(/\s+/g, " ");
const r1 = (n) => Math.round(n * 10) / 10;
ok(T.replace(/<[^>]+>/g, "").includes(`${60 * V.fracLo} to ${60 * V.fracHi} minutes in the microwave`), "answer: 1 hour -> 15 to 20");
ok(T.includes(`${60 * V.fracLo} to ${60 * V.fracHi} minutes, according to GE`), "FAQ 1 hour");
ok(T.includes(`10 minutes in the microwave is ${r1(10 / V.fracHi)} to ${r1(10 / V.fracLo)} minutes in the oven`), "reverse 10 min");
ok(T.includes(`A 10-minute recipe doubled takes ${r1(10 * (1 + V.doubleAddLo))} to ${r1(10 * (1 + V.doubleAddHi))} minutes`), "double 10 min");
ok(T.includes(`a 9-minute recipe halved takes ${r1(9 * (1 - V.halfTimeCut))} minutes`), "half 9 min");
ok(T.includes(`4 minutes in an 1100 W oven is about ${r1((4 * 1100) / 700)} minutes in a 700 W one`), "wattage 1100 -> 700");
console.log(`microwave data: ${checked} checked, ${failed} failed, 0 skipped`);
process.exit(failed ? 1 : 0);
