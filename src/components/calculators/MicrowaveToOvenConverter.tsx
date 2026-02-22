"use client";

import { useState, useMemo, useCallback } from "react";
import {
  microwaveFoods,
  foodCategories,
  wattageOptions,
  powerLevelOptions,
  ovenTempPresets,
  ovenToMicrowave,
  microwaveToOven,
  convertForWattage,
  getFoodTime,
  formatTimeMinSec,
  getPowerLevelLabel,
  getSuggestedOvenTemp,
  MicrowaveFood,
} from "@/data/microwave-food-times";
import {
  StatCard,
  InsightCard,
  TimeComparisonChart,
  ComparisonBarChart,
  CHART_COLORS,
} from "@/components/charts";

type Mode = "oven-to-microwave" | "microwave-to-oven" | "wattage" | "food-lookup";
type TempUnit = "F" | "C";

function fahrenheitToCelsius(f: number): number {
  return Math.round(((f - 32) * 5) / 9);
}

function celsiusToFahrenheit(c: number): number {
  return Math.round((c * 9) / 5 + 32);
}

export default function MicrowaveToOvenConverter() {
  // Mode
  const [mode, setMode] = useState<Mode>("oven-to-microwave");

  // Common settings
  const [yourWattage, setYourWattage] = useState<number>(1000);
  const [tempUnit, setTempUnit] = useState<TempUnit>("F");

  // Oven to Microwave inputs
  const [ovenTemp, setOvenTemp] = useState<number>(350);
  const [ovenTimeHours, setOvenTimeHours] = useState<number>(0);
  const [ovenTimeMinutes, setOvenTimeMinutes] = useState<number>(30);
  const [powerLevel, setPowerLevel] = useState<number>(100);

  // Microwave to Oven inputs
  const [microwaveTimeMinutes, setMicrowaveTimeMinutes] = useState<number>(5);
  const [microwavePowerLevel, setMicrowavePowerLevel] = useState<number>(100);

  // Wattage converter inputs
  const [originalWattage, setOriginalWattage] = useState<number>(1000);
  const [originalTimeMinutes, setOriginalTimeMinutes] = useState<number>(5);

  // Food lookup inputs
  const [selectedFood, setSelectedFood] = useState<string>(microwaveFoods[0].key);
  const [foodQuantity, setFoodQuantity] = useState<number>(1);

  // Show results state
  const [showResults, setShowResults] = useState<boolean>(false);

  // Reset results when inputs change
  const resetResults = useCallback(() => setShowResults(false), []);

  // Get selected food data
  const currentFood = useMemo(() => {
    return microwaveFoods.find((f) => f.key === selectedFood);
  }, [selectedFood]);

  // Calculate oven to microwave conversion
  const ovenToMicrowaveResult = useMemo(() => {
    const totalOvenMinutes = ovenTimeHours * 60 + ovenTimeMinutes;
    const microwaveTime = ovenToMicrowave(totalOvenMinutes, yourWattage, powerLevel);
    return {
      time: microwaveTime,
      timeFormatted: formatTimeMinSec(microwaveTime),
      powerLevel: powerLevel,
      standTime: "1–2 minutes",
    };
  }, [ovenTimeHours, ovenTimeMinutes, yourWattage, powerLevel]);

  // Calculate microwave to oven conversion
  const microwaveToOvenResult = useMemo(() => {
    const ovenTime = microwaveToOven(microwaveTimeMinutes, yourWattage, microwavePowerLevel);
    const suggestedTemp = getSuggestedOvenTemp(microwavePowerLevel);
    return {
      time: ovenTime,
      timeFormatted: formatTimeMinSec(ovenTime),
      tempF: suggestedTemp,
      tempC: fahrenheitToCelsius(suggestedTemp),
    };
  }, [microwaveTimeMinutes, yourWattage, microwavePowerLevel]);

  // Calculate wattage conversion
  const wattageResult = useMemo(() => {
    const adjustedTime = convertForWattage(originalTimeMinutes, originalWattage, yourWattage);
    return {
      time: adjustedTime,
      timeFormatted: formatTimeMinSec(adjustedTime),
    };
  }, [originalTimeMinutes, originalWattage, yourWattage]);

  // Calculate food lookup result
  const foodLookupResult = useMemo(() => {
    if (!currentFood) return null;
    const times = getFoodTime(currentFood, foodQuantity, yourWattage);
    return {
      timeLow: times.timeLow,
      timeHigh: times.timeHigh,
      timeLowFormatted: formatTimeMinSec(times.timeLow),
      timeHighFormatted: formatTimeMinSec(times.timeHigh),
      powerLevel: currentFood.powerLevel,
      tips: currentFood.tips,
      safetyNote: currentFood.safetyNote,
    };
  }, [currentFood, foodQuantity, yourWattage]);

  // Handle food selection change
  const handleFoodChange = (foodKey: string) => {
    setSelectedFood(foodKey);
    const food = microwaveFoods.find((f) => f.key === foodKey);
    if (food) {
      setFoodQuantity(food.defaultQuantity);
    }
    resetResults();
  };

  return (
    <div className="calculator-card p-6 md:p-8">
      {/* Mode Selection */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => { setMode("oven-to-microwave"); resetResults(); }}
          className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
            mode === "oven-to-microwave"
              ? "bg-coral text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Oven → Microwave
        </button>
        <button
          onClick={() => { setMode("microwave-to-oven"); resetResults(); }}
          className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
            mode === "microwave-to-oven"
              ? "bg-coral text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Microwave → Oven
        </button>
        <button
          onClick={() => { setMode("wattage"); resetResults(); }}
          className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
            mode === "wattage"
              ? "bg-coral text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Wattage Converter
        </button>
        <button
          onClick={() => { setMode("food-lookup"); resetResults(); }}
          className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
            mode === "food-lookup"
              ? "bg-coral text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Food Times
        </button>
      </div>

      {/* Your Microwave Wattage (shown for all modes) */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Microwave Wattage
        </label>
        <select
          value={yourWattage}
          onChange={(e) => { setYourWattage(Number(e.target.value)); resetResults(); }}
          className="select-field w-full max-w-xs"
        >
          {wattageOptions.map((w) => (
            <option key={w} value={w}>
              {w}W
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-2">
          Check the label inside your microwave door or do the water boil test: 1 cup cold
          water boils in ~2 min = 1000W, ~2.5 min = 800W, ~3 min = 700W.
        </p>
      </div>

      {/* Oven to Microwave Mode */}
      {mode === "oven-to-microwave" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Oven Temperature
              </label>
              <div className="flex gap-2 flex-wrap">
                <input
                  type="number"
                  value={ovenTemp}
                  onChange={(e) => { setOvenTemp(Number(e.target.value)); resetResults(); }}
                  className="input-field w-24"
                  min={200}
                  max={500}
                />
                <div className="flex rounded-lg overflow-hidden border border-gray-200">
                  <button
                    onClick={() => { setTempUnit("F"); resetResults(); }}
                    className={`px-3 py-2 text-sm font-medium ${
                      tempUnit === "F" ? "bg-coral text-white" : "bg-white text-gray-700"
                    }`}
                  >
                    °F
                  </button>
                  <button
                    onClick={() => { setTempUnit("C"); resetResults(); }}
                    className={`px-3 py-2 text-sm font-medium ${
                      tempUnit === "C" ? "bg-coral text-white" : "bg-white text-gray-700"
                    }`}
                  >
                    °C
                  </button>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                {ovenTempPresets.map((temp) => (
                  <button
                    key={temp}
                    onClick={() => { setOvenTemp(temp); resetResults(); }}
                    className={`px-3 py-1 text-sm rounded border ${
                      ovenTemp === temp
                        ? "bg-coral text-white border-coral"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {temp}°
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Oven Cooking Time
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  value={ovenTimeHours}
                  onChange={(e) => { setOvenTimeHours(Number(e.target.value)); resetResults(); }}
                  className="input-field w-16"
                  min={0}
                  max={12}
                />
                <span className="text-gray-600">hr</span>
                <input
                  type="number"
                  value={ovenTimeMinutes}
                  onChange={(e) => { setOvenTimeMinutes(Number(e.target.value)); resetResults(); }}
                  className="input-field w-20"
                  min={0}
                  max={59}
                />
                <span className="text-gray-600">min</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Microwave Power Level
            </label>
            <select
              value={powerLevel}
              onChange={(e) => { setPowerLevel(Number(e.target.value)); resetResults(); }}
              className="select-field w-full max-w-xs"
            >
              {powerLevelOptions.map((opt) => (
                <option key={opt.level} value={opt.level}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setShowResults(true)}
            className="btn-primary w-full sm:w-auto"
          >
            Convert to Microwave
          </button>

          {/* Results */}
          {showResults && (
          <div className="results-panel">
            <h3 className="font-serif text-lg font-semibold text-gray-900 mb-4">
              Microwave Conversion Results
            </h3>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <StatCard
                label="Microwave Time"
                value={ovenToMicrowaveResult.timeFormatted}
                color="coral"
              />
              <StatCard
                label="Power Level"
                value={getPowerLevelLabel(ovenToMicrowaveResult.powerLevel)}
                color="blue"
              />
              <StatCard
                label="Time Saved"
                value={`${Math.round((ovenTimeHours * 60 + ovenTimeMinutes) - ovenToMicrowaveResult.time)} min`}
                sublabel={`${Math.round(((ovenTimeHours * 60 + ovenTimeMinutes - ovenToMicrowaveResult.time) / (ovenTimeHours * 60 + ovenTimeMinutes)) * 100)}% faster`}
                color="green"
              />
              <StatCard
                label="Stand Time"
                value={ovenToMicrowaveResult.standTime}
                sublabel="Let food rest"
                color="amber"
              />
            </div>

            {/* Time Comparison Chart */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Time Comparison</h4>
              <TimeComparisonChart
                original={{ label: "Oven", minutes: ovenTimeHours * 60 + ovenTimeMinutes }}
                converted={{ label: "Microwave", minutes: Math.round(ovenToMicrowaveResult.time) }}
              />
            </div>

            {/* Cooking Instructions */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Microwave Instructions</h4>
              <ol className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-coral text-white text-xs flex items-center justify-center flex-shrink-0">1</span>
                  <span>Set microwave to <strong>{getPowerLevelLabel(ovenToMicrowaveResult.powerLevel)}</strong></span>
                </li>
                <li className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-coral text-white text-xs flex items-center justify-center flex-shrink-0">2</span>
                  <span>Cook for <strong>{ovenToMicrowaveResult.timeFormatted}</strong></span>
                </li>
                <li className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-coral text-white text-xs flex items-center justify-center flex-shrink-0">3</span>
                  <span>Check halfway through and rotate if needed</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-coral text-white text-xs flex items-center justify-center flex-shrink-0">4</span>
                  <span>Let stand <strong>{ovenToMicrowaveResult.standTime}</strong> before serving</span>
                </li>
              </ol>
            </div>

            {/* Tips and Insights */}
            <div className="space-y-3">
              <InsightCard type="info" title="Why Stand Time Matters">
                Food continues cooking from residual heat during standing time. This helps equalize temperature throughout and prevents overcooking.
              </InsightCard>

              {powerLevel < 100 && (
                <InsightCard type="tip" title="Lower Power = Better Results">
                  Using {getPowerLevelLabel(powerLevel)} helps food cook more evenly and prevents tough edges or dried-out spots.
                </InsightCard>
              )}

              <InsightCard type="warning" title="Not Ideal for Microwave">
                Foods that need browning, crispiness, or dry heat (roasts, baked goods, casseroles) won't have the same texture in a microwave.
              </InsightCard>
            </div>
          </div>
          )}
        </div>
      )}

      {/* Microwave to Oven Mode */}
      {mode === "microwave-to-oven" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Microwave Time (minutes)
              </label>
              <input
                type="number"
                value={microwaveTimeMinutes}
                onChange={(e) => { setMicrowaveTimeMinutes(Number(e.target.value)); resetResults(); }}
                className="input-field w-full"
                min={1}
                max={120}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Microwave Power Level
              </label>
              <select
                value={microwavePowerLevel}
                onChange={(e) => { setMicrowavePowerLevel(Number(e.target.value)); resetResults(); }}
                className="select-field w-full"
              >
                {powerLevelOptions.map((opt) => (
                  <option key={opt.level} value={opt.level}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={() => setShowResults(true)}
            className="btn-primary w-full sm:w-auto"
          >
            Convert to Oven
          </button>

          {/* Results */}
          {showResults && (
          <div className="results-panel">
            <h3 className="font-serif text-lg font-semibold text-gray-900 mb-4">
              Oven Conversion Results
            </h3>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <StatCard
                label="Oven Time"
                value={microwaveToOvenResult.timeFormatted}
                color="coral"
              />
              <StatCard
                label="Temperature"
                value={`${microwaveToOvenResult.tempF}°F`}
                sublabel={`${microwaveToOvenResult.tempC}°C`}
                color="amber"
              />
              <StatCard
                label="Preheat Time"
                value="10-15 min"
                sublabel="Allow oven to heat"
                color="blue"
              />
              <StatCard
                label="Check Early"
                value="10 min"
                sublabel="Before end time"
                color="green"
              />
            </div>

            {/* Time Comparison Chart */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Time Comparison</h4>
              <TimeComparisonChart
                original={{ label: "Microwave", minutes: microwaveTimeMinutes }}
                converted={{ label: "Oven", minutes: Math.round(microwaveToOvenResult.time) }}
              />
            </div>

            {/* Temperature Guide */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Temperature Options</h4>
              <ComparisonBarChart
                data={[
                  { name: "Low & Slow (300°F)", value: 300, fill: CHART_COLORS.secondary },
                  { name: `Recommended (${microwaveToOvenResult.tempF}°F)`, value: microwaveToOvenResult.tempF, fill: CHART_COLORS.primary },
                  { name: "High & Crispy (400°F)", value: 400, fill: CHART_COLORS.tertiary },
                ]}
                height={100}
                unit="°F"
              />
            </div>

            {/* Oven Instructions */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Oven Instructions</h4>
              <ol className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-coral text-white text-xs flex items-center justify-center flex-shrink-0">1</span>
                  <span>Preheat oven to <strong>{microwaveToOvenResult.tempF}°F ({microwaveToOvenResult.tempC}°C)</strong></span>
                </li>
                <li className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-coral text-white text-xs flex items-center justify-center flex-shrink-0">2</span>
                  <span>Transfer food to an oven-safe dish</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-coral text-white text-xs flex items-center justify-center flex-shrink-0">3</span>
                  <span>Bake for <strong>{microwaveToOvenResult.timeFormatted}</strong></span>
                </li>
                <li className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-coral text-white text-xs flex items-center justify-center flex-shrink-0">4</span>
                  <span>Check 10 minutes early for doneness</span>
                </li>
              </ol>
            </div>

            {/* Tips and Insights */}
            <div className="space-y-3">
              <InsightCard type="tip" title="Better Browning & Texture">
                Using an oven gives you browning, crispiness, and even cooking that microwaves can't achieve. Great for reheating pizza, casseroles, and baked goods!
              </InsightCard>

              {microwavePowerLevel < 100 && (
                <InsightCard type="info" title="Lower Power Conversion">
                  Since the microwave recipe uses {getPowerLevelLabel(microwavePowerLevel)}, we've adjusted the oven temp to {microwaveToOvenResult.tempF}°F for comparable gentle cooking.
                </InsightCard>
              )}

              <InsightCard type="warning" title="Oven vs. Microwave">
                Oven cooking takes longer but produces better texture for most foods. Don't rush it — let the dry heat work its magic.
              </InsightCard>
            </div>
          </div>
          )}
        </div>
      )}

      {/* Wattage Converter Mode */}
      {mode === "wattage" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Recipe Time (minutes)
              </label>
              <input
                type="number"
                value={originalTimeMinutes}
                onChange={(e) => { setOriginalTimeMinutes(Number(e.target.value)); resetResults(); }}
                className="input-field w-full"
                min={0.5}
                max={120}
                step={0.5}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipe's Microwave Wattage
              </label>
              <select
                value={originalWattage}
                onChange={(e) => { setOriginalWattage(Number(e.target.value)); resetResults(); }}
                className="select-field w-full"
              >
                {wattageOptions.map((w) => (
                  <option key={w} value={w}>
                    {w}W
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={() => setShowResults(true)}
            className="btn-primary w-full sm:w-auto"
          >
            Calculate Adjusted Time
          </button>

          {/* Results */}
          {showResults && (
          <div className="results-panel">
            <h3 className="font-serif text-lg font-semibold text-gray-900 mb-4">
              Adjusted Time for Your {yourWattage}W Microwave
            </h3>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <StatCard
                label="Original Time"
                value={formatTimeMinSec(originalTimeMinutes)}
                sublabel={`At ${originalWattage}W`}
                color="gray"
              />
              <StatCard
                label="Your Time"
                value={wattageResult.timeFormatted}
                sublabel={`At ${yourWattage}W`}
                color="coral"
              />
              <StatCard
                label="Difference"
                value={`${wattageResult.time > originalTimeMinutes ? "+" : ""}${Math.round(wattageResult.time - originalTimeMinutes)} min`}
                sublabel={wattageResult.time > originalTimeMinutes ? "More time needed" : "Less time needed"}
                color={wattageResult.time > originalTimeMinutes ? "amber" : "green"}
              />
              <StatCard
                label="Power Ratio"
                value={`${(originalWattage / yourWattage).toFixed(2)}x`}
                sublabel="Adjustment factor"
                color="blue"
              />
            </div>

            {/* Time Comparison Chart */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Time Comparison</h4>
              <ComparisonBarChart
                data={[
                  { name: `Recipe (${originalWattage}W)`, value: originalTimeMinutes, fill: "#9CA3AF" },
                  { name: `Your Microwave (${yourWattage}W)`, value: Math.round(wattageResult.time * 10) / 10, fill: CHART_COLORS.primary },
                ]}
                height={80}
                unit=" min"
              />
            </div>

            {/* Formula Explanation */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">How We Calculated This</h4>
              <div className="text-sm text-blue-800 space-y-2">
                <p><strong>Formula:</strong> Original Time × (Recipe Wattage ÷ Your Wattage)</p>
                <p className="font-mono bg-blue-100 px-3 py-2 rounded">
                  {originalTimeMinutes} min × ({originalWattage}W ÷ {yourWattage}W) = {wattageResult.time.toFixed(2)} min
                </p>
              </div>
            </div>

            {/* Wattage Reference */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Wattage Reference Chart</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-3 font-medium text-gray-700">Wattage</th>
                      <th className="text-center py-2 px-3 font-medium text-gray-700">Time for This Recipe</th>
                      <th className="text-center py-2 px-3 font-medium text-gray-700">Power Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[700, 800, 900, 1000, 1100, 1200].map((w) => {
                      const time = convertForWattage(originalTimeMinutes, originalWattage, w);
                      const isYours = w === yourWattage;
                      return (
                        <tr key={w} className={`border-b border-gray-100 ${isYours ? "bg-coral/10 font-medium" : ""}`}>
                          <td className="py-2 px-3">{w}W {isYours && "(Your microwave)"}</td>
                          <td className="text-center py-2 px-3">{formatTimeMinSec(time)}</td>
                          <td className="text-center py-2 px-3">
                            {w < 800 ? "Compact" : w < 1000 ? "Standard" : "High-power"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tips */}
            <div className="space-y-3">
              {yourWattage < originalWattage && (
                <InsightCard type="info" title="Lower Wattage = More Time">
                  Your {yourWattage}W microwave is less powerful than the recipe's {originalWattage}W, so you'll need {Math.round(wattageResult.time - originalTimeMinutes)} extra minutes.
                </InsightCard>
              )}

              {yourWattage > originalWattage && (
                <InsightCard type="tip" title="Higher Wattage = Less Time">
                  Your {yourWattage}W microwave is more powerful! Reduce time to avoid overcooking.
                </InsightCard>
              )}

              <InsightCard type="warning" title="Check Early">
                Always check food 30 seconds to 1 minute before the calculated time. Microwave power can vary even among same-wattage models.
              </InsightCard>
            </div>
          </div>
          )}
        </div>
      )}

      {/* Food Lookup Mode */}
      {mode === "food-lookup" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Food
              </label>
              <select
                value={selectedFood}
                onChange={(e) => handleFoodChange(e.target.value)}
                className="select-field w-full"
              >
                {foodCategories.map((cat) => (
                  <optgroup key={cat.key} label={cat.label}>
                    {microwaveFoods
                      .filter((f) => f.category === cat.key)
                      .map((food) => (
                        <option key={food.key} value={food.key}>
                          {food.label}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </select>
            </div>
            {currentFood && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity ({currentFood.quantityUnit})
                </label>
                <input
                  type="number"
                  value={foodQuantity}
                  onChange={(e) => { setFoodQuantity(Number(e.target.value)); resetResults(); }}
                  className="input-field w-full"
                  min={1}
                  max={currentFood.maxQuantity}
                />
              </div>
            )}
          </div>

          <button
            onClick={() => setShowResults(true)}
            className="btn-primary w-full sm:w-auto"
          >
            Show Cooking Times
          </button>

          {/* Results */}
          {showResults && foodLookupResult && currentFood && (
            <div className="results-panel">
              <h3 className="font-serif text-lg font-semibold text-gray-900 mb-4">
                {currentFood.label} — Microwave Guide
              </h3>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <StatCard
                  label="Cooking Time"
                  value={foodLookupResult.timeLowFormatted}
                  sublabel={foodLookupResult.timeLow !== foodLookupResult.timeHigh
                    ? `to ${foodLookupResult.timeHighFormatted}`
                    : undefined}
                  color="coral"
                />
                <StatCard
                  label="Power Level"
                  value={getPowerLevelLabel(foodLookupResult.powerLevel)}
                  sublabel={`${foodLookupResult.powerLevel}% power`}
                  color="blue"
                />
                <StatCard
                  label="Quantity"
                  value={`${foodQuantity}`}
                  sublabel={currentFood.quantityUnit}
                  color="green"
                />
                <StatCard
                  label="Your Microwave"
                  value={`${yourWattage}W`}
                  sublabel="Times adjusted"
                  color="amber"
                />
              </div>

              {/* Time Range Visualization */}
              {foodLookupResult.timeLow !== foodLookupResult.timeHigh && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Recommended Time Range</h4>
                  <div className="relative h-12 bg-gray-100 rounded-lg overflow-hidden">
                    <div
                      className="absolute h-full bg-gradient-to-r from-green-400 to-coral rounded-lg"
                      style={{
                        left: "10%",
                        right: "10%",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-between px-4">
                      <span className="text-xs font-medium text-gray-600 bg-white px-2 py-1 rounded">
                        Start checking: {foodLookupResult.timeLowFormatted}
                      </span>
                      <span className="text-xs font-medium text-gray-600 bg-white px-2 py-1 rounded">
                        Max time: {foodLookupResult.timeHighFormatted}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Cooking Steps */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">How to Cook {currentFood.label}</h4>
                <ol className="space-y-2 text-sm text-gray-700">
                  <li className="flex gap-2">
                    <span className="w-5 h-5 rounded-full bg-coral text-white text-xs flex items-center justify-center flex-shrink-0">1</span>
                    <span>Set microwave to <strong>{getPowerLevelLabel(foodLookupResult.powerLevel)}</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="w-5 h-5 rounded-full bg-coral text-white text-xs flex items-center justify-center flex-shrink-0">2</span>
                    <span>Cook for <strong>{foodLookupResult.timeLowFormatted}</strong> initially</span>
                  </li>
                  {foodLookupResult.timeLow !== foodLookupResult.timeHigh && (
                    <li className="flex gap-2">
                      <span className="w-5 h-5 rounded-full bg-coral text-white text-xs flex items-center justify-center flex-shrink-0">3</span>
                      <span>Check and add time in 30-second intervals up to <strong>{foodLookupResult.timeHighFormatted}</strong></span>
                    </li>
                  )}
                  <li className="flex gap-2">
                    <span className="w-5 h-5 rounded-full bg-coral text-white text-xs flex items-center justify-center flex-shrink-0">{foodLookupResult.timeLow !== foodLookupResult.timeHigh ? "4" : "3"}</span>
                    <span>Let stand 1-2 minutes before serving</span>
                  </li>
                </ol>
              </div>

              {/* Tips and Safety */}
              <div className="space-y-3">
                <InsightCard type="tip" title="Pro Tip">
                  {foodLookupResult.tips}
                </InsightCard>

                {foodLookupResult.safetyNote && (
                  <InsightCard type="warning" title="Food Safety">
                    {foodLookupResult.safetyNote}
                  </InsightCard>
                )}

                <InsightCard type="info" title="Quantity Adjustments">
                  Cooking time increases with quantity. For {foodQuantity > 1 ? "multiple items" : "larger portions"}, times have been adjusted. Always check for doneness.
                </InsightCard>
              </div>

              {/* Quantity Reference */}
              {currentFood.maxQuantity > 1 && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Time by Quantity</h4>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {Array.from({ length: Math.min(5, currentFood.maxQuantity) }, (_, i) => {
                      const qty = i + 1;
                      const times = getFoodTime(currentFood, qty, yourWattage);
                      const isSelected = qty === foodQuantity;
                      return (
                        <button
                          key={qty}
                          onClick={() => { setFoodQuantity(qty); }}
                          className={`p-2 rounded-lg text-center transition-colors ${
                            isSelected
                              ? "bg-coral text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          <div className="text-sm font-medium">{qty} {currentFood.quantityUnit}</div>
                          <div className="text-xs opacity-80">{formatTimeMinSec(times.timeLow)}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Conversion Formula Info */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>The Basic Rule:</strong> Microwave time at high power is roughly 1/4 (25%) of
          conventional oven time. Adjust for wattage: lower wattage = more time.
        </p>
      </div>
    </div>
  );
}
