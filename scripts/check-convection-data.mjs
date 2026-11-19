// Re-checks src/data/convection.ts and the conversions written on the convection page against research/sources/convection.json.
// Usage: node scripts/check-convection-data.mjs   (exit 1 on any mismatch)
import { readFileSync } from "node:fs";

const read = (p) => readFileSync(new URL(p, import.meta.url), "utf8");
const data = read("../src/data/convection.ts");
const page = read("../src/app/(instrument)/convection-oven-converter/page.tsx");
const ref = JSON.parse(read("../research/sources/convection.json"));
let checked = 0, failed = 0;
const ok = (cond, label) => { checked++; if (!cond) { failed++; console.error("FAIL", label); } };
const drop = ref.frigidaire_bake.dropF, cut = ref.frigidaire_roast.timeCutPct;

ok(data.includes(`CONV = { bakeDropF: ${drop}, roastTimeCutPct: ${cut}, geAutoDropF: ${ref.ge.dropF} }`), "CONV constants");
ok(ref.frigidaire_bake.text.some((t) => t.includes(`by ${drop} degrees`)), "Frigidaire bake text says 25 degrees");
ok(ref.frigidaire_roast.text.some((t) => t.includes(`by ${cut}%`)), "Frigidaire roast text says 25%");

const flat = page.replace(/\{" "\}/g, " ").replace(/<[^>]+>/g, "").replace(/\s+/g, " ");
const qa = [...flat.matchAll(/question: "([^"]*)", answer: "([^"]*)"/g)].map((m) => `${m[1]} ${m[2]}`);
const rest = flat.replace(/const faqs[\s\S]*?\];/, "").split(/(?<=[.?!])\s+|"/);
for (const s of [...qa, ...rest]) {
  if (/\$\{|=>/.test(s)) continue;
  const temps = [...s.matchAll(/\b(\d+)°F/g)].map((m) => +m[1]).filter((v) => v !== drop);
  if (temps.length === 2) ok(temps[1] === temps[0] - drop, `bake pair ${temps.join(" -> ")} in: ${s.slice(0, 120)}`);
  const mins = [...s.matchAll(/\b(\d+) minutes/g)].map((m) => +m[1]);
  if (mins.length === 2) ok(mins[1] === mins[0] * (1 - cut / 100), `roast pair ${mins.join(" -> ")} in: ${s.slice(0, 120)}`);
}
console.log(`convection data: ${checked} checked, ${failed} failed, 0 skipped`);
process.exit(failed ? 1 : 0);
