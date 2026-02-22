import { Metadata } from "next";
import Link from "next/link";
import SlowCookerConverter from "@/components/calculators/SlowCookerConverter";
import { FAQPageJsonLd, WebApplicationJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Slow Cooker to Oven Converter Calculator (+ Instant Pot & Dutch Oven) | CalcKitchen",
  description: "Convert slow cooker recipes to oven, Instant Pot, Dutch oven, and stovetop — and back. Includes time charts, liquid adjustments, and a free converter calculator.",
  openGraph: {
    title: "Slow Cooker to Oven Converter Calculator (+ Instant Pot & Dutch Oven)",
    description: "Convert slow cooker recipes to oven, Instant Pot, Dutch oven, and stovetop — and back. Includes time charts, liquid adjustments, and a free converter calculator.",
    url: "https://calckitchen.com/slow-cooker-to-oven-converter",
    type: "website",
  },
  alternates: {
    canonical: "https://calckitchen.com/slow-cooker-to-oven-converter",
  },
};

const faqs = [
  {
    question: "Can I convert any slow cooker recipe to the oven?",
    answer: "Most slow cooker recipes convert well to the oven — especially stews, braises, soups, and roasts. Recipes that rely on the slow cooker's sealed environment (like some bread recipes) may need adjustment. The key is using a covered pot (Dutch oven or casserole dish with lid) and the right temperature.",
  },
  {
    question: "What temperature should I set my oven to when converting from a slow cooker?",
    answer: "Use 325°F (165°C) for most conversions — this mimics the slow cooker's low, even heat. For faster results, 350°F works but requires more liquid and closer monitoring. Never go below 300°F for food safety.",
  },
  {
    question: "How do I convert an Instant Pot recipe to a slow cooker?",
    answer: "Multiply pressure cooking time by 8 for slow cooker HIGH or 16 for slow cooker LOW. A 30-minute Instant Pot recipe becomes 4 hours on HIGH or 8 hours on LOW. Add 25-50% more liquid since slow cookers evaporate more than pressure cookers.",
  },
  {
    question: "Do I need to adjust liquid when converting cooking methods?",
    answer: "Yes. Slow cookers trap moisture, so recipes have less liquid. When converting to oven, keep the same amount but use a covered pot. For Instant Pot, reduce liquid by about half (but keep at least 1 cup for the pot to pressurize). For stovetop, reduce liquid by about 25%.",
  },
  {
    question: "How do I convert a Dutch oven recipe to a slow cooker?",
    answer: "Dutch oven to slow cooker: multiply time by 3-4×. A 2-hour Dutch oven braise becomes 6-8 hours on LOW or 3-4 hours on HIGH. Add 25% more liquid since slow cookers don't brown or reduce sauces the same way.",
  },
  {
    question: "What's the difference between slow cooker LOW and HIGH settings?",
    answer: "Both settings reach the same final temperature (~209°F), but HIGH gets there faster. LOW takes 7-8 hours to reach temperature; HIGH takes 3-4 hours. Use LOW for tougher cuts that need more time to break down collagen. HIGH works for quicker dishes or when you're short on time.",
  },
  {
    question: "Can I leave a slow cooker on all day while at work?",
    answer: "Yes, that's what slow cookers are designed for. Modern slow cookers are safe to leave unattended for 8-10 hours on LOW. Don't exceed the recommended cook time though — food can overcook and dry out. Never leave on WARM for more than 2 hours.",
  },
  {
    question: "How do I convert slow cooker time from LOW to HIGH?",
    answer: "As a general rule: 1 hour on HIGH = 2 hours on LOW. An 8-hour LOW recipe becomes 4 hours on HIGH. Note that some tough cuts benefit from the longer LOW cooking time even if HIGH would work faster.",
  },
  {
    question: "Why did my slow cooker recipe turn out watery?",
    answer: "Slow cookers trap almost all moisture that evaporates from food. If converting from a stovetop or oven recipe, reduce the liquid by 25-50%. Also, avoid lifting the lid during cooking — each peek releases steam and extends cooking time by 15-20 minutes.",
  },
  {
    question: "Can I convert a braised recipe meant for the stovetop to a slow cooker?",
    answer: "Yes, but brown the meat first on the stovetop for better flavor since slow cookers can't sear. Multiply stovetop braising time by 4× for slow cooker LOW. A 1.5-hour stovetop braise becomes about 6 hours on LOW or 3 hours on HIGH.",
  },
  {
    question: "How do I know when my converted recipe is done?",
    answer: "For meat: use an instant-read thermometer. Beef and pork should reach 145°F minimum; poultry 165°F. For braises, meat should be fork-tender and easily shred. For stews, vegetables should be soft and flavors well-melded. Times are estimates — always check doneness.",
  },
  {
    question: "Is it safe to convert slow cooker recipes to shorter methods?",
    answer: "Yes, as long as food reaches safe internal temperatures. The danger zone (40-140°F) should be passed within 4 hours. Oven and stovetop methods heat food faster, so they're inherently safer. For slow cookers, avoid starting with frozen meat and don't cook on WARM setting.",
  },
];

