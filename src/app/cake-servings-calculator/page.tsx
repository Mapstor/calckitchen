import { Metadata } from "next";
import Link from "next/link";
import CakeServingsCalculator from "@/components/calculators/CakeServingsCalculator";
import { FAQPageJsonLd, WebApplicationJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Cake Servings Calculator — How Many People Does a Cake Feed? | CalcKitchen",
  description: "Free cake servings calculator with visual cut-pattern diagrams. Enter cake size and shape to see party and wedding servings, or enter guest count to find the right cake size.",
  openGraph: {
    title: "Cake Servings Calculator — How Many People Does a Cake Feed?",
    description: "Free cake servings calculator with visual cut-pattern diagrams. Enter cake size and shape to see party and wedding servings, or enter guest count to find the right cake size.",
    url: "https://calckitchen.com/cake-servings-calculator",
    type: "website",
  },
  alternates: {
    canonical: "https://calckitchen.com/cake-servings-calculator",
  },
};

const faqs = [
  {
    question: "How many people does a 10-inch cake feed?",
    answer: "A 10-inch round cake feeds 28–38 people depending on serving size. For party servings (2\" × 2\"), expect 28 slices. For wedding servings (1\" × 2\"), expect 38 slices. Our calculator adjusts these numbers for square and sheet cakes too.",
  },
  {
    question: "What's the difference between party and wedding cake servings?",
    answer: "Party servings are 2\" × 2\" slices — a satisfying portion when cake is the main dessert. Wedding servings are 1\" × 2\" slices — smaller because they're often part of a larger dessert course or guests are full from dinner. The same cake yields about 35% more wedding servings than party servings.",
  },
  {
    question: "How many people does a quarter sheet cake feed?",
    answer: "A quarter sheet cake (9\" × 13\") feeds 18–24 people for party servings, or up to 30–36 for small event servings. Half sheet cakes (13\" × 18\") feed 36–54 people. Full sheet cakes (18\" × 24\") feed 72–108 people.",
  },
  {
    question: "How do I calculate servings for a tiered cake?",
    answer: "Add the servings from each tier separately. A 3-tier cake with 6\", 9\", and 12\" rounds yields approximately 12 + 32 + 56 = 100 wedding servings, or 8 + 24 + 40 = 72 party servings. Many couples also add a small cutting cake and sheet cakes in the kitchen for larger events.",
  },
  {
    question: "Does cake height affect servings?",
    answer: "Yes. Standard servings assume 4\" tall layers (two 2\" layers stacked). If your cake is 3\" tall (single layer), reduce servings by about 25%. If it's 5-6\" tall, increase by about 25%. Very tall cakes (6\"+) may need taller, thinner slices.",
  },
  {
    question: "How much cake should I order per person?",
    answer: "For dessert-only events, plan for 1 party serving per adult and ½–¾ serving per child. For weddings, 1 wedding serving per guest works since portions are smaller. For events with multiple dessert options, reduce by 25%.",
  },
  {
    question: "What size cake do I need for 50 people?",
    answer: "For party servings: A 14\" round or 12\" square feeds about 50. A half sheet (13\" × 18\") also works. For wedding servings: A 12\" round plus 8\" round, or a 14\" round alone, covers 50 guests.",
  },
  {
    question: "How do I cut a round cake for maximum servings?",
    answer: "For large round cakes (12\"+), cut a smaller circle 2\" from the center first, then slice both rings. This yields more even portions. For smaller cakes, cut straight across the center, then slice each half into portions. Always use a thin, sharp knife dipped in hot water between cuts.",
  },
  {
    question: "What size cake do I need for 100 guests?",
    answer: "For 100 party servings, you'll need approximately a 16\" round cake, or a 14\" square, or a full sheet cake (18\" × 24\"). For wedding servings at 100 guests, a 12\" + 10\" + 8\" tiered cake works perfectly, yielding about 100-110 servings total.",
  },
  {
    question: "Should I order extra cake for a wedding?",
    answer: "Yes, plan for 10-15% extra servings. Not all guests will eat cake, but some will want seconds, and you'll want to account for the cutting slice, staff portions, and any mishaps. If you're doing a dessert table with multiple options, you can reduce to just 65-75% of guest count.",
  },
  {
    question: "How many cupcakes equal a cake serving?",
    answer: "Standard cupcakes (2.5\" diameter) equal about one party serving each. Mini cupcakes (1.5\" diameter) count as half a serving — plan 2 mini cupcakes per guest. Jumbo cupcakes (3.5\" diameter) equal about 1.5 party servings.",
  },
  {
    question: "Can I freeze leftover wedding cake?",
    answer: "Yes! Wrap the top tier tightly in plastic wrap, then aluminum foil, and freeze for up to one year. According to the USDA, properly wrapped cake stays safe indefinitely but tastes best within 2-4 months. Thaw in the refrigerator for 24 hours before serving.",
  },
];

