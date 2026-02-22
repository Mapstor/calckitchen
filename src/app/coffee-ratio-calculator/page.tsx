import { Metadata } from "next";
import Link from "next/link";
import CoffeeRatioCalculator from "@/components/calculators/CoffeeRatioCalculator";
import { FAQPageJsonLd, WebApplicationJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Coffee to Water Ratio Calculator — Every Brew Method | CalcKitchen",
  description: "Calculate the perfect coffee to water ratio for any brew method. Pour over, French press, cold brew, espresso — get exact grams and ounces for your perfect cup.",
  openGraph: {
    title: "Coffee to Water Ratio Calculator — Every Brew Method",
    description: "Calculate the perfect coffee to water ratio for any brew method. Pour over, French press, cold brew, espresso — get exact grams and ounces for your perfect cup.",
    url: "https://calckitchen.com/coffee-ratio-calculator",
    type: "website",
  },
  alternates: {
    canonical: "https://calckitchen.com/coffee-ratio-calculator",
  },
};

const faqs = [
  {
    question: "What is the best coffee to water ratio for beginners?",
    answer: "Start with 1:16 — that's 1 gram of coffee for every 16 grams of water. This ratio works for most drip methods (pour over, drip machine, French press) and produces a balanced cup. For a standard 12 oz (355ml) cup, use about 22g of coffee. Adjust from there: stronger = lower ratio (1:15), lighter = higher ratio (1:17).",
  },
  {
    question: "What ratio should I use for cold brew?",
    answer: "Cold brew uses a much stronger ratio because you're making concentrate. Start with 1:5 to 1:8 (coffee:water). A common recipe is 1:5 — for example, 100g coffee to 500ml water. Steep for 12-24 hours, then dilute 1:1 with water or milk when serving. The stronger ratio compensates for dilution and the cold extraction being less efficient.",
  },
  {
    question: "How many tablespoons of coffee per cup?",
    answer: "About 2 tablespoons (10g) per 6 oz cup, or 2.5 tablespoons (12-13g) per 8 oz cup. But tablespoons are imprecise — a heaping tablespoon can be 50% more coffee than a level one. For consistency, use a scale: 1:16 ratio means 18g coffee for a 10 oz (300ml) mug. Digital kitchen scales are inexpensive and dramatically improve coffee quality.",
  },
  {
    question: "Does roast level affect the ratio?",
    answer: "Roast level affects extraction, not necessarily ratio. Dark roasts are more soluble (extract faster) and can taste bitter at standard ratios. Try 1:17 for dark roasts. Light roasts are denser and less soluble — you might use 1:15 and a finer grind. Also, dark roasts weigh less by volume (they've lost moisture), so measuring by weight is even more important.",
  },
  {
    question: "What does 1:2 ratio mean for espresso?",
    answer: "For espresso, the ratio is dose:yield (in:out), not coffee:water. A 1:2 ratio means for every gram of coffee grounds, you get 2 grams of espresso liquid. With an 18g dose, you'd pull 36g of espresso. This is the standard starting point. A 'ristretto' is 1:1.5, and a 'lungo' is 1:3. Time should be 25-30 seconds for proper extraction.",
  },
  {
    question: "How do I make coffee for a large group?",
    answer: "Use the same ratio, just scale up. For 10 cups (80 oz / 2.4L), use about 150g of coffee at 1:16. For 20 cups, use 300g. Batch brewers maintain ratio well. For pour over at scale, consider multiple smaller batches — very large pour overs extract unevenly. Cold brew scales easily: make a concentrate and dilute for each serving.",
  },
  {
    question: "Why does my coffee taste bitter even with the right ratio?",
    answer: "Bitterness usually comes from over-extraction, not wrong ratio. Check: water too hot (above 205°F), grind too fine, brew time too long, or stale coffee. Try grinding coarser, using slightly cooler water (195-200°F), or reducing brew time. Also clean your equipment — old coffee oils go rancid and taste bitter.",
  },
  {
    question: "Why does my coffee taste sour even with the right ratio?",
    answer: "Sourness indicates under-extraction. The ratio might be correct, but you're not getting enough flavor out of the grounds. Try: grinding finer, using hotter water (200-205°F), extending brew time, or ensuring full water saturation. Also check coffee freshness — very fresh beans (under 5 days from roast) need time to degas.",
  },
  {
    question: "Can I use volume measurements instead of weight?",
    answer: "You can, but results will be inconsistent. Coffee bean density varies by origin, roast level, and grind size. A tablespoon of dark roast weighs less than light roast. Volume works for daily coffee if you're consistent, but for dialing in a recipe or specialty coffee, weight is essential. Even a $15 kitchen scale makes a huge difference.",
  },
  {
    question: "How much does water quality affect my coffee?",
    answer: "Water is 98%+ of your coffee, so it matters significantly. Very soft water under-extracts (flat, sour); very hard water over-extracts (bitter, chalky). Ideal water has 50-150 ppm total dissolved solids. Filtered tap water works well for most people. Avoid distilled water (too pure) and heavily mineralized water. Some specialty roasters provide water recipes.",
  },
  {
    question: "Should I bloom my coffee, and how much water?",
    answer: "Yes, blooming (pre-wetting) releases CO2 from fresh coffee and improves extraction. Use 2-3x the coffee weight in water for blooming. For 20g coffee, use 40-60g water. Pour in circles to saturate all grounds, wait 30-45 seconds, then continue your normal pour. Skip blooming if your coffee is more than 3-4 weeks old — there's little CO2 left.",
  },
  {
    question: "What's the difference between immersion and percolation brewing?",
    answer: "Immersion (French press, AeroPress, cold brew) steeps grounds in water — all water contacts all coffee for the full brew time. Percolation (pour over, drip) passes water through coffee — fresh water continuously extracts. Immersion is more forgiving and produces fuller body. Percolation requires more technique but offers clarity and brightness. Same ratios work for both.",
  },
];

