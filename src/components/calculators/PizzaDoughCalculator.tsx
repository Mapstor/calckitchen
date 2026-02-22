"use client";

import { useState, useMemo, useCallback } from "react";
import {
  StatCard,
  InsightCard,
  ComparisonBarChart,
  ProgressRing,
  CHART_COLORS,
} from "@/components/charts";

type PizzaStyle = "neapolitan" | "newyork" | "detroit" | "sicilian";
type YeastType = "instant" | "active-dry" | "fresh";
type FermentMethod = "direct" | "cold-ferment";

interface StylePreset {
  name: string;
  hydration: number;
  salt: number;
  yeast: number;
  oil: number;
  sugar: number;
  ballWeight: number; // grams per pizza
  description: string;
}

const stylePresets: Record<PizzaStyle, StylePreset> = {
  neapolitan: {
    name: "Neapolitan",
    hydration: 60,
    salt: 2.8,
    yeast: 0.2,
    oil: 0,
    sugar: 0,
    ballWeight: 250,
    description: "Classic Italian pizza. Thin, soft, charred. 60% hydration, no oil.",
  },
  newyork: {
    name: "New York",
    hydration: 63,
    salt: 2.5,
    yeast: 0.7,
    oil: 3,
    sugar: 1.5,
    ballWeight: 280,
    description: "Large, foldable slices. 63% hydration with oil and sugar.",
  },
  detroit: {
    name: "Detroit",
    hydration: 72,
    salt: 2.2,
    yeast: 0.8,
    oil: 4,
    sugar: 0,
    ballWeight: 500,
    description: "Thick, airy, crispy edges. High hydration (72%), baked in oiled pan.",
  },
  sicilian: {
    name: "Sicilian",
    hydration: 70,
    salt: 2.3,
    yeast: 0.7,
    oil: 4,
    sugar: 0,
    ballWeight: 450,
    description: "Thick, spongy, rectangular. 70% hydration, generous oil.",
  },
};

const yeastConversions: Record<YeastType, number> = {
  instant: 1,
  "active-dry": 1.25,
  fresh: 3,
};

