import type { ReactNode } from "react";
import { area, type PanShape } from "@/data/wilton";

// Cake pans drawn from above, every pan in a figure at one scale, so sizes compare by eye.
// Colors (DESIGN.md + dataviz palette check): recipe's pan = cold blue, your pan = hot orange, flat tints with the full hue
// at the edge, steel rims; text stays in ink/muted. Class names use the p-viz / p-pan- prefixes (p-fig, p-bar and p-key
// belong to the turkey page and RoastChart).

export type PanSpec = { shape: PanShape; a: number; b: number };
export const PAN_BLUE = "#1D5FBF";
export const PAN_ORANGE = "#E35A0F";
const TINT: Record<string, string> = { [PAN_BLUE]: "#B9CDEB", [PAN_ORANGE]: "#F6C9B0" };
const STEEL = "#C8CED6";
const INK = "#0E1621";
const RIM_IN = 0.45;

const d1 = (n: number) => (Math.round(n * 10) / 10).toString();
const inch = (n: number) => `${d1(n)} in.`;
/** drawn width and height in inches: rectangles lie landscape */
const box = (p: PanSpec) => (p.shape === "Rectangle" ? { w: Math.max(p.a, p.b), h: Math.min(p.a, p.b) } : { w: p.a, h: p.a });
export const panName = (p: PanSpec) => {
  const { w, h } = box(p);
  return p.shape === "Round" ? `${d1(p.a)} in. round` : p.shape === "Square" ? `${d1(p.a)} in. square` : `${d1(w)} × ${d1(h)} in. rectangle`;
};

type Paint = { fill?: string; stroke?: string; strokeWidth?: number; strokeDasharray?: string; className?: string };

function Shape({ p, cx, cy, s, grow = 0, ...rest }: { p: PanSpec; cx: number; cy: number; s: number; grow?: number } & Paint) {
  const { w, h } = box(p);
  const W = w * s + 2 * grow;
  const H = h * s + 2 * grow;
  if (p.shape === "Round") return <circle cx={cx} cy={cy} r={W / 2} {...rest} />;
  const r = Math.min(0.5 * s + grow, W / 6);
  return <rect x={cx - W / 2} y={cy - H / 2} width={W} height={H} rx={r} ry={r} {...rest} />;
}

