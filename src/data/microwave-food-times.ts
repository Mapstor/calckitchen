export type FoodCategory =
  | "potatoes"
  | "vegetables"
  | "grains-eggs"
  | "quick-tasks";

export interface MicrowaveFood {
  key: string;
  label: string;
  category: FoodCategory;
  baseTimeMinLow: number; // in minutes, at 1000W
  baseTimeMinHigh: number;
  powerLevel: number; // percentage (100, 70, 50, 30)
  quantityUnit: string;
  defaultQuantity: number;
  quantityScaleFactor: number; // additional time per extra unit (in minutes)
  maxQuantity: number;
  tips: string;
  safetyNote?: string;
}

export const foodCategories: { key: FoodCategory; label: string }[] = [
  { key: "potatoes", label: "Potatoes & Root Vegetables" },
  { key: "vegetables", label: "Vegetables" },
  { key: "grains-eggs", label: "Grains, Eggs & Breakfast" },
  { key: "quick-tasks", label: "Quick Tasks" },
];

export const microwaveFoods: MicrowaveFood[] = [
  // Potatoes & Root Vegetables
  {
    key: "baked-potato-medium",
    label: "Baked Potato (medium, ~7 oz)",
    category: "potatoes",
    baseTimeMinLow: 5,
    baseTimeMinHigh: 7,
    powerLevel: 100,
    quantityUnit: "potato",
    defaultQuantity: 1,
    quantityScaleFactor: 3.5,
    maxQuantity: 4,
    tips: "Pierce skin 6–8 times with a fork. Flip halfway. Let stand 2 min.",
  },
  {
    key: "baked-potato-large",
    label: "Baked Potato (large, ~10 oz)",
    category: "potatoes",
    baseTimeMinLow: 8,
    baseTimeMinHigh: 10,
    powerLevel: 100,
    quantityUnit: "potato",
    defaultQuantity: 1,
    quantityScaleFactor: 3.5,
    maxQuantity: 4,
    tips: "Pierce skin. Flip halfway. Add 2–3 min per extra potato.",
  },
  {
    key: "sweet-potato-medium",
    label: "Sweet Potato (medium)",
    category: "potatoes",
    baseTimeMinLow: 5,
    baseTimeMinHigh: 8,
    powerLevel: 100,
    quantityUnit: "potato",
    defaultQuantity: 1,
    quantityScaleFactor: 3,
    maxQuantity: 4,
    tips: "Pierce skin. Flip halfway. Wrap in damp paper towel for softer skin.",
  },
  {
    key: "jacket-potato",
    label: "Jacket Potato",
    category: "potatoes",
    baseTimeMinLow: 6,
    baseTimeMinHigh: 8,
    powerLevel: 100,
    quantityUnit: "potato",
    defaultQuantity: 1,
    quantityScaleFactor: 3.5,
    maxQuantity: 4,
    tips: "Same as baked potato. Pierce, flip, stand.",
  },

  // Vegetables
  {
    key: "corn-on-cob",
    label: "Corn on the Cob",
    category: "vegetables",
    baseTimeMinLow: 2,
    baseTimeMinHigh: 4,
    powerLevel: 100,
    quantityUnit: "ear",
    defaultQuantity: 1,
    quantityScaleFactor: 2,
    maxQuantity: 6,
    tips: "Leave in husk, or wrap in damp paper towel.",
  },
  {
    key: "broccoli-fresh",
    label: "Fresh Broccoli (1 cup florets)",
    category: "vegetables",
    baseTimeMinLow: 2,
    baseTimeMinHigh: 4,
    powerLevel: 100,
    quantityUnit: "cup",
    defaultQuantity: 1,
    quantityScaleFactor: 1.5,
    maxQuantity: 4,
    tips: "Add 2 tbsp water, cover with microwave-safe lid or plate.",
  },
  {
    key: "green-beans-fresh",
    label: "Fresh Green Beans (1 cup)",
    category: "vegetables",
    baseTimeMinLow: 3,
    baseTimeMinHigh: 5,
    powerLevel: 100,
    quantityUnit: "cup",
    defaultQuantity: 1,
    quantityScaleFactor: 1.5,
    maxQuantity: 4,
    tips: "Add 2 tbsp water, cover.",
  },
  {
    key: "frozen-vegetables",
    label: "Frozen Vegetables",
    category: "vegetables",
    baseTimeMinLow: 3,
    baseTimeMinHigh: 5,
    powerLevel: 100,
    quantityUnit: "cup",
    defaultQuantity: 1,
    quantityScaleFactor: 1.5,
    maxQuantity: 4,
    tips: "Add 1 tbsp water, cover. No need to thaw first.",
  },
  {
    key: "asparagus",
    label: "Asparagus (1 bunch)",
    category: "vegetables",
    baseTimeMinLow: 3,
    baseTimeMinHigh: 5,
    powerLevel: 100,
    quantityUnit: "bunch",
    defaultQuantity: 1,
    quantityScaleFactor: 2,
    maxQuantity: 2,
    tips: "Add 2 tbsp water, cover. Thicker stalks need more time.",
  },
  {
    key: "cauliflower",
    label: "Cauliflower (1 head, cut into florets)",
    category: "vegetables",
    baseTimeMinLow: 5,
    baseTimeMinHigh: 7,
    powerLevel: 100,
    quantityUnit: "head",
    defaultQuantity: 1,
    quantityScaleFactor: 3,
    maxQuantity: 2,
    tips: "Add 1/4 cup water, cover.",
  },
  {
    key: "spinach-fresh",
    label: "Fresh Spinach (4 cups)",
    category: "vegetables",
    baseTimeMinLow: 2,
    baseTimeMinHigh: 3,
    powerLevel: 100,
    quantityUnit: "cups",
    defaultQuantity: 4,
    quantityScaleFactor: 0.5,
    maxQuantity: 8,
    tips: "Add no water — leaves have enough moisture.",
  },
  {
    key: "peas-frozen",
    label: "Frozen Peas (1 cup)",
    category: "vegetables",
    baseTimeMinLow: 2,
    baseTimeMinHigh: 3,
    powerLevel: 100,
    quantityUnit: "cup",
    defaultQuantity: 1,
    quantityScaleFactor: 1,
    maxQuantity: 4,
    tips: "Add 1 tbsp water, cover.",
  },
  {
    key: "brussels-sprouts",
    label: "Brussels Sprouts (1 cup, halved)",
    category: "vegetables",
    baseTimeMinLow: 4,
    baseTimeMinHigh: 6,
    powerLevel: 100,
    quantityUnit: "cup",
    defaultQuantity: 1,
    quantityScaleFactor: 2,
    maxQuantity: 4,
    tips: "Add 2 tbsp water, cover.",
  },

  // Grains, Eggs & Breakfast
  {
    key: "rice",
    label: "Rice (1 cup dry + 2 cups water)",
    category: "grains-eggs",
    baseTimeMinLow: 12,
    baseTimeMinHigh: 15,
    powerLevel: 100, // Starts high, then medium
    quantityUnit: "cup dry",
    defaultQuantity: 1,
    quantityScaleFactor: 5,
    maxQuantity: 2,
    tips: "5 min on high to boil, then 7–10 min at 50% power. Let stand 5 min.",
  },
  {
    key: "oatmeal",
    label: "Oatmeal (1 serving)",
    category: "grains-eggs",
    baseTimeMinLow: 2,
    baseTimeMinHigh: 3,
    powerLevel: 100,
    quantityUnit: "serving",
    defaultQuantity: 1,
    quantityScaleFactor: 1.5,
    maxQuantity: 4,
    tips: "Use an oversized bowl — oatmeal boils over easily. Watch closely.",
  },
  {
    key: "scrambled-eggs",
    label: "Scrambled Eggs (2 eggs)",
    category: "grains-eggs",
    baseTimeMinLow: 1.5,
    baseTimeMinHigh: 2,
    powerLevel: 100,
    quantityUnit: "eggs",
    defaultQuantity: 2,
    quantityScaleFactor: 0.5,
    maxQuantity: 6,
    tips: "Stir every 30 seconds. Remove slightly underdone — they'll finish cooking.",
  },
  {
    key: "bacon",
    label: "Bacon",
    category: "grains-eggs",
    baseTimeMinLow: 3,
    baseTimeMinHigh: 4,
    powerLevel: 100,
    quantityUnit: "strips",
    defaultQuantity: 3,
    quantityScaleFactor: 0.5,
    maxQuantity: 12,
    tips: "Layer between paper towels on a microwave-safe plate. Don't overlap.",
  },

  // Quick Tasks
  {
    key: "melt-butter-tbsp",
    label: "Melt Butter (1 tbsp)",
    category: "quick-tasks",
    baseTimeMinLow: 0.25,
    baseTimeMinHigh: 0.33,
    powerLevel: 100,
    quantityUnit: "tbsp",
    defaultQuantity: 1,
    quantityScaleFactor: 0.15,
    maxQuantity: 4,
    tips: "Watch closely — goes from solid to splattered instantly.",
  },
  {
    key: "melt-butter-stick",
    label: "Melt Butter (1 stick / 1/2 cup)",
    category: "quick-tasks",
    baseTimeMinLow: 0.75,
    baseTimeMinHigh: 1,
    powerLevel: 50,
    quantityUnit: "stick",
    defaultQuantity: 1,
    quantityScaleFactor: 0.5,
    maxQuantity: 2,
    tips: "Use medium power for more control. Stir halfway.",
  },
  {
    key: "melt-chocolate",
    label: "Melt Chocolate (1 cup chips)",
    category: "quick-tasks",
    baseTimeMinLow: 1,
    baseTimeMinHigh: 2,
    powerLevel: 50,
    quantityUnit: "cup",
    defaultQuantity: 1,
    quantityScaleFactor: 0.5,
    maxQuantity: 3,
    tips: "Stir every 30 seconds. Remove when 80% melted — residual heat finishes the job.",
  },
  {
    key: "soften-cream-cheese",
    label: "Soften Cream Cheese (8 oz)",
    category: "quick-tasks",
    baseTimeMinLow: 0.5,
    baseTimeMinHigh: 0.75,
    powerLevel: 50,
    quantityUnit: "block",
    defaultQuantity: 1,
    quantityScaleFactor: 0.25,
    maxQuantity: 2,
    tips: "Remove wrapper. Check every 15 seconds.",
  },
  {
    key: "soften-butter",
    label: "Soften Butter (1 stick)",
    category: "quick-tasks",
    baseTimeMinLow: 0.17,
    baseTimeMinHigh: 0.25,
    powerLevel: 30,
    quantityUnit: "stick",
    defaultQuantity: 1,
    quantityScaleFactor: 0.1,
    maxQuantity: 2,
    tips: "Very easy to over-soften. Check after 10 sec.",
  },
  {
    key: "boil-water",
    label: "Boil Water (1 cup)",
    category: "quick-tasks",
    baseTimeMinLow: 1.5,
    baseTimeMinHigh: 3,
    powerLevel: 100,
    quantityUnit: "cup",
    defaultQuantity: 1,
    quantityScaleFactor: 1,
    maxQuantity: 4,
    tips: "Time varies dramatically by wattage. Use a microwave-safe mug.",
    safetyNote:
      "Be careful with superheated water. Place a wooden stir stick in the mug.",
  },
  {
    key: "warm-milk",
    label: "Warm Milk (1 cup)",
    category: "quick-tasks",
    baseTimeMinLow: 1,
    baseTimeMinHigh: 1.5,
    powerLevel: 70,
    quantityUnit: "cup",
    defaultQuantity: 1,
    quantityScaleFactor: 0.5,
    maxQuantity: 4,
    tips: "Stir after 45 seconds. Don't boil — it'll overflow.",
  },
  {
    key: "reheat-leftovers",
    label: "Reheat Leftovers (1 plate)",
    category: "quick-tasks",
    baseTimeMinLow: 2,
    baseTimeMinHigh: 3,
    powerLevel: 70,
    quantityUnit: "plate",
    defaultQuantity: 1,
    quantityScaleFactor: 1.5,
    maxQuantity: 2,
    tips: "Cover with damp paper towel. Stir halfway.",
  },
  {
    key: "reheat-pizza",
    label: "Reheat Pizza",
    category: "quick-tasks",
    baseTimeMinLow: 0.5,
    baseTimeMinHigh: 0.75,
    powerLevel: 100,
    quantityUnit: "slice",
    defaultQuantity: 1,
    quantityScaleFactor: 0.25,
    maxQuantity: 4,
    tips: "Place a cup of water in the microwave alongside the pizza to keep the crust from getting chewy.",
  },
  {
    key: "reheat-coffee",
    label: "Reheat Coffee/Tea (1 cup)",
    category: "quick-tasks",
    baseTimeMinLow: 0.75,
    baseTimeMinHigh: 1,
    powerLevel: 100,
    quantityUnit: "cup",
    defaultQuantity: 1,
    quantityScaleFactor: 0.5,
    maxQuantity: 2,
    tips: "Stir after heating.",
  },
  {
    key: "hot-dog",
    label: "Hot Dog",
    category: "quick-tasks",
    baseTimeMinLow: 0.75,
    baseTimeMinHigh: 1,
    powerLevel: 100,
    quantityUnit: "hot dog",
    defaultQuantity: 1,
    quantityScaleFactor: 0.5,
    maxQuantity: 6,
    tips: "Wrap in paper towel.",
  },
  {
    key: "frozen-dinner",
    label: "Frozen Dinner / Meal",
    category: "quick-tasks",
    baseTimeMinLow: 3,
    baseTimeMinHigh: 7,
    powerLevel: 100,
    quantityUnit: "meal",
    defaultQuantity: 1,
    quantityScaleFactor: 3,
    maxQuantity: 2,
    tips: "Vent cover, stir halfway. Follow package directions for best results.",
  },
  {
    key: "thaw-ground-meat",
    label: "Thaw Ground Meat (1 lb)",
    category: "quick-tasks",
    baseTimeMinLow: 7,
    baseTimeMinHigh: 8,
    powerLevel: 30,
    quantityUnit: "lb",
    defaultQuantity: 1,
    quantityScaleFactor: 4,
    maxQuantity: 3,
    tips: "Flip every 2 minutes. Cook immediately after thawing.",
  },
  {
    key: "toast-nuts",
    label: "Toast Nuts (1/2 cup)",
    category: "quick-tasks",
    baseTimeMinLow: 2,
    baseTimeMinHigh: 4,
    powerLevel: 100,
    quantityUnit: "half cup",
    defaultQuantity: 1,
    quantityScaleFactor: 1.5,
    maxQuantity: 2,
    tips: "Spread on a plate, stir every minute. They'll darken quickly at the end.",
  },
  {
    key: "dry-herbs",
    label: "Dry Fresh Herbs",
    category: "quick-tasks",
    baseTimeMinLow: 2,
    baseTimeMinHigh: 3,
    powerLevel: 100,
    quantityUnit: "bunch",
    defaultQuantity: 1,
    quantityScaleFactor: 1,
    maxQuantity: 2,
    tips: "Place between paper towels. Check every 30 seconds.",
  },
];

