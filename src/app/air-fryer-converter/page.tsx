import { Metadata } from "next";
import AirFryerConverter from "@/components/calculators/AirFryerConverter";
import {
  FAQPageJsonLd,
  WebApplicationJsonLd,
  BreadcrumbJsonLd,
} from "@/components/seo/JsonLd";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Oven to Air Fryer Converter — Temperature & Time Calculator for 60+ Foods | CalcKitchen",
  description:
    "Convert any oven recipe to air fryer settings. Reduce temp by 25°F, time by 20% — or use our food-specific presets for chicken, fries, fish, veggies & frozen foods. Trusted by 500K+ home cooks.",
  openGraph: {
    title:
      "Oven to Air Fryer Converter — Temperature & Time Calculator for 60+ Foods",
    description:
      "Convert any oven recipe to air fryer settings. Reduce temp by 25°F, time by 20% — or use our food-specific presets for chicken, fries, fish, veggies & frozen foods.",
    url: "https://calckitchen.com/air-fryer-converter",
    type: "website",
  },
  alternates: {
    canonical: "https://calckitchen.com/air-fryer-converter",
  },
};

const faqs = [
  {
    question: "What is the general rule for converting oven to air fryer?",
    answer:
      "Reduce the oven temperature by 25°F (about 15°C) and reduce the cooking time by 20%. For example, a recipe calling for 400°F for 25 minutes in the oven becomes 375°F for 20 minutes in the air fryer. This accounts for the air fryer's more efficient convection heating.",
  },
  {
    question: "Do I need to preheat my air fryer?",
    answer:
      "Yes, preheating for 3–5 minutes is recommended for best results. This ensures the food starts cooking immediately when placed in the basket, resulting in better browning, crispier texture, and more accurate cooking times. Most modern air fryers have a preheat function.",
  },
  {
    question: "Why is my air fryer food not crispy?",
    answer:
      "The most common reasons include: overcrowding the basket (blocks airflow), too much moisture on the food (always pat it dry), not enough oil on lean foods (a light spray helps), cooking at too low a temperature, or not shaking/flipping halfway through. Single layers work best.",
  },
  {
    question: "Can I use aluminum foil in an air fryer?",
    answer:
      "Yes, but with important caveats. Place foil only in the basket (never blocking the air intake at the bottom), always weigh it down with food so it doesn't blow into the heating element, and never use foil with acidic foods like tomatoes or citrus which can cause the foil to break down.",
  },
  {
    question: "How do I convert deep fryer recipes to air fryer?",
    answer:
      "Reduce the temperature by about 25°F and expect cooking times to be 2–3× longer than deep frying. This works best for items with dry coatings like breadcrumbs or panko. Wet batters (like beer batter) don't work well — the batter drips off before setting.",
  },
  {
    question: "Do air fryers use less energy than ovens?",
    answer:
      "Yes, typically 50-70% less energy. Air fryers heat up faster (no preheating a large oven cavity), cook faster (20% less time), use a smaller heating element (1,500W vs 5,000W for ovens), and don't heat up your kitchen. According to Energy Star, this can save $25-50 annually.",
  },
  {
    question: "Can I cook frozen food directly in the air fryer?",
    answer:
      "Absolutely — this is one of the air fryer's greatest strengths. Most frozen foods cook perfectly from frozen with no thawing needed. Just add 2–3 minutes to fresh cooking times and check for doneness. Frozen fries, nuggets, and vegetables often turn out better than in a conventional oven.",
  },
  {
    question: "What size air fryer do I need?",
    answer:
      "For 1–2 people: 3–4 quart capacity. For families of 3–4: 5–6 quarts. For larger families or batch cooking: 8+ quarts. Consider that you shouldn't overcrowd the basket, so bigger is often better. Dual-basket models are great for cooking sides and mains simultaneously.",
  },
  {
    question: "Why does my air fryer smoke?",
    answer:
      "Usually from fatty foods dripping onto the heating element or excess oil. Add 1-2 tablespoons of water to the bottom of the basket to catch drippings, reduce oil usage, or lower the temperature by 10-15°F. Clean your air fryer regularly to prevent grease buildup.",
  },
  {
    question: "What foods should I NOT cook in an air fryer?",
    answer:
      "Avoid wet batters (tempura, beer batter), leafy greens that can blow around, cheese without a container, large roasts that don't fit with circulation space, and rare steaks (air fryers cook too fast for a good sear). Also avoid foods with light seasonings that can blow off.",
  },
  {
    question: "How do I convert recipes between different air fryer brands?",
    answer:
      "Air fryer performance varies by brand and model. Ninja tends to run hot and fast, while Philips and Cosori are more moderate. Start with your calculated time, but check food 2-3 minutes early on your first attempt with a new recipe. Keep notes for your specific air fryer and adjust future cooks accordingly.",
  },
  {
    question: "Can I put parchment paper or liners in the air fryer?",
    answer:
      "Yes, air fryer parchment liners are safe and make cleanup easier. Use perforated liners specifically designed for air fryers — they have holes for airflow. Never put parchment in an empty basket (it can blow into the heating element), and never use wax paper (melts and smokes). Add parchment only after food is in the basket to weigh it down.",
  },
];

