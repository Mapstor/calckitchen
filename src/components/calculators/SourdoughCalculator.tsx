"use client";

import { useState, useMemo, useCallback } from "react";
import {
  StatCard,
  InsightCard,
  ComparisonBarChart,
  ProgressRing,
  CHART_COLORS,
} from "@/components/charts";

type CalculatorMode = "starter" | "bread";
type FeedingRatio = "1:1:1" | "1:2:2" | "1:3:3" | "1:5:5" | "1:10:10";

interface FeedingRatioInfo {
  flour: number;
  water: number;
  peakTime: string;
  bestFor: string;
}

const feedingRatios: Record<FeedingRatio, FeedingRatioInfo> = {
  "1:1:1": { flour: 1, water: 1, peakTime: "4-6 hours", bestFor: "Quick builds, daily maintenance" },
  "1:2:2": { flour: 2, water: 2, peakTime: "8-10 hours", bestFor: "Standard maintenance, overnight feeds" },
  "1:3:3": { flour: 3, water: 3, peakTime: "10-14 hours", bestFor: "Slow rise, before long absences" },
  "1:5:5": { flour: 5, water: 5, peakTime: "14-18 hours", bestFor: "Pre-vacation feed" },
  "1:10:10": { flour: 10, water: 10, peakTime: "18-24+ hours", bestFor: "Reviving neglected starters" },
};

