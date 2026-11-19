// A tiered cake seen from the side, to scale: each tier is 4 in. high (two 2 in. layers, as in the Wilton chart),
// as wide as its pan; widest tier at the bottom. Desktop labels each tier beside it; phones number the tiers and list them.

export type Tier = { shape: string; size: string; party: number; wedding: number };

const ORANGE = "#E35A0F";
const TINT = "#F6C9B0";
const INK = "#0E1621";
const TIER_IN = 4;

/** "8 in." -> 8; "9 x 13 in." -> 13 (the long side faces you) */
const widthIn = (size: string) => Math.max(0, ...(size.match(/\d+(?:\.\d+)?/g) ?? []).map(Number));
export const tierName = (t: Tier) => `${t.size.replace(" x ", " × ")} ${t.shape.toLowerCase()}`;
const bottomUp = (tiers: Tier[]) => [...tiers].sort((a, b) => widthIn(b.size) - widthIn(a.size));

function Stack({ tiers, vw, cakeW, capH, cls, labels }: { tiers: Tier[]; vw: number; cakeW: number; capH: number; cls: string; labels: boolean }) {
  const order = bottomUp(tiers);
  const maxW = Math.max(...order.map((t) => widthIn(t.size)));
  const s = Math.min(cakeW / maxW, capH / (TIER_IN * order.length), 30);
  const th = TIER_IN * s;
  const top = 20;
  const base = top + th * order.length;
  const cx = labels ? 64 + (maxW * s) / 2 : 44 + (vw - 44 - 40) / 2;
  const right = cx + (maxW * s) / 2;
  const labelX = right + 40;
  const totalIn = TIER_IN * order.length;
  return (
    <svg
      className={cls}
      viewBox={`0 0 ${vw} ${base + 30}`}
      role="img"
      aria-label={`Drawn to scale from the side, ${totalIn} in. tall, bottom tier first: ${order.map((t) => `${tierName(t)}, ${t.party} party or ${t.wedding} wedding servings`).join("; ")}.`}
    >
      <g stroke={INK} strokeWidth={1.5}>
        <line x1={cx - (maxW * s) / 2 - 30} y1={top} x2={cx - (maxW * s) / 2 - 30} y2={base} />
        <line x1={cx - (maxW * s) / 2 - 37} y1={top} x2={cx - (maxW * s) / 2 - 23} y2={top} />
        <line x1={cx - (maxW * s) / 2 - 37} y1={base} x2={cx - (maxW * s) / 2 - 23} y2={base} />
      </g>
      <text
        className="p-pan-dim"
        x={cx - (maxW * s) / 2 - 44}
        y={(top + base) / 2}
        textAnchor="middle"
        transform={`rotate(-90 ${cx - (maxW * s) / 2 - 44} ${(top + base) / 2})`}
      >
        {`${totalIn} in. tall`}
      </text>
      {order.map((t, i) => {
        const w = widthIn(t.size) * s;
        const y = base - (i + 1) * th;
        const mid = y + th / 2;
        return (
          <g key={`${t.shape}-${t.size}-${i}`}>
            <g className="p-tier" style={{ animationDelay: `${0.12 * i}s` }}>
              <rect x={cx - w / 2} y={y} width={w} height={th} fill={TINT} stroke={INK} strokeWidth={2} />
              <line x1={cx - w / 2 + 2} y1={mid} x2={cx + w / 2 - 2} y2={mid} stroke={ORANGE} strokeWidth={3} />
            </g>
            {labels ? (
              <>
                <line x1={cx + w / 2 + 6} y1={mid} x2={labelX - 10} y2={mid} stroke={INK} strokeWidth={1} strokeDasharray="2 4" />
                <text className="p-tier-n" x={labelX} y={mid - 4}>
                  {tierName(t)}
                </text>
                <text className="p-tier-s" x={labelX} y={mid + 20}>{`${t.party} party · ${t.wedding} wedding servings`}</text>
              </>
            ) : (
              <>
                <line x1={cx + w / 2 + 6} y1={mid} x2={right + 18} y2={mid} stroke={INK} strokeWidth={1} strokeDasharray="2 4" />
                <circle cx={right + 32} cy={mid} r={13} fill={INK} />
                <text className="p-tier-b" x={right + 32} y={mid + 6} textAnchor="middle">
                  {i + 1}
                </text>
              </>
            )}
          </g>
        );
      })}
      <line x1={cx - (maxW * s) / 2 - 16} y1={base + 2} x2={cx + (maxW * s) / 2 + 16} y2={base + 2} stroke={INK} strokeWidth={4} strokeLinecap="round" />
    </svg>
  );
}

export default function CakeStack({ tiers }: { tiers: Tier[] }) {
  if (tiers.length === 0) return null;
  const order = bottomUp(tiers);
  return (
    <figure className="p-viz">
      <Stack tiers={tiers} vw={1000} cakeW={430} capH={360} cls="p-viz-wide" labels={true} />
      <Stack tiers={tiers} vw={420} cakeW={290} capH={330} cls="p-viz-tall" labels={false} />
      <ol className="p-tier-list">
        {order.map((t, i) => (
          <li key={`${t.shape}-${t.size}-${i}`}>
            <span className="p-tier-li">{i + 1}</span>
            <span>
              <strong>{tierName(t)}</strong>: {t.party} party · {t.wedding} wedding servings
            </span>
          </li>
        ))}
      </ol>
      <figcaption className="p-viz-cap">
        <span className="p-vkey">
          <span className="p-vsw" style={{ background: TINT, boxShadow: `inset 0 0 0 2px ${INK}` }} /> One tier: two 2 in. layers
        </span>
        <span className="p-vkey">
          <span className="p-vsw p-vsw-line" /> Where the layers meet
        </span>
        <span>Seen from the side, drawn to one scale, widest tier at the bottom.</span>
      </figcaption>
    </figure>
  );
}
