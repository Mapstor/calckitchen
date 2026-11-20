import { Metadata } from "next";
import LiveDial from "@/components/instrument/LiveDial";
import MicrowaveToOvenConverter from "@/components/calculators/MicrowaveToOvenConverter";
import { Faq, Hero, Main, Sec, Sources, Table, ext, type QA } from "@/components/instrument/kit";
import { BreadcrumbJsonLd, FAQPageJsonLd, WebApplicationJsonLd } from "@/components/seo/JsonLd";
import { SRC_MW, forWattage, toMicrowave } from "@/data/microwave";
import Dumbbells from "@/components/instrument/Dumbbells";
import { TONE } from "@/components/instrument/Bars";
import { OG_IMAGES, TW_IMAGES } from "@/data/social";
import { UPDATED_AT } from "@/data/updated";

const URL = "https://calckitchen.com/microwave-to-oven-converter";
const UPDATED = UPDATED_AT["microwave-to-oven-converter"];
const TITLE = "Microwave to Oven Converter: Cooking Times, Wattage and Recipe Size";
const DESC =
  "Convert oven and stovetop times to the microwave and back: GE Appliances says a microwave needs 1/4 to 1/3 of the conventional time. Plus wattage and half or double recipes.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: { title: TITLE, description: DESC, url: URL, type: "website", images: OG_IMAGES },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: TW_IMAGES },
  alternates: { canonical: URL },
};

const faqs: QA[] = [
  {
    question: "How long do I microwave something that takes an hour in the oven?",
    answer: "15 to 20 minutes, according to GE Appliances: a quarter to a third of the conventional time.",
  },
  {
    question: "How do I convert a microwave time to an oven time?",
    answer:
      "Run GE's rule backwards: the oven takes 3 to 4 times as long, so 10 minutes in the microwave is 30 to 40 minutes in the oven. A microwave recipe has no oven temperature, so take the temperature from a similar oven recipe.",
  },
  {
    question: "What power level should I use?",
    answer: "The one a similar microwave recipe uses. If there isn't one, GE says to use power level 10.",
  },
  {
    question: "Should I use less liquid in the microwave?",
    answer: "GE suggests about a third less liquid than the conventional recipe, though it says that isn't always necessary.",
  },
  {
    question: "How do I change the time when I double a microwave recipe?",
    answer: "Add half to two-thirds more time; don't double it. GE also suggests cutting the liquid by a quarter to a half. A 10-minute recipe doubled takes 15 to 16.7 minutes.",
  },
  {
    question: "How do I change the time when I halve a microwave recipe?",
    answer: "Cut the time by a third and keep the same power level: a 9-minute recipe halved takes 6 minutes.",
  },
  {
    question: "My microwave has fewer watts than the recipe's. How much longer?",
    answer:
      "An estimate: multiply the time by the recipe's wattage and divide by yours, which keeps the energy the same. 4 minutes in an 1100 W oven is about 6.3 minutes in a 700 W one. No manufacturer formula backs this, so check the food early.",
  },
];

const CONV = [10, 15, 20, 30, 45, 60, 90, 120];
const WATTS = [700, 800, 900, 1000, 1200];
const r1 = (n: number) => (Math.round(n * 10) / 10).toString();

const MORE = [
  { href: "/oven-temperature-converter", title: "Oven temperature converter" },
  { href: "/air-fryer-converter", title: "Air fryer converter" },
  { href: "/convection-oven-converter", title: "Convection oven converter" },
  { href: "/slow-cooker-to-oven-converter", title: "Slow cooker to oven" },
  { href: "/recipe-scaler", title: "Recipe scaler" },
  { href: "/meat-temperature-chart", title: "Meat temperature chart" },
];

export default function MicrowaveToOvenPage() {
  return (
    <>
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Microwave to Oven Converter"
        description="Converts conventional cooking times to microwave times and back, scales microwave times for half and double recipes, and estimates times for a different wattage."
        url={URL}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Microwave to Oven Converter", url: URL },
        ]}
      />

      <Hero
        visual={<LiveDial liveKey="mw" min={0} max={60} major={5} minor={1} value={15} unit="minutes" suffix=" min" label="Microwave timer" />}
        crumb="Appliance converters / Microwave"
        h1="Microwave to oven converter"
        answer={
          <>
            An hour in the oven is <span className="p-nb">15 to 20 minutes</span> in the microwave.
          </>
        }
        sub={
          <>
            That&apos;s{" "}
            <a href={SRC_MW} {...ext}>
              GE Appliances&apos; rule
            </a>{" "}
            for converting a conventional recipe: a quarter to a third of the time, at power level 10 unless a similar microwave recipe says
            otherwise.
          </>
        }
        updated={UPDATED}
      >
        <MicrowaveToOvenConverter />
      </Hero>

      <Main more={MORE}>
        <Sec title="Oven or stovetop to microwave times">
          <p className="p-p">A quarter to a third of the conventional time. Check the food at the shorter time.</p>
          <Table
            label="Conventional to microwave times"
            head={["Oven or stovetop", "Microwave"]}
            hi={CONV.indexOf(60)}
            rows={CONV.map((m) => {
              const r = toMicrowave(m);
              return [`${m} min`, `${r1(r.lo)} to ${r1(r.hi)} min`];
            })}
          />
          <p className="p-note">GE also suggests about a third less liquid than the conventional recipe, though not always.</p>
          <Dumbbells
            title="Oven or stovetop time and the microwave time for it"
            label="Oven or stovetop to microwave times"
            min={0}
            step={30}
            unit="min"
            keys={[
              { name: "Oven or stovetop", tone: TONE.blue },
              { name: "Microwave, ¼ to ⅓ of it", tone: TONE.orange },
            ]}
            rows={CONV.map((m) => {
              const r = toMicrowave(m);
              return { name: `${m} min`, marks: [{ lo: m, tone: TONE.blue }, { lo: r.lo, hi: r.hi, tone: TONE.orange }], text: `${r1(r.lo)}–${r1(r.hi)} min` };
            })}
          />
        </Sec>

        <Sec title="Half or double a microwave recipe">
          <ul className="p-tips">
            <li>
              <strong>Half:</strong> cut the time by a third and keep the power level the same.
            </li>
            <li>
              <strong>Double:</strong> add half to two-thirds more time, not twice the time, and use a quarter to a half less liquid.
            </li>
          </ul>
        </Sec>

        <Sec title="A microwave with different wattage">
          <p className="p-p">
            Watts measure energy per second, so a weaker microwave needs longer to deliver the same energy. Multiplying the time by the
            recipe&apos;s wattage and dividing by yours keeps that energy equal. It is an estimate, not a manufacturer rule: check the food
            before the time is up.
          </p>
          <p className="p-formula">your time = recipe time × recipe watts ÷ your watts</p>
          <Table
            label="Times for a 4-minute, 1100 W recipe"
            head={["Your microwave", "4 min at 1100 W becomes"]}
            rows={WATTS.map((w) => [`${w} W`, `${r1(forWattage(4, 1100, w))} min`])}
          />
        </Sec>

        <Faq faqs={faqs} />

        <Sources items={[{ href: SRC_MW, title: "Microwave: Recipe Conversion", by: "GE Appliances" }]} />
      </Main>
    </>
  );
}
