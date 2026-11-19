import { Metadata } from "next";
import MeatTemperatureChart from "@/components/calculators/MeatTemperatureChart";
import LiveDial from "@/components/instrument/LiveDial";
import { Faq, Hero, Main, Sec, Sources, Table, ext, type QA } from "@/components/instrument/kit";
import { BreadcrumbJsonLd, FAQPageJsonLd, WebApplicationJsonLd } from "@/components/seo/JsonLd";
import { ATK, ATK_RISE, CHECKOFF, HAM_USDA_PLANT, SAFE, SRC_MEAT } from "@/data/meat-temps";

const URL = "https://calckitchen.com/meat-temperature-chart";
const UPDATED = "2026-11-19"; // CK-008: rebuilt on the FoodSafety.gov chart, Beef Checkoff and America's Test Kitchen
const TITLE = "Meat Temperature Chart: USDA Safe Internal Temperatures and Doneness";
const DESC =
  "Safe internal temperatures from the USDA chart: 145°F for steaks, chops and roasts with a 3-minute rest, 160°F for ground meat, 165°F for poultry. Plus beef doneness and fish.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: { title: TITLE, description: DESC, url: URL, type: "website" },
  alternates: { canonical: URL },
};

const faqs: QA[] = [
  {
    question: "What temperature should chicken be cooked to?",
    answer: "165°F (74°C), says the USDA, for every part of the bird: whole, breasts, legs, thighs, wings, ground chicken, giblets and stuffing.",
  },
  {
    question: "What is the internal temperature of a medium-rare steak?",
    answer:
      "The Beef Checkoff puts medium-rare at 145°F with a rest of at least 3 minutes, which is also the USDA minimum for steaks. America's Test Kitchen serves medium-rare at 125 to 130°F, taking the steak off the heat at 115 to 120°F; that is below the USDA minimum.",
  },
  {
    question: "What temperature should pork be cooked to?",
    answer: "145°F (63°C) for pork chops, roasts and steaks, followed by a 3-minute rest. Ground pork and pork sausage need 160°F (71°C).",
  },
  {
    question: "What temperature should ground beef be cooked to?",
    answer: "160°F (71°C), says the USDA. The Beef Checkoff adds that color is not a reliable sign that ground beef is done, so check it with a thermometer.",
  },
  {
    question: "What temperature should salmon be cooked to?",
    answer: "145°F (63°C), the USDA minimum for all fish, or until the flesh is no longer translucent and separates easily with a fork.",
  },
  {
    question: "Do I need to let meat rest after cooking?",
    answer:
      "The USDA chart lists a 3-minute rest for steaks, roasts and chops of beef, pork, lamb, veal, goat and bison, and for raw ham. It lists no rest time for ground meat, poultry or fish.",
  },
  {
    question: "What temperature should leftovers be reheated to?",
    answer: "165°F (74°C), for any type of leftovers, according to the USDA chart.",
  },
  {
    question: "What temperature should a fully cooked ham be reheated to?",
    answer: "140°F (60°C) if it was packaged in a USDA-inspected plant. Any other precooked ham: 165°F (74°C).",
  },
];

const MORE = [
  { href: "/meat-cooking-time-calculator", title: "Meat cooking time" },
  { href: "/turkey-cooking-calculator", title: "Turkey cooking time" },
  { href: "/oven-temperature-converter", title: "Oven temperature converter" },
  { href: "/air-fryer-converter", title: "Air fryer converter" },
  { href: "/convection-oven-converter", title: "Convection oven converter" },
  { href: "/slow-cooker-to-oven-converter", title: "Slow cooker to oven" },
];

const range = (lo: number, hi: number) => (lo === hi ? `${lo}°F` : `${lo} to ${hi}°F`);
const safeCell = (f: number | null, c: number | null, note: string, id: string) => {
  if (f === null || c === null) return note;
  if (id === "ham-precooked") return `${f}°F (${c}°C); ${HAM_USDA_PLANT.f}°F (${HAM_USDA_PLANT.c}°C) if packaged in a USDA-inspected plant`;
  if (id === "fish") return `${f}°F (${c}°C), or until the flesh is no longer translucent and separates easily with a fork`;
  return `${f}°F (${c}°C)`;
};
const checkoff: Record<string, string> = {
  "Medium-rare": `${CHECKOFF.mediumRare}°F, then rest at least ${CHECKOFF.restMin} minutes`,
  Medium: `${CHECKOFF.medium}°F`,
  "Well-done": `${CHECKOFF.wellDone}°F`,
};

