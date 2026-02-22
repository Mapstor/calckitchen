"use client";

import { useState, useMemo, useCallback } from "react";
import {
  StatCard,
  InsightCard,
  ComparisonBarChart,
  ProgressRing,
  CHART_COLORS,
} from "@/components/charts";

type BrewMethod = "pourover" | "frenchpress" | "coldbrew" | "drip" | "aeropress" | "espresso" | "mokapot" | "turkish";
type Strength = "light" | "medium" | "strong";
type CalculationMode = "coffee" | "cups";
type UnitSystem = "metric" | "imperial";

interface BrewMethodInfo {
  name: string;
  defaultRatio: number;
  grindSize: string;
  waterTemp: string;
  brewTime: string;
  tips: string;
}

const brewMethods: Record<BrewMethod, BrewMethodInfo> = {
  pourover: {
    name: "Pour Over (V60/Chemex)",
    defaultRatio: 16,
    grindSize: "Medium-fine",
    waterTemp: "195-205°F (90-96°C)",
    brewTime: "3-4 min",
    tips: "Bloom with 2× coffee weight in water for 30 seconds before main pour.",
  },
  frenchpress: {
    name: "French Press",
    defaultRatio: 16,
    grindSize: "Coarse",
    waterTemp: "195-205°F (90-96°C)",
    brewTime: "4 min",
    tips: "Press immediately after 4 minutes. Leaving it in the press continues extraction.",
  },
  coldbrew: {
    name: "Cold Brew (Concentrate)",
    defaultRatio: 6.5,
    grindSize: "Extra coarse",
    waterTemp: "Cold / room temp",
    brewTime: "12-24 hours",
    tips: "This makes concentrate. Dilute 1:1 with water or milk before drinking.",
  },
  drip: {
    name: "Drip / Auto",
    defaultRatio: 17,
    grindSize: "Medium",
    waterTemp: "~200°F (auto)",
    brewTime: "5-6 min",
    tips: "Coffee maker \"cups\" are 5-6 oz, not 8 oz. A \"12-cup\" pot makes ~60 oz.",
  },
  aeropress: {
    name: "AeroPress",
    defaultRatio: 11,
    grindSize: "Fine to medium",
    waterTemp: "175-205°F (80-96°C)",
    brewTime: "1-2 min",
    tips: "Very versatile — can produce concentrated espresso-style or diluted Americano.",
  },
  espresso: {
    name: "Espresso",
    defaultRatio: 2,
    grindSize: "Very fine",
    waterTemp: "195-205°F (90-96°C)",
    brewTime: "25-30 sec",
    tips: "Ratio is dose:yield (18g in → 36g out). Adjust grind, not dose, to dial in.",
  },
  mokapot: {
    name: "Moka Pot",
    defaultRatio: 8.5,
    grindSize: "Fine (coarser than espresso)",
    waterTemp: "Stovetop (boiling)",
    brewTime: "4-5 min",
    tips: "Use medium-low heat. Remove from heat when coffee starts sputtering.",
  },
  turkish: {
    name: "Turkish",
    defaultRatio: 11,
    grindSize: "Extra fine (powder)",
    waterTemp: "Boiling",
    brewTime: "2-3 min",
    tips: "Add sugar during brewing if desired. Bring to foaming boil 2-3 times.",
  },
};

const strengthAdjustment: Record<Strength, number> = {
  light: 1,
  medium: 0,
  strong: -1,
};

const cupSizes = [
  { label: "6 oz", ml: 177 },
  { label: "8 oz", ml: 237 },
  { label: "10 oz", ml: 296 },
  { label: "12 oz", ml: 355 },
];

