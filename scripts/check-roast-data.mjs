// Re-checks src/data/roasting-times.ts and the times written on the meat cooking time page against research/sources/roasting-times.json.
// Usage: node scripts/check-roast-data.mjs   (exit 1 on any mismatch)
import { readFileSync } from "node:fs";

const read = (p) => readFileSync(new URL(p, import.meta.url), "utf8");
const data = read("../src/data/roasting-times.ts");
const page = read("../src/app/(instrument)/meat-cooking-time-calculator/page.tsx");
const ref = JSON.parse(read("../research/sources/roasting-times.json"));
let checked = 0, failed = 0;
const ok = (cond, label) => { checked++; if (!cond) { failed++; console.error("FAIL", label); } };
const num = (s) => (s === undefined || s === "null" ? null : Number(s));

// 1. rows
const rows = [...data.matchAll(/\{ id: "([^"]+)", kind: "\w+", section: "[\w-]+", name: "[^"]*", lbLo: ([\d.]+|null), lbHi: ([\d.]+|null), weightText: "[^"]*", ovenLo: (\d+), ovenHi: (\d+)(?:, perLbLo: (\d+), perLbHi: (\d+))?(?:, totalLo: (\d+), totalHi: (\d+))?/g)]
  .map((m) => [m[1], num(m[2]), num(m[3]), +m[4], +m[5], num(m[6]), num(m[7]), num(m[8]), num(m[9])]);
ok(rows.length === ref.rows.length, `ROASTS: ${rows.length} rows, want ${ref.rows.length}`);
ref.rows.forEach((w) => ok(JSON.stringify(rows.find((r) => r[0] === w[0])) === JSON.stringify(w), `row ${w[0]}: got ${JSON.stringify(rows.find((r) => r[0] === w[0]))}`));
ok(data.includes(`STUFFED_ADD = { lo: ${ref.stuffed_add[0]}, hi: ${ref.stuffed_add[1]} }`), "STUFFED_ADD");
for (const [sec, d] of Object.entries(ref.done)) {
  const re = new RegExp(`"?${sec}"?: \\{ f: ${d[0]}, c: ${d[1]}, restMin: ${d[2]}${d[3] ? `, alt: \\{ f: ${d[3]}, c: ${d[4]} \\}` : ""} \\}`);
  ok(re.test(data), `DONE ${sec}`);
}

// 2. figures written in the page text
const all = [...ref.rows, ...ref.left_out];
const text = page.replace(/\{" "\}/g, " ").replace(/<[^>]+>/g, "").replace(/\s+/g, " ");
for (const m of text.matchAll(/(\d+) to (\d+) minutes per pound/g)) {
  const [a, b] = [+m[1], +m[2]];
  ok(all.some((r) => r[5] === a && r[6] === b) || (a === 20 && b === 25 && ref.country_ham.includes("20 to 25 min/lb")), `per-lb pair ${m[0]}`);
}
for (const m of text.matchAll(/(?<!to )\b(\d+) minutes per pound/g)) ok(all.some((r) => r[5] === +m[1] && r[6] === +m[1]), `per-lb single ${m[0]}`);
for (const m of text.matchAll(/\b[Aa] ([\d.]+)-lb [^.]*? takes (\d+) to (\d+) minutes/g)) {
  const [w, a, b] = [+m[1], +m[2], +m[3]];
  ok(all.some((r) => r[1] !== null && w >= r[1] && w <= r[2] && r[5] !== null && w * r[5] === a && w * r[6] === b), `weight x rate ${m[0]}`);
}
for (const m of text.matchAll(/\b[Aa] ([\d.]+)-lb [^.]*? takes (\d+) minutes/g)) {
  const [w, a] = [+m[1], +m[2]];
  ok(all.some((r) => r[1] !== null && w >= r[1] && w <= r[2] && r[5] !== null && r[5] === r[6] && w * r[5] === a), `weight x rate ${m[0]}`);
}
for (const m of text.matchAll(/(\d+) to (\d+) minutes in all/g)) ok(all.some((r) => r[7] === +m[1] && r[8] === +m[2]), `total ${m[0]}`);
const hmToMin = (h, m) => +h * 60 + (m ? +m : 0);
for (const m of text.matchAll(/(\d+) hr(?: (\d+) min)? to (\d+) hr(?: (\d+) min)?/g)) {
  const [a, b] = [hmToMin(m[1], m[2]), hmToMin(m[3], m[4])];
  ok(all.some((r) => r[7] === a && r[8] === b), `total ${m[0]} (${a}-${b} min)`);
}
const ovens = new Set([...all.flatMap((r) => [r[3], r[4]]), 400]);
const temps = new Set(Object.values(ref.done).flatMap((d) => [d[0], d[3]]).filter(Boolean));
for (const m of text.matchAll(/(\d+)°F/g)) ok(ovens.has(+m[1]) || temps.has(+m[1]), `°F value ${m[0]}`);
console.log(`roast data: ${checked} checked, ${failed} failed, 0 skipped`);
process.exit(failed ? 1 : 0);
