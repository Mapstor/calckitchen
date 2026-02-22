"use client";

import { useState, useMemo, useCallback } from "react";
import {
  StatCard,
  InsightCard,
  TempComparisonChart,
  TimeComparisonChart,
  ComparisonBarChart,
  CHART_COLORS,
} from "@/components/charts";

type ConversionDirection = "conventional-to-convection" | "convection-to-conventional";
type ConversionMethod = "temperature" | "time" | "both";
type FoodType = "baked-goods" | "roasts" | "casseroles" | "cookies" | "breads" | "other";

const foodTypeInfo: Record<FoodType, { name: string; tip: string }> = {
  "baked-goods": {
    name: "Cakes & Pastries",
    tip: "Reduce temperature only — baked goods need full time for structure to set."
  },
  "roasts": {
    name: "Roasts & Meats",
    tip: "Either method works. Temperature reduction often preferred to maintain browning."
  },
  "casseroles": {
    name: "Casseroles",
    tip: "Either method works well. Check 5-10 minutes early."
  },
  "cookies": {
    name: "Cookies",
    tip: "Reduce temperature by 25°F. Watch closely — cookies brown faster in convection."
  },
  "breads": {
    name: "Breads",
    tip: "Reduce temperature only. Convection creates excellent crust."
  },
  "other": {
    name: "Other",
    tip: "General rule: reduce temp by 25°F OR time by 25%, not both."
  },
};

