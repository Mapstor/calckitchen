import { STICK } from "@/data/butter";

// Butter sticks with their 8 tablespoon marks: the butter you need is filled hot orange, the cut is an orange line.
// Same rounding as cutText() in src/data/butter.ts, so the drawing and the "Cut at …" readout always agree.

const ORANGE = "#E35A0F";
const TINT = "#F6C9B0";
const INK = "#0E1621";

const d1 = (n: number) => (Math.round(n * 10) / 10).toString();

function layout(sticks: number) {
  let whole = Math.floor(sticks + 1e-9);
  let marks = Math.round((sticks - whole) * STICK.tbsp * 10) / 10;
  if (marks >= STICK.tbsp) {
    whole += 1;
    marks = 0;
  }
  return { whole, marks, n: whole + (marks > 0 ? 1 : 0) };
}

function Row({ sticks, vw, cols, w, cls }: { sticks: number; vw: number; cols: number; w: number; cls: string }) {
  const { whole, marks, n } = layout(sticks);
  const h = 54;
  const gap = Math.min(28, (vw - cols * w) / Math.max(1, cols - 1));
  const rowH = h + 52;
  const rows = Math.ceil(n / cols);
  const vh = rows * rowH + 6;
  const tick = w / STICK.tbsp;
  return (
    <svg
      className={cls}
      viewBox={`0 0 ${vw} ${vh}`}
      role="img"
      aria-label={`${whole} whole ${whole === 1 ? "stick" : "sticks"}${marks > 0 ? ` and ${d1(marks)} of the 8 tablespoon marks on one more stick` : ""}.`}
    >
      {Array.from({ length: n }, (_, i) => {
        const r = Math.floor(i / cols);
        const inRow = Math.min(cols, n - r * cols);
        const x0 = (vw - (inRow * w + (inRow - 1) * gap)) / 2;
        const x = x0 + (i % cols) * (w + gap);
        const y = r * rowH + 40;
        const part = i === whole ? marks / STICK.tbsp : 1;
        const cutX = x + part * w;
        const anchor = part < 0.25 ? "start" : part > 0.75 ? "end" : "middle";
        return (
          <g key={i}>
            <rect x={x} y={y} width={w} height={h} rx={5} fill="#FFFFFF" />
            <rect x={x} y={y} width={part * w} height={h} rx={5} fill={TINT} className="p-stick-f" />
            <rect x={x} y={y} width={w} height={h} rx={5} fill="none" stroke={INK} strokeWidth={2} />
            <g stroke={INK} strokeWidth={1.5}>
              {Array.from({ length: STICK.tbsp - 1 }, (_, k) => (
                <g key={k}>
                  <line x1={x + (k + 1) * tick} y1={y} x2={x + (k + 1) * tick} y2={y + 13} />
                  <line x1={x + (k + 1) * tick} y1={y + h - 13} x2={x + (k + 1) * tick} y2={y + h} />
                </g>
              ))}
            </g>
            {part < 1 && (
              <>
                <line x1={cutX} y1={y - 9} x2={cutX} y2={y + h + 9} stroke={ORANGE} strokeWidth={4} strokeLinecap="round" />
                <text className="p-stick-cut" x={anchor === "start" ? x : anchor === "end" ? x + w : cutX} y={y - 16} textAnchor={anchor}>
                  {`Cut at ${d1(marks)} tbsp`}
                </text>
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/** the sticks a recipe takes, with the cut on the last one; nothing drawn past 12 sticks */
export default function Sticks({ sticks }: { sticks: number }) {
  const { n } = layout(sticks);
  if (n < 1 || n > 12) return null;
  return (
    <figure className="p-viz">
      <Row sticks={sticks} vw={1000} cols={4} w={n <= 2 ? 330 : n === 3 ? 290 : 214} cls="p-viz-wide" />
      <Row sticks={sticks} vw={420} cols={n === 1 ? 1 : 2} w={n === 1 ? 330 : 186} cls="p-viz-tall" />
      <figcaption className="p-viz-cap">
        <span className="p-vkey">
          <span className="p-vsw" style={{ background: TINT, boxShadow: `inset 0 0 0 2px ${ORANGE}` }} /> Butter you need
        </span>
        <span className="p-vkey">
          <span className="p-vsw p-vsw-tick" /> One tablespoon mark (8 to a stick)
        </span>
      </figcaption>
    </figure>
  );
}
