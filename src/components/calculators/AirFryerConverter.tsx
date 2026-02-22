"use client";

import { useState, useCallback } from "react";
import {
  airFryerCategories,
  airFryerPresets,
  AirFryerCategory,
  AirFryerPreset,
} from "@/data/air-fryer-presets";
import {
  TimeComparisonChart,
  TempComparisonChart,
  StatCard,
  InsightCard,
  ComparisonTable,
} from "@/components/charts";

type Mode = "oven-to-air" | "preset" | "air-to-oven";
type TempUnit = "F" | "C";

function fahrenheitToCelsius(f: number): number {
  return Math.round(((f - 32) * 5) / 9);
}

function celsiusToFahrenheit(c: number): number {
  return Math.round((c * 9) / 5 + 32);
}

export default function AirFryerConverter() {
  // Mode
  const [mode, setMode] = useState<Mode>("oven-to-air");

  // Oven to Air Fryer inputs
  const [ovenTemp, setOvenTemp] = useState<number>(375);
  const [ovenTime, setOvenTime] = useState<number>(25);
  const [tempUnit, setTempUnit] = useState<TempUnit>("F");

  // Preset inputs
  const [category, setCategory] = useState<AirFryerCategory>("chicken");
  const [selectedPreset, setSelectedPreset] = useState<string>(
    airFryerPresets["chicken"][0].key
  );

  // Air to Oven inputs
  const [airTemp, setAirTemp] = useState<number>(375);
  const [airTime, setAirTime] = useState<number>(20);

  // Show results state
  const [showResults, setShowResults] = useState<boolean>(false);

  // Reset results when inputs change
  const resetResults = useCallback(() => setShowResults(false), []);

  // Get the current preset
  const currentPreset: AirFryerPreset | undefined = airFryerPresets[
    category
  ].find((p) => p.key === selectedPreset);

  // Calculate oven to air fryer conversion
  const calculateOvenToAir = () => {
    let tempF = tempUnit === "F" ? ovenTemp : celsiusToFahrenheit(ovenTemp);
    let airFryerTempF = tempF - 25;
    airFryerTempF = Math.max(325, Math.min(450, airFryerTempF));
    const airFryerTime = Math.round(ovenTime * 0.8);
    const flipTime = Math.round(airFryerTime / 2);

    return {
      tempF: airFryerTempF,
      tempC: fahrenheitToCelsius(airFryerTempF),
      time: airFryerTime,
      flipTime,
      warning:
        tempF < 300
          ? "Very low oven temperatures may not convert well to air fryer. The air fryer's minimum practical temp is around 325°F (163°C)."
          : tempF > 475
            ? "Most air fryers max out at 400–450°F. The converted temperature exceeds most air fryer limits."
            : ovenTime > 60
              ? "For long-cooking recipes, the air fryer may not be the best choice. Consider using your oven for even, extended cooking."
              : null,
    };
  };

  // Calculate air fryer to oven conversion
  const calculateAirToOven = () => {
    const ovenTempF = airTemp + 25;
    const ovenTimeMin = Math.round(airTime * 1.25);

    return {
      tempF: ovenTempF,
      tempC: fahrenheitToCelsius(ovenTempF),
      time: ovenTimeMin,
    };
  };

  const ovenToAirResult = calculateOvenToAir();
  const airToOvenResult = calculateAirToOven();

  const getFlipText = (flipType: string, timeMin: number, timeMax: number) => {
    const midpoint = Math.round((timeMin + timeMax) / 2);
    switch (flipType) {
      case "flip":
        return `Flip at ${midpoint} minutes`;
      case "shake":
        return `Shake basket at ${midpoint} minutes`;
      case "turn":
        return `Turn at ${midpoint} minutes`;
      default:
        return null;
    }
  };

  return (
    <div className="calculator-card p-6 md:p-8">
      {/* Mode Selection */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => { setMode("oven-to-air"); resetResults(); }}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            mode === "oven-to-air"
              ? "bg-coral text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Oven → Air Fryer
        </button>
        <button
          onClick={() => { setMode("preset"); resetResults(); }}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            mode === "preset"
              ? "bg-coral text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Food Presets
        </button>
        <button
          onClick={() => { setMode("air-to-oven"); resetResults(); }}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            mode === "air-to-oven"
              ? "bg-coral text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Air Fryer → Oven
        </button>
      </div>

      {/* Oven to Air Fryer Mode */}
      {mode === "oven-to-air" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Oven Temperature
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={ovenTemp}
                  onChange={(e) => { setOvenTemp(Number(e.target.value)); resetResults(); }}
                  className="input-field flex-1"
                  min={200}
                  max={500}
                />
                <div className="flex rounded-lg overflow-hidden border border-gray-200">
                  <button
                    onClick={() => setTempUnit("F")}
                    className={`px-3 py-2 text-sm font-medium ${
                      tempUnit === "F"
                        ? "bg-coral text-white"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    °F
                  </button>
                  <button
                    onClick={() => setTempUnit("C")}
                    className={`px-3 py-2 text-sm font-medium ${
                      tempUnit === "C"
                        ? "bg-coral text-white"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    °C
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Oven Cooking Time (minutes)
              </label>
              <input
                type="number"
                value={ovenTime}
                onChange={(e) => { setOvenTime(Number(e.target.value)); resetResults(); }}
                className="input-field w-full"
                min={1}
                max={300}
              />
            </div>
          </div>

          <button
            onClick={() => setShowResults(true)}
            className="btn-primary w-full sm:w-auto"
          >
            Convert to Air Fryer
          </button>

          {/* Results */}
          {showResults && (
          <div className="results-panel space-y-6">
            <h3 className="font-serif text-lg font-semibold text-gray-900">
              Air Fryer Settings
            </h3>

            {/* Main Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <StatCard
                label="Air Fryer Temp"
                value={`${ovenToAirResult.tempF}°F`}
                sublabel={`${ovenToAirResult.tempC}°C`}
                color="coral"
              />
              <StatCard
                label="Cooking Time"
                value={`${ovenToAirResult.time} min`}
                sublabel={`Flip at ${ovenToAirResult.flipTime} min`}
                color="blue"
              />
              <StatCard
                label="Time Saved"
                value={`${ovenTime - ovenToAirResult.time} min`}
                sublabel={`${Math.round(((ovenTime - ovenToAirResult.time) / ovenTime) * 100)}% faster`}
                color="green"
              />
              <StatCard
                label="Temp Reduced"
                value={`25°F`}
                sublabel="standard conversion"
                color="amber"
              />
            </div>

            {/* Visual Comparisons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white border border-gray-200 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Time Comparison</h4>
                <TimeComparisonChart
                  original={{ label: "Oven", minutes: ovenTime }}
                  converted={{ label: "Air Fryer", minutes: ovenToAirResult.time }}
                />
              </div>
              <div className="p-4 bg-white border border-gray-200 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Temperature Comparison</h4>
                <TempComparisonChart
                  original={{ label: "Oven", temp: tempUnit === "F" ? ovenTemp : Math.round((ovenTemp * 9/5) + 32) }}
                  converted={{ label: "Air Fryer", temp: ovenToAirResult.tempF }}
                  unit="F"
                />
              </div>
            </div>

            {/* Cooking Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InsightCard type="tip" title="Flip Reminder">
                Shake basket or flip food at <strong>{ovenToAirResult.flipTime} minutes</strong> for even browning and crispiness.
              </InsightCard>
              <InsightCard type="info" title="Preheat First">
                Preheat your air fryer for 3-5 minutes before cooking for best results.
              </InsightCard>
            </div>

            {/* Energy Savings Estimate */}
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="text-sm font-medium text-green-800 mb-2">Estimated Energy Savings</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-700">~70%</p>
                  <p className="text-xs text-green-600">Less energy used</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-700">{ovenTime - ovenToAirResult.time} min</p>
                  <p className="text-xs text-green-600">Time saved</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-700">Less</p>
                  <p className="text-xs text-green-600">Kitchen heat</p>
                </div>
              </div>
            </div>

            {ovenToAirResult.warning && (
              <InsightCard type="warning">{ovenToAirResult.warning}</InsightCard>
            )}
          </div>
          )}
        </div>
      )}

      {/* Food Presets Mode */}
      {mode === "preset" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Food Category
              </label>
              <select
                value={category}
                onChange={(e) => {
                  const newCategory = e.target.value as AirFryerCategory;
                  setCategory(newCategory);
                  setSelectedPreset(airFryerPresets[newCategory][0].key);
                  resetResults();
                }}
                className="select-field w-full"
              >
                {airFryerCategories.map((cat) => (
                  <option key={cat.key} value={cat.key}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Food
              </label>
              <select
                value={selectedPreset}
                onChange={(e) => { setSelectedPreset(e.target.value); resetResults(); }}
                className="select-field w-full"
              >
                {airFryerPresets[category].map((preset) => (
                  <option key={preset.key} value={preset.key}>
                    {preset.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={() => setShowResults(true)}
            className="btn-primary w-full sm:w-auto"
          >
            Show Settings
          </button>

          {/* Preset Results */}
          {showResults && currentPreset && (
            <div className="results-panel space-y-6">
              <h3 className="font-serif text-lg font-semibold text-gray-900">
                {currentPreset.label}
              </h3>

              {/* Main Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <StatCard
                  label="Temperature"
                  value={`${currentPreset.temp_f}°F`}
                  sublabel={`${fahrenheitToCelsius(currentPreset.temp_f)}°C`}
                  color="coral"
                />
                <StatCard
                  label="Cook Time"
                  value={`${currentPreset.time_min}-${currentPreset.time_max}`}
                  sublabel="minutes"
                  color="blue"
                />
                {currentPreset.flip !== "none" && (
                  <StatCard
                    label={currentPreset.flip === "shake" ? "Shake At" : "Flip At"}
                    value={`${Math.round((currentPreset.time_min + currentPreset.time_max) / 2)}`}
                    sublabel="minutes"
                    color="amber"
                  />
                )}
                {currentPreset.internal_temp_f && (
                  <StatCard
                    label="Internal Temp"
                    value={`${currentPreset.internal_temp_f}°F`}
                    sublabel={`${fahrenheitToCelsius(currentPreset.internal_temp_f)}°C`}
                    color="green"
                  />
                )}
              </div>

              {/* Detailed Instructions */}
              <div className="p-4 bg-white border border-gray-200 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Step-by-Step</h4>
                <ol className="space-y-2 text-sm text-gray-700">
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-coral text-white rounded-full flex items-center justify-center text-xs">1</span>
                    <span>Preheat air fryer to <strong>{currentPreset.temp_f}°F</strong> for 3-5 minutes</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-coral text-white rounded-full flex items-center justify-center text-xs">2</span>
                    <span>Place {currentPreset.label.toLowerCase()} in basket in single layer</span>
                  </li>
                  {currentPreset.flip !== "none" && (
                    <li className="flex gap-2">
                      <span className="flex-shrink-0 w-5 h-5 bg-coral text-white rounded-full flex items-center justify-center text-xs">3</span>
                      <span>{currentPreset.flip === "shake" ? "Shake basket" : "Flip food"} at {Math.round((currentPreset.time_min + currentPreset.time_max) / 2)} minutes</span>
                    </li>
                  )}
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-coral text-white rounded-full flex items-center justify-center text-xs">{currentPreset.flip !== "none" ? 4 : 3}</span>
                    <span>
                      Cook until {currentPreset.internal_temp_f
                        ? `internal temp reaches ${currentPreset.internal_temp_f}°F`
                        : "golden and crispy"}
                    </span>
                  </li>
                </ol>
              </div>

              {/* Tips and Notes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentPreset.notes && (
                  <InsightCard type="tip" title="Pro Tip">
                    {currentPreset.notes}
                  </InsightCard>
                )}
                {currentPreset.internal_temp_f && (
                  <InsightCard type="warning" title="Food Safety">
                    Always check internal temperature with a meat thermometer. Target: {currentPreset.internal_temp_f}°F ({fahrenheitToCelsius(currentPreset.internal_temp_f)}°C)
                  </InsightCard>
                )}
                <InsightCard type="info" title="Don't Overcrowd">
                  Leave space between pieces for proper air circulation and even cooking.
                </InsightCard>
              </div>

              {/* Quick Reference Table */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Reference</h4>
                <ComparisonTable
                  headers={["Setting", "Value"]}
                  rows={[
                    { label: "Temperature", values: [`${currentPreset.temp_f}°F / ${fahrenheitToCelsius(currentPreset.temp_f)}°C`] },
                    { label: "Time Range", values: [`${currentPreset.time_min}–${currentPreset.time_max} min`] },
                    { label: "Midpoint Action", values: [currentPreset.flip !== "none" ? `${currentPreset.flip.charAt(0).toUpperCase() + currentPreset.flip.slice(1)} at ${Math.round((currentPreset.time_min + currentPreset.time_max) / 2)} min` : "None needed"] },
                    ...(currentPreset.internal_temp_f ? [{ label: "Safe Internal Temp", values: [`${currentPreset.internal_temp_f}°F / ${fahrenheitToCelsius(currentPreset.internal_temp_f)}°C`], highlight: true }] : []),
                  ]}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Air Fryer to Oven Mode */}
      {mode === "air-to-oven" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Air Fryer Temperature (°F)
              </label>
              <input
                type="number"
                value={airTemp}
                onChange={(e) => { setAirTemp(Number(e.target.value)); resetResults(); }}
                className="input-field w-full"
                min={200}
                max={450}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Air Fryer Time (minutes)
              </label>
              <input
                type="number"
                value={airTime}
                onChange={(e) => { setAirTime(Number(e.target.value)); resetResults(); }}
                className="input-field w-full"
                min={1}
                max={120}
              />
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
          <div className="results-panel space-y-6">
            <h3 className="font-serif text-lg font-semibold text-gray-900">
              Conventional Oven Settings
            </h3>

            {/* Main Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <StatCard
                label="Oven Temp"
                value={`${airToOvenResult.tempF}°F`}
                sublabel={`${airToOvenResult.tempC}°C`}
                color="coral"
              />
              <StatCard
                label="Cooking Time"
                value={`${airToOvenResult.time} min`}
                sublabel="total time"
                color="blue"
              />
              <StatCard
                label="Temp Increase"
                value={`+25°F`}
                sublabel="from air fryer"
                color="amber"
              />
              <StatCard
                label="Time Increase"
                value={`+${airToOvenResult.time - airTime} min`}
                sublabel={`${Math.round(((airToOvenResult.time - airTime) / airTime) * 100)}% longer`}
                color="gray"
              />
            </div>

            {/* Visual Comparisons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white border border-gray-200 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Time Comparison</h4>
                <TimeComparisonChart
                  original={{ label: "Air Fryer", minutes: airTime }}
                  converted={{ label: "Oven", minutes: airToOvenResult.time }}
                />
              </div>
              <div className="p-4 bg-white border border-gray-200 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Temperature Comparison</h4>
                <TempComparisonChart
                  original={{ label: "Air Fryer", temp: airTemp }}
                  converted={{ label: "Oven", temp: airToOvenResult.tempF }}
                  unit="F"
                />
              </div>
            </div>

            {/* Oven Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InsightCard type="tip" title="Preheat Required">
                Always preheat your oven to <strong>{airToOvenResult.tempF}°F</strong> before cooking. This typically takes 10-15 minutes.
              </InsightCard>
              <InsightCard type="info" title="Rack Position">
                For best results, use the middle rack for even heat distribution.
              </InsightCard>
            </div>

            {/* Why Oven Takes Longer */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Why Does the Oven Take Longer?</h4>
              <p className="text-sm text-gray-600">
                Air fryers use rapid air circulation in a compact space, cooking food faster than traditional ovens. When converting to an oven, you need 25% more time and 25°F higher temperature to achieve similar results.
              </p>
            </div>
          </div>
          )}
        </div>
      )}

      {/* Conversion Formula Info */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>The Formula:</strong> Reduce oven temp by 25°F, reduce time by
          20%. For reverse (air fryer → oven), add 25°F and 25% more time.
        </p>
      </div>
    </div>
  );
}
