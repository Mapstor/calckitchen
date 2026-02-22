"use client";

import { useState, useMemo, useCallback } from "react";
import {
  StatCard,
  InsightCard,
  ComparisonBarChart,
  ProgressRing,
  CHART_COLORS,
} from "@/components/charts";

type MeatType = "beef" | "pork" | "poultry" | "lamb" | "fish";
type Doneness = "rare" | "medium-rare" | "medium" | "medium-well" | "well-done";
type TempUnit = "F" | "C";

interface TempRange {
  min: number;
  max: number;
  description: string;
  available: boolean;
}

interface MeatInfo {
  name: string;
  cuts: string[];
  temps: Record<string, TempRange>;
  restTime: string;
  notes: string;
}

const meatData: Record<MeatType, MeatInfo> = {
  beef: {
    name: "Beef",
    cuts: ["Steak", "Roast", "Ground Beef", "Brisket"],
    temps: {
      "rare": { min: 120, max: 125, description: "Cool red center", available: true },
      "medium-rare": { min: 130, max: 135, description: "Warm red center", available: true },
      "medium": { min: 140, max: 145, description: "Warm pink center", available: true },
      "medium-well": { min: 150, max: 155, description: "Slightly pink", available: true },
      "well-done": { min: 160, max: 165, description: "No pink", available: true },
    },
    restTime: "5-10 minutes",
    notes: "USDA recommends 145°F (63°C) for steaks and roasts. Ground beef should reach 160°F (71°C).",
  },
  pork: {
    name: "Pork",
    cuts: ["Chops", "Tenderloin", "Roast", "Ground Pork"],
    temps: {
      "medium": { min: 145, max: 150, description: "Slightly pink, juicy", available: true },
      "medium-well": { min: 150, max: 155, description: "Just a hint of pink", available: true },
      "well-done": { min: 160, max: 165, description: "No pink", available: true },
    },
    restTime: "3-5 minutes",
    notes: "USDA recommends 145°F (63°C) with 3-minute rest. Ground pork should reach 160°F (71°C).",
  },
  poultry: {
    name: "Poultry",
    cuts: ["Chicken Breast", "Chicken Thigh", "Turkey Breast", "Whole Bird"],
    temps: {
      "safe-minimum": { min: 165, max: 170, description: "Safe minimum temp", available: true },
      "thigh-optimal": { min: 175, max: 180, description: "Optimal for thighs", available: true },
    },
    restTime: "5-10 minutes",
    notes: "All poultry must reach 165°F (74°C). Thighs benefit from 175-180°F for better texture.",
  },
  lamb: {
    name: "Lamb",
    cuts: ["Chops", "Leg", "Rack", "Ground Lamb"],
    temps: {
      "rare": { min: 125, max: 130, description: "Cool red center", available: true },
      "medium-rare": { min: 130, max: 135, description: "Warm red center", available: true },
      "medium": { min: 140, max: 145, description: "Warm pink center", available: true },
      "medium-well": { min: 150, max: 155, description: "Slightly pink", available: true },
      "well-done": { min: 160, max: 165, description: "No pink", available: true },
    },
    restTime: "5-10 minutes",
    notes: "Lamb can be served at similar temperatures to beef. Ground lamb should reach 160°F (71°C).",
  },
  fish: {
    name: "Fish & Seafood",
    cuts: ["Salmon", "Tuna", "White Fish", "Shrimp"],
    temps: {
      "rare": { min: 110, max: 115, description: "Sushi-grade only", available: true },
      "medium-rare": { min: 120, max: 125, description: "Translucent center", available: true },
      "medium": { min: 130, max: 135, description: "Opaque, flaky", available: true },
      "well-done": { min: 145, max: 150, description: "FDA recommended", available: true },
    },
    restTime: "2-3 minutes",
    notes: "FDA recommends 145°F (63°C). Sushi-grade fish can be served rare. Shrimp: cook until pink and opaque.",
  },
};

