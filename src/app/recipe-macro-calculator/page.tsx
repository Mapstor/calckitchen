import { Metadata } from "next";
import Link from "next/link";
import RecipeMacroCalculator from "@/components/calculators/RecipeMacroCalculator";
import { FAQPageJsonLd, WebApplicationJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Recipe Macro Calculator — Calories, Protein, Carbs & Fat Per Serving | CalcKitchen",
  description: "Calculate the macros and calories in any recipe. Enter your ingredients to get protein, carbs, fat, and calories per serving. Powered by USDA FoodData Central.",
  openGraph: {
    title: "Recipe Macro Calculator — Calories, Protein, Carbs & Fat Per Serving",
    description: "Calculate the macros and calories in any recipe. Enter your ingredients to get protein, carbs, fat, and calories per serving. Powered by USDA FoodData Central.",
    url: "https://calckitchen.com/recipe-macro-calculator",
    type: "website",
  },
  alternates: {
    canonical: "https://calckitchen.com/recipe-macro-calculator",
  },
};

const faqs = [
  {
    question: "How accurate is the USDA nutritional data?",
    answer: "USDA FoodData Central data is lab-analyzed and considered the most accurate public nutritional database available. However, natural foods inherently vary — one chicken breast isn't identical to another, and the calorie content of an apple depends on variety, size, and growing conditions. Expect ±10–15% variance for whole foods. Branded/packaged foods are more precise because they're manufactured to consistent standards.",
  },
  {
    question: "Can I track micronutrients like vitamins and minerals?",
    answer: "The USDA database contains extensive micronutrient data beyond macros — including iron, calcium, potassium, vitamin A, vitamin C, B vitamins, and more. Our calculator focuses on the core macros (calories, protein, carbs, fat, fiber, sugar, sodium) for simplicity, but the underlying data supports a full micronutrient panel.",
  },
  {
    question: "What's the difference between total carbs, net carbs, and fiber?",
    answer: "Total carbs include all carbohydrates: starch, sugar, and fiber. Net carbs = total carbs minus fiber (and sometimes sugar alcohols). The idea behind net carbs is that fiber isn't digested or absorbed for energy, so it shouldn't \"count\" toward your carb intake. The FDA and USDA use total carbs. Keto and low-carb communities typically track net carbs.",
  },
  {
    question: "How do I handle recipes with parts I discard (bones, shells, peels)?",
    answer: "Use the USDA entry for the edible portion only. \"Chicken thigh, boneless, skinless\" already accounts for the removed bone and skin. For whole foods you peel (like bananas or oranges), the USDA entry for the \"raw\" fruit typically provides data for the edible portion, with the weight representing flesh only.",
  },
  {
    question: "Why does my homemade dish have different macros than a restaurant version?",
    answer: "Restaurants use significantly more butter, oil, salt, and sugar than home cooks. A restaurant stir-fry might use 3–4 tablespoons of oil where you'd use 1. Restaurant pasta sauces are often finished with butter. These additions can add 200–400+ calories per serving compared to the same dish made at home.",
  },
  {
    question: "Should I log macros for spices and seasonings?",
    answer: "Most individual spices contribute negligible calories — a teaspoon of cumin has 8 calories. For casual tracking, you can skip them. For precision tracking or food labeling, include them. The exception is sugar, honey, or other caloric sweeteners used as seasonings — always count those.",
  },
  {
    question: "How do I calculate macros for cooked vs. raw ingredients?",
    answer: "Always match your USDA entry to your measurement method. If you weigh chicken raw, use 'chicken breast, raw.' If you weigh it after cooking, use 'chicken breast, cooked.' Cooking typically reduces weight by 20-30% due to water loss, but the total calories remain the same. A 6 oz raw chicken breast becomes ~4.5 oz cooked but still has ~280 calories either way.",
  },
  {
    question: "What's a good macro ratio for weight loss?",
    answer: "Common weight loss macro ratios include 40/30/30 (40% carbs, 30% protein, 30% fat) or higher protein versions like 35/40/25. However, total calories matter most — you can lose weight on any macro ratio if you maintain a calorie deficit. Higher protein (1.6-2.2g per kg bodyweight) helps preserve muscle during weight loss and increases satiety.",
  },
  {
    question: "How do I account for oil absorbed during frying?",
    answer: "Fried foods absorb 10-40% of the oil used, depending on temperature, breading, and food density. A rough estimate: pan-fried foods absorb about 15% of the oil; deep-fried breaded foods absorb 25-40%. For a pan with 2 tablespoons oil, assume about 0.3 tablespoons (36 calories) is absorbed per serving. Weigh the oil before and after cooking for precision.",
  },
  {
    question: "Do cooking methods change the macros in food?",
    answer: "Cooking doesn't significantly change macros — protein is still protein after cooking. What changes is water content and weight. A 100g raw chicken breast becomes ~75g cooked due to water loss, so the calories per gram of cooked meat are higher. Some vitamins degrade with heat, but macronutrients remain stable.",
  },
  {
    question: "How do I calculate macros for marinades and sauces?",
    answer: "For marinades, only count what's actually absorbed or consumed. A general rule: meats absorb about 35% of marinade weight after 24 hours. If your marinade is 100g and you discard 65g, count the macros from 35g. For sauces served with the dish, count the entire amount used.",
  },
  {
    question: "What's the difference between USDA FoodData Central entry types?",
    answer: "USDA FoodData Central has several databases: 'Foundation Foods' are lab-analyzed whole foods with highest accuracy. 'SR Legacy' is the classic USDA Standard Reference. 'Branded Foods' come from manufacturer labels. 'Survey Foods' reflect typical preparation methods. For home cooking, prioritize Foundation or SR Legacy entries for whole ingredients.",
  },
];

