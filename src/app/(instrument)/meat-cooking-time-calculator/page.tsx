import { Metadata } from "next";
import Link from "next/link";
import MeatCookingTimeCalculator from "@/components/calculators/MeatCookingTimeCalculator";
import LiveKnob from "@/components/instrument/LiveKnob";
import { Faq, Hero, Main, Sec, Sources, Table, ext, type QA } from "@/components/instrument/kit";
import { BreadcrumbJsonLd, FAQPageJsonLd, WebApplicationJsonLd } from "@/components/seo/JsonLd";
import { DONE, ROASTS, SRC_ROAST, STUFFED_ADD, hm, type RoastRow } from "@/data/roasting-times";
import Dumbbells from "@/components/instrument/Dumbbells";
import { TONE } from "@/components/instrument/Bars";
import { OG_IMAGES, TW_IMAGES } from "@/data/social";
import { UPDATED_AT } from "@/data/updated";

const URL = "https://calckitchen.com/meat-cooking-time-calculator";
const UPDATED = UPDATED_AT["meat-cooking-time-calculator"];
const TITLE = "Meat Cooking Time Calculator: USDA Roasting Times by Weight";
const DESC =
  "USDA roasting times by weight: beef, lamb, pork, veal, ham, chicken, duck, goose. A 5-lb bone-in rib roast takes 115 to 125 minutes at 325°F.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: { title: TITLE, description: DESC, url: URL, type: "website", images: OG_IMAGES },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: TW_IMAGES },
  alternates: { canonical: URL },
};

const faqs: QA[] = [
  {
    question: "How long do you cook a prime rib per pound?",
    answer:
      "At 325°F, the USDA chart gives 23 to 25 minutes per pound for a 4 to 6 lb bone-in rib roast and 28 to 33 minutes per pound for a boneless one. A 5-lb bone-in roast takes 115 to 125 minutes. It's done at 145°F, followed by a 3-minute rest.",
  },
  {
    question: "How long do you roast a whole chicken?",
    answer:
      "At 350°F: 1 hr 15 min to 1 hr 30 min for a 3 to 4 lb chicken, and 2 hr to 2 hr 15 min for a 5 to 7 lb one. Add 15 to 30 minutes if it's stuffed. It's done at 165°F in the innermost thigh, the innermost wing and the thickest part of the breast.",
  },
  {
    question: "How long do you cook a pork loin roast?",
    answer: "20 minutes per pound at 350°F for a 2 to 5 lb loin roast, bone-in or boneless, so a 3-lb roast takes 60 minutes. It's done at 145°F, followed by a 3-minute rest.",
  },
  {
    question: "How long does a Boston butt take in the oven?",
    answer: "45 minutes per pound at 350°F for a 3 to 6 lb Boston butt, so a 4-lb one takes 180 minutes, or 3 hours.",
  },
  {
    question: "How long do you cook a beef tenderloin?",
    answer: "A whole 4 to 6 lb tenderloin roast takes 45 to 60 minutes in all at 425°F, according to the USDA chart.",
  },
  {
    question: "How long do you cook a pork tenderloin?",
    answer: "A ½ to 1½ lb pork tenderloin takes 20 to 27 minutes in all at 425 to 450°F.",
  },
  {
    question: "How long do you cook a leg of lamb?",
    answer: "At 325°F: 20 to 25 minutes per pound for a 5 to 7 lb bone-in leg, and 25 to 30 minutes per pound for a 4 to 7 lb boneless rolled leg.",
  },
  {
    question: "How long do you heat a fully cooked spiral ham?",
    answer:
      "10 to 18 minutes per pound at 325°F for a 7 to 9 lb spiral-cut ham, whole or half. Heat it to 140°F if it was packaged in a USDA-inspected plant, or 165°F otherwise.",
  },
];

const MORE = [
  { href: "/meat-temperature-chart", title: "Meat temperature chart" },
  { href: "/turkey-cooking-calculator", title: "Turkey cooking time" },
  { href: "/oven-temperature-converter", title: "Oven temperature converter" },
  { href: "/convection-oven-converter", title: "Convection oven converter" },
  { href: "/slow-cooker-to-oven-converter", title: "Slow cooker to oven" },
  { href: "/party-food-calculator", title: "Party food calculator" },
];

const KIND_NAME: Record<string, string> = { beef: "Beef", lamb: "Lamb", pork: "Pork", veal: "Veal" };
const oven = (r: RoastRow) => (r.ovenLo === r.ovenHi ? `${r.ovenLo}°F` : `${r.ovenLo} to ${r.ovenHi}°F`);
const timing = (r: RoastRow) =>
  r.perLbLo !== undefined
    ? r.perLbLo === r.perLbHi
      ? `${r.perLbLo} min per lb`
      : `${r.perLbLo} to ${r.perLbHi} min per lb`
    : r.totalLo === r.totalHi
      ? `${hm(r.totalLo ?? 0)} in all`
      : `${hm(r.totalLo ?? 0)} to ${hm(r.totalHi ?? 0)} in all`;
const hamName = (r: RoastRow) => r.name.split(": ")[1] ?? r.name;

