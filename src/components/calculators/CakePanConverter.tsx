"use client";

import { useState, useMemo, useCallback } from "react";
import {
  StatCard,
  InsightCard,
} from "@/components/charts";

type PanShape = "round" | "square" | "rectangular" | "bundt" | "springform" | "loaf";

// Unit conversion helpers
const inToCm = (inches: number) => Math.round(inches * 2.54);
const sqInToSqCm = (sqIn: number) => Math.round(sqIn * 6.4516);
const cupsToMl = (cups: number) => Math.round(cups * 236.588);

interface PanSize {
  shape: PanShape;
  dimensions: string;
  area: number; // in square inches
  volume?: number; // in cups for some shapes
}

const panSizes: PanSize[] = [
  // Round pans
  { shape: "round", dimensions: '6" (15 cm) round', area: Math.PI * 3 * 3 },
  { shape: "round", dimensions: '8" (20 cm) round', area: Math.PI * 4 * 4 },
  { shape: "round", dimensions: '9" (23 cm) round', area: Math.PI * 4.5 * 4.5 },
  { shape: "round", dimensions: '10" (25 cm) round', area: Math.PI * 5 * 5 },
  { shape: "round", dimensions: '12" (30 cm) round', area: Math.PI * 6 * 6 },

  // Square pans
  { shape: "square", dimensions: '8" (20 cm) square', area: 8 * 8 },
  { shape: "square", dimensions: '9" (23 cm) square', area: 9 * 9 },
  { shape: "square", dimensions: '10" (25 cm) square', area: 10 * 10 },

  // Rectangular pans
  { shape: "rectangular", dimensions: '9" x 13" (23×33 cm)', area: 9 * 13 },
  { shape: "rectangular", dimensions: '11" x 15" (28×38 cm) jelly roll', area: 11 * 15 },
  { shape: "rectangular", dimensions: '12" x 18" (30×46 cm) half sheet', area: 12 * 18 },

  // Bundt pans
  { shape: "bundt", dimensions: '10" (25 cm) Bundt (12 cup / 2.8L)', area: 78.5, volume: 12 },
  { shape: "bundt", dimensions: '9" (23 cm) Bundt (10 cup / 2.4L)', area: 63.6, volume: 10 },

  // Springform pans
  { shape: "springform", dimensions: '8" (20 cm) springform', area: Math.PI * 4 * 4 },
  { shape: "springform", dimensions: '9" (23 cm) springform', area: Math.PI * 4.5 * 4.5 },
  { shape: "springform", dimensions: '10" (25 cm) springform', area: Math.PI * 5 * 5 },

  // Loaf pans
  { shape: "loaf", dimensions: '8.5" x 4.5" (22×11 cm) loaf', area: 8.5 * 4.5 },
  { shape: "loaf", dimensions: '9" x 5" (23×13 cm) loaf', area: 9 * 5 },
];

const shapeLabels: Record<PanShape, string> = {
  round: "Round",
  square: "Square",
  rectangular: "Rectangular",
  bundt: "Bundt",
  springform: "Springform",
  loaf: "Loaf",
};

