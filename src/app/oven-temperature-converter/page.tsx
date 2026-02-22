import { Metadata } from "next";
import Link from "next/link";
import OvenTemperatureConverter from "@/components/calculators/OvenTemperatureConverter";
import { FAQPageJsonLd, WebApplicationJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Oven Temperature Converter — Fahrenheit, Celsius & Gas Mark Chart | CalcKitchen",
  description: "Convert oven temperatures between °F, °C, and Gas Mark instantly. Includes a complete Gas Mark conversion chart, common baking temperatures, and a guide to oven temp descriptions used in recipes.",
  openGraph: {
    title: "Oven Temperature Converter — Fahrenheit, Celsius & Gas Mark Chart",
    description: "Convert oven temperatures between °F, °C, and Gas Mark instantly. Includes a complete Gas Mark conversion chart, common baking temperatures, and a guide to oven temp descriptions used in recipes.",
    url: "https://calckitchen.com/oven-temperature-converter",
    type: "website",
  },
  alternates: {
    canonical: "https://calckitchen.com/oven-temperature-converter",
  },
};

const faqs = [
  {
    question: "What is Gas Mark 4 in Fahrenheit?",
    answer: "Gas Mark 4 equals 350°F (175°C). This is the most common baking temperature and corresponds to a \"moderate oven.\" Each Gas Mark step is 25°F, starting from Gas Mark 1 = 275°F.",
  },
  {
    question: "What is 180 degrees Celsius in Fahrenheit?",
    answer: "180°C equals 356°F. In practice, this is treated as 350°F since ovens don't have single-degree precision. The 180°C / 350°F pairing is the most frequently used oven temperature in both metric and imperial recipes.",
  },
  {
    question: "What is 200 degrees Celsius in Fahrenheit?",
    answer: "200°C equals 392°F, which rounds to 400°F. This is a common roasting temperature used for vegetables, chicken, fish, and baked potatoes.",
  },
  {
    question: "What Gas Mark is 180°C?",
    answer: "180°C is closest to Gas Mark 4 (175°C / 350°F). For 190°C, use Gas Mark 5 (190°C / 375°F).",
  },
  {
    question: "How do I convert a Gas Mark recipe if my oven doesn't have Gas Mark settings?",
    answer: "Use the formula: °F = (Gas Mark × 25) + 250. For example, Gas Mark 5 = (5 × 25) + 250 = 375°F. Or bookmark this page and use the chart.",
  },
  {
    question: "Does preheating really matter?",
    answer: "Yes, especially for baking. Putting cake batter into a cold oven means it heats unevenly, affecting rise and texture. Most ovens take 10–15 minutes to reach a stable temperature after the preheat indicator goes off — many cooks wait an additional 5 minutes after the beep for accuracy. For casseroles and braises, preheating is less critical.",
  },
  {
    question: "Why do British and American recipes use different temperature systems?",
    answer: "The UK adopted Celsius in the 1960s as part of metrication, but Gas Mark ovens were already widespread, so both systems persisted. The US never adopted the metric system for everyday use, so American recipes use Fahrenheit almost exclusively. Australian recipes typically use Celsius with fan oven temperatures already adjusted.",
  },
  {
    question: "Is there a difference between \"bake\" and \"roast\" on my oven?",
    answer: "On most home ovens, no — \"bake\" and \"roast\" use the same heating elements at the same temperature. Some higher-end ovens use slightly different element ratios (more top heat for \"roast\"), but for conversion purposes, the temperature setting is identical.",
  },
  {
    question: "How accurate is my oven's temperature?",
    answer: "Most home ovens vary by ±25°F (±14°C) from the displayed setting. A $10-15 oven thermometer is the best investment for better baking. Place it in the center of your oven and check periodically — you may need to add or subtract 10-25°F from recipes to compensate.",
  },
  {
    question: "What temperature should I use for baking bread?",
    answer: "Most bread bakes at 375-450°F (190-230°C) depending on the type. Sandwich loaves bake at 350-375°F, artisan breads at 400-450°F, and crusty Italian/French breads often start at 475°F then reduce. High initial heat helps create a crispy crust through \"oven spring.\"",
  },
  {
    question: "What's the difference between convection and conventional oven temperatures?",
    answer: "Convection ovens use a fan to circulate hot air, cooking food about 25% faster. When converting, either reduce the temperature by 25°F (15°C) OR keep the same temperature and reduce cooking time by 20-25%. Don't do both or your food will be undercooked.",
  },
  {
    question: "Why do some recipes say \"hot oven\" instead of giving a specific temperature?",
    answer: "Older recipes (pre-1950s) often used descriptions instead of exact temperatures because ovens weren't precisely calibrated. \"Hot oven\" typically means 400-450°F (200-230°C), \"moderate oven\" means 350-375°F (175-190°C), and \"slow oven\" means 275-325°F (135-165°C).",
  },
];

