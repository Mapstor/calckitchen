// Re-checks src/data/wilton.ts and the figures on the cake servings and cake pan pages against research/sources/wilton-cakes.json.
// Usage: node scripts/check-cake-data.mjs   (exit 1 on any mismatch)
import { readFileSync } from "node:fs";

const read = (p) => readFileSync(new URL(p, import.meta.url), "utf8");
const data = read("../src/data/wilton.ts");
const serv = read("../src/app/(instrument)/cake-servings-calculator/page.tsx");
const pan = read("../src/app/(instrument)/cake-pan-converter/page.tsx");
const ref = JSON.parse(read("../research/sources/wilton-cakes.json"));
let checked = 0, failed = 0;
const ok = (cond, label) => { checked++; if (!cond) { failed++; console.error("FAIL", label); } };
const flat = (s) => s.replace(/\{" "\}/g, " ").replace(/<[^>]+>/g, "").replace(/&apos;/g, "'").replace(/\s+/g, " ");

// 1. rows
const rows = [...data.matchAll(/\{ shape: "(\w+)", size: "([^"]+)", party: (\d+), wedding: (\d+), cups: "([^"]+)", tempF: (\d+), timeLo: (\d+), timeHi: (\d+), icing: "([^"]+)" \}/g)]
  .map((m) => ({ shape: m[1], size: m[2], party: +m[3], wedding: +m[4], cups: m[5], tempF: +m[6], timeLo: +m[7], timeHi: +m[8], icing: m[9] }));
ok(rows.length === ref.rows.length, `WILTON: ${rows.length} rows, want ${ref.rows.length}`);
ref.rows.forEach((w, i) => ok(JSON.stringify(rows[i]) === JSON.stringify(w), `row ${w.shape} ${w.size}`));
const R = (shape, size) => ref.rows.find((r) => r.shape === shape && r.size === size);

// 2. servings page
const S = flat(serv);
const r8 = R("Round", "8 in."), r6 = R("Round", "6 in."), r10 = R("Round", "10 in."), s913 = R("Sheet", "9 x 13 in.");
ok(S.includes(`An 8-inch round cake serves ${r8.party} at a party, ${r8.wedding} at a wedding`), "answer 8-inch");
ok(S.includes(`serves ${r8.party} at a party or ${r8.wedding} at a wedding`), "FAQ 8-inch");
ok(S.includes(`at ${s913.party} party servings or ${s913.wedding} wedding servings`), "FAQ 9x13");
ok(S.includes(`${r6.party} at a party and ${r6.wedding} at a wedding`), "FAQ 6-inch");
ok(S.includes(`${r10.party} party servings or ${r10.wedding} wedding servings`), "FAQ 10-inch");
const sumP = r6.party + r8.party + r10.party, sumW = r6.wedding + r8.wedding + r10.wedding;
ok((S.match(new RegExp(`${r6.party} \\+ ${r8.party} \\+ ${r10.party} = ${sumP} party servings`, "g")) || []).length === 2, "tier party sum (twice)");
ok((S.match(new RegExp(`${r6.wedding} \\+ ${r8.wedding} \\+ ${r10.wedding} = ${sumW} wedding servings`, "g")) || []).length === 2, "tier wedding sum (twice)");

// 3. pan page
const P = flat(pan);
const A = (d) => Math.PI * (d / 2) ** 2;
const r1 = (n) => Math.round(n * 10) / 10, r2 = (n) => (Math.round(n * 100) / 100).toFixed(2);
ok(P.includes(`An 8-inch round is ${r1(A(8))} square inches and a 9-inch round ${r1(A(9))}`), "areas 8 and 9");
ok(P.includes(`make ${r2(A(9) / A(8))} times the recipe`), "answer multiplier");
ok(P.includes(`Two 9-inch rounds hold ${r1(2 * A(9))} square inches against 117`) && P.includes(`multiply the recipe by ${r2((2 * A(9)) / 117)}`), "two 9-inch rounds");
ok(P.includes(`has 64 square inches and the 9-inch round ${r1(A(9))}, a factor of ${r2(64 / A(9))}`), "8 square vs 9 round");
const w9 = R("Round", "9 in."), w10 = R("Round", "10 in.");
ok(P.includes(`gives ${w9.cups} cups of batter for one 2-inch-deep 9-inch round layer, baked at ${w9.tempF}°F for ${w9.timeLo} to ${w9.timeHi} minutes`), "Wilton 9-inch");
ok(P.includes(`gives ${w10.timeLo} to ${w10.timeHi} minutes at ${w10.tempF}°F for a 2-inch-deep 10-inch round layer with ${w10.cups} cups`), "Wilton 10-inch");
for (const m of P.matchAll(/(\d+(?:\.\d+)?) ÷ (\d+(?:\.\d+)?) = (\d+(?:\.\d+)?)/g)) {
  const dec = (m[3].split(".")[1] || "").length;
  ok(Math.abs(+m[1] / +m[2] - +m[3]) <= 0.5 / 10 ** dec + 1e-9, `division ${m[0]}`);
}
console.log(`cake data: ${checked} checked, ${failed} failed, 0 skipped`);
process.exit(failed ? 1 : 0);
