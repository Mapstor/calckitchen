// Turkey data. Every figure here traces to a row in research/data-sources.csv.
//
// FSIS-LTT   USDA FSIS, "Let's Talk Turkey: A Consumer Guide to Safely Roasting a Turkey"
//            325°F roasting timetable (unstuffed and stuffed), 165°F, stand 20 minutes before carving,
//            cooking from frozen takes at least 50% longer, 1 lb per person, oven no lower than 325°F.
// FSIS-THAW  USDA FSIS, "Turkey Basics: Safe Thawing"
//            fridge: about 24 hours per 4 to 5 lb, with a time-by-weight table; cold water: about
//            30 minutes per lb, with a table; a fridge-thawed turkey keeps 1 to 2 days before cooking.
// FSIS-ALT   USDA FSIS, "Turkey: Alternate Routes to the Table"
//            deep-fat frying 3 to 5 min/lb for birds of 12 lb or less, oil at 350°F, completely thawed,
//            not stuffed; covered grill 15 to 18 min/lb for 8 to 16 lb, grill air 225 to 300°F;
//            smoking 20 to 30 min/lb for 8 to 12 lb, smoker air 225 to 300°F; no stuffing for any of them.
// UWYO-135   University of Wyoming Extension MP-135 "Let's Talk Turkey"
//            1½ lb per person if you want leftovers.

export type CookingMethod = "roasted" | "grilled" | "smoked" | "deep_fried";
export type ThawMethod = "fridge" | "cold_water" | "microwave";

export interface CookingMethodInfo {
  key: CookingMethod;
  label: string;
  heatLabel: string;
  tempF: number | null;
  minWeight: number;
  maxWeight: number;
  minPerLbLow?: number;
  minPerLbHigh?: number;
  allowsStuffed: boolean;
  allowsFrozen: boolean;
  notes: string;
}

export const cookingMethods: CookingMethodInfo[] = [
  {
    key: "roasted",
    label: "Oven roast (325°F)",
    heatLabel: "Oven at 325°F (163°C)",
    tempF: 325,
    minWeight: 4,
    maxWeight: 24,
    allowsStuffed: true,
    allowsFrozen: true,
    notes: "Times come from the USDA's 325°F roasting timetable. Set the oven no lower than 325°F.",
  },
  {
    key: "grilled",
    label: "Covered grill",
    heatLabel: "Grill air 225–300°F (107–149°C)",
    tempF: null,
    minWeight: 8,
    maxWeight: 16,
    minPerLbLow: 15,
    minPerLbHigh: 18,
    allowsStuffed: false,
    allowsFrozen: false,
    notes: "USDA: cook by indirect heat in a covered gas or charcoal grill with a drip pan. Do not stuff.",
  },
  {
    key: "smoked",
    label: "Smoked",
    heatLabel: "Smoker air 225–300°F (107–149°C)",
    tempF: null,
    minWeight: 8,
    maxWeight: 12,
    minPerLbLow: 20,
    minPerLbHigh: 30,
    allowsStuffed: false,
    allowsFrozen: false,
    notes: "USDA: keep the smoker air between 225 and 300°F and use a drip pan. Do not stuff.",
  },
  {
    key: "deep_fried",
    label: "Deep-fried",
    heatLabel: "Oil at 350°F (177°C)",
    tempF: 350,
    minWeight: 8,
    maxWeight: 12,
    minPerLbLow: 3,
    minPerLbHigh: 5,
    allowsStuffed: false,
    allowsFrozen: false,
    notes: "USDA: fry outdoors, only a completely thawed, unstuffed bird of 12 lb or less, and never leave the hot oil unattended.",
  },
];

// USDA FSIS 325°F roasting timetable, hours (fresh or thawed turkey).
export interface RoastRow {
  minLb: number;
  maxLb: number;
  lowHours: number;
  highHours: number;
  breast?: boolean;
}

export const roastUnstuffed: RoastRow[] = [
  { minLb: 4, maxLb: 8, lowHours: 1.5, highHours: 3.25, breast: true },
  { minLb: 8, maxLb: 12, lowHours: 2.75, highHours: 3 },
  { minLb: 12, maxLb: 14, lowHours: 3, highHours: 3.75 },
  { minLb: 14, maxLb: 18, lowHours: 3.75, highHours: 4.25 },
  { minLb: 18, maxLb: 20, lowHours: 4.25, highHours: 4.5 },
  { minLb: 20, maxLb: 24, lowHours: 4.5, highHours: 5 },
];

