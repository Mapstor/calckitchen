import { Metadata } from "next";
import Link from "next/link";
import MeatCookingTimeCalculator from "@/components/calculators/MeatCookingTimeCalculator";
import {
  FAQPageJsonLd,
  WebApplicationJsonLd,
  BreadcrumbJsonLd,
} from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Meat Cooking Time Calculator — Cook Times by Weight for Every Cut",
  description:
    "Calculate exact cooking times per pound for beef, pork, chicken, lamb, ham & more. Enter weight + doneness → get oven temp, time, and rest instructions. USDA-backed.",
  openGraph: {
    title: "Meat Cooking Time Calculator — Cook Times by Weight for Every Cut",
    description:
      "Calculate exact cooking times per pound for beef, pork, chicken, lamb, ham & more. Enter weight + doneness → get oven temp, time, and rest instructions.",
    url: "https://calckitchen.com/meat-cooking-time-calculator",
    type: "website",
  },
  alternates: {
    canonical: "https://calckitchen.com/meat-cooking-time-calculator",
  },
};

const faqs = [
  {
    question: "How long do you cook a roast per pound?",
    answer:
      "It depends on the cut and oven temperature. As a general guide: beef rib roast at 325°F takes 23–25 min/lb, pork loin at 350°F takes 20 min/lb, whole chicken at 350°F takes 20–25 min/lb, and lamb leg at 325°F takes 20–25 min/lb. Use the calculator above for your exact cut and weight.",
  },
  {
    question: "What temperature should I cook a roast in the oven?",
    answer:
      "Most roasts cook well at 325–350°F. Tender cuts like beef tenderloin and pork tenderloin benefit from higher heat (425–450°F) for a shorter time. Tough cuts like brisket and pork shoulder need lower heat (250–300°F) for much longer to break down connective tissue.",
  },
  {
    question: "How long does it take to cook a 5-pound chicken?",
    answer:
      "A 5-lb whole chicken at 350°F takes approximately 1.5–1.75 hours (about 18–20 min/lb). Using the high-start method (450°F for 15 minutes, then 350°F), total time is similar but you get crispier skin. Always verify with a thermometer — the thigh should read 165°F.",
  },
  {
    question: "Should I cook meat at room temperature or straight from the fridge?",
    answer:
      "The USDA advises against leaving meat out for extended periods. While a 20–30 minute rest on the counter for steaks is common practice, large roasts should go straight from the fridge to the oven. Our calculator assumes fridge-cold meat.",
  },
  {
    question: "What is carryover cooking and why does it matter?",
    answer:
      "Carryover cooking is the continued rise in internal temperature after you remove meat from the heat source. Residual heat in the outer layers transfers inward. Steaks carry over 5–10°F, large roasts 10–15°F. That's why you 'pull' meat before it hits your target temperature.",
  },
  {
    question: "How do I know when my meat is done without a thermometer?",
    answer:
      "You don't — not reliably. Invest in a digital instant-read thermometer. They cost $10–15 and are the single best tool you can add to your kitchen. The 'poke test' and 'juice color' methods are unreliable and can lead to unsafe or overcooked results.",
  },
  {
    question: "Does bone-in meat take longer to cook than boneless?",
    answer:
      "Yes. Bones act as insulators, slowing heat transfer to the center. Expect bone-in cuts to take roughly 10–15% longer than equivalent boneless cuts. The trade-off: bones add flavor and help the meat cook more evenly.",
  },
  {
    question: "Can I cook a roast at a lower temperature for longer?",
    answer:
      "Yes, within limits. The USDA minimum oven temperature is 325°F for food safety. Below that, the exterior of the meat stays in the danger zone (40–140°F) too long. Low-and-slow techniques like 250–275°F work for cuts like brisket and pork shoulder because their large mass heats through the danger zone quickly enough.",
  },
  {
    question: "How long should I rest meat before carving?",
    answer:
      "Rest time depends on the size of the cut. Steaks need 5–10 minutes, small roasts (2–5 lbs) need 10–15 minutes, medium roasts (5–10 lbs) need 15–20 minutes, and large roasts or turkeys (10+ lbs) need 20–45 minutes. During this time, juices redistribute and carryover cooking finishes the interior.",
  },
  {
    question: "Why is my roast tough even though it reached the right temperature?",
    answer:
      "Temperature alone doesn't guarantee tenderness. Tough cuts (brisket, chuck, shoulder) contain collagen that only breaks down into gelatin with extended cooking at lower temperatures. If you cooked a tough cut fast to the target temp, the collagen hasn't had time to convert. These cuts need low-and-slow methods.",
  },
  {
    question: "Should I sear my roast before or after oven cooking?",
    answer:
      "Both work. Traditional searing before roasting creates a crust upfront and is the most common method. Reverse searing (low oven first, then high-heat sear at the end) gives you more even doneness edge-to-edge and is popular for thick steaks and tenderloin. Either way, searing develops flavor through the Maillard reaction.",
  },
  {
    question: "How accurate is cooking time per pound for large vs small roasts?",
    answer:
      "Time-per-pound is less accurate for very small or very large roasts. A 3 lb roast has more surface area relative to its mass than a 15 lb roast, so it cooks faster per pound. Our calculator accounts for this with adjusted formulas, but always use a meat thermometer for large roasts.",
  },
];

