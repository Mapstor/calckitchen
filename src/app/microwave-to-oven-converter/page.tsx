import { Metadata } from "next";
import Link from "next/link";
import MicrowaveToOvenConverter from "@/components/calculators/MicrowaveToOvenConverter";
import {
  FAQPageJsonLd,
  WebApplicationJsonLd,
  BreadcrumbJsonLd,
} from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title:
    "Microwave to Oven Converter Calculator + Microwave Times for 40+ Foods",
  description:
    "Convert microwave cooking times to oven times (and back). Plus a complete database of how long to microwave potatoes, sweet potatoes, corn, bacon, and 40+ common foods. Free calculator.",
  openGraph: {
    title:
      "Microwave to Oven Converter Calculator + Microwave Times for 40+ Foods",
    description:
      "Convert microwave cooking times to oven times (and back). Plus a complete database of how long to microwave potatoes, sweet potatoes, corn, bacon, and 40+ common foods.",
    url: "https://calckitchen.com/microwave-to-oven-converter",
    type: "website",
  },
  alternates: {
    canonical: "https://calckitchen.com/microwave-to-oven-converter",
  },
};

const faqs = [
  {
    question: "What is the general rule for converting oven time to microwave time?",
    answer:
      "Divide the oven time by 4 to get the approximate microwave time at high (100%) power. For example, a recipe that takes 40 minutes in the oven will take roughly 10 minutes in the microwave. Always start with less time and add more in 30-second increments — it's easier to add time than to fix overcooked food.",
  },
  {
    question: "How do I find out what wattage my microwave is?",
    answer:
      "Check the label inside the door or on the back panel. If you can't find it, run the water boil test: put 1 cup of cold water in the microwave on high and time how long it takes to boil. About 2 minutes = 1000W, 2.5 minutes = 800W, 3 minutes = 700W.",
  },
  {
    question: "Why does my microwave cook food unevenly?",
    answer:
      "Microwaves produce waves that create hot spots and cold spots inside the oven cavity. The turntable helps, but it doesn't solve the problem entirely. Stirring food halfway through, using lower power settings, and arranging food in a ring pattern all improve evenness.",
  },
  {
    question: "Can I use any container in the microwave?",
    answer:
      "No. Only use containers labeled 'microwave-safe.' Avoid metal, aluminum foil, some plastics (check for the microwave-safe symbol), and containers with metallic paint or trim. Glass and ceramic are usually safe. When in doubt, test by microwaving the empty container for 30 seconds — if it's hot to the touch, don't use it for cooking.",
  },
  {
    question: "How long do I microwave a sweet potato?",
    answer:
      "A medium sweet potato takes 5–8 minutes on high in a 1000W microwave. Pierce the skin several times with a fork, place on a microwave-safe plate, and flip halfway through. Let stand for 2 minutes before cutting open. For a 700W microwave, add 2–3 extra minutes.",
  },
  {
    question: "Is microwaving food bad for nutrition?",
    answer:
      "No — in fact, microwaving can preserve more nutrients than boiling or lengthy oven cooking because it uses shorter cooking times and less water. Water-soluble vitamins (like vitamin C and B vitamins) are better retained in microwave cooking. The key is not overcooking, regardless of method.",
  },
  {
    question: "Why does my microwave popcorn sometimes burn or not fully pop?",
    answer:
      "Your microwave wattage probably doesn't match what the popcorn was designed for (usually 1000–1100W). If you have a lower-wattage microwave, add 15–30 seconds. If higher, reduce time. Always listen — when pops slow to 2–3 seconds apart, stop the microwave regardless of the time left on the clock.",
  },
  {
    question: "Can I convert any oven recipe to the microwave?",
    answer:
      "Not all recipes translate well. The microwave is great for steaming vegetables, reheating, cooking potatoes, and melting/softening. It's poor at browning, crisping, and baking (bread, pastries, roasted meats). For recipes that need texture contrast, consider a hybrid approach: microwave to cook through, then finish in the oven or broiler for browning.",
  },
  {
    question: "Why does food explode in the microwave?",
    answer:
      "Foods with tight skins or membranes (eggs, potatoes, sausages, grapes) trap steam that builds up until it bursts. Always pierce foods with skins before microwaving, and never microwave eggs in their shells. Hot dogs and sausages should be pricked with a fork multiple times.",
  },
  {
    question: "How do I reheat food without drying it out?",
    answer:
      "Add moisture by covering food with a damp paper towel or placing a cup of water in the microwave alongside. Use 70% power instead of high — this gives heat time to distribute evenly without overheating the edges. Stir or flip halfway through for best results.",
  },
  {
    question: "What's the difference between defrost mode and low power?",
    answer:
      "Defrost mode cycles the microwave on and off, allowing heat to distribute evenly through frozen food. Low power runs continuously at reduced wattage. For thawing, defrost mode works better because it prevents the outer edges from cooking while the center is still frozen.",
  },
  {
    question: "Can I sterilize kitchen items in the microwave?",
    answer:
      "You can sanitize some items like sponges and dishcloths. Wet the sponge thoroughly and microwave on high for 2 minutes — this kills most bacteria. However, don't put metal, dry items, or anything that can't handle high heat. The FDA recommends letting items cool before handling.",
  },
];

