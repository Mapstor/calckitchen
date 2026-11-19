"use client";

import { useEffect, useState } from "react";
import Read from "@/components/instrument/Read";
import { setLive } from "@/components/instrument/live";
import { GE_MW, forWattage, mmss, toConventional, toMicrowave } from "@/data/microwave";

type Mode = "toMW" | "toOven" | "watts" | "batch";
const MODES: { key: Mode; label: string }[] = [
  { key: "toMW", label: "Oven or stove to microwave" },
  { key: "toOven", label: "Microwave to oven" },
  { key: "watts", label: "Different wattage" },
  { key: "batch", label: "Half or double recipe" },
];

const parse = (t: string) => {
  const n = Number(t.trim().replace(",", "."));
  return t.trim() !== "" && Number.isFinite(n) && n > 0 ? n : null;
};
const r1 = (n: number) => (Math.round(n * 10) / 10).toString();

export default function MicrowaveToOvenConverter() {
  const [mode, setMode] = useState<Mode>("toMW");
  const [timeText, setTimeText] = useState("60");
  const [recipeW, setRecipeW] = useState("1100");
  const [yourW, setYourW] = useState("700");
  const [batch, setBatch] = useState<"half" | "double">("half");

  const t = parse(timeText);
  const w1 = parse(recipeW);
  const w2 = parse(yourW);
  const tOk = t !== null && t <= 24 * 60;

  let main = "—";
  let mainU: string | undefined;
  let mainC = "";
  let second = "—";
  let secondC = "";
  let dial: number | null = null;

  if (tOk && t !== null) {
    if (mode === "toMW") {
      const r = toMicrowave(t);
      main = `${r1(r.lo)}–${r1(r.hi)}`;
      mainU = "min";
      mainC = `${mmss(r.lo)} to ${mmss(r.hi)}: ¼ to ⅓ of ${r1(t)} min`;
      second = String(GE_MW.powerLevel);
      secondC = "Power level, unless a similar microwave recipe says otherwise";
      dial = r.lo;
    } else if (mode === "toOven") {
      const r = toConventional(t);
      main = `${r1(r.lo)}–${r1(r.hi)}`;
      mainU = "min";
      mainC = "3 to 4 times the microwave time";
      second = "—";
      secondC = "Oven temperature: use the original recipe's";
      dial = t;
    } else if (mode === "watts" && w1 !== null && w2 !== null) {
      const m = forWattage(t, w1, w2);
      main = r1(m);
      mainU = "min";
      mainC = `${mmss(m)}: ${r1(t)} min × ${w1} W ÷ ${w2} W`;
      second = `${Math.round((w1 / w2) * 100)}`;
      secondC = "% of the recipe's time (equal-energy estimate)";
      dial = m;
    } else if (mode === "batch") {
      if (batch === "half") {
        main = r1(t * (1 - GE_MW.halfTimeCut));
        mainU = "min";
        mainC = `Half recipe: ⅓ less time, same power`;
        dial = t * (1 - GE_MW.halfTimeCut);
      } else {
        main = `${r1(t * (1 + GE_MW.doubleAddLo))}–${r1(t * (1 + GE_MW.doubleAddHi))}`;
        mainU = "min";
        mainC = "Double recipe: ½ to ⅔ more time, not twice the time";
        dial = t * (1 + GE_MW.doubleAddLo);
      }
      second = batch === "half" ? "Same" : "¼–½ less";
      secondC = batch === "half" ? "Power level" : "Liquid";
    }
  }

  useEffect(() => {
    if (dial !== null) setLive("mw", Math.round(dial * 10) / 10);
  }, [dial]);

  return (
    <div>
      <div className="p-tabs" role="group" aria-label="What to convert">
        {MODES.map((m) => (
          <button key={m.key} type="button" className={`p-opt${mode === m.key ? " p-on" : ""}`} aria-pressed={mode === m.key} onClick={() => setMode(m.key)}>
            {m.label}
          </button>
        ))}
      </div>

      <form className="p-panel p-panel-2" aria-label="Microwave converter" onSubmit={(e) => e.preventDefault()}>
        <div className="p-cell">
          <label className="p-lab" htmlFor="mw-time">
            {mode === "toMW" ? "Oven or stovetop time" : mode === "toOven" ? "Microwave time" : "Microwave time in the recipe"}
          </label>
          <div className="p-row">
            <input className="p-in" id="mw-time" type="text" inputMode="decimal" autoComplete="off" value={timeText} onChange={(e) => setTimeText(e.target.value)} aria-invalid={!tOk} />
            <span className="p-lab p-unit-t">min</span>
          </div>
        </div>
        {mode === "watts" && (
          <div className="p-cell">
            <div className="p-row p-row-gap">
              <div>
                <label className="p-lab" htmlFor="mw-w1">
                  Recipe&apos;s microwave, W
                </label>
                <input className="p-in" id="mw-w1" type="text" inputMode="numeric" value={recipeW} onChange={(e) => setRecipeW(e.target.value)} aria-invalid={w1 === null} />
              </div>
              <div>
                <label className="p-lab" htmlFor="mw-w2">
                  Yours, W
                </label>
                <input className="p-in" id="mw-w2" type="text" inputMode="numeric" value={yourW} onChange={(e) => setYourW(e.target.value)} aria-invalid={w2 === null} />
              </div>
            </div>
          </div>
        )}
        {mode === "batch" && (
          <div className="p-cell" role="group" aria-label="Recipe size">
            <span className="p-lab">Recipe size</span>
            <div className="p-unit p-unit-wide">
              {(["half", "double"] as const).map((b) => (
                <button key={b} type="button" aria-pressed={batch === b} className={batch === b ? "p-on" : undefined} onClick={() => setBatch(b)}>
                  {b === "half" ? "Half" : "Double"}
                </button>
              ))}
            </div>
          </div>
        )}
        {(mode === "toMW" || mode === "toOven") && (
          <div className="p-cell">
            <span className="p-lab">Liquid</span>
            <p className="p-hint">{mode === "toMW" ? "GE suggests about ⅓ less liquid, though it isn't always needed." : "Use the original oven recipe's liquid."}</p>
          </div>
        )}
      </form>

      <ul className="p-reads p-reads-2 p-reads-live" aria-live="polite">
        <Read v={main} u={main === "—" ? undefined : mainU} c={mainC || "Time"} />
        <Read v={second} c={secondC || "—"} />
      </ul>
      <p className="p-res-basis p-mt">
        {mode === "watts"
          ? "Wattage times are an equal-energy estimate (watts × time kept the same), not a manufacturer rule; check the food before the time is up."
          : "Rules from GE Appliances' microwave recipe-conversion guide."}
      </p>
    </div>
  );
}