export default function MeatCookingTimeCalculatorPage() {
  return (
    <div className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Meat Cooking Time Calculator"
        description="Calculate exact cooking times per pound for beef, pork, chicken, lamb, ham and more. Enter weight and doneness to get oven temp, time, and rest instructions."
        url="https://calckitchen.com/meat-cooking-time-calculator"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          {
            name: "Meat Cooking Time Calculator",
            url: "https://calckitchen.com/meat-cooking-time-calculator",
          },
        ]}
      />

      {/* Hero Section with Calculator */}
      <section className="bg-gradient-to-b from-warm-white to-white py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meat Cooking Time Calculator — Roast Perfectly Every Time
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            <strong>How long should you cook that roast?</strong> It depends on
            the cut, the weight, the oven temperature, and how done you like it.
            Our calculator gives you precise cooking times, oven temperatures,
            and resting instructions backed by{" "}
            <a
              href="https://www.usda.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral hover:underline"
            >
              USDA
            </a>{" "}
            food safety guidelines.
          </p>

          {/* Calculator Component */}
          <MeatCookingTimeCalculator />
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            How to Use This Calculator
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>
              <strong>Select your meat type</strong> — Beef, Pork, Chicken,
              Lamb, Veal, Ham, or Other Poultry.
            </li>
            <li>
              <strong>Choose the specific cut</strong> — For example, "Standing
              Rib Roast (Bone-In)" or "Whole Chicken."
            </li>
            <li>
              <strong>Enter the weight</strong> in pounds or kilograms.
            </li>
            <li>
              <strong>Choose your desired doneness</strong> (for beef and lamb)
              — Rare, Medium Rare, Medium, Medium Well, or Well Done. Poultry
              and ground meats default to the USDA safe minimum.
            </li>
            <li>
              <strong>Optional toggles:</strong> Bone-in vs. boneless, stuffed
              (for poultry), convection oven adjustment.
            </li>
            <li>
              <strong>Get your results:</strong> Estimated cooking time range,
              recommended oven temperature, target internal temperature, pull
              temperature (when to remove from heat), rest time, and carryover
              temperature rise.
            </li>
          </ol>
          <p className="mt-4 text-gray-600">
            Always use a meat thermometer to verify doneness. The calculator
            gives you a reliable estimate, but every oven is different, and your
            thermometer is the final word.
          </p>
        </div>
      </section>

      {/* Real-World Examples Section */}
      <section className="py-8 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Real-World Examples: See the Calculator in Action
          </h2>
          <p className="text-gray-700 mb-6">
            Here are six real cooking scenarios showing exactly how to use this
            calculator. Each example includes the inputs, calculated results,
            and practical tips for success.
          </p>

          {/* Example 1 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Sunday Prime Rib for 8 Guests
                </h3>
                <p className="text-gray-600 mb-4">
                  Michael is hosting Sunday dinner for 8 people and bought a 10 lb
                  bone-in standing rib roast. He wants medium-rare (130°F final
                  temperature) with a nice crust.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Calculator Inputs:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Meat Type: <strong>Beef</strong></li>
                    <li>• Cut: <strong>Standing Rib Roast (Bone-In)</strong></li>
                    <li>• Weight: <strong>10 lbs</strong></li>
                    <li>• Doneness: <strong>Medium Rare</strong></li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Calculator Results:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• Oven Temperature: <strong>325°F</strong></li>
                    <li>• Total Cook Time: <strong>3 hr 50 min – 4 hr 10 min</strong></li>
                    <li>• Pull Temperature: <strong>125°F</strong></li>
                    <li>• Target Temperature: <strong>130–135°F</strong></li>
                    <li>• Rest Time: <strong>20–25 minutes</strong></li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Michael starts checking temperature at 3.5 hours.
                    He pulls at 125°F, tents loosely with foil, and rests 25 minutes.
                    The roast rises to 132°F — perfect medium-rare throughout.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 2 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Weeknight Whole Chicken for a Family of 4
                </h3>
                <p className="text-gray-600 mb-4">
                  Sarah wants to roast a 4.5 lb whole chicken for a Tuesday night
                  dinner. She needs it done in about an hour and a half so the
                  family can eat by 6:30 PM.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Calculator Inputs:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Meat Type: <strong>Chicken</strong></li>
                    <li>• Cut: <strong>Whole Chicken</strong></li>
                    <li>• Weight: <strong>4.5 lbs</strong></li>
                    <li>• Stuffed: <strong>No</strong></li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Calculator Results:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• Oven Temperature: <strong>350°F</strong></li>
                    <li>• Total Cook Time: <strong>1 hr 20 min – 1 hr 35 min</strong></li>
                    <li>• Target Temperature: <strong>165°F (thigh)</strong></li>
                    <li>• Rest Time: <strong>10–15 minutes</strong></li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Sarah preheats at 4:45 PM, puts the chicken in
                    at 5:00 PM. She checks temperature at 1 hour 15 minutes — thigh reads
                    163°F. She gives it 5 more minutes, pulls at 166°F, rests 10 minutes,
                    and carves at 6:25 PM.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 3 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Holiday Ham for 15 People
                </h3>
                <p className="text-gray-600 mb-4">
                  The Johnsons are hosting Easter dinner for 15 guests. They
                  bought a 14 lb bone-in spiral-cut ham (precooked) and need to
                  know how long to heat it through without drying it out.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Calculator Inputs:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Meat Type: <strong>Ham</strong></li>
                    <li>• Cut: <strong>Spiral-Cut Ham (Precooked)</strong></li>
                    <li>• Weight: <strong>14 lbs</strong></li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Calculator Results:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• Oven Temperature: <strong>325°F</strong></li>
                    <li>• Total Heat Time: <strong>2 hr 20 min – 2 hr 50 min</strong></li>
                    <li>• Target Temperature: <strong>140°F</strong></li>
                    <li>• Rest Time: <strong>15–20 minutes</strong></li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Since the ham is precooked, they only need to
                    heat it to 140°F (not 165°F). They cover it with foil to prevent drying,
                    add 1 cup water to the pan, and glaze in the last 30 minutes uncovered.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 4 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Pulled Pork for a Backyard BBQ
                </h3>
                <p className="text-gray-600 mb-4">
                  Dave is making pulled pork for 12 people at a Saturday BBQ. He
                  has an 8 lb bone-in pork shoulder (Boston butt) and wants it
                  fork-tender for sandwiches.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Calculator Inputs:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Meat Type: <strong>Pork</strong></li>
                    <li>• Cut: <strong>Pork Shoulder/Boston Butt (Bone-In)</strong></li>
                    <li>• Weight: <strong>8 lbs</strong></li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Calculator Results:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• Oven Temperature: <strong>250–275°F</strong></li>
                    <li>• Total Cook Time: <strong>10–12 hours</strong></li>
                    <li>• Target Temperature: <strong>195–205°F</strong></li>
                    <li>• Rest Time: <strong>30–60 minutes (in cooler)</strong></li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Dave starts Friday night at 9 PM for a
                    3 PM Saturday party. He wraps the shoulder in foil at 165°F (the
                    "stall"), pushes through to 203°F by noon, and rests in a cooler
                    for 3 hours. The meat stays hot and becomes incredibly tender.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 5 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">
                5
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Elegant Lamb Leg for Anniversary Dinner
                </h3>
                <p className="text-gray-600 mb-4">
                  Linda is preparing a special anniversary dinner and chose a
                  6.5 lb boneless leg of lamb. She wants it medium (slightly
                  pink in the center) with a garlic-herb crust.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Calculator Inputs:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Meat Type: <strong>Lamb</strong></li>
                    <li>• Cut: <strong>Leg of Lamb (Boneless)</strong></li>
                    <li>• Weight: <strong>6.5 lbs</strong></li>
                    <li>• Doneness: <strong>Medium</strong></li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Calculator Results:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• Oven Temperature: <strong>325°F</strong></li>
                    <li>• Total Cook Time: <strong>1 hr 55 min – 2 hr 15 min</strong></li>
                    <li>• Pull Temperature: <strong>135°F</strong></li>
                    <li>• Target Temperature: <strong>140–145°F</strong></li>
                    <li>• Rest Time: <strong>15–20 minutes</strong></li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Linda sears the lamb on all sides in a hot
                    skillet before roasting to develop a crust. She inserts the thermometer
                    probe before putting it in the oven and sets an alert for 135°F.
                    After resting, she slices thin against the grain.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 6 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">
                6
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Beef Tenderloin for New Year's Eve
                </h3>
                <p className="text-gray-600 mb-4">
                  The Martinezes are hosting a small New Year's Eve gathering
                  and splurged on a 5 lb whole beef tenderloin. They want
                  medium-rare for the ultimate special occasion dinner.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Calculator Inputs:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Meat Type: <strong>Beef</strong></li>
                    <li>• Cut: <strong>Beef Tenderloin (Whole)</strong></li>
                    <li>• Weight: <strong>5 lbs</strong></li>
                    <li>• Doneness: <strong>Medium Rare</strong></li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Calculator Results:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• Oven Temperature: <strong>425°F</strong></li>
                    <li>• Total Cook Time: <strong>35–45 minutes</strong></li>
                    <li>• Pull Temperature: <strong>120°F</strong></li>
                    <li>• Target Temperature: <strong>130–135°F</strong></li>
                    <li>• Rest Time: <strong>10–15 minutes</strong></li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Because tenderloin is lean and cooks fast,
                    they use the reverse-sear method: roast at 275°F until 110°F internal
                    (about 45 min), then sear in a screaming hot cast iron pan 1-2 minutes
                    per side. Result: edge-to-edge pink with a beautiful crust.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USDA Safe Temps Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            USDA Safe Minimum Internal Temperatures
          </h2>
          <p className="text-gray-700 mb-4">
            Before we dive into specific cuts, here are the temperatures the
            USDA says your meat <em>must</em> reach to be safe. These aren't
            suggestions — they're the line between safe and risky.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-2 text-left">
                    Category
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left">
                    Type
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left">
                    Min Internal Temp
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left">
                    Rest Time
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">
                    Beef, Bison, Veal, Lamb
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    Steaks, roasts, chops
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    145°F (63°C)
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    3 minutes
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">
                    Beef, Pork, Lamb, Veal
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    Ground meat & sausage
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    160°F (71°C)
                  </td>
                  <td className="border border-gray-300 px-3 py-2">None</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">
                    Chicken, Turkey, All Poultry
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    Whole bird, parts, ground
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    165°F (74°C)
                  </td>
                  <td className="border border-gray-300 px-3 py-2">None</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">Pork</td>
                  <td className="border border-gray-300 px-3 py-2">
                    Steaks, roasts, chops
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    145°F (63°C)
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    3 minutes
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Ham (raw)</td>
                  <td className="border border-gray-300 px-3 py-2">Whole</td>
                  <td className="border border-gray-300 px-3 py-2">
                    145°F (63°C)
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    3 minutes
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">
                    Ham (precooked)
                  </td>
                  <td className="border border-gray-300 px-3 py-2">Reheat</td>
                  <td className="border border-gray-300 px-3 py-2">
                    140°F (60°C)
                  </td>
                  <td className="border border-gray-300 px-3 py-2">None</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Fish & Shellfish</td>
                  <td className="border border-gray-300 px-3 py-2">All varieties</td>
                  <td className="border border-gray-300 px-3 py-2">
                    145°F (63°C)
                  </td>
                  <td className="border border-gray-300 px-3 py-2">None</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">Eggs</td>
                  <td className="border border-gray-300 px-3 py-2">Cooked dishes</td>
                  <td className="border border-gray-300 px-3 py-2">
                    160°F (71°C)
                  </td>
                  <td className="border border-gray-300 px-3 py-2">None</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Source:{" "}
            <a
              href="https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral hover:underline"
            >
              FoodSafety.gov
            </a>
          </p>
        </div>
      </section>

      {/* Complete Beef Cooking Chart */}
      <section className="py-8 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            Complete Beef Cooking Time Chart
          </h2>
          <p className="text-gray-700 mb-4">
            Use this comprehensive chart as a reference for all beef cuts. Times
            assume oven-roasting at the indicated temperature with meat starting
            at refrigerator temperature.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-2 text-left">Cut</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Weight</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Oven Temp</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Time (Rare)</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Time (Med-Rare)</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Time (Medium)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Standing Rib Roast (bone-in)</td>
                  <td className="border border-gray-300 px-3 py-2">4–6 lbs</td>
                  <td className="border border-gray-300 px-3 py-2">325°F</td>
                  <td className="border border-gray-300 px-3 py-2">18–20 min/lb</td>
                  <td className="border border-gray-300 px-3 py-2">20–22 min/lb</td>
                  <td className="border border-gray-300 px-3 py-2">22–25 min/lb</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">Standing Rib Roast (bone-in)</td>
                  <td className="border border-gray-300 px-3 py-2">8–10 lbs</td>
                  <td className="border border-gray-300 px-3 py-2">325°F</td>
                  <td className="border border-gray-300 px-3 py-2">15–17 min/lb</td>
                  <td className="border border-gray-300 px-3 py-2">17–20 min/lb</td>
                  <td className="border border-gray-300 px-3 py-2">20–23 min/lb</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Ribeye Roast (boneless)</td>
                  <td className="border border-gray-300 px-3 py-2">4–6 lbs</td>
                  <td className="border border-gray-300 px-3 py-2">350°F</td>
                  <td className="border border-gray-300 px-3 py-2">15–17 min/lb</td>
                  <td className="border border-gray-300 px-3 py-2">17–19 min/lb</td>
                  <td className="border border-gray-300 px-3 py-2">19–22 min/lb</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">Beef Tenderloin (whole)</td>
                  <td className="border border-gray-300 px-3 py-2">4–5 lbs</td>
                  <td className="border border-gray-300 px-3 py-2">425°F</td>
                  <td className="border border-gray-300 px-3 py-2">25–30 min total</td>
                  <td className="border border-gray-300 px-3 py-2">35–40 min total</td>
                  <td className="border border-gray-300 px-3 py-2">40–45 min total</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Beef Tenderloin (whole)</td>
                  <td className="border border-gray-300 px-3 py-2">6–7 lbs</td>
                  <td className="border border-gray-300 px-3 py-2">425°F</td>
                  <td className="border border-gray-300 px-3 py-2">35–40 min total</td>
                  <td className="border border-gray-300 px-3 py-2">45–50 min total</td>
                  <td className="border border-gray-300 px-3 py-2">50–55 min total</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">Top Round Roast</td>
                  <td className="border border-gray-300 px-3 py-2">4–6 lbs</td>
                  <td className="border border-gray-300 px-3 py-2">325°F</td>
                  <td className="border border-gray-300 px-3 py-2">20–22 min/lb</td>
                  <td className="border border-gray-300 px-3 py-2">22–25 min/lb</td>
                  <td className="border border-gray-300 px-3 py-2">25–28 min/lb</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Eye of Round Roast</td>
                  <td className="border border-gray-300 px-3 py-2">2–3 lbs</td>
                  <td className="border border-gray-300 px-3 py-2">325°F</td>
                  <td className="border border-gray-300 px-3 py-2">20–22 min/lb</td>
                  <td className="border border-gray-300 px-3 py-2">22–25 min/lb</td>
                  <td className="border border-gray-300 px-3 py-2">25–28 min/lb</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">Sirloin Tip Roast</td>
                  <td className="border border-gray-300 px-3 py-2">3–4 lbs</td>
                  <td className="border border-gray-300 px-3 py-2">325°F</td>
                  <td className="border border-gray-300 px-3 py-2">20–22 min/lb</td>
                  <td className="border border-gray-300 px-3 py-2">23–25 min/lb</td>
                  <td className="border border-gray-300 px-3 py-2">25–30 min/lb</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Chuck Roast (pot roast)</td>
                  <td className="border border-gray-300 px-3 py-2">3–4 lbs</td>
                  <td className="border border-gray-300 px-3 py-2">300°F</td>
                  <td className="border border-gray-300 px-3 py-2" colSpan={3}>3–4 hours (braised)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">Brisket (whole packer)</td>
                  <td className="border border-gray-300 px-3 py-2">10–14 lbs</td>
                  <td className="border border-gray-300 px-3 py-2">250–275°F</td>
                  <td className="border border-gray-300 px-3 py-2" colSpan={3}>1–1.5 hrs/lb (to 195–205°F)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Tri-Tip Roast</td>
                  <td className="border border-gray-300 px-3 py-2">2–3 lbs</td>
                  <td className="border border-gray-300 px-3 py-2">425°F</td>
                  <td className="border border-gray-300 px-3 py-2">20–25 min total</td>
                  <td className="border border-gray-300 px-3 py-2">25–30 min total</td>
                  <td className="border border-gray-300 px-3 py-2">30–35 min total</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Beef Doneness Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            Beef Doneness Temperatures
          </h2>
          <p className="text-gray-700 mb-4">
            For beef steaks and roasts, the USDA recommends a minimum of 145°F.
            Temperatures below that are common preferences at restaurants but
            carry higher risk. Here's the full spectrum of doneness levels,
            including the <strong>pull temperature</strong> — the point at which
            you should remove the meat from heat, because carryover cooking will
            bring it up the rest of the way.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-2 text-left">
                    Doneness
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left">
                    Internal Temp
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left">
                    Description
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left">
                    Pull Temp
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Rare</td>
                  <td className="border border-gray-300 px-3 py-2">
                    120–130°F (49–54°C)
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    Red, cool-to-warm center, soft and juicy
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    115–125°F
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">
                    Medium Rare
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    130–135°F (54–57°C)
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    Warm red center, pink edges, very juicy
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    125–130°F
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Medium</td>
                  <td className="border border-gray-300 px-3 py-2">
                    135–145°F (57–63°C)
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    Hot pink center, firmer texture
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    130–140°F
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">
                    Medium Well
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    145–155°F (63–68°C)
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    Slightly pink center, firm
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    140–150°F
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">
                    Well Done
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    155–165°F (68–74°C)
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    No pink, gray-brown throughout
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    150–160°F
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              <strong>Understanding carryover cooking:</strong> Steaks typically
              rise 5–10°F after you take them off heat. Thick roasts can rise
              10–15°F. This is why the pull temperature matters — if you wait
              until the thermometer reads your target, you'll overshoot.
            </p>
          </div>
        </div>
      </section>

      {/* Complete Pork Cooking Chart */}
      <section className="py-8 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            Complete Pork Cooking Time Chart
          </h2>
          <p className="text-gray-700 mb-4">
            Pork is safe to eat at 145°F with a 3-minute rest (updated USDA guidelines).
            Slightly pink pork is not only safe but more tender and juicy than overcooked pork.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-2 text-left">Cut</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Weight</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Oven Temp</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Time</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Target Temp</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Pork Loin Roast (boneless)</td>
                  <td className="border border-gray-300 px-3 py-2">2–3 lbs</td>
                  <td className="border border-gray-300 px-3 py-2">350°F</td>
                  <td className="border border-gray-300 px-3 py-2">20–25 min/lb</td>
                  <td className="border border-gray-300 px-3 py-2">145°F</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">Pork Loin Roast (bone-in)</td>
                  <td className="border border-gray-300 px-3 py-2">3–5 lbs</td>
                  <td className="border border-gray-300 px-3 py-2">350°F</td>
                  <td className="border border-gray-300 px-3 py-2">22–28 min/lb</td>
                  <td className="border border-gray-300 px-3 py-2">145°F</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Pork Tenderloin</td>
                  <td className="border border-gray-300 px-3 py-2">1–1.5 lbs</td>
                  <td className="border border-gray-300 px-3 py-2">425°F</td>
                  <td className="border border-gray-300 px-3 py-2">20–30 min total</td>
                  <td className="border border-gray-300 px-3 py-2">145°F</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">Crown Roast of Pork</td>
                  <td className="border border-gray-300 px-3 py-2">6–10 lbs</td>
                  <td className="border border-gray-300 px-3 py-2">350°F</td>
                  <td className="border border-gray-300 px-3 py-2">20–22 min/lb</td>
                  <td className="border border-gray-300 px-3 py-2">145°F</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Pork Shoulder (Boston Butt)</td>
                  <td className="border border-gray-300 px-3 py-2">6–8 lbs</td>
                  <td className="border border-gray-300 px-3 py-2">250–275°F</td>
                  <td className="border border-gray-300 px-3 py-2">1.5–2 hrs/lb</td>
                  <td className="border border-gray-300 px-3 py-2">195–205°F</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">Pork Shoulder (picnic)</td>
                  <td className="border border-gray-300 px-3 py-2">5–8 lbs</td>
                  <td className="border border-gray-300 px-3 py-2">250–275°F</td>
                  <td className="border border-gray-300 px-3 py-2">1.5–2 hrs/lb</td>
                  <td className="border border-gray-300 px-3 py-2">195–205°F</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Pork Ribs (spare or baby back)</td>
                  <td className="border border-gray-300 px-3 py-2">2–4 lbs</td>
                  <td className="border border-gray-300 px-3 py-2">275–300°F</td>
                  <td className="border border-gray-300 px-3 py-2">2.5–3.5 hrs</td>
                  <td className="border border-gray-300 px-3 py-2">195–203°F</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">Fresh Ham (whole, bone-in)</td>
                  <td className="border border-gray-300 px-3 py-2">14–16 lbs</td>
                  <td className="border border-gray-300 px-3 py-2">325°F</td>
                  <td className="border border-gray-300 px-3 py-2">18–20 min/lb</td>
                  <td className="border border-gray-300 px-3 py-2">145°F</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Fresh Ham (half, bone-in)</td>
                  <td className="border border-gray-300 px-3 py-2">7–8 lbs</td>
                  <td className="border border-gray-300 px-3 py-2">325°F</td>
                  <td className="border border-gray-300 px-3 py-2">22–25 min/lb</td>
                  <td className="border border-gray-300 px-3 py-2">145°F</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">Precooked Ham (whole)</td>
                  <td className="border border-gray-300 px-3 py-2">10–14 lbs</td>
                  <td className="border border-gray-300 px-3 py-2">325°F</td>
                  <td className="border border-gray-300 px-3 py-2">10–14 min/lb</td>
                  <td className="border border-gray-300 px-3 py-2">140°F</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Precooked Ham (half)</td>
                  <td className="border border-gray-300 px-3 py-2">5–7 lbs</td>
                  <td className="border border-gray-300 px-3 py-2">325°F</td>
                  <td className="border border-gray-300 px-3 py-2">18–24 min/lb</td>
                  <td className="border border-gray-300 px-3 py-2">140°F</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Complete Poultry Cooking Chart */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            Complete Poultry Cooking Time Chart
          </h2>
          <p className="text-gray-700 mb-4">
            All poultry must reach 165°F in the thickest part of the thigh (for whole birds)
            or breast. Use these times as guidelines and always verify with a thermometer.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-2 text-left">Type</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Weight</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Oven Temp</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Unstuffed</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Stuffed</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Whole Chicken</td>
                  <td className="border border-gray-300 px-3 py-2">3–4 lbs</td>
                  <td className="border border-gray-300 px-3 py-2">350°F</td>
                  <td className="border border-gray-300 px-3 py-2">1–1.25 hrs</td>
                  <td className="border border-gray-300 px-3 py-2">1.25–1.5 hrs</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">Whole Chicken</td>
                  <td className="border border-gray-300 px-3 py-2">4–5 lbs</td>
                  <td className="border border-gray-300 px-3 py-2">350°F</td>
                  <td className="border border-gray-300 px-3 py-2">1.25–1.5 hrs</td>
                  <td className="border border-gray-300 px-3 py-2">1.5–1.75 hrs</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Whole Chicken</td>
                  <td className="border border-gray-300 px-3 py-2">5–7 lbs</td>
                  <td className="border border-gray-300 px-3 py-2">350°F</td>
                  <td className="border border-gray-300 px-3 py-2">1.5–2 hrs</td>
                  <td className="border border-gray-300 px-3 py-2">1.75–2.25 hrs</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">Chicken Breast (bone-in)</td>
                  <td className="border border-gray-300 px-3 py-2">6–8 oz each</td>
                  <td className="border border-gray-300 px-3 py-2">375°F</td>
                  <td className="border border-gray-300 px-3 py-2">30–40 min</td>
                  <td className="border border-gray-300 px-3 py-2">—</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Chicken Breast (boneless)</td>
                  <td className="border border-gray-300 px-3 py-2">4–6 oz each</td>
                  <td className="border border-gray-300 px-3 py-2">400°F</td>
                  <td className="border border-gray-300 px-3 py-2">20–25 min</td>
                  <td className="border border-gray-300 px-3 py-2">—</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">Chicken Thighs (bone-in)</td>
                  <td className="border border-gray-300 px-3 py-2">5–7 oz each</td>
                  <td className="border border-gray-300 px-3 py-2">400°F</td>
                  <td className="border border-gray-300 px-3 py-2">35–45 min</td>
                  <td className="border border-gray-300 px-3 py-2">—</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Chicken Drumsticks</td>
                  <td className="border border-gray-300 px-3 py-2">4–5 oz each</td>
                  <td className="border border-gray-300 px-3 py-2">400°F</td>
                  <td className="border border-gray-300 px-3 py-2">35–40 min</td>
                  <td className="border border-gray-300 px-3 py-2">—</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">Chicken Wings</td>
                  <td className="border border-gray-300 px-3 py-2">2–3 oz each</td>
                  <td className="border border-gray-300 px-3 py-2">425°F</td>
                  <td className="border border-gray-300 px-3 py-2">40–50 min</td>
                  <td className="border border-gray-300 px-3 py-2">—</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Cornish Hens</td>
                  <td className="border border-gray-300 px-3 py-2">1–1.5 lbs each</td>
                  <td className="border border-gray-300 px-3 py-2">350°F</td>
                  <td className="border border-gray-300 px-3 py-2">50–60 min</td>
                  <td className="border border-gray-300 px-3 py-2">60–70 min</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">Duck (whole)</td>
                  <td className="border border-gray-300 px-3 py-2">4–5 lbs</td>
                  <td className="border border-gray-300 px-3 py-2">325°F</td>
                  <td className="border border-gray-300 px-3 py-2">2–2.5 hrs</td>
                  <td className="border border-gray-300 px-3 py-2">2.5–3 hrs</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Goose (whole)</td>
                  <td className="border border-gray-300 px-3 py-2">8–12 lbs</td>
                  <td className="border border-gray-300 px-3 py-2">325°F</td>
                  <td className="border border-gray-300 px-3 py-2">2.5–3.5 hrs</td>
                  <td className="border border-gray-300 px-3 py-2">3–4 hrs</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            For complete turkey cooking times, see our dedicated{" "}
            <Link href="/turkey-cooking-calculator" className="text-coral hover:underline">
              Turkey Cooking Calculator
            </Link>.
          </p>
        </div>
      </section>

      {/* Complete Lamb Cooking Chart */}
      <section className="py-8 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            Complete Lamb Cooking Time Chart
          </h2>
          <p className="text-gray-700 mb-4">
            Lamb is often served pink in the center, similar to beef. The USDA
            recommends 145°F minimum, but many prefer it at 130–140°F for medium-rare
            to medium doneness.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-2 text-left">Cut</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Weight</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Oven Temp</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Med-Rare</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Medium</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Well Done</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Leg of Lamb (bone-in)</td>
                  <td className="border border-gray-300 px-3 py-2">5–7 lbs</td>
                  <td className="border border-gray-300 px-3 py-2">325°F</td>
                  <td className="border border-gray-300 px-3 py-2">15–17 min/lb</td>
                  <td className="border border-gray-300 px-3 py-2">18–20 min/lb</td>
                  <td className="border border-gray-300 px-3 py-2">22–25 min/lb</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">Leg of Lamb (bone-in)</td>
                  <td className="border border-gray-300 px-3 py-2">7–9 lbs</td>
                  <td className="border border-gray-300 px-3 py-2">325°F</td>
                  <td className="border border-gray-300 px-3 py-2">13–15 min/lb</td>
                  <td className="border border-gray-300 px-3 py-2">16–18 min/lb</td>
                  <td className="border border-gray-300 px-3 py-2">20–22 min/lb</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Leg of Lamb (boneless)</td>
                  <td className="border border-gray-300 px-3 py-2">4–7 lbs</td>
                  <td className="border border-gray-300 px-3 py-2">325°F</td>
                  <td className="border border-gray-300 px-3 py-2">17–20 min/lb</td>
                  <td className="border border-gray-300 px-3 py-2">20–23 min/lb</td>
                  <td className="border border-gray-300 px-3 py-2">25–28 min/lb</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">Rack of Lamb</td>
                  <td className="border border-gray-300 px-3 py-2">1.5–2 lbs</td>
                  <td className="border border-gray-300 px-3 py-2">450°F</td>
                  <td className="border border-gray-300 px-3 py-2">12–15 min</td>
                  <td className="border border-gray-300 px-3 py-2">15–18 min</td>
                  <td className="border border-gray-300 px-3 py-2">18–22 min</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Crown Roast of Lamb</td>
                  <td className="border border-gray-300 px-3 py-2">3–4 lbs</td>
                  <td className="border border-gray-300 px-3 py-2">325°F</td>
                  <td className="border border-gray-300 px-3 py-2">18–20 min/lb</td>
                  <td className="border border-gray-300 px-3 py-2">22–25 min/lb</td>
                  <td className="border border-gray-300 px-3 py-2">27–30 min/lb</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">Lamb Shoulder (bone-in)</td>
                  <td className="border border-gray-300 px-3 py-2">4–6 lbs</td>
                  <td className="border border-gray-300 px-3 py-2">325°F</td>
                  <td className="border border-gray-300 px-3 py-2" colSpan={3}>25–30 min/lb (for well done, fork-tender)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Lamb Shanks</td>
                  <td className="border border-gray-300 px-3 py-2">12–16 oz each</td>
                  <td className="border border-gray-300 px-3 py-2">325°F</td>
                  <td className="border border-gray-300 px-3 py-2" colSpan={3}>2–2.5 hrs (braised)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Rest Time Guide Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            Rest Time & Carryover Cooking Guide
          </h2>
          <p className="text-gray-700 mb-4">
            Resting meat after cooking is just as important as the cooking
            itself. During rest, residual heat continues cooking the interior
            (carryover), and juices redistribute throughout the meat so they
            don't flood your cutting board.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-2 text-left">
                    Type
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left">
                    Rest Time
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left">
                    Carryover Temp Rise
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">
                    Steaks (under 2 lbs)
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    5–10 min
                  </td>
                  <td className="border border-gray-300 px-3 py-2">5–10°F</td>
                  <td className="border border-gray-300 px-3 py-2">Tent loosely with foil</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">
                    Small roasts (2–5 lbs)
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    10–15 min
                  </td>
                  <td className="border border-gray-300 px-3 py-2">5–10°F</td>
                  <td className="border border-gray-300 px-3 py-2">Tent loosely with foil</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">
                    Medium roasts (5–10 lbs)
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    15–20 min
                  </td>
                  <td className="border border-gray-300 px-3 py-2">10–15°F</td>
                  <td className="border border-gray-300 px-3 py-2">Tent loosely; don't wrap tight</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">
                    Large roasts (10+ lbs)
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    20–30 min
                  </td>
                  <td className="border border-gray-300 px-3 py-2">10–15°F</td>
                  <td className="border border-gray-300 px-3 py-2">Stays warm for 45+ min if tented</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">
                    Turkey (12+ lbs)
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    30–45 min
                  </td>
                  <td className="border border-gray-300 px-3 py-2">10–15°F</td>
                  <td className="border border-gray-300 px-3 py-2">Allows juices to settle; easier carving</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">
                    Pulled pork/brisket
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    30–60 min (or more)
                  </td>
                  <td className="border border-gray-300 px-3 py-2">5–10°F</td>
                  <td className="border border-gray-300 px-3 py-2">Can rest in cooler for 2–4 hrs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Serving Size Guide */}
      <section className="py-8 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            Serving Size Guide — How Much Meat to Buy
          </h2>
          <p className="text-gray-700 mb-4">
            Planning for a group? Here's how much raw meat to buy per person.
            These amounts account for bone, fat, and shrinkage during cooking.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-2 text-left">
                    Meat Type
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left">
                    Bone-In (per person)
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left">
                    Boneless (per person)
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">
                    Prime Rib / Standing Rib Roast
                  </td>
                  <td className="border border-gray-300 px-3 py-2">1 lb</td>
                  <td className="border border-gray-300 px-3 py-2">
                    0.5–0.75 lb
                  </td>
                  <td className="border border-gray-300 px-3 py-2">Rich; smaller portions often suffice</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">Beef Tenderloin</td>
                  <td className="border border-gray-300 px-3 py-2">—</td>
                  <td className="border border-gray-300 px-3 py-2">
                    0.5 lb
                  </td>
                  <td className="border border-gray-300 px-3 py-2">Very lean; 6–8 oz per person</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Whole Chicken</td>
                  <td className="border border-gray-300 px-3 py-2">
                    1–1.25 lbs
                  </td>
                  <td className="border border-gray-300 px-3 py-2">0.5 lb</td>
                  <td className="border border-gray-300 px-3 py-2">One 4 lb chicken feeds 3–4</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">Turkey</td>
                  <td className="border border-gray-300 px-3 py-2">
                    1–1.5 lbs
                  </td>
                  <td className="border border-gray-300 px-3 py-2">0.75 lb</td>
                  <td className="border border-gray-300 px-3 py-2">Plan extra for sandwiches</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">
                    Pork Shoulder (for pulling)
                  </td>
                  <td className="border border-gray-300 px-3 py-2">0.75 lb</td>
                  <td className="border border-gray-300 px-3 py-2">
                    ~0.33 lb cooked
                  </td>
                  <td className="border border-gray-300 px-3 py-2">Loses 40% of weight when cooked</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">Pork Loin</td>
                  <td className="border border-gray-300 px-3 py-2">0.75 lb</td>
                  <td className="border border-gray-300 px-3 py-2">0.5 lb</td>
                  <td className="border border-gray-300 px-3 py-2">Lean cut</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">
                    Lamb Leg
                  </td>
                  <td className="border border-gray-300 px-3 py-2">0.75 lb</td>
                  <td className="border border-gray-300 px-3 py-2">0.5 lb</td>
                  <td className="border border-gray-300 px-3 py-2">Rich flavor</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">Ham</td>
                  <td className="border border-gray-300 px-3 py-2">0.75 lb</td>
                  <td className="border border-gray-300 px-3 py-2">0.5 lb</td>
                  <td className="border border-gray-300 px-3 py-2">Plan extra for leftovers</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Brisket</td>
                  <td className="border border-gray-300 px-3 py-2">1 lb raw</td>
                  <td className="border border-gray-300 px-3 py-2">
                    ~0.5 lb cooked
                  </td>
                  <td className="border border-gray-300 px-3 py-2">Loses ~50% when smoked</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">Pork Ribs</td>
                  <td className="border border-gray-300 px-3 py-2">0.75–1 lb</td>
                  <td className="border border-gray-300 px-3 py-2">—</td>
                  <td className="border border-gray-300 px-3 py-2">Mostly bone; plan generously</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            For precise party planning, try our{" "}
            <Link href="/party-food-calculator" className="text-coral hover:underline">
              Party Food Calculator
            </Link>.
          </p>
        </div>
      </section>

      {/* Food Safety Notes */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            Food Safety Rules You Need to Know
          </h2>
          <p className="text-gray-700 mb-4">
            These aren't optional — they're the non-negotiable rules for safe
            cooking:
          </p>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>
              <strong>Always use a food thermometer.</strong> Color is not a
              reliable indicator of doneness. A burger can look brown inside and
              still be under 160°F, or look pink and be perfectly safe.
            </li>
            <li>
              <strong>Insert the thermometer in the thickest part</strong> of
              the meat, avoiding bone, fat, and gristle, which can give false
              readings.
            </li>
            <li>
              <strong>Ground meats must reach 160°F.</strong> No medium-rare
              burgers, per USDA guidelines — grinding meat mixes surface
              bacteria throughout.
            </li>
            <li>
              <strong>All poultry must reach 165°F.</strong> No exceptions,
              regardless of color or how clear the juices run.
            </li>
            <li>
              <strong>Minimum oven temperature for roasting is 325°F</strong>{" "}
              (per USDA). Lower temperatures keep meat in the danger zone too
              long.
            </li>
            <li>
              <strong>Rest your meat after cooking</strong> — this both finishes
              the cooking (carryover) and redistributes juices for better
              texture and flavor.
            </li>
            <li>
              <strong>
                Don't leave cooked meat in the "danger zone" (40–140°F) for more
                than 2 hours
              </strong>{" "}
              — or more than 1 hour if the room is above 90°F.
            </li>
            <li>
              <strong>Thaw safely</strong> — in the refrigerator (slowest but safest),
              in cold water (change water every 30 min), or in the microwave (cook
              immediately after). Never thaw on the counter.
            </li>
          </ol>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Learn more:</strong> Visit{" "}
              <a
                href="https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety"
                target="_blank"
                rel="noopener noreferrer"
                className="text-coral hover:underline"
              >
                FoodSafety.gov
              </a>{" "}
              for comprehensive food safety guidance from the USDA and FDA.
            </p>
          </div>
        </div>
      </section>

      {/* Thermometer Types Section */}
      <section className="py-8 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            Choosing the Right Meat Thermometer
          </h2>
          <p className="text-gray-700 mb-4">
            A meat thermometer is the single most important tool for cooking meat
            perfectly. Here's how to choose the right one:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-2 text-left">Type</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Best For</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Pros</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Cons</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Price Range</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Instant-read digital</td>
                  <td className="border border-gray-300 px-3 py-2">Spot-checking steaks, chicken</td>
                  <td className="border border-gray-300 px-3 py-2">Fast (2–5 sec), accurate</td>
                  <td className="border border-gray-300 px-3 py-2">Must open oven to check</td>
                  <td className="border border-gray-300 px-3 py-2">$15–$100</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">Leave-in probe (wired)</td>
                  <td className="border border-gray-300 px-3 py-2">Roasts, turkeys</td>
                  <td className="border border-gray-300 px-3 py-2">Monitor without opening door</td>
                  <td className="border border-gray-300 px-3 py-2">Wire can be awkward</td>
                  <td className="border border-gray-300 px-3 py-2">$20–$80</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Wireless/Bluetooth probe</td>
                  <td className="border border-gray-300 px-3 py-2">Smokers, long cooks</td>
                  <td className="border border-gray-300 px-3 py-2">Phone alerts, no wire</td>
                  <td className="border border-gray-300 px-3 py-2">Higher cost, connectivity issues</td>
                  <td className="border border-gray-300 px-3 py-2">$50–$200</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">Dial (analog)</td>
                  <td className="border border-gray-300 px-3 py-2">Basic use</td>
                  <td className="border border-gray-300 px-3 py-2">No batteries needed</td>
                  <td className="border border-gray-300 px-3 py-2">Slower, less accurate</td>
                  <td className="border border-gray-300 px-3 py-2">$5–$20</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Infrared (surface)</td>
                  <td className="border border-gray-300 px-3 py-2">Griddle/pan temp</td>
                  <td className="border border-gray-300 px-3 py-2">Instant surface reading</td>
                  <td className="border border-gray-300 px-3 py-2">Can't measure internal temp</td>
                  <td className="border border-gray-300 px-3 py-2">$15–$50</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>Our recommendation:</strong> Start with a quality instant-read
              thermometer like the ThermoWorks Thermapen or a more affordable option
              like the ThermoPro TP03. Add a leave-in probe thermometer when you're
              ready for larger roasts and turkeys.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="py-8 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Related CalcKitchen Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/turkey-cooking-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-1">
                Turkey Cooking Calculator
              </h3>
              <p className="text-sm text-gray-600">
                Dedicated turkey calculator with thawing times and Thanksgiving
                planning.
              </p>
            </Link>
            <Link
              href="/air-fryer-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-1">
                Air Fryer Converter
              </h3>
              <p className="text-sm text-gray-600">
                Convert oven recipes to air fryer temps and times.
              </p>
            </Link>
            <Link
              href="/slow-cooker-to-oven-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-1">
                Slow Cooker to Oven Converter
              </h3>
              <p className="text-sm text-gray-600">
                Convert between slow cooker, oven, Dutch oven, and Instant Pot.
              </p>
            </Link>
            <Link
              href="/party-food-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-1">
                Party Food Calculator
              </h3>
              <p className="text-sm text-gray-600">
                How much meat to buy per person for BBQs and gatherings.
              </p>
            </Link>
            <Link
              href="/recipe-scaler"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-1">
                Recipe Scaler
              </h3>
              <p className="text-sm text-gray-600">
                Scale any recipe up or down for your crowd size.
              </p>
            </Link>
            <Link
              href="/meat-temperature-chart"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-1">
                Meat Temperature Chart
              </h3>
              <p className="text-sm text-gray-600">
                Interactive visual chart of all USDA safe internal temperatures.
              </p>
            </Link>
            <Link
              href="/oven-temperature-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-1">
                Oven Temperature Converter
              </h3>
              <p className="text-sm text-gray-600">
                Convert between Fahrenheit, Celsius, and Gas Mark.
              </p>
            </Link>
            <Link
              href="/convection-oven-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-1">
                Convection Oven Converter
              </h3>
              <p className="text-sm text-gray-600">
                Adjust recipes for convection vs conventional ovens.
              </p>
            </Link>
            <Link
              href="/recipe-macro-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-1">
                Recipe Macro Calculator
              </h3>
              <p className="text-sm text-gray-600">
                Calculate protein, fat, and carbs per serving in your recipes.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Authority Sources */}
      <section className="py-6 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-sm text-gray-600 text-center">
            Data sources:{" "}
            <a
              href="https://www.usda.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral hover:underline"
            >
              USDA
            </a>
            {" • "}
            <a
              href="https://www.foodsafety.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral hover:underline"
            >
              FoodSafety.gov
            </a>
            {" • "}
            <a
              href="https://www.fsis.usda.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral hover:underline"
            >
              FSIS (Food Safety and Inspection Service)
            </a>
            {" • "}
            <a
              href="https://www.cdc.gov/food-safety/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral hover:underline"
            >
              CDC Food Safety
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
