// Small charts for calculator results (dataviz rules: bars <= 24px thick, square at the baseline, 4px rounded data end,
// value at the tip in the readout face, names and values in text ink; identity never by color alone: every bar is named,
// every split part sits in a legend with its value). Class names use p-vbar / p-split / p-ratio / p-viz (p-bar and p-key
// belong to RoastChart).

/** lo: draw a range, solid up to lo and a lighter band from lo to v */
export type BarRow = { name: string; v: number; text: string; tone?: string; note?: string; lo?: number };

export const TONE = { blue: "#1D5FBF", orange: "#E35A0F", purple: "#7B4FC4", green: "#0A8F6A", ink: "#0E1621", steel: "#9AA4B1" } as const;

/** horizontal bars on one shared axis (zero at the left) */
/** room kept right of the longest bar for its value text (readout face is wide: ~11.5px a character at 15px) */
const reserve = (texts: string[]) => Math.max(64, Math.ceil(Math.max(0, ...texts.map((t) => t.length)) * 11.5) + 12);

export default function Bars({ rows, label, title, max }: { rows: BarRow[]; label: string; title?: string; max?: number }) {
  const top = max ?? Math.max(...rows.map((r) => r.v), 0);
  const room = reserve(rows.map((r) => r.text));
  return (
    <div className="p-vbars">
      {title && <p className="p-vbars-t">{title}</p>}
      <div className="p-vbars-l" role="img" aria-label={`${label}: ${rows.map((r) => `${r.name} ${r.text}`).join(", ")}`}>
        {rows.map((r, ri) => {
          const f = top > 0 ? Math.min(1, Math.max(0, r.v / top)) : 0;
          const tone = r.tone ?? TONE.blue;
          const cut = r.lo !== undefined && r.v > 0 && r.lo < r.v ? (Math.max(0, r.lo) / r.v) * 100 : 100;
          const bg = cut < 100 ? `linear-gradient(90deg, ${tone} ${cut.toFixed(2)}%, color-mix(in srgb, ${tone} 36%, #FFFFFF) ${cut.toFixed(2)}%)` : tone;
          return (
            <div className="p-vbar" key={`${ri}-${r.name}`} title={`${r.name}: ${r.text}${r.note ? ` (${r.note})` : ""}`}>
              <span className="p-vbar-n">{r.name}</span>
              <span className="p-vbar-t">
                <span className="p-vbar-f" style={{ width: `calc((100% - ${room}px) * ${f.toFixed(4)})`, background: bg }} />
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
        {shown.map((p, pi) => {
          const pct = total > 0 ? (p.v / total) * 100 : 0;
          return (
            <span key={`${pi}-${p.name}`} className="p-split-p" style={{ flexGrow: p.v, background: p.tone }} title={`${p.name}: ${p.text} (${Math.round(pct)}%)`}>
              {pct >= 12 && <span className="p-split-l">{Math.round(pct)}%</span>}
            </span>
          );
        })}
      </div>
      <div className="p-viz-cap">
        {parts.map((p, pi) => (
          <span key={`${pi}-${p.name}`} className="p-vkey">
            <span className="p-vsw" style={{ background: p.tone }} /> {p.name} <span className="p-vkey-v">{p.text}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** a ratio drawn as equal blocks: 1 part of A, then B parts of the other; a range B to bHi adds lighter blocks */
export function Ratio({
  b,
  bHi,
  aName,
  bName,
  aTone,
  bTone,
  label,
  title,
}: {
  b: number;
  bHi?: number;
  aName: string;
  bName: string;
  aTone: string;
  bTone: string;
  label: string;
  title?: string;
}) {
  const hi = bHi !== undefined && bHi > b ? bHi : b;
  const light = `color-mix(in srgb, ${bTone} 36%, #FFFFFF)`;
  const cells: { k: string; g: number; tone: string }[] = [{ k: "a", g: 1, tone: aTone }];
  for (let i = 0; i < Math.ceil(hi - 1e-9); i++) {
    const start = i;
    const end = Math.min(i + 1, hi);
    const solid = Math.max(0, Math.min(end, b) - start);
    const pale = end - start - solid;
    if (solid > 0.02) cells.push({ k: `b${i}`, g: solid, tone: bTone });
    if (pale > 0.02) cells.push({ k: `p${i}`, g: pale, tone: light });
  }
  const fmt = (n: number) => (Math.round(n * 10) / 10).toString();
  return (
    <div className="p-split-w">
      {title && <p className="p-vbars-t">{title}</p>}
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
          <span className="p-vsw" style={{ background: bTone }} /> {bName}{" "}
          <span className="p-vkey-v">{hi > b ? `${fmt(b)} to ${fmt(hi)} parts` : `${fmt(b)} parts`}</span>
        </span>
        {hi > b && (
          <span className="p-vkey">
            <span className="p-vsw" style={{ background: light }} /> The range
          </span>
        )}
      </div>
    </div>
  );
}

/** rows that each add up parts (e.g. flour from the bowl + flour inside the starter), on one shared axis, keyed by a legend */
export function StackBars({
  rows,
  keys,
  label,
  title,
}: {
  rows: { name: string; parts: number[]; text: string }[];
  keys: { name: string; tone: string }[];
  label: string;
  title?: string;
}) {
  const top = Math.max(...rows.map((r) => r.parts.reduce((a, b) => a + Math.max(0, b), 0)), 0);
  const room = reserve(rows.map((r) => r.text));
  return (
    <div className="p-vbars">
      {title && <p className="p-vbars-t">{title}</p>}
      <div className="p-vbars-l" role="img" aria-label={`${label}: ${rows.map((r) => `${r.name} ${r.text}`).join(", ")}`}>
        {rows.map((r, ri) => {
          const sum = r.parts.reduce((a, b) => a + Math.max(0, b), 0);
          const f = top > 0 ? sum / top : 0;
          return (
            <div className="p-vbar" key={`${ri}-${r.name}`} title={`${r.name}: ${r.text}`}>
              <span className="p-vbar-n">{r.name}</span>
              <span className="p-vbar-t">
                <span className="p-vbar-s" style={{ width: `calc((100% - ${room}px) * ${f.toFixed(4)})` }}>
                  {r.parts.map((v, i) =>
                    v > 0 ? <span key={i} className="p-vbar-sp" style={{ flexGrow: v, background: keys[i]?.tone ?? TONE.blue }} /> : null,
                  )}
                </span>
                <span className="p-vbar-v">{r.text}</span>
              </span>
            </div>
          );
        })}
      </div>
      <div className="p-viz-cap">
        {keys.map((k) => (
          <span key={k.name} className="p-vkey">
            <span className="p-vsw" style={{ background: k.tone }} /> {k.name}
          </span>
        ))}
      </div>
    </div>
  );
}

/** pizza dough balls, one circle each with its weight (up to 24 drawn) */
export function Balls({ n, text }: { n: number; text: string }) {
  const shown = Math.min(n, 24);
  return (
    <div className="p-balls-w">
      <div className="p-balls" role="img" aria-label={`${n} dough balls of ${text} each`}>
        {Array.from({ length: shown }, (_, i) => (
          <span key={i} className="p-ball" style={{ animationDelay: `${Math.min(i, 12) * 0.05}s` }}>
            {text}
          </span>
        ))}
        {n > shown && <span className="p-ball-more">+{n - shown} more</span>}
      </div>
    </div>
  );
}
