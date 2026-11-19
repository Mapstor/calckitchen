// Meat, poultry, seafood and egg temperatures. Every figure traces to research/data-sources.csv.
// USDA: FoodSafety.gov "Safe Minimum Internal Temperature Chart for Cooking" (date last reviewed 2024-11-21).
// Beef doneness: Beef Checkoff, "Determining Doneness" (BeefItsWhatsForDinner.com).
// Cook's doneness ladder: America's Test Kitchen (Cook's Country), "Doneness Temperatures for Beef and Lamb".
// Checked by scripts/check-meat-data.mjs against research/sources/meat-temps.json.

export type Group = "beef" | "pork" | "poultry" | "ground" | "seafood" | "ham" | "eggs";

export type SafeRow = {
  id: string;
  /** button label */
  short: string;
  group: Group;
  food: string;
  cut: string;
  /** °F; null when the USDA test is visual (seafood, raw eggs) */
  f: number | null;
  /** °C as the chart prints it */
  c: number | null;
  restMin: number;
  /** what to check instead of, or as well as, a temperature */
  note: string;
};

export const SAFE: SafeRow[] = [
  { id: "beef-whole", short: "Steaks, roasts, chops", group: "beef", food: "Beef, bison, veal, goat and lamb", cut: "Steaks, roasts, chops", f: 145, c: 63, restMin: 3, note: "" },
  { id: "beef-ground", short: "Beef, lamb, veal, goat, bison", group: "ground", food: "Beef, bison, veal, goat and lamb", cut: "Ground meat and sausage", f: 160, c: 71, restMin: 0, note: "" },
  { id: "pork-whole", short: "Steaks, roasts, chops", group: "pork", food: "Pork", cut: "Steaks, roasts, chops", f: 145, c: 63, restMin: 3, note: "" },
  { id: "pork-ground", short: "Pork", group: "ground", food: "Pork", cut: "Ground meat and sausage", f: 160, c: 71, restMin: 0, note: "" },
  { id: "poultry", short: "All poultry", group: "poultry", food: "Chicken, turkey and other poultry", cut: "All: whole bird, breasts, legs, thighs, wings, ground poultry, giblets, sausage, stuffing inside poultry", f: 165, c: 74, restMin: 0, note: "" },
  { id: "game", short: "Rabbit and venison", group: "ground", food: "Rabbit and venison", cut: "Wild or farm-raised", f: 160, c: 71, restMin: 0, note: "" },
  { id: "ham-raw", short: "Raw ham", group: "ham", food: "Ham", cut: "Raw ham", f: 145, c: 63, restMin: 3, note: "" },
  { id: "ham-precooked", short: "Precooked ham, to reheat", group: "ham", food: "Ham", cut: "Precooked ham, to reheat", f: 165, c: 74, restMin: 0, note: "Ham packaged in a USDA-inspected plant: 140°F (60°C)." },
  { id: "fish", short: "Fish", group: "seafood", food: "Fish", cut: "Whole or fillet: salmon, tuna, tilapia, pollock, bass, cod, catfish, trout", f: 145, c: 63, restMin: 0, note: "Or cook until the flesh is no longer translucent and separates easily with a fork." },
  { id: "shellfish", short: "Shrimp, lobster, crab, scallops", group: "seafood", food: "Shrimp, lobster, crab and scallops", cut: "", f: null, c: null, restMin: 0, note: "Cook until the flesh is pearly or white, and opaque." },
  { id: "mollusks", short: "Clams, oysters, mussels", group: "seafood", food: "Clams, oysters and mussels", cut: "", f: null, c: null, restMin: 0, note: "Cook until the shells open during cooking." },
  { id: "eggs", short: "Raw eggs", group: "eggs", food: "Eggs", cut: "Raw eggs", f: null, c: null, restMin: 0, note: "Cook until the yolk and white are firm." },
  { id: "egg-dishes", short: "Egg dishes", group: "eggs", food: "Egg dishes", cut: "Frittata, quiche", f: 160, c: 71, restMin: 0, note: "" },
  { id: "casseroles", short: "Casseroles", group: "eggs", food: "Casseroles", cut: "Meat or meatless", f: 165, c: 74, restMin: 0, note: "" },
  { id: "leftovers", short: "Leftovers", group: "eggs", food: "Leftovers", cut: "Any type", f: 165, c: 74, restMin: 0, note: "" },
];

export const HAM_USDA_PLANT = { f: 140, c: 60 };

export const GROUPS: { key: Group; label: string }[] = [
  { key: "beef", label: "Beef & lamb" },
  { key: "pork", label: "Pork" },
  { key: "poultry", label: "Poultry" },
  { key: "ground", label: "Ground meat" },
  { key: "seafood", label: "Fish & seafood" },
  { key: "ham", label: "Ham" },
  { key: "eggs", label: "Eggs & leftovers" },
];

/** Beef Checkoff: medium-rare 145°F with a rest of at least 3 minutes, medium 160°F, well done 170°F; ground beef 160°F. */
export const CHECKOFF = { mediumRare: 145, medium: 160, wellDone: 170, ground: 160, restMin: 3 };

/** America's Test Kitchen, beef and lamb: take it off the heat at [pullLo, pullHi], serve at [serveLo, serveHi] (°F). */
export const ATK = [
  { level: "Rare", pullLo: 110, pullHi: 115, serveLo: 120, serveHi: 120 },
  { level: "Medium-rare", pullLo: 115, pullHi: 120, serveLo: 125, serveHi: 130 },
  { level: "Medium", pullLo: 125, pullHi: 130, serveLo: 135, serveHi: 140 },
  { level: "Medium-well", pullLo: 135, pullHi: 140, serveLo: 145, serveHi: 150 },
  { level: "Well-done", pullLo: 145, pullHi: 150, serveLo: 155, serveHi: 160 },
];
/** ATK: the temperature keeps rising 5 to 15 degrees while the meat rests; steaks rise less than roasts. */
export const ATK_RISE = { lo: 5, hi: 15 };

export const SRC_MEAT = {
  usda: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures",
  checkoff: "https://www.beefitswhatsfordinner.com/cooking/determining-doneness",
  atk: "https://www.cookscountry.com/how_tos/6064-doneness-temperatures-for-beef-and-lamb",
  placement: "https://www.usda.gov/node/54790",
};
