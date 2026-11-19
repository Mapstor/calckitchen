"use client";

import { useEffect, useState } from "react";
import Read from "@/components/instrument/Read";
import { setLive } from "@/components/instrument/live";
import { BUTTER_UNITS, STICK_G, amt, cutText, fromSticks, grams, toSticks, unitWord, type ButterUnit } from "@/data/butter";

const QUICK: { label: string; text: string; unit: ButterUnit }[] = [
  { label: "½ stick", text: "1/2", unit: "stick" },
  { label: "1 stick", text: "1", unit: "stick" },
  { label: "2 sticks", text: "2", unit: "stick" },
  { label: "1 cup", text: "1", unit: "cup" },
  { label: "1 lb", text: "1", unit: "lb" },
  { label: "100 g", text: "100", unit: "g" },
  { label: "250 g", text: "250", unit: "g" },
];

const GLYPH: Record<string, number> = { "½": 1 / 2, "⅓": 1 / 3, "⅔": 2 / 3, "¼": 1 / 4, "¾": 3 / 4, "⅛": 1 / 8, "⅜": 3 / 8, "⅝": 5 / 8, "⅞": 7 / 8 };

/** "1", "1.5", "1,5", "1/2", "1 1/2", "½", "1½" -> number; anything else null */
function parseAmount(text: string): number | null {
  let s = text.trim().replace(",", ".");
  let total = 0;
  const last = s.slice(-1);
  if (GLYPH[last] !== undefined) {
    total += GLYPH[last];
    s = s.slice(0, -1).trim();
  }
  if (s !== "") {
    const mixed = s.match(/^(?:(\d+)\s+)?(\d+)\/(\d+)$/);
    if (mixed) {
      if (+mixed[3] === 0) return null;
      total += (mixed[1] ? +mixed[1] : 0) + +mixed[2] / +mixed[3];
    } else if (/^\d*\.?\d+$/.test(s)) total += Number(s);
    else return null;
  }
  return total > 0 && Number.isFinite(total) ? total : null;
}

export default function ButterConverter() {
  const [text, setText] = useState("1");
  const [unit, setUnit] = useState<ButterUnit>("stick");

  const a = parseAmount(text);
  const sticks = a === null ? null : toSticks(a, unit);
  const ok = sticks !== null && sticks <= 10000;

  let g = "—";
  let gC = "Grams";
  let st = "—";
  let stU: string | undefined;
  let stC = "Sticks";
  let cu = "—";
  let cuU: string | undefined;
  let tb = "—";
  let tbC = "Tablespoons";

  if (ok && sticks !== null) {
    const oz = fromSticks(sticks, "oz");
    const lb = fromSticks(sticks, "lb");
    const cups = fromSticks(sticks, "cup");
    const tbsp = fromSticks(sticks, "tbsp");
    g = grams(sticks * STICK_G);
    gC = `${amt(oz, 2)} oz · ${amt(lb, 2)} lb`;
    st = amt(sticks, 2);
    stU = unitWord(st, "stick", "sticks");
    stC = cutText(sticks);
    cu = amt(cups, 2);
    cuU = unitWord(cu, "cup", "cups");
    tb = amt(tbsp, 1);
    tbC = `${amt(fromSticks(sticks, "tsp"), 1)} tsp`;
  }

  useEffect(() => {
    if (ok && sticks !== null) setLive("butter", Math.round(sticks * STICK_G));
  }, [ok, sticks]);

  return (
    <div>
      <form className="p-panel p-panel-2" aria-label="Butter converter" onSubmit={(e) => e.preventDefault()}>
        <div className="p-cell">
          <label className="p-lab" htmlFor="bt-amt">
            Amount of butter
          </label>
          <div className="p-row">
            <input
              className="p-in p-in-ot"
              id="bt-amt"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              value={text}
              onChange={(e) => setText(e.target.value)}
              aria-invalid={!ok}
              aria-describedby="bt-hint"
            />
            <select className="p-sel p-sel-bt" aria-label="Unit" value={unit} onChange={(e) => setUnit(e.target.value as ButterUnit)}>
              {BUTTER_UNITS.map((u) => (
                <option key={u.key} value={u.key}>
                  {u.label}
                </option>
              ))}
            </select>
          </div>
          <p className="p-hint" id="bt-hint">
            {ok ? "Decimals or fractions: 1.5, 1 1/2, ½" : "Enter an amount, like 2, 1.5 or 1 1/2"}
          </p>
        </div>
        <div className="p-cell" role="group" aria-labelledby="bt-quick">
          <span className="p-lab" id="bt-quick">
            Common amounts
          </span>
          <div className="p-quick">
            {QUICK.map((q) => {
              const on = unit === q.unit && parseAmount(text) === parseAmount(q.text);
              return (
                <button
                  key={q.label}
                  type="button"
                  className={`p-opt${on ? " p-on" : ""}`}
                  aria-pressed={on}
                  onClick={() => {
                    setText(q.text);
                    setUnit(q.unit);
                  }}
                >
                  {q.label}
                </button>
              );
            })}
          </div>
        </div>
      </form>

      <ul className="p-reads p-reads-live" aria-live="polite">
        <Read v={g} u={ok ? "g" : undefined} c={gC} />
        <Read v={st} u={stU} c={stC} />
        <Read v={cu} u={cuU} c="US measuring cups" />
        <Read v={tb} u={ok ? "tbsp" : undefined} c={tbC} />
      </ul>
      <p className="p-res-basis p-mt">
        One stick is ½ cup and weighs 4 ounces (113.4 g), the stick in Land O&apos;Lakes&apos; conversion table. The other figures follow from exact US
        units.
      </p>
    </div>
  );
}
