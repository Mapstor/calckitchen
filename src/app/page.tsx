import type { Metadata } from "next";
import Link from "next/link";
import CalculatorCard from "@/components/ui/CalculatorCard";
import { FAQPageJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "CalcKitchen — 20 Free Kitchen Calculators for Cooking & Baking",
  description:
    "Free online kitchen calculators: air fryer converter, meat cooking times, recipe scaler, turkey calculator, and more. Built on USDA guidelines for accurate results.",
  openGraph: {
    title: "CalcKitchen — Kitchen Math, Solved",
    description:
      "20 free calculators for cooking times, temperature conversions, recipe scaling, and meal planning. Get instant answers based on USDA guidelines.",
    url: "https://calckitchen.com",
    siteName: "CalcKitchen",
    type: "website",
  },
  alternates: {
    canonical: "https://calckitchen.com",
  },
};

const calculatorCategories = [
  {
    name: "Appliance Converters",
    emoji: "🔥",
    calculators: [
      {
        href: "/air-fryer-converter",
        emoji: "🍟",
        title: "Air Fryer Converter",
        description: "Convert oven recipes to air fryer temps & times",
      },
      {
        href: "/microwave-to-oven-converter",
        emoji: "📻",
        title: "Microwave ↔ Oven",
        description: "Switch between microwave and oven cooking",
      },
      {
        href: "/slow-cooker-to-oven-converter",
        emoji: "🍲",
        title: "Slow Cooker ↔ Oven",
        description: "Convert between slow cooker, oven & Instant Pot",
      },
      {
        href: "/convection-oven-converter",
        emoji: "💨",
        title: "Convection Oven",
        description: "Adjust temps for convection vs conventional",
      },
      {
        href: "/oven-temperature-converter",
        emoji: "🌡️",
        title: "Oven Temperature",
        description: "Convert °F, °C, and Gas Mark",
      },
    ],
  },
  {
    name: "Cooking Time Calculators",
    emoji: "🥩",
    calculators: [
      {
        href: "/meat-cooking-time-calculator",
        emoji: "🥩",
        title: "Meat Cooking Time",
        description: "Get exact cook times by weight and doneness",
      },
      {
        href: "/turkey-cooking-calculator",
        emoji: "🦃",
        title: "Turkey Calculator",
        description: "Roasting, frying, smoking + thawing times",
      },
      {
        href: "/meat-temperature-chart",
        emoji: "🌡️",
        title: "Meat Temperature Chart",
        description: "USDA safe internal temperatures at a glance",
      },
    ],
  },
  {
    name: "Baking Calculators",
    emoji: "🍰",
    calculators: [
      {
        href: "/cake-servings-calculator",
        emoji: "🎂",
        title: "Cake Servings",
        description: "How many people does your cake feed?",
      },
      {
        href: "/cake-pan-converter",
        emoji: "🍳",
        title: "Cake Pan Converter",
        description: "Resize recipes for any pan size",
      },
      {
        href: "/pizza-dough-calculator",
        emoji: "🍕",
        title: "Pizza Dough",
        description: "Neapolitan, NY, Detroit style dough recipes",
      },
      {
        href: "/sourdough-calculator",
        emoji: "🍞",
        title: "Sourdough",
        description: "Starter feeding + bread recipe calculator",
      },
      {
        href: "/bakers-percentage-calculator",
        emoji: "📊",
        title: "Baker's Percentage",
        description: "Professional baker's math made easy",
      },
    ],
  },
  {
    name: "Recipe & Planning Tools",
    emoji: "🍽️",
    calculators: [
      {
        href: "/recipe-scaler",
        emoji: "⚖️",
        title: "Recipe Scaler",
        description: "Double, halve, or resize any recipe",
      },
      {
        href: "/recipe-cost-calculator",
        emoji: "💰",
        title: "Recipe Cost",
        description: "Calculate cost per serving",
      },
      {
        href: "/recipe-macro-calculator",
        emoji: "📈",
        title: "Recipe Macros",
        description: "Get calories and macros per serving",
      },
      {
        href: "/party-food-calculator",
        emoji: "🎉",
        title: "Party Food",
        description: "How much food for your guest count",
      },
      {
        href: "/cooking-measurement-converter",
        emoji: "📏",
        title: "Measurement Converter",
        description: "Cups, grams, oz, ml + ingredient weights",
      },
      {
        href: "/butter-converter",
        emoji: "🧈",
        title: "Butter Converter",
        description: "Sticks, cups, grams, tablespoons",
      },
      {
        href: "/coffee-ratio-calculator",
        emoji: "☕",
        title: "Coffee Ratio",
        description: "Perfect ratios for any brew method",
      },
    ],
  },
];

