import { Metadata } from "next";
import Link from "next/link";
import ConvectionOvenConverter from "@/components/calculators/ConvectionOvenConverter";
import { FAQPageJsonLd, WebApplicationJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Convection Oven Converter Calculator — Conventional to Convection (+ Fan Oven) | CalcKitchen",
  description: "Convert conventional oven temps and times to convection oven settings instantly. Includes the 25°F rule, a full conversion chart, Gas Mark table for UK bakers, and tips for when NOT to use convection.",
  openGraph: {
    title: "Convection Oven Converter Calculator — Conventional to Convection (+ Fan Oven)",
    description: "Convert conventional oven temps and times to convection oven settings instantly. Includes the 25°F rule, a full conversion chart, Gas Mark table for UK bakers, and tips for when NOT to use convection.",
    url: "https://calckitchen.com/convection-oven-converter",
    type: "website",
  },
  alternates: {
    canonical: "https://calckitchen.com/convection-oven-converter",
  },
};

const faqs = [
  {
    question: "What is the basic rule for converting conventional to convection oven?",
    answer: "The standard rule is to reduce the temperature by 25°F (about 15°C) OR reduce cooking time by 25% — but not both. Most bakers prefer reducing the temperature and keeping the time the same, as it gives more consistent results. For example, if a recipe calls for 350°F in a conventional oven, set your convection oven to 325°F.",
  },
  {
    question: "Is a fan oven the same as a convection oven?",
    answer: "Yes. 'Convection oven' is the American term, while 'fan oven' (or 'fan-assisted oven') is the British/European term. They work identically — a fan circulates hot air for more even cooking. If your UK recipe gives a 'fan oven' temperature, it's already adjusted. Only convert if the recipe gives a conventional (non-fan) temperature.",
  },
  {
    question: "Should I use convection for baking cakes?",
    answer: "It depends on the cake. Convection is excellent for sturdy cakes like pound cakes, carrot cakes, and cheesecakes. However, delicate cakes like angel food, soufflés, and some sponge cakes can be problematic — the airflow can create uneven rise or a dry crust. When in doubt, use conventional mode or reduce temp by 25°F and watch carefully.",
  },
  {
    question: "Why do my cookies burn on convection?",
    answer: "The most common cause is not reducing the temperature. Convection ovens cook faster and more evenly, so cookies that take 12 minutes in a conventional oven might be done in 9-10 minutes with convection. Always reduce temp by 25°F AND check cookies 2-3 minutes early. Also, darker pans absorb more heat — try lighter colored baking sheets.",
  },
  {
    question: "Do professional bakers use convection ovens?",
    answer: "Most professional bakeries use convection ovens almost exclusively. The even heat distribution means more consistent results, especially when baking multiple trays at once. Professional bakers develop their recipes specifically for convection, so they don't need to convert — they know their ovens. If you're following a recipe from a professional pastry chef, ask if it was developed for convection or conventional.",
  },
  {
    question: "How do I convert Gas Mark to Fahrenheit or Celsius?",
    answer: "Gas Mark is the British oven temperature scale. Gas Mark 4 = 350°F = 180°C (the most common baking temperature). Each Gas Mark increment equals about 25°F. So Gas Mark 5 = 375°F = 190°C, and Gas Mark 3 = 325°F = 165°C. For convection/fan ovens, reduce by 20°C (one Gas Mark) from the conventional setting.",
  },
  {
    question: "Does convection cooking use more energy?",
    answer: "Convection ovens are actually more energy-efficient. Because they cook faster (up to 25% quicker) and at lower temperatures (25°F less), they use less energy overall. The circulating air means the oven reaches the desired temperature faster and maintains it more efficiently. You'll save both time and money over the long run.",
  },
  {
    question: "Can I use both convection and conventional settings during the same bake?",
    answer: "Yes, and it's a great technique for certain dishes. For example, start a roast on convection to brown the outside and create a crust, then switch to conventional for gentler cooking. Or bake bread on conventional to allow a good rise, then finish on convection for a crispy crust. Always reduce the convection temperature by 25°F during the convection phases.",
  },
  {
    question: "What's the difference between true convection and regular convection?",
    answer: "True convection (also called European convection or third-element convection) has a heating element wrapped around the fan, providing more even heat distribution. Regular convection just has a fan that circulates air from the existing heating elements. True convection is more consistent and may require slightly more temperature reduction (30°F instead of 25°F). Check your oven's manual to see which type you have.",
  },
  {
    question: "Should I preheat a convection oven differently?",
    answer: "Convection ovens typically preheat faster than conventional ovens — often 25-30% faster — because the circulating air distributes heat more efficiently. However, always let your oven reach the target temperature before putting food in. Some convection ovens beep when preheated but may still be equilibrating; wait 5 more minutes for best results, especially for baking.",
  },
  {
    question: "Why does my convection oven have hot spots despite the fan?",
    answer: "Even convection ovens can have hot spots due to fan placement, heating element location, or blocked airflow. Common causes include: overcrowding the oven (blocking air circulation), using pans with high sides that deflect airflow, or a fan that's not working optimally. Test your oven with bread slices arranged on a baking sheet — after toasting, you'll see which areas are hotter.",
  },
  {
    question: "Can I convert air fryer recipes to convection oven?",
    answer: "Yes, but with adjustments. Air fryers are essentially small convection ovens with more powerful fans and closer heating elements. When converting air fryer recipes to convection oven: increase temperature by 25°F and add 5-10 minutes to cooking time. Air fryers also achieve crispier results, so you may not get identical textures in a convection oven.",
  },
];