export default function OvenTemperatureConverterPage() {
  return (
    <div className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Oven Temperature Converter"
        description="Convert oven temperatures between Fahrenheit, Celsius, and Gas Mark. Includes quick-click common temperatures and complete conversion charts."
        url="https://calckitchen.com/oven-temperature-converter"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Oven Temperature Converter", url: "https://calckitchen.com/oven-temperature-converter" },
        ]}
      />

      {/* Hero Section with Calculator */}
      <section className="bg-gradient-to-b from-warm-white to-white py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Oven Temperature Converter — °F, °C & Gas Mark
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Convert oven temperatures between Fahrenheit, Celsius, and Gas Mark instantly. Type in any one value and the other two update automatically.
          </p>

          {/* Calculator Component */}
          <OvenTemperatureConverter />
        </div>
      </section>

      {/* Real-World Examples Section */}
      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Real-World Temperature Conversion Examples
          </h2>
          <p className="text-gray-700 mb-8">
            See how home cooks and bakers use temperature conversions in everyday cooking situations:
          </p>

          {/* Example 1 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">British Scone Recipe for American Kitchen</h3>
                <p className="text-gray-600 mb-4">
                  Sarah found a traditional British scone recipe from BBC Good Food that calls for Gas Mark 7. She's using a standard American electric oven with only Fahrenheit settings and needs to figure out the right temperature.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Recipe Requirement:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Recipe states: Gas Mark 7</li>
                    <li>• Sarah's oven: Fahrenheit only</li>
                    <li>• Baking time: 12-15 minutes</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Conversion Result:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• <strong>Gas Mark 7 = 425°F (220°C)</strong></li>
                    <li>• This is a "hot" oven — perfect for scones</li>
                    <li>• The high heat creates the rise and golden top</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700"><strong>Pro tip:</strong> British recipes often assume fan/convection ovens. If your oven isn't convection, try 450°F to match the same heat intensity.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 2 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">European Pizza Recipe in the US</h3>
                <p className="text-gray-600 mb-4">
                  Marco is following his Italian grandmother's pizza recipe that calls for 250°C. His New York apartment has a standard gas oven with Fahrenheit settings, and he wants to get as close as possible to authentic Neapolitan style.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Recipe Requirement:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Grandmother's recipe: 250°C</li>
                    <li>• Pizza type: Thin-crust margherita</li>
                    <li>• Cooking time at that temp: 8-10 minutes</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Conversion Result:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• <strong>250°C = 482°F (round to 475-500°F)</strong></li>
                    <li>• This is Gas Mark 9-10 (very hot)</li>
                    <li>• Most home ovens max at 500-550°F</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700"><strong>Pro tip:</strong> Preheat your oven for 30-45 minutes at maximum temperature. Place a pizza stone or steel on the bottom rack for the most authentic results.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 3 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">American Cookie Recipe for Australian Baker</h3>
                <p className="text-gray-600 mb-4">
                  Emma in Sydney found a popular American chocolate chip cookie recipe that calls for 375°F. Her oven displays only Celsius, and she has a fan-forced (convection) oven, so she needs to convert and adjust.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Recipe Requirement:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• American recipe: 375°F</li>
                    <li>• Emma's oven: Celsius, fan-forced</li>
                    <li>• Baking time: 10-12 minutes</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Conversion Result:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• <strong>375°F = 190°C (conventional)</strong></li>
                    <li>• <strong>For fan-forced: 170°C</strong> (subtract 20°C)</li>
                    <li>• This is Gas Mark 5 equivalent</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700"><strong>Pro tip:</strong> Australian ovens are often fan-forced by default. Always check if American recipes assume conventional ovens and adjust accordingly — otherwise cookies spread too fast and brown before the centers set.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 4 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">4</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Vintage Cookbook "Slow Oven" Translation</h3>
                <p className="text-gray-600 mb-4">
                  James inherited his great-grandmother's recipe book from 1923. Her pot roast recipe simply says "cook in a slow oven for 3 hours." He needs to figure out what temperature "slow oven" means for his modern digital oven.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Recipe Requirement:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Vintage description: "Slow oven"</li>
                    <li>• Dish: Beef pot roast with vegetables</li>
                    <li>• Cooking time: 3 hours</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Conversion Result:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• <strong>"Slow oven" = 275-325°F (135-165°C)</strong></li>
                    <li>• <strong>Gas Mark 1-3</strong></li>
                    <li>• For pot roast, use 300°F (150°C) covered</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700"><strong>Pro tip:</strong> Vintage oven descriptions: Very slow = 225-275°F, Slow = 275-325°F, Moderate = 325-375°F, Hot = 400-450°F, Very hot = 450-500°F.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 5 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">5</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">French Croissant Recipe Requiring Precision</h3>
                <p className="text-gray-600 mb-4">
                  Melissa is attempting homemade croissants from a French pastry cookbook. The recipe calls for a specific two-stage bake: start at 220°C for 10 minutes, then reduce to 180°C for 10-15 minutes. She needs both temperatures in Fahrenheit.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Recipe Requirement:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Stage 1: 220°C for 10 minutes (initial rise)</li>
                    <li>• Stage 2: 180°C for 10-15 minutes (finish baking)</li>
                    <li>• Critical: Must maintain butter layers intact</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Conversion Result:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• <strong>Stage 1: 220°C = 425°F</strong> (Gas Mark 7)</li>
                    <li>• <strong>Stage 2: 180°C = 350°F</strong> (Gas Mark 4)</li>
                    <li>• Drop temperature after initial puff achieved</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700"><strong>Pro tip:</strong> The high initial temperature causes the butter between the dough layers to steam, creating the signature flaky puff. Lower temp finishes the bake without over-browning.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 6 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">6</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">New Convection Oven Adjustment</h3>
                <p className="text-gray-600 mb-4">
                  David just upgraded to a new convection oven. All his family's favorite recipes were developed for his old conventional oven at 350°F. He wants to know how to adjust so his cakes and roasts come out the same.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Recipe Requirement:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Original recipes: 350°F conventional</li>
                    <li>• New oven: Convection/fan</li>
                    <li>• Wants same results, not faster cooking</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Conversion Result:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• <strong>350°F conventional → 325°F convection</strong></li>
                    <li>• Reduce temperature by 25°F</li>
                    <li>• Keep original cooking time</li>
                    <li>• OR: Keep 350°F but reduce time by 20-25%</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700"><strong>Pro tip:</strong> For delicate baked goods (cakes, soufflés), always reduce temperature rather than time. For roasts where you want browning, try reducing time instead to maintain that high-heat crust development.</p>
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
            The Conversion Formulas
          </h2>
          <p>
            The math behind temperature conversion is straightforward, but doing it in your head while preheating the oven is annoying. Here are the formulas the converter uses:
          </p>

          <div className="bg-gray-50 p-4 rounded-lg my-6 space-y-2">
            <p className="font-mono text-sm"><strong>Fahrenheit to Celsius:</strong> °C = (°F − 32) × 5/9</p>
            <p className="font-mono text-sm"><strong>Celsius to Fahrenheit:</strong> °F = (°C × 9/5) + 32</p>
            <p className="font-mono text-sm"><strong>Gas Mark to Fahrenheit:</strong> °F = (Gas Mark × 25) + 250</p>
          </div>

          <p>
            In practice, oven temperature conversions don't need decimal precision. Ovens aren't that accurate to begin with — according to the <a href="https://www.energy.gov/energysaver/kitchen-appliances" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">U.S. Department of Energy</a>, most home ovens vary by ±25°F (14°C) from the displayed temperature. We round to the nearest practical setting.
          </p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Complete Oven Temperature Conversion Chart
          </h3>
          <p className="text-gray-600 mb-4">
            This comprehensive chart covers the full range of oven temperatures from very slow (225°F) to extremely hot (550°F), with Celsius equivalents, Gas Mark settings, descriptive terms, and common cooking applications.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-center py-2 pr-2">°F</th>
                  <th className="text-center py-2 pr-2">°C</th>
                  <th className="text-center py-2 pr-2">Gas Mark</th>
                  <th className="text-left py-2 pr-2">Description</th>
                  <th className="text-left py-2">Common Uses</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-2 text-center">225°F</td>
                  <td className="py-2 pr-2 text-center">110°C</td>
                  <td className="py-2 pr-2 text-center">¼</td>
                  <td className="py-2 pr-2">Very cool</td>
                  <td className="py-2">Slow-roasting, drying herbs, warming plates</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-2 text-center">250°F</td>
                  <td className="py-2 pr-2 text-center">120°C</td>
                  <td className="py-2 pr-2 text-center">½</td>
                  <td className="py-2 pr-2">Cool</td>
                  <td className="py-2">Keeping food warm, slow-braising</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-2 text-center">275°F</td>
                  <td className="py-2 pr-2 text-center">135°C</td>
                  <td className="py-2 pr-2 text-center">1</td>
                  <td className="py-2 pr-2">Very low</td>
                  <td className="py-2">Slow roasts, cheesecake, meringues</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-2 text-center">300°F</td>
                  <td className="py-2 pr-2 text-center">150°C</td>
                  <td className="py-2 pr-2 text-center">2</td>
                  <td className="py-2 pr-2">Low</td>
                  <td className="py-2">Slow braising, pulled pork, brisket</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-2 text-center">325°F</td>
                  <td className="py-2 pr-2 text-center">160°C</td>
                  <td className="py-2 pr-2 text-center">3</td>
                  <td className="py-2 pr-2">Moderately low</td>
                  <td className="py-2">Casseroles, custards, slow-baked cheesecake</td>
                </tr>
                <tr className="border-b border-gray-100 bg-yellow-50">
                  <td className="py-2 pr-2 text-center font-semibold">350°F</td>
                  <td className="py-2 pr-2 text-center font-semibold">175°C</td>
                  <td className="py-2 pr-2 text-center font-semibold">4</td>
                  <td className="py-2 pr-2 font-semibold">Moderate</td>
                  <td className="py-2 font-semibold">Cakes, cookies, muffins, brownies</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-2 text-center">375°F</td>
                  <td className="py-2 pr-2 text-center">190°C</td>
                  <td className="py-2 pr-2 text-center">5</td>
                  <td className="py-2 pr-2">Moderately hot</td>
                  <td className="py-2">Pie crusts, biscuits, cookies, quick breads</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-2 text-center">400°F</td>
                  <td className="py-2 pr-2 text-center">200°C</td>
                  <td className="py-2 pr-2 text-center">6</td>
                  <td className="py-2 pr-2">Hot</td>
                  <td className="py-2">Roasted vegetables, fish, chicken pieces</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-2 text-center">425°F</td>
                  <td className="py-2 pr-2 text-center">220°C</td>
                  <td className="py-2 pr-2 text-center">7</td>
                  <td className="py-2 pr-2">Hot</td>
                  <td className="py-2">Pizza, roasted potatoes, bread, scones</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-2 text-center">450°F</td>
                  <td className="py-2 pr-2 text-center">230°C</td>
                  <td className="py-2 pr-2 text-center">8</td>
                  <td className="py-2 pr-2">Very hot</td>
                  <td className="py-2">High-heat roasting, searing, Yorkshire pudding</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-2 text-center">475°F</td>
                  <td className="py-2 pr-2 text-center">245°C</td>
                  <td className="py-2 pr-2 text-center">9</td>
                  <td className="py-2 pr-2">Very hot</td>
                  <td className="py-2">Pizza at max, naan bread, popovers</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-2 text-center">500°F</td>
                  <td className="py-2 pr-2 text-center">260°C</td>
                  <td className="py-2 pr-2 text-center">10</td>
                  <td className="py-2 pr-2">Extremely hot</td>
                  <td className="py-2">Maximum on most ovens, professional pizza</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-2 text-center">525°F</td>
                  <td className="py-2 pr-2 text-center">275°C</td>
                  <td className="py-2 pr-2 text-center">—</td>
                  <td className="py-2 pr-2">Broil</td>
                  <td className="py-2">Broiling, charring (if oven reaches this)</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-2 text-center">550°F</td>
                  <td className="py-2 pr-2 text-center">290°C</td>
                  <td className="py-2 pr-2 text-center">—</td>
                  <td className="py-2 pr-2">High broil</td>
                  <td className="py-2">Maximum on high-end ovens, restaurant pizza</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Baking Temperature Guide Section */}
      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl prose prose-lg">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            Baking Temperature Guide by Food Category
          </h2>
          <p className="text-gray-700 mb-6">
            Different baked goods require different temperatures for optimal results. Use this guide to understand why recipes call for specific temperatures.
          </p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-6 mb-4">
            Cakes & Cupcakes
          </h3>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Baked Good</th>
                  <th className="text-center py-2 pr-4">°F</th>
                  <th className="text-center py-2 pr-4">°C</th>
                  <th className="text-center py-2 pr-4">Gas Mark</th>
                  <th className="text-left py-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Pound cake</td>
                  <td className="py-2 pr-4 text-center">325°F</td>
                  <td className="py-2 pr-4 text-center">160°C</td>
                  <td className="py-2 pr-4 text-center">3</td>
                  <td className="py-2">Lower temp prevents dome; longer bake</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Layer cakes</td>
                  <td className="py-2 pr-4 text-center">350°F</td>
                  <td className="py-2 pr-4 text-center">175°C</td>
                  <td className="py-2 pr-4 text-center">4</td>
                  <td className="py-2">Standard; even rise and browning</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Angel food cake</td>
                  <td className="py-2 pr-4 text-center">325°F</td>
                  <td className="py-2 pr-4 text-center">160°C</td>
                  <td className="py-2 pr-4 text-center">3</td>
                  <td className="py-2">Gentle heat preserves delicate foam</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Cupcakes</td>
                  <td className="py-2 pr-4 text-center">350°F</td>
                  <td className="py-2 pr-4 text-center">175°C</td>
                  <td className="py-2 pr-4 text-center">4</td>
                  <td className="py-2">Same as layer cakes; 18-22 min</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Cheesecake</td>
                  <td className="py-2 pr-4 text-center">325°F</td>
                  <td className="py-2 pr-4 text-center">160°C</td>
                  <td className="py-2 pr-4 text-center">3</td>
                  <td className="py-2">Often in water bath; prevents cracking</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Flourless chocolate cake</td>
                  <td className="py-2 pr-4 text-center">350°F</td>
                  <td className="py-2 pr-4 text-center">175°C</td>
                  <td className="py-2 pr-4 text-center">4</td>
                  <td className="py-2">Water bath optional; fudgy center</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-6 mb-4">
            Cookies & Bars
          </h3>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Baked Good</th>
                  <th className="text-center py-2 pr-4">°F</th>
                  <th className="text-center py-2 pr-4">°C</th>
                  <th className="text-center py-2 pr-4">Gas Mark</th>
                  <th className="text-left py-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Chocolate chip cookies</td>
                  <td className="py-2 pr-4 text-center">375°F</td>
                  <td className="py-2 pr-4 text-center">190°C</td>
                  <td className="py-2 pr-4 text-center">5</td>
                  <td className="py-2">Chewy; drop to 350°F for crispier</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Sugar cookies</td>
                  <td className="py-2 pr-4 text-center">350°F</td>
                  <td className="py-2 pr-4 text-center">175°C</td>
                  <td className="py-2 pr-4 text-center">4</td>
                  <td className="py-2">For cut-out cookies; holds shape</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Oatmeal cookies</td>
                  <td className="py-2 pr-4 text-center">350°F</td>
                  <td className="py-2 pr-4 text-center">175°C</td>
                  <td className="py-2 pr-4 text-center">4</td>
                  <td className="py-2">Even browning on oats</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Brownies</td>
                  <td className="py-2 pr-4 text-center">350°F</td>
                  <td className="py-2 pr-4 text-center">175°C</td>
                  <td className="py-2 pr-4 text-center">4</td>
                  <td className="py-2">Fudgy center; don't overbake</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Shortbread</td>
                  <td className="py-2 pr-4 text-center">325°F</td>
                  <td className="py-2 pr-4 text-center">160°C</td>
                  <td className="py-2 pr-4 text-center">3</td>
                  <td className="py-2">Low and slow; pale golden color</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Biscotti</td>
                  <td className="py-2 pr-4 text-center">350°F / 325°F</td>
                  <td className="py-2 pr-4 text-center">175°C / 160°C</td>
                  <td className="py-2 pr-4 text-center">4 / 3</td>
                  <td className="py-2">First bake higher, second lower</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-6 mb-4">
            Bread & Dough
          </h3>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Baked Good</th>
                  <th className="text-center py-2 pr-4">°F</th>
                  <th className="text-center py-2 pr-4">°C</th>
                  <th className="text-center py-2 pr-4">Gas Mark</th>
                  <th className="text-left py-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Sandwich bread</td>
                  <td className="py-2 pr-4 text-center">350°F</td>
                  <td className="py-2 pr-4 text-center">175°C</td>
                  <td className="py-2 pr-4 text-center">4</td>
                  <td className="py-2">Soft crust; in loaf pan</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">French/Italian bread</td>
                  <td className="py-2 pr-4 text-center">450°F</td>
                  <td className="py-2 pr-4 text-center">230°C</td>
                  <td className="py-2 pr-4 text-center">8</td>
                  <td className="py-2">Crusty exterior; steam first 10 min</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Sourdough</td>
                  <td className="py-2 pr-4 text-center">475°F → 450°F</td>
                  <td className="py-2 pr-4 text-center">245°C → 230°C</td>
                  <td className="py-2 pr-4 text-center">9 → 8</td>
                  <td className="py-2">Dutch oven method; reduce after 20 min</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Pizza dough</td>
                  <td className="py-2 pr-4 text-center">475-500°F</td>
                  <td className="py-2 pr-4 text-center">245-260°C</td>
                  <td className="py-2 pr-4 text-center">9-10</td>
                  <td className="py-2">As hot as your oven goes</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Focaccia</td>
                  <td className="py-2 pr-4 text-center">425°F</td>
                  <td className="py-2 pr-4 text-center">220°C</td>
                  <td className="py-2 pr-4 text-center">7</td>
                  <td className="py-2">Golden, crispy bottom</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Dinner rolls</td>
                  <td className="py-2 pr-4 text-center">375°F</td>
                  <td className="py-2 pr-4 text-center">190°C</td>
                  <td className="py-2 pr-4 text-center">5</td>
                  <td className="py-2">Soft, pull-apart texture</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Croissants</td>
                  <td className="py-2 pr-4 text-center">425°F → 350°F</td>
                  <td className="py-2 pr-4 text-center">220°C → 175°C</td>
                  <td className="py-2 pr-4 text-center">7 → 4</td>
                  <td className="py-2">High start for puff, lower to finish</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">English muffins</td>
                  <td className="py-2 pr-4 text-center">350°F</td>
                  <td className="py-2 pr-4 text-center">175°C</td>
                  <td className="py-2 pr-4 text-center">4</td>
                  <td className="py-2">Griddle first, then oven</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-6 mb-4">
            Pastry & Pies
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Baked Good</th>
                  <th className="text-center py-2 pr-4">°F</th>
                  <th className="text-center py-2 pr-4">°C</th>
                  <th className="text-center py-2 pr-4">Gas Mark</th>
                  <th className="text-left py-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Pie crust (blind bake)</td>
                  <td className="py-2 pr-4 text-center">425°F</td>
                  <td className="py-2 pr-4 text-center">220°C</td>
                  <td className="py-2 pr-4 text-center">7</td>
                  <td className="py-2">With weights; prevents shrinking</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Fruit pie</td>
                  <td className="py-2 pr-4 text-center">425°F → 375°F</td>
                  <td className="py-2 pr-4 text-center">220°C → 190°C</td>
                  <td className="py-2 pr-4 text-center">7 → 5</td>
                  <td className="py-2">High start sets crust, lower finishes</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Pumpkin pie</td>
                  <td className="py-2 pr-4 text-center">425°F → 350°F</td>
                  <td className="py-2 pr-4 text-center">220°C → 175°C</td>
                  <td className="py-2 pr-4 text-center">7 → 4</td>
                  <td className="py-2">Sets custard without cracks</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Puff pastry</td>
                  <td className="py-2 pr-4 text-center">400°F</td>
                  <td className="py-2 pr-4 text-center">200°C</td>
                  <td className="py-2 pr-4 text-center">6</td>
                  <td className="py-2">Creates steam for layers</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Tart shells</td>
                  <td className="py-2 pr-4 text-center">375°F</td>
                  <td className="py-2 pr-4 text-center">190°C</td>
                  <td className="py-2 pr-4 text-center">5</td>
                  <td className="py-2">Even golden color</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">Eclairs/choux</td>
                  <td className="py-2 pr-4 text-center">425°F → 375°F</td>
                  <td className="py-2 pr-4 text-center">220°C → 190°C</td>
                  <td className="py-2 pr-4 text-center">7 → 5</td>
                  <td className="py-2">High heat puffs, lower dries inside</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Gas Mark Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl prose prose-lg">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            The Complete Gas Mark Chart
          </h2>
          <p>
            Gas Mark is the temperature setting system used on gas ovens primarily in the United Kingdom, Ireland, and some Commonwealth countries. If you're following a recipe from a British cookbook or BBC Good Food, you'll see temperatures given as "Gas Mark 4" instead of degrees.
          </p>
          <p>
            The Gas Mark scale was introduced in 1943 and remains common on UK gas ovens today. The pattern: each Gas Mark increment is 25°F. Gas Mark 1 = 275°F, and you add 25°F for each step.
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-center py-2 pr-4">Gas Mark</th>
                  <th className="text-center py-2 pr-4">°F</th>
                  <th className="text-center py-2 pr-4">°C</th>
                  <th className="text-left py-2">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-center">¼</td>
                  <td className="py-2 pr-4 text-center">225°F</td>
                  <td className="py-2 pr-4 text-center">107°C</td>
                  <td className="py-2">Very cool/very slow</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 text-center">½</td>
                  <td className="py-2 pr-4 text-center">250°F</td>
                  <td className="py-2 pr-4 text-center">120°C</td>
                  <td className="py-2">Cool/slow</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-center">1</td>
                  <td className="py-2 pr-4 text-center">275°F</td>
                  <td className="py-2 pr-4 text-center">135°C</td>
                  <td className="py-2">Cool</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 text-center">2</td>
                  <td className="py-2 pr-4 text-center">300°F</td>
                  <td className="py-2 pr-4 text-center">150°C</td>
                  <td className="py-2">Cool/slow</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-center">3</td>
                  <td className="py-2 pr-4 text-center">325°F</td>
                  <td className="py-2 pr-4 text-center">160°C</td>
                  <td className="py-2">Warm/moderate</td>
                </tr>
                <tr className="border-b border-gray-100 bg-yellow-50">
                  <td className="py-2 pr-4 text-center font-semibold">4</td>
                  <td className="py-2 pr-4 text-center font-semibold">350°F</td>
                  <td className="py-2 pr-4 text-center font-semibold">175°C</td>
                  <td className="py-2 font-semibold">Moderate (most common)</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 text-center">5</td>
                  <td className="py-2 pr-4 text-center">375°F</td>
                  <td className="py-2 pr-4 text-center">190°C</td>
                  <td className="py-2">Moderately hot</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-center">6</td>
                  <td className="py-2 pr-4 text-center">400°F</td>
                  <td className="py-2 pr-4 text-center">200°C</td>
                  <td className="py-2">Moderately hot</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 text-center">7</td>
                  <td className="py-2 pr-4 text-center">425°F</td>
                  <td className="py-2 pr-4 text-center">220°C</td>
                  <td className="py-2">Hot</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-center">8</td>
                  <td className="py-2 pr-4 text-center">450°F</td>
                  <td className="py-2 pr-4 text-center">230°C</td>
                  <td className="py-2">Very hot</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 text-center">9</td>
                  <td className="py-2 pr-4 text-center">475°F</td>
                  <td className="py-2 pr-4 text-center">245°C</td>
                  <td className="py-2">Very hot</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-center">10</td>
                  <td className="py-2 pr-4 text-center">500°F</td>
                  <td className="py-2 pr-4 text-center">260°C</td>
                  <td className="py-2">Extremely hot</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Regional Temperature Conventions
          </h3>
          <p>
            Understanding which temperature system a recipe uses helps avoid costly mistakes. Here's how different regions typically express oven temperatures:
          </p>

          <div className="overflow-x-auto mt-6">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Region</th>
                  <th className="text-left py-2 pr-4">Primary System</th>
                  <th className="text-left py-2 pr-4">Secondary System</th>
                  <th className="text-left py-2">Common Recipe Sources</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">United States</td>
                  <td className="py-2 pr-4">Fahrenheit (°F)</td>
                  <td className="py-2 pr-4">—</td>
                  <td className="py-2">Bon Appétit, Serious Eats, NYT Cooking</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">United Kingdom</td>
                  <td className="py-2 pr-4">Celsius (°C)</td>
                  <td className="py-2 pr-4">Gas Mark</td>
                  <td className="py-2">BBC Good Food, The Guardian, Jamie Oliver</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">Australia</td>
                  <td className="py-2 pr-4">Celsius (°C)</td>
                  <td className="py-2 pr-4">Fan-forced °C</td>
                  <td className="py-2">Taste.com.au, Donna Hay (often fan-forced)</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">Canada</td>
                  <td className="py-2 pr-4">Fahrenheit (°F)</td>
                  <td className="py-2 pr-4">Celsius (°C)</td>
                  <td className="py-2">Mixed; often shows both systems</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">Europe (EU)</td>
                  <td className="py-2 pr-4">Celsius (°C)</td>
                  <td className="py-2 pr-4">—</td>
                  <td className="py-2">Most European cookbooks and sites</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">India</td>
                  <td className="py-2 pr-4">Celsius (°C)</td>
                  <td className="py-2 pr-4">—</td>
                  <td className="py-2">Indian cookbooks, YouTube channels</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Fan Oven / Convection Oven Adjustment
          </h3>
          <p>
            Many modern ovens have a fan (convection) setting that circulates hot air around the food. Fan ovens cook more efficiently, so you need to adjust.
          </p>
          <p className="font-semibold">
            The rule: Reduce the temperature by 25°F (about 15°C), OR keep the same temperature and reduce cooking time by about 20–25%. Do NOT reduce both.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-center py-2 pr-4">Standard/Conventional Oven</th>
                  <th className="text-center py-2 pr-4">Fan/Convection Oven</th>
                  <th className="text-center py-2">Gas Mark Equivalent</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-center">300°F / 150°C</td>
                  <td className="py-2 pr-4 text-center">275°F / 135°C</td>
                  <td className="py-2 text-center">2 → 1</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 text-center">325°F / 160°C</td>
                  <td className="py-2 pr-4 text-center">300°F / 150°C</td>
                  <td className="py-2 text-center">3 → 2</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-center">350°F / 175°C</td>
                  <td className="py-2 pr-4 text-center">325°F / 160°C</td>
                  <td className="py-2 text-center">4 → 3</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 text-center">375°F / 190°C</td>
                  <td className="py-2 pr-4 text-center">350°F / 175°C</td>
                  <td className="py-2 text-center">5 → 4</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-center">400°F / 200°C</td>
                  <td className="py-2 pr-4 text-center">375°F / 190°C</td>
                  <td className="py-2 text-center">6 → 5</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 text-center">425°F / 220°C</td>
                  <td className="py-2 pr-4 text-center">400°F / 200°C</td>
                  <td className="py-2 text-center">7 → 6</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-center">450°F / 230°C</td>
                  <td className="py-2 pr-4 text-center">425°F / 220°C</td>
                  <td className="py-2 text-center">8 → 7</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 text-center">475°F / 245°C</td>
                  <td className="py-2 pr-4 text-center">450°F / 230°C</td>
                  <td className="py-2 text-center">9 → 8</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Vintage Recipe Temperature Terms
          </h3>
          <p>
            Recipes from before the 1950s often used descriptive terms instead of exact temperatures. Here's your translation guide:
          </p>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Vintage Term</th>
                  <th className="text-center py-2 pr-4">°F Range</th>
                  <th className="text-center py-2 pr-4">°C Range</th>
                  <th className="text-center py-2 pr-4">Gas Mark</th>
                  <th className="text-left py-2">Modern Interpretation</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">"Very slow oven"</td>
                  <td className="py-2 pr-4 text-center">225-275°F</td>
                  <td className="py-2 pr-4 text-center">110-135°C</td>
                  <td className="py-2 pr-4 text-center">¼-1</td>
                  <td className="py-2">Use for meringues, slow braises</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">"Slow oven"</td>
                  <td className="py-2 pr-4 text-center">275-325°F</td>
                  <td className="py-2 pr-4 text-center">135-165°C</td>
                  <td className="py-2 pr-4 text-center">1-3</td>
                  <td className="py-2">300°F is a safe middle choice</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">"Moderate oven"</td>
                  <td className="py-2 pr-4 text-center">325-375°F</td>
                  <td className="py-2 pr-4 text-center">165-190°C</td>
                  <td className="py-2 pr-4 text-center">3-5</td>
                  <td className="py-2">350°F for most uses</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">"Moderately hot oven"</td>
                  <td className="py-2 pr-4 text-center">375-400°F</td>
                  <td className="py-2 pr-4 text-center">190-200°C</td>
                  <td className="py-2 pr-4 text-center">5-6</td>
                  <td className="py-2">Try 375°F first</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">"Hot oven"</td>
                  <td className="py-2 pr-4 text-center">400-450°F</td>
                  <td className="py-2 pr-4 text-center">200-230°C</td>
                  <td className="py-2 pr-4 text-center">6-8</td>
                  <td className="py-2">425°F is a good default</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4">"Very hot oven"</td>
                  <td className="py-2 pr-4 text-center">450-500°F</td>
                  <td className="py-2 pr-4 text-center">230-260°C</td>
                  <td className="py-2 pr-4 text-center">8-10</td>
                  <td className="py-2">475°F; watch carefully</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Oven Thermometer Buying Guide */}
      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl prose prose-lg">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            Oven Thermometer Buying Guide
          </h2>
          <p>
            Since most home ovens are off by 25°F or more, an oven thermometer is essential for accurate baking. Here's what to look for:
          </p>

          <div className="overflow-x-auto mt-6">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Type</th>
                  <th className="text-center py-2 pr-4">Price Range</th>
                  <th className="text-left py-2 pr-4">Pros</th>
                  <th className="text-left py-2">Cons</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">Dial thermometer</td>
                  <td className="py-2 pr-4 text-center">$5-15</td>
                  <td className="py-2 pr-4">Inexpensive, durable, no batteries</td>
                  <td className="py-2">Slower to read, less precise (±10°F)</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">Digital probe (wired)</td>
                  <td className="py-2 pr-4 text-center">$15-40</td>
                  <td className="py-2 pr-4">Very accurate (±1°F), alerts</td>
                  <td className="py-2">Wire in oven door, needs batteries</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">Digital (wireless/Bluetooth)</td>
                  <td className="py-2 pr-4 text-center">$50-100+</td>
                  <td className="py-2 pr-4">Phone alerts, multiple probes</td>
                  <td className="py-2">Expensive, battery dependent</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-4 font-medium">Infrared (surface)</td>
                  <td className="py-2 pr-4 text-center">$20-50</td>
                  <td className="py-2 pr-4">Instant read, no contact</td>
                  <td className="py-2">Only measures surfaces, not air temp</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4">
            <strong>Recommendation:</strong> Start with a basic dial thermometer ($10) to learn your oven's quirks. Place it in the center of the oven and check it every few months — ovens drift over time.
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
              href="/air-fryer-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Air Fryer Converter</h3>
              <p className="text-sm text-gray-600">Convert oven temps and times to air fryer settings</p>
            </Link>
            <Link
              href="/convection-oven-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Convection Oven Converter</h3>
              <p className="text-sm text-gray-600">Adjust temps for fan-forced ovens</p>
            </Link>
            <Link
              href="/meat-temperature-chart"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Meat Temperature Chart</h3>
              <p className="text-sm text-gray-600">Internal temps for doneness levels</p>
            </Link>
            <Link
              href="/meat-cooking-time-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Meat Cooking Time Calculator</h3>
              <p className="text-sm text-gray-600">Calculate cooking times for any cut</p>
            </Link>
            <Link
              href="/turkey-cooking-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Turkey Cooking Calculator</h3>
              <p className="text-sm text-gray-600">Perfect holiday turkey timing</p>
            </Link>
            <Link
              href="/microwave-to-oven-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Microwave to Oven Converter</h3>
              <p className="text-sm text-gray-600">Convert microwave recipes to oven</p>
            </Link>
            <Link
              href="/slow-cooker-to-oven-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Slow Cooker to Oven</h3>
              <p className="text-sm text-gray-600">Convert crockpot recipes to oven</p>
            </Link>
            <Link
              href="/pizza-dough-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Pizza Dough Calculator</h3>
              <p className="text-sm text-gray-600">Perfect dough for any pizza style</p>
            </Link>
            <Link
              href="/sourdough-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Sourdough Calculator</h3>
              <p className="text-sm text-gray-600">Calculate hydration and ratios</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Authority Sources Footer */}
      <section className="py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-sm text-gray-500 text-center">
            Temperature guidelines informed by{" "}
            <a href="https://www.energy.gov/energysaver/kitchen-appliances" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">
              U.S. Department of Energy
            </a>
            {" • "}
            <a href="https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/safe-temperature-chart" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">
              USDA Food Safety
            </a>
            {" • "}
            <a href="https://www.foodsafety.gov/food-safety-charts/safe-minimum-cooking-temperature" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">
              FoodSafety.gov
            </a>
            {" • "}
            <a href="https://www.bbcgoodfood.com/howto/guide/oven-temperature-conversion-guide" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">
              BBC Good Food
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
