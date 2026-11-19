import { Metadata } from "next";
import Link from "next/link";
import AirFryerConverter from "@/components/calculators/AirFryerConverter";
import LiveKnob from "@/components/instrument/LiveKnob";
import { Faq, Hero, Main, Sec, Sources, Table, ext, type QA } from "@/components/instrument/kit";
import { BreadcrumbJsonLd, FAQPageJsonLd, WebApplicationJsonLd } from "@/components/seo/JsonLd";
import { AF_RULE, AF_TIPS, SRC_AF, toAirFryerF, toAirFryerMin } from "@/data/air-fryer";
import { SRC_OVEN, fToC } from "@/data/oven-temps";
import Dumbbells from "@/components/instrument/Dumbbells";
import { TONE } from "@/components/instrument/Bars";

const URL = "https://calckitchen.com/air-fryer-converter";
const UPDATED = "2026-11-19"; // CK-008: rebuilt on the University of Illinois Extension air fryer guide
const TITLE = "Oven to Air Fryer Converter: Temperature and Time";
const DESC =
  "Convert an oven recipe to the air fryer: 25 to 30°F lower and 20% less time, per University of Illinois Extension. 400°F for 25 minutes becomes 370 to 375°F for 20 minutes.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: { title: TITLE, description: DESC, url: URL, type: "website" },
  alternates: { canonical: URL },
};

const faqs: QA[] = [
  {
    question: "How do I convert oven time and temperature to an air fryer?",
    answer:
      "University of Illinois Extension says most conventional oven recipes work in an air fryer if you lower the temperature by 25 to 30°F and cut the cooking time by 20%. An oven recipe at 400°F for 25 minutes becomes 370 to 375°F for 20 minutes.",
  },
  {
    question: "What temperature do I use in the air fryer for a 350°F oven recipe?",
    answer: "320 to 325°F: 25 to 30°F lower than the oven setting.",
  },
  {
    question: "What temperature do I use in the air fryer for a 425°F oven recipe?",
    answer: "395 to 400°F, and 20% less time: 30 minutes in the oven becomes 24 minutes in the air fryer.",
  },
  {
    question: "How do I convert an air fryer recipe to the oven?",
    answer:
      "Run the same rule backwards: raise the temperature by 25 to 30°F and divide the time by 0.8. An air fryer recipe at 375°F for 20 minutes becomes 400 to 405°F for 25 minutes in the oven.",
  },
  {
    question: "Do I need to preheat an air fryer?",
    answer: "University of Illinois Extension says to follow the instruction manual, and that a preheat is typically 3 minutes.",
  },
  {
    question: "Should I shake the air fryer basket?",
    answer: "Yes: halfway through the cooking time, shake the basket or turn the food with tongs. Don't overcrowd the basket, or the food won't cook evenly.",
  },
  {
    question: "How do I reheat leftovers in an air fryer?",
    answer: "Set the air fryer to 350°F and heat the food until it reaches 165°F inside, as University of Illinois Extension advises.",
  },
];

const TEMPS = [300, 325, 350, 375, 400, 425, 450];
const TIMES = [10, 15, 20, 25, 30, 40, 45, 60];
const r0 = (n: number) => Math.round(n);

const MORE = [
  { href: "/convection-oven-converter", title: "Convection oven converter" },
  { href: "/oven-temperature-converter", title: "Oven temperature converter" },
  { href: "/microwave-to-oven-converter", title: "Microwave to oven" },
  { href: "/meat-temperature-chart", title: "Meat temperature chart" },
  { href: "/meat-cooking-time-calculator", title: "Meat cooking time" },
  { href: "/recipe-scaler", title: "Recipe scaler" },
];