export default function MeatTemperatureChart() {
  const [selectedMeat, setSelectedMeat] = useState<MeatType>("beef");
  const [tempUnit, setTempUnit] = useState<TempUnit>("F");
  const [showResults, setShowResults] = useState<boolean>(false);

  const resetResults = useCallback(() => setShowResults(false), []);

  const convertTemp = (f: number): number => {
    return tempUnit === "F" ? f : Math.round((f - 32) * 5/9);
  };

  const meat = meatData[selectedMeat];

  const formattedTemps = useMemo(() => {
    return Object.entries(meat.temps).map(([doneness, data]) => ({
      doneness: doneness.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase()),
      min: convertTemp(data.min),
      max: convertTemp(data.max),
      description: data.description,
    }));
  }, [selectedMeat, tempUnit]);

  return (
    <div className="calculator-card p-6 md:p-8">
      <div className="space-y-6">
        {/* Meat Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Meat Type
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {(Object.keys(meatData) as MeatType[]).map((type) => (
              <button
                key={type}
                onClick={() => { setSelectedMeat(type); resetResults(); }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedMeat === type
                    ? "bg-coral text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {meatData[type].name}
              </button>
            ))}
          </div>
        </div>

        {/* Temperature Unit Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => { setTempUnit("F"); resetResults(); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tempUnit === "F"
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            °F (Fahrenheit)
          </button>
          <button
            onClick={() => { setTempUnit("C"); resetResults(); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tempUnit === "C"
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            °C (Celsius)
          </button>
        </div>

        <button
          onClick={() => setShowResults(true)}
          className="btn-primary w-full sm:w-auto"
        >
          Show Temperatures
        </button>

        {/* Results */}
        {showResults && (() => {
          // Temperature visualization data
          const tempChartData = formattedTemps.map((temp, idx) => ({
            name: temp.doneness,
            value: temp.min,
            fill: idx === 0 ? CHART_COLORS.primary :
                  idx === 1 ? CHART_COLORS.secondary :
                  idx === 2 ? CHART_COLORS.tertiary :
                  idx === 3 ? CHART_COLORS.quaternary : CHART_COLORS.protein,
          }));

          // Safe temp threshold
          const safeTemp = selectedMeat === "poultry" ? 165 :
                          selectedMeat === "pork" ? 145 : 145;
          const safeTempC = Math.round((safeTemp - 32) * 5/9);

          return (
        <div className="results-panel space-y-6">
          <h3 className="font-serif text-lg font-semibold text-gray-900">
            {meat.name} Temperature Guide
          </h3>

          {/* Main Result - USDA Safe Temp */}
          <div className="p-5 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl text-center">
            <p className="text-sm text-red-700 mb-1">USDA Minimum Safe Temperature</p>
            <p className="text-4xl font-bold text-red-900">
              {tempUnit === "F" ? safeTemp : safeTempC}°{tempUnit}
            </p>
            <p className="text-red-700 mt-2">
              {selectedMeat === "poultry" ? "All poultry must reach this temp" : "Recommended for food safety"}
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard
              label="Cuts"
              value={meat.cuts.length}
              sublabel={meat.cuts[0]}
              color="coral"
            />
            <StatCard
              label="Rest Time"
              value={meat.restTime.split(" ")[0]}
              sublabel="minutes"
              color="amber"
            />
            <StatCard
              label="Doneness Levels"
              value={formattedTemps.length}
              sublabel="options"
              color="blue"
            />
            <StatCard
              label="Safe Temp"
              value={`${tempUnit === "F" ? safeTemp : safeTempC}°`}
              sublabel="minimum"
              color="green"
            />
          </div>

          {/* Common Cuts */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-medium text-gray-900 mb-2">Common Cuts</p>
            <div className="flex flex-wrap gap-2">
              {meat.cuts.map((cut) => (
                <span key={cut} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm">
                  {cut}
                </span>
              ))}
            </div>
          </div>

          {/* Temperature Visual Chart */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Temperature by Doneness</h4>
            <ComparisonBarChart data={tempChartData} height={formattedTemps.length * 40} showValue unit={`°${tempUnit}`} />
          </div>

          {/* Temperature Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4">Doneness</th>
                  <th className="text-left py-3 px-4">Temperature</th>
                  <th className="text-left py-3 px-4">Description</th>
                  <th className="text-left py-3 px-4">Visual</th>
                </tr>
              </thead>
              <tbody>
                {formattedTemps.map((temp, idx) => (
                  <tr key={idx} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium">{temp.doneness}</td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-coral">{temp.min}-{temp.max}°{tempUnit}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{temp.description}</td>
                    <td className="py-3 px-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-red-400 to-red-600"
                          style={{ width: `${Math.min((temp.min / 200) * 100, 100)}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Rest Time & Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InsightCard type="warning" title="Rest Time Required">
              <p className="font-semibold text-lg">{meat.restTime}</p>
              <p className="text-sm mt-1">
                Resting allows juices to redistribute. Temperature will rise 5-10°F during rest (carryover cooking).
              </p>
            </InsightCard>
            <InsightCard type="info" title="Safety Note">
              <p className="text-sm">{meat.notes}</p>
            </InsightCard>
          </div>

          {/* Thermometer Placement Tips */}
          <InsightCard type="tip" title="Thermometer Placement">
            <div className="grid grid-cols-2 gap-3 mt-2 text-sm">
              <div>
                <p className="font-medium">Steaks & Chops</p>
                <p className="text-xs">Insert from the side, center of thickest part</p>
              </div>
              <div>
                <p className="font-medium">Roasts</p>
                <p className="text-xs">Insert into center, away from bone</p>
              </div>
              <div>
                <p className="font-medium">Poultry</p>
                <p className="text-xs">Inner thigh near breast, not touching bone</p>
              </div>
              <div>
                <p className="font-medium">Ground Meat</p>
                <p className="text-xs">Insert into center of patty or loaf</p>
              </div>
            </div>
          </InsightCard>
        </div>
          );
        })()}

        {/* Carryover Cooking Info */}
        <InsightCard type="info" title="Carryover Cooking">
          <p className="text-sm mb-3">
            Meat continues cooking after removal from heat. Remove meat 5-10°F (3-5°C)
            below your target temperature, then let it rest.
          </p>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="p-3 bg-white rounded-lg text-center border border-gray-200">
              <p className="text-gray-500">Steaks</p>
              <p className="font-bold text-lg">+5-10°F</p>
              <p className="text-xs text-gray-400">(+3-5°C)</p>
            </div>
            <div className="p-3 bg-white rounded-lg text-center border border-gray-200">
              <p className="text-gray-500">Roasts</p>
              <p className="font-bold text-lg">+10-15°F</p>
              <p className="text-xs text-gray-400">(+5-8°C)</p>
            </div>
            <div className="p-3 bg-white rounded-lg text-center border border-gray-200">
              <p className="text-gray-500">Poultry</p>
              <p className="font-bold text-lg">+5-10°F</p>
              <p className="text-xs text-gray-400">(+3-5°C)</p>
            </div>
          </div>
        </InsightCard>
      </div>
    </div>
  );
}