export default function SourdoughCalculator() {
  const [mode, setMode] = useState<CalculatorMode>("bread");
  const [showResults, setShowResults] = useState<boolean>(false);

  const resetResults = useCallback(() => setShowResults(false), []);

  // Starter feeding mode
  const [starterAmount, setStarterAmount] = useState<number>(20);
  const [feedingRatio, setFeedingRatio] = useState<FeedingRatio>("1:2:2");

  // Bread recipe mode
  const [loafCount, setLoafCount] = useState<number>(1);
  const [flourWeight, setFlourWeight] = useState<number>(500);
  const [hydration, setHydration] = useState<number>(70);
  const [starterPercent, setStarterPercent] = useState<number>(20);
  const [starterHydration, setStarterHydration] = useState<number>(100);
  const [saltPercent, setSaltPercent] = useState<number>(2);

  const starterResults = useMemo(() => {
    const ratio = feedingRatios[feedingRatio];
    const flourNeeded = starterAmount * ratio.flour;
    const waterNeeded = starterAmount * ratio.water;
    const totalAfterFeeding = starterAmount + flourNeeded + waterNeeded;

    return {
      flour: flourNeeded,
      water: waterNeeded,
      total: totalAfterFeeding,
      peakTime: ratio.peakTime,
      bestFor: ratio.bestFor,
    };
  }, [starterAmount, feedingRatio]);

  const breadResults = useMemo(() => {
    const totalFlour = flourWeight * loafCount;
    const water = Math.round(totalFlour * (hydration / 100));
    const starter = Math.round(totalFlour * (starterPercent / 100));
    const salt = Math.round(totalFlour * (saltPercent / 100) * 10) / 10;

    // Calculate starter flour and water contribution
    const starterWater = starter * (starterHydration / (100 + starterHydration));
    const starterFlour = starter - starterWater;

    // True hydration
    const trueHydration = ((water + starterWater) / (totalFlour + starterFlour)) * 100;

    const totalDough = totalFlour + water + starter + salt;

    // Levain build recommendation (build 120% of needed amount)
    const levainToBuild = Math.round(starter * 1.2);
    const levainStarter = Math.round(levainToBuild / 5); // 1:2:2 ratio
    const levainFlour = Math.round(levainToBuild * 2 / 5);
    const levainWater = Math.round(levainToBuild * 2 / 5);

    return {
      flour: totalFlour,
      water,
      starter,
      salt,
      totalDough,
      doughPerLoaf: Math.round(totalDough / loafCount),
      trueHydration: Math.round(trueHydration * 10) / 10,
      levain: {
        total: levainToBuild,
        starter: levainStarter,
        flour: levainFlour,
        water: levainWater,
      },
    };
  }, [loafCount, flourWeight, hydration, starterPercent, starterHydration, saltPercent]);

  return (
    <div className="calculator-card p-6 md:p-8">
      <div className="space-y-6">
        {/* Mode Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => { setMode("bread"); resetResults(); }}
            className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              mode === "bread"
                ? "bg-coral text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Bread Recipe Calculator
          </button>
          <button
            onClick={() => { setMode("starter"); resetResults(); }}
            className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              mode === "starter"
                ? "bg-coral text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Starter Feeding Calculator
          </button>
        </div>

        {mode === "starter" ? (
          <>
            {/* Starter Feeding Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount of Starter to Keep (g)
              </label>
              <input
                type="number"
                value={starterAmount}
                onChange={(e) => { setStarterAmount(Number(e.target.value)); resetResults(); }}
                className="input-field w-32"
                min={5}
                max={200}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Feeding Ratio
              </label>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(feedingRatios) as FeedingRatio[]).map((ratio) => (
                  <button
                    key={ratio}
                    onClick={() => { setFeedingRatio(ratio); resetResults(); }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      feedingRatio === ratio
                        ? "bg-coral text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowResults(true)}
              className="btn-primary w-full sm:w-auto"
            >
              Calculate
            </button>

            {/* Starter Results */}
            {showResults && (
            <div className="results-panel space-y-6">
              <h3 className="font-serif text-lg font-semibold text-gray-900">
                Feeding Formula ({feedingRatio})
              </h3>

              {/* Stats Overview */}
              <div className="grid grid-cols-3 gap-3">
                <StatCard
                  label="Starter"
                  value={`${starterAmount}g`}
                  sublabel="keep"
                  color="coral"
                />
                <StatCard
                  label="Add Total"
                  value={`${starterResults.flour + starterResults.water}g`}
                  sublabel={`${starterResults.flour}g flour + ${starterResults.water}g water`}
                  color="blue"
                />
                <StatCard
                  label="After Feed"
                  value={`${starterResults.total}g`}
                  sublabel={`${(starterResults.total / starterAmount).toFixed(0)}x growth`}
                  color="green"
                />
              </div>

              {/* Visual Composition */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Feeding Composition</h4>
                <ComparisonBarChart
                  data={[
                    { name: "Starter", value: starterAmount, fill: CHART_COLORS.primary },
                    { name: "Flour", value: starterResults.flour, fill: CHART_COLORS.quaternary },
                    { name: "Water", value: starterResults.water, fill: CHART_COLORS.tertiary },
                  ]}
                  height={100}
                  unit="g"
                />
              </div>

              {/* Main Result */}
              <div className="p-5 bg-gradient-to-br from-coral/10 to-coral/5 border border-coral/20 rounded-xl text-center">
                <p className="text-sm text-gray-600 mb-1">Feeding at {feedingRatio} ratio</p>
                <p className="text-3xl font-bold text-gray-900">
                  {starterAmount}g + {starterResults.flour}g + {starterResults.water}g
                </p>
                <p className="text-gray-600 mt-1">= {starterResults.total}g total starter</p>
              </div>

              {/* Ingredient Table */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-2 px-4 font-medium text-gray-700">Ingredient</th>
                      <th className="text-right py-2 px-4 font-medium text-gray-700">Ratio Part</th>
                      <th className="text-right py-2 px-4 font-medium text-gray-700">Weight</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-2 px-4 text-gray-700">Mature Starter</td>
                      <td className="py-2 px-4 text-right text-gray-600">1</td>
                      <td className="py-2 px-4 text-right font-semibold text-gray-900">{starterAmount}g</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 text-gray-700">Flour (all-purpose or bread)</td>
                      <td className="py-2 px-4 text-right text-gray-600">{feedingRatios[feedingRatio].flour}</td>
                      <td className="py-2 px-4 text-right font-semibold text-gray-900">{starterResults.flour}g</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 text-gray-700">Water (room temp)</td>
                      <td className="py-2 px-4 text-right text-gray-600">{feedingRatios[feedingRatio].water}</td>
                      <td className="py-2 px-4 text-right font-semibold text-gray-900">{starterResults.water}g</td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td className="py-2 px-4 font-medium text-gray-900">Total</td>
                      <td className="py-2 px-4"></td>
                      <td className="py-2 px-4 text-right font-bold text-gray-900">{starterResults.total}g</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Peak Time & Tips */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <h4 className="font-medium text-amber-900 mb-2">Peak Timing</h4>
                  <p className="text-2xl font-bold text-amber-800">{starterResults.peakTime}</p>
                  <p className="text-sm text-amber-700 mt-1">at 75°F (24°C) room temperature</p>
                  <p className="text-xs text-amber-600 mt-2">
                    Warmer = faster, Cooler = slower
                  </p>
                </div>

                <InsightCard type="tip" title="This Ratio Is Best For">
                  <p className="text-sm">{starterResults.bestFor}</p>
                  <div className="mt-2 pt-2 border-t border-blue-100">
                    <p className="text-xs text-gray-600">
                      {feedingRatio === "1:1:1" && "Quick rise, use within 4-6 hours of peak"}
                      {feedingRatio === "1:2:2" && "Overnight feed, ready for morning bake"}
                      {feedingRatio === "1:3:3" && "Extended timing without over-fermenting"}
                      {feedingRatio === "1:5:5" && "2-3 day buffer before needing another feed"}
                      {feedingRatio === "1:10:10" && "Rebuilding strength after neglect"}
                    </p>
                  </div>
                </InsightCard>
              </div>

              {/* Signs of Readiness */}
              <InsightCard type="info" title="Signs Your Starter Is Ready">
                <ul className="text-sm space-y-1">
                  <li>• Doubled or tripled in volume from feed</li>
                  <li>• Domed top (not yet collapsed)</li>
                  <li>• Lots of bubbles on surface and sides</li>
                  <li>• Pleasant yeasty/tangy aroma</li>
                  <li>• Passes the float test (optional)</li>
                </ul>
              </InsightCard>

              {/* Copy Button */}
              <button
                onClick={() => {
                  const formula = `Sourdough Starter Feed (${feedingRatio})\n${"=".repeat(30)}\n\nKeep: ${starterAmount}g starter\nAdd: ${starterResults.flour}g flour\nAdd: ${starterResults.water}g water\nTotal: ${starterResults.total}g\n\nPeak time: ${starterResults.peakTime} at 75°F`;
                  navigator.clipboard.writeText(formula);
                }}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Copy Formula
              </button>
            </div>
            )}
          </>
        ) : (
          <>
            {/* Bread Recipe Mode */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Loaves
                </label>
                <input
                  type="number"
                  value={loafCount}
                  onChange={(e) => { setLoafCount(Number(e.target.value)); resetResults(); }}
                  className="input-field w-full"
                  min={1}
                  max={10}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Flour per Loaf (g)
                </label>
                <input
                  type="number"
                  value={flourWeight}
                  onChange={(e) => { setFlourWeight(Number(e.target.value)); resetResults(); }}
                  className="input-field w-full"
                  min={200}
                  max={1500}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hydration: {hydration}%
              </label>
              <input
                type="range"
                value={hydration}
                onChange={(e) => { setHydration(Number(e.target.value)); resetResults(); }}
                className="w-full"
                min={60}
                max={85}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>60% (firm)</span>
                <span>85% (wet)</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Starter: {starterPercent}%
                </label>
                <input
                  type="range"
                  value={starterPercent}
                  onChange={(e) => { setStarterPercent(Number(e.target.value)); resetResults(); }}
                  className="w-full"
                  min={5}
                  max={40}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salt: {saltPercent}%
                </label>
                <input
                  type="range"
                  value={saltPercent}
                  onChange={(e) => { setSaltPercent(Number(e.target.value)); resetResults(); }}
                  className="w-full"
                  min={1.5}
                  max={3}
                  step={0.1}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Starter Hydration: {starterHydration}%
              </label>
              <select
                value={starterHydration}
                onChange={(e) => { setStarterHydration(Number(e.target.value)); resetResults(); }}
                className="input-field w-full"
              >
                <option value={100}>100% (equal flour and water)</option>
                <option value={80}>80% (stiff starter)</option>
                <option value={125}>125% (liquid starter)</option>
              </select>
            </div>

            <button
              onClick={() => setShowResults(true)}
              className="btn-primary w-full sm:w-auto"
            >
              Calculate
            </button>

            {/* Bread Results */}
            {showResults && (
            <div className="results-panel space-y-6">
              <h3 className="font-serif text-lg font-semibold text-gray-900">
                Sourdough Bread Recipe
              </h3>

              {/* Stats Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <StatCard
                  label="Total Dough"
                  value={`${breadResults.totalDough}g`}
                  sublabel={`${(breadResults.totalDough / 1000).toFixed(2)} kg`}
                  color="coral"
                />
                <StatCard
                  label="Per Loaf"
                  value={`${breadResults.doughPerLoaf}g`}
                  sublabel={`${loafCount} loaf${loafCount !== 1 ? "s" : ""}`}
                  color="blue"
                />
                <StatCard
                  label="True Hydration"
                  value={`${breadResults.trueHydration}%`}
                  sublabel={breadResults.trueHydration >= 75 ? "Wet dough" : breadResults.trueHydration >= 68 ? "Medium" : "Beginner-friendly"}
                  color="green"
                />
                <StatCard
                  label="Starter"
                  value={`${breadResults.starter}g`}
                  sublabel={`${starterPercent}% inoculation`}
                  color="amber"
                />
              </div>

              {/* Visual Hydration & Composition */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3 text-center">True Hydration</h4>
                  <div className="flex justify-center">
                    <ProgressRing
                      value={breadResults.trueHydration}
                      max={90}
                      size={140}
                      color={breadResults.trueHydration >= 75 ? CHART_COLORS.tertiary : CHART_COLORS.secondary}
                      sublabel="hydration"
                    />
                  </div>
                  <p className="text-xs text-center text-gray-500 mt-2">
                    Accounts for water in starter ({starterHydration}% hydration starter)
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Dough Composition</h4>
                  <ComparisonBarChart
                    data={[
                      { name: "Flour", value: breadResults.flour, fill: CHART_COLORS.quaternary },
                      { name: "Water", value: breadResults.water, fill: CHART_COLORS.tertiary },
                      { name: "Starter", value: breadResults.starter, fill: CHART_COLORS.primary },
                      { name: "Salt", value: Math.round(breadResults.salt * 10), fill: "#9CA3AF" },
                    ]}
                    height={120}
                    unit="g"
                  />
                </div>
              </div>

              {/* Main Result Box */}
              <div className="p-5 bg-gradient-to-br from-coral/10 to-coral/5 border border-coral/20 rounded-xl text-center">
                <p className="text-sm text-gray-600 mb-1">Your sourdough recipe makes</p>
                <p className="text-3xl font-bold text-gray-900">
                  {loafCount} loaf{loafCount !== 1 ? "s" : ""} × {breadResults.doughPerLoaf}g
                </p>
                <p className="text-gray-600 mt-1">
                  {breadResults.totalDough}g total • {breadResults.trueHydration}% true hydration
                </p>
              </div>

              {/* Ingredient Table */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Ingredients (Baker&apos;s Percentages)</h4>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-2 px-4 font-medium text-gray-700">Ingredient</th>
                        <th className="text-right py-2 px-4 font-medium text-gray-700">Baker&apos;s %</th>
                        <th className="text-right py-2 px-4 font-medium text-gray-700">Weight</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="bg-amber-50">
                        <td className="py-2 px-4 font-medium text-gray-900">Bread Flour</td>
                        <td className="py-2 px-4 text-right text-gray-700">100%</td>
                        <td className="py-2 px-4 text-right font-semibold text-gray-900">{breadResults.flour}g</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 text-gray-700">Water</td>
                        <td className="py-2 px-4 text-right text-gray-600">{hydration}%</td>
                        <td className="py-2 px-4 text-right font-semibold text-gray-900">{breadResults.water}g</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 text-gray-700">Sourdough Starter ({starterHydration}%)</td>
                        <td className="py-2 px-4 text-right text-gray-600">{starterPercent}%</td>
                        <td className="py-2 px-4 text-right font-semibold text-gray-900">{breadResults.starter}g</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 text-gray-700">Salt</td>
                        <td className="py-2 px-4 text-right text-gray-600">{saltPercent}%</td>
                        <td className="py-2 px-4 text-right font-semibold text-gray-900">{breadResults.salt}g</td>
                      </tr>
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td className="py-2 px-4 font-medium text-gray-900">Total Dough</td>
                        <td className="py-2 px-4"></td>
                        <td className="py-2 px-4 text-right font-bold text-gray-900">{breadResults.totalDough}g</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Levain Build */}
              <div className="p-5 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-3">Levain Build (Night Before)</h4>
                <div className="grid grid-cols-3 gap-4 text-center mb-3">
                  <div>
                    <p className="text-2xl font-bold text-blue-800">{breadResults.levain.starter}g</p>
                    <p className="text-xs text-blue-600">starter</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-800">{breadResults.levain.flour}g</p>
                    <p className="text-xs text-blue-600">flour</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-800">{breadResults.levain.water}g</p>
                    <p className="text-xs text-blue-600">water</p>
                  </div>
                </div>
                <p className="text-sm text-blue-800 text-center">
                  = <strong>{breadResults.levain.total}g</strong> levain (builds 20% extra for waste)
                </p>
                <p className="text-xs text-blue-600 text-center mt-2">
                  Feed before bed, use at peak in the morning
                </p>
              </div>

              {/* Baking Timeline */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Suggested Timeline</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap">Night Before</span>
                    <p className="text-gray-700">Build levain with {breadResults.levain.starter}g + {breadResults.levain.flour}g + {breadResults.levain.water}g</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap">8:00 AM</span>
                    <p className="text-gray-700">Mix flour & water, autolyse 30-60 min</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap">9:00 AM</span>
                    <p className="text-gray-700">Add levain and salt, mix well, start bulk fermentation</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap">9:00-1:00</span>
                    <p className="text-gray-700">Bulk ferment 4-5 hours with 3-4 stretch & folds</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap">1:00 PM</span>
                    <p className="text-gray-700">Pre-shape, rest 20 min, final shape, cold retard 12-16h</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap">Next Day</span>
                    <p className="text-gray-700">Bake in preheated Dutch oven at 500°F (450°F uncovered)</p>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="grid md:grid-cols-2 gap-4">
                <InsightCard type="tip" title="Hydration Tips">
                  {hydration < 68 ? (
                    <p className="text-sm">At {hydration}% hydration, your dough will be firm and easy to shape. Good for beginners!</p>
                  ) : hydration < 75 ? (
                    <p className="text-sm">At {hydration}% hydration, expect a slightly tacky dough with moderate open crumb. Use wet hands.</p>
                  ) : (
                    <p className="text-sm">At {hydration}% hydration, you&apos;ll have a very wet, slack dough. Requires experience with coil folds and gentle shaping.</p>
                  )}
                </InsightCard>

                <InsightCard type="info" title="Inoculation Rate">
                  {starterPercent <= 15 ? (
                    <p className="text-sm">Low inoculation ({starterPercent}%) = longer fermentation, more sour flavor, more complex taste.</p>
                  ) : starterPercent <= 25 ? (
                    <p className="text-sm">Standard inoculation ({starterPercent}%) = balanced timing (4-5 hour bulk), moderate sourness.</p>
                  ) : (
                    <p className="text-sm">High inoculation ({starterPercent}%) = faster fermentation, milder flavor. Watch for over-proofing!</p>
                  )}
                </InsightCard>
              </div>

              {/* Print/Copy */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    const recipe = `Sourdough Bread Recipe\n${"=".repeat(30)}\nMakes ${loafCount} loaf${loafCount !== 1 ? "s" : ""} (${breadResults.doughPerLoaf}g each)\nTrue hydration: ${breadResults.trueHydration}%\n\nMain Dough:\n- Flour: ${breadResults.flour}g (100%)\n- Water: ${breadResults.water}g (${hydration}%)\n- Starter: ${breadResults.starter}g (${starterPercent}%)\n- Salt: ${breadResults.salt}g (${saltPercent}%)\nTotal: ${breadResults.totalDough}g\n\nLevain Build (night before):\n${breadResults.levain.starter}g starter + ${breadResults.levain.flour}g flour + ${breadResults.levain.water}g water = ${breadResults.levain.total}g`;
                    navigator.clipboard.writeText(recipe);
                  }}
                  className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Copy Recipe
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Print Recipe
                </button>
              </div>
            </div>
            )}
          </>
        )}

        {/* Hydration Guide */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Hydration Guide</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Hydration</th>
                  <th className="text-left py-2 pr-4">Dough Feel</th>
                  <th className="text-left py-2">Crumb</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">60-65%</td>
                  <td className="py-2 pr-4">Firm, easy to shape</td>
                  <td className="py-2">Tight, even (beginner)</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">65-70%</td>
                  <td className="py-2 pr-4">Slightly tacky</td>
                  <td className="py-2">Moderate openness</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">70-75%</td>
                  <td className="py-2 pr-4">Sticky, requires technique</td>
                  <td className="py-2">Open, irregular holes</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">75-80%</td>
                  <td className="py-2 pr-4">Very wet, slack</td>
                  <td className="py-2">Very open (advanced)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
