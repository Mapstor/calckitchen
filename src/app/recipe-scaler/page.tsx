import { Metadata } from "next";
import Link from "next/link";
import RecipeScaler from "@/components/calculators/RecipeScaler";
import { FAQPageJsonLd, WebApplicationJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Recipe Scaler Calculator — Double, Halve, or Resize Any Recipe Instantly | CalcKitchen",
  description: "Scale any recipe up or down with our free recipe scaler. Handles eggs, baking adjustments, and tricky fractions. Paste your ingredients and get instant scaled quantities.",
  openGraph: {
    title: "Recipe Scaler Calculator — Double, Halve, or Resize Any Recipe Instantly",
    description: "Scale any recipe up or down with our free recipe scaler. Handles eggs, baking adjustments, and tricky fractions. Paste your ingredients and get instant scaled quantities.",
    url: "https://calckitchen.com/recipe-scaler",
    type: "website",
  },
  alternates: {
    canonical: "https://calckitchen.com/recipe-scaler",
  },
};

const faqs = [
  {
    question: "Can I just double everything in a recipe?",
    answer: "For most savory recipes, yes — doubling works fine. But for baking, some ingredients don't scale linearly. Leavening agents (baking powder, baking soda, yeast) should only increase by about 1.5× when doubling. Salt and spices often need less than double. Our calculator flags these ingredients automatically.",
  },
  {
    question: "What do I do when a halved recipe calls for half an egg?",
    answer: "Beat a whole egg, measure by volume (1 large egg ≈ 3 tablespoons), and use half. For 1.5 eggs, use 1 whole egg plus 1.5 tablespoons beaten egg. Alternatively, use 2 egg yolks instead of 1 whole egg — this works especially well in rich recipes like custards.",
  },
  {
    question: "Why does my doubled cake recipe taste different?",
    answer: "When scaling baking recipes over 2×, leavening doesn't scale linearly. Too much baking powder creates a bitter taste and causes collapse. Scale leavening by only 1.5× when doubling. For tripling+, consider baking multiple batches instead.",
  },
  {
    question: "How do I scale a recipe for a different pan size?",
    answer: "Calculate the area ratio between pans. A 9-inch round has ~64 sq. inches; a 10-inch round has ~79 sq. inches. Scale ingredients by the area ratio (79÷64 = 1.23×). For easier math, use our Cake Pan Converter tool.",
  },
  {
    question: "Should cooking time change when I scale a recipe?",
    answer: "For stovetop and slow-cooker recipes: cooking time stays roughly the same. For baking: larger quantities may need 10-25% more time at a slightly lower temperature. Smaller quantities may need less time. Always check doneness visually or with a thermometer.",
  },
  {
    question: "How do I convert cups to grams when scaling?",
    answer: "Cups-to-grams varies by ingredient. Flour: 1 cup = 120–125g. Sugar: 1 cup = 200g. Butter: 1 cup = 227g. For accuracy, weigh ingredients in grams rather than using volume when scaling up. Check our Cooking Measurement Converter for more conversions.",
  },
  {
    question: "What if my scaled amount is a weird fraction like 1⅓ tablespoons?",
    answer: "Convert to teaspoons for easier measuring: 1⅓ tbsp = 4 tsp. Or round to the nearest ¼ teaspoon — small variations rarely affect the final dish. Our calculator rounds to practical measurements automatically.",
  },
  {
    question: "Can I scale bread recipes the same way?",
    answer: "Bread scaling is trickier because yeast, hydration, and timing interact. For 2× batches, keep the same yeast amount but extend rising time by 20-30%. For larger batches, it's often better to make separate doughs and bake in batches.",
  },
  {
    question: "How do I scale a recipe from servings to a specific guest count?",
    answer: "Divide your target servings by the recipe's original yield. For example, if a recipe makes 8 servings and you need 20, your scale factor is 20 ÷ 8 = 2.5×. Multiply every ingredient by 2.5. For events, add 10-15% buffer for guests who take seconds.",
  },
  {
    question: "Do liquid ingredients scale the same as dry ingredients?",
    answer: "Generally yes, but there are exceptions. When scaling up soups and stews beyond 2×, reduce liquid by 10-15% since less evaporates from larger pots. For baking, scale liquids exactly. When scaling down, liquids may need slight increases for proper hydration.",
  },
  {
    question: "How do I handle scaling recipes with expensive ingredients?",
    answer: "For costly items like saffron, vanilla beans, or truffles, scale conservatively (75-80% of calculated amount when doubling+). These intensely flavored ingredients often taste stronger in larger batches due to flavor concentration. You can always add more, but can't remove excess.",
  },
  {
    question: "What's the maximum I should scale a recipe?",
    answer: "For stovetop and grilled dishes, 4× is generally safe. For baking, avoid scaling beyond 2× in a single batch — make separate batches instead. Professional bakers use baker's percentages for large scaling. Beyond 4×, consider whether your equipment (bowls, pans, ovens) can handle the volume.",
  },
];