export default function ConvectionOvenConverterPage() {
  return (
    <div className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Convection Oven Converter"
        description="Convert conventional oven temperatures and times to convection oven settings. Includes temperature charts, Gas Mark conversions, and baking tips."
        url="https://calckitchen.com/convection-oven-converter"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Convection Oven Converter", url: "https://calckitchen.com/convection-oven-converter" },
        ]}
      />

      {/* Hero Section with Calculator */}
      <section className="bg-gradient-to-b from-warm-white to-white py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Convection Oven Converter
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Convert conventional oven temperatures and times to convection settings. Use the 25°F rule for perfect results every time.
          </p>

          {/* Calculator Component */}
          <ConvectionOvenConverter />
        </div>
      </section>

      {/* Real-World Examples Section */}
      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Real-World Convection Conversion Examples
          </h2>
          <p className="text-gray-700 mb-8">
            See exactly how the 25°F rule works with common recipes and real kitchen scenarios.
          </p>

          {/* Example 1 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Converting Chocolate Chip Cookies
                </h3>
                <p className="text-gray-600 mb-4">
                  Your favorite cookie recipe calls for 375°F for 10-12 minutes in a conventional oven. You want to use convection for more even browning across multiple baking sheets.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>Original recipe:</strong> 375°F for 10-12 minutes (conventional)<br />
                    <strong>Conversion method:</strong> Reduce temperature by 25°F
                  </p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-emerald-800 font-medium">
                    <strong>Convection setting:</strong> 350°F for 10-12 minutes
                  </p>
                  <p className="text-emerald-700 text-sm mt-1">
                    Check at 9 minutes — convection often finishes slightly faster
                  </p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> With convection, you can bake 2-3 sheets simultaneously without rotating pans. The cookies will brown evenly on all racks.
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
                  Roasting a Whole Chicken
                </h3>
                <p className="text-gray-600 mb-4">
                  You're roasting a 5 lb chicken that typically requires 425°F for 15 minutes, then 350°F for about 1 hour in a conventional oven. Convection will give you crispier skin.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>Original recipe:</strong> 425°F for 15 min → 350°F for 60 min (conventional)<br />
                    <strong>Chicken weight:</strong> 5 lbs<br />
                    <strong>Target internal temp:</strong> 165°F (74°C)
                  </p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-emerald-800 font-medium">
                    <strong>Convection setting:</strong> 400°F for 15 min → 325°F for 50-55 min
                  </p>
                  <p className="text-emerald-700 text-sm mt-1">
                    Total time reduced by ~10 minutes with crispier, more evenly browned skin
                  </p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Place the chicken on a rack in a low-sided roasting pan to maximize air circulation. The convection fan will crisp the skin all around.
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
                  Converting a UK Fan Oven Recipe (Victoria Sponge)
                </h3>
                <p className="text-gray-600 mb-4">
                  A British baking recipe calls for 170°C fan oven for 25 minutes. You have a conventional American oven and need to know what temperature to use.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>UK recipe:</strong> 170°C fan oven (already convection-adjusted)<br />
                    <strong>Your oven:</strong> Conventional (non-fan)<br />
                    <strong>Conversion:</strong> ADD 20°C / 25°F for conventional
                  </p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-emerald-800 font-medium">
                    <strong>Conventional setting:</strong> 190°C (375°F) for 25-28 minutes
                  </p>
                  <p className="text-emerald-700 text-sm mt-1">
                    May need 2-3 extra minutes since conventional ovens have less even heat
                  </p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> UK recipes often specify "fan oven" temperatures — these are already 20°C lower than conventional. Always check whether the recipe is for fan or conventional before converting!
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
                  Baking Homemade Pizza with Convection
                </h3>
                <p className="text-gray-600 mb-4">
                  Your pizza recipe calls for the highest temperature your oven can reach — typically 500°F conventional — for 12-15 minutes. You want to know if convection helps.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>Original recipe:</strong> 500°F for 12-15 minutes (conventional)<br />
                    <strong>Pizza style:</strong> New York-style, 14-inch<br />
                    <strong>Goal:</strong> Crispy crust, melted toppings
                  </p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-emerald-800 font-medium">
                    <strong>Convection setting:</strong> 475°F for 10-12 minutes
                  </p>
                  <p className="text-emerald-700 text-sm mt-1">
                    Use a pizza stone preheated for 30+ minutes for best results
                  </p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> For pizza, convection excels at browning the top while the hot stone crisps the bottom. Position the pizza in the center of the oven for optimal air circulation.
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
                  Holiday Meal: Converting Multiple Dishes Simultaneously
                </h3>
                <p className="text-gray-600 mb-4">
                  You need to cook green bean casserole (350°F for 30 min), roasted vegetables (400°F for 25 min), and dinner rolls (375°F for 15 min) in the same oven for Thanksgiving.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>Challenge:</strong> Three dishes at different temperatures<br />
                    <strong>Conventional approach:</strong> Cook in batches, keeping dishes warm<br />
                    <strong>Convection advantage:</strong> Even heat allows compromise temperature
                  </p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-emerald-800 font-medium">
                    <strong>Convection solution:</strong> Set oven to 350°F (convection)
                  </p>
                  <ul className="text-emerald-700 text-sm mt-2 space-y-1">
                    <li>• Casserole: 30 min (same temp, convection efficiency compensates)</li>
                    <li>• Vegetables: 30-35 min (slightly longer at lower temp)</li>
                    <li>• Rolls: Put in last 15-18 min</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Convection's even heat distribution makes multi-rack cooking possible. Without it, the dish nearest the heating element would overcook.
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
                  Converting Air Fryer Recipe Back to Convection Oven
                </h3>
                <p className="text-gray-600 mb-4">
                  You found a great air fryer recipe for crispy chicken wings (400°F for 20 minutes, flipping halfway) but need to make a larger batch in your convection oven.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>Air fryer recipe:</strong> 400°F for 20 minutes<br />
                    <strong>Batch size:</strong> 6 wings in air fryer → 24 wings in oven<br />
                    <strong>Key difference:</strong> Air fryers have more concentrated heat and airflow
                  </p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-emerald-800 font-medium">
                    <strong>Convection oven setting:</strong> 425°F for 35-40 minutes
                  </p>
                  <p className="text-emerald-700 text-sm mt-1">
                    Use a wire rack over a baking sheet and flip wings halfway through
                  </p>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Air fryers are essentially powerful mini convection ovens. When scaling up, increase temperature by 25°F and add 50-75% more cooking time. Space wings apart for maximum crispiness.
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
            The 25°F Rule Explained
          </h2>
          <p>
            Convection ovens use a fan to circulate hot air, cooking food faster and more evenly than conventional ovens.
            The standard conversion rule is simple: reduce temperature by 25°F (or about 15°C) when using convection.
          </p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Why Convection Cooks Faster
          </h3>
          <ul>
            <li><strong>Hot air circulation:</strong> The fan eliminates cold spots and ensures even heat distribution</li>
            <li><strong>Faster heat transfer:</strong> Moving air transfers heat to food more efficiently than still air</li>
            <li><strong>Better browning:</strong> The continuous airflow removes moisture from surfaces, promoting browning</li>
            <li><strong>Multi-rack cooking:</strong> You can bake on multiple racks without rotating pans</li>
          </ul>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Complete Temperature Conversion Chart
          </h3>
          <p className="text-gray-700 mb-4">
            Reference this comprehensive chart for any conventional-to-convection conversion:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4">Conventional (°F)</th>
                  <th className="text-left py-3 px-4">Convection (°F)</th>
                  <th className="text-left py-3 px-4">Conventional (°C)</th>
                  <th className="text-left py-3 px-4">Convection (°C)</th>
                  <th className="text-left py-3 px-4">Common Uses</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">250°F</td>
                  <td className="py-3 px-4">225°F</td>
                  <td className="py-3 px-4">120°C</td>
                  <td className="py-3 px-4">105°C</td>
                  <td className="py-3 px-4">Drying herbs, keeping food warm</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4">275°F</td>
                  <td className="py-3 px-4">250°F</td>
                  <td className="py-3 px-4">135°C</td>
                  <td className="py-3 px-4">120°C</td>
                  <td className="py-3 px-4">Slow roasting, meringues</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">300°F</td>
                  <td className="py-3 px-4">275°F</td>
                  <td className="py-3 px-4">150°C</td>
                  <td className="py-3 px-4">135°C</td>
                  <td className="py-3 px-4">Low-temp roasting, custards</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4">325°F</td>
                  <td className="py-3 px-4">300°F</td>
                  <td className="py-3 px-4">165°C</td>
                  <td className="py-3 px-4">150°C</td>
                  <td className="py-3 px-4">Cakes, casseroles, cheesecakes</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">350°F</td>
                  <td className="py-3 px-4">325°F</td>
                  <td className="py-3 px-4">175°C</td>
                  <td className="py-3 px-4">165°C</td>
                  <td className="py-3 px-4">Most baking, cookies, muffins</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4">375°F</td>
                  <td className="py-3 px-4">350°F</td>
                  <td className="py-3 px-4">190°C</td>
                  <td className="py-3 px-4">175°C</td>
                  <td className="py-3 px-4">Cookies, pies, quick breads</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">400°F</td>
                  <td className="py-3 px-4">375°F</td>
                  <td className="py-3 px-4">200°C</td>
                  <td className="py-3 px-4">190°C</td>
                  <td className="py-3 px-4">Roasted vegetables, potatoes</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4">425°F</td>
                  <td className="py-3 px-4">400°F</td>
                  <td className="py-3 px-4">220°C</td>
                  <td className="py-3 px-4">200°C</td>
                  <td className="py-3 px-4">Roasting poultry, bread</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">450°F</td>
                  <td className="py-3 px-4">425°F</td>
                  <td className="py-3 px-4">230°C</td>
                  <td className="py-3 px-4">220°C</td>
                  <td className="py-3 px-4">Pizza, high-heat roasting</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4">475°F</td>
                  <td className="py-3 px-4">450°F</td>
                  <td className="py-3 px-4">245°C</td>
                  <td className="py-3 px-4">230°C</td>
                  <td className="py-3 px-4">Artisan bread, flatbreads</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">500°F</td>
                  <td className="py-3 px-4">475°F</td>
                  <td className="py-3 px-4">260°C</td>
                  <td className="py-3 px-4">245°C</td>
                  <td className="py-3 px-4">Pizza at max heat, searing</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4">525°F</td>
                  <td className="py-3 px-4">500°F</td>
                  <td className="py-3 px-4">275°C</td>
                  <td className="py-3 px-4">260°C</td>
                  <td className="py-3 px-4">Broil alternative, quick charring</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Complete Gas Mark Conversion Table
          </h3>
          <p className="text-gray-700 mb-4">
            Essential for UK and European recipes. Remember: Gas Mark recipes are typically written for conventional ovens — subtract 20°C (or one Gas Mark) for fan/convection ovens.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4">Gas Mark</th>
                  <th className="text-left py-3 px-4">°F (Conv.)</th>
                  <th className="text-left py-3 px-4">°C (Conv.)</th>
                  <th className="text-left py-3 px-4">°C (Fan)</th>
                  <th className="text-left py-3 px-4">Description</th>
                  <th className="text-left py-3 px-4">Typical Uses</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">¼</td>
                  <td className="py-3 px-4">225°F</td>
                  <td className="py-3 px-4">110°C</td>
                  <td className="py-3 px-4">90°C</td>
                  <td className="py-3 px-4">Very cool</td>
                  <td className="py-3 px-4">Meringues, drying</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">½</td>
                  <td className="py-3 px-4">250°F</td>
                  <td className="py-3 px-4">120°C</td>
                  <td className="py-3 px-4">100°C</td>
                  <td className="py-3 px-4">Very cool</td>
                  <td className="py-3 px-4">Slow cooking</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">1</td>
                  <td className="py-3 px-4">275°F</td>
                  <td className="py-3 px-4">140°C</td>
                  <td className="py-3 px-4">120°C</td>
                  <td className="py-3 px-4">Very slow</td>
                  <td className="py-3 px-4">Fruit cakes, slow roasts</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">2</td>
                  <td className="py-3 px-4">300°F</td>
                  <td className="py-3 px-4">150°C</td>
                  <td className="py-3 px-4">130°C</td>
                  <td className="py-3 px-4">Slow</td>
                  <td className="py-3 px-4">Rich cakes, casseroles</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">3</td>
                  <td className="py-3 px-4">325°F</td>
                  <td className="py-3 px-4">165°C</td>
                  <td className="py-3 px-4">145°C</td>
                  <td className="py-3 px-4">Moderately slow</td>
                  <td className="py-3 px-4">Sponge cakes, cheesecakes</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">4</td>
                  <td className="py-3 px-4">350°F</td>
                  <td className="py-3 px-4">180°C</td>
                  <td className="py-3 px-4">160°C</td>
                  <td className="py-3 px-4">Moderate</td>
                  <td className="py-3 px-4">Victoria sponge, most baking</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">5</td>
                  <td className="py-3 px-4">375°F</td>
                  <td className="py-3 px-4">190°C</td>
                  <td className="py-3 px-4">170°C</td>
                  <td className="py-3 px-4">Moderately hot</td>
                  <td className="py-3 px-4">Biscuits, shortbread</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">6</td>
                  <td className="py-3 px-4">400°F</td>
                  <td className="py-3 px-4">200°C</td>
                  <td className="py-3 px-4">180°C</td>
                  <td className="py-3 px-4">Hot</td>
                  <td className="py-3 px-4">Roast chicken, pastry</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">7</td>
                  <td className="py-3 px-4">425°F</td>
                  <td className="py-3 px-4">220°C</td>
                  <td className="py-3 px-4">200°C</td>
                  <td className="py-3 px-4">Hot</td>
                  <td className="py-3 px-4">Bread, Yorkshire pudding</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">8</td>
                  <td className="py-3 px-4">450°F</td>
                  <td className="py-3 px-4">230°C</td>
                  <td className="py-3 px-4">210°C</td>
                  <td className="py-3 px-4">Very hot</td>
                  <td className="py-3 px-4">Pizza, puff pastry</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">9</td>
                  <td className="py-3 px-4">475°F</td>
                  <td className="py-3 px-4">245°C</td>
                  <td className="py-3 px-4">225°C</td>
                  <td className="py-3 px-4">Very hot</td>
                  <td className="py-3 px-4">High-temp roasting</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">10</td>
                  <td className="py-3 px-4">500°F</td>
                  <td className="py-3 px-4">260°C</td>
                  <td className="py-3 px-4">240°C</td>
                  <td className="py-3 px-4">Extremely hot</td>
                  <td className="py-3 px-4">Pizza stones, naan bread</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* When to Use Section */}
      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl prose prose-lg">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            When to Use Convection vs. Conventional
          </h2>
          <p className="text-gray-700 mb-6">
            Not every recipe benefits from convection. Use this guide to decide which mode to use:
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4">Food Type</th>
                  <th className="text-left py-3 px-4">Best Mode</th>
                  <th className="text-left py-3 px-4">Why</th>
                  <th className="text-left py-3 px-4">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Roasted meats</td>
                  <td className="py-3 px-4 text-emerald-700">Convection</td>
                  <td className="py-3 px-4">Better browning, crispier exterior</td>
                  <td className="py-3 px-4">Use a rack for air circulation</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">Roasted vegetables</td>
                  <td className="py-3 px-4 text-emerald-700">Convection</td>
                  <td className="py-3 px-4">Caramelizes edges, removes moisture</td>
                  <td className="py-3 px-4">Spread in single layer</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Cookies</td>
                  <td className="py-3 px-4 text-emerald-700">Convection</td>
                  <td className="py-3 px-4">Even browning, can bake multiple trays</td>
                  <td className="py-3 px-4">Watch closely, check early</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">Pies & pastry</td>
                  <td className="py-3 px-4 text-emerald-700">Convection</td>
                  <td className="py-3 px-4">Crispy, flaky crust</td>
                  <td className="py-3 px-4">Great for bottom crust</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Casseroles</td>
                  <td className="py-3 px-4 text-emerald-700">Convection</td>
                  <td className="py-3 px-4">Golden top, even heating</td>
                  <td className="py-3 px-4">Uncover for last 15 min</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">Crusty bread</td>
                  <td className="py-3 px-4 text-emerald-700">Convection</td>
                  <td className="py-3 px-4">Develops better crust</td>
                  <td className="py-3 px-4">Add steam for first 10 min</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Dehydrating</td>
                  <td className="py-3 px-4 text-emerald-700">Convection</td>
                  <td className="py-3 px-4">Removes moisture efficiently</td>
                  <td className="py-3 px-4">Use lowest temp setting</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">Layer cakes</td>
                  <td className="py-3 px-4 text-amber-700">Either</td>
                  <td className="py-3 px-4">Sturdy cakes work well with convection</td>
                  <td className="py-3 px-4">Conventional if delicate</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Quick breads</td>
                  <td className="py-3 px-4 text-amber-700">Either</td>
                  <td className="py-3 px-4">May dome unevenly with convection</td>
                  <td className="py-3 px-4">Cover with foil if browning fast</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">Custards & flans</td>
                  <td className="py-3 px-4 text-red-700">Conventional</td>
                  <td className="py-3 px-4">Need gentle, even heat</td>
                  <td className="py-3 px-4">Water bath essential</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Soufflés</td>
                  <td className="py-3 px-4 text-red-700">Conventional</td>
                  <td className="py-3 px-4">Air movement causes collapse</td>
                  <td className="py-3 px-4">Never open door while baking</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">Angel food cake</td>
                  <td className="py-3 px-4 text-red-700">Conventional</td>
                  <td className="py-3 px-4">Delicate foam structure</td>
                  <td className="py-3 px-4">Needs stable, gentle heat</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Cheesecake</td>
                  <td className="py-3 px-4 text-red-700">Conventional</td>
                  <td className="py-3 px-4">Cracks with uneven heat</td>
                  <td className="py-3 px-4">Water bath, slow cooling</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium">Yeast bread (rising)</td>
                  <td className="py-3 px-4 text-red-700">Conventional</td>
                  <td className="py-3 px-4">Needs initial oven spring</td>
                  <td className="py-3 px-4">Switch to convection after rise</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Covered dishes</td>
                  <td className="py-3 px-4 text-red-700">Conventional</td>
                  <td className="py-3 px-4">No benefit from airflow</td>
                  <td className="py-3 px-4">Uncover to brown with convection</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Tips for Best Results
          </h3>
          <ul>
            <li>Use low-sided pans to allow air circulation</li>
            <li>Don&apos;t cover food unless the recipe calls for it</li>
            <li>Leave space between pans for airflow</li>
            <li>Check food 25% earlier than conventional timing</li>
            <li>Use an oven thermometer to verify your oven&apos;s accuracy</li>
            <li>Position food in the center of the oven when possible</li>
            <li>Avoid dark-colored baking sheets that absorb excess heat</li>
          </ul>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Time Adjustment Reference
          </h3>
          <p className="text-gray-700 mb-4">
            If you prefer to keep the same temperature and reduce cooking time instead:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4">Conventional Time</th>
                  <th className="text-left py-3 px-4">Convection Time (Same Temp)</th>
                  <th className="text-left py-3 px-4">Time Saved</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">10 minutes</td>
                  <td className="py-3 px-4">7-8 minutes</td>
                  <td className="py-3 px-4">2-3 minutes</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4">15 minutes</td>
                  <td className="py-3 px-4">11-12 minutes</td>
                  <td className="py-3 px-4">3-4 minutes</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">20 minutes</td>
                  <td className="py-3 px-4">15-17 minutes</td>
                  <td className="py-3 px-4">3-5 minutes</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4">30 minutes</td>
                  <td className="py-3 px-4">22-25 minutes</td>
                  <td className="py-3 px-4">5-8 minutes</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">45 minutes</td>
                  <td className="py-3 px-4">34-38 minutes</td>
                  <td className="py-3 px-4">7-11 minutes</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4">1 hour</td>
                  <td className="py-3 px-4">45-50 minutes</td>
                  <td className="py-3 px-4">10-15 minutes</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">1.5 hours</td>
                  <td className="py-3 px-4">68-75 minutes</td>
                  <td className="py-3 px-4">15-22 minutes</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4">2 hours</td>
                  <td className="py-3 px-4">90-100 minutes</td>
                  <td className="py-3 px-4">20-30 minutes</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            <strong>Note:</strong> Most experts recommend reducing temperature rather than time for more predictable results. Time reduction works best for roasting and reheating, not baking.
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
              href="/oven-temperature-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Oven Temperature Converter</h3>
              <p className="text-sm text-gray-600">Convert °F to °C and gas marks</p>
            </Link>
            <Link
              href="/slow-cooker-to-oven-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Slow Cooker Converter</h3>
              <p className="text-sm text-gray-600">Convert between cooking methods</p>
            </Link>
            <Link
              href="/air-fryer-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Air Fryer Converter</h3>
              <p className="text-sm text-gray-600">Convert oven to air fryer settings</p>
            </Link>
            <Link
              href="/meat-cooking-time-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Meat Cooking Time Calculator</h3>
              <p className="text-sm text-gray-600">Calculate roasting times for any cut</p>
            </Link>
            <Link
              href="/turkey-cooking-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Turkey Cooking Calculator</h3>
              <p className="text-sm text-gray-600">Perfect turkey timing for holidays</p>
            </Link>
            <Link
              href="/meat-temperature-chart"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Meat Temperature Chart</h3>
              <p className="text-sm text-gray-600">Safe internal temperatures for all meats</p>
            </Link>
            <Link
              href="/recipe-scaler"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Recipe Scaler</h3>
              <p className="text-sm text-gray-600">Adjust ingredients for any batch size</p>
            </Link>
            <Link
              href="/bakers-percentage-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Baker&apos;s Percentage Calculator</h3>
              <p className="text-sm text-gray-600">Scale bread recipes professionally</p>
            </Link>
            <Link
              href="/cooking-measurement-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Measurement Converter</h3>
              <p className="text-sm text-gray-600">Convert cups, tablespoons, and grams</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Authority Sources Footer */}
      <section className="py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-sm text-gray-500 text-center">
            Conversion guidelines based on recommendations from{" "}
            <a href="https://www.thermador.com/us/experience/blog/convection-oven-vs-regular-oven" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">
              Thermador
            </a>
            {" • "}
            <a href="https://www.goodhousekeeping.com/cooking-tools/a32600/convection-oven-tips/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">
              Good Housekeeping
            </a>
            {" • "}
            <a href="https://www.seriouseats.com/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">
              Serious Eats
            </a>
            {" • "}
            <a href="https://www.kingarthurbaking.com/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">
              King Arthur Baking
            </a>
            {" • "}
            <a href="https://www.americastestkitchen.com/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">
              America&apos;s Test Kitchen
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
