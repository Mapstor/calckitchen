// Coffee brewing figures for /coffee-ratio-calculator. research/data-sources.csv rows:
//   SCA-310: Specialty Coffee Association, SCA Standard 310-2021 Home Coffee Brewers: brew ratio 55 g of coffee per 1.000 kg of fresh
//     water; brewing temperature 90 to 96°C; target brew strength 1.15-1.55% TDS.
//   NCA-BREW: National Coffee Association USA, About Coffee brewing guides: drip 1 to 2 tablespoons of ground coffee per 6 ounces of
//     water (the "Golden Ratio"); pour-over 1:13 to 1:16; French press 1:10 to 1:16; both at 93 ± 3°C; cold brew 1:4 to 1:5, steeped
//     12 hours or overnight; espresso 1:2 (dry coffee to liquid espresso).
//   USDA-FDC-SR: water, tap, drinking (173647): 1 liter = 1000 g. NIST-SI-B9: US fluid ounce and cup (units.ts).
// Snapshot: research/sources/coffee.json · check: scripts/check-coffee-data.mjs
import { UNITS } from "./units";

export const SRC_COFFEE = {
  sca: "https://sca.coffee/s/SCA_Standard_310-2021.pdf",
  drip: "https://www.aboutcoffee.org/brewing/drip-coffee/",
  pourover: "https://www.aboutcoffee.org/brewing/pour-over-coffee/",
  frenchpress: "https://www.aboutcoffee.org/brewing/french-press-coffee/",
  coldbrew: "https://www.aboutcoffee.org/brewing/cold-brew-coffee/",
  espresso: "https://www.aboutcoffee.org/brewing/espresso/",
  water: "https://fdc.nal.usda.gov/food-details/173647/nutrients",
};

/** SCA Standard 310-2021: grams of coffee per 1.000 kg of water; brewing temperature, °C */
export const SCA = { gPerKg: 55, tempLoC: 90, tempHiC: 96 };
/** NCA drip "Golden Ratio": tablespoons of ground coffee per 6 fl oz of water */
export const NCA = { tbspLo: 1, tbspHi: 2, perFlOz: 6 };
/** NCA brewing temperature for pour-over and French press: 93 ± 3°C */
export const NCA_TEMP = { c: 93, plusMinus: 3 };

export type Method = { key: string; name: string; lo: number; hi: number; by: string };
/** 1 : lo to 1 : hi, grams of water per gram of coffee (espresso: grams of liquid espresso per gram of dry coffee) */
export const METHODS: Method[] = [
  { key: "drip", name: "Drip machine", lo: 1000 / SCA.gPerKg, hi: 1000 / SCA.gPerKg, by: "SCA" },
  { key: "pourover", name: "Pour-over", lo: 13, hi: 16, by: "NCA" },
  { key: "frenchpress", name: "French press", lo: 10, hi: 16, by: "NCA" },
  { key: "coldbrew", name: "Cold brew", lo: 4, hi: 5, by: "NCA" },
  { key: "espresso", name: "Espresso", lo: 2, hi: 2, by: "NCA" },
];
export const COLD_BREW_HOURS = 12;
/** USDA FoodData Central 173647: 1 liter of water = 1000 g */
export const WATER_G_PER_L = 1000;

export const ML_PER_FLOZ = UNITS["fl oz"].base;
export const ML_PER_CUP = UNITS.cup.base;

export type WaterUnit = "ml" | "l" | "floz" | "cup";
export const WATER_UNITS: { key: WaterUnit; label: string; ml: number }[] = [
  { key: "ml", label: "mL", ml: 1 },
  { key: "l", label: "liters", ml: 1000 },
  { key: "floz", label: "fl oz", ml: ML_PER_FLOZ },
  { key: "cup", label: "US cups (8 fl oz)", ml: ML_PER_CUP },
];

/** grams of water in mL, by USDA's 1000 g per liter */
export const waterGrams = (ml: number) => (ml * WATER_G_PER_L) / 1000;
/** grams of coffee for a water weight at 1 : ratio */
export const coffeeFor = (waterG: number, ratio: number) => waterG / ratio;
/** the SCA standard as 1 : n */
export const SCA_RATIO = 1000 / SCA.gPerKg;
/** NCA tablespoon range for a water volume */
export const ncaTbsp = (ml: number) => {
  const flOz = ml / ML_PER_FLOZ;
  return { lo: (flOz / NCA.perFlOz) * NCA.tbspLo, hi: (flOz / NCA.perFlOz) * NCA.tbspHi };
};

export const d1 = (x: number) => (Math.round(x * 10) / 10).toString();
/** "1:13–1:16" or "1:18.2" */
export const ratioText = (m: Method) => (m.lo === m.hi ? `1:${d1(m.lo)}` : `1:${d1(m.lo)}–1:${d1(m.hi)}`);
/** grams of coffee for grams of water: low end at the larger ratio */
export const coffeeRange = (waterG: number, m: Method) => ({ lo: waterG / m.hi, hi: waterG / m.lo });
