// Wilton "Ultimate Cake Serving Chart" (4 in. high cakes: two layers from 2 in. deep pans). Every figure traces to
// research/data-sources.csv (WILTON-SERVE). Checked by scripts/check-cake-data.mjs against research/sources/wilton-cakes.json.
// Party servings: slices about 1.5 x 2 in. Wedding servings: slices about 1 x 2 in.

export type CakeRow = {
  shape: string;
  size: string;
  party: number;
  wedding: number;
  /** cups of batter for one 2 in. layer, as Wilton writes it */
  cups: string;
  tempF: number;
  timeLo: number;
  timeHi: number;
  /** approximate cups of icing to ice and decorate the two-layer cake */
  icing: string;
};

export const WILTON: CakeRow[] = [
  { shape: "Round", size: "4 in.", party: 8, wedding: 8, cups: "3/4", tempF: 350, timeLo: 22, timeHi: 26, icing: "1 1/2" },
  { shape: "Round", size: "6 in.", party: 12, wedding: 12, cups: "2 1/4", tempF: 350, timeLo: 35, timeHi: 40, icing: "2 1/2" },
  { shape: "Round", size: "8 in.", party: 20, wedding: 24, cups: "4", tempF: 350, timeLo: 37, timeHi: 42, icing: "3 1/2" },
  { shape: "Round", size: "9 in.", party: 24, wedding: 32, cups: "5", tempF: 350, timeLo: 40, timeHi: 45, icing: "4" },
  { shape: "Round", size: "10 in.", party: 28, wedding: 38, cups: "6", tempF: 350, timeLo: 40, timeHi: 45, icing: "5" },
  { shape: "Round", size: "12 in.", party: 40, wedding: 56, cups: "8", tempF: 350, timeLo: 40, timeHi: 45, icing: "6" },
  { shape: "Round", size: "14 in.", party: 63, wedding: 78, cups: "11 1/2", tempF: 325, timeLo: 50, timeHi: 55, icing: "8 1/2" },
  { shape: "Round", size: "16 in.", party: 77, wedding: 100, cups: "16", tempF: 325, timeLo: 55, timeHi: 60, icing: "9 1/2" },
  { shape: "Square", size: "6 in.", party: 12, wedding: 18, cups: "3", tempF: 350, timeLo: 40, timeHi: 45, icing: "3 1/2" },
  { shape: "Square", size: "8 in.", party: 20, wedding: 32, cups: "6", tempF: 350, timeLo: 45, timeHi: 50, icing: "4 1/2" },
  { shape: "Square", size: "10 in.", party: 30, wedding: 50, cups: "9", tempF: 350, timeLo: 50, timeHi: 55, icing: "6" },
  { shape: "Square", size: "12 in.", party: 48, wedding: 72, cups: "11 1/2", tempF: 325, timeLo: 55, timeHi: 60, icing: "7 1/2" },
  { shape: "Square", size: "14 in.", party: 63, wedding: 98, cups: "16", tempF: 325, timeLo: 55, timeHi: 60, icing: "9" },
  { shape: "Square", size: "16 in.", party: 80, wedding: 128, cups: "22", tempF: 325, timeLo: 60, timeHi: 70, icing: "11 1/2" },
  { shape: "Heart", size: "6 in.", party: 8, wedding: 14, cups: "2", tempF: 350, timeLo: 30, timeHi: 35, icing: "3" },
  { shape: "Heart", size: "8 in.", party: 18, wedding: 22, cups: "4", tempF: 350, timeLo: 40, timeHi: 45, icing: "4" },
  { shape: "Heart", size: "9 in.", party: 20, wedding: 28, cups: "4 1/4", tempF: 350, timeLo: 40, timeHi: 45, icing: "5 1/2" },
  { shape: "Heart", size: "10 in.", party: 24, wedding: 38, cups: "6 1/2", tempF: 350, timeLo: 45, timeHi: 50, icing: "7" },
  { shape: "Heart", size: "12 in.", party: 24, wedding: 56, cups: "9 1/4", tempF: 325, timeLo: 55, timeHi: 60, icing: "8 1/2" },
  { shape: "Heart", size: "14 in.", party: 48, wedding: 72, cups: "13 1/2", tempF: 325, timeLo: 55, timeHi: 60, icing: "9 1/2" },
  { shape: "Heart", size: "16 in.", party: 64, wedding: 94, cups: "17", tempF: 325, timeLo: 60, timeHi: 65, icing: "13" },
  { shape: "Petal", size: "6 in.", party: 6, wedding: 8, cups: "1 1/2", tempF: 350, timeLo: 30, timeHi: 35, icing: "3" },
  { shape: "Petal", size: "9 in.", party: 14, wedding: 18, cups: "3 3/4", tempF: 350, timeLo: 35, timeHi: 40, icing: "4 1/2" },
  { shape: "Petal", size: "12 in.", party: 38, wedding: 40, cups: "7 1/4", tempF: 350, timeLo: 45, timeHi: 50, icing: "6" },
  { shape: "Petal", size: "15 in.", party: 48, wedding: 64, cups: "10 2/3", tempF: 325, timeLo: 55, timeHi: 60, icing: "8" },
  { shape: "Hexagon", size: "6 in.", party: 10, wedding: 12, cups: "2", tempF: 350, timeLo: 30, timeHi: 35, icing: "2 1/2" },
  { shape: "Hexagon", size: "9 in.", party: 20, wedding: 26, cups: "4 1/2", tempF: 350, timeLo: 40, timeHi: 45, icing: "4" },
  { shape: "Hexagon", size: "12 in.", party: 34, wedding: 40, cups: "8", tempF: 350, timeLo: 50, timeHi: 55, icing: "5 1/2" },
  { shape: "Hexagon", size: "15 in.", party: 48, wedding: 70, cups: "14", tempF: 350, timeLo: 55, timeHi: 60, icing: "7" },
  { shape: "Oval", size: "7.75 x 5.5 in.", party: 9, wedding: 13, cups: "2 3/4", tempF: 350, timeLo: 30, timeHi: 35, icing: "2 1/2" },
  { shape: "Oval", size: "10.75 x 7.8 in.", party: 20, wedding: 26, cups: "5", tempF: 350, timeLo: 40, timeHi: 45, icing: "4" },
  { shape: "Oval", size: "13.5 x 9.8 in.", party: 30, wedding: 45, cups: "8 1/4", tempF: 325, timeLo: 50, timeHi: 55, icing: "5 1/2" },
  { shape: "Oval", size: "16.5 x 12.4 in.", party: 44, wedding: 70, cups: "13 1/4", tempF: 325, timeLo: 50, timeHi: 55, icing: "7 1/2" },
  { shape: "Sheet", size: "7 x 11 in.", party: 24, wedding: 32, cups: "5 1/2", tempF: 350, timeLo: 45, timeHi: 50, icing: "5" },
  { shape: "Sheet", size: "9 x 13 in.", party: 36, wedding: 50, cups: "10", tempF: 350, timeLo: 40, timeHi: 45, icing: "7" },
  { shape: "Sheet", size: "11 x 15 in.", party: 54, wedding: 74, cups: "11 1/2", tempF: 325, timeLo: 50, timeHi: 55, icing: "9" },
  { shape: "Sheet", size: "12 x 18 in.", party: 72, wedding: 98, cups: "16", tempF: 325, timeLo: 55, timeHi: 60, icing: "11" },
  { shape: "Paisley", size: "9 x 6 in.", party: 9, wedding: 13, cups: "2 3/4", tempF: 350, timeLo: 35, timeHi: 40, icing: "4 1/2" },
  { shape: "Paisley", size: "12.5 x 9.5 in.", party: 28, wedding: 38, cups: "7", tempF: 350, timeLo: 45, timeHi: 50, icing: "7" },
  { shape: "Paisley", size: "16.5 x 12.5 in.", party: 40, wedding: 56, cups: "10 1/2", tempF: 325, timeLo: 55, timeHi: 60, icing: "9" },
  { shape: "Diamond", size: "10.25 x 7.4 in.", party: 12, wedding: 18, cups: "3", tempF: 350, timeLo: 30, timeHi: 35, icing: "3" },
  { shape: "Diamond", size: "15 x 11 in.", party: 20, wedding: 32, cups: "6", tempF: 350, timeLo: 45, timeHi: 50, icing: "6" },
  { shape: "Diamond", size: "19.25 x 14.25 in.", party: 42, wedding: 66, cups: "11", tempF: 325, timeLo: 55, timeHi: 60, icing: "9 1/2" },
  { shape: "Pillow", size: "6.75 x 6.75 in.", party: 13, wedding: 19, cups: "2 1/2", tempF: 350, timeLo: 33, timeHi: 38, icing: "3" },
  { shape: "Pillow", size: "10 x 10 in.", party: 30, wedding: 40, cups: "5 1/2", tempF: 350, timeLo: 39, timeHi: 44, icing: "6 1/2" },
  { shape: "Pillow", size: "13.25 x 13.25 in.", party: 64, wedding: 72, cups: "10", tempF: 350, timeLo: 41, timeHi: 46, icing: "9 1/2" },
];

