import type { ReactNode } from "react";

// Result drawings that sit on a measured scale: the oven ruler (°F, gas mark, °C on one line), the meat thermometer
// (USDA safe minimums), and roast time against weight. Every number drawn comes from the props, which come from src/data.

const INK = "#0E1621";
const LINE = "#D5DAE1";
const ORANGE = "#E35A0F";
const TINT = "#F6C9B0";

const r0 = (n: number) => Math.round(n).toString();

/** SVG text with °F/°C/% in the text face (see G in Bars.tsx) */
function TG({ t }: { t: string }) {
  return (
    <>
      {t.split(/(°[FC]?|%)/).map((p, i) =>
        /^(°[FC]?|%)$/.test(p) ? (
          <tspan key={i} className="p-ui">
            {p}
          </tspan>
        ) : (
          p
        ),
      )}
    </>
  );
}

function Frame({ vw, vh, cls, label, children }: { vw: number; vh: number; cls: string; label: string; children: ReactNode }) {
  return (
    <svg className={cls} viewBox={`0 0 ${vw} ${vh}`} role="img" aria-label={label}>
      {children}
    </svg>
  );
}

/* ---------- oven ruler ---------- */

export type GasMark = { gm: string; f: number; c: number };

function Ruler({ vw, cls, valueF, marks, label }: { vw: number; cls: string; valueF: number | null; marks: GasMark[]; label: string }) {
  const lo = 200;
  const hi = 500;
  const x0 = vw > 600 ? 70 : 34;
  const x1 = vw - (vw > 600 ? 30 : 16);
  const x = (f: number) => x0 + ((f - lo) / (hi - lo)) * (x1 - x0);
  const fTicks = Array.from({ length: (hi - lo) / 25 + 1 }, (_, i) => lo + 25 * i);
  const cTicks = Array.from({ length: 17 }, (_, i) => 100 + 10 * i).filter((c) => c * 1.8 + 32 <= hi);
  const yF = 52;
  const yG = 100;
  const yC = 148;
  const on = valueF !== null && valueF >= lo && valueF <= hi;
  const near = valueF === null ? null : marks.reduce((a, m) => (Math.abs(m.f - valueF) < Math.abs(a.f - valueF) ? m : a), marks[0]);
  const hit = near && valueF !== null && Math.abs(near.f - valueF) <= 12.5 ? near.gm : null;
  const r = vw > 600 ? 16 : 13;
  return (
    <Frame vw={vw} vh={190} cls={cls} label={label}>
      <text className="p-sc-unit" x={4} y={yF - 4}>
        °F
      </text>
      <text className="p-sc-unit" x={4} y={yG + 5}>
        Gas
      </text>
      <text className="p-sc-unit" x={4} y={yC + 14}>
        °C
      </text>
      <line x1={x0} y1={yF} x2={x1} y2={yF} stroke={INK} strokeWidth={2} />
      {fTicks.map((f) => (
        <g key={f}>
          <line x1={x(f)} y1={yF} x2={x(f)} y2={yF - (f % 50 === 0 ? 12 : 6)} stroke={INK} strokeWidth={f % 50 === 0 ? 2 : 1.5} />
          {f % 50 === 0 && (
            <text className="p-sc-n" x={x(f)} y={yF - 18} textAnchor="middle">
              {f}
            </text>
          )}
        </g>
      ))}
      {on && valueF !== null && (
        <g className="p-sc-needle" key={Math.round(valueF)}>
          <line x1={x(valueF)} y1={yF - 2} x2={x(valueF)} y2={yC + 2} stroke={ORANGE} strokeWidth={4} strokeLinecap="round" />
          <path d={`M ${x(valueF) - 8} ${yF - 14} L ${x(valueF) + 8} ${yF - 14} L ${x(valueF)} ${yF - 3} Z`} fill={ORANGE} />
        </g>
      )}
      {marks.map((m) => (
        <g key={m.gm}>
          <circle cx={x(m.f)} cy={yG} r={r} fill={hit === m.gm ? ORANGE : "#FFFFFF"} stroke={hit === m.gm ? ORANGE : INK} strokeWidth={2} />
          <text className={hit === m.gm ? "p-sc-g p-sc-g-on" : "p-sc-g"} x={x(m.f)} y={yG + 5} textAnchor="middle">
            {m.gm}
          </text>
        </g>
      ))}
      <line x1={x0} y1={yC} x2={x1} y2={yC} stroke={INK} strokeWidth={2} />
      {cTicks.map((c) => {
        const xc = x(c * 1.8 + 32);
        return (
          <g key={c}>
            <line x1={xc} y1={yC} x2={xc} y2={yC + (c % 20 === 0 ? 12 : 6)} stroke={INK} strokeWidth={c % 20 === 0 ? 2 : 1.5} />
            {c % 20 === 0 && (
              <text className="p-sc-n" x={xc} y={yC + 32} textAnchor="middle">
                {c}
              </text>
            )}
          </g>
        );
      })}
    </Frame>
  );
}

