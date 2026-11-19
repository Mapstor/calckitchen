// Re-checks src/data/meat-temps.ts and the temperatures written on the meat chart page against research/sources/meat-temps.json.
// Usage: node scripts/check-meat-data.mjs   (exit 1 on any mismatch)
import { readFileSync } from "node:fs";

const read = (p) => readFileSync(new URL(p, import.meta.url), "utf8");
const data = read("../src/data/meat-temps.ts");
const page = read("../src/app/(instrument)/meat-temperature-chart/page.tsx");
const ref = JSON.parse(read("../research/sources/meat-temps.json"));
let checked = 0, failed = 0;
const ok = (cond, label) => { checked++; if (!cond) { failed++; console.error("FAIL", label); } };
const num = (s) => (s === "null" ? null : Number(s));

// 1. USDA rows
const rows = [...data.matchAll(/\{ id: "([^"]+)", short: "[^"]*", group: "\w+", food: "[^"]*", cut: "[^"]*", f: (\d+|null), c: (\d+|null), restMin: (\d+)/g)].map((m) => [m[1], num(m[2]), num(m[3]), +m[4]]);
ok(rows.length === ref.usda.rows.length, `SAFE: ${rows.length} rows, want ${ref.usda.rows.length}`);
ref.usda.rows.forEach((w) => ok(JSON.stringify(rows.find((r) => r[0] === w[0])) === JSON.stringify(w), `SAFE ${w[0]}: got ${JSON.stringify(rows.find((r) => r[0] === w[0]))}`));
ok(new RegExp(`HAM_USDA_PLANT = \\{ f: ${ref.usda.ham_usda_plant[0]}, c: ${ref.usda.ham_usda_plant[1]} \\}`).test(data), "HAM_USDA_PLANT");

// 2. Beef Checkoff and ATK
const v = ref.checkoff.values;
ok(data.includes(`CHECKOFF = { mediumRare: ${v.mediumRare}, medium: ${v.medium}, wellDone: ${v.wellDone}, ground: ${v.ground}, restMin: ${v.restMin} }`), "CHECKOFF");
const atk = [...data.matchAll(/\{ level: "([^"]+)", pullLo: (\d+), pullHi: (\d+), serveLo: (\d+), serveHi: (\d+) \}/g)].map((m) => [m[1], +m[2], +m[3], +m[4], +m[5]]);
ok(JSON.stringify(atk) === JSON.stringify(ref.atk.rows), `ATK rows: ${JSON.stringify(atk)}`);
ok(data.includes(`ATK_RISE = { lo: ${ref.atk.rise[0]}, hi: ${ref.atk.rise[1]} }`), "ATK_RISE");

// 3. Temperatures written in the page text: every °F/°C pair is a USDA pair, every lone °F is a sourced value.
const pairs = new Set([...ref.usda.rows.filter((r) => r[1] !== null).map((r) => `${r[1]}/${r[2]}`), `${ref.usda.ham_usda_plant[0]}/${ref.usda.ham_usda_plant[1]}`]);
const known = new Set([...ref.usda.rows.map((r) => r[1]).filter(Boolean), ref.usda.ham_usda_plant[0], ...Object.values(v), ...ref.atk.rows.flatMap((r) => r.slice(1))]);
const text = page.replace(/\{" "\}/g, " ");
for (const m of text.matchAll(/(\d+)°F \((\d+)°C\)/g)) ok(pairs.has(`${m[1]}/${m[2]}`), `pair ${m[0]}`);
for (const m of text.matchAll(/(\d+)(?: to (\d+))?°F/g)) {
  ok(known.has(+m[1]) && (!m[2] || known.has(+m[2])), `°F value ${m[0]}`);
}
for (const m of text.matchAll(/(\d+)-minute rest|rest (?:for|of at least) (\d+) minutes/g)) ok(+(m[1] ?? m[2]) === 3, `rest ${m[0]}`);
// ATK ranges quoted in prose match the table rows
for (const m of text.matchAll(/serves medium-rare at (\d+) to (\d+)°F, taking the steak off the heat at (\d+) to (\d+)°F/g)) {
  const r = ref.atk.rows.find((x) => x[0] === "Medium-rare");
  ok(+m[1] === r[3] && +m[2] === r[4] && +m[3] === r[1] && +m[4] === r[2], `ATK prose ${m[0]}`);
}
console.log(`meat data: ${checked} checked, ${failed} failed, 0 skipped`);
process.exit(failed ? 1 : 0);
