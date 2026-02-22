// Slow Cooker Conversion Data

export type CookingMethodType =
  | "slow_cooker_low"
  | "slow_cooker_high"
  | "oven"
  | "instant_pot"
  | "stovetop";

export interface CookingMethodInfo {
  key: CookingMethodType;
  label: string;
  icon: string;
  defaultTempF?: number;
}

export const cookingMethodsInfo: CookingMethodInfo[] = [
  { key: "slow_cooker_low", label: "Slow Cooker (LOW)", icon: "🍲" },
  { key: "slow_cooker_high", label: "Slow Cooker (HIGH)", icon: "🍲" },
  { key: "oven", label: "Conventional Oven", icon: "🔥", defaultTempF: 325 },
  { key: "instant_pot", label: "Instant Pot / Pressure Cooker", icon: "⚡" },
  { key: "stovetop", label: "Stovetop / Dutch Oven", icon: "🫕" },
];

export type FoodType =
  | "stew_soup"
  | "braised_meat"
  | "roasted_meat"
  | "beans"
  | "casserole"
  | "pasta"
  | "vegetables"
  | "custom";

export interface FoodTypeInfo {
  key: FoodType;
  label: string;
  warnings?: string[];
}

export const foodTypes: FoodTypeInfo[] = [
  { key: "stew_soup", label: "Stew / Soup" },
  { key: "braised_meat", label: "Braised Meat (pot roast, pulled pork)" },
  { key: "roasted_meat", label: "Roasted Meat" },
  { key: "beans", label: "Beans / Legumes" },
  { key: "casserole", label: "Casserole" },
  {
    key: "pasta",
    label: "Pasta Dish",
    warnings: ["Pasta doesn't hold up well in slow cookers — add pasta in the last 20-30 min on HIGH, or cook separately."]
  },
  { key: "vegetables", label: "Vegetables" },
  { key: "custom", label: "Other / Custom" },
];

// Conversion ratios (multiply original time by this factor)
// e.g., slow_cooker_low to oven: divide by 3.5
interface ConversionRatio {
  from: CookingMethodType;
  to: CookingMethodType;
  factor: number; // multiply source time by this to get target time
  liquidFactor: number; // multiply source liquid by this
  notes?: string;
}

export const conversionRatios: ConversionRatio[] = [
  // Slow Cooker LOW to other methods
  { from: "slow_cooker_low", to: "oven", factor: 1/3.5, liquidFactor: 1.0 },
  { from: "slow_cooker_low", to: "instant_pot", factor: 1/16, liquidFactor: 0.5, notes: "Add 10-15 min natural release" },
  { from: "slow_cooker_low", to: "stovetop", factor: 1/3.5, liquidFactor: 0.75 },
  { from: "slow_cooker_low", to: "slow_cooker_high", factor: 0.5, liquidFactor: 1.0 },

  // Slow Cooker HIGH to other methods
  { from: "slow_cooker_high", to: "oven", factor: 0.5, liquidFactor: 1.0 },
  { from: "slow_cooker_high", to: "instant_pot", factor: 1/8, liquidFactor: 0.5, notes: "Add 10-15 min natural release" },
  { from: "slow_cooker_high", to: "stovetop", factor: 1/2.5, liquidFactor: 0.75 },
  { from: "slow_cooker_high", to: "slow_cooker_low", factor: 2, liquidFactor: 1.0 },

  // Oven to other methods
  { from: "oven", to: "slow_cooker_low", factor: 3.5, liquidFactor: 1.25 },
  { from: "oven", to: "slow_cooker_high", factor: 2, liquidFactor: 1.25 },
  { from: "oven", to: "instant_pot", factor: 1/4.5, liquidFactor: 0.5, notes: "Add 10-15 min natural release" },
  { from: "oven", to: "stovetop", factor: 1, liquidFactor: 0.75 },

  // Instant Pot to other methods
  { from: "instant_pot", to: "slow_cooker_low", factor: 16, liquidFactor: 1.5 },
  { from: "instant_pot", to: "slow_cooker_high", factor: 8, liquidFactor: 1.5 },
  { from: "instant_pot", to: "oven", factor: 4.5, liquidFactor: 1.0 },
  { from: "instant_pot", to: "stovetop", factor: 4.5, liquidFactor: 1.0 },

  // Stovetop to other methods
  { from: "stovetop", to: "slow_cooker_low", factor: 3.5, liquidFactor: 1.33 },
  { from: "stovetop", to: "slow_cooker_high", factor: 2.5, liquidFactor: 1.33 },
  { from: "stovetop", to: "oven", factor: 1, liquidFactor: 1.0 },
  { from: "stovetop", to: "instant_pot", factor: 1/4.5, liquidFactor: 0.5, notes: "Add 10-15 min natural release" },
];

// Liquid adjustment descriptions
export const liquidAdjustments: Record<CookingMethodType, string> = {
  slow_cooker_low: "Increase liquid by ~25%",
  slow_cooker_high: "Increase liquid by ~25%",
  oven: "Keep the same amount (use a covered pot/lid)",
  instant_pot: "Reduce liquid by ~50% (minimum 1 cup required)",
  stovetop: "Reduce liquid by ~25%",
};