export const SHAPES = [...new Set(WILTON.map((r) => r.shape))];

/** "2 1/4" -> 2.25 */
export const frac = (s: string) =>
  s.split(" ").reduce((a, p) => {
    const [n, d] = p.split("/").map(Number);
    return a + (d ? n / d : n);
  }, 0);

export type PanShape = "Round" | "Square" | "Rectangle";

/** pan area in square inches: round = pi x (d/2)^2, square = side^2, rectangle = a x b */
export function area(shape: PanShape, a: number, b?: number): number {
  if (shape === "Round") return Math.PI * (a / 2) ** 2;
  if (shape === "Square") return a * a;
  return a * (b ?? a);
}

/** Wilton row for a pan given as shape and inches, when the chart has that exact size (rectangles are its sheet pans) */
export function wiltonFor(shape: PanShape, a: number, b?: number): CakeRow | undefined {
  if (shape === "Rectangle") {
    const [x, y] = [Math.min(a, b ?? a), Math.max(a, b ?? a)];
    return WILTON.find((r) => r.shape === "Sheet" && r.size === `${x} x ${y} in.`);
  }
  return WILTON.find((r) => r.shape === shape && r.size === `${a} in.`);
}

export const SRC_WILTON = "https://wilton.com/baking-inspiration/cake-baking-serving-guide/";
