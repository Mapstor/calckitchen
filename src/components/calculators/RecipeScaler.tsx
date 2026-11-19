"use client";

import { useEffect, useState } from "react";
import Read from "@/components/instrument/Read";
import { setLive } from "@/components/instrument/live";
import { parseLine, parseNum, scaleLine } from "@/data/scaler";

type Mode = "servings" | "factor";

const START = `2 cups all-purpose flour
3/4 cup sugar
1 tablespoon baking powder
1/2 teaspoon salt
2 large eggs
1 cup milk
1/3 cup vegetable oil
250 g blueberries`;

const QUICK = ["1/2", "1 1/2", "2", "3"];
const QUICK_LABEL: Record<string, string> = { "1/2": "½", "1 1/2": "1½", "2": "2", "3": "3" };

const num = (t: string) => {
  const n = parseNum(t.replace(",", "."));
  return n !== null && n > 0 ? n : null;
};
const r2 = (x: number) => (Math.round(x * 100) / 100).toString();

export default function RecipeScaler() {
  const [mode, setMode] = useState<Mode>("servings");
  const [fromText, setFromText] = useState("4");
  const [toText, setToText] = useState("6");
  const [factorText, setFactorText] = useState("2");
  const [text, setText] = useState(START);

  const from = num(fromText);
  const to = num(toText);
  const fx = num(factorText);
  const factor = mode === "servings" ? (from !== null && to !== null ? to / from : null) : fx;
  const ok = factor !== null && factor <= 100;

  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => parseLine(l));
  const rows = ok ? lines.map((l) => ({ l, s: scaleLine(l, factor as number) })) : [];
  const scaledCount = rows.filter((r) => r.s.scaled).length;

  useEffect(() => {
    if (ok && factor !== null) setLive("scale", Math.round(factor * 100) / 100);
  }, [ok, factor]);

  return (
    <div>
      <div className="p-tabs" role="group" aria-label="Scale by">
        {(["servings", "factor"] as const).map((m) => (
          <button key={m} type="button" className={`p-opt${mode === m ? " p-on" : ""}`} aria-pressed={mode === m} onClick={() => setMode(m)}>
            {m === "servings" ? "By servings" : "By a factor"}
          </button>
        ))}
      </div>

      <form className="p-panel p-panel-2" aria-label="Recipe scaler" onSubmit={(e) => e.preventDefault()}>
        <div className="p-cell">
          {mode === "servings" ? (
            <div className="p-row p-row-gap">
              <div>
                <label className="p-lab" htmlFor="rs-from">
                  Recipe makes
                </label>
                <input
                  className="p-in"
                  id="rs-from"
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  value={fromText}
                  onChange={(e) => setFromText(e.target.value)}
                  aria-invalid={from === null}
                />
              </div>
              <div>
                <label className="p-lab" htmlFor="rs-to">
                  You need
                </label>
                <input
                  className="p-in"
                  id="rs-to"
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  value={toText}
                  onChange={(e) => setToText(e.target.value)}
                  aria-invalid={to === null}
                />
              </div>
            </div>
          ) : (
            <>
              <label className="p-lab" htmlFor="rs-factor">
                Multiply by
              </label>
              <input
                className="p-in"
                id="rs-factor"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={factorText}
                onChange={(e) => setFactorText(e.target.value)}
                aria-invalid={!ok}
              />
              <div className="p-quick p-mt" role="group" aria-label="Common factors">
                {QUICK.map((q) => (
                  <button key={q} type="button" className={`p-opt${factorText === q ? " p-on" : ""}`} aria-pressed={factorText === q} onClick={() => setFactorText(q)}>
                    {QUICK_LABEL[q]}
                  </button>
                ))}
              </div>
            </>
          )}
          <p className="p-hint p-mt">{ok ? "Servings, people or batches: any count works." : "Enter numbers above 0, like 4 or 1 1/2."}</p>
        </div>
        <div className="p-cell">
          <label className="p-lab" htmlFor="rs-text">
            Ingredients, one per line
          </label>
          <textarea className="p-ta" id="rs-text" rows={8} spellCheck={false} value={text} onChange={(e) => setText(e.target.value)} />
        </div>
      </form>

      <ul className="p-reads p-reads-2 p-reads-live" aria-live="polite">
        <Read
          v={ok ? `×${r2(factor as number)}` : "—"}
          c={ok ? (mode === "servings" ? `${r2(to as number)} ÷ ${r2(from as number)} servings` : "Multiplier") : "Factor"}
        />
        <Read v={ok ? `${scaledCount} of ${lines.length}` : "—"} c="Lines scaled; lines without an amount stay as written" />
      </ul>

      {ok && lines.length > 0 && (
        <div className="p-tbox p-mt" role="region" aria-label="Scaled ingredients" tabIndex={0}>
          <table className="p-table">
            <thead>
              <tr>
                <th scope="col">Scaled</th>
                <th scope="col">Ingredient</th>
                <th scope="col">Recipe said</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ l, s }, i) => (
                <tr key={i}>
                  <td>
                    {s.scaled ? <strong>{s.amount}</strong> : "As written"}
                    {s.note && <span className="p-td-note">{s.note}</span>}
                  </td>
                  <td>{s.scaled ? l.rest : l.text}</td>
                  <td>{s.scaled ? l.text.slice(0, l.text.length - l.rest.length).trim() : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
