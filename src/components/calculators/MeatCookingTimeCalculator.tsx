"use client";

import { useEffect, useState } from "react";
import Read from "@/components/instrument/Read";
import { RoastRate } from "@/components/instrument/Scales";
import { setLive } from "@/components/instrument/live";
import { DONE, KINDS, ROASTS, STUFFED_ADD, hm, roastTime, type Kind } from "@/data/roasting-times";

const KG_PER_LB = 0.45359237; // exact, NIST SP 811

const fmtLb = (n: number) => (Math.round(n * 10) / 10).toString();
const range = (lo: number, hi: number) => (lo === hi ? String(lo) : `${lo}–${hi}`);

export default function MeatCookingTimeCalculator() {
  const [kind, setKind] = useState<Kind>("beef");
  const [id, setId] = useState("beef-rib-bone");
  const [weightText, setWeightText] = useState("5");
  const [unit, setUnit] = useState<"lb" | "kg">("lb");
  const [stuffed, setStuffed] = useState(false);

  const rows = ROASTS.filter((r) => r.kind === kind);
  const row = rows.find((r) => r.id === id) ?? rows[0];
  const n = Number(weightText.trim().replace(",", "."));
  const weightOk = weightText.trim() !== "" && Number.isFinite(n) && n > 0 && n < 100;
  const lb = unit === "kg" ? n / KG_PER_LB : n;
  const needsWeight = row.lbLo !== null;
  const time = !needsWeight || weightOk ? roastTime(row, lb, stuffed) : null;
  const done = DONE[row.section];

  useEffect(() => {
    setLive("oven", row.ovenLo);
  }, [row.ovenLo]);

  const pickKind = (k: Kind) => {
    setKind(k);
    const first = ROASTS.find((r) => r.kind === k);
    if (first) {
      setId(first.id);
      if (first.lbLo !== null) setWeightText(fmtLb(unit === "kg" ? first.lbLo * KG_PER_LB : first.lbLo));
    }
    setStuffed(false);
  };

  const pickRow = (rid: string) => {
    setId(rid);
    const r = ROASTS.find((x) => x.id === rid);
    if (r && r.lbLo !== null && r.lbHi !== null && weightOk && (lb < r.lbLo || lb > r.lbHi)) {
      setWeightText(fmtLb(unit === "kg" ? r.lbLo * KG_PER_LB : r.lbLo));
    }
    if (!r?.stuffable) setStuffed(false);
  };

  const rate = row.perLbLo !== undefined && row.perLbHi !== undefined ? range(row.perLbLo, row.perLbHi) : null;
  const oven = row.ovenLo === row.ovenHi ? `${row.ovenLo}°F` : `${row.ovenLo} to ${row.ovenHi}°F`;

  let timeCaption: string;
  if (time) timeCaption = time.lo === time.hi ? hm(time.lo) : `${hm(time.lo)} to ${hm(time.hi)}`;
  else if (needsWeight && !weightOk) timeCaption = "Enter the weight";
  else timeCaption = `Outside the chart's ${row.weightText} range`;

  return (
    <div>
      <div className="p-tabs" role="group" aria-label="Meat">
        {KINDS.map((k) => (
          <button key={k.key} type="button" className={`p-opt${kind === k.key ? " p-on" : ""}`} aria-pressed={kind === k.key} onClick={() => pickKind(k.key)}>
            {k.label}
          </button>
        ))}
      </div>

      <form className="p-panel p-panel-3" aria-label="Meat cooking time calculator" onSubmit={(e) => e.preventDefault()}>
        <div className="p-cell">
          <label className="p-lab" htmlFor="mc-cut">
            Cut
          </label>
          <select className="p-sel" id="mc-cut" value={row.id} onChange={(e) => pickRow(e.target.value)}>
            {rows.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}, {r.weightText}
              </option>
            ))}
          </select>
        </div>
        <div className="p-cell">
          <label className="p-lab" htmlFor="mc-weight">
            Weight
          </label>
          {needsWeight ? (
            <div className="p-row">
              <input
                className="p-in"
                id="mc-weight"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={weightText}
                onChange={(e) => setWeightText(e.target.value)}
                aria-invalid={!weightOk}
              />
              <div className="p-unit" role="group" aria-label="Weight unit">
                {(["lb", "kg"] as const).map((u) => (
                  <button
                    key={u}
                    type="button"
                    aria-pressed={unit === u}
                    className={unit === u ? "p-on" : undefined}
                    onClick={() => {
                      if (u === unit) return;
                      if (weightOk) setWeightText(fmtLb(u === "kg" ? n * KG_PER_LB : n / KG_PER_LB));
                      setUnit(u);
                    }}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p className="p-hint" id="mc-weight">
              The chart gives one time for {row.weightText === "Any" ? "any size" : row.weightText}.
            </p>
          )}
          {needsWeight && unit === "kg" && weightOk && <p className="p-hint">{fmtLb(lb)} lb</p>}
        </div>
        {row.stuffable && (
          <div className="p-cell">
            <span className="p-lab">Stuffing</span>
            <label className="p-check">
              <input type="checkbox" checked={stuffed} onChange={(e) => setStuffed(e.target.checked)} />
              Stuffed bird
            </label>
          </div>
        )}
      </form>

      <ul className="p-reads p-reads-live" aria-live="polite">
        <Read v={time ? range(time.lo, time.hi) : "—"} u={time ? "min" : undefined} c={timeCaption} />
        <Read v={row.ovenLo === row.ovenHi ? String(row.ovenLo) : `${row.ovenLo}–${row.ovenHi}`} u="°F" c="Oven temperature" />
        <Read
          v={String(done.f)}
          u="°F"
          c={
            done.restMin
              ? `Inside, then rest ${done.restMin} minutes`
              : row.section === "poultry"
                ? "Inner thigh, inner wing, thickest breast"
                : `Or ${done.alt?.f}°F if packaged in a USDA-inspected plant`
          }
        />
        <Read v={rate ?? "—"} u={rate ? "min/lb" : undefined} c={rate ? `Rate for ${row.weightText}` : "The chart gives a total time"} />
      </ul>
      {row.lbLo !== null && row.lbHi !== null && row.lbHi > row.lbLo && row.perLbLo !== undefined && row.perLbHi !== undefined && (
        <RoastRate
          lbLo={row.lbLo}
          lbHi={row.lbHi}
          perLo={row.perLbLo}
          perHi={row.perLbHi}
          addLo={stuffed && row.stuffable ? STUFFED_ADD.lo : 0}
          addHi={stuffed && row.stuffable ? STUFFED_ADD.hi : 0}
          lb={time ? lb : null}
          text={time ? `${fmtLb(lb)} lb, ${hm(time.lo)} to ${hm(time.hi)}` : "outside the chart's weights"}
        />
      )}
      <p className="p-res-basis p-mt">
        <strong>USDA chart:</strong> {row.name.charAt(0).toLowerCase() + row.name.slice(1)}, {row.weightText}, {oven},{" "}
        {rate ? `${rate.replace("–", " to ")} minutes per pound` : row.totalLo === row.totalHi ? hm(row.totalLo ?? 0) : `${hm(row.totalLo ?? 0)} to ${hm(row.totalHi ?? 0)} in all`}
        {stuffed && row.stuffable ? `, plus ${STUFFED_ADD.lo} to ${STUFFED_ADD.hi} minutes for the stuffing` : ""}.
      </p>
    </div>
  );
}
