"use client";

import { useState, useMemo, useCallback } from "react";
import {
  StatCard,
  InsightCard,
  ComparisonBarChart,
  ProgressRing,
  CHART_COLORS,
} from "@/components/charts";

type Unit = "g" | "kg" | "oz" | "lb" | "cup" | "tbsp" | "tsp" | "each" | "ml" | "L";

interface Ingredient {
  id: string;
  name: string;
  amountUsed: number;
  amountUnit: Unit;
  packagePrice: number;
  packageSize: number;
  packageUnit: Unit;
}

const unitConversions: Record<string, number> = {
  // Weight to grams
  "g": 1,
  "kg": 1000,
  "oz": 28.35,
  "lb": 453.6,
  // Volume to ml
  "ml": 1,
  "L": 1000,
  "cup": 237,
  "tbsp": 15,
  "tsp": 5,
  // Count
  "each": 1,
};

// Common ingredients with cup-to-gram conversions
const ingredientDensities: Record<string, number> = {
  "flour": 125, // g per cup
  "sugar": 200,
  "brown sugar": 220,
  "butter": 227,
  "milk": 245,
  "water": 237,
  "oil": 218,
  "honey": 340,
  "rice": 185,
  "salt": 288,
  "default": 150, // rough average
};

function getGramsPerCup(name: string): number {
  const lower = name.toLowerCase();
  for (const [key, value] of Object.entries(ingredientDensities)) {
    if (lower.includes(key)) return value;
  }
  return ingredientDensities.default;
}

