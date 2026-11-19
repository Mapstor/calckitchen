"use client";

import { useEffect, useState } from "react";
import Read from "@/components/instrument/Read";
import { setLive } from "@/components/instrument/live";
import { DEFAULT_ON, ITEMS, lbOf, totalText } from "@/data/party";

const parse = (t: string) => {
  const n = Number(t.trim().replace(",", "."));
  return t.trim() !== "" && Number.isFinite(n) && n > 0 ? n : null;
};
const r1 = (x: number) => (Math.round(x * 10) / 10).toString();

export default function PartyFoodCalculator() {
  const [guestsText, setGuestsText] = useState("25");
  const [perText, setPerText] = useState("1");
  const [on, setOn] = useState<string[]>(DEFAULT_ON);

  const guests = parse(guestsText);
  const per = parse(perText);
  const ok = guests !== null && per !== null && guests <= 10000 && per <= 10;
  const servings = ok ? (guests as number) * (per as number) : 0;
  const chosen = ITEMS.filter((i) => on.includes(i.key));
  const meat = ITEMS.find((i) => i.key === "meat")!;
  const meatLb = ok && on.includes("meat") ? lbOf(meat.amount * servings) : null;

  useEffect(() => {
    if (meatLb !== null) setLive("partymeat", Math.round(meatLb * 10) / 10);
  }, [meatLb]);

  const toggle = (k: string) => setOn(on.includes(k) ? on.filter((x) => x !== k) : [...on, k]);

  return (
    <div>
      <form className="p-panel p-panel-2" aria-label="Party food calculator" onSubmit={(e) => e.preventDefault()}>
        <div className="p-cell">
          <div className="p-row p-row-gap">
            <div>
              <label className="p-lab" htmlFor="pf-guests">
                Guests
              </label>
              <input className="p-in" id="pf-guests" type="text" inputMode="numeric" autoComplete="off" value={guestsText} onChange={(e) => setGuestsText(e.target.value)} aria-invalid={guests === null} />
            </div>
            <div>
              <label className="p-lab" htmlFor="pf-per">
                Servings each
              </label>
              <input className="p-in" id="pf-per" type="text" inputMode="decimal" autoComplete="off" value={perText} onChange={(e) => setPerText(e.target.value)} aria-invalid={per === null} />
            </div>
          </div>
          <p className="p-hint p-mt">{ok ? "1 is one reference serving of each dish; use 1.5 or 2 for hungry crowds." : "Enter guests and servings above 0."}</p>
        </div>
        <div className="p-cell" role="group" aria-labelledby="pf-menu">
          <span className="p-lab" id="pf-menu">
            On the menu
          </span>
          <div className="p-checks">
            {ITEMS.map((i) => (
              <label key={i.key} className="p-check">
                <input type="checkbox" checked={on.includes(i.key)} onChange={() => toggle(i.key)} />
                <span>{i.name}</span>
              </label>
            ))}
          </div>
        </div>
      </form>

      <ul className="p-reads p-reads-3 p-reads-live" aria-live="polite">
        <Read v={ok ? r1(servings) : "—"} c="Servings of each dish" />
        <Read v={meatLb !== null ? r1(meatLb) : "—"} u={meatLb !== null ? "lb" : undefined} c="Raw boneless meat or poultry to buy" />
        <Read v={ok && on.includes("drinks") ? r1(servings) : "—"} c="12 fl oz drinks" />
      </ul>

      {ok && chosen.length > 0 && (
        <div className="p-tbox p-mt" role="region" aria-label="Food to buy" tabIndex={0}>
          <table className="p-table">
            <thead>
              <tr>
                <th scope="col">Food</th>
                <th scope="col">Per serving</th>
                <th scope="col">For {r1(servings)} servings</th>
              </tr>
            </thead>
            <tbody>
              {chosen.map((i) => (
                <tr key={i.key}>
                  <td>{i.name}</td>
                  <td>{i.per}</td>
                  <td>{totalText(i, servings)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="p-res-basis p-mt">Per serving: the FDA and USDA reference amounts customarily consumed per eating occasion.</p>
    </div>
  );
}
