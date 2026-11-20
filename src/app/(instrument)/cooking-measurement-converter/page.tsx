import { Metadata } from "next";
import LiveDial from "@/components/instrument/LiveDial";
import CookingMeasurementConverter from "@/components/calculators/CookingMeasurementConverter";
import { Faq, Hero, Main, Sec, Sources, Table, ext, type QA } from "@/components/instrument/kit";
import { BreadcrumbJsonLd, FAQPageJsonLd, WebApplicationJsonLd } from "@/components/seo/JsonLd";
import { FDC_FOOD, INGREDIENTS, MASS, SRC_MEASURES, VOL, dec, gramsPerCup, gtxt } from "@/data/measures";
import Bars, { TONE } from "@/components/instrument/Bars";
import { OG_IMAGES, TW_IMAGES } from "@/data/social";
import { UPDATED_AT } from "@/data/updated";

const URL = "https://calckitchen.com/cooking-measurement-converter";
const UPDATED = UPDATED_AT["cooking-measurement-converter"];
const TITLE = "Cooking Measurement Converter: Cups to Grams, Tablespoons, Ounces";
const DESC =
  "Convert cups to grams for 25 ingredients by USDA weights (a cup of flour is 125 g), plus exact US volume and weight units: cups, tablespoons, teaspoons, ounces, mL.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: { title: TITLE, description: DESC, url: URL, type: "website", images: OG_IMAGES },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: TW_IMAGES },
  alternates: { canonical: URL },
};

const faqs: QA[] = [
  {
    question: "How many grams are in a cup of flour?",
    answer: "125 g of all-purpose flour, by USDA FoodData Central's measure. A cup of bread flour weighs 137 g and whole wheat flour 120 g.",
  },
  {
    question: "How many grams are in a cup of sugar?",
    answer: "200 g of granulated sugar. A cup of packed brown sugar weighs 220 g and unsifted powdered sugar 120 g, by USDA's measures.",
  },
  {
    question: "How many tablespoons are in a cup?",
    answer: "16. A tablespoon is 3 teaspoons, and a cup is 8 fluid ounces or 236.6 mL.",
  },
  {
    question: "How many ounces are in a cup?",
    answer: "8 fluid ounces by volume. By weight it depends on the ingredient: a cup of all-purpose flour weighs 4.41 oz and a cup of water 8.36 oz, from USDA's 125 g and 237 g.",
  },
  {
    question: "How many cups are in a quart?",
    answer: "4 cups, or 2 pints. A gallon is 4 quarts, which is 16 cups.",
  },
  {
    question: "How many grams are in a teaspoon of salt?",
    answer: "6 g of table salt, by USDA's measure. A teaspoon of baking soda or baking powder weighs 4.6 g.",
  },
  {
    question: "How many grams is a tablespoon of butter?",
    answer: "14.2 g. USDA weighs a cup of butter at 227 g, and a cup is 16 tablespoons.",
  },
  {
    question: "How many milliliters are in a cup?",
    answer: "236.6 mL in a US cup; NIST lists it as 236.5882 mL. A tablespoon is 14.8 mL and a teaspoon 4.9 mL.",
  },
];

const MORE = [
  { href: "/butter-converter", title: "Butter converter" },
  { href: "/recipe-scaler", title: "Recipe scaler" },
  { href: "/oven-temperature-converter", title: "Oven temperature" },
  { href: "/recipe-macro-calculator", title: "Recipe macros" },
  { href: "/bakers-percentage-calculator", title: "Baker's percentage" },
  { href: "/recipe-cost-calculator", title: "Recipe cost" },
];

const ml = (k: string) => VOL.find((v) => v.key === k)!.ml;
const f2 = (x: number) => x.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const VOL_ROWS: [string, string, string][] = [
  ["Teaspoon", "—", f2(ml("tsp"))],
  ["Tablespoon", "3 teaspoons", f2(ml("tbsp"))],
  ["Fluid ounce", "2 tablespoons", f2(ml("floz"))],
  ["Cup", "8 fl oz, 16 tablespoons", f2(ml("cup"))],
  ["Pint", "2 cups", f2(ml("pint"))],
  ["Quart", "2 pints, 4 cups", f2(ml("quart"))],
  ["Gallon", "4 quarts, 16 cups", f2(ml("gallon"))],
];
const g = (k: string) => MASS.find((m) => m.key === k)!.g;

