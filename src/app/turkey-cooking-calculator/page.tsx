import { Metadata } from "next";
import Link from "next/link";
import TurkeyCookingCalculator from "@/components/calculators/TurkeyCookingCalculator";
import { FAQPageJsonLd, WebApplicationJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Turkey Cooking Time Calculator — Roast, Fry, or Smoke (+ Thawing Times) | CalcKitchen",
  description: "Calculate turkey cooking time by weight — stuffed or unstuffed, roasted, deep-fried, smoked, or spatchcocked. Includes thawing calculator and serving size guide.",
  openGraph: {
    title: "Turkey Cooking Time Calculator — Roast, Fry, or Smoke (+ Thawing Times)",
    description: "Calculate turkey cooking time by weight — stuffed or unstuffed, roasted, deep-fried, smoked, or spatchcocked. Includes thawing calculator and serving size guide.",
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
    answer: "A 20-lb unstuffed turkey roasted at 325°F takes 4–5 hours. Stuffed, it takes 4.5–5.5 hours. Deep-frying takes about 1 hour (3 min/lb). Smoking at 225°F takes 10–13 hours. Always use a meat thermometer — turkey is done when the thickest part of the thigh reaches 165°F.",
  },
  {
    question: "How many minutes per pound do you cook a turkey?",
    answer: "For unstuffed turkey at 325°F: 13 minutes per pound for turkeys under 12 lbs, 12 minutes per pound for 12–16 lbs, and 11 minutes per pound for larger birds. Add 15 minutes per pound for stuffed turkeys. Our calculator handles these variables automatically.",
  },
  {
    question: "Should I cook my turkey at 325°F or 350°F?",
    answer: "325°F is the USDA recommendation and produces the juiciest results. Higher temperatures (up to 425°F) can be used for spatchcocked turkeys or to crisp the skin in the last 30 minutes. Never roast below 325°F — it keeps the turkey in the \"danger zone\" (40–140°F) too long.",
  },
  {
    question: "How long does it take to thaw a frozen turkey?",
    answer: "In the refrigerator: 24 hours per 4–5 lbs (safest method). A 20-lb turkey needs 4–5 days. Cold water thawing: 30 minutes per pound, changing water every 30 minutes — a 20-lb turkey takes about 10 hours. Never thaw at room temperature.",
  },
  {
    question: "What size turkey do I need per person?",
    answer: "Plan for 1–1.5 lbs of whole turkey per person. This accounts for bone weight and yields generous servings with leftovers. For boneless turkey breast, plan 0.5 lb per person. For a crowd of 10, get a 12–15 lb turkey.",
  },
  {
    question: "Do I need to baste my turkey?",
    answer: "Basting is optional and mostly affects skin crispness, not moisture. Every time you open the oven, you add 15–30 minutes to cooking time. For crispy skin, skip basting and rub butter under the skin before roasting. For easy browning, tent with foil for the first 2/3 of cooking, then remove.",
  },
  {
    question: "How long should a turkey rest before carving?",
    answer: "Rest 30–45 minutes for turkeys under 16 lbs, and 45–60 minutes for larger birds. Tent loosely with foil. Resting allows juices to redistribute — carving too early means dry meat and a juice-covered cutting board.",
  },
  {
    question: "Is it safe to cook a turkey overnight at low temperature?",
    answer: "No. The USDA advises against cooking turkey below 325°F. Lower temperatures keep the bird in the bacterial \"danger zone\" (40–140°F) for too long. If you want hands-off cooking, consider brining the night before and roasting early morning.",
  },
  {
    question: "Can I cook a frozen turkey without thawing it first?",
    answer: "Yes, but it takes 50% longer. A 15-lb frozen turkey takes about 6+ hours at 325°F instead of 4 hours. Remove the giblet bag after about 2 hours when you can safely open the cavity. The USDA confirms this is safe, but you can't brine or season under the skin.",
  },
  {
    question: "What's the best way to get crispy turkey skin?",
    answer: "For crispy skin: (1) Pat the turkey completely dry before roasting, (2) Rub softened butter or oil on the skin, (3) Don't tent with foil for the final 45-60 minutes, (4) Optionally, increase temperature to 400-425°F for the last 30 minutes. Air drying the turkey uncovered in the fridge overnight also helps.",
  },
  {
    question: "Should I put water in the roasting pan?",
    answer: "Adding 1-2 cups of water, broth, or wine to the pan is optional. It prevents drippings from burning and makes better gravy. However, too much liquid creates steam that can prevent skin from crisping. A middle approach: add liquid halfway through cooking when drippings start to brown.",
  },
  {
    question: "How do I know when my turkey is done without a thermometer?",
    answer: "Without a thermometer (not recommended), check that: (1) Juices run clear when you cut between leg and thigh, (2) The leg moves freely in its socket, (3) The meat is no longer pink at the thickest part. However, a $10 instant-read thermometer is the only reliable method — 165°F in the thigh is the target.",
  },
];