export const roastStuffed: RoastRow[] = [
  { minLb: 6, maxLb: 8, lowHours: 2.5, highHours: 3.5, breast: true },
  { minLb: 8, maxLb: 12, lowHours: 3, highHours: 3.5 },
  { minLb: 12, maxLb: 14, lowHours: 3.5, highHours: 4 },
  { minLb: 14, maxLb: 18, lowHours: 4, highHours: 4.25 },
  { minLb: 18, maxLb: 20, lowHours: 4.25, highHours: 4.75 },
  { minLb: 20, maxLb: 24, lowHours: 4.75, highHours: 5.25 },
];

// USDA FSIS thawing tables.
export interface ThawRow {
  minLb: number;
  maxLb: number;
  fridgeDaysLow: number;
  fridgeDaysHigh: number;
  waterHoursLow: number;
  waterHoursHigh: number;
}

export const thawTable: ThawRow[] = [
  { minLb: 4, maxLb: 12, fridgeDaysLow: 1, fridgeDaysHigh: 3, waterHoursLow: 2, waterHoursHigh: 6 },
  { minLb: 12, maxLb: 16, fridgeDaysLow: 3, fridgeDaysHigh: 4, waterHoursLow: 6, waterHoursHigh: 8 },
  { minLb: 16, maxLb: 20, fridgeDaysLow: 4, fridgeDaysHigh: 5, waterHoursLow: 8, waterHoursHigh: 10 },
  { minLb: 20, maxLb: 24, fridgeDaysLow: 5, fridgeDaysHigh: 6, waterHoursLow: 10, waterHoursHigh: 12 },
];

export interface ThawMethodInfo {
  key: ThawMethod;
  label: string;
  notes: string;
}

export const thawMethods: ThawMethodInfo[] = [
  {
    key: "fridge",
    label: "Refrigerator (40°F / 4°C or below)",
    notes: "About 24 hours for every 4 to 5 lb. Once thawed, it keeps 1 to 2 days before cooking.",
  },
  {
    key: "cold_water",
    label: "Cold water",
    notes: "About 30 minutes per lb. Keep it wrapped, change the water every 30 minutes, cook right away.",
  },
  {
    key: "microwave",
    label: "Microwave",
    notes: "Check your microwave's manual for size, minutes per pound and power level. Cook right away.",
  },
];

export const STAND_MINUTES = 20; // USDA: let the turkey stand 20 minutes before carving
export const SAFE_TEMP_F = 165;
export const SAFE_TEMP_C = 74; // 165°F = 73.9°C
export const LB_PER_KG = 2.20462;

function findRow<T extends { minLb: number; maxLb: number }>(rows: T[], weightLbs: number): T | undefined {
  // USDA rows share their end weights; a weight on a shared edge uses the lighter row.
  return rows.find((r) => weightLbs >= r.minLb && weightLbs <= r.maxLb);
}

export function getRestTime(): { min: number; max: number } {
  return { min: STAND_MINUTES, max: STAND_MINUTES };
}

// 1 lb per person (USDA); 1½ lb per person with leftovers (University of Wyoming Extension).
export function getServings(weightLbs: number): { standard: number; withLeftovers: number } {
  return {
    standard: Math.floor(weightLbs / 1.0),
    withLeftovers: Math.floor(weightLbs / 1.5),
  };
}

export function recommendTurkeySize(
  guests: number,
  wantLeftovers: boolean
): { weight: number; note: string } {
  const lbsPerPerson = wantLeftovers ? 1.5 : 1.0;
  const weight = Math.ceil(guests * lbsPerPerson);
  let note = "";
  if (weight > 24) {
    note = "That's past the USDA's roasting timetable, which stops at 24 lb. Two smaller birds keep you inside it.";
  }
  return { weight, note };
}

export interface CookResult {
  available: boolean;
  minMinutes: number;
  maxMinutes: number;
  heatLabel: string;
  tempF: number | null;
  basis: string;
  atLeast: boolean;
  warnings: string[];
}

