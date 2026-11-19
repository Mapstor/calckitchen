"use client";

import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  CookingMethod,
  ThawMethod,
  cookingMethods,
  thawMethods,
  calculateCookTime,
  calculateThawTime,
  getServings,
  recommendTurkeySize,
  generateTimeline,
  formatRange,
  STAND_MINUTES,
  SAFE_TEMP_F,
  SAFE_TEMP_C,
  LB_PER_KG,
} from "@/data/turkey-data";

// Instrument-look turkey calculator (DESIGN.md). All figures come from src/data/turkey-data.ts (USDA FSIS, UW Extension).

type Mode = "cook" | "thaw" | "size" | "timeline";
type Unit = "lb" | "kg";

const MODES: { key: Mode; label: string; go: string }[] = [
  { key: "cook", label: "Cook time", go: "Show cook time" },
  { key: "thaw", label: "Thaw time", go: "Show thaw time" },
  { key: "size", label: "Turkey size", go: "Show turkey size" },
  { key: "timeline", label: "Timeline", go: "Build my timeline" },
];

const METHOD_SHORT: Record<CookingMethod, string> = {
  roasted: "Oven roast",
  grilled: "Covered grill",
  smoked: "Smoker",
  deep_fried: "Deep fryer",
};

const METHOD_PHRASE: Record<CookingMethod, string> = {
  roasted: "roasted at 325°F",
  grilled: "on a covered grill",
  smoked: "in a smoker",
  deep_fried: "deep-fried",
};

// Heat readout per method: [value, unit, caption]
const HEAT: Record<CookingMethod, [string, string, string]> = {
  roasted: ["325", "°F", "Oven, 163°C. Never lower than 325°F"],
  grilled: ["225–300", "°F", "Grill air, 107–149°C"],
  smoked: ["225–300", "°F", "Smoker air, 107–149°C"],
  deep_fried: ["350", "°F", "Oil, 177°C"],
};

const THAW_SHORT: Record<ThawMethod, string> = { fridge: "Fridge", cold_water: "Cold water", microwave: "Microwave" };

const fmtLb = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));
const frac = (n: number) => {
  const whole = Math.floor(n);
  const q = Math.round((n - whole) * 4);
  const f = ["", "¼", "½", "¾"][q % 4] ?? "";
  return q === 4 ? String(whole + 1) : `${whole || ""}${f}` || "0";
};

// Fourth Thursday of November, this year or next if it has passed.
function nextThanksgiving(): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const forYear = (y: number) => {
    const first = new Date(y, 10, 1);
    return new Date(y, 10, 1 + ((4 - first.getDay() + 7) % 7) + 21);
  };
  let t = forYear(now.getFullYear());
  if (t < today) t = forYear(now.getFullYear() + 1);
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}

const noSubscribe = () => () => {};

function Read({ v, u, c }: { v: string; u?: string; c: string }) {
  return (
    <li className="p-read">
      <span className="p-read-v">
        {v}
        {u && <span className="p-read-u">{u}</span>}
      </span>
      <span className="p-read-c">{c}</span>
    </li>
  );
}

