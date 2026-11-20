import { Metadata } from "next";
import LiveDial from "@/components/instrument/LiveDial";
import PartyFoodCalculator from "@/components/calculators/PartyFoodCalculator";
import { Faq, Hero, Main, Sec, Sources, Table, ext, type QA } from "@/components/instrument/kit";
import { BreadcrumbJsonLd, FAQPageJsonLd, WebApplicationJsonLd } from "@/components/seo/JsonLd";
import { ITEMS, SRC_PARTY, totalText } from "@/data/party";
import Bars, { TONE } from "@/components/instrument/Bars";
import { OG_IMAGES, TW_IMAGES } from "@/data/social";
import { UPDATED_AT } from "@/data/updated";

const URL = "https://calckitchen.com/party-food-calculator";
const UPDATED = UPDATED_AT["party-food-calculator"];
const TITLE = "Party Food Calculator: How Much Food per Person for Any Crowd";
const DESC =
  "How much meat, sides, dessert and drinks per guest, from FDA and USDA reference servings: 4 oz raw meat, 2 tbsp dip, 2/3 cup ice cream, a 12 oz drink.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: { title: TITLE, description: DESC, url: URL, type: "website", images: OG_IMAGES },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: TW_IMAGES },
  alternates: { canonical: URL },
};

const faqs: QA[] = [
  {
    question: "How much meat do I need per person?",
    answer:
      "4 oz (114 g) of raw boneless meat or poultry, which is about 3 oz (85 g) cooked: USDA's reference amounts for cuts of meat and poultry. For 25 guests, buy 6.3 lb (2.85 kg).",
  },
  {
    question: "How much pasta per person?",
    answer: "55 g (about 2 oz) dry, or 140 g cooked, the FDA reference amount. A 1-lb box holds 8 servings.",
  },
  {
    question: "How much rice per person?",
    answer: "45 g dry, or 140 g cooked, the FDA reference amount: 10 servings to a pound of dry rice.",
  },
  {
    question: "How many drinks per person?",
    answer: "One 12 fl oz (360 mL) drink per serving, the FDA reference amount for soft drinks and water. 25 guests having 2 drinks each need 50.",
  },
  {
    question: "How much ice cream do I need for a party?",
    answer: "⅔ cup per guest, the FDA reference amount, so a gallon serves 24.",
  },
  {
    question: "How much cake per person?",
    answer: "80 g of iced layer cake or cupcakes, FDA's reference amount for mediumweight cakes, or 125 g of cheesecake.",
  },
  {
    question: "How much chips and dip per person?",
    answer: "30 g (about 1 oz) of chips and 2 tbsp of dip, the FDA reference amounts. For 25 guests: 1.65 lb of chips and 50 tbsp, or 3⅛ cups, of dip.",
  },
  {
    question: "Where do these portion sizes come from?",
    answer:
      "From the reference amounts customarily consumed per eating occasion that FDA and USDA set for food labels, based on national food consumption surveys. They describe one eating occasion, so add servings for guests who go back for more.",
  },
];

const MORE = [
  { href: "/recipe-scaler", title: "Recipe scaler" },
  { href: "/recipe-cost-calculator", title: "Recipe cost" },
  { href: "/turkey-cooking-calculator", title: "Turkey cooking time" },
  { href: "/meat-cooking-time-calculator", title: "Meat cooking time" },
  { href: "/cake-servings-calculator", title: "Cake servings" },
  { href: "/pizza-dough-calculator", title: "Pizza dough" },
];

export default function PartyFoodCalculatorPage() {
  return (
    <>
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Party Food Calculator"
        description="Totals how much of each dish to buy for a number of guests, from the FDA and USDA reference amounts customarily consumed per eating occasion."
        url={URL}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Party Food Calculator", url: URL },
        ]}
      />

      <Hero
        visual={<LiveDial liveKey="partymeat" min={0} max={25} major={5} minor={1} value={6.3} unit="lb" suffix=" lb" label="Raw meat to buy" />}
        crumb="Recipe tools / Party food"
        h1="Party food calculator"
        long
        answer={
          <>
            Plan <span className="p-nb">4 ounces</span> of raw boneless meat or poultry per guest: USDA&apos;s reference serving, 3 ounces once cooked.
          </>
        }
        sub={
          <>
            Every amount here is a federal reference amount: what people customarily eat per eating occasion, from national food consumption
            surveys. For 25 guests that&apos;s 6.3 lb of raw meat.
          </>
        }
        updated={UPDATED}
      >
        <PartyFoodCalculator />
      </Hero>

      <Main more={MORE}>
        <Sec title="Reference servings per guest">
          <p className="p-p">One serving of each dish per guest, and the totals for 25, 50 and 100 guests:</p>
          <Table
            label="Party food per guest and for 25, 50 and 100 guests"
            head={["Food", "Per guest", "25 guests", "50 guests", "100 guests"]}
            hi={0}
            rows={ITEMS.map((i) => [i.name, i.per, totalText(i, 25), totalText(i, 50), totalText(i, 100)])}
          />
          <Bars
            title="Grams per guest, for the foods weighed in grams"
            label="Reference amount per guest"
            rows={ITEMS.filter((i) => i.unit === "g")
              .sort((a, b) => b.amount - a.amount)
              .map((i) => ({ name: i.name, v: i.amount, text: `${i.amount} g`, tone: TONE.blue }))}
          />
        </Sec>

        <Sec title="Where the amounts come from">
          <p className="p-p">
            The{" "}
            <a href={SRC_PARTY.fda} {...ext}>
              FDA
            </a>{" "}
            sets reference amounts for food labels in 21 CFR 101.12, and USDA&apos;s Food Safety and Inspection Service sets the ones for{" "}
            <a href={SRC_PARTY.meat} {...ext}>
              meat
            </a>{" "}
            and{" "}
            <a href={SRC_PARTY.poultry} {...ext}>
              poultry
            </a>
            . They are the edible portion people customarily eat per eating occasion, taken from USDA&apos;s 1977–78 and 1987–88 Nationwide Food
            Consumption Surveys and updated with CDC survey data from 2003–2008.
          </p>
          <p className="p-p">
            One reference amount covers one eating occasion. Guests who go back for seconds eat two, so set servings each above 1 for a long party.
          </p>
        </Sec>

        <Faq faqs={faqs} />

        <Sources
          items={[
            { href: SRC_PARTY.fda, title: "21 CFR 101.12, Reference amounts customarily consumed per eating occasion (Table 2)", by: "FDA, via eCFR" },
            { href: SRC_PARTY.meat, title: "9 CFR 317.312, Reference amounts customarily consumed per eating occasion (meat)", by: "USDA FSIS, via eCFR" },
            { href: SRC_PARTY.poultry, title: "9 CFR 381.412, Reference amounts customarily consumed per eating occasion (poultry)", by: "USDA FSIS, via eCFR" },
          ]}
        />
      </Main>
    </>
  );
}
