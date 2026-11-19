"use client";

import { useEffect, useState } from "react";
import Read from "@/components/instrument/Read";
import { setLive } from "@/components/instrument/live";
import { KA_FEED, build, dough, feed, gr, p1 } from "@/data/sourdough";

type Mode = "dough" | "feed" | "build";
const MODES: { key: Mode; label: string }[] = [
  { key: "dough", label: "Bread dough" },
  { key: "feed", label: "Feed the starter" },
  { key: "build", label: "Build starter for a recipe" },
];

const RATIOS = [
  { label: "1:1:1", f: 1, w: 1 },
  { label: "1:2:2", f: 2, w: 2 },
  { label: "1:3:3", f: 3, w: 3 },
  { label: "1:5:5", f: 5, w: 5 },
];

/** King Arthur's Naturally Leavened Sourdough Bread as baker's percentages of its 685 g flour */
const KA = { flour: "685", water: "57.96", starter: "66.28", salt: "2.19", hyd: "100", loaves: "2" };

const parse = (t: string) => {
  const n = Number(t.trim().replace(",", "."));
  return t.trim() !== "" && Number.isFinite(n) && n >= 0 ? n : null;
};

export default function SourdoughCalculator() {
  const [mode, setMode] = useState<Mode>("dough");
  const [v, setV] = useState(KA);
  const [keepText, setKeepText] = useState(String(KA_FEED.keepG));
  const [ratio, setRatio] = useState(0);
  const [needText, setNeedText] = useState(String(KA_FEED.exampleNeedG));
  const [buildKeepText, setBuildKeepText] = useState(String(KA_FEED.keepG));

  const set = (k: keyof typeof KA, t: string) => setV({ ...v, [k]: t });
  const flour = parse(v.flour);
  const water = parse(v.water);
  const starter = parse(v.starter);
  const salt = parse(v.salt);
  const hyd = parse(v.hyd);
  const loaves = parse(v.loaves);
  const doughOk = flour !== null && flour > 0 && water !== null && starter !== null && salt !== null && hyd !== null && loaves !== null && loaves >= 1;
  const d = doughOk ? dough(flour as number, water as number, starter as number, salt as number, hyd as number) : null;
  const isKA = JSON.stringify(v) === JSON.stringify(KA);

  const keep = parse(keepText);
  const keepOk = keep !== null && keep > 0;
  const r = RATIOS[ratio];
  const fd = keepOk ? feed(keep as number, r.f, r.w) : null;

  const need = parse(needText);
  const bKeep = parse(buildKeepText);
  const buildOk = need !== null && need > 0 && bKeep !== null;
  const b = buildOk ? build(need as number, bKeep as number) : null;

  const scale = mode === "dough" ? d?.total : mode === "feed" ? fd?.total : b?.makes;
  useEffect(() => {
    if (scale !== undefined) setLive("sourdough", Math.round(scale));
  }, [scale]);

  const pctField = (k: "water" | "starter" | "salt" | "hyd", label: string) => (
    <label className="p-pct">
      <span>{label}</span>
      <input
        className="p-in p-in-pct"
        type="text"
        inputMode="decimal"
        autoComplete="off"
        value={v[k]}
        onChange={(e) => set(k, e.target.value)}
        aria-invalid={parse(v[k]) === null}
      />
      <span>%</span>
    </label>
  );

  return (
    <div>
      <div className="p-tabs" role="group" aria-label="What to work out">
        {MODES.map((m) => (
          <button key={m.key} type="button" className={`p-opt${mode === m.key ? " p-on" : ""}`} aria-pressed={mode === m.key} onClick={() => setMode(m.key)}>
            {m.label}
          </button>
        ))}
      </div>

      {mode === "dough" && (
        <>
          <form className="p-panel p-panel-2" aria-label="Sourdough bread dough" onSubmit={(e) => e.preventDefault()}>
            <div className="p-cell">
              <label className="p-lab" htmlFor="sd-flour">
                Flour, g (all flours)
              </label>
              <input
                className="p-in p-in-ot"
                id="sd-flour"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={v.flour}
                onChange={(e) => set("flour", e.target.value)}
                aria-invalid={flour === null || flour <= 0}
              />
              <label className="p-lab p-mt" htmlFor="sd-loaves">
                Loaves
              </label>
              <input
                className="p-in p-in-ot"
                id="sd-loaves"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                value={v.loaves}
                onChange={(e) => set("loaves", e.target.value)}
                aria-invalid={loaves === null || loaves < 1}
              />
            </div>
            <div className="p-cell" role="group" aria-labelledby="sd-pcts">
              <span className="p-lab" id="sd-pcts">
                Baker&apos;s percentages, of the flour weight
              </span>
              <div className="p-pcts p-pcts-4">
                {pctField("water", "Water")}
                {pctField("starter", "Starter")}
                {pctField("salt", "Salt")}
                {pctField("hyd", "Starter hydration")}
              </div>
              <div className="p-quick p-mt">
                <button type="button" className={`p-opt p-opt-wide${isKA ? " p-on" : ""}`} aria-pressed={isKA} onClick={() => setV(KA)}>
                  King Arthur&apos;s loaf
                </button>
              </div>
            </div>
          </form>
          <ul className="p-reads p-reads-3 p-reads-live" aria-live="polite">
            <Read v={d ? gr(d.water) : "—"} u={d ? "g" : undefined} c="Water" />
            <Read v={d ? gr(d.starter) : "—"} u={d ? "g" : undefined} c="Ripe starter" />
            <Read v={d ? gr(d.salt) : "—"} u={d ? "g" : undefined} c="Salt" />
            <Read v={d ? gr(d.total) : "—"} u={d ? "g" : undefined} c="Total dough" />
            <Read v={d ? gr(d.total / (loaves as number)) : "—"} u={d ? "g" : undefined} c={d ? `Per loaf, for ${loaves} ${loaves === 1 ? "loaf" : "loaves"}` : "Per loaf"} />
            <Read v={d ? p1(d.overall) : "—"} u={d ? "%" : undefined} c="Hydration counting the starter's flour and water" />
          </ul>
          <p className="p-res-basis p-mt">
            {d
              ? `The starter adds ${gr(d.sFlour)} g flour and ${gr(d.sWater)} g water: (${gr(d.water)} + ${gr(d.sWater)}) ÷ (${gr(flour as number)} + ${gr(d.sFlour)}) = ${p1(d.overall)}%.`
              : "Enter the flour weight and the percentages."}
          </p>
        </>
      )}

      {mode === "feed" && (
        <>
          <form className="p-panel p-panel-2" aria-label="Starter feeding" onSubmit={(e) => e.preventDefault()}>
            <div className="p-cell">
              <label className="p-lab" htmlFor="sd-keep">
                Starter you keep, g
              </label>
              <input
                className="p-in p-in-ot"
                id="sd-keep"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={keepText}
                onChange={(e) => setKeepText(e.target.value)}
                aria-invalid={!keepOk}
              />
            </div>
            <div className="p-cell" role="group" aria-labelledby="sd-ratio">
              <span className="p-lab" id="sd-ratio">
                Starter : flour : water, by weight
              </span>
              <div className="p-quick">
                {RATIOS.map((x, i) => (
                  <button key={x.label} type="button" className={`p-opt${ratio === i ? " p-on" : ""}`} aria-pressed={ratio === i} onClick={() => setRatio(i)}>
                    {x.label}
                  </button>
                ))}
              </div>
            </div>
          </form>
          <ul className="p-reads p-reads-live" aria-live="polite">
            <Read v={fd ? gr(fd.flour) : "—"} u={fd ? "g" : undefined} c="Flour" />
            <Read v={fd ? gr(fd.water) : "—"} u={fd ? "g" : undefined} c="Water" />
            <Read v={fd ? gr(fd.total) : "—"} u={fd ? "g" : undefined} c="Starter after feeding" />
            <Read v={fd ? p1(fd.hydration) : "—"} u={fd ? "%" : undefined} c="Starter hydration" />
          </ul>
          <p className="p-res-basis p-mt">
            King Arthur keeps {KA_FEED.keepG} g and feeds it {KA_FEED.keepG} g each of flour and water: every {KA_FEED.roomHours} hours at room
            temperature, at least once a week in the fridge.
          </p>
        </>
      )}

      {mode === "build" && (
        <>
          <form className="p-panel p-panel-2" aria-label="Build starter for a recipe" onSubmit={(e) => e.preventDefault()}>
            <div className="p-cell">
              <label className="p-lab" htmlFor="sd-need">
                Starter the recipe needs, g
              </label>
              <input
                className="p-in p-in-ot"
                id="sd-need"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={needText}
                onChange={(e) => setNeedText(e.target.value)}
                aria-invalid={need === null || need <= 0}
              />
            </div>
            <div className="p-cell">
              <label className="p-lab" htmlFor="sd-bkeep">
                Starter to keep afterwards, g
              </label>
              <input
                className="p-in p-in-ot"
                id="sd-bkeep"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={buildKeepText}
                onChange={(e) => setBuildKeepText(e.target.value)}
                aria-invalid={bKeep === null}
              />
            </div>
          </form>
          <ul className="p-reads p-reads-live" aria-live="polite">
            <Read v={b ? gr(b.each) : "—"} u={b ? "g" : undefined} c="Starter to feed; discard the rest" />
            <Read v={b ? gr(b.each) : "—"} u={b ? "g" : undefined} c="Flour" />
            <Read v={b ? gr(b.each) : "—"} u={b ? "g" : undefined} c="Water" />
            <Read v={b ? gr(b.makes) : "—"} u={b ? "g" : undefined} c={b ? `${gr(need as number)} g for the recipe + ${gr(bKeep as number)} g to keep` : "Makes"} />
          </ul>
          <p className="p-res-basis p-mt">
            One feeding of equal weights, rested {KA_FEED.restLoH} to {KA_FEED.restHiH} hours at room temperature until bubbly, as in King
            Arthur&apos;s guide.
          </p>
        </>
      )}
    </div>
  );
}