// Extract dimensions from pan string like '9" (23 cm) round' or '9" x 13" (23×33 cm)'
function parsePanDimensions(panStr: string): { width: number; height: number; isRound: boolean } {
  const isRound = panStr.includes("round") || panStr.includes("Bundt") || panStr.includes("springform");

  // Check for rectangular: '9" x 13"' pattern
  const rectMatch = panStr.match(/(\d+(?:\.\d+)?)"?\s*[x×]\s*(\d+(?:\.\d+)?)"/);
  if (rectMatch) {
    return { width: parseFloat(rectMatch[1]), height: parseFloat(rectMatch[2]), isRound: false };
  }

  // Single dimension: '9"' pattern
  const singleMatch = panStr.match(/(\d+(?:\.\d+)?)"/);
  if (singleMatch) {
    const size = parseFloat(singleMatch[1]);
    return { width: size, height: size, isRound };
  }

  return { width: 9, height: 9, isRound: true }; // fallback
}

// SVG Pan Comparison Component
function PanComparisonSVG({
  originalPan,
  newPan,
}: {
  originalPan: string;
  newPan: string;
}) {
  const origDims = parsePanDimensions(originalPan);
  const newDims = parsePanDimensions(newPan);

  // Find the largest dimension to scale properly
  const maxDim = Math.max(origDims.width, origDims.height, newDims.width, newDims.height);
  const svgSize = 300;
  const padding = 55;
  const scale = (svgSize - padding * 2) / maxDim;

  const centerX = svgSize / 2;
  const centerY = svgSize / 2;

  // Calculate scaled dimensions
  const origW = origDims.width * scale;
  const origH = origDims.height * scale;
  const newW = newDims.width * scale;
  const newH = newDims.height * scale;

  // Determine which pan is larger (by area) to draw it behind
  const origArea = origDims.width * origDims.height * (origDims.isRound ? Math.PI / 4 : 1);
  const newArea2 = newDims.width * newDims.height * (newDims.isRound ? Math.PI / 4 : 1);
  const origIsLarger = origArea >= newArea2;

  // Pan shape renderer
  const renderPan = (
    dims: { width: number; height: number; isRound: boolean },
    w: number,
    h: number,
    isOriginal: boolean
  ) => {
    const fill = isOriginal ? "#E5E7EB" : "rgba(232, 96, 76, 0.3)";
    const stroke = isOriginal ? "#9CA3AF" : "#E8604C";
    const strokeWidth = isOriginal ? 2.5 : 3;

    if (dims.isRound) {
      return (
        <circle
          cx={centerX}
          cy={centerY}
          r={w / 2}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      );
    }
    return (
      <rect
        x={centerX - w / 2}
        y={centerY - h / 2}
        width={w}
        height={h}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        rx="6"
      />
    );
  };

  return (
    <div className="flex justify-center">
      <svg
        width={svgSize}
        height={svgSize}
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        className="max-w-full"
        style={{ maxHeight: '300px' }}
      >
        {/* Draw larger pan first (behind), smaller pan second (in front) */}
        {origIsLarger ? (
          <>
            {renderPan(origDims, origW, origH, true)}
            {renderPan(newDims, newW, newH, false)}
          </>
        ) : (
          <>
            {renderPan(newDims, newW, newH, false)}
            {renderPan(origDims, origW, origH, true)}
          </>
        )}

        {/* Original pan dimension label - top */}
        <g>
          <line
            x1={centerX - origW / 2}
            y1={25}
            x2={centerX + origW / 2}
            y2={25}
            stroke="#9CA3AF"
            strokeWidth="1.5"
          />
          {/* End caps */}
          <line x1={centerX - origW / 2} y1={20} x2={centerX - origW / 2} y2={30} stroke="#9CA3AF" strokeWidth="1.5" />
          <line x1={centerX + origW / 2} y1={20} x2={centerX + origW / 2} y2={30} stroke="#9CA3AF" strokeWidth="1.5" />
          <text
            x={centerX}
            y={15}
            textAnchor="middle"
            fill="#6B7280"
            fontSize="13"
            fontWeight="500"
          >
            {origDims.width}" ({inToCm(origDims.width)} cm)
          </text>
        </g>

        {/* New pan dimension label - bottom */}
        <g>
          <line
            x1={centerX - newW / 2}
            y1={svgSize - 25}
            x2={centerX + newW / 2}
            y2={svgSize - 25}
            stroke="#E8604C"
            strokeWidth="1.5"
          />
          {/* End caps */}
          <line x1={centerX - newW / 2} y1={svgSize - 30} x2={centerX - newW / 2} y2={svgSize - 20} stroke="#E8604C" strokeWidth="1.5" />
          <line x1={centerX + newW / 2} y1={svgSize - 30} x2={centerX + newW / 2} y2={svgSize - 20} stroke="#E8604C" strokeWidth="1.5" />
          <text
            x={centerX}
            y={svgSize - 8}
            textAnchor="middle"
            fill="#E8604C"
            fontSize="13"
            fontWeight="600"
          >
            {newDims.width}" ({inToCm(newDims.width)} cm)
          </text>
        </g>
      </svg>
    </div>
  );
}

export default function CakePanConverter() {
  const [originalPan, setOriginalPan] = useState<string>('9" (23 cm) round');
  const [newPan, setNewPan] = useState<string>('8" (20 cm) square');
  const [originalEggs, setOriginalEggs] = useState<number>(2);
  const [showResults, setShowResults] = useState<boolean>(false);

  const resetResults = useCallback(() => setShowResults(false), []);

  const results = useMemo(() => {
    const original = panSizes.find(p => p.dimensions === originalPan);
    const newP = panSizes.find(p => p.dimensions === newPan);

    if (!original || !newP) return null;

    const multiplier = newP.area / original.area;

    // Egg adjustments
    const scaledEggs = originalEggs * multiplier;
    let roundedEggs: number;
    let eggNote = "";

    const fractionalPart = scaledEggs % 1;
    if (fractionalPart < 0.25) {
      roundedEggs = Math.floor(scaledEggs);
    } else if (fractionalPart < 0.75) {
      roundedEggs = Math.floor(scaledEggs);
      eggNote = " + 1 yolk";
    } else {
      roundedEggs = Math.ceil(scaledEggs);
    }

    // Time adjustment estimate
    let timeAdjustment = "";
    if (multiplier > 1.2) {
      timeAdjustment = "Add 5-10 minutes";
    } else if (multiplier > 1.5) {
      timeAdjustment = "Add 10-15 minutes";
    } else if (multiplier < 0.8) {
      timeAdjustment = "Reduce by 5-10 minutes";
    } else if (multiplier < 0.5) {
      timeAdjustment = "Reduce by 10-15 minutes";
    } else {
      timeAdjustment = "Similar to original";
    }

    return {
      originalArea: original.area,
      newArea: newP.area,
      multiplier,
      scaledEggs,
      roundedEggs,
      eggNote,
      timeAdjustment,
    };
  }, [originalPan, newPan, originalEggs]);

  const formatMultiplier = (mult: number): string => {
    if (mult === 1) return "1× (same size)";
    if (mult < 1) return `${mult.toFixed(2)}× (smaller)`;
    return `${mult.toFixed(2)}× (larger)`;
  };

  const groupedPans = Object.keys(shapeLabels).map(shape => ({
    shape: shape as PanShape,
    label: shapeLabels[shape as PanShape],
    pans: panSizes.filter(p => p.shape === shape),
  }));

  return (
    <div className="calculator-card p-6 md:p-8">
      <div className="space-y-6">
        {/* Original Pan */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Original Recipe Pan
          </label>
          <select
            value={originalPan}
            onChange={(e) => { setOriginalPan(e.target.value); resetResults(); }}
            className="input-field w-full"
          >
            {groupedPans.map(group => (
              <optgroup key={group.shape} label={group.label}>
                {group.pans.map(pan => (
                  <option key={pan.dimensions} value={pan.dimensions}>
                    {pan.dimensions}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* New Pan */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pan You Want to Use
          </label>
          <select
            value={newPan}
            onChange={(e) => { setNewPan(e.target.value); resetResults(); }}
            className="input-field w-full"
          >
            {groupedPans.map(group => (
              <optgroup key={group.shape} label={group.label}>
                {group.pans.map(pan => (
                  <option key={pan.dimensions} value={pan.dimensions}>
                    {pan.dimensions}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Eggs in original recipe */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Eggs in Original Recipe
          </label>
          <input
            type="number"
            value={originalEggs}
            onChange={(e) => { setOriginalEggs(Number(e.target.value)); resetResults(); }}
            className="input-field w-24"
            min={0}
            max={12}
          />
        </div>

        <button
          onClick={() => setShowResults(true)}
          className="btn-primary w-full sm:w-auto"
        >
          Convert
        </button>

        {/* Results */}
        {showResults && results && (
          <div className="results-panel space-y-6">
            <h3 className="font-serif text-lg font-semibold text-gray-900 mb-4">
              Pan Conversion Results
            </h3>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatCard
                label="Multiplier"
                value={`${results.multiplier.toFixed(2)}×`}
                sublabel={results.multiplier < 1 ? "Scale down" : results.multiplier > 1 ? "Scale up" : "Same size"}
                color={results.multiplier > 1 ? "green" : results.multiplier < 1 ? "blue" : "gray"}
              />
              <StatCard
                label="Original Area"
                value={`${results.originalArea.toFixed(0)} sq in`}
                sublabel={`${sqInToSqCm(results.originalArea)} sq cm`}
                color="coral"
              />
              <StatCard
                label="New Area"
                value={`${results.newArea.toFixed(0)} sq in`}
                sublabel={`${sqInToSqCm(results.newArea)} sq cm`}
                color="amber"
              />
              <StatCard
                label="Eggs"
                value={originalEggs > 0 ? `${results.roundedEggs}${results.eggNote}` : "N/A"}
                sublabel={originalEggs > 0 ? `From ${originalEggs}` : "Not set"}
                color="purple"
              />
            </div>

            {/* Visual Pan Comparison - SVG Overlay */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-medium text-gray-900 mb-2 text-center">Pan Size Comparison</h4>
              <p className="text-sm text-gray-500 text-center mb-6">Pans shown to scale, overlaid for direct comparison</p>

              <PanComparisonSVG
                originalPan={originalPan}
                newPan={newPan}
              />

              {/* Legend */}
              <div className="flex justify-center gap-8 mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-400 bg-gray-100"></div>
                  <span className="text-sm text-gray-600">Original: {results.originalArea.toFixed(0)} sq in ({sqInToSqCm(results.originalArea)} cm²)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-coral bg-coral/30"></div>
                  <span className="text-sm text-gray-600">New: {results.newArea.toFixed(0)} sq in ({sqInToSqCm(results.newArea)} cm²)</span>
                </div>
              </div>
            </div>

            {/* Main Result Box */}
            <div className="bg-gradient-to-r from-coral/10 to-amber-50 rounded-lg p-6 border border-coral/20">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600 mb-1">Multiply All Ingredients By</p>
                <p className="text-5xl font-bold text-coral">
                  {results.multiplier.toFixed(2)}×
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {results.multiplier < 1
                    ? `Use ${((1 - results.multiplier) * 100).toFixed(0)}% less of each ingredient`
                    : results.multiplier > 1
                      ? `Use ${((results.multiplier - 1) * 100).toFixed(0)}% more of each ingredient`
                      : "Same amount of ingredients"}
                </p>
              </div>
            </div>

            {/* Scaled Ingredients Example */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                <h4 className="font-medium text-gray-900">Scaled Ingredient Example</h4>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-2 px-4">Ingredient</th>
                    <th className="text-right py-2 px-4">Original</th>
                    <th className="text-right py-2 px-4">Scaled</th>
                    <th className="text-right py-2 px-4">Change</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  {[
                    { name: "All-Purpose Flour", original: 2, unit: "cups" },
                    { name: "Granulated Sugar", original: 1, unit: "cup" },
                    { name: "Butter (softened)", original: 0.5, unit: "cup" },
                    { name: "Milk", original: 1, unit: "cup" },
                    { name: "Vanilla Extract", original: 1, unit: "tsp" },
                    { name: "Baking Powder", original: 2, unit: "tsp" },
                  ].map((ing, idx) => {
                    const scaled = ing.original * results.multiplier;
                    return (
                      <tr key={idx} className="border-b border-gray-100">
                        <td className="py-2 px-4">{ing.name}</td>
                        <td className="text-right py-2 px-4 text-gray-500">
                          {ing.original} {ing.unit}
                        </td>
                        <td className="text-right py-2 px-4 font-medium text-coral">
                          {scaled.toFixed(2)} {ing.unit}
                        </td>
                        <td className="text-right py-2 px-4 text-xs">
                          {results.multiplier !== 1 && (
                            <span className={results.multiplier > 1 ? "text-green-600" : "text-blue-600"}>
                              {results.multiplier > 1 ? "+" : ""}{((results.multiplier - 1) * 100).toFixed(0)}%
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Egg & Time Adjustments */}
            <div className="grid gap-3 md:grid-cols-2">
              {originalEggs > 0 && (
                <InsightCard type="warning" title="Egg Adjustment">
                  <div className="text-sm">
                    <p className="mb-2">
                      {originalEggs} eggs × {results.multiplier.toFixed(2)} = {results.scaledEggs.toFixed(1)}
                    </p>
                    <p className="font-medium text-amber-900">
                      Use {results.roundedEggs} egg{results.roundedEggs !== 1 ? "s" : ""}{results.eggNote}
                    </p>
                    <p className="text-xs mt-2 text-amber-700">
                      For fractional eggs between 0.25-0.75, use a yolk only for better results.
                    </p>
                  </div>
                </InsightCard>
              )}

              <InsightCard type="info" title="Baking Time Adjustment">
                <div className="text-sm">
                  <p className="font-medium text-blue-900 mb-2">{results.timeAdjustment}</p>
                  <ul className="text-blue-800 space-y-1 text-xs">
                    <li>• Check doneness with a toothpick test</li>
                    <li>• Larger pans = longer baking time</li>
                    <li>• Smaller pans = shorter baking time</li>
                  </ul>
                </div>
              </InsightCard>
            </div>

            {/* Baking Tips */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-medium text-gray-900 mb-3">Baking Tips for Pan Substitutions</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-blue-900 mb-1">Fill Level</p>
                  <p className="text-blue-800">
                    Fill pans ⅓ to ½ full for proper rise. Overfilling causes spillover.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-blue-900 mb-1">Shape Changes</p>
                  <p className="text-blue-800">
                    Round to square: corners may cook faster. Rotate pan halfway through.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-blue-900 mb-1">Bundt Pans</p>
                  <p className="text-blue-800">
                    Center tube helps heat distribution. May need slightly less time.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-blue-900 mb-1">Depth Matters</p>
                  <p className="text-blue-800">
                    Shallower batter = faster baking. Deeper = longer + lower temp.
                  </p>
                </div>
              </div>
            </div>

            {/* Temperature Guide */}
            {results.multiplier !== 1 && (
              <InsightCard type="tip" title="Temperature Consideration">
                <p className="text-sm">
                  {results.multiplier > 1.5
                    ? "For significantly larger pans, consider reducing oven temperature by 25°F (15°C) to prevent over-browning while the center bakes through."
                    : results.multiplier < 0.6
                      ? "For smaller pans with thinner batter layers, the original temperature should work fine, but watch closely as it will bake faster."
                      : "The original oven temperature should work well for this conversion. Just adjust the time as noted above."}
                </p>
              </InsightCard>
            )}
          </div>
        )}

        {/* Pan Volume Reference */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Pan Volume Reference</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Pan Size</th>
                  <th className="text-left py-2 pr-4">Area</th>
                  <th className="text-left py-2">Volume</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {[
                  { pan: '8" (20 cm) round × 2"', areaSqIn: 50, volCups: 6 },
                  { pan: '9" (23 cm) round × 2"', areaSqIn: 64, volCups: 8 },
                  { pan: '8" (20 cm) square × 2"', areaSqIn: 64, volCups: 8 },
                  { pan: '9" (23 cm) square × 2"', areaSqIn: 81, volCups: 10 },
                  { pan: '9" × 13" (23×33 cm) × 2"', areaSqIn: 117, volCups: 14 },
                  { pan: '10" (25 cm) Bundt', areaSqIn: 79, volCups: 12 },
                ].map((row) => (
                  <tr key={row.pan} className="border-b border-gray-100">
                    <td className="py-2 pr-4">{row.pan}</td>
                    <td className="py-2 pr-4">{row.areaSqIn} sq in <span className="text-gray-400">({sqInToSqCm(row.areaSqIn)} cm²)</span></td>
                    <td className="py-2">{row.volCups} cups <span className="text-gray-400">({(row.volCups * 0.237).toFixed(1)}L)</span></td>
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