const faqItems = [
  {
    question: "Are CalcKitchen calculators accurate?",
    answer:
      "Yes. All cooking time and temperature calculators are built on USDA guidelines and FoodSafety.gov recommendations. We use professional culinary standards for baking percentages, dough hydration, and recipe scaling. While individual results may vary based on your equipment, our calculators provide reliable starting points backed by authoritative data.",
  },
  {
    question: "How do I convert oven recipes to air fryer?",
    answer:
      "Use our Air Fryer Converter: reduce the oven temperature by 25°F (about 15°C) and cut the cooking time by 20-25%. For example, a recipe calling for 400°F for 30 minutes becomes 375°F for 22-24 minutes in an air fryer. Always check for doneness a few minutes early.",
  },
  {
    question: "What internal temperature should meat reach?",
    answer:
      "USDA safe minimum internal temperatures are: Poultry (chicken, turkey) 165°F (74°C); Ground meats 160°F (71°C); Beef, pork, lamb steaks and roasts 145°F (63°C) with 3-minute rest; Fish 145°F (63°C). Always use a meat thermometer to verify doneness.",
  },
  {
    question: "How do I scale a recipe up or down?",
    answer:
      "Use our Recipe Scaler: enter your original recipe amounts and the desired serving multiplier. The calculator handles all conversions, including adjusting cooking times for larger batches. For baking, we recommend weighing ingredients for best results when scaling.",
  },
  {
    question: "What is baker's percentage?",
    answer:
      "Baker's percentage expresses each ingredient's weight as a percentage of the total flour weight. Flour is always 100%. This professional system makes scaling recipes easy and helps you understand dough characteristics. For example, 65% hydration means 650g water per 1000g flour.",
  },
];

