import { Metadata } from "next";
import Link from "next/link";
import SourdoughCalculator from "@/components/calculators/SourdoughCalculator";
import { FAQPageJsonLd, WebApplicationJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Sourdough Calculator — Starter Feeding & Bread Recipe Calculator | CalcKitchen",
  description: "Calculate sourdough starter feedings and bread recipes. Get exact flour, water, and starter amounts. Includes feeding schedules, hydration guide, and levain builder.",
  openGraph: {
    title: "Sourdough Calculator — Starter Feeding & Bread Recipe Calculator",
    description: "Calculate sourdough starter feedings and bread recipes. Get exact flour, water, and starter amounts. Includes feeding schedules, hydration guide, and levain builder.",
    url: "https://calckitchen.com/sourdough-calculator",
    type: "website",
  },
  alternates: {
    canonical: "https://calckitchen.com/sourdough-calculator",
  },
};

const faqs = [
  {
    question: "What is starter hydration and does it matter?",
    answer: "Starter hydration is the ratio of water to flour in your starter, expressed as a percentage. 100% hydration = equal parts water and flour (by weight). It matters for flavor and texture: 100% (liquid) ferments faster and produces milder flavor. 50-65% (stiff) ferments slower and develops more acetic acid (vinegar flavor). Most recipes assume 100% hydration. If yours is different, adjust the water and flour in your final dough to compensate.",
  },
  {
    question: "How much starter do I need to keep?",
    answer: "You need very little — 20-50g is plenty. Most recipes only use 50-150g of starter, and you'll build a levain from your starter the night before baking anyway. Keeping less starter means less flour waste at each feeding. Many bakers keep just 20-30g and feed 1:2:2 (starter:flour:water) to build up when needed.",
  },
  {
    question: "Can I keep my starter in the fridge?",
    answer: "Yes, refrigeration is standard for home bakers who don't bake daily. Feed your starter, let it rise for 1-2 hours at room temperature, then refrigerate. It will stay active for 1-2 weeks without feeding. Before baking, take it out and feed it 1-2 times over 12-24 hours to reactivate. Some bakers go 3-4 weeks between feedings without issues.",
  },
  {
    question: "What's the difference between starter and levain?",
    answer: "Your 'starter' (also called 'mother') is the small amount you maintain indefinitely. A 'levain' (or 'leaven') is a larger quantity you build specifically for a bake, using some of your starter. Example: You keep 30g of starter. The night before baking, you build a 150g levain by mixing 30g starter + 60g flour + 60g water. You use 100g levain in your dough and keep the extra 50g as your new starter.",
  },
  {
    question: "How do I make my bread more or less sour?",
    answer: "For MORE sour: use whole grain flour in your starter, ferment longer (cold retard in fridge), use stiff starter (50-65% hydration), let dough proof longer. For LESS sour: use white flour, shorter fermentation at warmer temps, use 100% hydration starter, feed starter more frequently before baking. Temperature is key — warmer = less sour, cooler = more sour.",
  },
  {
    question: "How do I know if my starter is ready to bake with?",
    answer: "The float test: drop a spoonful of starter in water. If it floats, it's ready — this means it's full of gas bubbles. Also look for: doubled or tripled in volume since feeding, domed top (not collapsed), bubbly throughout, pleasant yeasty smell. Peak activity is usually 4-8 hours after feeding at room temperature, depending on your feeding ratio and temperature.",
  },
  {
    question: "How long can sourdough starter last?",
    answer: "With regular feeding, starter can live indefinitely — some bakeries have starters over 100 years old. Even neglected starters can often be revived. If your starter develops mold, pink/orange coloring, or smells truly rotten (not just tangy), discard it and start fresh. Gray liquid on top (hooch) is normal and just means it's hungry — stir it in or pour it off and feed.",
  },
  {
    question: "Why did my starter collapse after rising?",
    answer: "Collapsing is normal and means your starter peaked and ran out of food. This isn't a problem — it just means you need to catch it earlier next time. Mark your jar with a rubber band after feeding to track the rise. For baking, use the starter when it's at or just past its peak (domed top, still bubbly). Using collapsed starter still works but may result in longer fermentation times.",
  },
  {
    question: "Can I use discard in other recipes?",
    answer: "Absolutely! Unfed discard adds flavor to pancakes, waffles, crackers, pizza dough, flatbreads, muffins, and even chocolate cake. Discard can be stored in the fridge for up to a week (some bakers go longer). Since discard has no active leavening power, recipes using it typically include baking powder or soda for rise. This reduces waste and adds complex tangy flavor to everyday baking.",
  },
  {
    question: "What flour should I use for my starter?",
    answer: "All-purpose flour works well for beginners — it's affordable and predictable. Whole wheat or rye flour ferments faster due to more wild yeast and nutrients, but consumes faster. Many bakers use a 50/50 blend (half AP, half whole wheat) for balance. Bread flour works too but isn't necessary for starter. Avoid bleached flour as chemicals can inhibit fermentation.",
  },
  {
    question: "How do I revive a neglected or inactive starter?",
    answer: "Pour off any hooch (dark liquid), discard all but 20g, and feed 1:5:5 or 1:10:10 (starter:flour:water). Use whole wheat or rye to boost activity. Feed twice daily for 3-5 days at room temperature. It should show bubbles within 24-48 hours and double within a week. If no activity after a week of consistent feeding, the starter may be dead — start fresh with a new culture.",
  },
  {
    question: "Do I need to use exact measurements for feeding?",
    answer: "Weight is more accurate than volume, but your starter is forgiving. Being within 10-15% of your target ratio won't cause problems. Consistency matters more than precision — if you always feed roughly 1:2:2, your starter will develop a predictable schedule. Use a kitchen scale for best results, but don't stress about being gram-perfect every time.",
  },
];