export default function CoffeeRatioCalculator() {
  const [brewMethod, setBrewMethod] = useState<BrewMethod>("pourover");
  const [showResults, setShowResults] = useState<boolean>(false);

  const resetResults = useCallback(() => setShowResults(false), []);
  const [strength, setStrength] = useState<Strength>("medium");
  const [mode, setMode] = useState<CalculationMode>("cups");
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric");

  // Mode: I have coffee
  const [coffeeAmount, setCoffeeAmount] = useState<number>(18);

  // Mode: I want cups
  const [cupCount, setCupCount] = useState<number>(2);
  const [cupSize, setCupSize] = useState<number>(237);

  const method = brewMethods[brewMethod];

  const results = useMemo(() => {
    const adjustedRatio = method.defaultRatio + strengthAdjustment[strength];

    let coffeeGrams: number;
    let waterMl: number;

    if (mode === "coffee") {
      coffeeGrams = coffeeAmount;
      waterMl = coffeeAmount * adjustedRatio;
    } else {
      waterMl = cupCount * cupSize;
      coffeeGrams = waterMl / adjustedRatio;
    }

    // Convert to other units
    const coffeeOz = coffeeGrams / 28.35;
    const coffeeTbsp = coffeeGrams / 6;
    const waterOz = waterMl / 29.57;
    const waterCups = waterMl / 237;

    // For espresso, show output differently
    const isEspresso = brewMethod === "espresso";

    return {
      coffeeGrams: Math.round(coffeeGrams * 10) / 10,
      coffeeOz: Math.round(coffeeOz * 10) / 10,
      coffeeTbsp: Math.round(coffeeTbsp * 10) / 10,
      waterMl: Math.round(waterMl),
      waterOz: Math.round(waterOz * 10) / 10,
      waterCups: Math.round(waterCups * 10) / 10,
      ratio: adjustedRatio,
      isEspresso,
      espressoOutput: isEspresso ? Math.round(coffeeGrams * adjustedRatio) : 0,
    };
  }, [brewMethod, strength, mode, coffeeAmount, cupCount, cupSize, method.defaultRatio]);

  return (
    <div className="calculator-card p-6 md:p-8">
      <div className="space-y-6">
        {/* Brew Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brew Method
          </label>
          <select
            value={brewMethod}
            onChange={(e) => { setBrewMethod(e.target.value as BrewMethod); resetResults(); }}
            className="input-field w-full"
          >
            {(Object.keys(brewMethods) as BrewMethod[]).map((m) => (
              <option key={m} value={m}>{brewMethods[m].name}</option>
            ))}
          </select>
        </div>

        {/* Strength */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Strength Preference
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["light", "medium", "strong"] as Strength[]).map((s) => (
              <button
                key={s}
                onClick={() => { setStrength(s); resetResults(); }}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                  strength === s
                    ? "bg-coral text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Calculation Mode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            I want to calculate...
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => { setMode("cups"); resetResults(); }}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                mode === "cups"
                  ? "bg-coral text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              By Number of Cups
            </button>
            <button
              onClick={() => { setMode("coffee"); resetResults(); }}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                mode === "coffee"
                  ? "bg-coral text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              By Coffee Amount
            </button>
          </div>
        </div>

        {/* Input based on mode */}
        {mode === "cups" ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Cups
              </label>
              <input
                type="number"
                value={cupCount}
                onChange={(e) => { setCupCount(Number(e.target.value)); resetResults(); }}
                className="input-field w-full"
                min={1}
                max={20}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cup Size
              </label>
              <select
                value={cupSize}
                onChange={(e) => { setCupSize(Number(e.target.value)); resetResults(); }}
                className="input-field w-full"
              >
                {cupSizes.map((size) => (
                  <option key={size.ml} value={size.ml}>{size.label}</option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Coffee Amount (grams)
            </label>
            <input
              type="number"
              value={coffeeAmount}
              onChange={(e) => { setCoffeeAmount(Number(e.target.value)); resetResults(); }}
              className="input-field w-32"
              min={1}
              max={500}
            />
          </div>
        )}

        {/* Unit Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => { setUnitSystem("metric"); resetResults(); }}
            className={`px-3 py-1.5 rounded text-sm transition-colors ${
              unitSystem === "metric"
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Metric (g/ml)
          </button>
          <button
            onClick={() => { setUnitSystem("imperial"); resetResults(); }}
            className={`px-3 py-1.5 rounded text-sm transition-colors ${
              unitSystem === "imperial"
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Imperial (oz/tbsp)
          </button>
        </div>

        <button
          onClick={() => setShowResults(true)}
          className="btn-primary w-full sm:w-auto"
        >
          Calculate
        </button>

        {/* Results */}
        {showResults && (
        <div className="results-panel space-y-6">
          <h3 className="font-serif text-lg font-semibold text-gray-900">
            {method.name} Recipe
          </h3>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard
              label="Ratio"
              value={`1:${results.ratio}`}
              sublabel={results.ratio >= 15 && results.ratio <= 18 ? "SCA Golden" : strength}
              color="coral"
            />
            <StatCard
              label="Coffee"
              value={unitSystem === "metric" ? `${results.coffeeGrams}g` : `${results.coffeeTbsp} tbsp`}
              sublabel={unitSystem === "imperial" ? `${results.coffeeGrams}g` : `${results.coffeeTbsp} tbsp`}
              color="amber"
            />
            <StatCard
              label={results.isEspresso ? "Output" : "Water"}
              value={results.isEspresso ? `${results.espressoOutput}g` : unitSystem === "metric" ? `${results.waterMl}ml` : `${results.waterOz} oz`}
              sublabel={results.isEspresso ? "espresso yield" : `${results.waterCups} cups`}
              color="blue"
            />
            <StatCard
              label="Brew Time"
              value={method.brewTime.split(" ")[0]}
              sublabel={method.brewTime.includes("min") ? "minutes" : method.brewTime.includes("hour") ? "hours" : ""}
              color="green"
            />
          </div>

          {/* Visual Ratio */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3 text-center">Coffee to Water Ratio</h4>
              <div className="flex justify-center">
                <ProgressRing
                  value={results.coffeeGrams}
                  max={results.coffeeGrams + (results.waterMl / 10)}
                  size={140}
                  color={CHART_COLORS.quaternary}
                  sublabel={`1:${results.ratio}`}
                />
              </div>
              <p className="text-xs text-center text-gray-500 mt-2">
                {results.ratio < 10 ? "Strong concentration" :
                 results.ratio < 15 ? "Strong brew" :
                 results.ratio <= 18 ? "Balanced (Golden Cup)" :
                 "Lighter extraction"}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Ingredient Ratio</h4>
              <ComparisonBarChart
                data={[
                  { name: "Coffee", value: results.coffeeGrams, fill: CHART_COLORS.quaternary },
                  { name: "Water", value: Math.round(results.waterMl / 10), fill: CHART_COLORS.tertiary },
                ]}
                height={100}
                unit={unitSystem === "metric" ? "g" : ""}
              />
              <p className="text-xs text-center text-gray-500 mt-2">
                Water shown at 1/10 scale for visibility
              </p>
            </div>
          </div>

          {/* Main Result Box */}
          <div className="p-5 bg-gradient-to-br from-amber-100 to-amber-50 border border-amber-200 rounded-xl text-center">
            <p className="text-sm text-amber-700 mb-1">Your {method.name.split(" (")[0]} brew</p>
            <div className="flex items-center justify-center gap-4">
              <div>
                <p className="text-3xl font-bold text-amber-900">{results.coffeeGrams}g</p>
                <p className="text-xs text-amber-700">coffee</p>
              </div>
              <span className="text-2xl text-amber-400">+</span>
              <div>
                <p className="text-3xl font-bold text-blue-900">{results.waterMl}ml</p>
                <p className="text-xs text-blue-700">water</p>
              </div>
            </div>
            {mode === "cups" && (
              <p className="text-amber-700 mt-2">
                Makes {cupCount} × {cupSize}ml cups
              </p>
            )}
          </div>

          {/* Brew Parameters Table */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Brew Parameters</h4>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-3 px-4 text-gray-600 font-medium">Coffee</td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-semibold text-gray-900">{results.coffeeGrams}g</span>
                      <span className="text-gray-500 ml-2">({results.coffeeTbsp} tbsp / {results.coffeeOz} oz)</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-600 font-medium">Water</td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-semibold text-gray-900">{results.waterMl}ml</span>
                      <span className="text-gray-500 ml-2">({results.waterOz} oz / {results.waterCups} cups)</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-600 font-medium">Grind Size</td>
                    <td className="py-3 px-4 text-right font-semibold text-gray-900">{method.grindSize}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-600 font-medium">Water Temperature</td>
                    <td className="py-3 px-4 text-right font-semibold text-gray-900">{method.waterTemp}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-600 font-medium">Brew Time</td>
                    <td className="py-3 px-4 text-right font-semibold text-gray-900">{method.brewTime}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-600 font-medium">Ratio</td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-semibold text-gray-900">1:{results.ratio}</span>
                      {results.ratio >= 15 && results.ratio <= 18 && (
                        <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">SCA Golden Cup</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Pour Over Bloom Info */}
          {brewMethod === "pourover" && (
            <InsightCard type="tip" title="Bloom Phase">
              <p className="text-sm mb-2">Start with a <strong>{Math.round(results.coffeeGrams * 2)}g bloom</strong> (2× coffee weight)</p>
              <ol className="text-sm space-y-1 list-decimal list-inside">
                <li>Pour {Math.round(results.coffeeGrams * 2)}g water over grounds</li>
                <li>Wait 30-45 seconds for CO₂ to release</li>
                <li>Continue pouring remaining {results.waterMl - Math.round(results.coffeeGrams * 2)}ml</li>
              </ol>
            </InsightCard>
          )}

          {/* Cold Brew Dilution */}
          {brewMethod === "coldbrew" && (
            <InsightCard type="info" title="Concentrate Dilution">
              <p className="text-sm">This makes <strong>concentrate</strong>. To serve:</p>
              <ul className="text-sm mt-2 space-y-1">
                <li>• <strong>Iced coffee:</strong> Dilute 1:1 with water + ice</li>
                <li>• <strong>Milk drink:</strong> 1 part concentrate + 2 parts milk</li>
                <li>• Concentrate keeps 2 weeks refrigerated</li>
              </ul>
            </InsightCard>
          )}

          {/* Espresso Info */}
          {results.isEspresso && (
            <InsightCard type="tip" title="Espresso Yield">
              <p className="text-sm">
                <strong>{results.coffeeGrams}g dose → {results.espressoOutput}g yield</strong> (1:{results.ratio} ratio)
              </p>
              <p className="text-sm mt-2 text-gray-600">
                Pull in {method.brewTime}. If too fast, grind finer. If too slow, grind coarser.
              </p>
            </InsightCard>
          )}

          {/* General Tip */}
          <InsightCard type="tip" title="Pro Tip">
            <p className="text-sm">{method.tips}</p>
          </InsightCard>

          {/* Strength Adjustment */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Adjust to Taste</h4>
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div className={`p-3 rounded-lg ${strength === "light" ? "bg-white border-2 border-coral" : "bg-gray-100"}`}>
                <p className="font-medium">Light</p>
                <p className="text-gray-600">1:{method.defaultRatio + 1}</p>
                <p className="text-xs text-gray-500">More water</p>
              </div>
              <div className={`p-3 rounded-lg ${strength === "medium" ? "bg-white border-2 border-coral" : "bg-gray-100"}`}>
                <p className="font-medium">Medium</p>
                <p className="text-gray-600">1:{method.defaultRatio}</p>
                <p className="text-xs text-gray-500">Standard</p>
              </div>
              <div className={`p-3 rounded-lg ${strength === "strong" ? "bg-white border-2 border-coral" : "bg-gray-100"}`}>
                <p className="font-medium">Strong</p>
                <p className="text-gray-600">1:{method.defaultRatio - 1}</p>
                <p className="text-xs text-gray-500">More coffee</p>
              </div>
            </div>
          </div>

          {/* Copy Button */}
          <button
            onClick={() => {
              const recipe = `${method.name} Coffee Recipe\n${"=".repeat(30)}\n\nCoffee: ${results.coffeeGrams}g (${results.coffeeTbsp} tbsp)\nWater: ${results.waterMl}ml (${results.waterOz} oz)\nRatio: 1:${results.ratio}\n\nGrind: ${method.grindSize}\nTemp: ${method.waterTemp}\nTime: ${method.brewTime}\n\nTip: ${method.tips}`;
              navigator.clipboard.writeText(recipe);
            }}
            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Copy Recipe
          </button>
        </div>
        )}

        {/* Quick Reference */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Ratio Quick Reference</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Method</th>
                  <th className="text-left py-2 pr-4">Ratio</th>
                  <th className="text-left py-2">Grind</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {(Object.keys(brewMethods) as BrewMethod[]).map((m) => (
                  <tr key={m} className="border-b border-gray-100">
                    <td className="py-2 pr-4">{brewMethods[m].name.split(" (")[0]}</td>
                    <td className="py-2 pr-4">1:{brewMethods[m].defaultRatio}</td>
                    <td className="py-2">{brewMethods[m].grindSize}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
