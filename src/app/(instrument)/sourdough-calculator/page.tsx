import { Metadata } from "next";
import LiveDial from "@/components/instrument/LiveDial";
import SourdoughCalculator from "@/components/calculators/SourdoughCalculator";
import { Faq, Hero, Main, Sec, Sources, Table, ext, type QA } from "@/components/instrument/kit";
import { BreadcrumbJsonLd, FAQPageJsonLd, WebApplicationJsonLd } from "@/components/seo/JsonLd";
import { KA_FEED, KA_FLOUR, KA_LOAF, SRC_SD, feed, gr, p1, pctOf } from "@/data/sourdough";
import { StackBars, TONE } from "@/components/instrument/Bars";
import { OG_IMAGES, TW_IMAGES } from "@/data/social";
import { UPDATED_AT } from "@/data/updated";

const URL = "https://calckitchen.com/sourdough-calculator";
const UPDATED = UPDATED_AT["sourdough-calculator"];
const TITLE = "Sourdough Calculator: Dough, Starter Feeding and Hydration";
const DESC =
  "Work out sourdough dough by baker's percentages, with hydration that counts the starter's flour and water. Feed and build a starter the King Arthur way: 1:1:1 by weight.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: { title: TITLE, description: DESC, url: URL, type: "website", images: OG_IMAGES },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: TW_IMAGES },
  alternates: { canonical: URL },
};

const faqs: QA[] = [
  {
    question: "What ratio should I feed my sourdough starter?",
    answer: "King Arthur feeds it 1:1:1 by weight: 113 g of starter with 113 g of flour and 113 g of water.",
  },
  {
    question: "How often do I feed a sourdough starter?",
    answer: "Every 12 hours at room temperature, and at least once a week if it lives in the fridge, according to King Arthur.",
  },
  {
    question: "How do I know when my starter is ready to bake with?",
    answer: "King Arthur says it's ready when it reliably turns very bubbly and doubles in size within 6 to 8 hours of feeding.",
  },
  {
    question: "How much starter do I need for a loaf of sourdough?",
    answer: "King Arthur's Naturally Leavened Sourdough Bread uses 454 g of ripe starter for two loaves, with 685 g of flour.",
  },
  {
    question: "How do I make more starter for a recipe?",
    answer:
      "Feed equal weights of starter, flour and water that add up to what the recipe needs plus 113 g to keep. For 454 g, that's 189 g of each, making 567 g.",
  },
  {
    question: "What is starter hydration?",
    answer: "The water in the starter as a percentage of its flour. Equal weights of flour and water, as in King Arthur's feeding, make a 100% hydration starter.",
  },
  {
    question: "Does the starter change my dough's hydration?",
    answer: "Yes. A 100% hydration starter is half water, so King Arthur's 454 g adds 227 g of water and 227 g of flour, taking the loaf from 58% to 68.4% hydration.",
  },
  {
    question: "How much salt goes in sourdough bread?",
    answer: "King Arthur's loaf uses 15 g of table salt for 685 g of flour: 2.2%.",
  },
  {
    question: "What temperature do I bake sourdough at?",
    answer: "King Arthur bakes its sourdough loaves at 450°F for about 35 to 40 minutes, until crusty and golden.",
  },
  {
    question: "How do I revive a neglected starter?",
    answer: "Feed it every 12 hours until it's healthy, then put it back on its regular schedule, King Arthur says.",
  },
];

const MORE = [
  { href: "/bakers-percentage-calculator", title: "Baker's percentage" },
  { href: "/pizza-dough-calculator", title: "Pizza dough" },
  { href: "/recipe-scaler", title: "Recipe scaler" },
  { href: "/butter-converter", title: "Butter converter" },
  { href: "/cooking-measurement-converter", title: "Measurement converter" },
  { href: "/oven-temperature-converter", title: "Oven temperature" },
];

const KA_ROWS: [string, number][] = [
  ["Water", KA_LOAF.waterG],
  ["Ripe starter", KA_LOAF.starterG],
  ["Table salt", KA_LOAF.saltG],
];
const KA_TOTAL = KA_FLOUR + KA_LOAF.waterG + KA_LOAF.starterG + KA_LOAF.saltG;
const RATIOS = [1, 2, 3, 5];