export default function CakeServingsCalculatorPage() {
  return (
    <div className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Cake Servings Calculator"
        description="Calculate how many people a cake will feed based on size, shape, and serving style. Find the right cake size for your guest count."
        url="https://calckitchen.com/cake-servings-calculator"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Cake Servings Calculator", url: "https://calckitchen.com/cake-servings-calculator" },
        ]}
      />

      {/* Hero Section with Calculator */}
      <section className="bg-gradient-to-b from-warm-white to-white py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Cake Servings Calculator
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Find out how many people your cake will feed — or discover what size cake you need for your guest count. Works for round, square, sheet, and rectangular cakes. Based on{" "}
            <a
              href="https://www.wilton.com/cake-serving-chart/cake-serving-chart.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral hover:underline"
            >
              Wilton's industry-standard serving charts
            </a>{" "}
            used by professional bakers worldwide.
          </p>

          {/* Calculator Component */}
          <CakeServingsCalculator />
        </div>
      </section>

      {/* Real-World Examples Section */}
      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Real-World Cake Serving Examples
          </h2>
          <p className="text-gray-700 mb-8">
            See how the calculator works in practice with these real scenarios from birthday parties, weddings, and special events.
          </p>

          {/* Example 1 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Child's 5th Birthday Party — 20 Kids + 15 Parents
                </h3>
                <p className="text-gray-600 mb-4">
                  Sarah is planning her daughter's birthday party with 20 children and about 15 adults. She wants a character-themed round cake that's a showpiece, but isn't sure what size to order.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1">Event type: Birthday party (party servings)</p>
                  <p className="text-sm text-gray-600 mb-1">Guests: 20 children (count as 0.5 each) + 15 adults = 25 servings needed</p>
                  <p className="text-sm text-gray-600">Shape preference: Round</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-emerald-800 font-medium">Result: 10-inch round cake (28 party servings)</p>
                  <p className="text-emerald-700 text-sm mt-1">This provides 3 extra slices for seconds and the birthday girl's take-home piece</p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Kids often don't finish their slices—many parents cut children's portions in half. The extra 3 servings account for adults who want seconds.
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
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  150-Guest Wedding — 3-Tier Display Cake
                </h3>
                <p className="text-gray-600 mb-4">
                  Emily and Michael are getting married with 150 guests. They want an elegant 3-tier cake for the cutting ceremony but wonder if they need hidden sheet cakes in the kitchen.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1">Event type: Wedding reception (wedding servings)</p>
                  <p className="text-sm text-gray-600 mb-1">Guests: 150 (plus 10% buffer = 165 servings needed)</p>
                  <p className="text-sm text-gray-600">Proposed tiers: 6" + 10" + 14" round</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-emerald-800 font-medium">Tiered cake yield:</p>
                  <ul className="text-emerald-700 text-sm mt-1 ml-4 list-disc">
                    <li>6" round: 12 wedding servings</li>
                    <li>10" round: 38 wedding servings</li>
                    <li>14" round: 78 wedding servings</li>
                    <li><strong>Total: 128 wedding servings</strong></li>
                  </ul>
                  <p className="text-emerald-700 text-sm mt-2">Recommendation: Add one half-sheet (60 servings) in kitchen = 188 total servings</p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> The display cake handles 85% of guests; the sheet cake covers the rest and staff. Many guests skip cake after a big meal—you'll likely have leftovers to box up.
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
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Office Retirement Party — 45 Colleagues
                </h3>
                <p className="text-gray-600 mb-4">
                  HR manager David is ordering a cake for Janet's retirement party. 45 people RSVP'd yes, and the break room has limited counter space. He's deciding between multiple small cakes or one large sheet cake.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1">Event type: Office party (party servings)</p>
                  <p className="text-sm text-gray-600 mb-1">Guests: 45 adults</p>
                  <p className="text-sm text-gray-600">Space constraint: Limited counter space</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-emerald-800 font-medium">Option A: Half sheet cake (13" × 18")</p>
                  <p className="text-emerald-700 text-sm">Yields 36-54 party servings — covers exactly 45 guests</p>
                  <p className="text-emerald-800 font-medium mt-3">Option B: Two 12" round cakes</p>
                  <p className="text-emerald-700 text-sm">Yields 40 + 40 = 80 party servings — too much cake</p>
                  <p className="text-emerald-800 font-medium mt-3">Recommendation: Half sheet is most practical</p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Sheet cakes are easier to portion evenly, fit standard serving trays, and the bakery can write a message across the full surface. They're the office party workhorse for good reason.
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
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Bridal Shower with Dessert Table — 25 Guests
                </h3>
                <p className="text-gray-600 mb-4">
                  Jessica is hosting a bridal shower with a dessert table that includes cookies, macarons, chocolate truffles, and a centerpiece cake. She needs to account for guests choosing multiple desserts.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1">Event type: Party with multiple desserts</p>
                  <p className="text-sm text-gray-600 mb-1">Guests: 25 adults</p>
                  <p className="text-sm text-gray-600">Adjustment: Reduce cake servings by 25-35% due to other desserts</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-emerald-800 font-medium">Calculation:</p>
                  <p className="text-emerald-700 text-sm">25 guests × 0.70 (30% reduction) = 18 servings needed</p>
                  <p className="text-emerald-800 font-medium mt-2">Result: 8-inch round cake (14 party servings) + cupcakes</p>
                  <p className="text-emerald-700 text-sm">Or: 8-inch square cake (16 party servings) alone</p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> With dessert tables, the cake is more decorative than substantial. A smaller, beautifully decorated cake as a centerpiece works better than a large cake that competes with other sweets.
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
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Home Baker — Scaling a Recipe for Two 8" Rounds
                </h3>
                <p className="text-gray-600 mb-4">
                  Maria is baking her grandmother's recipe that makes one 9" round layer. She wants to make a two-layer 8" round cake for 16 guests at her sister's graduation party. How much should she scale the recipe?
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1">Original recipe: 9" single layer</p>
                  <p className="text-sm text-gray-600 mb-1">Target: Two 8" layers (stacked 4" tall cake)</p>
                  <p className="text-sm text-gray-600">Guest count: 16 (party servings)</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-emerald-800 font-medium">Volume calculations:</p>
                  <ul className="text-emerald-700 text-sm mt-1 ml-4 list-disc">
                    <li>9" round area: π × 4.5² = 63.6 sq inches</li>
                    <li>8" round area: π × 4² = 50.3 sq inches</li>
                    <li>Two 8" layers = 100.6 sq inches total</li>
                    <li>Scale factor: 100.6 ÷ 63.6 = 1.58×</li>
                  </ul>
                  <p className="text-emerald-800 font-medium mt-2">Result: Scale recipe to 1.6× original amounts</p>
                  <p className="text-emerald-700 text-sm">8" stacked round yields ~14 party servings (close enough for 16)</p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Use our <Link href="/cake-pan-converter" className="text-coral hover:underline">Cake Pan Converter</Link> to calculate exact scaling factors between any pan sizes. Always round scaling factors to easy-to-measure amounts.
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
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Quinceañera — 200 Guests with Traditional Multi-Tier
                </h3>
                <p className="text-gray-600 mb-4">
                  Rosa is planning her daughter Sofia's quinceañera with 200 guests. Tradition calls for an elaborate multi-tier cake with fountain and stairs, but she needs to balance display impact with practical servings.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1">Event type: Quinceañera (wedding-style servings)</p>
                  <p className="text-sm text-gray-600 mb-1">Guests: 200 (plus 15% buffer for large family = 230 servings)</p>
                  <p className="text-sm text-gray-600">Style: Traditional elaborate display</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-emerald-800 font-medium">4-tier combination:</p>
                  <ul className="text-emerald-700 text-sm mt-1 ml-4 list-disc">
                    <li>6" round: 12 servings</li>
                    <li>10" round: 38 servings</li>
                    <li>12" round: 56 servings</li>
                    <li>14" round: 78 servings</li>
                    <li><strong>Display cake total: 184 servings</strong></li>
                  </ul>
                  <p className="text-emerald-700 text-sm mt-2">Add: One half-sheet in kitchen (60 servings)</p>
                  <p className="text-emerald-800 font-medium mt-2">Grand total: 244 wedding servings</p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> For quinceañeras, the cake is a major photo opportunity. Design the top tiers for visual impact (fondant, decorations) and use the bottom tiers and sheet cakes for serving. Many bakeries offer decorative "dummy" tiers to increase height without increasing cost.
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
            How Many People Does a Cake Feed?
          </h2>
          <p>
            The number of servings a cake yields depends on three factors: <strong>size</strong>, <strong>shape</strong>, and <strong>serving style</strong>. A 10-inch round cake might feed 28 people at a birthday party — but the same cake could serve 38 guests at a wedding where slices are smaller.
          </p>
          <p>
            Our calculator uses industry-standard serving sizes based on{" "}
            <a
              href="https://www.wilton.com/cake-serving-chart/cake-serving-chart.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral hover:underline"
            >
              Wilton's cake serving charts
            </a>, which professional bakers have relied on for decades. The{" "}
            <a
              href="https://www.cakedecoratingcompany.co.uk/cake-portion-guide"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral hover:underline"
            >
              Cake Decorating Company
            </a>{" "}
            and the{" "}
            <a
              href="https://www.sweetwise.com/pages/cake-serving-guide"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral hover:underline"
            >
              American Cake Decorating Magazine
            </a>{" "}
            use these same standards.
          </p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Understanding Serving Sizes
          </h3>
          <p>
            There are two standard serving sizes in the baking industry:
          </p>
          <ul>
            <li><strong>Party servings (2" × 2"):</strong> A satisfying slice for birthday parties, casual celebrations, and events where cake is the main dessert. This equals approximately 4 cubic inches of cake.</li>
            <li><strong>Wedding servings (1" × 2"):</strong> A smaller, elegant portion for formal events where guests have already eaten a full meal. This equals approximately 2 cubic inches of cake.</li>
          </ul>
          <p>
            The same cake yields about 35% more wedding servings than party servings. This is why a modest-looking wedding cake can feed a surprisingly large crowd.
          </p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Comprehensive Round Cake Serving Chart
          </h3>
          <p>
            Round cakes are the most popular shape for celebrations. This chart assumes a standard 4" tall cake (two 2" layers stacked).
          </p>
          <div className="overflow-x-auto not-prose">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold">Cake Size</th>
                  <th className="text-center py-3 px-4 font-semibold">Cake Area (sq in)</th>
                  <th className="text-center py-3 px-4 font-semibold">Party Servings (2"×2")</th>
                  <th className="text-center py-3 px-4 font-semibold">Wedding Servings (1"×2")</th>
                  <th className="text-left py-3 px-4 font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">4 inch</td>
                  <td className="text-center py-3 px-4">12.6</td>
                  <td className="text-center py-3 px-4">4</td>
                  <td className="text-center py-3 px-4">6</td>
                  <td className="py-3 px-4 text-gray-600">Smash cakes, intimate dessert</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">5 inch</td>
                  <td className="text-center py-3 px-4">19.6</td>
                  <td className="text-center py-3 px-4">6</td>
                  <td className="text-center py-3 px-4">8</td>
                  <td className="py-3 px-4 text-gray-600">Small gatherings, top tiers</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">6 inch</td>
                  <td className="text-center py-3 px-4">28.3</td>
                  <td className="text-center py-3 px-4">8</td>
                  <td className="text-center py-3 px-4">12</td>
                  <td className="py-3 px-4 text-gray-600">Small parties, tier cakes</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">7 inch</td>
                  <td className="text-center py-3 px-4">38.5</td>
                  <td className="text-center py-3 px-4">12</td>
                  <td className="text-center py-3 px-4">18</td>
                  <td className="py-3 px-4 text-gray-600">Small to medium parties</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">8 inch</td>
                  <td className="text-center py-3 px-4">50.3</td>
                  <td className="text-center py-3 px-4">14</td>
                  <td className="text-center py-3 px-4">24</td>
                  <td className="py-3 px-4 text-gray-600">Standard birthday parties</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">9 inch</td>
                  <td className="text-center py-3 px-4">63.6</td>
                  <td className="text-center py-3 px-4">20</td>
                  <td className="text-center py-3 px-4">32</td>
                  <td className="py-3 px-4 text-gray-600">Medium parties, mid-tiers</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">10 inch</td>
                  <td className="text-center py-3 px-4">78.5</td>
                  <td className="text-center py-3 px-4">28</td>
                  <td className="text-center py-3 px-4">38</td>
                  <td className="py-3 px-4 text-gray-600">Large birthdays, showers</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">11 inch</td>
                  <td className="text-center py-3 px-4">95.0</td>
                  <td className="text-center py-3 px-4">34</td>
                  <td className="text-center py-3 px-4">46</td>
                  <td className="py-3 px-4 text-gray-600">Large events</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">12 inch</td>
                  <td className="text-center py-3 px-4">113.1</td>
                  <td className="text-center py-3 px-4">40</td>
                  <td className="text-center py-3 px-4">56</td>
                  <td className="py-3 px-4 text-gray-600">Large parties, base tiers</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">14 inch</td>
                  <td className="text-center py-3 px-4">153.9</td>
                  <td className="text-center py-3 px-4">50</td>
                  <td className="text-center py-3 px-4">78</td>
                  <td className="py-3 px-4 text-gray-600">Large events, wedding bases</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">16 inch</td>
                  <td className="text-center py-3 px-4">201.1</td>
                  <td className="text-center py-3 px-4">68</td>
                  <td className="text-center py-3 px-4">100</td>
                  <td className="py-3 px-4 text-gray-600">Very large events</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">18 inch</td>
                  <td className="text-center py-3 px-4">254.5</td>
                  <td className="text-center py-3 px-4">90</td>
                  <td className="text-center py-3 px-4">130</td>
                  <td className="py-3 px-4 text-gray-600">Major celebrations</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Comprehensive Square Cake Serving Chart
          </h3>
          <p>
            Square cakes yield more servings than round cakes of the same dimension because you're not losing the corners. They're also easier to cut into even portions.
          </p>
          <div className="overflow-x-auto not-prose">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold">Cake Size</th>
                  <th className="text-center py-3 px-4 font-semibold">Cake Area (sq in)</th>
                  <th className="text-center py-3 px-4 font-semibold">Party Servings (2"×2")</th>
                  <th className="text-center py-3 px-4 font-semibold">Wedding Servings (1"×2")</th>
                  <th className="text-center py-3 px-4 font-semibold">Cut Pattern</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">5 inch</td>
                  <td className="text-center py-3 px-4">25</td>
                  <td className="text-center py-3 px-4">6</td>
                  <td className="text-center py-3 px-4">12</td>
                  <td className="text-center py-3 px-4">2×3 or 3×4</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">6 inch</td>
                  <td className="text-center py-3 px-4">36</td>
                  <td className="text-center py-3 px-4">9</td>
                  <td className="text-center py-3 px-4">18</td>
                  <td className="text-center py-3 px-4">3×3 or 3×6</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">7 inch</td>
                  <td className="text-center py-3 px-4">49</td>
                  <td className="text-center py-3 px-4">12</td>
                  <td className="text-center py-3 px-4">24</td>
                  <td className="text-center py-3 px-4">3×4 or 4×6</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">8 inch</td>
                  <td className="text-center py-3 px-4">64</td>
                  <td className="text-center py-3 px-4">16</td>
                  <td className="text-center py-3 px-4">32</td>
                  <td className="text-center py-3 px-4">4×4 or 4×8</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">9 inch</td>
                  <td className="text-center py-3 px-4">81</td>
                  <td className="text-center py-3 px-4">20</td>
                  <td className="text-center py-3 px-4">40</td>
                  <td className="text-center py-3 px-4">4×5 or 5×8</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">10 inch</td>
                  <td className="text-center py-3 px-4">100</td>
                  <td className="text-center py-3 px-4">25</td>
                  <td className="text-center py-3 px-4">50</td>
                  <td className="text-center py-3 px-4">5×5 or 5×10</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">11 inch</td>
                  <td className="text-center py-3 px-4">121</td>
                  <td className="text-center py-3 px-4">30</td>
                  <td className="text-center py-3 px-4">60</td>
                  <td className="text-center py-3 px-4">5×6 or 6×10</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">12 inch</td>
                  <td className="text-center py-3 px-4">144</td>
                  <td className="text-center py-3 px-4">36</td>
                  <td className="text-center py-3 px-4">72</td>
                  <td className="text-center py-3 px-4">6×6 or 6×12</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">14 inch</td>
                  <td className="text-center py-3 px-4">196</td>
                  <td className="text-center py-3 px-4">49</td>
                  <td className="text-center py-3 px-4">98</td>
                  <td className="text-center py-3 px-4">7×7 or 7×14</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">16 inch</td>
                  <td className="text-center py-3 px-4">256</td>
                  <td className="text-center py-3 px-4">64</td>
                  <td className="text-center py-3 px-4">128</td>
                  <td className="text-center py-3 px-4">8×8 or 8×16</td>
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
            Comprehensive Sheet Cake Servings Guide
          </h2>
          <p>
            Sheet cakes are the workhorses of large gatherings—they're economical, easy to transport, and simple to cut into even portions. Here's what you can expect from standard bakery sizes (based on{" "}
            <a
              href="https://www.costco.com/bakery.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral hover:underline"
            >
              Costco
            </a>,{" "}
            <a
              href="https://www.samsclub.com/b/bakery-cakes/1990134"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral hover:underline"
            >
              Sam's Club
            </a>, and{" "}
            <a
              href="https://www.walmart.com/cp/custom-cakes/1032700"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral hover:underline"
            >
              Walmart Bakery
            </a>{" "}
            sizing):
          </p>
          <div className="overflow-x-auto not-prose">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold">Sheet Size</th>
                  <th className="text-left py-3 px-4 font-semibold">Dimensions</th>
                  <th className="text-center py-3 px-4 font-semibold">Area (sq in)</th>
                  <th className="text-center py-3 px-4 font-semibold">Party Servings</th>
                  <th className="text-center py-3 px-4 font-semibold">Event Servings</th>
                  <th className="text-left py-3 px-4 font-semibold">Typical Price Range</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">1/8 Sheet (Personal)</td>
                  <td className="py-3 px-4">6" × 9"</td>
                  <td className="text-center py-3 px-4">54</td>
                  <td className="text-center py-3 px-4">8-12</td>
                  <td className="text-center py-3 px-4">12-18</td>
                  <td className="py-3 px-4 text-gray-600">$10-$18</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">1/4 Sheet</td>
                  <td className="py-3 px-4">9" × 13"</td>
                  <td className="text-center py-3 px-4">117</td>
                  <td className="text-center py-3 px-4">18-24</td>
                  <td className="text-center py-3 px-4">30-36</td>
                  <td className="py-3 px-4 text-gray-600">$18-$30</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">1/2 Sheet</td>
                  <td className="py-3 px-4">13" × 18"</td>
                  <td className="text-center py-3 px-4">234</td>
                  <td className="text-center py-3 px-4">36-54</td>
                  <td className="text-center py-3 px-4">60-72</td>
                  <td className="py-3 px-4 text-gray-600">$30-$55</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">Full Sheet</td>
                  <td className="py-3 px-4">18" × 24"</td>
                  <td className="text-center py-3 px-4">432</td>
                  <td className="text-center py-3 px-4">72-108</td>
                  <td className="text-center py-3 px-4">120-144</td>
                  <td className="py-3 px-4 text-gray-600">$50-$80</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Double Full Sheet</td>
                  <td className="py-3 px-4">24" × 36"</td>
                  <td className="text-center py-3 px-4">864</td>
                  <td className="text-center py-3 px-4">144-216</td>
                  <td className="text-center py-3 px-4">240-288</td>
                  <td className="py-3 px-4 text-gray-600">$100-$150</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Cake Height Adjustments
          </h3>
          <p>
            Standard serving calculations assume a 4" tall cake (two 2" layers stacked with filling and frosting). If your cake differs, use these adjustments:
          </p>
          <div className="overflow-x-auto not-prose">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold">Cake Height</th>
                  <th className="text-left py-3 px-4 font-semibold">Layer Configuration</th>
                  <th className="text-center py-3 px-4 font-semibold">Serving Adjustment</th>
                  <th className="text-left py-3 px-4 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">2" (single layer)</td>
                  <td className="py-3 px-4">1 layer</td>
                  <td className="text-center py-3 px-4 text-amber-600 font-medium">−50%</td>
                  <td className="py-3 px-4 text-gray-600">Snack cakes, brownies</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">3" (short)</td>
                  <td className="py-3 px-4">1.5 layers or thin 2-layer</td>
                  <td className="text-center py-3 px-4 text-amber-600 font-medium">−25%</td>
                  <td className="py-3 px-4 text-gray-600">Cheesecakes, some European styles</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">4" (standard)</td>
                  <td className="py-3 px-4">2 layers</td>
                  <td className="text-center py-3 px-4 text-gray-600 font-medium">Baseline</td>
                  <td className="py-3 px-4 text-gray-600">Standard American layer cake</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">5" (tall)</td>
                  <td className="py-3 px-4">2 thick layers or 3 thin</td>
                  <td className="text-center py-3 px-4 text-green-600 font-medium">+25%</td>
                  <td className="py-3 px-4 text-gray-600">Bakery-style tall cakes</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">6"+ (very tall)</td>
                  <td className="py-3 px-4">3-4 layers</td>
                  <td className="text-center py-3 px-4 text-green-600 font-medium">+50%</td>
                  <td className="py-3 px-4 text-gray-600">Dramatic wedding cakes, layer cakes</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Tips for Maximizing Servings
          </h3>
          <ul>
            <li><strong>Use a sharp, thin knife:</strong> A 10" offset spatula or long serrated knife works best. Dip the blade in hot water between cuts for cleaner slices.</li>
            <li><strong>Cut from the center:</strong> For large round cakes (12"+), cut a smaller circle 2" from the center first, then slice both rings. This prevents tiny center slices.</li>
            <li><strong>Plan your grid:</strong> For sheet cakes, mark cutting lines with toothpicks before slicing. A 13"×18" half sheet divides perfectly into a 6×9 grid (54 pieces) or 5×7 grid (35 larger pieces).</li>
            <li><strong>Pre-cut before the event:</strong> For large parties, slice the entire cake in the kitchen and plate individual servings. This speeds service dramatically.</li>
            <li><strong>Consider extras:</strong> Order 10-15% more servings than your guest count to account for seconds, staff, and the inevitable cake-lovers.</li>
          </ul>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Popular Tiered Cake Combinations
          </h3>
          <p>
            For tiered cakes, calculate each tier separately and add them together. Here are popular combinations used by professional bakers:
          </p>
          <div className="overflow-x-auto not-prose">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold">Combination</th>
                  <th className="text-left py-3 px-4 font-semibold">Tiers (Round)</th>
                  <th className="text-center py-3 px-4 font-semibold">Party Servings</th>
                  <th className="text-center py-3 px-4 font-semibold">Wedding Servings</th>
                  <th className="text-left py-3 px-4 font-semibold">Ideal For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">2-Tier Small</td>
                  <td className="py-3 px-4">6" + 10"</td>
                  <td className="text-center py-3 px-4">36</td>
                  <td className="text-center py-3 px-4">50</td>
                  <td className="py-3 px-4 text-gray-600">Intimate weddings, showers</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">2-Tier Medium</td>
                  <td className="py-3 px-4">8" + 12"</td>
                  <td className="text-center py-3 px-4">54</td>
                  <td className="text-center py-3 px-4">80</td>
                  <td className="py-3 px-4 text-gray-600">Small weddings (50-75)</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">3-Tier Classic</td>
                  <td className="py-3 px-4">6" + 9" + 12"</td>
                  <td className="text-center py-3 px-4">72</td>
                  <td className="text-center py-3 px-4">100</td>
                  <td className="py-3 px-4 text-gray-600">Medium weddings (75-100)</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">3-Tier Large</td>
                  <td className="py-3 px-4">6" + 10" + 14"</td>
                  <td className="text-center py-3 px-4">86</td>
                  <td className="text-center py-3 px-4">128</td>
                  <td className="py-3 px-4 text-gray-600">Medium-large weddings</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">4-Tier Standard</td>
                  <td className="py-3 px-4">6" + 9" + 12" + 16"</td>
                  <td className="text-center py-3 px-4">140</td>
                  <td className="text-center py-3 px-4">194</td>
                  <td className="py-3 px-4 text-gray-600">Large weddings (150-200)</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">4-Tier Grand</td>
                  <td className="py-3 px-4">6" + 10" + 14" + 18"</td>
                  <td className="text-center py-3 px-4">176</td>
                  <td className="text-center py-3 px-4">258</td>
                  <td className="py-3 px-4 text-gray-600">Large formal weddings</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">5-Tier Showpiece</td>
                  <td className="py-3 px-4">6" + 8" + 10" + 12" + 14"</td>
                  <td className="text-center py-3 px-4">140</td>
                  <td className="text-center py-3 px-4">208</td>
                  <td className="py-3 px-4 text-gray-600">Grand celebrations</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4">
            Many professional bakers recommend a separate "cutting cake" displayed on top (usually 4" or 6"), with additional sheet cakes in the kitchen for very large events. This approach combines visual impact with practical serving efficiency.
          </p>
        </div>
      </section>

      {/* Specialty Cakes Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl prose prose-lg">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            Specialty Cake Servings Guide
          </h2>
          <p>
            Not all cakes follow standard round or square formats. Here's how to calculate servings for specialty shapes and styles:
          </p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Bundt & Ring Cakes
          </h3>
          <div className="overflow-x-auto not-prose">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold">Bundt Size</th>
                  <th className="text-center py-3 px-4 font-semibold">Cup Capacity</th>
                  <th className="text-center py-3 px-4 font-semibold">Servings</th>
                  <th className="text-left py-3 px-4 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Mini (4")</td>
                  <td className="text-center py-3 px-4">1 cup</td>
                  <td className="text-center py-3 px-4">1-2</td>
                  <td className="py-3 px-4 text-gray-600">Individual serving size</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">Small (6")</td>
                  <td className="text-center py-3 px-4">3-4 cups</td>
                  <td className="text-center py-3 px-4">6-8</td>
                  <td className="py-3 px-4 text-gray-600">Small family dessert</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Standard (9-10")</td>
                  <td className="text-center py-3 px-4">10-12 cups</td>
                  <td className="text-center py-3 px-4">12-16</td>
                  <td className="py-3 px-4 text-gray-600">Most common size</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">Large (10-12")</td>
                  <td className="text-center py-3 px-4">14-16 cups</td>
                  <td className="text-center py-3 px-4">16-20</td>
                  <td className="py-3 px-4 text-gray-600">Large gatherings</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Cupcakes & Mini Cakes
          </h3>
          <div className="overflow-x-auto not-prose">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold">Type</th>
                  <th className="text-center py-3 px-4 font-semibold">Diameter</th>
                  <th className="text-center py-3 px-4 font-semibold">Equals Party Servings</th>
                  <th className="text-center py-3 px-4 font-semibold">Per Guest</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Mini Cupcakes</td>
                  <td className="text-center py-3 px-4">1.5"</td>
                  <td className="text-center py-3 px-4">0.5</td>
                  <td className="text-center py-3 px-4">Plan 2-3 per guest</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">Standard Cupcakes</td>
                  <td className="text-center py-3 px-4">2.5"</td>
                  <td className="text-center py-3 px-4">1.0</td>
                  <td className="text-center py-3 px-4">Plan 1-1.5 per guest</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Jumbo Cupcakes</td>
                  <td className="text-center py-3 px-4">3.5"</td>
                  <td className="text-center py-3 px-4">1.5</td>
                  <td className="text-center py-3 px-4">Plan 1 per guest</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">Cake Pops</td>
                  <td className="text-center py-3 px-4">1.5" ball</td>
                  <td className="text-center py-3 px-4">0.25</td>
                  <td className="text-center py-3 px-4">Plan 3-4 per guest</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Specialty Shapes
          </h3>
          <div className="overflow-x-auto not-prose">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold">Shape</th>
                  <th className="text-left py-3 px-4 font-semibold">Equivalent</th>
                  <th className="text-center py-3 px-4 font-semibold">Party Servings</th>
                  <th className="text-left py-3 px-4 font-semibold">Calculation Method</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Heart (10")</td>
                  <td className="py-3 px-4">≈ 9" round</td>
                  <td className="text-center py-3 px-4">18-20</td>
                  <td className="py-3 px-4 text-gray-600">≈75% of same-size round</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">Hexagon (10")</td>
                  <td className="py-3 px-4">≈ 9" round</td>
                  <td className="text-center py-3 px-4">20-22</td>
                  <td className="py-3 px-4 text-gray-600">≈85% of same-size round</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Oval (10" × 14")</td>
                  <td className="py-3 px-4">≈ 12" round</td>
                  <td className="text-center py-3 px-4">35-40</td>
                  <td className="py-3 px-4 text-gray-600">π × (L/2) × (W/2) ÷ 4</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">Petal (10")</td>
                  <td className="py-3 px-4">≈ 9" round</td>
                  <td className="text-center py-3 px-4">18-22</td>
                  <td className="py-3 px-4 text-gray-600">≈80% of same-size round</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Quick Reference Section */}
      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl prose prose-lg">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            Quick Reference: What Size Cake Do I Need?
          </h2>
          <p>
            Here's a quick lookup table to find the right cake size for your guest count:
          </p>
          <div className="overflow-x-auto not-prose">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-center py-3 px-4 font-semibold">Guest Count</th>
                  <th className="text-left py-3 px-4 font-semibold">Party Servings Option</th>
                  <th className="text-left py-3 px-4 font-semibold">Wedding Servings Option</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="text-center py-3 px-4 font-medium">10-15</td>
                  <td className="py-3 px-4">8" round or 8" square</td>
                  <td className="py-3 px-4">6" round or 1/4 sheet</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="text-center py-3 px-4 font-medium">20-25</td>
                  <td className="py-3 px-4">10" round or 9" square</td>
                  <td className="py-3 px-4">8" round or 8" square</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="text-center py-3 px-4 font-medium">30-40</td>
                  <td className="py-3 px-4">12" round or 1/2 sheet</td>
                  <td className="py-3 px-4">10" round or 9" square</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="text-center py-3 px-4 font-medium">50-60</td>
                  <td className="py-3 px-4">14" round or 1/2 sheet + 1/4 sheet</td>
                  <td className="py-3 px-4">12" round or 2-tier (6"+10")</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="text-center py-3 px-4 font-medium">75-100</td>
                  <td className="py-3 px-4">Full sheet or 2-tier (10"+14")</td>
                  <td className="py-3 px-4">3-tier (6"+9"+12")</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="text-center py-3 px-4 font-medium">125-150</td>
                  <td className="py-3 px-4">3-tier (8"+12"+16") or 2 full sheets</td>
                  <td className="py-3 px-4">3-tier (6"+10"+14") + 1/2 sheet</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="text-center py-3 px-4 font-medium">200+</td>
                  <td className="py-3 px-4">4-tier + full sheet</td>
                  <td className="py-3 px-4">4-tier (6"+9"+12"+16") + sheet</td>
                </tr>
              </tbody>
            </table>
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
              href="/party-food-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Party Food Calculator</h3>
              <p className="text-sm text-gray-600">Plan food quantities for any event size—appetizers, mains, and desserts</p>
            </Link>
            <Link
              href="/cake-pan-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Cake Pan Converter</h3>
              <p className="text-sm text-gray-600">Convert recipes between different pan sizes and shapes</p>
            </Link>
            <Link
              href="/recipe-scaler"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Recipe Scaler</h3>
              <p className="text-sm text-gray-600">Scale any recipe up or down by servings or multiplier</p>
            </Link>
            <Link
              href="/bakers-percentage-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Baker's Percentage Calculator</h3>
              <p className="text-sm text-gray-600">Convert between baker's percentages and gram weights</p>
            </Link>
            <Link
              href="/cooking-measurement-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Measurement Converter</h3>
              <p className="text-sm text-gray-600">Convert cups to grams, tablespoons to milliliters, and more</p>
            </Link>
            <Link
              href="/butter-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Butter Converter</h3>
              <p className="text-sm text-gray-600">Convert between sticks, cups, tablespoons, and grams of butter</p>
            </Link>
            <Link
              href="/recipe-macro-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Recipe Macro Calculator</h3>
              <p className="text-sm text-gray-600">Calculate calories and macros per serving for any recipe</p>
            </Link>
            <Link
              href="/recipe-cost-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Recipe Cost Calculator</h3>
              <p className="text-sm text-gray-600">Calculate cost per serving for home bakers and bakery pricing</p>
            </Link>
            <Link
              href="/oven-temperature-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Oven Temperature Converter</h3>
              <p className="text-sm text-gray-600">Convert between Fahrenheit, Celsius, and gas marks</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Authority Sources Footer */}
      <section className="py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-sm text-gray-500 text-center">
            Serving calculations based on industry standards from{" "}
            <a href="https://www.wilton.com/cake-serving-chart/cake-serving-chart.html" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">Wilton</a>
            {" "}&bull;{" "}
            <a href="https://www.fda.gov/food" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">FDA Food Safety</a>
            {" "}&bull;{" "}
            <a href="https://www.fsis.usda.gov/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">USDA FSIS</a>
            {" "}&bull;{" "}
            <a href="https://www.foodsafety.gov/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">FoodSafety.gov</a>
          </p>
        </div>
      </section>
    </div>
  );
}
