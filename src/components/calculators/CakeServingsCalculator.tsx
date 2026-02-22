"use client";

import { useState, useMemo, useCallback } from "react";
import {
  CakeShape,
  ServingType,
  cakeShapes,
  servingTypes,
  calculateCakeServings,
  recommendCakeSize,
  tieredCakeConfigs,
  roundCakeServings,
  squareCakeServings,
} from "@/data/cake-serving-data";
import {
  StatCard,
  InsightCard,
  ComparisonBarChart,
  ProgressRing,
  CHART_COLORS,
} from "@/components/charts";

type CalculatorMode = "servings" | "recommend";

export default function CakeServingsCalculator() {
  const [mode, setMode] = useState<CalculatorMode>("servings");

  // Servings mode state
  const [shape, setShape] = useState<CakeShape>("round");
  const [servingType, setServingType] = useState<ServingType>("party");
  const [size, setSize] = useState<number>(10);
  const [customWidth, setCustomWidth] = useState<number>(9);
  const [customHeight, setCustomHeight] = useState<number>(13);

  // Recommend mode state
  const [guestCount, setGuestCount] = useState<number>(30);

  // Show results state
  const [showResults, setShowResults] = useState<boolean>(false);

  // Reset results when inputs change
  const resetResults = useCallback(() => setShowResults(false), []);

  // Get current shape info
  const currentShapeInfo = cakeShapes.find((s) => s.key === shape);
  const currentServingInfo = servingTypes.find((s) => s.key === servingType);

  // Calculate servings
  const servingsResult = useMemo(() => {
    if (shape === "rectangular") {
      return calculateCakeServings(shape, servingType, undefined, customWidth, customHeight);
    }
    return calculateCakeServings(shape, servingType, size);
  }, [shape, servingType, size, customWidth, customHeight]);

  // Calculate recommendations
  const recommendations = useMemo(() => {
    return recommendCakeSize(guestCount, servingType);
  }, [guestCount, servingType]);

  // Get size options for current shape
  const sizeOptions = currentShapeInfo?.sizeOptions || [];

  return (
    <div className="calculator-card p-6 md:p-8">
      {/* Mode Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => { setMode("servings"); resetResults(); }}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === "servings"
              ? "bg-coral text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Calculate Servings
        </button>
        <button
          onClick={() => { setMode("recommend"); resetResults(); }}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === "recommend"
              ? "bg-coral text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Recommend Size
        </button>
      </div>

      {mode === "servings" ? (
        <div className="space-y-6">
          {/* Shape Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cake Shape
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {cakeShapes.map((s) => (
                <button
                  key={s.key}
                  onClick={() => {
                    setShape(s.key);
                    if (s.sizeOptions && s.defaultSize) {
                      setSize(s.defaultSize);
                    }
                    resetResults();
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    shape === s.key
                      ? "bg-coral text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          {currentShapeInfo?.hasCustomSize && shape !== "rectangular" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Size (inches)
              </label>
              <div className="flex flex-wrap gap-2">
                {sizeOptions.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setSize(s); resetResults(); }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      size === s
                        ? "bg-coral text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {s}"
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Custom Rectangular Size */}
          {shape === "rectangular" && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Width (inches)
                </label>
                <input
                  type="number"
                  value={customWidth}
                  onChange={(e) => { setCustomWidth(Number(e.target.value)); resetResults(); }}
                  className="input-field w-full"
                  min={4}
                  max={24}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Length (inches)
                </label>
                <input
                  type="number"
                  value={customHeight}
                  onChange={(e) => { setCustomHeight(Number(e.target.value)); resetResults(); }}
                  className="input-field w-full"
                  min={4}
                  max={24}
                />
              </div>
            </div>
          )}

          {/* Serving Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Serving Size
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {servingTypes.map((st) => (
                <button
                  key={st.key}
                  onClick={() => { setServingType(st.key); resetResults(); }}
                  className={`px-4 py-3 rounded-lg text-left transition-colors ${
                    servingType === st.key
                      ? "bg-coral text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span className="block text-sm font-medium">{st.label}</span>
                  <span className={`block text-xs ${servingType === st.key ? "text-white/80" : "text-gray-500"}`}>
                    {st.dimensions} slice
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowResults(true)}
            className="btn-primary w-full sm:w-auto"
          >
            Calculate Servings
          </button>

          {/* Results */}
          {showResults && (
          <div className="results-panel">
            <h3 className="font-serif text-lg font-semibold text-gray-900 mb-4">
              Your {currentShapeInfo?.label} Cake Servings
            </h3>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <StatCard
                label="Servings"
                value={servingsResult.min === servingsResult.max
                  ? String(servingsResult.min)
                  : `${Math.floor(servingsResult.min)}–${Math.ceil(servingsResult.max)}`}
                sublabel={currentServingInfo?.label}
                color="coral"
              />
              <StatCard
                label="Slice Size"
                value={currentServingInfo?.dimensions || ""}
                sublabel="Per serving"
                color="blue"
              />
              <StatCard
                label="Cake Shape"
                value={currentShapeInfo?.label || ""}
                sublabel={shape === "rectangular"
                  ? `${customWidth}" × ${customHeight}"`
                  : `${size}" diameter`}
                color="green"
              />
              <StatCard
                label="Cake Area"
                value={shape === "round"
                  ? `${Math.round(Math.PI * (size / 2) ** 2)} sq in`
                  : shape === "square"
                    ? `${size * size} sq in`
                    : `${customWidth * customHeight} sq in`}
                sublabel="Surface area"
                color="amber"
              />
            </div>

            {/* Visual Size Comparison */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Servings by Size</h4>
              <ComparisonBarChart
                data={
                  shape === "round"
                    ? Object.entries(roundCakeServings)
                        .slice(0, 5)
                        .map(([sz, servings]) => ({
                          name: `${sz}" Round`,
                          value: servingType === "wedding" ? servings.wedding : servings.party,
                          fill: Number(sz) === size ? CHART_COLORS.primary : "#E5E7EB",
                        }))
                    : shape === "square"
                      ? Object.entries(squareCakeServings)
                          .slice(0, 5)
                          .map(([sz, servings]) => ({
                            name: `${sz}" Square`,
                            value: servingType === "wedding" ? servings.wedding : servings.party,
                            fill: Number(sz) === size ? CHART_COLORS.primary : "#E5E7EB",
                          }))
                      : [
                          { name: "9×13 Sheet", value: servingType === "wedding" ? 54 : 24, fill: "#E5E7EB" },
                          { name: `${customWidth}×${customHeight}`, value: Math.round(servingsResult.min), fill: CHART_COLORS.primary },
                          { name: "12×18 Half Sheet", value: servingType === "wedding" ? 108 : 48, fill: "#E5E7EB" },
                        ]
                }
                height={150}
                unit=" servings"
              />
            </div>

            {/* Serving Type Comparison */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Same Cake, Different Serving Sizes</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                {servingTypes.map((st) => {
                  let servings;
                  if (shape === "rectangular") {
                    servings = calculateCakeServings(shape, st.key, undefined, customWidth, customHeight);
                  } else {
                    servings = calculateCakeServings(shape, st.key, size);
                  }
                  const isSelected = st.key === servingType;
                  return (
                    <div
                      key={st.key}
                      className={`p-3 rounded-lg ${isSelected ? "bg-coral/10 border-2 border-coral" : "bg-white border border-gray-200"}`}
                    >
                      <p className={`text-2xl font-bold ${isSelected ? "text-coral" : "text-gray-700"}`}>
                        {servings.min === servings.max ? servings.min : `${Math.floor(servings.min)}–${Math.ceil(servings.max)}`}
                      </p>
                      <p className="text-xs text-gray-600">{st.label}</p>
                      <p className="text-xs text-gray-500">{st.dimensions}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cake Dimensions */}
            {currentShapeInfo && !currentShapeInfo.hasCustomSize && currentShapeInfo.dimensions && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>{currentShapeInfo.label}:</strong> {currentShapeInfo.dimensions.width}" × {currentShapeInfo.dimensions.height}" standard size
                </p>
              </div>
            )}

            {/* Tips and Insights */}
            <div className="space-y-3">
              <InsightCard type="tip" title="Serving Size Tip">
                {currentServingInfo?.description}
              </InsightCard>

              <InsightCard type="info" title="Planning Tip">
                Order 10-15% extra servings to account for larger appetites and no-shows. For a {servingsResult.min}-serving cake, consider {Math.ceil(servingsResult.min * 1.15)} servings.
              </InsightCard>

              {servingsResult.max > 40 && (
                <InsightCard type="warning" title="Large Cake Tip">
                  For {servingsResult.max}+ servings, consider a tiered cake or multiple sheet cakes for easier handling and fresher slices.
                </InsightCard>
              )}
            </div>
          </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Guest Count Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Guests
            </label>
            <input
              type="number"
              value={guestCount}
              onChange={(e) => { setGuestCount(Number(e.target.value)); resetResults(); }}
              className="input-field w-full"
              min={5}
              max={200}
            />
          </div>

          {/* Serving Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Serving Size
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {servingTypes.map((st) => (
                <button
                  key={st.key}
                  onClick={() => { setServingType(st.key); resetResults(); }}
                  className={`px-4 py-3 rounded-lg text-left transition-colors ${
                    servingType === st.key
                      ? "bg-coral text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span className="block text-sm font-medium">{st.label}</span>
                  <span className={`block text-xs ${servingType === st.key ? "text-white/80" : "text-gray-500"}`}>
                    {st.dimensions} slice
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowResults(true)}
            className="btn-primary w-full sm:w-auto"
          >
            Get Recommendation
          </button>

          {/* Recommendations */}
          {showResults && (
          <div className="results-panel">
            <h3 className="font-serif text-lg font-semibold text-gray-900 mb-4">
              Cake Recommendations for {guestCount} Guests
            </h3>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <StatCard
                label="Guests"
                value={String(guestCount)}
                sublabel="To serve"
                color="coral"
              />
              <StatCard
                label="Serving Type"
                value={currentServingInfo?.label || ""}
                sublabel={currentServingInfo?.dimensions}
                color="blue"
              />
              <StatCard
                label="Recommended"
                value={recommendations.length > 0 ? recommendations[0].split(" ")[0] : "Tiered"}
                sublabel={recommendations.length > 0 ? "Primary option" : "cake needed"}
                color="green"
              />
              <StatCard
                label="Buffer"
                value={`+${Math.ceil(guestCount * 0.15)}`}
                sublabel="Extra slices advised"
                color="amber"
              />
            </div>

            {/* Guest Coverage Visualization */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Coverage Analysis</h4>
              <div className="flex items-center justify-center gap-6">
                <ProgressRing
                  value={guestCount}
                  max={Math.ceil(guestCount * 1.15)}
                  size={100}
                  color={CHART_COLORS.primary}
                  sublabel="Minimum"
                />
                <div className="text-center">
                  <p className="text-sm text-gray-600">Recommended Range</p>
                  <p className="text-xl font-bold text-gray-900">{guestCount} – {Math.ceil(guestCount * 1.15)}</p>
                  <p className="text-xs text-gray-500">servings needed</p>
                </div>
                <ProgressRing
                  value={Math.ceil(guestCount * 1.15)}
                  max={Math.ceil(guestCount * 1.15)}
                  size={100}
                  color={CHART_COLORS.secondary}
                  sublabel="With buffer"
                />
              </div>
            </div>

            {/* Recommendations List */}
            {recommendations.length > 0 ? (
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Recommended Sizes</h4>
                <div className="space-y-2">
                  {recommendations.map((rec, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        idx === 0 ? "bg-coral/10 border border-coral" : "bg-gray-50"
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        idx === 0 ? "bg-coral text-white" : "bg-gray-200 text-gray-700"
                      }`}>
                        {idx + 1}
                      </span>
                      <span className={`font-medium ${idx === 0 ? "text-coral" : "text-gray-700"}`}>
                        {rec}
                      </span>
                      {idx === 0 && <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Best Match</span>}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <InsightCard type="info" title="Large Event">
                For {guestCount} guests, consider a tiered cake or multiple cakes for easier service and better presentation.
              </InsightCard>
            )}

            {/* Tiered Cake Options */}
            {guestCount > 50 && (
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Tiered Cake Options</h4>
                <ComparisonBarChart
                  data={tieredCakeConfigs
                    .filter((tc) => {
                      const servings = servingType === "wedding" ? tc.weddingServings : tc.partyServings;
                      return servings >= guestCount * 0.8 && servings <= guestCount * 1.5;
                    })
                    .slice(0, 4)
                    .map((tc) => ({
                      name: tc.label,
                      value: servingType === "wedding" ? tc.weddingServings : tc.partyServings,
                      fill: (servingType === "wedding" ? tc.weddingServings : tc.partyServings) >= guestCount
                        ? CHART_COLORS.primary
                        : "#9CA3AF",
                    }))}
                  height={120}
                  unit=" servings"
                />
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Tiered cakes with tiers closest to {guestCount} {currentServingInfo?.label.toLowerCase()} servings
                </p>
              </div>
            )}

            {/* Event Planning Guide */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Event Planning Checklist</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-coral text-white text-xs flex items-center justify-center flex-shrink-0">1</span>
                  <span>Order cake for <strong>{Math.ceil(guestCount * 1.1)}–{Math.ceil(guestCount * 1.15)} servings</strong> (10-15% buffer)</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-coral text-white text-xs flex items-center justify-center flex-shrink-0">2</span>
                  <span>Confirm delivery/pickup <strong>1-2 days before</strong> event</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-coral text-white text-xs flex items-center justify-center flex-shrink-0">3</span>
                  <span>Plan for <strong>2-3 people</strong> to help cut and serve</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-coral text-white text-xs flex items-center justify-center flex-shrink-0">4</span>
                  <span>Have <strong>to-go boxes</strong> ready for leftover slices</span>
                </li>
              </ul>
            </div>

            {/* Tips */}
            <div className="space-y-3">
              <InsightCard type="tip" title="Cost Saving Tip">
                For large events, consider a smaller display cake for photos plus sheet cakes cut in the kitchen. Same taste, lower cost!
              </InsightCard>

              {servingType === "wedding" && guestCount >= 100 && (
                <InsightCard type="info" title="Wedding Cake Alternative">
                  Many couples opt for a small 2-tier cutting cake plus a dessert bar or cupcake tower for variety and easier serving.
                </InsightCard>
              )}

              <InsightCard type="warning" title="Weather & Venue">
                For outdoor summer events, avoid buttercream and opt for fondant or whipped icing that holds up better in heat.
              </InsightCard>
            </div>
          </div>
          )}
        </div>
      )}

      {/* Quick Reference Tables */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="font-serif text-lg font-semibold text-gray-900 mb-4">
          Quick Reference: Party Servings
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-gray-700 mb-2">Round Cakes</h5>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2">Size</th>
                  <th className="text-right py-2">Party</th>
                  <th className="text-right py-2">Wedding</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(roundCakeServings).map(([sz, servings]) => (
                  <tr key={sz} className="border-b border-gray-100">
                    <td className="py-2">{sz}"</td>
                    <td className="text-right">{servings.party}</td>
                    <td className="text-right">{servings.wedding}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h5 className="font-medium text-gray-700 mb-2">Square Cakes</h5>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2">Size</th>
                  <th className="text-right py-2">Party</th>
                  <th className="text-right py-2">Wedding</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(squareCakeServings).map(([sz, servings]) => (
                  <tr key={sz} className="border-b border-gray-100">
                    <td className="py-2">{sz}"</td>
                    <td className="text-right">{servings.party}</td>
                    <td className="text-right">{servings.wedding}</td>
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