// Get conversion
export function getConversion(
  from: CookingMethodType,
  to: CookingMethodType,
  timeMinutes: number,
  liquidCups?: number
): {
  timeMin: number;
  timeMax: number;
  liquidCups?: number;
  liquidAdjustment: string;
  notes: string[];
  tempF?: number;
} {
  if (from === to) {
    return {
      timeMin: timeMinutes,
      timeMax: timeMinutes,
      liquidCups,
      liquidAdjustment: "No change",
      notes: [],
    };
  }

  const ratio = conversionRatios.find((r) => r.from === from && r.to === to);
  if (!ratio) {
    // Try to calculate via intermediate step
    return {
      timeMin: 0,
      timeMax: 0,
      liquidAdjustment: "Unknown",
      notes: ["Conversion not available"],
    };
  }

  const convertedTime = timeMinutes * ratio.factor;
  // Provide a range (±15%)
  const timeMin = Math.round(convertedTime * 0.85);
  const timeMax = Math.round(convertedTime * 1.15);

  const notes: string[] = [];
  if (ratio.notes) {
    notes.push(ratio.notes);
  }

  // Get liquid adjustment description for target method
  const liquidAdj = getLiquidAdjustmentFromTo(from, to);

  // Calculate new liquid amount if provided
  let newLiquidCups: number | undefined;
  if (liquidCups !== undefined) {
    newLiquidCups = Math.round(liquidCups * ratio.liquidFactor * 10) / 10;

    // Instant Pot minimum check
    if (to === "instant_pot" && newLiquidCups < 1) {
      newLiquidCups = 1;
      notes.push("Instant Pot requires minimum 1 cup of liquid to pressurize");
    }
  }

  // Get oven temp if converting to oven
  let tempF: number | undefined;
  if (to === "oven") {
    tempF = 325;
    notes.push("Use 325°F (165°C) for low, slow braising");
  }

  return {
    timeMin,
    timeMax,
    liquidCups: newLiquidCups,
    liquidAdjustment: liquidAdj,
    notes,
    tempF,
  };
}

function getLiquidAdjustmentFromTo(from: CookingMethodType, to: CookingMethodType): string {
  const ratio = conversionRatios.find((r) => r.from === from && r.to === to);
  if (!ratio) return "Adjust as needed";

  const factor = ratio.liquidFactor;
  if (factor === 1) return "Keep the same amount";
  if (factor > 1) return `Increase liquid by ~${Math.round((factor - 1) * 100)}%`;
  return `Reduce liquid by ~${Math.round((1 - factor) * 100)}%`;
}

// Get warnings for food type in slow cooker
export function getFoodTypeWarnings(foodType: FoodType, to: CookingMethodType): string[] {
  const warnings: string[] = [];

  if (to === "slow_cooker_low" || to === "slow_cooker_high") {
    if (foodType === "pasta") {
      warnings.push("Pasta goes mushy during long slow cooking. Add it in the last 20-30 minutes on HIGH, or cook separately.");
    }
  }

  return warnings;
}

// Format time nicely
export function formatTime(minutes: number): string {
  if (minutes < 60) {
    return `${Math.round(minutes)} min`;
  }

  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);

  if (mins === 0) {
    return `${hours} hr${hours > 1 ? "s" : ""}`;
  }

  if (mins < 5) {
    return `${hours} hr${hours > 1 ? "s" : ""}`;
  }

  return `${hours} hr${hours > 1 ? "s" : ""} ${mins} min`;
}

// Preset conversions for quick buttons
export interface PresetConversion {
  label: string;
  from: CookingMethodType;
  to: CookingMethodType;
  timeMinutes: number;
}

export const presetConversions: PresetConversion[] = [
  { label: "8 hrs LOW → Oven", from: "slow_cooker_low", to: "oven", timeMinutes: 480 },
  { label: "4 hrs HIGH → Instant Pot", from: "slow_cooker_high", to: "instant_pot", timeMinutes: 240 },
  { label: "Oven 2 hrs → Slow Cooker", from: "oven", to: "slow_cooker_low", timeMinutes: 120 },
  { label: "Instant Pot 30 min → Slow Cooker", from: "instant_pot", to: "slow_cooker_low", timeMinutes: 30 },
];

// Tips based on conversion type
export function getConversionTips(from: CookingMethodType, to: CookingMethodType): string[] {
  const tips: string[] = [];

  if (to === "slow_cooker_low" || to === "slow_cooker_high") {
    tips.push("Sear meat on the stovetop before adding to slow cooker for better flavor.");
    tips.push("Put dense root vegetables on the bottom, closest to the heat.");
    tips.push("Don't lift the lid during cooking — each peek adds 15-20 minutes.");
  }

  if (from === "slow_cooker_low" || from === "slow_cooker_high") {
    if (to === "oven") {
      tips.push("Use a Dutch oven or covered pot to retain moisture.");
      tips.push("You can brown the meat first for better flavor — the slow cooker can't do this.");
    }
    if (to === "instant_pot") {
      tips.push("Use the Sauté function to brown meat before pressure cooking.");
      tips.push("Natural release is important for tender meat — don't quick release.");
    }
  }

  if (to === "oven" && from !== "oven") {
    tips.push("Check food 15-20 minutes before expected done time.");
  }

  return tips;
}