export default function TurkeyCookingCalculator() {
  const [mode, setMode] = useState<Mode>("cook");
  const [weightText, setWeightText] = useState("16");
  const [unit, setUnit] = useState<Unit>("lb");
  const [method, setMethod] = useState<CookingMethod>("roasted");
  const [stuffed, setStuffed] = useState(false);
  const [frozen, setFrozen] = useState(false);
  const [thawMethod, setThawMethod] = useState<ThawMethod>("fridge");
  const [guestsText, setGuestsText] = useState("10");
  const [leftovers, setLeftovers] = useState(true);
  const [pickedDate, setDinnerDate] = useState<string | null>(null);
  const [dinnerTime, setDinnerTime] = useState("15:00");
  const [thawFirst, setThawFirst] = useState(false);
  const resRef = useRef<HTMLDivElement>(null);

  // Next Thanksgiving, read on the client only: the static page never carries a stale date.
  const defaultDate = useSyncExternalStore(noSubscribe, nextThanksgiving, () => "");
  const dinnerDate = pickedDate ?? defaultDate;

  const weight = Number(weightText.replace(",", "."));
  const lbs = unit === "kg" ? weight * LB_PER_KG : weight;
  const weightOk = Number.isFinite(lbs) && lbs > 0;
  const info = cookingMethods.find((m) => m.key === method)!;
  const canStuff = info.allowsStuffed;
  const canFrozen = info.allowsFrozen;

  const cook = useMemo(
    () => (weightOk ? calculateCookTime(lbs, method, canStuff && stuffed, canFrozen && frozen) : null),
    [weightOk, lbs, method, canStuff, stuffed, canFrozen, frozen]
  );
  const thaw = useMemo(() => (weightOk ? calculateThawTime(lbs, thawMethod) : null), [weightOk, lbs, thawMethod]);
  const water = useMemo(() => (weightOk ? calculateThawTime(lbs, "cold_water") : null), [weightOk, lbs]);
  const fridge = useMemo(() => (weightOk ? calculateThawTime(lbs, "fridge") : null), [weightOk, lbs]);
  const guests = Math.max(0, Math.floor(Number(guestsText)));
  const size = guests > 0 ? recommendTurkeySize(guests, leftovers) : null;
  const sizeCook = size ? calculateCookTime(size.weight, "roasted", false, false) : null;
  const feeds = weightOk ? getServings(lbs) : null;

  const timeline = useMemo(() => {
    if (!weightOk || !dinnerDate) return null;
    const serve = new Date(`${dinnerDate}T${dinnerTime || "15:00"}`);
    if (Number.isNaN(serve.getTime())) return null;
    return { serve, ...generateTimeline(serve, lbs, method, canStuff && stuffed, thawFirst) };
  }, [weightOk, dinnerDate, dinnerTime, lbs, method, canStuff, stuffed, thawFirst]);

  const go = () => {
    const el = resRef.current;
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    el.classList.remove("p-flash");
    void el.offsetWidth;
    el.classList.add("p-flash");
  };

  const weightCell = (
    <div className="p-cell">
      <label className="p-lab" htmlFor="tk-weight">Turkey weight</label>
      <div className="p-row">
        <input
          className="p-in"
          id="tk-weight"
          type="text"
          inputMode="decimal"
          value={weightText}
          onChange={(e) => setWeightText(e.target.value)}
          aria-invalid={!weightOk}
        />
        <div className="p-unit" role="group" aria-label="Weight unit">
          {(["lb", "kg"] as Unit[]).map((u) => (
            <button key={u} type="button" aria-pressed={unit === u} className={unit === u ? "p-on" : undefined} onClick={() => setUnit(u)}>
              {u}
            </button>
          ))}
        </div>
      </div>
      {unit === "kg" && weightOk && <p className="p-hint">{fmtLb(lbs)} lb</p>}
    </div>
  );

  const methodCell = (
    <div className="p-cell" role="group" aria-labelledby="tk-method">
      <span className="p-lab" id="tk-method">Cooking method</span>
      <div className="p-opts">
        {cookingMethods.map((m) => (
          <button
            key={m.key}
            type="button"
            className={`p-opt${method === m.key ? " p-on" : ""}`}
            aria-pressed={method === m.key}
            onClick={() => setMethod(m.key)}
          >
            {m.key === "roasted" ? "Oven roast, 325°F" : METHOD_SHORT[m.key]}
          </button>
        ))}
      </div>
    </div>
  );

  const goButton = (
    <button type="button" className="p-go" onClick={go}>
      {MODES.find((m) => m.key === mode)!.go}
    </button>
  );

  return (
    <div>
      <div className="p-tabs" role="group" aria-label="What to calculate">
        {MODES.map((m) => (
          <button
            key={m.key}
            type="button"
            className={`p-opt${mode === m.key ? " p-on" : ""}`}
            aria-pressed={mode === m.key}
            onClick={() => setMode(m.key)}
          >
            {m.label}
          </button>
        ))}
      </div>

      <form className="p-panel" aria-label="Turkey calculator" onSubmit={(e) => { e.preventDefault(); go(); }}>
        {mode === "cook" && (
          <>
            {weightCell}
            {methodCell}
            <div className="p-cell" role="group" aria-labelledby="tk-opts">
              <span className="p-lab" id="tk-opts">Options</span>
              <div className="p-checks">
                {canStuff ? (
                  <label className="p-check"><input type="checkbox" checked={stuffed} onChange={(e) => setStuffed(e.target.checked)} />Stuffed</label>
                ) : (
                  <p className="p-hint">No stuffing with this method</p>
                )}
                {canFrozen ? (
                  <label className="p-check"><input type="checkbox" checked={frozen} onChange={(e) => setFrozen(e.target.checked)} />Cooking from frozen</label>
                ) : (
                  <p className="p-hint">Thaw completely first</p>
                )}
              </div>
            </div>
            <div className="p-cell">
              <span className="p-lab">&nbsp;</span>
              {goButton}
            </div>
          </>
        )}

        {mode === "thaw" && (
          <>
            {weightCell}
            <div className="p-cell" role="group" aria-labelledby="tk-thaw">
              <span className="p-lab" id="tk-thaw">Thawing method</span>
              <div className="p-opts">
                {thawMethods.map((m) => (
                  <button
                    key={m.key}
                    type="button"
                    className={`p-opt${thawMethod === m.key ? " p-on" : ""}`}
                    aria-pressed={thawMethod === m.key}
                    onClick={() => setThawMethod(m.key)}
                  >
                    {THAW_SHORT[m.key]}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-cell">
              <span className="p-lab">How</span>
              <p className="p-hint">{thawMethods.find((m) => m.key === thawMethod)!.notes}</p>
            </div>
            <div className="p-cell">
              <span className="p-lab">&nbsp;</span>
              {goButton}
            </div>
          </>
        )}

        {mode === "size" && (
          <>
            <div className="p-cell">
              <label className="p-lab" htmlFor="tk-guests">Guests</label>
              <input className="p-in" id="tk-guests" type="text" inputMode="numeric" value={guestsText} onChange={(e) => setGuestsText(e.target.value)} />
            </div>
            <div className="p-cell" role="group" aria-labelledby="tk-left">
              <span className="p-lab" id="tk-left">Leftovers</span>
              <label className="p-check"><input type="checkbox" checked={leftovers} onChange={(e) => setLeftovers(e.target.checked)} />Yes, 1½ lb per person</label>
              <p className="p-hint">Without leftovers: 1 lb per person (USDA)</p>
            </div>
            <div className="p-cell">
              <span className="p-lab">Buying fresh?</span>
              <p className="p-hint">The USDA says to buy a fresh turkey only 1 to 2 days before you cook it.</p>
            </div>
            <div className="p-cell">
              <span className="p-lab">&nbsp;</span>
              {goButton}
            </div>
          </>
        )}

        {mode === "timeline" && (
          <>
            {weightCell}
            {methodCell}
            <div className="p-cell">
              <label className="p-lab" htmlFor="tk-date">Dinner date</label>
              <input className="p-in p-in-date" id="tk-date" type="date" value={dinnerDate} onChange={(e) => setDinnerDate(e.target.value)} />
              <label className="p-lab" htmlFor="tk-time">Dinner at</label>
              <input className="p-in p-in-time" id="tk-time" type="time" value={dinnerTime} onChange={(e) => setDinnerTime(e.target.value)} />
            </div>
            <div className="p-cell">
              <div className="p-checks">
                {canStuff && (
                  <label className="p-check"><input type="checkbox" checked={stuffed} onChange={(e) => setStuffed(e.target.checked)} />Stuffed</label>
                )}
                <label className="p-check"><input type="checkbox" checked={thawFirst} onChange={(e) => setThawFirst(e.target.checked)} />Frozen now: thaw in the fridge</label>
              </div>
              {goButton}
            </div>
          </>
        )}
      </form>

      <div className="p-res" ref={resRef}>
        {!weightOk && mode !== "size" && <p className="p-warn">Enter the turkey&apos;s weight as a number, for example 16.</p>}

        {mode === "cook" && cook && (
          <>
            <h2 className="p-kicker">
              Your {fmtLb(lbs)}-lb turkey{canStuff ? (stuffed ? ", stuffed" : ", unstuffed") : ""}, {METHOD_PHRASE[method]}
              {canFrozen && frozen ? ", from frozen" : ""}
            </h2>
            {cook.available ? (
              <>
                <p className="p-res-big" aria-live="polite">
                  {cook.atLeast ? "At least " : ""}
                  {formatRange(cook.minMinutes, cook.maxMinutes)}
                </p>
                <p className="p-res-basis">{cook.basis}</p>
                <ul className="p-reads">
                  <Read v={HEAT[method][0]} u={HEAT[method][1]} c={HEAT[method][2]} />
                  <Read v={String(SAFE_TEMP_F)} u="°F" c={`Done (${SAFE_TEMP_C}°C) in the thigh, wing and breast`} />
                  <Read v={String(STAND_MINUTES)} u="min" c="Let it stand before carving" />
                  {feeds && <Read v={String(feeds.standard)} u="people" c={`It feeds, at 1 lb each (${feeds.withLeftovers} with leftovers)`} />}
                </ul>
              </>
            ) : null}
            {cook.warnings.map((w) => (
              <p className="p-warn" key={w}>{w}</p>
            ))}
          </>
        )}

        {mode === "thaw" && thaw && fridge && water && (
          <>
            <h2 className="p-kicker">Thawing a {fmtLb(lbs)}-lb turkey</h2>
            <p className="p-res-big" aria-live="polite">{thaw.available ? thaw.formatted : "Follow your microwave's manual"}</p>
            <p className="p-res-basis">{thaw.basis}</p>
            <ul className="p-reads">
              <Read
                v={fridge.daysLow === fridge.daysHigh ? String(fridge.daysHigh) : `${fridge.daysLow}–${fridge.daysHigh}`}
                u="days"
                c="In the fridge at 40°F (4°C) or below"
              />
              <Read v={frac(water.hoursHigh)} u="h" c="In cold water, changing it every 30 minutes" />
              <Read v="1–2" u="days" c="A fridge-thawed bird keeps this long before cooking" />
              <Read v="2" u="h" c="Never left out longer: no thawing on the counter" />
            </ul>
          </>
        )}

        {mode === "size" && (
          <>
            {size && sizeCook ? (
              <>
                <h2 className="p-kicker">For {guests} {guests === 1 ? "guest" : "guests"}{leftovers ? ", with leftovers" : ""}</h2>
                <p className="p-res-big" aria-live="polite">Buy a {size.weight}-lb turkey</p>
                <p className="p-res-basis">
                  {leftovers ? "1½ lb per person (University of Wyoming Extension)" : "1 lb per person (USDA)"}
                </p>
                <ul className="p-reads">
                  <Read v={String(size.weight)} u="lb" c="Whole turkey to buy" />
                  <Read v={(size.weight / LB_PER_KG).toFixed(1)} u="kg" c="The same in kilograms" />
                  <Read v={leftovers ? "1½" : "1"} u="lb" c="Per person" />
                  {sizeCook.available && (
                    <Read v={`${frac(sizeCook.minMinutes / 60)}–${frac(sizeCook.maxMinutes / 60)}`} u="h" c="To roast it unstuffed at 325°F" />
                  )}
                </ul>
                {size.note && <p className="p-warn">{size.note}</p>}
              </>
            ) : (
              <p className="p-warn">Enter the number of guests, for example 10.</p>
            )}
          </>
        )}

        {mode === "timeline" && timeline && (
          <>
            <h2 className="p-kicker">
              For dinner at {timeline.serve.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })} on{" "}
              {timeline.serve.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </h2>
            {timeline.steps.length > 0 ? (
              <>
                <ol className="p-steps p-steps-n" style={{ "--n": timeline.steps.length } as React.CSSProperties}>
                  {timeline.steps.map((s, i) => (
                    <li className="p-step" key={s.label}>
                      <span className={`p-step-m${i === timeline.steps.length - 1 ? " p-step-x" : ""}`} />
                      <span className="p-step-t">{s.time}</span>
                      <span className="p-step-c">{s.label}</span>
                    </li>
                  ))}
                </ol>
                <p className="p-res-basis" style={{ marginTop: 18 }}>
                  Built from {timeline.cook.basis}: start at the long end of the range, check from the short end, and let the
                  turkey stand {STAND_MINUTES} minutes before carving.
                </p>
              </>
            ) : (
              timeline.cook.warnings.map((w) => <p className="p-warn" key={w}>{w}</p>)
            )}
          </>
        )}

        <p className="p-note">
          Food safety: a whole turkey is safe at {SAFE_TEMP_F}°F ({SAFE_TEMP_C}°C) on a food thermometer in the innermost part of the thigh
          and wing and the thickest part of the breast. Times are approximate.
        </p>
      </div>
    </div>
  );
}
