// Turkey Cooking Data - Based on USDA guidelines

export type CookingMethod = "roasted" | "deep_fried" | "smoked" | "spatchcocked";
export type ThawMethod = "fridge" | "cold_water" | "microwave";

export interface CookingMethodInfo {
  key: CookingMethod;
  label: string;
  tempF: number;
  tempC: number;
  minPerLbLow: number;
  minPerLbHigh: number;
  allowsStuffed: boolean;
  maxWeight?: number;
  notes: string;
}

export const cookingMethods: CookingMethodInfo[] = [
  {
    key: "roasted",
    label: "Oven Roasted (325°F)",
    tempF: 325,
    tempC: 163,
    minPerLbLow: 13,
    minPerLbHigh: 15,
    allowsStuffed: true,
    notes: "Classic method. Use a meat thermometer.",
  },
  {
    key: "deep_fried",
    label: "Deep Fried",
    tempF: 350,
    tempC: 177,
    minPerLbLow: 3,
    minPerLbHigh: 4,
    allowsStuffed: false,
    maxWeight: 14,
    notes: "Turkey must be completely thawed and dried. Fry outdoors only.",
  },
  {
    key: "smoked",
    label: "Smoked (225-275°F)",
    tempF: 250,
    tempC: 121,
    minPerLbLow: 30,
    minPerLbHigh: 40,
    allowsStuffed: false,
    notes: "Low and slow. Do not stuff when smoking.",
  },
  {
    key: "spatchcocked",
    label: "Spatchcocked (425°F)",
    tempF: 425,
    tempC: 218,
    minPerLbLow: 6,
    minPerLbHigh: 8,
    allowsStuffed: false,
    notes: "Remove backbone, press flat. ~40% faster than whole roasting.",
  },
];

// Stuffed turkey takes longer
export const stuffedMinPerLb = {
  low: 15,
  high: 20,
};

// Thawing data
export interface ThawMethodInfo {
  key: ThawMethod;
  label: string;
  timePerLb: number; // hours per pound
  unit: string;
  notes: string;
}

export const thawMethods: ThawMethodInfo[] = [
  {
    key: "fridge",
    label: "Refrigerator (Recommended)",
    timePerLb: 6, // 24 hours per 4-5 lbs = ~6 hours per lb
    unit: "hours",
    notes: "Safe for 1-2 days after thawed. Can be refrozen.",
  },
  {
    key: "cold_water",
    label: "Cold Water (Faster)",
    timePerLb: 0.5, // 30 min per lb
    unit: "hours",
    notes: "Change water every 30 min. Cook immediately after thawing.",
  },
  {
    key: "microwave",
    label: "Microwave",
    timePerLb: 0.1, // 6 min per lb = 0.1 hours
    unit: "hours",
    notes: "Not practical for large turkeys. Cook immediately.",
  },
];

// Rest time by weight
export function getRestTime(weightLbs: number): { min: number; max: number } {
  if (weightLbs < 18) {
    return { min: 20, max: 30 };
  }
  return { min: 30, max: 45 };
}

// Servings calculation
export function getServings(weightLbs: number): { standard: number; withLeftovers: number } {
  return {
    standard: Math.floor(weightLbs / 1.0),
    withLeftovers: Math.floor(weightLbs / 1.5),
  };
}

// Recommend turkey size by guest count
export function recommendTurkeySize(
  guests: number,
  wantLeftovers: boolean
): { weight: number; note: string } {
  const lbsPerPerson = wantLeftovers ? 1.5 : 1.0;
  const weight = Math.ceil(guests * lbsPerPerson);

  let note = "";
  if (weight > 24) {
    note = "Consider cooking two smaller turkeys for more even results.";
  } else if (weight < 4) {
    note = "A turkey breast may be more practical for this group size.";
  }

  return { weight, note };
}

