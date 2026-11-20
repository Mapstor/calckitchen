import { Metadata } from "next";
import LiveDial from "@/components/instrument/LiveDial";
import RecipeMacroCalculator from "@/components/calculators/RecipeMacroCalculator";
import { Faq, Hero, Main, Sec, Sources, Table, ext, type QA } from "@/components/instrument/kit";
import { BreadcrumbJsonLd, FAQPageJsonLd, WebApplicationJsonLd } from "@/components/seo/JsonLd";
import { FDC_FOOD, FOODS, SAMPLE, SAMPLE_SERVINGS, SRC_FDC, grams, macrosFor, r0, r1, sumMacros } from "@/data/macros";
import Bars, { TONE } from "@/components/instrument/Bars";
import { OG_IMAGES, TW_IMAGES } from "@/data/social";
import { UPDATED_AT } from "@/data/updated";

const URL = "https://calckitchen.com/recipe-macro-calculator";
const UPDATED = UPDATED_AT["recipe-macro-calculator"];
const TITLE = "Recipe Macro Calculator: Calories, Protein, Carbs and Fat per Serving";
const DESC =
  "Add up a recipe's calories, protein, carbs and fat per serving from ingredient weights, with USDA FoodData Central values for 23 common ingredients or your own label figures.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: { title: TITLE, description: DESC, url: URL, type: "website", images: OG_IMAGES },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: TW_IMAGES },
  alternates: { canonical: URL },
};

const faqs: QA[] = [
  {
    question: "How do I calculate the macros in a recipe?",
    answer:
      "For each ingredient, multiply its value per 100 g by its weight in grams and divide by 100. Add the ingredients up, then divide by the number of servings.",
  },
  {
    question: "How many calories are in a cup of all-purpose flour?",
    answer: "455. USDA FoodData Central weighs a cup of all-purpose flour at 125 g and lists 364 calories per 100 g.",
  },
  {
    question: "How much protein is in a chicken breast?",
    answer: "22.5 g per 100 g of raw, skinless, boneless breast, according to USDA FoodData Central. 4 oz (113 g) raw holds 25.4 g.",
  },
  {
    question: "How many calories are in a tablespoon of olive oil?",
    answer: "119. USDA weighs a tablespoon of olive oil at 13.5 g, at 884 calories per 100 g.",
  },
  {
    question: "How many calories are in an egg?",
    answer: "72 in a large egg: USDA weighs it at 50 g out of the shell, at 143 calories per 100 g.",
  },
  {
    question: "Should I weigh ingredients raw or cooked?",
    answer: "Raw, with these figures: every USDA entry in this calculator is raw or dry. Weigh ingredients as they go into the pot.",
  },
  {
    question: "What if my ingredient isn't on the list?",
    answer: "Choose Other and type its calories, protein, carbs and fat per 100 g from the package label or from USDA FoodData Central.",
  },
];

const MORE = [
  { href: "/recipe-scaler", title: "Recipe scaler" },
  { href: "/recipe-cost-calculator", title: "Recipe cost" },
  { href: "/butter-converter", title: "Butter converter" },
  { href: "/cooking-measurement-converter", title: "Measurement converter" },
  { href: "/meat-cooking-time-calculator", title: "Meat cooking time" },
  { href: "/party-food-calculator", title: "Party food" },
];

const sample = SAMPLE.map((s) => {
  const food = FOODS.find((f) => f.key === s.key)!;
  const g = grams(food, Number(s.amount), s.unit) as number;
  return { food, s, g, m: macrosFor(food, g) };
});
const total = sumMacros(sample.map((x) => x.m));
const per = { kcal: total.kcal / SAMPLE_SERVINGS, p: total.p / SAMPLE_SERVINGS, c: total.c / SAMPLE_SERVINGS, f: total.f / SAMPLE_SERVINGS };

