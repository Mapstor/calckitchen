"use client";

import { useEffect, useState } from "react";
import Read from "@/components/instrument/Read";
import { MeatThermometer } from "@/components/instrument/Scales";
import { setLive } from "@/components/instrument/live";
import { GROUPS, SAFE, type Group } from "@/data/meat-temps";

/** short names for the thermometer labels (same rows, same temperatures as the USDA chart in src/data/meat-temps.ts) */
const SHORT: Record<string, string> = {
  "beef-whole": "Steaks, roasts, chops of beef, pork, lamb, veal, goat, bison",
  "pork-whole": "Steaks, roasts, chops of beef, pork, lamb, veal, goat, bison",
  "ham-raw": "Raw ham",
  fish: "Fish",
  "beef-ground": "Ground meat and sausage",
  "pork-ground": "Ground meat and sausage",
  game: "Rabbit, venison",
  "egg-dishes": "Egg dishes",
  poultry: "All poultry",
  "ham-precooked": "Precooked ham, reheated",
  casseroles: "Casseroles",
  leftovers: "Leftovers",
};
const STOPS = [...new Set(SAFE.flatMap((r) => (r.f === null ? [] : [r.f])))]
  .sort((a, b) => a - b)
  .map((f) => ({ f, items: [...new Set(SAFE.filter((r) => r.f === f).map((r) => SHORT[r.id] ?? r.short))] }));

const label = (food: string, cut: string) => (cut ? `${food}: ${cut.charAt(0).toLowerCase()}${cut.slice(1)}` : food);

export default function MeatTemperatureChart() {
  const [group, setGroup] = useState<Group>("beef");
  const [id, setId] = useState("beef-whole");
  const items = SAFE.filter((r) => r.group === group);
  const row = items.find((r) => r.id === id) ?? items[0];

  useEffect(() => {
    if (row.f !== null) setLive("meat", row.f);
  }, [row.f]);

  const pickGroup = (g: Group) => {
    setGroup(g);
    setId(SAFE.find((r) => r.group === g)?.id ?? "");
  };

  return (
    <div>
      <div className="p-tabs" role="group" aria-label="Food">
        {GROUPS.map((g) => (
          <button key={g.key} type="button" className={`p-opt${group === g.key ? " p-on" : ""}`} aria-pressed={group === g.key} onClick={() => pickGroup(g.key)}>
            {g.label}
          </button>
        ))}
      </div>

      {items.length > 1 && (
        <div className="p-panel p-panel-1" role="group" aria-labelledby="mt-cut">
          <div className="p-cell">
            <span className="p-lab" id="mt-cut">
              Which one?
            </span>
            <div className="p-opts">
              {items.map((r) => (
                <button key={r.id} type="button" className={`p-opt${row.id === r.id ? " p-on" : ""}`} aria-pressed={row.id === r.id} onClick={() => setId(r.id)}>
                  {r.short}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <ul className="p-reads p-reads-3 p-reads-live" aria-live="polite">
        <Read v={row.f !== null ? String(row.f) : "—"} u={row.f !== null ? "°F" : undefined} c={row.f !== null ? "USDA safe minimum" : "No temperature on the USDA chart"} />
        <Read v={row.c !== null ? String(row.c) : "—"} u={row.c !== null ? "°C" : undefined} c="Celsius, as the USDA chart prints it" />
        <Read v={String(row.restMin)} u="min" c={row.restMin ? "Rest time before carving or eating" : "No rest time on the USDA chart"} />
      </ul>
      <MeatThermometer stops={STOPS} hiF={row.f} choice={row.cut && row.cut.length <= 40 ? label(row.food, row.cut) : row.food} />
      <p className="p-res-basis p-mt">
        <strong>{label(row.food, row.cut)}.</strong> {row.note}
      </p>
    </div>
  );
}