function convertToBaseUnit(amount: number, unit: Unit, ingredientName: string): number {
  if (unit === "cup" || unit === "tbsp" || unit === "tsp") {
    const gramsPerCup = getGramsPerCup(ingredientName);
    const mlEquivalent = amount * unitConversions[unit];
    return (mlEquivalent / 237) * gramsPerCup;
  }
  return amount * unitConversions[unit];
}

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export default function RecipeCostCalculator() {
  const [recipeName, setRecipeName] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);

  const resetResults = useCallback(() => setShowResults(false), []);
  const [servings, setServings] = useState<number>(4);
  const [menuPrice, setMenuPrice] = useState<number | null>(null);
  const [showMenuPrice, setShowMenuPrice] = useState<boolean>(false);

  const [ingredients, setIngredients] = useState<Ingredient[]>([
    {
      id: generateId(),
      name: "All-purpose flour",
      amountUsed: 2,
      amountUnit: "cup",
      packagePrice: 3.49,
      packageSize: 5,
      packageUnit: "lb",
    },
    {
      id: generateId(),
      name: "Butter",
      amountUsed: 0.5,
      amountUnit: "cup",
      packagePrice: 5.49,
      packageSize: 1,
      packageUnit: "lb",
    },
    {
      id: generateId(),
      name: "Sugar",
      amountUsed: 0.75,
      amountUnit: "cup",
      packagePrice: 4.29,
      packageSize: 4,
      packageUnit: "lb",
    },
  ]);

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      {
        id: generateId(),
        name: "",
        amountUsed: 1,
        amountUnit: "cup",
        packagePrice: 0,
        packageSize: 1,
        packageUnit: "lb",
      },
    ]);
  };

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter((i) => i.id !== id));
  };

  const updateIngredient = (id: string, field: keyof Ingredient, value: string | number) => {
    setIngredients(
      ingredients.map((i) =>
        i.id === id ? { ...i, [field]: value } : i
      )
    );
  };

  const results = useMemo(() => {
    const ingredientCosts = ingredients.map((ing) => {
      if (!ing.name || ing.packagePrice === 0 || ing.packageSize === 0) {
        return { ...ing, cost: 0, costPerUnit: 0 };
      }

      const usedInBase = convertToBaseUnit(ing.amountUsed, ing.amountUnit, ing.name);
      const packageInBase = convertToBaseUnit(ing.packageSize, ing.packageUnit, ing.name);

      const costPerBaseUnit = ing.packagePrice / packageInBase;
      const cost = costPerBaseUnit * usedInBase;

      return {
        ...ing,
        cost: Math.round(cost * 100) / 100,
        costPerUnit: Math.round(costPerBaseUnit * 1000) / 1000,
      };
    });

    const totalCost = ingredientCosts.reduce((sum, ing) => sum + ing.cost, 0);
    const costPerServing = totalCost / servings;

    let foodCostPercent = null;
    let suggestedPrices: { percent: number; price: number }[] = [];

    if (menuPrice && menuPrice > 0) {
      foodCostPercent = (totalCost / menuPrice) * 100;
      suggestedPrices = [28, 30, 33, 35].map((pct) => ({
        percent: pct,
        price: Math.round((totalCost / (pct / 100)) * 100) / 100,
      }));
    }

    // Sort by cost contribution
    const sortedByContribution = [...ingredientCosts].sort((a, b) => b.cost - a.cost);

    return {
      ingredients: ingredientCosts,
      sortedByContribution,
      totalCost: Math.round(totalCost * 100) / 100,
      costPerServing: Math.round(costPerServing * 100) / 100,
      foodCostPercent: foodCostPercent ? Math.round(foodCostPercent * 10) / 10 : null,
      suggestedPrices,
    };
  }, [ingredients, servings, menuPrice]);

  const unitOptions: Unit[] = ["g", "kg", "oz", "lb", "cup", "tbsp", "tsp", "each", "ml", "L"];

  return (
    <div className="calculator-card p-6 md:p-8">
      <div className="space-y-6">
        {/* Recipe Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipe Name (optional)
            </label>
            <input
              type="text"
              value={recipeName}
              onChange={(e) => { setRecipeName(e.target.value); resetResults(); }}
              className="input-field w-full"
              placeholder="My Recipe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Servings
            </label>
            <input
              type="number"
              value={servings}
              onChange={(e) => { setServings(Number(e.target.value)); resetResults(); }}
              className="input-field w-full"
              min={1}
              max={100}
            />
          </div>
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Ingredients
          </label>

          <div className="space-y-4">
            {ingredients.map((ing, index) => (
              <div key={ing.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-600">Ingredient {index + 1}</span>
                  {ingredients.length > 1 && (
                    <button
                      onClick={() => { removeIngredient(ing.id); resetResults(); }}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={ing.name}
                    onChange={(e) => { updateIngredient(ing.id, "name", e.target.value); resetResults(); }}
                    className="input-field"
                    placeholder="Ingredient name"
                  />

                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={ing.amountUsed}
                      onChange={(e) => { updateIngredient(ing.id, "amountUsed", Number(e.target.value)); resetResults(); }}
                      className="input-field flex-1"
                      placeholder="Amount used"
                      min={0}
                      step={0.25}
                    />
                    <select
                      value={ing.amountUnit}
                      onChange={(e) => { updateIngredient(ing.id, "amountUnit", e.target.value); resetResults(); }}
                      className="input-field w-20"
                    >
                      {unitOptions.map((u) => (
                        <option key={u} value={u}>{u}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-2 items-center">
                    <span className="text-gray-500">$</span>
                    <input
                      type="number"
                      value={ing.packagePrice || ""}
                      onChange={(e) => { updateIngredient(ing.id, "packagePrice", Number(e.target.value)); resetResults(); }}
                      className="input-field flex-1"
                      placeholder="Package price"
                      min={0}
                      step={0.01}
                    />
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={ing.packageSize}
                      onChange={(e) => { updateIngredient(ing.id, "packageSize", Number(e.target.value)); resetResults(); }}
                      className="input-field flex-1"
                      placeholder="Package size"
                      min={0}
                      step={0.25}
                    />
                    <select
                      value={ing.packageUnit}
                      onChange={(e) => { updateIngredient(ing.id, "packageUnit", e.target.value); resetResults(); }}
                      className="input-field w-20"
                    >
                      {unitOptions.map((u) => (
                        <option key={u} value={u}>{u}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => { addIngredient(); resetResults(); }}
            className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            + Add Ingredient
          </button>
        </div>

        {/* Menu Price (for businesses) */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="showMenuPrice"
            checked={showMenuPrice}
            onChange={(e) => { setShowMenuPrice(e.target.checked); resetResults(); }}
            className="rounded border-gray-300"
          />
          <label htmlFor="showMenuPrice" className="text-sm text-gray-700">
            Calculate food cost % (for food businesses)
          </label>
        </div>

        {showMenuPrice && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Menu / Selling Price ($)
            </label>
            <input
              type="number"
              value={menuPrice || ""}
              onChange={(e) => { setMenuPrice(Number(e.target.value) || null); resetResults(); }}
              className="input-field w-32"
              min={0}
              step={0.01}
            />
          </div>
        )}

        <button
          onClick={() => setShowResults(true)}
          className="btn-primary w-full sm:w-auto"
        >
          Calculate
        </button>

        {/* Results */}
        {showResults && (() => {
          const validIngredients = results.sortedByContribution.filter(ing => ing.name && ing.cost > 0);
          const topIngredient = validIngredients[0];
          const topIngredientPercent = topIngredient && results.totalCost > 0
            ? Math.round((topIngredient.cost / results.totalCost) * 100)
            : 0;
          const profitPerServing = menuPrice && menuPrice > 0
            ? (menuPrice / servings) - results.costPerServing
            : null;
          const totalProfit = menuPrice && menuPrice > 0
            ? menuPrice - results.totalCost
            : null;

          // Chart data for ingredient costs
          const chartColors = [CHART_COLORS.primary, CHART_COLORS.secondary, CHART_COLORS.tertiary, CHART_COLORS.quaternary, CHART_COLORS.protein, CHART_COLORS.carbs];
          const ingredientChartData = validIngredients.slice(0, 6).map((ing, idx) => ({
            name: ing.name.length > 12 ? ing.name.slice(0, 12) + "..." : ing.name,
            value: ing.cost,
            fill: chartColors[idx % chartColors.length],
          }));

          return (
        <div className="results-panel space-y-6">
          <h3 className="font-serif text-lg font-semibold text-gray-900">
            Cost Breakdown {recipeName && `— ${recipeName}`}
          </h3>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard
              label="Total Cost"
              value={`$${results.totalCost.toFixed(2)}`}
              sublabel="entire recipe"
              color="green"
            />
            <StatCard
              label="Per Serving"
              value={`$${results.costPerServing.toFixed(2)}`}
              sublabel={`÷ ${servings} servings`}
              color="blue"
            />
            <StatCard
              label="Ingredients"
              value={validIngredients.length}
              sublabel="tracked items"
              color="purple"
            />
            <StatCard
              label="Top Ingredient"
              value={`${topIngredientPercent}%`}
              sublabel={topIngredient?.name || "—"}
              color="amber"
            />
          </div>

          {/* Food Cost Analysis (for businesses) */}
          {results.foodCostPercent !== null && menuPrice && menuPrice > 0 && (
            <div className="p-5 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl">
              <h4 className="font-medium text-gray-900 mb-4">Business Analysis</h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* Food Cost Ring */}
                <div className="flex justify-center">
                  <ProgressRing
                    value={results.foodCostPercent}
                    max={50}
                    size={140}
                    color={
                      results.foodCostPercent <= 28 ? CHART_COLORS.secondary :
                      results.foodCostPercent <= 33 ? CHART_COLORS.quaternary :
                      results.foodCostPercent <= 38 ? "#F97316" : CHART_COLORS.protein
                    }
                    label="Food Cost %"
                    sublabel={
                      results.foodCostPercent <= 28 ? "Excellent" :
                      results.foodCostPercent <= 33 ? "Good" :
                      results.foodCostPercent <= 38 ? "Fair" : "High"
                    }
                  />
                </div>

                {/* Profit Metrics */}
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-xs text-green-700">Total Profit</p>
                    <p className="text-xl font-bold text-green-900">${totalProfit?.toFixed(2)}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-700">Profit Per Serving</p>
                    <p className="text-xl font-bold text-blue-900">${profitPerServing?.toFixed(2)}</p>
                  </div>
                </div>

                {/* Suggested Prices */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Suggested Menu Prices</p>
                  <div className="space-y-2">
                    {results.suggestedPrices.map((sp) => (
                      <div key={sp.percent} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-600">At {sp.percent}% food cost</span>
                        <span className={`font-semibold ${sp.percent === 30 ? "text-green-700" : "text-gray-900"}`}>
                          ${sp.price.toFixed(2)}
                          {sp.percent === 30 && <span className="text-xs ml-1">✓</span>}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Food Cost Insight */}
              <div className="mt-4">
                {results.foodCostPercent <= 28 ? (
                  <InsightCard type="success" title="Excellent Margins">
                    Your food cost is well below industry average. You have room for premium ingredients or competitive pricing.
                  </InsightCard>
                ) : results.foodCostPercent <= 33 ? (
                  <InsightCard type="tip" title="Healthy Margins">
                    Your food cost is within the ideal 28-33% range for full-service restaurants. Good balance of quality and profit.
                  </InsightCard>
                ) : results.foodCostPercent <= 38 ? (
                  <InsightCard type="warning" title="Margins Could Improve">
                    Food cost above 33% reduces profitability. Consider portion adjustments, supplier negotiations, or menu price increases.
                  </InsightCard>
                ) : (
                  <InsightCard type="warning" title="High Food Cost">
                    Food cost above 38% may not be sustainable. Review your most expensive ingredients below and consider alternatives.
                  </InsightCard>
                )}
              </div>
            </div>
          )}

          {/* Main Result Box (for home cooks) */}
          {!showMenuPrice && (
            <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl text-center">
              <p className="text-sm text-green-700 mb-1">Your Recipe Costs</p>
              <p className="text-4xl font-bold text-green-900">${results.totalCost.toFixed(2)}</p>
              <p className="text-green-700 mt-2">
                That&apos;s <span className="font-semibold">${results.costPerServing.toFixed(2)}</span> per serving for {servings} servings
              </p>
              {results.costPerServing < 5 && (
                <p className="text-sm text-green-600 mt-2">
                  Cheaper than takeout or delivery
                </p>
              )}
            </div>
          )}

          {/* Ingredient Cost Chart */}
          {ingredientChartData.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Cost Distribution</h4>
              <ComparisonBarChart
                data={ingredientChartData}
                height={Math.max(150, ingredientChartData.length * 35)}
                unit="$"
                showValue
              />
            </div>
          )}

          {/* Detailed Ingredient Breakdown */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Ingredient Cost Breakdown</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-2 font-medium text-gray-700">Ingredient</th>
                    <th className="text-center py-2 px-2 font-medium text-gray-700">Amount</th>
                    <th className="text-center py-2 px-2 font-medium text-gray-700">Cost</th>
                    <th className="text-center py-2 px-2 font-medium text-gray-700">% of Total</th>
                  </tr>
                </thead>
                <tbody>
                  {validIngredients.map((ing, idx) => {
                    const percentage = results.totalCost > 0 ? (ing.cost / results.totalCost) * 100 : 0;
                    return (
                      <tr key={ing.id} className={`border-b border-gray-100 ${idx === 0 ? "bg-amber-50" : ""}`}>
                        <td className="py-2 px-2 text-gray-700">
                          {ing.name}
                          {idx === 0 && <span className="text-xs text-amber-600 ml-1">(highest)</span>}
                        </td>
                        <td className="text-center py-2 px-2 text-gray-600">
                          {ing.amountUsed} {ing.amountUnit}
                        </td>
                        <td className="text-center py-2 px-2 font-semibold text-gray-900">
                          ${ing.cost.toFixed(2)}
                        </td>
                        <td className="text-center py-2 px-2">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${Math.min(percentage, 100)}%`,
                                  backgroundColor: idx === 0 ? CHART_COLORS.quaternary : CHART_COLORS.primary,
                                }}
                              />
                            </div>
                            <span className="text-gray-600 text-xs w-10">{percentage.toFixed(0)}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 font-semibold">
                    <td className="py-2 px-2 text-gray-900">Total</td>
                    <td className="text-center py-2 px-2 text-gray-600">—</td>
                    <td className="text-center py-2 px-2 text-gray-900">${results.totalCost.toFixed(2)}</td>
                    <td className="text-center py-2 px-2 text-gray-600">100%</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Cost-Saving Suggestions */}
          {topIngredientPercent > 40 && (
            <InsightCard type="tip" title="Cost Optimization Tip">
              <strong>{topIngredient?.name}</strong> makes up {topIngredientPercent}% of your recipe cost.
              Consider buying in bulk, finding alternative suppliers, or adjusting the recipe to reduce this ingredient.
            </InsightCard>
          )}

          {/* Comparison Context */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <p className="text-xs text-gray-500">vs. Fast Food</p>
              <p className={`font-semibold ${results.costPerServing < 8 ? "text-green-700" : "text-amber-700"}`}>
                {results.costPerServing < 8 ? `Save $${(8 - results.costPerServing).toFixed(2)}` : "Similar cost"}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">vs. Casual Dining</p>
              <p className={`font-semibold ${results.costPerServing < 15 ? "text-green-700" : "text-amber-700"}`}>
                {results.costPerServing < 15 ? `Save $${(15 - results.costPerServing).toFixed(2)}` : "Premium"}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Weekly (×7)</p>
              <p className="font-semibold text-gray-900">${(results.costPerServing * 7).toFixed(2)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Monthly (×30)</p>
              <p className="font-semibold text-gray-900">${(results.costPerServing * 30).toFixed(2)}</p>
            </div>
          </div>

          {/* Copy Results Button */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                const text = `${recipeName || "Recipe"} Cost Breakdown:\nTotal: $${results.totalCost.toFixed(2)}\nPer Serving: $${results.costPerServing.toFixed(2)} (${servings} servings)\n\nIngredients:\n${validIngredients.map(i => `- ${i.name}: $${i.cost.toFixed(2)}`).join("\n")}`;
                navigator.clipboard.writeText(text);
              }}
              className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
            >
              Copy Results
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

        {/* Tips */}
        <InsightCard type="info" title="Recipe Costing Tips">
          <ul className="space-y-1 mt-1">
            <li>• Include &quot;invisible&quot; ingredients: oil, salt, spices, garnishes</li>
            <li>• Update prices quarterly to catch price changes</li>
            <li>• Buy staples in bulk for better per-unit costs</li>
            <li>• Track waste — the usable portion is what matters</li>
          </ul>
        </InsightCard>

        {showMenuPrice && (
          <InsightCard type="tip" title="Industry Food Cost Benchmarks">
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <p className="font-medium text-sm">Full-Service Restaurant</p>
                <p className="text-xs">Target: 28-33%</p>
              </div>
              <div>
                <p className="font-medium text-sm">Quick Service/Fast Food</p>
                <p className="text-xs">Target: 25-30%</p>
              </div>
              <div>
                <p className="font-medium text-sm">Bakery/Café</p>
                <p className="text-xs">Target: 20-28%</p>
              </div>
              <div>
                <p className="font-medium text-sm">Catering</p>
                <p className="text-xs">Target: 30-35%</p>
              </div>
            </div>
          </InsightCard>
        )}
      </div>
    </div>
  );
}
