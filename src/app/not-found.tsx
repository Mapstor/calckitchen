import type { Metadata } from "next";
import Link from "next/link";
import InstrumentFooter from "@/components/instrument/InstrumentFooter";
import InstrumentHeader from "@/components/instrument/InstrumentHeader";
import ConsentBanner from "@/components/instrument/ConsentBanner";
import { ALL_TOOLS } from "@/data/site-nav";
import { readout, ui } from "./fonts";
import "./(instrument)/instrument.css";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

// Custom 404 in the picked look (QA sweep P1 "default-404-page", 2026-11-19): says what happened and lists every calculator.
export default function NotFound() {
  return (
    <div className={`${ui.variable} ${readout.variable} p-page`}>
      <InstrumentHeader />
      <main>
        <div className="p-wrap p-404">
          <p className="p-kicker">404</p>
          <h1 className="p-answer">That page isn&apos;t here.</h1>
          <p className="p-p">
            The address may have a typo, or the page moved. Every calculator on CalcKitchen is below, or start from the <Link href="/">home page</Link>.
          </p>
          <ul className="p-404-list">
            {ALL_TOOLS.map((t) => (
              <li key={t.href}>
                <Link href={t.href}>{t.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <InstrumentFooter />
      <ConsentBanner />
    </div>
  );
}
