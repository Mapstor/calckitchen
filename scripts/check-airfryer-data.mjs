// Re-checks src/data/air-fryer.ts and every conversion written on the air fryer page against research/sources/air-fryer.json.
// Usage: node scripts/check-airfryer-data.mjs   (exit 1 on any mismatch)
import { readFileSync } from "node:fs";

const read = (p) => readFileSync(new URL(p, import.meta.url), "utf8");
const data = read("../src/data/air-fryer.ts");
const page = read("../src/app/(instrument)/air-fryer-converter/page.tsx");
const ref = JSON.parse(read("../research/sources/air-fryer.json"));
let checked = 0, failed = 0;
const ok = (cond, label) => { checked++; if (!cond) { failed++; console.error("FAIL", label); } };
const R = ref.rule, T = ref.tips;

ok(data.includes(`AF_RULE = { dropLoF: ${R.dropLoF}, dropHiF: ${R.dropHiF}, timeCutPct: ${R.timeCutPct} }`), "AF_RULE");
ok(data.includes(`AF_TIPS = { preheatMin: ${T.preheatMin}, reheatF: ${T.reheatF}, reheatInternalF: ${T.reheatInternalF} }`), "AF_TIPS");

const f = (1 - R.timeCutPct / 100);
const flat = page.replace(/\{" "\}/g, " ").replace(/<[^>]+>/g, "").replace(/\s+/g, " ");
// FAQ: a question and its answer are checked together (the oven setting is often only in the question)
const qa = [...flat.matchAll(/question: "([^"]*)", answer: "([^"]*)"/g)].map((m) => `${m[1]} ${m[2]}`);
const rest = flat.replace(/const faqs[\s\S]*?\];/, "");
const units = [...qa, ...rest.split(/(?<=[.?!])\s+|"/)];
const text = flat;
for (const s of units) {
  if (/\$\{|=>/.test(s)) continue;
  const single = [...s.matchAll(/(?<!to )\b(\d+)°F/g)].map((m) => +m[1]);
  for (const m of s.matchAll(/\b(\d+) to (\d+)°F/g)) {
    const [lo, hi] = [+m[1], +m[2]];
    if (lo === R.dropLoF && hi === R.dropHiF) continue; // the rule itself
    const good = single.some((x) => (lo === x - R.dropHiF && hi === x - R.dropLoF) || (lo === x + R.dropLoF && hi === x + R.dropHiF));
    ok(good, `range ${m[0]} vs ${single.join(",")} in: ${s.slice(0, 140)}`);
  }
  const mins = [...s.matchAll(/\b(\d+) minutes/g)].map((m) => +m[1]);
  if (mins.length === 2 && !/typically/.test(s)) ok(Math.abs(mins[1] - mins[0] * f) < 0.01 || Math.abs(mins[0] - mins[1] * f) < 0.01, `time pair ${mins.join(" -> ")} in: ${s.slice(0, 140)}`);
}
ok(/a preheat is typically 3 minutes/.test(text), "preheat 3 minutes");
ok(/Set the air fryer to 350°F and heat the food until it reaches 165°F inside/.test(text), "reheat 350/165");
console.log(`air fryer data: ${checked} checked, ${failed} failed, 0 skipped`);
process.exit(failed ? 1 : 0);
