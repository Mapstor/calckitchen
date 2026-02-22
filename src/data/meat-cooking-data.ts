export type MeatType =
  | "beef"
  | "pork"
  | "chicken"
  | "lamb"
  | "veal"
  | "ham"
  | "other-poultry";

export type DonenessLevel =
  | "rare"
  | "medium-rare"
  | "medium"
  | "medium-well"
  | "well-done";

export interface MeatCut {
  key: string;
  label: string;
  ovenTempF: number;
  minPerLbLow: number | null; // null means use totalTimeMin/Max instead
  minPerLbHigh: number | null;
  totalTimeMin?: number; // for cuts that don't scale by weight
  totalTimeMax?: number;
  targetTempF: number;
  hasBoneOption: boolean;
  defaultBoneIn: boolean;
  bonelessMinPerLbLow?: number;
  bonelessMinPerLbHigh?: number;
  hasDonenessOption: boolean;
  hasStuffedOption?: boolean;
  notes?: string;
  specialTarget?: string; // for brisket/pulled pork that target 200F
}

export interface DonenessTemp {
  level: DonenessLevel;
  label: string;
  internalTempF: number;
  pullTempF: number;
  description: string;
}

export const donenessLevels: DonenessTemp[] = [
  {
    level: "rare",
    label: "Rare",
    internalTempF: 125,
    pullTempF: 120,
    description: "Red, cool-to-warm center, soft and juicy",
  },
  {
    level: "medium-rare",
    label: "Medium Rare",
    internalTempF: 135,
    pullTempF: 130,
    description: "Warm red center, pink edges, very juicy",
  },
  {
    level: "medium",
    label: "Medium",
    internalTempF: 145,
    pullTempF: 140,
    description: "Hot pink center, firmer texture",
  },
  {
    level: "medium-well",
    label: "Medium Well",
    internalTempF: 155,
    pullTempF: 150,
    description: "Slightly pink center, firm",
  },
  {
    level: "well-done",
    label: "Well Done",
    internalTempF: 165,
    pullTempF: 160,
    description: "No pink, gray-brown throughout",
  },
];

export const meatTypes: { key: MeatType; label: string }[] = [
  { key: "beef", label: "Beef" },
  { key: "pork", label: "Pork" },
  { key: "chicken", label: "Chicken" },
  { key: "lamb", label: "Lamb" },
  { key: "veal", label: "Veal" },
  { key: "ham", label: "Ham" },
  { key: "other-poultry", label: "Other Poultry" },
];

