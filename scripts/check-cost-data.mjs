// Re-checks src/data/units.ts (exact US customary definitions) and the arithmetic written on the recipe cost page.
// Usage: node scripts/check-cost-data.mjs   (exit 1 on any mismatch)
import { readFileSync } from "node:fs";

const read = (p) => readFileSync(new URL(p, import.meta.url), "utf8");
const data = read("../src/data/units.ts");
const page = read("../src/app/(instrument)/recipe-cost-calculator/page.tsx");
let checked = 0, failed = 0;
const ok = (cond, label) => { checked++; if (!cond) { failed++; console.error("FAIL", label); } };

// 1. exact definitions (NIST SP 811 App. B / US customary): lb = 0.45359237 kg exactly; gallon = 231 in³ = 3.785411784 L
ok(data.includes("lb: { kind: \"mass\", base: 453.59237 }"), "lb = 453.59237 g");
ok(data.includes("oz: { kind: \"mass\", base: 453.59237 / 16 }"), "oz = lb / 16");
ok(data.includes("const GAL_ML = 3785.411784;"), "gal = 3785.411784 mL");
ok(Math.abs(231 * 2.54 ** 3 - 3785.411784) < 1e-9, "231 in³ = 3785.411784 mL");
for (const [u, d] of [["qt", 4], ["cup", 16], ["\"fl oz\"", 128], ["tbsp", 256], ["tsp", 768]]) ok(data.includes(`${u}: { kind: "volume", base: GAL_ML / ${d} }`), `${u} = gal / ${d}`);

// 2. arithmetic on the page
const T = page.replace(/\{" "\}/g, " ").replace(/<[^>]+>/g, "").replace(/\s+/g, " ");
const near = (a, b, dp) => Math.abs(a - b) <= 0.5 / 10 ** dp + 1e-9;
for (const m of T.matchAll(/(\d+(?:\.\d+)?) ÷ (\d+(?:\.\d+)?) × (\d+(?:\.\d+)?) = \$(\d+\.\d+)/g)) ok(near((+m[1] / +m[2]) * +m[3], +m[4], 2), `a ÷ b × c: ${m[0]}`);
for (const m of T.matchAll(/\$?(\d+(?:\.\d+)?) ÷ (\d+(?:\.\d+)?) = \$(\d+\.\d+)/g)) ok(near(+m[1] / +m[2], +m[3], 2), `a ÷ b: ${m[0]}`);
ok(page.includes("5 lb for $4.00") && page.includes("250 ÷ 2267.96 × 4.00 = $0.44") && near(5 * 453.59237, 2267.96, 2), "5 lb = 2267.96 g");
for (const m of page.matchAll(/(\d+(?:\.\d+)?) ÷ (\d+(?:\.\d+)?) × (\d+(?:\.\d+)?) = \$(\d+\.\d+)/g)) ok(near((+m[1] / +m[2]) * +m[3], +m[4], 2), `table a ÷ b × c: ${m[0]}`);
const total = 250 / (5 * 453.59237) * 4 + 1.5 / 16 * 4 + 2 / 12 * 3;
ok(T.includes(`$${total.toFixed(2)}`), `total ${total.toFixed(4)}`);
ok(T.includes(`A $${total.toFixed(2)} recipe that serves 4 costs $${(total / 4).toFixed(2)}`), "answer per serving");
ok(T.includes("A $0.33 serving sold for $1.10 is a 30% food cost") && near(0.33 / 1.1, 0.3, 2), "food cost % example");
ok(T.includes("A pound is exactly 453.59237 grams and an ounce, a sixteenth of a pound, is 28.349523125 grams") && 453.59237 / 16 === 28.349523125, "lb and oz in FAQ");
console.log(`cost data: ${checked} checked, ${failed} failed, 0 skipped`);
process.exit(failed ? 1 : 0);
