"use client";

import { useEffect, useState } from "react";
import Read from "@/components/instrument/Read";
import { setLive } from "@/components/instrument/live";
import { bakersPct, d1 } from "@/data/bakers";

type Row = { name: string; g: string };

const parse = (t: string) => {
  const n = Number(t.trim().replace(",", "."));
  return t.trim() !== "" && Number.isFinite(n) ? n : null;
};

const START: Row[] = [
  { name: "Water", g: "350" },
  { name: "Salt", g: "10" },
  { name: "Yeast", g: "5" },
  { name: "", g: "" },
  { name: "", g: "" },
];

export default function BakersPercentageCalculator() {
  const [flourText, setFlourText] = useState("500");
  const [rows, setRows] = useState<Row[]>(START);
  const [targetText, setTargetText] = useState("1000");

  const flour = parse(flourText);
  const flourOk = flour !== null && flour > 0;
  const items = rows
    .map((r, i) => ({ i, name: r.name.trim() || `Ingredient ${i + 1}`, g: parse(r.g) }))
    .filter((r) => r.g !== null && (r.g as number) >= 0) as { i: number; name: string; g: number }[];
  const pct = (g: number) => (flourOk ? bakersPct(g, flour as number) : 0);
  const totalPct = 100 + items.reduce((a, r) => a + pct(r.g), 0);
  const target = parse(targetText);
  const targetOk = flourOk && target !== null && target > 0;
  const scaledFlour = targetOk ? (target as number) / (totalPct / 100) : 0;
  const find = (n: string) => items.find((r) => r.name.toLowerCase() === n);
  const water = find("water");
  const salt = find("salt");
  const yeast = find("yeast");
  const hyd = flourOk && water ? pct(water.g) : null;

  useEffect(() => {
    if (hyd !== null) setLive("hydration", Math.round(hyd));
  }, [hyd]);

  const setRow = (i: number, k: keyof Row, v: string) => setRows(rows.map((r, j) => (j === i ? { ...r, [k]: v } : r)));

  return (
    <div>
      <form className="p-panel p-panel-2" aria-label="Baker's percentage calculator" onSubmit={(e) => e.preventDefault()}>
        <div className="p-cell">
          <label className="p-lab" htmlFor="bp-flour">
            Flour, g (all flours together)
          </label>
          <input className="p-in p-in-ot" id="bp-flour" type="text" inputMode="decimal" autoComplete="off" value={flourText} onChange={(e) => setFlourText(e.target.value)} aria-invalid={!flourOk} />
          <label className="p-lab" htmlFor="bp-target">
            Scale to a dough weight, g
          </label>
          <input className="p-in p-in-ot" id="bp-target" type="text" inputMode="decimal" autoComplete="off" value={targetText} onChange={(e) => setTargetText(e.target.value)} />
        </div>
        <div className="p-cell" role="group" aria-labelledby="bp-rows">
          <span className="p-lab" id="bp-rows">
            Other ingredients, g
          </span>
          <div className="p-ings">
            {rows.map((r, i) => (
              <div className="p-ing" key={i}>
                <input className="p-in p-in-name" type="text" aria-label={`Ingredient ${i + 1} name`} placeholder="Name" value={r.name} onChange={(e) => setRow(i, "name", e.target.value)} />
                <input className="p-in p-in-pct" type="text" inputMode="decimal" aria-label={`Ingredient ${i + 1} grams`} placeholder="g" value={r.g} onChange={(e) => setRow(i, "g", e.target.value)} />
              </div>
            ))}
          </div>
        </div>
      </form>

      <ul className="p-reads p-reads-live" aria-live="polite">
        <Read v={hyd !== null ? d1(hyd) : "—"} u={hyd !== null ? "%" : undefined} c="Hydration (water ÷ flour)" />
        <Read v={flourOk && salt ? d1(pct(salt.g)) : "—"} u={flourOk && salt ? "%" : undefined} c="Salt" />
        <Read v={flourOk && yeast ? d1(pct(yeast.g)) : "—"} u={flourOk && yeast ? "%" : undefined} c="Yeast" />
        <Read v={flourOk ? d1(totalPct) : "—"} u={flourOk ? "%" : undefined} c="Total, flour included" />
      </ul>

      {flourOk && (
        <div className="p-tbox" role="region" aria-label="Baker's percentages and scaled weights" tabIndex={0}>
          <table className="p-table">
            <thead>
              <tr>
                <th scope="col">Ingredient</th>
                <th scope="col">Weight</th>
                <th scope="col">Baker&apos;s %</th>
                <th scope="col">{targetOk ? `For ${d1(target as number)} g of dough` : "Scaled"}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="p-tr-hi">
                <td>Flour</td>
                <td>{d1(flour as number)} g</td>
                <td>100%</td>
                <td>{targetOk ? `${d1(scaledFlour)} g` : "—"}</td>
              </tr>
              {items.map((r) => (
                <tr key={r.i}>
                  <td>{r.name}</td>
                  <td>{d1(r.g)} g</td>
                  <td>{d1(pct(r.g))}%</td>
                  <td>{targetOk ? `${d1((scaledFlour * pct(r.g)) / 100)} g` : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
