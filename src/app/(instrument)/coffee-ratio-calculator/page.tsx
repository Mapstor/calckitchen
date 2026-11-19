import { Metadata } from "next";
import LiveDial from "@/components/instrument/LiveDial";
import CoffeeRatioCalculator from "@/components/calculators/CoffeeRatioCalculator";
import { Faq, Hero, Main, Sec, Sources, Table, ext, type QA } from "@/components/instrument/kit";
import { BreadcrumbJsonLd, FAQPageJsonLd, WebApplicationJsonLd } from "@/components/seo/JsonLd";
import { METHODS, ML_PER_FLOZ, SRC_COFFEE, coffeeRange, d1, ratioText, waterGrams } from "@/data/coffee";
import { RatioRows, TONE } from "@/components/instrument/Bars";

const URL = "https://calckitchen.com/coffee-ratio-calculator";
const UPDATED = "2026-11-19"; // CK-009: rebuilt on the SCA brewer standard and the National Coffee Association's brewing guides
const TITLE = "Coffee Ratio Calculator: Coffee to Water for Drip, Pour-Over, French Press";
const DESC =
  "How much coffee for your water: 55 g per liter for drip (SCA standard), 1:13 to 1:16 pour-over, 1:10 to 1:16 French press, 1:4 to 1:5 cold brew, 1:2 espresso (NCA).";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: { title: TITLE, description: DESC, url: URL, type: "website" },
  alternates: { canonical: URL },
};

const faqs: QA[] = [
  {
    question: "What is the best coffee to water ratio?",
    answer:
      "It depends on the method. The SCA's standard for drip brewers is 55 g of coffee per liter of water, about 1:18; the National Coffee Association gives 1:13 to 1:16 for pour-over and 1:10 to 1:16 for French press.",
  },
  {
    question: "How much coffee for 1 liter of water?",
    answer: "55 g in a drip brewer, at the SCA's standard ratio. For pour-over at the NCA's 1:16 to 1:13, it's 62.5 to 76.9 g.",
  },
  {
    question: "What is the cold brew ratio?",
    answer: "1 g of coffee to 4 to 5 g of water, steeped 12 hours or overnight, says the National Coffee Association. A liter of water takes 200 to 250 g of coffee.",
  },
  {
    question: "What is the espresso ratio?",
    answer: "1:2 by weight: 1 g of dry coffee to 2 g of liquid espresso, per the NCA. An 18 g dose makes 36 g of espresso.",
  },
  {
    question: "How many tablespoons of coffee per cup?",
    answer: "1 to 2 tablespoons per 6 ounces of water, the NCA's Golden Ratio for drip coffee. An 8-ounce mug takes 1⅓ to 2⅔ tablespoons.",
  },
  {
    question: "What water temperature is best for coffee?",
    answer: "93 ± 3°C, about 194 to 205°F, for pour-over and French press, per the NCA. The SCA's home brewer standard holds 90 to 96°C while brewing.",
  },
  {
    question: "How many grams of coffee for a 12-ounce cup?",
    answer: "19.5 g in a drip brewer at the SCA ratio: 12 fl oz is 354.9 mL of water.",
  },
  {
    question: "What does a 1:16 ratio mean?",
    answer: "1 g of coffee for every 16 g of water, so 1 liter of water takes 62.5 g of coffee.",
  },
];

const MORE = [
  { href: "/cooking-measurement-converter", title: "Measurement converter" },
  { href: "/recipe-scaler", title: "Recipe scaler" },
  { href: "/party-food-calculator", title: "Party food" },
  { href: "/recipe-macro-calculator", title: "Recipe macros" },
  { href: "/recipe-cost-calculator", title: "Recipe cost" },
  { href: "/butter-converter", title: "Butter converter" },
];

const WATER: [string, number][] = [
  ["8 fl oz", 8 * ML_PER_FLOZ],
  ["12 fl oz", 12 * ML_PER_FLOZ],
  ["16 fl oz", 16 * ML_PER_FLOZ],
  ["500 mL", 500],
  ["1 L", 1000],
  ["1.5 L", 1500],
];
const BREW = METHODS.filter((m) => m.key !== "espresso");
const g = (lo: number, hi: number) => (Math.abs(lo - hi) < 0.05 ? `${d1(lo)} g` : `${d1(lo)}–${d1(hi)} g`);

