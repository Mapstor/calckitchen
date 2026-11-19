import type { ReactNode } from "react";
import { area, type PanShape } from "@/data/wilton";

// Cake pans drawn from above, every pan in a figure at one scale, so sizes compare by eye.
// Colors (DESIGN.md + dataviz check): recipe's pan = cold blue, your pan = hot orange; washes at low opacity, text in ink/muted.

export type PanSpec = { shape: PanShape; a: number; b: number };
const BLUE = "#1D5FBF";
const ORANGE = "#E35A0F";
const RIM_IN = 0.45;

const d1 = (n: number) => (Math.round(n * 10) / 10).toString();
const inch = (n: number) => `${d1(n)} in.`;
/** drawn width and height in inches: rectangles lie landscape */
const box = (p: PanSpec) => (p.shape === "Rectangle" ? { w: Math.max(p.a, p.b), h: Math.min(p.a, p.b) } : { w: p.a, h: p.a });
export const panName = (p: PanSpec) => {
  const { w, h } = box(p);
  return p.shape === "Round" ? `${d1(p.a)} in. round` : p.shape === "Square" ? `${d1(p.a)} in. square` : `${d1(w)} × ${d1(h)} in. rectangle`;
};

type Paint = { fill?: string; fillOpacity?: number; stroke?: string; strokeWidth?: number; className?: string };

function Shape({ p, cx, cy, s, grow = 0, ...rest }: { p: PanSpec; cx: number; cy: number; s: number; grow?: number } & Paint) {
  const { w, h } = box(p);
  const W = w * s + 2 * grow;
  const H = h * s + 2 * grow;
  if (p.shape === "Round") return <circle cx={cx} cy={cy} r={W / 2} {...rest} />;
  const r = Math.min(0.5 * s + grow, W / 6);
  return <rect x={cx - W / 2} y={cy - H / 2} width={W} height={H} rx={r} ry={r} {...rest} />;
}

/** one pan from above: rim, batter wash, size lines, area in the middle */
function Pan({ p, cx, cy, s, tone, overlay }: { p: PanSpec; cx: number; cy: number; s: number; tone: string; overlay?: PanSpec }) {
  const { w, h } = box(p);
  const W = w * s;
  const H = h * s;
  const rim = Math.max(6, RIM_IN * s);
  const yDim = cy + H / 2 + rim + 22;
  const xDim = cx - W / 2 - rim - 22;
  const sq = area(p.shape, p.a, p.b);
  return (
    <g>
      <Shape p={p} cx={cx} cy={cy} s={s} grow={rim} fill="#F3F5F7" stroke="#0E1621" strokeWidth={2} />
      <Shape p={p} cx={cx} cy={cy} s={s} fill={tone} fillOpacity={0.14} stroke={tone} strokeWidth={3} />
      {overlay && <Shape p={overlay} cx={cx} cy={cy} s={s} fill="none" stroke={BLUE} strokeWidth={2.5} className="p-pan-ol" />}
      <g stroke="#0E1621" strokeWidth={1.5}>
        <line x1={cx - W / 2} y1={yDim} x2={cx + W / 2} y2={yDim} />
        <line x1={cx - W / 2} y1={yDim - 7} x2={cx - W / 2} y2={yDim + 7} />
        <line x1={cx + W / 2} y1={yDim - 7} x2={cx + W / 2} y2={yDim + 7} />
        {p.shape === "Rectangle" && (
          <>
            <line x1={xDim} y1={cy - H / 2} x2={xDim} y2={cy + H / 2} />
            <line x1={xDim - 7} y1={cy - H / 2} x2={xDim + 7} y2={cy - H / 2} />
            <line x1={xDim - 7} y1={cy + H / 2} x2={xDim + 7} y2={cy + H / 2} />
          </>
        )}
      </g>
      <text className="p-pan-dim" x={cx} y={yDim + 26} textAnchor="middle">
        {inch(w)}
        {p.shape === "Round" ? " across" : ""}
      </text>
      {p.shape === "Rectangle" && (
        <text className="p-pan-dim" x={xDim - 14} y={cy} textAnchor="middle" transform={`rotate(-90 ${xDim - 14} ${cy})`}>
          {inch(h)}
        </text>
      )}
      <text className="p-pan-area" x={cx} y={cy + 4} textAnchor="middle">
        {d1(sq)}
      </text>
      <text className="p-pan-unit" x={cx} y={cy + 28} textAnchor="middle">
        sq in
      </text>
    </g>
  );
}

function Frame({ vw, vh, label, className, children }: { vw: number; vh: number; label: string; className: string; children: ReactNode }) {
  return (
    <svg className={className} viewBox={`0 0 ${vw} ${vh}`} role="img" aria-label={label}>
      {children}
    </svg>
  );
}