export default function SourdoughCalculatorPage() {
  return (
    <div className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Sourdough Calculator"
        description="Calculate sourdough starter feedings and bread recipes. Get exact flour, water, and starter amounts based on hydration percentage and loaf count."
        url="https://calckitchen.com/sourdough-calculator"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Sourdough Calculator", url: "https://calckitchen.com/sourdough-calculator" },
        ]}
      />

      {/* Hero Section with Calculator */}
      <section className="bg-gradient-to-b from-warm-white to-white py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Sourdough Calculator
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Calculate starter feedings and bread recipes with exact ingredient amounts. Includes levain builder, hydration calculator, and feeding schedule guide. Whether you&apos;re maintaining a mature starter or building a levain for weekend baking, get precise measurements every time.
          </p>

          {/* Calculator Component */}
          <SourdoughCalculator />
        </div>
      </section>

      {/* Real-World Examples Section */}
      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Real-World Sourdough Calculations
          </h2>
          <p className="text-gray-700 mb-8">
            See how bakers use these calculations for common scenarios, from weekly maintenance to multi-loaf production bakes.
          </p>

          {/* Example 1 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Weekend Country Loaf — Building Levain Friday Night</h3>
                <p className="text-gray-600 mb-4">
                  You bake one loaf every Saturday morning. Your recipe calls for 100g of levain at 100% hydration. You want extra to feed back to your starter jar.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1"><strong>Recipe requirement:</strong> 100g levain</p>
                  <p className="text-sm text-gray-600 mb-1"><strong>Building for:</strong> 150g total (100g for dough + 50g back to starter)</p>
                  <p className="text-sm text-gray-600 mb-1"><strong>Ratio:</strong> 1:2:2 (starter:flour:water)</p>
                  <p className="text-sm text-gray-600"><strong>Mix at:</strong> 9pm Friday (8-10 hour rise)</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-emerald-800 mb-2">Levain Build:</p>
                  <p className="text-sm text-emerald-700">30g starter + 60g flour + 60g water = 150g levain</p>
                  <p className="text-sm text-emerald-700 mt-2">Ready by 6-7am Saturday for morning mixing</p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700"><strong>Pro tip:</strong> If your kitchen runs cool (below 70°F), start the levain earlier or place it in a warmer spot like on top of the refrigerator or in an oven with just the light on.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 2 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">High-Hydration Batard — 78% Hydration for Open Crumb</h3>
                <p className="text-gray-600 mb-4">
                  You&apos;re going for that Instagram-worthy open crumb. Your target is 900g total dough weight at 78% hydration for one large batard.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1"><strong>Target dough weight:</strong> 900g</p>
                  <p className="text-sm text-gray-600 mb-1"><strong>Hydration:</strong> 78%</p>
                  <p className="text-sm text-gray-600 mb-1"><strong>Starter percentage:</strong> 20% (of flour weight)</p>
                  <p className="text-sm text-gray-600"><strong>Salt:</strong> 2% (of flour weight)</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-emerald-800 mb-2">Recipe:</p>
                  <p className="text-sm text-emerald-700">450g bread flour (100%)</p>
                  <p className="text-sm text-emerald-700">351g water (78%)</p>
                  <p className="text-sm text-emerald-700">90g levain (20%)</p>
                  <p className="text-sm text-emerald-700">9g salt (2%)</p>
                  <p className="text-sm text-emerald-700 mt-2"><strong>Total:</strong> 900g</p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700"><strong>Pro tip:</strong> At 78% hydration, work the dough gently with wet hands. Use coil folds instead of traditional stretch and folds to avoid tearing the delicate gluten network.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 3 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Weekly Maintenance — Keeping a Small Starter</h3>
                <p className="text-gray-600 mb-4">
                  You bake weekly and want to minimize flour waste. You keep your starter in the fridge and refresh it once a week on Thursday evening, ready for weekend baking.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1"><strong>Current starter:</strong> 50g (in fridge)</p>
                  <p className="text-sm text-gray-600 mb-1"><strong>Amount to keep:</strong> 25g (after discarding)</p>
                  <p className="text-sm text-gray-600 mb-1"><strong>Feeding ratio:</strong> 1:2:2</p>
                  <p className="text-sm text-gray-600"><strong>Final amount:</strong> 125g (enough for levain build)</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-emerald-800 mb-2">Thursday Evening Refresh:</p>
                  <p className="text-sm text-emerald-700">Discard 25g (save for pancakes!)</p>
                  <p className="text-sm text-emerald-700">Keep 25g starter + add 50g flour + 50g water</p>
                  <p className="text-sm text-emerald-700">Let rise 2 hours, then refrigerate</p>
                  <p className="text-sm text-emerald-700 mt-2">Flour used per week: ~100g total (50g feed + 50g levain)</p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700"><strong>Pro tip:</strong> Use a small jar (8-12 oz) for your starter. It reduces oxygen exposure and makes the weekly discard routine easier to manage.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 4 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">4</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Sourdough Pizza Night — Making 4 Pizzas</h3>
                <p className="text-gray-600 mb-4">
                  Friday pizza night! You want 4 pizzas at 250g each, using sourdough for that characteristic tang and better digestibility.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1"><strong>Pizzas:</strong> 4 balls × 250g = 1,000g total dough</p>
                  <p className="text-sm text-gray-600 mb-1"><strong>Hydration:</strong> 65% (easier to handle)</p>
                  <p className="text-sm text-gray-600 mb-1"><strong>Starter:</strong> 15% of flour weight</p>
                  <p className="text-sm text-gray-600"><strong>Method:</strong> 24-hour cold ferment for best flavor</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-emerald-800 mb-2">Thursday Evening Recipe:</p>
                  <p className="text-sm text-emerald-700">550g bread flour (100%)</p>
                  <p className="text-sm text-emerald-700">358g water (65%)</p>
                  <p className="text-sm text-emerald-700">82g active starter (15%)</p>
                  <p className="text-sm text-emerald-700">11g salt (2%)</p>
                  <p className="text-sm text-emerald-700 mt-2">Mix Thursday 8pm → Divide & ball Friday morning → Cold proof → Ready Friday 6pm</p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700"><strong>Pro tip:</strong> Remove dough balls from fridge 2 hours before stretching. Cold dough springs back and tears. Room temperature dough stretches easily.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 5 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">5</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Reviving a Neglected Starter — Back from Vacation</h3>
                <p className="text-gray-600 mb-4">
                  You&apos;ve been away for 3 weeks. Your starter has dark hooch on top and smells strongly acidic. Time to wake it up.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1"><strong>Current state:</strong> Neglected 3 weeks, dark hooch, collapsed</p>
                  <p className="text-sm text-gray-600 mb-1"><strong>Goal:</strong> Full activity within 3-5 days</p>
                  <p className="text-sm text-gray-600 mb-1"><strong>Strategy:</strong> High-ratio feeds with whole grain</p>
                  <p className="text-sm text-gray-600"><strong>Room temp:</strong> 75°F for faster revival</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-emerald-800 mb-2">Revival Schedule:</p>
                  <p className="text-sm text-emerald-700"><strong>Day 1:</strong> Pour off hooch, keep 10g, add 50g whole wheat + 50g water (1:5:5)</p>
                  <p className="text-sm text-emerald-700"><strong>Day 2:</strong> Discard all but 20g, feed 1:3:3 with whole wheat 2× daily</p>
                  <p className="text-sm text-emerald-700"><strong>Day 3-4:</strong> Continue 2× daily feeds, switch to 50/50 AP and whole wheat</p>
                  <p className="text-sm text-emerald-700"><strong>Day 5:</strong> Should double in 6-8 hours — ready to bake!</p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700"><strong>Pro tip:</strong> Rye flour works even better than whole wheat for revival — the extra nutrients and wild yeast kick-start fermentation faster.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 6 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">6</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Batch Baking — 6 Loaves for Farmers Market</h3>
                <p className="text-gray-600 mb-4">
                  You sell at the local farmers market Saturday morning. You need 6 loaves at 800g each, plus some extra for the family.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1"><strong>Loaves:</strong> 6 × 800g = 4,800g dough</p>
                  <p className="text-sm text-gray-600 mb-1"><strong>Extra for home:</strong> 1 loaf (800g)</p>
                  <p className="text-sm text-gray-600 mb-1"><strong>Total dough:</strong> 5,600g (7 loaves)</p>
                  <p className="text-sm text-gray-600"><strong>Hydration:</strong> 72% (good balance of crumb and handling)</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-emerald-800 mb-2">Wednesday Night Levain Build:</p>
                  <p className="text-sm text-emerald-700">Need 560g levain (10% of flour) → Build 700g (100g starter + 300g flour + 300g water)</p>
                  <p className="text-sm font-semibold text-emerald-800 mt-3 mb-2">Thursday Morning Final Dough:</p>
                  <p className="text-sm text-emerald-700">2,800g bread flour (100%)</p>
                  <p className="text-sm text-emerald-700">2,016g water (72%)</p>
                  <p className="text-sm text-emerald-700">560g levain (20%)</p>
                  <p className="text-sm text-emerald-700">56g salt (2%)</p>
                  <p className="text-sm text-emerald-700 mt-2">Bulk → Shape Thursday evening → Cold proof overnight → Bake Friday 4am</p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700"><strong>Pro tip:</strong> For batch baking, work in waves — shape 2-3 loaves at a time while others rest. Stagger your Dutch ovens if using multiple, leaving 5-minute gaps between loads.</p>
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
            Understanding Sourdough Ratios
          </h2>
          <p>
            Sourdough baking uses baker&apos;s percentages with flour as the base (100%). Understanding these ratios helps you
            adjust recipes, troubleshoot issues, and scale confidently from a single loaf to production batches.
          </p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Feeding Ratio Guide
          </h3>
          <p className="text-gray-600 mb-4">
            The ratio format is <strong>starter : flour : water</strong> by weight. Higher ratios mean more food relative to starter, resulting in slower, more controlled fermentation.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4 bg-gray-50">Ratio</th>
                  <th className="text-left py-2 pr-4 bg-gray-50">Peak Time (75°F)</th>
                  <th className="text-left py-2 pr-4 bg-gray-50">Peak Time (68°F)</th>
                  <th className="text-left py-2 pr-4 bg-gray-50">Best For</th>
                  <th className="text-left py-2 bg-gray-50">Acidity Level</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">1:1:1</td>
                  <td className="py-2 pr-4">3-5 hours</td>
                  <td className="py-2 pr-4">5-7 hours</td>
                  <td className="py-2 pr-4">Quick builds, emergency prep</td>
                  <td className="py-2">High (more sour)</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">1:2:2</td>
                  <td className="py-2 pr-4">6-8 hours</td>
                  <td className="py-2 pr-4">8-12 hours</td>
                  <td className="py-2 pr-4">Standard maintenance, overnight levains</td>
                  <td className="py-2">Medium-high</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">1:3:3</td>
                  <td className="py-2 pr-4">8-12 hours</td>
                  <td className="py-2 pr-4">12-16 hours</td>
                  <td className="py-2 pr-4">Most popular — good flavor balance</td>
                  <td className="py-2">Medium</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">1:4:4</td>
                  <td className="py-2 pr-4">10-14 hours</td>
                  <td className="py-2 pr-4">14-18 hours</td>
                  <td className="py-2 pr-4">Slower development, milder flavor</td>
                  <td className="py-2">Medium-low</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">1:5:5</td>
                  <td className="py-2 pr-4">12-18 hours</td>
                  <td className="py-2 pr-4">18-24 hours</td>
                  <td className="py-2 pr-4">Pre-vacation feed, very mild flavor</td>
                  <td className="py-2">Low</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">1:10:10</td>
                  <td className="py-2 pr-4">18-24+ hours</td>
                  <td className="py-2 pr-4">24-36 hours</td>
                  <td className="py-2 pr-4">Extended absence, reviving starters</td>
                  <td className="py-2">Very low</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">1:20:20</td>
                  <td className="py-2 pr-4">36-48 hours</td>
                  <td className="py-2 pr-4">48-72 hours</td>
                  <td className="py-2 pr-4">Long vacation, very neglected starters</td>
                  <td className="py-2">Minimal</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            * Peak time varies with temperature. Warmer = faster, cooler = slower. Whole grain flours ferment 20-30% faster.
          </p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Hydration Effects on Dough
          </h3>
          <p className="text-gray-600 mb-4">
            Hydration percentage determines dough handling and final crumb structure. Start lower and work your way up as your skills improve.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4 bg-gray-50">Hydration</th>
                  <th className="text-left py-2 pr-4 bg-gray-50">Dough Feel</th>
                  <th className="text-left py-2 pr-4 bg-gray-50">Crumb Structure</th>
                  <th className="text-left py-2 pr-4 bg-gray-50">Skill Level</th>
                  <th className="text-left py-2 bg-gray-50">Best Bread Types</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">55-60%</td>
                  <td className="py-2 pr-4">Very firm, stiff</td>
                  <td className="py-2 pr-4">Dense, tight, chewy</td>
                  <td className="py-2 pr-4">Beginner</td>
                  <td className="py-2">Bagels, pretzels</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">60-65%</td>
                  <td className="py-2 pr-4">Firm, easy to shape</td>
                  <td className="py-2 pr-4">Tight, even crumb</td>
                  <td className="py-2 pr-4">Beginner</td>
                  <td className="py-2">Sandwich loaves, rolls</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">65-70%</td>
                  <td className="py-2 pr-4">Slightly tacky, workable</td>
                  <td className="py-2 pr-4">Moderate openness</td>
                  <td className="py-2 pr-4">Beginner-Intermediate</td>
                  <td className="py-2">Country loaves, pizza</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">70-75%</td>
                  <td className="py-2 pr-4">Sticky, needs technique</td>
                  <td className="py-2 pr-4">Open, irregular holes</td>
                  <td className="py-2 pr-4">Intermediate</td>
                  <td className="py-2">Artisan boules, batards</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">75-80%</td>
                  <td className="py-2 pr-4">Very wet, slack</td>
                  <td className="py-2 pr-4">Very open crumb</td>
                  <td className="py-2 pr-4">Advanced</td>
                  <td className="py-2">High-hydration artisan</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">80-85%</td>
                  <td className="py-2 pr-4">Extremely wet</td>
                  <td className="py-2 pr-4">Large irregular holes</td>
                  <td className="py-2 pr-4">Expert</td>
                  <td className="py-2">Ciabatta, focaccia</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">85-100%</td>
                  <td className="py-2 pr-4">Batter-like</td>
                  <td className="py-2 pr-4">Ultra-open, custardy</td>
                  <td className="py-2 pr-4">Expert</td>
                  <td className="py-2">Pan loaves, flatbreads</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Flour Types for Sourdough
          </h3>
          <p className="text-gray-600 mb-4">
            Different flours behave differently in sourdough baking. Protein content affects gluten development, while whole grain content affects fermentation speed.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4 bg-gray-50">Flour Type</th>
                  <th className="text-left py-2 pr-4 bg-gray-50">Protein %</th>
                  <th className="text-left py-2 pr-4 bg-gray-50">Fermentation Speed</th>
                  <th className="text-left py-2 pr-4 bg-gray-50">Flavor Impact</th>
                  <th className="text-left py-2 bg-gray-50">Best Use</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">All-Purpose (AP)</td>
                  <td className="py-2 pr-4">10-12%</td>
                  <td className="py-2 pr-4">Medium</td>
                  <td className="py-2 pr-4">Mild, neutral</td>
                  <td className="py-2">Starter maintenance, general baking</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">Bread Flour</td>
                  <td className="py-2 pr-4">12-14%</td>
                  <td className="py-2 pr-4">Medium</td>
                  <td className="py-2 pr-4">Slightly sweeter</td>
                  <td className="py-2">Artisan loaves, better structure</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">Whole Wheat</td>
                  <td className="py-2 pr-4">13-14%</td>
                  <td className="py-2 pr-4">Fast (+25%)</td>
                  <td className="py-2 pr-4">Nutty, earthy</td>
                  <td className="py-2">Starter boost, 10-30% of dough</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">Rye Flour</td>
                  <td className="py-2 pr-4">8-12%</td>
                  <td className="py-2 pr-4">Very Fast (+40%)</td>
                  <td className="py-2 pr-4">Complex, tangy</td>
                  <td className="py-2">Starter revival, 5-20% of dough</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">Spelt</td>
                  <td className="py-2 pr-4">12-15%</td>
                  <td className="py-2 pr-4">Fast</td>
                  <td className="py-2 pr-4">Sweet, nutty</td>
                  <td className="py-2">Up to 50% of dough, watch hydration</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">Einkorn</td>
                  <td className="py-2 pr-4">13-18%</td>
                  <td className="py-2 pr-4">Fast</td>
                  <td className="py-2 pr-4">Rich, buttery</td>
                  <td className="py-2">25-50%, reduce hydration 5-10%</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">Type 00 (Italian)</td>
                  <td className="py-2 pr-4">11-12%</td>
                  <td className="py-2 pr-4">Medium</td>
                  <td className="py-2 pr-4">Delicate, mild</td>
                  <td className="py-2">Pizza, focaccia</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">High-Extraction</td>
                  <td className="py-2 pr-4">11-13%</td>
                  <td className="py-2 pr-4">Medium-Fast</td>
                  <td className="py-2 pr-4">Complex, wheaty</td>
                  <td className="py-2">Artisan loaves, 50-100% of dough</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Temperature & Timing Reference
          </h3>
          <p className="text-gray-600 mb-4">
            Temperature is the single most important variable affecting fermentation. Use this chart to adjust your timing based on room or dough temperature.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4 bg-gray-50">Temperature</th>
                  <th className="text-left py-2 pr-4 bg-gray-50">Bulk Ferment</th>
                  <th className="text-left py-2 pr-4 bg-gray-50">Levain Peak (1:3:3)</th>
                  <th className="text-left py-2 pr-4 bg-gray-50">Proofing</th>
                  <th className="text-left py-2 bg-gray-50">Flavor Development</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">65°F (18°C)</td>
                  <td className="py-2 pr-4">8-12 hours</td>
                  <td className="py-2 pr-4">14-18 hours</td>
                  <td className="py-2 pr-4">3-4 hours</td>
                  <td className="py-2">Maximum complexity, more sour</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">70°F (21°C)</td>
                  <td className="py-2 pr-4">6-8 hours</td>
                  <td className="py-2 pr-4">10-14 hours</td>
                  <td className="py-2 pr-4">2-3 hours</td>
                  <td className="py-2">Good complexity, moderate tang</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">75°F (24°C)</td>
                  <td className="py-2 pr-4">4-6 hours</td>
                  <td className="py-2 pr-4">8-10 hours</td>
                  <td className="py-2 pr-4">1.5-2 hours</td>
                  <td className="py-2">Balanced, mild tang</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">78°F (26°C)</td>
                  <td className="py-2 pr-4">3-5 hours</td>
                  <td className="py-2 pr-4">6-8 hours</td>
                  <td className="py-2 pr-4">1-1.5 hours</td>
                  <td className="py-2">Mild, sweet notes</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">82°F (28°C)</td>
                  <td className="py-2 pr-4">2.5-4 hours</td>
                  <td className="py-2 pr-4">5-7 hours</td>
                  <td className="py-2 pr-4">45 min-1 hour</td>
                  <td className="py-2">Very mild, watch for over-proofing</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">38°F (3°C) Fridge</td>
                  <td className="py-2 pr-4">N/A</td>
                  <td className="py-2 pr-4">N/A</td>
                  <td className="py-2 pr-4">8-72 hours</td>
                  <td className="py-2">Complex acids develop over time</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            * Cold retard (fridge proofing) develops complex flavors and makes scoring easier. Pull loaves directly from fridge to hot oven.
          </p>
        </div>
      </section>

      {/* More Content */}
      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl prose prose-lg">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            Sourdough Baking Timeline
          </h2>
          <p className="text-gray-600 mb-6">
            The classic two-day bake schedule gives the best results for home bakers. Here&apos;s a detailed timeline for a Saturday morning bake.
          </p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-6 mb-4">
            Thursday Evening — Prepare Your Starter
          </h3>
          <ul>
            <li><strong>If refrigerated:</strong> Take starter out, discard to ~30g, feed 1:2:2</li>
            <li><strong>Let rise:</strong> 8-12 hours at room temperature</li>
            <li><strong>By Friday morning:</strong> Should be doubled and active</li>
          </ul>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Friday Evening (8-9pm) — Build Levain
          </h3>
          <ul>
            <li><strong>Build levain:</strong> Mix starter + flour + water (1:2:2 or 1:3:3 ratio)</li>
            <li><strong>Amount:</strong> Recipe requirement + 50g extra for starter maintenance</li>
            <li>Let rise overnight at room temperature (8-12 hours)</li>
            <li>Cover loosely — a damp towel or loose lid works well</li>
          </ul>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Saturday Morning (6-8am) — Mix Dough
          </h3>
          <ul>
            <li><strong>Check levain:</strong> Should be doubled, bubbly, passes float test</li>
            <li><strong>Autolyse (optional):</strong> Mix flour and water, rest 30-60 minutes</li>
            <li><strong>Add levain:</strong> Mix into autolysed dough or combine all at once</li>
            <li><strong>Rest 20-30 min:</strong> Before adding salt (helps hydration)</li>
            <li><strong>Add salt:</strong> Mix in salt + any reserved water</li>
            <li><strong>Save levain:</strong> Return extra levain to your starter jar, refrigerate</li>
          </ul>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Saturday (8am-2pm) — Bulk Fermentation
          </h3>
          <ul>
            <li><strong>Duration:</strong> 4-6 hours at 75°F (adjust for your temperature)</li>
            <li><strong>Stretch & folds:</strong> Every 30-45 minutes for first 2 hours (4-6 sets)</li>
            <li><strong>Then rest:</strong> Let dough develop undisturbed for remaining time</li>
            <li><strong>Signs of done:</strong> 50-75% volume increase, jiggly, edges pulling from bowl</li>
          </ul>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Saturday Afternoon (2-4pm) — Shape
          </h3>
          <ul>
            <li><strong>Pre-shape:</strong> Gently turn out, shape into loose round, rest 20-30 min</li>
            <li><strong>Final shape:</strong> Shape into boule or batard with good surface tension</li>
            <li><strong>Into banneton:</strong> Seam side up, dust with rice flour to prevent sticking</li>
            <li><strong>Cover:</strong> Plastic bag or shower cap over banneton</li>
          </ul>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Saturday Evening — Cold Proof (Recommended)
          </h3>
          <ul>
            <li><strong>Refrigerate:</strong> Place banneton in fridge for 8-16 hours</li>
            <li><strong>Benefits:</strong> Better flavor, easier scoring, flexible timing</li>
            <li><strong>Alternative:</strong> Proof at room temp 1-2 hours and bake same day</li>
          </ul>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Sunday Morning (6-8am) — Bake
          </h3>
          <ul>
            <li><strong>Preheat:</strong> Dutch oven at 500°F for 45-60 minutes</li>
            <li><strong>Score:</strong> Flip onto parchment, score with razor or lame</li>
            <li><strong>Bake covered:</strong> 20 minutes at 500°F (creates steam)</li>
            <li><strong>Bake uncovered:</strong> Remove lid, reduce to 450°F, bake 20-25 minutes</li>
            <li><strong>Cool:</strong> At least 1 hour before cutting (internal cooking continues)</li>
          </ul>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Starter Maintenance Tips
          </h3>
          <ul>
            <li><strong>Container:</strong> Use glass or food-safe plastic with loose lid (allows gas escape)</li>
            <li><strong>Temperature:</strong> 75-80°F is ideal for active fermentation</li>
            <li><strong>Consistency:</strong> Same time, same ratio builds predictable timing</li>
            <li><strong>Flour type:</strong> Whole grains ferment faster and add flavor complexity</li>
            <li><strong>Water:</strong> Filtered or room-temp tap is fine — chlorine mostly evaporates</li>
            <li><strong>Jar hygiene:</strong> Scrape down sides or transfer to clean jar weekly</li>
          </ul>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Troubleshooting Common Issues
          </h3>
          <ul>
            <li><strong>Starter not rising:</strong> Feed more frequently, use whole grain flour, ensure warm environment (75-80°F), check flour isn&apos;t bleached</li>
            <li><strong>Dough too sticky:</strong> Wet your hands, use a bench scraper, don&apos;t add more flour — stickiness is normal at high hydration</li>
            <li><strong>Flat loaf:</strong> Starter wasn&apos;t active enough, overproofed (too long/warm), or underproofed (didn&apos;t rise enough)</li>
            <li><strong>Dense crumb:</strong> Under-fermented, not enough steam in oven, too low hydration, or gluten underdeveloped</li>
            <li><strong>Too sour:</strong> Long cold ferment, hungry (underfed) starter, high percentage of whole grains, or very slow bulk</li>
            <li><strong>Not sour enough:</strong> Use stiff starter, longer fermentation, add whole rye, retard overnight in fridge</li>
            <li><strong>Gummy interior:</strong> Under-baked (internal temp should reach 205-210°F), or cut too soon (let cool 2 hours)</li>
            <li><strong>Crust too thick:</strong> Baked too long, oven too hot, or not enough steam in initial bake</li>
          </ul>
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
              href="/bakers-percentage-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Baker&apos;s Percentage Calculator</h3>
              <p className="text-sm text-gray-600">Convert any bread recipe to percentages for easy scaling</p>
            </Link>
            <Link
              href="/pizza-dough-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Pizza Dough Calculator</h3>
              <p className="text-sm text-gray-600">Calculate sourdough or yeasted pizza dough recipes</p>
            </Link>
            <Link
              href="/recipe-scaler"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Recipe Scaler</h3>
              <p className="text-sm text-gray-600">Scale any recipe up or down with precise ratios</p>
            </Link>
            <Link
              href="/cooking-measurement-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Measurement Converter</h3>
              <p className="text-sm text-gray-600">Convert cups, grams, ounces, and more</p>
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
              <p className="text-sm text-gray-600">Adjust temps and times for convection baking</p>
            </Link>
            <Link
              href="/recipe-cost-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Recipe Cost Calculator</h3>
              <p className="text-sm text-gray-600">Calculate cost per loaf for market pricing</p>
            </Link>
            <Link
              href="/recipe-macro-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Recipe Macro Calculator</h3>
              <p className="text-sm text-gray-600">Get nutrition info for your sourdough recipes</p>
            </Link>
            <Link
              href="/butter-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Butter Converter</h3>
              <p className="text-sm text-gray-600">Convert butter between sticks, cups, and grams</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Authority Sources Footer */}
      <section className="py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-sm text-gray-500 text-center">
            Sourdough techniques and fermentation science referenced from{" "}
            <a href="https://www.theperfectloaf.com/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">The Perfect Loaf</a>,{" "}
            <a href="https://www.kingarthurbaking.com/learn/guides/sourdough" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">King Arthur Baking</a>,{" "}
            <a href="https://tartinebakery.com/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">Tartine Bakery</a>,{" "}
            <a href="https://www.seriouseats.com/sourdough" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">Serious Eats</a>, and{" "}
            <a href="https://breadtopia.com/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">Breadtopia</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