export default function CoffeeRatioCalculatorPage() {
  return (
    <>
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Coffee Ratio Calculator"
        description="Works out grams of coffee for an amount of water by brewing method, from the SCA's standard brew ratio and the National Coffee Association's method ratios."
        url={URL}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Coffee Ratio Calculator", url: URL },
        ]}
      />

      <Hero
        visual={<LiveDial liveKey="coffee" min={0} max={100} major={10} minor={2} value={55} unit="g" suffix=" g" label="Kitchen scale, coffee" />}
        crumb="Recipe tools / Coffee ratio"
        h1="Coffee ratio calculator"
        long
        answer={
          <>
            Use <span className="p-nb">55 g</span> of coffee per liter of water in a drip brewer: the SCA&apos;s standard ratio, about{" "}
            <span className="p-nb">1:18</span>.
          </>
        }
        sub={
          <>
            The{" "}
            <a href={SRC_COFFEE.pourover} {...ext}>
              National Coffee Association
            </a>{" "}
            gives 1:13 to 1:16 for pour-over, 1:10 to 1:16 for French press, 1:4 to 1:5 for cold brew and 1:2 for espresso, or 1 to 2 tablespoons per 6
            ounces of water in a drip machine.
          </>
        }
        updated={UPDATED}
      >
        <CoffeeRatioCalculator />
      </Hero>

      <Main more={MORE}>
        <Sec title="Coffee for common amounts of water">
          <p className="p-p">Grams of ground coffee by method. Ranges run from the weaker end of each ratio to the stronger.</p>
          <Table
            label="Grams of coffee by water amount and brewing method"
            head={["Water", ...BREW.map((m) => `${m.name} (${ratioText(m)})`)]}
            hi={4}
            rows={WATER.map(([label, ml]) => [label, ...BREW.map((m) => {
              const r = coffeeRange(waterGrams(ml), m);
              return g(r.lo, r.hi);
            })])}
          />
          <RatioRows
            title="The five ratios side by side: a longer row is a weaker brew"
            label="Coffee ratios by method"
            aName="Coffee"
            bName="Water (espresso: the liquid shot)"
            aTone={TONE.orange}
            bTone={TONE.blue}
            rows={METHODS.map((m) => ({ name: m.name, b: m.lo, bHi: m.hi, text: ratioText(m) }))}
          />
        </Sec>

        <Sec title="Where the ratios come from">
          <ul className="p-tips">
            <li>
              <strong>Drip, 55 g per liter:</strong> the brew ratio in the{" "}
              <a href={SRC_COFFEE.sca} {...ext}>
                Specialty Coffee Association&apos;s Standard 310-2021
              </a>{" "}
              for home coffee brewers, which also requires 90 to 96°C while brewing.
            </li>
            <li>
              <strong>Drip by the spoon:</strong> the National Coffee Association&apos;s{" "}
              <a href={SRC_COFFEE.drip} {...ext}>
                Golden Ratio
              </a>
              , 1 to 2 tablespoons of ground coffee per 6 ounces of water.
            </li>
            <li>
              <strong>Pour-over and French press:</strong> 1:13 to 1:16 and 1:10 to 1:16, both with water at 93 ± 3°C, from the NCA&apos;s{" "}
              <a href={SRC_COFFEE.pourover} {...ext}>
                pour-over
              </a>{" "}
              and{" "}
              <a href={SRC_COFFEE.frenchpress} {...ext}>
                French press
              </a>{" "}
              guides.
            </li>
            <li>
              <strong>Cold brew:</strong> 1:4 to 1:5, steeped 12 hours or overnight, from the NCA&apos;s{" "}
              <a href={SRC_COFFEE.coldbrew} {...ext}>
                cold brew guide
              </a>
              .
            </li>
            <li>
              <strong>Espresso:</strong> 1:2, dry coffee to liquid espresso, from the NCA&apos;s{" "}
              <a href={SRC_COFFEE.espresso} {...ext}>
                espresso guide
              </a>
              .
            </li>
          </ul>
        </Sec>

        <Faq faqs={faqs} />

        <Sources
          items={[
            { href: SRC_COFFEE.sca, title: "SCA Standard 310-2021, Home Coffee Brewers: Specifications and Test Methods", by: "Specialty Coffee Association" },
            { href: SRC_COFFEE.drip, title: "Drip coffee; Pour-over coffee; French press coffee; Cold brew coffee; Espresso (About Coffee)", by: "National Coffee Association USA" },
            { href: SRC_COFFEE.water, title: "Beverages, water, tap, drinking (SR Legacy, FDC ID 173647)", by: "USDA FoodData Central" },
          ]}
        />
      </Main>
    </>
  );
}
