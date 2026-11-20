import { Metadata } from "next";
import Link from "next/link";
import Knob from "@/components/instrument/Knob";
import { Hero, Main, Sec } from "@/components/instrument/kit";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { NAV, RAIL_DEFAULT } from "@/data/site-nav";
import { OG_IMAGES, TW_IMAGES } from "@/data/social";
import { UPDATED_AT } from "@/data/updated";

const UPDATED = UPDATED_AT[""];
const TITLE = "CalcKitchen: Kitchen Calculators for Cooking Times, Conversions and Baking";
const DESC =
  "20 free kitchen calculators: turkey and meat cooking times, oven, air fryer and microwave conversions, baking and recipe tools, every figure sourced.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  openGraph: { title: TITLE, description: DESC, url: "https://calckitchen.com", type: "website", siteName: "CalcKitchen", images: OG_IMAGES },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: TW_IMAGES },
  alternates: { canonical: "https://calckitchen.com" },
};

/** one line per calculator: what it answers and whose figures it uses */
const LINES: Record<string, string> = {
  "/air-fryer-converter": "Oven recipes in the air fryer: 25 to 30°F lower and 20% less time, per University of Illinois Extension.",
  "/microwave-to-oven-converter": "A quarter to a third of the oven time in the microwave, per GE Appliances, plus wattage and recipe size.",
  "/slow-cooker-to-oven-converter": "Oven and stovetop times to slow cooker Low and High hours and back, from Crock-Pot's chart.",
  "/convection-oven-converter": "Bake 25°F lower with convection, or roast for 25% less time, per Frigidaire and GE Appliances.",
  "/oven-temperature-converter": "°F, °C and gas marks, with fan oven settings: 350°F is 176.7°C, written 180°C or gas mark 4.",
  "/meat-cooking-time-calculator": "Roasting times by weight from the USDA charts for beef, lamb, pork, veal, ham and poultry.",
  "/turkey-cooking-calculator": "Turkey roasting time by weight from USDA's 325°F timetable, stuffed or not, plus thawing.",
  "/meat-temperature-chart": "Safe internal temperatures from the USDA chart, with beef doneness and fish.",
  "/cake-servings-calculator": "How many people a cake feeds, from Wilton's party and wedding serving chart.",
  "/cake-pan-converter": "Scale a cake recipe to another pan by area, with Wilton's batter amounts and baking times.",
  "/pizza-dough-calculator": "Flour, water, salt and yeast for any number of dough balls, Neapolitan or your own percentages.",
  "/sourdough-calculator": "Sourdough dough by baker's percentages, and starter feeding the King Arthur way.",
  "/bakers-percentage-calculator": "Recipe weights as baker's percentages, the hydration, and the dough scaled to any weight.",
  "/recipe-scaler": "Scale a pasted recipe to any servings, in cup and spoon measures you can scoop.",
  "/recipe-cost-calculator": "What a recipe costs from what you paid, per serving, and a menu price at a food-cost target.",
  "/recipe-macro-calculator": "Calories, protein, carbs and fat per serving from USDA FoodData Central values.",
  "/party-food-calculator": "How much food per guest, from the FDA and USDA reference serving sizes.",
  "/cooking-measurement-converter": "Cups to grams for 25 ingredients by USDA weights, and exact US units.",
  "/butter-converter": "Sticks, cups, tablespoons, grams and ounces: a stick is ½ cup, 8 tablespoons, 113 g.",
  "/coffee-ratio-calculator": "Coffee for your water by method, from the SCA standard and the National Coffee Association.",
};

const MORE = RAIL_DEFAULT;

export default function HomePage() {
  const count = NAV.reduce((a, g) => a + g.links.length, 0);
  return (
    <>
      <OrganizationJsonLd name="CalcKitchen" url="https://calckitchen.com" description="Free kitchen calculators for cooking times, oven and appliance conversions, baking and recipes." />

      <Hero
        visual={<Knob tempF={350} label="Oven dial set to 350°F" />}
        h1="CalcKitchen kitchen calculators"
        long
        answer={
          <>
            Cooking times, conversions and baking math, with <span className="p-nb">every figure</span> traced to its source.
          </>
        }
        sub={
          <>
            {count} free calculators. The numbers come from USDA and FDA data, NIST unit definitions, and the appliance makers, bakers and test kitchens
            that published them. Each page names its sources.
          </>
        }
        updated={UPDATED}
      />

      <Main more={MORE}>
        {NAV.map((g) => (
          <Sec key={g.name} title={g.name}>
            <ul className="p-home-list">
              {g.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.name}</Link>
                  <p>{LINES[l.href]}</p>
                </li>
              ))}
            </ul>
          </Sec>
        ))}

        <Sec title="Where the numbers come from">
          <p className="p-p">
            Food-safety temperatures and roasting times from USDA and FoodSafety.gov; serving sizes from FDA and USDA labeling rules; food weights and
            nutrients from USDA FoodData Central; units from NIST. Appliance and baking rules come from the companies that published them, such as GE
            Appliances, Crock-Pot, Frigidaire, Wilton, King Arthur Baking and Land O&apos;Lakes. A figure we can&apos;t trace to a source doesn&apos;t
            go on the site.
          </p>
          <p className="p-p">
            <Link href="/about">About CalcKitchen and its author</Link>
          </p>
        </Sec>
      </Main>
    </>
  );
}
