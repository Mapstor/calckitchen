import type { CSSProperties } from "react";

// Round dial with a needle (instant-read thermometer, kitchen timer, kitchen scale).
// The scale sweeps 270°: min at -135°, max at +135°. The needle sweeps in from min on load.
type Props = {
  min: number;
  max: number;
  major: number;
  minor: number;
  value: number;
  /** values drawn as orange ticks */
  marks?: number[];
  /** big readout under the hub, e.g. "145°F" */
  readout?: string;
  /** small unit label above the hub, e.g. "°F" */
  unit?: string;
  label: string;
  /** label for a scale value; defaults to the number */
  fmt?: (v: number) => string;
};

const pt = (a: number, r: number) => {
  const rad = (a * Math.PI) / 180;
  return { x: +(200 + r * Math.sin(rad)).toFixed(1), y: +(200 - r * Math.cos(rad)).toFixed(1) };
};

export default function Dial({ min, max, major, minor, value, marks = [], readout, unit, label, fmt = String }: Props) {
  const ang = (v: number) => -135 + (270 * (Math.min(max, Math.max(min, v)) - min)) / (max - min);
  const k = ang(value);
  const style = { "--k": `${k}deg`, "--k0": `${-135 - k}deg` } as CSSProperties;
  const steps = (s: number) => Array.from({ length: Math.round((max - min) / s) + 1 }, (_, i) => +(min + i * s).toFixed(6));
  const majors = steps(major);
  const minors = steps(minor).filter((v) => !majors.some((m) => Math.abs(m - v) < 1e-9));
  const line = (v: number, r1: number, r2: number) => {
    const a = ang(v);
    const p1 = pt(a, r1);
    const p2 = pt(a, r2);
    return { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y };
  };
  return (
    <svg className="p-knob-svg p-dial" viewBox="0 0 400 400" role="img" aria-label={label} style={style}>
      <circle className="p-dial-rim" cx="200" cy="200" r="190" />
      <circle className="p-dial-face" cx="200" cy="200" r="178" />
      {minors.map((v) => (
        <line key={`m${v}`} className="p-tk-min" {...line(v, 158, 168)} />
      ))}
      {majors.map((v) => (
        <line key={`M${v}`} className="p-tk-maj" {...line(v, 150, 168)} />
      ))}
      {marks.map((v) => (
        <line key={`h${v}`} className="p-tk-hi" {...line(v, 146, 168)} />
      ))}
      {majors.map((v) => (
        <text key={`L${v}`} className="p-sc-t p-dial-n" {...pt(ang(v), 128)}>
          {fmt(v)}
        </text>
      ))}
      {unit && (
        <text className="p-dial-u" x="200" y="146">
          {unit}
        </text>
      )}
      {readout && (
        <>
          <rect className="p-dial-win" x="128" y="262" width="144" height="46" rx="4" />
          <text className="p-dial-v" x="200" y="286">
            {readout}
          </text>
        </>
      )}
      <g className="p-ndl">
        <g className="p-ndl-k">
          <path className="p-needle" d="M 196 228 L 198.5 58 L 201.5 58 L 204 228 Z" />
        </g>
      </g>
      <circle className="p-hub" cx="200" cy="200" r="13" />
      <circle className="p-hub-dot" cx="200" cy="200" r="4" />
    </svg>
  );
}