export default function Home() {
  return (
    <>
      <OrganizationJsonLd
        name="CalcKitchen"
        url="https://calckitchen.com"
        description="Free online kitchen calculators for cooking times, temperature conversions, recipe scaling, and meal planning."
      />
      <FAQPageJsonLd faqs={faqItems} />

      <div className="min-h-screen">
        {/* Hero Section - Compact */}
        <section className="py-10 px-4 sm:px-6 lg:px-8 text-center bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              Kitchen Math, Solved.
            </h1>
            <p className="text-lg text-gray-600">
              20 free calculators for cooking, baking, and meal planning — built on USDA guidelines.
            </p>
          </div>
        </section>

        {/* Calculator Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {calculatorCategories.map((category) => (
            <div key={category.name} className="mb-10">
              <h2 className="font-serif text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span>{category.emoji}</span>
                {category.name}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {category.calculators.map((calc) => (
                  <CalculatorCard
                    key={calc.href}
                    href={calc.href}
                    emoji={calc.emoji}
                    title={calc.title}
                    description={calc.description}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Main Content Section */}
        <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <div className="prose prose-lg max-w-none mb-12">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
                Why CalcKitchen?
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Every home cook has been there: standing in the kitchen, phone in hand, trying to figure out how long to cook that 7-pound chicken or how to convert grandma&apos;s recipe from cups to grams. Kitchen math shouldn&apos;t require a culinary degree.
              </p>
              <p className="text-gray-700 leading-relaxed">
                CalcKitchen was built to answer the everyday cooking questions that send millions of people searching online. Our 20 free calculators cover everything from air fryer conversions to sourdough hydration — each one designed to give you instant, accurate answers so you can get back to cooking.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We built these tools on authoritative sources: USDA food safety guidelines, FoodSafety.gov recommendations, and professional culinary standards. When you need to know the safe internal temperature for pork or how to scale a cake recipe for a different pan, you&apos;re getting answers backed by real data.
              </p>
            </div>

            {/* Quick Reference: Safe Cooking Temperatures */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
                Quick Reference: USDA Safe Cooking Temperatures
              </h2>
              <p className="text-gray-600 mb-4">
                Food safety starts with proper internal temperatures. Use a meat thermometer — it&apos;s the only reliable way to ensure food is safely cooked.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 border-b border-gray-200">Food</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-900 border-b border-gray-200">°F</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-900 border-b border-gray-200">°C</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 border-b border-gray-200">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-700">Poultry (chicken, turkey)</td>
                      <td className="py-3 px-4 text-center font-semibold text-coral">165°F</td>
                      <td className="py-3 px-4 text-center text-gray-600">74°C</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">All parts including stuffing</td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <td className="py-3 px-4 text-gray-700">Ground meats (beef, pork, lamb)</td>
                      <td className="py-3 px-4 text-center font-semibold text-coral">160°F</td>
                      <td className="py-3 px-4 text-center text-gray-600">71°C</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">Burgers, meatloaf, sausages</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-700">Beef steaks & roasts</td>
                      <td className="py-3 px-4 text-center font-semibold text-coral">145°F</td>
                      <td className="py-3 px-4 text-center text-gray-600">63°C</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">+ 3 minute rest</td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <td className="py-3 px-4 text-gray-700">Pork chops & roasts</td>
                      <td className="py-3 px-4 text-center font-semibold text-coral">145°F</td>
                      <td className="py-3 px-4 text-center text-gray-600">63°C</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">+ 3 minute rest</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-700">Fish & shellfish</td>
                      <td className="py-3 px-4 text-center font-semibold text-coral">145°F</td>
                      <td className="py-3 px-4 text-center text-gray-600">63°C</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">Fish should flake easily</td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <td className="py-3 px-4 text-gray-700">Ham (fresh or smoked)</td>
                      <td className="py-3 px-4 text-center font-semibold text-coral">145°F</td>
                      <td className="py-3 px-4 text-center text-gray-600">63°C</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">+ 3 minute rest</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-gray-700">Egg dishes</td>
                      <td className="py-3 px-4 text-center font-semibold text-coral">160°F</td>
                      <td className="py-3 px-4 text-center text-gray-600">71°C</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">Casseroles, quiches</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Source: USDA Food Safety and Inspection Service. See our{" "}
                <Link href="/meat-temperature-chart" className="text-coral hover:underline">
                  complete meat temperature chart
                </Link>{" "}
                for detailed guidelines.
              </p>
            </div>

            {/* Calculator Showcase Sections */}
            <div className="space-y-12">
              {/* Appliance Converters */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
                  Appliance Converters: Cook Anything in Any Appliance
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Modern kitchens have more cooking appliances than ever. Air fryers, convection ovens, slow cookers, Instant Pots — each cooks differently. Our appliance converters help you adapt any recipe to whatever equipment you have.
                </p>

                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span>🍟</span>
                      <Link href="/air-fryer-converter" className="text-coral hover:underline">
                        Air Fryer Converter
                      </Link>
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Air fryers cook faster and hotter than conventional ovens because the circulating hot air creates a convection effect. The general rule: reduce temperature by 25°F and cut time by 20-25%.
                    </p>
                    <div className="bg-white rounded border border-gray-200 p-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Example:</p>
                      <p className="text-gray-600">
                        <strong>Oven recipe:</strong> Chicken wings at 400°F for 40 minutes<br />
                        <strong>Air fryer conversion:</strong> 375°F for 28-32 minutes, flip halfway through
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span>📻</span>
                      <Link href="/microwave-to-oven-converter" className="text-coral hover:underline">
                        Microwave to Oven Converter
                      </Link>
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Need to make that microwave recipe in the oven, or speed up an oven dish in the microwave? This converter handles the math, accounting for wattage differences and cooking method.
                    </p>
                    <div className="bg-white rounded border border-gray-200 p-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Example:</p>
                      <p className="text-gray-600">
                        <strong>Microwave:</strong> Baked potato, 8 minutes at 1000W<br />
                        <strong>Oven conversion:</strong> 60-75 minutes at 400°F (for crispy skin)
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span>🍲</span>
                      <Link href="/slow-cooker-to-oven-converter" className="text-coral hover:underline">
                        Slow Cooker to Oven Converter
                      </Link>
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Convert between slow cooker, Dutch oven, and Instant Pot. Whether you&apos;re adapting a slow cooker recipe for faster oven cooking or vice versa, we calculate the right time and temperature.
                    </p>
                    <div className="bg-white rounded border border-gray-200 p-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Example:</p>
                      <p className="text-gray-600">
                        <strong>Slow cooker:</strong> Beef stew, 8 hours on Low<br />
                        <strong>Dutch oven:</strong> 3-3.5 hours at 325°F, covered
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span>💨</span>
                      <Link href="/convection-oven-converter" className="text-coral hover:underline">
                        Convection Oven Converter
                      </Link>
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Convection ovens use a fan to circulate hot air, cooking food faster and more evenly. Most recipes need a 25°F reduction or 25% less cooking time.
                    </p>
                    <div className="bg-white rounded border border-gray-200 p-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Example:</p>
                      <p className="text-gray-600">
                        <strong>Conventional:</strong> Cookies at 350°F for 12 minutes<br />
                        <strong>Convection:</strong> 325°F for 10-11 minutes
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span>🌡️</span>
                      <Link href="/oven-temperature-converter" className="text-coral hover:underline">
                        Oven Temperature Converter
                      </Link>
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Convert between Fahrenheit, Celsius, and Gas Mark instantly. Essential for following recipes from different countries or using older cookbooks.
                    </p>
                    <div className="bg-white rounded border border-gray-200 p-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Example:</p>
                      <p className="text-gray-600">
                        <strong>180°C</strong> = <strong>356°F</strong> = <strong>Gas Mark 4</strong> (moderate oven)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cooking Time Calculators */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
                  Cooking Time Calculators: Perfect Results Every Time
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Cooking times depend on weight, thickness, starting temperature, and your desired doneness. Our calculators account for all these variables so you can cook meat, poultry, and fish confidently.
                </p>

                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span>🥩</span>
                      <Link href="/meat-cooking-time-calculator" className="text-coral hover:underline">
                        Meat Cooking Time Calculator
                      </Link>
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Get precise cooking times for beef, pork, lamb, and more. Select your cut, enter the weight, choose your doneness level, and get an accurate time estimate with rest time included.
                    </p>
                    <div className="bg-white rounded border border-gray-200 p-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Example:</p>
                      <p className="text-gray-600">
                        <strong>Input:</strong> 4 lb beef rib roast, medium-rare<br />
                        <strong>Result:</strong> Roast at 325°F for 1 hour 40 minutes, rest 15 minutes (target internal temp: 135°F)
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span>🦃</span>
                      <Link href="/turkey-cooking-calculator" className="text-coral hover:underline">
                        Turkey Cooking Calculator
                      </Link>
                    </h3>
                    <p className="text-gray-700 mb-3">
                      The most-used calculator during Thanksgiving. Calculate roasting time for stuffed or unstuffed turkey, plus thawing time, brine time, and even deep-frying instructions.
                    </p>
                    <div className="bg-white rounded border border-gray-200 p-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Example:</p>
                      <p className="text-gray-600">
                        <strong>Input:</strong> 14 lb turkey, unstuffed, roasting<br />
                        <strong>Result:</strong> 3-3.5 hours at 325°F, thaw 3-4 days in fridge, target 165°F in thickest part of thigh
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span>🌡️</span>
                      <Link href="/meat-temperature-chart" className="text-coral hover:underline">
                        Meat Temperature Chart
                      </Link>
                    </h3>
                    <p className="text-gray-700 mb-3">
                      A quick-reference guide to USDA safe internal temperatures for all types of meat, poultry, and seafood. Includes both safety minimums and target temperatures for different doneness levels.
                    </p>
                    <div className="bg-white rounded border border-gray-200 p-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Example:</p>
                      <p className="text-gray-600">
                        <strong>Medium-rare steak:</strong> 130-135°F (pull at 125°F for carryover cooking)<br />
                        <strong>Medium steak:</strong> 135-145°F (pull at 130°F)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Common Oven Temperatures Reference */}
              <div className="mb-12">
                <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
                  Oven Temperature Reference Chart
                </h2>
                <p className="text-gray-600 mb-4">
                  Common oven temperatures across Fahrenheit, Celsius, and Gas Mark scales:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900 border-b border-gray-200">Description</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900 border-b border-gray-200">°F</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900 border-b border-gray-200">°C</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900 border-b border-gray-200">Gas Mark</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 text-gray-700">Very low / Warming</td>
                        <td className="py-3 px-4 text-center">250°F</td>
                        <td className="py-3 px-4 text-center">120°C</td>
                        <td className="py-3 px-4 text-center">½</td>
                      </tr>
                      <tr className="border-b border-gray-100 bg-gray-50">
                        <td className="py-3 px-4 text-gray-700">Low</td>
                        <td className="py-3 px-4 text-center">300°F</td>
                        <td className="py-3 px-4 text-center">150°C</td>
                        <td className="py-3 px-4 text-center">2</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 text-gray-700">Moderate</td>
                        <td className="py-3 px-4 text-center">350°F</td>
                        <td className="py-3 px-4 text-center">175°C</td>
                        <td className="py-3 px-4 text-center">4</td>
                      </tr>
                      <tr className="border-b border-gray-100 bg-gray-50">
                        <td className="py-3 px-4 text-gray-700">Moderately hot</td>
                        <td className="py-3 px-4 text-center">375°F</td>
                        <td className="py-3 px-4 text-center">190°C</td>
                        <td className="py-3 px-4 text-center">5</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 text-gray-700">Hot</td>
                        <td className="py-3 px-4 text-center">400°F</td>
                        <td className="py-3 px-4 text-center">200°C</td>
                        <td className="py-3 px-4 text-center">6</td>
                      </tr>
                      <tr className="border-b border-gray-100 bg-gray-50">
                        <td className="py-3 px-4 text-gray-700">Very hot</td>
                        <td className="py-3 px-4 text-center">450°F</td>
                        <td className="py-3 px-4 text-center">230°C</td>
                        <td className="py-3 px-4 text-center">8</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-gray-700">Extremely hot</td>
                        <td className="py-3 px-4 text-center">500°F</td>
                        <td className="py-3 px-4 text-center">260°C</td>
                        <td className="py-3 px-4 text-center">10</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  Need precise conversions? Use our{" "}
                  <Link href="/oven-temperature-converter" className="text-coral hover:underline">
                    oven temperature converter
                  </Link>.
                </p>
              </div>

              {/* Baking Calculators */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
                  Baking Calculators: Precision for Perfect Bakes
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Baking is chemistry. Small changes in proportions can mean the difference between a perfect loaf and a dense brick. Our baking calculators help you nail the math so you can focus on technique.
                </p>

                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span>🎂</span>
                      <Link href="/cake-servings-calculator" className="text-coral hover:underline">
                        Cake Servings Calculator
                      </Link>
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Planning a party? Calculate how many servings you&apos;ll get from any cake size and shape. Works for round, square, sheet cakes, and tiered wedding cakes.
                    </p>
                    <div className="bg-white rounded border border-gray-200 p-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Example:</p>
                      <p className="text-gray-600">
                        <strong>Input:</strong> 9-inch round, 2 layers<br />
                        <strong>Result:</strong> 24-32 party servings or 12-16 dessert portions
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span>🍳</span>
                      <Link href="/cake-pan-converter" className="text-coral hover:underline">
                        Cake Pan Converter
                      </Link>
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Adapting a recipe for a different pan size? This calculator tells you exactly how to adjust batter amounts and baking times when switching between pan sizes and shapes.
                    </p>
                    <div className="bg-white rounded border border-gray-200 p-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Example:</p>
                      <p className="text-gray-600">
                        <strong>Original:</strong> 9-inch round recipe<br />
                        <strong>Converting to:</strong> 8-inch round → multiply batter by 0.79×, reduce bake time by 5-10 minutes
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span>🍕</span>
                      <Link href="/pizza-dough-calculator" className="text-coral hover:underline">
                        Pizza Dough Calculator
                      </Link>
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Calculate exact dough amounts for Neapolitan, New York, Detroit, or Sicilian style pizzas. Set your hydration, ball weight, and number of pizzas to get precise ingredient amounts.
                    </p>
                    <div className="bg-white rounded border border-gray-200 p-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Example:</p>
                      <p className="text-gray-600">
                        <strong>Input:</strong> 4 Neapolitan pizzas, 250g balls, 65% hydration<br />
                        <strong>Result:</strong> 606g flour, 394g water, 18g salt, 1.2g yeast
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span>🍞</span>
                      <Link href="/sourdough-calculator" className="text-coral hover:underline">
                        Sourdough Calculator
                      </Link>
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Master sourdough baking with our calculator for starter feeding ratios and bread recipes. Accounts for starter hydration and lets you scale to any loaf size.
                    </p>
                    <div className="bg-white rounded border border-gray-200 p-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Example:</p>
                      <p className="text-gray-600">
                        <strong>Input:</strong> 900g loaf, 75% hydration, 20% starter<br />
                        <strong>Result:</strong> 500g flour, 375g water, 100g starter, 10g salt
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span>📊</span>
                      <Link href="/bakers-percentage-calculator" className="text-coral hover:underline">
                        Baker&apos;s Percentage Calculator
                      </Link>
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Professional bakers use percentages to scale recipes and understand dough characteristics. Enter flour weight and percentages to get exact ingredient weights.
                    </p>
                    <div className="bg-white rounded border border-gray-200 p-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Example:</p>
                      <p className="text-gray-600">
                        <strong>Input:</strong> 500g flour, 65% water, 2% salt, 1% yeast<br />
                        <strong>Result:</strong> 500g flour, 325g water, 10g salt, 5g yeast
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Common Baking Pan Sizes */}
              <div className="mb-12">
                <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
                  Baking Pan Volume Reference
                </h2>
                <p className="text-gray-600 mb-4">
                  Know your pan capacities to adapt recipes and avoid overflow:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900 border-b border-gray-200">Pan Size</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900 border-b border-gray-200">Volume (cups)</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900 border-b border-gray-200">Volume (mL)</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900 border-b border-gray-200">Best For</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 text-gray-700">8&quot; round</td>
                        <td className="py-3 px-4 text-center">6 cups</td>
                        <td className="py-3 px-4 text-center">1.4 L</td>
                        <td className="py-3 px-4 text-gray-600 text-sm">Layer cakes</td>
                      </tr>
                      <tr className="border-b border-gray-100 bg-gray-50">
                        <td className="py-3 px-4 text-gray-700">9&quot; round</td>
                        <td className="py-3 px-4 text-center">8 cups</td>
                        <td className="py-3 px-4 text-center">1.9 L</td>
                        <td className="py-3 px-4 text-gray-600 text-sm">Layer cakes</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 text-gray-700">8&quot; × 8&quot; square</td>
                        <td className="py-3 px-4 text-center">8 cups</td>
                        <td className="py-3 px-4 text-center">1.9 L</td>
                        <td className="py-3 px-4 text-gray-600 text-sm">Brownies, bars</td>
                      </tr>
                      <tr className="border-b border-gray-100 bg-gray-50">
                        <td className="py-3 px-4 text-gray-700">9&quot; × 13&quot; rectangular</td>
                        <td className="py-3 px-4 text-center">14 cups</td>
                        <td className="py-3 px-4 text-center">3.3 L</td>
                        <td className="py-3 px-4 text-gray-600 text-sm">Sheet cakes, casseroles</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 text-gray-700">9&quot; × 5&quot; loaf</td>
                        <td className="py-3 px-4 text-center">8 cups</td>
                        <td className="py-3 px-4 text-center">1.9 L</td>
                        <td className="py-3 px-4 text-gray-600 text-sm">Quick breads, pound cakes</td>
                      </tr>
                      <tr className="border-b border-gray-100 bg-gray-50">
                        <td className="py-3 px-4 text-gray-700">10&quot; tube/bundt</td>
                        <td className="py-3 px-4 text-center">12 cups</td>
                        <td className="py-3 px-4 text-center">2.8 L</td>
                        <td className="py-3 px-4 text-gray-600 text-sm">Angel food, bundt cakes</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-gray-700">12-cup muffin tin</td>
                        <td className="py-3 px-4 text-center">3 cups total</td>
                        <td className="py-3 px-4 text-center">710 mL</td>
                        <td className="py-3 px-4 text-gray-600 text-sm">Standard muffins, cupcakes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  Converting between pans? Use our{" "}
                  <Link href="/cake-pan-converter" className="text-coral hover:underline">
                    cake pan converter
                  </Link>{" "}
                  for exact adjustments.
                </p>
              </div>

              {/* Recipe & Planning Tools */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
                  Recipe & Planning Tools: From Scaling to Costing
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Whether you&apos;re doubling a recipe for a party, tracking macros, or budgeting your meal prep, these tools handle the calculations so you can focus on cooking.
                </p>

                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span>⚖️</span>
                      <Link href="/recipe-scaler" className="text-coral hover:underline">
                        Recipe Scaler
                      </Link>
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Double, halve, or scale any recipe to your exact needs. Enter original amounts and your target servings, and we&apos;ll calculate new quantities with smart rounding.
                    </p>
                    <div className="bg-white rounded border border-gray-200 p-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Example:</p>
                      <p className="text-gray-600">
                        <strong>Original:</strong> Recipe serves 4, uses 1.5 cups flour<br />
                        <strong>Scaling to:</strong> 10 servings → 3¾ cups flour
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span>💰</span>
                      <Link href="/recipe-cost-calculator" className="text-coral hover:underline">
                        Recipe Cost Calculator
                      </Link>
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Calculate the true cost per serving of your recipes. Great for meal planning on a budget or pricing dishes for a catering business.
                    </p>
                    <div className="bg-white rounded border border-gray-200 p-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Example:</p>
                      <p className="text-gray-600">
                        <strong>Input:</strong> Chicken stir-fry with rice (6 servings)<br />
                        <strong>Result:</strong> $14.50 total, $2.42 per serving
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span>📈</span>
                      <Link href="/recipe-macro-calculator" className="text-coral hover:underline">
                        Recipe Macro Calculator
                      </Link>
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Get estimated calories, protein, carbs, and fat per serving. Enter your ingredients and we&apos;ll calculate the nutritional breakdown.
                    </p>
                    <div className="bg-white rounded border border-gray-200 p-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Example:</p>
                      <p className="text-gray-600">
                        <strong>Input:</strong> Overnight oats recipe (1 serving)<br />
                        <strong>Result:</strong> 380 calories, 12g protein, 58g carbs, 11g fat
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span>🎉</span>
                      <Link href="/party-food-calculator" className="text-coral hover:underline">
                        Party Food Calculator
                      </Link>
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Hosting a gathering? Calculate how much food you need based on guest count, event type, and duration. Covers appetizers, mains, sides, and drinks.
                    </p>
                    <div className="bg-white rounded border border-gray-200 p-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Example:</p>
                      <p className="text-gray-600">
                        <strong>Input:</strong> 30 guests, 3-hour cocktail party<br />
                        <strong>Result:</strong> Plan 180-240 appetizer pieces (6-8 per person), 60-90 drinks
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span>📏</span>
                      <Link href="/cooking-measurement-converter" className="text-coral hover:underline">
                        Cooking Measurement Converter
                      </Link>
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Convert between cups, tablespoons, ounces, grams, and milliliters. Includes ingredient-specific conversions because 1 cup of flour doesn&apos;t weigh the same as 1 cup of sugar.
                    </p>
                    <div className="bg-white rounded border border-gray-200 p-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Example:</p>
                      <p className="text-gray-600">
                        <strong>Input:</strong> 2 cups all-purpose flour<br />
                        <strong>Result:</strong> 250g / 8.8 oz
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span>🧈</span>
                      <Link href="/butter-converter" className="text-coral hover:underline">
                        Butter Converter
                      </Link>
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Convert butter between sticks, cups, tablespoons, grams, and ounces. No more guessing when a recipe calls for &quot;3/4 stick&quot; or &quot;100g butter.&quot;
                    </p>
                    <div className="bg-white rounded border border-gray-200 p-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Example:</p>
                      <p className="text-gray-600">
                        <strong>Input:</strong> 1 stick butter<br />
                        <strong>Result:</strong> ½ cup = 8 tbsp = 113g = 4 oz
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span>☕</span>
                      <Link href="/coffee-ratio-calculator" className="text-coral hover:underline">
                        Coffee Ratio Calculator
                      </Link>
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Get the perfect coffee-to-water ratio for any brew method: pour over, French press, espresso, cold brew, and more. Adjust strength to your taste.
                    </p>
                    <div className="bg-white rounded border border-gray-200 p-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Example:</p>
                      <p className="text-gray-600">
                        <strong>Input:</strong> French press, 4 cups, medium strength<br />
                        <strong>Result:</strong> 56g coffee (about 8 tbsp) + 900ml water, steep 4 minutes
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Common Measurement Conversions */}
              <div className="mb-12">
                <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
                  Common Cooking Measurement Conversions
                </h2>
                <p className="text-gray-600 mb-4">
                  Quick reference for volume conversions used in everyday cooking:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900 border-b border-gray-200">US Volume</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900 border-b border-gray-200">Tablespoons</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900 border-b border-gray-200">Teaspoons</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900 border-b border-gray-200">mL</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900 border-b border-gray-200">Fluid oz</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 text-gray-700 font-medium">1 cup</td>
                        <td className="py-3 px-4 text-center">16 tbsp</td>
                        <td className="py-3 px-4 text-center">48 tsp</td>
                        <td className="py-3 px-4 text-center">237 mL</td>
                        <td className="py-3 px-4 text-center">8 fl oz</td>
                      </tr>
                      <tr className="border-b border-gray-100 bg-gray-50">
                        <td className="py-3 px-4 text-gray-700 font-medium">¾ cup</td>
                        <td className="py-3 px-4 text-center">12 tbsp</td>
                        <td className="py-3 px-4 text-center">36 tsp</td>
                        <td className="py-3 px-4 text-center">177 mL</td>
                        <td className="py-3 px-4 text-center">6 fl oz</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 text-gray-700 font-medium">½ cup</td>
                        <td className="py-3 px-4 text-center">8 tbsp</td>
                        <td className="py-3 px-4 text-center">24 tsp</td>
                        <td className="py-3 px-4 text-center">118 mL</td>
                        <td className="py-3 px-4 text-center">4 fl oz</td>
                      </tr>
                      <tr className="border-b border-gray-100 bg-gray-50">
                        <td className="py-3 px-4 text-gray-700 font-medium">⅓ cup</td>
                        <td className="py-3 px-4 text-center">5⅓ tbsp</td>
                        <td className="py-3 px-4 text-center">16 tsp</td>
                        <td className="py-3 px-4 text-center">79 mL</td>
                        <td className="py-3 px-4 text-center">2.7 fl oz</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 text-gray-700 font-medium">¼ cup</td>
                        <td className="py-3 px-4 text-center">4 tbsp</td>
                        <td className="py-3 px-4 text-center">12 tsp</td>
                        <td className="py-3 px-4 text-center">59 mL</td>
                        <td className="py-3 px-4 text-center">2 fl oz</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-gray-700 font-medium">1 tbsp</td>
                        <td className="py-3 px-4 text-center">1 tbsp</td>
                        <td className="py-3 px-4 text-center">3 tsp</td>
                        <td className="py-3 px-4 text-center">15 mL</td>
                        <td className="py-3 px-4 text-center">0.5 fl oz</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  Need ingredient-specific weight conversions? Use our{" "}
                  <Link href="/cooking-measurement-converter" className="text-coral hover:underline">
                    measurement converter
                  </Link>.
                </p>
              </div>

              {/* Trust & Authority Section */}
              <div className="bg-sage/10 rounded-xl p-6 mb-12">
                <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
                  Built on Authoritative Data
                </h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Every CalcKitchen calculator is built on data from trusted sources. We don&apos;t guess — we calculate based on the same standards used by professional kitchens and food safety experts.
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-sage" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold text-gray-900">USDA Guidelines</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Safe cooking temperatures, food handling standards, and nutritional data from USDA.gov.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-sage" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold text-gray-900">FoodSafety.gov</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Federal food safety recommendations for home cooks and food service.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-sage" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold text-gray-900">Professional Standards</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Baking formulas, hydration ratios, and culinary techniques from professional sources.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="mb-12">
                <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-5">
                      <h3 className="font-semibold text-gray-900 mb-2">{item.question}</h3>
                      <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* About CalcKitchen */}
              <div className="border-t border-gray-200 pt-10">
                <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
                  About CalcKitchen
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  CalcKitchen started with a simple question: why is it so hard to find quick, accurate answers to basic cooking math? You shouldn&apos;t need to scroll through a 2,000-word blog post to find out how long to cook a 5-pound chicken.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We built 20 calculators that give you instant answers. Type in your numbers, get your results. Each calculator is backed by USDA food safety guidelines, professional culinary standards, and real-world testing. No fluff, no ads before answers — just the information you need to cook with confidence.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Whether you&apos;re a home cook figuring out Thanksgiving turkey timing, a baker scaling a recipe for a different pan size, or a meal prepper calculating macros, CalcKitchen has a tool for you.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Have a suggestion for a new calculator? We&apos;d love to hear from you.{" "}
                  <Link href="/contact" className="text-coral hover:underline">
                    Get in touch
                  </Link>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
