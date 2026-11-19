"use client";

import { useEffect, useState } from "react";
import Read from "@/components/instrument/Read";
import { setLive } from "@/components/instrument/live";
import { CONV, bakeF, roastMin } from "@/data/convection";
import { cToF, fToC } from "@/data/oven-temps";

type Mode = "bake" | "roast";

const parse = (t: string) => {
  const n = Number(t.trim().replace(",", "."));
  return t.trim() !== "" && Number.isFinite(n) ? n : null;
};
const r0 = (n: number) => Math.round(n);

export default function ConvectionOvenConverter() {
  const [mode, setMode] = useState<Mode>("bake");
  const [unit, setUnit] = useState<"F" | "C">("F");
  const [tempText, setTempText] = useState("350");
  const [timeText, setTimeText] = useState("30");

  const t = parse(tempText);
  const m = parse(timeText);
  const inF = t === null ? null : unit === "F" ? t : cToF(t);
  const tOk = inF !== null && inF >= 200 && inF <= 550;
  const mOk = m !== null && m > 0 && m <= 1440;
  const outF = tOk ? (mode === "bake" ? bakeF(inF) : inF) : null;
  const outMin = mOk ? (mode === "bake" ? m : roastMin(m)) : null;

  useEffect(() => {
    if (outF !== null) setLive("oven", outF);
  }, [outF]);

  const shown = outF === null ? "—" : String(unit === "F" ? r0(outF) : r0(fToC(outF)));
  const other = outF === null ? "—" : String(unit === "F" ? r0(fToC(outF)) : r0(outF));
  const bake = mode === "bake";

  return (
    <div>
      <div className="p-tabs" role="group" aria-label="Convection setting">
        {(
          [
            ["bake", "Convection bake"],
            ["roast", "Convection roast"],
          ] as const
        ).map(([k, label]) => (
          <button key={k} type="button" className={`p-opt${mode === k ? " p-on" : ""}`} aria-pressed={mode === k} onClick={() => setMode(k)}>
            {label}
          </button>
        ))}
      </div>

      <form className="p-panel p-panel-2" aria-label="Convection oven converter" onSubmit={(e) => e.preventDefault()}>
        <div className="p-cell">
          <label className="p-lab" htmlFor="cv-temp">
            Recipe temperature
          </label>
          <div className="p-row">
            <input className="p-in" id="cv-temp" type="text" inputMode="decimal" autoComplete="off" value={tempText} onChange={(e) => setTempText(e.target.value)} aria-invalid={!tOk} />
            <div className="p-unit" role="group" aria-label="Temperature unit">
              {(["F", "C"] as const).map((u) => (
                <button
                  key={u}
                  type="button"
                  aria-pressed={unit === u}
                  className={unit === u ? "p-on" : undefined}
                  onClick={() => {
                    if (u === unit) return;
                    if (inF !== null) setTempText(String(u === "F" ? r0(inF) : r0(fToC(inF))));
                    setUnit(u);
                  }}
                >
                  °{u}
                </button>
              ))}
            </div>
          </div>
          {!tOk && <p className="p-hint">Enter an oven setting, {unit === "F" ? "200 to 550°F" : "93 to 288°C"}</p>}
        </div>
        <div className="p-cell">
          <label className="p-lab" htmlFor="cv-time">
            {bake ? "Shortest time in the recipe" : "Recipe roasting time"}
          </label>
          <div className="p-row">
            <input className="p-in" id="cv-time" type="text" inputMode="decimal" autoComplete="off" value={timeText} onChange={(e) => setTimeText(e.target.value)} aria-invalid={!mOk} />
            <span className="p-lab p-unit-t">min</span>
          </div>
        </div>
      </form>

      <ul className="p-reads p-reads-live" aria-live="polite">
        <Read v={shown} u={outF === null ? undefined : `°${unit}`} c={bake ? `${CONV.bakeDropF}°F lower than the recipe` : "Same as the recipe"} />
        <Read v={other} u={outF === null ? undefined : unit === "F" ? "°C" : "°F"} c={unit === "F" ? "Same, in Celsius" : "Same, in Fahrenheit"} />
        <Read v={outMin === null ? "—" : String(r0(outMin))} u={outMin === null ? undefined : "min"} c={bake ? "The recipe's shortest time" : `${CONV.roastTimeCutPct}% less; check it then`} />
        <Read v={bake ? "Yes" : "No"} c={bake ? "Preheat for cookies, biscuits, breads" : "No preheat needed to roast"} />
      </ul>
    </div>
  );
}
