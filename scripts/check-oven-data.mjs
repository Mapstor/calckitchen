// Re-checks src/data/oven-temps.ts and the figures written on the oven page against research/sources/oven-temps.json.
// Usage: node scripts/check-oven-data.mjs   (exit 1 on any mismatch)
import { readFileSync } from "node:fs";

const read = (p) => readFileSync(new URL(p, import.meta.url), "utf8");
const data = read("../src/data/oven-temps.ts");
const page = read("../src/app/(instrument)/oven-temperature-converter/page.tsx");
const ref = JSON.parse(read("../research/sources/oven-temps.json"));
let checked = 0, failed = 0;
const ok = (cond, label) => { checked++; if (!cond) { failed++; console.error("FAIL", label); } };

// 1. Data rows match the sources.
const rows = [...data.matchAll(/\{ gm: "([^"]+)", f: (\d+), c: (\d+), fan: (\d+), desc: "([^"]*)", src: "(\w+)" \}/g)].map((m) => ({
  gm: m[1], f: +m[2], c: +m[3], fan: +m[4], desc: m[5], src: m[6],
}));
const want = [
  ...ref.hotpoint.rows.map(([gm, f, c, fan]) => ({ gm, f, c, fan, desc: "", src: "HOTPOINT" })),
  ...ref.which.rows.map(([gm, f, c, fan, desc]) => ({ gm, f, c, fan, desc, src: "WHICH" })),
];
ok(rows.length === want.length, `GAS_ROWS: ${rows.length} rows, want ${want.length}`);
want.forEach((w, i) => ok(JSON.stringify(rows[i]) === JSON.stringify(w), `row ${w.gm}: got ${JSON.stringify(rows[i])}`));

// 2. Formulas are NIST's.
ok(/fToC = \(f: number\) => \(f - 32\) \/ 1\.8;/.test(data), "fToC is (f - 32) / 1.8");
ok(/cToF = \(c: number\) => c \* 1\.8 \+ 32;/.test(data), "cToF is c * 1.8 + 32");

// 3. Every temperature written in the page text is exact, or a chart value for a gas mark or temperature named in the same sentence.
const fToC = (f) => (f - 32) / 1.8, cToF = (c) => c * 1.8 + 32;
const r1 = (n) => Math.round(n * 10) / 10;
const text = page.replace(/\{" "\}/g, " ").replace(/&apos;/g, "'").replace(/<[^>]+>/g, " | ").replace(/[`"]/g, " | ");
const sentences = text.split(/\||(?<=[.?!])\s+/).map((x) => x.replace(/\s+/g, " ").trim()).filter(Boolean);
for (const s of sentences) {
  if (/\$\{|=>/.test(s)) continue; // code, not prose
  const temps = [...s.matchAll(/(\d+(?:\.\d+)?)°([FC])/g)].map((m) => ({ v: +m[1], u: m[2], raw: m[0], at: m.index }));
  const marks = [...s.matchAll(/gas mark (½|\d)/g)].map((m) => rows.find((r) => r.gm === m[1])).filter(Boolean);
  if (temps.length < 2 && !marks.length) continue; // a lone figure (a question) makes no claim
  for (const t of temps) {
    if ((t.v === 25 && t.u === "F" && /25°F (apart|steps)/.test(s)) || (t.v === 20 && t.u === "C" && /about 20°C lower/.test(s))) continue;
    const others = temps.filter((o) => o !== t);
    const exact = others.some((o) => (o.u === "F" && t.u === "C" && r1(fToC(o.v)) === t.v) || (o.u === "C" && t.u === "F" && r1(cToF(o.v)) === t.v)
      || (t.u === "F" && o.u === "C" && r1(fToC(t.v)) === o.v) || (t.u === "C" && o.u === "F" && r1(cToF(t.v)) === o.v));
    const chart = rows.some((r) => (t.u === "F" ? r.f === t.v : r.c === t.v || r.fan === t.v)
      && (marks.includes(r) || others.some((o) => (o.u === "F" ? r.f === o.v : r.c === o.v || r.fan === o.v))));
    ok(exact || chart, `page: "${t.raw}" in: ${s.slice(0, 160)}`);
  }
  for (const mk of marks) {
    if (temps.length) ok(temps.some((t) => (t.u === "F" ? mk.f === t.v : mk.c === t.v || mk.fan === t.v)), `page: gas mark ${mk.gm} vs temperatures in: ${s.slice(0, 160)}`);
  }
  // arithmetic steps written out: "350 − 32 = 318", "318 ÷ 1.8 = 176.7", "180 × 1.8 = 324", "324 + 32 = 356"
  for (const m of s.matchAll(/(\d+(?:\.\d+)?) ([−+×÷]) (\d+(?:\.\d+)?) = (\d+(?:\.\d+)?)/g)) {
    const [a, op, b, c] = [+m[1], m[2], +m[3], +m[4]];
    const v = op === "−" ? a - b : op === "+" ? a + b : op === "×" ? a * b : a / b;
    ok(r1(v) === c, `arithmetic: ${m[0]} (is ${r1(v)})`);
  }
}
console.log(`oven data: ${checked} checked, ${failed} failed, 0 skipped`);
process.exit(failed ? 1 : 0);
