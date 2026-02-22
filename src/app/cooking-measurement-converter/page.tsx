import { Metadata } from "next";
import Link from "next/link";
import CookingMeasurementConverter from "@/components/calculators/CookingMeasurementConverter";
import { FAQPageJsonLd, WebApplicationJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Cooking Measurement Converter — Cups, Tablespoons, Grams, Ounces | CalcKitchen",
  description: "Convert between cups, tablespoons, teaspoons, grams, ounces, milliliters, quarts, and pints. Includes ingredient-specific conversions — because 1 cup of flour ≠ 1 cup of sugar in grams.",
  openGraph: {
    title: "Cooking Measurement Converter — Cups, Tablespoons, Grams, Ounces",
    description: "Convert between cups, tablespoons, teaspoons, grams, ounces, milliliters, quarts, and pints. Includes ingredient-specific conversions — because 1 cup of flour ≠ 1 cup of sugar in grams.",
    url: "https://calckitchen.com/cooking-measurement-converter",
    type: "website",
  },
  alternates: {
    canonical: "https://calckitchen.com/cooking-measurement-converter",
  },
};

const faqs = [
  {
    question: "How many ounces are in a cup?",
    answer: "A US cup contains 8 fluid ounces (volume). However, 8 fluid ounces of a given ingredient doesn't necessarily weigh 8 ounces. A cup of water weighs about 8.35 ounces, a cup of flour weighs about 4.25 ounces, and a cup of honey weighs about 12 ounces. This is why distinguishing between fluid ounces (volume) and weight ounces is important in cooking.",
  },
  {
    question: "How many tablespoons in a cup?",
    answer: "There are 16 tablespoons in 1 US cup. Each tablespoon is 3 teaspoons, so a cup also equals 48 teaspoons. For quick reference: ¼ cup = 4 tablespoons, ⅓ cup = 5⅓ tablespoons, and ½ cup = 8 tablespoons.",
  },
  {
    question: "How many cups in a quart?",
    answer: "There are 4 cups in 1 quart, 2 cups in 1 pint, and 16 cups in 1 gallon. One quart equals 32 fluid ounces or about 946 milliliters.",
  },
  {
    question: "How many teaspoons in a tablespoon?",
    answer: "There are 3 teaspoons in 1 US tablespoon. In Australia, 1 tablespoon = 4 teaspoons (20 ml instead of 15 ml), so be careful when following Australian recipes.",
  },
  {
    question: "Why does my cup of flour weigh different amounts on different days?",
    answer: "Humidity, packing method, and whether you've recently sifted the flour all affect the weight. On humid days, flour absorbs moisture and weighs more. This variability is the strongest argument for weighing ingredients with a kitchen scale instead of relying on volume measurements.",
  },
  {
    question: "Should I buy a kitchen scale?",
    answer: "If you bake regularly, absolutely. A basic digital kitchen scale costs $10–15 and eliminates the guesswork from every recipe. It also makes cleanup easier — you can measure everything directly into the mixing bowl instead of dirtying multiple measuring cups. For cooking (soups, sauces, stir-fries), cup measurements are usually precise enough.",
  },
  {
    question: "What's the difference between dry and liquid measuring cups?",
    answer: "Liquid measuring cups (glass with a pour spout) are designed to be filled to a line below the rim, so you can carry it without spilling. Dry measuring cups are filled to the brim and leveled off. Using the wrong type can give you slightly more or less of an ingredient. For most cooking, the difference is negligible — but for baking, use the right cup for the right ingredient.",
  },
  {
    question: "How do I convert grams to cups?",
    answer: "Divide the gram amount by the ingredient's grams-per-cup value. For example, to convert 300 grams of sugar to cups: 300 ÷ 200 = 1.5 cups. You can't do this conversion without knowing the specific ingredient because every ingredient has a different density.",
  },
  {
    question: "Why do European recipes use grams while American recipes use cups?",
    answer: "Historical convention. American home cooking developed with standardized cup measures in the late 1800s, while European cooking aligned with the metric system. Professional bakeries worldwide use weight measurements because they're more precise and scalable. Many American bakers now prefer grams for consistency.",
  },
  {
    question: "How do I measure sticky ingredients like honey or peanut butter?",
    answer: "Spray your measuring cup or spoon with cooking spray first — the ingredient will slide right out. For weight measurements, place your bowl on a scale, tare it, then add the sticky ingredient directly. This is one of the strongest arguments for weighing rather than measuring by volume.",
  },
  {
    question: "What is the 'spoon and level' method for measuring flour?",
    answer: "Use a spoon to lightly scoop flour into a dry measuring cup (don't pack it down), then level off the top with a straight edge like a knife. Scooping the cup directly into the flour bag compacts it, giving you up to 30% more flour than intended — enough to make cookies dense or cake dry.",
  },
  {
    question: "How accurate are the gram weights in conversion charts?",
    answer: "Most charts (including ours) use average values based on the 'spoon and level' method. Real-world variance is typically ±5-10% depending on humidity, ingredient brand, and measuring technique. For baking where precision matters, always use a scale and weigh directly rather than relying on conversions.",
  },
];

