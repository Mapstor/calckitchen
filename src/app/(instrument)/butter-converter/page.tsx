import { Metadata } from "next";
import LiveDial from "@/components/instrument/LiveDial";
import ButterConverter from "@/components/calculators/ButterConverter";
import { Faq, Hero, Main, Sec, Sources, Table, ext, type QA } from "@/components/instrument/kit";
import { BreadcrumbJsonLd, FAQPageJsonLd, WebApplicationJsonLd } from "@/components/seo/JsonLd";
import { CHART_GRAMS, CHART_STICKS, FDC_BUTTER, SRC_BUTTER, STICK_G, amt, fromSticks, grams, toSticks } from "@/data/butter";
import Strips from "@/components/instrument/Strips";
import { OG_IMAGES, TW_IMAGES } from "@/data/social";
import { UPDATED_AT } from "@/data/updated";

const URL = "https://calckitchen.com/butter-converter";
const UPDATED = UPDATED_AT["butter-converter"];
const TITLE = "Butter Converter: Sticks to Cups, Grams, Tablespoons and Ounces";
const DESC =
  "A stick of butter is 1/2 cup, 8 tablespoons, 4 ounces or 113 grams. Convert butter between sticks, cups, tablespoons, grams, ounces and pounds.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: { title: TITLE, description: DESC, url: URL, type: "website", images: OG_IMAGES },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: TW_IMAGES },
  alternates: { canonical: URL },
};

const faqs: QA[] = [
  {
    question: "How many cups is a stick of butter?",
    answer: "Half a cup. One stick is also 8 tablespoons, 4 ounces and 113 grams, and two sticks make a cup.",
  },
  {
    question: "How many tablespoons are in a stick of butter?",
    answer: "8. Land O'Lakes marks its wrappers with one line per tablespoon, so you can cut 1 to 8 tablespoons without a measuring spoon.",
  },
  {
    question: "How many grams is a stick of butter?",
    answer: "113 grams. A stick weighs 4 ounces and an ounce is 28.35 grams, so 4 × 28.35 = 113.4 g. USDA FoodData Central lists a stick at 113 g.",
  },
  {
    question: "How many grams is a cup of butter?",
    answer: "227 grams: two sticks, or half a pound.",
  },
  {
    question: "How many grams is a tablespoon of butter?",
    answer: "14.2 grams, by USDA's weight. A teaspoon is a third of a tablespoon, about 4.7 grams.",
  },
  {
    question: "How many sticks of butter are in a pound?",
    answer: "Four. A pound of butter is also 2 cups or 32 tablespoons.",
  },
  {
    question: "How much is half a stick of butter?",
    answer: "¼ cup, 4 tablespoons, 2 ounces or 56.7 grams.",
  },
  {
    question: "How many sticks of butter is 250 grams?",
    answer: "2.2 sticks: two full sticks plus 1.6 tablespoons of a third. That is 1.1 cups.",
  },
  {
    question: "Is a stick of butter 4 ounces by weight or by volume?",
    answer: "Both come to 4. By weight a stick is 4 ounces, a quarter pound. By volume it is half a cup, and half a US cup is 4 fluid ounces.",
  },
  {
    question: "How many calories are in a tablespoon of butter?",
    answer: "102, with 11.5 g of fat, 7.3 g of it saturated, according to USDA FoodData Central for salted butter. A stick has 810 calories.",
  },
];

const MORE = [
  { href: "/cooking-measurement-converter", title: "Measurement converter" },
  { href: "/recipe-scaler", title: "Recipe scaler" },
  { href: "/recipe-macro-calculator", title: "Recipe macros" },
  { href: "/bakers-percentage-calculator", title: "Baker's percentage" },
  { href: "/cake-pan-converter", title: "Cake pan converter" },
  { href: "/recipe-cost-calculator", title: "Recipe cost" },
];