/** one pan from above: steel rim, batter surface, size lines, area in the middle; optional other pan laid on top, dashed */
function Pan({ p, cx, cy, s, tone, overlay }: { p: PanSpec; cx: number; cy: number; s: number; tone: string; overlay?: PanSpec }) {
  const { w, h } = box(p);
  const W = w * s;
  const H = h * s;
  const rim = Math.max(5, RIM_IN * s);
  const yDim = cy + H / 2 + rim + 22;
  const xDim = cx - W / 2 - rim - 22;
  const sq = area(p.shape, p.a, p.b);
  return (
    <g>
      <Shape p={p} cx={cx} cy={cy} s={s} grow={rim} fill={STEEL} stroke={INK} strokeWidth={2} />
      <g key={p.shape} className="p-pan-in">
        <Shape p={p} cx={cx} cy={cy} s={s} fill={TINT[tone] ?? tone} stroke={tone} strokeWidth={4} />
      </g>
      {overlay && (
        <g key={`ol-${overlay.shape}`} className="p-pan-ol">
          <Shape p={overlay} cx={cx} cy={cy} s={s} fill="none" stroke="#FFFFFF" strokeWidth={7} />
          <Shape p={overlay} cx={cx} cy={cy} s={s} fill="none" stroke={PAN_BLUE} strokeWidth={3.5} strokeDasharray="12 8" />
        </g>
      )}
      <g stroke={INK} strokeWidth={1.5}>
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
      <text className="p-pan-area" x={cx} y={cy + 6} textAnchor="middle">
        {d1(sq)}
      </text>
      <text className="p-pan-unit" x={cx} y={cy + 32} textAnchor="middle">
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

const compare = (ay: number, ar: number) => {
  const pct = Math.round((ay / ar - 1) * 100);
  return pct === 0 ? "same area" : pct > 0 ? `${pct}% more area` : `${-pct}% less area`;
};

/** the recipe's pan and yours side by side (stacked on phones), one scale, with the recipe's pan laid over yours */
export function PanPair({ recipe, yours }: { recipe: PanSpec; yours: PanSpec }) {
  const br = box(recipe);
  const by = box(yours);
  const maxW = Math.max(br.w, by.w) + 2 * RIM_IN;
  const maxH = Math.max(br.h, by.h) + 2 * RIM_IN;
  const ar = area(recipe.shape, recipe.a, recipe.b);
  const ay = area(yours.shape, yours.a, yours.b);
  const vs = compare(ay, ar);
  const label = `Drawn to scale from above: the recipe's ${panName(recipe)} pan, ${d1(ar)} square inches, and your ${panName(yours)} pan, ${d1(ay)} square inches (${vs}), with the recipe's pan laid over yours as a dashed outline.`;
  const sW = Math.min(390 / maxW, 290 / maxH);
  const sT = Math.min(320 / maxW, 250 / maxH);
  const titles = (x: number, y: number, who: string, sub: string) => (
    <>
      <text className="p-pan-title" x={x} y={y} textAnchor="middle">
        {who}
      </text>
      <text className="p-pan-sub" x={x} y={y + 24} textAnchor="middle">
        {sub}
      </text>
    </>
  );
  return (
    <figure className="p-viz">
      <Frame vw={1000} vh={460} label={label} className="p-viz-wide">
        {titles(255, 30, "Recipe's pan", panName(recipe))}
        {titles(745, 30, "Your pan", `${panName(yours)}, ${vs}`)}
        <Pan p={recipe} cx={255} cy={234} s={sW} tone={PAN_BLUE} />
        <Pan p={yours} cx={745} cy={234} s={sW} tone={PAN_ORANGE} overlay={recipe} />
      </Frame>
      <Frame vw={420} vh={790} label={label} className="p-viz-tall">
        {titles(225, 28, "Recipe's pan", panName(recipe))}
        {titles(225, 420, "Your pan", `${panName(yours)}, ${vs}`)}
        <Pan p={recipe} cx={225} cy={205} s={sT} tone={PAN_BLUE} />
        <Pan p={yours} cx={225} cy={597} s={sT} tone={PAN_ORANGE} overlay={recipe} />
      </Frame>
      <figcaption className="p-viz-cap">
        <span className="p-vkey">
          <span className="p-vsw" style={{ background: PAN_BLUE }} /> Recipe&apos;s pan
        </span>
        <span className="p-vkey">
          <span className="p-vsw" style={{ background: PAN_ORANGE }} /> Your pan
        </span>
        <span className="p-vkey">
          <span className="p-vsw p-vsw-dash" /> Recipe&apos;s pan laid on yours
        </span>
        <span>Drawn to one scale, seen from above. The steel band is the pan&apos;s rim.</span>
      </figcaption>
    </figure>
  );
}

type LinePan = PanSpec & { name?: string };

/** standard pans at one scale: one row on desktop, two rows on phones */
export function PanLineup({ pans, hi, split }: { pans: LinePan[]; hi?: number; split?: number }) {
  const all = pans.map((_, i) => i);
  const cut = split ?? Math.ceil(pans.length / 2);
  const gap = 1.4;
  const wOf = (i: number) => box(pans[i]).w + 2 * RIM_IN;
  const maxH = Math.max(...pans.map((p) => box(p).h + 2 * RIM_IN));
  const label = `Drawn to scale: ${pans.map((p) => `${p.name ?? panName(p)}, ${d1(area(p.shape, p.a, p.b))} square inches`).join("; ")}.`;
  const draw = (vw: number, rows: number[][], capH: number, cls: string) => {
    const rowW = rows.map((r) => r.reduce((a, i) => a + wOf(i), 0) + gap * (r.length - 1));
    const s = Math.min((vw - 40) / Math.max(...rowW), capH / maxH);
    const rowH = maxH * s + 56;
    return (
      <svg className={cls} viewBox={`0 0 ${vw} ${rows.length * rowH + 8}`} role="img" aria-label={label}>
        {rows.map((r, ri) => {
          const cy = ri * rowH + 8 + (maxH * s) / 2;
          const x0 = (vw - rowW[ri] * s) / 2;
          return r.map((i, k) => {
            const p = pans[i];
            const cx = x0 + (r.slice(0, k).reduce((a, j) => a + wOf(j) + gap, 0) + wOf(i) / 2) * s;
            const { h } = box(p);
            const tone = i === hi ? PAN_ORANGE : PAN_BLUE;
            return (
              <g key={i}>
                <Shape p={p} cx={cx} cy={cy} s={s} grow={RIM_IN * s} fill={STEEL} stroke={INK} strokeWidth={2} />
                <Shape p={p} cx={cx} cy={cy} s={s} fill={TINT[tone]} stroke={tone} strokeWidth={3} />
                <text className="p-pan-area p-pan-area-sm" x={cx} y={cy + 7} textAnchor="middle">
                  {d1(area(p.shape, p.a, p.b))}
                </text>
                <text className="p-pan-sub" x={cx} y={cy + (h * s) / 2 + RIM_IN * s + 30} textAnchor="middle">
                  {p.name ?? panName(p)}
                </text>
              </g>
            );
          });
        })}
      </svg>
    );
  };
  return (
    <figure className="p-viz">
      {draw(760, [all], 170, "p-viz-wide")}
      {draw(420, [all.slice(0, cut), all.slice(cut)], 150, "p-viz-tall")}
      <figcaption className="p-viz-cap">
        <span>Square inches inside each pan, all drawn to one scale.</span>
      </figcaption>
    </figure>
  );
}
