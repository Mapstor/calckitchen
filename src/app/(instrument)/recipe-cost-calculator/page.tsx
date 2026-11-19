import { Metadata } from "next";
import LiveDial from "@/components/instrument/LiveDial";
import RecipeCostCalculator from "@/components/calculators/RecipeCostCalculator";
import { Faq, Hero, Main, Sec, Sources, Table, ext, type QA } from "@/components/instrument/kit";
import { BreadcrumbJsonLd, FAQPageJsonLd, WebApplicationJsonLd } from "@/components/seo/JsonLd";
import { SRC_OVEN } from "@/data/oven-temps";
import { UNITS } from "@/data/units";
import { Split, TONE } from "@/components/instrument/Bars";

const URL = "https://calckitchen.com/recipe-cost-calculator";
const UPDATED = "2026-11-19"; // CK-008: rebuilt; exact NIST unit factors, no guessed cup-to-gram densities
const TITLE = "Recipe Cost Calculator: Cost per Serving and Menu Price";
const DESC =
  "Work out what a recipe costs from what you paid for each package, the cost per serving, and a menu price at your target food-cost percentage.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: { title: TITLE, description: DESC, url: URL, type: "website" },
  alternates: { canonical: URL },
};

const faqs: QA[] = [
  {
    question: "How do I calculate the cost of a recipe?",
    answer:
      "For each ingredient, divide the amount the recipe uses by the package size and multiply by the package price. Then add the ingredients up. 250 g of flour from a 5-lb bag that cost $4.00 is 250 ÷ 2267.96 × 4.00 = $0.44.",
  },
  {
    question: "How do I calculate cost per serving?",
    answer: "Divide the recipe cost by the number of servings it makes. A $1.32 recipe that serves 4 costs $0.33 a serving.",
  },
  {
    question: "What is food cost percentage?",
    answer: "The ingredient cost of a dish as a percentage of its menu price: cost per serving ÷ menu price × 100. A $0.33 serving sold for $1.10 is a 30% food cost.",
  },
  {
    question: "How do I price a menu item from its food cost?",
    answer: "Divide the cost per serving by your target food-cost percentage, written as a decimal. At 30%, a $0.33 serving prices at 0.33 ÷ 0.30 = $1.10.",
  },
  {
    question: "Why won't the calculator convert cups to pounds?",
    answer:
      "A cup measures volume and a pound measures weight. Turning one into the other needs the density of that particular ingredient, so the calculator only converts weight to weight and volume to volume. Enter what you used in the same kind of unit as the package.",
  },
  {
    question: "How many grams are in a pound and an ounce?",
    answer: "A pound is exactly 453.59237 grams and an ounce, a sixteenth of a pound, is 28.349523125 grams.",
  },
];

const ROWS: [string, string][] = [
  ["1 pound (lb)", "453.59237 g"],
  ["1 ounce (oz)", `${UNITS.oz.base} g`],
  ["1 US gallon (gal)", "3.785411784 L"],
  ["1 quart (qt)", `${UNITS.qt.base} mL`],
  ["1 cup", `${UNITS.cup.base} mL`],
  ["1 fluid ounce (fl oz)", `${UNITS["fl oz"].base} mL`],
  ["1 tablespoon (tbsp)", `${UNITS.tbsp.base} mL`],
  ["1 teaspoon (tsp)", `${UNITS.tsp.base} mL`],
];

const MORE = [
  { href: "/recipe-scaler", title: "Recipe scaler" },
  { href: "/party-food-calculator", title: "Party food calculator" },
  { href: "/recipe-macro-calculator", title: "Recipe macros" },
  { href: "/cooking-measurement-converter", title: "Measurement converter" },
  { href: "/butter-converter", title: "Butter converter" },
  { href: "/cake-servings-calculator", title: "Cake servings calculator" },
];

export default function RecipeCostPage() {
  return (
    <>
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Recipe Cost Calculator"
        description="Works out recipe cost, cost per serving and a menu price at a target food-cost percentage from package prices."
        url={URL}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Recipe Cost Calculator", url: URL },
        ]}
      />

      <Hero
        visual={<LiveDial liveKey="cost" min={0} max={5} major={0.5} minor={0.1} value={0.33} unit="per serving" prefix="$" decimals={2} suffix="" label="Cost per serving" />}
        crumb="Recipe tools / Recipe cost"
        h1="Recipe cost calculator"
        answer={
          <>
            A <span className="p-nb">$1.32</span> recipe that serves <span className="p-nb">4</span> costs <span className="p-nb">$0.33</span> a serving.
          </>
        }
        sub={
          <>
            Each ingredient costs the amount used ÷ the package size × the package price. Add them up and divide by the servings. Units
            convert with the exact definitions in{" "}
            <a href={SRC_OVEN.nist} {...ext}>
              NIST&apos;s guide to units
            </a>
            .
          </>
        }
        updated={UPDATED}
      >
        <RecipeCostCalculator />
      </Hero>

      <Main more={MORE}>
        <Sec title="How to cost a recipe">
          <p className="p-formula">ingredient cost = amount used ÷ package size × package price</p>
          <p className="p-p">With the example prices in the calculator, which are there to show the arithmetic:</p>
          <Table
            label="Example recipe cost"
            head={["Ingredient", "Used", "Package", "Cost"]}
            rows={[
              ["Flour", "250 g", "5 lb for $4.00", "250 ÷ 2267.96 × 4.00 = $0.44"],
              ["Milk", "1.5 cups", "1 gallon (16 cups) for $4.00", "1.5 ÷ 16 × 4.00 = $0.38"],
              ["Eggs", "2", "12 for $3.00", "2 ÷ 12 × 3.00 = $0.50"],
              ["Total", "", "", "$1.32"],
            ]}
          />
          <p className="p-p">Four servings: $1.32 ÷ 4 = $0.33 a serving.</p>
        </Sec>

        <Sec title="Food cost percentage and menu price">
          <p className="p-formula">menu price = cost per serving ÷ (food cost % ÷ 100)</p>
          <p className="p-p">
            Food cost percentage is the ingredient cost of a dish as a share of its menu price. Pick the percentage you want and the formula
            gives the price: a $0.33 serving at 30% sells for 0.33 ÷ 0.30 = $1.10.
          </p>
          <Split
            title="The $1.10 menu price at 30% food cost"
            label="Menu price split into food cost and the rest"
            parts={[
              { name: "Ingredients, 30%", v: 0.33, text: "$0.33", tone: TONE.orange },
              { name: "The rest of the price, 70%", v: 0.77, text: "$0.77", tone: TONE.steel },
            ]}
          />
        </Sec>

        <Sec title="Unit conversions the calculator uses">
          <p className="p-p">
            These are exact definitions, so package sizes in pounds and recipe amounts in grams (or gallons and cups) convert without rounding
            errors. Weight and volume never convert into each other here: that needs each ingredient&apos;s density.
          </p>
          <Table label="Kitchen unit definitions" head={["Unit", "Exactly"]} rows={ROWS} />
        </Sec>

        <Faq faqs={faqs} />

        <Sources items={[{ href: SRC_OVEN.nist, title: "NIST Guide to the SI, Appendix B.9: Factors for units listed by kind of quantity", by: "National Institute of Standards and Technology" }]} />
      </Main>
    </>
  );
}
