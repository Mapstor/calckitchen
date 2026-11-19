import localFont from "next/font/local";
import InstrumentFooter from "@/components/instrument/InstrumentFooter";
import InstrumentHeader from "@/components/instrument/InstrumentHeader";
import "./instrument.css";

// The picked look (DESIGN.md): Public Sans for reading, Michroma only for instrument readouts.
// Self-hosted from ./fonts (Fontsource 5.3.0 latin files, SIL OFL 1.1, licenses alongside): next/font/google made
// production builds fail when Turbopack restored its cache ("Can't resolve .../font/google/font", 2026-11-19).
const ui = localFont({ src: "./fonts/public-sans-latin-wght-normal.woff2", weight: "100 900", style: "normal", variable: "--font-ui", display: "swap" });
const readout = localFont({ src: "./fonts/michroma-latin-400-normal.woff2", weight: "400", style: "normal", variable: "--font-readout", display: "swap" });

export default function InstrumentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${ui.variable} ${readout.variable} p-page`}>
      <InstrumentHeader />
      <main>{children}</main>
      <InstrumentFooter />
    </div>
  );
}
