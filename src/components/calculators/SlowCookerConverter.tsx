"use client";

import { useEffect, useState } from "react";
import Read from "@/components/instrument/Read";
import { setLive } from "@/components/instrument/live";
import { CROCKPOT, bandForOven, hrs, minsText, ovenForSlow } from "@/data/slow-cooker";

type Dir = "toSlow" | "toOven";

const parse = (t: string) => {
  const n = Number(t.trim().replace(",", "."));
  return t.trim() !== "" && Number.isFinite(n) && n > 0 ? n : null;
};

export default function SlowCookerConverter() {
  const [dir, setDir] = useState<Dir>("toSlow");
  const [minText, setMinText] = useState("40");
  const [hourText, setHourText] = useState("8");
  const [setting, setSetting] = useState<"low" | "high">("low");

  const m = parse(minText);
  const h = parse(hourText);
  const fwd = dir === "toSlow" && m !== null ? bandForOven(m) : null;
  const back = dir === "toOven" && h !== null ? ovenForSlow(h, setting) : null;

  const dial = fwd ? fwd.band.lowLo : dir === "toOven" && h !== null ? h : null;
  useEffect(() => {
    if (dial !== null) setLive("slow", dial);
  }, [dial]);

  return (
    <div>
      <div className="p-tabs" role="group" aria-label="Direction">
        {(
          [
            ["toSlow", "Oven or stove to slow cooker"],
            ["toOven", "Slow cooker to oven or stove"],
          ] as const
        ).map(([k, label]) => (
          <button key={k} type="button" className={`p-opt${dir === k ? " p-on" : ""}`} aria-pressed={dir === k} onClick={() => setDir(k)}>
            {label}
          </button>
        ))}
      </div>

      <form className="p-panel p-panel-2" aria-label="Slow cooker converter" onSubmit={(e) => e.preventDefault()}>
        {dir === "toSlow" ? (
          <div className="p-cell">
            <label className="p-lab" htmlFor="sc-min">
              Oven or stovetop time
            </label>
            <div className="p-row">
              <input className="p-in" id="sc-min" type="text" inputMode="numeric" autoComplete="off" value={minText} onChange={(e) => setMinText(e.target.value)} aria-invalid={m === null} />
              <span className="p-lab p-unit-t">min</span>
            </div>
            <p className="p-hint">The chart covers 15 minutes to 3 hours</p>
          </div>
        ) : (
          <>
            <div className="p-cell">
              <label className="p-lab" htmlFor="sc-h">
                Slow cooker time
              </label>
              <div className="p-row">
                <input className="p-in" id="sc-h" type="text" inputMode="decimal" autoComplete="off" value={hourText} onChange={(e) => setHourText(e.target.value)} aria-invalid={h === null} />
                <span className="p-lab p-unit-t">hours</span>
              </div>
            </div>
            <div className="p-cell" role="group" aria-label="Setting">
              <span className="p-lab">Setting</span>
              <div className="p-unit p-unit-wide">
                {(["low", "high"] as const).map((s) => (
                  <button key={s} type="button" aria-pressed={setting === s} className={setting === s ? "p-on" : undefined} onClick={() => setSetting(s)}>
                    {s === "low" ? "Low" : "High"}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </form>

      {dir === "toSlow" && (
        <ul className="p-reads p-reads-live" aria-live="polite">
          <Read v={fwd ? `${hrs(fwd.band.lowLo)}–${hrs(fwd.band.lowHi)}` : "—"} u={fwd ? "h" : undefined} c="On Low" />
          <Read v={fwd ? `${hrs(fwd.band.highLo)}–${hrs(fwd.band.highHi)}` : "—"} u={fwd ? "h" : undefined} c="Or on High" />
          <Read v={String(CROCKPOT.minLowHoursRawMeatVeg)} u="h" c="At least, on Low, for most uncooked meat and vegetables" />
          <Read v={String(CROCKPOT.dairyLastHours)} u="h" c="Add milk, sour cream or cream in the last hour" />
        </ul>
      )}
      {dir === "toSlow" && (
        <p className="p-res-basis p-mt">
          {fwd
            ? `Crock-Pot's row for ${minsText(fwd.band.ovenLo)} to ${minsText(fwd.band.ovenHi)}${fwd.exact ? "" : " (the nearest row; your time falls between two)"}.`
            : "The chart covers 15 minutes to 3 hours; this time is outside it."}
        </p>
      )}
      {dir === "toOven" && (
        <ul className="p-reads p-reads-2 p-reads-live" aria-live="polite">
          <Read v={back ? `${back.lo}–${back.hi}` : "—"} u={back ? "min" : undefined} c={back ? `${minsText(back.lo)} to ${minsText(back.hi)} in the oven or on the stove` : "Not a time on the chart for this setting"} />
          <Read v={setting === "low" ? "Low" : "High"} c="Setting you entered" />
        </ul>
      )}
    </div>
  );
}