export default function CookingMeasurementConverterPage() {
  return (
    <div className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Cooking Measurement Converter"
        description="Convert between cups, tablespoons, teaspoons, grams, ounces, and milliliters. Includes ingredient-specific weight conversions for accurate baking."
        url="https://calckitchen.com/cooking-measurement-converter"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Cooking Measurement Converter", url: "https://calckitchen.com/cooking-measurement-converter" },
        ]}
      />

      {/* Hero Section with Calculator */}
      <section className="bg-gradient-to-b from-warm-white to-white py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Kitchen Measurement Converter
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Convert between cups, tablespoons, teaspoons, grams, ounces, and milliliters. Switch to Ingredient Mode for weight conversions that account for density — because 1 cup of flour doesn't weigh the same as 1 cup of sugar.
          </p>

          {/* Calculator Component */}
          <CookingMeasurementConverter />
        </div>
      </section>

      {/* Content Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl prose prose-lg">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            Why Cooking Measurements Are More Complicated Than They Look
          </h2>
          <p>
            Ask a baker how much a cup of flour weighs and you'll get a different answer depending on how they scoop it. Ask Google to convert 1 cup to grams and you'll get 236.59 — which is only correct for water.
          </p>
          <p>
            That's the problem with every basic measurement converter online. They treat cups as a universal volume unit and spit out a single gram value. But cooking isn't chemistry lab work with standardized liquids. A cup of all-purpose flour weighs around 120 to 130 grams. A cup of granulated sugar? About 200 grams. A cup of honey weighs roughly 340 grams. Same cup, wildly different weights.
          </p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Quick-Reference: US Volume Conversions
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Measurement</th>
                  <th className="text-left py-2 pr-4">Equivalent</th>
                  <th className="text-left py-2">Metric</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">1 teaspoon</td>
                  <td className="py-2 pr-4">⅓ tablespoon · ⅙ fl oz</td>
                  <td className="py-2">5 ml</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">1 tablespoon</td>
                  <td className="py-2 pr-4">3 teaspoons · 0.5 fl oz</td>
                  <td className="py-2">15 ml</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">1 fluid ounce</td>
                  <td className="py-2 pr-4">2 tablespoons · 6 teaspoons</td>
                  <td className="py-2">30 ml</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">¼ cup</td>
                  <td className="py-2 pr-4">4 tablespoons · 2 fl oz</td>
                  <td className="py-2">59 ml</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">⅓ cup</td>
                  <td className="py-2 pr-4">5⅓ tablespoons · 2.67 fl oz</td>
                  <td className="py-2">79 ml</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">½ cup</td>
                  <td className="py-2 pr-4">8 tablespoons · 4 fl oz</td>
                  <td className="py-2">118 ml</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">⅔ cup</td>
                  <td className="py-2 pr-4">10⅔ tablespoons · 5.33 fl oz</td>
                  <td className="py-2">158 ml</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">¾ cup</td>
                  <td className="py-2 pr-4">12 tablespoons · 6 fl oz</td>
                  <td className="py-2">177 ml</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">1 cup</td>
                  <td className="py-2 pr-4">16 tablespoons · 8 fl oz</td>
                  <td className="py-2">237 ml</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">1 pint</td>
                  <td className="py-2 pr-4">2 cups · 16 fl oz</td>
                  <td className="py-2">473 ml</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">1 quart</td>
                  <td className="py-2 pr-4">4 cups · 2 pints · 32 fl oz</td>
                  <td className="py-2">946 ml</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">1 gallon</td>
                  <td className="py-2 pr-4">4 quarts · 16 cups · 128 fl oz</td>
                  <td className="py-2">3.79 L</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">1 liter</td>
                  <td className="py-2 pr-4">4.23 cups · 33.8 fl oz</td>
                  <td className="py-2">1,000 ml</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Real-World Examples Section */}
      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Real-World Conversion Examples
          </h2>
          <p className="text-gray-700 mb-8">
            See how cooks use measurement conversions in everyday kitchen situations — from translating European recipes to scaling American baking favorites.
          </p>

          {/* Example 1 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Converting a European Bread Recipe to US Measurements</h3>
                <p className="text-gray-600 mb-4">
                  You found a French baguette recipe online that calls for 500g flour, 350g water, 10g salt, and 3g yeast. Your American measuring cups are all you have.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Recipe in grams:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• All-purpose flour: 500g</li>
                    <li>• Water: 350g</li>
                    <li>• Salt: 10g</li>
                    <li>• Instant yeast: 3g</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Converted to US volume:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• <strong>Flour:</strong> 500g ÷ 120g = 4⅙ cups (about 4 cups + 2 tbsp)</li>
                    <li>• <strong>Water:</strong> 350g ÷ 237g = 1½ cups (approximately)</li>
                    <li>• <strong>Salt:</strong> 10g ÷ 6g = 1⅔ teaspoons</li>
                    <li>• <strong>Yeast:</strong> 3g ≈ 1 teaspoon</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700"><strong>Pro tip:</strong> For bread, weight measurements matter more than most baking. If possible, borrow or buy a kitchen scale — cups can give you 20-30% variation in flour, which changes the hydration ratio significantly.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 2 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Halving a Cookie Recipe with Odd Measurements</h3>
                <p className="text-gray-600 mb-4">
                  Your chocolate chip cookie recipe makes 48 cookies, but you only want 24. Some measurements like "⅓ cup" become tricky when halved.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Original recipe (partial):</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• ⅔ cup butter (softened)</li>
                    <li>• ¾ cup brown sugar</li>
                    <li>• ⅓ cup granulated sugar</li>
                    <li>• 2¼ cups flour</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Halved with tablespoon conversions:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• <strong>Butter:</strong> ⅔ cup ÷ 2 = ⅓ cup = 5⅓ tbsp</li>
                    <li>• <strong>Brown sugar:</strong> ¾ cup ÷ 2 = 6 tablespoons</li>
                    <li>• <strong>Granulated sugar:</strong> ⅓ cup ÷ 2 = 2 tbsp + 2 tsp</li>
                    <li>• <strong>Flour:</strong> 2¼ cups ÷ 2 = 1 cup + 2 tablespoons</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700"><strong>Pro tip:</strong> When halving recipes with eggs, one large egg ≈ 3 tablespoons. For half an egg, whisk the egg well and measure out 1½ tablespoons.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 3 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Following an Australian Recipe with Different Cup Sizes</h3>
                <p className="text-gray-600 mb-4">
                  You're making a pavlova from an Australian cookbook that calls for 1 cup caster sugar and 2 tablespoons cornstarch. Australian cups and tablespoons are different sizes than US measurements.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Australian measurements:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 1 Australian cup = 250 ml (vs US cup = 237 ml)</li>
                    <li>• 1 Australian tablespoon = 20 ml (vs US tablespoon = 15 ml)</li>
                    <li>• Recipe calls for: 1 cup caster sugar, 2 tbsp cornstarch</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Converted to US measurements:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• <strong>Caster sugar:</strong> 250 ml ÷ 237 ml = 1 cup + 1 tbsp US (or just use 1 cup — close enough)</li>
                    <li>• <strong>Cornstarch:</strong> 40 ml ÷ 15 ml = 2 tbsp + 2 tsp US</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700"><strong>Pro tip:</strong> For Australian recipes, add ~5% to cup measurements and ~33% to tablespoon measurements. The tablespoon difference is significant; ignore it and your baking ratios will be off.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 4 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">4</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Converting Weight to Volume for Grocery Shopping</h3>
                <p className="text-gray-600 mb-4">
                  Your sourdough recipe requires 500g bread flour and 100g whole wheat flour. You're at the store looking at 5-pound bags. How much do you need to buy?
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Recipe requirements:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Bread flour: 500g</li>
                    <li>• Whole wheat flour: 100g</li>
                    <li>• Store sells: 5 lb bags (2,268g)</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Conversion for shopping:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• <strong>Bread flour:</strong> 500g = 1.1 lbs = about 3⅔ cups</li>
                    <li>• <strong>Whole wheat flour:</strong> 100g = 0.22 lbs = about ¾ cup</li>
                    <li>• <strong>Total flour needed:</strong> 600g = 1.32 lbs</li>
                    <li>• <strong>5 lb bag contains:</strong> 2,268g (enough for ~4 batches)</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700"><strong>Pro tip:</strong> Store flour at room temperature for up to 6 months, or freeze for up to a year. Buying in bulk makes sense if you bake regularly — a 5 lb bag is typically 30% cheaper per ounce than a 2 lb bag.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 5 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">5</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Scaling a Cocktail Recipe for a Pitcher</h3>
                <p className="text-gray-600 mb-4">
                  Your margarita recipe makes one cocktail: 2 oz tequila, 1 oz lime juice, ¾ oz triple sec. You need to make a pitcher for 8 people and want to use cups for easier measuring.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Single cocktail recipe:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Tequila: 2 fl oz</li>
                    <li>• Fresh lime juice: 1 fl oz</li>
                    <li>• Triple sec: ¾ fl oz</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Scaled to 8 servings (in cups):</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• <strong>Tequila:</strong> 2 oz × 8 = 16 oz = 2 cups</li>
                    <li>• <strong>Lime juice:</strong> 1 oz × 8 = 8 oz = 1 cup</li>
                    <li>• <strong>Triple sec:</strong> ¾ oz × 8 = 6 oz = ¾ cup</li>
                    <li>• <strong>Total pitcher volume:</strong> 30 oz = 3¾ cups (before ice)</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700"><strong>Pro tip:</strong> For batch cocktails, add ice to the pitcher just before serving to prevent over-dilution. Each drink will also need ice in the glass — the pitcher ice is for chilling, not serving.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 6 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">6</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Converting Butter Measurements Across Formats</h3>
                <p className="text-gray-600 mb-4">
                  Your pie crust recipe calls for 14 tablespoons of cold butter. You have butter sticks, but the recipe from your British grandmother lists it in grams. How much is 14 tablespoons?
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Recipe calls for:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 14 tablespoons cold butter</li>
                    <li>• US butter stick = 8 tablespoons = ½ cup = 113g</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Converted across formats:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• <strong>In sticks:</strong> 14 tbsp ÷ 8 = 1¾ sticks</li>
                    <li>• <strong>In cups:</strong> 14 tbsp ÷ 16 = ⅞ cup</li>
                    <li>• <strong>In grams:</strong> 14 × 14g = 196g (about 200g)</li>
                    <li>• <strong>In ounces:</strong> 196g ÷ 28.35 = 7 oz</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700"><strong>Pro tip:</strong> For pie crust, butter temperature matters more than precise measurement. Use butter cold enough that you can see chunks in the dough — they create the flaky layers as they melt in the oven. Use our <Link href="/butter-converter" className="text-coral hover:underline">butter converter</Link> for more conversions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ingredient Tables Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl prose prose-lg">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            Ingredient-Specific Conversion Database
          </h2>
          <p>
            Every ingredient below has been measured using the "spoon and level" method — lightly spooning the ingredient into the cup and leveling off the top with a straight edge. Weights can vary 5-10% depending on humidity and packing.
          </p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Flours & Starches
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Ingredient</th>
                  <th className="text-center py-2 pr-4">1 Cup (grams)</th>
                  <th className="text-center py-2 pr-4">1 Tablespoon</th>
                  <th className="text-center py-2">Cups per 1 lb</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">All-purpose flour</td>
                  <td className="py-2 pr-4 text-center">120g</td>
                  <td className="py-2 pr-4 text-center">8g</td>
                  <td className="py-2 text-center">3.8 cups</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Bread flour</td>
                  <td className="py-2 pr-4 text-center">130g</td>
                  <td className="py-2 pr-4 text-center">8g</td>
                  <td className="py-2 text-center">3.5 cups</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Cake flour</td>
                  <td className="py-2 pr-4 text-center">114g</td>
                  <td className="py-2 pr-4 text-center">7g</td>
                  <td className="py-2 text-center">4.0 cups</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Pastry flour</td>
                  <td className="py-2 pr-4 text-center">106g</td>
                  <td className="py-2 pr-4 text-center">7g</td>
                  <td className="py-2 text-center">4.3 cups</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Whole wheat flour</td>
                  <td className="py-2 pr-4 text-center">128g</td>
                  <td className="py-2 pr-4 text-center">8g</td>
                  <td className="py-2 text-center">3.5 cups</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Rye flour</td>
                  <td className="py-2 pr-4 text-center">102g</td>
                  <td className="py-2 pr-4 text-center">6g</td>
                  <td className="py-2 text-center">4.4 cups</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Almond flour</td>
                  <td className="py-2 pr-4 text-center">96g</td>
                  <td className="py-2 pr-4 text-center">6g</td>
                  <td className="py-2 text-center">4.7 cups</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Coconut flour</td>
                  <td className="py-2 pr-4 text-center">112g</td>
                  <td className="py-2 pr-4 text-center">7g</td>
                  <td className="py-2 text-center">4.0 cups</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Oat flour</td>
                  <td className="py-2 pr-4 text-center">92g</td>
                  <td className="py-2 pr-4 text-center">6g</td>
                  <td className="py-2 text-center">4.9 cups</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Cornstarch</td>
                  <td className="py-2 pr-4 text-center">128g</td>
                  <td className="py-2 pr-4 text-center">8g</td>
                  <td className="py-2 text-center">3.5 cups</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Tapioca starch</td>
                  <td className="py-2 pr-4 text-center">120g</td>
                  <td className="py-2 pr-4 text-center">8g</td>
                  <td className="py-2 text-center">3.8 cups</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Semolina</td>
                  <td className="py-2 pr-4 text-center">167g</td>
                  <td className="py-2 pr-4 text-center">10g</td>
                  <td className="py-2 text-center">2.7 cups</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Sugars & Sweeteners
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Ingredient</th>
                  <th className="text-center py-2 pr-4">1 Cup (grams)</th>
                  <th className="text-center py-2 pr-4">1 Tablespoon</th>
                  <th className="text-center py-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Granulated sugar</td>
                  <td className="py-2 pr-4 text-center">200g</td>
                  <td className="py-2 pr-4 text-center">12.5g</td>
                  <td className="py-2 text-center">Standard white sugar</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Brown sugar (packed)</td>
                  <td className="py-2 pr-4 text-center">220g</td>
                  <td className="py-2 pr-4 text-center">14g</td>
                  <td className="py-2 text-center">Press firmly into cup</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Brown sugar (loose)</td>
                  <td className="py-2 pr-4 text-center">145g</td>
                  <td className="py-2 pr-4 text-center">9g</td>
                  <td className="py-2 text-center">Spooned, not packed</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Powdered/confectioners' sugar</td>
                  <td className="py-2 pr-4 text-center">120g</td>
                  <td className="py-2 pr-4 text-center">8g</td>
                  <td className="py-2 text-center">Sifted, spooned</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Caster/superfine sugar</td>
                  <td className="py-2 pr-4 text-center">225g</td>
                  <td className="py-2 pr-4 text-center">14g</td>
                  <td className="py-2 text-center">Finer grind than granulated</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Turbinado/raw sugar</td>
                  <td className="py-2 pr-4 text-center">180g</td>
                  <td className="py-2 pr-4 text-center">11g</td>
                  <td className="py-2 text-center">Coarse crystals</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Honey</td>
                  <td className="py-2 pr-4 text-center">340g</td>
                  <td className="py-2 pr-4 text-center">21g</td>
                  <td className="py-2 text-center">Very dense</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Maple syrup</td>
                  <td className="py-2 pr-4 text-center">312g</td>
                  <td className="py-2 pr-4 text-center">20g</td>
                  <td className="py-2 text-center">Grade A or B</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Corn syrup</td>
                  <td className="py-2 pr-4 text-center">328g</td>
                  <td className="py-2 pr-4 text-center">21g</td>
                  <td className="py-2 text-center">Light or dark</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Molasses</td>
                  <td className="py-2 pr-4 text-center">340g</td>
                  <td className="py-2 pr-4 text-center">21g</td>
                  <td className="py-2 text-center">Unsulphured</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Fats & Oils
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Ingredient</th>
                  <th className="text-center py-2 pr-4">1 Cup (grams)</th>
                  <th className="text-center py-2 pr-4">1 Tablespoon</th>
                  <th className="text-center py-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Butter</td>
                  <td className="py-2 pr-4 text-center">227g</td>
                  <td className="py-2 pr-4 text-center">14g</td>
                  <td className="py-2 text-center">2 sticks = 1 cup</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Vegetable oil</td>
                  <td className="py-2 pr-4 text-center">224g</td>
                  <td className="py-2 pr-4 text-center">14g</td>
                  <td className="py-2 text-center">Canola, sunflower, etc.</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Olive oil</td>
                  <td className="py-2 pr-4 text-center">216g</td>
                  <td className="py-2 pr-4 text-center">13.5g</td>
                  <td className="py-2 text-center">Slightly lighter</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Coconut oil (solid)</td>
                  <td className="py-2 pr-4 text-center">218g</td>
                  <td className="py-2 pr-4 text-center">14g</td>
                  <td className="py-2 text-center">Pack like shortening</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Coconut oil (melted)</td>
                  <td className="py-2 pr-4 text-center">224g</td>
                  <td className="py-2 pr-4 text-center">14g</td>
                  <td className="py-2 text-center">Measure as liquid</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Shortening</td>
                  <td className="py-2 pr-4 text-center">205g</td>
                  <td className="py-2 pr-4 text-center">13g</td>
                  <td className="py-2 text-center">Crisco-style</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Lard</td>
                  <td className="py-2 pr-4 text-center">205g</td>
                  <td className="py-2 pr-4 text-center">13g</td>
                  <td className="py-2 text-center">Rendered pork fat</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Dairy Products
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Ingredient</th>
                  <th className="text-center py-2 pr-4">1 Cup (grams)</th>
                  <th className="text-center py-2 pr-4">1 Tablespoon</th>
                  <th className="text-center py-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Milk (whole)</td>
                  <td className="py-2 pr-4 text-center">244g</td>
                  <td className="py-2 pr-4 text-center">15g</td>
                  <td className="py-2 text-center">≈ same as water</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Heavy cream</td>
                  <td className="py-2 pr-4 text-center">238g</td>
                  <td className="py-2 pr-4 text-center">15g</td>
                  <td className="py-2 text-center">36% fat</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Sour cream</td>
                  <td className="py-2 pr-4 text-center">230g</td>
                  <td className="py-2 pr-4 text-center">14g</td>
                  <td className="py-2 text-center">Full fat</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Greek yogurt</td>
                  <td className="py-2 pr-4 text-center">245g</td>
                  <td className="py-2 pr-4 text-center">15g</td>
                  <td className="py-2 text-center">Full fat</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Cream cheese</td>
                  <td className="py-2 pr-4 text-center">232g</td>
                  <td className="py-2 pr-4 text-center">14.5g</td>
                  <td className="py-2 text-center">Softened</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Ricotta cheese</td>
                  <td className="py-2 pr-4 text-center">246g</td>
                  <td className="py-2 pr-4 text-center">15g</td>
                  <td className="py-2 text-center">Whole milk</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Parmesan (grated)</td>
                  <td className="py-2 pr-4 text-center">100g</td>
                  <td className="py-2 pr-4 text-center">6g</td>
                  <td className="py-2 text-center">Finely grated</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Cheddar (shredded)</td>
                  <td className="py-2 pr-4 text-center">113g</td>
                  <td className="py-2 pr-4 text-center">7g</td>
                  <td className="py-2 text-center">Loosely packed</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Nuts, Seeds & Dried Fruit
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Ingredient</th>
                  <th className="text-center py-2 pr-4">1 Cup (grams)</th>
                  <th className="text-center py-2 pr-4">Form</th>
                  <th className="text-center py-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Almonds</td>
                  <td className="py-2 pr-4 text-center">145g</td>
                  <td className="py-2 pr-4 text-center">Whole</td>
                  <td className="py-2 text-center">Sliced = 92g</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Walnuts</td>
                  <td className="py-2 pr-4 text-center">117g</td>
                  <td className="py-2 pr-4 text-center">Halves</td>
                  <td className="py-2 text-center">Chopped = 120g</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Pecans</td>
                  <td className="py-2 pr-4 text-center">109g</td>
                  <td className="py-2 pr-4 text-center">Halves</td>
                  <td className="py-2 text-center">Chopped = 114g</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Peanuts</td>
                  <td className="py-2 pr-4 text-center">146g</td>
                  <td className="py-2 pr-4 text-center">Whole</td>
                  <td className="py-2 text-center">Dry roasted</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Peanut butter</td>
                  <td className="py-2 pr-4 text-center">258g</td>
                  <td className="py-2 pr-4 text-center">Smooth</td>
                  <td className="py-2 text-center">1 tbsp = 16g</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Sunflower seeds</td>
                  <td className="py-2 pr-4 text-center">140g</td>
                  <td className="py-2 pr-4 text-center">Hulled</td>
                  <td className="py-2 text-center">Raw</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Raisins</td>
                  <td className="py-2 pr-4 text-center">165g</td>
                  <td className="py-2 pr-4 text-center">Packed</td>
                  <td className="py-2 text-center">Thompson seedless</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Dried cranberries</td>
                  <td className="py-2 pr-4 text-center">120g</td>
                  <td className="py-2 pr-4 text-center">Packed</td>
                  <td className="py-2 text-center">Sweetened</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Chocolate chips</td>
                  <td className="py-2 pr-4 text-center">170g</td>
                  <td className="py-2 pr-4 text-center">Standard</td>
                  <td className="py-2 text-center">Semi-sweet</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Common Baking Ingredients
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Ingredient</th>
                  <th className="text-center py-2 pr-4">1 Cup (grams)</th>
                  <th className="text-center py-2 pr-4">1 Tablespoon</th>
                  <th className="text-center py-2">1 Teaspoon</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Baking powder</td>
                  <td className="py-2 pr-4 text-center">230g</td>
                  <td className="py-2 pr-4 text-center">14g</td>
                  <td className="py-2 text-center">4.6g</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Baking soda</td>
                  <td className="py-2 pr-4 text-center">288g</td>
                  <td className="py-2 pr-4 text-center">18g</td>
                  <td className="py-2 text-center">6g</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Salt (table)</td>
                  <td className="py-2 pr-4 text-center">292g</td>
                  <td className="py-2 pr-4 text-center">18g</td>
                  <td className="py-2 text-center">6g</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Salt (kosher - Morton)</td>
                  <td className="py-2 pr-4 text-center">241g</td>
                  <td className="py-2 pr-4 text-center">15g</td>
                  <td className="py-2 text-center">5g</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Salt (kosher - Diamond)</td>
                  <td className="py-2 pr-4 text-center">142g</td>
                  <td className="py-2 pr-4 text-center">9g</td>
                  <td className="py-2 text-center">3g</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Cocoa powder</td>
                  <td className="py-2 pr-4 text-center">85g</td>
                  <td className="py-2 pr-4 text-center">5g</td>
                  <td className="py-2 text-center">1.7g</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Instant yeast</td>
                  <td className="py-2 pr-4 text-center">150g</td>
                  <td className="py-2 pr-4 text-center">9g</td>
                  <td className="py-2 text-center">3g</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Rolled oats</td>
                  <td className="py-2 pr-4 text-center">80g</td>
                  <td className="py-2 pr-4 text-center">5g</td>
                  <td className="py-2 text-center">—</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            US vs. UK vs. Australian Measurements
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Recipe origin matters. A cup in Australia is 6% larger than a US cup, and an Australian tablespoon is 33% larger. For baking, this difference is significant.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Country</th>
                  <th className="text-center py-2 pr-4">Cup Size</th>
                  <th className="text-center py-2 pr-4">Tablespoon</th>
                  <th className="text-center py-2">Teaspoon</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">United States</td>
                  <td className="py-2 pr-4 text-center">237 ml (8 fl oz)</td>
                  <td className="py-2 pr-4 text-center">15 ml (3 tsp)</td>
                  <td className="py-2 text-center">5 ml</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">United Kingdom</td>
                  <td className="py-2 pr-4 text-center">284 ml (10 fl oz)</td>
                  <td className="py-2 pr-4 text-center">15 ml (3 tsp)</td>
                  <td className="py-2 text-center">5 ml</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Australia</td>
                  <td className="py-2 pr-4 text-center">250 ml (8.5 fl oz)</td>
                  <td className="py-2 pr-4 text-center">20 ml (4 tsp)</td>
                  <td className="py-2 text-center">5 ml</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Canada</td>
                  <td className="py-2 pr-4 text-center">250 ml (8.5 fl oz)</td>
                  <td className="py-2 pr-4 text-center">15 ml (3 tsp)</td>
                  <td className="py-2 text-center">5 ml</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Japan</td>
                  <td className="py-2 pr-4 text-center">200 ml (6.8 fl oz)</td>
                  <td className="py-2 pr-4 text-center">15 ml (3 tsp)</td>
                  <td className="py-2 text-center">5 ml</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Metric (standard)</td>
                  <td className="py-2 pr-4 text-center">250 ml</td>
                  <td className="py-2 pr-4 text-center">15 ml</td>
                  <td className="py-2 text-center">5 ml</td>
                </tr>
              </tbody>
            </table>
          </div>
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
              href="/recipe-scaler"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Recipe Scaler</h3>
              <p className="text-sm text-gray-600">Double, halve, or resize any recipe with automatic conversions</p>
            </Link>
            <Link
              href="/butter-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Butter Converter</h3>
              <p className="text-sm text-gray-600">Convert sticks, cups, grams & tablespoons for butter</p>
            </Link>
            <Link
              href="/bakers-percentage-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Baker's Percentage Calculator</h3>
              <p className="text-sm text-gray-600">Calculate ingredient ratios for bread baking</p>
            </Link>
            <Link
              href="/recipe-cost-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Recipe Cost Calculator</h3>
              <p className="text-sm text-gray-600">Calculate the cost per serving of any recipe</p>
            </Link>
            <Link
              href="/pizza-dough-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Pizza Dough Calculator</h3>
              <p className="text-sm text-gray-600">Get precise measurements for pizza dough</p>
            </Link>
            <Link
              href="/sourdough-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Sourdough Calculator</h3>
              <p className="text-sm text-gray-600">Calculate hydration and starter ratios</p>
            </Link>
            <Link
              href="/cake-pan-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Cake Pan Converter</h3>
              <p className="text-sm text-gray-600">Adapt recipes for different pan sizes</p>
            </Link>
            <Link
              href="/recipe-macro-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Recipe Macro Calculator</h3>
              <p className="text-sm text-gray-600">Calculate nutrition from ingredient weights</p>
            </Link>
            <Link
              href="/coffee-ratio-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Coffee Ratio Calculator</h3>
              <p className="text-sm text-gray-600">Get precise coffee-to-water ratios</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Authority Sources Footer */}
      <section className="py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-sm text-gray-500 text-center">
            Measurement data referenced from{" "}
            <a href="https://www.kingarthurbaking.com/learn/ingredient-weight-chart" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">King Arthur Baking</a>,{" "}
            <a href="https://www.seriouseats.com/how-to-measure-flour" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">Serious Eats</a>,{" "}
            <a href="https://www.cooksillustrated.com/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">Cook's Illustrated</a>, and{" "}
            <a href="https://fdc.nal.usda.gov/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">USDA FoodData Central</a>
          </p>
        </div>
      </section>
    </div>
  );
}