export default function MeatCookingTimePage() {
  const red = ROASTS.filter((r) => r.section === "red");
  const birds = ROASTS.filter((r) => r.section === "poultry");
  const hams = (s: RoastRow["section"]) => ROASTS.filter((r) => r.section === s);
  return (
    <>
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Meat Cooking Time Calculator"
        description="Roasting times by weight for beef, lamb, pork, veal, ham, chicken, duck and goose, from the USDA roasting charts."
        url={URL}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Meat Cooking Time Calculator", url: URL },
        ]}
      />

      <Hero
        visual={<LiveKnob initial={325} />}
        crumb="Cooking time / Meat"
        h1="Meat cooking time calculator"
        answer={
          <>
            A <span className="p-nb">5-lb</span> bone-in rib roast takes <span className="p-nb">115 to 125</span> minutes at{" "}
            <span className="p-nb">325°F.</span>
          </>
        }
        sub={
          <>
            That&apos;s the USDA&apos;s 23 to 25 minutes per pound. It&apos;s done at 145°F inside, followed by a 3-minute rest. Times for
            beef, lamb, pork, veal, ham and poultry come from the{" "}
            <a href={SRC_ROAST.chart} {...ext}>
              FoodSafety.gov roasting charts
            </a>
            .
          </>
        }
        updated={UPDATED}
      >
        <MeatCookingTimeCalculator />
      </Hero>

      <Main more={MORE}>
        <Sec title="Beef, lamb, pork and veal roasting times">
          <p className="p-p">
            Multiply the minutes per pound by the weight, or use the total time where the chart gives one. Each time applies to the weight
            range in its row.
          </p>
          <Table
            label="Beef, lamb, pork and veal roasting times"
            head={["Meat", "Cut", "Weight", "Oven", "Time"]}
            rows={red.map((r) => [KIND_NAME[r.kind], r.name, r.weightText, oven(r), timing(r)])}
            hi={0}
          />
          <p className="p-note">
            All are done at {DONE.red.f}°F ({DONE.red.c}°C), followed by a rest of at least {DONE.red.restMin} minutes. The chart also lists a 7
            to 9 lb bone-in leg of lamb at 10 to 15 minutes per pound; it is left out here because it gives a shorter total time than a 7-lb leg
            in the row above.
          </p>
          <Dumbbells
            title="Minutes per pound, cut by cut"
            label="Roasting minutes per pound"
            min={0}
            step={10}
            unit="min/lb"
            keys={[{ name: "Minutes per pound, from the chart", tone: TONE.orange }]}
            rows={ROASTS.filter((r) => r.section === "red" && r.perLbLo !== undefined && r.perLbHi !== undefined).map((r) => ({
              name: `${r.kind.charAt(0).toUpperCase()}${r.kind.slice(1)}: ${r.name.charAt(0).toLowerCase()}${r.name.slice(1)}, ${r.weightText}`,
              marks: [{ lo: r.perLbLo as number, hi: r.perLbHi as number, tone: TONE.orange }],
              text: r.perLbLo === r.perLbHi ? `${r.perLbLo} min/lb` : `${r.perLbLo}–${r.perLbHi} min/lb`,
            }))}
          />
        </Sec>

        <Sec title="Ham cooking times">
          <p className="p-p">All hams go in a 325°F oven. Pick the row that matches the ham&apos;s label.</p>
          <Table
            label="Ham cooking times at 325°F"
            head={["Ham", "Weight", "Time", "Done at"]}
            rows={[
              ...hams("ham-fresh").map((r) => [`Fresh: ${hamName(r)}`, r.weightText, timing(r), `${DONE["ham-fresh"].f}°F, rest ${DONE["ham-fresh"].restMin} min`]),
              ...hams("ham-raw").map((r) => [`Smoked, cook before eating: ${hamName(r)}`, r.weightText, timing(r), `${DONE["ham-raw"].f}°F, rest ${DONE["ham-raw"].restMin} min`]),
              ...hams("ham-cooked").map((r) => [
                `Fully cooked, to reheat: ${hamName(r)}`,
                r.weightText,
                timing(r),
                `${DONE["ham-cooked"].alt?.f}°F if from a USDA-inspected plant, otherwise ${DONE["ham-cooked"].f}°F`,
              ]),
            ]}
          />
          <p className="p-note">
            Country ham, whole or half: soak it in the refrigerator for 4 to 12 hours, cover with water and boil 20 to 25 minutes per pound,
            drain, then bake at 400°F for 15 minutes to brown.
          </p>
        </Sec>

        <Sec title="Chicken, duck and goose roasting times">
          <Table label="Poultry roasting times" head={["Bird", "Weight", "Oven", "Time"]} rows={birds.map((r) => [r.name, r.weightText, oven(r), timing(r)])} />
          <p className="p-note">
            Add {STUFFED_ADD.lo} to {STUFFED_ADD.hi} minutes for a stuffed bird. Poultry is done at {DONE.poultry.f}°F ({DONE.poultry.c}°C) in the
            innermost thigh, the innermost wing and the thickest part of the breast. For turkey, use the{" "}
            <Link href="/turkey-cooking-calculator">turkey cooking time calculator</Link>.
          </p>
        </Sec>

        <Sec title="Check it with a thermometer">
          <p className="p-p">
            The time gets the roast close; a food thermometer confirms it. FoodSafety.gov says to always use one to check that meat has
            reached its safe minimum internal temperature. The <Link href="/meat-temperature-chart">meat temperature chart</Link> lists the
            safe minimum for every cut, and where to put the thermometer.
          </p>
        </Sec>

        <Faq faqs={faqs} />

        <Sources
          items={[
            { href: SRC_ROAST.chart, title: "Meat and Poultry Roasting Charts", by: "FoodSafety.gov (U.S. Department of Health and Human Services)" },
            { href: SRC_ROAST.temps, title: "Safe Minimum Internal Temperature Chart for Cooking", by: "FoodSafety.gov" },
          ]}
        />
      </Main>
    </>
  );
}
