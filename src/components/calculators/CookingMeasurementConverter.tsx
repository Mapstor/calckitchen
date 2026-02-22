"use client";

import { useState, useMemo, useCallback } from "react";
import {
  StatCard,
  InsightCard,
  ComparisonBarChart,
  CHART_COLORS,
} from "@/components/charts";

type VolumeUnit = "tsp" | "tbsp" | "floz" | "cup" | "pint" | "quart" | "gallon" | "ml" | "liter";
type WeightUnit = "oz" | "lb" | "g" | "kg";
type MeasurementType = "volume" | "weight";

interface UnitInfo {
  label: string;
  toBase: number; // to ml for volume, to grams for weight
}

const volumeUnits: Record<VolumeUnit, UnitInfo> = {
  tsp: { label: "Teaspoons", toBase: 4.929 },
  tbsp: { label: "Tablespoons", toBase: 14.787 },
  floz: { label: "Fluid Ounces", toBase: 29.574 },
  cup: { label: "Cups (US)", toBase: 236.588 },
  pint: { label: "Pints", toBase: 473.176 },
  quart: { label: "Quarts", toBase: 946.353 },
  gallon: { label: "Gallons", toBase: 3785.41 },
  ml: { label: "Milliliters", toBase: 1 },
  liter: { label: "Liters", toBase: 1000 },
};

const weightUnits: Record<WeightUnit, UnitInfo> = {
  oz: { label: "Ounces", toBase: 28.35 },
  lb: { label: "Pounds", toBase: 453.592 },
  g: { label: "Grams", toBase: 1 },
  kg: { label: "Kilograms", toBase: 1000 },
};