export default function ButterConverterPage() {
  return (
    <>
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Butter Converter"
        description="Converts butter between sticks, cups, tablespoons, teaspoons, grams, ounces and pounds, based on a half-cup, 4-ounce stick."
        url={URL}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Butter Converter", url: URL },
        ]}
      />

      <Hero
        visual={
          <LiveDial
            liveKey="butter"
            min={0}
            max={500}
            major={50}
            minor={10}
            value={113}
            marks={[STICK_G, 2 * STICK_G, 4 * STICK_G]}
            unit="g"
            suffix=" g"
            label="Kitchen scale, butter"
          />
        }
        crumb="Recipe tools / Butter converter"
        h1="Butter converter"
        answer={
          <>
            A stick of butter is <span className="p-nb">½ cup</span>, 8 tablespoons, 4 ounces or <span className="p-nb">113 grams</span>.
          </>
        }
        sub={
          <>
            That&apos;s the stick in{" "}
            <a href={SRC_BUTTER.lol} {...ext}>
              Land O&apos;Lakes&apos; conversion table
            </a>
            , and four sticks make a pound.{" "}
            <a href={SRC_BUTTER.fdc} {...ext}>
              USDA FoodData Central
            </a>{" "}
            weighs a cup of butter at 227 g and a tablespoon at 14.2 g.
          </>
        }
        updated={UPDATED}
      >
        <ButterConverter />
      </Hero>

      <Main more={MORE}>
        <Sec title="Butter conversion chart">
          <p className="p-p">From a tablespoon to a pound. Every row follows from one stick:</p>
          <p className="p-formula">1 stick = ½ cup = 8 tbsp = 4 oz = 113.4 g</p>
          <Table
            label="Butter sticks to cups, tablespoons, ounces and grams"
            head={["Sticks", "Cups", "Tablespoons", "Ounces", "Grams"]}
            hi={CHART_STICKS.indexOf(1)}
            rows={CHART_STICKS.map((s) => [
              amt(s, 2),
              amt(fromSticks(s, "cup"), 2),
              amt(fromSticks(s, "tbsp"), 1),
              amt(fromSticks(s, "oz"), 1),
              `${grams(s * STICK_G)} g`,
            ])}
          />
          <p className="p-note">Land O&apos;Lakes&apos; table rounds the same rows to whole grams: 14, 57, 76, 113, 170, 227 and 454 g.</p>
        </Sec>

        <Sec title="Grams of butter to sticks, cups and tablespoons">
          <p className="p-p">For recipes that weigh butter. Divide the grams by 113.4 for sticks, by 226.8 for cups or by 14.17 for tablespoons.</p>
          <Table
            label="Grams of butter to sticks, cups and tablespoons"
            head={["Grams", "Sticks", "Cups", "Tablespoons"]}
            hi={CHART_GRAMS.indexOf(250)}
            rows={CHART_GRAMS.map((g) => {
              const s = toSticks(g, "g");
              return [`${g} g`, amt(s, 2), amt(fromSticks(s, "cup"), 2), amt(fromSticks(s, "tbsp"), 1)];
            })}
          />
        </Sec>

        <Sec title="Measuring butter by the wrapper">
          <p className="p-p">
            Land O&apos;Lakes marks its stick wrappers in tablespoons, one line per tablespoon, so you can measure butter without a cup:
          </p>
          <ul className="p-tips">
            <li>
              <strong>¼ cup:</strong> half a stick, 4 marks.
            </li>
            <li>
              <strong>⅓ cup:</strong> 5⅓ marks, which is 5 tablespoons and 1 teaspoon.
            </li>
            <li>
              <strong>¾ cup:</strong> a full stick and 4 marks of the next, 12 tablespoons.
            </li>
            <li>
              <strong>1 pound:</strong> 4 sticks.
            </li>
          </ul>
          <Strips
            title="The marks on two sticks"
            label="Butter measured by the wrapper marks"
            stripName="One tablespoon mark"
            cells={8}
            per={2}
            rows={[
              { name: "¼ cup", amount: 4, text: "4 marks" },
              { name: "⅓ cup", amount: 16 / 3, text: "5⅓ marks" },
              { name: "½ cup", amount: 8, text: "1 stick" },
              { name: "¾ cup", amount: 12, text: "1 stick + 4 marks" },
            ]}
          />
        </Sec>

        <Sec title="Calories and fat in butter">
          <p className="p-p">USDA FoodData Central&apos;s figures for salted butter, for the measures it lists:</p>
          <Table
            label="Calories and fat in salted butter"
            head={["Measure", "Weight", "Calories", "Fat", "Saturated fat"]}
            hi={FDC_BUTTER.findIndex((r) => r.measure === "1 stick")}
            rows={FDC_BUTTER.map((r) => [r.measure, `${r.g} g`, r.kcal.toLocaleString("en-US"), `${r.fat} g`, `${r.sat} g`])}
          />
          <p className="p-note">By USDA&apos;s analysis, salted butter is 81.1% fat and 16.2% water by weight.</p>
        </Sec>

        <Faq faqs={faqs} />

        <Sources
          items={[
            { href: SRC_BUTTER.lol, title: "Cooking Measurements & Abbreviations", by: "Land O'Lakes" },
            { href: SRC_BUTTER.fdc, title: "Butter, salted (SR Legacy, FDC ID 173410)", by: "USDA FoodData Central" },
            { href: SRC_BUTTER.nist, title: "Guide to the SI, Appendix B.9: ounce, pound, cup, tablespoon and teaspoon", by: "NIST" },
          ]}
        />
      </Main>
    </>
  );
}
