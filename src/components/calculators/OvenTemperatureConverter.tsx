"use client";

import { useState, useMemo, useCallback } from "react";
import {
  StatCard,
  InsightCard,
  ComparisonBarChart,
  CHART_COLORS,
} from "@/components/charts";

type TempUnit = "F" | "C" | "gas";

interface GasMarkInfo {
  mark: string;
  fahrenheit: number;
  celsius: number;
  description: string;
}

const gasMarks: GasMarkInfo[] = [
  { mark: "¼", fahrenheit: 225, celsius: 110, description: "Very slow" },
  { mark: "½", fahrenheit: 250, celsius: 120, description: "Very slow" },
  { mark: "1", fahrenheit: 275, celsius: 140, description: "Slow" },
  { mark: "2", fahrenheit: 300, celsius: 150, description: "Slow" },
  { mark: "3", fahrenheit: 325, celsius: 160, description: "Moderate" },
  { mark: "4", fahrenheit: 350, celsius: 180, description: "Moderate" },
  { mark: "5", fahrenheit: 375, celsius: 190, description: "Moderate hot" },
  { mark: "6", fahrenheit: 400, celsius: 200, description: "Hot" },
  { mark: "7", fahrenheit: 425, celsius: 220, description: "Hot" },
  { mark: "8", fahrenheit: 450, celsius: 230, description: "Very hot" },
  { mark: "9", fahrenheit: 475, celsius: 240, description: "Very hot" },
  { mark: "10", fahrenheit: 500, celsius: 260, description: "Extremely hot" },
];

const commonTemps = [
  { f: 325, label: "325°F / 160°C", use: "Slow roasting" },
  { f: 350, label: "350°F / 180°C", use: "Baking (cakes, cookies)" },
  { f: 375, label: "375°F / 190°C", use: "General baking" },
  { f: 400, label: "400°F / 200°C", use: "Roasting vegetables" },
  { f: 425, label: "425°F / 220°C", use: "High-heat roasting" },
  { f: 450, label: "450°F / 230°C", use: "Pizza, bread" },
];

