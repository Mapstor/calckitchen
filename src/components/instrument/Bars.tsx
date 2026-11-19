// Horizontal bars for comparing a few amounts (dataviz marks: <= 24px thick, square at the baseline, 4px rounded data end,
// value at the tip in the readout face, names in text ink; identity never by color alone: every bar is named).
export type BarRow = { name: string; v: number; text: string; tone?: string; note?: string };

export const TONE = { blue: "#1D5FBF", orange: "#E35A0F", purple: "#7B4FC4", green: "#0A8F6A", ink: "#0E1621" } as const;

export default function Bars({ rows, label, max }: { rows: BarRow[]; label: string; max?: number }) {
  const top = max ?? Math.max(...rows.map((r) => r.v), 0);
  return (
    <div className="p-bars" role="img" aria-label={`${label}: ${rows.map((r) => `${r.name} ${r.text}`).join(", ")}`}>
      {rows.map((r) => (
        <div className="p-bar" key={r.name} title={`${r.name}: ${r.text}${r.note ? ` (${r.note})` : ""}`}>
          <span className="p-bar-n">{r.name}</span>
          <span className="p-bar-t">
            <span className="p-bar-f" style={{ width: `${top > 0 ? Math.max(0, (r.v / top) * 100) : 0}%`, background: r.tone ?? TONE.blue }} />
            <span className="p-bar-v">{r.text}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

/** one whole split into parts, labelled by a legend (dataviz "tall segmented bar": 28px, 4px corners, 2px gaps) */
export function Split({ parts, label }: { parts: { name: string; v: number; text: string; tone: string }[]; label: string }) {
  const total = parts.reduce((a, p) => a + Math.max(0, p.v), 0);
  const shown = parts.filter((p) => p.v > 0);
  return (
    <div className="p-split-w">
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
      <div className="p-fig-cap">
        {parts.map((p) => (
          <span key={p.name} className="p-key">
            <span className="p-sw" style={{ background: p.tone }} /> {p.name} <span className="p-key-v">{p.text}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
