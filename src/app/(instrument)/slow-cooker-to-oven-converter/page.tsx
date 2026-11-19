import { Metadata } from "next";
import Link from "next/link";
import SlowCookerConverter from "@/components/calculators/SlowCookerConverter";
import LiveDial from "@/components/instrument/LiveDial";
import { Faq, Hero, Main, Sec, Sources, Table, ext, type QA } from "@/components/instrument/kit";
import { BreadcrumbJsonLd, FAQPageJsonLd, WebApplicationJsonLd } from "@/components/seo/JsonLd";
import { BANDS, CROCKPOT, SRC_SLOW, hrs, minsText } from "@/data/slow-cooker";
import Dumbbells from "@/components/instrument/Dumbbells";
import { TONE } from "@/components/instrument/Bars";

const URL = "https://calckitchen.com/slow-cooker-to-oven-converter";
const UPDATED = "2026-11-19"; // CK-009: rebuilt on Crock-Pot's recipe-adapting chart and USDA slow cooker safety
const TITLE = "Slow Cooker to Oven Converter: Crock-Pot Time Chart, Low and High";
const DESC =
  "Convert oven and stovetop times to slow cooker hours and back with Crock-Pot's chart: 35 to 45 minutes in the oven is 6 to 10 hours on Low or 3 to 4 on High.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: { title: TITLE, description: DESC, url: URL, type: "website" },
  alternates: { canonical: URL },
};

const short = (m: number) => (m >= 60 ? `${m / 60} h` : `${m} min`);
const faqs: QA[] = [
  {
    question: "How do I convert an oven recipe to a slow cooker?",
    answer:
      "Find the recipe's time on Crock-Pot's chart: 15 to 30 minutes becomes 4 to 6 hours on Low or 1½ to 2 hours on High; 35 to 45 minutes becomes 6 to 10 hours on Low or 3 to 4 on High; 50 minutes to 3 hours becomes 8 to 18 hours on Low or 4 to 6 on High.",
  },
  {
    question: "How long is 8 hours on Low in the oven?",
    answer: "8 hours on Low sits in two rows of Crock-Pot's chart, which together match 35 minutes to 3 hours in the oven or on the stove.",
  },
  {
    question: "How long is 4 hours on High in the oven?",
    answer: "4 hours on High also sits in two rows, matching 35 minutes to 3 hours in the oven or on the stove.",
  },
  {
    question: "How long does raw meat need in a slow cooker?",
    answer: "Crock-Pot says most uncooked meat and vegetable combinations need at least 8 hours on Low.",
  },
  {
    question: "When do I add milk or cream to a slow cooker?",
    answer: "In the last hour. Crock-Pot says milk, sour cream and cream go in then, not at the start.",
  },
  {
    question: "Should I use less liquid in a slow cooker?",
    answer: "Usually. Crock-Pot says not to add as much water as some recipes call for, because liquids don't boil away as they do in conventional cooking.",
  },
  {
    question: "Can I put frozen meat in a slow cooker?",
    answer: "No. The USDA says to always thaw meat or poultry before putting it in a slow cooker.",
  },
  {
    question: "How full should a slow cooker be?",
    answer: "No less than half full and no more than two-thirds full, according to the USDA.",
  },
];

const MORE = [
  { href: "/meat-cooking-time-calculator", title: "Meat cooking time" },
  { href: "/meat-temperature-chart", title: "Meat temperature chart" },
  { href: "/microwave-to-oven-converter", title: "Microwave to oven" },
  { href: "/oven-temperature-converter", title: "Oven temperature converter" },
  { href: "/convection-oven-converter", title: "Convection oven converter" },
  { href: "/recipe-scaler", title: "Recipe scaler" },
];

