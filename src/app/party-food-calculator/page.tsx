import { Metadata } from "next";
import Link from "next/link";
import PartyFoodCalculator from "@/components/calculators/PartyFoodCalculator";
import { FAQPageJsonLd, WebApplicationJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Party Food Calculator — How Much Food Per Person | CalcKitchen",
  description: "Calculate exactly how much food you need for your party. Free calculator for appetizers, mains, sides, dessert, and drinks based on guest count, event duration, and meal type.",
  openGraph: {
    title: "Party Food Calculator — How Much Food Per Person",
    description: "Calculate exactly how much food you need for your party. Free calculator for appetizers, mains, sides, dessert, and drinks based on guest count, event duration, and meal type.",
    url: "https://calckitchen.com/party-food-calculator",
    type: "website",
  },
  alternates: {
    canonical: "https://calckitchen.com/party-food-calculator",
  },
};

const faqs = [
  {
    question: "How much meat do I need per person for a BBQ?",
    answer: "Plan for 6-8 oz (170-225g) of cooked meat per adult for a BBQ with sides. If meat is the main attraction with minimal sides, increase to 8-10 oz. For bone-in meats (ribs, bone-in chicken), buy 50% more raw weight to account for bones. Example: For 20 adults, buy 10-12 lbs of boneless meat or 15-18 lbs of bone-in cuts.",
  },
  {
    question: "How many appetizers per person if there's no main course?",
    answer: "For an appetizers-only event, plan for 12-15 pieces per person for a 2-hour party, or 18-20 pieces for 3+ hours. Include a mix of 5-8 different appetizers. As a rule: guests eat about 6 pieces per hour in the first 2 hours, then 3-4 pieces per hour after that. Heavy appetizers (meatballs, stuffed mushrooms) are more filling than light ones (bruschetta, veggie cups).",
  },
  {
    question: "How much alcohol do I need for a 3-hour party?",
    answer: "For a 3-hour party: plan for 2 drinks in the first hour, then 1 drink per hour after that — about 4 drinks per person total. For 20 guests, that's 80 drinks. A bottle of wine = 5 glasses. A case of beer = 24 bottles. For mixed drinks, a 750ml bottle of spirits makes about 16 drinks. Always have 10-20% extra, and offer non-alcoholic options for about 10-15% of guests.",
  },
  {
    question: "How do I account for dietary restrictions?",
    answer: "A good rule: plan for 10-15% vegetarian, 5% vegan, and 5% gluten-free unless you know your guests' needs. When in doubt, ask! Make sure at least one main dish, one appetizer, and one side fits each restriction. Label all food clearly at the party. For large events, having one fully plant-based, gluten-free main option covers most bases.",
  },
  {
    question: "How far in advance should I prep party food?",
    answer: "Timeline varies by dish: Cookies and bars keep 3-5 days. Dips and spreads: 2-3 days. Marinated meats: 1-2 days. Chopped vegetables: morning of. Assembled salads: 2-4 hours ahead. Hot appetizers: prep night before, cook day-of. Having this timeline prevents last-minute panic and lets you enjoy your own party.",
  },
  {
    question: "Should I adjust portions if I'm hosting adults and kids together?",
    answer: "Yes. Children under 12 eat about half of adult portions. For a party with 10 adults and 10 kids, plan as if you have 15 adults. Also consider that kids prefer familiar, simple foods — chicken fingers, pizza, mac and cheese — and may skip more sophisticated options. Have a separate kid-friendly station to make serving easier.",
  },
  {
    question: "How much pizza should I order for a party?",
    answer: "Adults typically eat 2-3 slices (about 1/4 of a large pizza). For 20 adults, order 7-8 large pizzas. Kids eat 1-2 slices each. Order a variety: 1/3 pepperoni, 1/3 cheese, 1/3 specialty or veggie. For pizza-only events without other food, increase by 25%. Always round up — leftover pizza is never a problem.",
  },
  {
    question: "How much ice do I need for a party?",
    answer: "Plan for 1-1.5 lbs of ice per guest for a 3-hour party. For 20 guests, that's 20-30 lbs minimum. Outdoor summer parties require double the ice. You'll need ice for drinks AND to keep food cold. Buy 50% more if you're chilling beverages in coolers. Ice is cheap — running out is embarrassing. Most guests underestimate ice needs.",
  },
  {
    question: "What's the best food-to-side ratio for a buffet?",
    answer: "The ideal buffet balance is: 60% main dishes, 25% sides, and 15% salads/vegetables. For a party of 20: plan 3-4 main dish options, 2-3 substantial sides (like mac and cheese or potato salad), and 1-2 light sides or salads. Having too many options creates waste — people take small amounts of everything and don't finish.",
  },
  {
    question: "How do I plan food for an all-day event like a wedding reception?",
    answer: "For events lasting 4+ hours, plan in stages: appetizers during cocktail hour (6-8 per person), full dinner portions, and late-night snacks (simple items like sliders or pizza, 2-3 per person). Guests eat more over longer events — total food should be 30-40% more than a standard 3-hour party. Work backward from your event timeline.",
  },
  {
    question: "What's the cheapest way to feed a large crowd?",
    answer: "Focus on filling, inexpensive proteins: pulled pork, chicken thighs, or brisket. Serve with bulk sides: coleslaw, baked beans, cornbread, pasta salad. Avoid expensive proteins (steak, seafood) and pre-made appetizers. Make sauces and dips from scratch. A taco bar or build-your-own-bowl setup feels generous while controlling portions. Budget $5-8 per person for casual BBQ-style feeding.",
  },
  {
    question: "How do I keep hot food hot and cold food cold at a party?",
    answer: "Hot food: use chafing dishes with sterno cans, slow cookers on 'warm' setting, or oven-safe dishes kept at 200°F. Cold food: serve over ice trays, use cooling plates, or rotate smaller portions from the fridge. Food safety rule: hot food above 140°F, cold food below 40°F. Don't leave food in the danger zone (40-140°F) for more than 2 hours — 1 hour if outdoors in heat.",
  },
];

