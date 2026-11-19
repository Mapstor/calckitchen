// Kitchen units. Exact US customary definitions as listed in NIST's Guide to the SI, Appendix B (research/data-sources.csv NIST-SI-B9):
// 1 lb = 0.45359237 kg; 1 oz = 1/16 lb; 1 US gallon = 231 in³ = 3.785411784 L; cup = 1/16 gal; tbsp = 1/16 cup; tsp = 1/3 tbsp; fl oz = 1/128 gal.
export type Unit = "g" | "kg" | "oz" | "lb" | "ml" | "L" | "tsp" | "tbsp" | "fl oz" | "cup" | "qt" | "gal" | "each";

const GAL_ML = 3785.411784;
export const UNITS: Record<Unit, { kind: "mass" | "volume" | "count"; base: number }> = {
  g: { kind: "mass", base: 1 },
  kg: { kind: "mass", base: 1000 },
  lb: { kind: "mass", base: 453.59237 },
  oz: { kind: "mass", base: 453.59237 / 16 },
  ml: { kind: "volume", base: 1 },
  L: { kind: "volume", base: 1000 },
  gal: { kind: "volume", base: GAL_ML },
  qt: { kind: "volume", base: GAL_ML / 4 },
  cup: { kind: "volume", base: GAL_ML / 16 },
  "fl oz": { kind: "volume", base: GAL_ML / 128 },
  tbsp: { kind: "volume", base: GAL_ML / 256 },
  tsp: { kind: "volume", base: GAL_ML / 768 },
  each: { kind: "count", base: 1 },
};

/** amount in "to" units, or null when the units measure different things (weight vs volume) */
export function convert(amount: number, from: Unit, to: Unit): number | null {
  const a = UNITS[from];
  const b = UNITS[to];
  if (a.kind !== b.kind) return null;
  return (amount * a.base) / b.base;
}
