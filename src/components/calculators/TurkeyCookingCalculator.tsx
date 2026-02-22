"use client";

import { useState, useMemo, useCallback } from "react";
import {
  CookingMethod,
  ThawMethod,
  cookingMethods,
  thawMethods,
  calculateCookTime,
  calculateThawTime,
  getRestTime,
  getServings,
  recommendTurkeySize,
  generateTimeline,
  formatCookTime,
} from "@/data/turkey-data";
import {
  StatCard,
  InsightCard,
  ComparisonBarChart,
  ProgressRing,
  ComparisonTable,
  CHART_COLORS,
} from "@/components/charts";

type WeightUnit = "lbs" | "kg";
type CalculatorMode = "cook" | "thaw" | "recommend" | "timeline";

function fahrenheitToCelsius(f: number): number {
  return Math.round(((f - 32) * 5) / 9);
}

export default function TurkeyCookingCalculator() {
  const [mode, setMode] = useState<CalculatorMode>("cook");
  const [weight, setWeight] = useState<number>(14);
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("lbs");
  const [method, setMethod] = useState<CookingMethod>("roasted");
  const [isStuffed, setIsStuffed] = useState<boolean>(false);
  const [isFrozen, setIsFrozen] = useState<boolean>(false);
  const [thawMethod, setThawMethod] = useState<ThawMethod>("fridge");
  const [guestCount, setGuestCount] = useState<number>(10);
  const [wantLeftovers, setWantLeftovers] = useState<boolean>(true);
  const [servingTime, setServingTime] = useState<string>("14:00");
  const [servingDate, setServingDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  // Show results state
  const [showResults, setShowResults] = useState<boolean>(false);

  // Reset results when inputs change
  const resetResults = useCallback(() => setShowResults(false), []);

  // Convert weight to lbs for calculations
  const weightInLbs = weightUnit === "kg" ? weight * 2.205 : weight;

  // Get current method info
  const currentMethod = cookingMethods.find((m) => m.key === method);

  // Calculate cooking time
  const cookResult = useMemo(() => {
    return calculateCookTime(weightInLbs, method, isStuffed, isFrozen);
  }, [weightInLbs, method, isStuffed, isFrozen]);

  // Calculate thaw time
  const thawResult = useMemo(() => {
    return calculateThawTime(weightInLbs, thawMethod);
  }, [weightInLbs, thawMethod]);

  // Get rest time
  const restTime = useMemo(() => {
    return getRestTime(weightInLbs);
  }, [weightInLbs]);

  // Get servings
  const servings = useMemo(() => {
    return getServings(weightInLbs);
  }, [weightInLbs]);

  // Recommend turkey size
  const recommendation = useMemo(() => {
    return recommendTurkeySize(guestCount, wantLeftovers);
  }, [guestCount, wantLeftovers]);

  // Generate timeline
  const timeline = useMemo(() => {
    const [hours, minutes] = servingTime.split(":").map(Number);
    const dateObj = new Date(servingDate);
    dateObj.setHours(hours, minutes, 0, 0);
    return generateTimeline(dateObj, weightInLbs, method, isStuffed, isFrozen);
  }, [servingDate, servingTime, weightInLbs, method, isStuffed, isFrozen]);

  return (
    <div className="calculator-card p-6 md:p-8">
      {/* Mode Toggle */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { key: "cook", label: "Cook Time" },
          { key: "thaw", label: "Thaw Time" },
          { key: "recommend", label: "Turkey Size" },
          { key: "timeline", label: "Timeline" },
        ].map((m) => (
          <button
            key={m.key}
            onClick={() => { setMode(m.key as CalculatorMode); resetResults(); }}
            className={`flex-1 min-w-[80px] px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === m.key
                ? "bg-coral text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Cook Time Calculator */}
      {mode === "cook" && (
        <div className="space-y-6">
          {/* Weight Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Turkey Weight
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={weight}
                onChange={(e) => { setWeight(Number(e.target.value)); resetResults(); }}
                className="input-field flex-1"
                min={4}
                max={30}
                step={0.5}
              />
              <div className="flex rounded-lg overflow-hidden border border-gray-200">
                <button
                  onClick={() => { setWeightUnit("lbs"); resetResults(); }}
                  className={`px-3 py-2 text-sm font-medium ${
                    weightUnit === "lbs"
                      ? "bg-coral text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  lbs
                </button>
                <button
                  onClick={() => { setWeightUnit("kg"); resetResults(); }}
                  className={`px-3 py-2 text-sm font-medium ${
                    weightUnit === "kg"
                      ? "bg-coral text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  kg
                </button>
              </div>
            </div>
          </div>

          {/* Cooking Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cooking Method
            </label>
            <div className="grid grid-cols-2 gap-2">
              {cookingMethods.map((m) => (
                <button
                  key={m.key}
                  onClick={() => { setMethod(m.key); resetResults(); }}
                  className={`px-4 py-3 rounded-lg text-left transition-colors ${
                    method === m.key
                      ? "bg-coral text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span className="block text-sm font-medium">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="flex flex-wrap gap-4">
            {currentMethod?.allowsStuffed && (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isStuffed}
                  onChange={(e) => { setIsStuffed(e.target.checked); resetResults(); }}
                  className="w-4 h-4 text-coral rounded focus:ring-coral"
                />
                <span className="text-sm text-gray-700">Stuffed</span>
              </label>
            )}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isFrozen}
                onChange={(e) => { setIsFrozen(e.target.checked); resetResults(); }}
                className="w-4 h-4 text-coral rounded focus:ring-coral"
              />
              <span className="text-sm text-gray-700">Cooking from frozen</span>
            </label>
          </div>

          <button
            onClick={() => setShowResults(true)}
            className="btn-primary w-full sm:w-auto"
          >
            Calculate Cook Time
          </button>

          {/* Results */}
          {showResults && (
          <div className="results-panel space-y-6">
            <h3 className="font-serif text-lg font-semibold text-gray-900">
              Cooking Instructions for {weightInLbs.toFixed(1)} lb Turkey
            </h3>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <StatCard
                label="Cook Time"
                value={cookResult.minMinutes !== cookResult.maxMinutes
                  ? `${formatCookTime(cookResult.minMinutes)} – ${formatCookTime(cookResult.maxMinutes)}`
                  : formatCookTime(cookResult.minMinutes)}
                color="coral"
              />
              <StatCard
                label="Oven Temp"
                value={`${cookResult.tempF}°F`}
                sublabel={`${cookResult.tempC}°C`}
                color="amber"
              />
              <StatCard
                label="Target Internal"
                value="165°F"
                sublabel="74°C in thickest part"
                color="green"
              />
              <StatCard
                label="Rest Time"
                value={`${restTime.min}–${restTime.max} min`}
                sublabel="Tent with foil"
                color="blue"
              />
              <StatCard
                label="Serves"
                value={`${servings.standard} people`}
                sublabel="Standard portions"
                color="purple"
              />
              <StatCard
                label="With Leftovers"
                value={`${servings.withLeftovers} people`}
                sublabel="Extra for sandwiches"
                color="gray"
              />
            </div>

            {/* Cooking Timeline */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Cooking Timeline</h4>
              <div className="space-y-3">
                {[
                  { step: 1, label: "Prep & Season", time: "30–60 min before", desc: "Remove from fridge, pat dry, season generously" },
                  { step: 2, label: "Preheat Oven", time: "Start preheating", desc: `Set oven to ${cookResult.tempF}°F (${cookResult.tempC}°C)` },
                  { step: 3, label: "Roast Turkey", time: formatCookTime(cookResult.minMinutes) + (cookResult.minMinutes !== cookResult.maxMinutes ? ` – ${formatCookTime(cookResult.maxMinutes)}` : ""), desc: isStuffed ? "Stuffed turkey - add extra time" : isFrozen ? "From frozen - requires longer cooking" : "Baste every 45 minutes" },
                  { step: 4, label: "Check Temperature", time: "Near end of cook time", desc: "Insert thermometer into thickest part of thigh" },
                  { step: 5, label: "Rest Before Carving", time: `${restTime.min}–${restTime.max} min`, desc: "Tent loosely with foil, juices redistribute" },
                ].map((item) => (
                  <div key={item.step} className="flex gap-3">
                    <div className="flex-shrink-0 w-7 h-7 bg-coral/20 rounded-full flex items-center justify-center text-sm font-bold text-coral">
                      {item.step}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium text-gray-900">{item.label}</span>
                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">{item.time}</span>
                      </div>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Serving Size Visualization */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Serving Guide</h4>
              <ComparisonBarChart
                data={[
                  { name: "Standard (1 lb/person)", value: servings.standard, fill: CHART_COLORS.primary },
                  { name: "With Leftovers (1.5 lb)", value: servings.withLeftovers, fill: CHART_COLORS.secondary },
                ]}
                height={80}
                unit=" guests"
              />
              <p className="text-xs text-gray-500 mt-2 text-center">
                A {weightInLbs.toFixed(1)} lb turkey yields approximately {Math.round(weightInLbs * 0.7)} lbs of edible meat
              </p>
            </div>

            {/* Warnings */}
            {cookResult.warnings.length > 0 && (
              <div className="space-y-2">
                {cookResult.warnings.map((warning, idx) => (
                  <InsightCard key={idx} type="warning" title="Important">
                    {warning}
                  </InsightCard>
                ))}
              </div>
            )}

            {/* Tips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentMethod?.notes && (
                <InsightCard type="tip" title="Cooking Tip">
                  {currentMethod.notes}
                </InsightCard>
              )}
              <InsightCard type="info" title="Temperature Check">
                Check temperature in multiple spots. The thigh should read 165°F, and breast meat is best at 160°F.
              </InsightCard>
            </div>
          </div>
          )}
        </div>
      )}

      {/* Thaw Time Calculator */}
      {mode === "thaw" && (
        <div className="space-y-6">
          {/* Weight Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Turkey Weight
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={weight}
                onChange={(e) => { setWeight(Number(e.target.value)); resetResults(); }}
                className="input-field flex-1"
                min={4}
                max={30}
                step={0.5}
              />
              <div className="flex rounded-lg overflow-hidden border border-gray-200">
                <button
                  onClick={() => { setWeightUnit("lbs"); resetResults(); }}
                  className={`px-3 py-2 text-sm font-medium ${
                    weightUnit === "lbs"
                      ? "bg-coral text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  lbs
                </button>
                <button
                  onClick={() => { setWeightUnit("kg"); resetResults(); }}
                  className={`px-3 py-2 text-sm font-medium ${
                    weightUnit === "kg"
                      ? "bg-coral text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  kg
                </button>
              </div>
            </div>
          </div>

          {/* Thaw Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thawing Method
            </label>
            <div className="space-y-2">
              {thawMethods.map((m) => (
                <button
                  key={m.key}
                  onClick={() => { setThawMethod(m.key); resetResults(); }}
                  className={`w-full px-4 py-3 rounded-lg text-left transition-colors ${
                    thawMethod === m.key
                      ? "bg-coral text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span className="block text-sm font-medium">{m.label}</span>
                  <span
                    className={`block text-xs ${
                      thawMethod === m.key ? "text-white/80" : "text-gray-500"
                    }`}
                  >
                    {m.notes}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowResults(true)}
            className="btn-primary w-full sm:w-auto"
          >
            Calculate Thaw Time
          </button>

          {/* Results */}
          {showResults && (
          <div className="results-panel space-y-6">
            <h3 className="font-serif text-lg font-semibold text-gray-900">
              Thawing Time for {weightInLbs.toFixed(1)} lb Turkey
            </h3>

            {/* Main Result */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <StatCard
                label="Total Thaw Time"
                value={thawResult.formatted}
                color="coral"
              />
              <StatCard
                label="Method"
                value={thawMethods.find(m => m.key === thawMethod)?.label || thawMethod}
                color="blue"
              />
              {thawMethod === "fridge" && (
                <StatCard
                  label="Start Before"
                  value={`${Math.ceil(thawResult.days)} days`}
                  sublabel="Before cooking day"
                  color="amber"
                />
              )}
              {thawMethod === "cold_water" && (
                <StatCard
                  label="Water Changes"
                  value={`Every 30 min`}
                  sublabel="Keep water cold"
                  color="amber"
                />
              )}
            </div>

            {/* Thaw Method Comparison */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Thaw Method Comparison</h4>
              <ComparisonBarChart
                data={[
                  {
                    name: "Refrigerator",
                    value: Math.round(calculateThawTime(weightInLbs, "fridge").hours),
                    fill: thawMethod === "fridge" ? CHART_COLORS.primary : "#9CA3AF"
                  },
                  {
                    name: "Cold Water",
                    value: Math.round(calculateThawTime(weightInLbs, "cold_water").hours),
                    fill: thawMethod === "cold_water" ? CHART_COLORS.primary : "#9CA3AF"
                  },
                  {
                    name: "Microwave",
                    value: Math.round(calculateThawTime(weightInLbs, "microwave").hours * 60) / 60 || 1,
                    fill: thawMethod === "microwave" ? CHART_COLORS.primary : "#9CA3AF"
                  },
                ]}
                height={100}
                unit=" hours"
              />
            </div>

            {/* Timeline Visualization */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Thawing Timeline</h4>
              <div className="space-y-2">
                {thawMethod === "fridge" && (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm"><strong>Day 1:</strong> Place turkey on tray in fridge (40°F or below)</span>
                    </div>
                    {thawResult.days > 2 && (
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                        <span className="text-sm"><strong>Days 2–{Math.ceil(thawResult.days) - 1}:</strong> Turkey continues to thaw slowly</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm"><strong>Day {Math.ceil(thawResult.days)}:</strong> Turkey fully thawed, ready to cook</span>
                    </div>
                  </>
                )}
                {thawMethod === "cold_water" && (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm"><strong>Start:</strong> Submerge wrapped turkey in cold water</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                      <span className="text-sm"><strong>Every 30 min:</strong> Change water to keep it cold</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm"><strong>After {thawResult.formatted}:</strong> Turkey is ready to cook immediately</span>
                    </div>
                  </>
                )}
                {thawMethod === "microwave" && (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <span className="text-sm"><strong>Note:</strong> Only for small turkeys that fit in your microwave</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm"><strong>Cook immediately</strong> after microwave thawing</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Safety Tips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InsightCard type="warning" title="Food Safety">
                Never thaw turkey at room temperature. Bacteria grow rapidly between 40°F and 140°F.
              </InsightCard>
              <InsightCard type="tip" title="Pro Tip">
                {thawMethod === "fridge"
                  ? "A thawed turkey can stay in the fridge for 1-2 additional days before cooking."
                  : thawMethod === "cold_water"
                  ? "Keep the turkey in its original packaging to prevent water absorption."
                  : "Cook immediately after microwave thawing to prevent bacterial growth."}
              </InsightCard>
            </div>
          </div>
          )}
        </div>
      )}

      {/* Recommend Size Calculator */}
      {mode === "recommend" && (
        <div className="space-y-6">
          {/* Guest Count */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Guests
            </label>
            <input
              type="number"
              value={guestCount}
              onChange={(e) => { setGuestCount(Number(e.target.value)); resetResults(); }}
              className="input-field w-full"
              min={2}
              max={50}
            />
          </div>

          {/* Leftovers Toggle */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={wantLeftovers}
                onChange={(e) => { setWantLeftovers(e.target.checked); resetResults(); }}
                className="w-4 h-4 text-coral rounded focus:ring-coral"
              />
              <span className="text-sm text-gray-700">
                I want leftovers (1.5 lbs per person instead of 1 lb)
              </span>
            </label>
          </div>

          <button
            onClick={() => setShowResults(true)}
            className="btn-primary w-full sm:w-auto"
          >
            Get Recommendation
          </button>

          {/* Results */}
          {showResults && (
          <div className="results-panel space-y-6">
            <h3 className="font-serif text-lg font-semibold text-gray-900">
              Recommended Turkey for {guestCount} Guests
            </h3>

            {/* Main Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <StatCard
                label="Turkey Size"
                value={`${recommendation.weight} lbs`}
                sublabel={`${Math.round(recommendation.weight / 2.205)} kg`}
                color="coral"
              />
              <StatCard
                label="Guests"
                value={guestCount.toString()}
                sublabel={wantLeftovers ? "With leftovers" : "Standard portions"}
                color="blue"
              />
              <StatCard
                label="Per Person"
                value={wantLeftovers ? "1.5 lbs" : "1 lb"}
                sublabel="Raw weight"
                color="green"
              />
              <StatCard
                label="Edible Meat"
                value={`~${Math.round(recommendation.weight * 0.7)} lbs`}
                sublabel="After cooking"
                color="amber"
              />
            </div>

            {/* Visual Progress */}
            <div className="flex justify-center">
              <ProgressRing
                value={guestCount}
                max={Math.max(guestCount, recommendation.weight)}
                size={140}
                color={CHART_COLORS.primary}
                label={`${recommendation.weight} lb turkey`}
                sublabel={`for ${guestCount} guests`}
              />
            </div>

            {/* Size Reference Table */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Turkey Size Reference</h4>
              <ComparisonTable
                headers={["Serves", "Standard", "With Leftovers"]}
                rows={[
                  { label: "6–8 guests", values: ["8–10 lbs", "10–12 lbs"], highlight: guestCount >= 6 && guestCount <= 8 },
                  { label: "10–12 guests", values: ["12–14 lbs", "14–16 lbs"], highlight: guestCount >= 10 && guestCount <= 12 },
                  { label: "14–16 guests", values: ["16–18 lbs", "18–20 lbs"], highlight: guestCount >= 14 && guestCount <= 16 },
                  { label: "18–20 guests", values: ["20–22 lbs", "22–24 lbs"], highlight: guestCount >= 18 && guestCount <= 20 },
                  { label: "20+ guests", values: ["Two turkeys", "recommended"], highlight: guestCount > 20 },
                ]}
              />
            </div>

            {/* Shopping Tips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {recommendation.note && (
                <InsightCard type="warning" title="Note">
                  {recommendation.note}
                </InsightCard>
              )}
              <InsightCard type="tip" title="Shopping Tip">
                Order your turkey 1-2 weeks in advance, especially for specific sizes. Fresh turkeys need to be picked up 1-2 days before cooking.
              </InsightCard>
              <InsightCard type="info" title="Two Turkeys?">
                For 20+ guests, consider two smaller turkeys (12-14 lbs each). They cook faster and are easier to handle.
              </InsightCard>
            </div>

            {/* Quick Estimate */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Estimated Cook Time</h4>
              <p className="text-sm text-gray-600">
                A {recommendation.weight} lb unstuffed turkey will take approximately{" "}
                <strong>{formatCookTime(calculateCookTime(recommendation.weight, "roasted", false, false).minMinutes)}</strong> to{" "}
                <strong>{formatCookTime(calculateCookTime(recommendation.weight, "roasted", false, false).maxMinutes)}</strong> at 325°F.
              </p>
            </div>
          </div>
          )}
        </div>
      )}

      {/* Timeline Calculator */}
      {mode === "timeline" && (
        <div className="space-y-6">
          {/* Weight Input */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Turkey Weight
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => { setWeight(Number(e.target.value)); resetResults(); }}
                  className="input-field flex-1"
                  min={4}
                  max={30}
                  step={0.5}
                />
                <select
                  value={weightUnit}
                  onChange={(e) => { setWeightUnit(e.target.value as WeightUnit); resetResults(); }}
                  className="select-field"
                >
                  <option value="lbs">lbs</option>
                  <option value="kg">kg</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cooking Method
              </label>
              <select
                value={method}
                onChange={(e) => { setMethod(e.target.value as CookingMethod); resetResults(); }}
                className="select-field w-full"
              >
                {cookingMethods.map((m) => (
                  <option key={m.key} value={m.key}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Serving Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Serving Date
              </label>
              <input
                type="date"
                value={servingDate}
                onChange={(e) => { setServingDate(e.target.value); resetResults(); }}
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Serving Time
              </label>
              <input
                type="time"
                value={servingTime}
                onChange={(e) => { setServingTime(e.target.value); resetResults(); }}
                className="input-field w-full"
              />
            </div>
          </div>

          {/* Options */}
          <div className="flex flex-wrap gap-4">
            {currentMethod?.allowsStuffed && (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isStuffed}
                  onChange={(e) => { setIsStuffed(e.target.checked); resetResults(); }}
                  className="w-4 h-4 text-coral rounded focus:ring-coral"
                />
                <span className="text-sm text-gray-700">Stuffed</span>
              </label>
            )}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isFrozen}
                onChange={(e) => { setIsFrozen(e.target.checked); resetResults(); }}
                className="w-4 h-4 text-coral rounded focus:ring-coral"
              />
              <span className="text-sm text-gray-700">Starting from frozen</span>
            </label>
          </div>

          <button
            onClick={() => setShowResults(true)}
            className="btn-primary w-full sm:w-auto"
          >
            Generate Timeline
          </button>

          {/* Timeline Results */}
          {showResults && (
          <div className="results-panel space-y-6">
            <h3 className="font-serif text-lg font-semibold text-gray-900">
              Your Complete Turkey Timeline
            </h3>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <StatCard
                label="Turkey Weight"
                value={`${weightInLbs.toFixed(1)} lbs`}
                color="coral"
              />
              <StatCard
                label="Serving Time"
                value={new Date(`2000-01-01T${servingTime}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                color="green"
              />
              <StatCard
                label="Method"
                value={currentMethod?.label || method}
                color="blue"
              />
              <StatCard
                label="Total Steps"
                value={timeline.length.toString()}
                color="purple"
              />
            </div>

            {/* Visual Timeline */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-4">
                {timeline.map((step, idx) => {
                  const isPrep = step.label.toLowerCase().includes('thaw') || step.label.toLowerCase().includes('brine') || step.label.toLowerCase().includes('buy');
                  const isCook = step.label.toLowerCase().includes('cook') || step.label.toLowerCase().includes('roast') || step.label.toLowerCase().includes('oven');
                  const isRest = step.label.toLowerCase().includes('rest');
                  const isServe = step.label.toLowerCase().includes('serve') || step.label.toLowerCase().includes('carve');

                  const bgColor = isServe ? 'bg-green-500' : isRest ? 'bg-amber-500' : isCook ? 'bg-coral' : isPrep ? 'bg-blue-500' : 'bg-gray-400';
                  const borderColor = isServe ? 'border-green-200' : isRest ? 'border-amber-200' : isCook ? 'border-coral/30' : isPrep ? 'border-blue-200' : 'border-gray-200';

                  return (
                    <div
                      key={idx}
                      className={`flex items-start gap-4 pb-4 border-b ${borderColor} last:border-0 last:pb-0`}
                    >
                      <div className={`flex-shrink-0 w-10 h-10 ${bgColor} rounded-full flex items-center justify-center text-white font-bold shadow-sm`}>
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900">{step.label}</span>
                          {step.daysBefore && (
                            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                              {step.daysBefore} days before
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-medium text-gray-700">{step.time}</p>
                        {step.daysBefore === undefined && (
                          <p className="text-xs text-gray-500 mt-1">
                            {isServe ? "Turkey should be at room temperature" :
                             isRest ? "Cover loosely with foil" :
                             isCook ? "Monitor internal temperature" :
                             "Prepare as needed"}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-gray-600">Preparation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-coral"></div>
                <span className="text-gray-600">Cooking</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="text-gray-600">Resting</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-600">Serving</span>
              </div>
            </div>

            {/* Tips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InsightCard type="tip" title="Day-Before Prep">
                Dry brine your turkey overnight for crispier skin and more flavorful meat. Simply rub with salt and refrigerate uncovered.
              </InsightCard>
              <InsightCard type="info" title="Make-Ahead Sides">
                Plan your side dishes around the turkey timing. Many can be prepped the day before or kept warm while the turkey rests.
              </InsightCard>
            </div>

            {/* Print-Friendly Summary */}
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Quick Reference</h4>
              <div className="text-sm text-gray-700 space-y-1">
                <p><strong>Turkey:</strong> {weightInLbs.toFixed(1)} lbs, {currentMethod?.label}{isStuffed ? ", stuffed" : ""}{isFrozen ? ", from frozen" : ""}</p>
                <p><strong>Start cooking at:</strong> {timeline.find(s => s.label.toLowerCase().includes('oven') || s.label.toLowerCase().includes('cook'))?.time || "See timeline"}</p>
                <p><strong>Ready to serve:</strong> {new Date(`${servingDate}T${servingTime}`).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {new Date(`2000-01-01T${servingTime}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</p>
              </div>
            </div>
          </div>
          )}
        </div>
      )}

      {/* Safety Note */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Food Safety:</strong> Turkey must reach an internal temperature
          of 165°F (74°C) in the thickest part of the thigh. Always use a meat
          thermometer to verify doneness.
        </p>
      </div>
    </div>
  );
}
