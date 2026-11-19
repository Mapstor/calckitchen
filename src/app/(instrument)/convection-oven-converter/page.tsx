import { Metadata } from "next";
import Link from "next/link";
import ConvectionOvenConverter from "@/components/calculators/ConvectionOvenConverter";
import LiveKnob from "@/components/instrument/LiveKnob";
import { Faq, Hero, Main, Sec, Sources, Table, ext, type QA } from "@/components/instrument/kit";
import { BreadcrumbJsonLd, FAQPageJsonLd, WebApplicationJsonLd } from "@/components/seo/JsonLd";
import { CONV, SRC_CONV, bakeF, roastMin } from "@/data/convection";
import { fToC } from "@/data/oven-temps";
import Dumbbells from "@/components/instrument/Dumbbells";
import { TONE } from "@/components/instrument/Bars";

const URL = "https://calckitchen.com/convection-oven-converter";
const UPDATED = "2026-11-19"; // CK-008: rebuilt on Frigidaire and GE Appliances guidance
const TITLE = "Convection Oven Converter: Conventional to Convection Bake and Roast";
const DESC =
  "Convert a regular oven recipe to convection: bake 25°F lower and use the recipe's shortest time; roast at the same temperature for 25% less time. 350°F becomes 325°F.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: { title: TITLE, description: DESC, url: URL, type: "website" },
  alternates: { canonical: URL },
};

const faqs: QA[] = [
  {
    question: "How do I convert a recipe for a convection oven?",
    answer:
      "For convection bake, Frigidaire says to lower the recipe temperature by 25 degrees and follow the rest of the recipe using its shortest time. For convection roast, keep the temperature and cut the time by 25%, then check the food.",
  },
  {
    question: "What is 350°F on convection bake?",
    answer: "325°F: 25 degrees lower than the regular recipe.",
  },
  {
    question: "What is 400°F on convection bake?",
    answer: "375°F, and use the shortest time the recipe gives.",
  },
  {
    question: "How much faster is convection roasting?",
    answer: "Frigidaire says to cut the recipe's time by 25% and check the food at that point: a roast that takes 120 minutes in a regular oven gets checked at 90 minutes.",
  },
  {
    question: "Do I lower the temperature for convection roast?",
    answer: "No. Frigidaire's convection roast instructions set the oven to the roasting temperature you want and shorten the time instead.",
  },
  {
    question: "My oven lowers the temperature by itself. Should I still subtract 25°F?",
    answer:
      "No. GE Appliances says ovens with Auto Recipe Conversion set themselves 25 degrees below the temperature you enter, and on most newer ranges the display still shows the temperature you entered. Subtracting 25°F yourself would lower it twice. Your owner's manual says whether your oven has this feature.",
  },
  {
    question: "Do I need to preheat a convection oven?",
    answer: "Frigidaire recommends preheating for convection bake when baking cookies, biscuits and breads. Convection roast needs no preheating.",
  },
];

const TEMPS = [300, 325, 350, 375, 400, 425, 450];
const TIMES = [60, 90, 120, 150, 180, 240];
const r0 = (n: number) => Math.round(n);

const MORE = [
  { href: "/air-fryer-converter", title: "Air fryer converter" },
  { href: "/oven-temperature-converter", title: "Oven temperature converter" },
  { href: "/meat-cooking-time-calculator", title: "Meat cooking time" },
  { href: "/turkey-cooking-calculator", title: "Turkey cooking time" },
  { href: "/microwave-to-oven-converter", title: "Microwave to oven" },
  { href: "/slow-cooker-to-oven-converter", title: "Slow cooker to oven" },
];