// Common microwave wattages
export const wattageOptions = [600, 700, 800, 900, 1000, 1100, 1200];

// Power level options
export const powerLevelOptions: { level: number; label: string }[] = [
  { level: 100, label: "High (100%)" },
  { level: 70, label: "Medium-High (70%)" },
  { level: 50, label: "Medium (50%)" },
  { level: 30, label: "Medium-Low (30%)" },
];

// Power level to approximate oven temp
export const powerLevelToOvenTemp: Record<number, { tempF: number; tempC: number; label: string }> = {
  100: { tempF: 425, tempC: 220, label: "425–500°F (220–260°C)" },
  70: { tempF: 350, tempC: 175, label: "350°F (175°C)" },
  50: { tempF: 300, tempC: 150, label: "300°F (150°C)" },
  30: { tempF: 225, tempC: 110, label: "225°F (110°C)" },
};

// Common oven temperature presets
export const ovenTempPresets = [325, 350, 375, 400, 425];

// Wattage conversion formula
export function convertForWattage(
  originalTimeMin: number,
  originalWattage: number,
  yourWattage: number
): number {
  return originalTimeMin * (originalWattage / yourWattage);
}

// Oven to microwave conversion
export function ovenToMicrowave(
  ovenTimeMin: number,
  microwaveWattage: number,
  powerLevelPercent: number
): number {
  // Base formula: divide by 4, adjust for wattage and power level
  return ovenTimeMin * 0.25 * (1000 / microwaveWattage) * (100 / powerLevelPercent);
}

