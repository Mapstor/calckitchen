"use client";

import { useEffect, useState } from "react";
import Read from "@/components/instrument/Read";
import Bars, { TONE } from "@/components/instrument/Bars";
import { setLive } from "@/components/instrument/live";
import { UNITS, convert, type Unit } from "@/data/units";

type Row = { name: string; used: string; usedUnit: Unit; price: string; size: string; sizeUnit: Unit };

const UNIT_LIST = Object.keys(UNITS) as Unit[];
const parse = (t: string) => {
  const n = Number(t.trim().replace(",", ".").replace(/^\$/, ""));
  return t.trim() !== "" && Number.isFinite(n) && n >= 0 ? n : null;
};
const money = (n: number) => `$${n.toFixed(2)}`;

const EXAMPLE: Row[] = [
  { name: "Flour", used: "250", usedUnit: "g", price: "4.00", size: "5", sizeUnit: "lb" },
  { name: "Milk", used: "1.5", usedUnit: "cup", price: "4.00", size: "1", sizeUnit: "gal" },
  { name: "Eggs", used: "2", usedUnit: "each", price: "3.00", size: "12", sizeUnit: "each" },
  { name: "", used: "", usedUnit: "g", price: "", size: "", sizeUnit: "g" },
];

function cost(r: Row): { v: number | null; why?: string } {
  const used = parse(r.used);
  const price = parse(r.price);
  const size = parse(r.size);
  if (used === null || price === null || size === null || size === 0) return { v: null };
  const usedInPack = convert(used, r.usedUnit, r.sizeUnit);
  if (usedInPack === null) return { v: null, why: "weight and volume don't mix" };
  return { v: (usedInPack / size) * price };
}

export default function RecipeCostCalculator() {
  const [rows, setRows] = useState<Row[]>(EXAMPLE);
  const [servingsText, setServingsText] = useState("4");
  const [pctText, setPctText] = useState("30");

  const costs = rows.map(cost);
  const total = costs.reduce((a, c) => a + (c.v ?? 0), 0);
  const incomplete = costs.some((c) => c.why);
  const servings = parse(servingsText);
  const sOk = servings !== null && servings >= 1;
  const per = sOk ? total / (servings as number) : null;
  const pct = parse(pctText);
  const pOk = pct !== null && pct > 0 && pct <= 100;
  const menu = per !== null && pOk ? per / ((pct as number) / 100) : null;

  const perR = per !== null ? Math.round(per * 100) / 100 : null;
  useEffect(() => {
    if (perR !== null) setLive("cost", perR);
  }, [perR]);

  const set = (i: number, k: keyof Row, v: string) => setRows(rows.map((r, j) => (j === i ? { ...r, [k]: v } : r)));
  const unitSel = (i: number, k: "usedUnit" | "sizeUnit", label: string) => (
    <select className="p-sel p-sel-u" aria-label={label} value={rows[i][k]} onChange={(e) => set(i, k, e.target.value)}>
      {UNIT_LIST.map((u) => (
        <option key={u} value={u}>
          {u}
        </option>
      ))}
    </select>
  );

  return (
    <div>
      <form className="p-panel p-panel-1" aria-label="Recipe cost calculator" onSubmit={(e) => e.preventDefault()}>
        <div className="p-cell">
          <span className="p-lab">Ingredients: what the recipe uses, and what you paid for the package (example prices; type in yours)</span>
          <div className="p-costs">
            <div className="p-cost p-cost-h" aria-hidden="true">
              <span>Ingredient</span>
              <span>Recipe uses</span>
              <span>Package price</span>
              <span>Package size</span>
              <span>Cost</span>
            </div>
            {rows.map((r, i) => (
              <div className="p-cost" key={i}>
                <span className="p-cc" data-l="Ingredient">
                  <input className="p-in p-in-name" type="text" aria-label={`Ingredient ${i + 1}`} placeholder="Name" value={r.name} onChange={(e) => set(i, "name", e.target.value)} />
                </span>
                <span className="p-pair" data-l="Recipe uses">
                  <input className="p-in p-in-pct" type="text" inputMode="decimal" aria-label={`Ingredient ${i + 1} amount used`} value={r.used} onChange={(e) => set(i, "used", e.target.value)} />
                  {unitSel(i, "usedUnit", `Ingredient ${i + 1} unit used`)}
                </span>
                <span className="p-cc" data-l="Package price">
                  <input className="p-in p-in-pct" type="text" inputMode="decimal" aria-label={`Ingredient ${i + 1} package price, dollars`} placeholder="$" value={r.price} onChange={(e) => set(i, "price", e.target.value)} />
                </span>
                <span className="p-pair" data-l="Package size">
                  <input className="p-in p-in-pct" type="text" inputMode="decimal" aria-label={`Ingredient ${i + 1} package size`} value={r.size} onChange={(e) => set(i, "size", e.target.value)} />
                  {unitSel(i, "sizeUnit", `Ingredient ${i + 1} package unit`)}
                </span>
                <span className="p-cost-v" data-l="Cost">{costs[i].v !== null ? money(costs[i].v as number) : costs[i].why ? costs[i].why : "—"}</span>
              </div>
            ))}
          </div>
          <button type="button" className="p-opt p-add" onClick={() => setRows([...rows, { name: "", used: "", usedUnit: "g", price: "", size: "", sizeUnit: "g" }])}>
            Add an ingredient
          </button>
        </div>
      </form>

      <form className="p-panel p-panel-2 p-mt" aria-label="Servings and food cost" onSubmit={(e) => e.preventDefault()}>
        <div className="p-cell">
          <label className="p-lab" htmlFor="rc-serv">
            Servings the recipe makes
          </label>
          <input className="p-in" id="rc-serv" type="text" inputMode="numeric" value={servingsText} onChange={(e) => setServingsText(e.target.value)} aria-invalid={!sOk} />
        </div>
        <div className="p-cell">
          <label className="p-lab" htmlFor="rc-pct">
            Target food cost, % of the menu price (optional)
          </label>
          <input className="p-in" id="rc-pct" type="text" inputMode="decimal" value={pctText} onChange={(e) => setPctText(e.target.value)} />
        </div>
      </form>

      <ul className="p-reads p-reads-live" aria-live="polite">
        <Read v={money(total)} c={incomplete ? "Recipe cost, leaving out a row that mixes weight and volume" : "Recipe cost"} />
        <Read v={per !== null ? money(per) : "—"} c="Cost per serving" />
        <Read v={menu !== null ? money(menu) : "—"} c={pOk ? `Menu price at ${pct}% food cost` : "Menu price"} />
        <Read v={sOk ? String(servings) : "—"} c="Servings" />
      </ul>
      {costs.filter((c) => c.v !== null && c.v > 0).length > 1 && total > 0 && (
        <Bars
          title="Where the money goes"
          label="Cost by ingredient"
          rows={rows
            .map((r, i) => ({ name: r.name.trim() || `Ingredient ${i + 1}`, v: costs[i].v ?? 0 }))
            .filter((r) => r.v > 0)
            .sort((a, b) => b.v - a.v)
            .slice(0, 12)
            .map((r) => ({ name: r.name, v: r.v, text: `${money(r.v)} · ${Math.round((r.v / total) * 100)}%`, tone: TONE.blue }))}
        />
      )}
    </div>
  );
}
