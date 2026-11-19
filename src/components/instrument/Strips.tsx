// Measures drawn as marked strips: a butter stick with its 8 tablespoon marks, a cup as 16 tablespoons of 3 teaspoons.
// Each row fills the strips to its amount, so ¼, ⅓, ½ and ¾ read off the marks. HTML, so it reflows on phones.

export type StripRow = { name: string; amount: number; text: string };

export default function Strips({
  rows,
  cells,
  per = 1,
  minor = 0,
  title,
  label,
  stripName,
  fill = "#F6C9B0",
  edge = "#E35A0F",
}: {
  rows: StripRow[];
  /** major marks per strip (8 for a stick, 16 for a cup) */
  cells: number;
  /** strips side by side in a row (2 sticks) */
  per?: number;
  /** minor marks in each cell (3 teaspoons to a tablespoon) */
  minor?: number;
  title?: string;
  label: string;
  stripName: string;
  fill?: string;
  edge?: string;
}) {
  const major = Array.from({ length: cells - 1 }, (_, i) => ((i + 1) / cells) * 100);
  const small: number[] = [];
  if (minor > 1) for (let c = 0; c < cells; c++) for (let m = 1; m < minor; m++) small.push(((c + m / minor) / cells) * 100);
  return (
    <div className="p-st">
      {title && <p className="p-vbars-t">{title}</p>}
      <div className="p-st-l" role="img" aria-label={`${label}: ${rows.map((r) => `${r.name}, ${r.text}`).join("; ")}`}>
        {rows.map((r, ri) => (
          <div className="p-st-r" key={`${ri}-${r.name}`} title={`${r.name}: ${r.text}`}>
            <span className="p-st-n">{r.name}</span>
            <span className="p-st-t">
              {Array.from({ length: per }, (_, s) => {
                const f = Math.min(cells, Math.max(0, r.amount - s * cells)) / cells;
                return (
                  <span className="p-st-s" key={s}>
                    <span className="p-st-f" style={{ width: `${f * 100}%`, background: fill, boxShadow: f > 0 && f < 1 ? `inset -3px 0 0 ${edge}` : undefined }} />
                    {small.map((x) => (
                      <span key={`m${x}`} className="p-st-m" style={{ left: `${x}%` }} />
                    ))}
                    {major.map((x) => (
                      <span key={`k${x}`} className="p-st-k" style={{ left: `${x}%` }} />
                    ))}
                  </span>
                );
              })}
            </span>
            <span className="p-st-v">{r.text}</span>
          </div>
        ))}
      </div>
      <div className="p-viz-cap">
        <span className="p-vkey">
          <span className="p-vsw" style={{ background: fill, boxShadow: `inset 0 0 0 2px ${edge}` }} /> Filled: the amount
        </span>
        <span className="p-vkey">
          <span className="p-vsw p-vsw-tick" /> {stripName}
        </span>
      </div>
    </div>
  );
}
