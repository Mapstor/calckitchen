import { Metadata } from "next";
import Link from "next/link";
import CakePanConverter from "@/components/calculators/CakePanConverter";
import { FAQPageJsonLd, WebApplicationJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Cake Pan Converter — Resize Any Baking Recipe for a Different Pan | CalcKitchen",
  description: "Convert cake recipes between any pan sizes. Round, square, rectangular — our free calculator adjusts batter amounts and baking times. Includes pan volume chart and baking tips.",
  openGraph: {
    title: "Cake Pan Converter — Resize Any Baking Recipe for a Different Pan",
    description: "Convert cake recipes between any pan sizes. Round, square, rectangular — our free calculator adjusts batter amounts and baking times. Includes pan volume chart and baking tips.",
    url: "https://calckitchen.com/cake-pan-converter",
    type: "website",
  },
  alternates: {
    canonical: "https://calckitchen.com/cake-pan-converter",
  },
};

const faqs = [
  {
    question: "Can I substitute an 8-inch square pan for a 9-inch round?",
    answer: "Yes, they're almost identical in volume. An 8-inch square pan holds about 64 cubic inches while a 9-inch round holds about 63.5 cubic inches. The baking time should stay roughly the same, though the square pan may cook slightly faster at the corners. Check 2-3 minutes early.",
  },
  {
    question: "How do I convert a round cake recipe to a rectangular pan?",
    answer: "Calculate the area of both pans and find the ratio. For example: A 9-inch round pan has an area of about 63.5 sq inches. A 9×13 rectangular pan has an area of 117 sq inches — that's 1.84× larger. You'd need almost double the batter. Alternatively, use our calculator to get exact batter multipliers and adjusted baking times.",
  },
  {
    question: "How do I measure a pan's volume?",
    answer: "Fill the pan with water, then pour the water into a measuring cup. This gives you the exact volume. Standard 9-inch round pans (2 inches deep) hold about 8 cups. Standard 9×13 pans hold 14-15 cups. This water method is the most accurate way to measure any pan, especially unusual shapes like Bundt or springform.",
  },
  {
    question: "Do I need to adjust baking time when changing pan size?",
    answer: "Yes. Shallow pans bake faster; deeper pans need more time. A good rule: for every inch deeper, add 10-15 minutes and reduce temperature by 25°F. For smaller/shallower pans, reduce time by 5-10 minutes and check early. Our calculator provides specific time estimates.",
  },
  {
    question: "Can I convert a Bundt pan recipe to round pans?",
    answer: "Yes, but watch the depth. A standard 10-cup Bundt pan equals about two 9-inch round pans. Use two 9-inch rounds (2 inches deep each = 8 cups each, 16 cups total) for 10-12 cup Bundt recipes. Reduce baking time — rounds bake faster than the Bundt's thick center.",
  },
  {
    question: "What do I do when scaling gives me a fraction of an egg?",
    answer: "Whisk the egg thoroughly, then measure. One large egg = about 3.25 tablespoons (50ml). Half an egg = about 1.5-2 tablespoons. For recipes calling for 1.5 eggs, use 1 whole egg plus 1.5-2 tablespoons of whisked egg. Always round slightly up rather than down for proper structure.",
  },
  {
    question: "How do I prevent overflow when using a smaller pan?",
    answer: "Never fill a cake pan more than ⅔ full — the batter needs room to rise. If your recipe makes too much batter for the pan, bake the excess separately as cupcakes (standard cupcake = about 3 tablespoons batter) or mini cakes. For pound cakes and dense batters, you can fill up to ¾ full.",
  },
  {
    question: "Why do my cakes dome in the middle when I change pan sizes?",
    answer: "Doming happens when the edges set faster than the center. This is more pronounced in deeper pans or when using too high a temperature. For larger/deeper pans: reduce oven temp by 25°F, use cake strips (wet fabric around the pan), or try the 'flower nail' method — place an inverted metal flower nail in the center to conduct heat.",
  },
  {
    question: "Can I use two 8-inch round pans instead of three 6-inch pans?",
    answer: "You'll need to do the math: Two 8-inch rounds = 12 cups total. Three 6-inch rounds = 12 cups total. Yes, they're equivalent! However, the 8-inch layers will be thinner. You might want slightly less batter per 8-inch pan (about 5-5.5 cups each) for layers that match typical 6-inch cake proportions.",
  },
  {
    question: "How do I convert a sheet cake recipe to a tiered wedding cake?",
    answer: "First calculate total volume needed. A standard half-sheet (13×18) holds about 16 cups. For a three-tier cake (6\", 8\", 10\" rounds, each 4\" tall), you'd need roughly 30 cups total. You'll need to approximately double the sheet cake recipe. Always make a bit extra — better to have leftover cupcakes than not enough batter.",
  },
  {
    question: "Does pan material affect how I should convert recipes?",
    answer: "Yes. Dark metal pans absorb more heat — reduce temp by 25°F. Glass pans retain heat longer — also reduce temp by 25°F and check earlier. Silicone pans conduct heat poorly — increase time by 5-10 minutes. Aluminum pans are the baking standard and require no adjustments.",
  },
  {
    question: "How do I convert a recipe for high-altitude baking with a different pan?",
    answer: "High altitude affects both pan conversion AND baking chemistry. Above 3,500 feet: reduce leavening by 25%, increase liquid by 2-4 tablespoons per cup of flour, and increase oven temp by 15-25°F. Do the pan conversion first, then apply altitude adjustments to the scaled recipe.",
  },
];

