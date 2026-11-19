import { Metadata } from "next";
import Link from "next/link";
import PizzaDoughCalculator from "@/components/calculators/PizzaDoughCalculator";
import LiveDial from "@/components/instrument/LiveDial";
import { Faq, Hero, Main, Sec, Sources, Table, ext, type QA } from "@/components/instrument/kit";
import { BreadcrumbJsonLd, FAQPageJsonLd, WebApplicationJsonLd } from "@/components/seo/JsonLd";
import { NAPOLETANA as N, NAPOLETANA_PCT as P, SRC_BAKERS, bakersPct, d1 } from "@/data/bakers";
import Dumbbells from "@/components/instrument/Dumbbells";
import { TONE } from "@/components/instrument/Bars";
import { OG_IMAGES, TW_IMAGES } from "@/data/social";
import { UPDATED_AT } from "@/data/updated";

const URL = "https://calckitchen.com/pizza-dough-calculator";
const UPDATED = UPDATED_AT["pizza-dough-calculator"];
const TITLE = "Pizza Dough Calculator: Neapolitan Rules and Baker's Percentages";
const DESC =
  "Flour, water, salt and yeast for any number of dough balls. Neapolitan proportions from the EU's Pizza Napoletana rules, or your own baker's percentages.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: { title: TITLE, description: DESC, url: URL, type: "website", images: OG_IMAGES },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: TW_IMAGES },
  alternates: { canonical: URL },
};

/** minutes as "6 h 20 min" */
const hm = (min: number) => `${Math.floor(min / 60)} h${min % 60 ? ` ${min % 60} min` : ""}`;
const faqs: QA[] = [
  {
    question: "What is the hydration of Neapolitan pizza dough?",
    answer: "The EU rules for Pizza Napoletana use 1 litre of water for 1.8 kg of flour: 55.6% hydration in baker's percentages.",
  },
  {
    question: "How much salt goes in Neapolitan pizza dough?",
    answer: "50 to 55 g of sea salt per litre of water and 1.8 kg of flour, which is 2.8 to 3.1% of the flour weight.",
  },
  {
    question: "How much yeast goes in Neapolitan pizza dough?",
    answer: "3 g of brewer's yeast per 1.8 kg of flour, about 0.17% of the flour weight.",
  },
  {
    question: "How big is a Neapolitan dough ball?",
    answer: "Between 180 and 250 g, under the EU rules. The finished pizza is no more than 35 cm across.",
  },
  {
    question: "How hot is the oven for Neapolitan pizza?",
    answer: "485°C (905°F), and the bake must not exceed 60 to 90 seconds, according to the EU rules.",
  },
  {
    question: "What is baker's percentage?",
    answer:
      "King Arthur Baking defines it as each ingredient's weight divided by the flour weight, times 100. Flour is always 100%, so 650 g of water for 1000 g of flour is 65% hydration.",
  },
  {
    question: "Can I use this for New York, Detroit or Sicilian dough?",
    answer:
      "Yes: choose Your own percentages and type in the percentages from your recipe. The calculator works out the weights for any number and size of dough balls.",
  },
];

const MORE = [
  { href: "/bakers-percentage-calculator", title: "Baker's percentage" },
  { href: "/sourdough-calculator", title: "Sourdough calculator" },
  { href: "/oven-temperature-converter", title: "Oven temperature converter" },
  { href: "/cooking-measurement-converter", title: "Measurement converter" },
  { href: "/recipe-scaler", title: "Recipe scaler" },
  { href: "/party-food-calculator", title: "Party food calculator" },
];

