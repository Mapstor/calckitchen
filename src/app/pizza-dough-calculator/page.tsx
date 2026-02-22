import { Metadata } from "next";
import Link from "next/link";
import PizzaDoughCalculator from "@/components/calculators/PizzaDoughCalculator";
import { FAQPageJsonLd, WebApplicationJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Pizza Dough Calculator — Neapolitan, NY, Detroit & Sicilian Recipes | CalcKitchen",
  description: "Calculate perfect pizza dough for any style. Enter number of pizzas, choose your style (Neapolitan, New York, Detroit, Sicilian), and get exact flour, water, yeast, and salt amounts.",
  openGraph: {
    title: "Pizza Dough Calculator — Neapolitan, NY, Detroit & Sicilian Recipes",
    description: "Calculate perfect pizza dough for any style. Enter number of pizzas, choose your style (Neapolitan, New York, Detroit, Sicilian), and get exact flour, water, yeast, and salt amounts.",
    url: "https://calckitchen.com/pizza-dough-calculator",
    type: "website",
  },
  alternates: {
    canonical: "https://calckitchen.com/pizza-dough-calculator",
  },
};

const faqs = [
  {
    question: "What hydration should I use for pizza dough?",
    answer: "It depends on your skill level and pizza style. Beginners should start with 60-63% — it's easier to handle. Neapolitan uses 60-65%, New York 62-65%, Detroit and Sicilian go higher at 70-75% for their airy, focaccia-like crumb. Higher hydration = harder to handle but more open crumb. Lower = easier to shape, denser texture.",
  },
  {
    question: "How much dough do I need per pizza?",
    answer: "For a 12-inch home pizza, use 250-280g of dough. Neapolitan (thin, 10-11\") uses about 250g. New York (larger, 14-16\") uses 280-320g. Detroit style uses about 500g for a 10×14\" pan. Sicilian uses 450-550g per tray. Our calculator adjusts ball size automatically based on the style you choose.",
  },
  {
    question: "What type of flour is best for pizza?",
    answer: "For Neapolitan: Tipo 00 flour (Caputo Pizzeria is the gold standard) — finely ground, 12-13% protein. For New York: bread flour (14% protein) for that chewy, foldable texture. For Detroit/Sicilian: all-purpose or bread flour works. Many home bakers blend all-purpose with bread flour for a balance of workability and chew.",
  },
  {
    question: "How long should I ferment pizza dough?",
    answer: "Same-day (direct method): 4-8 hours at room temperature with 0.5-1% yeast. Cold ferment (refrigerated): 24-72 hours at 38°F with 0.2-0.5% yeast — this develops more complex flavor. Neapolitan tradition calls for 24-48 hours. For home pizza night, a 24-hour cold ferment offers great flavor with minimal planning.",
  },
  {
    question: "Fresh yeast vs instant yeast: how do I convert?",
    answer: "Fresh yeast is about 3× the weight of instant yeast. If a recipe calls for 3g instant yeast, use 9g fresh yeast. Active dry yeast is about 1.25× instant — use 4g active dry for every 3g instant. Fresh yeast has a shorter shelf life but dissolves beautifully. Most home bakers prefer instant for convenience.",
  },
  {
    question: "Do I need a pizza oven at home?",
    answer: "No, but it helps for Neapolitan style. Home ovens max out at ~550°F while Neapolitan needs 800-900°F. Workarounds: preheat a pizza steel for 1 hour at max temp, use the broiler, or try a pizza oven accessory. For New York, Detroit, and Sicilian, a regular oven at 500-550°F works great. A pizza steel conducts heat better than a stone.",
  },
  {
    question: "What is poolish and why should I use it?",
    answer: "Poolish is a pre-ferment: equal parts flour and water plus a tiny bit of yeast, fermented 8-16 hours before making dough. It adds: 1) complex flavor from extended fermentation, 2) better texture and extensibility, 3) improved browning. Use poolish equal to 20-30% of total flour weight. It's especially good for New York style pizza.",
  },
  {
    question: "Why is my pizza dough shrinking back when I stretch it?",
    answer: "The gluten is too tight. Solutions: 1) Let the dough rest longer at room temperature (2+ hours after refrigeration), 2) Use a gentler touch when stretching — press from center outward, 3) Make sure you're not over-kneading, 4) Try a slightly higher hydration which makes dough more extensible. If it springs back, let it rest 10-15 minutes and try again.",
  },
  {
    question: "Can I freeze pizza dough?",
    answer: "Yes, pizza dough freezes beautifully for up to 3 months. After the first rise, divide into balls, coat lightly with oil, wrap tightly in plastic, then place in freezer bags. Thaw overnight in the refrigerator, then bring to room temperature for 2 hours before stretching. Some pizzaiolos say frozen-then-thawed dough is actually easier to stretch.",
  },
  {
    question: "What's the difference between active dry yeast and instant yeast?",
    answer: "Active dry yeast needs to be \"proofed\" in warm water (105-115°F) for 5-10 minutes before use. Instant yeast can be mixed directly into flour — no proofing needed. Instant is also slightly more potent (use 25% less). For pizza dough, instant yeast is more convenient and equally effective. SAF Instant is a professional favorite.",
  },
  {
    question: "Why does my pizza get soggy in the middle?",
    answer: "Common causes: 1) Too many wet toppings — pre-cook vegetables, drain mozzarella, 2) Oven not hot enough — preheat for 45-60 minutes at max temp, 3) Pizza sat too long before eating — serve immediately, 4) Dough too thick in center — stretch from the middle outward. Use a pizza steel instead of a stone for better heat transfer.",
  },
  {
    question: "How do I know when my dough has fermented enough?",
    answer: "The dough should: 1) Double in size (for room temp ferment), 2) Have visible bubbles on top and sides, 3) Feel airy and pillowy, not dense, 4) Pass the \"poke test\" — poke it and it springs back slowly. Over-fermented dough smells very sour, is sticky, and won't hold its shape. Under-fermented dough is tight and dense.",
  },
];

