// Ingredient nutrition for /recipe-macro-calculator. research/data-sources.csv row USDA-FDC-SR: USDA FoodData Central, SR Legacy foods,
// values per 100 g and household measures as FoodData Central serves them (read 2026-11-19).
// Snapshot: research/sources/macros.json · check: scripts/check-macros-data.mjs

export const FDC_FOOD = (id: number) => `https://fdc.nal.usda.gov/food-details/${id}/nutrients`;
export const SRC_FDC = "https://fdc.nal.usda.gov/";

export type Food = {
  key: string;
  name: string;
  /** FoodData Central SR Legacy ID and description */
  fdc: number;
  desc: string;
  /** per 100 g: kcal, protein g, carbohydrate (by difference) g, fat g, dietary fiber g */
  kcal: number;
  p: number;
  c: number;
  f: number;
  fib: number;
  /** household measures from FoodData Central: label, grams */
  m: [string, number][];
};

export const FOODS: Food[] = [
  { key: "flour", name: "All-purpose flour", fdc: 168894, desc: "Wheat flour, white, all-purpose, enriched, bleached", kcal: 364, p: 10.3, c: 76.3, f: 0.98, fib: 2.7, m: [["cup", 125]] },
  { key: "sugar", name: "Granulated sugar", fdc: 169655, desc: "Sugars, granulated", kcal: 387, p: 0, c: 100, f: 0, fib: 0, m: [["cup", 200], ["tsp", 4.2]] },
  { key: "butter", name: "Butter, salted", fdc: 173410, desc: "Butter, salted", kcal: 717, p: 0.85, c: 0.06, f: 81.1, fib: 0, m: [["tbsp", 14.2], ["stick", 113], ["cup", 227]] },
  { key: "olive-oil", name: "Olive oil", fdc: 171413, desc: "Oil, olive, salad or cooking", kcal: 884, p: 0, c: 0, f: 100, fib: 0, m: [["tbsp", 13.5], ["tsp", 4.5], ["cup", 216]] },
  { key: "egg", name: "Egg, whole", fdc: 171287, desc: "Egg, whole, raw, fresh", kcal: 143, p: 12.6, c: 0.72, f: 9.51, fib: 0, m: [["large egg", 50], ["medium egg", 44], ["extra large egg", 56]] },
  { key: "milk", name: "Whole milk", fdc: 171265, desc: "Milk, whole, 3.25% milkfat, with added vitamin D", kcal: 61, p: 3.15, c: 4.8, f: 3.25, fib: 0, m: [["cup", 244], ["tbsp", 15]] },
  { key: "cream", name: "Heavy whipping cream", fdc: 170859, desc: "Cream, fluid, heavy whipping", kcal: 340, p: 2.84, c: 2.84, f: 36.1, fib: 0, m: [["cup", 238], ["tbsp", 15]] },
  { key: "cheddar", name: "Cheddar cheese", fdc: 170899, desc: "Cheese, cheddar, sharp, sliced", kcal: 410, p: 24.2, c: 2.13, f: 33.8, fib: 0, m: [["1-oz slice", 28]] },
  { key: "chicken", name: "Chicken breast, raw", fdc: 171077, desc: "Chicken, broiler or fryers, breast, skinless, boneless, meat only, raw", kcal: 120, p: 22.5, c: 0, f: 2.62, fib: 0, m: [["4 oz", 113]] },
  { key: "beef", name: "Ground beef 85% lean, raw", fdc: 171796, desc: "Beef, ground, 85% lean meat / 15% fat, raw", kcal: 215, p: 18.6, c: 0, f: 15, fib: 0, m: [["4 oz", 113]] },
  { key: "salmon", name: "Salmon, Atlantic farmed, raw", fdc: 175167, desc: "Fish, salmon, Atlantic, farmed, raw", kcal: 208, p: 20.4, c: 0, f: 13.4, fib: 0, m: [["3 oz", 85]] },
  { key: "rice", name: "White rice, long-grain, dry", fdc: 168877, desc: "Rice, white, long-grain, regular, raw, enriched", kcal: 365, p: 7.13, c: 80, f: 0.66, fib: 1.3, m: [["cup", 185]] },
  { key: "pasta", name: "Pasta, dry", fdc: 169736, desc: "Pasta, dry, enriched", kcal: 371, p: 13, c: 74.7, f: 1.51, fib: 3.2, m: [["2 oz", 57]] },
  { key: "oats", name: "Rolled oats, dry", fdc: 173904, desc: "Cereals, oats, regular and quick, not fortified, dry", kcal: 379, p: 13.2, c: 67.7, f: 6.52, fib: 10.1, m: [["cup", 81]] },
  { key: "onion", name: "Onion, raw", fdc: 170000, desc: "Onions, raw", kcal: 40, p: 1.1, c: 9.34, f: 0.1, fib: 1.7, m: [["medium onion", 110], ["cup chopped", 160]] },
  { key: "garlic", name: "Garlic, raw", fdc: 169230, desc: "Garlic, raw", kcal: 149, p: 6.36, c: 33.1, f: 0.5, fib: 2.1, m: [["clove", 3]] },
  { key: "tomato", name: "Tomato, raw", fdc: 170457, desc: "Tomatoes, red, ripe, raw, year round average", kcal: 18, p: 0.88, c: 3.89, f: 0.2, fib: 1.2, m: [["medium tomato", 123], ["cup chopped", 180]] },
  { key: "carrot", name: "Carrot, raw", fdc: 170393, desc: "Carrots, raw", kcal: 41, p: 0.93, c: 9.58, f: 0.24, fib: 2.8, m: [["medium carrot", 61], ["cup chopped", 128]] },
  { key: "potato", name: "Potato, raw", fdc: 170026, desc: "Potatoes, flesh and skin, raw", kcal: 77, p: 2.05, c: 17.5, f: 0.09, fib: 2.1, m: [["medium potato", 213]] },
  { key: "broccoli", name: "Broccoli, raw", fdc: 170379, desc: "Broccoli, raw", kcal: 34, p: 2.82, c: 6.64, f: 0.37, fib: 2.6, m: [["cup chopped", 91]] },
  { key: "banana", name: "Banana, raw", fdc: 173944, desc: "Bananas, raw", kcal: 89, p: 1.09, c: 22.8, f: 0.33, fib: 2.6, m: [["medium banana", 118], ["cup mashed", 225]] },
  { key: "honey", name: "Honey", fdc: 169640, desc: "Honey", kcal: 304, p: 0.3, c: 82.4, f: 0, fib: 0.2, m: [["tbsp", 21], ["cup", 339]] },
  { key: "almonds", name: "Almonds", fdc: 170567, desc: "Nuts, almonds", kcal: 579, p: 21.2, c: 21.6, f: 49.9, fib: 12.5, m: [["oz", 28.35], ["cup whole", 143]] },
];