export default function SourdoughCalculatorPage() {
  return (
    <>
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Sourdough Calculator"
        description="Works out sourdough dough weights from baker's percentages, the dough's hydration counting the starter, starter feedings and starter builds for a recipe."
        url={URL}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Sourdough Calculator", url: URL },
        ]}
      />

      <Hero
        visual={<LiveDial liveKey="sourdough" min={0} max={2000} major={250} minor={50} value={1551} unit="g" suffix=" g" label="Kitchen scale, dough" />}
        crumb="Baking / Sourdough"
        h1="Sourdough calculator"
        long
        answer={
          <>
            King Arthur&apos;s sourdough makes two loaves from <span className="p-nb">685 g flour</span>, 397 g water, 454 g starter and{" "}
            <span className="p-nb">15 g salt</span>.
          </>
        }
        sub={
          <>
            That&apos;s 58% water, 66.3% starter and 2.2% salt by flour weight, from{" "}
            <a href={SRC_SD.loaf} {...ext}>
              King Arthur Baking&apos;s recipe
            </a>
            . Counting the starter&apos;s own flour and water, the dough is 68.4% hydration.
          </>
        }
        updated={UPDATED}
      >
        <SourdoughCalculator />
      </Hero>

      <Main more={MORE}>
        <Sec title="Sourdough baker's percentages">
          <p className="p-p">
            Every ingredient is a percentage of the flour weight, and the flour is 100%. King Arthur&apos;s Naturally Leavened Sourdough Bread, in
            grams and percentages:
          </p>
          <p className="p-formula">baker&apos;s % = ingredient weight ÷ flour weight × 100</p>
          <Table
            label="King Arthur's sourdough loaf in baker's percentages"
            head={["Ingredient", "Weight", "Baker's %"]}
            hi={0}
            rows={[
              [`Flour (${KA_LOAF.apFlourG} g all-purpose or bread, ${KA_LOAF.wwFlourG} g whole wheat)`, `${gr(KA_FLOUR)} g`, "100%"],
              ...KA_ROWS.map(([name, g]) => [name, `${gr(g)} g`, `${p1(pctOf(g, KA_FLOUR))}%`]),
              ["Total dough, two loaves", `${gr(KA_TOTAL)} g`, `${p1(pctOf(KA_TOTAL, KA_FLOUR))}%`],
            ]}
          />
        </Sec>

        <Sec title="Hydration with the starter counted">
          <p className="p-p">
            A starter is flour and water too. At 100% hydration, equal weights of each, King Arthur&apos;s 454 g of starter holds 227 g of flour and 227
            g of water. Count them in and the loaf goes from 58% to 68.4% hydration:
          </p>
          <p className="p-formula">(397 + 227) ÷ (685 + 227) = 68.4%</p>
          <p className="p-note">For a starter at another hydration h, its flour is the starter weight × 100 ÷ (100 + h), and the rest is water.</p>
        </Sec>

        <Sec title="Feeding a sourdough starter">
          <p className="p-p">
            King Arthur keeps 113 g of starter, discards the rest or bakes with it, and feeds the 113 g with 113 g each of flour and water:
          </p>
          <ul className="p-tips">
            <li>
              <strong>At room temperature:</strong> every 12 hours.
            </li>
            <li>
              <strong>In the fridge:</strong> at least once a week.
            </li>
            <li>
              <strong>A neglected starter:</strong> every 12 hours until it&apos;s healthy, then back to its usual schedule.
            </li>
          </ul>
          <Table
            label="Flour and water to feed 113 g of starter"
            head={["Starter : flour : water", "Flour", "Water", "Starter after feeding"]}
            hi={0}
            rows={RATIOS.map((n) => {
              const f = feed(KA_FEED.keepG, n, n);
              return [`1:${n}:${n}`, `${gr(f.flour)} g`, `${gr(f.water)} g`, `${gr(f.total)} g`];
            })}
          />
          <p className="p-note">King Arthur&apos;s ratio is 1:1:1. The other rows are the same arithmetic with more flour and water.</p>
          <StackBars
            title="The jar after each feeding ratio, starting from 113 g"
            label="Starter after feeding"
            keys={[
              { name: "Starter kept", tone: TONE.orange },
              { name: "Flour", tone: TONE.blue },
              { name: "Water", tone: TONE.purple },
            ]}
            rows={RATIOS.map((n) => {
              const f = feed(KA_FEED.keepG, n, n);
              return { name: `1:${n}:${n}`, parts: [KA_FEED.keepG, f.flour, f.water], text: `${gr(f.total)} g` };
            })}
          />
        </Sec>

        <Sec title="Building starter for a recipe">
          <p className="p-p">
            When a recipe needs more than 227 g of starter, King Arthur feeds it without discarding until there&apos;s enough for the recipe plus 113 g to
            keep. For its loaf&apos;s 454 g, the{" "}
            <a href={SRC_SD.create} {...ext}>
              guide
            </a>{" "}
            keeps 189 g and feeds it 189 g each of flour and water: 567 g, of which 454 g goes in the dough.
          </p>
          <p className="p-formula">starter = flour = water = (needed + 113 g) ÷ 3</p>
          <p className="p-note">Let it rest 6 to 8 hours at room temperature, until it&apos;s active with bubbles breaking the surface.</p>
        </Sec>

        <Faq faqs={faqs} />

        <Sources
          items={[
            { href: SRC_SD.loaf, title: "Naturally Leavened Sourdough Bread", by: "King Arthur Baking" },
            { href: SRC_SD.maintain, title: "Sourdough Baking: Maintaining your starter", by: "King Arthur Baking" },
            { href: SRC_SD.create, title: "Sourdough Baking: Creating your starter", by: "King Arthur Baking" },
            { href: SRC_SD.bakers, title: "Baker's Percentage", by: "King Arthur Baking" },
          ]}
        />
      </Main>
    </>
  );
}
