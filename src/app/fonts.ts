import localFont from "next/font/local";

// Self-hosted faces (Fontsource 5.3.0, SIL OFL 1.1; licenses in ./(instrument)/fonts). Shared by the (instrument)
// layout and the 404 page, which renders outside the route group.
export const ui = localFont({ src: "./(instrument)/fonts/public-sans-latin-wght-normal.woff2", weight: "100 900", style: "normal", variable: "--font-ui", display: "swap" });
export const readout = localFont({ src: "./(instrument)/fonts/michroma-latin-400-normal.woff2", weight: "400", style: "normal", variable: "--font-readout", display: "swap" });
