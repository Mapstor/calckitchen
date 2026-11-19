import { Metadata } from "next";
import Link from "next/link";
import CakePanConverter from "@/components/calculators/CakePanConverter";
import LiveDial from "@/components/instrument/LiveDial";
import { PanLineup } from "@/components/instrument/Pans";
import { Faq, Hero, Main, Sec, Sources, Table, ext, type QA } from "@/components/instrument/kit";
import { BreadcrumbJsonLd, FAQPageJsonLd, WebApplicationJsonLd } from "@/components/seo/JsonLd";
import { SRC_WILTON, WILTON, area } from "@/data/wilton";
import { OG_IMAGES, TW_IMAGES } from "@/data/social";

const URL = "https://calckitchen.com/cake-pan-converter";
const UPDATED = "2026-11-19"; // CK-008: pan-area scaling with batter and times from Wilton's chart
const TITLE = "Cake Pan Converter: Resize a Recipe for a Different Pan";
const DESC =
  "Scale a cake recipe to another pan by area: an 8-inch to 9-inch round needs 1.27 times the recipe. Batter amounts and baking times for standard pans from Wilton.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: { title: TITLE, description: DESC, url: URL, type: "website", images: OG_IMAGES },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: TW_IMAGES },
  alternates: { canonical: URL },
};

const faqs: QA[] = [
  {
    question: "How do I convert a recipe from an 8-inch to a 9-inch round pan?",
    answer: "Multiply every ingredient by 1.27. A 9-inch round has 63.6 square inches against 50.3 for an 8-inch, and 63.62 ÷ 50.27 = 1.27.",
  },
  {
    question: "Can I bake a 9-inch round recipe in an 8-inch square pan?",
    answer: "Yes, without changing the amounts: the 8-inch square has 64 square inches and the 9-inch round 63.6, a factor of 1.01.",
  },
  {
    question: "Can I bake a 9x13 recipe in two 9-inch round pans?",
    answer: "Two 9-inch rounds hold 127.2 square inches against 117 for a 9 x 13, so multiply the recipe by 1.09, or make it as written for slightly thinner layers.",
  },
  {
    question: "How much batter does a 9-inch round pan need?",
    answer: "Wilton's chart gives 5 cups of batter for one 2-inch-deep 9-inch round layer, baked at 350°F for 40 to 45 minutes.",
  },
  {
    question: "How long do you bake a 10-inch round cake?",
    answer: "Wilton's chart gives 40 to 45 minutes at 350°F for a 2-inch-deep 10-inch round layer with 6 cups of batter. Follow your recipe first and check at the shortest time.",
  },
  {
    question: "Does the baking time change when I change pans?",
    answer: "Often, yes. For standard sizes, use Wilton's times for your pan as a starting point and check for doneness at the shortest time listed.",
  },
];

const ROUNDS = [6, 8, 9, 10, 12, 14];
const a8 = area("Round", 8);
const STD = WILTON.filter((r) => ["Round", "Square", "Sheet"].includes(r.shape));
const d1 = (n: number) => (Math.round(n * 10) / 10).toString();

const MORE = [
  { href: "/cake-servings-calculator", title: "Cake servings calculator" },
  { href: "/recipe-scaler", title: "Recipe scaler" },
  { href: "/bakers-percentage-calculator", title: "Baker's percentage" },
  { href: "/butter-converter", title: "Butter converter" },
  { href: "/cooking-measurement-converter", title: "Measurement converter" },
  { href: "/oven-temperature-converter", title: "Oven temperature converter" },
];

export default function CakePanConverterPage() {
  return (
    <>
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Cake Pan Converter"
        description="Scales a cake recipe to a different pan by area, with Wilton's batter amounts and baking times for standard pans."
        url={URL}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Cake Pan Converter", url: URL },
        ]}
      />

      <Hero
        visual={<LiveDial liveKey="pan" min={0} max={4} major={0.5} minor={0.1} value={1.27} unit="× recipe" suffix="×" label="Recipe multiplier" />}
        crumb="Baking / Cake pan converter"
        h1="Cake pan converter"
        answer={
          <>
            From an <span className="p-nb">8-inch</span> to a <span className="p-nb">9-inch</span> round pan, make{" "}
            <span className="p-nb">1.27 times</span> the recipe.
          </>
        }
        sub={
          <>
            The pan&apos;s area sets the scale, as long as both pans are the same depth. Batter amounts and baking times for standard pans come
            from{" "}
            <a href={SRC_WILTON} {...ext}>
              Wilton&apos;s cake chart
            </a>
            .
          </>
        }
        updated={UPDATED}
      >
        <CakePanConverter />
      </Hero>

      <Main more={MORE}>
        <Sec title="How to scale a recipe for a different pan">
          <p className="p-p">Divide the area of your pan by the area of the recipe&apos;s pan, then multiply every ingredient by the result.</p>
          <p className="p-formula">round: 3.1416 × (diameter ÷ 2)² · square: side × side · rectangle: length × width</p>
          <p className="p-p">
            An 8-inch round is 50.3 square inches and a 9-inch round 63.6, so the 9-inch pan needs 63.62 ÷ 50.27 = 1.27 times the recipe. Going
            from a 9 x 13 (117 square inches) to an 8-inch square (64) is 64 ÷ 117 = 0.55, a little over half.
          </p>
          <PanLineup
            pans={[
              { shape: "Round", a: 6, b: 6, name: "6 in." },
              { shape: "Round", a: 8, b: 8, name: "8 in." },
              { shape: "Round", a: 9, b: 9, name: "9 in." },
              { shape: "Square", a: 8, b: 8, name: "8 in." },
              { shape: "Square", a: 9, b: 9, name: "9 in." },
              { shape: "Rectangle", a: 13, b: 9, name: "9 × 13 in." },
            ]}
          />
        </Sec>

        <Sec title="Round pans compared with an 8-inch round">
          <Table
            label="Round pan areas and recipe multipliers"
            head={["Round pan", "Area", "× an 8-inch recipe"]}
            hi={ROUNDS.indexOf(9)}
            rows={ROUNDS.map((d) => [`${d} in.`, `${d1(area("Round", d))} sq in`, (Math.round((area("Round", d) / a8) * 100) / 100).toFixed(2)])}
          />
        </Sec>

        <Sec title="Batter and baking times for standard pans">
          <p className="p-p">From Wilton&apos;s chart, for one layer in a 2-inch-deep pan filled half to two-thirds full.</p>
          <Table
            label="Batter and baking times for standard pans"
            head={["Pan", "Size", "Batter", "Oven", "Time"]}
            rows={STD.map((r) => [r.shape, r.size, `${r.cups} cups`, `${r.tempF}°F`, `${r.timeLo} to ${r.timeHi} min`])}
          />
          <p className="p-note">Wilton says to follow your recipe&apos;s temperature and time first and to check for doneness at the shortest time listed.</p>
          <p className="p-p">
            For how many people each pan feeds, use the <Link href="/cake-servings-calculator">cake servings calculator</Link>.
          </p>
        </Sec>

        <Faq faqs={faqs} />

        <Sources items={[{ href: SRC_WILTON, title: "Ultimate Cake Serving Chart: Our Ultimate Guide to Perfect Portions", by: "Wilton" }]} />
      </Main>
    </>
  );
}
