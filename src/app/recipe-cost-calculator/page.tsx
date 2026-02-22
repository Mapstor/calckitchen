import { Metadata } from "next";
import Link from "next/link";
import RecipeCostCalculator from "@/components/calculators/RecipeCostCalculator";
import { FAQPageJsonLd, WebApplicationJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Recipe Cost Calculator — Cost Per Serving & Food Cost % | CalcKitchen",
  description: "Calculate recipe cost, cost per serving, and food cost percentage for restaurants. Enter ingredients and prices, get instant cost breakdown. Free for home cooks and food businesses.",
  openGraph: {
    title: "Recipe Cost Calculator — Cost Per Serving & Food Cost %",
    description: "Calculate recipe cost, cost per serving, and food cost percentage for restaurants. Enter ingredients and prices, get instant cost breakdown. Free for home cooks and food businesses.",
    url: "https://calckitchen.com/recipe-cost-calculator",
    type: "website",
  },
  alternates: {
    canonical: "https://calckitchen.com/recipe-cost-calculator",
  },
};

const faqs = [
  {
    question: "What food cost percentage should I aim for?",
    answer: "Standard targets: Fine dining: 28-32%, Casual restaurants: 30-35%, Fast casual/QSR: 25-30%, Bakeries: 20-25%, Bars (drinks): 18-24%. These are industry averages. Your ideal target depends on your labor costs, rent, and desired profit margin. If your labor is high (full-service), you need lower food cost. If it's low (fast casual), you can afford higher food cost.",
  },
  {
    question: "How do I calculate cost per serving?",
    answer: "Total recipe cost ÷ number of servings = cost per serving. Example: A soup recipe costs $24.50 and makes 10 portions. Cost per serving = $24.50 ÷ 10 = $2.45. For menu pricing, divide cost per serving by your target food cost percentage. At 30% food cost, that $2.45 soup should be priced around $8.17 (rounded to $8.25 or $8.50).",
  },
  {
    question: "Should I include seasonings and pantry staples in my cost?",
    answer: "Yes, especially for food businesses. Those 'invisible' costs add up. A conservative approach: add 3-5% to your calculated ingredient cost to cover salt, pepper, oil for cooking, herbs, and other staples. For precise tracking, calculate the cost per teaspoon/tablespoon of seasonings you use frequently and add them explicitly.",
  },
  {
    question: "How do I handle bulk ingredient costs?",
    answer: "Break down bulk purchases to cost per unit (gram, ounce, each). If you buy a 25-lb bag of flour for $15, that's $0.60/lb or $0.0375/oz. Then multiply by the amount your recipe uses. Our calculator handles this automatically when you enter the package size and price.",
  },
  {
    question: "What's the difference between food cost and plate cost?",
    answer: "Food cost is JUST ingredients. Plate cost includes labor, overhead, packaging, and garnishes. Example: A dish with $3.50 food cost might have $1.00 labor (prep time), $0.50 packaging, $0.25 garnish = $5.25 plate cost. Restaurants typically track food cost %, but understanding full plate cost helps with pricing decisions.",
  },
  {
    question: "How can I lower my food cost percentage?",
    answer: "Strategies: 1) Reduce portion sizes slightly (customers rarely notice 5-10% reduction). 2) Use less expensive cuts/ingredients in preparations where they won't be noticed. 3) Cross-utilize ingredients across menu items to reduce waste. 4) Buy seasonal ingredients when cheaper. 5) Negotiate with suppliers or change vendors. 6) Reduce waste through better inventory management. 7) Raise menu prices if the market allows.",
  },
  {
    question: "How often should I recalculate my food costs?",
    answer: "At minimum, review food costs monthly and whenever suppliers raise prices. High-inflation periods may require weekly reviews. Track your top 10 ingredients closely—they typically represent 80% of your food cost. Set up price alerts with suppliers and recalculate affected recipes immediately when key ingredient prices change more than 5%.",
  },
  {
    question: "What's the edible portion cost vs as-purchased cost?",
    answer: "As-purchased (AP) cost is what you pay at the supplier. Edible portion (EP) cost accounts for waste and trim. For example, if you buy whole salmon at $12/lb but 40% is bones/skin/waste, your EP cost is $12 ÷ 0.60 = $20/lb of usable fish. Always use EP cost in recipe costing for accuracy.",
  },
  {
    question: "How do I account for recipe yield loss?",
    answer: "Cooking causes shrinkage—meat loses 25-30% weight, vegetables lose 10-20% through cooking. Track actual cooked portions vs raw weights. If your 8 oz raw burger cooks to 6 oz served, cost the 8 oz raw weight. For sauces that reduce, measure before and after to find your yield percentage.",
  },
  {
    question: "Should I cost recipes differently for takeout vs dine-in?",
    answer: "Yes. Takeout adds packaging costs ($0.20-$1.50 per container), utensils, napkins, and condiment packets. Create separate costings for dine-in and takeout. Many restaurants price takeout slightly higher or use lower food cost targets for delivery orders to account for these additional expenses plus third-party delivery fees.",
  },
  {
    question: "How do I price specials and limited-time offers?",
    answer: "Specials can run at higher food costs (35-40%) if they drive traffic or move excess inventory. Calculate your break-even: if a special brings in 50 extra covers at $18 each with 40% food cost, you still make $540 gross profit. Use specials strategically to test new menu items before committing to permanent addition.",
  },
  {
    question: "What's the prime cost and why does it matter?",
    answer: "Prime cost = food cost + labor cost. It's the most important metric for restaurant profitability. Target prime cost of 55-65% of revenue. If your food cost is 30% and labor is 30%, prime cost is 60%—leaving 40% for rent, utilities, profit. If prime cost exceeds 70%, profitability becomes nearly impossible.",
  },
];