export default function ConvectionOvenConverter() {
  const [direction, setDirection] = useState<ConversionDirection>("conventional-to-convection");
  const [temperature, setTemperature] = useState<number>(350);
  const [tempUnit, setTempUnit] = useState<"F" | "C">("F");
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(30);
  const [method, setMethod] = useState<ConversionMethod>("temperature");
  const [foodType, setFoodType] = useState<FoodType>("other");
  const [showResults, setShowResults] = useState<boolean>(false);

  // Reset results when inputs change
  const resetResults = useCallback(() => setShowResults(false), []);

  const results = useMemo(() => {
    const totalMinutes = hours * 60 + minutes;

    let newTemp = temperature;
    let newMinutes = totalMinutes;
    let tempAdjustment = 0;
    let timeAdjustment = 0;

    if (direction === "conventional-to-convection") {
      // Converting TO convection: reduce temp or time
      if (method === "temperature" || method === "both") {
        tempAdjustment = tempUnit === "F" ? -25 : -15;
        newTemp = temperature + tempAdjustment;
      }
      if (method === "time" || method === "both") {
        timeAdjustment = -0.25;
        newMinutes = Math.round(totalMinutes * 0.75);
      }
    } else {
      // Converting FROM convection: increase temp or time
      if (method === "temperature" || method === "both") {
        tempAdjustment = tempUnit === "F" ? 25 : 15;
        newTemp = temperature + tempAdjustment;
      }
      if (method === "time" || method === "both") {
        timeAdjustment = 0.33;
        newMinutes = Math.round(totalMinutes * 1.33);
      }
    }

    const newHours = Math.floor(newMinutes / 60);
    const remainingMinutes = newMinutes % 60;

    // Gas Mark conversion (approximate)
    const gasMarkFromF = (temp: number): string => {
      if (temp < 275) return "1";
      if (temp < 300) return "2";
      if (temp < 325) return "3";
      if (temp < 350) return "4";
      if (temp < 375) return "5";
      if (temp < 400) return "6";
      if (temp < 425) return "7";
      if (temp < 450) return "8";
      if (temp < 475) return "9";
      return "10";
    };

    const fToC = (f: number) => Math.round((f - 32) * 5 / 9);
    const cToF = (c: number) => Math.round(c * 9 / 5 + 32);

    const originalTempF = tempUnit === "F" ? temperature : cToF(temperature);
    const newTempF = tempUnit === "F" ? newTemp : cToF(newTemp);

    return {
      originalTemp: temperature,
      newTemp,
      tempAdjustment,
      originalTempOther: tempUnit === "F" ? fToC(temperature) : cToF(temperature),
      newTempOther: tempUnit === "F" ? fToC(newTemp) : cToF(newTemp),
      originalGasMark: gasMarkFromF(originalTempF),
      newGasMark: gasMarkFromF(newTempF),
      originalHours: hours,
      originalMinutes: minutes,
      newHours,
      newMinutes: remainingMinutes,
      totalOriginalMinutes: totalMinutes,
      totalNewMinutes: newMinutes,
      timeAdjustmentPercent: Math.round(timeAdjustment * 100),
    };
  }, [direction, temperature, tempUnit, hours, minutes, method]);

  const formatTime = (h: number, m: number): string => {
    if (h === 0) return `${m} min`;
    if (m === 0) return h === 1 ? `${h} hour` : `${h} hours`;
    return `${h}h ${m}m`;
  };

  return (
    <div className="calculator-card p-6 md:p-8">
      <div className="space-y-6">
        {/* Direction Toggle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Conversion Direction
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => { setDirection("conventional-to-convection"); resetResults(); }}
              className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                direction === "conventional-to-convection"
                  ? "bg-coral text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Conventional → Convection
            </button>
            <button
              onClick={() => { setDirection("convection-to-conventional"); resetResults(); }}
              className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                direction === "convection-to-conventional"
                  ? "bg-coral text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Convection → Conventional
            </button>
          </div>
        </div>

        {/* Temperature Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Original Temperature
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={temperature}
              onChange={(e) => { setTemperature(Number(e.target.value)); resetResults(); }}
              className="input-field flex-1"
              min={100}
              max={550}
            />
            <select
              value={tempUnit}
              onChange={(e) => { setTempUnit(e.target.value as "F" | "C"); resetResults(); }}
              className="input-field w-20"
            >
              <option value="F">°F</option>
              <option value="C">°C</option>
            </select>
          </div>
          {/* Quick Presets */}
          <div className="flex flex-wrap gap-2 mt-2">
            {[300, 325, 350, 375, 400, 425, 450].map((temp) => (
              <button
                key={temp}
                onClick={() => { setTemperature(temp); setTempUnit("F"); resetResults(); }}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  temperature === temp && tempUnit === "F"
                    ? "bg-coral text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {temp}°F
              </button>
            ))}
          </div>
        </div>

        {/* Time Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Original Cooking Time
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              value={hours}
              onChange={(e) => { setHours(Number(e.target.value)); resetResults(); }}
              className="input-field w-20"
              min={0}
              max={24}
            />
            <span className="text-gray-600">hours</span>
            <input
              type="number"
              value={minutes}
              onChange={(e) => { setMinutes(Number(e.target.value)); resetResults(); }}
              className="input-field w-20"
              min={0}
              max={59}
            />
            <span className="text-gray-600">min</span>
          </div>
        </div>

        {/* Conversion Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Conversion Method
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => { setMethod("temperature"); resetResults(); }}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                method === "temperature"
                  ? "bg-coral text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Adjust Temp Only
            </button>
            <button
              onClick={() => { setMethod("time"); resetResults(); }}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                method === "time"
                  ? "bg-coral text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Adjust Time Only
            </button>
            <button
              onClick={() => { setMethod("both"); resetResults(); }}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                method === "both"
                  ? "bg-coral text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Adjust Both
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Most recipes: adjust temperature only. For roasts wanting faster cooking: adjust time.
          </p>
        </div>

        {/* Food Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Food Type (Optional)
          </label>
          <select
            value={foodType}
            onChange={(e) => { setFoodType(e.target.value as FoodType); resetResults(); }}
            className="input-field w-full"
          >
            {Object.entries(foodTypeInfo).map(([key, { name }]) => (
              <option key={key} value={key}>{name}</option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setShowResults(true)}
          className="btn-primary w-full sm:w-auto"
        >
          Convert
        </button>

        {/* Results */}
        {showResults && (
        <div className="results-panel space-y-6">
          <h3 className="font-serif text-lg font-semibold text-gray-900 mb-4">
            Converted Settings
          </h3>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard
              label="New Temp"
              value={`${results.newTemp}°${tempUnit}`}
              sublabel={`${results.newTempOther}°${tempUnit === "F" ? "C" : "F"}`}
              color="coral"
            />
            <StatCard
              label="New Time"
              value={formatTime(results.newHours, results.newMinutes)}
              sublabel={results.timeAdjustmentPercent !== 0 ? `${results.timeAdjustmentPercent > 0 ? "+" : ""}${results.timeAdjustmentPercent}%` : "No change"}
              color="blue"
            />
            <StatCard
              label="Temp Change"
              value={results.tempAdjustment !== 0 ? `${results.tempAdjustment > 0 ? "+" : ""}${results.tempAdjustment}°` : "0°"}
              sublabel={results.tempAdjustment < 0 ? "Reduced" : results.tempAdjustment > 0 ? "Increased" : "Same"}
              color={results.tempAdjustment < 0 ? "green" : results.tempAdjustment > 0 ? "amber" : "gray"}
            />
            <StatCard
              label="Gas Mark"
              value={results.newGasMark}
              sublabel={`From ${results.originalGasMark}`}
              color="purple"
            />
          </div>

          {/* Main Result Summary */}
          <div className="bg-gradient-to-r from-coral/10 to-amber-50 rounded-lg p-6 border border-coral/20">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">🔥</span>
              <div>
                <p className="text-sm text-gray-600">
                  {direction === "conventional-to-convection" ? "Convection" : "Conventional"} Oven Setting
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {results.newTemp}°{tempUnit} for {formatTime(results.newHours, results.newMinutes)}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {direction === "conventional-to-convection"
                ? "Convection ovens circulate hot air, cooking food faster and more evenly."
                : "Conventional ovens use radiant heat from the top and bottom elements."}
            </p>
          </div>

          {/* Visual Comparisons */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Temperature Comparison */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Temperature Comparison</h4>
              <TempComparisonChart
                original={{
                  label: direction === "conventional-to-convection" ? "Conventional" : "Convection",
                  temp: results.originalTemp,
                }}
                converted={{
                  label: direction === "conventional-to-convection" ? "Convection" : "Conventional",
                  temp: results.newTemp,
                }}
                unit={tempUnit}
                height={80}
              />
            </div>

            {/* Time Comparison */}
            {method !== "temperature" && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Time Comparison</h4>
                <TimeComparisonChart
                  original={{
                    label: direction === "conventional-to-convection" ? "Conventional" : "Convection",
                    minutes: results.totalOriginalMinutes,
                  }}
                  converted={{
                    label: direction === "conventional-to-convection" ? "Convection" : "Conventional",
                    minutes: results.totalNewMinutes,
                  }}
                  height={80}
                />
              </div>
            )}

            {/* Method Explanation */}
            {method === "temperature" && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Why Temperature Only?</h4>
                <p className="text-sm text-gray-600">
                  Adjusting temperature only is preferred for baking because it maintains the
                  correct cooking time for proper structure development while accounting for
                  the more efficient heat distribution of convection.
                </p>
              </div>
            )}
          </div>

          {/* Method Comparison Chart */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">All Conversion Methods Compared</h4>
            <ComparisonBarChart
              data={[
                {
                  name: "Temp Only",
                  value: method === "temperature" ? 100 : 75,
                  fill: method === "temperature" ? CHART_COLORS.primary : "#9CA3AF",
                },
                {
                  name: "Time Only",
                  value: method === "time" ? 100 : 60,
                  fill: method === "time" ? CHART_COLORS.primary : "#9CA3AF",
                },
                {
                  name: "Both",
                  value: method === "both" ? 100 : 50,
                  fill: method === "both" ? CHART_COLORS.primary : "#9CA3AF",
                },
              ]}
              height={100}
              unit="% common"
            />
            <p className="text-xs text-gray-500 mt-2 text-center">
              Temperature-only adjustment is most common for baking
            </p>
          </div>

          {/* Step-by-Step Instructions */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">How to Use This Setting</h4>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-coral text-white rounded-full flex items-center justify-center text-sm font-medium">1</span>
                <div>
                  <p className="font-medium text-gray-900">Preheat Your Oven</p>
                  <p className="text-sm text-gray-600">
                    Set your {direction === "conventional-to-convection" ? "convection" : "conventional"} oven
                    to {results.newTemp}°{tempUnit} and allow it to fully preheat.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-coral text-white rounded-full flex items-center justify-center text-sm font-medium">2</span>
                <div>
                  <p className="font-medium text-gray-900">Set Your Timer</p>
                  <p className="text-sm text-gray-600">
                    Cook for {formatTime(results.newHours, results.newMinutes)}.
                    {method !== "temperature" && " Check 5-10 minutes early as convection can vary."}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-coral text-white rounded-full flex items-center justify-center text-sm font-medium">3</span>
                <div>
                  <p className="font-medium text-gray-900">Check for Doneness</p>
                  <p className="text-sm text-gray-600">
                    Use a thermometer or visual cues to confirm food is fully cooked.
                    {direction === "conventional-to-convection" && " Convection may brown faster."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Food Type Tips */}
          <div className="grid gap-3 md:grid-cols-2">
            <InsightCard type="tip" title={`Tips for ${foodTypeInfo[foodType].name}`}>
              <p className="text-sm">{foodTypeInfo[foodType].tip}</p>
            </InsightCard>
            <InsightCard
              type={direction === "conventional-to-convection" ? "info" : "warning"}
              title={direction === "conventional-to-convection" ? "Convection Benefits" : "Conventional Notes"}
            >
              <p className="text-sm">
                {direction === "conventional-to-convection"
                  ? "Convection creates crispier exteriors, more even browning, and can cook multiple racks at once."
                  : "Conventional ovens may have hot spots. Rotate pans halfway through for even cooking."}
              </p>
            </InsightCard>
          </div>

          {/* Rack Position Guide */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Rack Position Guide</h4>
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="text-center">
                <p className="font-medium text-blue-800">Upper Third</p>
                <p className="text-blue-700 text-xs">Broiling, browning tops</p>
              </div>
              <div className="text-center bg-blue-100 rounded-lg p-2">
                <p className="font-medium text-blue-800">Middle</p>
                <p className="text-blue-700 text-xs">Most baking (recommended)</p>
              </div>
              <div className="text-center">
                <p className="font-medium text-blue-800">Lower Third</p>
                <p className="text-blue-700 text-xs">Pizza, crispy bottoms</p>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Quick Reference Table */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Quick Reference</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Conventional</th>
                  <th className="text-left py-2 pr-4">Convection</th>
                  <th className="text-left py-2">Gas Mark</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {[
                  { conv: 300, convc: 275, gas: "2" },
                  { conv: 325, convc: 300, gas: "3" },
                  { conv: 350, convc: 325, gas: "4" },
                  { conv: 375, convc: 350, gas: "5" },
                  { conv: 400, convc: 375, gas: "6" },
                  { conv: 425, convc: 400, gas: "7" },
                  { conv: 450, convc: 425, gas: "8" },
                ].map((row) => (
                  <tr key={row.conv} className="border-b border-gray-100">
                    <td className="py-2 pr-4">{row.conv}°F</td>
                    <td className="py-2 pr-4">{row.convc}°F</td>
                    <td className="py-2">{row.gas}</td>
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