export const meatCuts: Record<MeatType, MeatCut[]> = {
  beef: [
    {
      key: "standing-rib-roast",
      label: "Standing Rib Roast (Prime Rib)",
      ovenTempF: 325,
      minPerLbLow: 23,
      minPerLbHigh: 25,
      targetTempF: 145,
      hasBoneOption: true,
      defaultBoneIn: true,
      bonelessMinPerLbLow: 28,
      bonelessMinPerLbHigh: 33,
      hasDonenessOption: true,
      notes: "For medium rare, use sear method: 500°F for 15 min, then 325°F",
    },
    {
      key: "beef-tenderloin",
      label: "Beef Tenderloin (Whole)",
      ovenTempF: 425,
      minPerLbLow: null,
      minPerLbHigh: null,
      totalTimeMin: 45,
      totalTimeMax: 60,
      targetTempF: 145,
      hasBoneOption: false,
      defaultBoneIn: false,
      hasDonenessOption: true,
      notes: "Total time 45-60 min for 4-6 lbs",
    },
    {
      key: "round-rump-roast",
      label: "Round/Rump Roast",
      ovenTempF: 325,
      minPerLbLow: 30,
      minPerLbHigh: 35,
      targetTempF: 145,
      hasBoneOption: false,
      defaultBoneIn: false,
      hasDonenessOption: true,
      notes: "Leaner cut, benefits from low and slow",
    },
    {
      key: "brisket-small",
      label: "Brisket (3-5 lbs)",
      ovenTempF: 300,
      minPerLbLow: 45,
      minPerLbHigh: 60,
      targetTempF: 200,
      hasBoneOption: false,
      defaultBoneIn: false,
      hasDonenessOption: false,
      specialTarget: "195-205°F for tender, shreddable meat",
    },
    {
      key: "brisket-full",
      label: "Brisket (Full Packer, 8-12 lbs)",
      ovenTempF: 250,
      minPerLbLow: 60,
      minPerLbHigh: 75,
      targetTempF: 200,
      hasBoneOption: false,
      defaultBoneIn: false,
      hasDonenessOption: false,
      specialTarget: "195-205°F for tender, shreddable meat",
      notes: "Wrap in foil at 165°F to push through the stall",
    },
  ],
  pork: [
    {
      key: "pork-loin-roast",
      label: "Pork Loin Roast",
      ovenTempF: 350,
      minPerLbLow: 20,
      minPerLbHigh: 20,
      targetTempF: 145,
      hasBoneOption: true,
      defaultBoneIn: true,
      hasDonenessOption: false,
    },
    {
      key: "pork-crown-roast",
      label: "Pork Crown Roast",
      ovenTempF: 350,
      minPerLbLow: 12,
      minPerLbHigh: 12,
      targetTempF: 145,
      hasBoneOption: false,
      defaultBoneIn: true,
      hasDonenessOption: false,
      notes: "Impressive centerpiece cut",
    },
    {
      key: "pork-tenderloin",
      label: "Pork Tenderloin",
      ovenTempF: 425,
      minPerLbLow: null,
      minPerLbHigh: null,
      totalTimeMin: 20,
      totalTimeMax: 27,
      targetTempF: 145,
      hasBoneOption: false,
      defaultBoneIn: false,
      hasDonenessOption: false,
      notes: "Total 20-27 min for 0.5-1.5 lbs",
    },
    {
      key: "pork-shoulder-small",
      label: "Pork Shoulder (3-6 lbs)",
      ovenTempF: 350,
      minPerLbLow: 45,
      minPerLbHigh: 45,
      targetTempF: 200,
      hasBoneOption: true,
      defaultBoneIn: true,
      hasDonenessOption: false,
      specialTarget: "195-205°F for pull-apart tenderness",
    },
    {
      key: "pork-shoulder-large",
      label: "Pork Shoulder (6-10 lbs)",
      ovenTempF: 275,
      minPerLbLow: 60,
      minPerLbHigh: 75,
      targetTempF: 200,
      hasBoneOption: true,
      defaultBoneIn: true,
      hasDonenessOption: false,
      specialTarget: "195-205°F for pull-apart tenderness",
      notes: "Wrap in foil at 165°F",
    },
    {
      key: "baby-back-ribs",
      label: "Baby Back Ribs (per rack)",
      ovenTempF: 275,
      minPerLbLow: null,
      minPerLbHigh: null,
      totalTimeMin: 120,
      totalTimeMax: 150,
      targetTempF: 145,
      hasBoneOption: false,
      defaultBoneIn: true,
      hasDonenessOption: false,
    },
    {
      key: "spare-ribs",
      label: "Spare Ribs (per rack)",
      ovenTempF: 275,
      minPerLbLow: null,
      minPerLbHigh: null,
      totalTimeMin: 150,
      totalTimeMax: 210,
      targetTempF: 145,
      hasBoneOption: false,
      defaultBoneIn: true,
      hasDonenessOption: false,
      notes: "Try 3-2-1 method: 3 hrs unwrapped, 2 hrs foil, 1 hr sauce",
    },
  ],
  chicken: [
    {
      key: "whole-chicken",
      label: "Whole Chicken",
      ovenTempF: 350,
      minPerLbLow: 20,
      minPerLbHigh: 25,
      targetTempF: 165,
      hasBoneOption: false,
      defaultBoneIn: true,
      hasDonenessOption: false,
      hasStuffedOption: true,
      notes: "High-start method: 450°F for 15 min, then 350°F",
    },
    {
      key: "chicken-breast-bone-in",
      label: "Chicken Breast (Bone-in, 6-8 oz)",
      ovenTempF: 350,
      minPerLbLow: null,
      minPerLbHigh: null,
      totalTimeMin: 30,
      totalTimeMax: 40,
      targetTempF: 165,
      hasBoneOption: false,
      defaultBoneIn: true,
      hasDonenessOption: false,
    },
    {
      key: "chicken-breast-boneless-small",
      label: "Chicken Breast (Boneless, 4 oz)",
      ovenTempF: 350,
      minPerLbLow: null,
      minPerLbHigh: null,
      totalTimeMin: 20,
      totalTimeMax: 30,
      targetTempF: 165,
      hasBoneOption: false,
      defaultBoneIn: false,
      hasDonenessOption: false,
    },
    {
      key: "chicken-breast-boneless-large",
      label: "Chicken Breast (Boneless, 6-8 oz)",
      ovenTempF: 375,
      minPerLbLow: null,
      minPerLbHigh: null,
      totalTimeMin: 25,
      totalTimeMax: 30,
      targetTempF: 165,
      hasBoneOption: false,
      defaultBoneIn: false,
      hasDonenessOption: false,
      notes: "Pound to even thickness for best results",
    },
    {
      key: "chicken-thighs",
      label: "Chicken Thighs (Bone-in)",
      ovenTempF: 375,
      minPerLbLow: null,
      minPerLbHigh: null,
      totalTimeMin: 35,
      totalTimeMax: 45,
      targetTempF: 165,
      hasBoneOption: false,
      defaultBoneIn: true,
      hasDonenessOption: false,
    },
    {
      key: "chicken-drumsticks",
      label: "Chicken Drumsticks",
      ovenTempF: 375,
      minPerLbLow: null,
      minPerLbHigh: null,
      totalTimeMin: 35,
      totalTimeMax: 45,
      targetTempF: 165,
      hasBoneOption: false,
      defaultBoneIn: true,
      hasDonenessOption: false,
    },
    {
      key: "chicken-leg-quarters",
      label: "Chicken Leg Quarters",
      ovenTempF: 375,
      minPerLbLow: null,
      minPerLbHigh: null,
      totalTimeMin: 40,
      totalTimeMax: 50,
      targetTempF: 165,
      hasBoneOption: false,
      defaultBoneIn: true,
      hasDonenessOption: false,
    },
  ],
  lamb: [
    {
      key: "leg-bone-in-small",
      label: "Leg of Lamb (Bone-in, 5-7 lbs)",
      ovenTempF: 325,
      minPerLbLow: 20,
      minPerLbHigh: 25,
      targetTempF: 145,
      hasBoneOption: false,
      defaultBoneIn: true,
      hasDonenessOption: true,
    },
    {
      key: "leg-bone-in-large",
      label: "Leg of Lamb (Bone-in, 7-9 lbs)",
      ovenTempF: 325,
      minPerLbLow: 10,
      minPerLbHigh: 15,
      targetTempF: 145,
      hasBoneOption: false,
      defaultBoneIn: true,
      hasDonenessOption: true,
      notes: "Larger legs cook proportionally faster per pound",
    },
    {
      key: "leg-boneless",
      label: "Leg of Lamb (Boneless, Rolled)",
      ovenTempF: 325,
      minPerLbLow: 25,
      minPerLbHigh: 30,
      targetTempF: 145,
      hasBoneOption: false,
      defaultBoneIn: false,
      hasDonenessOption: true,
    },
    {
      key: "lamb-shoulder",
      label: "Lamb Shoulder Roast",
      ovenTempF: 325,
      minPerLbLow: 30,
      minPerLbHigh: 35,
      targetTempF: 145,
      hasBoneOption: false,
      defaultBoneIn: true,
      hasDonenessOption: true,
    },
    {
      key: "rack-of-lamb",
      label: "Rack of Lamb (8 ribs)",
      ovenTempF: 325,
      minPerLbLow: null,
      minPerLbHigh: null,
      totalTimeMin: 22,
      totalTimeMax: 25,
      targetTempF: 145,
      hasBoneOption: false,
      defaultBoneIn: true,
      hasDonenessOption: true,
      notes: "Sear at 450°F for 10 min, then 325°F for 12-15 min",
    },
  ],
  veal: [
    {
      key: "veal-rib-roast",
      label: "Veal Rib Roast (4-5 lbs)",
      ovenTempF: 325,
      minPerLbLow: 25,
      minPerLbHigh: 27,
      targetTempF: 145,
      hasBoneOption: false,
      defaultBoneIn: true,
      hasDonenessOption: true,
    },
    {
      key: "veal-loin",
      label: "Veal Loin (3-4 lbs)",
      ovenTempF: 325,
      minPerLbLow: 34,
      minPerLbHigh: 36,
      targetTempF: 145,
      hasBoneOption: false,
      defaultBoneIn: false,
      hasDonenessOption: true,
    },
  ],
  ham: [
    {
      key: "smoked-whole-cook",
      label: "Smoked Ham, Whole (Cook to 145°F)",
      ovenTempF: 325,
      minPerLbLow: 18,
      minPerLbHigh: 20,
      targetTempF: 145,
      hasBoneOption: false,
      defaultBoneIn: true,
      hasDonenessOption: false,
      notes: "Cook-before-eating ham",
    },
    {
      key: "smoked-half-cook",
      label: "Smoked Ham, Half (Cook to 145°F)",
      ovenTempF: 325,
      minPerLbLow: 22,
      minPerLbHigh: 25,
      targetTempF: 145,
      hasBoneOption: false,
      defaultBoneIn: true,
      hasDonenessOption: false,
    },
    {
      key: "smoked-whole-reheat",
      label: "Smoked Ham, Whole (Reheat to 140°F)",
      ovenTempF: 325,
      minPerLbLow: 15,
      minPerLbHigh: 18,
      targetTempF: 140,
      hasBoneOption: false,
      defaultBoneIn: true,
      hasDonenessOption: false,
      notes: "Precooked, USDA-inspected",
    },
    {
      key: "smoked-half-reheat",
      label: "Smoked Ham, Half (Reheat to 140°F)",
      ovenTempF: 325,
      minPerLbLow: 18,
      minPerLbHigh: 24,
      targetTempF: 140,
      hasBoneOption: false,
      defaultBoneIn: true,
      hasDonenessOption: false,
    },
    {
      key: "spiral-cut",
      label: "Spiral Cut Ham (Reheat)",
      ovenTempF: 325,
      minPerLbLow: 10,
      minPerLbHigh: 18,
      targetTempF: 140,
      hasBoneOption: false,
      defaultBoneIn: true,
      hasDonenessOption: false,
    },
    {
      key: "fresh-whole-bone-in",
      label: "Fresh Ham, Whole (Bone-in)",
      ovenTempF: 325,
      minPerLbLow: 22,
      minPerLbHigh: 26,
      targetTempF: 145,
      hasBoneOption: false,
      defaultBoneIn: true,
      hasDonenessOption: false,
    },
    {
      key: "fresh-whole-boneless",
      label: "Fresh Ham, Whole (Boneless)",
      ovenTempF: 325,
      minPerLbLow: 24,
      minPerLbHigh: 28,
      targetTempF: 145,
      hasBoneOption: false,
      defaultBoneIn: false,
      hasDonenessOption: false,
    },
    {
      key: "fresh-half",
      label: "Fresh Ham, Half",
      ovenTempF: 325,
      minPerLbLow: 35,
      minPerLbHigh: 40,
      targetTempF: 145,
      hasBoneOption: false,
      defaultBoneIn: true,
      hasDonenessOption: false,
    },
  ],
  "other-poultry": [
    {
      key: "cornish-hen",
      label: "Cornish Hen (18-24 oz)",
      ovenTempF: 350,
      minPerLbLow: null,
      minPerLbHigh: null,
      totalTimeMin: 50,
      totalTimeMax: 60,
      targetTempF: 165,
      hasBoneOption: false,
      defaultBoneIn: true,
      hasDonenessOption: false,
    },
    {
      key: "duck-whole",
      label: "Whole Duck (4-6 lbs)",
      ovenTempF: 350,
      minPerLbLow: 30,
      minPerLbHigh: 35,
      targetTempF: 165,
      hasBoneOption: false,
      defaultBoneIn: true,
      hasDonenessOption: false,
    },
    {
      key: "duck-legs",
      label: "Duck Legs/Thighs",
      ovenTempF: 325,
      minPerLbLow: null,
      minPerLbHigh: null,
      totalTimeMin: 75,
      totalTimeMax: 90,
      targetTempF: 165,
      hasBoneOption: false,
      defaultBoneIn: true,
      hasDonenessOption: false,
    },
    {
      key: "capon",
      label: "Capon (4-8 lbs)",
      ovenTempF: 350,
      minPerLbLow: null,
      minPerLbHigh: null,
      totalTimeMin: 120,
      totalTimeMax: 180,
      targetTempF: 165,
      hasBoneOption: false,
      defaultBoneIn: true,
      hasDonenessOption: false,
    },
    {
      key: "goose",
      label: "Goose (8-12 lbs)",
      ovenTempF: 325,
      minPerLbLow: null,
      minPerLbHigh: null,
      totalTimeMin: 150,
      totalTimeMax: 180,
      targetTempF: 165,
      hasBoneOption: false,
      defaultBoneIn: true,
      hasDonenessOption: false,
    },
  ],
};

