"use client";

import { useEffect, useState } from "react";
import { setDial } from "@/components/instrument/LiveKnob";
import Read from "@/components/instrument/Read";
import { GAS_ROWS, cToF, fToC, fmt1, type GasRow } from "@/data/oven-temps";

type Unit = "F" | "C" | "GM";

const UNITS: { key: Unit; label: string }[] = [
  { key: "F", label: "°F" },
  { key: "C", label: "°C" },
  { key: "GM", label: "Gas" },
];

const QUICK: Record<Unit, string[]> = {
  F: ["300", "325", "350", "375", "400", "425", "450"],
  C: ["150", "160", "180", "190", "200", "220", "230"],
  GM: GAS_ROWS.map((r) => r.gm),
};

const parseMark = (t: string) => {
  const s = t.trim().replace(/^gas\s*mark\s*/i, "");
  if (s === "½" || s === "1/2" || s === "0.5" || s === ".5") return "½";
  return s;
};

export default function OvenTemperatureConverter() {
  const [unit, setUnit] = useState<Unit>("F");
  const [text, setText] = useState("350");

  let f: number | null = null;
  let row: GasRow | undefined;
  let near = false;

  if (unit === "GM") {
    row = GAS_ROWS.find((r) => r.gm === parseMark(text));
    f = row ? row.f : null;
  } else {
    const n = Number(text.trim().replace(",", "."));
    if (text.trim() !== "" && Number.isFinite(n)) {
      f = unit === "F" ? n : cToF(n);
      row = unit === "F" ? GAS_ROWS.find((r) => r.f === n) : GAS_ROWS.find((r) => r.c === n);
    }
  }
  const fv = f ?? 0;
  const ok = f !== null && fv >= 32 && fv <= 1000;
  if (ok && !row) {
    const best = [...GAS_ROWS].sort((a, b) => Math.abs(a.f - fv) - Math.abs(b.f - fv))[0];
    if (Math.abs(best.f - fv) <= 12.5) {
      row = best;
      near = true;
    }
  }

  useEffect(() => {
    if (ok) setDial(fv);
  }, [ok, fv]);

  const switchUnit = (u: Unit) => {
    if (u === unit) return;
    if (ok) {
      if (u === "GM") setText(row ? row.gm : "4");
      else if (unit === "GM" && row) setText(u === "F" ? String(row.f) : String(row.c));
      else setText(fmt1(u === "F" ? fv : fToC(fv)));
    } else {
      setText(u === "GM" ? "4" : u === "F" ? "350" : "180");
    }
    setUnit(u);
  };

  const c = fToC(fv);
  const pre = near ? "≈ " : "";

  return (
    <div>
      <form className="p-panel p-panel-2" aria-label="Oven temperature converter" onSubmit={(e) => e.preventDefault()}>
        <div className="p-cell">
          <label className="p-lab" htmlFor="ot-temp">
            {unit === "GM" ? "Gas mark" : "Oven temperature"}
          </label>
          <div className="p-row">
            <input
              className="p-in"
              id="ot-temp"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              value={text}
              onChange={(e) => setText(e.target.value)}
              aria-invalid={!ok}
              aria-describedby="ot-help"
            />
            <div className="p-unit" role="group" aria-label="Unit">
              {UNITS.map((u) => (
                <button key={u.key} type="button" aria-pressed={unit === u.key} className={unit === u.key ? "p-on" : undefined} onClick={() => switchUnit(u.key)}>
                  {u.label}
                </button>
              ))}
            </div>
          </div>
          <p className="p-hint" id="ot-help">
            {ok ? (unit === "GM" ? "Gas marks ½ to 9" : "Any oven temperature") : unit === "GM" ? "Enter a gas mark from ½ to 9" : "Enter a number"}
          </p>
        </div>
        <div className="p-cell" role="group" aria-labelledby="ot-quick">
          <span className="p-lab" id="ot-quick">
            {unit === "GM" ? "Pick a gas mark" : "Common settings"}
          </span>
          <div className="p-quick">
            {QUICK[unit].map((q) => (
              <button key={q} type="button" className={`p-opt${text === q ? " p-on" : ""}`} aria-pressed={text === q} onClick={() => setText(q)}>
                {q}
              </button>
            ))}
          </div>
        </div>
      </form>

      <ul className="p-reads p-reads-live" aria-live="polite">
        <Read v={ok ? fmt1(fv) : "—"} u="°F" c={unit === "F" ? "As entered" : unit === "C" ? "Exact: °C × 1.8 + 32" : "Which? chart"} />
        <Read v={ok ? fmt1(c) : "—"} u="°C" c={unit === "C" ? "As entered" : "Exact: (°F − 32) ÷ 1.8"} />
        <Read
          v={ok && row ? pre + row.gm : "—"}
          c={!ok ? "Gas mark" : row ? `Gas mark; the chart prints ${row.c}°C` : "Outside gas marks ½ to 9"}
        />
        <Read v={ok && row ? pre + row.fan : "—"} u={ok && row ? "°C" : undefined} c={ok && row ? "Fan oven, from the chart" : "Fan oven °C"} />
      </ul>
    </div>
  );
}