export function calculateCookTime(
  weightLbs: number,
  method: CookingMethod,
  isStuffed: boolean,
  isFrozen: boolean
): CookResult {
  const info = cookingMethods.find((m) => m.key === method) ?? cookingMethods[0];
  const warnings: string[] = [];
  const empty: CookResult = {
    available: false,
    minMinutes: 0,
    maxMinutes: 0,
    heatLabel: info.heatLabel,
    tempF: info.tempF,
    basis: "",
    atLeast: false,
    warnings,
  };

  if (isStuffed && !info.allowsStuffed) {
    warnings.push(`The USDA says not to stuff a turkey you cook this way (${info.label.toLowerCase()}).`);
    return empty;
  }
  if (isFrozen && !info.allowsFrozen) {
    warnings.push(
      method === "deep_fried"
        ? "Only fry a turkey that is completely thawed. The USDA gives cook-from-frozen times for oven roasting only."
        : "The USDA gives cook-from-frozen times for oven roasting only. Thaw the turkey first."
    );
    return empty;
  }

  if (method === "roasted") {
    if (isFrozen && isStuffed) {
      warnings.push("The USDA's cook-from-frozen guidance is for an unstuffed turkey.");
      return empty;
    }
    const rows = isStuffed ? roastStuffed : roastUnstuffed;
    const row = findRow(rows, weightLbs);
    if (!row) {
      warnings.push(
        isStuffed
          ? "The USDA roasting timetable covers stuffed turkeys from 6 to 24 lb. Outside that range, rely on a food thermometer: 165°F."
          : "The USDA roasting timetable covers turkeys from 4 to 24 lb. Outside that range, rely on a food thermometer: 165°F."
      );
      return empty;
    }
    let minMinutes = Math.round(row.lowHours * 60);
    let maxMinutes = Math.round(row.highHours * 60);
    let basis = `USDA ${row.minLb}–${row.maxLb} lb ${isStuffed ? "stuffed" : "unstuffed"} row`;
    if (row.breast) {
      warnings.push(`The USDA's ${row.minLb}–${row.maxLb} lb row is for a turkey breast.`);
    }
    let atLeast = false;
    if (isFrozen) {
      minMinutes = Math.round(minMinutes * 1.5);
      maxMinutes = Math.round(maxMinutes * 1.5);
      atLeast = true;
      basis += ", plus at least 50% from frozen";
      warnings.push("From frozen it takes at least 50% longer. Remove the giblet packages during cooking, carefully, with tongs or a fork.");
    }
    return { available: true, minMinutes, maxMinutes, heatLabel: info.heatLabel, tempF: info.tempF, basis, atLeast, warnings };
  }

  if (weightLbs < info.minWeight || weightLbs > info.maxWeight) {
    warnings.push(
      method === "deep_fried"
        ? "The USDA says a turkey for frying should be 12 pounds or less, and gives frying times for 8 to 12 lb birds."
        : `The USDA gives ${info.label.toLowerCase()} times for ${info.minWeight} to ${info.maxWeight} lb birds.`
    );
    return empty;
  }
  const minMinutes = Math.round(weightLbs * (info.minPerLbLow ?? 0));
  const maxMinutes = Math.round(weightLbs * (info.minPerLbHigh ?? 0));
  return {
    available: true,
    minMinutes,
    maxMinutes,
    heatLabel: info.heatLabel,
    tempF: info.tempF,
    basis: `USDA ${info.minPerLbLow}–${info.minPerLbHigh} min per lb`,
    atLeast: false,
    warnings,
  };
}

export interface ThawResult {
  available: boolean;
  formatted: string;
  hoursLow: number;
  hoursHigh: number;
  daysLow: number;
  daysHigh: number;
  basis: string;
}

export function calculateThawTime(weightLbs: number, method: ThawMethod): ThawResult {
  if (method === "microwave") {
    return { available: false, formatted: "See your microwave's manual", hoursLow: 0, hoursHigh: 0, daysLow: 0, daysHigh: 0, basis: "USDA: follow the microwave's manual" };
  }
  const row = findRow(thawTable, weightLbs);
  if (method === "fridge") {
    // USDA table inside 4–24 lb; outside it, the USDA rule of about 24 hours per 4 to 5 lb.
    const daysLow = row ? row.fridgeDaysLow : Math.max(1, Math.floor(weightLbs / 5));
    const daysHigh = row ? row.fridgeDaysHigh : Math.ceil(weightLbs / 4);
    return {
      available: true,
      formatted: daysLow === daysHigh ? `${daysHigh} day${daysHigh > 1 ? "s" : ""}` : `${daysLow}–${daysHigh} days`,
      hoursLow: daysLow * 24,
      hoursHigh: daysHigh * 24,
      daysLow,
      daysHigh,
      basis: row ? `USDA ${row.minLb}–${row.maxLb} lb row` : "USDA: about 24 hours per 4 to 5 lb",
    };
  }
  const hours = weightLbs * 0.5; // USDA: about 30 minutes per pound
  const rounded = Math.round(hours * 2) / 2;
  return {
    available: true,
    formatted: `about ${formatHours(rounded)} hours`,
    hoursLow: hours,
    hoursHigh: hours,
    daysLow: hours / 24,
    daysHigh: hours / 24,
    basis: "USDA: about 30 minutes per lb",
  };
}