/** °F on top, gas marks from the chart, °C below, all on one line; the orange needle is your temperature */
export function OvenRuler({ valueF, marks }: { valueF: number | null; marks: GasMark[] }) {
  const on = valueF !== null && valueF >= 200 && valueF <= 500;
  const label = `Oven scale from 200 to 500°F with gas marks ${marks.map((m) => `${m.gm} at ${m.f}°F`).join(", ")} and Celsius below${
    on && valueF !== null ? `; your temperature, ${r0(valueF)}°F, is marked` : ""
  }.`;
  return (
    <figure className="p-viz">
      <Ruler vw={1000} cls="p-viz-wide" valueF={valueF} marks={marks} label={label} />
      <Ruler vw={420} cls="p-viz-tall" valueF={valueF} marks={marks} label={label} />
      <figcaption className="p-viz-cap">
        <span className="p-vkey">
          <span className="p-vsw p-vsw-line" /> Your temperature
        </span>
        <span>{on ? "Gas marks sit at the °F the chart gives for them." : "Your temperature is off this 200 to 500°F scale."}</span>
      </figcaption>
    </figure>
  );
}

/* ---------- meat thermometer ---------- */

export type Stop = { f: number; items: string[] };

/** items joined with " · ", wrapped by words to lines of at most max characters */
function wrap(items: string[], max: number): string[] {
  const words = items.join(" · ").split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length > max && cur) {
      lines.push(cur);
      cur = w === "·" ? "" : w;
    } else cur = next;
  }
  if (cur) lines.push(cur);
  return lines.map((l) => l.replace(/ ·$/, ""));
}