export default function PizzaDoughCalculatorPage() {
  return (
    <>
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Pizza Dough Calculator"
        description="Works out flour, water, salt and yeast weights for any number of pizza dough balls, using baker's percentages."
        url={URL}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Pizza Dough Calculator", url: URL },
        ]}
      />

      <Hero
        visual={<LiveDial liveKey="flour" min={0} max={2000} major={250} minor={50} value={630} unit="g" suffix=" g" label="Kitchen scale, flour" />}
        crumb="Baking / Pizza dough"
        h1="Pizza dough calculator"
        long
        answer={
          <>
            Four <span className="p-nb">250-g</span> Neapolitan pizzas: <span className="p-nb">630 g</span> flour,{" "}
            <span className="p-nb">350 g</span> water, <span className="p-nb">18.4 g</span> salt, <span className="p-nb">1.1 g</span> yeast.
          </>
        }
        sub={
          <>
            Those are the proportions in the{" "}
            <a href={SRC_BAKERS.eu} {...ext}>
              EU&apos;s rules for Pizza Napoletana
            </a>
            : 1 litre of water, 1.8 kg of flour, 50 to 55 g of salt and 3 g of brewer&apos;s yeast. For any other style, type in your own
            percentages.
          </>
        }
        updated={UPDATED}
      >
        <PizzaDoughCalculator />
      </Hero>

      <Main more={MORE}>
        <Sec title="Pizza Napoletana: the EU rules">
          <p className="p-p">
            Pizza Napoletana is a traditional speciality guaranteed in the EU. Commission Regulation (EU) No 97/2010 sets out how it is made:
          </p>
          <Table
            label="Pizza Napoletana rules"
            head={["Step", "The rule", "As baker's percentage"]}
            rows={[
              ["Water", "1 litre", `${d1(P.water)}%`],
              ["Flour", `${N.flourG / 1000} kg, W 220 to 380`, "100%"],
              ["Sea salt", `${N.saltLoG} to ${N.saltHiG} g`, `${d1(bakersPct(N.saltLoG, N.flourG))} to ${d1(bakersPct(N.saltHiG, N.flourG))}%`],
              ["Brewer's yeast", `${N.yeastG} g`, `${(Math.round(P.yeast * 100) / 100).toFixed(2)}%`],
              ["Kneading", `${N.kneadMin} minutes at low speed`, "—"],
              ["First rise", `${N.firstRiseH} hours; fermentation at ${N.fermentC}°C`, "—"],
              ["Dough balls", `${N.ballLoG} to ${N.ballHiG} g each`, "—"],
              ["Second rise", `${N.secondRiseLoH} to ${N.secondRiseHiH} hours, in food containers`, "—"],
              ["Pizza size", `Up to ${N.diameterMaxCm} cm across`, "—"],
              ["Bake", `${N.ovenC}°C, no more than ${N.bakeLoS} to ${N.bakeHiS} seconds`, "—"],
            ]}
          />
          <p className="p-note">1 litre of water is taken as 1000 g. The calculator uses the middle of the salt range, 52.5 g.</p>
          <Dumbbells
            title={`From kneading to the oven: ${hm(N.kneadMin + 60 * (N.firstRiseH + N.secondRiseLoH))} to ${hm(N.kneadMin + 60 * (N.firstRiseH + N.secondRiseHiH))}`}
            label="Pizza Napoletana timeline"
            min={0}
            step={1}
            unit="hours"
            keys={[
              { name: "Knead", tone: TONE.ink },
              { name: "First rise", tone: TONE.blue },
              { name: "Second rise, as dough balls", tone: TONE.orange },
              { name: `Up to ${N.secondRiseHiH} hours`, tone: "#F6C9B0" },
              { name: "Into the oven", tone: TONE.purple },
            ]}
            rows={[
              { name: "Knead", marks: [{ lo: 0, hi: N.kneadMin / 60, tone: TONE.ink }], text: `${N.kneadMin} min` },
              {
                name: "First rise",
                marks: [{ lo: N.kneadMin / 60, hi: N.kneadMin / 60 + N.firstRiseH, tone: TONE.blue }],
                text: `${N.firstRiseH} h at ${N.fermentC}°C`,
              },
              {
                name: "Second rise",
                marks: [
                  { lo: N.kneadMin / 60 + N.firstRiseH, hi: N.kneadMin / 60 + N.firstRiseH + N.secondRiseLoH, tone: TONE.orange },
                  { lo: N.kneadMin / 60 + N.firstRiseH + N.secondRiseLoH, hi: N.kneadMin / 60 + N.firstRiseH + N.secondRiseHiH, tone: "#F6C9B0" },
                ],
                text: `${N.secondRiseLoH} to ${N.secondRiseHiH} h`,
              },
              {
                name: "Bake",
                marks: [
                  { lo: N.kneadMin / 60 + N.firstRiseH + N.secondRiseLoH, tone: TONE.purple },
                  { lo: N.kneadMin / 60 + N.firstRiseH + N.secondRiseHiH, tone: TONE.purple },
                ],
                text: `${N.bakeLoS}–${N.bakeHiS} s at ${N.ovenC}°C`,
              },
            ]}
          />
        </Sec>

        <Sec title="How the calculator works">
          <p className="p-p">
            It uses{" "}
            <a href={SRC_BAKERS.ka} {...ext}>
              baker&apos;s percentages
            </a>
            : each ingredient is a percentage of the flour weight, and flour is always 100%. The dough weight is the number of balls times the
            weight of each, and the flour is that total divided by 1 plus the other percentages added together.
          </p>
          <p className="p-formula">flour = dough ÷ (1 + other percentages ÷ 100)</p>
          <p className="p-p">
            For four 250-g balls: 1000 g of dough. At the Neapolitan percentages the other ingredients add up to 58.6% of the flour, so the
            flour is 1000 ÷ 1.5864 = 630 g, the water is 55.6% of that, 350 g, and the salt and yeast follow the same way.
          </p>
          <p className="p-p">
            To turn a recipe you already have into percentages, use the <Link href="/bakers-percentage-calculator">baker&apos;s percentage calculator</Link>.
          </p>
        </Sec>

        <Faq faqs={faqs} />

        <Sources
          items={[
            { href: SRC_BAKERS.eu, title: "Commission Regulation (EU) No 97/2010, Annex II: Pizza Napoletana TSG", by: "European Union (via legislation.gov.uk)" },
            { href: SRC_BAKERS.ka, title: "Baker's Percentage", by: "King Arthur Baking" },
          ]}
        />
      </Main>
    </>
  );
}
