// Cake Servings Data - Based on Wilton industry standards

export type CakeShape = "round" | "square" | "quarter-sheet" | "half-sheet" | "full-sheet" | "rectangular";
export type ServingType = "party" | "wedding" | "dessert";

export interface ServingTypeInfo {
  key: ServingType;
  label: string;
  dimensions: string;
  description: string;
  sliceArea: number; // square inches
}

export const servingTypes: ServingTypeInfo[] = [
  {
    key: "party",
    label: "Party",
    dimensions: '2" × 2"',
    description: "Birthday parties, casual events, dessert-focused gatherings",
    sliceArea: 4,
  },
  {
    key: "wedding",
    label: "Wedding",
    dimensions: '1" × 2"',
    description: "Weddings, formal events, multi-dessert tables",
    sliceArea: 2,
  },
  {
    key: "dessert",
    label: "Dessert",
    dimensions: '2" × 3"',
    description: "Dinner parties where cake is the only dessert",
    sliceArea: 6,
  },
];

export interface CakeShapeInfo {
  key: CakeShape;
  label: string;
  hasCustomSize: boolean;
  sizeOptions?: number[];
  defaultSize?: number;
  dimensions?: { width: number; height: number }; // for sheet cakes
}

export const cakeShapes: CakeShapeInfo[] = [
  {
    key: "round",
    label: "Round",
    hasCustomSize: true,
    sizeOptions: [6, 7, 8, 9, 10, 12, 14, 16],
    defaultSize: 10,
  },
  {
    key: "square",
    label: "Square",
    hasCustomSize: true,
    sizeOptions: [6, 8, 10, 12, 14, 16],
    defaultSize: 10,
  },
  {
    key: "quarter-sheet",
    label: "Quarter Sheet",
    hasCustomSize: false,
    dimensions: { width: 9, height: 13 },
  },
  {
    key: "half-sheet",
    label: "Half Sheet",
    hasCustomSize: false,
    dimensions: { width: 12, height: 18 },
  },
  {
    key: "full-sheet",
    label: "Full Sheet",
    hasCustomSize: false,
    dimensions: { width: 18, height: 24 },
  },
  {
    key: "rectangular",
    label: "Custom Rectangular",
    hasCustomSize: true,
  },
];

// Wilton-based serving charts (these account for practical yield vs theoretical math)
// Round cakes use ~85-90% efficiency factor
export const roundCakeServings: Record<number, { party: number; wedding: number }> = {
  6: { party: 12, wedding: 16 },
  7: { party: 16, wedding: 22 },
  8: { party: 20, wedding: 24 },
  9: { party: 24, wedding: 32 },
  10: { party: 28, wedding: 38 },
  12: { party: 40, wedding: 56 },
  14: { party: 54, wedding: 78 },
  16: { party: 72, wedding: 100 },
};

// Square cakes are more efficient (no curved edge waste)
export const squareCakeServings: Record<number, { party: number; wedding: number }> = {
  6: { party: 18, wedding: 36 },
  8: { party: 32, wedding: 64 },
  10: { party: 50, wedding: 100 },
  12: { party: 72, wedding: 144 },
  14: { party: 98, wedding: 196 },
  16: { party: 128, wedding: 256 },
};

// Sheet cake servings (party size only typically)
export const sheetCakeServings: Record<string, { partyMin: number; partyMax: number }> = {
  "quarter-sheet": { partyMin: 30, partyMax: 35 },
  "half-sheet": { partyMin: 54, partyMax: 64 },
  "full-sheet": { partyMin: 96, partyMax: 117 },
};

// Tiered cake configurations for weddings and parties
export interface TieredCakeConfig {
  label: string;
  tiers: number[];
  weddingServings: number;
  partyServings: number;
}

export const tieredCakeConfigs: TieredCakeConfig[] = [
  { label: '2-tier (6" + 10")', tiers: [6, 10], weddingServings: 54, partyServings: 36 },
  { label: '2-tier (8" + 12")', tiers: [8, 12], weddingServings: 80, partyServings: 53 },
  { label: '3-tier (6" + 9" + 12")', tiers: [6, 9, 12], weddingServings: 94, partyServings: 63 },
  { label: '3-tier (6" + 10" + 14")', tiers: [6, 10, 14], weddingServings: 132, partyServings: 88 },
  { label: '4-tier (6" + 8" + 10" + 12")', tiers: [6, 8, 10, 12], weddingServings: 134, partyServings: 89 },
  { label: '4-tier (6" + 8" + 10" + 14")', tiers: [6, 8, 10, 14], weddingServings: 160, partyServings: 107 },
];

// Reverse calculator: recommended cake sizes by guest count
export interface CakeSizeRecommendation {
  minGuests: number;
  maxGuests: number;
  round: string;
  square: string;
  sheet: string;
}

