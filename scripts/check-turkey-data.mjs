// Re-checks the figures in src/data/turkey-data.ts against the USDA snapshot in research/sources.
// Usage: node scripts/check-turkey-data.mjs   (exit 1 on any mismatch)
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("../src/data/turkey-data.ts", import.meta.url), "utf8");
const ref = JSON.parse(readFileSync(new URL("../research/sources/usda-fsis-turkey.json", import.meta.url), "utf8"));
let checked = 0, failed = 0;
const ok = (cond, label) => { checked++; if (!cond) { failed++; console.error("FAIL", label); } };

function rows(name, fields) {
  const block = src.split(`export const ${name}`)[1]?.split("];")[0] ?? "";
  return [...block.matchAll(/\{([^}]*)\}/g)].map((m) => fields.map((f) => Number((m[1].match(new RegExp(f + ":\\s*([\\d.]+)")) || [])[1])));
}
const cmp = (name, got, want) => {
  ok(got.length === want.length, `${name}: ${got.length} rows, want ${want.length}`);
  want.forEach((w, i) => ok(JSON.stringify(got[i]) === JSON.stringify(w), `${name} row ${i}: got ${JSON.stringify(got[i])} want ${JSON.stringify(w)}`));
};
cmp("roastUnstuffed", rows("roastUnstuffed", ["minLb", "maxLb", "lowHours", "highHours"]), ref.roastUnstuffed);
cmp("roastStuffed", rows("roastStuffed", ["minLb", "maxLb", "lowHours", "highHours"]), ref.roastStuffed);
cmp("thawTable", rows("thawTable", ["minLb", "maxLb", "fridgeDaysLow", "fridgeDaysHigh", "waterHoursLow", "waterHoursHigh"]), ref.thaw);
for (const [key, [minW, maxW, lo, hi]] of Object.entries(ref.methods)) {
  const block = src.split(`key: "${key}"`)[1]?.split("},")[0] ?? "";
  const n = (f) => Number((block.match(new RegExp(f + ":\\s*([\\d.]+)")) || [])[1]);
  ok(n("minWeight") === minW && n("maxWeight") === maxW, `${key} weights ${n("minWeight")}-${n("maxWeight")} want ${minW}-${maxW}`);
  ok(n("minPerLbLow") === lo && n("minPerLbHigh") === hi, `${key} rate ${n("minPerLbLow")}-${n("minPerLbHigh")} want ${lo}-${hi}`);
}
ok(new RegExp(`STAND_MINUTES = ${ref.standMinutes}\\b`).test(src), "STAND_MINUTES");
ok(new RegExp(`SAFE_TEMP_F = ${ref.safeTempF}\\b`).test(src), "SAFE_TEMP_F");
console.log(`turkey data: ${checked} checked, ${failed} failed, 0 skipped`);
process.exit(failed ? 1 : 0);
