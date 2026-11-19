// Party food amounts for /party-food-calculator: the federal reference amounts customarily consumed per eating occasion (RACC).
// research/data-sources.csv rows:
//   FDA-RACC: 21 CFR 101.12(b) Table 2, general food supply (eCFR, read 2026-11-19).
//   FSIS-RACC: 9 CFR 317.312 (meat) and 9 CFR 381.412 (poultry): cuts without sauce 85 g ready-to-serve, 114 g ready-to-cook.
// Footnote 1 of the FDA table: the amounts are the edible portion customarily consumed per eating occasion, from USDA's 1977-78 and
// 1987-88 Nationwide Food Consumption Surveys, updated with CDC NHANES 2003-2008.
// Snapshot: research/sources/party.json · check: scripts/check-party-data.mjs
import { UNITS } from "./units";

export const SRC_PARTY = {
  fda: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-B/part-101/subpart-A/section-101.12",
  meat: "https://www.ecfr.gov/current/title-9/chapter-III/subchapter-A/part-317/subpart-B/section-317.312",
  poultry: "https://www.ecfr.gov/current/title-9/chapter-III/subchapter-A/part-381/subpart-Y/section-381.412",
};

export type Unit = "g" | "tbsp" | "cup" | "drink";
export type PartyItem = { key: string; name: string; amount: number; unit: Unit; per: string; src: "fda" | "fsis" };

/** reference amount per guest per serving; per = how it reads per guest */
export const ITEMS: PartyItem[] = [
  { key: "meat", name: "Meat or poultry, boneless cuts (raw)", amount: 114, unit: "g", per: "114 g (4 oz) raw, 85 g (3 oz) cooked", src: "fsis" },
  { key: "bbq", name: "Barbecued meat in sauce", amount: 140, unit: "g", per: "140 g", src: "fsis" },
  { key: "hotdogs", name: "Hot dogs and sausages (cooked)", amount: 55, unit: "g", per: "55 g", src: "fsis" },
  { key: "casserole", name: "Casserole, mac and cheese, stew", amount: 1, unit: "cup", per: "1 cup", src: "fda" },
  { key: "pizza", name: "Pizza or sandwiches", amount: 140, unit: "g", per: "140 g", src: "fda" },
  { key: "potatoes", name: "Potatoes, fresh", amount: 110, unit: "g", per: "110 g", src: "fda" },
  { key: "pasta", name: "Pasta, dry", amount: 55, unit: "g", per: "55 g dry (140 g cooked)", src: "fda" },
  { key: "rice", name: "Rice, dry", amount: 45, unit: "g", per: "45 g dry (140 g cooked)", src: "fda" },
  { key: "veg", name: "Vegetables, fresh or frozen", amount: 85, unit: "g", per: "85 g", src: "fda" },
  { key: "pasta-salad", name: "Pasta or potato salad", amount: 140, unit: "g", per: "140 g", src: "fda" },
  { key: "salad", name: "Other salads (vegetable, fruit, bean)", amount: 100, unit: "g", per: "100 g", src: "fda" },
  { key: "fruit", name: "Fresh fruit", amount: 140, unit: "g", per: "140 g", src: "fda" },
  { key: "bread", name: "Bread or rolls", amount: 50, unit: "g", per: "50 g", src: "fda" },
  { key: "chips", name: "Chips, pretzels, popcorn", amount: 30, unit: "g", per: "30 g", src: "fda" },
  { key: "dip", name: "Dips and salsa", amount: 2, unit: "tbsp", per: "2 tbsp", src: "fda" },
  { key: "cheese", name: "Cheese", amount: 30, unit: "g", per: "30 g", src: "fda" },
  { key: "cake", name: "Cake, iced layer or cupcakes", amount: 80, unit: "g", per: "80 g", src: "fda" },
  { key: "cheesecake", name: "Cheesecake", amount: 125, unit: "g", per: "125 g", src: "fda" },
  { key: "pie", name: "Pie or cobbler", amount: 125, unit: "g", per: "125 g", src: "fda" },
  { key: "cookies", name: "Cookies", amount: 30, unit: "g", per: "30 g", src: "fda" },
  { key: "ice-cream", name: "Ice cream", amount: 2 / 3, unit: "cup", per: "⅔ cup", src: "fda" },
  { key: "drinks", name: "Soft drinks or water", amount: 1, unit: "drink", per: "12 fl oz (360 mL)", src: "fda" },
];

/** FSIS ready-to-serve amount for the same cuts, grams */
export const MEAT_COOKED_G = 85;
export const DRINK_ML = 360;

export const DEFAULT_ON = ["meat", "potatoes", "veg", "salad", "bread", "chips", "dip", "cake", "drinks"];

const LB_G = UNITS.lb.base;
const TBSP_PER_CUP = Math.round(UNITS.cup.base / UNITS.tbsp.base);

const d = (x: number, dp: number) => (Math.round(x * 10 ** dp) / 10 ** dp).toString();

/** total for an item, as text: pounds and kilograms for weights, cups and quarts or gallons for volumes, drinks and liters */
export function totalText(item: PartyItem, servings: number): string {
  const n = item.amount * servings;
  if (item.unit === "g") return `${d(n / LB_G, n / LB_G < 10 ? 2 : 1)} lb (${d(n / 1000, 2)} kg)`;
  if (item.unit === "drink") return `${d(n, 0)} drinks (${d((n * DRINK_ML) / 1000, 1)} L)`;
  const cups = item.unit === "tbsp" ? n / TBSP_PER_CUP : n;
  if (cups >= 16) return `${d(cups, 1)} cups (${d(cups / 16, 2)} gal)`;
  if (cups >= 4) return `${d(cups, 1)} cups (${d(cups / 4, 2)} qt)`;
  return `${d(cups, 2)} cups`;
}

export const lbOf = (g: number) => g / LB_G;
