"use client";

import { useEffect, useState } from "react";
import Read from "@/components/instrument/Read";
import { Ratio, TONE } from "@/components/instrument/Bars";
import { setLive } from "@/components/instrument/live";
import { COLD_BREW_HOURS, METHODS, NCA_TEMP, SCA, WATER_UNITS, coffeeRange, d1, ncaTbsp, ratioText, waterGrams, type WaterUnit } from "@/data/coffee";
import { kitchen, parseNum } from "@/data/scaler";

const num = (t: string) => {
  const n = parseNum(t.replace(",", "."));
  return n !== null && n > 0 ? n : null;
};
const g1 = (lo: number, hi: number) => (Math.abs(lo - hi) < 0.05 ? d1(lo) : `${d1(lo)}–${d1(hi)}`);

export default function CoffeeRatioCalculator() {
  const [methodKey, setMethodKey] = useState("drip");
  const [text, setText] = useState("1");
  const [unit, setUnit] = useState<WaterUnit>("l");
  const [doseText, setDoseText] = useState("18");

  const m = METHODS.find((x) => x.key === methodKey)!;
  const espresso = m.key === "espresso";
  const a = num(text);
  const dose = num(doseText);
  const ok = espresso ? dose !== null && dose <= 1000 : a !== null && a <= 1e5;
  const ml = !espresso && ok ? (a as number) * WATER_UNITS.find((u) => u.key === unit)!.ml : null;
  const wg = ml !== null ? waterGrams(ml) : null;
  const range = wg !== null ? coffeeRange(wg, m) : null;
  const tb = ml !== null ? ncaTbsp(ml) : null;

  const dial = espresso ? (ok ? (dose as number) : null) : range ? (range.lo + range.hi) / 2 : null;
  useEffect(() => {
    if (dial !== null) setLive("coffee", Math.round(dial * 10) / 10);
  }, [dial]);

  const temp = `${NCA_TEMP.c} ± ${NCA_TEMP.plusMinus}°C`;
  const fourth =
    m.key === "drip"
      ? { v: tb ? `${kitchen(tb.lo)}–${kitchen(tb.hi)}` : "—", u: tb ? "tbsp" : undefined, c: "By the spoon: NCA's 1 to 2 tbsp per 6 fl oz" }
      : m.key === "coldbrew"
        ? { v: String(COLD_BREW_HOURS), u: "h", c: "Steep, or overnight (NCA)" }
        : { v: `${NCA_TEMP.c}±${NCA_TEMP.plusMinus}`, u: "°C", c: `Water temperature (NCA), ${temp}` };

  return (
    <div>
      <div className="p-tabs" role="group" aria-label="Brewing method">
        {METHODS.map((x) => (
          <button key={x.key} type="button" className={`p-opt${methodKey === x.key ? " p-on" : ""}`} aria-pressed={methodKey === x.key} onClick={() => setMethodKey(x.key)}>
            {x.name}
          </button>
        ))}
      </div>

      <form className="p-panel p-panel-2" aria-label="Coffee ratio calculator" onSubmit={(e) => e.preventDefault()}>
        <div className="p-cell">
          {espresso ? (
            <>
              <label className="p-lab" htmlFor="cf-dose">
                Dry coffee dose, g
              </label>
              <input className="p-in p-in-ot" id="cf-dose" type="text" inputMode="decimal" autoComplete="off" value={doseText} onChange={(e) => setDoseText(e.target.value)} aria-invalid={!ok} />
            </>
          ) : (
            <>
              <label className="p-lab" htmlFor="cf-water">
                Water
              </label>
              <div className="p-row">
                <input className="p-in p-in-ot" id="cf-water" type="text" inputMode="decimal" autoComplete="off" value={text} onChange={(e) => setText(e.target.value)} aria-invalid={!ok} />
                <select className="p-sel p-sel-bt" aria-label="Water unit" value={unit} onChange={(e) => setUnit(e.target.value as WaterUnit)}>
                  {WATER_UNITS.map((u) => (
                    <option key={u.key} value={u.key}>
                      {u.label}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>
        <div className="p-cell">
          <span className="p-lab">{m.name} ratio</span>
          <p className="p-hint">
            {m.key === "drip"
              ? `${SCA.gPerKg} g of coffee per liter of water: the SCA's standard brew ratio, ${ratioText(m)}.`
              : espresso
                ? "1 g of dry coffee to 2 g of liquid espresso, by weight (NCA)."
                : `${ratioText(m)} by weight: 1 g of coffee to ${m.lo} to ${m.hi} g of water (NCA).`}
          </p>
        </div>
      </form>

      {espresso ? (
        <ul className="p-reads p-reads-2 p-reads-live" aria-live="polite">
          <Read v={ok ? d1(dose as number) : "—"} u={ok ? "g" : undefined} c="Dry coffee" />
          <Read v={ok ? d1((dose as number) * m.lo) : "—"} u={ok ? "g" : undefined} c="Liquid espresso to pull, at 1:2" />
        </ul>
      ) : (
        <ul className="p-reads p-reads-live" aria-live="polite">
          <Read v={range ? g1(range.lo, range.hi) : "—"} u={range ? "g" : undefined} c="Ground coffee, weighed" />
          <Read v={wg !== null ? Math.round(wg).toLocaleString("en-US") : "—"} u={wg !== null ? "g" : undefined} c={ml !== null ? `Water: ${Math.round(ml).toLocaleString("en-US")} mL` : "Water"} />
          <Read v={ratioText(m)} c={`${m.by} ratio, coffee to water`} />
          <Read v={fourth.v} u={fourth.u} c={fourth.c} />
        </ul>
      )}
      <Ratio
        title={`${m.name}, ${ratioText(m)} by weight`}
        label={`${m.name}: 1 part ${espresso ? "dry coffee to " : "coffee to "}${m.lo === m.hi ? d1(m.lo) : `${d1(m.lo)} to ${d1(m.hi)}`} parts ${espresso ? "liquid espresso" : "water"}`}
        b={m.lo}
        bHi={m.hi}
        aName={espresso ? "Dry coffee" : "Coffee"}
        bName={espresso ? "Liquid espresso" : "Water"}
        aTone={TONE.orange}
        bTone={TONE.blue}
      />
      <p className="p-res-basis p-mt">Water weighed at 1,000 g per liter (USDA). Coffee ranges run from the weaker to the stronger end of the ratio.</p>
    </div>
  );
}