export default function RecipeScalerPage() {
  return (
    <div className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Recipe Scaler Calculator"
        description="Scale any recipe up or down instantly. Paste your ingredients and get perfectly calculated quantities with smart rounding and baking adjustments."
        url="https://calckitchen.com/recipe-scaler"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Recipe Scaler", url: "https://calckitchen.com/recipe-scaler" },
        ]}
      />

      {/* Hero Section with Calculator */}
      <section className="bg-gradient-to-b from-warm-white to-white py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Recipe Scaler Calculator
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Double, halve, or resize any recipe instantly. Paste your ingredient list, set your scale factor, and get perfectly calculated quantities — with smart warnings for eggs, leavening, and seasonings.
          </p>

          {/* Calculator Component */}
          <RecipeScaler />
        </div>
      </section>

      {/* Real-World Examples Section */}
      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Recipe Scaling Examples: 6 Real-World Scenarios
          </h2>
          <p className="text-gray-700 mb-8">
            Master recipe scaling with these practical examples covering common situations — from doubling cookies for a bake sale to halving a recipe for date night.
          </p>

          {/* Example 1 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Doubling Chocolate Chip Cookies for a Bake Sale</h3>
                <p className="text-gray-600 mb-4">
                  Your famous chocolate chip cookie recipe makes 24 cookies, but you've signed up to bring 4 dozen (48) for the school bake sale. You need to double the recipe while avoiding common pitfalls.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Original Recipe (24 cookies):</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>2¼ cups all-purpose flour</li>
                    <li>1 cup (2 sticks) butter, softened</li>
                    <li>¾ cup granulated sugar</li>
                    <li>¾ cup packed brown sugar</li>
                    <li>2 large eggs</li>
                    <li>1 tsp baking soda</li>
                    <li>1 tsp salt</li>
                    <li>1 tsp vanilla extract</li>
                    <li>2 cups chocolate chips</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Scaled Recipe (48 cookies) — Scale Factor: 2×</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>4½ cups all-purpose flour (2.25 × 2)</li>
                    <li>2 cups (4 sticks) butter, softened</li>
                    <li>1½ cups granulated sugar</li>
                    <li>1½ cups packed brown sugar</li>
                    <li>4 large eggs</li>
                    <li><strong>1½ tsp baking soda</strong> (NOT 2 tsp — leavening scales at 1.5×)</li>
                    <li>1¾ tsp salt (scale conservatively)</li>
                    <li>2 tsp vanilla extract</li>
                    <li>4 cups chocolate chips</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Don't double the baking soda! Too much leavening makes cookies spread flat and taste bitter. Scale leavening agents by 1.5× when doubling. Also consider making two separate batches if your mixer can't handle the doubled volume.
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
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Halving Grandma's Lasagna for Two</h3>
                <p className="text-gray-600 mb-4">
                  Your grandmother's lasagna recipe feeds 12 — way too much for a cozy dinner with your partner. Here's how to scale it down to 6 servings (perfect for two dinners with leftovers).
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Original Recipe (12 servings):</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>1 lb ground beef</li>
                    <li>1 lb Italian sausage</li>
                    <li>28 oz can crushed tomatoes</li>
                    <li>2 cans (12 oz) tomato paste</li>
                    <li>3 eggs</li>
                    <li>2 lbs ricotta cheese</li>
                    <li>1 lb mozzarella, shredded</li>
                    <li>12 lasagna noodles</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Scaled Recipe (6 servings) — Scale Factor: 0.5×</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>½ lb ground beef</li>
                    <li>½ lb Italian sausage</li>
                    <li>14 oz can crushed tomatoes</li>
                    <li>1 can (6 oz) tomato paste</li>
                    <li><strong>2 eggs</strong> (use 1 whole egg + 1.5 tbsp beaten egg, OR just use 2 eggs)</li>
                    <li>1 lb ricotta cheese</li>
                    <li>½ lb mozzarella, shredded</li>
                    <li>6 lasagna noodles</li>
                  </ul>
                  <p className="text-sm text-emerald-700 mt-2"><strong>Pan size:</strong> Use an 8×8" baking dish instead of 9×13"</p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> For the 1.5 eggs, you can round to 2 eggs — extra egg just makes the ricotta layer slightly richer. Baking time decreases to 35-40 minutes (check at 35). An 8×8" dish is almost exactly half the area of a 9×13" dish.
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
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Scaling a Birthday Cake from 8 Servings to 30</h3>
                <p className="text-gray-600 mb-4">
                  Your go-to vanilla cake recipe makes an 8" round (8 servings), but you're hosting a birthday party with 30 guests. Rather than making 4 separate cakes, you'll scale to two 12" rounds.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Original Recipe (8" round, ~8 servings):</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>1½ cups all-purpose flour</li>
                    <li>1 cup sugar</li>
                    <li>½ cup butter, softened</li>
                    <li>2 eggs</li>
                    <li>¾ cup milk</li>
                    <li>1½ tsp baking powder</li>
                    <li>¼ tsp salt</li>
                    <li>1 tsp vanilla</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Scaled Recipe (two 12" rounds, ~32 servings) — Scale Factor: 3.75×</p>
                  <p className="text-xs text-green-600 mb-2">(Area of 12" is 113 sq in vs 50 sq in for 8", ratio ≈ 2.25× per pan; for 2 pans = 4× but using 3.75× for slightly shorter layers)</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>5⅝ cups all-purpose flour (round to 5¾ cups)</li>
                    <li>3¾ cups sugar</li>
                    <li>2 cups (4 sticks) butter, softened</li>
                    <li>7-8 eggs (7.5 calculated — use 8)</li>
                    <li>2¾ cups milk</li>
                    <li><strong>3 tsp baking powder</strong> (scaled 2.5× instead of 3.75×)</li>
                    <li>¾ tsp salt</li>
                    <li>4 tsp vanilla</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> This is a BIG batch — mix in two portions if your mixer is small. Scale baking powder by only 2-2.5× to prevent over-rising and collapse. Bake at 325°F (25°F lower than usual) for 35-45 minutes. Consider making two separate single batches for more control.
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
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Tripling Chili for the Super Bowl Party</h3>
                <p className="text-gray-600 mb-4">
                  Your award-winning chili recipe serves 8, but you're expecting 24 hungry football fans. Savory recipes are easier to scale, but there are still key adjustments to make.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Original Recipe (8 servings):</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>2 lbs ground beef</li>
                    <li>1 large onion, diced</li>
                    <li>28 oz can crushed tomatoes</li>
                    <li>15 oz can kidney beans</li>
                    <li>15 oz can black beans</li>
                    <li>4 cups beef broth</li>
                    <li>3 tbsp chili powder</li>
                    <li>1 tbsp cumin</li>
                    <li>1 tsp salt</li>
                    <li>½ tsp cayenne pepper</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Scaled Recipe (24 servings) — Scale Factor: 3×</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>6 lbs ground beef</li>
                    <li>3 large onions, diced</li>
                    <li>Three 28 oz cans crushed tomatoes</li>
                    <li>Three 15 oz cans kidney beans</li>
                    <li>Three 15 oz cans black beans</li>
                    <li><strong>10 cups beef broth</strong> (reduced from 12 — less evaporation in large pot)</li>
                    <li>7 tbsp chili powder (slightly less than 3×)</li>
                    <li>2½ tbsp cumin</li>
                    <li><strong>2 tsp salt</strong> (scale to 2×, taste and adjust)</li>
                    <li><strong>1 tsp cayenne</strong> (scale to 2× — heat intensifies!)</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Reduce liquid by 15-20% when tripling stovetop recipes — less evaporates from a larger surface-to-volume ratio. Scale spicy ingredients conservatively (2× instead of 3×) and adjust at the end. Salt should always be tasted and adjusted after cooking.
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
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Converting a "Feeds 4" Dinner to a Solo Meal</h3>
                <p className="text-gray-600 mb-4">
                  You found an amazing Thai basil chicken recipe that feeds 4, but you're cooking for one. Scaling down to 0.25× requires some creative measurement conversions.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Original Recipe (4 servings):</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>1 lb ground chicken</li>
                    <li>4 cloves garlic, minced</li>
                    <li>4 Thai chilies, sliced</li>
                    <li>3 tbsp oyster sauce</li>
                    <li>1 tbsp fish sauce</li>
                    <li>2 tsp soy sauce</li>
                    <li>1 tsp sugar</li>
                    <li>1 cup Thai basil leaves</li>
                    <li>2 tbsp vegetable oil</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Scaled Recipe (1 serving) — Scale Factor: 0.25×</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>4 oz ground chicken (¼ lb)</li>
                    <li>1 clove garlic, minced</li>
                    <li>1 Thai chili, sliced</li>
                    <li>2¼ tsp oyster sauce (round to 2 tsp)</li>
                    <li>¾ tsp fish sauce (round to 1 tsp)</li>
                    <li>½ tsp soy sauce</li>
                    <li>¼ tsp sugar (pinch)</li>
                    <li>¼ cup Thai basil leaves</li>
                    <li>1½ tsp vegetable oil</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> At 0.25×, measurements get tiny. Combine all sauces (oyster sauce + fish sauce + soy sauce + sugar) in a small bowl first — it's easier to measure small amounts when you mix them together. Don't skip the basil; it's the star!
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
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Scaling Sourdough Bread for Multiple Loaves</h3>
                <p className="text-gray-600 mb-4">
                  Your sourdough recipe makes 1 loaf, but you want to bake 3 loaves for holiday gifts. Bread scaling has unique challenges with yeast, hydration, and timing.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Original Recipe (1 loaf):</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>500g bread flour</li>
                    <li>350g water (70% hydration)</li>
                    <li>100g active sourdough starter</li>
                    <li>10g salt</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Scaled Recipe (3 loaves) — Scale Factor: 3×</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>1500g bread flour</li>
                    <li>1050g water (maintain 70% hydration)</li>
                    <li><strong>200g active sourdough starter</strong> (2× only, not 3×)</li>
                    <li>30g salt</li>
                  </ul>
                  <p className="text-sm text-emerald-700 mt-2"><strong>Timing adjustment:</strong> Reduce bulk ferment by 20% (faster with larger dough mass)</p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Sourdough starter doesn't scale linearly — the larger dough mass ferments faster. Use 1.5-2× starter when tripling, and watch the dough rather than the clock. Divide into individual loaves before final proof. Use our <Link href="/sourdough-calculator" className="text-coral hover:underline">Sourdough Calculator</Link> for precise baker's percentages.
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
            How to Scale Any Recipe
          </h2>
          <p>
            Scaling a recipe isn't always as simple as multiplying everything. Here's what you need to know to get perfect results every time.
          </p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Step 1: Calculate Your Scale Factor
          </h3>
          <p>
            The <strong>scale factor</strong> is the number you multiply each ingredient by. There are two ways to find it:
          </p>
          <ul>
            <li><strong>By servings:</strong> Divide your desired servings by the original servings. Want 12 servings from a recipe that makes 8? Your scale factor is 12 ÷ 8 = 1.5×.</li>
            <li><strong>By multiplier:</strong> Simply double (2×), halve (0.5×), or choose any multiplier directly.</li>
          </ul>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Step 2: Apply the Scale Factor
          </h3>
          <p>
            Multiply each ingredient quantity by the scale factor. Here's an example of scaling a recipe by 1.5×:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Original</th>
                  <th className="text-left py-2 pr-4">× 1.5</th>
                  <th className="text-left py-2">Scaled</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">2 cups flour</td>
                  <td className="py-2 pr-4">2 × 1.5</td>
                  <td className="py-2">3 cups flour</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">1 tsp salt</td>
                  <td className="py-2 pr-4">1 × 1.5</td>
                  <td className="py-2">1½ tsp salt</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">½ cup sugar</td>
                  <td className="py-2 pr-4">0.5 × 1.5</td>
                  <td className="py-2">¾ cup sugar</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">2 eggs</td>
                  <td className="py-2 pr-4">2 × 1.5</td>
                  <td className="py-2">3 eggs</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Step 3: Handle Special Cases
          </h3>
          <p>
            Some ingredients need extra attention when scaling:
          </p>
          <ul>
            <li><strong>Eggs:</strong> Round to whole eggs when possible. For half-eggs, beat a whole egg and use half by volume (1 egg ≈ 3 tbsp).</li>
            <li><strong>Leavening:</strong> Baking powder and soda shouldn't scale linearly above 2×. Increase by only 1.5× when doubling.</li>
            <li><strong>Salt & Spices:</strong> Start with less than the scaled amount, then taste and adjust.</li>
            <li><strong>Yeast:</strong> Doesn't scale well above 2×. Keep the same amount and adjust rising time instead.</li>
          </ul>
        </div>
      </section>

      {/* Comprehensive Reference Tables */}
      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Complete Recipe Scaling Reference Tables
          </h2>

          {/* Fraction Conversion Chart */}
          <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
            Master Fraction Conversion Chart
          </h3>
          <p className="text-gray-700 mb-4">
            Use this comprehensive chart to convert any measurement when scaling up or down.
          </p>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full text-sm bg-white rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-3 px-4 font-semibold">Original</th>
                  <th className="text-right py-3 px-4 font-semibold">÷4 (0.25×)</th>
                  <th className="text-right py-3 px-4 font-semibold">÷2 (0.5×)</th>
                  <th className="text-right py-3 px-4 font-semibold">×1.5</th>
                  <th className="text-right py-3 px-4 font-semibold">×2</th>
                  <th className="text-right py-3 px-4 font-semibold">×3</th>
                  <th className="text-right py-3 px-4 font-semibold">×4</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4 font-medium">1 cup</td>
                  <td className="text-right px-4">¼ cup</td>
                  <td className="text-right px-4">½ cup</td>
                  <td className="text-right px-4">1½ cups</td>
                  <td className="text-right px-4">2 cups</td>
                  <td className="text-right px-4">3 cups</td>
                  <td className="text-right px-4">4 cups</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4 font-medium">¾ cup</td>
                  <td className="text-right px-4">3 tbsp</td>
                  <td className="text-right px-4">6 tbsp</td>
                  <td className="text-right px-4">1⅛ cups</td>
                  <td className="text-right px-4">1½ cups</td>
                  <td className="text-right px-4">2¼ cups</td>
                  <td className="text-right px-4">3 cups</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4 font-medium">⅔ cup</td>
                  <td className="text-right px-4">2 tbsp + 2 tsp</td>
                  <td className="text-right px-4">⅓ cup</td>
                  <td className="text-right px-4">1 cup</td>
                  <td className="text-right px-4">1⅓ cups</td>
                  <td className="text-right px-4">2 cups</td>
                  <td className="text-right px-4">2⅔ cups</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4 font-medium">½ cup</td>
                  <td className="text-right px-4">2 tbsp</td>
                  <td className="text-right px-4">¼ cup</td>
                  <td className="text-right px-4">¾ cup</td>
                  <td className="text-right px-4">1 cup</td>
                  <td className="text-right px-4">1½ cups</td>
                  <td className="text-right px-4">2 cups</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4 font-medium">⅓ cup</td>
                  <td className="text-right px-4">1 tbsp + 1 tsp</td>
                  <td className="text-right px-4">2 tbsp + 2 tsp</td>
                  <td className="text-right px-4">½ cup</td>
                  <td className="text-right px-4">⅔ cup</td>
                  <td className="text-right px-4">1 cup</td>
                  <td className="text-right px-4">1⅓ cups</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4 font-medium">¼ cup</td>
                  <td className="text-right px-4">1 tbsp</td>
                  <td className="text-right px-4">2 tbsp</td>
                  <td className="text-right px-4">6 tbsp</td>
                  <td className="text-right px-4">½ cup</td>
                  <td className="text-right px-4">¾ cup</td>
                  <td className="text-right px-4">1 cup</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4 font-medium">1 tbsp</td>
                  <td className="text-right px-4">¾ tsp</td>
                  <td className="text-right px-4">1½ tsp</td>
                  <td className="text-right px-4">1 tbsp + 1½ tsp</td>
                  <td className="text-right px-4">2 tbsp</td>
                  <td className="text-right px-4">3 tbsp</td>
                  <td className="text-right px-4">¼ cup</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4 font-medium">1 tsp</td>
                  <td className="text-right px-4">¼ tsp</td>
                  <td className="text-right px-4">½ tsp</td>
                  <td className="text-right px-4">1½ tsp</td>
                  <td className="text-right px-4">2 tsp</td>
                  <td className="text-right px-4">1 tbsp</td>
                  <td className="text-right px-4">1 tbsp + 1 tsp</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4 font-medium">½ tsp</td>
                  <td className="text-right px-4">⅛ tsp</td>
                  <td className="text-right px-4">¼ tsp</td>
                  <td className="text-right px-4">¾ tsp</td>
                  <td className="text-right px-4">1 tsp</td>
                  <td className="text-right px-4">1½ tsp</td>
                  <td className="text-right px-4">2 tsp</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-2 px-4 font-medium">¼ tsp</td>
                  <td className="text-right px-4">pinch</td>
                  <td className="text-right px-4">⅛ tsp</td>
                  <td className="text-right px-4">⅜ tsp</td>
                  <td className="text-right px-4">½ tsp</td>
                  <td className="text-right px-4">¾ tsp</td>
                  <td className="text-right px-4">1 tsp</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Leavening Adjustment Chart */}
          <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
            Leavening Adjustment Guide (Critical for Baking!)
          </h3>
          <p className="text-gray-700 mb-4">
            Baking powder, baking soda, and yeast don't scale linearly. Use these adjusted amounts to prevent flat, dense, or bitter baked goods.
          </p>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full text-sm bg-white rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-3 px-4 font-semibold">Scale Factor</th>
                  <th className="text-center py-3 px-4 font-semibold">Baking Powder Adjustment</th>
                  <th className="text-center py-3 px-4 font-semibold">Baking Soda Adjustment</th>
                  <th className="text-center py-3 px-4 font-semibold">Active Dry Yeast Adjustment</th>
                  <th className="text-left py-3 px-4 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4 font-medium">0.5× (Halving)</td>
                  <td className="text-center px-4">0.5×</td>
                  <td className="text-center px-4">0.5×</td>
                  <td className="text-center px-4">0.6×</td>
                  <td className="px-4 text-gray-600">Scale normally</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4 font-medium">1.5×</td>
                  <td className="text-center px-4">1.25×</td>
                  <td className="text-center px-4">1.25×</td>
                  <td className="text-center px-4">1×</td>
                  <td className="px-4 text-gray-600">Slightly reduce increase</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4 font-medium">2× (Doubling)</td>
                  <td className="text-center px-4 font-semibold text-coral">1.5×</td>
                  <td className="text-center px-4 font-semibold text-coral">1.5×</td>
                  <td className="text-center px-4 font-semibold text-coral">1×</td>
                  <td className="px-4 text-gray-600">Critical adjustment zone</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4 font-medium">3× (Tripling)</td>
                  <td className="text-center px-4 font-semibold text-coral">2×</td>
                  <td className="text-center px-4 font-semibold text-coral">2×</td>
                  <td className="text-center px-4 font-semibold text-coral">1.25×</td>
                  <td className="px-4 text-gray-600">Consider separate batches</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-2 px-4 font-medium">4× (Quadrupling)</td>
                  <td className="text-center px-4 font-semibold text-coral">2.5×</td>
                  <td className="text-center px-4 font-semibold text-coral">2.5×</td>
                  <td className="text-center px-4 font-semibold text-coral">1.5×</td>
                  <td className="px-4 text-gray-600">Make 2 separate batches</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Egg Substitution Chart */}
          <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
            Egg Scaling & Substitution Guide
          </h3>
          <p className="text-gray-700 mb-4">
            When scaling results in fractional eggs, use this guide to measure precisely or find suitable substitutes.
          </p>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full text-sm bg-white rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-3 px-4 font-semibold">Scaled Egg Amount</th>
                  <th className="text-left py-3 px-4 font-semibold">By Volume</th>
                  <th className="text-left py-3 px-4 font-semibold">Practical Solution</th>
                  <th className="text-left py-3 px-4 font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4 font-medium">¼ egg</td>
                  <td className="px-4">¾ tbsp beaten egg</td>
                  <td className="px-4">1 tbsp beaten egg OR skip</td>
                  <td className="px-4 text-gray-600">Binding (use) or Moisture (skip)</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4 font-medium">½ egg</td>
                  <td className="px-4">1½ tbsp beaten egg</td>
                  <td className="px-4">2 tbsp beaten egg OR 1 yolk</td>
                  <td className="px-4 text-gray-600">Cakes, custards</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4 font-medium">¾ egg</td>
                  <td className="px-4">2¼ tbsp beaten egg</td>
                  <td className="px-4">2 tbsp beaten egg + 1 tsp</td>
                  <td className="px-4 text-gray-600">Most baking</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4 font-medium">1.5 eggs</td>
                  <td className="px-4">4½ tbsp beaten egg</td>
                  <td className="px-4">1 whole egg + 1½ tbsp beaten</td>
                  <td className="px-4 text-gray-600">All recipes</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4 font-medium">2.5 eggs</td>
                  <td className="px-4">7½ tbsp beaten egg</td>
                  <td className="px-4">2 whole eggs + 1½ tbsp beaten</td>
                  <td className="px-4 text-gray-600">All recipes</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-amber-800">
              <strong>Egg Size Reference:</strong> 1 large egg = 3 tbsp total (about 1 tbsp yolk, 2 tbsp white).
              Medium eggs are ~2.5 tbsp; jumbo eggs are ~4 tbsp. Adjust measurements accordingly.
            </p>
          </div>

          {/* Pan Size Scaling Chart */}
          <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
            Pan Size Scaling Reference
          </h3>
          <p className="text-gray-700 mb-4">
            When changing pan sizes, scale by area ratio. Here are common conversions:
          </p>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full text-sm bg-white rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-3 px-4 font-semibold">Original Pan</th>
                  <th className="text-center py-3 px-4 font-semibold">Area (sq in)</th>
                  <th className="text-left py-3 px-4 font-semibold">New Pan</th>
                  <th className="text-center py-3 px-4 font-semibold">Area (sq in)</th>
                  <th className="text-center py-3 px-4 font-semibold">Scale Factor</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4">8" round</td>
                  <td className="text-center px-4">50</td>
                  <td className="px-4">9" round</td>
                  <td className="text-center px-4">64</td>
                  <td className="text-center px-4 font-semibold">1.28×</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4">9" round</td>
                  <td className="text-center px-4">64</td>
                  <td className="px-4">10" round</td>
                  <td className="text-center px-4">79</td>
                  <td className="text-center px-4 font-semibold">1.23×</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4">8×8" square</td>
                  <td className="text-center px-4">64</td>
                  <td className="px-4">9×13" rectangle</td>
                  <td className="text-center px-4">117</td>
                  <td className="text-center px-4 font-semibold">1.83×</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4">9×13" rectangle</td>
                  <td className="text-center px-4">117</td>
                  <td className="px-4">Two 9" rounds</td>
                  <td className="text-center px-4">127</td>
                  <td className="text-center px-4 font-semibold">1.09×</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4">9" round</td>
                  <td className="text-center px-4">64</td>
                  <td className="px-4">8×8" square</td>
                  <td className="text-center px-4">64</td>
                  <td className="text-center px-4 font-semibold">1.00×</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-2 px-4">12-cup Bundt</td>
                  <td className="text-center px-4">~100</td>
                  <td className="px-4">Two 9" rounds</td>
                  <td className="text-center px-4">127</td>
                  <td className="text-center px-4 font-semibold">1.27×</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Cooking Time Adjustments */}
          <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
            Cooking Time Adjustments by Recipe Type
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm bg-white rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-3 px-4 font-semibold">Recipe Type</th>
                  <th className="text-center py-3 px-4 font-semibold">Halving Time</th>
                  <th className="text-center py-3 px-4 font-semibold">Doubling Time</th>
                  <th className="text-center py-3 px-4 font-semibold">Temperature Adjustment</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4 font-medium">Stovetop (soups, stews)</td>
                  <td className="text-center px-4">Same time</td>
                  <td className="text-center px-4">Same time</td>
                  <td className="text-center px-4">No change</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4 font-medium">Slow cooker</td>
                  <td className="text-center px-4">Same time</td>
                  <td className="text-center px-4">Same time</td>
                  <td className="text-center px-4">No change</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4 font-medium">Cakes & quick breads</td>
                  <td className="text-center px-4">-15 to 20%</td>
                  <td className="text-center px-4">+10 to 25%</td>
                  <td className="text-center px-4">Reduce 25°F for larger</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4 font-medium">Cookies</td>
                  <td className="text-center px-4">Same time</td>
                  <td className="text-center px-4">Same time</td>
                  <td className="text-center px-4">No change</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4 font-medium">Casseroles</td>
                  <td className="text-center px-4">-10 to 15%</td>
                  <td className="text-center px-4">+15 to 20%</td>
                  <td className="text-center px-4">Reduce 25°F for larger</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4 font-medium">Yeast breads</td>
                  <td className="text-center px-4">-10% bake, same rise</td>
                  <td className="text-center px-4">-10% rise, +15% bake</td>
                  <td className="text-center px-4">Reduce 25°F for larger</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-medium">Roasted meats</td>
                  <td className="text-center px-4">By weight, not volume</td>
                  <td className="text-center px-4">By weight, not volume</td>
                  <td className="text-center px-4">Use <Link href="/meat-cooking-time-calculator" className="text-coral hover:underline">meat calculator</Link></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Troubleshooting Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl prose prose-lg">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            Recipe Scaling Troubleshooting
          </h2>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-6 mb-4">
            Baking Problems When Scaling Up
          </h3>
          <p>
            Doubling baking recipes is notorious for producing disappointing results. Here's why and how to fix it:
          </p>
          <ul>
            <li><strong>Cakes that collapse:</strong> Too much leavening. Scale baking powder/soda by only 1.5× when doubling.</li>
            <li><strong>Bitter aftertaste:</strong> Same issue — excess baking soda creates alkaline off-flavors.</li>
            <li><strong>Dense texture:</strong> Over-mixing becomes more likely with larger batches. Mix just until combined.</li>
            <li><strong>Uneven baking:</strong> Larger pans need lower temperatures (reduce by 25°F) and longer times.</li>
            <li><strong>Burnt edges, raw center:</strong> Oven rack position matters more with larger batches. Use middle rack and rotate halfway.</li>
          </ul>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Scaling Down Challenges
          </h3>
          <ul>
            <li><strong>Tiny measurements:</strong> ⅛ teaspoon is hard to measure accurately. Consider making a full batch and freezing extras.</li>
            <li><strong>Egg fractions:</strong> Beat whole eggs and measure by volume. 1 large egg = 3 tablespoons.</li>
            <li><strong>Pan sizes:</strong> Half-recipes need smaller pans. Use a 6" round instead of 9" round.</li>
            <li><strong>Uneven cooking:</strong> Small portions can overcook quickly. Reduce temperature by 25°F and watch closely.</li>
          </ul>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Ingredient-Specific Issues
          </h3>
          <ul>
            <li><strong>Garlic:</strong> Scales linearly for raw preparations, but scale by 0.75× for cooked dishes (flavor intensifies).</li>
            <li><strong>Chocolate:</strong> Scales linearly. No adjustment needed.</li>
            <li><strong>Alcohol:</strong> Scale by 0.75× for cooking (less evaporates from larger volumes).</li>
            <li><strong>Fresh herbs:</strong> Scale linearly. Dried herbs should scale by 0.8× when doubling (more time to infuse).</li>
            <li><strong>Cream/butter fat:</strong> Scales linearly, but larger batches may need 5% less (fat coats more evenly).</li>
          </ul>
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
              href="/cooking-measurement-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Measurement Converter</h3>
              <p className="text-sm text-gray-600">Convert cups, tablespoons, grams, and more between units</p>
            </Link>
            <Link
              href="/cake-pan-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Cake Pan Converter</h3>
              <p className="text-sm text-gray-600">Scale recipes for different pan sizes and shapes</p>
            </Link>
            <Link
              href="/bakers-percentage-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Baker's Percentage</h3>
              <p className="text-sm text-gray-600">Professional bread scaling by weight ratios</p>
            </Link>
            <Link
              href="/sourdough-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Sourdough Calculator</h3>
              <p className="text-sm text-gray-600">Scale sourdough recipes with hydration calculations</p>
            </Link>
            <Link
              href="/cake-servings-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Cake Servings Calculator</h3>
              <p className="text-sm text-gray-600">Calculate servings by pan size for any event</p>
            </Link>
            <Link
              href="/party-food-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Party Food Calculator</h3>
              <p className="text-sm text-gray-600">Plan quantities for any size gathering</p>
            </Link>
            <Link
              href="/recipe-cost-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Recipe Cost Calculator</h3>
              <p className="text-sm text-gray-600">Calculate cost per serving at any scale</p>
            </Link>
            <Link
              href="/butter-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Butter Converter</h3>
              <p className="text-sm text-gray-600">Convert sticks, cups, tablespoons, and grams</p>
            </Link>
            <Link
              href="/recipe-macro-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Recipe Macro Calculator</h3>
              <p className="text-sm text-gray-600">Calculate nutrition per serving at any scale</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Authority Sources Footer */}
      <section className="py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-sm text-gray-500 text-center">
            Recipe scaling best practices informed by{" "}
            <a href="https://www.kingarthurbaking.com/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">King Arthur Baking</a>
            {" "}&bull;{" "}
            <a href="https://www.seriouseats.com/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">Serious Eats</a>
            {" "}&bull;{" "}
            <a href="https://www.cooksillustrated.com/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">Cook's Illustrated</a>
            {" "}&bull;{" "}
            <a href="https://www.fda.gov/food" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">FDA Food Safety</a>
            {" "}&bull;{" "}
            <a href="https://www.usda.gov/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">USDA</a>
          </p>
        </div>
      </section>
    </div>
  );
}
