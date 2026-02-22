"use client";

import { useState, useMemo, useCallback } from "react";
import {
  StatCard,
  InsightCard,
  ComparisonBarChart,
  CHART_COLORS,
} from "@/components/charts";

type UnitType = "cups" | "tbsp" | "sticks" | "grams" | "ounces" | "pounds";

interface ConversionFactors {
  toGrams: number;
  label: string;
}

const units: Record<UnitType, ConversionFactors> = {
  cups: { toGrams: 227, label: "Cups" },
  tbsp: { toGrams: 14.2, label: "Tablespoons" },
  sticks: { toGrams: 113.4, label: "Sticks (US)" },
  grams: { toGrams: 1, label: "Grams" },
  ounces: { toGrams: 28.35, label: "Ounces" },
  pounds: { toGrams: 453.6, label: "Pounds" },
};

const commonConversions = [
  { amount: 1, unit: "stick" as const, description: "1 stick butter" },
  { amount: 0.5, unit: "cup" as const, description: "½ cup butter" },
  { amount: 2, unit: "tbsp" as const, description: "2 tablespoons" },
  { amount: 0.25, unit: "cup" as const, description: "¼ cup butter" },
];

export default function ButterConverter() {
  const [amount, setAmount] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<UnitType>("sticks");
  const [showResults, setShowResults] = useState<boolean>(false);

  const resetResults = useCallback(() => setShowResults(false), []);

  const results = useMemo(() => {
    const grams = amount * units[fromUnit].toGrams;

    return {
      cups: Math.round((grams / units.cups.toGrams) * 100) / 100,
      tbsp: Math.round((grams / units.tbsp.toGrams) * 10) / 10,
      sticks: Math.round((grams / units.sticks.toGrams) * 100) / 100,
      grams: Math.round(grams),
      ounces: Math.round((grams / units.ounces.toGrams) * 10) / 10,
      pounds: Math.round((grams / units.pounds.toGrams) * 100) / 100,
    };
  }, [amount, fromUnit]);

  const handleQuickConvert = (amt: number, unit: UnitType) => {
    setAmount(amt);
    setFromUnit(unit);
    resetResults();
  };

  return (
    <div className="calculator-card p-6 md:p-8">
      <div className="space-y-6">
        {/* Input */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => { setAmount(Number(e.target.value)); resetResults(); }}
              className="input-field w-full"
              min={0}
              step={0.25}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unit
            </label>
            <select
              value={fromUnit}
              onChange={(e) => { setFromUnit(e.target.value as UnitType); resetResults(); }}
              className="input-field w-full"
            >
              {(Object.keys(units) as UnitType[]).map((unit) => (
                <option key={unit} value={unit}>{units[unit].label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Conversions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quick Select
          </label>
          <div className="flex flex-wrap gap-2">
            {commonConversions.map((conv, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickConvert(conv.amount, conv.unit === "stick" ? "sticks" : conv.unit === "cup" ? "cups" : "tbsp")}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors"
              >
                {conv.description}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowResults(true)}
          className="btn-primary w-full sm:w-auto"
        >
          Convert
        </button>

        {/* Results */}
        {showResults && (() => {
          // Calculate nutrition info (per amount)
          const calories = Math.round(results.grams * 7.17); // ~717 cal per 100g butter
          const fatGrams = Math.round(results.grams * 0.81); // ~81g fat per 100g butter
          const saturatedFat = Math.round(results.grams * 0.51); // ~51g saturated fat per 100g

          // Visual comparison data
          const comparisonData = [
            { name: "Sticks", value: results.sticks, fill: CHART_COLORS.quaternary },
            { name: "Cups", value: results.cups, fill: CHART_COLORS.tertiary },
            { name: "Tbsp", value: results.tbsp / 8, fill: CHART_COLORS.secondary }, // Scaled down for viz
          ];

          return (
        <div className="results-panel space-y-6">
          <h3 className="font-serif text-lg font-semibold text-gray-900">
            Butter Conversions
          </h3>

          {/* Main Result */}
          <div className="p-5 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl text-center">
            <p className="text-sm text-amber-700 mb-1">
              {amount} {units[fromUnit].label} of butter equals
            </p>
            <p className="text-4xl font-bold text-amber-900">{results.grams}g</p>
            <p className="text-amber-700 mt-2">
              {results.ounces} oz • {results.pounds} lb
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard
              label="Sticks (US)"
              value={results.sticks}
              sublabel="113g each"
              color="amber"
            />
            <StatCard
              label="Cups"
              value={results.cups}
              sublabel="227g each"
              color="blue"
            />
            <StatCard
              label="Tablespoons"
              value={results.tbsp}
              sublabel="14g each"
              color="green"
            />
            <StatCard
              label="Grams"
              value={`${results.grams}g`}
              sublabel="metric weight"
              color="gray"
            />
          </div>

          {/* All Conversions Table */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Complete Conversion</h4>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 text-center">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <p className="text-xs text-gray-500">Sticks</p>
                <p className="text-lg font-bold text-gray-900">{results.sticks}</p>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <p className="text-xs text-gray-500">Cups</p>
                <p className="text-lg font-bold text-gray-900">{results.cups}</p>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <p className="text-xs text-gray-500">Tbsp</p>
                <p className="text-lg font-bold text-gray-900">{results.tbsp}</p>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <p className="text-xs text-gray-500">Grams</p>
                <p className="text-lg font-bold text-gray-900">{results.grams}</p>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <p className="text-xs text-gray-500">Ounces</p>
                <p className="text-lg font-bold text-gray-900">{results.ounces}</p>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <p className="text-xs text-gray-500">Pounds</p>
                <p className="text-lg font-bold text-gray-900">{results.pounds}</p>
              </div>
            </div>
          </div>

          {/* Nutrition Info */}
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-medium text-red-900 mb-3">Nutrition Information</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-red-900">{calories}</p>
                <p className="text-xs text-red-700">Calories</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-900">{fatGrams}g</p>
                <p className="text-xs text-red-700">Total Fat</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-900">{saturatedFat}g</p>
                <p className="text-xs text-red-700">Saturated Fat</p>
              </div>
            </div>
            <p className="text-xs text-red-600 mt-3 text-center">
              {Math.round((saturatedFat / 20) * 100)}% of daily value for saturated fat (20g/day)
            </p>
          </div>

          {/* Visual Size Comparison */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Visual Reference</h4>
            <ComparisonBarChart
              data={comparisonData}
              height={120}
              showValue
            />
          </div>

          {/* Stick Breakdown Visual */}
          {results.sticks > 0 && results.sticks <= 8 && (
            <div className="p-4 bg-amber-50 rounded-lg">
              <h4 className="font-medium text-amber-900 mb-3">Stick Visualization</h4>
              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: Math.floor(results.sticks) }).map((_, i) => (
                  <div key={i} className="w-16 h-8 bg-amber-300 border border-amber-400 rounded flex items-center justify-center text-xs text-amber-800 font-medium">
                    Stick {i + 1}
                  </div>
                ))}
                {results.sticks % 1 > 0 && (
                  <div
                    className="h-8 bg-amber-200 border border-amber-300 rounded flex items-center justify-center text-xs text-amber-700"
                    style={{ width: `${(results.sticks % 1) * 64}px`, minWidth: "20px" }}
                  >
                    {Math.round((results.sticks % 1) * 100)}%
                  </div>
                )}
              </div>
              <p className="text-xs text-amber-700 mt-2">
                Each stick = 8 tablespoons = ½ cup = 113g
              </p>
            </div>
          )}

          {/* Baking Context */}
          <InsightCard type="tip" title="Baking Reference">
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div>
                <p className="font-medium text-sm">For Cookies (1 batch)</p>
                <p className="text-xs">Usually 1-2 sticks (113-227g)</p>
              </div>
              <div>
                <p className="font-medium text-sm">For Pie Crust</p>
                <p className="text-xs">Usually ½-¾ cup (113-170g)</p>
              </div>
              <div>
                <p className="font-medium text-sm">For Cake Layer</p>
                <p className="text-xs">Usually 1 stick (113g)</p>
              </div>
              <div>
                <p className="font-medium text-sm">For Frosting</p>
                <p className="text-xs">Usually 2-4 sticks (227-454g)</p>
              </div>
            </div>
          </InsightCard>

          {/* Copy Button */}
          <button
            onClick={() => {
              const text = `Butter Conversion:\n${amount} ${units[fromUnit].label} = ${results.grams}g\n\nSticks: ${results.sticks}\nCups: ${results.cups}\nTbsp: ${results.tbsp}\nOunces: ${results.ounces}\nPounds: ${results.pounds}`;
              navigator.clipboard.writeText(text);
            }}
            className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            Copy Conversion
          </button>
        </div>
          );
        })()}

        {/* Reference Table */}
        <InsightCard type="info" title="Common Butter Measurements">
          <div className="overflow-x-auto mt-2">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left py-2 pr-4 font-medium">Sticks</th>
                  <th className="text-left py-2 pr-4 font-medium">Cups</th>
                  <th className="text-left py-2 pr-4 font-medium">Tbsp</th>
                  <th className="text-left py-2 font-medium">Grams</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-1.5 pr-4">½ stick</td>
                  <td className="py-1.5 pr-4">¼ cup</td>
                  <td className="py-1.5 pr-4">4 tbsp</td>
                  <td className="py-1.5">57g</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-1.5 pr-4">1 stick</td>
                  <td className="py-1.5 pr-4">½ cup</td>
                  <td className="py-1.5 pr-4">8 tbsp</td>
                  <td className="py-1.5">113g</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-1.5 pr-4">2 sticks</td>
                  <td className="py-1.5 pr-4">1 cup</td>
                  <td className="py-1.5 pr-4">16 tbsp</td>
                  <td className="py-1.5">227g</td>
                </tr>
                <tr>
                  <td className="py-1.5 pr-4">4 sticks</td>
                  <td className="py-1.5 pr-4">2 cups</td>
                  <td className="py-1.5 pr-4">32 tbsp</td>
                  <td className="py-1.5">454g (1 lb)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </InsightCard>
      </div>
    </div>
  );
}