export default function SlowCookerPage() {
  const b2 = BANDS[1];
  return (
    <>
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Slow Cooker to Oven Converter"
        description="Converts oven and stovetop times to slow cooker hours on Low and High, and back, using Crock-Pot's recipe-adapting chart."
        url={URL}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Slow Cooker to Oven Converter", url: URL },
        ]}
      />

      <Hero
        visual={<LiveDial liveKey="slow" min={0} max={18} major={2} minor={1} value={6} unit="hours" suffix=" h" label="Slow cooker hours on Low" />}
        crumb="Appliance converters / Slow cooker"
        h1="Slow cooker to oven converter"
        long
        answer={
          <>
            A <span className="p-nb">35- to 45-minute</span> oven recipe takes <span className="p-nb">6 to 10 hours</span> on Low, or{" "}
            <span className="p-nb">3 to 4</span> on High.
          </>
        }
        sub={
          <>
            Times from{" "}
            <a href={SRC_SLOW.crockpot} {...ext}>
              Crock-Pot&apos;s guide to adapting recipes
            </a>
            ; safety rules from the{" "}
            <a href={SRC_SLOW.fsis} {...ext}>
              USDA
            </a>
            .
          </>
        }
        updated={UPDATED}
      >
        <SlowCookerConverter />
      </Hero>

      <Main more={MORE}>
        <Sec title="Oven or stovetop to slow cooker chart">
          <Table
            label="Oven or stovetop to slow cooker times"
            head={["If the recipe says", "Cook on Low", "Or on High"]}
            hi={1}
            rows={BANDS.map((b) => [`${minsText(b.ovenLo)} to ${minsText(b.ovenHi)}`, `${hrs(b.lowLo)} to ${hrs(b.lowHi)} hours`, `${hrs(b.highLo)} to ${hrs(b.highHi)} hours`])}
          />
          <p className="p-note">
            Crock-Pot&apos;s rows leave gaps (31 to 34 and 46 to 49 minutes); the calculator uses the nearest row and says so. Going the other
            way, a slow cooker time can sit in two rows: {hrs(b2.lowLo + 2)} hours on Low is in both the second and third rows.
          </p>
          <Dumbbells
            title="Crock-Pot's chart, drawn in hours"
            label="Oven or stovetop to slow cooker times"
            min={0}
            step={4}
            unit="hours"
            keys={[
              { name: "Oven or stovetop", tone: TONE.blue },
              { name: "Slow cooker on High", tone: TONE.orange },
              { name: "Slow cooker on Low", tone: TONE.purple },
            ]}
            rows={BANDS.map((b) => ({
              name: `${short(b.ovenLo)}–${short(b.ovenHi)}`,
              marks: [
                { lo: b.ovenLo / 60, hi: b.ovenHi / 60, tone: TONE.blue },
                { lo: b.highLo, hi: b.highHi, tone: TONE.orange },
                { lo: b.lowLo, hi: b.lowHi, tone: TONE.purple },
              ],
              text: `High ${hrs(b.highLo)}–${hrs(b.highHi)} h\nLow ${hrs(b.lowLo)}–${hrs(b.lowHi)} h`,
            }))}
          />
        </Sec>

        <Sec title="Adapting a recipe">
          <ul className="p-tips">
            <li>
              <strong>Raw meat:</strong> most uncooked meat and vegetable combinations need at least {CROCKPOT.minLowHoursRawMeatVeg} hours on Low.
            </li>
            <li>
              <strong>Liquid:</strong> use less than the recipe&apos;s water; liquids don&apos;t boil away in a slow cooker.
            </li>
            <li>
              <strong>Dairy:</strong> add milk, sour cream or cream in the last hour.
            </li>
            <li>
              <strong>Lid:</strong> cook with the cover on.
            </li>
          </ul>
          <p className="p-note">From Crock-Pot&apos;s guide to adapting recipes.</p>
        </Sec>

        <Sec title="Slow cooker safety">
          <ul className="p-tips">
            <li>
              <strong>Thaw first:</strong> always thaw meat or poultry before it goes in.
            </li>
            <li>
              <strong>Fill:</strong> no less than half full and no more than two-thirds full.
            </li>
            <li>
              <strong>Order:</strong> vegetables cook slower than meat and poultry, so put them in first.
            </li>
            <li>
              <strong>Lid:</strong> keep it in place, lifting it only to stir or check for doneness.
            </li>
          </ul>
          <p className="p-p">
            From the USDA&apos;s Slow Cookers and Food Safety. Check doneness on the <Link href="/meat-temperature-chart">meat temperature chart</Link>.
          </p>
        </Sec>

        <Faq faqs={faqs} />

        <Sources
          items={[
            { href: SRC_SLOW.crockpot, title: "Crock-Pot 3850 instruction manual: Guide to Adapting Recipes", by: "Crock-Pot (via ManualsLib)" },
            { href: SRC_SLOW.fsis, title: "Slow Cookers and Food Safety", by: "USDA Food Safety and Inspection Service" },
          ]}
        />
      </Main>
    </>
  );
}