export default function RecipeMacroCalculatorPage() {
  return (
    <>
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Recipe Macro Calculator"
        description="Adds up calories, protein, carbohydrate and fat for a recipe from ingredient weights, per serving, using USDA FoodData Central values."
        url={URL}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Recipe Macro Calculator", url: URL },
        ]}
      />

      <Hero
        visual={<LiveDial liveKey="kcal" min={0} max={1000} major={100} minor={20} value={381} unit="kcal" suffix=" kcal" label="Calories per serving" />}
        crumb="Recipe tools / Recipe macros"
        h1="Recipe macro calculator"
        long
        answer={
          <>
            A recipe&apos;s macros are its ingredients&apos; macros <span className="p-nb">added up</span> by weight, then divided by the servings.
          </>
        }
        sub={
          <>
            Pick from 23 ingredients with{" "}
            <a href={SRC_FDC} {...ext}>
              USDA FoodData Central
            </a>{" "}
            values, or enter your own label figures. The sample, chicken, rice and broccoli for four, works out to 381 calories, 30 g protein, 40.5 g
            carbs and 10.2 g fat a serving.
          </>
        }
        updated={UPDATED}
      >
        <RecipeMacroCalculator />
      </Hero>

      <Main more={MORE}>
        <Sec title="How the macro math works">
          <p className="p-p">Each ingredient&apos;s share comes from its weight, then the recipe total is split by the servings:</p>
          <p className="p-formula">ingredient = value per 100 g × grams ÷ 100 · per serving = recipe total ÷ servings</p>
          <Table
            label="Sample recipe: chicken, rice and broccoli for four"
            head={["Ingredient", "Amount", "Weight", "Calories", "Protein", "Carbs", "Fat"]}
            hi={sample.length}
            rows={[
              ...sample.map(({ food, s, g, m }) => [food.name, `${s.amount} ${s.unit}`, `${r1(g)} g`, r0(m.kcal), `${r1(m.p)} g`, `${r1(m.c)} g`, `${r1(m.f)} g`]),
              ["Recipe total", "", `${r1(sample.reduce((a, x) => a + x.g, 0))} g`, r0(total.kcal), `${r1(total.p)} g`, `${r1(total.c)} g`, `${r1(total.f)} g`],
              [`Per serving, ÷ ${SAMPLE_SERVINGS}`, "", "", r0(per.kcal), `${r1(per.p)} g`, `${r1(per.c)} g`, `${r1(per.f)} g`],
            ]}
          />
        </Sec>

        <Sec title="USDA values for 23 common ingredients">
          <p className="p-p">Per 100 g, from FoodData Central&apos;s SR Legacy data. Each name links to its USDA entry.</p>
          <Table
            label="Calories and macros per 100 g, USDA FoodData Central"
            head={["Ingredient", "Calories", "Protein", "Carbs", "Fat", "Fiber", "Household measure"]}
            rows={FOODS.map((f) => [
              <a key={f.key} href={FDC_FOOD(f.fdc)} {...ext}>
                {f.name}
              </a>,
              String(f.kcal),
              `${f.p} g`,
              `${f.c} g`,
              `${f.f} g`,
              `${f.fib} g`,
              f.m.map(([l, g]) => `1 ${l} = ${g} g`).join("; "),
            ])}
          />
          <p className="p-note">Every entry is raw or dry, so weigh ingredients as they go into the pot.</p>
          <Bars
            title="Calories in 100 g of each ingredient"
            label="Calories per 100 grams, USDA FoodData Central"
            rows={[...FOODS].sort((a, b) => b.kcal - a.kcal).map((f) => ({ name: f.name, v: f.kcal, text: `${f.kcal} kcal`, tone: TONE.blue }))}
          />
        </Sec>

        <Faq faqs={faqs} />

        <Sources items={[{ href: SRC_FDC, title: "FoodData Central, SR Legacy foods (23 entries linked in the table above)", by: "USDA Agricultural Research Service" }]} />
      </Main>
    </>
  );
}
