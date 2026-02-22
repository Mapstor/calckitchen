"use client";

import { useState, useMemo, useCallback } from "react";
import {
  MacroPieChart,
  NutrientBar,
  ProgressRing,
  StatCard,
  InsightCard,
  DAILY_VALUES,
} from "@/components/charts";

interface Ingredient {
  id: string;
  name: string;
  amount: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

interface MacroPreset {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  servingSize: string;
}

const commonIngredients: Record<string, MacroPreset> = {
  chickenBreast: { name: "Chicken Breast (100g)", calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, servingSize: "100g" },
  salmon: { name: "Salmon (100g)", calories: 208, protein: 20, carbs: 0, fat: 13, fiber: 0, servingSize: "100g" },
  eggs: { name: "Eggs (1 large)", calories: 72, protein: 6, carbs: 0.4, fat: 5, fiber: 0, servingSize: "1 egg" },
  rice: { name: "White Rice (1 cup cooked)", calories: 206, protein: 4.3, carbs: 45, fat: 0.4, fiber: 0.6, servingSize: "1 cup" },
  brownRice: { name: "Brown Rice (1 cup cooked)", calories: 216, protein: 5, carbs: 45, fat: 1.8, fiber: 3.5, servingSize: "1 cup" },
  pasta: { name: "Pasta (1 cup cooked)", calories: 220, protein: 8, carbs: 43, fat: 1.3, fiber: 2.5, servingSize: "1 cup" },
  bread: { name: "Bread (1 slice)", calories: 79, protein: 2.7, carbs: 15, fat: 1, fiber: 0.6, servingSize: "1 slice" },
  broccoli: { name: "Broccoli (1 cup)", calories: 55, protein: 3.7, carbs: 11, fat: 0.6, fiber: 5.1, servingSize: "1 cup" },
  oliveoil: { name: "Olive Oil (1 tbsp)", calories: 119, protein: 0, carbs: 0, fat: 13.5, fiber: 0, servingSize: "1 tbsp" },
  butter: { name: "Butter (1 tbsp)", calories: 102, protein: 0.1, carbs: 0, fat: 11.5, fiber: 0, servingSize: "1 tbsp" },
  avocado: { name: "Avocado (1 medium)", calories: 240, protein: 3, carbs: 12, fat: 22, fiber: 10, servingSize: "1 medium" },
  banana: { name: "Banana (1 medium)", calories: 105, protein: 1.3, carbs: 27, fat: 0.4, fiber: 3.1, servingSize: "1 medium" },
};

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export default function RecipeMacroCalculator() {
  const [recipeName, setRecipeName] = useState<string>("");
  const [servings, setServings] = useState<number>(4);
  const [showResults, setShowResults] = useState<boolean>(false);

  const resetResults = useCallback(() => setShowResults(false), []);

  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: generateId(), name: "Chicken Breast", amount: 1, calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0 },
    { id: generateId(), name: "Brown Rice", amount: 2, calories: 216, protein: 5, carbs: 45, fat: 1.8, fiber: 3.5 },
    { id: generateId(), name: "Broccoli", amount: 1, calories: 55, protein: 3.7, carbs: 11, fat: 0.6, fiber: 5.1 },
  ]);

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: generateId(), name: "", amount: 1, calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 },
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

  const loadPreset = (presetKey: string) => {
    const preset = commonIngredients[presetKey];
    if (preset) {
      setIngredients([
        ...ingredients,
        {
          id: generateId(),
          name: preset.name,
          amount: 1,
          calories: preset.calories,
          protein: preset.protein,
          carbs: preset.carbs,
          fat: preset.fat,
          fiber: preset.fiber,
        },
      ]);
      resetResults();
    }
  };

  const results = useMemo(() => {
    const totals = ingredients.reduce(
      (acc, ing) => ({
        calories: acc.calories + ing.calories * ing.amount,
        protein: acc.protein + ing.protein * ing.amount,
        carbs: acc.carbs + ing.carbs * ing.amount,
        fat: acc.fat + ing.fat * ing.amount,
        fiber: acc.fiber + ing.fiber * ing.amount,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
    );

    const perServing = {
      calories: Math.round(totals.calories / servings),
      protein: Math.round((totals.protein / servings) * 10) / 10,
      carbs: Math.round((totals.carbs / servings) * 10) / 10,
      fat: Math.round((totals.fat / servings) * 10) / 10,
      fiber: Math.round((totals.fiber / servings) * 10) / 10,
    };

    // Calculate macro percentages
    const totalMacroCalories = (perServing.protein * 4) + (perServing.carbs * 4) + (perServing.fat * 9);
    const macroPercents = {
      protein: totalMacroCalories > 0 ? Math.round((perServing.protein * 4 / totalMacroCalories) * 100) : 0,
      carbs: totalMacroCalories > 0 ? Math.round((perServing.carbs * 4 / totalMacroCalories) * 100) : 0,
      fat: totalMacroCalories > 0 ? Math.round((perServing.fat * 9 / totalMacroCalories) * 100) : 0,
    };

    return {
      totals: {
        calories: Math.round(totals.calories),
        protein: Math.round(totals.protein * 10) / 10,
        carbs: Math.round(totals.carbs * 10) / 10,
        fat: Math.round(totals.fat * 10) / 10,
        fiber: Math.round(totals.fiber * 10) / 10,
      },
      perServing,
      macroPercents,
    };
  }, [ingredients, servings]);

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
              max={50}
            />
          </div>
        </div>

        {/* Quick Add Presets */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quick Add Ingredient
          </label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(commonIngredients).slice(0, 6).map(([key, preset]) => (
              <button
                key={key}
                onClick={() => loadPreset(key)}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors"
              >
                + {preset.name.split(" (")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Ingredients
          </label>

          <div className="space-y-3">
            {ingredients.map((ing, index) => (
              <div key={ing.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <input
                    type="text"
                    value={ing.name}
                    onChange={(e) => { updateIngredient(ing.id, "name", e.target.value); resetResults(); }}
                    className="input-field flex-1 mr-2"
                    placeholder="Ingredient name"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">×</span>
                    <input
                      type="number"
                      value={ing.amount}
                      onChange={(e) => { updateIngredient(ing.id, "amount", Number(e.target.value)); resetResults(); }}
                      className="input-field w-16"
                      min={0.25}
                      step={0.25}
                    />
                  </div>
                  {ingredients.length > 1 && (
                    <button
                      onClick={() => { removeIngredient(ing.id); resetResults(); }}
                      className="ml-2 text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-5 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Calories</label>
                    <input
                      type="number"
                      value={ing.calories}
                      onChange={(e) => { updateIngredient(ing.id, "calories", Number(e.target.value)); resetResults(); }}
                      className="input-field w-full text-sm"
                      min={0}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Protein (g)</label>
                    <input
                      type="number"
                      value={ing.protein}
                      onChange={(e) => { updateIngredient(ing.id, "protein", Number(e.target.value)); resetResults(); }}
                      className="input-field w-full text-sm"
                      min={0}
                      step={0.1}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Carbs (g)</label>
                    <input
                      type="number"
                      value={ing.carbs}
                      onChange={(e) => { updateIngredient(ing.id, "carbs", Number(e.target.value)); resetResults(); }}
                      className="input-field w-full text-sm"
                      min={0}
                      step={0.1}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Fat (g)</label>
                    <input
                      type="number"
                      value={ing.fat}
                      onChange={(e) => { updateIngredient(ing.id, "fat", Number(e.target.value)); resetResults(); }}
                      className="input-field w-full text-sm"
                      min={0}
                      step={0.1}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Fiber (g)</label>
                    <input
                      type="number"
                      value={ing.fiber}
                      onChange={(e) => { updateIngredient(ing.id, "fiber", Number(e.target.value)); resetResults(); }}
                      className="input-field w-full text-sm"
                      min={0}
                      step={0.1}
                    />
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

        <button
          onClick={() => setShowResults(true)}
          className="btn-primary w-full sm:w-auto"
        >
          Calculate Macros
        </button>

        {/* Results */}
        {showResults && (
        <div className="results-panel space-y-6">
          <h3 className="font-serif text-lg font-semibold text-gray-900">
            Nutrition Facts {recipeName && `— ${recipeName}`}
          </h3>

          {/* Main Stats Grid with Pie Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Key Metrics */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700">Per Serving ({servings} servings)</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <StatCard
                  label="Calories"
                  value={results.perServing.calories}
                  sublabel={`${Math.round((results.perServing.calories / DAILY_VALUES.calories) * 100)}% daily`}
                  color="amber"
                />
                <StatCard
                  label="Protein"
                  value={`${results.perServing.protein}g`}
                  sublabel={`${results.macroPercents.protein}% of macros`}
                  color="coral"
                />
                <StatCard
                  label="Carbs"
                  value={`${results.perServing.carbs}g`}
                  sublabel={`${results.macroPercents.carbs}% of macros`}
                  color="blue"
                />
                <StatCard
                  label="Fat"
                  value={`${results.perServing.fat}g`}
                  sublabel={`${results.macroPercents.fat}% of macros`}
                  color="green"
                />
                <StatCard
                  label="Fiber"
                  value={`${results.perServing.fiber}g`}
                  sublabel={`${Math.round((results.perServing.fiber / DAILY_VALUES.fiber) * 100)}% daily`}
                  color="purple"
                />
                <StatCard
                  label="Servings"
                  value={servings}
                  sublabel="portions"
                  color="gray"
                />
              </div>
            </div>

            {/* Right: Macro Distribution Pie Chart */}
            <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Macro Distribution</h4>
              <MacroPieChart
                protein={results.macroPercents.protein}
                carbs={results.macroPercents.carbs}
                fat={results.macroPercents.fat}
                size={180}
              />
            </div>
          </div>

          {/* Daily Value Percentages */}
          <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-4">% Daily Value (per serving)</h4>
            <div className="space-y-3">
              <NutrientBar
                name="Calories"
                value={results.perServing.calories}
                dailyValue={DAILY_VALUES.calories}
                unit=""
                color="#F59E0B"
              />
              <NutrientBar
                name="Protein"
                value={results.perServing.protein}
                dailyValue={DAILY_VALUES.protein}
                unit="g"
                color="#EF4444"
              />
              <NutrientBar
                name="Carbohydrates"
                value={results.perServing.carbs}
                dailyValue={DAILY_VALUES.carbs}
                unit="g"
                color="#3B82F6"
              />
              <NutrientBar
                name="Fat"
                value={results.perServing.fat}
                dailyValue={DAILY_VALUES.fat}
                unit="g"
                color="#22C55E"
              />
              <NutrientBar
                name="Fiber"
                value={results.perServing.fiber}
                dailyValue={DAILY_VALUES.fiber}
                unit="g"
                color="#A855F7"
              />
            </div>
            <p className="text-xs text-gray-500 mt-3">*Based on a 2,000 calorie diet</p>
          </div>

          {/* Dietary Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.macroPercents.protein >= 25 && (
              <InsightCard type="success" title="High Protein">
                This recipe is high in protein ({results.macroPercents.protein}% of calories), great for muscle building and satiety.
              </InsightCard>
            )}
            {results.macroPercents.carbs <= 20 && (
              <InsightCard type="info" title="Low Carb">
                Only {results.macroPercents.carbs}% of calories from carbs. Compatible with keto or low-carb diets.
              </InsightCard>
            )}
            {results.perServing.fiber >= 5 && (
              <InsightCard type="success" title="Good Fiber Source">
                With {results.perServing.fiber}g fiber per serving, this supports digestive health.
              </InsightCard>
            )}
            {results.perServing.calories > 600 && (
              <InsightCard type="warning" title="Calorie Dense">
                At {results.perServing.calories} calories per serving, consider portion control or reducing servings.
              </InsightCard>
            )}
            {results.macroPercents.fat >= 40 && (
              <InsightCard type="info" title="Higher Fat Content">
                {results.macroPercents.fat}% of calories from fat. Good for keto diets but watch saturated fat.
              </InsightCard>
            )}
          </div>

          {/* Total Recipe Summary */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Total Recipe</h4>
            <div className="grid grid-cols-5 gap-2 text-sm">
              <div className="text-center">
                <p className="text-gray-500">Calories</p>
                <p className="font-semibold text-lg">{results.totals.calories}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500">Protein</p>
                <p className="font-semibold text-lg">{results.totals.protein}g</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500">Carbs</p>
                <p className="font-semibold text-lg">{results.totals.carbs}g</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500">Fat</p>
                <p className="font-semibold text-lg">{results.totals.fat}g</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500">Fiber</p>
                <p className="font-semibold text-lg">{results.totals.fiber}g</p>
              </div>
            </div>
          </div>

          {/* Diet Compatibility */}
          <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Diet Compatibility</h4>
            <div className="flex flex-wrap gap-2">
              {results.macroPercents.carbs <= 10 && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Keto Friendly</span>
              )}
              {results.macroPercents.carbs <= 25 && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Low Carb</span>
              )}
              {results.macroPercents.protein >= 30 && (
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">High Protein</span>
              )}
              {results.perServing.fiber >= 5 && (
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">High Fiber</span>
              )}
              {results.perServing.calories <= 400 && (
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">Low Calorie</span>
              )}
              {results.macroPercents.fat <= 20 && (
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Low Fat</span>
              )}
            </div>
          </div>
        </div>
        )}

        {/* Tips */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Tips</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Look up nutrition info on USDA FoodData Central for accuracy</li>
            <li>• Measure ingredients by weight (grams) for best results</li>
            <li>• Adjust servings to see per-serving macros change</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