export default function CookingMeasurementConverterPage() {
  return (
    <>
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Cooking Measurement Converter"
        description="Converts cups, tablespoons and teaspoons to grams for 25 ingredients by USDA weights, and converts US volume and weight units exactly."
        url={URL}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Cooking Measurement Converter", url: URL },
        ]}
      />

      <Hero
        visual={<LiveDial liveKey="measure" min={0} max={500} major={50} minor={10} value={125} unit="g" suffix=" g" label="Kitchen scale" />}
        crumb="Recipe tools / Measurement converter"
        h1="Cooking measurement converter"
        long
        answer={
          <>
            A cup of all-purpose flour weighs <span className="p-nb">125 g</span>, a cup of sugar 200 g and a cup of butter{" "}
            <span className="p-nb">227 g</span>.
          </>
        }
        sub={
          <>
            Those are{" "}
            <a href={SRC_MEASURES.fdc} {...ext}>
              USDA FoodData Central&apos;s
            </a>{" "}
            weights; the converter has them for 25 ingredients. Volume and weight units convert exactly: a US cup is 16 tablespoons, 8 fluid ounces
            or 236.6 mL.
          </>
        }
        updated={UPDATED}
      >
        <CookingMeasurementConverter />
      </Hero>

      <Main more={MORE}>
        <Sec title="Cups to grams for 25 ingredients">
          <p className="p-p">
            Grams per cup from USDA FoodData Central. Spoon weights follow from the cup: 16 tablespoons or 48 teaspoons. Each name links to its USDA
            entry.
          </p>
          <Table
            label="Grams per cup, tablespoon and teaspoon by ingredient"
            head={["Ingredient", "1 cup", "1 tbsp", "1 tsp", "USDA measure"]}
            hi={0}
            rows={INGREDIENTS.map((i) => {
              const c = gramsPerCup(i);
              return [
                <a key={i.key} href={FDC_FOOD(i.fdc)} {...ext}>
                  {i.name}
                </a>,
                `${gtxt(c)} g`,
                `${gtxt(c / 16)} g`,
                `${gtxt(c / 48)} g`,
                `${i.measure} = ${i.g} g`,
              ];
            })}
          />
          <p className="p-note">How you fill the cup changes the weight: USDA lists brown sugar at 220 g packed and 145 g unpacked.</p>
          <Bars
            title="What one cup weighs"
            label="Grams in one US cup, USDA FoodData Central"
            rows={INGREDIENTS.filter((i) => i.per === "cup")
              .map((i) => ({ name: i.name, v: gramsPerCup(i), text: `${gtxt(gramsPerCup(i))} g`, tone: TONE.blue }))
              .sort((a, b) => b.v - a.v)}
          />
        </Sec>

        <Sec title="US volume measures">
          <p className="p-p">
            Exact US customary units; the milliliters are{" "}
            <a href={SRC_MEASURES.nist} {...ext}>
              NIST&apos;s
            </a>{" "}
            factors.
          </p>
          <Table label="US volume measures in milliliters" head={["Unit", "Equals", "Milliliters"]} hi={3} rows={VOL_ROWS} />
        </Sec>

        <Sec title="Weight measures">
          <Table
            label="Ounces, pounds, grams and kilograms"
            head={["Unit", "Equals", "Grams"]}
            rows={[
              ["Ounce", "1/16 pound", f2(g("oz"))],
              ["Pound", "16 ounces", f2(g("lb"))],
              ["Kilogram", `${dec(1000 / g("lb"), 2)} pounds, ${dec(1000 / g("oz"), 2)} ounces`, "1,000"],
            ]}
          />
        </Sec>

        <Faq faqs={faqs} />

        <Sources
          items={[
            { href: SRC_MEASURES.fdc, title: "FoodData Central, SR Legacy household measures (25 entries linked in the table above)", by: "USDA Agricultural Research Service" },
            { href: SRC_MEASURES.nist, title: "Guide to the SI, Appendix B.9: cup, tablespoon, teaspoon, fluid ounce, gallon, ounce, pound", by: "NIST" },
          ]}
        />
      </Main>
    </>
  );
}
