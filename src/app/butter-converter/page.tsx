import { Metadata } from "next";
import Link from "next/link";
import ButterConverter from "@/components/calculators/ButterConverter";
import { FAQPageJsonLd, WebApplicationJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Butter Converter — Sticks to Cups, Grams, Tablespoons, Ounces | CalcKitchen",
  description: "Convert butter between sticks, cups, tablespoons, grams, ounces, and pounds. Includes US stick markings guide, international butter sizes, and quick-reference chart.",
  openGraph: {
    title: "Butter Converter — Sticks to Cups, Grams, Tablespoons, Ounces",
    description: "Convert butter between sticks, cups, tablespoons, grams, ounces, and pounds. Includes US stick markings guide, international butter sizes, and quick-reference chart.",
    url: "https://calckitchen.com/butter-converter",
    type: "website",
  },
  alternates: {
    canonical: "https://calckitchen.com/butter-converter",
  },
};

const faqs = [
  {
    question: "How many cups in a stick of butter?",
    answer: "One standard US stick of butter equals exactly ½ cup (8 tablespoons, 4 ounces, 113.4 grams). Two sticks equal 1 cup, and four sticks equal 2 cups (1 pound).",
  },
  {
    question: "How many tablespoons in a stick of butter?",
    answer: "There are 8 tablespoons in one US stick of butter. Each tablespoon is about 14.2 grams. The markings on the butter wrapper show each tablespoon increment from 1 to 8.",
  },
  {
    question: "How much is half a stick of butter?",
    answer: "Half a stick of butter is ¼ cup, 4 tablespoons, 2 ounces, or 56.7 grams. Cut the stick at the \"4\" tablespoon marking on the wrapper.",
  },
  {
    question: "How much is 1 stick of butter in grams?",
    answer: "One US stick of butter is 113.4 grams. This is slightly less than half a European 250 g block (which is 125 g cut in half). For most recipes, 113 g or 115 g is close enough when measuring by weight.",
  },
  {
    question: "Is a stick of butter the same worldwide?",
    answer: "No. Butter sticks are a US-only measurement. Europe, Australia, and most other countries sell butter in 250 g or 500 g blocks. Even within the US, west coast brands sometimes package sticks in a shorter, wider shape, though the weight remains 113.4 g.",
  },
  {
    question: "How do I measure butter without a scale?",
    answer: "Use the wrapper markings. Each US stick is marked with 8 tablespoon lines and ¼ cup intervals. If you need 3 tablespoons, cut at the \"3\" line. For unwrapped butter, the water displacement method works: fill a measuring cup with water to the 1-cup line, then add butter until the water reaches the amount you need.",
  },
  {
    question: "Can I substitute margarine 1:1 for butter?",
    answer: "In most recipes, yes — margarine (stick form, not tub) can be substituted 1:1 for butter by volume and weight. However, margarine has slightly higher water content and lower fat, which can affect texture in pastry and cookies. Tub margarine has even higher water content and shouldn't be used in baking at all.",
  },
  {
    question: "How long does butter last?",
    answer: "Unsalted butter keeps for about 1 month in the refrigerator and 6–9 months in the freezer. Salted butter lasts about 2 months refrigerated. Butter freezes well with no texture change — wrap tightly in foil or freezer bags to prevent freezer burn and flavor absorption.",
  },
  {
    question: "How do I soften butter quickly for baking?",
    answer: "For properly softened butter (65–67°F), cut cold butter into ½-inch cubes and let sit at room temperature for 15–20 minutes. For faster results, pound cold butter between parchment paper with a rolling pin, or microwave at 20% power in 5-second intervals, turning between bursts. Never fully melt butter meant for creaming — it won't incorporate air properly.",
  },
  {
    question: "What's the difference between clarified butter and ghee?",
    answer: "Both remove milk solids from butter, but the process differs. Clarified butter is gently melted and strained to remove water and milk solids, yielding pure butterfat. Ghee is cooked longer until milk solids brown and caramelize before straining, giving a nuttier flavor. Both have higher smoke points (~450°F vs butter's 350°F) and longer shelf life. 1 cup butter yields about ¾ cup clarified butter or ghee.",
  },
  {
    question: "How do I convert between European and American butter?",
    answer: "European butter has 82–86% fat content vs American butter's 80%, plus lower water content. For most recipes, the difference is negligible. However, for laminated doughs (croissants, puff pastry), European-style butter performs noticeably better due to its higher fat and lower water content, creating more defined layers.",
  },
  {
    question: "Why does my recipe specify \"cold butter\" vs \"room temperature butter\"?",
    answer: "Temperature matters for texture. Cold butter (35–40°F) is essential for flaky pastries — it creates steam pockets as it melts during baking. Room temperature butter (65–67°F) is needed for creaming with sugar to incorporate air for fluffy cakes and cookies. Melted butter creates denser, chewier textures. Using the wrong temperature is a common cause of baking failures.",
  },
];