export default function RecipeCostCalculatorPage() {
  return (
    <div className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Recipe Cost Calculator"
        description="Calculate recipe costs, cost per serving, and food cost percentage. Perfect for restaurants, bakeries, and home cooks who want to understand their food costs."
        url="https://calckitchen.com/recipe-cost-calculator"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Recipe Cost Calculator", url: "https://calckitchen.com/recipe-cost-calculator" },
        ]}
      />

      {/* Hero Section with Calculator */}
      <section className="bg-gradient-to-b from-warm-white to-white py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Recipe Cost Calculator
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Calculate your recipe cost, cost per serving, and food cost percentage. Essential for restaurants, bakeries,
            and home cooks who want to budget meals or price menu items profitably.
          </p>

          {/* Calculator Component */}
          <RecipeCostCalculator />
        </div>
      </section>

      {/* Real-World Examples Section */}
      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Real-World Recipe Costing Examples
          </h2>
          <p className="text-gray-700 mb-8">
            See how professional chefs and home cooks use recipe costing to make smarter decisions about pricing,
            portioning, and menu development.
          </p>

          {/* Example 1 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Restaurant Entrée: Grilled Salmon Plate</h3>
                <p className="text-gray-600 mb-4">
                  A casual dining restaurant needs to price their signature salmon dish. They target 32% food cost
                  to maintain profitability while staying competitive.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Ingredient Costs:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 6 oz Atlantic salmon fillet: $4.50</li>
                    <li>• Herb butter (1 oz): $0.35</li>
                    <li>• Roasted vegetables (6 oz): $1.20</li>
                    <li>• Rice pilaf (4 oz): $0.45</li>
                    <li>• Lemon wedge and herbs: $0.25</li>
                    <li>• Cooking oil and seasonings: $0.15</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Results:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• <strong>Total food cost:</strong> $6.90</li>
                    <li>• <strong>Menu price at 32% food cost:</strong> $6.90 ÷ 0.32 = $21.56 → $21.95</li>
                    <li>• <strong>Gross profit per plate:</strong> $15.05</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700"><strong>Pro tip:</strong> Compare to your local market—if competitors charge $24-26 for similar dishes, you can price at $23.95 and enjoy a lower 29% food cost while still being competitive.</p>
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
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Bakery Item: Artisan Sourdough Loaf</h3>
                <p className="text-gray-600 mb-4">
                  A small bakery wants to cost their signature sourdough loaf. Bakeries typically target 20-25%
                  food cost since labor is their primary expense.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Ingredient Costs (per loaf):</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Bread flour (450g): $0.54</li>
                    <li>• Whole wheat flour (50g): $0.08</li>
                    <li>• Salt (10g): $0.02</li>
                    <li>• Sourdough starter (100g): $0.12</li>
                    <li>• Water: $0.01</li>
                    <li>• Energy (oven cost): $0.15</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Results:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• <strong>Total cost per loaf:</strong> $0.92</li>
                    <li>• <strong>Price at 22% food cost:</strong> $0.92 ÷ 0.22 = $4.18 → $4.50</li>
                    <li>• <strong>Actual food cost at $4.50:</strong> 20.4%</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700"><strong>Pro tip:</strong> Artisan bakeries can command $6-8 per loaf in premium markets. At $6.50, your food cost drops to 14%, but labor may be 40%+ of revenue. Know your full cost structure.</p>
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
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Home Budget: Weekly Meal Prep</h3>
                <p className="text-gray-600 mb-4">
                  A family of four wants to budget their weekly dinners. They batch-cook a large pot of chili that
                  provides 8 servings (2 dinners for the family).
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Ingredient Costs:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Ground beef (2 lbs): $9.98</li>
                    <li>• Canned tomatoes (2 cans): $3.50</li>
                    <li>• Kidney beans (2 cans): $2.80</li>
                    <li>• Onion and peppers: $2.50</li>
                    <li>• Spices and seasonings: $0.75</li>
                    <li>• Sour cream and cheese (for topping): $3.00</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Results:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• <strong>Total recipe cost:</strong> $22.53</li>
                    <li>• <strong>Cost per serving:</strong> $22.53 ÷ 8 = $2.82</li>
                    <li>• <strong>Family dinner cost (4 servings):</strong> $11.27</li>
                    <li>• <strong>Compared to takeout:</strong> Similar chili bowls cost $12-15 each</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700"><strong>Pro tip:</strong> Making 2x this recipe costs only $40 but feeds the family 4 dinners. Freeze half for even greater convenience. Cost per meal drops if you buy ingredients on sale.</p>
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
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Catering Event: Corporate Lunch (50 people)</h3>
                <p className="text-gray-600 mb-4">
                  A caterer is bidding on a corporate lunch. They need to calculate food cost to determine pricing
                  that covers labor, equipment rental, and profit.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Per-Person Food Costs:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Chicken breast (6 oz): $2.25</li>
                    <li>• Mixed greens salad: $1.40</li>
                    <li>• Roasted potatoes: $0.85</li>
                    <li>• Dinner roll and butter: $0.45</li>
                    <li>• Brownie dessert: $0.90</li>
                    <li>• Beverages (water, coffee): $0.65</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Results:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• <strong>Food cost per person:</strong> $6.50</li>
                    <li>• <strong>Total food cost (50 people):</strong> $325.00</li>
                    <li>• <strong>Price at 28% food cost:</strong> $6.50 ÷ 0.28 = $23.21/person</li>
                    <li>• <strong>Total bid (rounded):</strong> $1,175 ($23.50/person)</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700"><strong>Pro tip:</strong> Add 10% buffer for food cost variance and waste. Corporate catering typically runs 25-30% food cost. Don&apos;t forget to factor in disposables (~$1.50/person) and transport costs.</p>
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
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Food Truck: Signature Tacos</h3>
                <p className="text-gray-600 mb-4">
                  A food truck operator needs to price their taco plate (3 tacos). Food trucks target 28-32% food
                  cost with lower overhead than restaurants but higher ingredient cost per item.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Ingredient Costs (3-taco plate):</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Carne asada (5 oz): $2.75</li>
                    <li>• Corn tortillas (3): $0.30</li>
                    <li>• Onion, cilantro, lime: $0.35</li>
                    <li>• Salsa and crema: $0.40</li>
                    <li>• Rice and beans side: $0.55</li>
                    <li>• Container and napkins: $0.35</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Results:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• <strong>Total cost:</strong> $4.70</li>
                    <li>• <strong>Price at 30% food cost:</strong> $4.70 ÷ 0.30 = $15.67 → $16.00</li>
                    <li>• <strong>Actual food cost at $16:</strong> 29.4%</li>
                    <li>• <strong>Daily profit (50 plates):</strong> $565 gross</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700"><strong>Pro tip:</strong> Volume is everything for food trucks. At 75 plates/day at the same margins, daily gross jumps to $847.50. Track your bestsellers and optimize prep for speed.</p>
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
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Batch Cooking: Freezer Meal Prep</h3>
                <p className="text-gray-600 mb-4">
                  A busy professional batch-cooks 20 freezer meals on Sunday to save time and money during the work
                  week. This is chicken stir-fry with rice.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Bulk Ingredient Costs (20 portions):</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Chicken thighs (5 lbs): $14.95</li>
                    <li>• Jasmine rice (3 lbs): $4.50</li>
                    <li>• Frozen stir-fry vegetables (4 bags): $10.00</li>
                    <li>• Soy sauce, sesame oil, garlic: $2.50</li>
                    <li>• Meal prep containers (20): $8.00</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Results:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• <strong>Total batch cost:</strong> $39.95</li>
                    <li>• <strong>Cost per meal:</strong> $39.95 ÷ 20 = $2.00</li>
                    <li>• <strong>Weekly lunch savings:</strong> ~$60 vs restaurant lunches</li>
                    <li>• <strong>Monthly savings:</strong> ~$240</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700"><strong>Pro tip:</strong> Reusable glass containers cost more upfront ($30-50 for 20) but last years. Amortized over 100 uses, they add only $0.04/meal vs disposables at $0.40/meal.</p>
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
            Understanding Food Cost Percentage
          </h2>
          <p>
            Food cost percentage is the most important metric for food businesses. It tells you how much of your
            revenue goes to ingredients—and ultimately determines whether your restaurant, bakery, or food truck
            can be profitable.
          </p>

          <div className="bg-gray-50 p-4 rounded-lg my-6">
            <p className="font-semibold text-gray-900 mb-2">The Formula:</p>
            <p className="font-mono text-sm">Food Cost % = (Total Ingredient Cost ÷ Menu Price) × 100</p>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Industry Food Cost Targets by Business Type
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Business Type</th>
                  <th className="text-left py-2 pr-4">Target Food Cost %</th>
                  <th className="text-left py-2 pr-4">Labor Cost %</th>
                  <th className="text-left py-2 pr-4">Prime Cost Target</th>
                  <th className="text-left py-2">Key Considerations</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Fine Dining</td>
                  <td className="py-2 pr-4">28-32%</td>
                  <td className="py-2 pr-4">35-40%</td>
                  <td className="py-2 pr-4">63-72%</td>
                  <td className="py-2">High service labor offsets premium ingredients</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Casual Dining</td>
                  <td className="py-2 pr-4">30-35%</td>
                  <td className="py-2 pr-4">28-32%</td>
                  <td className="py-2 pr-4">58-67%</td>
                  <td className="py-2">Standard target for most restaurants</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Fast Casual</td>
                  <td className="py-2 pr-4">28-32%</td>
                  <td className="py-2 pr-4">25-28%</td>
                  <td className="py-2 pr-4">53-60%</td>
                  <td className="py-2">Counter service reduces labor needs</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Quick Service (QSR)</td>
                  <td className="py-2 pr-4">25-30%</td>
                  <td className="py-2 pr-4">25-28%</td>
                  <td className="py-2 pr-4">50-58%</td>
                  <td className="py-2">High volume compensates for tight margins</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Bakery/Cafe</td>
                  <td className="py-2 pr-4">20-25%</td>
                  <td className="py-2 pr-4">35-45%</td>
                  <td className="py-2 pr-4">55-70%</td>
                  <td className="py-2">Low ingredient cost, high skilled labor</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Bar (Drinks)</td>
                  <td className="py-2 pr-4">18-24%</td>
                  <td className="py-2 pr-4">20-25%</td>
                  <td className="py-2 pr-4">38-49%</td>
                  <td className="py-2">High-margin beverages offset low food sales</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Food Truck</td>
                  <td className="py-2 pr-4">28-32%</td>
                  <td className="py-2 pr-4">20-25%</td>
                  <td className="py-2 pr-4">48-57%</td>
                  <td className="py-2">No rent, but limited volume capacity</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Catering</td>
                  <td className="py-2 pr-4">25-30%</td>
                  <td className="py-2 pr-4">30-35%</td>
                  <td className="py-2 pr-4">55-65%</td>
                  <td className="py-2">Event-based, factor in transport and setup</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Ghost Kitchen</td>
                  <td className="py-2 pr-4">30-35%</td>
                  <td className="py-2 pr-4">22-28%</td>
                  <td className="py-2 pr-4">52-63%</td>
                  <td className="py-2">Delivery fees eat into margin, lower labor</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Pizza Shop</td>
                  <td className="py-2 pr-4">28-35%</td>
                  <td className="py-2 pr-4">25-30%</td>
                  <td className="py-2 pr-4">53-65%</td>
                  <td className="py-2">Flour-based items have excellent margins</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Menu Pricing from Food Cost
          </h3>
          <p>
            To calculate menu price from food cost:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg my-4">
            <p className="font-mono text-sm">Menu Price = Ingredient Cost ÷ Target Food Cost %</p>
          </div>
          <p>
            Example: If a dish costs $4.50 in ingredients and you target 30% food cost:
          </p>
          <p className="font-mono text-sm bg-gray-50 p-4 rounded-lg">
            $4.50 ÷ 0.30 = $15.00 menu price
          </p>
        </div>
      </section>

      {/* Common Ingredient Costs Reference */}
      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl prose prose-lg">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            Common Ingredient Cost Reference (US Average Prices)
          </h2>
          <p className="text-gray-700 mb-6">
            Use these benchmark prices to estimate recipe costs. Actual prices vary by location, supplier, and season.
            Update these figures quarterly for accurate costing.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Ingredient</th>
                  <th className="text-left py-2 pr-4">Retail Price</th>
                  <th className="text-left py-2 pr-4">Foodservice Price</th>
                  <th className="text-left py-2 pr-4">Cost per Oz</th>
                  <th className="text-left py-2">Typical Recipe Use</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Chicken Breast (boneless)</td>
                  <td className="py-2 pr-4">$4.99/lb</td>
                  <td className="py-2 pr-4">$2.80/lb</td>
                  <td className="py-2 pr-4">$0.31/oz</td>
                  <td className="py-2">6 oz portion = $1.86</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Ground Beef (80/20)</td>
                  <td className="py-2 pr-4">$5.49/lb</td>
                  <td className="py-2 pr-4">$3.50/lb</td>
                  <td className="py-2 pr-4">$0.34/oz</td>
                  <td className="py-2">8 oz burger = $2.72</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Atlantic Salmon</td>
                  <td className="py-2 pr-4">$12.99/lb</td>
                  <td className="py-2 pr-4">$9.50/lb</td>
                  <td className="py-2 pr-4">$0.81/oz</td>
                  <td className="py-2">6 oz fillet = $4.86</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Pasta (dried)</td>
                  <td className="py-2 pr-4">$1.99/lb</td>
                  <td className="py-2 pr-4">$0.85/lb</td>
                  <td className="py-2 pr-4">$0.12/oz</td>
                  <td className="py-2">4 oz portion = $0.48</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Rice (long grain)</td>
                  <td className="py-2 pr-4">$1.29/lb</td>
                  <td className="py-2 pr-4">$0.45/lb</td>
                  <td className="py-2 pr-4">$0.08/oz</td>
                  <td className="py-2">4 oz portion = $0.32</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Heavy Cream</td>
                  <td className="py-2 pr-4">$5.99/qt</td>
                  <td className="py-2 pr-4">$3.20/qt</td>
                  <td className="py-2 pr-4">$0.19/oz</td>
                  <td className="py-2">2 oz = $0.38</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Butter (unsalted)</td>
                  <td className="py-2 pr-4">$5.49/lb</td>
                  <td className="py-2 pr-4">$3.25/lb</td>
                  <td className="py-2 pr-4">$0.34/oz</td>
                  <td className="py-2">1 oz = $0.34</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">All-Purpose Flour</td>
                  <td className="py-2 pr-4">$4.29/5 lb</td>
                  <td className="py-2 pr-4">$0.60/lb</td>
                  <td className="py-2 pr-4">$0.05/oz</td>
                  <td className="py-2">8 oz = $0.40</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Eggs (large)</td>
                  <td className="py-2 pr-4">$3.99/dozen</td>
                  <td className="py-2 pr-4">$2.40/dozen</td>
                  <td className="py-2 pr-4">$0.33/egg</td>
                  <td className="py-2">2 eggs = $0.66</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Olive Oil (extra virgin)</td>
                  <td className="py-2 pr-4">$8.99/500ml</td>
                  <td className="py-2 pr-4">$5.50/500ml</td>
                  <td className="py-2 pr-4">$0.53/oz</td>
                  <td className="py-2">1 oz = $0.53</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* More Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl prose prose-lg">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            Costing Tips for Accuracy
          </h2>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-6 mb-4">
            Don&apos;t Forget Hidden Costs
          </h3>
          <ul>
            <li><strong>Cooking oils:</strong> Track oil used for frying, sautéing, and finishing</li>
            <li><strong>Seasonings:</strong> Salt, pepper, herbs, and spices add up</li>
            <li><strong>Garnishes:</strong> That parsley sprig and lemon wedge have costs</li>
            <li><strong>Bread and butter:</strong> If included, add to the dish cost</li>
            <li><strong>Waste:</strong> Factor in trim waste for produce and proteins (typically 10-30%)</li>
          </ul>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Comprehensive Waste Factors by Ingredient
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Ingredient</th>
                  <th className="text-left py-2 pr-4">Typical Waste %</th>
                  <th className="text-left py-2 pr-4">Yield Factor</th>
                  <th className="text-left py-2 pr-4">What&apos;s Waste</th>
                  <th className="text-left py-2">Recovery Options</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Onions</td>
                  <td className="py-2 pr-4">10%</td>
                  <td className="py-2 pr-4">0.90</td>
                  <td className="py-2 pr-4">Skin and ends</td>
                  <td className="py-2">Skins for stock</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Garlic</td>
                  <td className="py-2 pr-4">12%</td>
                  <td className="py-2 pr-4">0.88</td>
                  <td className="py-2 pr-4">Skin and root</td>
                  <td className="py-2">Skins for stock</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Carrots</td>
                  <td className="py-2 pr-4">15%</td>
                  <td className="py-2 pr-4">0.85</td>
                  <td className="py-2 pr-4">Tops and peels</td>
                  <td className="py-2">Peels for stock, tops for garnish</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Lettuce (head)</td>
                  <td className="py-2 pr-4">20-25%</td>
                  <td className="py-2 pr-4">0.75-0.80</td>
                  <td className="py-2 pr-4">Core and outer leaves</td>
                  <td className="py-2">Outer leaves for staff meals</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Bell Peppers</td>
                  <td className="py-2 pr-4">18%</td>
                  <td className="py-2 pr-4">0.82</td>
                  <td className="py-2 pr-4">Core, seeds, stem</td>
                  <td className="py-2">None typical</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Broccoli</td>
                  <td className="py-2 pr-4">35%</td>
                  <td className="py-2 pr-4">0.65</td>
                  <td className="py-2 pr-4">Thick stem base</td>
                  <td className="py-2">Stems for soup, slaw</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Whole chicken</td>
                  <td className="py-2 pr-4">35-40%</td>
                  <td className="py-2 pr-4">0.60-0.65</td>
                  <td className="py-2 pr-4">Bones and trim</td>
                  <td className="py-2">Stock and demi-glace</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Beef tenderloin</td>
                  <td className="py-2 pr-4">15-20%</td>
                  <td className="py-2 pr-4">0.80-0.85</td>
                  <td className="py-2 pr-4">Silver skin, fat, chain</td>
                  <td className="py-2">Chain for staff meals, fat for rendering</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Pork loin</td>
                  <td className="py-2 pr-4">10-15%</td>
                  <td className="py-2 pr-4">0.85-0.90</td>
                  <td className="py-2 pr-4">Fat cap, silver skin</td>
                  <td className="py-2">Fat for rendering, lard</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Fish fillet</td>
                  <td className="py-2 pr-4">5-10%</td>
                  <td className="py-2 pr-4">0.90-0.95</td>
                  <td className="py-2 pr-4">Pin bones, trim</td>
                  <td className="py-2">Trim for ceviche, tartare</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Whole fish</td>
                  <td className="py-2 pr-4">50-60%</td>
                  <td className="py-2 pr-4">0.40-0.50</td>
                  <td className="py-2 pr-4">Head, bones, skin</td>
                  <td className="py-2">Stock and fumet</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Shrimp (head-on)</td>
                  <td className="py-2 pr-4">40-50%</td>
                  <td className="py-2 pr-4">0.50-0.60</td>
                  <td className="py-2 pr-4">Heads, shells</td>
                  <td className="py-2">Shrimp stock, bisque</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Menu Pricing Quick Reference
          </h3>
          <p>
            Use this table to quickly calculate menu prices based on your food cost and target percentage.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Food Cost</th>
                  <th className="text-left py-2 pr-4">25% Target</th>
                  <th className="text-left py-2 pr-4">28% Target</th>
                  <th className="text-left py-2 pr-4">30% Target</th>
                  <th className="text-left py-2 pr-4">33% Target</th>
                  <th className="text-left py-2">35% Target</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">$2.00</td>
                  <td className="py-2 pr-4">$8.00</td>
                  <td className="py-2 pr-4">$7.14</td>
                  <td className="py-2 pr-4">$6.67</td>
                  <td className="py-2 pr-4">$6.06</td>
                  <td className="py-2">$5.71</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">$3.00</td>
                  <td className="py-2 pr-4">$12.00</td>
                  <td className="py-2 pr-4">$10.71</td>
                  <td className="py-2 pr-4">$10.00</td>
                  <td className="py-2 pr-4">$9.09</td>
                  <td className="py-2">$8.57</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">$4.00</td>
                  <td className="py-2 pr-4">$16.00</td>
                  <td className="py-2 pr-4">$14.29</td>
                  <td className="py-2 pr-4">$13.33</td>
                  <td className="py-2 pr-4">$12.12</td>
                  <td className="py-2">$11.43</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">$5.00</td>
                  <td className="py-2 pr-4">$20.00</td>
                  <td className="py-2 pr-4">$17.86</td>
                  <td className="py-2 pr-4">$16.67</td>
                  <td className="py-2 pr-4">$15.15</td>
                  <td className="py-2">$14.29</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">$6.00</td>
                  <td className="py-2 pr-4">$24.00</td>
                  <td className="py-2 pr-4">$21.43</td>
                  <td className="py-2 pr-4">$20.00</td>
                  <td className="py-2 pr-4">$18.18</td>
                  <td className="py-2">$17.14</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">$7.00</td>
                  <td className="py-2 pr-4">$28.00</td>
                  <td className="py-2 pr-4">$25.00</td>
                  <td className="py-2 pr-4">$23.33</td>
                  <td className="py-2 pr-4">$21.21</td>
                  <td className="py-2">$20.00</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">$8.00</td>
                  <td className="py-2 pr-4">$32.00</td>
                  <td className="py-2 pr-4">$28.57</td>
                  <td className="py-2 pr-4">$26.67</td>
                  <td className="py-2 pr-4">$24.24</td>
                  <td className="py-2">$22.86</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">$10.00</td>
                  <td className="py-2 pr-4">$40.00</td>
                  <td className="py-2 pr-4">$35.71</td>
                  <td className="py-2 pr-4">$33.33</td>
                  <td className="py-2 pr-4">$30.30</td>
                  <td className="py-2">$28.57</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Strategies to Reduce Food Cost
          </h3>
          <ul>
            <li><strong>Cross-utilize ingredients:</strong> Use chicken bones for stock, vegetable trim for soups</li>
            <li><strong>Seasonal menus:</strong> Buy ingredients when they&apos;re abundant and cheap</li>
            <li><strong>Portion control:</strong> Consistent portions prevent over-serving</li>
            <li><strong>Inventory management:</strong> FIFO (first in, first out) reduces spoilage</li>
            <li><strong>Vendor negotiation:</strong> Get quotes from multiple suppliers</li>
            <li><strong>Menu engineering:</strong> Promote high-margin dishes</li>
            <li><strong>Batch cooking:</strong> Large batches reduce per-portion labor and waste</li>
            <li><strong>Proper storage:</strong> Correct storage extends ingredient life and prevents loss</li>
          </ul>
        </div>
      </section>

      {/* Break-Even Analysis Section */}
      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl prose prose-lg">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            Break-Even Analysis for Menu Items
          </h2>
          <p>
            Understanding how many portions you need to sell to cover your costs helps with menu decisions
            and promotion strategies.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Menu Price</th>
                  <th className="text-left py-2 pr-4">Food Cost</th>
                  <th className="text-left py-2 pr-4">Gross Profit</th>
                  <th className="text-left py-2 pr-4">FC %</th>
                  <th className="text-left py-2 pr-4">Units for $100 Profit</th>
                  <th className="text-left py-2">Units for $500 Profit</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">$12.00</td>
                  <td className="py-2 pr-4">$3.60</td>
                  <td className="py-2 pr-4">$8.40</td>
                  <td className="py-2 pr-4">30%</td>
                  <td className="py-2 pr-4">12 units</td>
                  <td className="py-2">60 units</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">$16.00</td>
                  <td className="py-2 pr-4">$4.80</td>
                  <td className="py-2 pr-4">$11.20</td>
                  <td className="py-2 pr-4">30%</td>
                  <td className="py-2 pr-4">9 units</td>
                  <td className="py-2">45 units</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">$22.00</td>
                  <td className="py-2 pr-4">$6.60</td>
                  <td className="py-2 pr-4">$15.40</td>
                  <td className="py-2 pr-4">30%</td>
                  <td className="py-2 pr-4">7 units</td>
                  <td className="py-2">33 units</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">$28.00</td>
                  <td className="py-2 pr-4">$8.40</td>
                  <td className="py-2 pr-4">$19.60</td>
                  <td className="py-2 pr-4">30%</td>
                  <td className="py-2 pr-4">6 units</td>
                  <td className="py-2">26 units</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">$35.00</td>
                  <td className="py-2 pr-4">$10.50</td>
                  <td className="py-2 pr-4">$24.50</td>
                  <td className="py-2 pr-4">30%</td>
                  <td className="py-2 pr-4">5 units</td>
                  <td className="py-2">21 units</td>
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
              href="/recipe-scaler"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Recipe Scaler</h3>
              <p className="text-sm text-gray-600">Scale recipes up or down for different batch sizes</p>
            </Link>
            <Link
              href="/cooking-measurement-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Measurement Converter</h3>
              <p className="text-sm text-gray-600">Convert between volume, weight, and metric units</p>
            </Link>
            <Link
              href="/party-food-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Party Food Calculator</h3>
              <p className="text-sm text-gray-600">Plan food quantities for events and gatherings</p>
            </Link>
            <Link
              href="/recipe-macro-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Recipe Macro Calculator</h3>
              <p className="text-sm text-gray-600">Calculate nutrition facts for your recipes</p>
            </Link>
            <Link
              href="/bakers-percentage-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Baker&apos;s Percentage Calculator</h3>
              <p className="text-sm text-gray-600">Scale baking recipes with baker&apos;s math</p>
            </Link>
            <Link
              href="/cake-servings-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Cake Servings Calculator</h3>
              <p className="text-sm text-gray-600">Determine cake size needed for your event</p>
            </Link>
            <Link
              href="/butter-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Butter Converter</h3>
              <p className="text-sm text-gray-600">Convert butter between sticks, cups, and grams</p>
            </Link>
            <Link
              href="/pizza-dough-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Pizza Dough Calculator</h3>
              <p className="text-sm text-gray-600">Calculate dough quantities for any pizza size</p>
            </Link>
            <Link
              href="/sourdough-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Sourdough Calculator</h3>
              <p className="text-sm text-gray-600">Perfect your sourdough with precise calculations</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Authority Sources Footer */}
      <section className="py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-sm text-gray-500 text-center">
            Content referenced from{" "}
            <a href="https://restaurant.org/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">National Restaurant Association</a>
            {", "}
            <a href="https://www.usda.gov/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">USDA</a>
            {", "}
            <a href="https://www.fda.gov/food" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">FDA Food Safety</a>
            {", "}
            <a href="https://www.cia.edu/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">Culinary Institute of America</a>
            {", and "}
            <a href="https://www.toasttab.com/blog" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">Toast Restaurant Management</a>
            {"."}
          </p>
        </div>
      </section>
    </div>
  );
}
