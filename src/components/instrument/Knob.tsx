import type { CSSProperties } from "react";

// Oven dial: 350°F at the top, 50°F = 35° of turn, OFF at -140°, BROIL at +140°.
const angle = (t: number) => (Math.min(550, Math.max(150, t)) - 350) * 0.7;
const pt = (a: number, r: number) => {
  const rad = (a * Math.PI) / 180;
  return { x: +(200 + r * Math.sin(rad)).toFixed(1), y: +(200 - r * Math.cos(rad)).toFixed(1) };
};
const tick = (t: number, r1: number, r2: number) => {
  const a = angle(t);
  const p1 = pt(a, r1);
  const p2 = pt(a, r2);
  return { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y };
};

const MAJOR = [200, 250, 300, 350, 400, 450, 500];
const MINOR = [225, 275, 325, 375, 425, 475];

export default function Knob({ tempF, label }: { tempF: number; label?: string }) {
  const style = { "--k": `${angle(tempF)}deg` } as CSSProperties;
  return (
    <svg className="p-knob-svg" viewBox="0 0 400 400" role="img" aria-label={label ?? `Oven dial set to ${tempF}°F`} style={style}>
      {MAJOR.map((t) => (
        <line key={`M${t}`} className="p-tk-maj" {...tick(t, 134, 152)} />
      ))}
      {MINOR.map((t) => (
        <line key={`m${t}`} className="p-tk-min" {...tick(t, 140, 150)} />
      ))}
      <g className="p-knob-k">
        <line className="p-tk-hi" x1="200" y1="68" x2="200" y2="50" />
      </g>
      <text className="p-sc-t" {...pt(-140, 175)}>OFF</text>
      {MAJOR.map((t) => (
        <text key={`L${t}`} className="p-sc-t" {...pt(angle(t), 175)}>
          {t}
        </text>
      ))}
      <text className="p-sc-t" {...pt(140, 175)}>BROIL</text>
      <circle className="p-bezel" cx="200" cy="200" r="122" />
      <circle className="p-bezel2" cx="200" cy="200" r="106" />
      <g className="p-knob">
        <g className="p-knob-k">
          <circle className="p-knob-body" cx="200" cy="200" r="98" />
          <rect className="p-grip" x="183" y="104" width="34" height="192" rx="17" />
          <rect className="p-grip-hi" x="190" y="114" width="6" height="172" rx="3" />
          <rect className="p-pointer" x="196" y="112" width="8" height="52" rx="4" />
        </g>
      </g>
      <circle className="p-lamp" cx="164" cy="354" r="9" />
      <text className="p-lamp-t" x="180" y="354">
        Preheat
      </text>
    </svg>
  );
}
