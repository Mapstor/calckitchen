// Oven temperature data. Every figure traces to research/data-sources.csv.
// °F <-> °C: NIST Guide to the SI (SP 811), Appendix B.9: t/°C = (t/°F - 32)/1.8.
// Gas marks 1-9: Which? oven temperature conversion table (°F, °C, fan °C, description).
// Gas mark 1/2: Hotpoint DQ47 instructions, temperature conversion chart (°F, °C, fan °C).
// Checked by scripts/check-oven-data.mjs against research/sources/oven-temps.json.

export type GasRow = { gm: string; f: number; c: number; fan: number; desc: string; src: "WHICH" | "HOTPOINT" };

export const GAS_ROWS: GasRow[] = [
  { gm: "½", f: 250, c: 120, fan: 100, desc: "", src: "HOTPOINT" },
  { gm: "1", f: 275, c: 140, fan: 120, desc: "Cool", src: "WHICH" },
  { gm: "2", f: 300, c: 150, fan: 130, desc: "Cool", src: "WHICH" },
  { gm: "3", f: 325, c: 160, fan: 140, desc: "Moderate", src: "WHICH" },
  { gm: "4", f: 350, c: 180, fan: 160, desc: "Moderate", src: "WHICH" },
  { gm: "5", f: 375, c: 190, fan: 170, desc: "Moderately hot", src: "WHICH" },
  { gm: "6", f: 400, c: 200, fan: 180, desc: "Moderately hot", src: "WHICH" },
  { gm: "7", f: 425, c: 220, fan: 200, desc: "Hot", src: "WHICH" },
  { gm: "8", f: 450, c: 230, fan: 210, desc: "Hot", src: "WHICH" },
  { gm: "9", f: 475, c: 240, fan: 220, desc: "Very hot", src: "WHICH" },
];

/** NIST SP 811 App. B.9 */
export const fToC = (f: number) => (f - 32) / 1.8;
/** NIST SP 811 App. B.9, rearranged */
export const cToF = (c: number) => c * 1.8 + 32;

/** One decimal, trailing .0 dropped: 176.666 -> "176.7", 260 -> "260". */
export const fmt1 = (n: number) => {
  const r = Math.round(n * 10) / 10;
  return Number.isInteger(r) ? String(r) : r.toFixed(1);
};

export const SRC_OVEN = {
  nist: "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9",
  which: "https://www.which.co.uk/reviews/built-in-ovens/article/oven-temperature-conversion-degrees-celsius-to-fahrenheit-gas-mark-and-fan-aA5Ol9b157On",
  hotpoint: "https://www.manualslib.com/manual/466860/Hotpoint-Dq47.html?page=6",
};