/** the recipe's pan and yours side by side (stacked on phones), one scale, with the recipe pan outlined over yours */
export function PanPair({ recipe, yours }: { recipe: PanSpec; yours: PanSpec }) {
  const br = box(recipe);
  const by = box(yours);
  const maxW = Math.max(br.w, by.w) + 2 * RIM_IN;
  const maxH = Math.max(br.h, by.h) + 2 * RIM_IN;
  const ar = area(recipe.shape, recipe.a, recipe.b);
  const ay = area(yours.shape, yours.a, yours.b);
  const label = `Drawn to scale: the recipe's ${panName(recipe)} pan, ${d1(ar)} square inches, and your ${panName(yours)} pan, ${d1(ay)} square inches, with the recipe's pan outlined over yours.`;
  // wide: two cells of 470 x 300 drawing area
  const sW = Math.min(380 / maxW, 280 / maxH);
  // tall: one column, 330 x 250 per pan
  const sT = Math.min(320 / maxW, 250 / maxH);
  const titles = (x: number, y: number, who: string, p: PanSpec) => (
    <>
      <text className="p-pan-title" x={x} y={y} textAnchor="middle">
        {who}
      </text>
      <text className="p-pan-sub" x={x} y={y + 22} textAnchor="middle">
        {panName(p)}
      </text>
    </>
  );
  return (
    <figure className="p-fig">
      <Frame vw={1000} vh={440} label={label} className="p-fig-wide">
        {titles(260, 30, "Recipe's pan", recipe)}
        {titles(760, 30, "Your pan", yours)}
        <Pan p={recipe} cx={260} cy={215} s={sW} tone={BLUE} />
        <Pan p={yours} cx={760} cy={215} s={sW} tone={ORANGE} overlay={recipe} />
      </Frame>
      <Frame vw={420} vh={800} label={label} className="p-fig-tall">
        {titles(220, 28, "Recipe's pan", recipe)}
        {titles(220, 428, "Your pan", yours)}
        <Pan p={recipe} cx={220} cy={205} s={sT} tone={BLUE} />
        <Pan p={yours} cx={220} cy={605} s={sT} tone={ORANGE} overlay={recipe} />
      </Frame>
      <figcaption className="p-fig-cap">
        <span className="p-key">
          <span className="p-sw" style={{ background: BLUE }} /> Recipe&apos;s pan
        </span>
        <span className="p-key">
          <span className="p-sw" style={{ background: ORANGE }} /> Your pan, with the recipe&apos;s pan outlined on top
        </span>
        <span>Both drawn to the same scale, seen from above.</span>
      </figcaption>
    </figure>
  );
}

/** standard pans in a row at one scale */
export function PanLineup({ pans, hi }: { pans: (PanSpec & { name?: string })[]; hi?: number }) {
  const gap = 1.6;
  const widths = pans.map((p) => box(p).w + 2 * RIM_IN);
  const total = widths.reduce((a, b) => a + b, 0) + gap * (pans.length - 1);
  const maxH = Math.max(...pans.map((p) => box(p).h + 2 * RIM_IN));
  const s = Math.min(940 / total, 230 / maxH);
  const cxs = widths.map((w, i) => 30 + widths.slice(0, i).reduce((a, b) => a + b + gap, 0) * s + (w * s) / 2);
  const cy = 30 + (maxH * s) / 2;
  const label = `Drawn to scale: ${pans.map((p) => `${panName(p)}, ${d1(area(p.shape, p.a, p.b))} square inches`).join("; ")}.`;
  return (
    <figure className="p-fig p-fig-scroll" role="group" aria-label="Pan sizes to scale" tabIndex={0}>
      <svg className="p-fig-line" viewBox={`0 0 1000 ${cy + (maxH * s) / 2 + 80}`} role="img" aria-label={label}>
        {pans.map((p, i) => {
          const cx = cxs[i];
          const { h } = box(p);
          return (
            <g key={i}>
              <Shape p={p} cx={cx} cy={cy} s={s} grow={RIM_IN * s} fill="#F3F5F7" stroke="#0E1621" strokeWidth={2} />
              <Shape p={p} cx={cx} cy={cy} s={s} fill={i === hi ? ORANGE : BLUE} fillOpacity={0.14} stroke={i === hi ? ORANGE : BLUE} strokeWidth={3} />
              <text className="p-pan-area p-pan-area-sm" x={cx} y={cy + 6} textAnchor="middle">
                {d1(area(p.shape, p.a, p.b))}
              </text>
              <text className="p-pan-sub" x={cx} y={cy + (h * s) / 2 + RIM_IN * s + 30} textAnchor="middle">
                {p.name ?? panName(p)}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="p-fig-cap">
        <span>Square inches in each pan, drawn to the same scale.</span>
      </figcaption>
    </figure>
  );
}
