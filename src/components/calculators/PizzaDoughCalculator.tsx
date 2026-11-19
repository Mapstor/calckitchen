"use client";

import { useEffect, useState } from "react";
import Read from "@/components/instrument/Read";
import { setLive } from "@/components/instrument/live";
import { NAPOLETANA, NAPOLETANA_PCT, d1, weightsFromTotal } from "@/data/bakers";

type Preset = "napoletana" | "own";

const parse = (t: string) => {
  const n = Number(t.trim().replace(",", "."));
  return t.trim() !== "" && Number.isFinite(n) ? n : null;
};
const g0 = (n: number) => String(Math.round(n));

const FIELDS = [
  { key: "water", label: "Water", def: "62" },
  { key: "salt", label: "Salt", def: "2.5" },
  { key: "yeast", label: "Yeast", def: "0.5" },
  { key: "oil", label: "Oil", def: "0" },
  { key: "sugar", label: "Sugar", def: "0" },
] as const;
type Key = (typeof FIELDS)[number]["key"];

export default function PizzaDoughCalculator() {
  const [preset, setPreset] = useState<Preset>("napoletana");
  const [ballsText, setBallsText] = useState("4");
  const [ballText, setBallText] = useState("250");
  const [own, setOwn] = useState<Record<Key, string>>(Object.fromEntries(FIELDS.map((f) => [f.key, f.def])) as Record<Key, string>);

  const balls = parse(ballsText);
  const ball = parse(ballText);
  const ballsOk = balls !== null && Number.isInteger(balls) && balls >= 1 && balls <= 100;
  const napo = preset === "napoletana";
  const ballOk = ball !== null && (napo ? ball >= NAPOLETANA.ballLoG && ball <= NAPOLETANA.ballHiG : ball >= 50 && ball <= 3000);

  const pcts: Record<Key, number | null> = napo
    ? { water: NAPOLETANA_PCT.water, salt: NAPOLETANA_PCT.salt, yeast: NAPOLETANA_PCT.yeast, oil: 0, sugar: 0 }
    : (Object.fromEntries(FIELDS.map((f) => [f.key, parse(own[f.key])])) as Record<Key, number | null>);
  const pctOk = FIELDS.every((f) => {
    const v = pcts[f.key];
    return v !== null && v >= 0 && v <= 150;
  });
  const ok = ballsOk && ballOk && pctOk;
  const total = ok ? (balls as number) * (ball as number) : 0;
  const res = ok ? weightsFromTotal(total, FIELDS.map((f) => ({ name: f.label, pct: pcts[f.key] as number }))) : null;

  const flourR = res ? Math.round(res.flour) : null;
  useEffect(() => {
    if (flourR !== null) setLive("flour", flourR);
  }, [flourR]);

  const grams = (name: string) => (res ? res.parts.find((p) => p.name === name)?.g ?? 0 : 0);

  return (
    <div>
      <div className="p-tabs" role="group" aria-label="Dough">
        {(
          [
            ["napoletana", "Pizza Napoletana (EU rules)"],
            ["own", "Your own percentages"],
          ] as const
        ).map(([k, label]) => (
          <button
            key={k}
            type="button"
            className={`p-opt${preset === k ? " p-on" : ""}`}
            aria-pressed={preset === k}
            onClick={() => {
              setPreset(k);
              if (k === "napoletana" && ball !== null && (ball < NAPOLETANA.ballLoG || ball > NAPOLETANA.ballHiG)) setBallText(String(NAPOLETANA.ballHiG));
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <form className="p-panel p-panel-2" aria-label="Pizza dough calculator" onSubmit={(e) => e.preventDefault()}>
        <div className="p-cell">
          <div className="p-row p-row-gap">
            <div>
              <label className="p-lab" htmlFor="pz-balls">
                Dough balls
              </label>
              <input className="p-in" id="pz-balls" type="text" inputMode="numeric" autoComplete="off" value={ballsText} onChange={(e) => setBallsText(e.target.value)} aria-invalid={!ballsOk} />
            </div>
            <div>
              <label className="p-lab" htmlFor="pz-ball">
                Each ball, g
              </label>
              <input className="p-in" id="pz-ball" type="text" inputMode="decimal" autoComplete="off" value={ballText} onChange={(e) => setBallText(e.target.value)} aria-invalid={!ballOk} />
            </div>
          </div>
          <p className="p-hint">{napo ? `The rules allow ${NAPOLETANA.ballLoG} to ${NAPOLETANA.ballHiG} g a ball` : "Any size, 50 to 3000 g"}</p>
        </div>
        <div className="p-cell" role="group" aria-labelledby="pz-pct">
          <span className="p-lab" id="pz-pct">
            Baker&apos;s percentages {napo ? "(fixed by the rules)" : "(flour = 100%)"}
          </span>
          <div className="p-pcts">
            {FIELDS.map((f) => (
              <label key={f.key} className="p-pct">
                <span>{f.label}</span>
                <input
                  className="p-in p-in-pct"
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  disabled={napo}
                  value={napo ? d1(pcts[f.key] ?? 0) : own[f.key]}
                  onChange={(e) => setOwn({ ...own, [f.key]: e.target.value })}
                  aria-invalid={!napo && (pcts[f.key] === null || (pcts[f.key] as number) < 0)}
                />
                <span>%</span>
              </label>
            ))}
          </div>
        </div>
      </form>

      <ul className="p-reads p-reads-live" aria-live="polite">
        <Read v={res ? g0(res.flour) : "—"} u={res ? "g" : undefined} c="Flour" />
        <Read v={res ? g0(grams("Water")) : "—"} u={res ? "g" : undefined} c="Water" />
        <Read v={res ? d1(grams("Salt")) : "—"} u={res ? "g" : undefined} c="Salt" />
        <Read v={res ? d1(grams("Yeast")) : "—"} u={res ? "g" : undefined} c={napo ? "Fresh brewer's yeast" : "Yeast"} />
      </ul>
      {res && (grams("Oil") > 0 || grams("Sugar") > 0) && (
        <p className="p-res-basis p-mt">
          Also {grams("Oil") > 0 ? `${d1(grams("Oil"))} g oil` : ""}
          {grams("Oil") > 0 && grams("Sugar") > 0 ? " and " : ""}
          {grams("Sugar") > 0 ? `${d1(grams("Sugar"))} g sugar` : ""}.
        </p>
      )}
      {res && <p className="p-res-basis p-mt">Total dough: {g0(total)} g. Weights are rounded; salt and yeast to 0.1 g.</p>}
    </div>
  );
}