export default function CakePanConverterPage() {
  return (
    <div className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Cake Pan Converter"
        description="Convert cake recipes between different pan sizes. Calculate batter amounts and baking time adjustments for round, square, and rectangular pans."
        url="https://calckitchen.com/cake-pan-converter"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Cake Pan Converter", url: "https://calckitchen.com/cake-pan-converter" },
        ]}
      />

      {/* Hero Section with Calculator */}
      <section className="bg-gradient-to-b from-warm-white to-white py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Cake Pan Converter
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Don't have the right pan? No problem. Convert any cake recipe to a different pan size with automatic batter and time adjustments. Whether you're adapting Grandma's recipe for a different pan or converting a wedding cake recipe to a smaller celebration, our calculator handles the math.
          </p>

          {/* Calculator Component */}
          <CakePanConverter />
        </div>
      </section>

      {/* Real-World Examples Section */}
      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Real-World Pan Conversion Examples
          </h2>
          <p className="text-gray-700 mb-8">
            See exactly how to convert common baking scenarios. Each example shows the math and practical adjustments you'll need to make.
          </p>

          {/* Example 1 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Converting a 9-Inch Round Layer Cake to an 8×8 Square</h3>
                <p className="text-gray-600 mb-4">
                  Your favorite chocolate cake recipe makes two 9-inch round layers, but you only have an 8-inch square pan. Can you make a single-layer sheet cake instead?
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>Original recipe:</strong> Two 9-inch round pans (2" deep)<br />
                    <strong>Available pan:</strong> 8×8 square pan (2" deep)<br />
                    <strong>Original bake time:</strong> 30-35 minutes at 350°F
                  </p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-800">
                    <strong>Pan volumes:</strong><br />
                    • Two 9" rounds = 16 cups total (8 cups × 2)<br />
                    • One 8×8 square = 8 cups<br />
                    <strong>Conversion:</strong> 8 ÷ 16 = 0.5× (use half the batter)<br />
                    <strong>Adjusted bake time:</strong> 25-30 minutes (slightly less due to similar depth)<br />
                    <strong>What to do with extra batter:</strong> Make 6-8 cupcakes
                  </p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> An 8×8 square is almost identical to a single 9" round layer. If you want a taller cake, use a 9×9 square pan (10 cups) and use about 60% of the original recipe.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 2 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Bundt Cake Recipe to Layer Cake Pans</h3>
                <p className="text-gray-600 mb-4">
                  You found a stunning marbled Bundt cake recipe online, but you want to make a traditional layered birthday cake with frosting between layers instead.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>Original recipe:</strong> 10-cup Bundt pan<br />
                    <strong>Available pans:</strong> Two 9-inch round pans (2" deep)<br />
                    <strong>Original bake time:</strong> 55-60 minutes at 325°F
                  </p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-800">
                    <strong>Pan volumes:</strong><br />
                    • 10-cup Bundt = 10 cups<br />
                    • Two 9" rounds = 16 cups total<br />
                    <strong>Conversion:</strong> You have more than enough batter — fill each 9" pan with 5 cups (leaving room to rise)<br />
                    <strong>Adjusted bake time:</strong> 28-32 minutes at 350°F (layers bake much faster)<br />
                    <strong>Temperature change:</strong> Increase to 350°F for layer cakes
                  </p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Bundt cake batters are often denser with more butter. They work beautifully as layer cakes but may be richer than typical layer cake recipes. Consider a lighter frosting like Swiss meringue buttercream.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 3 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Sheet Cake to Cupcakes for a School Bake Sale</h3>
                <p className="text-gray-600 mb-4">
                  Your go-to vanilla sheet cake recipe makes a 9×13, but you need cupcakes for your child's school fundraiser. How many cupcakes will you get?
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>Original recipe:</strong> 9×13 sheet pan (14 cups)<br />
                    <strong>Target:</strong> Standard cupcakes<br />
                    <strong>Original bake time:</strong> 35-40 minutes at 350°F
                  </p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-800">
                    <strong>Calculation:</strong><br />
                    • 9×13 pan = 14 cups batter<br />
                    • Standard cupcake = ½ cup batter (fill ⅔ full)<br />
                    • 14 ÷ 0.5 = <strong>28 standard cupcakes</strong><br />
                    <strong>Adjusted bake time:</strong> 18-22 minutes at 350°F<br />
                    <strong>Reality check:</strong> You'll likely get 24-30 cupcakes depending on how full you fill them
                  </p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Use a cookie scoop (3 tablespoons) for perfectly even cupcakes. Rotate the pan halfway through baking for even browning. The toothpick test works great for cupcakes — insert in the center of one in the middle of the pan.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 4 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">4</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Grandma's 10-Inch Round Recipe for Modern 9-Inch Pans</h3>
                <p className="text-gray-600 mb-4">
                  Your grandmother's handwritten pound cake recipe calls for a 10-inch round pan, but modern recipes use 9-inch. You don't want to buy a new pan — can you adapt it?
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>Original recipe:</strong> 10-inch round pan (3" deep) — 16 cups<br />
                    <strong>Available pan:</strong> 9-inch round pan (2" deep) — 8 cups<br />
                    <strong>Original bake time:</strong> 60-70 minutes at 325°F
                  </p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-800">
                    <strong>Volume difference:</strong> 8 ÷ 16 = 0.5× (halve the recipe)<br />
                    <strong>Adjusted ingredients:</strong><br />
                    • 1 cup butter → ½ cup (1 stick)<br />
                    • 2 cups sugar → 1 cup<br />
                    • 6 eggs → 3 eggs<br />
                    • 3 cups flour → 1½ cups<br />
                    <strong>Adjusted bake time:</strong> 45-55 minutes (shallower pan)<br />
                    <strong>Alternative:</strong> Use two 9" pans and make a layer cake version
                  </p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Old recipes often called for larger pans because families were bigger. When halving, always use room-temperature ingredients and cream butter/sugar thoroughly for proper texture.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 5 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">5</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Heart-Shaped Pan for Valentine's Day</h3>
                <p className="text-gray-600 mb-4">
                  You received a 9-inch heart-shaped pan as a gift and want to use your reliable 9-inch round chocolate cake recipe. Will it work?
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>Original recipe:</strong> 9-inch round pan — 8 cups<br />
                    <strong>New pan:</strong> 9-inch heart-shaped pan — approximately 6-7 cups<br />
                    <strong>Original bake time:</strong> 30-35 minutes at 350°F
                  </p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-800">
                    <strong>Volume comparison:</strong> Heart pans are typically 15-20% smaller than rounds of the same diameter<br />
                    <strong>Conversion:</strong> 6.5 ÷ 8 = 0.81× (use about 80% of batter)<br />
                    <strong>What to do:</strong> Fill heart pan, use excess for 2-3 cupcakes<br />
                    <strong>Adjusted bake time:</strong> 28-33 minutes (similar depth)<br />
                    <strong>Watch the point:</strong> The heart's point will bake faster — check it at 25 minutes
                  </p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Always measure novelty pans with water before baking. The curved edges on heart pans can make frosting tricky — crumb coat first and chill before final frosting.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 6 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">6</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Mini Loaf Pan Gift Set from One 9×5 Loaf Recipe</h3>
                <p className="text-gray-600 mb-4">
                  Your banana bread recipe makes one 9×5 loaf, but you want to make mini loaves as holiday gifts for coworkers. How many will you get?
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>Original recipe:</strong> 9×5 loaf pan — 8 cups<br />
                    <strong>Mini loaf pans:</strong> 5.75×3 inch — approximately 2 cups each<br />
                    <strong>Original bake time:</strong> 55-65 minutes at 350°F
                  </p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-800">
                    <strong>Calculation:</strong><br />
                    • Full loaf = 8 cups<br />
                    • Mini loaf = 2 cups (fill ¾ full = 1.5 cups batter per mini)<br />
                    • 8 ÷ 1.5 = <strong>5 mini loaves</strong> (with a little extra)<br />
                    <strong>Adjusted bake time:</strong> 30-35 minutes at 350°F<br />
                    <strong>Double the recipe:</strong> Makes 10-11 mini loaves for a larger gift batch
                  </p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Mini loaves are perfect for gift-giving. Wrap in parchment paper and tie with twine. They freeze beautifully — bake a big batch and defrost as needed for last-minute gifts.
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
            Complete Pan Volume Reference Charts
          </h2>
          <p>
            The key to successful pan substitution is understanding volume. These comprehensive charts include all common pan sizes, their volumes in cups, surface areas for baking time estimates, and common substitutions. Bookmark this page for quick reference.
          </p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Round Pans — The Baking Standard
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Round pans are measured by diameter. Standard depth is 2 inches; deep pans are 3 inches. Volume increases exponentially with diameter — a 10" pan holds nearly double a 7" pan.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Size</th>
                  <th className="text-left py-2 pr-4">Volume (2" deep)</th>
                  <th className="text-left py-2 pr-4">Volume (3" deep)</th>
                  <th className="text-left py-2 pr-4">Area (sq in)</th>
                  <th className="text-left py-2">Common Substitute</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">5-inch</td>
                  <td className="py-2 pr-4">2.5 cups</td>
                  <td className="py-2 pr-4">4 cups</td>
                  <td className="py-2 pr-4">20 sq in</td>
                  <td className="py-2">—</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">6-inch</td>
                  <td className="py-2 pr-4">4 cups</td>
                  <td className="py-2 pr-4">6 cups</td>
                  <td className="py-2 pr-4">28 sq in</td>
                  <td className="py-2">6×6 square</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">7-inch</td>
                  <td className="py-2 pr-4">5.5 cups</td>
                  <td className="py-2 pr-4">8 cups</td>
                  <td className="py-2 pr-4">38 sq in</td>
                  <td className="py-2">7×7 square</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">8-inch</td>
                  <td className="py-2 pr-4">6 cups</td>
                  <td className="py-2 pr-4">9 cups</td>
                  <td className="py-2 pr-4">50 sq in</td>
                  <td className="py-2">7×11 rectangle</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">9-inch ⭐</td>
                  <td className="py-2 pr-4">8 cups</td>
                  <td className="py-2 pr-4">12 cups</td>
                  <td className="py-2 pr-4">64 sq in</td>
                  <td className="py-2">8×8 square</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">10-inch</td>
                  <td className="py-2 pr-4">11 cups</td>
                  <td className="py-2 pr-4">16 cups</td>
                  <td className="py-2 pr-4">79 sq in</td>
                  <td className="py-2">9×13 rectangle</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">11-inch</td>
                  <td className="py-2 pr-4">13 cups</td>
                  <td className="py-2 pr-4">19 cups</td>
                  <td className="py-2 pr-4">95 sq in</td>
                  <td className="py-2">—</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">12-inch</td>
                  <td className="py-2 pr-4">14 cups</td>
                  <td className="py-2 pr-4">21 cups</td>
                  <td className="py-2 pr-4">113 sq in</td>
                  <td className="py-2">Half sheet (13×18)</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">14-inch</td>
                  <td className="py-2 pr-4">19 cups</td>
                  <td className="py-2 pr-4">28 cups</td>
                  <td className="py-2 pr-4">154 sq in</td>
                  <td className="py-2">—</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Square & Rectangular Pans
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Square and rectangular pans are easier to cut into even servings. Corners bake faster than rounds, so check early and consider covering corners with foil if over-browning.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Size</th>
                  <th className="text-left py-2 pr-4">Volume (cups)</th>
                  <th className="text-left py-2 pr-4">Area (sq in)</th>
                  <th className="text-left py-2 pr-4">Servings</th>
                  <th className="text-left py-2">Round Equivalent</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">6×6 square</td>
                  <td className="py-2 pr-4">4.5 cups</td>
                  <td className="py-2 pr-4">36 sq in</td>
                  <td className="py-2 pr-4">9</td>
                  <td className="py-2">6" round</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">7×7 square</td>
                  <td className="py-2 pr-4">6 cups</td>
                  <td className="py-2 pr-4">49 sq in</td>
                  <td className="py-2 pr-4">12</td>
                  <td className="py-2">7" round</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">8×8 square ⭐</td>
                  <td className="py-2 pr-4">8 cups</td>
                  <td className="py-2 pr-4">64 sq in</td>
                  <td className="py-2 pr-4">16</td>
                  <td className="py-2">9" round</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">9×9 square</td>
                  <td className="py-2 pr-4">10 cups</td>
                  <td className="py-2 pr-4">81 sq in</td>
                  <td className="py-2 pr-4">18</td>
                  <td className="py-2">10" round</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">7×11 rectangle</td>
                  <td className="py-2 pr-4">10 cups</td>
                  <td className="py-2 pr-4">77 sq in</td>
                  <td className="py-2 pr-4">15</td>
                  <td className="py-2">Two 8" rounds</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">9×13 rectangle ⭐</td>
                  <td className="py-2 pr-4">14 cups</td>
                  <td className="py-2 pr-4">117 sq in</td>
                  <td className="py-2 pr-4">24</td>
                  <td className="py-2">Two 9" rounds</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">10×15 jelly roll</td>
                  <td className="py-2 pr-4">10 cups</td>
                  <td className="py-2 pr-4">150 sq in</td>
                  <td className="py-2 pr-4">30</td>
                  <td className="py-2">—</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">12×16 half sheet</td>
                  <td className="py-2 pr-4">14-16 cups</td>
                  <td className="py-2 pr-4">192 sq in</td>
                  <td className="py-2 pr-4">48</td>
                  <td className="py-2">Two 9×13 pans</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">13×18 half sheet</td>
                  <td className="py-2 pr-4">16 cups</td>
                  <td className="py-2 pr-4">234 sq in</td>
                  <td className="py-2 pr-4">54</td>
                  <td className="py-2">12" round</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">18×26 full sheet</td>
                  <td className="py-2 pr-4">32 cups</td>
                  <td className="py-2 pr-4">468 sq in</td>
                  <td className="py-2 pr-4">108</td>
                  <td className="py-2">Four 9×13 pans</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Specialty & Novelty Pans
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Specialty pans have irregular shapes that make volume harder to estimate. Always measure with water before using a new specialty pan. These volumes assume standard manufacturer dimensions.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Pan Type</th>
                  <th className="text-left py-2 pr-4">Volume (cups)</th>
                  <th className="text-left py-2 pr-4">Best For</th>
                  <th className="text-left py-2">Conversion Note</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">9" Bundt (standard)</td>
                  <td className="py-2 pr-4">10-12 cups</td>
                  <td className="py-2 pr-4">Pound cakes, coffee cakes</td>
                  <td className="py-2">= Two 9" round layers</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">10" Bundt (large)</td>
                  <td className="py-2 pr-4">12-15 cups</td>
                  <td className="py-2 pr-4">Dense cakes</td>
                  <td className="py-2">= 9×13 sheet</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">6-cup Bundt (mini)</td>
                  <td className="py-2 pr-4">6 cups</td>
                  <td className="py-2 pr-4">Small gatherings</td>
                  <td className="py-2">= One 8" round</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">9" springform (2")</td>
                  <td className="py-2 pr-4">8 cups</td>
                  <td className="py-2 pr-4">Cheesecakes</td>
                  <td className="py-2">= 9" round</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">9" springform (3")</td>
                  <td className="py-2 pr-4">10-12 cups</td>
                  <td className="py-2 pr-4">Deep cheesecakes</td>
                  <td className="py-2">= 9" round (3" deep)</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">10" tube pan</td>
                  <td className="py-2 pr-4">14-16 cups</td>
                  <td className="py-2 pr-4">Angel food, chiffon</td>
                  <td className="py-2">= 10" Bundt (no flutes)</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">9×5 loaf pan</td>
                  <td className="py-2 pr-4">8 cups</td>
                  <td className="py-2 pr-4">Quick breads, pound cake</td>
                  <td className="py-2">= 9" round</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">8.5×4.5 loaf pan</td>
                  <td className="py-2 pr-4">6 cups</td>
                  <td className="py-2 pr-4">Standard banana bread</td>
                  <td className="py-2">= 8" round</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">Mini loaf (5.75×3)</td>
                  <td className="py-2 pr-4">2 cups</td>
                  <td className="py-2 pr-4">Gift-sized loaves</td>
                  <td className="py-2">4 per 9×5 loaf recipe</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">Standard cupcake</td>
                  <td className="py-2 pr-4">½ cup each</td>
                  <td className="py-2 pr-4">Individual portions</td>
                  <td className="py-2">12 per 9" round recipe</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">Mini cupcake</td>
                  <td className="py-2 pr-4">2 tbsp each</td>
                  <td className="py-2 pr-4">Bite-sized treats</td>
                  <td className="py-2">24 per 9" round recipe</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">9" heart-shaped</td>
                  <td className="py-2 pr-4">6-7 cups</td>
                  <td className="py-2 pr-4">Valentine's Day</td>
                  <td className="py-2">= 8" round</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Quick Pan Substitution Chart
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Need a quick swap? This chart shows direct substitutions that require no batter adjustments — just use the same amount. Baking times may vary slightly.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">If Recipe Calls For</th>
                  <th className="text-left py-2 pr-4">You Can Use Instead</th>
                  <th className="text-left py-2">Time Adjustment</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">One 9" round</td>
                  <td className="py-2 pr-4">One 8×8 square</td>
                  <td className="py-2">Same time (check corners)</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Two 9" rounds</td>
                  <td className="py-2 pr-4">One 9×13 rectangle</td>
                  <td className="py-2">+5-10 minutes</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Two 8" rounds</td>
                  <td className="py-2 pr-4">One 9×9 square</td>
                  <td className="py-2">+5 minutes</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">One 10" Bundt</td>
                  <td className="py-2 pr-4">Two 9" rounds</td>
                  <td className="py-2">-20-25 minutes</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">One 9×5 loaf</td>
                  <td className="py-2 pr-4">One 9" round</td>
                  <td className="py-2">-10-15 minutes</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">One 9" springform</td>
                  <td className="py-2 pr-4">One 9" round (deep)</td>
                  <td className="py-2">Same time</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">24 cupcakes</td>
                  <td className="py-2 pr-4">One 9×13 sheet</td>
                  <td className="py-2">+15-20 minutes</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">One 8" round</td>
                  <td className="py-2 pr-4">One 9×5 loaf</td>
                  <td className="py-2">+10-15 minutes</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Three 6" rounds</td>
                  <td className="py-2 pr-4">Two 8" rounds</td>
                  <td className="py-2">Same time</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">One 10" tube pan</td>
                  <td className="py-2 pr-4">One 10" Bundt</td>
                  <td className="py-2">+5-10 minutes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pan Conversion Tips Section */}
      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl prose prose-lg">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            Pan Conversion Tips for Perfect Results
          </h2>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-6 mb-4">
            The Math Behind Pan Conversion
          </h3>
          <p>
            Pan conversion is all about volume ratios. The formula is simple: <strong>New Batter = Original Batter × (New Pan Volume ÷ Original Pan Volume)</strong>. For round pans, remember that area = π × radius². This means a 10" pan doesn't have twice the area of a 5" pan — it has four times the area!
          </p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Quick Mental Math Equivalents
          </h3>
          <ul>
            <li><strong>8" round ≈ 8" square:</strong> Nearly identical volumes, but corners bake faster</li>
            <li><strong>9" round ≈ 8" square:</strong> Both hold about 8 cups</li>
            <li><strong>Two 9" rounds ≈ One 9×13:</strong> Same total volume (16 cups vs 14 cups — close enough)</li>
            <li><strong>Two 8" rounds ≈ One 9" square:</strong> Close enough for most recipes</li>
            <li><strong>9" round → cupcakes:</strong> One 9" layer makes 12-15 cupcakes</li>
            <li><strong>10" Bundt ≈ Two 9" layers:</strong> Perfect for converting Bundt to layer cake</li>
            <li><strong>9×13 sheet → 24 cupcakes:</strong> Great for easy portioning</li>
          </ul>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Baking Time Adjustments by Pan Change
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Scenario</th>
                  <th className="text-left py-2 pr-4">Time Change</th>
                  <th className="text-left py-2">Temperature Change</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Larger pan (shallower batter)</td>
                  <td className="py-2 pr-4">Reduce 5-10 min</td>
                  <td className="py-2">Same temp</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Smaller pan (deeper batter)</td>
                  <td className="py-2 pr-4">Add 10-15 min</td>
                  <td className="py-2">Reduce 25°F</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Glass instead of metal</td>
                  <td className="py-2 pr-4">Same time</td>
                  <td className="py-2">Reduce 25°F</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Dark metal pan</td>
                  <td className="py-2 pr-4">Check 5 min early</td>
                  <td className="py-2">Reduce 25°F</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Silicone pan</td>
                  <td className="py-2 pr-4">Add 5-10 min</td>
                  <td className="py-2">Same temp</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Bundt to layer pans</td>
                  <td className="py-2 pr-4">Reduce 20-25 min</td>
                  <td className="py-2">Increase 25°F</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Layer pans to Bundt</td>
                  <td className="py-2 pr-4">Add 20-30 min</td>
                  <td className="py-2">Reduce 25°F</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Sheet cake to cupcakes</td>
                  <td className="py-2 pr-4">Reduce 15-20 min</td>
                  <td className="py-2">Same temp</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Fill Level Guidelines
          </h3>
          <ul>
            <li><strong>Light, fluffy cakes (chiffon, angel food):</strong> Fill ½ full — they rise dramatically</li>
            <li><strong>Standard butter cakes:</strong> Fill ⅔ full — the baking standard</li>
            <li><strong>Dense cakes (pound cake, cheesecake):</strong> Fill ¾ full — minimal rise</li>
            <li><strong>Bundt pans:</strong> Fill ⅔ to ¾ full — overflow runs down the center tube and makes a mess</li>
            <li><strong>Cupcakes:</strong> Fill ⅔ full for domed tops, ½ full for flat tops (ideal for decorating)</li>
          </ul>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Shape-Specific Baking Notes
          </h3>
          <ul>
            <li><strong>Round → square:</strong> Corners cook faster. Cover corners with foil if browning too quickly.</li>
            <li><strong>Square → round:</strong> More even cooking. May take slightly longer at edges.</li>
            <li><strong>Bundt → layers:</strong> Divide batter carefully. Bundt recipes are often denser with more butter.</li>
            <li><strong>Layers → sheet cake:</strong> Same total batter, different presentation. Great for easy serving at parties.</li>
            <li><strong>Any → cupcakes:</strong> Reduce baking time significantly. Use an ice cream scoop for even portions.</li>
            <li><strong>Deep → shallow:</strong> Bakes faster. Watch for over-browning on top.</li>
            <li><strong>Shallow → deep:</strong> Bakes slower. May dome more in center.</li>
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
            Related Baking Calculators
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/cake-servings-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Cake Servings Calculator</h3>
              <p className="text-sm text-gray-600">Figure out how many servings each pan size yields</p>
            </Link>
            <Link
              href="/recipe-scaler"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Recipe Scaler</h3>
              <p className="text-sm text-gray-600">Scale any recipe up or down by servings</p>
            </Link>
            <Link
              href="/bakers-percentage-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Baker's Percentage Calculator</h3>
              <p className="text-sm text-gray-600">Scale bread and pastry recipes precisely</p>
            </Link>
            <Link
              href="/cooking-measurement-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Measurement Converter</h3>
              <p className="text-sm text-gray-600">Convert cups, grams, ounces, and more</p>
            </Link>
            <Link
              href="/convection-oven-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Convection Oven Converter</h3>
              <p className="text-sm text-gray-600">Adjust temps when switching oven types</p>
            </Link>
            <Link
              href="/butter-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Butter Converter</h3>
              <p className="text-sm text-gray-600">Convert between sticks, cups, and grams</p>
            </Link>
            <Link
              href="/recipe-macro-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Recipe Macro Calculator</h3>
              <p className="text-sm text-gray-600">Calculate nutrition per serving</p>
            </Link>
            <Link
              href="/oven-temperature-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Oven Temperature Converter</h3>
              <p className="text-sm text-gray-600">Convert °F to °C and Gas Marks</p>
            </Link>
            <Link
              href="/party-food-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Party Food Calculator</h3>
              <p className="text-sm text-gray-600">Plan food quantities for any event</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Authority Sources Footer */}
      <section className="py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-sm text-gray-500 text-center">
            Pan volume data and baking guidelines referenced from{" "}
            <a href="https://www.kingarthurbaking.com/learn/guides/pan-size-guide" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">King Arthur Baking</a>,{" "}
            <a href="https://sallysbakingaddiction.com/pan-substitution-guide/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">Sally's Baking Addiction</a>,{" "}
            <a href="https://www.americastestkitchen.com/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">America's Test Kitchen</a>,{" "}
            <a href="https://www.seriouseats.com/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">Serious Eats</a>, and{" "}
            <a href="https://www.bonappetit.com/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">Bon Appétit</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
