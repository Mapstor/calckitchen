"use client";

import { useState, useMemo, useCallback } from "react";
import {
  MeatType,
  DonenessLevel,
  meatTypes,
  meatCuts,
  donenessLevels,
  getRestInfo,
  servingSizes,
} from "@/data/meat-cooking-data";
import {
  StatCard,
  InsightCard,
  ComparisonTable,
  ProgressRing,
} from "@/components/charts";

type WeightUnit = "lbs" | "kg";

function fahrenheitToCelsius(f: number): number {
  return Math.round(((f - 32) * 5) / 9);
}

function formatTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) {
    return `${hours} hr${hours > 1 ? "s" : ""}`;
  }
  return `${hours} hr${hours > 1 ? "s" : ""} ${mins} min`;
}

export default function MeatCookingTimeCalculator() {
  const [meatType, setMeatType] = useState<MeatType>("beef");
  const [selectedCut, setSelectedCut] = useState<string>(
    meatCuts["beef"][0].key
  );
  const [weight, setWeight] = useState<number>(5);
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("lbs");
  const [doneness, setDoneness] = useState<DonenessLevel>("medium-rare");
  const [isBoneIn, setIsBoneIn] = useState<boolean>(true);
  const [isStuffed, setIsStuffed] = useState<boolean>(false);
  const [isConvection, setIsConvection] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Reset results when inputs change
  const resetResults = useCallback(() => setShowResults(false), []);

  // Get current cut data
  const currentCut = useMemo(() => {
    return meatCuts[meatType].find((c) => c.key === selectedCut);
  }, [meatType, selectedCut]);

  // Convert weight to lbs for calculations
  const weightInLbs = weightUnit === "kg" ? weight * 2.205 : weight;

  // Calculate results
  const results = useMemo(() => {
    if (!currentCut) return null;

    let ovenTempF = currentCut.ovenTempF;
    let timeMinLow: number;
    let timeMinHigh: number;

    // Calculate base cooking time
    if (currentCut.totalTimeMin !== undefined && currentCut.totalTimeMax !== undefined) {
      // Fixed time cuts (like tenderloin, ribs, individual pieces)
      timeMinLow = currentCut.totalTimeMin;
      timeMinHigh = currentCut.totalTimeMax;
    } else if (currentCut.minPerLbLow && currentCut.minPerLbHigh) {
      // Time per pound cuts
      let minPerLbLow = currentCut.minPerLbLow;
      let minPerLbHigh = currentCut.minPerLbHigh;

      // Adjust for boneless if applicable
      if (
        !isBoneIn &&
        currentCut.hasBoneOption &&
        currentCut.bonelessMinPerLbLow &&
        currentCut.bonelessMinPerLbHigh
      ) {
        minPerLbLow = currentCut.bonelessMinPerLbLow;
        minPerLbHigh = currentCut.bonelessMinPerLbHigh;
      } else if (!isBoneIn && currentCut.hasBoneOption) {
        // Reduce by 12% for boneless if no specific data
        minPerLbLow = Math.round(minPerLbLow * 0.88);
        minPerLbHigh = Math.round(minPerLbHigh * 0.88);
      }

      timeMinLow = Math.round(weightInLbs * minPerLbLow);
      timeMinHigh = Math.round(weightInLbs * minPerLbHigh);
    } else {
      return null;
    }

    // Adjust for stuffed poultry
    if (isStuffed && currentCut.hasStuffedOption) {
      timeMinLow += 15;
      timeMinHigh += 30;
    }

    // Adjust for convection
    if (isConvection) {
      timeMinLow = Math.round(timeMinLow * 0.75);
      timeMinHigh = Math.round(timeMinHigh * 0.75);
      ovenTempF -= 25;
    }

    // Get target temperature
    let targetTempF = currentCut.targetTempF;
    if (currentCut.hasDonenessOption) {
      const donenessData = donenessLevels.find((d) => d.level === doneness);
      if (donenessData) {
        targetTempF = donenessData.internalTempF;
      }
    }

    // Rest info
    const restInfo = getRestInfo(weightInLbs);

    // Pull temp (remove before target)
    const pullTempF = targetTempF - restInfo.carryoverMidpoint;

    // Servings estimate
    const servingPerPerson = isBoneIn
      ? servingSizes["bone-in"][meatType]
      : servingSizes["boneless"][meatType];
    const servings = Math.floor(weightInLbs / servingPerPerson);

    return {
      timeMinLow,
      timeMinHigh,
      ovenTempF,
      targetTempF,
      pullTempF,
      restTime: restInfo.restTime,
      carryover: restInfo.carryover,
      servings,
      specialTarget: currentCut.specialTarget,
      notes: currentCut.notes,
    };
  }, [currentCut, weightInLbs, isBoneIn, isStuffed, isConvection, doneness, meatType]);

  // Handle meat type change
  const handleMeatTypeChange = (newType: MeatType) => {
    setMeatType(newType);
    const firstCut = meatCuts[newType][0];
    setSelectedCut(firstCut.key);
    setIsBoneIn(firstCut.defaultBoneIn);
    resetResults();
  };

  // Handle cut change
  const handleCutChange = (cutKey: string) => {
    setSelectedCut(cutKey);
    const cut = meatCuts[meatType].find((c) => c.key === cutKey);
    if (cut) {
      setIsBoneIn(cut.defaultBoneIn);
    }
    resetResults();
  };

  return (
    <div className="calculator-card p-6 md:p-8">
      <div className="space-y-6">
        {/* Meat Type and Cut Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meat Type
            </label>
            <select
              value={meatType}
              onChange={(e) => handleMeatTypeChange(e.target.value as MeatType)}
              className="select-field w-full"
            >
              {meatTypes.map((type) => (
                <option key={type.key} value={type.key}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cut
            </label>
            <select
              value={selectedCut}
              onChange={(e) => handleCutChange(e.target.value)}
              className="select-field w-full"
            >
              {meatCuts[meatType].map((cut) => (
                <option key={cut.key} value={cut.key}>
                  {cut.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Weight Input */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={weight}
                onChange={(e) => { setWeight(Number(e.target.value)); resetResults(); }}
                className="input-field flex-1"
                min={0.5}
                max={30}
                step={0.5}
              />
              <div className="flex rounded-lg overflow-hidden border border-gray-200">
                <button
                  onClick={() => { setWeightUnit("lbs"); resetResults(); }}
                  className={`px-3 py-2 text-sm font-medium ${
                    weightUnit === "lbs"
                      ? "bg-coral text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  lbs
                </button>
                <button
                  onClick={() => { setWeightUnit("kg"); resetResults(); }}
                  className={`px-3 py-2 text-sm font-medium ${
                    weightUnit === "kg"
                      ? "bg-coral text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  kg
                </button>
              </div>
            </div>
          </div>

          {/* Doneness (only for applicable cuts) */}
          {currentCut?.hasDonenessOption && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Doneness
              </label>
              <select
                value={doneness}
                onChange={(e) => { setDoneness(e.target.value as DonenessLevel); resetResults(); }}
                className="select-field w-full"
              >
                {donenessLevels.map((level) => (
                  <option key={level.level} value={level.level}>
                    {level.label} ({level.internalTempF}°F)
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Options Row */}
        <div className="flex flex-wrap gap-4">
          {/* Bone-in Toggle */}
          {currentCut?.hasBoneOption && (
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isBoneIn}
                onChange={(e) => { setIsBoneIn(e.target.checked); resetResults(); }}
                className="w-4 h-4 text-coral rounded focus:ring-coral"
              />
              <span className="text-sm text-gray-700">Bone-in</span>
            </label>
          )}

          {/* Stuffed Toggle */}
          {currentCut?.hasStuffedOption && (
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isStuffed}
                onChange={(e) => { setIsStuffed(e.target.checked); resetResults(); }}
                className="w-4 h-4 text-coral rounded focus:ring-coral"
              />
              <span className="text-sm text-gray-700">Stuffed</span>
            </label>
          )}

          {/* Convection Toggle */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isConvection}
              onChange={(e) => { setIsConvection(e.target.checked); resetResults(); }}
              className="w-4 h-4 text-coral rounded focus:ring-coral"
            />
            <span className="text-sm text-gray-700">Convection oven</span>
          </label>
        </div>

        <button
          onClick={() => setShowResults(true)}
          className="btn-primary w-full sm:w-auto"
        >
          Calculate Cooking Time
        </button>

        {/* Results */}
        {showResults && results && (
          <div className="results-panel space-y-6">
            <h3 className="font-serif text-lg font-semibold text-gray-900">
              Cooking Instructions for {currentCut?.label}
            </h3>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <StatCard
                label="Cook Time"
                value={formatTime(results.timeMinLow)}
                sublabel={results.timeMinLow !== results.timeMinHigh ? `to ${formatTime(results.timeMinHigh)}` : "total"}
                color="coral"
              />
              <StatCard
                label="Oven Temp"
                value={`${results.ovenTempF}°F`}
                sublabel={`${fahrenheitToCelsius(results.ovenTempF)}°C`}
                color="amber"
              />
              <StatCard
                label="Target Temp"
                value={`${results.targetTempF}°F`}
                sublabel={`${fahrenheitToCelsius(results.targetTempF)}°C`}
                color="green"
              />
              <StatCard
                label="Pull At"
                value={`${results.pullTempF}°F`}
                sublabel="remove from heat"
                color="blue"
              />
              <StatCard
                label="Rest Time"
                value={results.restTime}
                sublabel={`+${results.carryover} rise`}
                color="purple"
              />
              {results.servings > 0 && (
                <StatCard
                  label="Serves"
                  value={results.servings}
                  sublabel="people"
                  color="gray"
                />
              )}
            </div>

            {/* Temperature Guide with Visual */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Temperature Timeline */}
              <div className="p-4 bg-white border border-gray-200 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-4">Temperature Journey</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-600">Oven Temperature</span>
                    <span className="font-semibold text-coral">{results.ovenTempF}°F</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-0.5 h-6 bg-gray-300"></div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                    <span className="text-sm text-gray-600">Pull from Heat At</span>
                    <span className="font-semibold text-blue-600">{results.pullTempF}°F</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-0.5 h-6 bg-gray-300"></div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-amber-50 rounded">
                    <span className="text-sm text-gray-600">Rest ({results.restTime})</span>
                    <span className="font-semibold text-amber-600">+{results.carryover}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-0.5 h-6 bg-gray-300"></div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-green-50 rounded border-2 border-green-300">
                    <span className="text-sm font-medium text-gray-700">Final Internal Temp</span>
                    <span className="font-bold text-green-600">{results.targetTempF}°F</span>
                  </div>
                </div>
              </div>

              {/* Cooking Timeline */}
              <div className="p-4 bg-white border border-gray-200 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-4">Cooking Timeline</h4>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-coral text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
                    <div>
                      <p className="font-medium text-gray-900">Prep & Preheat</p>
                      <p className="text-sm text-gray-600">Let meat reach room temp (~30 min). Preheat oven to {results.ovenTempF}°F.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-coral text-white rounded-full flex items-center justify-center text-sm font-medium">2</div>
                    <div>
                      <p className="font-medium text-gray-900">Cook</p>
                      <p className="text-sm text-gray-600">Roast for {formatTime(results.timeMinLow)}{results.timeMinLow !== results.timeMinHigh ? ` to ${formatTime(results.timeMinHigh)}` : ""}.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-coral text-white rounded-full flex items-center justify-center text-sm font-medium">3</div>
                    <div>
                      <p className="font-medium text-gray-900">Check Temperature</p>
                      <p className="text-sm text-gray-600">Remove when internal temp reaches {results.pullTempF}°F.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-coral text-white rounded-full flex items-center justify-center text-sm font-medium">4</div>
                    <div>
                      <p className="font-medium text-gray-900">Rest & Serve</p>
                      <p className="text-sm text-gray-600">Rest {results.restTime}, then carve. Temp will rise ~{results.carryover}.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Doneness Reference Table */}
            {currentCut?.hasDonenessOption && (
              <div className="p-4 bg-white border border-gray-200 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Doneness Reference</h4>
                <ComparisonTable
                  headers={["Internal Temp", "Description"]}
                  rows={donenessLevels.map((level) => ({
                    label: level.label,
                    values: [`${level.internalTempF}°F (${fahrenheitToCelsius(level.internalTempF)}°C)`, level.description || ""],
                    highlight: level.level === doneness,
                  }))}
                />
              </div>
            )}

            {/* Tips and Warnings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.specialTarget && (
                <InsightCard type="warning" title="Special Note">
                  {results.specialTarget}
                </InsightCard>
              )}

              {results.notes && (
                <InsightCard type="tip" title="Pro Tip">
                  {results.notes}
                </InsightCard>
              )}

              {isStuffed && (
                <InsightCard type="warning" title="Stuffing Safety">
                  The center of the stuffing must also reach 165°F. Check with a thermometer in the stuffing center.
                </InsightCard>
              )}

              {isConvection && (
                <InsightCard type="info" title="Convection Adjustment">
                  Temperature reduced by 25°F and time reduced by 25% for convection cooking.
                </InsightCard>
              )}

              <InsightCard type="tip" title="Thermometer Placement">
                Insert into the thickest part of the meat, avoiding bone for accurate readings.
              </InsightCard>
            </div>

            {/* Serving Info */}
            {results.servings > 0 && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="text-sm font-medium text-green-800 mb-2">Serving Estimate</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-green-700">{weight}</p>
                    <p className="text-xs text-green-600">{weightUnit} total</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-700">{results.servings}</p>
                    <p className="text-xs text-green-600">servings</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-700">~{Math.round((weightUnit === "kg" ? weight * 2.205 : weight) / results.servings * 16)}</p>
                    <p className="text-xs text-green-600">oz per person</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Thermometer Reminder */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Always use a meat thermometer.</strong> Times are estimates
            — your thermometer is the final word on doneness. Insert into the
            thickest part, avoiding bone.
          </p>
        </div>
      </div>
    </div>
  );
}
