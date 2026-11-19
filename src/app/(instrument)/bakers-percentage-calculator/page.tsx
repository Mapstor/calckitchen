import { Metadata } from "next";
import Link from "next/link";
import BakersPercentageCalculator from "@/components/calculators/BakersPercentageCalculator";
import LiveDial from "@/components/instrument/LiveDial";
import { Faq, Hero, Main, Sec, Sources, Table, ext, type QA } from "@/components/instrument/kit";
import { BreadcrumbJsonLd, FAQPageJsonLd, WebApplicationJsonLd } from "@/components/seo/JsonLd";
import { SRC_BAKERS, bakersPct, d1 } from "@/data/bakers";
import { Split, TONE } from "@/components/instrument/Bars";

const URL = "https://calckitchen.com/bakers-percentage-calculator";
const UPDATED = "2026-11-19"; // CK-008: rebuilt on King Arthur Baking's baker's percentage method
const TITLE = "Baker's Percentage Calculator: Hydration, Percentages and Scaling";
const DESC =
  "Turn recipe weights into baker's percentages, see the hydration, and scale the dough to any weight. Flour is always 100%; 350 g water to 500 g flour is 70%.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: { title: TITLE, description: DESC, url: URL, type: "website" },
  alternates: { canonical: URL },
};

const EX = [
  { name: "Flour", g: 500 },
  { name: "Water", g: 350 },
  { name: "Salt", g: 10 },
  { name: "Yeast", g: 5 },
];
const exTotal = EX.reduce((a, r) => a + bakersPct(r.g, 500), 0);

const faqs: QA[] = [
  {
    question: "What is baker's percentage?",
    answer:
      "A way of writing a recipe in which each ingredient is a percentage of the flour weight. King Arthur Baking puts it this way: flour is always 100%, and every other ingredient is its weight divided by the flour weight, times 100.",
  },
  {
    question: "How do I calculate dough hydration?",
    answer: "Divide the water weight by the flour weight and multiply by 100. 350 g of water for 500 g of flour is 70% hydration.",
  },
  {
    question: "Why do baker's percentages add up to more than 100%?",
    answer: "Because the flour alone is 100% and every other ingredient is added on top of it. A dough of flour, 70% water, 2% salt and 1% yeast totals 173%.",
  },
  {
    question: "How do I scale a recipe with baker's percentages?",
    answer:
      "Divide the dough weight you want by the total percentage (as a decimal) to get the flour, then multiply the flour by each percentage. For 1000 g of dough at 173%, the flour is 1000 ÷ 1.73 = 578 g.",
  },
  {
    question: "What does 65% hydration mean?",
    answer: "65 g of water for every 100 g of flour: 650 g of water for 1000 g of flour.",
  },
  {
    question: "Do I add the weights of two flours together?",
    answer: "Yes. The flours together make up the 100%, so enter their combined weight as the flour.",
  },
];

const MORE = [
  { href: "/pizza-dough-calculator", title: "Pizza dough calculator" },
  { href: "/sourdough-calculator", title: "Sourdough calculator" },
  { href: "/recipe-scaler", title: "Recipe scaler" },
  { href: "/cooking-measurement-converter", title: "Measurement converter" },
  { href: "/butter-converter", title: "Butter converter" },
  { href: "/cake-pan-converter", title: "Cake pan converter" },
];

export default function BakersPercentagePage() {
  return (
    <>
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Baker's Percentage Calculator"
        description="Turns recipe weights into baker's percentages, shows the hydration and scales the dough to any weight."
        url={URL}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Baker's Percentage Calculator", url: URL },
        ]}
      />

      <Hero
        visual={<LiveDial liveKey="hydration" min={0} max={100} major={10} minor={5} value={70} unit="hydration" suffix="%" label="Dough hydration" />}
        crumb="Baking / Baker's percentage"
        h1="Baker's percentage calculator"
        answer={
          <>
            <span className="p-nb">350 g</span> of water for <span className="p-nb">500 g</span> of flour is <span className="p-nb">70%</span>{" "}
            hydration.
          </>
        }
        sub={
          <>
            Divide each ingredient by the flour weight and multiply by 100; flour is always 100%. That is the method in{" "}
            <a href={SRC_BAKERS.ka} {...ext}>
              King Arthur Baking&apos;s guide to baker&apos;s percentage
            </a>
            .
          </>
        }
        updated={UPDATED}
      >
        <BakersPercentageCalculator />
      </Hero>

      <Main more={MORE}>
        <Sec title="How to calculate baker's percentages">
          <p className="p-formula">baker&apos;s % = ingredient weight ÷ flour weight × 100</p>
          <p className="p-p">For a simple bread dough of 500 g flour, 350 g water, 10 g salt and 5 g yeast:</p>
          <Table
            label="Baker's percentages for a simple bread dough"
            head={["Ingredient", "Weight", "Baker's %"]}
            rows={[...EX.map((r) => [r.name, `${r.g} g`, `${d1(bakersPct(r.g, 500))}%`]), ["Total", `${EX.reduce((a, r) => a + r.g, 0)} g`, `${d1(exTotal)}%`]]}
            hi={1}
          />
          <p className="p-p">Bakers call the water percentage the dough&apos;s hydration: this dough is at 70%.</p>
        </Sec>

        <Sec title="How to scale a recipe">
          <p className="p-p">Divide the dough weight you want by the total percentage, written as a decimal, to get the flour. Then multiply the flour by each percentage.</p>
          <p className="p-formula">flour = dough weight ÷ (total % ÷ 100)</p>
          <p className="p-p">
            For 1000 g of the dough above: 1000 ÷ 1.73 = 578 g of flour, then 70% of that for the water (405 g), 2% for the salt (11.6 g) and 1%
            for the yeast (5.8 g). The calculator does this when you enter a dough weight. For pizza, the{" "}
            <Link href="/pizza-dough-calculator">pizza dough calculator</Link> works from the number and size of dough balls.
          </p>
          <Split
            title="1000 g of the dough above, by weight"
            label="1000 g of dough split by ingredient"
            parts={EX.map((r, i) => {
              const g = (r.g * 1000) / EX.reduce((a, x) => a + x.g, 0);
              return { name: r.name, v: g, text: `${g < 100 ? d1(g) : Math.round(g)} g`, tone: [TONE.blue, TONE.orange, TONE.purple, TONE.green][i] ?? TONE.steel };
            })}
          />
        </Sec>

        <Faq faqs={faqs} />

        <Sources items={[{ href: SRC_BAKERS.ka, title: "Baker's Percentage", by: "King Arthur Baking" }]} />
      </Main>
    </>
  );
}
