import { Metadata } from "next";
import Link from "next/link";
import TurkeyCookingCalculator from "@/components/calculators/TurkeyCookingCalculator";
import { FAQPageJsonLd, WebApplicationJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

const SRC = {
  roast: "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/poultry/lets-talk-turkey-roasting",
  thaw: "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/poultry/turkey-basics-safe-thawing",
  alt: "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/poultry/turkey-alternate-routes-table",
  temps: "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/safe-temperature-chart",
  uwyo: "https://wyoextension.org/publications/html/MP135",
};

export const metadata: Metadata = {
  title: "Turkey Cooking Time Calculator by Weight (+ Thawing Times)",
  description:
    "How long to cook a turkey by weight, from the USDA's 325°F roasting timetable, stuffed or not. Plus frying, grilling and smoking times, thawing and a dinner timeline.",
  openGraph: {
    title: "Turkey Cooking Time Calculator by Weight (+ Thawing Times)",
    description:
      "How long to cook a turkey by weight, from the USDA's 325°F roasting timetable, stuffed or not. Plus frying, grilling and smoking times, thawing and a dinner timeline.",
    url: "https://calckitchen.com/turkey-cooking-calculator",
    type: "website",
  },
  alternates: {
    canonical: "https://calckitchen.com/turkey-cooking-calculator",
  },
};

const faqs = [
  {
    question: "How long does it take to cook a 20-pound turkey?",
    answer:
      "A 20-lb turkey sits where two USDA rows meet. Unstuffed at 325°F, the 18 to 20 lb row says 4¼ to 4½ hours and the 20 to 24 lb row says 4½ to 5 hours, so plan on 4¼ to 5 hours and start checking at 4¼. Stuffed, the same rows say 4¼ to 4¾ and 4¾ to 5¼ hours. It's done at 165°F in the innermost thigh and wing and the thickest part of the breast.",
  },
  {
    question: "How many minutes per pound do you cook a turkey?",
    answer:
      "For oven roasting, the USDA doesn't give a per-pound rate; it gives times by weight, such as 3¾ to 4¼ hours for a 14 to 18 lb unstuffed turkey at 325°F. It does give per-pound rates for other methods: 3 to 5 minutes per pound for deep-frying a bird of 12 lb or less, 15 to 18 minutes per pound on a covered grill (8 to 16 lb), and 20 to 30 minutes per pound in a smoker (8 to 12 lb).",
  },
  {
    question: "Should I roast my turkey at 325°F or 350°F?",
    answer:
      "The USDA's roasting timetable is for a 325°F oven, and the USDA says to set the oven no lower than 325°F. The times on this page assume 325°F.",
  },
  {
    question: "How long does it take to thaw a frozen turkey?",
    answer:
      "In a refrigerator at 40°F or below, allow about 24 hours for every 4 to 5 pounds: 3 to 4 days for 12 to 16 lb, 4 to 5 days for 16 to 20 lb. In cold water, allow about 30 minutes per pound, keep the turkey wrapped, change the water every 30 minutes and cook it as soon as it has thawed. Don't thaw it on the counter.",
  },
  {
    question: "What size turkey do I need per person?",
    answer:
      "The USDA says to allow 1 pound of whole turkey per person. The University of Wyoming Extension suggests 1½ pounds per person if you want leftovers, ¾ pound of bone-in breast and ½ pound of boneless breast. For 10 guests that's a 10-lb turkey, or 15 lb with leftovers.",
  },
  {
    question: "How long should a turkey rest before carving?",
    answer:
      "The USDA says to let the turkey stand for 20 minutes before carving, so the juices set and it carves more easily.",
  },
  {
    question: "Is it safe to cook a turkey overnight at a low temperature?",
    answer: "No. The USDA says to set the oven no lower than 325°F when roasting a turkey.",
  },
  {
    question: "Can I cook a turkey that's still frozen?",
    answer:
      "Yes. The USDA says it's safe to cook a turkey from frozen, but it takes at least 50% longer than a thawed one. Remove the giblet packages during cooking, carefully, with tongs or a fork. Never deep-fry a turkey that isn't completely thawed.",
  },
  {
    question: "Should I put water in the roasting pan?",
    answer:
      "It's optional. The USDA's cooking hints suggest adding ½ cup of water to the bottom of the pan, and tenting the turkey with foil for the first 1 to 1½ hours if your pan has no lid.",
  },
  {
    question: "How do I know when the turkey is done?",
    answer:
      "Use a food thermometer: a whole turkey is safe at 165°F in the innermost part of the thigh and wing and the thickest part of the breast. If your turkey has a pop-up timer, the USDA recommends checking those spots with a thermometer too.",
  },
];

const cardClass = "bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6";
const thClass = "text-left py-3 px-4 font-semibold text-gray-900 border-b-2 border-gray-200";
const tdClass = "py-3 px-4 text-gray-700 border-b border-gray-100";

function ExampleCard({ n, title, setup, result, note }: { n: number; title: string; setup: string[]; result: string[]; note?: string }) {
  return (
    <div className={cardClass}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">{n}</div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900 mb-3">{title}</h3>
          <ul className="bg-gray-100 rounded-lg p-4 mb-4 text-sm text-gray-600 space-y-1">
            {setup.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <ul className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-sm text-emerald-800 space-y-1">
            {result.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          {note && <p className="text-sm text-gray-600 mt-4">{note}</p>}
        </div>
      </div>
    </div>
  );
}

export default function TurkeyCookingCalculatorPage() {
  return (
    <div className="min-h-screen">
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Turkey Cooking Time Calculator"
        description="Turkey cooking times by weight from the USDA's 325°F roasting timetable, plus USDA frying, grilling and smoking times, thawing times and a dinner timeline."
        url="https://calckitchen.com/turkey-cooking-calculator"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Turkey Cooking Calculator", url: "https://calckitchen.com/turkey-cooking-calculator" },
        ]}
      />

      <section className="bg-gradient-to-b from-warm-white to-white py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Turkey Cooking Time Calculator</h1>
          <p className="text-lg text-gray-700 mb-3">
            How long to cook a whole turkey by weight, straight from the{" "}
            <a href={SRC.roast} target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">
              USDA&apos;s 325°F roasting timetable
            </a>
            , plus the USDA&apos;s frying, grilling and smoking times, thawing times and a dinner timeline.
          </p>
          <p className="text-gray-700 mb-8">
            <strong>Quick answer:</strong> a 16-lb unstuffed turkey roasts in 3¾ to 4¼ hours at 325°F. It&apos;s done at 165°F in the
            innermost thigh and wing and the thickest part of the breast.
          </p>
          <TurkeyCookingCalculator />
        </div>
      </section>

      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">Worked examples</h2>
          <p className="text-gray-700 mb-8">Each example uses the USDA figures from the tables further down this page.</p>

          <ExampleCard
            n={1}
            title="A 16-lb turkey for a 3:00 PM dinner"
            setup={["Fresh 16-lb turkey, unstuffed", "Oven at 325°F", "Dinner at 3:00 PM"]}
            result={[
              "Roasting time: 3¾ to 4¼ hours (USDA 14 to 18 lb row)",
              "In the oven by 10:25 AM, start checking for 165°F at 2:10 PM, out by 2:40 PM",
              "Let it stand 20 minutes, carve at 3:00 PM",
              "Feeds 16 at 1 lb each, or 10 with leftovers at 1½ lb each",
            ]}
            note="If it's frozen: a 16-lb turkey needs 3 to 4 days in the fridge, so for a Thursday dinner it goes in the fridge by Sunday."
          />
          <ExampleCard
            n={2}
            title="A 12-lb turkey in the deep fryer"
            setup={["12-lb turkey, completely thawed, not stuffed", "Oil at 350°F, outdoors"]}
            result={[
              "Frying time: 36 to 60 minutes (USDA: 3 to 5 minutes per pound)",
              "The oil should cover the turkey by 1 to 2 inches; measure how much you need with water first",
              "Check for 165°F; if it isn't done, return it to the oil right away",
            ]}
            note="The USDA says a turkey for frying should be 12 pounds or less, and never to leave the hot oil unattended."
          />
          <ExampleCard
            n={3}
            title="Forgot to thaw: a 17-lb frozen turkey on the day"
            setup={["17-lb turkey, still frozen, unstuffed"]}
            result={[
              "Cold water: about 8½ hours (30 minutes per pound), changing the water every 30 minutes, then roast 3¾ to 4¼ hours",
              "Or roast from frozen: at least 50% longer than a thawed bird, so at least 5 hours 38 minutes to 6 hours 23 minutes",
            ]}
            note="Cooking from frozen, remove the giblet packages during cooking, carefully, with tongs or a fork."
          />
          <ExampleCard
            n={4}
            title="A 10-lb turkey in the smoker"
            setup={["10-lb turkey, not stuffed", "Smoker air 225 to 300°F, with a drip pan"]}
            result={["Smoking time: 3 hours 20 minutes to 5 hours (USDA: 20 to 30 minutes per pound for 8 to 12 lb)", "Done at 165°F in the thigh, wing and breast"]}
          />
          <ExampleCard
            n={5}
            title="A 14-lb turkey on a covered grill"
            setup={["14-lb turkey, not stuffed", "Covered gas or charcoal grill, air 225 to 300°F, drip pan"]}
            result={["Grilling time: 3½ hours to 4 hours 12 minutes (USDA: 15 to 18 minutes per pound for 8 to 16 lb)", "Done at 165°F in the thigh, wing and breast"]}
          />
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Turkey roasting times at 325°F</h2>
          <p className="text-gray-700 mb-6">
            These are the{" "}
            <a href={SRC.roast} target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">
              USDA Food Safety and Inspection Service
            </a>{" "}
            times for a fresh or fully thawed turkey. They&apos;re approximate, so check the temperature with a food thermometer.
          </p>
          <div className="overflow-x-auto bg-white rounded-xl border border-gray-200">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th scope="col" className={thClass}>Turkey weight</th>
                  <th scope="col" className={thClass}>Unstuffed</th>
                  <th scope="col" className={thClass}>Stuffed</th>
                  <th scope="col" className={thClass}>Feeds (1 lb each)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className={tdClass}>4 to 8 lb (breast)</td><td className={tdClass}>1½ to 3¼ hours</td><td className={tdClass}>6 to 8 lb: 2½ to 3½ hours (4 to 6 lb: not usually applicable)</td><td className={tdClass}>5 to 10, at ¾ lb of breast each</td></tr>
                <tr><td className={tdClass}>8 to 12 lb</td><td className={tdClass}>2¾ to 3 hours</td><td className={tdClass}>3 to 3½ hours</td><td className={tdClass}>8 to 12</td></tr>
                <tr><td className={tdClass}>12 to 14 lb</td><td className={tdClass}>3 to 3¾ hours</td><td className={tdClass}>3½ to 4 hours</td><td className={tdClass}>12 to 14</td></tr>
                <tr className="bg-orange-50"><td className={tdClass}>14 to 18 lb</td><td className={tdClass}>3¾ to 4¼ hours</td><td className={tdClass}>4 to 4¼ hours</td><td className={tdClass}>14 to 18</td></tr>
                <tr><td className={tdClass}>18 to 20 lb</td><td className={tdClass}>4¼ to 4½ hours</td><td className={tdClass}>4¼ to 4¾ hours</td><td className={tdClass}>18 to 20</td></tr>
                <tr><td className={tdClass}>20 to 24 lb</td><td className={tdClass}>4½ to 5 hours</td><td className={tdClass}>4¾ to 5¼ hours</td><td className={tdClass}>20 to 24</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Cooking from frozen takes at least 50% longer. Set the oven no lower than 325°F. The USDA&apos;s table stops at 24 lb.
          </p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-10 mb-4">Other ways to cook a turkey</h3>
          <p className="text-gray-700 mb-6">
            From the USDA&apos;s{" "}
            <a href={SRC.alt} target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">
              Turkey: Alternate Routes to the Table
            </a>
            . None of these methods allows stuffing.
          </p>
          <div className="overflow-x-auto bg-white rounded-xl border border-gray-200">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th scope="col" className={thClass}>Method</th>
                  <th scope="col" className={thClass}>Bird size</th>
                  <th scope="col" className={thClass}>Time</th>
                  <th scope="col" className={thClass}>Heat</th>
                  <th scope="col" className={thClass}>10-lb turkey</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className={tdClass}>Electric roaster oven</td><td className={tdClass}>8 to 24 lb</td><td className={tdClass}>Generally the same as oven roasting</td><td className={tdClass}>At least 325°F</td><td className={tdClass}>2¾ to 3 hours</td></tr>
                <tr><td className={tdClass}>Covered grill</td><td className={tdClass}>8 to 16 lb</td><td className={tdClass}>15 to 18 min per lb</td><td className={tdClass}>Grill air 225 to 300°F</td><td className={tdClass}>2½ to 3 hours</td></tr>
                <tr><td className={tdClass}>Smoker</td><td className={tdClass}>8 to 12 lb</td><td className={tdClass}>20 to 30 min per lb</td><td className={tdClass}>Smoker air 225 to 300°F</td><td className={tdClass}>3 hr 20 min to 5 hours</td></tr>
                <tr><td className={tdClass}>Deep fryer</td><td className={tdClass}>8 to 12 lb</td><td className={tdClass}>3 to 5 min per lb</td><td className={tdClass}>Oil at 350°F</td><td className={tdClass}>30 to 50 minutes</td></tr>
                <tr><td className={tdClass}>Microwave</td><td className={tdClass}>8 to 14 lb</td><td className={tdClass}>9 to 10 min per lb at 50% power</td><td className={tdClass}>In an oven cooking bag</td><td className={tdClass}>1½ hours to 1 hr 40 min</td></tr>
                <tr><td className={tdClass}>Oven, from frozen</td><td className={tdClass}>8 to 24 lb</td><td className={tdClass}>Add 50% to the roasting table</td><td className={tdClass}>325°F</td><td className={tdClass}>At least 4 hr 8 min to 4½ hours</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">How long to thaw a turkey</h2>
          <p className="text-gray-700 mb-6">
            From the USDA&apos;s{" "}
            <a href={SRC.thaw} target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">
              Turkey Basics: Safe Thawing
            </a>
            . In a fridge at 40°F or below, allow about 24 hours for every 4 to 5 pounds. In cold water, allow about 30 minutes per pound,
            keep the turkey wrapped, change the water every 30 minutes and cook it as soon as it has thawed.
          </p>
          <div className="overflow-x-auto bg-white rounded-xl border border-gray-200">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th scope="col" className={thClass}>Turkey weight</th>
                  <th scope="col" className={thClass}>In the fridge</th>
                  <th scope="col" className={thClass}>In cold water</th>
                  <th scope="col" className={thClass}>Into the fridge by, for a Thursday dinner</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className={tdClass}>4 to 12 lb</td><td className={tdClass}>1 to 3 days</td><td className={tdClass}>2 to 6 hours</td><td className={tdClass}>Monday</td></tr>
                <tr className="bg-orange-50"><td className={tdClass}>12 to 16 lb</td><td className={tdClass}>3 to 4 days</td><td className={tdClass}>6 to 8 hours</td><td className={tdClass}>Sunday</td></tr>
                <tr><td className={tdClass}>16 to 20 lb</td><td className={tdClass}>4 to 5 days</td><td className={tdClass}>8 to 10 hours</td><td className={tdClass}>Saturday</td></tr>
                <tr><td className={tdClass}>20 to 24 lb</td><td className={tdClass}>5 to 6 days</td><td className={tdClass}>10 to 12 hours</td><td className={tdClass}>Friday</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            The last column uses the long end of the fridge range. A turkey thawed in the fridge can stay there 1 or 2 days before
            cooking. Never thaw it on the counter: the USDA says a package left out more than 2 hours isn&apos;t at a safe temperature.
          </p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-10 mb-4">How much turkey per person</h3>
          <div className="overflow-x-auto bg-white rounded-xl border border-gray-200">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th scope="col" className={thClass}>Turkey</th>
                  <th scope="col" className={thClass}>Per person</th>
                  <th scope="col" className={thClass}>10 guests</th>
                  <th scope="col" className={thClass}>20 guests</th>
                  <th scope="col" className={thClass}>Source</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className={tdClass}>Whole turkey</td><td className={tdClass}>1 lb</td><td className={tdClass}>10 lb</td><td className={tdClass}>20 lb</td><td className={tdClass}>USDA</td></tr>
                <tr><td className={tdClass}>Whole, with leftovers</td><td className={tdClass}>1½ lb</td><td className={tdClass}>15 lb</td><td className={tdClass}>30 lb, as two birds</td><td className={tdClass}>UW Extension</td></tr>
                <tr><td className={tdClass}>Bone-in breast</td><td className={tdClass}>¾ lb</td><td className={tdClass}>7½ lb</td><td className={tdClass}>15 lb</td><td className={tdClass}>UW Extension</td></tr>
                <tr><td className={tdClass}>Boneless breast</td><td className={tdClass}>½ lb</td><td className={tdClass}>5 lb</td><td className={tdClass}>10 lb</td><td className={tdClass}>UW Extension</td></tr>
                <tr><td className={tdClass}>Frozen pre-stuffed turkey</td><td className={tdClass}>1¼ lb</td><td className={tdClass}>12½ lb</td><td className={tdClass}>25 lb</td><td className={tdClass}>USDA</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            30 lb is past the USDA&apos;s 24-lb roasting table, which is why the table says two birds. Buy a fresh turkey only 1 to 2 days
            before you cook it.
          </p>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Where to check for 165°F</h2>
          <p className="text-gray-700 mb-6">
            The USDA&apos;s{" "}
            <a href={SRC.temps} target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">
              safe minimum internal temperature
            </a>{" "}
            for all poultry, whole birds and stuffing included, is 165°F. For a whole turkey, check it in three places.
          </p>
          <div className="overflow-x-auto bg-white rounded-xl border border-gray-200">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th scope="col" className={thClass}>Where</th>
                  <th scope="col" className={thClass}>Safe minimum</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className={tdClass}>Innermost part of the thigh</td><td className={tdClass}>165°F (74°C)</td></tr>
                <tr><td className={tdClass}>Innermost part of the wing</td><td className={tdClass}>165°F (74°C)</td></tr>
                <tr><td className={tdClass}>Thickest part of the breast</td><td className={tdClass}>165°F (74°C)</td></tr>
                <tr><td className={tdClass}>Center of the stuffing, if stuffed</td><td className={tdClass}>165°F (74°C)</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            You can cook it hotter if you prefer; 165°F is the safe minimum. If your turkey has a pop-up timer, check with a thermometer too.
          </p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-10 mb-4">USDA roasting tips</h3>
          <ul className="space-y-3 text-gray-700">
            <li><strong>Pan:</strong> place the turkey on a rack in a shallow roasting pan.</li>
            <li><strong>Oven:</strong> set it no lower than 325°F.</li>
            <li><strong>Optional:</strong> tuck the wing tips under the shoulders, add ½ cup of water to the pan, and tent with foil for the first 1 to 1½ hours if the pan has no lid.</li>
            <li><strong>Thermometer:</strong> an oven-proof thermometer can stay in the thigh from the start; once the thigh reads 165°F, check the wing and the thickest part of the breast.</li>
            <li><strong>Stuffing:</strong> if you stuff the bird, the center of the stuffing must reach 165°F too, and all of it comes out of the cavity after cooking.</li>
            <li><strong>Before carving:</strong> let it stand 20 minutes.</li>
            <li><strong>Hygiene:</strong> wash your hands, utensils and the sink after they touch raw turkey or its juices.</li>
          </ul>
        </div>
      </section>

      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-8">Frequently asked questions</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-white rounded-xl p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">Related calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/meat-cooking-time-calculator", title: "Meat Cooking Calculator", desc: "Times for beef, pork, chicken, lamb and more" },
              { href: "/meat-temperature-chart", title: "Meat Temperature Chart", desc: "Safe internal temperatures for all meats" },
              { href: "/party-food-calculator", title: "Party Food Calculator", desc: "Plan your holiday food quantities" },
              { href: "/oven-temperature-converter", title: "Oven Temperature Converter", desc: "Fahrenheit, Celsius and gas marks" },
              { href: "/recipe-scaler", title: "Recipe Scaler", desc: "Scale side dishes for your guest count" },
              { href: "/cooking-measurement-converter", title: "Measurement Converter", desc: "Cups, tablespoons, ounces and more" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-coral transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1">{l.title}</h3>
                <p className="text-sm text-gray-600">{l.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-sm font-semibold text-gray-900 mb-2">Sources</h2>
          <ul className="text-sm text-gray-600 space-y-1">
            <li><a href={SRC.roast} target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">Let&apos;s Talk Turkey: A Consumer Guide to Safely Roasting a Turkey</a>, USDA Food Safety and Inspection Service</li>
            <li><a href={SRC.thaw} target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">Turkey Basics: Safe Thawing</a>, USDA Food Safety and Inspection Service</li>
            <li><a href={SRC.alt} target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">Turkey: Alternate Routes to the Table</a>, USDA Food Safety and Inspection Service</li>
            <li><a href={SRC.temps} target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">Safe Minimum Internal Temperature Chart</a>, USDA Food Safety and Inspection Service</li>
            <li><a href={SRC.uwyo} target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">Let&apos;s Talk Turkey (MP-135)</a>, University of Wyoming Extension</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
