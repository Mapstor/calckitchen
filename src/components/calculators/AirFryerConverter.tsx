"use client";

import { useEffect, useState } from "react";
import Read from "@/components/instrument/Read";
import Bars, { TONE } from "@/components/instrument/Bars";
import { TempCompare } from "@/components/instrument/Scales";
import { setLive } from "@/components/instrument/live";
import { AF_RULE, toAirFryerF, toAirFryerMin, toOvenF, toOvenMin } from "@/data/air-fryer";
import { cToF, fToC } from "@/data/oven-temps";

type Dir = "toAF" | "toOven";

const parse = (t: string) => {
  const n = Number(t.trim().replace(",", "."));
  return t.trim() !== "" && Number.isFinite(n) ? n : null;
};
const r0 = (n: number) => Math.round(n);

export default function AirFryerConverter() {
  const [dir, setDir] = useState<Dir>("toAF");
  const [unit, setUnit] = useState<"F" | "C">("F");
  const [tempText, setTempText] = useState("400");
  const [timeText, setTimeText] = useState("25");

  const t = parse(tempText);
  const m = parse(timeText);
  const inF = t === null ? null : unit === "F" ? t : cToF(t);
  const tOk = inF !== null && inF >= 200 && inF <= 550;
  const mOk = m !== null && m > 0 && m <= 600;
  const out = tOk ? (dir === "toAF" ? toAirFryerF(inF) : toOvenF(inF)) : null;
  const outMin = mOk ? (dir === "toAF" ? toAirFryerMin(m) : toOvenMin(m)) : null;
  const hot = out ? out.hi : null;

  useEffect(() => {
    if (hot !== null) setLive("oven", hot);
  }, [hot]);

  const show = (f: number) => (unit === "F" ? r0(f) : r0(fToC(f)));
  const tRange = out ? `${show(out.lo)}–${show(out.hi)}` : "—";
  const other = out ? (unit === "F" ? `${r0(fToC(out.lo))}–${r0(fToC(out.hi))}` : `${r0(out.lo)}–${r0(out.hi)}`) : "—";
  const toAF = dir === "toAF";

  return (
    <div>
      <div className="p-tabs" role="group" aria-label="Direction">
        {(
          [
            ["toAF", "Oven to air fryer"],
            ["toOven", "Air fryer to oven"],
          ] as const
        ).map(([k, label]) => (
          <button key={k} type="button" className={`p-opt${dir === k ? " p-on" : ""}`} aria-pressed={dir === k} onClick={() => setDir(k)}>
            {label}
          </button>
        ))}
      </div>

      <form className="p-panel p-panel-2" aria-label="Air fryer converter" onSubmit={(e) => e.preventDefault()}>
        <div className="p-cell">
          <label className="p-lab" htmlFor="af-temp">
            {toAF ? "Oven temperature" : "Air fryer temperature"}
          </label>
          <div className="p-row">
            <input className="p-in" id="af-temp" type="text" inputMode="decimal" autoComplete="off" value={tempText} onChange={(e) => setTempText(e.target.value)} aria-invalid={!tOk} />
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
          <label className="p-lab" htmlFor="af-time">
            {toAF ? "Oven time" : "Air fryer time"}
          </label>
          <div className="p-row">
            <input className="p-in" id="af-time" type="text" inputMode="decimal" autoComplete="off" value={timeText} onChange={(e) => setTimeText(e.target.value)} aria-invalid={!mOk} />
            <span className="p-lab p-unit-t">min</span>
          </div>
        </div>
      </form>

      <ul className={`p-reads p-reads-live${toAF ? "" : " p-reads-3"}`} aria-live="polite">
        <Read v={tRange} u={out ? `°${unit}` : undefined} c={toAF ? `Air fryer: ${AF_RULE.dropLoF} to ${AF_RULE.dropHiF}°F lower` : `Oven: ${AF_RULE.dropLoF} to ${AF_RULE.dropHiF}°F higher`} />
        <Read v={other} u={out ? (unit === "F" ? "°C" : "°F") : undefined} c={unit === "F" ? "Same, in Celsius" : "Same, in Fahrenheit"} />
        <Read v={outMin !== null ? String(r0(outMin)) : "—"} u={outMin !== null ? "min" : undefined} c={toAF ? `${AF_RULE.timeCutPct}% less time` : `Air fryer time ÷ ${1 - AF_RULE.timeCutPct / 100}`} />
        {toAF && <Read v={outMin !== null ? String(r0(outMin / 2)) : "—"} u={outMin !== null ? "min" : undefined} c="Halfway: shake the basket or flip" />}
      </ul>
      {out && inF !== null && (
        <TempCompare
          title="Temperature"
          unit={unit}
          rows={[
            { name: toAF ? "Oven, the recipe" : "Air fryer, the recipe", lo: inF, hi: inF, tone: TONE.blue },
            { name: toAF ? "Air fryer" : "Oven", lo: out.lo, hi: out.hi, tone: TONE.orange },
          ]}
        />
      )}
      {outMin !== null && m !== null && (
        <Bars
          title="Time"
          label="Cooking time"
          rows={[
            { name: toAF ? "Oven, the recipe" : "Air fryer, the recipe", v: m, text: `${r0(m)} min`, tone: TONE.blue },
            { name: toAF ? "Air fryer" : "Oven", v: outMin, text: `${r0(outMin)} min`, tone: TONE.orange },
          ]}
        />
      )}
    </div>
  );
}
