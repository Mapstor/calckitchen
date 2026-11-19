import { Metadata } from "next";
import LiveDial from "@/components/instrument/LiveDial";
import RecipeScaler from "@/components/calculators/RecipeScaler";
import { Faq, Hero, Main, Sec, Sources, Table, ext, type QA } from "@/components/instrument/kit";
import { BreadcrumbJsonLd, FAQPageJsonLd, WebApplicationJsonLd } from "@/components/seo/JsonLd";
import { EGG_G, SRC_SCALE, measure, toTsp, type EggSize } from "@/data/scaler";
import Strips from "@/components/instrument/Strips";

const URL = "https://calckitchen.com/recipe-scaler";
const UPDATED = "2026-11-19"; // CK-009: rebuilt; cup and spoon measures from NIST, egg weights from USDA FoodData Central
const TITLE = "Recipe Scaler: Double, Halve or Resize a Recipe by Servings";
const DESC =
  "Paste a recipe and scale it to any number of servings. Cup and spoon amounts come out as measures you can scoop, part-eggs as grams of beaten egg.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: { title: TITLE, description: DESC, url: URL, type: "website" },
  alternates: { canonical: URL },
};

const faqs: QA[] = [
  {
    question: "How do I scale a recipe up or down?",
    answer:
      "Divide the servings you need by the servings the recipe makes, and multiply every ingredient by the result. From 4 servings to 10 is 10 ÷ 4 = 2.5.",
  },
  {
    question: "What is half of ¾ cup?",
    answer: "¼ cup plus 2 tablespoons, which is ⅜ cup or 6 tablespoons. A cup holds 16 tablespoons.",
  },
  {
    question: "What is half of ⅓ cup?",
    answer: "2 tablespoons plus 2 teaspoons. ⅓ cup is 16 teaspoons, so half is 8.",
  },
  {
    question: "How many tablespoons are in a cup?",
    answer: "16. A tablespoon is 3 teaspoons, so a cup is 48 teaspoons.",
  },
  {
    question: "How do I use half an egg?",
    answer: "Beat the egg and use half by weight. USDA FoodData Central puts a large egg at 50 g out of the shell, so half is 25 g.",
  },
  {
    question: "How do I scale a recipe that uses grams?",
    answer: "Multiply the grams by the same factor; weights need no fractions. 250 g at × 1.5 is 375 g.",
  },
  {
    question: "How do I scale a recipe for a different cake pan?",
    answer: "Scale by pan area, not servings. The cake pan converter works out that factor from the two pan sizes.",
  },
];

const MORE = [
  { href: "/cooking-measurement-converter", title: "Measurement converter" },
  { href: "/cake-pan-converter", title: "Cake pan converter" },
  { href: "/butter-converter", title: "Butter converter" },
  { href: "/recipe-cost-calculator", title: "Recipe cost" },
  { href: "/party-food-calculator", title: "Party food" },
  { href: "/bakers-percentage-calculator", title: "Baker's percentage" },
];

const SERVES = [2, 4, 6, 8, 12];
const NEED = [2, 4, 6, 8, 10, 12];
const r2 = (x: number) => (Math.round(x * 100) / 100).toString();
const MEASURES: [string, number, "cup" | "tbsp" | "tsp"][] = [
  ["1 cup", 1, "cup"],
  ["¾ cup", 3 / 4, "cup"],
  ["⅔ cup", 2 / 3, "cup"],
  ["½ cup", 1 / 2, "cup"],
  ["⅓ cup", 1 / 3, "cup"],
  ["¼ cup", 1 / 4, "cup"],
  ["1 tbsp", 1, "tbsp"],
  ["1 tsp", 1, "tsp"],
  ["½ tsp", 1 / 2, "tsp"],
  ["¼ tsp", 1 / 4, "tsp"],
];
const EGGS = Object.entries(EGG_G) as [EggSize, number][];