export default function ButterConverterPage() {
  return (
    <div className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Butter Converter"
        description="Convert butter between sticks, cups, tablespoons, grams, ounces, and pounds. Quick-click presets and international butter size support."
        url="https://calckitchen.com/butter-converter"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Butter Converter", url: "https://calckitchen.com/butter-converter" },
        ]}
      />

      {/* Hero Section with Calculator */}
      <section className="bg-gradient-to-b from-warm-white to-white py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Butter Converter — Sticks, Cups, Grams & More
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Convert butter between sticks, cups, tablespoons, grams, ounces, and pounds. Includes quick presets and support for international butter sizes.
          </p>

          {/* Calculator Component */}
          <ButterConverter />
        </div>
      </section>

      {/* Real-World Examples Section */}
      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Real-World Butter Conversion Examples
          </h2>
          <p className="text-gray-700 mb-8">
            See how the butter converter handles common baking and cooking scenarios with step-by-step calculations.
          </p>

          {/* Example 1 */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-3">Example 1: Converting a French Croissant Recipe</h3>
            <p className="text-gray-700 mb-4">
              A classic French croissant recipe calls for 280 grams of cold butter for laminating. You need to know how many US sticks to buy at the grocery store.
            </p>
            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-gray-600 mb-1">Input:</p>
              <p className="text-gray-900">280 grams of butter</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-emerald-700 mb-1">Result:</p>
              <p className="text-emerald-900 font-semibold">2.47 sticks ≈ 2½ sticks (1¼ cups, 19.7 tablespoons)</p>
              <p className="text-emerald-800 text-sm mt-1">Breakdown: 280g ÷ 113.4g per stick = 2.47 sticks</p>
            </div>
            <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
              <p className="text-sm text-gray-700"><strong>Pro Tip:</strong> For laminated doughs, buy 3 sticks to have extra. European-style butter (like Plugrá or Kerrygold) has 82–86% fat content vs 80% in standard US butter, making it better for croissants — the higher fat creates more defined, flaky layers.</p>
            </div>
          </div>

          {/* Example 2 */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-3">Example 2: Halving a Pie Crust Recipe</h3>
            <p className="text-gray-700 mb-4">
              Your double pie crust recipe calls for 1¼ cups of butter, but you only need a single crust. How much butter should you cut?
            </p>
            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-gray-600 mb-1">Input:</p>
              <p className="text-gray-900">1¼ cups butter ÷ 2 (halved)</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-emerald-700 mb-1">Result:</p>
              <p className="text-emerald-900 font-semibold">⅝ cup = 10 tablespoons = 1¼ sticks = 141.8 g</p>
              <p className="text-emerald-800 text-sm mt-1">How to cut: Use 1 full stick + cut a second stick at the "2" tablespoon mark</p>
            </div>
            <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
              <p className="text-sm text-gray-700"><strong>Pro Tip:</strong> For flaky pie crust, the butter must stay cold. Cut your butter into ½-inch cubes, then freeze for 15 minutes before adding to the flour. Small, cold butter pieces create steam pockets that make the crust flaky.</p>
            </div>
          </div>

          {/* Example 3 */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-3">Example 3: Making Compound Butter for Steak Night</h3>
            <p className="text-gray-700 mb-4">
              You're making garlic herb compound butter for 8 guests. Each steak gets a 1-tablespoon medallion. How much butter base do you need?
            </p>
            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-gray-600 mb-1">Input:</p>
              <p className="text-gray-900">8 servings × 1 tablespoon each = 8 tablespoons</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-emerald-700 mb-1">Result:</p>
              <p className="text-emerald-900 font-semibold">8 tablespoons = 1 stick = ½ cup = 113.4 g = 4 oz</p>
              <p className="text-emerald-800 text-sm mt-1">Perfect match: One stick provides exactly 8 one-tablespoon portions</p>
            </div>
            <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
              <p className="text-sm text-gray-700"><strong>Pro Tip:</strong> For uniform portions, roll softened compound butter in plastic wrap into a log, then refrigerate. Once firm, slice into ½-inch rounds — each round is approximately 1 tablespoon. Freeze extras; compound butter keeps 3 months frozen.</p>
            </div>
          </div>

          {/* Example 4 */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-3">Example 4: Converting Australian Recipe to US Measurements</h3>
            <p className="text-gray-700 mb-4">
              An Australian lamington recipe calls for "125g butter (half a block)." You need to convert this to US sticks.
            </p>
            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-gray-600 mb-1">Input:</p>
              <p className="text-gray-900">125 grams (half of Australian 250g block)</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-emerald-700 mb-1">Result:</p>
              <p className="text-emerald-900 font-semibold">1.10 sticks ≈ 1 stick + 1 tablespoon (8.8 tbsp total)</p>
              <p className="text-emerald-800 text-sm mt-1">Breakdown: 125g ÷ 113.4g per stick = 1.10 sticks. Extra 11.6g = ~0.8 tbsp</p>
            </div>
            <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
              <p className="text-sm text-gray-700"><strong>Pro Tip:</strong> Australian tablespoons are 20 ml (vs US 15 ml). When an Australian recipe says "2 tablespoons butter," that's actually 2.67 US tablespoons or about 40 grams — a difference that matters in precise baking.</p>
            </div>
          </div>

          {/* Example 5 */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-3">Example 5: Batch Baking for a Bake Sale</h3>
            <p className="text-gray-700 mb-4">
              You're tripling your chocolate chip cookie recipe that calls for ¾ cup butter per batch. How many pounds of butter should you buy?
            </p>
            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-gray-600 mb-1">Input:</p>
              <p className="text-gray-900">¾ cup × 3 batches = 2¼ cups butter total</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-emerald-700 mb-1">Result:</p>
              <p className="text-emerald-900 font-semibold">2¼ cups = 4½ sticks = 36 tablespoons = 510 g = 1.125 lbs</p>
              <p className="text-emerald-800 text-sm mt-1">Shopping: Buy 2 boxes (8 sticks / 2 lbs) — you'll use 4½ sticks with 3½ to spare</p>
            </div>
            <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
              <p className="text-sm text-gray-700"><strong>Pro Tip:</strong> For consistent cookies across large batches, weigh the butter rather than measuring by volume. Use 170g per batch instead of ¾ cup — digital scales eliminate the packing variations that affect volume measurements.</p>
            </div>
          </div>

          {/* Example 6 */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-3">Example 6: Reducing Butter in a Heart-Healthy Recipe</h3>
            <p className="text-gray-700 mb-4">
              Your doctor recommended reducing saturated fat. Your banana bread recipe calls for 1 cup (2 sticks) of butter. You want to replace half with Greek yogurt — how much butter do you actually need?
            </p>
            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-gray-600 mb-1">Input:</p>
              <p className="text-gray-900">1 cup butter ÷ 2 = ½ cup butter needed (other half replaced)</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-emerald-700 mb-1">Result:</p>
              <p className="text-emerald-900 font-semibold">½ cup = 1 stick = 8 tablespoons = 113.4 g butter</p>
              <p className="text-emerald-800 text-sm mt-1">Substitution: Use 1 stick butter + ½ cup Greek yogurt</p>
            </div>
            <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
              <p className="text-sm text-gray-700"><strong>Pro Tip:</strong> Greek yogurt substitutes 1:1 for butter by volume in quick breads and muffins. Use full-fat Greek yogurt for best results — non-fat versions add too much moisture. Applesauce and mashed banana also work as 1:1 butter replacements in these recipes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl prose prose-lg">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            The Complete Butter Conversion Chart
          </h2>
          <p>
            One standard US stick of butter equals ½ cup, 8 tablespoons, 113.4 grams, or 4 ounces. That single fact answers about 80% of butter conversion questions, but most recipes don't call for exactly one stick.
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-center py-2 pr-2">Sticks</th>
                  <th className="text-center py-2 pr-2">Cups</th>
                  <th className="text-center py-2 pr-2">Tbsp</th>
                  <th className="text-center py-2 pr-2">Tsp</th>
                  <th className="text-center py-2 pr-2">Grams</th>
                  <th className="text-center py-2 pr-2">Ounces</th>
                  <th className="text-center py-2 pr-2">Pounds</th>
                  <th className="text-center py-2">Common Use</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-2 text-center">⅛</td>
                  <td className="py-2 pr-2 text-center">1/16</td>
                  <td className="py-2 pr-2 text-center">1</td>
                  <td className="py-2 pr-2 text-center">3</td>
                  <td className="py-2 pr-2 text-center">14.2 g</td>
                  <td className="py-2 pr-2 text-center">½ oz</td>
                  <td className="py-2 pr-2 text-center">—</td>
                  <td className="py-2 text-center text-xs">Toast, small sauté</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-2 text-center">¼</td>
                  <td className="py-2 pr-2 text-center">⅛</td>
                  <td className="py-2 pr-2 text-center">2</td>
                  <td className="py-2 pr-2 text-center">6</td>
                  <td className="py-2 pr-2 text-center">28.4 g</td>
                  <td className="py-2 pr-2 text-center">1 oz</td>
                  <td className="py-2 pr-2 text-center">—</td>
                  <td className="py-2 text-center text-xs">Pan sauce, eggs</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-2 text-center">⅓</td>
                  <td className="py-2 pr-2 text-center">⅙</td>
                  <td className="py-2 pr-2 text-center">2⅔</td>
                  <td className="py-2 pr-2 text-center">8</td>
                  <td className="py-2 pr-2 text-center">37.8 g</td>
                  <td className="py-2 pr-2 text-center">1.3 oz</td>
                  <td className="py-2 pr-2 text-center">—</td>
                  <td className="py-2 text-center text-xs">Single muffin batch</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-2 text-center">½</td>
                  <td className="py-2 pr-2 text-center">¼</td>
                  <td className="py-2 pr-2 text-center">4</td>
                  <td className="py-2 pr-2 text-center">12</td>
                  <td className="py-2 pr-2 text-center">56.7 g</td>
                  <td className="py-2 pr-2 text-center">2 oz</td>
                  <td className="py-2 pr-2 text-center">⅛ lb</td>
                  <td className="py-2 text-center text-xs">Small cookie batch</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-2 text-center">⅔</td>
                  <td className="py-2 pr-2 text-center">⅓</td>
                  <td className="py-2 pr-2 text-center">5⅓</td>
                  <td className="py-2 pr-2 text-center">16</td>
                  <td className="py-2 pr-2 text-center">75.6 g</td>
                  <td className="py-2 pr-2 text-center">2.7 oz</td>
                  <td className="py-2 pr-2 text-center">—</td>
                  <td className="py-2 text-center text-xs">Single pie crust</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-2 text-center">¾</td>
                  <td className="py-2 pr-2 text-center">⅜</td>
                  <td className="py-2 pr-2 text-center">6</td>
                  <td className="py-2 pr-2 text-center">18</td>
                  <td className="py-2 pr-2 text-center">85.1 g</td>
                  <td className="py-2 pr-2 text-center">3 oz</td>
                  <td className="py-2 pr-2 text-center">—</td>
                  <td className="py-2 text-center text-xs">6 biscuits</td>
                </tr>
                <tr className="border-b border-gray-100 bg-blue-50">
                  <td className="py-2 pr-2 text-center font-semibold">1</td>
                  <td className="py-2 pr-2 text-center font-semibold">½</td>
                  <td className="py-2 pr-2 text-center font-semibold">8</td>
                  <td className="py-2 pr-2 text-center font-semibold">24</td>
                  <td className="py-2 pr-2 text-center font-semibold">113.4 g</td>
                  <td className="py-2 pr-2 text-center font-semibold">4 oz</td>
                  <td className="py-2 pr-2 text-center font-semibold">¼ lb</td>
                  <td className="py-2 text-center text-xs font-semibold">1 standard stick</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-2 text-center">1¼</td>
                  <td className="py-2 pr-2 text-center">⅝</td>
                  <td className="py-2 pr-2 text-center">10</td>
                  <td className="py-2 pr-2 text-center">30</td>
                  <td className="py-2 pr-2 text-center">141.8 g</td>
                  <td className="py-2 pr-2 text-center">5 oz</td>
                  <td className="py-2 pr-2 text-center">—</td>
                  <td className="py-2 text-center text-xs">Pound cake (half)</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-2 text-center">1½</td>
                  <td className="py-2 pr-2 text-center">¾</td>
                  <td className="py-2 pr-2 text-center">12</td>
                  <td className="py-2 pr-2 text-center">36</td>
                  <td className="py-2 pr-2 text-center">170.1 g</td>
                  <td className="py-2 pr-2 text-center">6 oz</td>
                  <td className="py-2 pr-2 text-center">⅜ lb</td>
                  <td className="py-2 text-center text-xs">Double pie crust</td>
                </tr>
                <tr className="border-b border-gray-100 bg-blue-50">
                  <td className="py-2 pr-2 text-center font-semibold">2</td>
                  <td className="py-2 pr-2 text-center font-semibold">1</td>
                  <td className="py-2 pr-2 text-center font-semibold">16</td>
                  <td className="py-2 pr-2 text-center font-semibold">48</td>
                  <td className="py-2 pr-2 text-center font-semibold">226.8 g</td>
                  <td className="py-2 pr-2 text-center font-semibold">8 oz</td>
                  <td className="py-2 pr-2 text-center font-semibold">½ lb</td>
                  <td className="py-2 text-center text-xs font-semibold">2 sticks / pound cake</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-2 text-center">2½</td>
                  <td className="py-2 pr-2 text-center">1¼</td>
                  <td className="py-2 pr-2 text-center">20</td>
                  <td className="py-2 pr-2 text-center">60</td>
                  <td className="py-2 pr-2 text-center">283.5 g</td>
                  <td className="py-2 pr-2 text-center">10 oz</td>
                  <td className="py-2 pr-2 text-center">⅝ lb</td>
                  <td className="py-2 text-center text-xs">Large batch cookies</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-2 text-center">3</td>
                  <td className="py-2 pr-2 text-center">1½</td>
                  <td className="py-2 pr-2 text-center">24</td>
                  <td className="py-2 pr-2 text-center">72</td>
                  <td className="py-2 pr-2 text-center">340.2 g</td>
                  <td className="py-2 pr-2 text-center">12 oz</td>
                  <td className="py-2 pr-2 text-center">¾ lb</td>
                  <td className="py-2 text-center text-xs">Layer cake</td>
                </tr>
                <tr className="border-b border-gray-100 bg-blue-50">
                  <td className="py-2 pr-2 text-center font-semibold">4</td>
                  <td className="py-2 pr-2 text-center font-semibold">2</td>
                  <td className="py-2 pr-2 text-center font-semibold">32</td>
                  <td className="py-2 pr-2 text-center font-semibold">96</td>
                  <td className="py-2 pr-2 text-center font-semibold">453.6 g</td>
                  <td className="py-2 pr-2 text-center font-semibold">16 oz</td>
                  <td className="py-2 pr-2 text-center font-semibold">1 lb</td>
                  <td className="py-2 text-center text-xs font-semibold">1 standard box</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-2 text-center">6</td>
                  <td className="py-2 pr-2 text-center">3</td>
                  <td className="py-2 pr-2 text-center">48</td>
                  <td className="py-2 pr-2 text-center">144</td>
                  <td className="py-2 pr-2 text-center">680.4 g</td>
                  <td className="py-2 pr-2 text-center">24 oz</td>
                  <td className="py-2 pr-2 text-center">1½ lb</td>
                  <td className="py-2 text-center text-xs">Large batch pastry</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-2 text-center">8</td>
                  <td className="py-2 pr-2 text-center">4</td>
                  <td className="py-2 pr-2 text-center">64</td>
                  <td className="py-2 pr-2 text-center">192</td>
                  <td className="py-2 pr-2 text-center">907.2 g</td>
                  <td className="py-2 pr-2 text-center">32 oz</td>
                  <td className="py-2 pr-2 text-center">2 lb</td>
                  <td className="py-2 text-center text-xs">2 boxes / bakery batch</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Understanding US Butter Stick Markings
          </h3>
          <p>
            If you've ever looked closely at a US butter wrapper, you'll notice tablespoon markings printed along the side. Each stick is marked from 1 to 8 tablespoons, making it easy to cut precise amounts without measuring.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Amount Needed</th>
                  <th className="text-left py-2 pr-4">In Sticks</th>
                  <th className="text-left py-2 pr-4">Grams</th>
                  <th className="text-left py-2 pr-4">How to Cut</th>
                  <th className="text-left py-2">Common Recipe Use</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">1 tablespoon</td>
                  <td className="py-2 pr-4">⅛ stick</td>
                  <td className="py-2 pr-4">14 g</td>
                  <td className="py-2 pr-4">Cut at the "1" mark</td>
                  <td className="py-2 text-xs">Finishing butter on steak</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">2 tablespoons</td>
                  <td className="py-2 pr-4">¼ stick</td>
                  <td className="py-2 pr-4">28 g</td>
                  <td className="py-2 pr-4">Cut at the "2" mark</td>
                  <td className="py-2 text-xs">Pan sauce, roux starter</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">3 tablespoons</td>
                  <td className="py-2 pr-4">⅜ stick</td>
                  <td className="py-2 pr-4">43 g</td>
                  <td className="py-2 pr-4">Cut at the "3" mark</td>
                  <td className="py-2 text-xs">Single batch brownies</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">¼ cup (4 tbsp)</td>
                  <td className="py-2 pr-4">½ stick</td>
                  <td className="py-2 pr-4">57 g</td>
                  <td className="py-2 pr-4">Cut the stick in half</td>
                  <td className="py-2 text-xs">Half-batch cookies</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">5 tablespoons</td>
                  <td className="py-2 pr-4">⅝ stick</td>
                  <td className="py-2 pr-4">71 g</td>
                  <td className="py-2 pr-4">Cut at the "5" mark</td>
                  <td className="py-2 text-xs">Single pie crust</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">6 tablespoons</td>
                  <td className="py-2 pr-4">¾ stick</td>
                  <td className="py-2 pr-4">85 g</td>
                  <td className="py-2 pr-4">Cut at the "6" mark</td>
                  <td className="py-2 text-xs">6-8 biscuits</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">7 tablespoons</td>
                  <td className="py-2 pr-4">⅞ stick</td>
                  <td className="py-2 pr-4">99 g</td>
                  <td className="py-2 pr-4">Cut at the "7" mark</td>
                  <td className="py-2 text-xs">Small batch shortbread</td>
                </tr>
                <tr className="border-b border-gray-100 bg-blue-50">
                  <td className="py-2 pr-4 font-semibold">½ cup (8 tbsp)</td>
                  <td className="py-2 pr-4 font-semibold">1 full stick</td>
                  <td className="py-2 pr-4 font-semibold">113 g</td>
                  <td className="py-2 pr-4 font-semibold">Use the whole stick</td>
                  <td className="py-2 text-xs font-semibold">Standard cookie batch</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">¾ cup (12 tbsp)</td>
                  <td className="py-2 pr-4">1½ sticks</td>
                  <td className="py-2 pr-4">170 g</td>
                  <td className="py-2 pr-4">1 stick + half stick</td>
                  <td className="py-2 text-xs">Double pie crust</td>
                </tr>
                <tr className="border-b border-gray-100 bg-blue-50">
                  <td className="py-2 pr-4 font-semibold">1 cup (16 tbsp)</td>
                  <td className="py-2 pr-4 font-semibold">2 sticks</td>
                  <td className="py-2 pr-4 font-semibold">227 g</td>
                  <td className="py-2 pr-4 font-semibold">Use 2 full sticks</td>
                  <td className="py-2 text-xs font-semibold">Pound cake, large batch cookies</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">1½ cups (24 tbsp)</td>
                  <td className="py-2 pr-4">3 sticks</td>
                  <td className="py-2 pr-4">340 g</td>
                  <td className="py-2 pr-4">Use 3 full sticks</td>
                  <td className="py-2 text-xs">Layer cake, croissants</td>
                </tr>
                <tr className="border-b border-gray-100 bg-blue-50">
                  <td className="py-2 pr-4 font-semibold">2 cups (32 tbsp)</td>
                  <td className="py-2 pr-4 font-semibold">4 sticks (1 lb)</td>
                  <td className="py-2 pr-4 font-semibold">454 g</td>
                  <td className="py-2 pr-4 font-semibold">Use 1 full box</td>
                  <td className="py-2 text-xs font-semibold">Traditional pound cake</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            International Butter Block Conversions
          </h3>
          <p>
            When converting recipes between countries, these conversions help you navigate the differences between US sticks and international butter blocks.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Country/Region</th>
                  <th className="text-left py-2 pr-4">Standard Size</th>
                  <th className="text-left py-2 pr-4">In US Sticks</th>
                  <th className="text-left py-2 pr-4">In Cups</th>
                  <th className="text-left py-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-blue-50">
                  <td className="py-2 pr-4 font-semibold">United States</td>
                  <td className="py-2 pr-4 font-semibold">113.4 g (1 stick)</td>
                  <td className="py-2 pr-4 font-semibold">1</td>
                  <td className="py-2 pr-4 font-semibold">½ cup</td>
                  <td className="py-2 text-xs font-semibold">4 sticks = 1 lb box</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">US (West Coast)</td>
                  <td className="py-2 pr-4">113.4 g (shorter stick)</td>
                  <td className="py-2 pr-4">1</td>
                  <td className="py-2 pr-4">½ cup</td>
                  <td className="py-2 text-xs">Same weight, different shape</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Europe (EU)</td>
                  <td className="py-2 pr-4">250 g block</td>
                  <td className="py-2 pr-4">2.2 sticks</td>
                  <td className="py-2 pr-4">1.1 cups</td>
                  <td className="py-2 text-xs">82-86% fat (higher than US)</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Europe (half block)</td>
                  <td className="py-2 pr-4">125 g</td>
                  <td className="py-2 pr-4">1.1 sticks</td>
                  <td className="py-2 pr-4">~½ cup + 1 tbsp</td>
                  <td className="py-2 text-xs">Common recipe amount</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">UK</td>
                  <td className="py-2 pr-4">250 g block</td>
                  <td className="py-2 pr-4">2.2 sticks</td>
                  <td className="py-2 pr-4">1.1 cups</td>
                  <td className="py-2 text-xs">Same as EU standard</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Australia/NZ</td>
                  <td className="py-2 pr-4">250 g block</td>
                  <td className="py-2 pr-4">2.2 sticks</td>
                  <td className="py-2 pr-4">1.1 cups</td>
                  <td className="py-2 text-xs">⚠️ AU tbsp = 20 ml (not 15 ml)</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Ireland</td>
                  <td className="py-2 pr-4">227 g block</td>
                  <td className="py-2 pr-4">2 sticks</td>
                  <td className="py-2 pr-4">1 cup</td>
                  <td className="py-2 text-xs">Matches US ½ lb exactly</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">France</td>
                  <td className="py-2 pr-4">250 g or 500 g</td>
                  <td className="py-2 pr-4">2.2 / 4.4 sticks</td>
                  <td className="py-2 pr-4">1.1 / 2.2 cups</td>
                  <td className="py-2 text-xs">Often 84% fat (premium)</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Germany</td>
                  <td className="py-2 pr-4">250 g block</td>
                  <td className="py-2 pr-4">2.2 sticks</td>
                  <td className="py-2 pr-4">1.1 cups</td>
                  <td className="py-2 text-xs">Marked in 50g sections</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">India</td>
                  <td className="py-2 pr-4">100 g or 500 g</td>
                  <td className="py-2 pr-4">0.88 / 4.4 sticks</td>
                  <td className="py-2 pr-4">0.44 / 2.2 cups</td>
                  <td className="py-2 text-xs">Amul brand standard</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Butter Substitution Guide
          </h3>
          <p>
            When you need to substitute butter or convert between butter and oil, these ratios will help maintain the right texture and flavor in your recipes.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Substitute For</th>
                  <th className="text-left py-2 pr-4">Use This Instead</th>
                  <th className="text-left py-2 pr-4">Ratio</th>
                  <th className="text-left py-2 pr-4">Best For</th>
                  <th className="text-left py-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">1 cup butter</td>
                  <td className="py-2 pr-4">Vegetable oil</td>
                  <td className="py-2 pr-4">¾ cup oil</td>
                  <td className="py-2 pr-4">Quick breads, muffins</td>
                  <td className="py-2 text-xs">Denser, moister texture</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">1 cup butter</td>
                  <td className="py-2 pr-4">Coconut oil</td>
                  <td className="py-2 pr-4">1 cup (solid)</td>
                  <td className="py-2 pr-4">Vegan baking, cookies</td>
                  <td className="py-2 text-xs">Slight coconut flavor</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">1 cup butter</td>
                  <td className="py-2 pr-4">Greek yogurt</td>
                  <td className="py-2 pr-4">½ cup yogurt</td>
                  <td className="py-2 pr-4">Muffins, quick breads</td>
                  <td className="py-2 text-xs">Reduces fat by 50%</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">1 cup butter</td>
                  <td className="py-2 pr-4">Applesauce</td>
                  <td className="py-2 pr-4">½ cup unsweetened</td>
                  <td className="py-2 pr-4">Cakes, muffins</td>
                  <td className="py-2 text-xs">Adds moisture, reduce sugar</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">1 cup butter</td>
                  <td className="py-2 pr-4">Mashed avocado</td>
                  <td className="py-2 pr-4">1 cup</td>
                  <td className="py-2 pr-4">Brownies, chocolate cakes</td>
                  <td className="py-2 text-xs">Healthier fats, creamy texture</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">1 cup butter</td>
                  <td className="py-2 pr-4">Ghee</td>
                  <td className="py-2 pr-4">¾ cup + 2 tbsp</td>
                  <td className="py-2 pr-4">High-heat cooking</td>
                  <td className="py-2 text-xs">Higher smoke point, nutty flavor</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">1 cup butter</td>
                  <td className="py-2 pr-4">Margarine (stick)</td>
                  <td className="py-2 pr-4">1 cup</td>
                  <td className="py-2 pr-4">Most baking</td>
                  <td className="py-2 text-xs">Avoid tub margarine for baking</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">1 cup butter</td>
                  <td className="py-2 pr-4">Shortening</td>
                  <td className="py-2 pr-4">1 cup</td>
                  <td className="py-2 pr-4">Flaky pie crusts</td>
                  <td className="py-2 text-xs">No flavor, very flaky result</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* International Butter Section */}
      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl prose prose-lg">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            International Butter Sizes
          </h2>
          <p>
            Butter sticks are a uniquely American measurement. The rest of the world packages butter in blocks of various sizes, and if you're converting between a European, Australian, or American recipe, the differences matter.
          </p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-6 mb-4">
            United States
          </h3>
          <ul>
            <li><strong>Standard stick:</strong> 113.4 g (4 oz / ½ cup / 8 tbsp)</li>
            <li><strong>Package:</strong> 4 sticks = 1 pound (453.6 g)</li>
            <li><strong>Shape:</strong> Long, narrow rectangle (about 4.75" × 1.25" × 1.25")</li>
          </ul>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-6 mb-4">
            Europe (EU Standard)
          </h3>
          <ul>
            <li><strong>Standard block:</strong> 250 g (8.82 oz)</li>
            <li><strong>Also available:</strong> 125 g, 500 g</li>
            <li><strong>Note:</strong> 250 g is close to but NOT equal to 2 US sticks (226.8 g). The difference is 23.2 g — about 1.6 tablespoons.</li>
          </ul>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-6 mb-4">
            Australia & New Zealand
          </h3>
          <ul>
            <li><strong>Standard block:</strong> 250 g</li>
            <li><strong>Note:</strong> Australian tablespoons are 20 ml (4 teaspoons), not 15 ml like US tablespoons. So "2 tablespoons of butter" in an Australian recipe is about 40 g, not 28 g.</li>
          </ul>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Salted vs. Unsalted Butter
          </h3>
          <p>
            When converting butter amounts, the salted/unsalted distinction doesn't affect volume or weight — a stick of salted butter and a stick of unsalted butter weigh the same 113.4 grams.
          </p>
          <p>
            The difference is in salt content. Salted butter typically contains about 1.5–1.7% salt by weight, or roughly ¼ teaspoon of salt per stick. If a recipe calls for unsalted butter and you're using salted, reduce any added salt in the recipe by ¼ teaspoon per stick of butter.
          </p>
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
              <p className="text-sm text-gray-600">Convert cups, grams, ounces, tablespoons & more</p>
            </Link>
            <Link
              href="/recipe-scaler"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Recipe Scaler</h3>
              <p className="text-sm text-gray-600">Double, halve, or resize any recipe precisely</p>
            </Link>
            <Link
              href="/bakers-percentage-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Baker's Percentage</h3>
              <p className="text-sm text-gray-600">Calculate ingredient ratios for bread & pastry</p>
            </Link>
            <Link
              href="/cake-pan-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Cake Pan Converter</h3>
              <p className="text-sm text-gray-600">Scale recipes for different pan sizes</p>
            </Link>
            <Link
              href="/recipe-cost-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Recipe Cost Calculator</h3>
              <p className="text-sm text-gray-600">Calculate cost per serving for any recipe</p>
            </Link>
            <Link
              href="/recipe-macro-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Recipe Macro Calculator</h3>
              <p className="text-sm text-gray-600">Calculate calories, protein, carbs & fat</p>
            </Link>
            <Link
              href="/sourdough-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Sourdough Calculator</h3>
              <p className="text-sm text-gray-600">Calculate hydration & ingredient amounts</p>
            </Link>
            <Link
              href="/pizza-dough-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Pizza Dough Calculator</h3>
              <p className="text-sm text-gray-600">Scale pizza dough for any number of pies</p>
            </Link>
            <Link
              href="/convection-oven-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Convection Oven Converter</h3>
              <p className="text-sm text-gray-600">Adjust times & temps for convection baking</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Authority Sources Footer */}
      <section className="py-8 md:py-12 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-4">
            Authority Sources & References
          </h2>
          <p className="text-gray-600 mb-4">
            The butter conversion data and baking science in this guide are based on standards from these trusted culinary and food science authorities:
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/storage-times-refrigerator"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral-600 hover:text-coral-700 underline"
            >
              USDA Food Safety Guidelines
            </a>
            <a
              href="https://www.kingarthurbaking.com/learn/guides/butter"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral-600 hover:text-coral-700 underline"
            >
              King Arthur Baking — Butter Guide
            </a>
            <a
              href="https://www.seriouseats.com/how-to-measure-butter"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral-600 hover:text-coral-700 underline"
            >
              Serious Eats — Butter Measurement Guide
            </a>
            <a
              href="https://www.americasdairy.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral-600 hover:text-coral-700 underline"
            >
              American Dairy Association
            </a>
            <a
              href="https://www.cooksillustrated.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral-600 hover:text-coral-700 underline"
            >
              Cook's Illustrated
            </a>
            <a
              href="https://www.landolakes.com/expert-advice/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral-600 hover:text-coral-700 underline"
            >
              Land O'Lakes Expert Advice
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
