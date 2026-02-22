"use client";

import { useState, useMemo, useCallback } from "react";
import {
  StatCard,
  InsightCard,
  ComparisonBarChart,
  ProgressRing,
  CHART_COLORS,
} from "@/components/charts";

// Fraction conversion utilities
const fractionMap: Record<string, number> = {
  "1/8": 0.125,
  "1/4": 0.25,
  "1/3": 0.333,
  "3/8": 0.375,
  "1/2": 0.5,
  "5/8": 0.625,
  "2/3": 0.667,
  "3/4": 0.75,
  "7/8": 0.875,
};

const reverseFractionMap: Record<number, string> = {
  0.125: "⅛",
  0.25: "¼",
  0.333: "⅓",
  0.375: "⅜",
  0.5: "½",
  0.625: "⅝",
  0.667: "⅔",
  0.75: "¾",
  0.875: "⅞",
};

interface ParsedIngredient {
  original: string;
  quantity: number | null;
  unit: string;
  ingredient: string;
  scaledQuantity: number | null;
  displayQuantity: string;
  notes: string[];
}

// Common measurement units
const unitPatterns = [
  "cups?", "c\\.", "tablespoons?", "tbsp?", "tbs?", "T\\.",
  "teaspoons?", "tsp?", "t\\.", "ounces?", "oz\\.?",
  "pounds?", "lbs?\\.?", "grams?", "g\\.", "kilograms?", "kg\\.?",
  "milliliters?", "ml\\.?", "liters?", "l\\.", "quarts?", "qt\\.?",
  "pints?", "pt\\.?", "gallons?", "gal\\.?", "sticks?",
  "pinch(?:es)?", "dash(?:es)?", "cloves?", "heads?",
  "slices?", "pieces?", "cans?", "packages?", "bunches?",
  "sprigs?", "stalks?", "medium", "large", "small"
];

// Special ingredients that need adjustment warnings
const eggPattern = /\beggs?\b/i;
const leaveningPattern = /\b(baking\s+(?:powder|soda)|yeast)\b/i;
const seasoningPattern = /\b(salt|pepper|seasoning|spices?)\b/i;

function parseQuantity(str: string): number | null {
  // Handle mixed numbers like "2 1/2"
  const mixedMatch = str.match(/^(\d+)\s+(\d+)\/(\d+)$/);
  if (mixedMatch) {
    return parseInt(mixedMatch[1]) + parseInt(mixedMatch[2]) / parseInt(mixedMatch[3]);
  }

  // Handle fractions like "1/2"
  const fractionMatch = str.match(/^(\d+)\/(\d+)$/);
  if (fractionMatch) {
    return parseInt(fractionMatch[1]) / parseInt(fractionMatch[2]);
  }

  // Handle decimal numbers
  const decimal = parseFloat(str);
  if (!isNaN(decimal)) {
    return decimal;
  }

  // Handle word fractions
  if (fractionMap[str]) {
    return fractionMap[str];
  }

  return null;
}

function formatQuantity(num: number): string {
  if (num === 0) return "0";

  const wholePart = Math.floor(num);
  const fractionalPart = num - wholePart;

  // Round to nearest common fraction
  const roundedFraction = Math.round(fractionalPart * 8) / 8;

  if (roundedFraction === 0) {
    return wholePart.toString();
  }

  if (roundedFraction === 1) {
    return (wholePart + 1).toString();
  }

  // Find closest fraction symbol
  let closestFraction = "";
  let minDiff = 1;
  for (const [decimal, symbol] of Object.entries(reverseFractionMap)) {
    const diff = Math.abs(roundedFraction - parseFloat(decimal));
    if (diff < minDiff) {
      minDiff = diff;
      closestFraction = symbol;
    }
  }

  if (wholePart === 0) {
    return closestFraction || roundedFraction.toFixed(2);
  }

  return `${wholePart} ${closestFraction}` || num.toFixed(2);
}

function parseLine(line: string): ParsedIngredient {
  const original = line.trim();
  if (!original) {
    return {
      original,
      quantity: null,
      unit: "",
      ingredient: "",
      scaledQuantity: null,
      displayQuantity: "",
      notes: [],
    };
  }

  // Try to extract quantity at the beginning
  // Match patterns like: "2", "1/2", "2 1/2", "1.5"
  const quantityPattern = /^((?:\d+\s+)?\d+\/\d+|\d+\.?\d*)\s*/;
  const quantityMatch = original.match(quantityPattern);

  let quantity: number | null = null;
  let remaining = original;

  if (quantityMatch) {
    quantity = parseQuantity(quantityMatch[1].trim());
    remaining = original.slice(quantityMatch[0].length);
  }

  // Try to extract unit
  const unitPattern = new RegExp(`^(${unitPatterns.join("|")})\\s*`, "i");
  const unitMatch = remaining.match(unitPattern);

  let unit = "";
  if (unitMatch) {
    unit = unitMatch[1];
    remaining = remaining.slice(unitMatch[0].length);
  }

  return {
    original,
    quantity,
    unit,
    ingredient: remaining,
    scaledQuantity: null,
    displayQuantity: "",
    notes: [],
  };
}