// Calculate cooking time
export function calculateCookTime(
  weightLbs: number,
  method: CookingMethod,
  isStuffed: boolean,
  isFrozen: boolean
): { minMinutes: number; maxMinutes: number; tempF: number; tempC: number; warnings: string[] } {
  const methodInfo = cookingMethods.find((m) => m.key === method);
  if (!methodInfo) {
    return { minMinutes: 0, maxMinutes: 0, tempF: 325, tempC: 163, warnings: [] };
  }

  const warnings: string[] = [];

  // Base time calculation
  let minPerLbLow = methodInfo.minPerLbLow;
  let minPerLbHigh = methodInfo.minPerLbHigh;

  // Adjust for stuffed (only for roasted)
  if (isStuffed && method === "roasted") {
    minPerLbLow = stuffedMinPerLb.low;
    minPerLbHigh = stuffedMinPerLb.high;
  } else if (isStuffed && !methodInfo.allowsStuffed) {
    warnings.push(`Stuffing is not recommended for ${methodInfo.label.toLowerCase()}.`);
  }

  let minMinutes = Math.round(weightLbs * minPerLbLow);
  let maxMinutes = Math.round(weightLbs * minPerLbHigh);

  // Adjust for frozen (only roasted can cook from frozen)
  if (isFrozen && method === "roasted") {
    minMinutes = Math.round(minMinutes * 1.5);
    maxMinutes = Math.round(maxMinutes * 1.5);
    warnings.push("Cooking from frozen. Cannot be stuffed.");
  } else if (isFrozen && method === "deep_fried") {
    warnings.push("NEVER deep fry a frozen or partially frozen turkey. The turkey must be completely thawed and thoroughly dried before frying.");
  } else if (isFrozen && method !== "roasted") {
    warnings.push("Turkey must be completely thawed before using this cooking method.");
  }

  // Weight warnings
  if (method === "deep_fried" && weightLbs > 14) {
    warnings.push("Most turkey fryers accommodate birds up to 14 lbs. A larger bird may not fit safely.");
  }

  if (weightLbs > 24) {
    warnings.push("For turkeys over 24 lbs, consider cooking two smaller birds for more even results.");
  }

  if (weightLbs < 4) {
    warnings.push("This is likely a turkey breast, not a whole turkey. Times are still accurate.");
  }

  return {
    minMinutes,
    maxMinutes,
    tempF: methodInfo.tempF,
    tempC: methodInfo.tempC,
    warnings,
  };
}

// Calculate thaw time
export function calculateThawTime(
  weightLbs: number,
  method: ThawMethod
): { hours: number; days: number; formatted: string } {
  const methodInfo = thawMethods.find((m) => m.key === method);
  if (!methodInfo) {
    return { hours: 0, days: 0, formatted: "0" };
  }

  let hours: number;
  if (method === "fridge") {
    // 24 hours per 4-5 lbs, round up
    hours = Math.ceil(weightLbs / 4.5) * 24;
  } else if (method === "cold_water") {
    hours = weightLbs * 0.5;
  } else {
    // Microwave: 6 min per lb
    hours = (weightLbs * 6) / 60;
  }

  const days = hours / 24;

  let formatted: string;
  if (method === "fridge") {
    formatted = `${Math.ceil(days)} day${Math.ceil(days) > 1 ? "s" : ""}`;
  } else if (method === "cold_water") {
    formatted = `${Math.round(hours)} hour${hours !== 1 ? "s" : ""}`;
  } else {
    const minutes = Math.round(hours * 60);
    formatted = `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  }

  return { hours, days, formatted };
}

// Format time to hours and minutes
export function formatCookTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins} min`;
  }

  if (mins === 0) {
    return `${hours} hr${hours > 1 ? "s" : ""}`;
  }

  return `${hours} hr${hours > 1 ? "s" : ""} ${mins} min`;
}

// Generate backwards timeline
export interface TimelineStep {
  label: string;
  time: string;
  daysBefore?: number;
}

export function generateTimeline(
  servingTime: Date,
  weightLbs: number,
  method: CookingMethod,
  isStuffed: boolean,
  isFrozen: boolean
): TimelineStep[] {
  const cookResult = calculateCookTime(weightLbs, method, isStuffed, isFrozen);
  const restTime = getRestTime(weightLbs);

  // Work backwards from serving time
  const timeline: TimelineStep[] = [];

  // Serving time
  timeline.push({
    label: "Serve",
    time: formatTimeOnly(servingTime),
  });

  // Carve time (15 min before serving)
  const carveTime = new Date(servingTime.getTime() - 15 * 60 * 1000);
  timeline.push({
    label: "Carve turkey",
    time: formatTimeOnly(carveTime),
  });

  // Rest start (use max rest time for buffer)
  const restStart = new Date(carveTime.getTime() - restTime.max * 60 * 1000);
  timeline.push({
    label: `Rest turkey (${restTime.min}-${restTime.max} min)`,
    time: formatTimeOnly(restStart),
  });

  // Cook done = rest start
  // Cook start (use max cook time for safety buffer)
  const cookStart = new Date(restStart.getTime() - cookResult.maxMinutes * 60 * 1000);
  timeline.push({
    label: "Turkey goes in oven",
    time: formatTimeOnly(cookStart),
  });

  // Prep time (30 min before cooking)
  const prepStart = new Date(cookStart.getTime() - 30 * 60 * 1000);
  timeline.push({
    label: "Remove from fridge, prep turkey",
    time: formatTimeOnly(prepStart),
  });

  // Thaw start (if frozen)
  if (isFrozen) {
    const thawResult = calculateThawTime(weightLbs, "fridge");
    const thawStart = new Date(cookStart.getTime() - thawResult.hours * 60 * 60 * 1000);
    timeline.push({
      label: "Start thawing in fridge",
      time: formatDateAndTime(thawStart),
      daysBefore: Math.ceil(thawResult.days),
    });
  }

  return timeline.reverse();
}

function formatTimeOnly(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDateAndTime(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }) + " " + formatTimeOnly(date);
}