export default function TurkeyCookingCalculatorPage() {
  return (
    <div className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Turkey Cooking Time Calculator"
        description="Calculate turkey cooking times by weight for roasting, deep-frying, smoking, and spatchcocking. Includes thawing calculator and serving size guide."
        url="https://calckitchen.com/turkey-cooking-calculator"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Turkey Cooking Calculator", url: "https://calckitchen.com/turkey-cooking-calculator" },
        ]}
      />

      {/* Hero Section with Calculator */}
      <section className="bg-gradient-to-b from-warm-white to-white py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Turkey Cooking Time Calculator
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Calculate exactly how long to cook your turkey — roasted, deep-fried, smoked, or spatchcocked. Plus thawing times, serving sizes, and a full Thanksgiving timeline. Based on{" "}
            <a
              href="https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/poultry/turkey-basics-safe-thawing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral hover:underline"
            >
              USDA Food Safety guidelines
            </a>.
          </p>

          {/* Calculator Component */}
          <TurkeyCookingCalculator />
        </div>
      </section>

      {/* Real-World Examples Section */}
      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Real-World Turkey Cooking Examples
          </h2>
          <p className="text-gray-700 mb-8">
            See how the calculator works with these real Thanksgiving and holiday scenarios.
          </p>

          {/* Example 1 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Classic Thanksgiving — 12 Guests, 16 lb Turkey, 3pm Dinner
                </h3>
                <p className="text-gray-600 mb-4">
                  The Martinez family is hosting 12 people for Thanksgiving dinner. They bought a 16-lb fresh turkey and want to serve at 3pm. They need to know when to start cooking and when to take it out of the fridge.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1">Turkey weight: 16 lbs (fresh, not frozen)</p>
                  <p className="text-sm text-gray-600 mb-1">Cooking method: Roasted at 325°F, unstuffed</p>
                  <p className="text-sm text-gray-600 mb-1">Target serve time: 3:00 PM</p>
                  <p className="text-sm text-gray-600">Guests: 12 adults</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-emerald-800 font-medium">Complete Timeline:</p>
                  <ul className="text-emerald-700 text-sm mt-1 ml-4 list-disc">
                    <li>Cooking time: 3½–4 hours (16 lbs × 13 min/lb = 208 min ≈ 3.5 hrs)</li>
                    <li>Rest time: 45 minutes</li>
                    <li>Buffer time: 30 minutes</li>
                    <li><strong>Start roasting by: 10:00 AM</strong></li>
                    <li>Remove turkey from fridge: 9:00 AM (1 hour to room temp)</li>
                    <li>Turkey out of oven: ~2:00 PM</li>
                    <li>Carving time: 2:45–3:00 PM</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> The 30-minute buffer accounts for oven temperature variations and lets you focus on side dishes. If the turkey finishes early, it can rest longer—up to 1 hour tented with foil stays hot.
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
                  Deep-Fried Turkey — 14 lb Turkey for a Friendsgiving
                </h3>
                <p className="text-gray-600 mb-4">
                  Jake is deep-frying a turkey for the first time for his Friendsgiving party. He has a 14-lb bird and wants to make sure he times the frying correctly and keeps everything safe.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1">Turkey weight: 14 lbs</p>
                  <p className="text-sm text-gray-600 mb-1">Cooking method: Deep-fried at 350°F oil temp</p>
                  <p className="text-sm text-gray-600">Status: Fully thawed and patted completely dry</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-emerald-800 font-medium">Deep-Frying Results:</p>
                  <ul className="text-emerald-700 text-sm mt-1 ml-4 list-disc">
                    <li>Frying time: 14 lbs × 3.5 min/lb = <strong>49 minutes</strong></li>
                    <li>Oil preheat time: 30–45 minutes to reach 350°F</li>
                    <li>Rest time: 20–30 minutes</li>
                    <li>Target internal temp: 165°F in thigh</li>
                    <li>Oil needed: ~3–5 gallons (test water displacement first)</li>
                  </ul>
                  <p className="text-emerald-700 text-sm mt-2"><strong>Total time from oil heating to carving: ~2 hours</strong></p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Safety warning:</strong> The turkey MUST be completely thawed and dry—ice or water causes explosive oil splatter. Do this outdoors, away from structures. Never leave the fryer unattended. Have a fire extinguisher ready.
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
                  Frozen Turkey Emergency — 20 lb Turkey, Forgot to Thaw
                </h3>
                <p className="text-gray-600 mb-4">
                  It's Wednesday evening and Sarah just realized she forgot to thaw her 20-lb frozen turkey. Thanksgiving is tomorrow at 2pm. She needs emergency options.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1">Turkey weight: 20 lbs (completely frozen)</p>
                  <p className="text-sm text-gray-600 mb-1">Time available: ~18 hours until serving</p>
                  <p className="text-sm text-gray-600">Current status: Still in freezer</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-emerald-800 font-medium">Option 1: Cold Water Thaw (Recommended)</p>
                  <ul className="text-emerald-700 text-sm mt-1 ml-4 list-disc">
                    <li>Time needed: 20 lbs × 30 min/lb = <strong>10 hours</strong></li>
                    <li>Start at 9 PM Wednesday → thawed by 7 AM Thursday</li>
                    <li>Change water every 30 minutes (set phone timer!)</li>
                    <li>Then roast immediately: 4.5–5 hours at 325°F</li>
                    <li>Rest 45 min → Ready by 1:00–2:00 PM</li>
                  </ul>
                  <p className="text-emerald-800 font-medium mt-3">Option 2: Cook From Frozen (USDA approved)</p>
                  <ul className="text-emerald-700 text-sm mt-1 ml-4 list-disc">
                    <li>Cooking time: Normal time × 1.5 = <strong>6.5–7.5 hours</strong></li>
                    <li>Start at 6 AM → done by 1:00 PM</li>
                    <li>Cannot stuff, cannot brine, limited seasoning</li>
                    <li>Remove giblets after ~2 hours when cavity thaws</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Cold water thawing is faster AND lets you season properly. Yes, changing water every 30 minutes overnight is tedious, but the results are worth it. Set alarms!
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
                  Smoked Turkey — 18 lb Bird for BBQ Enthusiast
                </h3>
                <p className="text-gray-600 mb-4">
                  Marcus wants to smoke his Thanksgiving turkey this year using his pellet smoker. He has an 18-lb turkey and wants to serve at 4pm. He's planning to inject it with butter and use applewood pellets.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1">Turkey weight: 18 lbs</p>
                  <p className="text-sm text-gray-600 mb-1">Cooking method: Smoked at 225°F</p>
                  <p className="text-sm text-gray-600 mb-1">Smoker type: Pellet smoker (consistent temp)</p>
                  <p className="text-sm text-gray-600">Target serve time: 4:00 PM</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-emerald-800 font-medium">Smoking Timeline:</p>
                  <ul className="text-emerald-700 text-sm mt-1 ml-4 list-disc">
                    <li>Smoking time at 225°F: 18 lbs × 35 min/lb = <strong>10.5 hours</strong></li>
                    <li>Rest time: 45 minutes</li>
                    <li>Buffer: 1 hour (smoker temps vary)</li>
                    <li><strong>Start smoking by: 4:00 AM</strong></li>
                    <li>Alternative at 275°F: 18 lbs × 25 min/lb = 7.5 hours (start 7:30 AM)</li>
                  </ul>
                  <p className="text-emerald-700 text-sm mt-2">Internal temp target: 165°F in thigh (may stall around 150°F—be patient)</p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> The "stall" at 150-160°F is normal—moisture evaporating cools the meat. Don't increase temperature; just wait. Some pitmasters wrap in foil at this point (the "Texas crutch") to push through faster.
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
                  Spatchcocked Turkey — Faster Cooking for Small Oven
                </h3>
                <p className="text-gray-600 mb-4">
                  Emily lives in a NYC apartment with a small oven. Her 15-lb turkey barely fits standing upright, and she wants faster, more even cooking. She's decided to spatchcock (butterfly) the bird.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1">Turkey weight: 15 lbs</p>
                  <p className="text-sm text-gray-600 mb-1">Cooking method: Spatchcocked at 425°F</p>
                  <p className="text-sm text-gray-600">Prep: Backbone removed, pressed flat on sheet pan</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-emerald-800 font-medium">Spatchcocking Results:</p>
                  <ul className="text-emerald-700 text-sm mt-1 ml-4 list-disc">
                    <li>Traditional roast time: 15 lbs × 13 min = 195 min (3.25 hours)</li>
                    <li>Spatchcocked time: 15 lbs × 11 min = <strong>165 min (2 hours 45 min)</strong></li>
                    <li>Time saved: ~45 minutes</li>
                    <li>Rest time: 20 minutes (thinner profile = faster rest)</li>
                    <li>Bonus: More crispy skin, more even cooking</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Save the backbone for turkey stock! Spatchcocked turkey fits on a standard 18" × 13" sheet pan. Line with foil for easy cleanup. The dark meat and white meat cook more evenly because everything is the same thickness.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 6 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">
                6
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Two Turkeys — Large Gathering of 24 Guests
                </h3>
                <p className="text-gray-600 mb-4">
                  The Johnson family reunion has 24 people coming. Rather than wrestling with a 30+ lb turkey, grandma suggests cooking two smaller birds. They need to coordinate timing for both turkeys.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1">Guests: 24 adults (need ~30 lbs of turkey)</p>
                  <p className="text-sm text-gray-600 mb-1">Option chosen: Two 14–15 lb turkeys</p>
                  <p className="text-sm text-gray-600 mb-1">Oven capacity: Can fit both side-by-side</p>
                  <p className="text-sm text-gray-600">Target serve time: 2:00 PM</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-emerald-800 font-medium">Two-Turkey Calculation:</p>
                  <ul className="text-emerald-700 text-sm mt-1 ml-4 list-disc">
                    <li>Each turkey: 14 lbs × 13 min/lb = 182 min (~3 hours)</li>
                    <li>Side-by-side adjustment: Add 30–45 minutes (reduced airflow)</li>
                    <li>Estimated total: <strong>3.5–4 hours</strong></li>
                    <li>Rest time: 45 minutes (stagger if one finishes first)</li>
                    <li><strong>Start roasting by: 9:30 AM</strong></li>
                  </ul>
                  <p className="text-emerald-700 text-sm mt-2">Yields: ~28 lbs of turkey = plenty for 24 guests with leftovers</p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Two smaller turkeys have advantages: faster cooking, more crispy skin per pound, one can be stuffed while one isn't, and if one runs into problems you have backup. Rotate pan positions halfway through for even browning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl prose prose-lg">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            Complete Turkey Roasting Time Chart (325°F)
          </h2>
          <p>
            These times are based on{" "}
            <a
              href="https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/poultry/turkey-roasting-times"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral hover:underline"
            >
              USDA Food Safety and Inspection Service guidelines
            </a>{" "}
            for roasting turkey at 325°F. Always verify doneness with a meat thermometer — turkey is safe when the thickest part of the thigh reaches 165°F.
          </p>

          <div className="overflow-x-auto not-prose">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold">Turkey Weight</th>
                  <th className="text-center py-3 px-4 font-semibold">Unstuffed Time</th>
                  <th className="text-center py-3 px-4 font-semibold">Stuffed Time</th>
                  <th className="text-center py-3 px-4 font-semibold">Min/lb (Unstuffed)</th>
                  <th className="text-left py-3 px-4 font-semibold">Serves</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">6–8 lbs</td>
                  <td className="text-center py-3 px-4">2¼–2¾ hrs</td>
                  <td className="text-center py-3 px-4">2¾–3¼ hrs</td>
                  <td className="text-center py-3 px-4">~18 min</td>
                  <td className="py-3 px-4 text-gray-600">4–6</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">8–10 lbs</td>
                  <td className="text-center py-3 px-4">2¾–3 hrs</td>
                  <td className="text-center py-3 px-4">3–3½ hrs</td>
                  <td className="text-center py-3 px-4">~16 min</td>
                  <td className="py-3 px-4 text-gray-600">6–8</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">10–12 lbs</td>
                  <td className="text-center py-3 px-4">3–3½ hrs</td>
                  <td className="text-center py-3 px-4">3½–4 hrs</td>
                  <td className="text-center py-3 px-4">~15 min</td>
                  <td className="py-3 px-4 text-gray-600">8–10</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">12–14 lbs</td>
                  <td className="text-center py-3 px-4">3½–4 hrs</td>
                  <td className="text-center py-3 px-4">4–4¼ hrs</td>
                  <td className="text-center py-3 px-4">~14 min</td>
                  <td className="py-3 px-4 text-gray-600">10–12</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">14–16 lbs</td>
                  <td className="text-center py-3 px-4">3¾–4¼ hrs</td>
                  <td className="text-center py-3 px-4">4¼–4½ hrs</td>
                  <td className="text-center py-3 px-4">~13 min</td>
                  <td className="py-3 px-4 text-gray-600">12–14</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">16–18 lbs</td>
                  <td className="text-center py-3 px-4">4–4½ hrs</td>
                  <td className="text-center py-3 px-4">4½–5 hrs</td>
                  <td className="text-center py-3 px-4">~12.5 min</td>
                  <td className="py-3 px-4 text-gray-600">14–16</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">18–20 lbs</td>
                  <td className="text-center py-3 px-4">4¼–4¾ hrs</td>
                  <td className="text-center py-3 px-4">4¾–5¼ hrs</td>
                  <td className="text-center py-3 px-4">~12 min</td>
                  <td className="py-3 px-4 text-gray-600">16–18</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">20–22 lbs</td>
                  <td className="text-center py-3 px-4">4½–5 hrs</td>
                  <td className="text-center py-3 px-4">5–5½ hrs</td>
                  <td className="text-center py-3 px-4">~11.5 min</td>
                  <td className="py-3 px-4 text-gray-600">18–20</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">22–24 lbs</td>
                  <td className="text-center py-3 px-4">4¾–5¼ hrs</td>
                  <td className="text-center py-3 px-4">5¼–5¾ hrs</td>
                  <td className="text-center py-3 px-4">~11 min</td>
                  <td className="py-3 px-4 text-gray-600">20–24</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">24–28 lbs</td>
                  <td className="text-center py-3 px-4">5–5½ hrs</td>
                  <td className="text-center py-3 px-4">5½–6 hrs</td>
                  <td className="text-center py-3 px-4">~10.5 min</td>
                  <td className="py-3 px-4 text-gray-600">24–28</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">28–30 lbs</td>
                  <td className="text-center py-3 px-4">5¼–5¾ hrs</td>
                  <td className="text-center py-3 px-4">5¾–6¼ hrs</td>
                  <td className="text-center py-3 px-4">~10 min</td>
                  <td className="py-3 px-4 text-gray-600">28–30</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Alternative Cooking Methods Comparison
          </h3>
          <p>
            Not roasting? Each cooking method has different time-per-pound calculations:
          </p>
          <div className="overflow-x-auto not-prose">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold">Method</th>
                  <th className="text-center py-3 px-4 font-semibold">Temperature</th>
                  <th className="text-center py-3 px-4 font-semibold">Time per Pound</th>
                  <th className="text-center py-3 px-4 font-semibold">15 lb Example</th>
                  <th className="text-left py-3 px-4 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Traditional Roast</td>
                  <td className="text-center py-3 px-4">325°F</td>
                  <td className="text-center py-3 px-4">13 min</td>
                  <td className="text-center py-3 px-4">3.25 hrs</td>
                  <td className="py-3 px-4 text-gray-600">USDA recommended</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">High Heat Roast</td>
                  <td className="text-center py-3 px-4">425°F</td>
                  <td className="text-center py-3 px-4">9–10 min</td>
                  <td className="text-center py-3 px-4">2.25–2.5 hrs</td>
                  <td className="py-3 px-4 text-gray-600">Best for spatchcocked</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Deep-Fried</td>
                  <td className="text-center py-3 px-4">350°F oil</td>
                  <td className="text-center py-3 px-4">3–4 min</td>
                  <td className="text-center py-3 px-4">45–60 min</td>
                  <td className="py-3 px-4 text-gray-600">Must be thawed + dry</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">Smoked (Low)</td>
                  <td className="text-center py-3 px-4">225°F</td>
                  <td className="text-center py-3 px-4">30–40 min</td>
                  <td className="text-center py-3 px-4">7.5–10 hrs</td>
                  <td className="py-3 px-4 text-gray-600">May stall at 150°F</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Smoked (Hot)</td>
                  <td className="text-center py-3 px-4">275°F</td>
                  <td className="text-center py-3 px-4">20–25 min</td>
                  <td className="text-center py-3 px-4">5–6.25 hrs</td>
                  <td className="py-3 px-4 text-gray-600">Faster, still smoky</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">Spatchcocked</td>
                  <td className="text-center py-3 px-4">425°F</td>
                  <td className="text-center py-3 px-4">10–12 min</td>
                  <td className="text-center py-3 px-4">2.5–3 hrs</td>
                  <td className="py-3 px-4 text-gray-600">Backbone removed</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">From Frozen</td>
                  <td className="text-center py-3 px-4">325°F</td>
                  <td className="text-center py-3 px-4">20 min (1.5×)</td>
                  <td className="text-center py-3 px-4">5 hrs</td>
                  <td className="py-3 px-4 text-gray-600">USDA approved, can't stuff</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Thawing Guide Section */}
      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl prose prose-lg">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            Complete Turkey Thawing Guide
          </h2>
          <p>
            A frozen turkey needs adequate time to thaw safely. According to the{" "}
            <a
              href="https://www.foodsafety.gov/food-safety-charts/safe-thawing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral hover:underline"
            >
              FoodSafety.gov thawing guidelines
            </a>, here are your safe options:
          </p>

          <div className="overflow-x-auto not-prose">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold">Turkey Weight</th>
                  <th className="text-center py-3 px-4 font-semibold">Refrigerator Thaw</th>
                  <th className="text-center py-3 px-4 font-semibold">Cold Water Thaw</th>
                  <th className="text-left py-3 px-4 font-semibold">When to Start (for Thu)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">6–8 lbs</td>
                  <td className="text-center py-3 px-4">1–2 days</td>
                  <td className="text-center py-3 px-4">3–4 hours</td>
                  <td className="py-3 px-4 text-gray-600">Tuesday</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">8–10 lbs</td>
                  <td className="text-center py-3 px-4">2 days</td>
                  <td className="text-center py-3 px-4">4–5 hours</td>
                  <td className="py-3 px-4 text-gray-600">Tuesday</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">10–12 lbs</td>
                  <td className="text-center py-3 px-4">2–3 days</td>
                  <td className="text-center py-3 px-4">5–6 hours</td>
                  <td className="py-3 px-4 text-gray-600">Monday night</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">12–14 lbs</td>
                  <td className="text-center py-3 px-4">3 days</td>
                  <td className="text-center py-3 px-4">6–7 hours</td>
                  <td className="py-3 px-4 text-gray-600">Monday</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">14–16 lbs</td>
                  <td className="text-center py-3 px-4">3–4 days</td>
                  <td className="text-center py-3 px-4">7–8 hours</td>
                  <td className="py-3 px-4 text-gray-600">Monday</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">16–18 lbs</td>
                  <td className="text-center py-3 px-4">4 days</td>
                  <td className="text-center py-3 px-4">8–9 hours</td>
                  <td className="py-3 px-4 text-gray-600">Sunday</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">18–20 lbs</td>
                  <td className="text-center py-3 px-4">4–5 days</td>
                  <td className="text-center py-3 px-4">9–10 hours</td>
                  <td className="py-3 px-4 text-gray-600">Sunday</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">20–24 lbs</td>
                  <td className="text-center py-3 px-4">5–6 days</td>
                  <td className="text-center py-3 px-4">10–12 hours</td>
                  <td className="py-3 px-4 text-gray-600">Saturday</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">24–28 lbs</td>
                  <td className="text-center py-3 px-4">6–7 days</td>
                  <td className="text-center py-3 px-4">12–14 hours</td>
                  <td className="py-3 px-4 text-gray-600">Saturday</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            <strong>Important:</strong> For cold water thawing, submerge the wrapped turkey in cold tap water and change the water every 30 minutes. Cook immediately after thawing. Never thaw at room temperature—bacteria multiply rapidly in the "danger zone" (40–140°F).
          </p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Turkey Size Guide: How Many Pounds Per Person?
          </h3>
          <div className="overflow-x-auto not-prose">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold">Turkey Type</th>
                  <th className="text-center py-3 px-4 font-semibold">Pounds per Person</th>
                  <th className="text-left py-3 px-4 font-semibold">For 10 Guests</th>
                  <th className="text-left py-3 px-4 font-semibold">For 20 Guests</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Whole turkey (basic)</td>
                  <td className="text-center py-3 px-4">1 lb</td>
                  <td className="py-3 px-4">10–12 lbs</td>
                  <td className="py-3 px-4">20–22 lbs</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">Whole turkey (with leftovers)</td>
                  <td className="text-center py-3 px-4">1.5 lbs</td>
                  <td className="py-3 px-4">14–16 lbs</td>
                  <td className="py-3 px-4">Two 14 lb birds</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Bone-in breast</td>
                  <td className="text-center py-3 px-4">0.75 lb</td>
                  <td className="py-3 px-4">7–8 lbs</td>
                  <td className="py-3 px-4">15–16 lbs</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">Boneless breast</td>
                  <td className="text-center py-3 px-4">0.5 lb</td>
                  <td className="py-3 px-4">5 lbs</td>
                  <td className="py-3 px-4">10 lbs</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Turkey legs/thighs</td>
                  <td className="text-center py-3 px-4">0.75 lb</td>
                  <td className="py-3 px-4">7–8 lbs</td>
                  <td className="py-3 px-4">15 lbs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Internal Temperature Guide */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl prose prose-lg">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            Turkey Internal Temperature Guide
          </h2>
          <p>
            According to the{" "}
            <a
              href="https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/safe-minimum-internal-temperature"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral hover:underline"
            >
              USDA safe minimum internal temperatures
            </a>, turkey is safe to eat at 165°F. However, different parts of the turkey reach this temperature at different times.
          </p>

          <div className="overflow-x-auto not-prose">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold">Location</th>
                  <th className="text-center py-3 px-4 font-semibold">Safe Temp</th>
                  <th className="text-center py-3 px-4 font-semibold">Ideal Temp</th>
                  <th className="text-left py-3 px-4 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Thigh (deepest part)</td>
                  <td className="text-center py-3 px-4">165°F</td>
                  <td className="text-center py-3 px-4">175–180°F</td>
                  <td className="py-3 px-4 text-gray-600">Primary check point</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">Breast (thickest part)</td>
                  <td className="text-center py-3 px-4">165°F</td>
                  <td className="text-center py-3 px-4">160–165°F</td>
                  <td className="py-3 px-4 text-gray-600">Remove at 160°F (carryover)</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Wing joint</td>
                  <td className="text-center py-3 px-4">165°F</td>
                  <td className="text-center py-3 px-4">165–170°F</td>
                  <td className="py-3 px-4 text-gray-600">Secondary check</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">Stuffing (center)</td>
                  <td className="text-center py-3 px-4">165°F</td>
                  <td className="text-center py-3 px-4">165°F</td>
                  <td className="py-3 px-4 text-gray-600">Critical for food safety</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Essential Turkey Cooking Tips
          </h3>
          <ol>
            <li><strong>Use an instant-read meat thermometer:</strong> The only reliable way to know your turkey is done. Insert into the thickest part of the thigh without touching bone. Target: 165°F minimum, 175°F ideal.</li>
            <li><strong>Let it rest:</strong> 30–45 minutes after roasting. This redistributes juices and makes carving easier. The internal temp will rise 5–10°F during rest (carryover cooking).</li>
            <li><strong>Start breast-side up:</strong> The dark meat on the bottom cooks faster in the hotter part of the oven, helping the whole bird finish evenly.</li>
            <li><strong>Don't stuff too tightly:</strong> Stuffing expands during cooking. Pack loosely (about ¾ cup per pound of turkey) and verify the center reaches 165°F.</li>
            <li><strong>Plan backwards:</strong> Work from your desired serving time. Add cooking time + 45 min rest + 30 min buffer for carving and arranging.</li>
            <li><strong>Keep the oven door closed:</strong> Every time you open the door, the oven temp drops 25–50°F and adds 15–30 minutes to cooking time.</li>
          </ol>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Related Calculators
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/meat-cooking-time-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Meat Cooking Calculator</h3>
              <p className="text-sm text-gray-600">Times for beef, pork, chicken, lamb, and more</p>
            </Link>
            <Link
              href="/meat-temperature-chart"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Meat Temperature Chart</h3>
              <p className="text-sm text-gray-600">Safe internal temperatures for all meats</p>
            </Link>
            <Link
              href="/party-food-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Party Food Calculator</h3>
              <p className="text-sm text-gray-600">Plan all your holiday food quantities</p>
            </Link>
            <Link
              href="/oven-temperature-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Oven Temperature Converter</h3>
              <p className="text-sm text-gray-600">Convert between Fahrenheit, Celsius, and gas marks</p>
            </Link>
            <Link
              href="/convection-oven-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Convection Oven Converter</h3>
              <p className="text-sm text-gray-600">Adjust times and temps for convection cooking</p>
            </Link>
            <Link
              href="/recipe-scaler"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Recipe Scaler</h3>
              <p className="text-sm text-gray-600">Scale side dish recipes for your guest count</p>
            </Link>
            <Link
              href="/slow-cooker-to-oven-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Slow Cooker Converter</h3>
              <p className="text-sm text-gray-600">Convert slow cooker recipes to oven or stovetop</p>
            </Link>
            <Link
              href="/cooking-measurement-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Measurement Converter</h3>
              <p className="text-sm text-gray-600">Convert cups, tablespoons, ounces, and more</p>
            </Link>
            <Link
              href="/recipe-macro-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Recipe Macro Calculator</h3>
              <p className="text-sm text-gray-600">Calculate nutrition info for your holiday meal</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Authority Sources Footer */}
      <section className="py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-sm text-gray-500 text-center">
            Turkey cooking times and safety guidelines based on{" "}
            <a href="https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/poultry/turkey-basics-safe-thawing" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">USDA FSIS</a>
            {" "}&bull;{" "}
            <a href="https://www.foodsafety.gov/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">FoodSafety.gov</a>
            {" "}&bull;{" "}
            <a href="https://www.cdc.gov/foodsafety/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">CDC Food Safety</a>
            {" "}&bull;{" "}
            <a href="https://ask.usda.gov/s/article/How-long-does-it-take-to-thaw-a-turkey" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">USDA AskKaren</a>
          </p>
        </div>
      </section>
    </div>
  );
}