export default function ConvectionOvenConverterPage() {
  return (
    <>
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Convection Oven Converter"
        description="Converts regular oven recipes to convection bake and convection roast settings, using Frigidaire's guidance."
        url={URL}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Convection Oven Converter", url: URL },
        ]}
      />

      <Hero
        visual={<LiveKnob initial={325} />}
        crumb="Appliance converters / Convection oven"
        h1="Convection oven converter"
        answer={
          <>
            A <span className="p-nb">350°F</span> recipe bakes at <span className="p-nb">325°F</span> on convection.
          </>
        }
        sub={
          <>
            Frigidaire&apos;s rule for{" "}
            <a href={SRC_CONV.bake} {...ext}>
              convection bake
            </a>
            : 25 degrees lower, using the recipe&apos;s shortest time. For{" "}
            <a href={SRC_CONV.roast} {...ext}>
              convection roast
            </a>
            , keep the temperature and cut the time by 25%.
          </>
        }
        updated={UPDATED}
      >
        <ConvectionOvenConverter />
      </Hero>

      <Main more={MORE}>
        <Sec title="Convection bake temperatures">
          <p className="p-p">
            Lower the recipe temperature by {CONV.bakeDropF}°F, then follow the recipe using its shortest time. Frigidaire recommends preheating
            for cookies, biscuits and breads.
          </p>
          <Table
            label="Regular oven to convection bake temperatures"
            head={["Recipe", "Convection bake", "Recipe, °C", "Convection bake, °C"]}
            hi={TEMPS.indexOf(350)}
            rows={TEMPS.map((f) => [`${f}°F`, `${bakeF(f)}°F`, `${r0(fToC(f))}°C`, `${r0(fToC(bakeF(f)))}°C`])}
          />
          <p className="p-note">Celsius values are the Fahrenheit settings converted and rounded to whole degrees.</p>
          <Dumbbells
            title="Recipe temperature and convection bake temperature"
            label="Convection bake temperatures"
            step={50}
            unit="°F"
            keys={[
              { name: "Recipe, regular oven", tone: TONE.blue },
              { name: "Convection bake", tone: TONE.orange },
            ]}
            rows={TEMPS.map((f) => ({ name: `${f}°F recipe`, marks: [{ lo: f, tone: TONE.blue }, { lo: bakeF(f), tone: TONE.orange }], text: `${bakeF(f)}°F` }))}
          />
        </Sec>

        <Sec title="Convection roast times">
          <p className="p-p">
            Keep the recipe temperature and cut the time by {CONV.roastTimeCutPct}%. Check the food at that time and add more if it needs it.
            Frigidaire says convection roast suits tender cuts of beef, lamb, pork and poultry, needs no preheating, and that the meat browns
            better uncovered.
          </p>
          <Table
            label="Regular oven to convection roast times"
            head={["Recipe time", "Convection roast: check at"]}
            hi={TIMES.indexOf(120)}
            rows={TIMES.map((t) => [`${t} min`, `${r0(roastMin(t))} min`])}
          />
          <p className="p-note">
            For roasting times by cut and weight, use the <Link href="/meat-cooking-time-calculator">meat cooking time calculator</Link>, then
            check the internal temperature on the <Link href="/meat-temperature-chart">meat temperature chart</Link>.
          </p>
        </Sec>

        <Sec title="Ovens that convert for you">
          <p className="p-p">
            Some ovens do the subtraction themselves. GE Appliances says its Auto Recipe Conversion, on some models, sets the oven{" "}
            {CONV.geAutoDropF} degrees below the temperature you enter, and most newer GE ranges keep showing the temperature you entered. If
            your oven has a feature like this, enter the recipe temperature as written.
          </p>
        </Sec>

        <Faq faqs={faqs} />

        <Sources
          items={[
            { href: SRC_CONV.bake, title: "How do I use Convection Bake?", by: "Frigidaire" },
            { href: SRC_CONV.roast, title: "How do I use Convection Roast?", by: "Frigidaire" },
            { href: SRC_CONV.ge, title: "Range & Wall Oven: Oven Temperature Incorrect with Convection Cooking", by: "GE Appliances" },
          ]}
        />
      </Main>
    </>
  );
}