export default function RecipeScalerPage() {
  return (
    <>
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Recipe Scaler"
        description="Scales a pasted ingredient list by servings or by a factor, turning cup and spoon amounts into standard measures and part-eggs into grams."
        url={URL}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Recipe Scaler", url: URL },
        ]}
      />

      <Hero
        visual={<LiveDial liveKey="scale" min={0} max={4} major={0.5} minor={0.1} value={1.5} unit="× recipe" suffix="×" label="Recipe multiplier" />}
        crumb="Recipe tools / Recipe scaler"
        h1="Recipe scaler"
        long
        answer={
          <>
            Multiply every ingredient by the servings you need <span className="p-nb">divided by</span> the servings the recipe makes.
          </>
        }
        sub={
          <>
            From 4 servings to 6 that&apos;s 6 ÷ 4 = 1.5. Paste the ingredient list below: cup and spoon amounts come out as measures you can scoop,
            and part-eggs as grams of beaten egg.
          </>
        }
        updated={UPDATED}
      >
        <RecipeScaler />
      </Hero>

      <Main more={MORE}>
        <Sec title="Scaling factors">
          <p className="p-p">Find the recipe&apos;s servings on the left and the servings you need along the top.</p>
          <p className="p-formula">factor = servings you need ÷ servings the recipe makes</p>
          <Table
            label="Scaling factors by servings"
            head={["Recipe serves", ...NEED.map((n) => `Need ${n}`)]}
            rows={SERVES.map((s) => [`${s}`, ...NEED.map((n) => `×${r2(n / s)}`)])}
          />
        </Sec>

        <Sec title="Halving and doubling cups and spoons">
          <p className="p-p">
            A US cup is 16 tablespoons and a tablespoon is 3 teaspoons, the{" "}
            <a href={SRC_SCALE.nist} {...ext}>
              NIST
            </a>{" "}
            definitions. Halves that fall between measuring cups come out as cups plus spoons:
          </p>
          <Table
            label="Half and double of common cup and spoon measures"
            head={["Recipe says", "Half", "Double"]}
            rows={MEASURES.map(([label, q, u]) => [label, measure(toTsp(q / 2, u)), measure(toTsp(q * 2, u))])}
          />
          <Strips
            title="A cup is 16 tablespoons, a tablespoon 3 teaspoons"
            label="Cup fractions in tablespoons and teaspoons"
            stripName="Tablespoon; the small marks are teaspoons"
            cells={16}
            minor={3}
            rows={[
              ["¼ cup", 1 / 4],
              ["⅓ cup", 1 / 3],
              ["½ cup", 1 / 2],
              ["⅔ cup", 2 / 3],
              ["¾ cup", 3 / 4],
            ].map(([name, q]) => {
              const tsp = Math.round(toTsp(q as number, "cup"));
              const tb = Math.floor(tsp / 3);
              return { name: name as string, amount: tsp / 3, text: `${tb} tbsp${tsp - 3 * tb ? ` + ${tsp - 3 * tb} tsp` : ""}` };
            })}
          />
        </Sec>

        <Sec title="Scaling eggs">
          <p className="p-p">
            Part-eggs are easiest by weight: beat the eggs together and weigh what the scaled recipe needs.{" "}
            <a href={SRC_SCALE.egg} {...ext}>
              USDA FoodData Central
            </a>{" "}
            weighs a whole egg out of the shell at:
          </p>
          <Table
            label="Egg weights out of the shell by size"
            head={["Egg size", "One egg", "Half an egg"]}
            hi={EGGS.findIndex(([s]) => s === "large")}
            rows={EGGS.map(([size, g]) => [size[0].toUpperCase() + size.slice(1), `${g} g`, `${r2(g / 2)} g`])}
          />
        </Sec>

        <Faq faqs={faqs} />

        <Sources
          items={[
            { href: SRC_SCALE.nist, title: "Guide to the SI, Appendix B.9: cup, tablespoon and teaspoon", by: "NIST" },
            { href: SRC_SCALE.egg, title: "Egg, whole, raw, fresh (SR Legacy, FDC ID 171287)", by: "USDA FoodData Central" },
          ]}
        />
      </Main>
    </>
  );
}
