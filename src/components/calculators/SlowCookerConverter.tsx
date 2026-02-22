"use client";

import { useState, useMemo, useCallback } from "react";
import {
  CookingMethodType,
  FoodType,
  cookingMethodsInfo,
  foodTypes,
  getConversion,
  getFoodTypeWarnings,
  getConversionTips,
  formatTime,
  presetConversions,
} from "@/data/slow-cooker-data";
import {
  StatCard,
  InsightCard,
  ComparisonBarChart,
  CHART_COLORS,
} from "@/components/charts";

export default function SlowCookerConverter() {
  const [fromMethod, setFromMethod] = useState<CookingMethodType>("slow_cooker_low");
  const [toMethod, setToMethod] = useState<CookingMethodType>("oven");
  const [hours, setHours] = useState<number>(8);
  const [minutes, setMinutes] = useState<number>(0);
  const [liquidCups, setLiquidCups] = useState<number | undefined>(2);
  const [foodType, setFoodType] = useState<FoodType>("stew_soup");
  const [showLiquid, setShowLiquid] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Reset results when inputs change
  const resetResults = useCallback(() => setShowResults(false), []);

  // Total time in minutes
  const totalMinutes = hours * 60 + minutes;

  // Get method info
  const fromMethodInfo = cookingMethodsInfo.find((m) => m.key === fromMethod);
  const toMethodInfo = cookingMethodsInfo.find((m) => m.key === toMethod);

  // Calculate conversion
  const result = useMemo(() => {
    return getConversion(fromMethod, toMethod, totalMinutes, showLiquid ? liquidCups : undefined);
  }, [fromMethod, toMethod, totalMinutes, liquidCups, showLiquid]);

  // Get tips
  const tips = useMemo(() => {
    return getConversionTips(fromMethod, toMethod);
  }, [fromMethod, toMethod]);

  // Get food type warnings
  const foodWarnings = useMemo(() => {
    return getFoodTypeWarnings(foodType, toMethod);
  }, [foodType, toMethod]);

  // Handle preset selection
  const handlePreset = (preset: typeof presetConversions[0]) => {
    setFromMethod(preset.from);
    setToMethod(preset.to);
    setHours(Math.floor(preset.timeMinutes / 60));
    setMinutes(preset.timeMinutes % 60);
    resetResults();
  };

  // Swap methods
  const handleSwap = () => {
    const temp = fromMethod;
    setFromMethod(toMethod);
    setToMethod(temp);
    resetResults();
  };

  return (
    <div className="calculator-card p-6 md:p-8">
      <div className="space-y-6">
        {/* Quick Presets */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quick Presets
          </label>
          <div className="flex flex-wrap gap-2">
            {presetConversions.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handlePreset(preset)}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Method Selection */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From
            </label>
            <select
              value={fromMethod}
              onChange={(e) => { setFromMethod(e.target.value as CookingMethodType); resetResults(); }}
              className="select-field w-full"
            >
              {cookingMethodsInfo.map((method) => (
                <option key={method.key} value={method.key}>
                  {method.icon} {method.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSwap}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors self-end mb-1"
            title="Swap methods"
          >
            ⇄
          </button>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To
            </label>
            <select
              value={toMethod}
              onChange={(e) => { setToMethod(e.target.value as CookingMethodType); resetResults(); }}
              className="select-field w-full"
            >
              {cookingMethodsInfo.map((method) => (
                <option key={method.key} value={method.key}>
                  {method.icon} {method.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Time Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Original Cooking Time ({fromMethodInfo?.label})
          </label>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={hours}
                  onChange={(e) => { setHours(Number(e.target.value)); resetResults(); }}
                  className="input-field w-full"
                  min={0}
                  max={24}
                />
                <span className="text-gray-600">hrs</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={minutes}
                  onChange={(e) => { setMinutes(Number(e.target.value)); resetResults(); }}
                  className="input-field w-full"
                  min={0}
                  max={59}
                  step={5}
                />
                <span className="text-gray-600">min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Food Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Food Type (optional)
          </label>
          <select
            value={foodType}
            onChange={(e) => { setFoodType(e.target.value as FoodType); resetResults(); }}
            className="select-field w-full"
          >
            {foodTypes.map((ft) => (
              <option key={ft.key} value={ft.key}>
                {ft.label}
              </option>
            ))}
          </select>
        </div>

        {/* Liquid Adjustment Toggle */}
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showLiquid}
              onChange={(e) => { setShowLiquid(e.target.checked); resetResults(); }}
              className="w-4 h-4 text-coral rounded focus:ring-coral"
            />
            <span className="text-sm text-gray-700">
              Calculate liquid adjustment
            </span>
          </label>

          {showLiquid && (
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Liquid Amount (cups)
              </label>
              <input
                type="number"
                value={liquidCups}
                onChange={(e) => { setLiquidCups(Number(e.target.value)); resetResults(); }}
                className="input-field w-32"
                min={0}
                max={20}
                step={0.5}
              />
            </div>
          )}
        </div>

        <button
          onClick={() => setShowResults(true)}
          className="btn-primary w-full sm:w-auto"
        >
          Convert Time
        </button>

        {/* Results */}
        {showResults && (
        <div className="results-panel">
          <h3 className="font-serif text-lg font-semibold text-gray-900 mb-4">
            {toMethodInfo?.icon} {toMethodInfo?.label} Conversion Results
          </h3>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <StatCard
              label="Original Time"
              value={formatTime(totalMinutes)}
              sublabel={fromMethodInfo?.label}
              color="gray"
            />
            <StatCard
              label="Converted Time"
              value={result.timeMin === result.timeMax
                ? formatTime(result.timeMin)
                : `${formatTime(result.timeMin)}–${formatTime(result.timeMax)}`}
              sublabel={toMethodInfo?.label}
              color="coral"
            />
            {result.tempF && (
              <StatCard
                label="Temperature"
                value={`${result.tempF}°F`}
                sublabel={`${Math.round((result.tempF - 32) * 5 / 9)}°C`}
                color="amber"
              />
            )}
            <StatCard
              label="Time Saved"
              value={totalMinutes > result.timeMax
                ? formatTime(totalMinutes - result.timeMax)
                : formatTime(result.timeMin - totalMinutes)}
              sublabel={totalMinutes > result.timeMax ? "Faster!" : "Slower (low & slow)"}
              color={totalMinutes > result.timeMax ? "green" : "blue"}
            />
          </div>

          {/* Time Comparison Chart */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Cooking Time Comparison</h4>
            <ComparisonBarChart
              data={[
                {
                  name: `${fromMethodInfo?.icon} ${fromMethodInfo?.label}`,
                  value: totalMinutes,
                  fill: "#9CA3AF",
                },
                {
                  name: `${toMethodInfo?.icon} ${toMethodInfo?.label}`,
                  value: Math.round((result.timeMin + result.timeMax) / 2),
                  fill: CHART_COLORS.primary,
                },
              ]}
              height={80}
              unit=" min"
            />
          </div>

          {/* Liquid Adjustment */}
          {showLiquid && result.liquidCups !== undefined && liquidCups && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Liquid Adjustment</h4>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-700">{liquidCups} cups</p>
                  <p className="text-xs text-blue-600">Original</p>
                </div>
                <span className="text-blue-400">→</span>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-900">{result.liquidCups} cups</p>
                  <p className="text-xs text-blue-600">{toMethodInfo?.label}</p>
                </div>
              </div>
              <p className="text-sm text-blue-800 mt-2">{result.liquidAdjustment}</p>
            </div>
          )}

          {/* Method-Specific Instructions */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">How to Cook with {toMethodInfo?.label}</h4>
            <ol className="space-y-2 text-sm text-gray-700">
              {toMethod === "oven" && (
                <>
                  <li className="flex gap-2">
                    <span className="w-5 h-5 rounded-full bg-coral text-white text-xs flex items-center justify-center flex-shrink-0">1</span>
                    <span>Preheat oven to <strong>{result.tempF}°F ({Math.round((result.tempF! - 32) * 5 / 9)}°C)</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="w-5 h-5 rounded-full bg-coral text-white text-xs flex items-center justify-center flex-shrink-0">2</span>
                    <span>Transfer to oven-safe Dutch oven or covered casserole</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="w-5 h-5 rounded-full bg-coral text-white text-xs flex items-center justify-center flex-shrink-0">3</span>
                    <span>Cook covered for <strong>{formatTime(result.timeMin)}</strong>{result.timeMin !== result.timeMax && ` to ${formatTime(result.timeMax)}`}</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="w-5 h-5 rounded-full bg-coral text-white text-xs flex items-center justify-center flex-shrink-0">4</span>
                    <span>Check meat internal temp or tenderness before removing</span>
                  </li>
                </>
              )}
              {toMethod === "instant_pot" && (
                <>
                  <li className="flex gap-2">
                    <span className="w-5 h-5 rounded-full bg-coral text-white text-xs flex items-center justify-center flex-shrink-0">1</span>
                    <span>Add at least 1 cup of liquid (required for pressure)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="w-5 h-5 rounded-full bg-coral text-white text-xs flex items-center justify-center flex-shrink-0">2</span>
                    <span>Select <strong>Pressure Cook / Manual</strong> on High</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="w-5 h-5 rounded-full bg-coral text-white text-xs flex items-center justify-center flex-shrink-0">3</span>
                    <span>Set time to <strong>{formatTime(result.timeMin)}</strong>{result.timeMin !== result.timeMax && ` to ${formatTime(result.timeMax)}`}</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="w-5 h-5 rounded-full bg-coral text-white text-xs flex items-center justify-center flex-shrink-0">4</span>
                    <span>Allow <strong>10-15 min natural release</strong> before opening</span>
                  </li>
                </>
              )}
              {(toMethod === "slow_cooker_low" || toMethod === "slow_cooker_high") && (
                <>
                  <li className="flex gap-2">
                    <span className="w-5 h-5 rounded-full bg-coral text-white text-xs flex items-center justify-center flex-shrink-0">1</span>
                    <span>Add ingredients to slow cooker insert</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="w-5 h-5 rounded-full bg-coral text-white text-xs flex items-center justify-center flex-shrink-0">2</span>
                    <span>Set to <strong>{toMethod === "slow_cooker_low" ? "LOW" : "HIGH"}</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="w-5 h-5 rounded-full bg-coral text-white text-xs flex items-center justify-center flex-shrink-0">3</span>
                    <span>Cook for <strong>{formatTime(result.timeMin)}</strong>{result.timeMin !== result.timeMax && ` to ${formatTime(result.timeMax)}`}</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="w-5 h-5 rounded-full bg-coral text-white text-xs flex items-center justify-center flex-shrink-0">4</span>
                    <span>Avoid lifting lid — each peek adds 15-20 min cook time</span>
                  </li>
                </>
              )}
              {toMethod === "stovetop" && (
                <>
                  <li className="flex gap-2">
                    <span className="w-5 h-5 rounded-full bg-coral text-white text-xs flex items-center justify-center flex-shrink-0">1</span>
                    <span>Use a heavy-bottomed pot or Dutch oven</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="w-5 h-5 rounded-full bg-coral text-white text-xs flex items-center justify-center flex-shrink-0">2</span>
                    <span>Bring to a simmer over medium heat, then reduce to <strong>low</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="w-5 h-5 rounded-full bg-coral text-white text-xs flex items-center justify-center flex-shrink-0">3</span>
                    <span>Cook covered for <strong>{formatTime(result.timeMin)}</strong>{result.timeMin !== result.timeMax && ` to ${formatTime(result.timeMax)}`}</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="w-5 h-5 rounded-full bg-coral text-white text-xs flex items-center justify-center flex-shrink-0">4</span>
                    <span>Stir occasionally to prevent sticking</span>
                  </li>
                </>
              )}
            </ol>
          </div>

          {/* All Methods Comparison */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Same Recipe, Different Methods</h4>
            <ComparisonBarChart
              data={cookingMethodsInfo.map((method) => {
                const conversion = getConversion(fromMethod, method.key, totalMinutes);
                const avgTime = (conversion.timeMin + conversion.timeMax) / 2;
                return {
                  name: `${method.icon} ${method.label}`,
                  value: Math.round(avgTime),
                  fill: method.key === toMethod ? CHART_COLORS.primary : "#E5E7EB",
                };
              })}
              height={150}
              unit=" min"
            />
          </div>

          {/* Notes and Tips */}
          <div className="space-y-3">
            {result.notes.map((note, idx) => (
              <InsightCard key={idx} type="info" title="Note">
                {note}
              </InsightCard>
            ))}

            {foodWarnings.map((warning, idx) => (
              <InsightCard key={idx} type="warning" title={`${foodTypes.find(f => f.key === foodType)?.label} Warning`}>
                {warning}
              </InsightCard>
            ))}

            {toMethod === "instant_pot" && (
              <InsightCard type="tip" title="Instant Pot Tip">
                Total time includes ~10 min to build pressure + {formatTime(result.timeMin)} cook time + 10-15 min natural release. Plan accordingly!
              </InsightCard>
            )}

            {toMethod === "oven" && fromMethod.includes("slow_cooker") && (
              <InsightCard type="tip" title="Oven Advantage">
                Oven cooking allows for browning and caramelization. Consider removing the lid for the last 20-30 minutes for a beautiful golden top.
              </InsightCard>
            )}
          </div>
        </div>
        )}

        {/* Tips Section */}
        {tips.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3">
              Tips for {toMethodInfo?.label}
            </h4>
            <ul className="space-y-2">
              {tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-600 flex-shrink-0">✓</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Reference Table */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">
            Quick Conversion Reference
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Slow Cooker LOW</th>
                  <th className="text-left py-2 pr-4">Slow Cooker HIGH</th>
                  <th className="text-left py-2 pr-4">Oven (325°F)</th>
                  <th className="text-left py-2">Instant Pot</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">4–6 hrs</td>
                  <td className="py-2 pr-4">2–3 hrs</td>
                  <td className="py-2 pr-4">1–1.5 hrs</td>
                  <td className="py-2">15–25 min</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">6–8 hrs</td>
                  <td className="py-2 pr-4">3–4 hrs</td>
                  <td className="py-2 pr-4">2–2.5 hrs</td>
                  <td className="py-2">25–35 min</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">8–10 hrs</td>
                  <td className="py-2 pr-4">4–5 hrs</td>
                  <td className="py-2 pr-4">2.5–3 hrs</td>
                  <td className="py-2">35–45 min</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            * Instant Pot times are active pressure cooking time only. Add 10-15 minutes for natural release.
          </p>
        </div>
      </div>
    </div>
  );
}
