"use client";

import { useEffect, useState } from "react";
import Read from "@/components/instrument/Read";
import Bars, { Split, TONE } from "@/components/instrument/Bars";
import { setLive } from "@/components/instrument/live";
import { FOODS, SAMPLE, SAMPLE_SERVINGS, grams, macrosFor, r0, r1, sumMacros, type Macros } from "@/data/macros";

type Row = { key: string; amount: string; unit: string; kcal: string; p: string; c: string; f: string };
const blank = (): Row => ({ key: "", amount: "", unit: "g", kcal: "", p: "", c: "", f: "" });
const START: Row[] = [...SAMPLE.map((s) => ({ ...blank(), ...s })), blank()];
const OTHER = "other";

const parse = (t: string) => {
  const n = Number(t.trim().replace(",", "."));
  return t.trim() !== "" && Number.isFinite(n) && n >= 0 ? n : null;
};

export default function RecipeMacroCalculator() {
  const [rows, setRows] = useState<Row[]>(START);
  const [servText, setServText] = useState(String(SAMPLE_SERVINGS));
  const serv = parse(servText);
  const servOk = serv !== null && serv > 0;

  const setRow = (i: number, patch: Partial<Row>) => setRows(rows.map((r, j) => (j === i ? { ...r, ...patch } : r)));

  const lines = rows.map((r) => {
    const food = FOODS.find((f) => f.key === r.key);
    const amt = parse(r.amount);
    if (!r.key || amt === null) return null;
    if (r.key === OTHER) {
      const v = { kcal: parse(r.kcal), p: parse(r.p), c: parse(r.c), f: parse(r.f) };
      if (v.kcal === null || v.p === null || v.c === null || v.f === null) return null;
      return { name: "Other ingredient", g: amt, m: macrosFor({ kcal: v.kcal, p: v.p, c: v.c, f: v.f, fib: 0 }, amt) };
    }
    const g = grams(food, amt, r.unit);
    return food && g !== null ? { name: food.name, g, m: macrosFor(food, g) } : null;
  });
  const used = lines.filter((l): l is { name: string; g: number; m: Macros } => l !== null);
  const total = sumMacros(used.map((l) => l.m));
  const per = servOk ? { kcal: total.kcal / (serv as number), p: total.p / (serv as number), c: total.c / (serv as number), f: total.f / (serv as number) } : null;

  const perKcal = per ? Math.round(per.kcal) : null;
  useEffect(() => {
    if (perKcal !== null) setLive("kcal", perKcal);
  }, [perKcal]);

  return (
    <div>
      <form className="p-panel p-panel-1" aria-label="Recipe macro calculator" onSubmit={(e) => e.preventDefault()}>
        <div className="p-cell">
          <div className="p-row p-row-gap">
            <div>
              <label className="p-lab" htmlFor="rm-serv">
                Servings
              </label>
              <input className="p-in" id="rm-serv" type="text" inputMode="decimal" autoComplete="off" value={servText} onChange={(e) => setServText(e.target.value)} aria-invalid={!servOk} />
            </div>
          </div>
          <span className="p-lab p-mt" id="rm-ings">
            Ingredients
          </span>
          <div className="p-mrows" role="group" aria-labelledby="rm-ings">
            {rows.map((r, i) => {
              const food = FOODS.find((f) => f.key === r.key);
              const units = r.key === OTHER || !food ? ["g"] : ["g", ...food.m.map(([l]) => l)];
              return (
                <div className="p-mrow" key={i}>
                  <select className="p-sel p-sel-food" aria-label={`Ingredient ${i + 1}`} value={r.key} onChange={(e) => setRow(i, { key: e.target.value, unit: "g" })}>
                    <option value="">Choose an ingredient</option>
                    {FOODS.map((f) => (
                      <option key={f.key} value={f.key}>
                        {f.name}
                      </option>
                    ))}
                    <option value={OTHER}>Other: enter its values per 100 g</option>
                  </select>
                  <input className="p-in p-in-pct" type="text" inputMode="decimal" autoComplete="off" aria-label={`Ingredient ${i + 1} amount`} placeholder="Amount" value={r.amount} onChange={(e) => setRow(i, { amount: e.target.value })} />
                  <select className="p-sel p-sel-u" aria-label={`Ingredient ${i + 1} unit`} value={r.unit} onChange={(e) => setRow(i, { unit: e.target.value })}>
                    {units.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                  {r.key === OTHER && (
                    <div className="p-mother">
                      {(["kcal", "p", "c", "f"] as const).map((k) => (
                        <label key={k} className="p-pct">
                          <span>{k === "kcal" ? "Calories" : k === "p" ? "Protein, g" : k === "c" ? "Carbs, g" : "Fat, g"}</span>
                          <input className="p-in p-in-pct" type="text" inputMode="decimal" autoComplete="off" value={r[k]} onChange={(e) => setRow(i, { [k]: e.target.value })} />
                        </label>
                      ))}
                      <span className="p-hint">per 100 g, from the package label or USDA FoodData Central</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="p-quick p-mt">
            <button type="button" className="p-opt p-opt-wide" onClick={() => setRows([...rows, blank()])} disabled={rows.length >= 15}>
              Add an ingredient
            </button>
          </div>
        </div>
      </form>

      <ul className="p-reads p-reads-live" aria-live="polite">
        <Read v={per ? r0(per.kcal) : "—"} u={per ? "kcal" : undefined} c={per ? `Per serving; recipe ${r0(total.kcal)} kcal` : "Calories per serving"} />
        <Read v={per ? r1(per.p) : "—"} u={per ? "g" : undefined} c="Protein per serving" />
        <Read v={per ? r1(per.c) : "—"} u={per ? "g" : undefined} c="Carbohydrate per serving" />
        <Read v={per ? r1(per.f) : "—"} u={per ? "g" : undefined} c="Fat per serving" />
      </ul>
      {per && per.p + per.c + per.f > 0 && (
        <Split
          title="Protein, carbohydrate and fat in one serving, by weight"
          label="Macronutrients per serving"
          parts={[
            { name: "Protein", v: per.p, text: `${r1(per.p)} g`, tone: TONE.blue },
            { name: "Carbohydrate", v: per.c, text: `${r1(per.c)} g`, tone: TONE.orange },
            { name: "Fat", v: per.f, text: `${r1(per.f)} g`, tone: TONE.purple },
          ]}
        />
      )}
      {used.length > 1 && total.kcal > 0 && (
        <Bars
          title="Where the calories come from, whole recipe"
          label="Calories by ingredient"
          rows={[...used]
            .sort((a, b) => b.m.kcal - a.m.kcal)
            .slice(0, 12)
            .map((l) => ({ name: l.name, v: l.m.kcal, text: `${r0(l.m.kcal)} kcal`, tone: TONE.blue }))}
        />
      )}

      {used.length > 0 && per && (
        <div className="p-tbox p-mt" role="region" aria-label="Macros by ingredient" tabIndex={0}>
          <table className="p-table">
            <thead>
              <tr>
                <th scope="col">Ingredient</th>
                <th scope="col">Weight</th>
                <th scope="col">Calories</th>
                <th scope="col">Protein</th>
                <th scope="col">Carbs</th>
                <th scope="col">Fat</th>
              </tr>
            </thead>
            <tbody>
              {used.map((l, i) => (
                <tr key={i}>
                  <td>{l.name}</td>
                  <td>{r1(l.g)} g</td>
                  <td>{r0(l.m.kcal)}</td>
                  <td>{r1(l.m.p)} g</td>
                  <td>{r1(l.m.c)} g</td>
                  <td>{r1(l.m.f)} g</td>
                </tr>
              ))}
              <tr className="p-tr-hi">
                <td>Recipe total</td>
                <td>{r1(used.reduce((a, l) => a + l.g, 0))} g</td>
                <td>{r0(total.kcal)}</td>
                <td>{r1(total.p)} g</td>
                <td>{r1(total.c)} g</td>
                <td>{r1(total.f)} g</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <p className="p-res-basis p-mt">USDA FoodData Central values per 100 g, raw or dry, times the weight. Weigh ingredients before cooking.</p>
    </div>
  );
}