export default function MicrowaveToOvenConverterPage() {
  return (
    <div className="min-h-screen">
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Microwave to Oven Converter"
        description="Convert microwave cooking times to oven times (and back). Plus a complete database of how long to microwave potatoes, sweet potatoes, corn, bacon, and 40+ common foods."
        url="https://calckitchen.com/microwave-to-oven-converter"
        applicationCategory="UtilitiesApplication"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          {
            name: "Microwave to Oven Converter",
            url: "https://calckitchen.com/microwave-to-oven-converter",
          },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cream to-white py-8 md:py-12">
        <div className="container-narrow">
          <nav className="text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-coral">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Microwave to Oven Converter</span>
          </nav>

          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Microwave to Oven Converter — Times, Temperatures & Wattage Calculator
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl">
            Convert microwave cooking times to oven times (and back). Plus a complete
            database of how long to microwave potatoes, corn, bacon, and 40+ common foods.
          </p>

          {/* Calculator Component */}
          <MicrowaveToOvenConverter />
        </div>
      </section>

      {/* Real-World Examples Section */}
      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Real-World Conversion Examples
          </h2>
          <p className="text-gray-700 mb-8">
            See how home cooks use microwave-to-oven conversions in everyday cooking situations:
          </p>

          {/* Example 1 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Frozen Casserole: From Microwave Instructions to Oven</h3>
                <p className="text-gray-600 mb-4">
                  Jennifer bought a frozen mac and cheese casserole that has microwave-only instructions: "Microwave on high for 8-10 minutes." Her microwave is broken, and she needs to cook it in the oven instead.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Starting Point:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Package instructions: 8-10 minutes on microwave high</li>
                    <li>• Microwave wattage assumed: 1100W</li>
                    <li>• Food type: Dense, frozen casserole</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Oven Conversion:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• <strong>Microwave time × 4 = Oven time</strong></li>
                    <li>• 8-10 min × 4 = <strong>32-40 minutes in oven</strong></li>
                    <li>• Temperature: <strong>350°F (175°C)</strong></li>
                    <li>• Cover with foil first 25 min, then uncover to brown</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700"><strong>Pro tip:</strong> Frozen foods take longer than fresh. Start checking at 30 minutes and add time if the center is still cold.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 2 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Baked Potato: Oven Recipe to Quick Microwave Lunch</h3>
                <p className="text-gray-600 mb-4">
                  Marcus wants a baked potato for lunch but doesn't want to wait an hour for the oven. His traditional recipe says "bake at 400°F for 45-60 minutes." He has a 1000W microwave and needs a quick alternative.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Starting Point:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Oven instructions: 400°F for 45-60 minutes</li>
                    <li>• Potato: Medium russet, ~7 oz</li>
                    <li>• Marcus's microwave: 1000W</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Microwave Conversion:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• <strong>Oven time ÷ 4 = Microwave time</strong></li>
                    <li>• 45-60 min ÷ 4 = 11-15 min (theory)</li>
                    <li>• <strong>Actual: 5-7 minutes for medium potato</strong></li>
                    <li>• Pierce skin 6-8 times, flip halfway through</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700"><strong>Pro tip:</strong> Potatoes convert faster than the 4× rule suggests because microwaves excel at cooking water-dense foods. Always start with less time.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 3 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Different Wattage: Following 1100W Instructions on 700W Microwave</h3>
                <p className="text-gray-600 mb-4">
                  Lisa's frozen burrito package says "Microwave on high for 2 minutes" (tested on 1100W microwave). Her dorm microwave is only 700W, and her burritos always come out cold in the middle.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Starting Point:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Package instructions: 2 minutes at 1100W</li>
                    <li>• Lisa's microwave: 700W</li>
                    <li>• Problem: Cold center, hot edges</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Wattage Conversion:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• <strong>Time × (Original Wattage ÷ Your Wattage)</strong></li>
                    <li>• 2 min × (1100 ÷ 700) = 2 × 1.57 = <strong>3.14 minutes</strong></li>
                    <li>• <strong>Round to 3 min 15 sec</strong></li>
                    <li>• Let stand 1 minute before eating</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700"><strong>Pro tip:</strong> For lower-wattage microwaves, try using 70% power for slightly longer — this gives more even heating than blasting on high.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 4 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">4</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Hybrid Method: Quick Cooking + Oven Finish for Crispy Skin</h3>
                <p className="text-gray-600 mb-4">
                  Kevin wants crispy baked chicken thighs in under 30 minutes. Oven-only takes 45-50 minutes at 425°F. He decides to microwave first to speed things up, then finish in the oven for crispy skin.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Challenge:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Goal: Crispy skin chicken thighs in 30 min</li>
                    <li>• Normal oven time: 45-50 min at 425°F</li>
                    <li>• Microwaves can't crisp skin</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Hybrid Solution:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• <strong>Step 1:</strong> Microwave on 70% power for 5-6 min (cooks interior)</li>
                    <li>• <strong>Step 2:</strong> Pat skin dry with paper towels</li>
                    <li>• <strong>Step 3:</strong> Oven at 450°F for 15-18 min (crisps skin)</li>
                    <li>• <strong>Total time: ~25 minutes</strong></li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700"><strong>Pro tip:</strong> This hybrid method works for any recipe where you want speed AND browning — ribs, potatoes with crispy skins, even bacon.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 5 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">5</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Meal Prep Reheating: Multiple Portions at Different Wattages</h3>
                <p className="text-gray-600 mb-4">
                  Sarah meal-preps rice and chicken containers on Sunday. At home she has a 1200W microwave; at work the break room microwave is only 800W. She needs reheating times for both locations.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Meal Prep Container:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Contents: 1 cup rice + 4 oz chicken</li>
                    <li>• Home microwave: 1200W</li>
                    <li>• Work microwave: 800W</li>
                    <li>• Container: Glass with vented lid</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Calculated Reheat Times:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• <strong>At home (1200W):</strong> 2-2.5 min on high</li>
                    <li>• <strong>At work (800W):</strong> 2.5 × (1200÷800) = <strong>3.75 min ≈ 4 min</strong></li>
                    <li>• Stir halfway through at work for even heating</li>
                    <li>• Add 1 tbsp water before microwaving to keep rice moist</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700"><strong>Pro tip:</strong> Write reheat times on your meal prep containers with a dry-erase marker for different wattage scenarios.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 6 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">6</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Steamed Vegetables: Faster Than Stovetop</h3>
                <p className="text-gray-600 mb-4">
                  David wants steamed broccoli as a side dish. Stovetop steaming takes 8-10 minutes plus time to boil water. He wants to know the microwave equivalent for 2 cups of broccoli florets.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Stovetop Method:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Boil water: 5-7 minutes</li>
                    <li>• Steam broccoli: 4-5 minutes</li>
                    <li>• Total: 10-12 minutes</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Microwave Method (1000W):</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• <strong>2 cups broccoli florets: 3-4 minutes on high</strong></li>
                    <li>• Add 2 tablespoons water to bowl</li>
                    <li>• Cover with microwave-safe plate or damp paper towel</li>
                    <li>• Let stand 1 minute after cooking</li>
                    <li>• <strong>Total time saved: 6-8 minutes</strong></li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700"><strong>Pro tip:</strong> Microwave steaming retains more nutrients than boiling because food isn't sitting in water that leaches vitamins.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Convert Section */}
      <section className="py-8 md:py-12">
        <div className="container-narrow prose prose-lg max-w-none">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            How to Convert Oven Times to Microwave Times (The Basic Rule)
          </h2>
          <p>
            The general rule of thumb is simple:{" "}
            <strong>
              microwave cooking time at high power is roughly one-quarter (25%)
              of the conventional oven time.
            </strong>
          </p>
          <p>
            So if a recipe says to bake something for 60 minutes in the oven,
            you're looking at approximately 15 minutes in the microwave on high
            power.
          </p>
          <p>
            But here's the catch — this ratio isn't universal. Dense foods like
            whole potatoes need more time relative to the oven estimate, while
            thin or liquid-heavy foods (like melting butter or reheating soup)
            convert much faster. That's why we built the food-specific presets
            into our calculator.
          </p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-6 mb-3">
            The Step-by-Step Conversion Process
          </h3>
          <ol className="space-y-2">
            <li>
              <strong>Note the oven temperature and time</strong> from your
              recipe.
            </li>
            <li>
              <strong>Divide the oven time by 4</strong> to get your starting
              microwave time at 100% power.
            </li>
            <li>
              <strong>Adjust for food type</strong> — dense foods may need
              slightly more time; thin or liquid foods may need less.
            </li>
            <li>
              <strong>Choose the right power level</strong> — not everything
              should go on high (see the power level chart below).
            </li>
            <li>
              <strong>Check early and often</strong> — start with the minimum
              time and add 30-second intervals as needed.
            </li>
            <li>
              <strong>Let it stand</strong> — microwaved food continues cooking
              for 1–2 minutes after you stop the microwave. Factor this in.
            </li>
          </ol>
        </div>
      </section>

      {/* Power Level Chart */}
      <section className="py-8 bg-gray-50">
        <div className="container-narrow">
          <h3 className="font-serif text-xl md:text-2xl font-semibold text-gray-900 mb-4">
            Microwave Power Level ↔ Approximate Oven Temperature
          </h3>
          <p className="text-gray-600 mb-4">
            Understanding power levels is key to getting good results from your
            microwave. Most people only ever use "high," but matching the right
            power level to your food makes a huge difference.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Power Level
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    % Power
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Oven Equivalent
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Best For
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">High (100%)</td>
                  <td className="px-4 py-3 text-sm text-gray-700">100%</td>
                  <td className="px-4 py-3 text-sm text-gray-700">425–500°F</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    Boiling water, cooking vegetables, reheating beverages
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Medium-High (70%)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">70%</td>
                  <td className="px-4 py-3 text-sm text-gray-700">350°F</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    Reheating leftovers, gentle cooking, casseroles
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Medium (50%)</td>
                  <td className="px-4 py-3 text-sm text-gray-700">50%</td>
                  <td className="px-4 py-3 text-sm text-gray-700">300°F</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    Melting chocolate, defrosting, cooking eggs, simmering
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Medium-Low (30%)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">30%</td>
                  <td className="px-4 py-3 text-sm text-gray-700">225°F</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    Softening butter/cream cheese, slow defrosting, keeping warm
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Low (10-20%)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">10-20%</td>
                  <td className="px-4 py-3 text-sm text-gray-700">175°F</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    Keeping food warm, proofing yeast dough
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Defrost (20–30%)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">20–30%</td>
                  <td className="px-4 py-3 text-sm text-gray-700">N/A</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    Thawing frozen meat and poultry (cycles on/off)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            <strong>Important:</strong> These oven-temperature equivalents are
            approximations. Microwaves heat by exciting water molecules, not by
            surrounding food with hot air, so the cooking dynamics are
            fundamentally different.
          </p>
        </div>
      </section>

      {/* Food Time Database Section */}
      <section className="py-8 md:py-12">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            How Long to Microwave Common Foods — Complete Time Database
          </h2>
          <p className="text-gray-600 mb-6">
            All times below are based on a <strong>1000-watt microwave</strong>{" "}
            — the standard that most packaged food instructions use. If your
            microwave has a different wattage, use the wattage conversion mode
            in the calculator above.
          </p>

          {/* Potatoes & Root Vegetables */}
          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Potatoes & Root Vegetables
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Food
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Time (1000W)
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Power
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Tips
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Baked potato (small, ~5 oz)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">4–5 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Pierce skin 6–8 times with fork.
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Baked potato (medium, ~7 oz)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">5–7 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Flip halfway. Let stand 2 min.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Baked potato (large, ~10 oz)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">8–10 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Add 2–3 min per extra potato.
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    2 medium potatoes
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">8–12 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Arrange in a circle, not stacked.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    3 medium potatoes
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">12–15 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Rearrange halfway through.
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Sweet potato (small)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">4–5 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Pierce skin, wrap in damp paper towel optional.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Sweet potato (medium)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">5–8 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Wrap in damp paper towel for softer skin.
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Sweet potato (large)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">8–10 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    May need turning halfway.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Baby potatoes (1 lb)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">6–8 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Cut in half, add 2 tbsp water, cover.
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Carrots (1 cup sliced)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">3–5 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Add 2 tbsp water, cover. Stir halfway.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Beets (medium, whole)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">12–15 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Pierce, wrap in wet paper towels. Let stand 5 min.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Vegetables */}
          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Fresh & Frozen Vegetables
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Food
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Time (1000W)
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Power
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Tips
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Corn on the cob (1 ear, in husk)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">2–4 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Leave in husk, let stand 5 min, silk slides off easily.
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Corn on the cob (2 ears)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">4–6 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Add 1 min per additional ear.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Corn on the cob (4 ears)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">6–8 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Arrange in a square pattern.
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Fresh broccoli (1 cup florets)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">2–4 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Add 2 tbsp water, cover.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Fresh broccoli (2 cups)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">3–5 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Stir halfway through.
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Frozen broccoli (1 cup)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">3–5 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Add 1 tbsp water, cover. No need to thaw.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Frozen vegetables (1 cup, mixed)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">3–5 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Add 1 tbsp water, cover.
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Frozen vegetables (2 cups)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">5–7 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Stir halfway, check for doneness.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Asparagus (1 bunch, ~1 lb)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">3–5 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Thicker stalks need more time. Add water, cover.
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Green beans (1 cup)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">3–4 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Add 2 tbsp water, cover. Should be crisp-tender.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Cauliflower (1 cup florets)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">2–4 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Add 2 tbsp water, cover.
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Spinach (1 lb fresh)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">2–3 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    No water needed (wet from washing). Wilts quickly.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Frozen peas (1 cup)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">2–3 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Add 1 tbsp water. Easy to overcook.
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Zucchini (1 cup sliced)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">2–3 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    High water content, cooks fast.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Grains, Eggs & Breakfast */}
          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Grains, Eggs & Breakfast
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Food
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Time (1000W)
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Power
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Tips
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Rice (1 cup dry + 2 cups water)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">12–15 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    High, then Medium
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    5 min on high to boil, then 7–10 min at 50%. Stand 5 min.
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Quinoa (1 cup dry + 2 cups water)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">10–12 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    High, then Medium
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Boil on high 3 min, then 50% power. Fluff with fork.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Instant oatmeal (1 packet)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">1–2 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Use large bowl — oatmeal bubbles over.
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Steel-cut oatmeal (1 serving)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">5–7 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Medium</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Cover, stir halfway. Let stand 2 min.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Rolled oatmeal (1 serving)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">2–3 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Use oversized bowl — oatmeal boils over easily.
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Scrambled eggs (2 eggs)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">1.5–2 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Stir every 30 seconds. Remove slightly underdone.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Scrambled eggs (4 eggs)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">2.5–3.5 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Stir every 45 sec. Don't overcook.
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Poached egg (in water)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">30–60 sec</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Use microwave egg poacher or mug with water. Pierce yolk!
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Bacon (3 strips)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">3–4 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Layer between paper towels on a plate.
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Bacon (6 strips)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">5–6 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Don't overlap. Paper towels absorb grease.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Sausage links (2)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">1.5–2 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Pierce with fork first. No browning.
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Hot dog (1)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">30–45 sec</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Pierce or slice to prevent bursting.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Quick Tasks */}
          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Quick Tasks & Melting
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Task
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Time (1000W)
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Power
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Tips
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Melt butter (1 tbsp)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">10–15 sec</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Watch closely — goes from solid to splattered instantly.
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Melt butter (½ cup)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">45–60 sec</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Medium</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Cut into pieces first for even melting.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Soften butter (½ cup)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">15–20 sec</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Low (30%)</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Check every 5 sec. Soft, not melted.
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Soften cream cheese (8 oz)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">20–30 sec</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Medium</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Remove foil wrapper. Check every 10 sec.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Melt chocolate (1 cup chips)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">1–2 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Medium (50%)</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Stir every 30 sec. Remove when 80% melted.
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Melt cheese (1 cup shredded)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">30–60 sec</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    On nachos or in sauce. Check at 30 sec.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Boil water (1 cup)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">1.5–3 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Time varies by wattage. Use microwave-safe mug.
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Heat milk (1 cup)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">1–1.5 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Stir halfway. Don't boil — foams over.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Warm honey (crystallized)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">20–30 sec</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Medium</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Remove lid. Stir. Repeat if needed.
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Proof yeast dough
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">—</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Low (10%)</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Place dough + cup of water. Creates warm, humid environment.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Reheating */}
          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Reheating Leftovers
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Food
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Time (1000W)
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Power
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Tips
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Pizza (1–2 slices)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">30–45 sec</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Place cup of water alongside to keep crust from getting tough.
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Pasta with sauce (1 serving)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">1.5–2 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">70%</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Add splash of water, cover, stir halfway.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Rice (1 cup cooked)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">1–2 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Add 1 tbsp water, cover. Prevents drying out.
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Soup (1 cup)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">2–3 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Stir halfway. Don't cover tightly.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Casserole (1 serving)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">2–3 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">70%</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Cover, stir if possible. Check center temp.
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Chicken breast (1)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">1.5–2 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">70%</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Cover with damp paper towel. Slice first for even heating.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Mashed potatoes (1 cup)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">1.5–2 min</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Add splash of milk, stir before and after.
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Coffee (1 cup cold)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">30–60 sec</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    Better than wasting coffee. Don't boil.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Wattage Section */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Microwave Wattage Conversion: Why It Matters
          </h2>
          <p className="text-gray-600 mb-6">
            That bag of popcorn was probably tested in a 1000–1100 watt
            microwave, but your countertop model might only be 700 watts. That's
            why your popcorn sometimes comes out half-popped.
          </p>

          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">
              The Wattage Conversion Formula
            </h3>
            <code className="block bg-gray-100 p-4 rounded text-sm mb-4">
              Adjusted Time = Original Time × (Original Wattage ÷ Your Wattage)
            </code>
            <p className="text-gray-600 text-sm">
              <strong>Example:</strong> A recipe says 10 minutes at 1100 watts.
              Your microwave is 700 watts.
              <br />
              10 × (1100 ÷ 700) = <strong>15.7 minutes ≈ 16 minutes</strong>
            </p>
          </div>

          {/* Wattage Quick Reference Table */}
          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-6 mb-4">
            Wattage Conversion Quick Reference
          </h3>
          <p className="text-gray-600 mb-4">
            Use this table to quickly convert times between common microwave wattages:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    If recipe says (1100W)
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">
                    1000W
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">
                    900W
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">
                    800W
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">
                    700W
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">1 minute</td>
                  <td className="px-4 py-3 text-sm text-gray-700 text-center">1:06</td>
                  <td className="px-4 py-3 text-sm text-gray-700 text-center">1:13</td>
                  <td className="px-4 py-3 text-sm text-gray-700 text-center">1:23</td>
                  <td className="px-4 py-3 text-sm text-gray-700 text-center">1:34</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">2 minutes</td>
                  <td className="px-4 py-3 text-sm text-gray-700 text-center">2:12</td>
                  <td className="px-4 py-3 text-sm text-gray-700 text-center">2:27</td>
                  <td className="px-4 py-3 text-sm text-gray-700 text-center">2:45</td>
                  <td className="px-4 py-3 text-sm text-gray-700 text-center">3:09</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">3 minutes</td>
                  <td className="px-4 py-3 text-sm text-gray-700 text-center">3:18</td>
                  <td className="px-4 py-3 text-sm text-gray-700 text-center">3:40</td>
                  <td className="px-4 py-3 text-sm text-gray-700 text-center">4:08</td>
                  <td className="px-4 py-3 text-sm text-gray-700 text-center">4:43</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">5 minutes</td>
                  <td className="px-4 py-3 text-sm text-gray-700 text-center">5:30</td>
                  <td className="px-4 py-3 text-sm text-gray-700 text-center">6:07</td>
                  <td className="px-4 py-3 text-sm text-gray-700 text-center">6:53</td>
                  <td className="px-4 py-3 text-sm text-gray-700 text-center">7:51</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">10 minutes</td>
                  <td className="px-4 py-3 text-sm text-gray-700 text-center">11:00</td>
                  <td className="px-4 py-3 text-sm text-gray-700 text-center">12:13</td>
                  <td className="px-4 py-3 text-sm text-gray-700 text-center">13:45</td>
                  <td className="px-4 py-3 text-sm text-gray-700 text-center">15:43</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            How to Find Your Microwave's Wattage
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-900 mb-2">
                Method 1: Check the label
              </p>
              <p className="text-sm text-gray-600">
                Look inside the door, on the back panel, or bottom of the
                microwave.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-900 mb-2">
                Method 2: Check the manual
              </p>
              <p className="text-sm text-gray-600">
                Google your model number plus "specifications."
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-900 mb-2">
                Method 3: Water boil test
              </p>
              <p className="text-sm text-gray-600">
                1 cup cold water: ~2 min = 1000W, ~2.5 min = 800W, ~3 min = 700W
              </p>
            </div>
          </div>

          {/* Common Microwave Wattages Table */}
          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Common Microwave Types by Wattage
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Microwave Type
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">
                    Typical Wattage
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Compact/Dorm</td>
                  <td className="px-4 py-3 text-sm text-gray-700 text-center">600-800W</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Small, budget models</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">Mid-size Countertop</td>
                  <td className="px-4 py-3 text-sm text-gray-700 text-center">900-1000W</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Most common home models</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Full-size Countertop</td>
                  <td className="px-4 py-3 text-sm text-gray-700 text-center">1000-1200W</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Standard for recipes</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">Over-the-Range</td>
                  <td className="px-4 py-3 text-sm text-gray-700 text-center">1000-1100W</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Built-in, with vent fan</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Commercial</td>
                  <td className="px-4 py-3 text-sm text-gray-700 text-center">1200-2000W</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Restaurant/industrial use</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pro Tips Section */}
      <section className="py-8 md:py-12">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Pro Tips for Better Microwave Cooking
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
              <p className="font-semibold text-amber-900 mb-2">
                Standing time is real
              </p>
              <p className="text-sm text-amber-800">
                Food continues cooking for 1–2 minutes after you stop. Pull food
                out slightly underdone.
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
              <p className="font-semibold text-amber-900 mb-2">
                Always cover your food
              </p>
              <p className="text-sm text-amber-800">
                A lid or damp paper towel traps steam and cooks food more evenly.
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
              <p className="font-semibold text-amber-900 mb-2">
                Arrange food in a ring
              </p>
              <p className="text-sm text-amber-800">
                Place items around the edge of the turntable, not piled in the
                center. Microwaves heat from the outside in.
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
              <p className="font-semibold text-amber-900 mb-2">
                Use lower power more often
              </p>
              <p className="text-sm text-amber-800">
                70% power for reheating gives more even results without "boiling
                edges, frozen center."
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
              <p className="font-semibold text-amber-900 mb-2">
                The pizza + water cup trick
              </p>
              <p className="text-sm text-amber-800">
                Place a cup of water next to pizza when reheating. Prevents tough,
                rubbery crust.
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
              <p className="font-semibold text-amber-900 mb-2">
                Pierce everything with a skin
              </p>
              <p className="text-sm text-amber-800">
                Potatoes, sausages, egg yolks — anything that can trap steam will
                burst without fork holes.
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
              <p className="font-semibold text-amber-900 mb-2">
                Thick edges, thin center
              </p>
              <p className="text-sm text-amber-800">
                When spreading food on a plate, make edges thicker than center for even cooking.
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
              <p className="font-semibold text-amber-900 mb-2">
                Room temperature starts faster
              </p>
              <p className="text-sm text-amber-800">
                Let refrigerated food sit 5-10 min before microwaving for more even heating.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="py-8 bg-red-50">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl font-bold text-red-900 mb-4">
            Microwave Safety Reminders
          </h2>
          <p className="text-red-800 mb-4">
            According to the <a href="https://www.fda.gov/radiation-emitting-products/resources-you-radiation-emitting-products/microwave-oven-radiation" target="_blank" rel="noopener noreferrer" className="underline hover:text-red-900">FDA</a>, microwaves are safe when used according to instructions. Follow these guidelines:
          </p>
          <ul className="space-y-2 text-red-900">
            <li className="flex items-start gap-2">
              <span className="text-red-600 mt-1">✕</span>
              <span>
                <strong>Never microwave metal or aluminum foil.</strong> This
                includes twist ties and foil-lined containers.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 mt-1">✕</span>
              <span>
                <strong>Use only microwave-safe containers.</strong> Look for the
                wavy lines symbol or "microwave safe" text.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 mt-1">✕</span>
              <span>
                <strong>Never microwave sealed containers.</strong> Always vent or
                partially open lids to prevent pressure buildup.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 mt-1">✕</span>
              <span>
                <strong>Don't microwave eggs in their shells.</strong> They can
                explode due to steam pressure.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 mt-1">✕</span>
              <span>
                <strong>Avoid superheating water.</strong> Very hot water can appear calm but explode when disturbed. Use a wooden stir stick.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">✓</span>
              <span>
                <strong>Stir and rotate food</strong> for even heating —
                microwaves have hot spots.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">✓</span>
              <span>
                <strong>Let food stand</strong> after cooking to allow heat to distribute and finish cooking.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white p-4 md:p-6 rounded-lg shadow-sm"
              >
                <h3 className="font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="py-8 md:py-12">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Related Calculators
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/air-fryer-converter"
              className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-2">
                Air Fryer Converter
              </h3>
              <p className="text-sm text-gray-600">
                Convert oven recipes to air fryer times and temps.
              </p>
            </Link>
            <Link
              href="/meat-cooking-time-calculator"
              className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-2">
                Meat Cooking Time Calculator
              </h3>
              <p className="text-sm text-gray-600">
                Get precise oven times by weight for any cut of meat.
              </p>
            </Link>
            <Link
              href="/convection-oven-converter"
              className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-2">
                Convection Oven Converter
              </h3>
              <p className="text-sm text-gray-600">
                Adjust temperatures and times for fan ovens.
              </p>
            </Link>
            <Link
              href="/oven-temperature-converter"
              className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-2">
                Oven Temperature Converter
              </h3>
              <p className="text-sm text-gray-600">
                Convert between Fahrenheit, Celsius, and Gas Mark.
              </p>
            </Link>
            <Link
              href="/slow-cooker-to-oven-converter"
              className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-2">
                Slow Cooker to Oven
              </h3>
              <p className="text-sm text-gray-600">
                Convert crockpot recipes to oven cooking.
              </p>
            </Link>
            <Link
              href="/recipe-scaler"
              className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-2">
                Recipe Scaler
              </h3>
              <p className="text-sm text-gray-600">
                Scale ingredients up or down for any serving size.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Authority Sources Footer */}
      <section className="py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-sm text-gray-500 text-center">
            Food safety guidelines informed by{" "}
            <a href="https://www.fda.gov/radiation-emitting-products/resources-you-radiation-emitting-products/microwave-oven-radiation" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">
              FDA Microwave Safety
            </a>
            {" • "}
            <a href="https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">
              USDA FSIS
            </a>
            {" • "}
            <a href="https://www.foodsafety.gov/food-safety-charts" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">
              FoodSafety.gov
            </a>
            {" • "}
            <a href="https://www.cdc.gov/food-safety/foods/microwave-cooking.html" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">
              CDC Food Safety
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