function Tube({ vw, cls, stops, hiF, label }: { vw: number; cls: string; stops: Stop[]; hiF: number | null; label: string }) {
  const lo = 140;
  const hi = 170;
  const top = 44;
  const bottom = 316;
  const y = (f: number) => bottom - ((f - lo) / (hi - lo)) * (bottom - top);
  const wide = vw > 600;
  const tx = wide ? 120 : 62;
  const lx = tx + (wide ? 96 : 60);
  const ix = lx + (wide ? 104 : 86);
  const max = wide ? 70 : 23;
  const lh = wide ? 21 : 22;
  const ticks = Array.from({ length: (hi - lo) / 5 + 1 }, (_, i) => lo + 5 * i);
  const fillTo = hiF !== null ? Math.min(hi, Math.max(lo, hiF)) : null;
  // label blocks: centred on their tick, then pushed apart top to bottom so they never overlap
  const blocks = [...stops]
    .sort((p, q) => q.f - p.f)
    .map((st) => {
      const lines = wrap(st.items, max);
      return { st, lines, h: lines.length * lh, c: y(st.f) };
    });
  for (let i = 1; i < blocks.length; i++) {
    const prev = blocks[i - 1];
    const need = prev.c + prev.h / 2 + 10 + blocks[i].h / 2;
    if (blocks[i].c < need) blocks[i].c = need;
  }
  return (
    <Frame vw={vw} vh={380} cls={cls} label={label}>
      <text className="p-sc-unit" x={tx - 30} y={top - 20} textAnchor="end">
        °F
      </text>
      <rect x={tx - 12} y={top - 14} width={24} height={bottom - top + 30} rx={12} fill="#FFFFFF" stroke={INK} strokeWidth={2} />
      <circle cx={tx} cy={bottom + 30} r={26} fill={fillTo !== null ? ORANGE : "#FFFFFF"} stroke={INK} strokeWidth={2} />
      {fillTo !== null && (
        <rect className="p-th-fill" x={tx - 6} y={y(fillTo)} width={12} height={bottom + 14 - y(fillTo)} fill={ORANGE} key={fillTo} />
      )}
      {ticks.map((f) => (
        <g key={f}>
          <line x1={tx - 12} y1={y(f)} x2={tx - 24} y2={y(f)} stroke={INK} strokeWidth={1.5} />
          <text className="p-sc-n" x={tx - 30} y={y(f) + 5} textAnchor="end">
            {f}
          </text>
        </g>
      ))}
      {blocks.map(({ st, lines, h, c }) => {
        const on = st.f === hiF;
        const ty = y(st.f);
        const y0 = c - h / 2 + lh * 0.72;
        return (
          <g key={st.f}>
            <path d={`M ${tx + 14} ${ty} L ${lx - 30} ${ty} L ${lx - 10} ${c}`} fill="none" stroke={on ? ORANGE : INK} strokeWidth={on ? 3 : 1.5} />
            <text className={on ? "p-th-f p-th-on" : "p-th-f"} x={lx} y={c + 7}>
              <TG t={`${st.f}°F`} />
            </text>
            {lines.map((l, i) => (
              <text key={i} className={on ? "p-th-t p-th-on" : "p-th-t"} x={ix} y={y0 + i * lh}>
                {l}
              </text>
            ))}
          </g>
        );
      })}
    </Frame>
  );
}

/** a thermometer with the USDA minimums; the one for your choice is filled and orange */
export function MeatThermometer({ stops, hiF, choice }: { stops: Stop[]; hiF: number | null; choice: string }) {
  const label = `Thermometer from 140 to 170°F. ${stops.map((s) => `${s.f}°F: ${s.items.join(", ")}`).join(". ")}.${
    hiF !== null ? ` ${choice}: ${hiF}°F.` : ` ${choice}: no temperature on the USDA chart.`
  }`;
  return (
    <figure className="p-viz">
      <Tube vw={1000} cls="p-viz-wide" stops={stops} hiF={hiF} label={label} />
      <Tube vw={420} cls="p-viz-tall" stops={stops} hiF={hiF} label={label} />
      <figcaption className="p-viz-cap">
        <span>{hiF !== null ? `Filled to ${hiF}°F for ${choice.toLowerCase()}. USDA safe minimum internal temperatures.` : `${choice}: the USDA test is by eye, not by thermometer.`}</span>
      </figcaption>
    </figure>
  );
}

/* ---------- roast time against weight ---------- */

