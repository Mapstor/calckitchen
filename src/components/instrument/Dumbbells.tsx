import { G } from "@/components/instrument/Bars";

// Rows of marks on one shared axis: a dot for a single value, a rounded bar for a range, a thin line joining the marks
// of a row. For "from → to" charts (oven → air fryer, recipe → convection, conventional → fan °C) and for ranges by
// row (minutes per pound, servings by pan). HTML, so it reflows on phones; every row carries its own text value.

export type Mark = { lo: number; hi?: number; tone: string };
export type DbRow = { name: string; marks: Mark[]; text: string };

const pct = (v: number, a: number, b: number) => ((v - a) / (b - a || 1)) * 100;

export default function Dumbbells({
  rows,
  keys,
  title,
  label,
  min,
  max,
  step,
  unit = "",
}: {
  rows: DbRow[];
  keys: { name: string; tone: string }[];
  title?: string;
  label: string;
  min?: number;
  max?: number;
  step: number;
  unit?: string;
}) {
  const vals = rows.flatMap((r) => r.marks.flatMap((m) => [m.lo, m.hi ?? m.lo]));
  const a = min ?? Math.floor(Math.min(...vals) / step) * step;
  const b = max ?? Math.ceil(Math.max(...vals) / step) * step;
  const ticks: number[] = [];
  for (let t = a; t <= b + 1e-9; t += step) ticks.push(Math.round(t * 1000) / 1000);
  return (
    <div className="p-db">
      {title && <p className="p-vbars-t">{title}</p>}
      <div className="p-db-l" role="img" aria-label={`${label}: ${rows.map((r) => `${r.name}, ${r.text}`).join("; ")}`}>
        {rows.map((r, ri) => {
          const ends = r.marks.flatMap((m) => [m.lo, m.hi ?? m.lo]);
          const l = pct(Math.min(...ends), a, b);
          const w = pct(Math.max(...ends), a, b) - l;
          return (
            <div className="p-db-r" key={`${ri}-${r.name}`} title={`${r.name}: ${r.text}`}>
              <span className="p-db-n">{r.name}</span>
              <span className="p-db-t">
                {ticks.map((t) => (
                  <span key={t} className="p-db-g" style={{ left: `${pct(t, a, b)}%` }} />
                ))}
                {w > 0 && <span className="p-db-c" style={{ left: `${l}%`, width: `${w}%` }} />}
                {r.marks.map((m, mi) => {
                  const x1 = pct(m.lo, a, b);
                  const x2 = pct(m.hi ?? m.lo, a, b);
                  return x2 - x1 > 0.01 ? (
                    <span key={mi} className="p-db-b" style={{ left: `calc(${x1}% - 7px)`, width: `calc(${x2 - x1}% + 14px)`, background: m.tone }} />
                  ) : (
                    <span key={mi} className="p-db-d" style={{ left: `${x1}%`, background: m.tone }} />
                  );
                })}
              </span>
              <span className="p-db-v">
                <G t={r.text} />
              </span>
            </div>
          );
        })}
        <div className="p-db-r p-db-ax" aria-hidden="true">
          <span className="p-db-n" />
          <span className="p-db-t p-db-tk">
            {ticks.map((t, i) => (
              <span key={t} className={i === 0 ? "p-db-k p-db-k0" : i === ticks.length - 1 ? "p-db-k p-db-k1" : "p-db-k"} style={{ left: `${pct(t, a, b)}%` }}>
                {Number.isInteger(t) ? t : t.toFixed(1)}
              </span>
            ))}
          </span>
          <span className="p-db-v p-db-u">
            <G t={unit} />
          </span>
        </div>
      </div>
      <div className="p-viz-cap">
        {keys.map((k) => (
          <span key={k.name} className="p-vkey">
            <span className="p-vsw" style={{ background: k.tone, borderRadius: "50%" }} /> {k.name}
          </span>
        ))}
      </div>
    </div>
  );
}