export const partySizeRecommendations: CakeSizeRecommendation[] = [
  { minGuests: 10, maxGuests: 12, round: '6"', square: '6"', sheet: "—" },
  { minGuests: 15, maxGuests: 20, round: '8"', square: '8"', sheet: "—" },
  { minGuests: 20, maxGuests: 25, round: '9"–10"', square: '8"', sheet: "—" },
  { minGuests: 25, maxGuests: 30, round: '10"', square: '10"', sheet: "Quarter" },
  { minGuests: 30, maxGuests: 40, round: '12"', square: '10"', sheet: "Quarter" },
  { minGuests: 40, maxGuests: 50, round: '14"', square: '12"', sheet: "Half" },
  { minGuests: 50, maxGuests: 75, round: '16" or two-tier', square: '14"', sheet: "Half" },
  { minGuests: 75, maxGuests: 100, round: "Three-tier", square: '16"', sheet: "Full" },
  { minGuests: 100, maxGuests: 150, round: "Four-tier", square: "—", sheet: "Full + half" },
];

// Helper function to calculate servings
export function calculateCakeServings(
  shape: CakeShape,
  servingType: ServingType,
  size?: number,
  width?: number,
  height?: number
): { min: number; max: number } {
  const servingInfo = servingTypes.find((s) => s.key === servingType);
  if (!servingInfo) return { min: 0, max: 0 };

  // Apply Wilton adjustment factor for practical yield
  const adjustmentFactor = 0.87;

  if (shape === "round" && size) {
    const lookup = roundCakeServings[size];
    if (lookup) {
      if (servingType === "party") return { min: lookup.party, max: lookup.party };
      if (servingType === "wedding") return { min: lookup.wedding, max: lookup.wedding };
      // Dessert servings: calculate from area
      const area = Math.PI * Math.pow(size / 2, 2);
      const servings = Math.floor((area / servingInfo.sliceArea) * adjustmentFactor);
      return { min: servings, max: servings };
    }
    // Calculate for unlisted sizes
    const area = Math.PI * Math.pow(size / 2, 2);
    const servings = Math.floor((area / servingInfo.sliceArea) * adjustmentFactor);
    return { min: servings, max: servings };
  }

  if (shape === "square" && size) {
    const lookup = squareCakeServings[size];
    if (lookup) {
      if (servingType === "party") return { min: lookup.party, max: lookup.party };
      if (servingType === "wedding") return { min: lookup.wedding, max: lookup.wedding };
    }
    // Calculate for unlisted sizes
    const area = size * size;
    const servings = Math.floor(area / servingInfo.sliceArea);
    return { min: servings, max: servings };
  }

  if (shape === "rectangular" && width && height) {
    const area = width * height;
    const servings = Math.floor(area / servingInfo.sliceArea);
    return { min: servings, max: servings };
  }

  // Sheet cakes
  const sheetLookup = sheetCakeServings[shape];
  if (sheetLookup) {
    // Sheet cakes typically use party servings
    if (servingType === "wedding") {
      // Wedding servings are roughly double
      return { min: sheetLookup.partyMin * 1.8, max: sheetLookup.partyMax * 2 };
    }
    return { min: sheetLookup.partyMin, max: sheetLookup.partyMax };
  }

  return { min: 0, max: 0 };
}

// Recommend cake size based on guest count
export function recommendCakeSize(
  guests: number,
  servingType: ServingType,
  preferredShape?: CakeShape
): string[] {
  const recommendations: string[] = [];
  const buffer = 1.1; // 10% buffer for safety
  const targetServings = guests * buffer;

  // Check round cakes
  if (!preferredShape || preferredShape === "round") {
    for (const [size, servings] of Object.entries(roundCakeServings)) {
      const s = servingType === "party" ? servings.party : servings.wedding;
      if (s >= targetServings) {
        recommendations.push(`${size}" round (${s} servings)`);
        break;
      }
    }
  }

  // Check square cakes
  if (!preferredShape || preferredShape === "square") {
    for (const [size, servings] of Object.entries(squareCakeServings)) {
      const s = servingType === "party" ? servings.party : servings.wedding;
      if (s >= targetServings) {
        recommendations.push(`${size}" square (${s} servings)`);
        break;
      }
    }
  }

  // Check sheet cakes
  if (!preferredShape || preferredShape.includes("sheet")) {
    for (const [type, servings] of Object.entries(sheetCakeServings)) {
      const avg = (servings.partyMin + servings.partyMax) / 2;
      const adjusted = servingType === "wedding" ? avg * 1.9 : avg;
      if (adjusted >= targetServings) {
        const label = type.replace("-", " ");
        recommendations.push(`${label} (${servings.partyMin}–${servings.partyMax} servings)`);
        break;
      }
    }
  }

  return recommendations;
}
