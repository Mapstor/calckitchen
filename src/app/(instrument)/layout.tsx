import { Michroma, Public_Sans } from "next/font/google";
import InstrumentFooter from "@/components/instrument/InstrumentFooter";
import InstrumentHeader from "@/components/instrument/InstrumentHeader";
import "./instrument.css";

// The picked look (DESIGN.md): Public Sans for reading, Michroma only for instrument readouts.
const ui = Public_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], variable: "--font-ui" });
const readout = Michroma({ subsets: ["latin"], weight: "400", variable: "--font-readout" });

export default function InstrumentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${ui.variable} ${readout.variable} p-page`}>
      <InstrumentHeader />
      <main>{children}</main>
      <InstrumentFooter />
    </div>
  );
}