// Microwave to oven conversion
export function microwaveToOven(
  microwaveTimeMin: number,
  microwaveWattage: number,
  powerLevelPercent: number
): number {
  // Base formula: multiply by 4, adjust for wattage and power level
  return microwaveTimeMin * 4 * (microwaveWattage / 1000) * (powerLevelPercent / 100);
}

// Format time as minutes and seconds
export function formatTimeMinSec(minutes: number): string {
  if (minutes < 1) {
    const seconds = Math.round(minutes * 60);
    return `${seconds} seconds`;
  }
  const mins = Math.floor(minutes);
  const secs = Math.round((minutes - mins) * 60);
  if (secs === 0) {
    return `${mins} min`;
  }
  return `${mins} min ${secs} sec`;
}

// Get food time adjusted for wattage
export function getFoodTime(
  food: MicrowaveFood,
  quantity: number,
  yourWattage: number
): { timeLow: number; timeHigh: number } {
  // Calculate base time for quantity
  const extraQuantity = Math.max(0, quantity - food.defaultQuantity);
  const baseLow = food.baseTimeMinLow + extraQuantity * food.quantityScaleFactor;
  const baseHigh = food.baseTimeMinHigh + extraQuantity * food.quantityScaleFactor;

  // Adjust for wattage (base times are at 1000W)
  const timeLow = baseLow * (1000 / yourWattage);
  const timeHigh = baseHigh * (1000 / yourWattage);

  return { timeLow, timeHigh };
}

// Get suggested oven temperature based on microwave power level
export function getSuggestedOvenTemp(powerLevel: number): number {
  const mapping = powerLevelToOvenTemp[powerLevel];
  return mapping ? mapping.tempF : 350;
}

// Get power level label
export function getPowerLevelLabel(level: number): string {
  const option = powerLevelOptions.find((o) => o.level === level);
  return option ? option.label : `${level}%`;
}