export default function RecipeScaler() {
  const [ingredientText, setIngredientText] = useState<string>(
    `2 cups all-purpose flour
1/2 teaspoon salt
1 tablespoon baking powder
3 large eggs
1 cup whole milk
1/4 cup butter, melted`
  );
  const [originalServings, setOriginalServings] = useState<number>(4);
  const [desiredServings, setDesiredServings] = useState<number>(8);
  const [useMultiplier, setUseMultiplier] = useState<boolean>(false);
  const [multiplier, setMultiplier] = useState<number>(2);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Reset results when inputs change
  const resetResults = useCallback(() => setShowResults(false), []);

  // Calculate scale factor
  const scaleFactor = useMultiplier
    ? multiplier
    : desiredServings / originalServings;

  // Parse and scale ingredients
  const scaledIngredients = useMemo(() => {
    const lines = ingredientText.split("\n");
    return lines.map((line) => {
      const parsed = parseLine(line);

      if (parsed.quantity !== null) {
        parsed.scaledQuantity = parsed.quantity * scaleFactor;
        parsed.displayQuantity = formatQuantity(parsed.scaledQuantity);

        // Check for special ingredients
        if (eggPattern.test(parsed.ingredient)) {
          const scaledEggs = parsed.scaledQuantity;
          const roundedEggs = Math.round(scaledEggs);
          if (Math.abs(scaledEggs - roundedEggs) > 0.3) {
            parsed.notes.push(
              `Eggs scaled to ${scaledEggs.toFixed(1)} — round to ${roundedEggs} eggs`
            );
          }
          parsed.displayQuantity = roundedEggs.toString();
          parsed.scaledQuantity = roundedEggs;
        }

        if (leaveningPattern.test(parsed.ingredient) && scaleFactor > 2) {
          parsed.notes.push(
            "When doubling+ baking powder/soda, increase by only 1.5x"
          );
        }

        if (seasoningPattern.test(parsed.ingredient) && scaleFactor !== 1) {
          parsed.notes.push("Taste and adjust seasonings gradually");
        }
      }

      return parsed;
    });
  }, [ingredientText, scaleFactor]);

  // Check for any notes
  const hasNotes = scaledIngredients.some((ing) => ing.notes.length > 0);

  // Common scaling presets
  const presets = [
    { label: "Half (0.5x)", value: 0.5 },
    { label: "Double (2x)", value: 2 },
    { label: "Triple (3x)", value: 3 },
    { label: "1.5x", value: 1.5 },
  ];

  return (
    <div className="calculator-card p-6 md:p-8">
      <div className="space-y-6">
        {/* Mode Toggle */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => { setUseMultiplier(false); resetResults(); }}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              !useMultiplier
                ? "bg-coral text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            By Servings
          </button>
          <button
            onClick={() => { setUseMultiplier(true); resetResults(); }}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              useMultiplier
                ? "bg-coral text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            By Multiplier
          </button>
        </div>

        {/* Scaling Inputs */}
        {useMultiplier ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Scale Factor
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                value={multiplier}
                onChange={(e) => { setMultiplier(Number(e.target.value)); resetResults(); }}
                className="input-field w-24"
                min={0.1}
                max={10}
                step={0.5}
              />
              <span className="text-gray-600">×</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {presets.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => { setMultiplier(preset.value); resetResults(); }}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    multiplier === preset.value
                      ? "bg-coral text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Servings
              </label>
              <input
                type="number"
                value={originalServings}
                onChange={(e) => { setOriginalServings(Number(e.target.value)); resetResults(); }}
                className="input-field w-full"
                min={1}
                max={100}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Desired Servings
              </label>
              <input
                type="number"
                value={desiredServings}
                onChange={(e) => { setDesiredServings(Number(e.target.value)); resetResults(); }}
                className="input-field w-full"
                min={1}
                max={100}
              />
            </div>
          </div>
        )}

        {/* Scale Factor Display */}
        <div className="text-center py-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Scale Factor</p>
          <p className="text-2xl font-bold text-gray-900">
            {scaleFactor.toFixed(2)}×
          </p>
        </div>

        {/* Ingredient Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Paste Your Ingredients
          </label>
          <textarea
            value={ingredientText}
            onChange={(e) => { setIngredientText(e.target.value); resetResults(); }}
            className="input-field w-full h-48 font-mono text-sm"
            placeholder={`Enter one ingredient per line, e.g.:
2 cups flour
1/2 teaspoon salt
3 large eggs`}
          />
          <p className="text-xs text-gray-500 mt-1">
            One ingredient per line. Include the quantity, unit, and ingredient name.
          </p>
        </div>

        <button
          onClick={() => setShowResults(true)}
          className="btn-primary w-full sm:w-auto"
        >
          Scale Recipe
        </button>

        {/* Results */}
        {showResults && (
        <div className="results-panel space-y-6">
          <h3 className="font-serif text-lg font-semibold text-gray-900 mb-4">
            Scaled Recipe Results
          </h3>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard
              label="Scale Factor"
              value={`${scaleFactor.toFixed(2)}×`}
              sublabel={scaleFactor > 1 ? "Scaling up" : scaleFactor < 1 ? "Scaling down" : "No change"}
              color={scaleFactor > 1 ? "green" : scaleFactor < 1 ? "blue" : "gray"}
            />
            <StatCard
              label="Servings"
              value={useMultiplier ? `${Math.round(originalServings * scaleFactor)}` : `${desiredServings}`}
              sublabel={`From ${originalServings} servings`}
              color="coral"
            />
            <StatCard
              label="Ingredients"
              value={scaledIngredients.filter(ing => ing.quantity !== null).length}
              sublabel="Items scaled"
              color="amber"
            />
            <StatCard
              label="Adjustments"
              value={scaledIngredients.filter(ing => ing.notes.length > 0).length}
              sublabel="Need attention"
              color={hasNotes ? "purple" : "gray"}
            />
          </div>

          {/* Visual Scale Comparison */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Recipe Scale Comparison</h4>
            <div className="flex items-center justify-center gap-4">
              <div className="text-center">
                <ProgressRing
                  value={1}
                  max={Math.max(1, scaleFactor)}
                  size={100}
                  color="#9CA3AF"
                  sublabel="Original"
                />
                <p className="text-sm text-gray-600 mt-1">{originalServings} servings</p>
              </div>
              <div className="text-2xl text-gray-400">→</div>
              <div className="text-center">
                <ProgressRing
                  value={scaleFactor}
                  max={Math.max(1, scaleFactor)}
                  size={100}
                  color={CHART_COLORS.primary}
                  sublabel="Scaled"
                />
                <p className="text-sm text-gray-600 mt-1">
                  {useMultiplier ? Math.round(originalServings * scaleFactor) : desiredServings} servings
                </p>
              </div>
            </div>
          </div>

          {/* Scaled Ingredients Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500 uppercase">
                <div className="col-span-3">Original</div>
                <div className="col-span-3">Scaled</div>
                <div className="col-span-6">Ingredient</div>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {scaledIngredients.map((ing, idx) => (
                <div key={idx}>
                  {ing.quantity !== null ? (
                    <div className="px-4 py-2 grid grid-cols-12 gap-2 items-center hover:bg-gray-50">
                      <div className="col-span-3 text-sm text-gray-500">
                        {formatQuantity(ing.quantity)} {ing.unit}
                      </div>
                      <div className="col-span-3 text-sm font-semibold text-coral">
                        {ing.displayQuantity} {ing.unit}
                      </div>
                      <div className="col-span-6 text-sm text-gray-700">
                        {ing.ingredient}
                      </div>
                    </div>
                  ) : ing.original ? (
                    <div className="px-4 py-2 text-sm text-gray-500 italic">
                      {ing.original}
                    </div>
                  ) : null}
                  {ing.notes.map((note, noteIdx) => (
                    <div key={noteIdx} className="px-4 py-1 bg-amber-50 text-xs text-amber-700 flex items-center gap-1">
                      <span>⚠️</span> {note}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Key Quantity Changes Chart */}
          {scaledIngredients.filter(ing => ing.quantity !== null).length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Quantity Changes (First 5 Ingredients)</h4>
              <ComparisonBarChart
                data={scaledIngredients
                  .filter(ing => ing.quantity !== null)
                  .slice(0, 5)
                  .map((ing, idx) => ({
                    name: ing.ingredient.slice(0, 15) + (ing.ingredient.length > 15 ? "..." : ""),
                    value: ing.scaledQuantity || 0,
                    fill: idx === 0 ? CHART_COLORS.primary : idx === 1 ? CHART_COLORS.secondary : CHART_COLORS.tertiary,
                  }))}
                height={150}
                unit={` ${scaledIngredients[0]?.unit || ""}`}
              />
            </div>
          )}

          {/* Copy Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                const text = scaledIngredients
                  .filter((ing) => ing.original)
                  .map((ing) =>
                    ing.quantity !== null
                      ? `${ing.displayQuantity} ${ing.unit} ${ing.ingredient}`.trim()
                      : ing.original
                  )
                  .join("\n");
                navigator.clipboard.writeText(text);
              }}
              className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <span>📋</span> Copy Scaled Ingredients
            </button>
            <button
              onClick={() => {
                const text = `Recipe scaled ${scaleFactor.toFixed(2)}× (${originalServings} → ${useMultiplier ? Math.round(originalServings * scaleFactor) : desiredServings} servings)\n\n` +
                  scaledIngredients
                    .filter((ing) => ing.original)
                    .map((ing) =>
                      ing.quantity !== null
                        ? `${ing.displayQuantity} ${ing.unit} ${ing.ingredient}`.trim()
                        : ing.original
                    )
                    .join("\n");
                navigator.clipboard.writeText(text);
              }}
              className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <span>📝</span> Copy with Header
            </button>
          </div>

          {/* Scaling Insights */}
          <div className="grid gap-3 md:grid-cols-2">
            {scaleFactor > 1.5 && (
              <InsightCard type="tip" title="Scaling Up Tips">
                <ul className="space-y-1 text-sm">
                  <li>• Consider baking in batches for best results</li>
                  <li>• Larger batches may need 10-15% more cooking time</li>
                  <li>• Taste seasonings before serving — adjust as needed</li>
                </ul>
              </InsightCard>
            )}
            {scaleFactor < 0.75 && (
              <InsightCard type="tip" title="Scaling Down Tips">
                <ul className="space-y-1 text-sm">
                  <li>• Use smaller cookware to maintain proper thickness</li>
                  <li>• Reduce cooking time by 10-15%</li>
                  <li>• Small leavening amounts are easier with a kitchen scale</li>
                </ul>
              </InsightCard>
            )}
            {hasNotes && (
              <InsightCard type="warning" title="Ingredient Adjustments">
                <p className="text-sm">
                  Some ingredients need special attention when scaling. Check the yellow
                  highlighted notes above for specific guidance on eggs, leavening, and seasonings.
                </p>
              </InsightCard>
            )}
            <InsightCard type="info" title="Pro Tip">
              <p className="text-sm">
                For best accuracy when baking, use a kitchen scale to measure ingredients by weight
                rather than volume. {scaleFactor !== 1 && `Your scale factor of ${scaleFactor.toFixed(2)}×
                means multiplying original weights by ${scaleFactor.toFixed(2)}.`}
              </p>
            </InsightCard>
          </div>

          {/* Cooking Time Adjustment Guidance */}
          {scaleFactor !== 1 && (
            <div className="bg-gradient-to-r from-coral/5 to-amber-50 rounded-lg p-4 border border-coral/20">
              <h4 className="font-medium text-gray-900 mb-2">Cooking Time Adjustment</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Original time × {scaleFactor > 1 ? "1.1-1.2" : "0.85-0.9"}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {scaleFactor > 1
                      ? "Larger portions need slightly longer to cook through"
                      : "Smaller portions cook faster — check early!"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">
                    Example: 30 min → {scaleFactor > 1
                      ? `${Math.round(30 * 1.15)}-${Math.round(30 * 1.2)} min`
                      : `${Math.round(30 * 0.85)}-${Math.round(30 * 0.9)} min`}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Always check for doneness — times are estimates
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        )}

        {/* Scaling Tips */}
        {(scaleFactor > 2 || scaleFactor < 0.5) && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h4 className="font-medium text-amber-900 mb-2">
              Scaling Tips for {scaleFactor > 2 ? "Large" : "Small"} Batches
            </h4>
            <ul className="text-sm text-amber-800 space-y-1">
              {scaleFactor > 2 && (
                <>
                  <li>• Baking powder/soda: Increase by only 1.5x when doubling+</li>
                  <li>• Salt and spices: Start with less, taste and adjust</li>
                  <li>• Cooking time: May need 10-20% longer for larger batches</li>
                  <li>• Consider baking in multiple batches for best results</li>
                </>
              )}
              {scaleFactor < 0.5 && (
                <>
                  <li>• Small amounts of leavening are hard to measure — use a scale</li>
                  <li>• Cooking time: Reduce by 10-15%</li>
                  <li>• Use smaller pans to maintain proper thickness</li>
                </>
              )}
            </ul>
          </div>
        )}

        {/* Quick Reference */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Measurement Quick Reference</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <p className="font-medium text-gray-700">Volume</p>
              <ul className="mt-1 space-y-0.5">
                <li>3 tsp = 1 tbsp</li>
                <li>4 tbsp = ¼ cup</li>
                <li>16 tbsp = 1 cup</li>
                <li>2 cups = 1 pint</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-gray-700">Weight</p>
              <ul className="mt-1 space-y-0.5">
                <li>1 oz = 28g</li>
                <li>1 lb = 454g</li>
                <li>1 stick butter = ½ cup</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-gray-700">Common Conversions</p>
              <ul className="mt-1 space-y-0.5">
                <li>1 cup flour = 125g</li>
                <li>1 cup sugar = 200g</li>
                <li>1 cup butter = 227g</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