export default function CoffeeRatioCalculatorPage() {
  return (
    <div className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Coffee to Water Ratio Calculator"
        description="Calculate perfect coffee ratios for any brew method. Get exact measurements for pour over, French press, cold brew, espresso, and more."
        url="https://calckitchen.com/coffee-ratio-calculator"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Coffee Ratio Calculator", url: "https://calckitchen.com/coffee-ratio-calculator" },
        ]}
      />

      {/* Hero Section with Calculator */}
      <section className="bg-gradient-to-b from-warm-white to-white py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Coffee to Water Ratio Calculator
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Find the perfect coffee ratio for any brew method. Enter your cup size or coffee amount, select your method, and get exact measurements in grams and ounces. Whether you&apos;re dialing in pour over or making cold brew concentrate, get precision results every time.
          </p>

          {/* Calculator Component */}
          <CoffeeRatioCalculator />
        </div>
      </section>

      {/* Real-World Examples Section */}
      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Real-World Coffee Calculations
          </h2>
          <p className="text-gray-700 mb-8">
            See how to apply coffee ratios in everyday scenarios, from your morning cup to entertaining guests.
          </p>

          {/* Example 1 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Morning V60 Pour Over — Single Origin Light Roast</h3>
                <p className="text-gray-600 mb-4">
                  You just got a bag of Ethiopian Yirgacheffe and want to highlight its bright, fruity notes. V60 with a classic 1:16 ratio.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1"><strong>Target cup:</strong> 12 oz (355ml) finished coffee</p>
                  <p className="text-sm text-gray-600 mb-1"><strong>Method:</strong> Hario V60</p>
                  <p className="text-sm text-gray-600 mb-1"><strong>Ratio:</strong> 1:16</p>
                  <p className="text-sm text-gray-600"><strong>Grind:</strong> Medium-fine (sea salt texture)</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-emerald-800 mb-2">Recipe:</p>
                  <p className="text-sm text-emerald-700">22g coffee + 355g water (total brew weight)</p>
                  <p className="text-sm text-emerald-700 mt-2"><strong>Bloom:</strong> 45g water, wait 30 sec</p>
                  <p className="text-sm text-emerald-700"><strong>Then:</strong> Pour remaining 310g in slow circles</p>
                  <p className="text-sm text-emerald-700"><strong>Total brew time:</strong> 3:00-3:30</p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700"><strong>Pro tip:</strong> For light roasts, use water at 205°F and aim for the longer brew time. The extra heat and time help extract the complex fruit acids that make light roasts special.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 2 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">French Press for Two — Sunday Morning Ritual</h3>
                <p className="text-gray-600 mb-4">
                  You and your partner enjoy coffee together on weekend mornings. Your 34oz French press is perfect for two large mugs with a bit left over.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1"><strong>French press size:</strong> 34 oz (1 liter)</p>
                  <p className="text-sm text-gray-600 mb-1"><strong>Servings:</strong> 2 large mugs (~14 oz each)</p>
                  <p className="text-sm text-gray-600 mb-1"><strong>Ratio:</strong> 1:15 (you like it bold)</p>
                  <p className="text-sm text-gray-600"><strong>Grind:</strong> Coarse (breadcrumbs texture)</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-emerald-800 mb-2">Recipe:</p>
                  <p className="text-sm text-emerald-700">66g coffee + 1000g water</p>
                  <p className="text-sm text-emerald-700 mt-2"><strong>Process:</strong></p>
                  <p className="text-sm text-emerald-700">1. Add coffee, pour all water, start timer</p>
                  <p className="text-sm text-emerald-700">2. At 4:00, break crust with spoon, stir gently</p>
                  <p className="text-sm text-emerald-700">3. Scoop off foam and grounds</p>
                  <p className="text-sm text-emerald-700">4. At 6:00, press and serve immediately</p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700"><strong>Pro tip:</strong> Don&apos;t leave coffee sitting in the French press — it keeps extracting and gets bitter. Pour everything out, even if you&apos;re not drinking it all immediately.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 3 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Cold Brew Concentrate — Week&apos;s Supply for Iced Coffee</h3>
                <p className="text-gray-600 mb-4">
                  Summer&apos;s here and you want iced coffee every morning. You&apos;re making a batch of concentrate to last the week, diluted to taste when served.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1"><strong>Goal:</strong> ~10 servings of iced coffee</p>
                  <p className="text-sm text-gray-600 mb-1"><strong>Container:</strong> 64 oz (2 quart) jar</p>
                  <p className="text-sm text-gray-600 mb-1"><strong>Concentrate ratio:</strong> 1:5</p>
                  <p className="text-sm text-gray-600"><strong>Grind:</strong> Extra coarse (rock salt)</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-emerald-800 mb-2">Concentrate Recipe:</p>
                  <p className="text-sm text-emerald-700">200g coffee + 1000g cold water = ~1 liter concentrate</p>
                  <p className="text-sm text-emerald-700 mt-2"><strong>Steep:</strong> 18-24 hours at room temp or in fridge</p>
                  <p className="text-sm text-emerald-700"><strong>Strain:</strong> Through fine mesh or cheesecloth</p>
                  <p className="text-sm text-emerald-700 mt-2"><strong>Per serving:</strong> 100ml concentrate + 100ml water + ice</p>
                  <p className="text-sm text-emerald-700">Or: 100ml concentrate + 150ml milk for cold brew latte</p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700"><strong>Pro tip:</strong> Cold brew concentrate keeps 10-14 days refrigerated. Make it Sunday night, strain Monday morning, and you&apos;re set for two weeks of perfect iced coffee.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 4 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">4</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Office Drip Machine — Morning Meeting Coffee</h3>
                <p className="text-gray-600 mb-4">
                  You&apos;re in charge of making coffee for the 9am meeting. The office has a 12-cup drip brewer. Nobody wants weak office coffee.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1"><strong>Brewer capacity:</strong> 12 cups (60 oz / 1.8L)</p>
                  <p className="text-sm text-gray-600 mb-1"><strong>Expected servings:</strong> 8-10 mugs</p>
                  <p className="text-sm text-gray-600 mb-1"><strong>Ratio:</strong> 1:16 (balanced)</p>
                  <p className="text-sm text-gray-600"><strong>Grind:</strong> Medium (granulated sugar)</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-emerald-800 mb-2">Recipe:</p>
                  <p className="text-sm text-emerald-700">110g coffee (~22 level tablespoons)</p>
                  <p className="text-sm text-emerald-700">Fill water reservoir to 12-cup line (1775ml)</p>
                  <p className="text-sm text-emerald-700 mt-2"><strong>Start time:</strong> 8:30am for 9am meeting</p>
                  <p className="text-sm text-emerald-700"><strong>Brew time:</strong> ~8-10 minutes for full pot</p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700"><strong>Pro tip:</strong> If using pre-ground office coffee, go slightly heavier (120g) since it&apos;s usually stale and under-extracted. Fresh-ground makes dramatically better office coffee.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 5 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">5</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Espresso Dial-In — New Bag of Beans</h3>
                <p className="text-gray-600 mb-4">
                  You just got a new single origin for your home espresso machine. Time to dial it in. Standard starting point: 1:2 ratio.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1"><strong>Basket size:</strong> 18g VST basket</p>
                  <p className="text-sm text-gray-600 mb-1"><strong>Target ratio:</strong> 1:2 (dose:yield)</p>
                  <p className="text-sm text-gray-600 mb-1"><strong>Target time:</strong> 27-32 seconds</p>
                  <p className="text-sm text-gray-600"><strong>Grind:</strong> Fine, adjust based on shot time</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-emerald-800 mb-2">Starting Recipe:</p>
                  <p className="text-sm text-emerald-700">18g dose in → 36g out</p>
                  <p className="text-sm text-emerald-700 mt-2"><strong>If shot runs fast (&lt;25 sec):</strong> Grind finer</p>
                  <p className="text-sm text-emerald-700"><strong>If shot runs slow (&gt;35 sec):</strong> Grind coarser</p>
                  <p className="text-sm text-emerald-700"><strong>If sour:</strong> Try 1:2.5 ratio (longer)</p>
                  <p className="text-sm text-emerald-700"><strong>If bitter:</strong> Try 1:1.5 ratio (ristretto)</p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700"><strong>Pro tip:</strong> Let new beans rest 7-14 days after roast for espresso. Too fresh = excessive crema, channeling, and inconsistent shots. The sweet spot is usually 10-21 days post-roast.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 6 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">6</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">AeroPress Travel Coffee — Hotel Room Brewing</h3>
                <p className="text-gray-600 mb-4">
                  You&apos;re traveling for work and brought your AeroPress and hand grinder. Hotel coffee isn&apos;t an option. Using the inverted method for a concentrated brew you&apos;ll dilute with hot water.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1"><strong>Target:</strong> 10 oz Americano-style cup</p>
                  <p className="text-sm text-gray-600 mb-1"><strong>Method:</strong> AeroPress inverted</p>
                  <p className="text-sm text-gray-600 mb-1"><strong>Concentrate ratio:</strong> 1:10</p>
                  <p className="text-sm text-gray-600"><strong>Grind:</strong> Medium-fine (table salt)</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-emerald-800 mb-2">Recipe:</p>
                  <p className="text-sm text-emerald-700">17g coffee + 170g water (just off boil)</p>
                  <p className="text-sm text-emerald-700 mt-2"><strong>Process:</strong></p>
                  <p className="text-sm text-emerald-700">1. Add coffee, pour water, stir 10 sec</p>
                  <p className="text-sm text-emerald-700">2. Steep 1:30 total</p>
                  <p className="text-sm text-emerald-700">3. Flip, press 30 sec into mug</p>
                  <p className="text-sm text-emerald-700">4. Add ~120ml hot water to taste</p>
                  <p className="text-sm text-emerald-700 mt-2"><strong>Final cup:</strong> ~290ml (10 oz)</p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700"><strong>Pro tip:</strong> Bring a small bag of whole beans and a hand grinder. Pre-ground coffee goes stale in days. A good hand grinder fits in a toiletry bag and makes hotel room coffee legitimately great.</p>
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
            Coffee Ratio by Brew Method
          </h2>
          <p>
            Different brewing methods extract coffee differently, so they need different ratios. Use this comprehensive guide to find your starting point, then adjust to taste.
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4 bg-gray-50">Method</th>
                  <th className="text-left py-2 pr-4 bg-gray-50">Ratio</th>
                  <th className="text-left py-2 pr-4 bg-gray-50">Grind Size</th>
                  <th className="text-left py-2 pr-4 bg-gray-50">Water Temp</th>
                  <th className="text-left py-2 pr-4 bg-gray-50">Brew Time</th>
                  <th className="text-left py-2 bg-gray-50">Profile</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">Pour Over (V60)</td>
                  <td className="py-2 pr-4">1:15 - 1:17</td>
                  <td className="py-2 pr-4">Medium-fine</td>
                  <td className="py-2 pr-4">200-205°F</td>
                  <td className="py-2 pr-4">2:30-3:30</td>
                  <td className="py-2">Bright, clean, nuanced</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">Chemex</td>
                  <td className="py-2 pr-4">1:15 - 1:17</td>
                  <td className="py-2 pr-4">Medium-coarse</td>
                  <td className="py-2 pr-4">200-205°F</td>
                  <td className="py-2 pr-4">4:00-5:00</td>
                  <td className="py-2">Very clean, sweet</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">Kalita Wave</td>
                  <td className="py-2 pr-4">1:15 - 1:16</td>
                  <td className="py-2 pr-4">Medium</td>
                  <td className="py-2 pr-4">200-205°F</td>
                  <td className="py-2 pr-4">3:00-4:00</td>
                  <td className="py-2">Balanced, forgiving</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">French Press</td>
                  <td className="py-2 pr-4">1:14 - 1:16</td>
                  <td className="py-2 pr-4">Coarse</td>
                  <td className="py-2 pr-4">200°F</td>
                  <td className="py-2 pr-4">4:00-6:00</td>
                  <td className="py-2">Full body, rich</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">AeroPress</td>
                  <td className="py-2 pr-4">1:10 - 1:14</td>
                  <td className="py-2 pr-4">Fine-medium</td>
                  <td className="py-2 pr-4">175-205°F</td>
                  <td className="py-2 pr-4">1:00-2:30</td>
                  <td className="py-2">Versatile, clean</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">Drip Machine</td>
                  <td className="py-2 pr-4">1:15 - 1:18</td>
                  <td className="py-2 pr-4">Medium</td>
                  <td className="py-2 pr-4">195-205°F</td>
                  <td className="py-2 pr-4">5-8 min</td>
                  <td className="py-2">Convenient, consistent</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">Cold Brew</td>
                  <td className="py-2 pr-4">1:4 - 1:8</td>
                  <td className="py-2 pr-4">Extra coarse</td>
                  <td className="py-2 pr-4">Room/cold</td>
                  <td className="py-2 pr-4">12-24 hours</td>
                  <td className="py-2">Smooth, low acid</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">Espresso</td>
                  <td className="py-2 pr-4">1:1.5 - 1:2.5</td>
                  <td className="py-2 pr-4">Very fine</td>
                  <td className="py-2 pr-4">195-205°F</td>
                  <td className="py-2 pr-4">25-35 sec</td>
                  <td className="py-2">Concentrated, intense</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">Moka Pot</td>
                  <td className="py-2 pr-4">1:7 - 1:10</td>
                  <td className="py-2 pr-4">Fine (not espresso)</td>
                  <td className="py-2 pr-4">Boiling</td>
                  <td className="py-2 pr-4">4-5 min</td>
                  <td className="py-2">Strong, bold</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">Turkish/Ibrik</td>
                  <td className="py-2 pr-4">1:9 - 1:12</td>
                  <td className="py-2 pr-4">Powder fine</td>
                  <td className="py-2 pr-4">195-200°F</td>
                  <td className="py-2 pr-4">2-3 min</td>
                  <td className="py-2">Thick, aromatic</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">Siphon</td>
                  <td className="py-2 pr-4">1:14 - 1:16</td>
                  <td className="py-2 pr-4">Medium</td>
                  <td className="py-2 pr-4">200°F</td>
                  <td className="py-2 pr-4">1:00-1:30</td>
                  <td className="py-2">Clean, tea-like</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">Clever Dripper</td>
                  <td className="py-2 pr-4">1:15 - 1:17</td>
                  <td className="py-2 pr-4">Medium</td>
                  <td className="py-2 pr-4">200-205°F</td>
                  <td className="py-2 pr-4">2:30-3:30</td>
                  <td className="py-2">Full body, clean</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            The SCA Golden Cup Standard
          </h3>
          <p>
            The Specialty Coffee Association (SCA) defines the &quot;Golden Cup&quot; standard: a ratio of 1:15 to 1:18 extracts
            18-22% of coffee solubles, producing the optimal balance of flavor, body, and acidity. Most specialty
            coffee shops aim for 1:16, with slight adjustments based on roast level and origin.
          </p>
          <ul>
            <li><strong>1:14</strong> = Very strong, concentrated (70g/L) — espresso-style</li>
            <li><strong>1:15</strong> = Strong, intense (65g/L) — bold preference</li>
            <li><strong>1:16</strong> = Balanced, standard (60g/L) — industry default</li>
            <li><strong>1:17</strong> = Light, delicate (58g/L) — nuanced flavors</li>
            <li><strong>1:18</strong> = Light, tea-like (55g/L) — very gentle</li>
          </ul>
        </div>
      </section>

      {/* More Content */}
      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl prose prose-lg">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            Quick Reference Charts
          </h2>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-6 mb-4">
            Coffee for Common Cup Sizes
          </h3>
          <p className="text-gray-600 mb-4">
            Quick lookup table for how much coffee to use at different ratios. Water amounts assume you want finished beverage volume (accounting for ~10% absorption by grounds).
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4 bg-gray-50">Cup Size</th>
                  <th className="text-left py-2 pr-4 bg-gray-50">Water (ml)</th>
                  <th className="text-left py-2 pr-4 bg-gray-50">1:15 (strong)</th>
                  <th className="text-left py-2 pr-4 bg-gray-50">1:16 (standard)</th>
                  <th className="text-left py-2 pr-4 bg-gray-50">1:17 (light)</th>
                  <th className="text-left py-2 bg-gray-50">Tablespoons</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">6 oz (small)</td>
                  <td className="py-2 pr-4">177 ml</td>
                  <td className="py-2 pr-4">12g</td>
                  <td className="py-2 pr-4">11g</td>
                  <td className="py-2 pr-4">10g</td>
                  <td className="py-2">~2 tbsp</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">8 oz (standard)</td>
                  <td className="py-2 pr-4">237 ml</td>
                  <td className="py-2 pr-4">16g</td>
                  <td className="py-2 pr-4">15g</td>
                  <td className="py-2 pr-4">14g</td>
                  <td className="py-2">~2.5 tbsp</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">10 oz (medium)</td>
                  <td className="py-2 pr-4">296 ml</td>
                  <td className="py-2 pr-4">20g</td>
                  <td className="py-2 pr-4">18.5g</td>
                  <td className="py-2 pr-4">17g</td>
                  <td className="py-2">~3 tbsp</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">12 oz (large)</td>
                  <td className="py-2 pr-4">355 ml</td>
                  <td className="py-2 pr-4">24g</td>
                  <td className="py-2 pr-4">22g</td>
                  <td className="py-2 pr-4">21g</td>
                  <td className="py-2">~3.5-4 tbsp</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">16 oz (grande)</td>
                  <td className="py-2 pr-4">473 ml</td>
                  <td className="py-2 pr-4">32g</td>
                  <td className="py-2 pr-4">30g</td>
                  <td className="py-2 pr-4">28g</td>
                  <td className="py-2">~5 tbsp</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">20 oz (venti)</td>
                  <td className="py-2 pr-4">591 ml</td>
                  <td className="py-2 pr-4">39g</td>
                  <td className="py-2 pr-4">37g</td>
                  <td className="py-2 pr-4">35g</td>
                  <td className="py-2">~6.5 tbsp</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">32 oz (traveler)</td>
                  <td className="py-2 pr-4">946 ml</td>
                  <td className="py-2 pr-4">63g</td>
                  <td className="py-2 pr-4">59g</td>
                  <td className="py-2 pr-4">56g</td>
                  <td className="py-2">~10-11 tbsp</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Batch Brewing Guide
          </h3>
          <p className="text-gray-600 mb-4">
            Making coffee for groups? Here&apos;s how to scale up while maintaining quality.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4 bg-gray-50">Servings</th>
                  <th className="text-left py-2 pr-4 bg-gray-50">Water Needed</th>
                  <th className="text-left py-2 pr-4 bg-gray-50">Coffee (1:16)</th>
                  <th className="text-left py-2 pr-4 bg-gray-50">Coffee (cups)</th>
                  <th className="text-left py-2 bg-gray-50">Best Method</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">2 people</td>
                  <td className="py-2 pr-4">500ml</td>
                  <td className="py-2 pr-4">31g</td>
                  <td className="py-2 pr-4">~1/3 cup</td>
                  <td className="py-2">French press, pour over</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">4 people</td>
                  <td className="py-2 pr-4">1L</td>
                  <td className="py-2 pr-4">62g</td>
                  <td className="py-2 pr-4">~2/3 cup</td>
                  <td className="py-2">Large French press, Chemex</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">6-8 people</td>
                  <td className="py-2 pr-4">1.5L</td>
                  <td className="py-2 pr-4">94g</td>
                  <td className="py-2 pr-4">~1 cup</td>
                  <td className="py-2">10-cup drip, large Chemex</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">10-12 people</td>
                  <td className="py-2 pr-4">2L</td>
                  <td className="py-2 pr-4">125g</td>
                  <td className="py-2 pr-4">~1.25 cups</td>
                  <td className="py-2">12-cup drip, batch brewer</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">15-20 people</td>
                  <td className="py-2 pr-4">3L</td>
                  <td className="py-2 pr-4">188g</td>
                  <td className="py-2 pr-4">~2 cups</td>
                  <td className="py-2">Commercial brewer, 2 pots</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">25-30 people</td>
                  <td className="py-2 pr-4">4L</td>
                  <td className="py-2 pr-4">250g</td>
                  <td className="py-2 pr-4">~2.5 cups</td>
                  <td className="py-2">Urn, multiple pots</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Grind Size Guide
          </h3>
          <p className="text-gray-600 mb-4">
            Grind size is as important as ratio for proper extraction. Here&apos;s what each level looks and feels like.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4 bg-gray-50">Grind Level</th>
                  <th className="text-left py-2 pr-4 bg-gray-50">Texture Comparison</th>
                  <th className="text-left py-2 pr-4 bg-gray-50">Methods</th>
                  <th className="text-left py-2 bg-gray-50">Extraction Speed</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">Extra Coarse</td>
                  <td className="py-2 pr-4">Peppercorns, rock salt</td>
                  <td className="py-2 pr-4">Cold brew, cowboy coffee</td>
                  <td className="py-2">Very slow</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">Coarse</td>
                  <td className="py-2 pr-4">Kosher salt, breadcrumbs</td>
                  <td className="py-2 pr-4">French press, percolator</td>
                  <td className="py-2">Slow</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">Medium-Coarse</td>
                  <td className="py-2 pr-4">Coarse sand</td>
                  <td className="py-2 pr-4">Chemex, Clever Dripper</td>
                  <td className="py-2">Medium-slow</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">Medium</td>
                  <td className="py-2 pr-4">Regular sand, sugar</td>
                  <td className="py-2 pr-4">Drip, Kalita, siphon</td>
                  <td className="py-2">Medium</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">Medium-Fine</td>
                  <td className="py-2 pr-4">Table salt, fine sand</td>
                  <td className="py-2 pr-4">V60, AeroPress</td>
                  <td className="py-2">Medium-fast</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">Fine</td>
                  <td className="py-2 pr-4">Powdered sugar, flour</td>
                  <td className="py-2 pr-4">Moka pot, AeroPress (fast)</td>
                  <td className="py-2">Fast</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">Very Fine</td>
                  <td className="py-2 pr-4">Powder, smooth flour</td>
                  <td className="py-2 pr-4">Espresso</td>
                  <td className="py-2">Very fast (under pressure)</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">Turkish</td>
                  <td className="py-2 pr-4">Powder, cocoa-like</td>
                  <td className="py-2 pr-4">Turkish/Greek coffee</td>
                  <td className="py-2">Stays in cup</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Variables That Affect Extraction
          </h3>
          <ul>
            <li><strong>Grind size:</strong> Finer = faster extraction = stronger. Too fine = bitter and over-extracted.</li>
            <li><strong>Water temperature:</strong> 195-205°F (90-96°C) is optimal. Hotter = more extraction. Cooler = under-extracted.</li>
            <li><strong>Brew time:</strong> Longer = more extraction. Adjust grind to control time for your method.</li>
            <li><strong>Water quality:</strong> Use filtered water. Hard water (high mineral) extracts differently than soft.</li>
            <li><strong>Coffee freshness:</strong> Fresh roasted coffee (7-30 days post-roast) extracts best and tastes brightest.</li>
            <li><strong>Coffee origin:</strong> Different origins extract at different rates. Adjust grind accordingly.</li>
            <li><strong>Roast level:</strong> Dark roasts extract faster (more porous). Light roasts need finer grind or longer time.</li>
            <li><strong>Agitation:</strong> Stirring or pouring technique affects extraction uniformity and speed.</li>
          </ul>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Adjusting for Taste
          </h3>
          <ul>
            <li><strong>Too weak/watery:</strong> Use more coffee, finer grind, hotter water, or longer brew</li>
            <li><strong>Too strong/intense:</strong> Use less coffee, coarser grind, or shorter brew</li>
            <li><strong>Bitter:</strong> Grind coarser, brew shorter, use cooler water, clean equipment</li>
            <li><strong>Sour/acidic:</strong> Grind finer, brew longer, use hotter water, check freshness</li>
            <li><strong>Hollow/papery:</strong> Use fresher coffee, check water quality, ensure proper saturation</li>
            <li><strong>Astringent/dry:</strong> Water too hot, over-agitation, or very fine particles (fines)</li>
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
              href="/cooking-measurement-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Measurement Converter</h3>
              <p className="text-sm text-gray-600">Convert between cups, grams, ounces, and milliliters</p>
            </Link>
            <Link
              href="/recipe-scaler"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Recipe Scaler</h3>
              <p className="text-sm text-gray-600">Scale coffee recipes for any group size</p>
            </Link>
            <Link
              href="/party-food-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Party Food Calculator</h3>
              <p className="text-sm text-gray-600">Calculate drinks and beverages for events</p>
            </Link>
            <Link
              href="/bakers-percentage-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Baker&apos;s Percentage Calculator</h3>
              <p className="text-sm text-gray-600">Understand ratios and percentages in recipes</p>
            </Link>
            <Link
              href="/recipe-cost-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Recipe Cost Calculator</h3>
              <p className="text-sm text-gray-600">Calculate cost per cup of your home brew</p>
            </Link>
            <Link
              href="/oven-temperature-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Temperature Converter</h3>
              <p className="text-sm text-gray-600">Convert Fahrenheit and Celsius for water temps</p>
            </Link>
            <Link
              href="/sourdough-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Sourdough Calculator</h3>
              <p className="text-sm text-gray-600">Perfect ratios for your morning bread too</p>
            </Link>
            <Link
              href="/butter-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Butter Converter</h3>
              <p className="text-sm text-gray-600">Bulletproof coffee butter measurements</p>
            </Link>
            <Link
              href="/recipe-macro-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Recipe Macro Calculator</h3>
              <p className="text-sm text-gray-600">Track caffeine and calories in your coffee</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Authority Sources Footer */}
      <section className="py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-sm text-gray-500 text-center">
            Coffee brewing standards and extraction science referenced from{" "}
            <a href="https://sca.coffee/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">Specialty Coffee Association (SCA)</a>,{" "}
            <a href="https://www.baristahustle.com/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">Barista Hustle</a>,{" "}
            <a href="https://www.jameshoffmann.co.uk/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">James Hoffmann</a>,{" "}
            <a href="https://counterculturecoffee.com/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">Counter Culture Coffee</a>, and{" "}
            <a href="https://www.perfectdailygrind.com/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">Perfect Daily Grind</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