export type Macros = { kcal: number; p: number; c: number; f: number; fib: number };

/** a food's macros for a weight in grams: value per 100 g × grams ÷ 100 */
export const macrosFor = (food: Pick<Food, "kcal" | "p" | "c" | "f" | "fib">, grams: number): Macros => ({
  kcal: (food.kcal * grams) / 100,
  p: (food.p * grams) / 100,
  c: (food.c * grams) / 100,
  f: (food.f * grams) / 100,
  fib: (food.fib * grams) / 100,
});

export const sumMacros = (xs: Macros[]): Macros =>
  xs.reduce((a, x) => ({ kcal: a.kcal + x.kcal, p: a.p + x.p, c: a.c + x.c, f: a.f + x.f, fib: a.fib + x.fib }), { kcal: 0, p: 0, c: 0, f: 0, fib: 0 });

/** sample recipe: chicken, rice and broccoli for four (food key, amount, unit) */
export const SAMPLE: { key: string; amount: string; unit: string }[] = [
  { key: "chicken", amount: "450", unit: "g" },
  { key: "rice", amount: "1", unit: "cup" },
  { key: "broccoli", amount: "2", unit: "cup chopped" },
  { key: "olive-oil", amount: "2", unit: "tbsp" },
  { key: "garlic", amount: "2", unit: "clove" },
];
export const SAMPLE_SERVINGS = 4;

export const grams = (food: Food | undefined, amount: number, unit: string) => {
  if (unit === "g") return amount;
  const m = food?.m.find(([label]) => label === unit);
  return m ? amount * m[1] : null;
};

export const r1 = (x: number) => (Math.round(x * 10) / 10).toString();
export const r0 = (x: number) => Math.round(x).toLocaleString("en-US");