export default function PizzaDoughCalculator() {
  const [style, setStyle] = useState<PizzaStyle>("newyork");
  const [pizzaCount, setPizzaCount] = useState<number>(4);
  const [yeastType, setYeastType] = useState<YeastType>("instant");
  const [fermentMethod, setFermentMethod] = useState<FermentMethod>("direct");

  // Allow custom adjustments
  const [customMode, setCustomMode] = useState<boolean>(false);
  const [hydration, setHydration] = useState<number>(stylePresets.newyork.hydration);
  const [salt, setSalt] = useState<number>(stylePresets.newyork.salt);
  const [showResults, setShowResults] = useState<boolean>(false);

  const resetResults = useCallback(() => setShowResults(false), []);

  const preset = stylePresets[style];

  // Update defaults when style changes
  const handleStyleChange = (newStyle: PizzaStyle) => {
    setStyle(newStyle);
    if (!customMode) {
      setHydration(stylePresets[newStyle].hydration);
      setSalt(stylePresets[newStyle].salt);
    }
    resetResults();
  };

  const results = useMemo(() => {
    const activeHydration = customMode ? hydration : preset.hydration;
    const activeSalt = customMode ? salt : preset.salt;

    const totalDough = preset.ballWeight * pizzaCount;

    // Calculate from total dough weight
    // Total = flour × (1 + hydration/100 + salt/100 + yeast/100 + oil/100 + sugar/100)
    const sumPercentages = 100 + activeHydration + activeSalt + preset.yeast + preset.oil + preset.sugar;
    const flour = Math.round(totalDough / (sumPercentages / 100));

    const water = Math.round(flour * (activeHydration / 100));
    const saltWeight = Math.round(flour * (activeSalt / 100) * 10) / 10;

    // Adjust yeast for cold ferment
    const yeastPercent = fermentMethod === "cold-ferment" ? preset.yeast * 0.5 : preset.yeast;
    const yeastWeight = Math.round(flour * (yeastPercent / 100) * yeastConversions[yeastType] * 10) / 10;

    const oilWeight = preset.oil > 0 ? Math.round(flour * (preset.oil / 100)) : 0;
    const sugarWeight = preset.sugar > 0 ? Math.round(flour * (preset.sugar / 100)) : 0;

    const actualTotal = flour + water + saltWeight + yeastWeight + oilWeight + sugarWeight;

    // Fermentation time estimate
    let fermentTime = "";
    if (fermentMethod === "cold-ferment") {
      fermentTime = "24-72 hours in fridge";
    } else {
      if (preset.yeast < 0.5) {
        fermentTime = "8-12 hours at room temp";
      } else {
        fermentTime = "4-6 hours at room temp";
      }
    }

    return {
      flour,
      water,
      salt: saltWeight,
      yeast: yeastWeight,
      oil: oilWeight,
      sugar: sugarWeight,
      totalDough: Math.round(actualTotal),
      ballWeight: Math.round(actualTotal / pizzaCount),
      hydrationPercent: activeHydration,
      fermentTime,
    };
  }, [style, pizzaCount, yeastType, fermentMethod, customMode, hydration, salt, preset]);

  return (
    <div className="calculator-card p-6 md:p-8">
      <div className="space-y-6">
        {/* Pizza Style */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pizza Style
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {(Object.keys(stylePresets) as PizzaStyle[]).map((s) => (
              <button
                key={s}
                onClick={() => handleStyleChange(s)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  style === s
                    ? "bg-coral text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {stylePresets[s].name}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-2">{preset.description}</p>
        </div>

        {/* Number of Pizzas */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Pizzas
          </label>
          <div className="flex items-center gap-4">
            <input
              type="number"
              value={pizzaCount}
              onChange={(e) => { setPizzaCount(Number(e.target.value)); resetResults(); }}
              className="input-field w-24"
              min={1}
              max={20}
            />
            <span className="text-gray-600">
              ({preset.ballWeight}g dough balls)
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {[2, 4, 6, 8].map((count) => (
              <button
                key={count}
                onClick={() => { setPizzaCount(count); resetResults(); }}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  pizzaCount === count
                    ? "bg-coral text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {count} pizzas
              </button>
            ))}
          </div>
        </div>

        {/* Yeast Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Yeast Type
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: "instant", label: "Instant" },
              { value: "active-dry", label: "Active Dry" },
              { value: "fresh", label: "Fresh" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => { setYeastType(option.value as YeastType); resetResults(); }}
                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                  yeastType === option.value
                    ? "bg-coral text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Fermentation Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fermentation Method
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => { setFermentMethod("direct"); resetResults(); }}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                fermentMethod === "direct"
                  ? "bg-coral text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Same-Day (Direct)
            </button>
            <button
              onClick={() => { setFermentMethod("cold-ferment"); resetResults(); }}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                fermentMethod === "cold-ferment"
                  ? "bg-coral text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Cold Ferment (24-72h)
            </button>
          </div>
        </div>

        {/* Custom Adjustments Toggle */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="customMode"
            checked={customMode}
            onChange={(e) => { setCustomMode(e.target.checked); resetResults(); }}
            className="rounded border-gray-300"
          />
          <label htmlFor="customMode" className="text-sm text-gray-700">
            Customize hydration & salt
          </label>
        </div>

        {customMode && (
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hydration: {hydration}%
              </label>
              <input
                type="range"
                value={hydration}
                onChange={(e) => { setHydration(Number(e.target.value)); resetResults(); }}
                className="w-full"
                min={55}
                max={85}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salt: {salt}%
              </label>
              <input
                type="range"
                value={salt}
                onChange={(e) => { setSalt(Number(e.target.value)); resetResults(); }}
                className="w-full"
                min={1.5}
                max={3.5}
                step={0.1}
              />
            </div>
          </div>
        )}

        <button
          onClick={() => setShowResults(true)}
          className="btn-primary w-full sm:w-auto"
        >
          Calculate
        </button>

        {/* Results */}
        {showResults && (
        <div className="results-panel space-y-6">
          <h3 className="font-serif text-lg font-semibold text-gray-900">
            {preset.name} Pizza Dough Recipe
          </h3>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard
              label="Total Dough"
              value={`${results.totalDough}g`}
              sublabel={`${(results.totalDough / 1000).toFixed(2)} kg`}
              color="coral"
            />
            <StatCard
              label="Per Pizza"
              value={`${results.ballWeight}g`}
              sublabel={`${pizzaCount} ball${pizzaCount !== 1 ? "s" : ""}`}
              color="blue"
            />
            <StatCard
              label="Hydration"
              value={`${results.hydrationPercent}%`}
              sublabel={results.hydrationPercent >= 70 ? "High" : results.hydrationPercent >= 63 ? "Medium" : "Classic"}
              color="green"
            />
            <StatCard
              label="Fermentation"
              value={fermentMethod === "cold-ferment" ? "24-72h" : "4-12h"}
              sublabel={fermentMethod === "cold-ferment" ? "Cold" : "Room temp"}
              color="amber"
            />
          </div>

          {/* Visual Hydration & Baker's Percentage */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3 text-center">Hydration Level</h4>
              <div className="flex justify-center">
                <ProgressRing
                  value={results.hydrationPercent}
                  max={85}
                  size={140}
                  color={results.hydrationPercent >= 70 ? CHART_COLORS.tertiary : CHART_COLORS.secondary}
                  sublabel="hydration"
                />
              </div>
              <p className="text-xs text-center text-gray-500 mt-2">
                {results.hydrationPercent < 60 ? "Lower hydration = easier to handle" :
                 results.hydrationPercent < 68 ? "Medium hydration = balanced" :
                 "Higher hydration = more open crumb, stickier"}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Dough Composition</h4>
              <ComparisonBarChart
                data={[
                  { name: "Flour", value: results.flour, fill: CHART_COLORS.quaternary },
                  { name: "Water", value: results.water, fill: CHART_COLORS.tertiary },
                  { name: "Salt", value: Math.round(results.salt * 10), fill: CHART_COLORS.primary },
                  ...(results.oil > 0 ? [{ name: "Oil", value: results.oil, fill: CHART_COLORS.secondary }] : []),
                ]}
                height={120}
                unit="g"
              />
            </div>
          </div>

          {/* Main Result Box */}
          <div className="p-5 bg-gradient-to-br from-coral/10 to-coral/5 border border-coral/20 rounded-xl text-center">
            <p className="text-sm text-gray-600 mb-1">Your {preset.name} recipe makes</p>
            <p className="text-3xl font-bold text-gray-900">
              {pizzaCount} pizza{pizzaCount !== 1 ? "s" : ""} × {results.ballWeight}g
            </p>
            <p className="text-gray-600 mt-1">
              {results.totalDough}g total • {results.hydrationPercent}% hydration • {fermentMethod === "cold-ferment" ? "cold fermented" : "same-day"}
            </p>
          </div>

          {/* Ingredient List with Baker's Percentages */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Ingredients (Baker&apos;s Percentages)</h4>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-2 px-4 font-medium text-gray-700">Ingredient</th>
                    <th className="text-right py-2 px-4 font-medium text-gray-700">Baker&apos;s %</th>
                    <th className="text-right py-2 px-4 font-medium text-gray-700">Weight</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-amber-50">
                    <td className="py-2 px-4 font-medium text-gray-900">Bread Flour</td>
                    <td className="py-2 px-4 text-right text-gray-700">100%</td>
                    <td className="py-2 px-4 text-right font-semibold text-gray-900">{results.flour}g</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 text-gray-700">Water</td>
                    <td className="py-2 px-4 text-right text-gray-600">{results.hydrationPercent}%</td>
                    <td className="py-2 px-4 text-right font-semibold text-gray-900">{results.water}g</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 text-gray-700">Salt</td>
                    <td className="py-2 px-4 text-right text-gray-600">{customMode ? salt : preset.salt}%</td>
                    <td className="py-2 px-4 text-right font-semibold text-gray-900">{results.salt}g</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 text-gray-700">
                      {yeastType === "fresh" ? "Fresh Yeast" : yeastType === "active-dry" ? "Active Dry Yeast" : "Instant Yeast"}
                    </td>
                    <td className="py-2 px-4 text-right text-gray-600">
                      {(fermentMethod === "cold-ferment" ? preset.yeast * 0.5 : preset.yeast).toFixed(1)}%
                    </td>
                    <td className="py-2 px-4 text-right font-semibold text-gray-900">{results.yeast}g</td>
                  </tr>
                  {results.oil > 0 && (
                    <tr>
                      <td className="py-2 px-4 text-gray-700">Olive Oil</td>
                      <td className="py-2 px-4 text-right text-gray-600">{preset.oil}%</td>
                      <td className="py-2 px-4 text-right font-semibold text-gray-900">{results.oil}g</td>
                    </tr>
                  )}
                  {results.sugar > 0 && (
                    <tr>
                      <td className="py-2 px-4 text-gray-700">Sugar</td>
                      <td className="py-2 px-4 text-right text-gray-600">{preset.sugar}%</td>
                      <td className="py-2 px-4 text-right font-semibold text-gray-900">{results.sugar}g</td>
                    </tr>
                  )}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td className="py-2 px-4 font-medium text-gray-900">Total</td>
                    <td className="py-2 px-4"></td>
                    <td className="py-2 px-4 text-right font-bold text-gray-900">{results.totalDough}g</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Fermentation Schedule */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-medium text-amber-900 mb-3">Fermentation Schedule</h4>
            {fermentMethod === "cold-ferment" ? (
              <div className="space-y-2 text-sm text-amber-800">
                <div className="flex items-start gap-3">
                  <span className="bg-amber-200 text-amber-900 px-2 py-0.5 rounded text-xs font-medium">Day 1</span>
                  <p>Mix dough, bulk ferment 1-2 hours, divide into balls, refrigerate</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-amber-200 text-amber-900 px-2 py-0.5 rounded text-xs font-medium">Day 2-3</span>
                  <p>Cold ferment in fridge for 24-72 hours (longer = more flavor)</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-amber-200 text-amber-900 px-2 py-0.5 rounded text-xs font-medium">Bake Day</span>
                  <p>Remove from fridge 2 hours before shaping to bring to room temp</p>
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-sm text-amber-800">
                <div className="flex items-start gap-3">
                  <span className="bg-amber-200 text-amber-900 px-2 py-0.5 rounded text-xs font-medium">Mix</span>
                  <p>Combine ingredients, knead until smooth and elastic (8-10 min)</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-amber-200 text-amber-900 px-2 py-0.5 rounded text-xs font-medium">Bulk Rise</span>
                  <p>Cover and rest {preset.yeast < 0.5 ? "8-12" : "4-6"} hours at room temperature</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-amber-200 text-amber-900 px-2 py-0.5 rounded text-xs font-medium">Shape</span>
                  <p>Divide into {pizzaCount} balls, rest 30 min, then stretch and bake</p>
                </div>
              </div>
            )}
          </div>

          {/* Style-Specific Tips */}
          <div className="grid md:grid-cols-2 gap-4">
            <InsightCard type="tip" title={`${preset.name} Tips`}>
              {style === "neapolitan" && (
                <ul className="text-sm space-y-1">
                  <li>• Use Tipo 00 flour for authentic texture</li>
                  <li>• Oven as hot as possible (900°F ideal)</li>
                  <li>• Bake for 60-90 seconds only</li>
                </ul>
              )}
              {style === "newyork" && (
                <ul className="text-sm space-y-1">
                  <li>• High-gluten bread flour works best</li>
                  <li>• Bake at 500-550°F on a pizza steel</li>
                  <li>• Oil creates that signature crisp bottom</li>
                </ul>
              )}
              {style === "detroit" && (
                <ul className="text-sm space-y-1">
                  <li>• Use a well-oiled 10x14&quot; steel pan</li>
                  <li>• Press cheese to edges for crispy &quot;frico&quot;</li>
                  <li>• Bake at 500°F until edges are dark</li>
                </ul>
              )}
              {style === "sicilian" && (
                <ul className="text-sm space-y-1">
                  <li>• Let dough proof in oiled sheet pan</li>
                  <li>• Dimple like focaccia before topping</li>
                  <li>• Bake at 450-475°F for 20-25 minutes</li>
                </ul>
              )}
            </InsightCard>

            <InsightCard type="info" title="Yeast Conversion">
              <div className="text-sm space-y-1">
                <p>Your recipe uses <strong>{results.yeast}g {yeastType === "fresh" ? "fresh" : yeastType === "active-dry" ? "active dry" : "instant"} yeast</strong></p>
                <p className="text-gray-600 mt-2">Equivalent amounts:</p>
                <ul className="text-gray-600">
                  <li>• Instant: {(results.yeast / yeastConversions[yeastType]).toFixed(1)}g</li>
                  <li>• Active Dry: {((results.yeast / yeastConversions[yeastType]) * 1.25).toFixed(1)}g</li>
                  <li>• Fresh: {((results.yeast / yeastConversions[yeastType]) * 3).toFixed(1)}g</li>
                </ul>
              </div>
            </InsightCard>
          </div>

          {/* Print/Copy Actions */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                const recipe = `${preset.name} Pizza Dough\n${"=".repeat(30)}\nMakes ${pizzaCount} pizzas (${results.ballWeight}g each)\n\nIngredients:\n- Bread Flour: ${results.flour}g (100%)\n- Water: ${results.water}g (${results.hydrationPercent}%)\n- Salt: ${results.salt}g (${customMode ? salt : preset.salt}%)\n- ${yeastType === "fresh" ? "Fresh Yeast" : yeastType === "active-dry" ? "Active Dry Yeast" : "Instant Yeast"}: ${results.yeast}g${results.oil > 0 ? `\n- Olive Oil: ${results.oil}g (${preset.oil}%)` : ""}${results.sugar > 0 ? `\n- Sugar: ${results.sugar}g (${preset.sugar}%)` : ""}\n\nTotal: ${results.totalDough}g\nFermentation: ${results.fermentTime}`;
                navigator.clipboard.writeText(recipe);
              }}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Copy Recipe
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Print Recipe
            </button>
          </div>
        </div>
        )}

        {/* Style Reference */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Style Reference</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Style</th>
                  <th className="text-left py-2 pr-4">Hydration</th>
                  <th className="text-left py-2 pr-4">Oil</th>
                  <th className="text-left py-2">Ball Size</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {(Object.keys(stylePresets) as PizzaStyle[]).map((s) => (
                  <tr key={s} className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium">{stylePresets[s].name}</td>
                    <td className="py-2 pr-4">{stylePresets[s].hydration}%</td>
                    <td className="py-2 pr-4">{stylePresets[s].oil > 0 ? `${stylePresets[s].oil}%` : "None"}</td>
                    <td className="py-2">{stylePresets[s].ballWeight}g</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
