"use client";

import { useState, useMemo, useCallback } from "react";
import {
  StatCard,
  InsightCard,
  ComparisonBarChart,
  ProgressRing,
  CHART_COLORS,
} from "@/components/charts";

type CalculatorMode = "forward" | "reverse" | "target";

interface Ingredient {
  id: string;
  name: string;
  percentage?: number;
  weight?: number;
  isFlour: boolean;
}

interface Preset {
  name: string;
  ingredients: { name: string; percentage: number; isFlour: boolean }[];
}

const presets: Record<string, Preset> = {
  basicBread: {
    name: "Basic Bread",
    ingredients: [
      { name: "Bread Flour", percentage: 100, isFlour: true },
      { name: "Water", percentage: 65, isFlour: false },
      { name: "Salt", percentage: 2, isFlour: false },
      { name: "Instant Yeast", percentage: 1, isFlour: false },
    ],
  },
  sourdough: {
    name: "Sourdough",
    ingredients: [
      { name: "Bread Flour", percentage: 100, isFlour: true },
      { name: "Water", percentage: 72, isFlour: false },
      { name: "Starter", percentage: 20, isFlour: false },
      { name: "Salt", percentage: 2, isFlour: false },
    ],
  },
  pizza: {
    name: "Pizza Dough",
    ingredients: [
      { name: "Bread Flour", percentage: 100, isFlour: true },
      { name: "Water", percentage: 63, isFlour: false },
      { name: "Salt", percentage: 2.5, isFlour: false },
      { name: "Olive Oil", percentage: 3, isFlour: false },
      { name: "Instant Yeast", percentage: 0.7, isFlour: false },
    ],
  },
  brioche: {
    name: "Brioche",
    ingredients: [
      { name: "All-Purpose Flour", percentage: 100, isFlour: true },
      { name: "Eggs", percentage: 30, isFlour: false },
      { name: "Butter", percentage: 50, isFlour: false },
      { name: "Sugar", percentage: 12, isFlour: false },
      { name: "Milk", percentage: 15, isFlour: false },
      { name: "Salt", percentage: 2, isFlour: false },
      { name: "Instant Yeast", percentage: 1.5, isFlour: false },
    ],
  },
  baguette: {
    name: "Baguette",
    ingredients: [
      { name: "Bread Flour", percentage: 100, isFlour: true },
      { name: "Water", percentage: 68, isFlour: false },
      { name: "Salt", percentage: 2, isFlour: false },
      { name: "Instant Yeast", percentage: 0.6, isFlour: false },
    ],
  },
};

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export default function BakersPercentageCalculator() {
  const [mode, setMode] = useState<CalculatorMode>("forward");
  const [showResults, setShowResults] = useState<boolean>(false);

  const resetResults = useCallback(() => setShowResults(false), []);
  const [flourWeight, setFlourWeight] = useState<number>(500);
  const [targetDoughWeight, setTargetDoughWeight] = useState<number>(1000);

  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: generateId(), name: "Bread Flour", percentage: 100, isFlour: true },
    { id: generateId(), name: "Water", percentage: 65, isFlour: false },
    { id: generateId(), name: "Salt", percentage: 2, isFlour: false },
    { id: generateId(), name: "Instant Yeast", percentage: 1, isFlour: false },
  ]);

  const loadPreset = (presetKey: string) => {
    const preset = presets[presetKey];
    if (preset) {
      setIngredients(
        preset.ingredients.map((ing) => ({
          id: generateId(),
          ...ing,
        }))
      );
    }
  };

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: generateId(), name: "", percentage: 0, isFlour: false },
    ]);
  };

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter((i) => i.id !== id));
  };

  const updateIngredient = (
    id: string,
    field: keyof Ingredient,
    value: string | number | boolean
  ) => {
    setIngredients(
      ingredients.map((i) => (i.id === id ? { ...i, [field]: value } : i))
    );
  };

  const results = useMemo(() => {
    if (mode === "forward" || mode === "target") {
      // Forward: percentage → weights
      let activeFlourWeight = flourWeight;

      if (mode === "target") {
        // Calculate flour weight from target dough weight
        const totalPercentage = ingredients.reduce(
          (sum, ing) => sum + (ing.percentage || 0),
          0
        );
        activeFlourWeight = Math.round(
          targetDoughWeight / (totalPercentage / 100)
        );
      }

      const calculated = ingredients.map((ing) => ({
        ...ing,
        weight: Math.round((activeFlourWeight * (ing.percentage || 0)) / 100),
      }));

      const totalWeight = calculated.reduce(
        (sum, ing) => sum + (ing.weight || 0),
        0
      );
      const totalPercentage = ingredients.reduce(
        (sum, ing) => sum + (ing.percentage || 0),
        0
      );

      const hydration = ingredients.find(
        (ing) => ing.name.toLowerCase().includes("water")
      )?.percentage;

      return {
        ingredients: calculated,
        totalWeight,
        totalPercentage,
        flourWeight: activeFlourWeight,
        hydration,
      };
    } else {
      // Reverse: weights → percentages
      const flourIngredients = ingredients.filter((ing) => ing.isFlour);
      const totalFlourWeight = flourIngredients.reduce(
        (sum, ing) => sum + (ing.weight || 0),
        0
      );

      if (totalFlourWeight === 0) {
        return {
          ingredients: ingredients.map((ing) => ({ ...ing, percentage: 0 })),
          totalWeight: 0,
          totalPercentage: 0,
          flourWeight: 0,
        };
      }

      const calculated = ingredients.map((ing) => ({
        ...ing,
        percentage: ing.isFlour
          ? Math.round(((ing.weight || 0) / totalFlourWeight) * 100 * 10) / 10
          : Math.round(((ing.weight || 0) / totalFlourWeight) * 100 * 10) / 10,
      }));

      const totalWeight = ingredients.reduce(
        (sum, ing) => sum + (ing.weight || 0),
        0
      );
      const totalPercentage = calculated.reduce(
        (sum, ing) => sum + (ing.percentage || 0),
        0
      );

      const waterIng = calculated.find((ing) =>
        ing.name.toLowerCase().includes("water")
      );
      const hydration = waterIng?.percentage;

      return {
        ingredients: calculated,
        totalWeight,
        totalPercentage,
        flourWeight: totalFlourWeight,
        hydration,
      };
    }
  }, [mode, flourWeight, targetDoughWeight, ingredients]);

  return (
    <div className="calculator-card p-6 md:p-8">
      <div className="space-y-6">
        {/* Mode Toggle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calculator Mode
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => { setMode("forward"); resetResults(); }}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === "forward"
                  ? "bg-coral text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              % → Weights
            </button>
            <button
              onClick={() => { setMode("reverse"); resetResults(); }}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === "reverse"
                  ? "bg-coral text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Weights → %
            </button>
            <button
              onClick={() => { setMode("target"); resetResults(); }}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === "target"
                  ? "bg-coral text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Target Dough
            </button>
          </div>
        </div>

        {/* Presets */}
        {(mode === "forward" || mode === "target") && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Load Preset
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(presets).map(([key, preset]) => (
                <button
                  key={key}
                  onClick={() => { loadPreset(key); resetResults(); }}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Flour Weight or Target Dough Weight */}
        {mode === "forward" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Flour Weight (g)
            </label>
            <input
              type="number"
              value={flourWeight}
              onChange={(e) => { setFlourWeight(Number(e.target.value)); resetResults(); }}
              className="input-field w-32"
              min={100}
              max={10000}
            />
          </div>
        )}

        {mode === "target" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Total Dough Weight (g)
            </label>
            <input
              type="number"
              value={targetDoughWeight}
              onChange={(e) => { setTargetDoughWeight(Number(e.target.value)); resetResults(); }}
              className="input-field w-32"
              min={100}
              max={20000}
            />
          </div>
        )}

        {/* Ingredients */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Ingredients
          </label>

          <div className="space-y-3">
            {ingredients.map((ing, index) => (
              <div
                key={ing.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <input
                  type="text"
                  value={ing.name}
                  onChange={(e) => {
                    updateIngredient(ing.id, "name", e.target.value);
                    resetResults();
                  }}
                  className="input-field flex-1"
                  placeholder="Ingredient name"
                />

                {mode === "reverse" ? (
                  <input
                    type="number"
                    value={ing.weight || ""}
                    onChange={(e) => {
                      updateIngredient(ing.id, "weight", Number(e.target.value));
                      resetResults();
                    }}
                    className="input-field w-24"
                    placeholder="g"
                    min={0}
                  />
                ) : (
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={ing.percentage || ""}
                      onChange={(e) => {
                        updateIngredient(
                          ing.id,
                          "percentage",
                          Number(e.target.value)
                        );
                        resetResults();
                      }}
                      className="input-field w-20"
                      placeholder="%"
                      min={0}
                      step={0.5}
                    />
                    <span className="text-gray-500">%</span>
                  </div>
                )}

                <label className="flex items-center gap-1 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={ing.isFlour}
                    onChange={(e) => {
                      updateIngredient(ing.id, "isFlour", e.target.checked);
                      resetResults();
                    }}
                    className="rounded border-gray-300"
                  />
                  Flour
                </label>

                {index > 0 && (
                  <button
                    onClick={() => { removeIngredient(ing.id); resetResults(); }}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => { addIngredient(); resetResults(); }}
            className="mt-3 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            + Add Ingredient
          </button>
        </div>

        <button
          onClick={() => setShowResults(true)}
          className="btn-primary w-full sm:w-auto"
        >
          Calculate
        </button>

        {/* Results */}
        {showResults && (() => {
          const validIngredients = results.ingredients.filter(ing => ing.name);
          const nonFlourIngredients = validIngredients.filter(ing => !ing.isFlour);
          const flourIngredients = validIngredients.filter(ing => ing.isFlour);

          // Hydration classification
          const hydrationLevel = results.hydration
            ? results.hydration < 60 ? "Low" :
              results.hydration < 68 ? "Medium" :
              results.hydration < 75 ? "High" : "Very High"
            : null;

          // Chart data for composition
          const chartColors = [CHART_COLORS.primary, CHART_COLORS.secondary, CHART_COLORS.tertiary, CHART_COLORS.quaternary, CHART_COLORS.protein, CHART_COLORS.carbs];
          const compositionData = validIngredients.slice(0, 6).map((ing, idx) => ({
            name: ing.name.length > 10 ? ing.name.slice(0, 10) + "..." : ing.name,
            value: ing.weight || 0,
            fill: ing.isFlour ? CHART_COLORS.quaternary : chartColors[idx % chartColors.length],
          }));

          return (
        <div className="results-panel space-y-6">
          <h3 className="font-serif text-lg font-semibold text-gray-900">
            {mode === "reverse" ? "Baker's Percentages" : "Complete Recipe"}
          </h3>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard
              label="Total Flour"
              value={`${results.flourWeight}g`}
              sublabel="100% base"
              color="amber"
            />
            <StatCard
              label="Total Dough"
              value={`${results.totalWeight}g`}
              sublabel={`${results.totalPercentage.toFixed(0)}% total`}
              color="green"
            />
            <StatCard
              label="Hydration"
              value={results.hydration ? `${results.hydration}%` : "—"}
              sublabel={hydrationLevel || "Add water"}
              color="blue"
            />
            <StatCard
              label="Ingredients"
              value={validIngredients.length}
              sublabel={`${flourIngredients.length} flour type${flourIngredients.length !== 1 ? "s" : ""}`}
              color="purple"
            />
          </div>

          {/* Hydration Progress Ring */}
          {results.hydration && (
            <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl">
              <h4 className="font-medium text-gray-900 mb-4">Hydration Analysis</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="flex justify-center">
                  <ProgressRing
                    value={results.hydration}
                    max={100}
                    size={140}
                    color={
                      results.hydration < 60 ? CHART_COLORS.quaternary :
                      results.hydration < 70 ? CHART_COLORS.secondary :
                      results.hydration < 80 ? CHART_COLORS.tertiary :
                      CHART_COLORS.protein
                    }
                    label="Hydration"
                    sublabel={hydrationLevel || ""}
                  />
                </div>
                <div className="space-y-3">
                  <div className={`p-3 rounded-lg ${results.hydration < 60 ? "bg-amber-100" : results.hydration < 70 ? "bg-green-100" : results.hydration < 80 ? "bg-blue-100" : "bg-purple-100"}`}>
                    <p className="text-sm font-medium text-gray-800">
                      {results.hydration < 60 ? "Low Hydration Dough" :
                       results.hydration < 68 ? "Medium Hydration Dough" :
                       results.hydration < 75 ? "High Hydration Dough" : "Very High Hydration Dough"}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {results.hydration < 60 ? "Stiff dough, good for bagels and pretzels. Easy to shape." :
                       results.hydration < 68 ? "Standard bread hydration. Good balance of texture and workability." :
                       results.hydration < 75 ? "Open crumb, artisan bread. Stickier but great texture." :
                       "Very slack dough, ciabatta territory. Requires experience to handle."}
                    </p>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Water weight: <span className="font-medium">{Math.round((results.flourWeight * (results.hydration / 100)))}g</span></p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dough Composition Chart */}
          {compositionData.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Dough Composition (by weight)</h4>
              <ComparisonBarChart
                data={compositionData}
                height={Math.max(150, compositionData.length * 32)}
                unit="g"
                showValue
              />
            </div>
          )}

          {/* Main Result Box */}
          <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
            <div className="text-center">
              <p className="text-sm text-green-700 mb-1">Your Total Dough Weight</p>
              <p className="text-4xl font-bold text-green-900">{results.totalWeight}g</p>
              <p className="text-sm text-green-700 mt-2">
                ({(results.totalWeight / 1000).toFixed(2)} kg • {(results.totalWeight / 28.35).toFixed(1)} oz)
              </p>
            </div>
          </div>

          {/* Detailed Ingredient Table */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Full Recipe Breakdown</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-2 font-medium text-gray-700">Ingredient</th>
                    <th className="text-center py-2 px-2 font-medium text-gray-700">Baker&apos;s %</th>
                    <th className="text-center py-2 px-2 font-medium text-gray-700">Weight (g)</th>
                    <th className="text-center py-2 px-2 font-medium text-gray-700">% of Total</th>
                  </tr>
                </thead>
                <tbody>
                  {validIngredients.map((ing) => {
                    const percentOfTotal = results.totalWeight > 0
                      ? ((ing.weight || 0) / results.totalWeight) * 100
                      : 0;
                    return (
                      <tr key={ing.id} className={`border-b border-gray-100 ${ing.isFlour ? "bg-amber-50" : ""}`}>
                        <td className="py-2 px-2">
                          {ing.name}
                          {ing.isFlour && (
                            <span className="ml-1 text-xs text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded">flour</span>
                          )}
                        </td>
                        <td className="text-center py-2 px-2 font-medium text-gray-900">
                          {ing.percentage?.toFixed(1) || 0}%
                        </td>
                        <td className="text-center py-2 px-2 font-semibold text-gray-900">
                          {ing.weight || 0}g
                        </td>
                        <td className="text-center py-2 px-2">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${Math.min(percentOfTotal, 100)}%`,
                                  backgroundColor: ing.isFlour ? CHART_COLORS.quaternary : CHART_COLORS.primary,
                                }}
                              />
                            </div>
                            <span className="text-gray-600 text-xs w-10">{percentOfTotal.toFixed(0)}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100 font-semibold">
                    <td className="py-2 px-2 text-gray-900">Total</td>
                    <td className="text-center py-2 px-2 text-gray-900">{results.totalPercentage.toFixed(1)}%</td>
                    <td className="text-center py-2 px-2 text-gray-900">{results.totalWeight}g</td>
                    <td className="text-center py-2 px-2 text-gray-600">100%</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Scaling Quick Reference */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Quick Scale Reference</h4>
            <div className="grid grid-cols-4 gap-3 text-center text-sm">
              <div>
                <p className="text-xs text-gray-500">Half Recipe</p>
                <p className="font-semibold text-gray-900">{Math.round(results.totalWeight / 2)}g</p>
              </div>
              <div className="bg-white p-2 rounded border border-gray-200">
                <p className="text-xs text-gray-500">Current</p>
                <p className="font-semibold text-gray-900">{results.totalWeight}g</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">1.5× Recipe</p>
                <p className="font-semibold text-gray-900">{Math.round(results.totalWeight * 1.5)}g</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Double Recipe</p>
                <p className="font-semibold text-gray-900">{Math.round(results.totalWeight * 2)}g</p>
              </div>
            </div>
          </div>

          {/* Dough Ball Calculator */}
          <InsightCard type="tip" title="Dough Ball Sizes">
            <div className="grid grid-cols-3 gap-3 mt-2">
              <div>
                <p className="font-medium text-sm">Pizza (10&quot;)</p>
                <p className="text-xs">{Math.floor(results.totalWeight / 250)} balls @ 250g</p>
              </div>
              <div>
                <p className="font-medium text-sm">Burger Buns</p>
                <p className="text-xs">{Math.floor(results.totalWeight / 80)} buns @ 80g</p>
              </div>
              <div>
                <p className="font-medium text-sm">Dinner Rolls</p>
                <p className="text-xs">{Math.floor(results.totalWeight / 50)} rolls @ 50g</p>
              </div>
            </div>
          </InsightCard>

          {/* Copy/Print Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                const text = `Baker's Percentage Recipe:\nTotal Dough: ${results.totalWeight}g\nHydration: ${results.hydration || "N/A"}%\n\n${validIngredients.map(i => `${i.name}: ${i.percentage?.toFixed(1)}% (${i.weight}g)`).join("\n")}`;
                navigator.clipboard.writeText(text);
              }}
              className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
            >
              Copy Recipe
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
            >
              Print
            </button>
          </div>
        </div>
          );
        })()}

        {/* Reference Guide */}
        <InsightCard type="info" title="Baker's Percentage Reference">
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <p className="font-medium text-sm">Hydration Levels</p>
              <ul className="text-xs space-y-0.5 mt-1">
                <li>55-65%: Sandwich bread, bagels</li>
                <li>65-72%: Artisan bread, baguettes</li>
                <li>75-85%: Ciabatta, focaccia</li>
                <li>85%+: High-hydration sourdough</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-sm">Standard Ranges</p>
              <ul className="text-xs space-y-0.5 mt-1">
                <li>Salt: 1.8-2.5% (2% standard)</li>
                <li>Instant yeast: 0.5-1.5%</li>
                <li>Active dry: 0.7-2%</li>
                <li>Sourdough starter: 10-30%</li>
              </ul>
            </div>
          </div>
        </InsightCard>
      </div>
    </div>
  );
}