export default function PartyFoodCalculatorPage() {
  return (
    <div className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Party Food Calculator"
        description="Calculate how much food you need for your party. Get quantities for appetizers, main dishes, sides, desserts, and drinks based on guest count and event type."
        url="https://calckitchen.com/party-food-calculator"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Party Food Calculator", url: "https://calckitchen.com/party-food-calculator" },
        ]}
      />

      {/* Hero Section with Calculator */}
      <section className="bg-gradient-to-b from-warm-white to-white py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Party Food Calculator
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Calculate exactly how much food you need for your party. Enter your guest count, event type, and get instant quantities for appetizers, mains, sides, and drinks.
          </p>

          {/* Calculator Component */}
          <PartyFoodCalculator />
        </div>
      </section>

      {/* Real-World Examples Section */}
      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Real-World Party Planning Examples
          </h2>
          <p className="text-gray-700 mb-8">
            See exactly how party food calculations work for common events with complete shopping lists and tips.
          </p>

          {/* Example 1 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Backyard BBQ for 25 Adults
                </h3>
                <p className="text-gray-600 mb-4">
                  You&apos;re hosting a 4th of July cookout with 25 adults. You want to serve burgers, hot dogs, chicken, plus classic sides like coleslaw and potato salad.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>Event details:</strong> 25 adults, 4-hour outdoor event, buffet style<br />
                    <strong>Menu:</strong> Burgers, hot dogs, grilled chicken, 3 sides, dessert<br />
                    <strong>Calculation:</strong> 8 oz protein per person (outdoor events eat 20% more)
                  </p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-emerald-800 font-medium mb-2">Shopping List:</p>
                  <ul className="text-emerald-700 text-sm space-y-1">
                    <li>• Burgers: 15 lbs ground beef (30 patties at 1/2 lb each)</li>
                    <li>• Hot dogs: 25 hot dogs (1 each)</li>
                    <li>• Chicken: 10 lbs boneless thighs or breasts</li>
                    <li>• Buns: 30 burger buns + 25 hot dog buns</li>
                    <li>• Potato salad: 6 lbs (4 oz per person)</li>
                    <li>• Coleslaw: 5 lbs (3 oz per person)</li>
                    <li>• Baked beans: 6 lbs (4 oz per person)</li>
                    <li>• Ice: 40 lbs minimum (outdoor summer party)</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Make burgers the day before and refrigerate. Season chicken 4-6 hours ahead. Prep sides the morning of the party.
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
                  Cocktail Party with Heavy Appetizers (No Dinner)
                </h3>
                <p className="text-gray-600 mb-4">
                  You&apos;re hosting a holiday cocktail party for 40 guests from 6-9 PM. No sit-down dinner — just passed appetizers and stationed bites.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>Event details:</strong> 40 adults, 3-hour evening event, appetizers only<br />
                    <strong>Calculation:</strong> 12-15 pieces per person for appetizer-only = 480-600 pieces total<br />
                    <strong>Variety:</strong> 6-8 different appetizers
                  </p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-emerald-800 font-medium mb-2">Appetizer Breakdown (600 pieces total):</p>
                  <ul className="text-emerald-700 text-sm space-y-1">
                    <li>• Bacon-wrapped dates: 80 pieces</li>
                    <li>• Bruschetta: 80 pieces</li>
                    <li>• Mini meatballs: 100 pieces</li>
                    <li>• Stuffed mushrooms: 60 pieces</li>
                    <li>• Shrimp cocktail: 80 pieces</li>
                    <li>• Caprese skewers: 80 pieces</li>
                    <li>• Spanakopita: 60 pieces</li>
                    <li>• Cheese & charcuterie: 2 large boards (serves 60)</li>
                  </ul>
                  <p className="text-emerald-700 text-sm mt-2">
                    <strong>Drinks:</strong> 160 drinks total (4 per person) = 32 bottles wine OR 7 cases beer OR 10 bottles spirits
                  </p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Balance 1/3 hot, 1/3 cold, 1/3 room-temperature appetizers. Stagger cooking times so fresh batches come out every 30 minutes.
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
                  Kid&apos;s Birthday Party (15 Kids + 10 Adults)
                </h3>
                <p className="text-gray-600 mb-4">
                  Your child is turning 8 and you&apos;re hosting 15 kids (ages 6-10) plus 10 parents. Pizza party with cake and snacks.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>Event details:</strong> 15 kids + 10 adults, 2-hour afternoon party<br />
                    <strong>Adjusted count:</strong> 15 kids × 0.5 = 7.5 adult equivalents + 10 adults = 17.5 adult portions<br />
                    <strong>Menu:</strong> Pizza, fruit, chips, juice boxes, birthday cake
                  </p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-emerald-800 font-medium mb-2">Food & Drinks:</p>
                  <ul className="text-emerald-700 text-sm space-y-1">
                    <li>• Pizza: 6 large pizzas (3 cheese, 2 pepperoni, 1 veggie)</li>
                    <li>• Fruit platter: 2 large platters or 8 cups cut fruit</li>
                    <li>• Chips & pretzels: 4 party-size bags</li>
                    <li>• Veggie tray with ranch: 1 large (for adults)</li>
                    <li>• Juice boxes: 25 (some kids will have 2)</li>
                    <li>• Water bottles: 15</li>
                    <li>• Soda for adults: 2-liter bottles × 3</li>
                    <li>• Birthday cake: 1/4 sheet cake (serves 24)</li>
                    <li>• Ice cream: 1 gallon</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Kids are picky and waste food. Order slightly less pizza than calculated — excited kids eat less. Have cake 45 min before party ends so sugar high happens at home!
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
                  Thanksgiving Dinner for 18 People
                </h3>
                <p className="text-gray-600 mb-4">
                  You&apos;re hosting Thanksgiving for 18 adults. Full traditional menu with turkey, ham, and all the sides.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>Event details:</strong> 18 adults, sit-down dinner<br />
                    <strong>Turkey size:</strong> 1 lb raw turkey per person = 18 lb turkey (or 2 smaller turkeys)<br />
                    <strong>Multiple mains:</strong> Reduce turkey to 15 lb + add 4 lb bone-in ham
                  </p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-emerald-800 font-medium mb-2">Complete Thanksgiving Shopping:</p>
                  <ul className="text-emerald-700 text-sm space-y-1">
                    <li>• Turkey: 18-20 lb (allows for seconds and leftovers)</li>
                    <li>• Mashed potatoes: 7 lbs raw potatoes (6 oz per person)</li>
                    <li>• Gravy: 3 cups (2 Tbsp per person)</li>
                    <li>• Stuffing/dressing: 2 lbs bread cubes (makes 12 cups)</li>
                    <li>• Cranberry sauce: 2 cans or 1 lb fresh</li>
                    <li>• Green bean casserole: 3 lbs green beans</li>
                    <li>• Sweet potatoes: 6 lbs (5 oz per person)</li>
                    <li>• Rolls: 24 dinner rolls</li>
                    <li>• Pies: 3 pies (serves 6 each)</li>
                    <li>• Whipped cream: 2 cups</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> With 6+ sides, guests take smaller portions of each. A 20 lb turkey feeds 18 with leftovers. Start turkey 4 hours before dinner (15-20 min per pound at 325°F).
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
                  Taco Bar for 30 People (Budget-Friendly)
                </h3>
                <p className="text-gray-600 mb-4">
                  You&apos;re throwing a casual graduation party for 30 people on a budget. Taco bars are affordable, crowd-pleasing, and easy to execute.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>Event details:</strong> 30 adults, casual buffet, budget-conscious<br />
                    <strong>Calculation:</strong> 3 tacos per person = 90 tacos minimum (plan for 120)<br />
                    <strong>Protein:</strong> 4 oz meat per person = 7.5 lbs cooked meat needed
                  </p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-emerald-800 font-medium mb-2">Taco Bar Shopping List:</p>
                  <ul className="text-emerald-700 text-sm space-y-1">
                    <li>• Ground beef: 10 lbs raw (cooks down to ~7 lbs)</li>
                    <li>• Taco seasoning: 5 packets or homemade batch</li>
                    <li>• Corn tortillas: 120 (4 packs of 30)</li>
                    <li>• Flour tortillas: 60 (2 packs)</li>
                    <li>• Shredded cheese: 2 lbs</li>
                    <li>• Sour cream: 32 oz (2 containers)</li>
                    <li>• Salsa: 3 jars (mild, medium, hot)</li>
                    <li>• Guacamole: 3 lbs or 12 avocados</li>
                    <li>• Lettuce: 2 heads shredded</li>
                    <li>• Tomatoes: 8 tomatoes, diced</li>
                    <li>• Onions: 4 onions, diced</li>
                    <li>• Cilantro: 2 bunches</li>
                    <li>• Lime wedges: 10 limes</li>
                    <li>• Mexican rice: 6 cups dry (makes 12 cups cooked)</li>
                    <li>• Refried beans: 4 cans</li>
                  </ul>
                  <p className="text-emerald-700 text-sm mt-2">
                    <strong>Estimated cost:</strong> $150-180 total (~$5-6 per person)
                  </p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Keep taco meat warm in slow cookers. Chop all toppings the night before. Set up toppings in order of most-used first to prevent bottlenecks.
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
                  Super Bowl Watch Party for 20 People
                </h3>
                <p className="text-gray-600 mb-4">
                  You&apos;re hosting a 4-hour Super Bowl party with 20 friends. All-day grazing with wings, dips, finger foods, and drinks.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>Event details:</strong> 20 adults, 4-hour viewing party, grazing format<br />
                    <strong>Calculation:</strong> 4-hour party = more food than standard 3-hour event<br />
                    <strong>Appetizers + snacks:</strong> 15-18 pieces per person over 4 hours
                  </p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-emerald-800 font-medium mb-2">Super Bowl Spread:</p>
                  <ul className="text-emerald-700 text-sm space-y-1">
                    <li>• Chicken wings: 100 wings (5 per person)</li>
                    <li>• Sliders: 40 mini burgers (2 per person)</li>
                    <li>• Chips & dips: 4 bags chips + 3 dips (queso, guac, salsa)</li>
                    <li>• Veggie tray: 1 large</li>
                    <li>• Pigs in blankets: 60 pieces</li>
                    <li>• Meatballs: 50 mini meatballs</li>
                    <li>• 7-layer dip: 1 large (9×13 pan)</li>
                    <li>• Buffalo chicken dip: 1 slow cooker batch</li>
                    <li>• Pretzel bites: 2 bags</li>
                    <li>• Beer: 5 cases (24 each) = 120 beers</li>
                    <li>• Soda & water: 3 12-packs soda + 24 waters</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Time your food around the game: heavy apps at kickoff, refresh at halftime, pizza delivery in 3rd quarter as energy dips. Set up multiple food stations to avoid crowding.
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
            Party Planning Food Guidelines
          </h2>
          <p>
            The key to party planning is balancing variety with simplicity. Too little food creates anxiety; too much creates waste.
            These guidelines help you hit the sweet spot.
          </p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Master Per-Person Serving Guide
          </h3>
          <p className="text-gray-700 mb-4">
            Use this comprehensive reference for any type of party:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4">Food Type</th>
                  <th className="text-left py-3 px-4">Before Meal</th>
                  <th className="text-left py-3 px-4">As Part of Meal</th>
                  <th className="text-left py-3 px-4">As Main Focus</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Appetizers (pieces)</td>
                  <td className="py-3 px-4">3-4 pieces</td>
                  <td className="py-3 px-4">4-6 pieces</td>
                  <td className="py-3 px-4">12-15 pieces</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">Main protein (cooked)</td>
                  <td className="py-3 px-4">—</td>
                  <td className="py-3 px-4">4-6 oz</td>
                  <td className="py-3 px-4">8-10 oz</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Side dishes (each)</td>
                  <td className="py-3 px-4">—</td>
                  <td className="py-3 px-4">½ cup</td>
                  <td className="py-3 px-4">¾ cup</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">Salad greens</td>
                  <td className="py-3 px-4">—</td>
                  <td className="py-3 px-4">1 cup</td>
                  <td className="py-3 px-4">2 cups</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Rice or grains</td>
                  <td className="py-3 px-4">—</td>
                  <td className="py-3 px-4">½ cup cooked</td>
                  <td className="py-3 px-4">1 cup cooked</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">Pasta</td>
                  <td className="py-3 px-4">—</td>
                  <td className="py-3 px-4">2 oz dry</td>
                  <td className="py-3 px-4">4 oz dry</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Bread/rolls</td>
                  <td className="py-3 px-4">—</td>
                  <td className="py-3 px-4">1-1.5 pieces</td>
                  <td className="py-3 px-4">2 pieces</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">Dessert</td>
                  <td className="py-3 px-4">—</td>
                  <td className="py-3 px-4">1 small piece</td>
                  <td className="py-3 px-4">1 regular piece</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Ice cream</td>
                  <td className="py-3 px-4">—</td>
                  <td className="py-3 px-4">½ cup</td>
                  <td className="py-3 px-4">1 cup</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">Chips/snacks</td>
                  <td className="py-3 px-4">1 oz</td>
                  <td className="py-3 px-4">1 oz</td>
                  <td className="py-3 px-4">2 oz</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Dip per guest</td>
                  <td className="py-3 px-4">2 Tbsp</td>
                  <td className="py-3 px-4">2 Tbsp</td>
                  <td className="py-3 px-4">3 Tbsp</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Event Type Adjustments
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4">Event Type</th>
                  <th className="text-left py-3 px-4">Adjustment</th>
                  <th className="text-left py-3 px-4">Why</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Cocktail party</td>
                  <td className="py-3 px-4 text-coral font-medium">+50% appetizers</td>
                  <td className="py-3 px-4">Appetizers ARE the meal</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">Buffet dinner</td>
                  <td className="py-3 px-4 text-coral font-medium">+15% all food</td>
                  <td className="py-3 px-4">Guests serve themselves generously</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Sit-down dinner</td>
                  <td className="py-3 px-4 text-emerald-700 font-medium">Standard amounts</td>
                  <td className="py-3 px-4">Controlled portions</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">Outdoor BBQ</td>
                  <td className="py-3 px-4 text-coral font-medium">+20% all food</td>
                  <td className="py-3 px-4">Active guests eat more</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Holiday dinner</td>
                  <td className="py-3 px-4 text-amber-700 font-medium">-10% per dish</td>
                  <td className="py-3 px-4">Many dishes = smaller portions each</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">Office party</td>
                  <td className="py-3 px-4 text-amber-700 font-medium">-15% all food</td>
                  <td className="py-3 px-4">Professional eating habits</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Sports viewing party</td>
                  <td className="py-3 px-4 text-coral font-medium">+25% snacks</td>
                  <td className="py-3 px-4">Extended grazing over hours</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">Wedding reception</td>
                  <td className="py-3 px-4 text-coral font-medium">+30% (plan stages)</td>
                  <td className="py-3 px-4">4+ hours = cocktails, dinner, late-night</td>
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
            Quick Reference Charts
          </h2>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-6 mb-4">
            BBQ & Grilling Meat Calculator
          </h3>
          <p className="text-gray-700 mb-4">
            Raw meat amounts to purchase for grilling (includes shrinkage):
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4">Guests</th>
                  <th className="text-left py-3 px-4">Burgers (1/2 lb each)</th>
                  <th className="text-left py-3 px-4">Hot Dogs</th>
                  <th className="text-left py-3 px-4">Boneless (lbs)</th>
                  <th className="text-left py-3 px-4">Bone-in (lbs)</th>
                  <th className="text-left py-3 px-4">Ribs (racks)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">10</td>
                  <td className="py-3 px-4">12-15</td>
                  <td className="py-3 px-4">10-12</td>
                  <td className="py-3 px-4">5-6 lbs</td>
                  <td className="py-3 px-4">8-10 lbs</td>
                  <td className="py-3 px-4">3-4 racks</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">20</td>
                  <td className="py-3 px-4">24-30</td>
                  <td className="py-3 px-4">20-24</td>
                  <td className="py-3 px-4">10-12 lbs</td>
                  <td className="py-3 px-4">15-18 lbs</td>
                  <td className="py-3 px-4">6-7 racks</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">30</td>
                  <td className="py-3 px-4">36-45</td>
                  <td className="py-3 px-4">30-36</td>
                  <td className="py-3 px-4">15-18 lbs</td>
                  <td className="py-3 px-4">23-27 lbs</td>
                  <td className="py-3 px-4">9-10 racks</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">40</td>
                  <td className="py-3 px-4">48-60</td>
                  <td className="py-3 px-4">40-48</td>
                  <td className="py-3 px-4">20-24 lbs</td>
                  <td className="py-3 px-4">30-36 lbs</td>
                  <td className="py-3 px-4">12-14 racks</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">50</td>
                  <td className="py-3 px-4">60-75</td>
                  <td className="py-3 px-4">50-60</td>
                  <td className="py-3 px-4">25-30 lbs</td>
                  <td className="py-3 px-4">38-45 lbs</td>
                  <td className="py-3 px-4">15-17 racks</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">75</td>
                  <td className="py-3 px-4">90-112</td>
                  <td className="py-3 px-4">75-90</td>
                  <td className="py-3 px-4">38-45 lbs</td>
                  <td className="py-3 px-4">56-68 lbs</td>
                  <td className="py-3 px-4">23-25 racks</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">100</td>
                  <td className="py-3 px-4">120-150</td>
                  <td className="py-3 px-4">100-120</td>
                  <td className="py-3 px-4">50-60 lbs</td>
                  <td className="py-3 px-4">75-90 lbs</td>
                  <td className="py-3 px-4">30-33 racks</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Drink Calculator by Party Length
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4">Guests</th>
                  <th className="text-left py-3 px-4">2-Hour Party</th>
                  <th className="text-left py-3 px-4">3-Hour Party</th>
                  <th className="text-left py-3 px-4">4-Hour Party</th>
                  <th className="text-left py-3 px-4">Wine Bottles</th>
                  <th className="text-left py-3 px-4">Beer Cases</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">10</td>
                  <td className="py-3 px-4">30 drinks</td>
                  <td className="py-3 px-4">40 drinks</td>
                  <td className="py-3 px-4">50 drinks</td>
                  <td className="py-3 px-4">6-8</td>
                  <td className="py-3 px-4">2</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">20</td>
                  <td className="py-3 px-4">60 drinks</td>
                  <td className="py-3 px-4">80 drinks</td>
                  <td className="py-3 px-4">100 drinks</td>
                  <td className="py-3 px-4">12-16</td>
                  <td className="py-3 px-4">4</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">30</td>
                  <td className="py-3 px-4">90 drinks</td>
                  <td className="py-3 px-4">120 drinks</td>
                  <td className="py-3 px-4">150 drinks</td>
                  <td className="py-3 px-4">18-24</td>
                  <td className="py-3 px-4">6</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">40</td>
                  <td className="py-3 px-4">120 drinks</td>
                  <td className="py-3 px-4">160 drinks</td>
                  <td className="py-3 px-4">200 drinks</td>
                  <td className="py-3 px-4">24-32</td>
                  <td className="py-3 px-4">8</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">50</td>
                  <td className="py-3 px-4">150 drinks</td>
                  <td className="py-3 px-4">200 drinks</td>
                  <td className="py-3 px-4">250 drinks</td>
                  <td className="py-3 px-4">30-40</td>
                  <td className="py-3 px-4">10</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            * Formula: 2 drinks in first hour + 1 drink per additional hour. Wine bottle = 5 glasses. Beer case = 24 bottles. Add 15% non-alcoholic options.
          </p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Party Essentials Checklist
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4">Item</th>
                  <th className="text-left py-3 px-4">Per 10 Guests</th>
                  <th className="text-left py-3 px-4">Per 25 Guests</th>
                  <th className="text-left py-3 px-4">Per 50 Guests</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Ice (indoor party)</td>
                  <td className="py-3 px-4">10-15 lbs</td>
                  <td className="py-3 px-4">25-35 lbs</td>
                  <td className="py-3 px-4">50-75 lbs</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">Ice (outdoor party)</td>
                  <td className="py-3 px-4">20-30 lbs</td>
                  <td className="py-3 px-4">50-75 lbs</td>
                  <td className="py-3 px-4">100-150 lbs</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Paper plates</td>
                  <td className="py-3 px-4">15-20</td>
                  <td className="py-3 px-4">35-50</td>
                  <td className="py-3 px-4">75-100</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">Napkins</td>
                  <td className="py-3 px-4">30-40</td>
                  <td className="py-3 px-4">75-100</td>
                  <td className="py-3 px-4">150-200</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Plastic cups</td>
                  <td className="py-3 px-4">20-30</td>
                  <td className="py-3 px-4">50-75</td>
                  <td className="py-3 px-4">100-150</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">Plastic utensils</td>
                  <td className="py-3 px-4">15 sets</td>
                  <td className="py-3 px-4">35 sets</td>
                  <td className="py-3 px-4">75 sets</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Trash bags</td>
                  <td className="py-3 px-4">3-4</td>
                  <td className="py-3 px-4">6-8</td>
                  <td className="py-3 px-4">12-15</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Party Planning Tips
          </h3>
          <ul>
            <li><strong>Variety over quantity:</strong> 5 different appetizers with less of each is better than 2 with lots</li>
            <li><strong>Temperature zones:</strong> Plan for what can be kept at room temp vs. what needs to stay hot/cold</li>
            <li><strong>Self-serve friendly:</strong> Choose foods that don&apos;t require slicing or individual plating</li>
            <li><strong>Make-ahead options:</strong> At least 50% of your menu should be prep-ahead</li>
            <li><strong>Always overestimate ice:</strong> You need more than you think, especially outdoors</li>
            <li><strong>Consider flow:</strong> Set up food in different areas to prevent crowding</li>
            <li><strong>Label dietary options:</strong> Clearly mark vegetarian, vegan, and gluten-free items</li>
            <li><strong>Plan for leftovers:</strong> Have containers ready for guests to take food home</li>
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
              href="/recipe-scaler"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Recipe Scaler</h3>
              <p className="text-sm text-gray-600">Scale recipes up for your guest count</p>
            </Link>
            <Link
              href="/cake-servings-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Cake Servings Calculator</h3>
              <p className="text-sm text-gray-600">Plan cake size for your party</p>
            </Link>
            <Link
              href="/recipe-cost-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Recipe Cost Calculator</h3>
              <p className="text-sm text-gray-600">Budget your party food costs</p>
            </Link>
            <Link
              href="/turkey-cooking-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Turkey Calculator</h3>
              <p className="text-sm text-gray-600">Plan turkey size for holiday meals</p>
            </Link>
            <Link
              href="/meat-cooking-time-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Meat Cooking Time</h3>
              <p className="text-sm text-gray-600">Calculate cooking times for BBQ meats</p>
            </Link>
            <Link
              href="/recipe-macro-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Recipe Macro Calculator</h3>
              <p className="text-sm text-gray-600">Track nutrition for party menus</p>
            </Link>
            <Link
              href="/cooking-measurement-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Measurement Converter</h3>
              <p className="text-sm text-gray-600">Convert cooking measurements</p>
            </Link>
            <Link
              href="/pizza-dough-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Pizza Dough Calculator</h3>
              <p className="text-sm text-gray-600">Make pizza for a crowd</p>
            </Link>
            <Link
              href="/bakers-percentage-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Baker&apos;s Percentage</h3>
              <p className="text-sm text-gray-600">Scale baked goods recipes</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Authority Sources Footer */}
      <section className="py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-sm text-gray-500 text-center">
            Party planning guidelines based on recommendations from{" "}
            <a href="https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">
              USDA Food Safety
            </a>
            {" • "}
            <a href="https://www.foodsafety.gov/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">
              FoodSafety.gov
            </a>
            {" • "}
            <a href="https://www.epicurious.com/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">
              Epicurious
            </a>
            {" • "}
            <a href="https://www.bonappetit.com/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">
              Bon Appétit
            </a>
            {" • "}
            <a href="https://www.thekitchn.com/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">
              The Kitchn
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
