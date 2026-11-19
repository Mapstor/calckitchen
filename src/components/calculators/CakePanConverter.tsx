"use client";

import { useEffect, useState } from "react";
import Read from "@/components/instrument/Read";
import { setLive } from "@/components/instrument/live";
import { area, frac, wiltonFor, type PanShape } from "@/data/wilton";

type Pan = { shape: PanShape; a: string; b: string };
const SHAPES: PanShape[] = ["Round", "Square", "Rectangle"];

const parse = (t: string) => {
  const n = Number(t.trim().replace(",", "."));
  return t.trim() !== "" && Number.isFinite(n) && n > 0 && n <= 40 ? n : null;
};
const d1 = (n: number) => (Math.round(n * 10) / 10).toString();

function PanCell({ id, label, pan, set }: { id: string; label: string; pan: Pan; set: (p: Pan) => void }) {
  return (
    <div className="p-cell" role="group" aria-labelledby={`${id}-l`}>
      <span className="p-lab" id={`${id}-l`}>
        {label}
      </span>
      <div className="p-unit p-unit-wide" role="group" aria-label={`${label} shape`}>
        {SHAPES.map((s) => (
          <button key={s} type="button" aria-pressed={pan.shape === s} className={pan.shape === s ? "p-on" : undefined} onClick={() => set({ ...pan, shape: s })}>
            {s}
          </button>
        ))}
      </div>
      <div className="p-row">
        <input className="p-in" type="text" inputMode="decimal" aria-label={`${label} ${pan.shape === "Round" ? "diameter" : "side"}, inches`} value={pan.a} onChange={(e) => set({ ...pan, a: e.target.value })} aria-invalid={parse(pan.a) === null} />
        {pan.shape === "Rectangle" && (
          <>
            <span className="p-lab p-unit-t">×</span>
            <input className="p-in" type="text" inputMode="decimal" aria-label={`${label} second side, inches`} value={pan.b} onChange={(e) => set({ ...pan, b: e.target.value })} aria-invalid={parse(pan.b) === null} />
          </>
        )}
        <span className="p-lab p-unit-t">in.</span>
      </div>
    </div>
  );
}

export default function CakePanConverter() {
  const [from, setFrom] = useState<Pan>({ shape: "Round", a: "8", b: "8" });
  const [to, setTo] = useState<Pan>({ shape: "Round", a: "9", b: "9" });

  const dims = (p: Pan) => {
    const a = parse(p.a);
    const b = p.shape === "Rectangle" ? parse(p.b) : a;
    return a !== null && b !== null ? { a, b } : null;
  };
  const df = dims(from);
  const dt = dims(to);
  const af = df ? area(from.shape, df.a, df.b) : null;
  const at = dt ? area(to.shape, dt.a, dt.b) : null;
  const mult = af && at ? at / af : null;
  const w = dt ? wiltonFor(to.shape, dt.a, dt.b) : undefined;
  const m2 = mult !== null ? Math.round(mult * 100) / 100 : null;

  useEffect(() => {
    if (m2 !== null) setLive("pan", m2);
  }, [m2]);

  return (
    <div>
      <form className="p-panel p-panel-2" aria-label="Cake pan converter" onSubmit={(e) => e.preventDefault()}>
        <PanCell id="cp-from" label="Recipe's pan" pan={from} set={setFrom} />
        <PanCell id="cp-to" label="Your pan" pan={to} set={setTo} />
      </form>

      <ul className="p-reads p-reads-live" aria-live="polite">
        <Read v={m2 !== null ? m2.toFixed(2) : "—"} u={m2 !== null ? "×" : undefined} c="Multiply every ingredient by this" />
        <Read v={at !== null ? d1(at) : "—"} u={at !== null ? "sq in" : undefined} c={af !== null ? `Your pan; the recipe's is ${d1(af)} sq in` : "Your pan's area"} />
        <Read v={w ? String(frac(w.cups)) : "—"} u={w ? "cups" : undefined} c={w ? "Wilton: batter for one 2 in. layer" : "Not a size on Wilton's chart"} />
        <Read v={w ? `${w.timeLo}–${w.timeHi}` : "—"} u={w ? "min" : undefined} c={w ? `Wilton: at ${w.tempF}°F, 2 in. layer` : "Not a size on Wilton's chart"} />
      </ul>
      <p className="p-res-basis p-mt">Assumes both pans are the same depth.</p>
    </div>
  );
}