export default function AirFryerConverterPage() {
  return (
    <>
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Air Fryer Converter"
        description="Converts oven temperatures and times to air fryer settings and back, using the University of Illinois Extension guideline."
        url={URL}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Air Fryer Converter", url: URL },
        ]}
      />

      <Hero
        visual={<LiveKnob initial={375} />}
        crumb="Appliance converters / Air fryer"
        h1="Air fryer converter"
        long
        answer={
          <>
            <span className="p-nb">400°F</span> for <span className="p-nb">25 minutes</span> in the oven is{" "}
            <span className="p-nb">370 to 375°F</span> for <span className="p-nb">20 minutes</span> in the air fryer.
          </>
        }
        sub={
          <>
            Lower the temperature by 25 to 30°F and cut the time by 20%. That is the guideline in{" "}
            <a href={SRC_AF.illinois} {...ext}>
              University of Illinois Extension&apos;s air fryer guide
            </a>{" "}
            for most conventional oven recipes.
          </>
        }
        updated={UPDATED}
      >
        <AirFryerConverter />
      </Hero>

      <Main more={MORE}>
        <Sec title="Oven to air fryer temperature chart">
          <p className="p-p">
            Each air fryer setting is {AF_RULE.dropLoF} to {AF_RULE.dropHiF}°F below the oven setting. The guide gives a range rather than one
            number.
          </p>
          <Table
            label="Oven to air fryer temperatures"
            head={["Oven", "Air fryer", "Oven, °C", "Air fryer, °C"]}
            hi={TEMPS.indexOf(400)}
            rows={TEMPS.map((f) => {
              const a = toAirFryerF(f);
              return [`${f}°F`, `${a.lo} to ${a.hi}°F`, `${r0(fToC(f))}°C`, `${r0(fToC(a.lo))} to ${r0(fToC(a.hi))}°C`];
            })}
          />
          <p className="p-note">Celsius values are the Fahrenheit settings converted and rounded to whole degrees.</p>
          <Dumbbells
            title="Each oven setting and the air fryer setting for it"
            label="Oven to air fryer temperatures"
            step={50}
            unit="°F"
            keys={[
              { name: "Oven setting", tone: TONE.blue },
              { name: "Air fryer setting", tone: TONE.orange },
            ]}
            rows={TEMPS.map((f) => {
              const a = toAirFryerF(f);
              return { name: `${f}°F oven`, marks: [{ lo: f, tone: TONE.blue }, { lo: a.lo, hi: a.hi, tone: TONE.orange }], text: `${a.lo}–${a.hi}°F` };
            })}
          />
        </Sec>

        <Sec title="Oven to air fryer time chart">
          <p className="p-p">Air fryer time is the oven time minus {AF_RULE.timeCutPct}%, which is the same as multiplying by 0.8.</p>
          <Table
            label="Oven to air fryer cooking times"
            head={["Oven time", "Air fryer time", "Shake or flip at"]}
            hi={TIMES.indexOf(25)}
            rows={TIMES.map((t) => {
              const a = toAirFryerMin(t);
              return [`${t} min`, `${r0(a)} min`, `${r0(a / 2)} min`];
            })}
          />
        </Sec>

        <Sec title="Air fryer tips">
          <p className="p-p">From University of Illinois Extension&apos;s air fryer guide:</p>
          <ul className="p-tips">
            <li>
              <strong>Preheat:</strong> follow the instruction manual; a preheat is typically {AF_TIPS.preheatMin} minutes.
            </li>
            <li>
              <strong>Halfway:</strong> shake the basket or turn the food with tongs.
            </li>
            <li>
              <strong>Space:</strong> don&apos;t overcrowd the basket, or the food won&apos;t cook evenly.
            </li>
            <li>
              <strong>Serving:</strong> don&apos;t tip the basket out to serve; oil in the bottom drawer can spill onto the food.
            </li>
            <li>
              <strong>Oil:</strong> use oils with a high smoke point, such as peanut, safflower, grapeseed or olive oil (not virgin or extra virgin).
            </li>
            <li>
              <strong>Leftovers:</strong> reheat at {AF_TIPS.reheatF}°F until the food reaches {AF_TIPS.reheatInternalF}°F inside.
            </li>
          </ul>
          <p className="p-p">
            For meat, poultry and fish, the time is a starting point: check the internal temperature on the{" "}
            <Link href="/meat-temperature-chart">meat temperature chart</Link>.
          </p>
        </Sec>

        <Faq faqs={faqs} />

        <Sources
          items={[
            { href: SRC_AF.illinois, title: "Kitchen Appliances: Air Fryers", by: "University of Illinois Extension" },
            { href: SRC_OVEN.nist, title: "NIST Guide to the SI, Appendix B.9 (°F to °C)", by: "National Institute of Standards and Technology" },
          ]}
        />
      </Main>
    </>
  );
}
