import { Metadata } from "next";
import Link from "next/link";
import TurkeyCookingCalculator from "@/components/calculators/TurkeyCookingCalculator";
import RoastChart from "@/components/instrument/RoastChart";
import { KNOB_325_SVG, THERMO_165_NARROW_SVG, THERMO_165_WIDE_SVG, TURKEY_CHECK_SVG } from "@/components/instrument/svg";
import { FAQPageJsonLd, WebApplicationJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { AUTHOR } from "@/data/author";

const SRC = {
  roast: "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/poultry/lets-talk-turkey-roasting",
  thaw: "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/poultry/turkey-basics-safe-thawing",
  alt: "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/poultry/turkey-alternate-routes-table",
  temps: "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/safe-temperature-chart",
  uwyo: "https://wyoextension.org/publications/html/MP135",
};

const UPDATED = "2026-11-18"; // last real content change (CK-002, live 2026-11-18)

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

const EXAMPLES: { title: string; setup: string; result: string[]; note?: string }[] = [
  {
    title: "A 16-lb turkey for a 3:00 PM dinner",
    setup: "Fresh 16-lb turkey, unstuffed, oven at 325°F.",
    result: [
      "Roasting time: 3¾ to 4¼ hours (USDA 14 to 18 lb row).",
      "In the oven by 10:25 AM, start checking for 165°F at 2:10 PM, out by 2:40 PM.",
      "Let it stand 20 minutes, carve at 3:00 PM. It feeds 16 at 1 lb each, or 10 with leftovers at 1½ lb each.",
    ],
    note: "If it's frozen: a 16-lb turkey needs 3 to 4 days in the fridge, so for a Thursday dinner it goes in the fridge by Sunday.",
  },
  {
    title: "A 12-lb turkey in the deep fryer",
    setup: "12-lb turkey, completely thawed, not stuffed; oil at 350°F, outdoors.",
    result: [
      "Frying time: 36 to 60 minutes (USDA: 3 to 5 minutes per pound).",
      "The oil should cover the turkey by 1 to 2 inches; measure how much you need with water first.",
      "Check for 165°F; if it isn't done, return it to the oil right away.",
    ],
    note: "The USDA says a turkey for frying should be 12 pounds or less, and never to leave the hot oil unattended.",
  },
  {
    title: "Forgot to thaw: a 17-lb frozen turkey on the day",
    setup: "17-lb turkey, still frozen, unstuffed.",
    result: [
      "Cold water: about 8½ hours (30 minutes per pound), changing the water every 30 minutes, then roast 3¾ to 4¼ hours.",
      "Or roast from frozen: at least 50% longer than a thawed bird, so at least 5 hours 38 minutes to 6 hours 23 minutes.",
    ],
    note: "Cooking from frozen, remove the giblet packages during cooking, carefully, with tongs or a fork.",
  },
  {
    title: "A 10-lb turkey in the smoker",
    setup: "10-lb turkey, not stuffed; smoker air 225 to 300°F, with a drip pan.",
    result: ["Smoking time: 3 hours 20 minutes to 5 hours (USDA: 20 to 30 minutes per pound for 8 to 12 lb). Done at 165°F in the thigh, wing and breast."],
  },
  {
    title: "A 14-lb turkey on a covered grill",
    setup: "14-lb turkey, not stuffed; covered gas or charcoal grill, air 225 to 300°F, drip pan.",
    result: ["Grilling time: 3½ hours to 4 hours 12 minutes (USDA: 15 to 18 minutes per pound for 8 to 16 lb). Done at 165°F in the thigh, wing and breast."],
  },
];

const MORE = [
  { href: "/meat-cooking-time-calculator", title: "Meat cooking time" },
  { href: "/meat-temperature-chart", title: "Meat temperature chart" },
  { href: "/party-food-calculator", title: "Party food calculator" },
  { href: "/oven-temperature-converter", title: "Oven temperature converter" },
  { href: "/recipe-scaler", title: "Recipe scaler" },
  { href: "/cooking-measurement-converter", title: "Measurement converter" },
];

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const updatedText = new Date(`${UPDATED}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export default function TurkeyCookingCalculatorPage() {
  return (
    <>
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

      <div className="p-hero">
        <div className="p-wrap">
          <div className="p-hgrid">
            <span dangerouslySetInnerHTML={{ __html: KNOB_325_SVG }} />
            <div className="p-htext">
              <nav className="p-crumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link> / Cooking time / Turkey
              </nav>
              <h1 className="p-h1">Turkey cooking time calculator</h1>
              <p className="p-answer">
                A <span className="p-nb">16-lb</span> turkey roasts in 3¾ to 4¼ hours at 325°F.
              </p>
              <p className="p-sub">
                It&apos;s done when a food thermometer reads 165°F in the innermost thigh, the innermost wing and the thickest part of the
                breast. Times from the{" "}
                <a href={SRC.roast} {...ext}>
                  USDA&apos;s 325°F roasting timetable
                </a>
                .
              </p>
              <p className="p-by">
                By{" "}
                <Link href={AUTHOR.href} rel="author">
                  {AUTHOR.name}, {AUTHOR.credential}
                </Link>
                , {AUTHOR.school} · Updated <time dateTime={UPDATED}>{updatedText}</time>
              </p>
            </div>
          </div>

          <figure className="p-thermo">
            <span className="p-th-wide" dangerouslySetInnerHTML={{ __html: THERMO_165_WIDE_SVG }} />
            <span className="p-th-narrow" dangerouslySetInnerHTML={{ __html: THERMO_165_NARROW_SVG }} />
            <figcaption className="p-th-cap">
              Internal temperature, °F. The USDA&apos;s danger zone is 40 to 140°F; a whole turkey is safe at 165°F.
            </figcaption>
          </figure>

          <TurkeyCookingCalculator />
        </div>
      </div>

      <div className="p-wrap">
        <div className="p-main">
          <div className="p-content">
            <div className="p-ruler" />
            <section>
              <h2 className="p-h2">Turkey roasting times at 325°F</h2>
              <p className="p-p">
                These are the{" "}
                <a href={SRC.roast} {...ext}>
                  USDA Food Safety and Inspection Service
                </a>{" "}
                times for a fresh or fully thawed turkey. They&apos;re ranges because birds and ovens differ, so check the temperature with a
                food thermometer.
              </p>
              <RoastChart highlightLb={16} />
              <div className="p-tbox" role="region" aria-label="Turkey roasting times at 325°F" tabIndex={0}>
                <table className="p-table">
                  <thead>
                    <tr><th scope="col">Turkey weight</th><th scope="col">Unstuffed</th><th scope="col">Stuffed</th><th scope="col">Feeds (1 lb each)</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>4 to 8 lb (breast)</td><td>1½ to 3¼ hours</td><td>6 to 8 lb: 2½ to 3½ hours (4 to 6 lb: not usually applicable)</td><td>5 to 10, at ¾ lb of breast each</td></tr>
                    <tr><td>8 to 12 lb</td><td>2¾ to 3 hours</td><td>3 to 3½ hours</td><td>8 to 12</td></tr>
                    <tr><td>12 to 14 lb</td><td>3 to 3¾ hours</td><td>3½ to 4 hours</td><td>12 to 14</td></tr>
                    <tr className="p-tr-hi"><td>14 to 18 lb</td><td>3¾ to 4¼ hours</td><td>4 to 4¼ hours</td><td>14 to 18</td></tr>
                    <tr><td>18 to 20 lb</td><td>4¼ to 4½ hours</td><td>4¼ to 4¾ hours</td><td>18 to 20</td></tr>
                    <tr><td>20 to 24 lb</td><td>4½ to 5 hours</td><td>4¾ to 5¼ hours</td><td>20 to 24</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="p-note">Cooking from frozen takes at least 50% longer. Set the oven no lower than 325°F. The USDA&apos;s table stops at 24 lb.</p>
            </section>

            <div className="p-ruler" />
            <section>
              <h2 className="p-h2">Other ways to cook a turkey</h2>
              <p className="p-p">
                From the USDA&apos;s{" "}
                <a href={SRC.alt} {...ext}>
                  Turkey: Alternate Routes to the Table
                </a>
                . None of these methods allows stuffing.
              </p>
              <div className="p-tbox" role="region" aria-label="Other ways to cook a turkey" tabIndex={0}>
                <table className="p-table">
                  <thead>
                    <tr><th scope="col">Method</th><th scope="col">Bird size</th><th scope="col">Time</th><th scope="col">Heat</th><th scope="col">10-lb turkey</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Electric roaster oven</td><td>8 to 24 lb</td><td>Generally the same as oven roasting</td><td>At least 325°F</td><td>2¾ to 3 hours</td></tr>
                    <tr><td>Covered grill</td><td>8 to 16 lb</td><td>15 to 18 min per lb</td><td>Grill air 225 to 300°F</td><td>2½ to 3 hours</td></tr>
                    <tr><td>Smoker</td><td>8 to 12 lb</td><td>20 to 30 min per lb</td><td>Smoker air 225 to 300°F</td><td>3 hr 20 min to 5 hours</td></tr>
                    <tr><td>Deep fryer</td><td>8 to 12 lb</td><td>3 to 5 min per lb</td><td>Oil at 350°F</td><td>30 to 50 minutes</td></tr>
                    <tr><td>Microwave</td><td>8 to 14 lb</td><td>9 to 10 min per lb at 50% power</td><td>In an oven cooking bag</td><td>1½ hours to 1 hr 40 min</td></tr>
                    <tr><td>Oven, from frozen</td><td>8 to 24 lb</td><td>Add 50% to the roasting table</td><td>325°F</td><td>At least 4 hr 8 min to 4½ hours</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <div className="p-ruler" />
            <section>
              <h2 className="p-h2">How long to thaw a turkey</h2>
              <p className="p-p">
                From the USDA&apos;s{" "}
                <a href={SRC.thaw} {...ext}>
                  Turkey Basics: Safe Thawing
                </a>
                . In a fridge at 40°F or below, allow about 24 hours for every 4 to 5 pounds. In cold water, allow about 30 minutes per pound,
                keep the turkey wrapped, change the water every 30 minutes and cook it as soon as it has thawed.
              </p>
              <p className="p-cal-lead">For a Thursday dinner, a frozen <span className="p-nb">16-lb</span> turkey goes into the fridge by Sunday.</p>
              <ol className="p-cal" aria-label="Thawing a 16-lb turkey for a Thursday dinner">
                {["Sun", "Mon", "Tue", "Wed"].map((d, i) => (
                  <li className="p-day" key={d}>
                    <span className="p-day-n">Day {i + 1}</span>
                    <span className="p-day-d">{d}</span>
                    <span className="p-day-s">Thaw</span>
                  </li>
                ))}
                <li className="p-day p-day-go">
                  <span className="p-day-n">Dinner</span>
                  <span className="p-day-d">Thu</span>
                  <span className="p-day-s">Roast</span>
                </li>
              </ol>
              <div className="p-tbox" role="region" aria-label="How long to thaw a turkey" tabIndex={0}>
                <table className="p-table">
                  <thead>
                    <tr><th scope="col">Turkey weight</th><th scope="col">In the fridge</th><th scope="col">In cold water</th><th scope="col">Into the fridge by, for a Thursday dinner</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>4 to 12 lb</td><td>1 to 3 days</td><td>2 to 6 hours</td><td>Monday</td></tr>
                    <tr className="p-tr-hi"><td>12 to 16 lb</td><td>3 to 4 days</td><td>6 to 8 hours</td><td>Sunday</td></tr>
                    <tr><td>16 to 20 lb</td><td>4 to 5 days</td><td>8 to 10 hours</td><td>Saturday</td></tr>
                    <tr><td>20 to 24 lb</td><td>5 to 6 days</td><td>10 to 12 hours</td><td>Friday</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="p-note">
                The last column uses the long end of the fridge range. A turkey thawed in the fridge can stay there 1 or 2 days before cooking.
                Never thaw it on the counter: the USDA says a package left out more than 2 hours isn&apos;t at a safe temperature.
              </p>
            </section>

            <div className="p-ruler" />
            <section>
              <h2 className="p-h2">How much turkey per person</h2>
              <div className="p-tbox" role="region" aria-label="How much turkey per person" tabIndex={0}>
                <table className="p-table">
                  <thead>
                    <tr><th scope="col">Turkey</th><th scope="col">Per person</th><th scope="col">10 guests</th><th scope="col">20 guests</th><th scope="col">Source</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Whole turkey</td><td>1 lb</td><td>10 lb</td><td>20 lb</td><td>USDA</td></tr>
                    <tr><td>Whole, with leftovers</td><td>1½ lb</td><td>15 lb</td><td>30 lb, as two birds</td><td>UW Extension</td></tr>
                    <tr><td>Bone-in breast</td><td>¾ lb</td><td>7½ lb</td><td>15 lb</td><td>UW Extension</td></tr>
                    <tr><td>Boneless breast</td><td>½ lb</td><td>5 lb</td><td>10 lb</td><td>UW Extension</td></tr>
                    <tr><td>Frozen pre-stuffed turkey</td><td>1¼ lb</td><td>12½ lb</td><td>25 lb</td><td>USDA</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="p-note">
                30 lb is past the USDA&apos;s 24-lb roasting table, which is why the table says two birds. Buy a fresh turkey only 1 to 2 days before
                you cook it.
              </p>
            </section>

            <div className="p-ruler" />
            <section>
              <h2 className="p-h2">Where to check for 165°F</h2>
              <p className="p-p">
                The USDA&apos;s{" "}
                <a href={SRC.temps} {...ext}>
                  safe minimum internal temperature
                </a>{" "}
                for all poultry, whole birds and stuffing included, is 165°F (74°C). For a whole turkey, check it in three places, and in the
                center of the stuffing if the bird is stuffed.
              </p>
              <div className="p-fig">
                <span dangerouslySetInnerHTML={{ __html: TURKEY_CHECK_SVG }} />
                <ol className="p-pts">
                  <li className="p-pt"><span className="p-pt-n">1</span>The innermost part of the thigh</li>
                  <li className="p-pt"><span className="p-pt-n">2</span>The innermost part of the wing</li>
                  <li className="p-pt"><span className="p-pt-n">3</span>The thickest part of the breast</li>
                </ol>
              </div>
              <p className="p-note">
                You can cook it hotter if you prefer; 165°F is the safe minimum. If your turkey has a pop-up timer, check with a thermometer too.
              </p>
              <h3 className="p-faq-q">USDA roasting tips</h3>
              <ul className="p-tips">
                <li><strong>Pan:</strong> place the turkey on a rack in a shallow roasting pan.</li>
                <li><strong>Oven:</strong> set it no lower than 325°F.</li>
                <li><strong>Optional:</strong> tuck the wing tips under the shoulders, add ½ cup of water to the pan, and tent with foil for the first 1 to 1½ hours if the pan has no lid.</li>
                <li><strong>Thermometer:</strong> an oven-proof thermometer can stay in the thigh from the start; once the thigh reads 165°F, check the wing and the thickest part of the breast.</li>
                <li><strong>Stuffing:</strong> if you stuff the bird, the center of the stuffing must reach 165°F too, and all of it comes out of the cavity after cooking.</li>
                <li><strong>Before carving:</strong> let it stand 20 minutes.</li>
                <li><strong>Hygiene:</strong> wash your hands, utensils and the sink after they touch raw turkey or its juices.</li>
              </ul>
            </section>

            <div className="p-ruler" />
            <section>
              <h2 className="p-h2">Worked examples</h2>
              <p className="p-p">Each example uses the USDA figures in the tables above.</p>
              {EXAMPLES.map((ex) => (
                <div className="p-ex" key={ex.title}>
                  <h3 className="p-ex-h">{ex.title}</h3>
                  <p className="p-ex-l">{ex.setup}</p>
                  {ex.result.map((r) => {
                    const m = r.match(/^([^:]+): (.*)$/);
                    return (
                      <p className="p-ex-l" key={r}>
                        {m ? (<><strong>{m[1]}:</strong> {m[2]}</>) : r}
                      </p>
                    );
                  })}
                  {ex.note && <p className="p-note">{ex.note}</p>}
                </div>
              ))}
            </section>

            <div className="p-ruler" />
            <section>
              <h2 className="p-h2">Frequently asked questions</h2>
              {faqs.map((f) => (
                <div key={f.question}>
                  <h3 className="p-faq-q">{f.question}</h3>
                  <p className="p-p">{f.answer}</p>
                </div>
              ))}
            </section>

            <section className="p-src">
              <h2 className="p-src-h">Sources</h2>
              <ul className="p-src-l">
                <li><a href={SRC.roast} {...ext}>Let&apos;s Talk Turkey: A Consumer Guide to Safely Roasting a Turkey</a>, USDA Food Safety and Inspection Service</li>
                <li><a href={SRC.thaw} {...ext}>Turkey Basics: Safe Thawing</a>, USDA Food Safety and Inspection Service</li>
                <li><a href={SRC.alt} {...ext}>Turkey: Alternate Routes to the Table</a>, USDA Food Safety and Inspection Service</li>
                <li><a href={SRC.temps} {...ext}>Safe Minimum Internal Temperature Chart</a>, USDA Food Safety and Inspection Service</li>
                <li><a href={SRC.uwyo} {...ext}>Let&apos;s Talk Turkey (MP-135)</a>, University of Wyoming Extension</li>
              </ul>
            </section>
          </div>

          <aside className="p-rail" aria-label="More calculators">
            <div className="p-rail-in">
              <nav className="p-rel" aria-label="More calculators">
                <h2 className="p-rel-h">More calculators</h2>
                <ul className="p-rel-l">
                  {MORE.map((m) => (
                    <li key={m.href}><Link href={m.href}>{m.title}</Link></li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