export default function RecipeMacroCalculatorPage() {
  return (
    <div className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Recipe Macro Calculator"
        description="Calculate calories, protein, carbs, fat, and other macronutrients for any recipe. Enter ingredients and get a full nutrition breakdown per serving."
        url="https://calckitchen.com/recipe-macro-calculator"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Recipe Macro Calculator", url: "https://calckitchen.com/recipe-macro-calculator" },
        ]}
      />

      {/* Hero Section with Calculator */}
      <section className="bg-gradient-to-b from-warm-white to-white py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Recipe Macro Calculator
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Calculate the calories and macros in any recipe. Enter your ingredients to get protein, carbs, fat, fiber, and calories per serving. Powered by USDA FoodData Central.
          </p>

          {/* Calculator Component */}
          <RecipeMacroCalculator />
        </div>
      </section>

      {/* Content Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl prose prose-lg">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            How Recipe Macro Calculation Works
          </h2>
          <p>
            Every food has a nutritional profile — the amount of protein, carbohydrates, fat, and micronutrients per unit weight. The USDA maintains the most comprehensive public database of these values, covering everything from raw chicken breast (31g protein per 100g) to cooked jasmine rice (2.7g protein per 100g).
          </p>
          <p>
            To calculate the macros in a recipe, you take each ingredient's nutritional values per 100g, scale them to the amount you actually use, and sum across all ingredients. Then divide by servings.
          </p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            The Three Macronutrients
          </h3>

          <div className="bg-gray-50 p-4 rounded-lg my-6">
            <p className="mb-2"><strong>Protein (4 calories per gram)</strong> — Essential for muscle repair, immune function, and satiety. High-protein ingredients include meat, poultry, fish, eggs, dairy, legumes, and tofu.</p>
            <p className="mb-2"><strong>Carbohydrates (4 calories per gram)</strong> — The body's primary energy source. Found in grains, fruits, vegetables, legumes, and sugars. Broken down into fiber (indigestible), sugar (simple carbs), and starch (complex carbs).</p>
            <p><strong>Fat (9 calories per gram)</strong> — Essential for hormone production, vitamin absorption, and brain function. More calorie-dense than protein or carbs.</p>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Why USDA Data?
          </h3>
          <p>
            The USDA FoodData Central database is the gold standard for nutritional data in the United States. It contains lab-analyzed nutritional profiles for thousands of foods, updated regularly. This is the same data that food manufacturers use for Nutrition Facts labels, and it's what registered dietitians reference for clinical nutrition work.
          </p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Common High-Protein Ingredients
          </h3>
          <div className="overflow-x-auto my-6">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4">Ingredient</th>
                  <th className="text-right py-3 px-4">Per 100g</th>
                  <th className="text-right py-3 px-4">Protein</th>
                  <th className="text-right py-3 px-4">Carbs</th>
                  <th className="text-right py-3 px-4">Fat</th>
                  <th className="text-left py-3 px-4">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4">Chicken breast, raw</td>
                  <td className="py-2 px-4 text-right">105 cal</td>
                  <td className="py-2 px-4 text-right">23g</td>
                  <td className="py-2 px-4 text-right">0g</td>
                  <td className="py-2 px-4 text-right">1g</td>
                  <td className="py-2 px-4">Lean protein, low fat</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4">Salmon, Atlantic</td>
                  <td className="py-2 px-4 text-right">208 cal</td>
                  <td className="py-2 px-4 text-right">20g</td>
                  <td className="py-2 px-4 text-right">0g</td>
                  <td className="py-2 px-4 text-right">13g</td>
                  <td className="py-2 px-4">Omega-3s, higher fat</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4">Ground beef, 90% lean</td>
                  <td className="py-2 px-4 text-right">176 cal</td>
                  <td className="py-2 px-4 text-right">20g</td>
                  <td className="py-2 px-4 text-right">0g</td>
                  <td className="py-2 px-4 text-right">10g</td>
                  <td className="py-2 px-4">Iron, B12, versatile</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4">Eggs, whole</td>
                  <td className="py-2 px-4 text-right">147 cal</td>
                  <td className="py-2 px-4 text-right">13g</td>
                  <td className="py-2 px-4 text-right">1g</td>
                  <td className="py-2 px-4 text-right">10g</td>
                  <td className="py-2 px-4">Complete protein, choline</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4">Greek yogurt, plain</td>
                  <td className="py-2 px-4 text-right">97 cal</td>
                  <td className="py-2 px-4 text-right">9g</td>
                  <td className="py-2 px-4 text-right">4g</td>
                  <td className="py-2 px-4 text-right">5g</td>
                  <td className="py-2 px-4">Probiotics, calcium</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4">Cottage cheese, low-fat</td>
                  <td className="py-2 px-4 text-right">72 cal</td>
                  <td className="py-2 px-4 text-right">12g</td>
                  <td className="py-2 px-4 text-right">3g</td>
                  <td className="py-2 px-4 text-right">1g</td>
                  <td className="py-2 px-4">Casein protein, low cal</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4">Tofu, firm</td>
                  <td className="py-2 px-4 text-right">76 cal</td>
                  <td className="py-2 px-4 text-right">8g</td>
                  <td className="py-2 px-4 text-right">2g</td>
                  <td className="py-2 px-4 text-right">4g</td>
                  <td className="py-2 px-4">Plant protein, versatile</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4">Lentils, cooked</td>
                  <td className="py-2 px-4 text-right">116 cal</td>
                  <td className="py-2 px-4 text-right">9g</td>
                  <td className="py-2 px-4 text-right">20g</td>
                  <td className="py-2 px-4 text-right">0g</td>
                  <td className="py-2 px-4">Fiber, iron, plant-based</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4">Shrimp, raw</td>
                  <td className="py-2 px-4 text-right">85 cal</td>
                  <td className="py-2 px-4 text-right">20g</td>
                  <td className="py-2 px-4 text-right">0g</td>
                  <td className="py-2 px-4 text-right">0.5g</td>
                  <td className="py-2 px-4">Very lean, quick cooking</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4">Turkey breast, raw</td>
                  <td className="py-2 px-4 text-right">104 cal</td>
                  <td className="py-2 px-4 text-right">24g</td>
                  <td className="py-2 px-4 text-right">0g</td>
                  <td className="py-2 px-4 text-right">1g</td>
                  <td className="py-2 px-4">Leanest poultry option</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Carbohydrate Sources Compared
          </h3>
          <div className="overflow-x-auto my-6">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4">Ingredient</th>
                  <th className="text-right py-3 px-4">Per 100g</th>
                  <th className="text-right py-3 px-4">Total Carbs</th>
                  <th className="text-right py-3 px-4">Fiber</th>
                  <th className="text-right py-3 px-4">Sugar</th>
                  <th className="text-right py-3 px-4">Net Carbs</th>
                  <th className="text-left py-3 px-4">Glycemic Impact</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4">White rice, cooked</td>
                  <td className="py-2 px-4 text-right">130 cal</td>
                  <td className="py-2 px-4 text-right">28g</td>
                  <td className="py-2 px-4 text-right">0.4g</td>
                  <td className="py-2 px-4 text-right">0g</td>
                  <td className="py-2 px-4 text-right">27.6g</td>
                  <td className="py-2 px-4">High (GI 73)</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4">Brown rice, cooked</td>
                  <td className="py-2 px-4 text-right">111 cal</td>
                  <td className="py-2 px-4 text-right">23g</td>
                  <td className="py-2 px-4 text-right">1.8g</td>
                  <td className="py-2 px-4 text-right">0.4g</td>
                  <td className="py-2 px-4 text-right">21.2g</td>
                  <td className="py-2 px-4">Medium (GI 50)</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4">Quinoa, cooked</td>
                  <td className="py-2 px-4 text-right">120 cal</td>
                  <td className="py-2 px-4 text-right">21g</td>
                  <td className="py-2 px-4 text-right">2.8g</td>
                  <td className="py-2 px-4 text-right">0.9g</td>
                  <td className="py-2 px-4 text-right">18.2g</td>
                  <td className="py-2 px-4">Low (GI 53)</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4">Oats, rolled, dry</td>
                  <td className="py-2 px-4 text-right">379 cal</td>
                  <td className="py-2 px-4 text-right">68g</td>
                  <td className="py-2 px-4 text-right">10g</td>
                  <td className="py-2 px-4 text-right">1g</td>
                  <td className="py-2 px-4 text-right">58g</td>
                  <td className="py-2 px-4">Low (GI 55)</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4">Sweet potato, baked</td>
                  <td className="py-2 px-4 text-right">90 cal</td>
                  <td className="py-2 px-4 text-right">21g</td>
                  <td className="py-2 px-4 text-right">3.3g</td>
                  <td className="py-2 px-4 text-right">6.5g</td>
                  <td className="py-2 px-4 text-right">17.7g</td>
                  <td className="py-2 px-4">Medium (GI 63)</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4">Pasta, cooked</td>
                  <td className="py-2 px-4 text-right">131 cal</td>
                  <td className="py-2 px-4 text-right">25g</td>
                  <td className="py-2 px-4 text-right">1.8g</td>
                  <td className="py-2 px-4 text-right">0.6g</td>
                  <td className="py-2 px-4 text-right">23.2g</td>
                  <td className="py-2 px-4">Medium (GI 55)</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4">Black beans, cooked</td>
                  <td className="py-2 px-4 text-right">132 cal</td>
                  <td className="py-2 px-4 text-right">24g</td>
                  <td className="py-2 px-4 text-right">8.7g</td>
                  <td className="py-2 px-4 text-right">0.3g</td>
                  <td className="py-2 px-4 text-right">15.3g</td>
                  <td className="py-2 px-4">Low (GI 30)</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4">Cauliflower rice</td>
                  <td className="py-2 px-4 text-right">25 cal</td>
                  <td className="py-2 px-4 text-right">5g</td>
                  <td className="py-2 px-4 text-right">2g</td>
                  <td className="py-2 px-4 text-right">2g</td>
                  <td className="py-2 px-4 text-right">3g</td>
                  <td className="py-2 px-4">Very low (GI 15)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Cooking Fats & Oils — Hidden Calories
          </h3>
          <div className="overflow-x-auto my-6">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4">Fat/Oil</th>
                  <th className="text-right py-3 px-4">Per Tbsp</th>
                  <th className="text-right py-3 px-4">Sat. Fat</th>
                  <th className="text-right py-3 px-4">Mono Fat</th>
                  <th className="text-right py-3 px-4">Poly Fat</th>
                  <th className="text-left py-3 px-4">Smoke Point</th>
                  <th className="text-left py-3 px-4">Best Use</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4">Olive oil, extra virgin</td>
                  <td className="py-2 px-4 text-right">119 cal</td>
                  <td className="py-2 px-4 text-right">1.9g</td>
                  <td className="py-2 px-4 text-right">9.9g</td>
                  <td className="py-2 px-4 text-right">1.4g</td>
                  <td className="py-2 px-4">375°F</td>
                  <td className="py-2 px-4">Dressings, low heat</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4">Avocado oil</td>
                  <td className="py-2 px-4 text-right">124 cal</td>
                  <td className="py-2 px-4 text-right">1.6g</td>
                  <td className="py-2 px-4 text-right">9.9g</td>
                  <td className="py-2 px-4 text-right">1.9g</td>
                  <td className="py-2 px-4">520°F</td>
                  <td className="py-2 px-4">High-heat, neutral</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4">Butter, unsalted</td>
                  <td className="py-2 px-4 text-right">102 cal</td>
                  <td className="py-2 px-4 text-right">7.3g</td>
                  <td className="py-2 px-4 text-right">3.0g</td>
                  <td className="py-2 px-4 text-right">0.4g</td>
                  <td className="py-2 px-4">350°F</td>
                  <td className="py-2 px-4">Baking, finishing</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4">Coconut oil</td>
                  <td className="py-2 px-4 text-right">121 cal</td>
                  <td className="py-2 px-4 text-right">11.2g</td>
                  <td className="py-2 px-4 text-right">0.8g</td>
                  <td className="py-2 px-4 text-right">0.2g</td>
                  <td className="py-2 px-4">350°F</td>
                  <td className="py-2 px-4">Baking, Asian dishes</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4">Vegetable oil</td>
                  <td className="py-2 px-4 text-right">120 cal</td>
                  <td className="py-2 px-4 text-right">1.0g</td>
                  <td className="py-2 px-4 text-right">2.8g</td>
                  <td className="py-2 px-4 text-right">8.0g</td>
                  <td className="py-2 px-4">400°F</td>
                  <td className="py-2 px-4">Frying, neutral</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4">Sesame oil</td>
                  <td className="py-2 px-4 text-right">120 cal</td>
                  <td className="py-2 px-4 text-right">1.9g</td>
                  <td className="py-2 px-4 text-right">5.4g</td>
                  <td className="py-2 px-4 text-right">5.6g</td>
                  <td className="py-2 px-4">410°F</td>
                  <td className="py-2 px-4">Asian, finishing</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4">Ghee (clarified butter)</td>
                  <td className="py-2 px-4 text-right">112 cal</td>
                  <td className="py-2 px-4 text-right">7.9g</td>
                  <td className="py-2 px-4 text-right">3.7g</td>
                  <td className="py-2 px-4 text-right">0.5g</td>
                  <td className="py-2 px-4">485°F</td>
                  <td className="py-2 px-4">High heat, Indian</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4">Bacon fat</td>
                  <td className="py-2 px-4 text-right">115 cal</td>
                  <td className="py-2 px-4 text-right">5.0g</td>
                  <td className="py-2 px-4 text-right">5.8g</td>
                  <td className="py-2 px-4 text-right">1.4g</td>
                  <td className="py-2 px-4">325°F</td>
                  <td className="py-2 px-4">Flavor, low heat</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Real-World Examples */}
      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Real-World Examples
          </h2>

          {/* Example 1 */}
          <div className="mb-10">
            <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
              Example 1: Meal Prep Chicken Stir-Fry (4 Servings)
            </h3>
            <p className="text-gray-700 mb-4">
              A fitness enthusiast is meal prepping for the week and wants to know the exact macros per container for their high-protein lunch.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-600 mb-2"><strong>Recipe Ingredients:</strong></p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Chicken breast, raw: 1.5 lbs (680g)</li>
                <li>• Jasmine rice, dry: 2 cups (370g)</li>
                <li>• Broccoli, raw: 2 cups (182g)</li>
                <li>• Bell peppers: 2 medium (240g)</li>
                <li>• Soy sauce: 3 tbsp (51g)</li>
                <li>• Sesame oil: 1 tbsp (14g)</li>
                <li>• Vegetable oil: 2 tbsp (28g)</li>
                <li>• Servings: 4</li>
              </ul>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg mb-4">
              <p className="text-sm text-emerald-800 mb-2"><strong>Per Serving Results:</strong></p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div><span className="block text-2xl font-bold text-emerald-700">642</span><span className="text-sm text-emerald-600">Calories</span></div>
                <div><span className="block text-2xl font-bold text-emerald-700">43g</span><span className="text-sm text-emerald-600">Protein</span></div>
                <div><span className="block text-2xl font-bold text-emerald-700">80g</span><span className="text-sm text-emerald-600">Carbs</span></div>
                <div><span className="block text-2xl font-bold text-emerald-700">16g</span><span className="text-sm text-emerald-600">Fat</span></div>
              </div>
              <p className="text-sm text-emerald-700 mt-3">Macro split: 27% protein, 50% carbs, 23% fat — ideal for muscle building.</p>
            </div>
            <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
              <p className="text-sm text-gray-700"><strong>Pro tip:</strong> Weigh the rice dry, not cooked. 370g dry rice yields ~1,100g cooked, but the calories stay the same. Weighing cooked rice without knowing the dry amount leads to big errors.</p>
            </div>
          </div>

          {/* Example 2 */}
          <div className="mb-10">
            <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
              Example 2: High-Protein Overnight Oats
            </h3>
            <p className="text-gray-700 mb-4">
              Someone following a 2,000 calorie diet with 150g protein goal wants a quick breakfast that contributes 25%+ of their daily protein.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-600 mb-2"><strong>Recipe Ingredients:</strong></p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Rolled oats: ½ cup (40g)</li>
                <li>• Greek yogurt, 0% fat: ¾ cup (170g)</li>
                <li>• Protein powder (whey): 1 scoop (30g)</li>
                <li>• Chia seeds: 1 tbsp (12g)</li>
                <li>• Almond milk: ½ cup (120ml)</li>
                <li>• Blueberries: ½ cup (74g)</li>
                <li>• Peanut butter: 1 tbsp (16g)</li>
              </ul>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg mb-4">
              <p className="text-sm text-emerald-800 mb-2"><strong>Total Macros:</strong></p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                <div><span className="block text-2xl font-bold text-emerald-700">512</span><span className="text-sm text-emerald-600">Calories</span></div>
                <div><span className="block text-2xl font-bold text-emerald-700">42g</span><span className="text-sm text-emerald-600">Protein</span></div>
                <div><span className="block text-2xl font-bold text-emerald-700">52g</span><span className="text-sm text-emerald-600">Carbs</span></div>
                <div><span className="block text-2xl font-bold text-emerald-700">14g</span><span className="text-sm text-emerald-600">Fat</span></div>
                <div><span className="block text-2xl font-bold text-emerald-700">9g</span><span className="text-sm text-emerald-600">Fiber</span></div>
              </div>
              <p className="text-sm text-emerald-700 mt-3">28% of daily protein goal in one meal! Macro split: 33% protein, 41% carbs, 26% fat.</p>
            </div>
            <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
              <p className="text-sm text-gray-700"><strong>Pro tip:</strong> Greek yogurt varies wildly by brand. Fage 0% has 18g protein per cup; store brands may have only 12g. Check your specific brand's nutrition facts.</p>
            </div>
          </div>

          {/* Example 3 */}
          <div className="mb-10">
            <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
              Example 3: Keto Cauliflower Mac & Cheese (6 Servings)
            </h3>
            <p className="text-gray-700 mb-4">
              Someone on a ketogenic diet needs to verify this recipe keeps net carbs under 10g per serving while maintaining adequate fat.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-600 mb-2"><strong>Recipe Ingredients:</strong></p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Cauliflower florets: 2 lbs (908g)</li>
                <li>• Heavy cream: 1 cup (240g)</li>
                <li>• Cream cheese: 4 oz (113g)</li>
                <li>• Sharp cheddar, shredded: 2 cups (226g)</li>
                <li>• Butter: 2 tbsp (28g)</li>
                <li>• Garlic powder: 1 tsp (3g)</li>
                <li>• Servings: 6</li>
              </ul>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg mb-4">
              <p className="text-sm text-emerald-800 mb-2"><strong>Per Serving Results:</strong></p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                <div><span className="block text-2xl font-bold text-emerald-700">398</span><span className="text-sm text-emerald-600">Calories</span></div>
                <div><span className="block text-2xl font-bold text-emerald-700">14g</span><span className="text-sm text-emerald-600">Protein</span></div>
                <div><span className="block text-2xl font-bold text-emerald-700">9g</span><span className="text-sm text-emerald-600">Total Carbs</span></div>
                <div><span className="block text-2xl font-bold text-emerald-700">35g</span><span className="text-sm text-emerald-600">Fat</span></div>
                <div><span className="block text-2xl font-bold text-emerald-700">6g</span><span className="text-sm text-emerald-600">Net Carbs</span></div>
              </div>
              <p className="text-sm text-emerald-700 mt-3">Net carbs = 9g total - 3g fiber = 6g. Well within keto limits! Fat ratio: 79%.</p>
            </div>
            <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
              <p className="text-sm text-gray-700"><strong>Pro tip:</strong> For keto, always calculate net carbs (total carbs minus fiber). Cauliflower has 5g total carbs but 2g fiber per 100g, making it only 3g net carbs — a keto staple.</p>
            </div>
          </div>

          {/* Example 4 */}
          <div className="mb-10">
            <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
              Example 4: Restaurant vs. Homemade Pad Thai Comparison
            </h3>
            <p className="text-gray-700 mb-4">
              Comparing a typical restaurant portion to a carefully measured homemade version to understand the calorie difference.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-600 mb-2"><strong>Homemade Version (1 serving):</strong></p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Rice noodles, dry: 3 oz (85g)</li>
                <li>• Shrimp: 4 oz (113g)</li>
                <li>• Egg: 1 large (50g)</li>
                <li>• Bean sprouts: 1 cup (104g)</li>
                <li>• Vegetable oil: 1 tbsp (14g)</li>
                <li>• Fish sauce: 1 tbsp (18g)</li>
                <li>• Peanuts: 1 tbsp (8g)</li>
              </ul>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg mb-4">
              <p className="text-sm text-emerald-800 mb-2"><strong>Comparison:</strong></p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-emerald-200">
                      <th className="text-left py-2 pr-4 text-emerald-800">Version</th>
                      <th className="text-right py-2 pr-4 text-emerald-800">Calories</th>
                      <th className="text-right py-2 pr-4 text-emerald-800">Protein</th>
                      <th className="text-right py-2 pr-4 text-emerald-800">Carbs</th>
                      <th className="text-right py-2 text-emerald-800">Fat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-emerald-100">
                      <td className="py-2 pr-4 text-emerald-700">Homemade</td>
                      <td className="py-2 pr-4 text-right font-bold text-emerald-700">524</td>
                      <td className="py-2 pr-4 text-right text-emerald-700">32g</td>
                      <td className="py-2 pr-4 text-right text-emerald-700">62g</td>
                      <td className="py-2 text-right text-emerald-700">18g</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 text-emerald-700">Restaurant (typical)</td>
                      <td className="py-2 pr-4 text-right font-bold text-emerald-700">~940</td>
                      <td className="py-2 pr-4 text-right text-emerald-700">28g</td>
                      <td className="py-2 pr-4 text-right text-emerald-700">110g</td>
                      <td className="py-2 text-right text-emerald-700">42g</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-emerald-700 mt-3">Homemade saves 416 calories — almost 80% more in the restaurant version!</p>
            </div>
            <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
              <p className="text-sm text-gray-700"><strong>Pro tip:</strong> Restaurants use 3-4x more oil, larger noodle portions, and add sugar to sauces. When eating out, assume restaurant versions have 1.5-2x the calories of your home recipe.</p>
            </div>
          </div>

          {/* Example 5 */}
          <div className="mb-10">
            <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
              Example 5: Vegan Black Bean Tacos (Makes 8 Tacos)
            </h3>
            <p className="text-gray-700 mb-4">
              A vegan wants to ensure they're getting adequate protein from a plant-based dinner.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-600 mb-2"><strong>Recipe Ingredients:</strong></p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Black beans, cooked: 2 cups (344g)</li>
                <li>• Corn tortillas: 8 small (192g)</li>
                <li>• Avocado: 1 medium (150g)</li>
                <li>• Salsa: ½ cup (130g)</li>
                <li>• Nutritional yeast: 2 tbsp (8g)</li>
                <li>• Lime juice: 2 tbsp (30ml)</li>
                <li>• Cilantro: ¼ cup (4g)</li>
                <li>• Servings: 4 (2 tacos each)</li>
              </ul>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg mb-4">
              <p className="text-sm text-emerald-800 mb-2"><strong>Per Serving (2 Tacos):</strong></p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                <div><span className="block text-2xl font-bold text-emerald-700">342</span><span className="text-sm text-emerald-600">Calories</span></div>
                <div><span className="block text-2xl font-bold text-emerald-700">14g</span><span className="text-sm text-emerald-600">Protein</span></div>
                <div><span className="block text-2xl font-bold text-emerald-700">52g</span><span className="text-sm text-emerald-600">Carbs</span></div>
                <div><span className="block text-2xl font-bold text-emerald-700">11g</span><span className="text-sm text-emerald-600">Fat</span></div>
                <div><span className="block text-2xl font-bold text-emerald-700">14g</span><span className="text-sm text-emerald-600">Fiber</span></div>
              </div>
              <p className="text-sm text-emerald-700 mt-3">14g complete plant protein per serving from combining beans + corn. Net carbs: 38g.</p>
            </div>
            <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
              <p className="text-sm text-gray-700"><strong>Pro tip:</strong> Beans + corn = complete protein. Together they provide all essential amino acids. Add 2 tbsp nutritional yeast for an extra 8g protein plus B12.</p>
            </div>
          </div>

          {/* Example 6 */}
          <div className="mb-10">
            <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
              Example 6: Bulking Smoothie for Muscle Gain
            </h3>
            <p className="text-gray-700 mb-4">
              A skinny person trying to gain weight needs a high-calorie, nutrient-dense smoothie that's easy to consume.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-600 mb-2"><strong>Recipe Ingredients:</strong></p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Whole milk: 2 cups (490g)</li>
                <li>• Banana: 2 medium (236g)</li>
                <li>• Peanut butter: 3 tbsp (48g)</li>
                <li>• Whey protein: 1.5 scoops (45g)</li>
                <li>• Oats, rolled: ½ cup (40g)</li>
                <li>• Honey: 1 tbsp (21g)</li>
                <li>• Cocoa powder: 1 tbsp (5g)</li>
              </ul>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg mb-4">
              <p className="text-sm text-emerald-800 mb-2"><strong>Total Smoothie Macros:</strong></p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div><span className="block text-2xl font-bold text-emerald-700">1,124</span><span className="text-sm text-emerald-600">Calories</span></div>
                <div><span className="block text-2xl font-bold text-emerald-700">62g</span><span className="text-sm text-emerald-600">Protein</span></div>
                <div><span className="block text-2xl font-bold text-emerald-700">118g</span><span className="text-sm text-emerald-600">Carbs</span></div>
                <div><span className="block text-2xl font-bold text-emerald-700">46g</span><span className="text-sm text-emerald-600">Fat</span></div>
              </div>
              <p className="text-sm text-emerald-700 mt-3">1,124 calories in a single drinkable meal! That's ~35% of a 3,200 calorie bulking diet.</p>
            </div>
            <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
              <p className="text-sm text-gray-700"><strong>Pro tip:</strong> Liquid calories are easier to consume when you don't have a big appetite. Adding oats thickens the smoothie and adds 150 calories plus fiber without affecting taste much.</p>
            </div>
          </div>

          {/* Tips Section */}
          <div className="prose prose-lg mt-8">
            <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
              Tips for Accurate Macro Tracking
            </h3>
            <ul>
              <li><strong>Weigh ingredients raw, not cooked.</strong> USDA data for "chicken breast, raw" and "chicken breast, cooked" are different entries with different values per 100g.</li>
              <li><strong>Account for cooking oils.</strong> If you sauté vegetables in 2 tablespoons of olive oil, that oil is part of the recipe's macros. At 120 calories per tablespoon, cooking fats are often the sneakiest calorie source.</li>
              <li><strong>Liquids that evaporate don't lose calories.</strong> When you simmer a sauce and it reduces by half, the calories don't evaporate — they concentrate.</li>
              <li><strong>Choose the right USDA entry.</strong> "Chicken breast" might return 10+ results: raw, cooked, with skin, without skin. Pick the entry that matches your preparation.</li>
              <li><strong>Round to the nearest 5 calories.</strong> The USDA data itself has measurement uncertainty. Focus on consistent habits over false precision.</li>
              <li><strong>Measure oil by weight, not volume.</strong> A "tablespoon" can vary by 20% depending on how it's measured. 14g is always 14g.</li>
              <li><strong>Include marinades and sauces.</strong> That teriyaki glaze adds 50+ calories per serving. The ranch dressing adds 140 calories per 2 tbsp.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 md:py-12">
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
      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Related Calculators
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/recipe-cost-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Recipe Cost Calculator</h3>
              <p className="text-sm text-gray-600">Get the financial breakdown per serving</p>
            </Link>
            <Link
              href="/recipe-scaler"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Recipe Scaler</h3>
              <p className="text-sm text-gray-600">Scale up or down, then recalculate macros</p>
            </Link>
            <Link
              href="/cooking-measurement-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Measurement Converter</h3>
              <p className="text-sm text-gray-600">Convert grams, ounces, cups & more</p>
            </Link>
            <Link
              href="/bakers-percentage-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Baker's Percentage Calculator</h3>
              <p className="text-sm text-gray-600">Calculate flour ratios and hydration</p>
            </Link>
            <Link
              href="/butter-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Butter Converter</h3>
              <p className="text-sm text-gray-600">Convert sticks to grams for accurate fat tracking</p>
            </Link>
            <Link
              href="/meat-cooking-time-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Meat Cooking Calculator</h3>
              <p className="text-sm text-gray-600">Plan protein portions by weight</p>
            </Link>
            <Link
              href="/party-food-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Party Food Calculator</h3>
              <p className="text-sm text-gray-600">Scale recipes for large groups</p>
            </Link>
            <Link
              href="/pizza-dough-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Pizza Dough Calculator</h3>
              <p className="text-sm text-gray-600">Calculate dough macros by hydration</p>
            </Link>
            <Link
              href="/coffee-ratio-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Coffee Ratio Calculator</h3>
              <p className="text-sm text-gray-600">Track calories in coffee drinks</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Authority Sources Footer */}
      <section className="py-8 md:py-10 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-lg font-semibold text-gray-900 mb-4">
            Trusted Nutrition Sources
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Our nutritional data and recommendations are based on these authoritative sources:
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a
              href="https://fdc.nal.usda.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E8604C] hover:underline"
            >
              USDA FoodData Central
            </a>
            <a
              href="https://www.fda.gov/food/nutrition-facts-label/daily-value-nutrition-and-supplement-facts-labels"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E8604C] hover:underline"
            >
              FDA Daily Values
            </a>
            <a
              href="https://www.nal.usda.gov/programs/fnic"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E8604C] hover:underline"
            >
              USDA Food & Nutrition Information Center
            </a>
            <a
              href="https://www.health.harvard.edu/topics/nutrition"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E8604C] hover:underline"
            >
              Harvard Health Nutrition
            </a>
            <a
              href="https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E8604C] hover:underline"
            >
              Mayo Clinic Nutrition
            </a>
            <a
              href="https://examine.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E8604C] hover:underline"
            >
              Examine.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