export default function PizzaDoughCalculatorPage() {
  return (
    <div className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Pizza Dough Calculator"
        description="Calculate pizza dough recipes for Neapolitan, New York, Detroit, and Sicilian styles. Get exact flour, water, yeast, and salt amounts based on number of pizzas."
        url="https://calckitchen.com/pizza-dough-calculator"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Pizza Dough Calculator", url: "https://calckitchen.com/pizza-dough-calculator" },
        ]}
      />

      {/* Hero Section with Calculator */}
      <section className="bg-gradient-to-b from-warm-white to-white py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Pizza Dough Calculator
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Perfect pizza dough for any style. Select your style, enter the number of pizzas, and get exact ingredient amounts using baker's percentages. Whether you're making Neapolitan for two or Detroit style for a party, our calculator scales the recipe precisely.
          </p>

          {/* Calculator Component */}
          <PizzaDoughCalculator />
        </div>
      </section>

      {/* Real-World Examples Section */}
      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Real-World Pizza Dough Recipes
          </h2>
          <p className="text-gray-700 mb-8">
            Here are complete recipes for common pizza scenarios. Each includes exact measurements, timing, and tips for success.
          </p>

          {/* Example 1 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Friday Night Neapolitan — 4 Pizzas, 24-Hour Cold Ferment</h3>
                <p className="text-gray-600 mb-4">
                  You want to make authentic Neapolitan pizza for family Friday dinner. Make the dough Thursday night, bake Friday evening.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>Style:</strong> Neapolitan (62% hydration)<br />
                    <strong>Pizzas:</strong> 4 × 10-11" pizzas (250g dough balls)<br />
                    <strong>Fermentation:</strong> 24-hour cold ferment
                  </p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-800">
                    <strong>Recipe (total dough weight: ~1,030g):</strong><br />
                    • Tipo 00 flour: 620g<br />
                    • Water (cold): 384g (62%)<br />
                    • Fine sea salt: 18.6g (3%)<br />
                    • Instant yeast: 1.2g (0.2%)<br /><br />
                    <strong>Method:</strong><br />
                    1. Thursday 8pm: Mix flour, salt, yeast. Add cold water. Knead 10 min.<br />
                    2. Bulk ferment 1 hour at room temp, then refrigerate overnight.<br />
                    3. Friday 3pm: Divide into 4 balls (257g each). Room temp rise 3-4 hours.<br />
                    4. Friday 7pm: Stretch, top, bake at max oven temp (550°F) on pizza steel.
                  </p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Use 00 flour for authentic texture. Preheat your pizza steel for a full hour. For leopard spotting without a pizza oven, use the broiler for the last 60-90 seconds.
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
                <h3 className="font-semibold text-lg text-gray-900 mb-2">New York Style — 2 Large 16" Pizzas for Date Night</h3>
                <p className="text-gray-600 mb-4">
                  Classic foldable New York slices. Big, chewy, slightly oily — perfect for a cozy night in with a movie.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>Style:</strong> New York (64% hydration, 2% olive oil)<br />
                    <strong>Pizzas:</strong> 2 × 16" pizzas (320g dough balls)<br />
                    <strong>Fermentation:</strong> 48-hour cold ferment for best flavor
                  </p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-800">
                    <strong>Recipe (total dough weight: ~680g):</strong><br />
                    • Bread flour (high-gluten): 400g<br />
                    • Water (room temp): 256g (64%)<br />
                    • Olive oil: 8g (2%)<br />
                    • Fine sea salt: 10g (2.5%)<br />
                    • Instant yeast: 0.8g (0.2%)<br />
                    • Sugar: 4g (1%) — helps with browning<br /><br />
                    <strong>Method:</strong><br />
                    1. Day 1: Mix all ingredients. Knead until smooth and elastic (12-15 min).<br />
                    2. Bulk rise 1 hour, divide into 2 balls, refrigerate in oiled containers.<br />
                    3. Day 3: Remove 3 hours before baking. Stretch by hand (not rolling pin).<br />
                    4. Bake at 500-525°F on a pizza steel, 8-10 minutes until golden.
                  </p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> New York pizza gets its distinctive chew from high-gluten bread flour. The small amount of oil makes it pliable and adds richness. Low-moisture mozzarella is traditional — it melts better than fresh.
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
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Detroit Style — One 10×14" Pan Pizza for Game Day</h3>
                <p className="text-gray-600 mb-4">
                  Thick, airy, with those iconic crispy cheese edges (frico). This is the pizza that's taking America by storm.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>Style:</strong> Detroit (72% hydration, 4% olive oil)<br />
                    <strong>Pan:</strong> 10×14" Detroit-style blue steel pan<br />
                    <strong>Fermentation:</strong> 24-48 hour cold ferment
                  </p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-800">
                    <strong>Recipe (total dough weight: ~540g):</strong><br />
                    • Bread flour: 300g<br />
                    • Water (warm): 216g (72%)<br />
                    • Olive oil: 12g (4%)<br />
                    • Fine sea salt: 7.5g (2.5%)<br />
                    • Instant yeast: 1.5g (0.5%)<br />
                    • Sugar: 6g (2%)<br /><br />
                    <strong>Method:</strong><br />
                    1. Day 1: Mix ingredients. Knead until smooth (8-10 min). Refrigerate 24-48 hours.<br />
                    2. Day 2/3: Generously oil your pan. Press dough into corners. Let rise 3-4 hours until doubled and bubbly.<br />
                    3. Top with brick cheese pushed to edges. Add pepperoni, then stripes of sauce on top.<br />
                    4. Bake at 500°F for 12-15 minutes until cheese edges are dark and crispy.
                  </p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> The secret to Detroit style is brick cheese (or aged cheddar blend) pushed all the way to the edges of the pan. It renders and fries, creating those addictive crispy cheese edges. Sauce goes on top of the cheese, not under it.
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
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Same-Day Pizza — 3 Pizzas in 6 Hours</h3>
                <p className="text-gray-600 mb-4">
                  It's 2pm and you decided you want homemade pizza for dinner at 8pm. Here's how to make it work with a same-day dough.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>Style:</strong> Quick Neapolitan (63% hydration)<br />
                    <strong>Pizzas:</strong> 3 × 12" pizzas (270g dough balls)<br />
                    <strong>Fermentation:</strong> 6 hours at room temperature
                  </p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-800">
                    <strong>Recipe (total dough weight: ~840g):</strong><br />
                    • Bread flour or 00: 500g<br />
                    • Water (warm, 95°F): 315g (63%)<br />
                    • Fine sea salt: 12.5g (2.5%)<br />
                    • Instant yeast: 4g (0.8%) — more yeast for faster rise<br /><br />
                    <strong>Timeline:</strong><br />
                    • 2:00pm: Mix and knead dough<br />
                    • 2:15pm: Bulk ferment (cover, room temp)<br />
                    • 4:30pm: Divide into 3 balls, let rest 2-3 hours<br />
                    • 7:30pm: Preheat oven with steel/stone at max temp<br />
                    • 8:00pm: Stretch, top, and bake!
                  </p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Same-day dough won't have the complex flavor of a cold ferment, but it still makes excellent pizza. Using warm water and more yeast speeds fermentation. Keep the dough in a warm spot (like near a preheating oven) for faster rising.
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
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Sicilian Grandma Pie — One Full Sheet Pan</h3>
                <p className="text-gray-600 mb-4">
                  A thick, olive oil-rich Sicilian-style square pizza. Perfect for feeding a crowd or meal-prepping lunch for the week.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>Style:</strong> Sicilian (70% hydration, 5% olive oil)<br />
                    <strong>Pan:</strong> Half sheet pan (13×18")<br />
                    <strong>Servings:</strong> 8-10 generous slices
                  </p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-800">
                    <strong>Recipe (total dough weight: ~950g):</strong><br />
                    • Bread flour: 550g<br />
                    • Water (warm): 385g (70%)<br />
                    • Olive oil: 27.5g (5%) — plus more for pan<br />
                    • Fine sea salt: 13.75g (2.5%)<br />
                    • Instant yeast: 2.75g (0.5%)<br />
                    • Sugar: 11g (2%)<br /><br />
                    <strong>Method:</strong><br />
                    1. Day 1: Mix, knead, refrigerate 24-48 hours.<br />
                    2. Day 2/3: Coat sheet pan generously with olive oil (3+ tbsp).<br />
                    3. Press dough into pan. Let rise 3-4 hours until very puffy.<br />
                    4. Dimple with fingers. Add sauce, cheese, toppings.<br />
                    5. Bake at 475°F for 20-25 minutes until bottom is golden.
                  </p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> The generous olive oil in the pan is essential — it essentially fries the bottom crust, creating that incredible crispy base. For Grandma style, add the sauce and cheese after baking and serve immediately.
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
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Kids' Pizza Party — 8 Personal Pizzas</h3>
                <p className="text-gray-600 mb-4">
                  Eight 8-inch personal pizzas for a birthday party. Kids can top their own, making it an interactive activity.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>Style:</strong> Easy Neapolitan (60% hydration — easier for little hands)<br />
                    <strong>Pizzas:</strong> 8 × 8" personal pizzas (180g dough balls)<br />
                    <strong>Fermentation:</strong> Overnight cold ferment
                  </p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-800">
                    <strong>Recipe (total dough weight: ~1,500g):</strong><br />
                    • All-purpose flour: 900g (easier to work with than bread flour)<br />
                    • Water (cold): 540g (60%)<br />
                    • Fine sea salt: 22.5g (2.5%)<br />
                    • Instant yeast: 2.7g (0.3%)<br />
                    • Sugar: 18g (2%) — a little sweetness kids love<br /><br />
                    <strong>Party Day Plan:</strong><br />
                    1. Day before: Make dough, divide into 8 balls, refrigerate.<br />
                    2. Party day, 2 hours before: Remove dough from fridge to warm up.<br />
                    3. Pre-roll pizzas (or let kids stretch them with supervision).<br />
                    4. Set up topping station: sauce, cheese, pepperoni, veggies.<br />
                    5. Bake each pizza 6-8 minutes at 475°F.
                  </p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Lower hydration dough (60%) is much easier for kids to handle without getting sticky. Pre-stretch the dough into rounds before the party to save time. Use parchment paper under each pizza for easy transfer to the oven.
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
            Complete Pizza Style Comparison
          </h2>
          <p>
            Each pizza style has distinct characteristics that determine its dough formula. Understanding these differences helps you choose the right approach and set proper expectations.
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Style</th>
                  <th className="text-left py-2 pr-4">Hydration</th>
                  <th className="text-left py-2 pr-4">Oil</th>
                  <th className="text-left py-2 pr-4">Dough Ball</th>
                  <th className="text-left py-2 pr-4">Oven Temp</th>
                  <th className="text-left py-2">Character</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">Neapolitan</td>
                  <td className="py-2 pr-4">60-65%</td>
                  <td className="py-2 pr-4">None</td>
                  <td className="py-2 pr-4">250g</td>
                  <td className="py-2 pr-4">800-900°F</td>
                  <td className="py-2">Thin center, puffy cornicione, leopard spots, 90-second bake</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">New York</td>
                  <td className="py-2 pr-4">62-66%</td>
                  <td className="py-2 pr-4">2-3%</td>
                  <td className="py-2 pr-4">280-320g</td>
                  <td className="py-2 pr-4">500-550°F</td>
                  <td className="py-2">Large, foldable, slight chew, oily, 8-12 min bake</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">Detroit</td>
                  <td className="py-2 pr-4">70-75%</td>
                  <td className="py-2 pr-4">4%+</td>
                  <td className="py-2 pr-4">500g/pan</td>
                  <td className="py-2 pr-4">500-525°F</td>
                  <td className="py-2">Thick, airy, crispy cheese edges (frico), pan-baked</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">Sicilian</td>
                  <td className="py-2 pr-4">68-72%</td>
                  <td className="py-2 pr-4">4-6%</td>
                  <td className="py-2 pr-4">450-550g</td>
                  <td className="py-2 pr-4">450-500°F</td>
                  <td className="py-2">Thick, spongy, focaccia-like, olive oil rich</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">Roman (al taglio)</td>
                  <td className="py-2 pr-4">75-85%</td>
                  <td className="py-2 pr-4">3-5%</td>
                  <td className="py-2 pr-4">Varies</td>
                  <td className="py-2 pr-4">500-550°F</td>
                  <td className="py-2">Very light, ultra-airy, sold by weight</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">Chicago Deep Dish</td>
                  <td className="py-2 pr-4">55-60%</td>
                  <td className="py-2 pr-4">10%+</td>
                  <td className="py-2 pr-4">400-500g</td>
                  <td className="py-2 pr-4">425-450°F</td>
                  <td className="py-2">Buttery, flaky, pie-like, 30-40 min bake</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">Thin & Crispy (bar style)</td>
                  <td className="py-2 pr-4">55-58%</td>
                  <td className="py-2 pr-4">0-2%</td>
                  <td className="py-2 pr-4">200g</td>
                  <td className="py-2 pr-4">475-500°F</td>
                  <td className="py-2">Cracker-thin, crispy throughout, cut in squares</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Understanding Baker's Percentages
          </h3>
          <p>
            All serious pizza recipes use baker's percentages, where flour is always 100% and everything else is calculated relative to it. This system makes scaling effortless and allows comparison across recipes.
          </p>
          <ul>
            <li><strong>60% hydration:</strong> 60g water per 100g flour — manageable for beginners</li>
            <li><strong>70% hydration:</strong> 70g water per 100g flour — sticky, needs experience</li>
            <li><strong>2.5% salt:</strong> 2.5g salt per 100g flour — standard for pizza</li>
            <li><strong>0.2% yeast:</strong> 0.2g instant yeast per 100g flour — for cold ferment</li>
            <li><strong>1% yeast:</strong> 1g instant yeast per 100g flour — for same-day</li>
          </ul>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Hydration Guide by Skill Level
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Hydration %</th>
                  <th className="text-left py-2 pr-4">Skill Level</th>
                  <th className="text-left py-2 pr-4">Handling</th>
                  <th className="text-left py-2">Result</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">55-58%</td>
                  <td className="py-2 pr-4">Beginner</td>
                  <td className="py-2 pr-4">Very easy, stiff</td>
                  <td className="py-2">Dense, cracker-like, easy shaping, can use rolling pin</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">60-63%</td>
                  <td className="py-2 pr-4">Beginner-Intermediate</td>
                  <td className="py-2 pr-4">Easy, smooth</td>
                  <td className="py-2">Balanced texture, classic pizza, forgiving</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">64-67%</td>
                  <td className="py-2 pr-4">Intermediate</td>
                  <td className="py-2 pr-4">Moderate, slightly tacky</td>
                  <td className="py-2">Light crumb, good oven spring, NY style territory</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">68-72%</td>
                  <td className="py-2 pr-4">Advanced</td>
                  <td className="py-2 pr-4">Sticky, needs oil/semolina</td>
                  <td className="py-2">Open crumb, airy, Detroit/Sicilian, harder to stretch</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">73-80%</td>
                  <td className="py-2 pr-4">Expert</td>
                  <td className="py-2 pr-4">Very sticky, wet</td>
                  <td className="py-2">Ultra-light, focaccia-like, pan/Roman only</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">80%+</td>
                  <td className="py-2 pr-4">Expert</td>
                  <td className="py-2 pr-4">Batter-like</td>
                  <td className="py-2">Roman al taglio, ciabatta-like, must be pan-spread</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Comprehensive Flour Guide
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Flour Type</th>
                  <th className="text-left py-2 pr-4">Protein %</th>
                  <th className="text-left py-2 pr-4">W Value</th>
                  <th className="text-left py-2 pr-4">Best Styles</th>
                  <th className="text-left py-2">Popular Brands</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">Tipo 00 (pizza)</td>
                  <td className="py-2 pr-4">12-13%</td>
                  <td className="py-2 pr-4">260-310</td>
                  <td className="py-2 pr-4">Neapolitan, high-heat</td>
                  <td className="py-2">Caputo Pizzeria, Antimo Caputo</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">Tipo 00 (all purpose)</td>
                  <td className="py-2 pr-4">11-12%</td>
                  <td className="py-2 pr-4">220-250</td>
                  <td className="py-2 pr-4">General baking</td>
                  <td className="py-2">Caputo Classica, Anna 00</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">Bread Flour</td>
                  <td className="py-2 pr-4">12-14%</td>
                  <td className="py-2 pr-4">—</td>
                  <td className="py-2 pr-4">NY, Detroit, chewy</td>
                  <td className="py-2">King Arthur, Bob's Red Mill</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">High-Gluten Flour</td>
                  <td className="py-2 pr-4">14-15%</td>
                  <td className="py-2 pr-4">—</td>
                  <td className="py-2 pr-4">NY (authentic), bagels</td>
                  <td className="py-2">King Arthur Sir Lancelot, Pendleton</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">All-Purpose</td>
                  <td className="py-2 pr-4">10-12%</td>
                  <td className="py-2 pr-4">—</td>
                  <td className="py-2 pr-4">Detroit, Sicilian, beginner</td>
                  <td className="py-2">King Arthur, Gold Medal</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">Whole Wheat</td>
                  <td className="py-2 pr-4">13-14%</td>
                  <td className="py-2 pr-4">—</td>
                  <td className="py-2 pr-4">Blends (10-30%)</td>
                  <td className="py-2">Bob's Red Mill, Arrowhead</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">Semolina</td>
                  <td className="py-2 pr-4">13%</td>
                  <td className="py-2 pr-4">—</td>
                  <td className="py-2 pr-4">Dusting, Sicilian accent</td>
                  <td className="py-2">Caputo Semola, Bob's</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Fermentation Methods Section */}
      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl prose prose-lg">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            Fermentation Methods & Timing
          </h2>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-6 mb-4">
            Fermentation Time & Yeast Calculator
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Method</th>
                  <th className="text-left py-2 pr-4">Temperature</th>
                  <th className="text-left py-2 pr-4">Time</th>
                  <th className="text-left py-2 pr-4">Yeast %</th>
                  <th className="text-left py-2">Flavor Development</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">Quick same-day</td>
                  <td className="py-2 pr-4">75-78°F</td>
                  <td className="py-2 pr-4">4-6 hours</td>
                  <td className="py-2 pr-4">0.8-1%</td>
                  <td className="py-2">Mild, yeasty</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">Standard same-day</td>
                  <td className="py-2 pr-4">72-75°F</td>
                  <td className="py-2 pr-4">6-8 hours</td>
                  <td className="py-2 pr-4">0.5-0.7%</td>
                  <td className="py-2">Moderate</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">24-hour cold</td>
                  <td className="py-2 pr-4">38-40°F</td>
                  <td className="py-2 pr-4">24 hours</td>
                  <td className="py-2 pr-4">0.2-0.3%</td>
                  <td className="py-2">Good complexity</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">48-hour cold ⭐</td>
                  <td className="py-2 pr-4">38-40°F</td>
                  <td className="py-2 pr-4">48 hours</td>
                  <td className="py-2 pr-4">0.15-0.2%</td>
                  <td className="py-2">Excellent, slight tang</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">72-hour cold</td>
                  <td className="py-2 pr-4">38-40°F</td>
                  <td className="py-2 pr-4">72 hours</td>
                  <td className="py-2 pr-4">0.1-0.15%</td>
                  <td className="py-2">Complex, noticeable tang</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">With poolish</td>
                  <td className="py-2 pr-4">68-72°F then cold</td>
                  <td className="py-2 pr-4">12-16h + 24-48h</td>
                  <td className="py-2 pr-4">0.1% in poolish</td>
                  <td className="py-2">Best, complex, great browning</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Yeast Conversion Chart
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Instant Yeast</th>
                  <th className="text-left py-2 pr-4">Active Dry Yeast</th>
                  <th className="text-left py-2 pr-4">Fresh Yeast</th>
                  <th className="text-left py-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">0.5g</td>
                  <td className="py-2 pr-4">0.6g</td>
                  <td className="py-2 pr-4">1.5g</td>
                  <td className="py-2">Cold ferment (48-72h)</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">1g</td>
                  <td className="py-2 pr-4">1.25g</td>
                  <td className="py-2 pr-4">3g</td>
                  <td className="py-2">Cold ferment (24h)</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">2g</td>
                  <td className="py-2 pr-4">2.5g</td>
                  <td className="py-2 pr-4">6g</td>
                  <td className="py-2">Same-day (6-8h)</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">3g</td>
                  <td className="py-2 pr-4">4g</td>
                  <td className="py-2 pr-4">9g</td>
                  <td className="py-2">Quick same-day (4-6h)</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">7g (1 packet)</td>
                  <td className="py-2 pr-4">9g (1 packet)</td>
                  <td className="py-2 pr-4">21g</td>
                  <td className="py-2">Standard packet equivalents</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Tips for Great Pizza Dough
          </h3>
          <ul>
            <li><strong>Use a scale:</strong> Volume measurements are too imprecise for dough — 1 cup of flour can vary by 30%+</li>
            <li><strong>Water temperature matters:</strong> Use cold water (55-60°F) for long ferments, warm water (95-100°F) for same-day</li>
            <li><strong>Don't over-knead:</strong> Mix until smooth and the windowpane test passes, then let time do the work</li>
            <li><strong>Oil your container:</strong> Lightly oil the rising container to prevent sticking during fermentation</li>
            <li><strong>Rest before shaping:</strong> Let refrigerated dough warm up 2-3 hours before stretching</li>
            <li><strong>Flour your peel:</strong> Use semolina or a 50/50 blend with flour for the best slide onto your stone/steel</li>
            <li><strong>Preheat thoroughly:</strong> Pizza steels need 45-60 minutes at max temp; stones need even longer</li>
            <li><strong>Less is more on toppings:</strong> Overloaded pizza = soggy pizza. Keep it simple.</li>
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
              <h3 className="font-semibold text-gray-900 mb-1">Baker's Percentage Calculator</h3>
              <p className="text-sm text-gray-600">Convert any bread recipe to baker's percentages</p>
            </Link>
            <Link
              href="/sourdough-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Sourdough Calculator</h3>
              <p className="text-sm text-gray-600">Calculate sourdough bread and pizza dough</p>
            </Link>
            <Link
              href="/convection-oven-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Convection Oven Converter</h3>
              <p className="text-sm text-gray-600">Optimize pizza temps for convection ovens</p>
            </Link>
            <Link
              href="/oven-temperature-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Oven Temperature Converter</h3>
              <p className="text-sm text-gray-600">Convert between °F, °C, and Gas Marks</p>
            </Link>
            <Link
              href="/cooking-measurement-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Measurement Converter</h3>
              <p className="text-sm text-gray-600">Convert grams, cups, ounces, and more</p>
            </Link>
            <Link
              href="/recipe-scaler"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Recipe Scaler</h3>
              <p className="text-sm text-gray-600">Scale any recipe up or down</p>
            </Link>
            <Link
              href="/party-food-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Party Food Calculator</h3>
              <p className="text-sm text-gray-600">Plan pizza party quantities for any group</p>
            </Link>
            <Link
              href="/recipe-macro-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Recipe Macro Calculator</h3>
              <p className="text-sm text-gray-600">Calculate nutrition per pizza slice</p>
            </Link>
            <Link
              href="/recipe-cost-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Recipe Cost Calculator</h3>
              <p className="text-sm text-gray-600">Calculate cost per pizza for budgeting</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Authority Sources Footer */}
      <section className="py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-sm text-gray-500 text-center">
            Pizza dough science and techniques referenced from{" "}
            <a href="https://www.seriouseats.com/the-pizza-lab" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">Serious Eats (The Pizza Lab)</a>,{" "}
            <a href="https://www.pizzamaking.com/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">PizzaMaking.com</a>,{" "}
            <a href="https://www.stadlermade.com/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">Stadler Made</a>,{" "}
            <a href="https://www.kingarthurbaking.com/recipes/pizza" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">King Arthur Baking</a>, and{" "}
            <a href="https://www.associazioneveracepizza.it/en/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">Associazione Verace Pizza Napoletana</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