export default function MeatTemperatureChartPage() {
  return (
    <>
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Meat Temperature Chart"
        description="USDA safe minimum internal temperatures and rest times for meat, poultry, seafood, eggs and leftovers, with beef doneness temperatures."
        url={URL}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Meat Temperature Chart", url: URL },
        ]}
      />

      <Hero
        visual={<LiveDial liveKey="meat" min={100} max={200} major={20} minor={5} value={145} marks={[145, 160, 165]} unit="°F" suffix="°F" label="Food thermometer reading" />}
        crumb="Cooking time / Meat temperature chart"
        h1="Meat temperature chart"
        answer={
          <>
            Whole cuts <span className="p-nb">145°F,</span> ground meat <span className="p-nb">160°F,</span> poultry <span className="p-nb">165°F.</span>
          </>
        }
        sub={
          <>
            These are the USDA&apos;s safe minimum internal temperatures, read with a food thermometer. Steaks, chops and roasts also rest
            for 3 minutes. Figures from the{" "}
            <a href={SRC_MEAT.usda} {...ext}>
              FoodSafety.gov chart
            </a>
            .
          </>
        }
        updated={UPDATED}
      >
        <MeatTemperatureChart />
      </Hero>

      <Main more={MORE}>
        <Sec title="USDA safe minimum internal temperatures">
          <p className="p-p">
            Each temperature is the lowest at which that food is safe to eat. Cooking it hotter is a matter of taste. Where the chart lists
            a rest time, leave the meat for that long before you carve or eat it.
          </p>
          <Table
            label="USDA safe minimum internal temperatures"
            head={["Food", "Cut or type", "Safe minimum", "Rest"]}
            rows={SAFE.map((r) => [r.food, r.cut || "Any", safeCell(r.f, r.c, r.note, r.id), r.restMin ? `${r.restMin} minutes` : "None"])}
          />
          <p className="p-note">Source: FoodSafety.gov, Safe Minimum Internal Temperature Chart for Cooking, last reviewed November 21, 2024.</p>
        </Sec>

        <Sec title="Beef and lamb doneness temperatures">
          <p className="p-p">
            Doneness is a preference; the USDA minimum is the floor for safety. Two widely used guides name the levels differently. The{" "}
            <a href={SRC_MEAT.checkoff} {...ext}>
              Beef Checkoff
            </a>{" "}
            starts medium-rare at the USDA minimum. America&apos;s Test Kitchen gives cooks&apos; temperatures, with rare, medium-rare and
            medium served below it.
          </p>
          <Table
            label="Beef and lamb doneness temperatures"
            head={["Doneness", "Beef Checkoff", "America's Test Kitchen: off the heat at", "America's Test Kitchen: serve at"]}
            rows={ATK.map((a) => [a.level, checkoff[a.level] ?? "—", range(a.pullLo, a.pullHi), range(a.serveLo, a.serveHi)])}
            hi={1}
          />
          <p className="p-note">
            America&apos;s Test Kitchen says the temperature keeps rising {ATK_RISE.lo} to {ATK_RISE.hi} degrees while the meat rests, less in
            a steak than in a roast. Ground beef is different: the USDA minimum is {CHECKOFF.ground}°F, and the Beef Checkoff says color is
            not a reliable sign that it is done.
          </p>
        </Sec>

        <Sec title="Why some meats need a rest">
          <p className="p-p">
            FoodSafety.gov says rest time lets the innermost parts and juices of the meat finish cooking safely. Its chart lists a 3-minute
            rest for steaks, roasts and chops of beef, pork, lamb, veal, goat and bison, and for raw ham. Ground meat, poultry and fish have
            no rest time on the chart.
          </p>
        </Sec>

        <Sec title="Where to put the thermometer">
          <p className="p-p">
            The USDA&apos;s advice in{" "}
            <a href={SRC_MEAT.placement} {...ext}>
              Do You Know the Correct Place to Insert Your Food Thermometer?
            </a>
            :
          </p>
          <ul className="p-tips">
            <li>
              <strong>Thickest part:</strong> put the tip in the thickest part of the food, away from bone and gristle.
            </li>
            <li>
              <strong>Thin foods:</strong> for a patty, push the thermometer in from the side until the tip reaches the center. From the top,
              part of the probe stays outside the meat.
            </li>
            <li>
              <strong>Off the heat:</strong> take the food off the heat before you check it.
            </li>
          </ul>
        </Sec>

        <Faq faqs={faqs} />

        <Sources
          items={[
            { href: SRC_MEAT.usda, title: "Safe Minimum Internal Temperature Chart for Cooking", by: "FoodSafety.gov (U.S. Department of Health and Human Services)" },
            { href: SRC_MEAT.checkoff, title: "Determining Doneness", by: "Beef. It's What's For Dinner (Beef Checkoff)" },
            { href: SRC_MEAT.atk, title: "Doneness Temperatures for Beef and Lamb", by: "America's Test Kitchen (Cook's Country)" },
            { href: SRC_MEAT.placement, title: "Do You Know the Correct Place to Insert Your Food Thermometer?", by: "U.S. Department of Agriculture" },
          ]}
        />
      </Main>
    </>
  );
}
