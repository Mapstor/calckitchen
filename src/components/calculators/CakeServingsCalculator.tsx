"use client";

import { useEffect, useState } from "react";
import Read from "@/components/instrument/Read";
import CakeStack from "@/components/instrument/CakeStack";
import { setLive } from "@/components/instrument/live";
import { SHAPES, WILTON, frac } from "@/data/wilton";

type Tier = { shape: string; size: string };
const sizesOf = (shape: string) => WILTON.filter((r) => r.shape === shape).map((r) => r.size);
const fmtCups = (n: number) => (Math.round(n * 4) / 4).toString();

export default function CakeServingsCalculator() {
  const [tiers, setTiers] = useState<Tier[]>([{ shape: "Round", size: "8 in." }]);
  const rows = tiers.map((t) => WILTON.find((r) => r.shape === t.shape && r.size === t.size)).filter((r) => r !== undefined);
  const party = rows.reduce((a, r) => a + r.party, 0);
  const wedding = rows.reduce((a, r) => a + r.wedding, 0);
  const batter = rows.reduce((a, r) => a + 2 * frac(r.cups), 0);
  const icing = rows.reduce((a, r) => a + frac(r.icing), 0);

  useEffect(() => {
    setLive("servings", party);
  }, [party]);

  const setTier = (i: number, t: Tier) => setTiers(tiers.map((x, j) => (j === i ? t : x)));

  return (
    <div>
      <form className="p-panel p-panel-1" aria-label="Cake servings calculator" onSubmit={(e) => e.preventDefault()}>
        <div className="p-cell">
          <span className="p-lab">Cake tiers, each two layers from 2 in. deep pans</span>
          <div className="p-tiers">
            {tiers.map((t, i) => (
              <div className="p-tier" key={i}>
                <span className="p-tier-n">{tiers.length > 1 ? `Tier ${i + 1}` : "Cake"}</span>
                <select className="p-sel" aria-label={`Tier ${i + 1} shape`} value={t.shape} onChange={(e) => setTier(i, { shape: e.target.value, size: sizesOf(e.target.value)[0] })}>
                  {SHAPES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <select className="p-sel" aria-label={`Tier ${i + 1} size`} value={t.size} onChange={(e) => setTier(i, { ...t, size: e.target.value })}>
                  {sizesOf(t.shape).map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {tiers.length > 1 && (
                  <button type="button" className="p-opt p-x" aria-label={`Remove tier ${i + 1}`} onClick={() => setTiers(tiers.filter((_, j) => j !== i))}>
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          {tiers.length < 5 && (
            <button type="button" className="p-opt p-add" onClick={() => setTiers([...tiers, { shape: "Round", size: "6 in." }])}>
              Add a tier
            </button>
          )}
        </div>
      </form>

      <ul className="p-reads p-reads-live" aria-live="polite">
        <Read v={String(party)} c="Party servings, about 1½ × 2 in." />
        <Read v={String(wedding)} c="Wedding servings, about 1 × 2 in." />
        <Read v={fmtCups(batter)} u="cups" c="Batter, both layers of every tier" />
        <Read v={fmtCups(icing)} u="cups" c="Icing to ice and decorate" />
      </ul>
      <CakeStack tiers={rows.map((r) => ({ shape: r.shape, size: r.size, party: r.party, wedding: r.wedding }))} />
    </div>
  );
}