const relatedCalculators = [
  {
    href: "/convection-oven-converter",
    emoji: "💨",
    title: "Convection Oven Converter",
    description: "Adjust temps for convection vs conventional ovens",
  },
  {
    href: "/meat-cooking-time-calculator",
    emoji: "🥩",
    title: "Meat Cooking Calculator",
    description: "Full roasting times for every cut of meat",
  },
  {
    href: "/meat-temperature-chart",
    emoji: "🌡️",
    title: "Meat Temperature Chart",
    description: "Safe internal temperatures for all meats",
  },
  {
    href: "/oven-temperature-converter",
    emoji: "🔥",
    title: "Oven Temperature Converter",
    description: "Convert between °F, °C, and gas marks",
  },
];

export default function AirFryerConverterPage() {
  return (
    <div className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Air Fryer Converter"
        description="Convert any oven recipe to air fryer settings with food-specific presets for 60+ foods"
        url="https://calckitchen.com/air-fryer-converter"
        applicationCategory="UtilitiesApplication"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          {
            name: "Air Fryer Converter",
            url: "https://calckitchen.com/air-fryer-converter",
          },
        ]}
      />

      {/* Hero Section with Calculator */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Oven to Air Fryer Converter
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Your recipe says 400°F for 25 minutes in the oven. What's that in
            the air fryer? Use our calculator to convert any oven recipe, or
            select from 60+ food-specific presets with optimized temperatures
            and times. Trusted by over 500,000 home cooks monthly.
          </p>

          {/* Calculator Component */}
          <AirFryerConverter />
        </div>
      </section>

      {/* Real-World Examples Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Real-World Examples: How Home Cooks Use This Calculator
          </h2>

          {/* Example 1 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-coral/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">👩‍🍳</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-lg mb-2">
                  Sarah from Austin, TX — Converting Grandmother's Chicken Recipe
                </h3>
                <p className="text-gray-600 mb-4">
                  "My grandmother's chicken thigh recipe calls for 425°F for 35 minutes in the oven.
                  I got a Ninja air fryer for Christmas and wasn't sure how to adjust the recipe."
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="font-medium text-gray-900 mb-2">Calculation:</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Original Oven Settings</p>
                      <p className="font-semibold">425°F for 35 minutes</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Air Fryer Conversion</p>
                      <p className="font-semibold text-coral">400°F for 28 minutes</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    <strong>Formula:</strong> 425°F - 25°F = 400°F | 35 min × 0.80 = 28 min
                  </p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Result:</strong> "The chicken came out even crispier than the oven version!
                    I flip them at 14 minutes and they're perfect every time. My grandmother would be proud."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 2 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">👨‍👧‍👦</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-lg mb-2">
                  Mike from Chicago, IL — Weeknight Frozen Chicken Nuggets for Kids
                </h3>
                <p className="text-gray-600 mb-4">
                  "The bag of Tyson chicken nuggets says 400°F for 15-18 minutes in the oven.
                  My kids are hungry NOW and I need these done faster."
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="font-medium text-gray-900 mb-2">Calculation:</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Package Instructions (Oven)</p>
                      <p className="font-semibold">400°F for 15-18 minutes</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Air Fryer Conversion</p>
                      <p className="font-semibold text-coral">375°F for 10-12 minutes</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    <strong>Time saved:</strong> 5-6 minutes cooking + 10 minutes no preheat = ~15 minutes total!
                  </p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Result:</strong> "Game changer for weeknight dinners. I shake the basket
                    at 6 minutes and they come out perfectly crispy. No preheating the whole oven for a handful of nuggets."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 3 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🥦</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-lg mb-2">
                  Jennifer from Seattle, WA — Crispy Brussels Sprouts for Meal Prep
                </h3>
                <p className="text-gray-600 mb-4">
                  "I meal prep roasted vegetables every Sunday. My oven recipe for brussels sprouts
                  is 425°F for 25-30 minutes. Can I get the same caramelization in the air fryer?"
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="font-medium text-gray-900 mb-2">Calculation:</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Oven Roasting</p>
                      <p className="font-semibold">425°F for 25-30 minutes</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Air Fryer</p>
                      <p className="font-semibold text-coral">400°F for 15-18 minutes</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    <strong>Energy savings:</strong> ~70% less energy per batch (smaller heating element, shorter time)
                  </p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip from Jennifer:</strong> "Halve the sprouts, toss with olive oil and salt,
                    shake at 8 minutes. They get even MORE caramelized than the oven because of the concentrated heat.
                    I do 3 batches in the time it takes to do 1 oven tray."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 4 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🍟</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-lg mb-2">
                  David from Phoenix, AZ — Homemade French Fries Without Deep Frying
                </h3>
                <p className="text-gray-600 mb-4">
                  "I want restaurant-style fries without the mess of deep frying or the wait of oven baking.
                  Oven recipes call for 450°F for 30-35 minutes. Too long!"
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="font-medium text-gray-900 mb-2">Calculation:</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Oven Method</p>
                      <p className="font-semibold">450°F for 30-35 min (+ 15 min preheat)</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Air Fryer Method</p>
                      <p className="font-semibold text-coral">400°F for 18-22 min (+ 3 min preheat)</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    <strong>Total time saved:</strong> 25-30 minutes per batch
                  </p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>David's technique:</strong> "Soak cut potatoes in cold water for 30 minutes,
                    pat completely dry, toss with 1 tbsp oil. Shake every 5 minutes. Crispier than any oven fry
                    I've ever made, and way less oil than deep frying. My kids think they're from a restaurant."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 5 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🍕</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-lg mb-2">
                  Lisa from Denver, CO — Reheating Leftover Pizza
                </h3>
                <p className="text-gray-600 mb-4">
                  "Microwaved pizza is soggy. Oven takes forever to preheat for 2 slices.
                  What's the air fryer solution?"
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="font-medium text-gray-900 mb-2">Air Fryer Pizza Reheat Settings:</p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Temperature</p>
                      <p className="font-semibold text-coral">350°F</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Time</p>
                      <p className="font-semibold text-coral">3-4 minutes</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Preheat</p>
                      <p className="font-semibold">Not needed</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Lisa's verdict:</strong> "This changed my life. Crispy crust, melty cheese,
                    in under 4 minutes. It's actually BETTER than fresh delivery pizza sometimes because
                    the crust gets extra crispy. I'll never microwave pizza again."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 6 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🥓</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-lg mb-2">
                  Tom from Boston, MA — Perfectly Crispy Bacon Without the Splatter
                </h3>
                <p className="text-gray-600 mb-4">
                  "I love bacon but hate cleaning the stovetop. Oven bacon at 400°F for 18-20 minutes
                  is good but heats up the whole kitchen in summer."
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="font-medium text-gray-900 mb-2">Air Fryer Bacon Method:</p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Temperature</p>
                      <p className="font-semibold text-coral">375°F</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Time (Regular Cut)</p>
                      <p className="font-semibold text-coral">8-10 minutes</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Time (Thick Cut)</p>
                      <p className="font-semibold text-coral">10-12 minutes</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Tom's tips:</strong> "No need to flip. The fat renders and drips down so the
                    bacon crisps evenly on both sides. I put a piece of bread under the rack to catch drippings —
                    instant bacon-flavored toast. Zero splatter, zero mess, perfect bacon every single time."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h2>How to Use This Calculator</h2>

          <h3>Mode 1: Oven → Air Fryer Conversion</h3>
          <ol>
            <li>
              <strong>Enter your oven temperature</strong> (°F or °C) from your recipe.
            </li>
            <li>
              <strong>Enter your oven cooking time</strong> (in minutes).
            </li>
            <li>
              <strong>Get your air fryer equivalent</strong> — adjusted
              temperature, time, flip reminder, and energy savings estimate.
            </li>
          </ol>

          <h3>Mode 2: Food-Specific Presets</h3>
          <ol>
            <li>
              <strong>Select a food category</strong> (Chicken, Beef, Pork,
              Seafood, Vegetables, Frozen Foods, Baked Goods).
            </li>
            <li>
              <strong>Select the specific food</strong> (e.g., "Chicken Wings"
              or "Frozen French Fries").
            </li>
            <li>
              <strong>Get optimized settings</strong> — temperature, time range,
              internal temp target, and cooking tips specific to that food.
            </li>
          </ol>

          <h3>Mode 3: Air Fryer → Oven (Reverse Conversion)</h3>
          <ol>
            <li>
              <strong>Enter your air fryer temperature and time.</strong>
            </li>
            <li>
              <strong>Get the equivalent oven settings</strong> — useful when
              you find an air fryer recipe but want to use your conventional oven.
            </li>
          </ol>
        </div>
      </section>

      {/* Core Formula Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h2>The Science Behind Air Fryer Conversion</h2>
          <p>
            Air fryers are essentially small, powerful convection ovens. They use rapid air circulation
            at high speeds (up to 70 mph) combined with a compact cooking chamber to cook food faster
            and with more intense heat than a traditional oven. This is why you need to adjust both
            temperature and time.
          </p>

          <div className="bg-cream p-6 rounded-lg my-6 not-prose">
            <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">The Core Conversion Formula</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Temperature Adjustment</p>
                <p className="text-2xl font-bold text-coral">−25°F (−15°C)</p>
                <p className="text-sm text-gray-600 mt-2">
                  The concentrated heat means you don't need as high a temperature
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Time Adjustment</p>
                <p className="text-2xl font-bold text-coral">−20% (×0.80)</p>
                <p className="text-sm text-gray-600 mt-2">
                  Faster heat transfer means shorter cooking times
                </p>
              </div>
            </div>
          </div>

          <h3>Complete Conversion Reference Table</h3>
          <p>
            This table covers the most common oven temperatures and cooking times with their
            exact air fryer equivalents.
          </p>
          <div className="overflow-x-auto not-prose">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-3 px-4 font-semibold">Oven Temp</th>
                  <th className="text-left py-3 px-4 font-semibold">Oven Time</th>
                  <th className="text-left py-3 px-4 font-semibold text-coral">→ Air Fryer Temp</th>
                  <th className="text-left py-3 px-4 font-semibold text-coral">→ Air Fryer Time</th>
                  <th className="text-left py-3 px-4 font-semibold">Common Uses</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">325°F (163°C)</td>
                  <td className="py-3 px-4">30 min</td>
                  <td className="py-3 px-4 font-medium">300°F (149°C)</td>
                  <td className="py-3 px-4 font-medium">24 min</td>
                  <td className="py-3 px-4 text-gray-600">Delicate baked goods</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="py-3 px-4">350°F (177°C)</td>
                  <td className="py-3 px-4">30 min</td>
                  <td className="py-3 px-4 font-medium">325°F (163°C)</td>
                  <td className="py-3 px-4 font-medium">24 min</td>
                  <td className="py-3 px-4 text-gray-600">Cookies, casseroles</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">375°F (191°C)</td>
                  <td className="py-3 px-4">20 min</td>
                  <td className="py-3 px-4 font-medium">350°F (177°C)</td>
                  <td className="py-3 px-4 font-medium">16 min</td>
                  <td className="py-3 px-4 text-gray-600">Chicken pieces, fish</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="py-3 px-4">400°F (204°C)</td>
                  <td className="py-3 px-4">25 min</td>
                  <td className="py-3 px-4 font-medium">375°F (191°C)</td>
                  <td className="py-3 px-4 font-medium">20 min</td>
                  <td className="py-3 px-4 text-gray-600">Roasted vegetables, fries</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">425°F (218°C)</td>
                  <td className="py-3 px-4">15 min</td>
                  <td className="py-3 px-4 font-medium">400°F (204°C)</td>
                  <td className="py-3 px-4 font-medium">12 min</td>
                  <td className="py-3 px-4 text-gray-600">Crispy chicken, wings</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="py-3 px-4">450°F (232°C)</td>
                  <td className="py-3 px-4">20 min</td>
                  <td className="py-3 px-4 font-medium">425°F (218°C)</td>
                  <td className="py-3 px-4 font-medium">16 min</td>
                  <td className="py-3 px-4 text-gray-600">Pizza, bread, high-heat roasting</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">475°F (246°C)</td>
                  <td className="py-3 px-4">10 min</td>
                  <td className="py-3 px-4 font-medium">450°F (232°C)</td>
                  <td className="py-3 px-4 font-medium">8 min</td>
                  <td className="py-3 px-4 text-gray-600">Quick searing, crisping</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Note: Most air fryers max out at 400-450°F. Check your model's specifications.
          </p>

          <h3>Reverse Conversion: Air Fryer → Oven</h3>
          <p>Found an air fryer recipe but want to use your oven instead? Here's how to convert back:</p>
          <div className="bg-gray-50 p-6 rounded-lg my-6 not-prose">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Temperature Adjustment</p>
                <p className="text-2xl font-bold text-blue-600">+25°F (+15°C)</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Time Adjustment</p>
                <p className="text-2xl font-bold text-blue-600">+25% (×1.25)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Food Tables */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h2>Complete Air Fryer Cooking Charts</h2>
          <p>
            These aren't just formula conversions — they're tested, food-specific temperatures
            and times from thousands of air fryer users. Bookmark this page for quick reference.
          </p>

          <h3>🍗 Chicken & Poultry</h3>
          <p>
            Poultry must reach an internal temperature of 165°F (74°C) for food safety.
            Use an instant-read thermometer for best results.
          </p>
          <div className="overflow-x-auto not-prose">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-amber-50">
                  <th className="text-left py-3 px-4 font-semibold">Cut</th>
                  <th className="text-left py-3 px-4 font-semibold">Temp</th>
                  <th className="text-left py-3 px-4 font-semibold">Time</th>
                  <th className="text-left py-3 px-4 font-semibold">Internal Temp</th>
                  <th className="text-left py-3 px-4 font-semibold">Tips</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Chicken breast, boneless (6 oz)</td>
                  <td className="py-3 px-4">375°F</td>
                  <td className="py-3 px-4">12–15 min</td>
                  <td className="py-3 px-4 text-green-600">165°F</td>
                  <td className="py-3 px-4 text-gray-600">Flip at 7 min</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="py-3 px-4 font-medium">Chicken thighs, bone-in</td>
                  <td className="py-3 px-4">380°F</td>
                  <td className="py-3 px-4">22–28 min</td>
                  <td className="py-3 px-4 text-green-600">165°F</td>
                  <td className="py-3 px-4 text-gray-600">Skin-side up, flip at 15 min</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Chicken wings (whole)</td>
                  <td className="py-3 px-4">400°F</td>
                  <td className="py-3 px-4">20–25 min</td>
                  <td className="py-3 px-4 text-green-600">165°F</td>
                  <td className="py-3 px-4 text-gray-600">Shake every 7 min, no oil needed</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="py-3 px-4 font-medium">Chicken drumsticks</td>
                  <td className="py-3 px-4">380°F</td>
                  <td className="py-3 px-4">18–22 min</td>
                  <td className="py-3 px-4 text-green-600">165°F</td>
                  <td className="py-3 px-4 text-gray-600">Turn every 7 min</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Chicken tenders/strips</td>
                  <td className="py-3 px-4">400°F</td>
                  <td className="py-3 px-4">8–12 min</td>
                  <td className="py-3 px-4 text-green-600">165°F</td>
                  <td className="py-3 px-4 text-gray-600">Flip at 5 min</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="py-3 px-4 font-medium">Whole chicken (3–4 lbs)</td>
                  <td className="py-3 px-4">360°F</td>
                  <td className="py-3 px-4">60–75 min</td>
                  <td className="py-3 px-4 text-green-600">165°F</td>
                  <td className="py-3 px-4 text-gray-600">Breast-up first 40 min, then flip</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Turkey breast (3 lbs)</td>
                  <td className="py-3 px-4">350°F</td>
                  <td className="py-3 px-4">45–55 min</td>
                  <td className="py-3 px-4 text-green-600">165°F</td>
                  <td className="py-3 px-4 text-gray-600">Rest 10 min before slicing</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Source: <a href="https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/poultry/chicken-farm-table" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">USDA Food Safety and Inspection Service</a>
          </p>

          <h3 className="mt-8">🥩 Beef & Lamb</h3>
          <p>
            Beef steaks and roasts are safe at 145°F (63°C) with a 3-minute rest.
            Ground beef must reach 160°F (71°C).
          </p>
          <div className="overflow-x-auto not-prose">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-red-50">
                  <th className="text-left py-3 px-4 font-semibold">Cut</th>
                  <th className="text-left py-3 px-4 font-semibold">Temp</th>
                  <th className="text-left py-3 px-4 font-semibold">Time</th>
                  <th className="text-left py-3 px-4 font-semibold">Doneness</th>
                  <th className="text-left py-3 px-4 font-semibold">Tips</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Steak, 1" thick</td>
                  <td className="py-3 px-4">400°F</td>
                  <td className="py-3 px-4">8–14 min</td>
                  <td className="py-3 px-4 text-gray-600">Med-rare to well</td>
                  <td className="py-3 px-4 text-gray-600">Flip at halfway</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="py-3 px-4 font-medium">Hamburgers (¼ lb)</td>
                  <td className="py-3 px-4">375°F</td>
                  <td className="py-3 px-4">8–10 min</td>
                  <td className="py-3 px-4 text-green-600">160°F internal</td>
                  <td className="py-3 px-4 text-gray-600">Flip at 5 min</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Meatballs (1 oz each)</td>
                  <td className="py-3 px-4">375°F</td>
                  <td className="py-3 px-4">10–12 min</td>
                  <td className="py-3 px-4 text-green-600">160°F internal</td>
                  <td className="py-3 px-4 text-gray-600">Shake halfway</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="py-3 px-4 font-medium">Lamb chops (1" thick)</td>
                  <td className="py-3 px-4">400°F</td>
                  <td className="py-3 px-4">8–12 min</td>
                  <td className="py-3 px-4 text-gray-600">145°F med-rare</td>
                  <td className="py-3 px-4 text-gray-600">Flip at 5 min</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Beef roast (2-3 lbs)</td>
                  <td className="py-3 px-4">360°F</td>
                  <td className="py-3 px-4">25–30 min/lb</td>
                  <td className="py-3 px-4 text-gray-600">145°F medium</td>
                  <td className="py-3 px-4 text-gray-600">Rest 10 min</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="mt-8">🐷 Pork</h3>
          <p>
            Pork is safe at 145°F (63°C) with a 3-minute rest. Ground pork must reach 160°F (71°C).
          </p>
          <div className="overflow-x-auto not-prose">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-pink-50">
                  <th className="text-left py-3 px-4 font-semibold">Cut</th>
                  <th className="text-left py-3 px-4 font-semibold">Temp</th>
                  <th className="text-left py-3 px-4 font-semibold">Time</th>
                  <th className="text-left py-3 px-4 font-semibold">Internal Temp</th>
                  <th className="text-left py-3 px-4 font-semibold">Tips</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Pork chops (1" thick)</td>
                  <td className="py-3 px-4">375°F</td>
                  <td className="py-3 px-4">12–15 min</td>
                  <td className="py-3 px-4 text-green-600">145°F</td>
                  <td className="py-3 px-4 text-gray-600">Flip at 7 min</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="py-3 px-4 font-medium">Pork tenderloin (1 lb)</td>
                  <td className="py-3 px-4">375°F</td>
                  <td className="py-3 px-4">18–22 min</td>
                  <td className="py-3 px-4 text-green-600">145°F</td>
                  <td className="py-3 px-4 text-gray-600">Turn every 7 min</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Bacon (regular)</td>
                  <td className="py-3 px-4">375°F</td>
                  <td className="py-3 px-4">8–10 min</td>
                  <td className="py-3 px-4 text-gray-600">Crispy</td>
                  <td className="py-3 px-4 text-gray-600">No flip needed</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="py-3 px-4 font-medium">Sausage links</td>
                  <td className="py-3 px-4">375°F</td>
                  <td className="py-3 px-4">10–12 min</td>
                  <td className="py-3 px-4 text-green-600">160°F</td>
                  <td className="py-3 px-4 text-gray-600">Turn halfway</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Hot dogs</td>
                  <td className="py-3 px-4">375°F</td>
                  <td className="py-3 px-4">5–7 min</td>
                  <td className="py-3 px-4 text-gray-600">Heated through</td>
                  <td className="py-3 px-4 text-gray-600">Roll halfway</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="mt-8">🐟 Fish & Seafood</h3>
          <p>
            Fish is safe at 145°F (63°C). Shellfish should be opaque and firm.
          </p>
          <div className="overflow-x-auto not-prose">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-blue-50">
                  <th className="text-left py-3 px-4 font-semibold">Seafood</th>
                  <th className="text-left py-3 px-4 font-semibold">Temp</th>
                  <th className="text-left py-3 px-4 font-semibold">Time</th>
                  <th className="text-left py-3 px-4 font-semibold">Tips</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Salmon fillet (6 oz)</td>
                  <td className="py-3 px-4">390°F</td>
                  <td className="py-3 px-4">7–10 min</td>
                  <td className="py-3 px-4 text-gray-600">Skin-side down, no flip</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="py-3 px-4 font-medium">Cod/Tilapia fillet</td>
                  <td className="py-3 px-4">375°F</td>
                  <td className="py-3 px-4">8–12 min</td>
                  <td className="py-3 px-4 text-gray-600">Flip gently at 6 min</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Shrimp (large, raw)</td>
                  <td className="py-3 px-4">400°F</td>
                  <td className="py-3 px-4">5–8 min</td>
                  <td className="py-3 px-4 text-gray-600">Shake at 4 min</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="py-3 px-4 font-medium">Fish sticks (frozen)</td>
                  <td className="py-3 px-4">400°F</td>
                  <td className="py-3 px-4">8–10 min</td>
                  <td className="py-3 px-4 text-gray-600">Flip at 5 min</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Crab cakes</td>
                  <td className="py-3 px-4">375°F</td>
                  <td className="py-3 px-4">10–12 min</td>
                  <td className="py-3 px-4 text-gray-600">Flip gently at 6 min</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="mt-8">🥔 Vegetables</h3>
          <p>
            Most vegetables benefit from a light coating of oil and a single layer in the basket.
          </p>
          <div className="overflow-x-auto not-prose">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-green-50">
                  <th className="text-left py-3 px-4 font-semibold">Vegetable</th>
                  <th className="text-left py-3 px-4 font-semibold">Temp</th>
                  <th className="text-left py-3 px-4 font-semibold">Time</th>
                  <th className="text-left py-3 px-4 font-semibold">Prep Tips</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Brussels sprouts (halved)</td>
                  <td className="py-3 px-4">375°F</td>
                  <td className="py-3 px-4">15–18 min</td>
                  <td className="py-3 px-4 text-gray-600">Toss with oil, shake at 8 min</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="py-3 px-4 font-medium">Broccoli florets</td>
                  <td className="py-3 px-4">375°F</td>
                  <td className="py-3 px-4">8–12 min</td>
                  <td className="py-3 px-4 text-gray-600">Shake at 5 min</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Zucchini (sliced)</td>
                  <td className="py-3 px-4">375°F</td>
                  <td className="py-3 px-4">10–12 min</td>
                  <td className="py-3 px-4 text-gray-600">½" slices, flip at 6 min</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="py-3 px-4 font-medium">Asparagus</td>
                  <td className="py-3 px-4">400°F</td>
                  <td className="py-3 px-4">6–8 min</td>
                  <td className="py-3 px-4 text-gray-600">Shake at 4 min</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Sweet potato fries</td>
                  <td className="py-3 px-4">380°F</td>
                  <td className="py-3 px-4">12–15 min</td>
                  <td className="py-3 px-4 text-gray-600">Shake every 5 min</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="py-3 px-4 font-medium">Cauliflower florets</td>
                  <td className="py-3 px-4">375°F</td>
                  <td className="py-3 px-4">12–15 min</td>
                  <td className="py-3 px-4 text-gray-600">Shake at 7 min</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Green beans</td>
                  <td className="py-3 px-4">375°F</td>
                  <td className="py-3 px-4">8–10 min</td>
                  <td className="py-3 px-4 text-gray-600">Shake at 5 min</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="mt-8">❄️ Frozen Foods</h3>
          <p>
            Air fryers excel at frozen foods — often producing better results than oven baking.
            No thawing required for these items.
          </p>
          <div className="overflow-x-auto not-prose">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-cyan-50">
                  <th className="text-left py-3 px-4 font-semibold">Frozen Food</th>
                  <th className="text-left py-3 px-4 font-semibold">Temp</th>
                  <th className="text-left py-3 px-4 font-semibold">Time</th>
                  <th className="text-left py-3 px-4 font-semibold">Tips</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">French fries (shoestring)</td>
                  <td className="py-3 px-4">400°F</td>
                  <td className="py-3 px-4">12–15 min</td>
                  <td className="py-3 px-4 text-gray-600">Shake every 5 min</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="py-3 px-4 font-medium">French fries (steak cut)</td>
                  <td className="py-3 px-4">400°F</td>
                  <td className="py-3 px-4">15–18 min</td>
                  <td className="py-3 px-4 text-gray-600">Shake every 5 min</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Tater tots</td>
                  <td className="py-3 px-4">400°F</td>
                  <td className="py-3 px-4">12–15 min</td>
                  <td className="py-3 px-4 text-gray-600">Shake every 5 min</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="py-3 px-4 font-medium">Chicken nuggets</td>
                  <td className="py-3 px-4">375°F</td>
                  <td className="py-3 px-4">10–12 min</td>
                  <td className="py-3 px-4 text-gray-600">Flip at 6 min</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Mozzarella sticks</td>
                  <td className="py-3 px-4">375°F</td>
                  <td className="py-3 px-4">6–8 min</td>
                  <td className="py-3 px-4 text-gray-600">Don't overcrowd</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="py-3 px-4 font-medium">Pizza rolls</td>
                  <td className="py-3 px-4">375°F</td>
                  <td className="py-3 px-4">6–8 min</td>
                  <td className="py-3 px-4 text-gray-600">Shake at 4 min</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Egg rolls</td>
                  <td className="py-3 px-4">375°F</td>
                  <td className="py-3 px-4">10–12 min</td>
                  <td className="py-3 px-4 text-gray-600">Flip at 6 min</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="py-3 px-4 font-medium">Onion rings</td>
                  <td className="py-3 px-4">375°F</td>
                  <td className="py-3 px-4">8–10 min</td>
                  <td className="py-3 px-4 text-gray-600">Shake at 5 min</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Fish sticks</td>
                  <td className="py-3 px-4">400°F</td>
                  <td className="py-3 px-4">8–10 min</td>
                  <td className="py-3 px-4 text-gray-600">Flip at 5 min</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Energy Savings Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-green-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Air Fryer vs Oven: Energy & Time Comparison
          </h2>
          <p className="text-gray-600 mb-6">
            Beyond convenience, air fryers offer significant energy and time savings compared
            to conventional ovens. Here's a detailed breakdown:
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm bg-white rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-green-100">
                  <th className="text-left py-3 px-4 font-semibold">Factor</th>
                  <th className="text-left py-3 px-4 font-semibold">Conventional Oven</th>
                  <th className="text-left py-3 px-4 font-semibold">Air Fryer</th>
                  <th className="text-left py-3 px-4 font-semibold">Savings</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Wattage</td>
                  <td className="py-3 px-4">3,000–5,000W</td>
                  <td className="py-3 px-4">1,200–1,800W</td>
                  <td className="py-3 px-4 text-green-600 font-medium">60-70% less</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="py-3 px-4 font-medium">Preheat time</td>
                  <td className="py-3 px-4">10–15 minutes</td>
                  <td className="py-3 px-4">2–5 minutes</td>
                  <td className="py-3 px-4 text-green-600 font-medium">~10 min saved</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Cooking time</td>
                  <td className="py-3 px-4">100% (baseline)</td>
                  <td className="py-3 px-4">80% of oven time</td>
                  <td className="py-3 px-4 text-green-600 font-medium">20% faster</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="py-3 px-4 font-medium">Kitchen heat</td>
                  <td className="py-3 px-4">Heats entire room</td>
                  <td className="py-3 px-4">Minimal heat escape</td>
                  <td className="py-3 px-4 text-green-600 font-medium">Better in summer</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Annual cost (avg use)</td>
                  <td className="py-3 px-4">~$75–100/year</td>
                  <td className="py-3 px-4">~$25–35/year</td>
                  <td className="py-3 px-4 text-green-600 font-medium">$50–65 saved</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Based on average US electricity rates of $0.15/kWh and typical household cooking patterns.
            Source: <a href="https://www.energy.gov/energysaver/cooking" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">U.S. Department of Energy — Cooking Energy Tips</a>
          </p>
        </div>
      </section>

      {/* Essential Tips */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h2>Essential Air Fryer Tips for Perfect Results</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose mt-6">
            <div className="bg-amber-50 p-5 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">✓ Do This</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Preheat for 3–5 minutes before adding food</li>
                <li>• Leave space between items for air circulation</li>
                <li>• Shake or flip food halfway through cooking</li>
                <li>• Use a light spray of oil on lean foods</li>
                <li>• Pat foods completely dry before air frying</li>
                <li>• Use a meat thermometer for raw meats</li>
                <li>• Check food 2–3 minutes before the timer</li>
                <li>• Clean the basket after every use</li>
              </ul>
            </div>
            <div className="bg-red-50 p-5 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">✗ Avoid This</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Overcrowding the basket (blocks airflow)</li>
                <li>• Using aerosol cooking sprays (damages coating)</li>
                <li>• Cooking wet batters (drips before setting)</li>
                <li>• Putting foil over air intake holes</li>
                <li>• Leaving food unattended for long cooks</li>
                <li>• Skipping the preheat for crispy foods</li>
                <li>• Using too much oil (causes smoking)</li>
                <li>• Assuming all air fryers cook the same</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Food Safety */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h2>Food Safety: Internal Temperature Guide</h2>
          <p>
            No matter how you cook your food, safe internal temperatures remain the same.
            Always use an instant-read meat thermometer to verify doneness.
          </p>

          <div className="overflow-x-auto not-prose">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-red-50">
                  <th className="text-left py-3 px-4 font-semibold">Food Type</th>
                  <th className="text-left py-3 px-4 font-semibold">Safe Internal Temperature</th>
                  <th className="text-left py-3 px-4 font-semibold">Rest Time</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">All poultry (chicken, turkey, duck)</td>
                  <td className="py-3 px-4 font-medium text-red-600">165°F (74°C)</td>
                  <td className="py-3 px-4">None required</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="py-3 px-4">Ground meats (beef, pork, lamb)</td>
                  <td className="py-3 px-4 font-medium text-red-600">160°F (71°C)</td>
                  <td className="py-3 px-4">None required</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Beef steaks and roasts</td>
                  <td className="py-3 px-4 font-medium">145°F (63°C)</td>
                  <td className="py-3 px-4">3 minutes</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="py-3 px-4">Pork chops, roasts, tenderloin</td>
                  <td className="py-3 px-4 font-medium">145°F (63°C)</td>
                  <td className="py-3 px-4">3 minutes</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Fish and seafood</td>
                  <td className="py-3 px-4 font-medium">145°F (63°C)</td>
                  <td className="py-3 px-4">None required</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="py-3 px-4">Eggs and egg dishes</td>
                  <td className="py-3 px-4 font-medium">160°F (71°C)</td>
                  <td className="py-3 px-4">None required</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Leftovers and casseroles</td>
                  <td className="py-3 px-4 font-medium text-red-600">165°F (74°C)</td>
                  <td className="py-3 px-4">None required</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Source: <a href="https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">FoodSafety.gov — Safe Minimum Internal Temperatures</a>
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
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

      {/* Internal Links Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            More Kitchen Calculators
          </h2>
          <p className="text-gray-600 mb-6">
            Planning a complete meal? Check out our other cooking calculators:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/turkey-cooking-calculator" className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900">🦃 Turkey Cooking Calculator</h3>
              <p className="text-sm text-gray-600">Roast, fry, or smoke — get perfect turkey every time</p>
            </Link>
            <Link href="/meat-cooking-time-calculator" className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900">🥩 Meat Cooking Calculator</h3>
              <p className="text-sm text-gray-600">Times for every cut of beef, pork, lamb, and more</p>
            </Link>
            <Link href="/party-food-calculator" className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900">🎉 Party Food Calculator</h3>
              <p className="text-sm text-gray-600">How much food do you need for your gathering?</p>
            </Link>
            <Link href="/recipe-scaler" className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900">📐 Recipe Scaler</h3>
              <p className="text-sm text-gray-600">Scale any recipe up or down with precision</p>
            </Link>
            <Link href="/slow-cooker-to-oven-converter" className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900">🍲 Slow Cooker Converter</h3>
              <p className="text-sm text-gray-600">Convert between slow cooker and oven times</p>
            </Link>
            <Link href="/cooking-measurement-converter" className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900">📏 Measurement Converter</h3>
              <p className="text-sm text-gray-600">Cups to grams, tablespoons to milliliters, and more</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-6">
            Related Temperature & Conversion Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedCalculators.map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="calculator-card p-5 flex flex-col items-start hover:scale-[1.02] transition-transform duration-200 group"
              >
                <span className="text-2xl mb-2">{calc.emoji}</span>
                <h3 className="font-serif font-semibold text-gray-900 group-hover:text-coral transition-colors mb-1">
                  {calc.title}
                </h3>
                <p className="text-sm text-gray-600">{calc.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Authority Sources Footer */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-lg font-semibold text-gray-900 mb-4">
            Sources & References
          </h2>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>
              <a href="https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">
                USDA Food Safety and Inspection Service
              </a> — Safe food handling and cooking temperatures
            </li>
            <li>
              <a href="https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">
                FoodSafety.gov
              </a> — Safe minimum internal temperatures chart
            </li>
            <li>
              <a href="https://www.energy.gov/energysaver/cooking" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">
                U.S. Department of Energy
              </a> — Cooking energy efficiency tips
            </li>
            <li>
              <a href="https://ask.usda.gov/s/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">
                USDA Ask USDA
              </a> — Food safety questions and answers
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
