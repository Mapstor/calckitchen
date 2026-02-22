import { Metadata } from "next";
import Link from "next/link";
import BakersPercentageCalculator from "@/components/calculators/BakersPercentageCalculator";
import { FAQPageJsonLd, WebApplicationJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Baker's Percentage Calculator — Convert Between Weights & Percentages | CalcKitchen",
  description: "Calculate baker's percentages for any bread or dough recipe. Convert between weights and percentages, scale recipes, and understand hydration. Essential for serious bakers.",
  openGraph: {
    title: "Baker's Percentage Calculator — Convert Between Weights & Percentages",
    description: "Calculate baker's percentages for any bread or dough recipe. Convert between weights and percentages, scale recipes, and understand hydration. Essential for serious bakers.",
    url: "https://calckitchen.com/bakers-percentage-calculator",
    type: "website",
  },
  alternates: {
    canonical: "https://calckitchen.com/bakers-percentage-calculator",
  },
};

const faqs = [
  {
    question: "What is baker's percentage?",
    answer: "Baker's percentage (also called baker's math) expresses each ingredient as a percentage of the total flour weight. Flour is ALWAYS 100%. If a recipe has 500g flour and 325g water, the water is 65% (325÷500×100). This system makes recipes infinitely scalable and comparable across different batch sizes.",
  },
  {
    question: "Why don't baker's percentages add up to 100%?",
    answer: "Because flour is always 100% — it's the reference point, not a portion of the whole. A simple bread might be 100% flour + 65% water + 2% salt + 1% yeast = 168% total. This doesn't mean you have 168 units of something — it means for every 100 parts of flour, you have 68 parts of other ingredients. Think of it as 'parts per 100 parts flour.'",
  },
  {
    question: "How do I calculate hydration percentage?",
    answer: "Hydration = (Total water weight ÷ Total flour weight) × 100. Include ALL water: water in the recipe, water in the starter/levain, water in milk (milk is ~87% water), water in eggs (~75% water). If you have 100g flour + 65g water + 20g levain at 100% hydration (10g flour + 10g water in the levain), true hydration = (65+10)÷(100+10) = 68.2%.",
  },
  {
    question: "What is a good hydration percentage for bread?",
    answer: "It depends on the bread type and your skill level: 55-60%: Bagels, pretzels (stiff, easy to shape). 60-65%: Sandwich bread, beginners (manageable). 65-70%: Artisan bread, country loaves. 70-75%: Sourdough, baguettes (sticky, needs practice). 75-85%: Ciabatta, focaccia (very wet, advanced). Start lower and increase as you gain experience.",
  },
  {
    question: "How do I convert a regular recipe to baker's percentages?",
    answer: "1) Weigh all ingredients in grams. 2) Find the total flour weight. 3) For each ingredient: (ingredient weight ÷ flour weight) × 100 = percentage. Example: 500g flour, 325g water, 10g salt, 5g yeast → Flour: 100%, Water: 65%, Salt: 2%, Yeast: 1%.",
  },
  {
    question: "Do baker's percentages work for pastry and cakes?",
    answer: "They can, but they're less common. Baker's percentages were designed for bread where flour dominates. In pastry and cakes, butter and eggs often outweigh flour, making percentages less intuitive. Some pastry chefs use them, especially for doughs (pie crust, puff pastry, croissants). For cakes, traditional ratios (pound cake = equal parts) are often clearer.",
  },
  {
    question: "What is inoculation percentage in sourdough?",
    answer: "Inoculation is the percentage of starter/levain relative to total flour. If you use 100g levain in a recipe with 500g flour (and the levain is 100% hydration, so it contains 50g flour), inoculation = levain amount ÷ total flour = 100÷500 = 20%. Higher inoculation (20-30%) = faster fermentation. Lower (10-15%) = slower, more flavor development.",
  },
  {
    question: "How do I account for flour in my starter when calculating total hydration?",
    answer: "You must include both the flour AND water from your starter in the total calculations. For a 100% hydration starter, it's 50% flour and 50% water. If using 100g of 100% hydration starter, that's 50g flour and 50g water to add to your totals. For a 80% hydration starter, 100g contains 55.5g flour and 44.5g water. This gives you accurate true hydration.",
  },
  {
    question: "What's the difference between preferment percentage and inoculation?",
    answer: "Preferment percentage is the amount of prefermented dough (poolish, biga, pâte fermentée) relative to total flour. Inoculation typically refers specifically to sourdough starter. Both affect fermentation speed and flavor. A 30% poolish means 30% of your flour was pre-fermented with commercial yeast. A 20% inoculation means you used starter equal to 20% of your final flour weight.",
  },
  {
    question: "How does altitude affect baker's percentages?",
    answer: "Altitude doesn't change the percentages themselves, but it affects how you might adjust them. At high altitude (5,000+ ft), reduce yeast by 25% (1% becomes 0.75%), increase hydration by 2-4% to compensate for faster moisture loss, and reduce sugar if using. The formulas stay the same—you're just targeting different optimal percentages for your conditions.",
  },
  {
    question: "Can I use baker's percentages with whole grain flours?",
    answer: "Yes, but whole grain flours absorb more water. When substituting whole wheat for white flour, increase hydration by 5-10%. Rye absorbs even more. A formula might be 80% bread flour, 20% whole wheat, 70% water. If you switch to 100% whole wheat, you might need 75-80% hydration. The percentages still work—whole grains just have different absorption characteristics.",
  },
  {
    question: "How precise do my measurements need to be?",
    answer: "For salt and yeast, precision matters: 2% vs 2.5% salt is noticeable. Use a scale accurate to 0.1g for small quantities. For flour and water, +/-2% won't ruin your bread but will affect texture. Professional bakers aim for +/-0.5% accuracy. Never estimate salt or yeast—always weigh. For home bakers, a scale with 1g precision is adequate for flour/water, 0.1g for salt/yeast.",
  },
];

