import InstrumentFooter from "@/components/instrument/InstrumentFooter";
import InstrumentHeader from "@/components/instrument/InstrumentHeader";
import ConsentBanner from "@/components/instrument/ConsentBanner";
import "./instrument.css";
import { readout, ui } from "../fonts";

// The picked look (DESIGN.md): Public Sans for reading, Michroma only for instrument readouts (faces in src/app/fonts.ts).

export default function InstrumentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${ui.variable} ${readout.variable} p-page`}>
      <InstrumentHeader />
      <main>{children}</main>
      <InstrumentFooter />
      <ConsentBanner />
    </div>
  );
}
