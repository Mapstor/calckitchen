import { formatHours, roastStuffed, roastUnstuffed } from "@/data/turkey-data";

// USDA 325°F roasting times as bars on a 2-to-7-hour axis (whole birds, 8 to 24 lb; the breast row stays in the table).
const AXIS_START = 2;
const AXIS_SPAN = 5;
const pct = (hours: number) => `${(((hours - AXIS_START) / AXIS_SPAN) * 100).toFixed(1)}%`;
const label = (lo: number, hi: number) => `${formatHours(lo)}–${formatHours(hi)} h`;

export default function RoastChart({ highlightLb = 16 }: { highlightLb?: number }) {
  const rows = roastUnstuffed
    .filter((r) => !r.breast)
    .map((u) => ({ u, s: roastStuffed.find((x) => x.minLb === u.minLb && x.maxLb === u.maxLb) }));
  return (
    <figure className="p-chart">
      <figcaption className="p-cap">
        Roasting time by weight, in hours
        <span className="p-key"><span className="p-key-i p-key-u" />Unstuffed</span>
        <span className="p-key"><span className="p-key-i p-key-s" />Stuffed</span>
      </figcaption>
      {rows.map(({ u, s }) => {
        const you = highlightLb > u.minLb && highlightLb <= u.maxLb;
        return (
          <div className={`p-crow${you ? " p-crow-hi" : ""}`} key={u.minLb}>
            <div className="p-cl">
              {u.minLb} to {u.maxLb} lb
              {you && <span className="p-cl-you">A {highlightLb}-lb bird</span>}
            </div>
            <div className="p-track">
              <span className="p-bar p-bar-u" style={{ left: pct(u.lowHours), width: pct(AXIS_START + u.highHours - u.lowHours) }} />
              <span className="p-val p-val-u" style={{ left: `calc(${pct(u.highHours)} + 6px)` }}>{label(u.lowHours, u.highHours)}</span>
              {s && (
                <>
                  <span className="p-bar p-bar-s" style={{ left: pct(s.lowHours), width: pct(AXIS_START + s.highHours - s.lowHours) }} />
                  <span className="p-val p-val-s" style={{ left: `calc(${pct(s.highHours)} + 6px)` }}>{label(s.lowHours, s.highHours)}</span>
                </>
              )}
            </div>
          </div>
        );
      })}
      <div className="p-axis" aria-hidden="true">
        <div className="p-axis-pad" />
        <div className="p-axis-t">
          {[2, 3, 4, 5, 6, 7].map((h) => (
            <span key={h} style={{ left: pct(h) }}>{h} h</span>
          ))}
        </div>
      </div>
    </figure>
  );
}
