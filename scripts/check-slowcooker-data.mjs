// Re-checks src/data/slow-cooker.ts and the times on the slow cooker page against research/sources/slow-cooker.json.
// Usage: node scripts/check-slowcooker-data.mjs   (exit 1 on any mismatch)
import { readFileSync } from "node:fs";

const read = (p) => readFileSync(new URL(p, import.meta.url), "utf8");
const data = read("../src/data/slow-cooker.ts");
const page = read("../src/app/(instrument)/slow-cooker-to-oven-converter/page.tsx");
const ref = JSON.parse(read("../research/sources/slow-cooker.json"));
let checked = 0, failed = 0;
const ok = (cond, label) => { checked++; if (!cond) { failed++; console.error("FAIL", label); } };
const rows = [...data.matchAll(/\{ ovenLo: (\d+), ovenHi: (\d+), lowLo: ([\d.]+), lowHi: ([\d.]+), highLo: ([\d.]+), highHi: ([\d.]+) \}/g)].map((m) => m.slice(1).map(Number));
ok(JSON.stringify(rows) === JSON.stringify(ref.crockpot.rows), `BANDS ${JSON.stringify(rows)}`);
ok(data.includes("CROCKPOT = { minLowHoursRawMeatVeg: 8, dairyLastHours: 1 }") && ref.crockpot.quotes[0].includes("8 hours on LOW") && ref.crockpot.quotes[1].includes("last hour"), "Crock-Pot 8 h and last hour");
ok(data.includes("FSIS_FILL = { lo: 1 / 2, hi: 2 / 3 }") && ref.fsis.quotes[1].includes("half full") && ref.fsis.quotes[1].includes("two-thirds"), "FSIS fill");
const T = page.replace(/\{" "\}/g, " ").replace(/<[^>]+>/g, "").replace(/\s+/g, " ");
const [r1, r2, r3] = ref.crockpot.rows;
const h = (x) => (x === 1.5 ? "1½" : String(x));
ok(T.includes(`A 35- to 45-minute oven recipe takes ${r2[2]} to ${r2[3]} hours on Low, or ${r2[4]} to ${r2[5]} on High`), "answer row 2");
ok(T.includes(`15 to 30 minutes becomes ${r1[2]} to ${r1[3]} hours on Low or ${h(r1[4])} to ${r1[5]} hours on High; 35 to 45 minutes becomes ${r2[2]} to ${r2[3]} hours on Low or ${r2[4]} to ${r2[5]} on High; 50 minutes to 3 hours becomes ${r3[2]} to ${r3[3]} hours on Low or ${r3[4]} to ${r3[5]} on High`), "FAQ chart");
const span = (v, lo, hi) => { const rs = ref.crockpot.rows.filter((r) => v >= r[lo] && v <= r[hi]); return [Math.min(...rs.map((r) => r[0])), Math.max(...rs.map((r) => r[1]))]; };
const s8 = span(8, 2, 3), s4 = span(4, 4, 5);
ok(s8[0] === 35 && s8[1] === 180 && T.includes("8 hours on Low sits in two rows of Crock-Pot's chart, which together match 35 minutes to 3 hours"), "8 h Low -> 35-180");
ok(s4[0] === 35 && s4[1] === 180 && T.includes("4 hours on High also sits in two rows, matching 35 minutes to 3 hours"), "4 h High -> 35-180");
console.log(`slow cooker data: ${checked} checked, ${failed} failed, 0 skipped`);
process.exit(failed ? 1 : 0);