export default function SlowCookerConverterPage() {
  return (
    <div className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Slow Cooker to Oven Converter"
        description="Convert cooking times between slow cooker, oven, Instant Pot, Dutch oven, and stovetop. Get time and liquid adjustments automatically."
        url="https://calckitchen.com/slow-cooker-to-oven-converter"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Slow Cooker Converter", url: "https://calckitchen.com/slow-cooker-to-oven-converter" },
        ]}
      />

      {/* Hero Section with Calculator */}
      <section className="bg-gradient-to-b from-warm-white to-white py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Slow Cooker to Oven Converter
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Convert cooking times between slow cooker, oven, Instant Pot, stovetop, and Dutch oven — with automatic liquid adjustments and helpful tips.
          </p>

          {/* Calculator Component */}
          <SlowCookerConverter />
        </div>
      </section>

      {/* Real-World Examples Section */}
      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Cooking Method Conversion Examples: 6 Real-World Scenarios
          </h2>
          <p className="text-gray-700 mb-8">
            See how to convert popular recipes between slow cookers, ovens, Instant Pots, and stovetops with these practical examples.
          </p>

          {/* Example 1 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Slow Cooker Pot Roast → Oven Dutch Oven</h3>
                <p className="text-gray-600 mb-4">
                  Your favorite slow cooker pot roast takes 8 hours on LOW, but you forgot to start it this morning and have only 3 hours before dinner. Convert it to the oven for a faster weeknight meal.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Original Slow Cooker Recipe:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>3-4 lb chuck roast</li>
                    <li>8 hours on LOW</li>
                    <li>2 cups beef broth</li>
                    <li>Vegetables added at start</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Converted for Oven Dutch Oven:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li><strong>Time:</strong> 2.5-3 hours at 325°F (8 hours LOW ÷ 3 ≈ 2.7 hours)</li>
                    <li><strong>Temperature:</strong> 325°F, covered</li>
                    <li><strong>Liquid:</strong> Keep 2 cups (covered pot traps moisture)</li>
                    <li><strong>Key step:</strong> Sear roast 3 min per side before braising</li>
                    <li><strong>Vegetables:</strong> Add carrots/potatoes after 1.5 hours (they cook faster in oven)</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> The oven version will have better browning and a more concentrated sauce. Remove the lid for the last 30 minutes to reduce the liquid if you want a thicker gravy.
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
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Instant Pot Chicken Curry → Slow Cooker</h3>
                <p className="text-gray-600 mb-4">
                  You love your 25-minute Instant Pot chicken curry but want to prep it in the morning and have it ready when you get home from work. Here's how to convert it for the slow cooker.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Original Instant Pot Recipe:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>2 lbs chicken thighs</li>
                    <li>25 minutes high pressure + natural release</li>
                    <li>1 cup coconut milk</li>
                    <li>½ cup chicken broth</li>
                    <li>Curry paste, onions, garlic</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Converted for Slow Cooker:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li><strong>Time:</strong> 6-8 hours on LOW or 3-4 hours on HIGH</li>
                    <li><strong>Calculation:</strong> 25 min × 16 = 400 min ≈ 6.7 hours on LOW</li>
                    <li><strong>Liquid:</strong> Increase to 1.5 cups coconut milk + ¾ cup broth (+50%)</li>
                    <li><strong>Order:</strong> Layer onions on bottom, chicken on top, pour sauce over</li>
                    <li><strong>Coconut milk:</strong> Add half at start, half in last hour to prevent separation</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Sear the chicken briefly in a hot pan before adding to the slow cooker for better flavor. Add a splash of lime juice and fresh cilantro at the end — the slow cooker mutes bright flavors.
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
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Stovetop Beef Stew → Slow Cooker (Set and Forget)</h3>
                <p className="text-gray-600 mb-4">
                  Your grandmother's beef stew recipe requires 2 hours of stovetop simmering and constant monitoring. Convert it to a slow cooker so you can prep it before work.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Original Stovetop Recipe:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>2 lbs stew beef, cubed</li>
                    <li>2 hours at a low simmer, covered</li>
                    <li>4 cups beef broth</li>
                    <li>Potatoes, carrots, onions, celery</li>
                    <li>Requires stirring every 20-30 minutes</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Converted for Slow Cooker:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li><strong>Time:</strong> 8 hours on LOW or 4 hours on HIGH (2 hours × 4)</li>
                    <li><strong>Liquid:</strong> Reduce to 3 cups broth (25% less — slow cooker traps moisture)</li>
                    <li><strong>Prep:</strong> Brown beef in a hot skillet first (slow cookers can't sear)</li>
                    <li><strong>Layering:</strong> Potatoes and carrots on bottom, beef on top</li>
                    <li><strong>No stirring needed!</strong> Don't lift the lid until done</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Toss beef cubes in flour before browning — this thickens the stew naturally. Add peas and fresh herbs in the last 30 minutes on HIGH so they don't turn to mush.
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
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Slow Cooker Pulled Pork → Instant Pot (Weeknight Speed)</h3>
                <p className="text-gray-600 mb-4">
                  Your pulled pork recipe calls for 10 hours in the slow cooker, but you want to make it tonight for tacos. Use the Instant Pot for dramatically faster results.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Original Slow Cooker Recipe:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>4-5 lb pork shoulder (bone-in)</li>
                    <li>10 hours on LOW</li>
                    <li>1 cup apple cider vinegar</li>
                    <li>1 cup chicken broth</li>
                    <li>Dry rub spices</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Converted for Instant Pot:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li><strong>Time:</strong> 60-75 minutes high pressure + 15 min natural release</li>
                    <li><strong>Calculation:</strong> 10 hours ÷ 8 = 75 min pressure time</li>
                    <li><strong>Liquid:</strong> ½ cup vinegar + ½ cup broth (reduce by 50%)</li>
                    <li><strong>Cut:</strong> Cut pork into 3-4 large chunks for faster cooking</li>
                    <li><strong>Sear:</strong> Use Sauté function to brown all sides first</li>
                    <li><strong>Total time:</strong> About 2 hours including searing and release</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> After shredding, return pork to the pot and toss with cooking liquid. Use the Sauté function for 5 minutes to reduce the liquid and concentrate flavor. The result rivals 10-hour slow-cooked pork!
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
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Dutch Oven Short Ribs → Slow Cooker (Hands-Off)</h3>
                <p className="text-gray-600 mb-4">
                  Your braised short ribs recipe requires 3 hours in a 325°F oven with occasional checking. Convert it to the slow cooker for a truly hands-off Sunday dinner.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Original Dutch Oven Recipe:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>4 lbs bone-in short ribs</li>
                    <li>3 hours at 325°F, covered</li>
                    <li>2 cups red wine</li>
                    <li>1 cup beef broth</li>
                    <li>Aromatics: onion, carrot, celery, garlic</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Converted for Slow Cooker:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li><strong>Time:</strong> 8-10 hours on LOW or 5-6 hours on HIGH (3 hours × 3)</li>
                    <li><strong>Liquid:</strong> 2.5 cups wine + 1.25 cups broth (increase 25%)</li>
                    <li><strong>Critical step:</strong> MUST sear ribs on stovetop first for flavor</li>
                    <li><strong>Aromatics:</strong> Sauté in the searing fat before adding to slow cooker</li>
                    <li><strong>Layering:</strong> Vegetables on bottom, ribs on top</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> The sauce won't reduce in a slow cooker. Transfer liquid to a saucepan and simmer for 15-20 minutes to thicken while the ribs rest. Alternatively, stir in 1 tablespoon cornstarch slurry in the last hour.
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
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Slow Cooker Chili → Stovetop (Quick Batch)</h3>
                <p className="text-gray-600 mb-4">
                  Your slow cooker chili normally takes 6 hours on LOW, but company is coming in 90 minutes and you just realized you forgot to start it. Here's the stovetop rescue.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Original Slow Cooker Recipe:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>2 lbs ground beef</li>
                    <li>6 hours on LOW</li>
                    <li>28 oz crushed tomatoes</li>
                    <li>2 cans beans</li>
                    <li>2 cups beef broth</li>
                    <li>Chili spices</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800 mb-2">Converted for Stovetop:</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li><strong>Time:</strong> 1-1.5 hours at a gentle simmer (6 hours ÷ 4-5)</li>
                    <li><strong>Liquid:</strong> 1.5 cups broth (reduce by 25% — stovetop evaporates more)</li>
                    <li><strong>Method:</strong> Brown beef well, add onions until soft, then liquids</li>
                    <li><strong>Heat:</strong> Bring to boil, then reduce to low simmer, partially covered</li>
                    <li><strong>Stirring:</strong> Every 15-20 minutes to prevent sticking</li>
                  </ul>
                </div>
                <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Stovetop chili benefits from a flavor boost — add a splash of coffee or cocoa powder to deepen the taste that would develop over hours of slow cooking. Taste and adjust seasonings more aggressively than usual.
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
            How Slow Cooker Conversion Works
          </h2>
          <p>
            Converting recipes between cooking methods isn't just about time — you also need to adjust temperature, liquid, and technique. Here's the science behind it.
          </p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Understanding Heat Differences
          </h3>
          <ul>
            <li><strong>Slow cookers</strong> use indirect, low heat (180-300°F) over many hours. They're sealed, so almost no moisture escapes.</li>
            <li><strong>Ovens</strong> use direct, radiant heat at higher temperatures. Even covered pots lose some moisture.</li>
            <li><strong>Pressure cookers (Instant Pot)</strong> trap steam under pressure, raising the boiling point to ~250°F. This tenderizes food much faster.</li>
            <li><strong>Stovetop/Dutch oven</strong> provides direct heat from below with some evaporation, even with a lid.</li>
          </ul>
        </div>
      </section>

      {/* Comprehensive Conversion Tables */}
      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Complete Cooking Method Conversion Charts
          </h2>

          {/* Master Conversion Table */}
          <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
            Master Time Conversion Table
          </h3>
          <p className="text-gray-700 mb-4">
            Use this comprehensive chart to convert cooking times between any two methods.
          </p>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full text-sm bg-white rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-3 px-4 font-semibold">Slow Cooker LOW</th>
                  <th className="text-left py-3 px-4 font-semibold">Slow Cooker HIGH</th>
                  <th className="text-left py-3 px-4 font-semibold">Oven (325°F)</th>
                  <th className="text-left py-3 px-4 font-semibold">Stovetop Simmer</th>
                  <th className="text-left py-3 px-4 font-semibold">Instant Pot</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4">2-3 hours</td>
                  <td className="px-4">1-1.5 hours</td>
                  <td className="px-4">30-45 min</td>
                  <td className="px-4">20-30 min</td>
                  <td className="px-4">8-12 min</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4">4-5 hours</td>
                  <td className="px-4">2-2.5 hours</td>
                  <td className="px-4">1-1.5 hours</td>
                  <td className="px-4">45-60 min</td>
                  <td className="px-4">15-20 min</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4">6-7 hours</td>
                  <td className="px-4">3-3.5 hours</td>
                  <td className="px-4">1.5-2 hours</td>
                  <td className="px-4">1-1.5 hours</td>
                  <td className="px-4">25-35 min</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4 font-medium">8-9 hours</td>
                  <td className="px-4 font-medium">4-4.5 hours</td>
                  <td className="px-4 font-medium">2-2.5 hours</td>
                  <td className="px-4 font-medium">1.5-2 hours</td>
                  <td className="px-4 font-medium">35-45 min</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4">10-11 hours</td>
                  <td className="px-4">5-5.5 hours</td>
                  <td className="px-4">2.5-3 hours</td>
                  <td className="px-4">2-2.5 hours</td>
                  <td className="px-4">45-55 min</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-2 px-4">12+ hours</td>
                  <td className="px-4">6+ hours</td>
                  <td className="px-4">3-4 hours</td>
                  <td className="px-4">2.5-3 hours</td>
                  <td className="px-4">60-75 min</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-amber-800">
              <strong>Note:</strong> Instant Pot times are pressure cooking only. Add 10-15 minutes for natural pressure release. Always use at least 1 cup liquid for pressure cooking.
            </p>
          </div>

          {/* Liquid Adjustment Table */}
          <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
            Liquid Adjustment Guide
          </h3>
          <p className="text-gray-700 mb-4">
            Different methods evaporate different amounts of liquid. Adjust accordingly:
          </p>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full text-sm bg-white rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-3 px-4 font-semibold">Converting From</th>
                  <th className="text-left py-3 px-4 font-semibold">Converting To</th>
                  <th className="text-center py-3 px-4 font-semibold">Liquid Adjustment</th>
                  <th className="text-left py-3 px-4 font-semibold">Example (2 cups original)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4 font-medium">Slow Cooker</td>
                  <td className="px-4">Oven (covered)</td>
                  <td className="text-center px-4">Same amount</td>
                  <td className="px-4">2 cups</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4 font-medium">Slow Cooker</td>
                  <td className="px-4">Oven (uncovered)</td>
                  <td className="text-center px-4">+25%</td>
                  <td className="px-4">2.5 cups</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4 font-medium">Slow Cooker</td>
                  <td className="px-4">Instant Pot</td>
                  <td className="text-center px-4 font-semibold text-coral">-50% (min 1 cup)</td>
                  <td className="px-4">1 cup</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4 font-medium">Slow Cooker</td>
                  <td className="px-4">Stovetop</td>
                  <td className="text-center px-4">-25%</td>
                  <td className="px-4">1.5 cups</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4 font-medium">Oven</td>
                  <td className="px-4">Slow Cooker</td>
                  <td className="text-center px-4">+25%</td>
                  <td className="px-4">2.5 cups</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4 font-medium">Instant Pot</td>
                  <td className="px-4">Slow Cooker</td>
                  <td className="text-center px-4 font-semibold text-coral">+50%</td>
                  <td className="px-4">3 cups</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4 font-medium">Stovetop</td>
                  <td className="px-4">Slow Cooker</td>
                  <td className="text-center px-4">+25%</td>
                  <td className="px-4">2.5 cups</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-2 px-4 font-medium">Stovetop</td>
                  <td className="px-4">Instant Pot</td>
                  <td className="text-center px-4">-25% (min 1 cup)</td>
                  <td className="px-4">1.5 cups</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Temperature Reference */}
          <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
            Temperature & Setting Equivalents
          </h3>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full text-sm bg-white rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-3 px-4 font-semibold">Cooking Method</th>
                  <th className="text-center py-3 px-4 font-semibold">Temperature Range</th>
                  <th className="text-left py-3 px-4 font-semibold">Best For</th>
                  <th className="text-left py-3 px-4 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4 font-medium">Slow Cooker LOW</td>
                  <td className="text-center px-4">190-200°F</td>
                  <td className="px-4">Tough cuts, all-day cooking</td>
                  <td className="px-4">Takes 7-8 hrs to reach temp</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4 font-medium">Slow Cooker HIGH</td>
                  <td className="text-center px-4">200-212°F</td>
                  <td className="px-4">Quicker braises, stews</td>
                  <td className="px-4">Takes 3-4 hrs to reach temp</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4 font-medium">Slow Cooker WARM</td>
                  <td className="text-center px-4">145-165°F</td>
                  <td className="px-4">Holding only (not cooking)</td>
                  <td className="px-4">Max 2-4 hours for safety</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4 font-medium">Oven (slow braise)</td>
                  <td className="text-center px-4">300-325°F</td>
                  <td className="px-4">Pot roasts, short ribs</td>
                  <td className="px-4">Most equivalent to slow cooker</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4 font-medium">Oven (faster braise)</td>
                  <td className="text-center px-4">350°F</td>
                  <td className="px-4">Chicken, quick braises</td>
                  <td className="px-4">Monitor liquid levels</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4 font-medium">Stovetop simmer</td>
                  <td className="text-center px-4">185-200°F</td>
                  <td className="px-4">Soups, stews</td>
                  <td className="px-4">Small bubbles breaking surface</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-medium">Instant Pot (pressure)</td>
                  <td className="text-center px-4">~250°F</td>
                  <td className="px-4">All braises and stews</td>
                  <td className="px-4">Higher temp = faster cooking</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Dish-Specific Conversion Guide */}
          <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
            Dish-Specific Conversion Times
          </h3>
          <p className="text-gray-700 mb-4">
            Quick reference for common dishes across all cooking methods:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm bg-white rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-3 px-4 font-semibold">Dish</th>
                  <th className="text-center py-3 px-4 font-semibold">Slow Cooker LOW</th>
                  <th className="text-center py-3 px-4 font-semibold">Slow Cooker HIGH</th>
                  <th className="text-center py-3 px-4 font-semibold">Oven 325°F</th>
                  <th className="text-center py-3 px-4 font-semibold">Instant Pot</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4 font-medium">Pot Roast (3-4 lb)</td>
                  <td className="text-center px-4">8-10 hrs</td>
                  <td className="text-center px-4">4-5 hrs</td>
                  <td className="text-center px-4">2.5-3 hrs</td>
                  <td className="text-center px-4">60-75 min</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4 font-medium">Pulled Pork (4-5 lb)</td>
                  <td className="text-center px-4">10-12 hrs</td>
                  <td className="text-center px-4">5-6 hrs</td>
                  <td className="text-center px-4">3-4 hrs</td>
                  <td className="text-center px-4">75-90 min</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4 font-medium">Beef Stew</td>
                  <td className="text-center px-4">8-10 hrs</td>
                  <td className="text-center px-4">4-5 hrs</td>
                  <td className="text-center px-4">2-2.5 hrs</td>
                  <td className="text-center px-4">35-45 min</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4 font-medium">Chicken Thighs</td>
                  <td className="text-center px-4">6-7 hrs</td>
                  <td className="text-center px-4">3-4 hrs</td>
                  <td className="text-center px-4">1-1.5 hrs</td>
                  <td className="text-center px-4">15-20 min</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4 font-medium">Whole Chicken</td>
                  <td className="text-center px-4">6-8 hrs</td>
                  <td className="text-center px-4">3-4 hrs</td>
                  <td className="text-center px-4">1.5-2 hrs</td>
                  <td className="text-center px-4">25-30 min</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4 font-medium">Short Ribs</td>
                  <td className="text-center px-4">8-10 hrs</td>
                  <td className="text-center px-4">4-5 hrs</td>
                  <td className="text-center px-4">2.5-3 hrs</td>
                  <td className="text-center px-4">45-55 min</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4 font-medium">Chili</td>
                  <td className="text-center px-4">6-8 hrs</td>
                  <td className="text-center px-4">3-4 hrs</td>
                  <td className="text-center px-4">1.5-2 hrs</td>
                  <td className="text-center px-4">20-25 min</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 px-4 font-medium">Beans (dried, soaked)</td>
                  <td className="text-center px-4">6-8 hrs</td>
                  <td className="text-center px-4">3-4 hrs</td>
                  <td className="text-center px-4">1.5-2 hrs</td>
                  <td className="text-center px-4">25-35 min</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-medium">Soup/Broth</td>
                  <td className="text-center px-4">6-8 hrs</td>
                  <td className="text-center px-4">3-4 hrs</td>
                  <td className="text-center px-4">1-1.5 hrs</td>
                  <td className="text-center px-4">15-20 min</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Method-Specific Tips */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl prose prose-lg">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            Method-Specific Tips & Best Practices
          </h2>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-6 mb-4">
            Converting to Oven
          </h3>
          <ul>
            <li>Use a Dutch oven or heavy pot with a tight-fitting lid</li>
            <li>Brown meat first for better flavor — slow cookers can't do this</li>
            <li>Set oven to 325°F for low, slow braising (closest to slow cooker)</li>
            <li>Check for doneness 15-20 minutes before expected time</li>
            <li>Remove lid for last 20-30 minutes to reduce sauce</li>
            <li>Position rack in lower-middle for most even heat</li>
          </ul>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Converting to Instant Pot
          </h3>
          <ul>
            <li>Use the Sauté function to brown meat before pressure cooking</li>
            <li>Ensure at least 1 cup of liquid for the pot to pressurize</li>
            <li>Use natural release for tender meat (don't quick release)</li>
            <li>Add delicate vegetables after pressure cooking using Sauté</li>
            <li>Thicken sauces using Sauté mode after pressure cooking</li>
            <li>Deglaze pan after searing before adding liquid</li>
          </ul>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Converting to Slow Cooker
          </h3>
          <ul>
            <li>Sear meat on the stovetop before adding to slow cooker</li>
            <li>Put dense root vegetables on the bottom, closest to the heat</li>
            <li>Don't lift the lid during cooking — each peek adds 15-20 minutes</li>
            <li>Dairy and pasta should be added in the last 30 minutes</li>
            <li>Fill slow cooker ½ to ⅔ full for best results</li>
            <li>Reduce liquid by 25-50% from stovetop/oven recipes</li>
          </ul>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Foods That Don't Convert Well
          </h3>
          <ul>
            <li><strong>Pasta:</strong> Gets mushy in slow cookers. Add in last 20-30 minutes on HIGH, or cook separately.</li>
            <li><strong>Dairy:</strong> Can curdle with long cooking. Stir in cream/cheese at the end.</li>
            <li><strong>Delicate fish:</strong> Overcooks easily. Better suited for stovetop or oven.</li>
            <li><strong>Crispy items:</strong> Slow cookers steam food. Anything meant to be crispy should be finished under a broiler.</li>
            <li><strong>Fresh herbs:</strong> Lose flavor with long cooking. Add at the end or use hardy herbs like rosemary/thyme.</li>
            <li><strong>Rice:</strong> Tends to get mushy. Cook separately and add at serving.</li>
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
              href="/convection-oven-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Convection Oven Converter</h3>
              <p className="text-sm text-gray-600">Adjust temp and time for convection cooking</p>
            </Link>
            <Link
              href="/meat-cooking-time-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Meat Cooking Calculator</h3>
              <p className="text-sm text-gray-600">Cooking times for all cuts and methods</p>
            </Link>
            <Link
              href="/oven-temperature-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Oven Temperature Converter</h3>
              <p className="text-sm text-gray-600">Convert °F to °C and gas marks</p>
            </Link>
            <Link
              href="/meat-temperature-chart"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Meat Temperature Chart</h3>
              <p className="text-sm text-gray-600">Safe internal temperatures for all meats</p>
            </Link>
            <Link
              href="/turkey-cooking-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Turkey Cooking Calculator</h3>
              <p className="text-sm text-gray-600">Perfect timing for whole turkeys</p>
            </Link>
            <Link
              href="/air-fryer-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Air Fryer Converter</h3>
              <p className="text-sm text-gray-600">Convert oven recipes to air fryer</p>
            </Link>
            <Link
              href="/recipe-scaler"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Recipe Scaler</h3>
              <p className="text-sm text-gray-600">Double, halve, or resize any recipe</p>
            </Link>
            <Link
              href="/microwave-to-oven-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Microwave to Oven Converter</h3>
              <p className="text-sm text-gray-600">Convert microwave times to oven</p>
            </Link>
            <Link
              href="/party-food-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Party Food Calculator</h3>
              <p className="text-sm text-gray-600">Plan quantities for large gatherings</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Authority Sources Footer */}
      <section className="py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-sm text-gray-500 text-center">
            Food safety information based on guidelines from{" "}
            <a href="https://www.fsis.usda.gov/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">USDA FSIS</a>
            {" "}&bull;{" "}
            <a href="https://www.foodsafety.gov/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">FoodSafety.gov</a>
            {" "}&bull;{" "}
            <a href="https://www.cdc.gov/foodsafety/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">CDC Food Safety</a>
            {" "}&bull;{" "}
            <a href="https://www.seriouseats.com/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">Serious Eats</a>
            {" "}&bull;{" "}
            <a href="https://www.americastestkitchen.com/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">America's Test Kitchen</a>
          </p>
        </div>
      </section>
    </div>
  );
}
