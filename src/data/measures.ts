// Cooking measures for /cooking-measurement-converter. research/data-sources.csv rows:
//   NIST-SI-B9: US cup, tablespoon, teaspoon, fluid ounce, pint, quart, gallon, ounce, pound (units.ts holds the exact definitions).
//   USDA-FDC-SR: USDA FoodData Central SR Legacy household measures (grams per cup, tablespoon or teaspoon), read 2026-11-19.
// Snapshot: research/sources/measures.json · check: scripts/check-measures-data.mjs
import { UNITS } from "./units";

export const SRC_MEASURES = {
  fdc: "https://fdc.nal.usda.gov/",
  nist: "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9",
};
export const FDC_FOOD = (id: number) => `https://fdc.nal.usda.gov/food-details/${id}/nutrients`;

/** US volume units in mL (exact), weight units in g (exact) */
export const VOL: { key: string; label: string; ml: number }[] = [
  { key: "tsp", label: "teaspoons", ml: UNITS.tsp.base },
  { key: "tbsp", label: "tablespoons", ml: UNITS.tbsp.base },
  { key: "floz", label: "fluid ounces", ml: UNITS["fl oz"].base },
  { key: "cup", label: "cups", ml: UNITS.cup.base },
  { key: "pint", label: "pints", ml: UNITS.cup.base * 2 },
  { key: "quart", label: "quarts", ml: UNITS.qt.base },
  { key: "gallon", label: "gallons", ml: UNITS.gal.base },
  { key: "ml", label: "milliliters", ml: 1 },
  { key: "l", label: "liters", ml: 1000 },
];
export const MASS: { key: string; label: string; g: number }[] = [
  { key: "g", label: "grams", g: 1 },
  { key: "kg", label: "kilograms", g: 1000 },
  { key: "oz", label: "ounces", g: UNITS.oz.base },
  { key: "lb", label: "pounds", g: UNITS.lb.base },
];

export type Ingredient = { key: string; name: string; fdc: number; measure: string; g: number; per: "cup" | "tbsp" | "tsp" };

/** USDA FoodData Central household measure used for each ingredient: grams in one cup (or tablespoon or teaspoon) */
export const INGREDIENTS: Ingredient[] = [
  { key: "ap-flour", name: "All-purpose flour", fdc: 168894, measure: "1 cup", g: 125, per: "cup" },
  { key: "bread-flour", name: "Bread flour", fdc: 168896, measure: "1 cup", g: 137, per: "cup" },
  { key: "ww-flour", name: "Whole wheat flour", fdc: 168893, measure: "1 cup", g: 120, per: "cup" },
  { key: "sugar", name: "Granulated sugar", fdc: 169655, measure: "1 cup", g: 200, per: "cup" },
  { key: "brown-sugar", name: "Brown sugar, packed", fdc: 168833, measure: "1 cup packed", g: 220, per: "cup" },
  { key: "powdered-sugar", name: "Powdered sugar, unsifted", fdc: 169656, measure: "1 cup unsifted", g: 120, per: "cup" },
  { key: "butter", name: "Butter", fdc: 173410, measure: "1 cup", g: 227, per: "cup" },
  { key: "cocoa", name: "Cocoa powder, unsweetened", fdc: 169593, measure: "1 cup", g: 86, per: "cup" },
  { key: "cornstarch", name: "Cornstarch", fdc: 169698, measure: "1 cup", g: 128, per: "cup" },
  { key: "salt", name: "Table salt", fdc: 173468, measure: "1 cup", g: 292, per: "cup" },
  { key: "baking-soda", name: "Baking soda", fdc: 175040, measure: "1 tsp", g: 4.6, per: "tsp" },
  { key: "baking-powder", name: "Baking powder", fdc: 172803, measure: "1 tsp", g: 4.6, per: "tsp" },
  { key: "oats", name: "Rolled oats", fdc: 173904, measure: "1 cup", g: 81, per: "cup" },
  { key: "rice", name: "White rice, dry", fdc: 168877, measure: "1 cup", g: 185, per: "cup" },
  { key: "honey", name: "Honey", fdc: 169640, measure: "1 cup", g: 339, per: "cup" },
  { key: "maple", name: "Maple syrup", fdc: 169661, measure: "1 cup", g: 315, per: "cup" },
  { key: "olive-oil", name: "Olive oil", fdc: 171413, measure: "1 cup", g: 216, per: "cup" },
  { key: "canola-oil", name: "Canola oil", fdc: 172336, measure: "1 cup", g: 218, per: "cup" },
  { key: "milk", name: "Whole milk", fdc: 171265, measure: "1 cup", g: 244, per: "cup" },
  { key: "cream", name: "Heavy cream", fdc: 170859, measure: "1 cup, fluid", g: 238, per: "cup" },
  { key: "yogurt", name: "Plain whole-milk yogurt", fdc: 171284, measure: "1 cup (8 fl oz)", g: 245, per: "cup" },
  { key: "water", name: "Water", fdc: 173647, measure: "8 fl oz", g: 237, per: "cup" },
  { key: "peanut-butter", name: "Peanut butter, smooth", fdc: 172470, measure: "1 cup", g: 258, per: "cup" },
  { key: "chocolate-chips", name: "Semisweet chocolate chips", fdc: 167976, measure: "1 cup chips", g: 168, per: "cup" },
  { key: "almonds", name: "Almonds, whole", fdc: 170567, measure: "1 cup, whole", g: 143, per: "cup" },
];

const TSP_PER: Record<"cup" | "tbsp" | "tsp", number> = { cup: 48, tbsp: 3, tsp: 1 };

/** grams in one cup of an ingredient, from its USDA measure (cup = 16 tbsp = 48 tsp) */
export const gramsPerCup = (i: Ingredient) => (i.g * 48) / TSP_PER[i.per];

export const dec = (x: number, dp: number) => (Math.round(x * 10 ** dp) / 10 ** dp).toString();
/** grams: one decimal under 100, whole from 100 */
export const gtxt = (g: number) => (g < 100 ? dec(g, 1) : Math.round(g).toLocaleString("en-US"));
