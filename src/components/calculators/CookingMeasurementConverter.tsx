"use client";

import { useEffect, useState } from "react";
import Read from "@/components/instrument/Read";
import { setLive } from "@/components/instrument/live";
import { INGREDIENTS, MASS, VOL, dec, gramsPerCup, gtxt } from "@/data/measures";
import { kitchen, parseNum } from "@/data/scaler";

type Mode = "ingredient" | "volume" | "weight";
const MODES: { key: Mode; label: string }[] = [
  { key: "ingredient", label: "Cups to grams" },
  { key: "volume", label: "Volume" },
  { key: "weight", label: "Weight" },
];
const ING_UNITS = [
  { key: "cup", label: "cups" },
  { key: "tbsp", label: "tablespoons" },
  { key: "tsp", label: "teaspoons" },
  { key: "g", label: "grams" },
  { key: "oz", label: "ounces (weight)" },
];

const num = (t: string) => {
  const n = parseNum(t.replace(",", "."));
  return n !== null && n > 0 ? n : null;
};
const OZ_G = MASS.find((m) => m.key === "oz")!.g;
const ML = (k: string) => VOL.find((v) => v.key === k)!.ml;

export default function CookingMeasurementConverter() {
  const [mode, setMode] = useState<Mode>("ingredient");
  const [text, setText] = useState("1");
  const [ing, setIng] = useState("ap-flour");
  const [ingUnit, setIngUnit] = useState("cup");
  const [volUnit, setVolUnit] = useState("cup");
  const [massUnit, setMassUnit] = useState("oz");

  const a = num(text);
  const ok = a !== null && a <= 1e6;
  const item = INGREDIENTS.find((i) => i.key === ing)!;
  const perCup = gramsPerCup(item);

  let grams: number | null = null;
  let cups: number | null = null;
  if (ok && mode === "ingredient") {
    if (ingUnit === "g") grams = a as number;
    else if (ingUnit === "oz") grams = (a as number) * OZ_G;
    else cups = ((a as number) * ML(ingUnit)) / ML("cup");
    if (grams === null && cups !== null) grams = cups * perCup;
    if (cups === null && grams !== null) cups = grams / perCup;
  }
  const ml = ok && mode === "volume" ? (a as number) * ML(volUnit) : null;
  const massG = ok && mode === "weight" ? (a as number) * MASS.find((m) => m.key === massUnit)!.g : null;

  const dial = mode === "ingredient" ? grams : mode === "weight" ? massG : null;
  useEffect(() => {
    if (dial !== null) setLive("measure", Math.round(dial));
  }, [dial]);

  const amountInput = (
    <input
      className="p-in p-in-ot"
      id="cm-amt"
      type="text"
      inputMode="decimal"
      autoComplete="off"
      value={text}
      onChange={(e) => setText(e.target.value)}
      aria-invalid={!ok}
      aria-describedby="cm-hint"
    />
  );

  return (
    <div>
      <div className="p-tabs" role="group" aria-label="What to convert">
        {MODES.map((m) => (
          <button key={m.key} type="button" className={`p-opt${mode === m.key ? " p-on" : ""}`} aria-pressed={mode === m.key} onClick={() => setMode(m.key)}>
            {m.label}
          </button>
        ))}
      </div>

      <form className="p-panel p-panel-2" aria-label="Cooking measurement converter" onSubmit={(e) => e.preventDefault()}>
        <div className="p-cell">
          <label className="p-lab" htmlFor="cm-amt">
            Amount
          </label>
          <div className="p-row">
            {amountInput}
            {mode === "ingredient" && (
              <select className="p-sel p-sel-bt" aria-label="Unit" value={ingUnit} onChange={(e) => setIngUnit(e.target.value)}>
                {ING_UNITS.map((u) => (
                  <option key={u.key} value={u.key}>
                    {u.label}
                  </option>
                ))}
              </select>
            )}
            {mode === "volume" && (
              <select className="p-sel p-sel-bt" aria-label="Unit" value={volUnit} onChange={(e) => setVolUnit(e.target.value)}>
                {VOL.map((u) => (
                  <option key={u.key} value={u.key}>
                    {u.label}
                  </option>
                ))}
              </select>
            )}
            {mode === "weight" && (
              <select className="p-sel p-sel-bt" aria-label="Unit" value={massUnit} onChange={(e) => setMassUnit(e.target.value)}>
                {MASS.map((u) => (
                  <option key={u.key} value={u.key}>
                    {u.label}
                  </option>
                ))}
              </select>
            )}
          </div>
          <p className="p-hint" id="cm-hint">
            {ok ? "Decimals or fractions: 1.5, 1 1/2, ½" : "Enter an amount, like 2, 0.5 or 1 1/2"}
          </p>
        </div>
        {mode === "ingredient" ? (
          <div className="p-cell">
            <label className="p-lab" htmlFor="cm-ing">
              Ingredient
            </label>
            <select className="p-sel" id="cm-ing" value={ing} onChange={(e) => setIng(e.target.value)}>
              {INGREDIENTS.map((i) => (
                <option key={i.key} value={i.key}>
                  {i.name}
                </option>
              ))}
            </select>
            <p className="p-hint p-mt">
              USDA: {item.measure} = {item.g} g
            </p>
          </div>
        ) : (
          <div className="p-cell">
            <span className="p-lab">Exact US units</span>
            <p className="p-hint">{mode === "volume" ? "1 cup = 16 tbsp = 48 tsp = 8 fl oz = 236.6 mL" : "1 lb = 16 oz = 453.6 g"}</p>
          </div>
        )}
      </form>

      {mode === "ingredient" && (
        <ul className="p-reads p-reads-live" aria-live="polite">
          <Read v={grams !== null ? gtxt(grams) : "—"} u={grams !== null ? "g" : undefined} c={item.name} />
          <Read v={grams !== null ? dec(grams / OZ_G, 2) : "—"} u={grams !== null ? "oz" : undefined} c="Ounces by weight" />
          <Read v={cups !== null ? kitchen(cups) : "—"} u={cups !== null ? (cups > 1 ? "cups" : "cup") : undefined} c="US cups" />
          <Read v={cups !== null ? kitchen(cups * 16) : "—"} u={cups !== null ? "tbsp" : undefined} c={cups !== null ? `${kitchen(cups * 48)} tsp` : "Tablespoons"} />
        </ul>
      )}
      {mode === "volume" && (
        <ul className="p-reads p-reads-live" aria-live="polite">
          <Read v={ml !== null ? kitchen(ml / ML("cup")) : "—"} u={ml !== null ? "cups" : undefined} c={ml !== null ? `${kitchen(ml / ML("floz"))} fl oz` : "Cups"} />
          <Read v={ml !== null ? kitchen(ml / ML("tbsp")) : "—"} u={ml !== null ? "tbsp" : undefined} c={ml !== null ? `${kitchen(ml / ML("tsp"))} tsp` : "Tablespoons"} />
          <Read v={ml !== null ? gtxt(ml) : "—"} u={ml !== null ? "mL" : undefined} c={ml !== null ? `${dec(ml / 1000, 3)} L` : "Milliliters"} />
          <Read
            v={ml !== null ? dec(ml / ML("quart"), 3) : "—"}
            u={ml !== null ? "qt" : undefined}
            c={ml !== null ? `${dec(ml / ML("pint"), 3)} pints · ${dec(ml / ML("gallon"), 3)} gal` : "Quarts"}
          />
        </ul>
      )}
      {mode === "weight" && (
        <ul className="p-reads p-reads-live" aria-live="polite">
          <Read v={massG !== null ? gtxt(massG) : "—"} u={massG !== null ? "g" : undefined} c="Grams" />
          <Read v={massG !== null ? dec(massG / OZ_G, 2) : "—"} u={massG !== null ? "oz" : undefined} c="Ounces" />
          <Read v={massG !== null ? dec(massG / MASS.find((m) => m.key === "lb")!.g, 3) : "—"} u={massG !== null ? "lb" : undefined} c="Pounds" />
          <Read v={massG !== null ? dec(massG / 1000, 3) : "—"} u={massG !== null ? "kg" : undefined} c="Kilograms" />
        </ul>
      )}
      <p className="p-res-basis p-mt">
        {mode === "ingredient"
          ? `Cups to grams by USDA FoodData Central's weight for ${item.name.toLowerCase()}: ${gtxt(perCup)} g per cup.`
          : "Exact US customary definitions, as listed by NIST."}
      </p>
    </div>
  );
}
