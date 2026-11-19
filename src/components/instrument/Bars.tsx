// Small charts for calculator results (dataviz rules: bars <= 24px thick, square at the baseline, 4px rounded data end,
// value at the tip in the readout face, names and values in text ink; identity never by color alone: every bar is named,
// every split part sits in a legend with its value). Class names use p-vbar / p-split / p-ratio / p-viz (p-bar and p-key
// belong to RoastChart).

export type BarRow = { name: string; v: number; text: string; tone?: string; note?: string };

export const TONE = { blue: "#1D5FBF", orange: "#E35A0F", purple: "#7B4FC4", green: "#0A8F6A", ink: "#0E1621", steel: "#9AA4B1" } as const;

/** horizontal bars on one shared axis (zero at the left) */
export default function Bars({ rows, label, title, max }: { rows: BarRow[]; label: string; title?: string; max?: number }) {
  const top = max ?? Math.max(...rows.map((r) => r.v), 0);
  return (
    <div className="p-vbars">
      {title && <p className="p-vbars-t">{title}</p>}
      <div className="p-vbars-l" role="img" aria-label={`${label}: ${rows.map((r) => `${r.name} ${r.text}`).join(", ")}`}>
        {rows.map((r) => {
          const f = top > 0 ? Math.min(1, Math.max(0, r.v / top)) : 0;
          return (
            <div className="p-vbar" key={r.name} title={`${r.name}: ${r.text}${r.note ? ` (${r.note})` : ""}`}>
              <span className="p-vbar-n">{r.name}</span>
              <span className="p-vbar-t">
                <span className="p-vbar-f" style={{ width: `calc((100% - 96px) * ${f.toFixed(4)})`, background: r.tone ?? TONE.blue }} />
                <span className="p-vbar-v">{r.text}</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** one whole split into parts, labelled by a legend (dataviz "tall segmented bar": 28px, 4px corners, 2px gaps) */
export function Split({ parts, label, title }: { parts: { name: string; v: number; text: string; tone: string }[]; label: string; title?: string }) {
  const total = parts.reduce((a, p) => a + Math.max(0, p.v), 0);
  const shown = parts.filter((p) => p.v > 0);
  return (
    <div className="p-split-w">
      {title && <p className="p-vbars-t">{title}</p>}
      <div className="p-split" role="img" aria-label={`${label}: ${parts.map((p) => `${p.name} ${p.text}`).join(", ")}`}>
        {shown.map((p) => {
          const pct = total > 0 ? (p.v / total) * 100 : 0;
          return (
            <span key={p.name} className="p-split-p" style={{ flexGrow: p.v, background: p.tone }} title={`${p.name}: ${p.text} (${Math.round(pct)}%)`}>
              {pct >= 12 && <span className="p-split-l">{Math.round(pct)}%</span>}
            </span>
          );
        })}
      </div>
      <div className="p-viz-cap">
        {parts.map((p) => (
          <span key={p.name} className="p-vkey">
            <span className="p-vsw" style={{ background: p.tone }} /> {p.name} <span className="p-vkey-v">{p.text}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** a ratio drawn as equal blocks: 1 part of A, then B parts of the other (a fractional last block when B is not whole) */
export function Ratio({ b, aName, bName, aTone, bTone, label }: { b: number; aName: string; bName: string; aTone: string; bTone: string; label: string }) {
  const whole = Math.floor(b + 1e-9);
  const part = b - whole;
  const cells = [{ k: "a", g: 1, tone: aTone }, ...Array.from({ length: whole }, (_, i) => ({ k: `b${i}`, g: 1, tone: bTone }))];
  if (part > 0.04) cells.push({ k: "bp", g: part, tone: bTone });
  const fmt = (n: number) => (Math.round(n * 10) / 10).toString();
  return (
    <div className="p-split-w">
      <div className="p-ratio" role="img" aria-label={label}>
        {cells.map((c) => (
          <span key={c.k} className="p-ratio-c" style={{ flexGrow: c.g, background: c.tone }} />
        ))}
      </div>
      <div className="p-viz-cap">
        <span className="p-vkey">
          <span className="p-vsw" style={{ background: aTone }} /> {aName} <span className="p-vkey-v">1 part</span>
        </span>
        <span className="p-vkey">
          <span className="p-vsw" style={{ background: bTone }} /> {bName} <span className="p-vkey-v">{fmt(b)} parts</span>
        </span>
      </div>
    </div>
  );
}