function Plot({
  vw,
  cls,
  lbLo,
  lbHi,
  perLo,
  perHi,
  addLo,
  addHi,
  lb,
  label,
}: {
  vw: number;
  cls: string;
  lbLo: number;
  lbHi: number;
  perLo: number;
  perHi: number;
  addLo: number;
  addHi: number;
  lb: number | null;
  label: string;
}) {
  const wide = vw > 600;
  const px0 = wide ? 84 : 58;
  const px1 = vw - (wide ? 30 : 14);
  const py0 = 20;
  const py1 = 250;
  const tLo = (w: number) => w * perLo + addLo;
  const tHi = (w: number) => w * perHi + addHi;
  const yMax = Math.ceil(tHi(lbHi) / 60) * 60;
  const x = (w: number) => px0 + ((w - lbLo) / (lbHi - lbLo || 1)) * (px1 - px0);
  const y = (m: number) => py1 - (m / yMax) * (py1 - py0);
  const stepLb = lbHi - lbLo > 8 ? 2 : lbHi - lbLo > 3 ? 1 : 0.5;
  const xt: number[] = [];
  for (let w = Math.ceil(lbLo / stepLb) * stepLb; w <= lbHi + 1e-9; w += stepLb) xt.push(Math.round(w * 10) / 10);
  const stepM = yMax > 360 ? 120 : 60;
  const yt = Array.from({ length: Math.floor(yMax / stepM) + 1 }, (_, i) => i * stepM);
  const band = `M ${x(lbLo)} ${y(tLo(lbLo))} L ${x(lbHi)} ${y(tLo(lbHi))} L ${x(lbHi)} ${y(tHi(lbHi))} L ${x(lbLo)} ${y(tHi(lbLo))} Z`;
  return (
    <Frame vw={vw} vh={300} cls={cls} label={label}>
      {yt.map((m) => (
        <g key={m}>
          <line x1={px0} y1={y(m)} x2={px1} y2={y(m)} stroke={LINE} strokeWidth={1} />
          <text className="p-sc-n" x={px0 - 10} y={y(m) + 5} textAnchor="end">
            {m === 0 ? "0" : `${m / 60} h`}
          </text>
        </g>
      ))}
      <path d={band} fill={TINT} />
      <line x1={x(lbLo)} y1={y(tLo(lbLo))} x2={x(lbHi)} y2={y(tLo(lbHi))} stroke={ORANGE} strokeWidth={2} />
      <line x1={x(lbLo)} y1={y(tHi(lbLo))} x2={x(lbHi)} y2={y(tHi(lbHi))} stroke={ORANGE} strokeWidth={2} />
      <line x1={px0} y1={py1} x2={px1} y2={py1} stroke={INK} strokeWidth={2} />
      {xt.map((w) => (
        <g key={w}>
          <line x1={x(w)} y1={py1} x2={x(w)} y2={py1 + 7} stroke={INK} strokeWidth={1.5} />
          <text className="p-sc-n" x={x(w)} y={py1 + 26} textAnchor="middle">
            {w}
          </text>
        </g>
      ))}
      <text className="p-sc-unit" x={px1} y={py1 + 46} textAnchor="end">
        pounds
      </text>
      {lb !== null && lb >= lbLo && lb <= lbHi && (
        <g>
          <line x1={x(lb)} y1={py1} x2={x(lb)} y2={y(tHi(lb)) - 8} stroke={INK} strokeWidth={1.5} strokeDasharray="4 4" />
          <line x1={x(lb)} y1={y(tLo(lb))} x2={x(lb)} y2={y(tHi(lb))} stroke={INK} strokeWidth={6} strokeLinecap="round" />
          <circle cx={x(lb)} cy={y(tLo(lb))} r={5} fill="#FFFFFF" stroke={INK} strokeWidth={2} />
          <circle cx={x(lb)} cy={y(tHi(lb))} r={5} fill="#FFFFFF" stroke={INK} strokeWidth={2} />
        </g>
      )}
    </Frame>
  );
}

/** the chart's minutes per pound drawn across its weight range, with your roast marked */
export function RoastRate({
  lbLo,
  lbHi,
  perLo,
  perHi,
  addLo = 0,
  addHi = 0,
  lb,
  text,
}: {
  lbLo: number;
  lbHi: number;
  perLo: number;
  perHi: number;
  addLo?: number;
  addHi?: number;
  lb: number | null;
  text: string;
}) {
  const label = `Roasting time from ${lbLo} to ${lbHi} pounds at ${perLo} to ${perHi} minutes per pound${lb !== null ? `; your roast: ${text}` : ""}.`;
  const p = { lbLo, lbHi, perLo, perHi, addLo, addHi, lb, label };
  return (
    <figure className="p-viz">
      <Plot vw={1000} cls="p-viz-wide" {...p} />
      <Plot vw={420} cls="p-viz-tall" {...p} />
      <figcaption className="p-viz-cap">
        <span className="p-vkey">
          <span className="p-vsw" style={{ background: TINT, boxShadow: `inset 0 0 0 2px ${ORANGE}` }} /> Time range across the chart&apos;s weights
        </span>
        <span className="p-vkey">
          <span className="p-vsw" style={{ background: INK, width: 6 }} /> Your roast: {text}
        </span>
      </figcaption>
    </figure>
  );
}

/* ---------- temperatures compared on one scale (dots and ranges, no zero baseline: °F and °C have no true zero) ---------- */