// Serving sizes per person (in lbs)
export const servingSizes = {
  "bone-in": {
    beef: 1,
    pork: 0.75,
    chicken: 1.25,
    lamb: 0.75,
    veal: 0.75,
    ham: 0.75,
    "other-poultry": 1.25,
  },
  boneless: {
    beef: 0.5,
    pork: 0.5,
    chicken: 0.5,
    lamb: 0.5,
    veal: 0.5,
    ham: 0.5,
    "other-poultry": 0.5,
  },
};

// Rest times and carryover based on weight
export function getRestInfo(weightLbs: number): {
  restTime: string;
  carryover: string;
  carryoverMidpoint: number;
} {
  if (weightLbs <= 2) {
    return { restTime: "5-10 minutes", carryover: "5-10°F", carryoverMidpoint: 7 };
  } else if (weightLbs <= 5) {
    return { restTime: "10-15 minutes", carryover: "5-10°F", carryoverMidpoint: 7 };
  } else if (weightLbs <= 10) {
    return { restTime: "15-20 minutes", carryover: "10-15°F", carryoverMidpoint: 12 };
  } else {
    return { restTime: "20-30 minutes", carryover: "10-15°F", carryoverMidpoint: 12 };
  }
}

// USDA Safe temperatures reference
export const usdaSafeTemps = [
  { category: "Beef, Lamb, Veal", type: "Steaks, roasts, chops", tempF: 145, rest: "3 minutes" },
  { category: "Beef, Pork, Lamb", type: "Ground meat", tempF: 160, rest: "None" },
  { category: "Pork", type: "Steaks, roasts, chops", tempF: 145, rest: "3 minutes" },
  { category: "All Poultry", type: "Whole, breasts, legs, ground", tempF: 165, rest: "None" },
  { category: "Ham (raw)", type: "Whole", tempF: 145, rest: "3 minutes" },
  { category: "Ham (precooked)", type: "Reheat USDA-inspected", tempF: 140, rest: "None" },
  { category: "Fish & Seafood", type: "All", tempF: 145, rest: "None" },
];
