"use client";

import { useState, useMemo, useCallback } from "react";
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
import { StatCard, InsightCard, ComparisonBarChart, ComparisonTable, CHART_COLORS } from "@/components/charts";

type WeightUnit = "lbs" | "kg";
type CalculatorMode = "cook" | "thaw" | "recommend" | "timeline";

const CHECK_SPOTS = "the innermost part of the thigh and wing and the thickest part of the breast";

// Fourth Thursday of November, this year or next if it has passed.
function nextThanksgiving(): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const forYear = (y: number) => {
    const first = new Date(y, 10, 1);
    const offset = (4 - first.getDay() + 7) % 7;
    return new Date(y, 10, 1 + offset + 21);
  };
  let t = forYear(now.getFullYear());
  if (t < today) t = forYear(now.getFullYear() + 1);
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}

// "16" for whole pounds, "15.4" otherwise.
function fmtLb(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

// Lower-case only the first letter, so "Oven roast (325°F)" keeps its °F.
function lowerFirst(s: string): string {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

function WeightInput({
  weight,
  unit,
  onWeight,
  onUnit,
}: {
  weight: number;
  unit: WeightUnit;
  onWeight: (n: number) => void;
  onUnit: (u: WeightUnit) => void;
}) {
  return (
    <div>
      <label htmlFor="turkey-weight" className="block text-sm font-medium text-gray-700 mb-2">
        Turkey weight
      </label>
      <div className="flex gap-2">
        <input
          id="turkey-weight"
          type="number"
          value={weight}
          onChange={(e) => onWeight(Number(e.target.value))}
          className="input-field flex-1"
          min={1}
          max={40}
          step={0.5}
        />
        <div className="flex rounded-lg overflow-hidden border border-gray-200" role="group" aria-label="Weight unit">
          {(["lbs", "kg"] as WeightUnit[]).map((u) => (
            <button
              key={u}
              type="button"
              aria-pressed={unit === u}
              onClick={() => onUnit(u)}
              className={`px-3 py-2 text-sm font-medium ${unit === u ? "bg-coral text-white" : "bg-white text-gray-700"}`}
            >
              {u}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TurkeyCookingCalculator() {
  const [mode, setMode] = useState<CalculatorMode>("cook");
  const [weight, setWeight] = useState<number>(16);
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("lbs");
  const [method, setMethod] = useState<CookingMethod>("roasted");
  const [isStuffed, setIsStuffed] = useState<boolean>(false);
  const [isFrozen, setIsFrozen] = useState<boolean>(false);
  const [thawFirst, setThawFirst] = useState<boolean>(false);
  const [thawMethod, setThawMethod] = useState<ThawMethod>("fridge");
  const [guestCount, setGuestCount] = useState<number>(10);
  const [wantLeftovers, setWantLeftovers] = useState<boolean>(true);
  const [servingTime, setServingTime] = useState<string>("15:00");
  const [servingDate, setServingDate] = useState<string>(nextThanksgiving);
  const [showResults, setShowResults] = useState<boolean>(false);

  const resetResults = useCallback(() => setShowResults(false), []);
  const onWeight = (n: number) => { setWeight(n); resetResults(); };
  const onUnit = (u: WeightUnit) => { setWeightUnit(u); resetResults(); };

  const weightInLbs = weightUnit === "kg" ? weight * LB_PER_KG : weight;
  const currentMethod = cookingMethods.find((m) => m.key === method) ?? cookingMethods[0];

  const cookResult = useMemo(
    () => calculateCookTime(weightInLbs, method, isStuffed, isFrozen),
    [weightInLbs, method, isStuffed, isFrozen]
  );
  const thawResult = useMemo(() => calculateThawTime(weightInLbs, thawMethod), [weightInLbs, thawMethod]);
  const servings = useMemo(() => getServings(weightInLbs), [weightInLbs]);
  const recommendation = useMemo(() => recommendTurkeySize(guestCount, wantLeftovers), [guestCount, wantLeftovers]);
  const recommendedCook = useMemo(
    () => calculateCookTime(recommendation.weight, "roasted", false, false),
    [recommendation.weight]
  );
  const timeline = useMemo(() => {
    const [hours, minutes] = servingTime.split(":").map(Number);
    const [y, mo, d] = servingDate.split("-").map(Number);
    const dateObj = new Date(y, (mo || 1) - 1, d || 1, hours || 0, minutes || 0, 0, 0);
    return generateTimeline(dateObj, weightInLbs, method, isStuffed, thawFirst);
  }, [servingDate, servingTime, weightInLbs, method, isStuffed, thawFirst]);

  const methodButtons = (
    <div>
      <span className="block text-sm font-medium text-gray-700 mb-2" id="method-label">Cooking method</span>
      <div className="grid grid-cols-2 gap-2" role="group" aria-labelledby="method-label">
        {cookingMethods.map((m) => (
          <button
            key={m.key}
            type="button"
            aria-pressed={method === m.key}
            onClick={() => {
              setMethod(m.key);
              if (!m.allowsStuffed) setIsStuffed(false);
              if (!m.allowsFrozen) setIsFrozen(false);
              resetResults();
            }}
            className={`px-4 py-3 rounded-lg text-left transition-colors ${
              method === m.key ? "bg-coral text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span className="block text-sm font-medium">{m.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="calculator-card p-6 md:p-8">
      <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Calculator mode">
        {[
          { key: "cook", label: "Cook time" },
          { key: "thaw", label: "Thaw time" },
          { key: "recommend", label: "Turkey size" },
          { key: "timeline", label: "Timeline" },
        ].map((m) => (
          <button
            key={m.key}
            type="button"
            role="tab"
            aria-selected={mode === m.key}
            onClick={() => { setMode(m.key as CalculatorMode); resetResults(); }}
            className={`flex-1 min-w-[80px] px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === m.key ? "bg-coral text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {mode === "cook" && (
        <div className="space-y-6">
          <WeightInput weight={weight} unit={weightUnit} onWeight={onWeight} onUnit={onUnit} />
          {methodButtons}
          <div className="flex flex-wrap gap-4">
            {currentMethod.allowsStuffed && (
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={isStuffed} onChange={(e) => { setIsStuffed(e.target.checked); resetResults(); }} className="w-4 h-4 text-coral rounded focus:ring-coral" />
                <span className="text-sm text-gray-700">Stuffed</span>
              </label>
            )}
            {currentMethod.allowsFrozen && (
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={isFrozen} onChange={(e) => { setIsFrozen(e.target.checked); resetResults(); }} className="w-4 h-4 text-coral rounded focus:ring-coral" />
                <span className="text-sm text-gray-700">Cooking from frozen</span>
              </label>
            )}
          </div>

          <button type="button" onClick={() => setShowResults(true)} className="btn-primary w-full sm:w-auto">
            Calculate cook time
          </button>

          {showResults && (
            <div className="results-panel space-y-6">
              <h3 className="font-serif text-lg font-semibold text-gray-900">
                {fmtLb(weightInLbs)} lb turkey, {lowerFirst(currentMethod.label)}
                {isStuffed ? ", stuffed" : ""}
                {isFrozen ? ", from frozen" : ""}
              </h3>

              {cookResult.available ? (
                <>
                  <p className="text-2xl font-bold text-gray-900">
                    {cookResult.atLeast ? "At least " : ""}
                    {formatRange(cookResult.minMinutes, cookResult.maxMinutes)}
                    <span className="block text-sm font-normal text-gray-600 mt-1">{cookResult.basis}</span>
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <StatCard label="Heat" value={cookResult.heatLabel} color="amber" />
                    <StatCard label="Done at" value={`${SAFE_TEMP_F}°F`} sublabel={`${SAFE_TEMP_C}°C, thigh, wing and breast`} color="green" />
                    <StatCard label="Stand before carving" value={`${STAND_MINUTES} min`} color="blue" />
                    <StatCard label="Feeds" value={`${servings.standard} people`} sublabel="At 1 lb each" color="purple" />
                    <StatCard label="With leftovers" value={`${servings.withLeftovers} people`} sublabel="At 1½ lb each" color="gray" />
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Step by step</h4>
                    <ol className="space-y-3">
                      {[
                        { label: method === "roasted" ? "Heat the oven" : "Get the heat steady", desc: cookResult.heatLabel },
                        { label: "Cook", desc: `${cookResult.atLeast ? "At least " : ""}${formatRange(cookResult.minMinutes, cookResult.maxMinutes)}` },
                        { label: "Check the temperature", desc: `From the low end of the range: ${SAFE_TEMP_F}°F in ${CHECK_SPOTS}.` },
                        { label: "Let it stand", desc: `${STAND_MINUTES} minutes before carving.` },
                      ].map((item, i) => (
                        <li key={item.label} className="flex gap-3">
                          <span className="flex-shrink-0 w-7 h-7 bg-coral/20 rounded-full flex items-center justify-center text-sm font-bold text-coral">{i + 1}</span>
                          <span className="text-sm text-gray-700"><strong className="text-gray-900">{item.label}:</strong> {item.desc}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </>
              ) : (
                <p className="text-gray-700">No USDA time for this combination. Use a food thermometer: {SAFE_TEMP_F}°F in {CHECK_SPOTS}.</p>
              )}

              {cookResult.warnings.length > 0 && (
                <div className="space-y-2">
                  {cookResult.warnings.map((warning) => (
                    <InsightCard key={warning} type="warning" title="Note">
                      {warning}
                    </InsightCard>
                  ))}
                </div>
              )}
              <InsightCard type="tip" title="How this method works">
                {currentMethod.notes}
              </InsightCard>
            </div>
          )}
        </div>
      )}

      {mode === "thaw" && (
        <div className="space-y-6">
          <WeightInput weight={weight} unit={weightUnit} onWeight={onWeight} onUnit={onUnit} />
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-2" id="thaw-label">Thawing method</span>
            <div className="space-y-2" role="group" aria-labelledby="thaw-label">
              {thawMethods.map((m) => (
                <button
                  key={m.key}
                  type="button"
                  aria-pressed={thawMethod === m.key}
                  onClick={() => { setThawMethod(m.key); resetResults(); }}
                  className={`w-full px-4 py-3 rounded-lg text-left transition-colors ${
                    thawMethod === m.key ? "bg-coral text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span className="block text-sm font-medium">{m.label}</span>
                  <span className={`block text-xs ${thawMethod === m.key ? "text-white/80" : "text-gray-500"}`}>{m.notes}</span>
                </button>
              ))}
            </div>
          </div>

          <button type="button" onClick={() => setShowResults(true)} className="btn-primary w-full sm:w-auto">
            Calculate thaw time
          </button>

          {showResults && (
            <div className="results-panel space-y-6">
              <h3 className="font-serif text-lg font-semibold text-gray-900">Thawing a {fmtLb(weightInLbs)} lb turkey</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <StatCard label="Thaw time" value={thawResult.formatted} sublabel={thawResult.basis} color="coral" />
                <StatCard label="Method" value={thawMethods.find((m) => m.key === thawMethod)?.label || thawMethod} color="blue" />
                {thawMethod === "cold_water" && <StatCard label="Change the water" value="Every 30 min" color="amber" />}
              </div>

              {thawMethod !== "microwave" && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Fridge vs. cold water</h4>
                  <ComparisonBarChart
                    data={[
                      { name: "Refrigerator", value: Math.round(calculateThawTime(weightInLbs, "fridge").hoursHigh), fill: thawMethod === "fridge" ? CHART_COLORS.primary : "#9CA3AF" },
                      { name: "Cold water", value: Math.round(calculateThawTime(weightInLbs, "cold_water").hoursHigh), fill: thawMethod === "cold_water" ? CHART_COLORS.primary : "#9CA3AF" },
                    ]}
                    height={90}
                    unit=" hours"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InsightCard type="warning" title="Food safety">
                  Don&apos;t thaw on the counter. The USDA says a package left out more than 2 hours isn&apos;t at a safe temperature: the outer layer sits in the 40–140°F (4–60°C) danger zone.
                </InsightCard>
                <InsightCard type="tip" title="After thawing">
                  {thawMethod === "fridge"
                    ? "A turkey thawed in the fridge can stay there 1 or 2 days before cooking."
                    : "Cook it right away, and don't refreeze it raw."}
                </InsightCard>
              </div>
            </div>
          )}
        </div>
      )}

      {mode === "recommend" && (
        <div className="space-y-6">
          <div>
            <label htmlFor="guest-count" className="block text-sm font-medium text-gray-700 mb-2">Number of guests</label>
            <input id="guest-count" type="number" value={guestCount} onChange={(e) => { setGuestCount(Number(e.target.value)); resetResults(); }} className="input-field w-full" min={1} max={60} />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={wantLeftovers} onChange={(e) => { setWantLeftovers(e.target.checked); resetResults(); }} className="w-4 h-4 text-coral rounded focus:ring-coral" />
            <span className="text-sm text-gray-700">I want leftovers (1½ lb per person instead of 1 lb)</span>
          </label>
          <button type="button" onClick={() => setShowResults(true)} className="btn-primary w-full sm:w-auto">
            Get my turkey size
          </button>

          {showResults && (
            <div className="results-panel space-y-6">
              <h3 className="font-serif text-lg font-semibold text-gray-900">Turkey for {guestCount} guests</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <StatCard label="Buy" value={`${recommendation.weight} lb`} sublabel={`${(recommendation.weight / LB_PER_KG).toFixed(1)} kg`} color="coral" />
                <StatCard label="Per person" value={wantLeftovers ? "1½ lb" : "1 lb"} sublabel={wantLeftovers ? "With leftovers" : "USDA amount"} color="green" />
                <StatCard
                  label="Roast time"
                  value={recommendedCook.available ? formatRange(recommendedCook.minMinutes, recommendedCook.maxMinutes) : "Past USDA table"}
                  sublabel="Unstuffed, 325°F (163°C)"
                  color="amber"
                />
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Quick sizes</h4>
                <ComparisonTable
                  headers={["Guests", "1 lb each", "1½ lb each"]}
                  rows={[6, 8, 10, 12, 16].map((g) => ({
                    label: `${g} guests`,
                    values: [`${g} lb`, `${Math.ceil(g * 1.5)} lb`],
                    highlight: g === guestCount,
                  }))}
                />
              </div>
              {recommendation.note && (
                <InsightCard type="warning" title="Note">
                  {recommendation.note}
                </InsightCard>
              )}
              <InsightCard type="tip" title="Buying fresh?">
                The USDA says to buy a fresh turkey only 1 to 2 days before you cook it.
              </InsightCard>
            </div>
          )}
        </div>
      )}

      {mode === "timeline" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <WeightInput weight={weight} unit={weightUnit} onWeight={onWeight} onUnit={onUnit} />
            <div>
              <label htmlFor="timeline-method" className="block text-sm font-medium text-gray-700 mb-2">Cooking method</label>
              <select
                id="timeline-method"
                value={method}
                onChange={(e) => {
                  const next = e.target.value as CookingMethod;
                  setMethod(next);
                  if (!cookingMethods.find((m) => m.key === next)?.allowsStuffed) setIsStuffed(false);
                  resetResults();
                }}
                className="select-field w-full"
              >
                {cookingMethods.map((m) => (
                  <option key={m.key} value={m.key}>{m.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="serving-date" className="block text-sm font-medium text-gray-700 mb-2">Dinner date</label>
              <input id="serving-date" type="date" value={servingDate} onChange={(e) => { setServingDate(e.target.value); resetResults(); }} className="input-field w-full" />
            </div>
            <div>
              <label htmlFor="serving-time" className="block text-sm font-medium text-gray-700 mb-2">Dinner time</label>
              <input id="serving-time" type="time" value={servingTime} onChange={(e) => { setServingTime(e.target.value); resetResults(); }} className="input-field w-full" />
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            {currentMethod.allowsStuffed && (
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={isStuffed} onChange={(e) => { setIsStuffed(e.target.checked); resetResults(); }} className="w-4 h-4 text-coral rounded focus:ring-coral" />
                <span className="text-sm text-gray-700">Stuffed</span>
              </label>
            )}
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={thawFirst} onChange={(e) => { setThawFirst(e.target.checked); resetResults(); }} className="w-4 h-4 text-coral rounded focus:ring-coral" />
              <span className="text-sm text-gray-700">It&apos;s frozen now (thaw in the fridge first)</span>
            </label>
          </div>
          <button type="button" onClick={() => setShowResults(true)} className="btn-primary w-full sm:w-auto">
            Build my timeline
          </button>

          {showResults && (
            <div className="results-panel space-y-6">
              <h3 className="font-serif text-lg font-semibold text-gray-900">Your turkey timeline</h3>
              {timeline.steps.length > 0 ? (
                <ol className="bg-gray-50 rounded-lg p-4 space-y-4">
                  {timeline.steps.map((step, idx) => {
                    const bg = step.kind === "serve" ? "bg-green-500" : step.kind === "rest" ? "bg-amber-500" : step.kind === "thaw" ? "bg-blue-500" : "bg-coral";
                    return (
                      <li key={step.label} className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                        <span className={`flex-shrink-0 w-10 h-10 ${bg} rounded-full flex items-center justify-center text-white font-bold`}>{idx + 1}</span>
                        <span className="flex-1 min-w-0">
                          <span className="block font-semibold text-gray-900">{step.label}</span>
                          <span className="block text-sm font-medium text-gray-700">{step.time}</span>
                          {step.daysBefore !== undefined && (
                            <span className="block text-xs text-gray-500 mt-1">{step.daysBefore} days in the fridge, the high end of the USDA range for this weight</span>
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              ) : (
                <p className="text-gray-700">No USDA time for this combination, so there&apos;s no timeline to build.</p>
              )}
              {timeline.cook.warnings.map((w) => (
                <InsightCard key={w} type="warning" title="Note">{w}</InsightCard>
              ))}
              {timeline.steps.length > 0 && (
                <p className="text-sm text-gray-600">
                  Built from {timeline.cook.basis}: start at the high end of the range, check from the low end, and let the turkey stand {STAND_MINUTES} minutes before carving.
                </p>
              )}
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Food safety:</strong> a whole turkey is safe at {SAFE_TEMP_F}°F ({SAFE_TEMP_C}°C) measured with a food thermometer in {CHECK_SPOTS}. Times are approximate.
        </p>
      </div>
    </div>
  );
}