export default function BakersPercentageCalculatorPage() {
  return (
    <div className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Baker's Percentage Calculator"
        description="Calculate baker's percentages for bread and dough recipes. Convert between weights and percentages, calculate hydration, and scale recipes precisely."
        url="https://calckitchen.com/bakers-percentage-calculator"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Baker's Percentage Calculator", url: "https://calckitchen.com/bakers-percentage-calculator" },
        ]}
      />

      {/* Hero Section with Calculator */}
      <section className="bg-gradient-to-b from-warm-white to-white py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Baker&apos;s Percentage Calculator
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Master baker&apos;s math. Convert recipes to percentages, scale to any flour weight, or calculate hydration.
            Essential for bread bakers who want consistent, reproducible results every time.
          </p>

          {/* Calculator Component */}
          <BakersPercentageCalculator />
        </div>
      </section>

      {/* Real-World Examples Section */}
      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Real-World Baker&apos;s Percentage Examples
          </h2>
          <p className="text-gray-700 mb-8">
            See how professional bakers and home bread enthusiasts use baker&apos;s percentages to create
            perfect, scalable recipes.
          </p>

          {/* Example 1 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Converting a Family Recipe to Baker&apos;s Percentages</h3>
                <p className="text-gray-600 mb-4">
                  Your grandmother&apos;s bread recipe uses cups and tablespoons. You want to convert it to baker&apos;s
                  percentages so you can scale it precisely for any batch size.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Original Recipe (weighed):</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• All-purpose flour: 480g (4 cups)</li>
                    <li>• Water: 288g (1¼ cups)</li>
                    <li>• Milk: 60g (¼ cup)</li>
                    <li>• Butter: 28g (2 tbsp)</li>
                    <li>• Salt: 10g (2 tsp)</li>
                    <li>• Instant yeast: 7g (1 packet)</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Converted to Baker&apos;s Percentages:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• <strong>Flour:</strong> 100%</li>
                    <li>• <strong>Water:</strong> 60% (288 ÷ 480 × 100)</li>
                    <li>• <strong>Milk:</strong> 12.5% (60 ÷ 480 × 100)</li>
                    <li>• <strong>Butter:</strong> 5.8% (28 ÷ 480 × 100)</li>
                    <li>• <strong>Salt:</strong> 2.1% (10 ÷ 480 × 100)</li>
                    <li>• <strong>Yeast:</strong> 1.5% (7 ÷ 480 × 100)</li>
                    <li>• <strong>Total hydration:</strong> ~66% (water + milk water content)</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Now you can make this bread with any flour amount. For a smaller batch
                    with 300g flour, multiply each percentage by 3 to get your weights.
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
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Scaling a Sourdough Recipe for a Bakery</h3>
                <p className="text-gray-600 mb-4">
                  A home baker&apos;s sourdough recipe makes 2 loaves. A bakery needs to scale it to make 24 loaves.
                  Baker&apos;s percentages make this trivial.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Home Recipe Formula:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Bread flour: 100%</li>
                    <li>• Whole wheat flour: 10%</li>
                    <li>• Water: 72%</li>
                    <li>• Salt: 2%</li>
                    <li>• Levain (100% hydration): 20%</li>
                    <li>• Home batch: 500g total flour = 2 loaves (~900g each)</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Scaled for 24 Loaves (6000g flour):</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• <strong>Bread flour:</strong> 5455g (100% of 5455)</li>
                    <li>• <strong>Whole wheat:</strong> 545g (10%)</li>
                    <li>• <strong>Water:</strong> 4320g (72%)</li>
                    <li>• <strong>Salt:</strong> 120g (2%)</li>
                    <li>• <strong>Levain:</strong> 1200g (20%)</li>
                    <li>• <strong>Total dough:</strong> ~12.6kg</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> When scaling up significantly, reduce yeast/starter by 10-15% as larger
                    doughs ferment faster due to mass retention of heat. The bakery might use 18% levain instead of 20%.
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
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Adjusting Hydration for Different Flours</h3>
                <p className="text-gray-600 mb-4">
                  You have a 65% hydration white bread formula that works perfectly. You want to make a
                  50% whole wheat version but need to adjust hydration.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Original White Bread Formula:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Bread flour: 100%</li>
                    <li>• Water: 65%</li>
                    <li>• Salt: 2%</li>
                    <li>• Yeast: 1%</li>
                    <li>• Dough texture: smooth, slightly tacky</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Adjusted 50% Whole Wheat Formula:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• <strong>Bread flour:</strong> 50%</li>
                    <li>• <strong>Whole wheat flour:</strong> 50%</li>
                    <li>• <strong>Water:</strong> 72% (+7% for whole wheat absorption)</li>
                    <li>• <strong>Salt:</strong> 2%</li>
                    <li>• <strong>Yeast:</strong> 1%</li>
                    <li>• <strong>Result:</strong> Similar dough texture to original</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Whole wheat absorbs 5-10% more water than white flour. Rye absorbs
                    even more. When substituting, add water gradually until you match your target dough consistency.
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
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Calculating True Hydration with Levain</h3>
                <p className="text-gray-600 mb-4">
                  Your sourdough recipe shows 70% hydration, but you&apos;re using a levain that also contains
                  flour and water. What&apos;s the TRUE hydration?
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Recipe as Written:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Bread flour: 400g</li>
                    <li>• Water: 280g (shown as &quot;70%&quot;)</li>
                    <li>• Salt: 8g</li>
                    <li>• Levain at 100% hydration: 100g</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">True Hydration Calculation:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• <strong>Levain breakdown:</strong> 50g flour + 50g water (100% hydration)</li>
                    <li>• <strong>Total flour:</strong> 400g + 50g = 450g</li>
                    <li>• <strong>Total water:</strong> 280g + 50g = 330g</li>
                    <li>• <strong>True hydration:</strong> 330 ÷ 450 × 100 = <strong>73.3%</strong></li>
                    <li>• <strong>Difference:</strong> 3.3% higher than listed!</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Always calculate true hydration including levain contributions.
                    This is especially important when comparing recipes or troubleshooting a too-wet or too-dry dough.
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
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Creating a Pizza Dough Formula from Scratch</h3>
                <p className="text-gray-600 mb-4">
                  You want to develop a Neapolitan-style pizza dough. Start with standard percentages and
                  calculate exact weights for 4 pizza balls (250g each).
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Target Neapolitan Formula:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Tipo 00 flour: 100%</li>
                    <li>• Water: 60%</li>
                    <li>• Salt: 3%</li>
                    <li>• Fresh yeast: 0.2% (or 0.07% instant)</li>
                    <li>• Target: 4 x 250g dough balls = 1000g total dough</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Calculated Weights:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• <strong>Total percentage:</strong> 100 + 60 + 3 + 0.2 = 163.2%</li>
                    <li>• <strong>Flour weight:</strong> 1000g ÷ 1.632 = 613g</li>
                    <li>• <strong>Water:</strong> 613 × 0.60 = 368g</li>
                    <li>• <strong>Salt:</strong> 613 × 0.03 = 18g</li>
                    <li>• <strong>Fresh yeast:</strong> 613 × 0.002 = 1.2g</li>
                    <li>• <strong>Total:</strong> 1000g → 4 dough balls</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Neapolitan pizza uses 55-62% hydration for that chewy, foldable crust.
                    New York style goes to 63-65%. Roman style can be 75%+. Adjust hydration to your preferred style.
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
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Developing a Brioche Formula with High Fat</h3>
                <p className="text-gray-600 mb-4">
                  Brioche is an enriched dough where butter can exceed the weight of water. Baker&apos;s percentages
                  still work perfectly for these rich doughs.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Rich Brioche Formula:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Bread flour: 100%</li>
                    <li>• Eggs: 50% (eggs are ~75% water, ~12% fat)</li>
                    <li>• Butter: 50%</li>
                    <li>• Sugar: 12%</li>
                    <li>• Salt: 2%</li>
                    <li>• Milk: 10%</li>
                    <li>• Fresh yeast: 4%</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">For 500g Flour Batch:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• <strong>Flour:</strong> 500g</li>
                    <li>• <strong>Eggs:</strong> 250g (~5 large eggs)</li>
                    <li>• <strong>Butter:</strong> 250g (softened)</li>
                    <li>• <strong>Sugar:</strong> 60g</li>
                    <li>• <strong>Salt:</strong> 10g</li>
                    <li>• <strong>Milk:</strong> 50g</li>
                    <li>• <strong>Fresh yeast:</strong> 20g</li>
                    <li>• <strong>Total dough:</strong> ~1140g</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> For brioche, incorporate butter slowly after the dough has developed
                    gluten. The high fat percentage (50%+) makes this dough very rich and requires cold fermentation
                    for best handling.
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
            Understanding Baker&apos;s Percentages
          </h2>
          <p>
            Baker&apos;s percentage is the universal language of bread baking. It lets you scale recipes infinitely and
            compare formulas at a glance. Once you understand it, you&apos;ll never go back to cup measurements.
          </p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            The Core Concept
          </h3>
          <ul>
            <li><strong>Flour is always 100%</strong> — it&apos;s your reference point</li>
            <li><strong>Everything else is relative to flour</strong> — water, salt, yeast, etc.</li>
            <li><strong>Percentages can exceed 100%</strong> — they&apos;re &quot;parts per 100 parts flour&quot;</li>
            <li><strong>Total percentage tells dough consistency</strong> — higher = wetter</li>
          </ul>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Common Bread Formulas by Style
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Bread Type</th>
                  <th className="text-left py-2 pr-4">Flour</th>
                  <th className="text-left py-2 pr-4">Water</th>
                  <th className="text-left py-2 pr-4">Salt</th>
                  <th className="text-left py-2 pr-4">Yeast/Starter</th>
                  <th className="text-left py-2 pr-4">Fat/Oil</th>
                  <th className="text-left py-2">Skill Level</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Basic White Bread</td>
                  <td className="py-2 pr-4">100%</td>
                  <td className="py-2 pr-4">65%</td>
                  <td className="py-2 pr-4">2%</td>
                  <td className="py-2 pr-4">1% instant</td>
                  <td className="py-2 pr-4">0-3%</td>
                  <td className="py-2">Beginner</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Sandwich Loaf</td>
                  <td className="py-2 pr-4">100%</td>
                  <td className="py-2 pr-4">60-62%</td>
                  <td className="py-2 pr-4">2%</td>
                  <td className="py-2 pr-4">1% instant</td>
                  <td className="py-2 pr-4">5-7%</td>
                  <td className="py-2">Beginner</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Country Sourdough</td>
                  <td className="py-2 pr-4">100%</td>
                  <td className="py-2 pr-4">70-75%</td>
                  <td className="py-2 pr-4">2%</td>
                  <td className="py-2 pr-4">20% levain</td>
                  <td className="py-2 pr-4">0%</td>
                  <td className="py-2">Intermediate</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">French Baguette</td>
                  <td className="py-2 pr-4">100%</td>
                  <td className="py-2 pr-4">68-72%</td>
                  <td className="py-2 pr-4">2%</td>
                  <td className="py-2 pr-4">0.5% + poolish</td>
                  <td className="py-2 pr-4">0%</td>
                  <td className="py-2">Advanced</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Ciabatta</td>
                  <td className="py-2 pr-4">100%</td>
                  <td className="py-2 pr-4">75-85%</td>
                  <td className="py-2 pr-4">2%</td>
                  <td className="py-2 pr-4">0.7% + biga</td>
                  <td className="py-2 pr-4">3%</td>
                  <td className="py-2">Advanced</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Focaccia</td>
                  <td className="py-2 pr-4">100%</td>
                  <td className="py-2 pr-4">75-80%</td>
                  <td className="py-2 pr-4">2.5%</td>
                  <td className="py-2 pr-4">0.5% instant</td>
                  <td className="py-2 pr-4">10-15%</td>
                  <td className="py-2">Intermediate</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Bagels</td>
                  <td className="py-2 pr-4">100%</td>
                  <td className="py-2 pr-4">50-55%</td>
                  <td className="py-2 pr-4">2%</td>
                  <td className="py-2 pr-4">0.5% instant</td>
                  <td className="py-2 pr-4">0-2%</td>
                  <td className="py-2">Intermediate</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Brioche</td>
                  <td className="py-2 pr-4">100%</td>
                  <td className="py-2 pr-4">10-15%</td>
                  <td className="py-2 pr-4">2%</td>
                  <td className="py-2 pr-4">3-4% fresh</td>
                  <td className="py-2 pr-4">50%+ butter</td>
                  <td className="py-2">Advanced</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Pizza (NY Style)</td>
                  <td className="py-2 pr-4">100%</td>
                  <td className="py-2 pr-4">63-65%</td>
                  <td className="py-2 pr-4">2.5%</td>
                  <td className="py-2 pr-4">0.5% instant</td>
                  <td className="py-2 pr-4">3% oil</td>
                  <td className="py-2">Beginner</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Pizza (Neapolitan)</td>
                  <td className="py-2 pr-4">100%</td>
                  <td className="py-2 pr-4">58-62%</td>
                  <td className="py-2 pr-4">3%</td>
                  <td className="py-2 pr-4">0.2% fresh</td>
                  <td className="py-2 pr-4">0%</td>
                  <td className="py-2">Intermediate</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Rye Bread</td>
                  <td className="py-2 pr-4">100%*</td>
                  <td className="py-2 pr-4">70-80%</td>
                  <td className="py-2 pr-4">1.8%</td>
                  <td className="py-2 pr-4">25% rye sour</td>
                  <td className="py-2 pr-4">0%</td>
                  <td className="py-2">Advanced</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-2">*Rye bread flour totals may include mixed flours (e.g., 60% rye, 40% bread flour = 100%)</p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Hydration Ranges and Dough Behavior
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Hydration</th>
                  <th className="text-left py-2 pr-4">Dough Character</th>
                  <th className="text-left py-2 pr-4">Handling</th>
                  <th className="text-left py-2 pr-4">Best For</th>
                  <th className="text-left py-2">Crumb Structure</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">50-55%</td>
                  <td className="py-2 pr-4">Very stiff</td>
                  <td className="py-2 pr-4">Easy to shape, needs muscle</td>
                  <td className="py-2 pr-4">Bagels, pretzels</td>
                  <td className="py-2">Dense, chewy</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">55-60%</td>
                  <td className="py-2 pr-4">Firm</td>
                  <td className="py-2 pr-4">Easy to shape</td>
                  <td className="py-2 pr-4">Sandwich loaves, rolls</td>
                  <td className="py-2">Tight, uniform</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">60-65%</td>
                  <td className="py-2 pr-4">Manageable</td>
                  <td className="py-2 pr-4">Beginner-friendly</td>
                  <td className="py-2 pr-4">Most breads, pizza</td>
                  <td className="py-2">Medium, even</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">65-70%</td>
                  <td className="py-2 pr-4">Slightly tacky</td>
                  <td className="py-2 pr-4">Requires practice</td>
                  <td className="py-2 pr-4">Artisan breads, pizza</td>
                  <td className="py-2">Open, irregular</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">70-75%</td>
                  <td className="py-2 pr-4">Sticky</td>
                  <td className="py-2 pr-4">Wet hands, bench scraper</td>
                  <td className="py-2 pr-4">Sourdough, baguettes</td>
                  <td className="py-2">Large holes possible</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">75-80%</td>
                  <td className="py-2 pr-4">Very sticky</td>
                  <td className="py-2 pr-4">Minimal handling, folds only</td>
                  <td className="py-2 pr-4">Open crumb breads</td>
                  <td className="py-2">Very open, wild</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">80%+</td>
                  <td className="py-2 pr-4">Batter-like</td>
                  <td className="py-2 pr-4">Pour/spread, no shaping</td>
                  <td className="py-2 pr-4">Ciabatta, focaccia, pan breads</td>
                  <td className="py-2">Extremely open</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* More Content */}
      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl prose prose-lg">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            How to Use Baker&apos;s Percentages
          </h2>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-6 mb-4">
            Converting a Recipe to Percentages
          </h3>
          <ol>
            <li>Weigh all ingredients in grams (critical!)</li>
            <li>Identify the total flour weight</li>
            <li>For each ingredient: (weight ÷ flour weight) × 100 = percentage</li>
          </ol>
          <div className="bg-white p-4 rounded-lg my-4 text-sm">
            <p className="font-semibold mb-2">Example:</p>
            <p>500g flour, 325g water, 10g salt, 5g yeast</p>
            <p className="mt-2">
              Water: 325 ÷ 500 × 100 = 65%<br />
              Salt: 10 ÷ 500 × 100 = 2%<br />
              Yeast: 5 ÷ 500 × 100 = 1%
            </p>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Scaling a Recipe to a Target Flour Weight
          </h3>
          <ol>
            <li>Decide your desired flour weight</li>
            <li>For each ingredient: (percentage ÷ 100) × flour weight = ingredient weight</li>
          </ol>
          <div className="bg-white p-4 rounded-lg my-4 text-sm">
            <p className="font-semibold mb-2">Example (scaling to 1000g flour):</p>
            <p>Formula: 100% flour, 65% water, 2% salt, 1% yeast</p>
            <p className="mt-2">
              Flour: 1000g<br />
              Water: 0.65 × 1000 = 650g<br />
              Salt: 0.02 × 1000 = 20g<br />
              Yeast: 0.01 × 1000 = 10g
            </p>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Scaling to a Target Dough Weight
          </h3>
          <ol>
            <li>Add up all percentages (e.g., 100 + 65 + 2 + 1 = 168%)</li>
            <li>Divide target dough weight by total percentage: flour = dough ÷ (total% / 100)</li>
            <li>Calculate other ingredients from the flour weight</li>
          </ol>
          <div className="bg-white p-4 rounded-lg my-4 text-sm">
            <p className="font-semibold mb-2">Example (making 1000g total dough):</p>
            <p>Formula: 100% + 65% + 2% + 1% = 168%</p>
            <p className="mt-2">
              Flour: 1000 ÷ 1.68 = 595g<br />
              Water: 595 × 0.65 = 387g<br />
              Salt: 595 × 0.02 = 12g<br />
              Yeast: 595 × 0.01 = 6g<br />
              Total: 1000g
            </p>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Common Ingredient Percentage Ranges
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Ingredient</th>
                  <th className="text-left py-2 pr-4">Typical Range</th>
                  <th className="text-left py-2 pr-4">Standard</th>
                  <th className="text-left py-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Salt</td>
                  <td className="py-2 pr-4">1.8-2.5%</td>
                  <td className="py-2 pr-4">2%</td>
                  <td className="py-2">Higher for enriched doughs, lower for health</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Instant Yeast</td>
                  <td className="py-2 pr-4">0.3-1.5%</td>
                  <td className="py-2 pr-4">0.5-1%</td>
                  <td className="py-2">Less for long ferments, more for quick breads</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Active Dry Yeast</td>
                  <td className="py-2 pr-4">0.5-2%</td>
                  <td className="py-2 pr-4">0.7-1.2%</td>
                  <td className="py-2">Use 25% more than instant yeast</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Fresh Yeast</td>
                  <td className="py-2 pr-4">1-4%</td>
                  <td className="py-2 pr-4">2-3%</td>
                  <td className="py-2">Use 3× the instant yeast amount</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Sourdough Starter</td>
                  <td className="py-2 pr-4">10-30%</td>
                  <td className="py-2 pr-4">20%</td>
                  <td className="py-2">Lower = slower ferment, more flavor</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Oil</td>
                  <td className="py-2 pr-4">0-15%</td>
                  <td className="py-2 pr-4">3-5%</td>
                  <td className="py-2">Softens crust, extends freshness</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Butter</td>
                  <td className="py-2 pr-4">0-60%</td>
                  <td className="py-2 pr-4">5-15%</td>
                  <td className="py-2">Brioche can be 50%+</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Sugar</td>
                  <td className="py-2 pr-4">0-15%</td>
                  <td className="py-2 pr-4">5-8%</td>
                  <td className="py-2">Feeds yeast, browns crust</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Eggs</td>
                  <td className="py-2 pr-4">0-60%</td>
                  <td className="py-2 pr-4">10-25%</td>
                  <td className="py-2">Enriches, adds structure and color</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Milk/Dairy</td>
                  <td className="py-2 pr-4">0-30%</td>
                  <td className="py-2 pr-4">10-20%</td>
                  <td className="py-2">Softens crumb, adds flavor</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Preferment Reference */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl prose prose-lg">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            Preferment Reference Guide
          </h2>
          <p>
            Preferments are portions of dough fermented before mixing the final dough. Each type has different
            characteristics that affect flavor, texture, and handling.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Preferment</th>
                  <th className="text-left py-2 pr-4">Hydration</th>
                  <th className="text-left py-2 pr-4">Yeast %</th>
                  <th className="text-left py-2 pr-4">Ferment Time</th>
                  <th className="text-left py-2 pr-4">Flavor</th>
                  <th className="text-left py-2">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Poolish</td>
                  <td className="py-2 pr-4">100%</td>
                  <td className="py-2 pr-4">0.1-0.5%</td>
                  <td className="py-2 pr-4">8-16 hours</td>
                  <td className="py-2 pr-4">Mild, wheaty</td>
                  <td className="py-2">Baguettes, pizza</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Biga</td>
                  <td className="py-2 pr-4">50-60%</td>
                  <td className="py-2 pr-4">0.1-0.5%</td>
                  <td className="py-2 pr-4">8-24 hours</td>
                  <td className="py-2 pr-4">Nutty, complex</td>
                  <td className="py-2">Ciabatta, Italian breads</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Pâte Fermentée</td>
                  <td className="py-2 pr-4">60-65%</td>
                  <td className="py-2 pr-4">0.5-1%</td>
                  <td className="py-2 pr-4">1-24 hours</td>
                  <td className="py-2 pr-4">Balanced, bread-like</td>
                  <td className="py-2">French breads, baguettes</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Levain (stiff)</td>
                  <td className="py-2 pr-4">50-65%</td>
                  <td className="py-2 pr-4">Wild</td>
                  <td className="py-2 pr-4">4-12 hours</td>
                  <td className="py-2 pr-4">Mild sour, lactic</td>
                  <td className="py-2">Country sourdough</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Levain (liquid)</td>
                  <td className="py-2 pr-4">100%</td>
                  <td className="py-2 pr-4">Wild</td>
                  <td className="py-2 pr-4">4-12 hours</td>
                  <td className="py-2 pr-4">Tangy, acetic</td>
                  <td className="py-2">San Francisco style</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Sponge</td>
                  <td className="py-2 pr-4">65-75%</td>
                  <td className="py-2 pr-4">1-2%</td>
                  <td className="py-2 pr-4">1-4 hours</td>
                  <td className="py-2 pr-4">Light, yeasty</td>
                  <td className="py-2">Sandwich bread, rolls</td>
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
              href="/sourdough-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Sourdough Calculator</h3>
              <p className="text-sm text-gray-600">Starter feeding schedules and bread recipes</p>
            </Link>
            <Link
              href="/pizza-dough-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Pizza Dough Calculator</h3>
              <p className="text-sm text-gray-600">Dough for any pizza style with precise weights</p>
            </Link>
            <Link
              href="/recipe-scaler"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Recipe Scaler</h3>
              <p className="text-sm text-gray-600">Scale any recipe by servings or multiplier</p>
            </Link>
            <Link
              href="/cooking-measurement-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Measurement Converter</h3>
              <p className="text-sm text-gray-600">Convert cups to grams, ounces to ml</p>
            </Link>
            <Link
              href="/butter-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Butter Converter</h3>
              <p className="text-sm text-gray-600">Sticks to grams, cups to tablespoons</p>
            </Link>
            <Link
              href="/recipe-cost-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Recipe Cost Calculator</h3>
              <p className="text-sm text-gray-600">Calculate ingredient costs per batch or serving</p>
            </Link>
            <Link
              href="/convection-oven-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Convection Oven Converter</h3>
              <p className="text-sm text-gray-600">Adjust baking temps for convection ovens</p>
            </Link>
            <Link
              href="/oven-temperature-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Oven Temperature Converter</h3>
              <p className="text-sm text-gray-600">Fahrenheit to Celsius and gas marks</p>
            </Link>
            <Link
              href="/cake-pan-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Cake Pan Converter</h3>
              <p className="text-sm text-gray-600">Scale recipes between pan sizes</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Authority Sources Footer */}
      <section className="py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-sm text-gray-500 text-center">
            Content referenced from{" "}
            <a href="https://www.kingarthurbaking.com/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">King Arthur Baking</a>
            {", "}
            <a href="https://www.theperfectloaf.com/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">The Perfect Loaf</a>
            {", "}
            <a href="https://www.seriouseats.com/bread" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">Serious Eats</a>
            {", "}
            <a href="https://www.breadtopia.com/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">Breadtopia</a>
            {", and "}
            <a href="https://www.sfbi.com/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">San Francisco Baking Institute</a>
            {"."}
          </p>
        </div>
      </section>
    </div>
  );
}