export type TempRow = { name: string; lo: number; hi: number; tone: string };

function Temps({ vw, cls, rows, unit, label }: { vw: number; cls: string; rows: TempRow[]; unit: "F" | "C"; label: string }) {
  const wide = vw > 600;
  const toU = (f: number) => (unit === "F" ? f : (f - 32) / 1.8);
  const step = unit === "F" ? 25 : 10;
  const all = rows.flatMap((r) => [toU(r.lo), toU(r.hi)]);
  const a = Math.floor((Math.min(...all) - step / 2) / step) * step;
  const b = Math.ceil((Math.max(...all) + step / 2) / step) * step;
  const px0 = wide ? 250 : 22;
  const px1 = wide ? vw - 150 : vw - 22;
  const x = (u: number) => px0 + ((u - a) / (b - a || 1)) * (px1 - px0);
  const rowH = wide ? 46 : 66;
  const rowY = (i: number) => (wide ? 34 : 50) + i * rowH;
  const axisY = rowY(rows.length - 1) + (wide ? 34 : 30);
  const ticks: number[] = [];
  for (let u = a; u <= b + 1e-9; u += step) ticks.push(u);
  const txt = (r: TempRow) => (Math.round(r.lo) === Math.round(r.hi) ? `${r0(toU(r.lo))}°${unit}` : `${r0(toU(r.lo))}–${r0(toU(r.hi))}°${unit}`);
  return (
    <Frame vw={vw} vh={axisY + 40} cls={cls} label={label}>
      {ticks.map((u) => (
        <g key={u}>
          <line x1={x(u)} y1={rowY(0) - (wide ? 18 : 26)} x2={x(u)} y2={axisY} stroke={LINE} strokeWidth={1} />
          <line x1={x(u)} y1={axisY} x2={x(u)} y2={axisY + 7} stroke={INK} strokeWidth={1.5} />
          <text className="p-sc-n" x={x(u)} y={axisY + 26} textAnchor="middle">
            {r0(u)}
          </text>
        </g>
      ))}
      <line x1={px0} y1={axisY} x2={px1} y2={axisY} stroke={INK} strokeWidth={2} />
      {rows.map((r, i) => {
        const y = rowY(i);
        const x1 = x(toU(r.lo));
        const x2 = x(toU(r.hi));
        return (
          <g key={`${i}-${r.name}`}>
            {wide ? (
              <text className="p-tr-n" x={0} y={y + 6}>
                {r.name}
              </text>
            ) : (
              <text className="p-tr-n" x={px0} y={y - 18}>
                {`${r.name} · ${txt(r)}`}
              </text>
            )}
            {x2 - x1 > 2 ? (
              <rect x={x1 - 9} y={y - 9} width={x2 - x1 + 18} height={18} rx={9} fill={r.tone} />
            ) : (
              <circle cx={x1} cy={y} r={10} fill={r.tone} />
            )}
            {wide && (
              <text className="p-tr-v" x={x2 + 22} y={y + 6}>
                <TG t={txt(r)} />
              </text>
            )}
          </g>
        );
      })}
      <text className="p-sc-unit" x={wide ? px1 + 22 : px1} y={axisY + 26} textAnchor={wide ? "start" : "end"}>
        {wide ? `°${unit}` : ""}
      </text>
    </Frame>
  );
}

/** two or three temperatures (or ranges) on one shared scale */
export function TempCompare({ rows, unit, title }: { rows: TempRow[]; unit: "F" | "C"; title: string }) {
  const toU = (f: number) => (unit === "F" ? f : (f - 32) / 1.8);
  const label = `${title}: ${rows.map((r) => `${r.name} ${r0(toU(r.lo))}${r.hi !== r.lo ? ` to ${r0(toU(r.hi))}` : ""}°${unit}`).join(", ")}.`;
  return (
    <figure className="p-viz p-viz-sm">
      <p className="p-vbars-t">{title}</p>
      <Temps vw={1000} cls="p-viz-wide" rows={rows} unit={unit} label={label} />
      <Temps vw={420} cls="p-viz-tall" rows={rows} unit={unit} label={label} />
    </figure>
  );
}
