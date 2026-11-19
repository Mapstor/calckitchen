// Re-checks src/data/bakers.ts and the figures on the pizza dough and baker's percentage pages against research/sources/bakers.json.
// Usage: node scripts/check-bakers-data.mjs   (exit 1 on any mismatch)
import { readFileSync } from "node:fs";

const read = (p) => readFileSync(new URL(p, import.meta.url), "utf8");
const data = read("../src/data/bakers.ts");
const pizza = read("../src/app/(instrument)/pizza-dough-calculator/page.tsx");
const bakers = read("../src/app/(instrument)/bakers-percentage-calculator/page.tsx");
const ref = JSON.parse(read("../research/sources/bakers.json"));
let checked = 0, failed = 0;
const ok = (cond, label) => { checked++; if (!cond) { failed++; console.error("FAIL", label); } };
const flat = (s) => s.replace(/\{" "\}/g, " ").replace(/<[^>]+>/g, "").replace(/&apos;/g, "'").replace(/\s+/g, " ");
const r1 = (n) => Math.round(n * 10) / 10;

// 1. EU values
const V = ref.eu_napoletana.values;
for (const [k, v] of Object.entries(V)) ok(new RegExp(`\\b${k}: ${v},`).test(data), `NAPOLETANA.${k} = ${v}`);
ok(data.includes("(g / flourG) * 100"), "bakersPct is weight / flour x 100");

// 2. Pizza page figures
const pct = (g) => (g / V.flourG) * 100;
const w = pct(V.waterG), s = pct((V.saltLoG + V.saltHiG) / 2), y = pct(V.yeastG);
const flour = 1000 / (1 + (w + s + y) / 100);
const P = flat(pizza);
const m = P.match(/Four 250-g Neapolitan pizzas: (\d+) g flour, (\d+) g water, ([\d.]+) g salt, ([\d.]+) g yeast/);
ok(m, "pizza answer present");
if (m) {
  ok(+m[1] === Math.round(flour), `answer flour ${m[1]} vs ${flour.toFixed(2)}`);
  ok(+m[2] === Math.round((flour * w) / 100), `answer water ${m[2]}`);
  ok(+m[3] === r1((flour * s) / 100), `answer salt ${m[3]}`);
  ok(+m[4] === r1((flour * y) / 100), `answer yeast ${m[4]}`);
}
ok(P.includes(`${r1(w)}% hydration`), `hydration ${r1(w)}%`);
ok(P.includes(`${r1(pct(V.saltLoG))} to ${r1(pct(V.saltHiG))}% of the flour weight`), "salt % range");
ok(P.includes(`about ${(Math.round(y * 100) / 100).toFixed(2)}% of the flour weight`), "yeast %");
ok(P.includes(`${V.ovenC}°C (${V.ovenC * 1.8 + 32}°F)`), "485°C in °F");
const div = (1 + (w + s + y) / 100).toFixed(4);
ok(P.includes(`add up to ${r1(w + s + y)}% of the flour, so the flour is 1000 ÷ ${div} = ${Math.round(1000 / +div)} g`), "pizza worked example");
ok(P.includes("650 g of water for 1000 g of flour is 65% hydration"), "65% example");

// 3. Baker's page figures
const B = flat(bakers);
ok(B.includes("350 g of water for 500 g of flour is 70% hydration"), "70% example");
const tot = 100 + 70 + 2 + 1;
ok(B.includes(`totals ${tot}%`), "173% total");
const f2 = 1000 / (tot / 100);
ok(B.includes(`1000 ÷ ${tot / 100} = ${Math.round(f2)} g`), `scaled flour ${f2.toFixed(2)}`);
ok(B.includes(`water (${Math.round(f2 * 0.7)} g)`) && B.includes(`salt (${r1(f2 * 0.02)} g)`) && B.includes(`yeast (${r1(f2 * 0.01)} g)`), "scaled water, salt, yeast");
// 4. Every division written out on either page is right (to the rounding shown)
for (const T of [P, B]) {
  for (const m2 of T.matchAll(/(\d+(?:\.\d+)?) ÷ (\d+(?:\.\d+)?) = (\d+(?:\.\d+)?)/g)) {
    const [a, b, c] = [+m2[1], +m2[2], m2[3]];
    const dec = (c.split(".")[1] || "").length;
    ok(Math.abs(a / b - +c) <= 0.5 / 10 ** dec + 1e-9, `division ${m2[0]} (is ${(a / b).toFixed(3)})`);
  }
}
console.log(`bakers data: ${checked} checked, ${failed} failed, 0 skipped`);
process.exit(failed ? 1 : 0);