export default function CookingMeasurementConverter() {
  const [measurementType, setMeasurementType] = useState<MeasurementType>("volume");
  const [amount, setAmount] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<VolumeUnit | WeightUnit>("cup");
  const [showResults, setShowResults] = useState<boolean>(false);

  const resetResults = useCallback(() => setShowResults(false), []);

  const handleTypeChange = (type: MeasurementType) => {
    setMeasurementType(type);
    setFromUnit(type === "volume" ? "cup" : "oz");
    resetResults();
  };

  const volumeResults = useMemo(() => {
    if (measurementType !== "volume") return null;
    const ml = amount * volumeUnits[fromUnit as VolumeUnit].toBase;

    return {
      tsp: Math.round((ml / volumeUnits.tsp.toBase) * 100) / 100,
      tbsp: Math.round((ml / volumeUnits.tbsp.toBase) * 100) / 100,
      floz: Math.round((ml / volumeUnits.floz.toBase) * 100) / 100,
      cup: Math.round((ml / volumeUnits.cup.toBase) * 1000) / 1000,
      pint: Math.round((ml / volumeUnits.pint.toBase) * 1000) / 1000,
      quart: Math.round((ml / volumeUnits.quart.toBase) * 1000) / 1000,
      gallon: Math.round((ml / volumeUnits.gallon.toBase) * 1000) / 1000,
      ml: Math.round(ml * 10) / 10,
      liter: Math.round((ml / 1000) * 1000) / 1000,
    };
  }, [amount, fromUnit, measurementType]);

  const weightResults = useMemo(() => {
    if (measurementType !== "weight") return null;
    const grams = amount * weightUnits[fromUnit as WeightUnit].toBase;

    return {
      oz: Math.round((grams / weightUnits.oz.toBase) * 100) / 100,
      lb: Math.round((grams / weightUnits.lb.toBase) * 1000) / 1000,
      g: Math.round(grams * 10) / 10,
      kg: Math.round((grams / 1000) * 1000) / 1000,
    };
  }, [amount, fromUnit, measurementType]);

  const currentUnits = measurementType === "volume" ? volumeUnits : weightUnits;

  return (
    <div className="calculator-card p-6 md:p-8">
      <div className="space-y-6">
        {/* Measurement Type Toggle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Measurement Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleTypeChange("volume")}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                measurementType === "volume"
                  ? "bg-coral text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Volume
            </button>
            <button
              onClick={() => handleTypeChange("weight")}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                measurementType === "weight"
                  ? "bg-coral text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Weight
            </button>
          </div>
        </div>

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
              onChange={(e) => { setFromUnit(e.target.value as VolumeUnit | WeightUnit); resetResults(); }}
              className="input-field w-full"
            >
              {Object.entries(currentUnits).map(([key, info]) => (
                <option key={key} value={key}>{info.label}</option>
              ))}
            </select>
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
          const currentUnitLabel = measurementType === "volume"
            ? volumeUnits[fromUnit as VolumeUnit].label
            : weightUnits[fromUnit as WeightUnit].label;

          if (measurementType === "volume" && volumeResults) {
            // Visual comparison data for volume
            const volumeComparisonData = [
              { name: "Cups", value: volumeResults.cup, fill: CHART_COLORS.primary },
              { name: "Tbsp", value: volumeResults.tbsp / 16, fill: CHART_COLORS.secondary }, // Scaled for viz
              { name: "Fl oz", value: volumeResults.floz / 8, fill: CHART_COLORS.tertiary }, // Scaled for viz
            ];

            // Determine practical context
            const mlValue = volumeResults.ml;
            let practicalContext = "";
            if (mlValue <= 5) practicalContext = "About 1 teaspoon";
            else if (mlValue <= 15) practicalContext = "About 1 tablespoon";
            else if (mlValue <= 30) practicalContext = "About 2 tablespoons (1 fl oz)";
            else if (mlValue <= 60) practicalContext = "About ¼ cup";
            else if (mlValue <= 120) practicalContext = "About ½ cup";
            else if (mlValue <= 240) practicalContext = "About 1 cup";
            else if (mlValue <= 480) practicalContext = "About 1 pint (2 cups)";
            else if (mlValue <= 960) practicalContext = "About 1 quart";
            else practicalContext = "More than 1 quart";

            return (
              <div className="results-panel space-y-6">
                <h3 className="font-serif text-lg font-semibold text-gray-900">
                  Volume Conversions
                </h3>

                {/* Main Result */}
                <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl text-center">
                  <p className="text-sm text-blue-700 mb-1">
                    {amount} {currentUnitLabel} equals
                  </p>
                  <p className="text-4xl font-bold text-blue-900">{volumeResults.ml} ml</p>
                  <p className="text-blue-700 mt-2">
                    {volumeResults.liter} L • {volumeResults.cup} cups • {volumeResults.floz} fl oz
                  </p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <StatCard
                    label="Teaspoons"
                    value={volumeResults.tsp}
                    sublabel="~5ml each"
                    color="blue"
                  />
                  <StatCard
                    label="Tablespoons"
                    value={volumeResults.tbsp}
                    sublabel="~15ml each"
                    color="green"
                  />
                  <StatCard
                    label="Cups (US)"
                    value={volumeResults.cup}
                    sublabel="~237ml each"
                    color="amber"
                  />
                  <StatCard
                    label="Fluid Ounces"
                    value={volumeResults.floz}
                    sublabel="~30ml each"
                    color="purple"
                  />
                </div>

                {/* Complete Conversion Grid */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">All Volume Units</h4>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3 text-center">
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <p className="text-xs text-gray-500">Teaspoons</p>
                      <p className="text-lg font-bold text-gray-900">{volumeResults.tsp}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <p className="text-xs text-gray-500">Tablespoons</p>
                      <p className="text-lg font-bold text-gray-900">{volumeResults.tbsp}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <p className="text-xs text-gray-500">Fluid Oz</p>
                      <p className="text-lg font-bold text-gray-900">{volumeResults.floz}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <p className="text-xs text-gray-500">Cups</p>
                      <p className="text-lg font-bold text-gray-900">{volumeResults.cup}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <p className="text-xs text-gray-500">Pints</p>
                      <p className="text-lg font-bold text-gray-900">{volumeResults.pint}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <p className="text-xs text-gray-500">Quarts</p>
                      <p className="text-lg font-bold text-gray-900">{volumeResults.quart}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <p className="text-xs text-gray-500">Gallons</p>
                      <p className="text-lg font-bold text-gray-900">{volumeResults.gallon}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg shadow-sm border-2 border-gray-300">
                      <p className="text-xs text-gray-500">Milliliters</p>
                      <p className="text-lg font-bold text-gray-900">{volumeResults.ml}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg shadow-sm border-2 border-gray-300">
                      <p className="text-xs text-gray-500">Liters</p>
                      <p className="text-lg font-bold text-gray-900">{volumeResults.liter}</p>
                    </div>
                  </div>
                </div>

                {/* Visual Comparison */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Visual Comparison</h4>
                  <ComparisonBarChart
                    data={volumeComparisonData}
                    height={120}
                    showValue
                  />
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Tablespoons and fluid ounces scaled for visualization
                  </p>
                </div>

                {/* Practical Context */}
                <InsightCard type="info" title="Practical Reference">
                  <p className="font-medium">{practicalContext}</p>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="font-medium">Common Kitchen Items:</p>
                      <ul className="mt-1 space-y-0.5">
                        <li>• Shot glass: ~1.5 fl oz (44ml)</li>
                        <li>• Coffee mug: ~12 fl oz (355ml)</li>
                        <li>• Can of soda: ~12 fl oz (355ml)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium">Baking Measures:</p>
                      <ul className="mt-1 space-y-0.5">
                        <li>• Pinch: ~⅛ tsp</li>
                        <li>• Dash: ~⅛ tsp (liquid)</li>
                        <li>• Jigger: 1.5 fl oz</li>
                      </ul>
                    </div>
                  </div>
                </InsightCard>

                {/* Copy Button */}
                <button
                  onClick={() => {
                    const text = `Volume Conversion:\n${amount} ${currentUnitLabel} =\n• ${volumeResults.ml} ml\n• ${volumeResults.cup} cups\n• ${volumeResults.tbsp} tbsp\n• ${volumeResults.tsp} tsp\n• ${volumeResults.floz} fl oz`;
                    navigator.clipboard.writeText(text);
                  }}
                  className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Copy Conversion
                </button>
              </div>
            );
          }

          if (measurementType === "weight" && weightResults) {
            // Visual comparison data for weight
            const weightComparisonData = [
              { name: "Pounds", value: weightResults.lb, fill: CHART_COLORS.quaternary },
              { name: "Ounces", value: weightResults.oz / 16, fill: CHART_COLORS.primary }, // Scaled for viz
              { name: "Kilograms", value: weightResults.kg, fill: CHART_COLORS.secondary },
            ];

            // Determine practical context
            const gramValue = weightResults.g;
            let practicalContext = "";
            if (gramValue <= 5) practicalContext = "About 1 teaspoon of salt";
            else if (gramValue <= 15) practicalContext = "About 1 tablespoon of sugar";
            else if (gramValue <= 30) practicalContext = "About 1 ounce (small egg)";
            else if (gramValue <= 115) practicalContext = "About ¼ pound (1 stick butter)";
            else if (gramValue <= 230) practicalContext = "About ½ pound";
            else if (gramValue <= 454) practicalContext = "About 1 pound";
            else if (gramValue <= 1000) practicalContext = "About 2 pounds";
            else practicalContext = "More than 1 kilogram";

            return (
              <div className="results-panel space-y-6">
                <h3 className="font-serif text-lg font-semibold text-gray-900">
                  Weight Conversions
                </h3>

                {/* Main Result */}
                <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl text-center">
                  <p className="text-sm text-amber-700 mb-1">
                    {amount} {currentUnitLabel} equals
                  </p>
                  <p className="text-4xl font-bold text-amber-900">{weightResults.g} g</p>
                  <p className="text-amber-700 mt-2">
                    {weightResults.kg} kg • {weightResults.lb} lb • {weightResults.oz} oz
                  </p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <StatCard
                    label="Ounces"
                    value={weightResults.oz}
                    sublabel="~28g each"
                    color="amber"
                  />
                  <StatCard
                    label="Pounds"
                    value={weightResults.lb}
                    sublabel="~454g each"
                    color="coral"
                  />
                  <StatCard
                    label="Grams"
                    value={`${weightResults.g}g`}
                    sublabel="metric base"
                    color="gray"
                  />
                  <StatCard
                    label="Kilograms"
                    value={weightResults.kg}
                    sublabel="= 1000g"
                    color="blue"
                  />
                </div>

                {/* Visual Comparison */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Visual Comparison</h4>
                  <ComparisonBarChart
                    data={weightComparisonData}
                    height={120}
                    showValue
                  />
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Ounces scaled for visualization (÷16)
                  </p>
                </div>

                {/* Practical Context */}
                <InsightCard type="info" title="Practical Reference">
                  <p className="font-medium">{practicalContext}</p>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="font-medium">Common Food Weights:</p>
                      <ul className="mt-1 space-y-0.5">
                        <li>• Apple: ~180g (6 oz)</li>
                        <li>• Chicken breast: ~170g (6 oz)</li>
                        <li>• Stick of butter: ~113g (4 oz)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium">Baking Ingredients:</p>
                      <ul className="mt-1 space-y-0.5">
                        <li>• 1 cup flour: ~125g</li>
                        <li>• 1 cup sugar: ~200g</li>
                        <li>• 1 cup butter: ~227g</li>
                      </ul>
                    </div>
                  </div>
                </InsightCard>

                {/* Precision Note */}
                <InsightCard type="tip" title="Why Use Weight?">
                  <p>
                    Measuring by weight is more accurate than volume, especially for baking.
                    A cup of flour can vary by 30%+ depending on how it&apos;s scooped.
                    Professional bakers always use grams for consistency.
                  </p>
                </InsightCard>

                {/* Copy Button */}
                <button
                  onClick={() => {
                    const text = `Weight Conversion:\n${amount} ${currentUnitLabel} =\n• ${weightResults.g} grams\n• ${weightResults.kg} kg\n• ${weightResults.lb} lb\n• ${weightResults.oz} oz`;
                    navigator.clipboard.writeText(text);
                  }}
                  className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Copy Conversion
                </button>
              </div>
            );
          }

          return null;
        })()}

        {/* Quick Reference */}
        <InsightCard type="info" title="Quick Reference">
          <div className="grid grid-cols-2 gap-4 text-sm mt-2">
            <div>
              <p className="font-semibold text-gray-800 mb-2">Volume Conversions</p>
              <ul className="space-y-1">
                <li>3 tsp = 1 tbsp</li>
                <li>2 tbsp = 1 fl oz</li>
                <li>8 fl oz = 1 cup</li>
                <li>16 tbsp = 1 cup</li>
                <li>2 cups = 1 pint</li>
                <li>2 pints = 1 quart</li>
                <li>4 quarts = 1 gallon</li>
                <li>1 cup ≈ 237 ml</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-2">Weight Conversions</p>
              <ul className="space-y-1">
                <li>16 oz = 1 lb</li>
                <li>1 oz ≈ 28.35g</li>
                <li>1 lb ≈ 453.6g</li>
                <li>1 kg = 2.205 lb</li>
                <li>100g ≈ 3.5 oz</li>
                <li>500g ≈ 1.1 lb</li>
              </ul>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="font-semibold text-gray-800 mb-1">Metric vs Imperial</p>
            <p className="text-xs">
              The US uses imperial (cups, oz, lb) while most of the world uses metric (ml, g, kg).
              When following international recipes, use this converter for accurate measurements.
            </p>
          </div>
        </InsightCard>
      </div>
    </div>
  );
}