export default function OvenTemperatureConverter() {
  const [inputTemp, setInputTemp] = useState<number>(350);
  const [inputUnit, setInputUnit] = useState<TempUnit>("F");
  const [showResults, setShowResults] = useState<boolean>(false);

  const resetResults = useCallback(() => setShowResults(false), []);

  const results = useMemo(() => {
    let fahrenheit: number;

    if (inputUnit === "F") {
      fahrenheit = inputTemp;
    } else if (inputUnit === "C") {
      fahrenheit = Math.round((inputTemp * 9/5) + 32);
    } else {
      // Gas mark - find closest
      const gasIndex = parseFloat(String(inputTemp));
      const gasInfo = gasMarks.find(g => parseFloat(g.mark) === gasIndex) || gasMarks[5];
      fahrenheit = gasInfo.fahrenheit;
    }

    const celsius = Math.round((fahrenheit - 32) * 5/9);

    // Find closest gas mark
    let closestGas = gasMarks[0];
    let minDiff = Math.abs(fahrenheit - gasMarks[0].fahrenheit);
    for (const gas of gasMarks) {
      const diff = Math.abs(fahrenheit - gas.fahrenheit);
      if (diff < minDiff) {
        minDiff = diff;
        closestGas = gas;
      }
    }

    // Determine heat level
    let heatLevel = "";
    if (fahrenheit < 300) heatLevel = "Low/Slow";
    else if (fahrenheit < 350) heatLevel = "Moderate Low";
    else if (fahrenheit < 400) heatLevel = "Moderate";
    else if (fahrenheit < 450) heatLevel = "Hot";
    else heatLevel = "Very Hot";

    return {
      fahrenheit,
      celsius,
      gasMark: closestGas.mark,
      gasDescription: closestGas.description,
      heatLevel,
      isExactGas: minDiff <= 15,
    };
  }, [inputTemp, inputUnit]);

  const handleQuickTemp = (f: number) => {
    setInputTemp(f);
    setInputUnit("F");
    resetResults();
  };

  return (
    <div className="calculator-card p-6 md:p-8">
      <div className="space-y-6">
        {/* Input */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Temperature
            </label>
            <input
              type="number"
              value={inputTemp}
              onChange={(e) => { setInputTemp(Number(e.target.value)); resetResults(); }}
              className="input-field w-full"
              min={0}
              max={600}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unit
            </label>
            <select
              value={inputUnit}
              onChange={(e) => { setInputUnit(e.target.value as TempUnit); resetResults(); }}
              className="input-field w-full"
            >
              <option value="F">°F (Fahrenheit)</option>
              <option value="C">°C (Celsius)</option>
              <option value="gas">Gas Mark</option>
            </select>
          </div>
        </div>

        {/* Quick Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Common Temperatures
          </label>
          <div className="flex flex-wrap gap-2">
            {commonTemps.map((temp) => (
              <button
                key={temp.f}
                onClick={() => handleQuickTemp(temp.f)}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors"
              >
                {temp.label}
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
          // Common uses based on temperature
          let commonUses: string[] = [];
          if (results.fahrenheit <= 300) commonUses = ["Slow roasting", "Drying herbs", "Keeping warm"];
          else if (results.fahrenheit <= 350) commonUses = ["Baking cakes", "Casseroles", "Cookies"];
          else if (results.fahrenheit <= 400) commonUses = ["Roasting vegetables", "Baking bread", "Muffins"];
          else if (results.fahrenheit <= 450) commonUses = ["Pizza", "Roasting meat", "Crispy potatoes"];
          else commonUses = ["Broiling", "Searing", "Neapolitan pizza"];

          // Temperature comparison data
          const tempComparisonData = [
            { name: "Fahrenheit", value: results.fahrenheit / 5, fill: CHART_COLORS.protein },
            { name: "Celsius", value: results.celsius / 2.5, fill: CHART_COLORS.carbs },
          ];

          // Heat level color
          const heatLevelColor =
            results.heatLevel === "Low/Slow" ? "green" :
            results.heatLevel === "Moderate Low" ? "blue" :
            results.heatLevel === "Moderate" ? "amber" :
            results.heatLevel === "Hot" ? "coral" : "purple";

          return (
        <div className="results-panel space-y-6">
          <h3 className="font-serif text-lg font-semibold text-gray-900">
            Temperature Conversion
          </h3>

          {/* Main Result */}
          <div className="p-5 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl text-center">
            <p className="text-sm text-red-700 mb-1">Your Temperature</p>
            <div className="flex justify-center items-baseline gap-4">
              <div>
                <span className="text-4xl font-bold text-red-900">{results.fahrenheit}</span>
                <span className="text-xl text-red-700">°F</span>
              </div>
              <span className="text-2xl text-red-400">=</span>
              <div>
                <span className="text-4xl font-bold text-blue-900">{results.celsius}</span>
                <span className="text-xl text-blue-700">°C</span>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard
              label="Fahrenheit"
              value={`${results.fahrenheit}°F`}
              sublabel="US standard"
              color="coral"
            />
            <StatCard
              label="Celsius"
              value={`${results.celsius}°C`}
              sublabel="metric"
              color="blue"
            />
            <StatCard
              label="Gas Mark"
              value={results.gasMark}
              sublabel={results.isExactGas ? "exact" : "≈ approx"}
              color="amber"
            />
            <StatCard
              label="Heat Level"
              value={results.heatLevel}
              sublabel={results.gasDescription}
              color={heatLevelColor as "coral" | "green" | "blue" | "amber" | "purple" | "gray"}
            />
          </div>

          {/* Common Uses */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Common Uses at This Temperature</h4>
            <div className="flex flex-wrap gap-2">
              {commonUses.map((use) => (
                <span key={use} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm">
                  {use}
                </span>
              ))}
            </div>
          </div>

          {/* Visual Comparison */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Scale Comparison</h4>
            <ComparisonBarChart data={tempComparisonData} height={80} showValue />
            <p className="text-xs text-gray-500 mt-2 text-center">Values scaled for visualization</p>
          </div>

          {/* Heat Scale Visual */}
          <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Heat Scale</h4>
            <div className="relative h-8 bg-gradient-to-r from-blue-200 via-yellow-300 via-orange-400 to-red-600 rounded-full">
              <div
                className="absolute top-0 w-1 h-8 bg-gray-900 rounded"
                style={{ left: `${Math.min(Math.max(((results.fahrenheit - 200) / 350) * 100, 0), 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>200°F (Low)</span>
              <span>350°F (Med)</span>
              <span>500°F (High)</span>
            </div>
          </div>

          {/* Baking Tips */}
          <InsightCard type="tip" title="Temperature Tips">
            <div className="grid grid-cols-2 gap-3 mt-2 text-sm">
              <div>
                <p className="font-medium">Convection Adjustment</p>
                <p className="text-xs">Reduce by 25°F when using convection mode</p>
              </div>
              <div>
                <p className="font-medium">Altitude Adjustment</p>
                <p className="text-xs">Increase 15-25°F at high altitude</p>
              </div>
              <div>
                <p className="font-medium">Preheating</p>
                <p className="text-xs">Always preheat for accurate results</p>
              </div>
              <div>
                <p className="font-medium">Oven Variance</p>
                <p className="text-xs">Use oven thermometer; ovens vary ±25°F</p>
              </div>
            </div>
          </InsightCard>

          {/* Copy Button */}
          <button
            onClick={() => {
              const text = `Oven Temperature:\n${results.fahrenheit}°F = ${results.celsius}°C\nGas Mark: ${results.gasMark}\nHeat Level: ${results.heatLevel}`;
              navigator.clipboard.writeText(text);
            }}
            className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            Copy Conversion
          </button>
        </div>
          );
        })()}

        {/* Gas Mark Reference */}
        <InsightCard type="info" title="Gas Mark Reference Chart">
          <div className="overflow-x-auto mt-2">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left py-2 pr-4 font-medium">Gas Mark</th>
                  <th className="text-left py-2 pr-4 font-medium">°F</th>
                  <th className="text-left py-2 pr-4 font-medium">°C</th>
                  <th className="text-left py-2 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {gasMarks.slice(2, 10).map((gas) => (
                  <tr key={gas.mark} className="border-b border-gray-200">
                    <td className="py-2 pr-4 font-semibold">{gas.mark}</td>
                    <td className="py-2 pr-4">{gas.fahrenheit}°F</td>
                    <td className="py-2 pr-4">{gas.celsius}°C</td>
                    <td className="py-2">{gas.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs mt-3">Gas marks are common in UK recipes. Most US ovens use Fahrenheit.</p>
        </InsightCard>
      </div>
    </div>
  );
}