export function formatHours(hours: number): string {
  const whole = Math.floor(hours);
  const frac = Math.round((hours - whole) * 4) / 4;
  const map: Record<number, string> = { 0: "", 0.25: "¼", 0.5: "½", 0.75: "¾" };
  if (frac === 1) return String(whole + 1);
  return `${whole === 0 && frac > 0 ? "" : whole}${map[frac] ?? ""}`;
}

export function formatCookTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours} hr${hours > 1 ? "s" : ""}`;
  return `${hours} hr${hours > 1 ? "s" : ""} ${mins} min`;
}

// Turns minutes on a quarter-hour into "3¾ hours"; anything else into "3 hrs 28 min".
export function formatDuration(minutes: number): string {
  if (minutes % 15 === 0 && minutes >= 60) {
    return `${formatHours(minutes / 60)} hours`;
  }
  return formatCookTime(minutes);
}

export function formatRange(minMinutes: number, maxMinutes: number): string {
  if (minMinutes % 15 === 0 && maxMinutes % 15 === 0 && minMinutes >= 60) {
    return `${formatHours(minMinutes / 60)}–${formatHours(maxMinutes / 60)} hours`;
  }
  if (minMinutes === maxMinutes) return formatCookTime(minMinutes);
  return `${formatCookTime(minMinutes)} – ${formatCookTime(maxMinutes)}`;
}

export interface TimelineStep {
  label: string;
  time: string;
  daysBefore?: number;
  kind: "thaw" | "cook" | "check" | "rest" | "serve";
}

// Works backwards from the serving time using only USDA figures:
// stand 20 minutes, the high end of the cooking range, and the fridge thawing table.
export function generateTimeline(
  servingTime: Date,
  weightLbs: number,
  method: CookingMethod,
  isStuffed: boolean,
  thawFirst: boolean
): { steps: TimelineStep[]; cook: CookResult } {
  const cook = calculateCookTime(weightLbs, method, isStuffed, false);
  if (!cook.available) return { steps: [], cook };

  const out = new Date(servingTime.getTime() - STAND_MINUTES * 60 * 1000);
  const start = new Date(out.getTime() - cook.maxMinutes * 60 * 1000);
  const check = new Date(start.getTime() + cook.minMinutes * 60 * 1000);
  const verb = method === "roasted" ? "Turkey goes in the oven" : method === "deep_fried" ? "Turkey goes into the 350°F oil" : method === "smoked" ? "Turkey goes in the smoker" : "Turkey goes on the grill";

  const steps: TimelineStep[] = [];
  if (thawFirst) {
    const thaw = calculateThawTime(weightLbs, "fridge");
    const thawStart = new Date(start.getTime() - thaw.daysHigh * 24 * 60 * 60 * 1000);
    steps.push({ label: "Move the frozen turkey to the fridge", time: formatDateAndTime(thawStart), daysBefore: thaw.daysHigh, kind: "thaw" });
  }
  steps.push({ label: verb, time: formatTimeOnly(start), kind: "cook" });
  steps.push({ label: `Start checking for ${SAFE_TEMP_F}°F`, time: formatTimeOnly(check), kind: "check" });
  steps.push({ label: "Done by now: take it off the heat", time: formatTimeOnly(out), kind: "rest" });
  steps.push({ label: `Carve after standing ${STAND_MINUTES} minutes`, time: formatTimeOnly(servingTime), kind: "serve" });
  return { steps, cook };
}

function formatTimeOnly(date: Date): string {
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
}

function formatDateAndTime(date: Date): string {
  return (
    date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) +
    " " +
    formatTimeOnly(date)
  );
}
