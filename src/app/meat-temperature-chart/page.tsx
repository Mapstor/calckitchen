import { Metadata } from "next";
import Link from "next/link";
import MeatTemperatureChart from "@/components/calculators/MeatTemperatureChart";
import { FAQPageJsonLd, WebApplicationJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Meat Internal Temperature Chart — USDA Safe Cooking Temps & Doneness Guide | CalcKitchen",
  description: "Complete internal temperature chart for beef, pork, chicken, lamb, turkey, fish, and more. Includes USDA safe temps, doneness levels, resting times, and carryover cooking guide.",
  openGraph: {
    title: "Meat Internal Temperature Chart — USDA Safe Cooking Temps & Doneness Guide",
    description: "Complete internal temperature chart for beef, pork, chicken, lamb, turkey, fish, and more. Includes USDA safe temps, doneness levels, resting times, and carryover cooking guide.",
    url: "https://calckitchen.com/meat-temperature-chart",
    type: "website",
  },
  alternates: {
    canonical: "https://calckitchen.com/meat-temperature-chart",
  },
};

const faqs = [
  {
    question: "What temperature kills bacteria in meat?",
    answer: "Most foodborne pathogens (salmonella, E. coli, listeria) are killed at 165°F (74°C) instantly. At lower temperatures like 145°F (63°C), bacteria are killed over time — which is why the USDA recommends a 3-minute rest at 145°F for whole cuts. The combination of temperature and time achieves the same level of food safety.",
  },
  {
    question: "Is pink pork safe to eat?",
    answer: "Yes. Since 2011, the USDA has recommended cooking whole pork cuts to 145°F with a 3-minute rest. At this temperature, pork will have a slightly pink center, which is perfectly safe. The old recommendation of 160°F was based on concerns about trichinosis, which has been effectively eliminated in commercially raised pigs.",
  },
  {
    question: "Can I eat steak rare?",
    answer: "Whole-muscle steaks are generally safe at lower temperatures because bacteria exist primarily on the surface, which is killed by searing. The USDA recommends 145°F minimum, but many restaurants serve steaks rare (125°F) and medium-rare (135°F). People with compromised immune systems, pregnant women, young children, and the elderly should follow USDA minimums.",
  },
  {
    question: "What's the USDA minimum for chicken?",
    answer: "All chicken (whole, breasts, thighs, ground) must reach 165°F (74°C). There is no safe lower temperature for poultry under standard home cooking methods. If using sous vide, lower temperatures can be safe when held for extended periods, but that's a specialized technique requiring precise equipment.",
  },
  {
    question: "Do I really need a meat thermometer?",
    answer: "Yes. The \"poke test\" and \"juices run clear\" methods are unreliable. Studies show that visual assessment correctly identifies doneness less than 50% of the time. A basic instant-read thermometer costs about $15 and takes 2–3 seconds to give you a definitive answer. It's the single most impactful tool upgrade for any home cook.",
  },
  {
    question: "What does \"let the meat rest\" actually do?",
    answer: "During cooking, heat drives moisture toward the center. If you cut immediately, those concentrated juices run out onto the cutting board. Resting allows the temperature to equalize, the muscle fibers to relax, and the juices to redistribute throughout the meat. The result is more juice in every bite and less on your plate.",
  },
  {
    question: "How accurate are oven-safe leave-in thermometers?",
    answer: "Most analog (dial) leave-in thermometers are accurate to within ±2–3°F. Digital probe thermometers are accurate to ±1°F and respond faster. For the best results, use a digital instant-read thermometer for spot-checking and a digital probe with a cable or wireless transmitter for monitoring roasts and whole birds in the oven.",
  },
  {
    question: "Where should I insert the thermometer?",
    answer: "Always insert into the thickest part of the meat, avoiding bone (which conducts heat differently). For steaks, insert horizontally from the side into the center. For roasts and whole poultry, insert into the deepest part of the thigh (for birds) or the center of the thickest section. For burgers and chops, insert from the side into the middle.",
  },
  {
    question: "Why do restaurant steaks taste better than mine?",
    answer: "Restaurants typically use higher heat (often 700°F+ broilers or cast iron), better marbling grades (Prime vs Choice), and most importantly — precise temperature control. They pull steaks 5–10°F before target and rest them properly. Home cooks often overcook because they don't account for carryover cooking or skip the resting period.",
  },
  {
    question: "What's the difference between 'pull temperature' and 'final temperature'?",
    answer: "Pull temperature is when you remove the meat from heat. Final temperature is after resting, when carryover cooking has finished. For a medium-rare steak, you pull at 130°F and rest until it reaches 135°F. Always target pull temperature when cooking — final temperature handles itself during rest.",
  },
  {
    question: "Is ground meat more dangerous than whole cuts?",
    answer: "Yes. Bacteria on whole cuts exist primarily on the surface, which is killed by searing. When meat is ground, surface bacteria gets mixed throughout, so the entire patty must reach safe temperature. This is why ground beef requires 160°F (no pink) while a whole steak can be served rare (125°F) safely.",
  },
  {
    question: "How do I calibrate my meat thermometer?",
    answer: "Use the ice bath method: Fill a glass with crushed ice and cold water. Submerge the thermometer probe for 30 seconds — it should read 32°F (0°C). For boiling point, submerge in rolling boil — it should read 212°F (100°C) at sea level. Adjust for altitude (1°F lower per 500 feet). If off by more than 2°F, calibrate or replace.",
  },
];

export default function MeatTemperatureChartPage() {
  return (
    <div className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Meat Temperature Chart"
        description="Interactive meat internal temperature chart covering beef, pork, chicken, lamb, turkey, and fish. USDA safe temps, doneness levels, and carryover cooking guide."
        url="https://calckitchen.com/meat-temperature-chart"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Meat Temperature Chart", url: "https://calckitchen.com/meat-temperature-chart" },
        ]}
      />

      {/* Hero Section with Calculator */}
      <section className="bg-gradient-to-b from-warm-white to-white py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Safe Meat Cooking Temperatures — USDA Chart
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Complete internal temperature chart for beef, pork, chicken, lamb, turkey, fish, and more. Includes USDA safe temps, doneness levels, and carryover cooking guide.
          </p>

          {/* Chart Component */}
          <MeatTemperatureChart />
        </div>
      </section>

      {/* Real-World Examples Section */}
      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Real-World Temperature Scenarios
          </h2>
          <p className="text-gray-700 mb-8">
            See how to apply safe cooking temperatures in common kitchen situations with step-by-step guidance.
          </p>

          {/* Example 1 */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-3">Example 1: Perfect Medium-Rare Ribeye Steak</h3>
            <p className="text-gray-700 mb-4">
              You're cooking a 1.5-inch thick ribeye for dinner and want a warm red center. What temperature do you target?
            </p>
            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-gray-600 mb-1">Situation:</p>
              <p className="text-gray-900">1.5" ribeye, target: medium-rare (135°F final)</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-emerald-800 mb-1">Temperature Guide:</p>
              <p className="text-emerald-900 font-semibold">Pull at 130°F → Rest 5 minutes → Final temp 135°F</p>
              <p className="text-emerald-700 text-sm mt-1">Carryover: A 1.5" steak rises ~5°F during rest. Insert thermometer horizontally from the side.</p>
            </div>
            <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
              <p className="text-sm text-gray-700"><strong>Pro Tip:</strong> Let the steak rest on a wire rack, not a plate. A plate traps steam underneath, making the bottom soggy. For a better crust, pat the steak dry, season, and let it sit uncovered in the fridge for 1-2 hours before cooking.</p>
            </div>
          </div>

          {/* Example 2 */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-3">Example 2: Roast Chicken Without Dry Breast Meat</h3>
            <p className="text-gray-700 mb-4">
              You're roasting a 4-pound chicken and want juicy breast meat, but the thighs need a higher temperature. How do you manage both?
            </p>
            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-gray-600 mb-1">Situation:</p>
              <p className="text-gray-900">4 lb whole chicken — breast needs 165°F, thighs better at 175-180°F</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-emerald-800 mb-1">Temperature Guide:</p>
              <p className="text-emerald-900 font-semibold">Pull when breast hits 160°F → Rest 10 min → Breast reaches 165°F, thighs reach 175°F</p>
              <p className="text-emerald-700 text-sm mt-1">The thighs are closer to the heat source and have more connective tissue, so they naturally run hotter.</p>
            </div>
            <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
              <p className="text-sm text-gray-700"><strong>Pro Tip:</strong> For even cooking, let the chicken sit at room temperature 30 minutes before roasting. Start breast-side down for the first 20 minutes, then flip — this protects the breast while jump-starting the thighs.</p>
            </div>
          </div>

          {/* Example 3 */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-3">Example 3: Juicy Pork Tenderloin (Not Dry)</h3>
            <p className="text-gray-700 mb-4">
              Your family always cooked pork to 160°F and it was dry. You've heard the guidelines changed. What's the new target?
            </p>
            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-gray-600 mb-1">Situation:</p>
              <p className="text-gray-900">1.5 lb pork tenderloin — want juicy, safe-to-eat result</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-emerald-800 mb-1">Temperature Guide:</p>
              <p className="text-emerald-900 font-semibold">Pull at 140°F → Rest 5-10 min → Final temp 145°F (USDA safe)</p>
              <p className="text-emerald-700 text-sm mt-1">The center will be slightly pink at 145°F — this is safe and intentional per USDA 2011 guidelines.</p>
            </div>
            <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
              <p className="text-sm text-gray-700"><strong>Pro Tip:</strong> Pork tenderloin is very lean and dries out quickly above 145°F. Consider brining (1/4 cup salt per quart water, 30 min) for extra moisture insurance. Sear on all sides first for a flavorful crust.</p>
            </div>
          </div>

          {/* Example 4 */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-3">Example 4: Prime Rib for the Holidays</h3>
            <p className="text-gray-700 mb-4">
              You're cooking a 10-pound standing rib roast for 12 guests. Everyone wants medium-rare. What's your temperature strategy?
            </p>
            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-gray-600 mb-1">Situation:</p>
              <p className="text-gray-900">10 lb prime rib (4 ribs) — target medium-rare throughout (135°F)</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-emerald-800 mb-1">Temperature Guide:</p>
              <p className="text-emerald-900 font-semibold">Pull at 120°F → Tent and rest 20-30 min → Final temp 133-135°F</p>
              <p className="text-emerald-700 text-sm mt-1">Large roasts have significant carryover (10-15°F). A leave-in probe thermometer is essential for a roast this size.</p>
            </div>
            <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
              <p className="text-sm text-gray-700"><strong>Pro Tip:</strong> Use the reverse sear method: Start at 250°F until internal temp reaches 115°F, then blast at 500°F for 10-15 minutes for the crust. This gives you edge-to-edge medium-rare instead of a gray band around the edges.</p>
            </div>
          </div>

          {/* Example 5 */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-3">Example 5: Safe Burgers at a Backyard BBQ</h3>
            <p className="text-gray-700 mb-4">
              You're grilling burgers for 20 people including kids. What temperature ensures they're safe without being hockey pucks?
            </p>
            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-gray-600 mb-1">Situation:</p>
              <p className="text-gray-900">Ground beef patties (¾" thick) — must be safe for vulnerable guests</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-emerald-800 mb-1">Temperature Guide:</p>
              <p className="text-emerald-900 font-semibold">Cook to 160°F internal — no pink, no exceptions for ground meat</p>
              <p className="text-emerald-700 text-sm mt-1">Ground beef mixes surface bacteria throughout, so the entire patty must reach safe temp. No rest period needed.</p>
            </div>
            <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
              <p className="text-sm text-gray-700"><strong>Pro Tip:</strong> To keep 160°F burgers juicy: add a panade (1 slice bread + 2 tbsp milk per pound), mix in a tablespoon of mayo, or create a dimple in the center to prevent puffing. Higher fat content (80/20) also helps retain moisture.</p>
            </div>
          </div>

          {/* Example 6 */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-3">Example 6: Salmon — Restaurant-Style vs. USDA-Safe</h3>
            <p className="text-gray-700 mb-4">
              Your recipe says "cook until salmon flakes easily" but you want that silky, translucent center like restaurants serve. What temp should you target?
            </p>
            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-gray-600 mb-1">Situation:</p>
              <p className="text-gray-900">1" thick salmon fillet — want restaurant texture but also considering guests</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-emerald-800 mb-1">Temperature Guide:</p>
              <p className="text-emerald-900 font-semibold">Restaurant-style: 120-125°F (translucent) | USDA-safe: 145°F (opaque, flaky)</p>
              <p className="text-emerald-700 text-sm mt-1">Compromise: 130-135°F gives a medium texture — slightly translucent center with lower risk than rare.</p>
            </div>
            <div className="bg-[#FFF5F3] border-l-4 border-[#E8604C] p-4 rounded-r-lg">
              <p className="text-sm text-gray-700"><strong>Pro Tip:</strong> For healthy adults, high-quality salmon from reputable sources at 120-130°F is generally considered safe (similar to medium-rare steak logic). For pregnant women, elderly, or immunocompromised guests, cook to the full 145°F USDA recommendation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl prose prose-lg">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            Why Internal Temperature Is the Only Reliable Doneness Test
          </h2>
          <p>
            Cooking time calculators, visual cues, and touch tests all have their place, but internal temperature is the only method that's both precise and safe. A 3-pound chicken can take anywhere from 60 to 90 minutes depending on your oven's accuracy, the bird's starting temperature, whether it was brined, and a dozen other variables. An instant-read thermometer eliminates all that guesswork in two seconds.
          </p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Beef Internal Temperatures
          </h3>
          <p>
            Beef offers the widest range of doneness options. The USDA recommends a minimum of 145°F (63°C) with a 3-minute rest for whole cuts (steaks, roasts). Ground beef requires 160°F (71°C) with no rest time needed.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Doneness</th>
                  <th className="text-center py-2 pr-4">Pull (°F)</th>
                  <th className="text-center py-2 pr-4">Pull (°C)</th>
                  <th className="text-center py-2 pr-4">After Rest</th>
                  <th className="text-center py-2 pr-4">Rest Time</th>
                  <th className="text-left py-2 pr-4">Appearance</th>
                  <th className="text-left py-2">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Blue Rare</td>
                  <td className="py-2 pr-4 text-center">115°F</td>
                  <td className="py-2 pr-4 text-center">46°C</td>
                  <td className="py-2 pr-4 text-center">120°F</td>
                  <td className="py-2 pr-4 text-center">2-3 min</td>
                  <td className="py-2 pr-4">Cool, purple-red center</td>
                  <td className="py-2 text-xs">Filet mignon, tenderloins</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Rare</td>
                  <td className="py-2 pr-4 text-center">120°F</td>
                  <td className="py-2 pr-4 text-center">49°C</td>
                  <td className="py-2 pr-4 text-center">125°F</td>
                  <td className="py-2 pr-4 text-center">3-5 min</td>
                  <td className="py-2 pr-4">Cool red center, very soft</td>
                  <td className="py-2 text-xs">Ribeye, NY strip</td>
                </tr>
                <tr className="border-b border-gray-100 bg-green-50">
                  <td className="py-2 pr-4 font-semibold">Medium-Rare ★</td>
                  <td className="py-2 pr-4 text-center font-semibold">130°F</td>
                  <td className="py-2 pr-4 text-center font-semibold">54°C</td>
                  <td className="py-2 pr-4 text-center font-semibold">135°F</td>
                  <td className="py-2 pr-4 text-center font-semibold">5 min</td>
                  <td className="py-2 pr-4 font-semibold">Warm red center</td>
                  <td className="py-2 text-xs font-semibold">Most steaks, prime rib</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Medium</td>
                  <td className="py-2 pr-4 text-center">140°F</td>
                  <td className="py-2 pr-4 text-center">60°C</td>
                  <td className="py-2 pr-4 text-center">145°F</td>
                  <td className="py-2 pr-4 text-center">5 min</td>
                  <td className="py-2 pr-4">Warm pink center</td>
                  <td className="py-2 text-xs">Roasts, fattier cuts</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Medium-Well</td>
                  <td className="py-2 pr-4 text-center">150°F</td>
                  <td className="py-2 pr-4 text-center">66°C</td>
                  <td className="py-2 pr-4 text-center">155°F</td>
                  <td className="py-2 pr-4 text-center">5-7 min</td>
                  <td className="py-2 pr-4">Slight pink</td>
                  <td className="py-2 text-xs">Well-marbled cuts only</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Well-Done</td>
                  <td className="py-2 pr-4 text-center">160°F</td>
                  <td className="py-2 pr-4 text-center">71°C</td>
                  <td className="py-2 pr-4 text-center">165°F+</td>
                  <td className="py-2 pr-4 text-center">5-7 min</td>
                  <td className="py-2 pr-4">No pink, brown throughout</td>
                  <td className="py-2 text-xs">Not recommended for most</td>
                </tr>
                <tr className="border-b border-gray-100 bg-yellow-50">
                  <td className="py-2 pr-4 font-semibold">Ground Beef ⚠️</td>
                  <td className="py-2 pr-4 text-center font-semibold">160°F</td>
                  <td className="py-2 pr-4 text-center font-semibold">71°C</td>
                  <td className="py-2 pr-4 text-center font-semibold">—</td>
                  <td className="py-2 pr-4 text-center font-semibold">None</td>
                  <td className="py-2 pr-4 font-semibold">No pink (mandatory)</td>
                  <td className="py-2 text-xs font-semibold">All burgers, meatloaf</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 mt-2">★ Chef-recommended for most steaks. Provides best balance of tenderness and flavor.</p>

          <h4 className="font-semibold text-gray-900 mt-6 mb-3">Beef Cuts — Specific Temperatures</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Cut</th>
                  <th className="text-center py-2 pr-4">Recommended Final</th>
                  <th className="text-center py-2 pr-4">Pull At</th>
                  <th className="text-left py-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Filet Mignon</td>
                  <td className="py-2 pr-4 text-center">130-135°F</td>
                  <td className="py-2 pr-4 text-center">125-130°F</td>
                  <td className="py-2 text-xs">Very lean; overcooks easily</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Ribeye</td>
                  <td className="py-2 pr-4 text-center">130-140°F</td>
                  <td className="py-2 pr-4 text-center">125-135°F</td>
                  <td className="py-2 text-xs">Fat renders better at higher temps</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">NY Strip</td>
                  <td className="py-2 pr-4 text-center">130-135°F</td>
                  <td className="py-2 pr-4 text-center">125-130°F</td>
                  <td className="py-2 text-xs">Classic steakhouse cut</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Prime Rib</td>
                  <td className="py-2 pr-4 text-center">130-135°F</td>
                  <td className="py-2 pr-4 text-center">120-125°F</td>
                  <td className="py-2 text-xs">High carryover (~10-15°F)</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Brisket (smoked)</td>
                  <td className="py-2 pr-4 text-center">195-205°F</td>
                  <td className="py-2 pr-4 text-center">195°F</td>
                  <td className="py-2 text-xs">Must reach 200°F+ to be tender</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Short Ribs (braised)</td>
                  <td className="py-2 pr-4 text-center">200-210°F</td>
                  <td className="py-2 pr-4 text-center">200°F</td>
                  <td className="py-2 text-xs">Collagen breaks down at high temp</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Tri-tip</td>
                  <td className="py-2 pr-4 text-center">130-135°F</td>
                  <td className="py-2 pr-4 text-center">125-130°F</td>
                  <td className="py-2 text-xs">Slice thin against the grain</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Flank / Skirt Steak</td>
                  <td className="py-2 pr-4 text-center">130-135°F</td>
                  <td className="py-2 pr-4 text-center">125-130°F</td>
                  <td className="py-2 text-xs">Cook hot and fast; slice thin</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Pork Internal Temperatures
          </h3>
          <p>
            The USDA updated its pork guidelines in 2011, lowering the recommended temperature from 160°F to 145°F (63°C) with a 3-minute rest for whole cuts. This means properly cooked pork can and should be slightly pink in the center.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Doneness</th>
                  <th className="text-center py-2 pr-4">Pull (°F)</th>
                  <th className="text-center py-2 pr-4">Pull (°C)</th>
                  <th className="text-center py-2 pr-4">After Rest</th>
                  <th className="text-left py-2 pr-4">Appearance</th>
                  <th className="text-left py-2">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-green-50">
                  <td className="py-2 pr-4 font-semibold">Medium ★</td>
                  <td className="py-2 pr-4 text-center font-semibold">140°F</td>
                  <td className="py-2 pr-4 text-center font-semibold">60°C</td>
                  <td className="py-2 pr-4 text-center font-semibold">145°F</td>
                  <td className="py-2 pr-4 font-semibold">Slight pink, juicy</td>
                  <td className="py-2 text-xs font-semibold">Chops, tenderloin, loin roast</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Medium-Well</td>
                  <td className="py-2 pr-4 text-center">150°F</td>
                  <td className="py-2 pr-4 text-center">66°C</td>
                  <td className="py-2 pr-4 text-center">155°F</td>
                  <td className="py-2 pr-4">Barely pink</td>
                  <td className="py-2 text-xs">Bone-in chops</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Well-Done</td>
                  <td className="py-2 pr-4 text-center">160°F</td>
                  <td className="py-2 pr-4 text-center">71°C</td>
                  <td className="py-2 pr-4 text-center">165°F</td>
                  <td className="py-2 pr-4">No pink (old guidelines)</td>
                  <td className="py-2 text-xs">Not recommended</td>
                </tr>
                <tr className="border-b border-gray-100 bg-yellow-50">
                  <td className="py-2 pr-4 font-semibold">Ground Pork ⚠️</td>
                  <td className="py-2 pr-4 text-center font-semibold">160°F</td>
                  <td className="py-2 pr-4 text-center font-semibold">71°C</td>
                  <td className="py-2 pr-4 text-center font-semibold">—</td>
                  <td className="py-2 pr-4 font-semibold">No pink (mandatory)</td>
                  <td className="py-2 text-xs font-semibold">Sausage, meatballs</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 className="font-semibold text-gray-900 mt-6 mb-3">Pork Cuts — Specific Temperatures</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Cut</th>
                  <th className="text-center py-2 pr-4">Recommended Final</th>
                  <th className="text-center py-2 pr-4">Pull At</th>
                  <th className="text-left py-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Tenderloin</td>
                  <td className="py-2 pr-4 text-center">145°F</td>
                  <td className="py-2 pr-4 text-center">140°F</td>
                  <td className="py-2 text-xs">Very lean; brine for best results</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Loin Roast</td>
                  <td className="py-2 pr-4 text-center">145°F</td>
                  <td className="py-2 pr-4 text-center">135-140°F</td>
                  <td className="py-2 text-xs">Rest 10-15 min; high carryover</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Bone-in Chops</td>
                  <td className="py-2 pr-4 text-center">145-150°F</td>
                  <td className="py-2 pr-4 text-center">140-145°F</td>
                  <td className="py-2 text-xs">Bone insulates; takes longer</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Baby Back Ribs</td>
                  <td className="py-2 pr-4 text-center">195-203°F</td>
                  <td className="py-2 pr-4 text-center">195°F</td>
                  <td className="py-2 text-xs">Must be high for tenderness</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Spare Ribs</td>
                  <td className="py-2 pr-4 text-center">195-205°F</td>
                  <td className="py-2 pr-4 text-center">195°F</td>
                  <td className="py-2 text-xs">More fat; can go slightly higher</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Pulled Pork (shoulder)</td>
                  <td className="py-2 pr-4 text-center">200-205°F</td>
                  <td className="py-2 pr-4 text-center">200°F</td>
                  <td className="py-2 text-xs">Collagen must melt for shreddability</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Ham (pre-cooked)</td>
                  <td className="py-2 pr-4 text-center">140°F</td>
                  <td className="py-2 pr-4 text-center">135°F</td>
                  <td className="py-2 text-xs">Just reheating; already safe</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Fresh Ham (raw)</td>
                  <td className="py-2 pr-4 text-center">145°F</td>
                  <td className="py-2 pr-4 text-center">140°F</td>
                  <td className="py-2 text-xs">Treat like any pork roast</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 mt-2">★ USDA lowered pork temp to 145°F in 2011. Slightly pink pork is safe and recommended.</p>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Lamb Internal Temperatures
          </h3>
          <p>
            Lamb can be served at lower temperatures similar to beef. The USDA recommends 145°F minimum, but lamb is commonly served medium-rare (130-135°F) at restaurants and is considered safe for healthy adults.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Doneness</th>
                  <th className="text-center py-2 pr-4">Pull (°F)</th>
                  <th className="text-center py-2 pr-4">Pull (°C)</th>
                  <th className="text-center py-2 pr-4">After Rest</th>
                  <th className="text-left py-2 pr-4">Appearance</th>
                  <th className="text-left py-2">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Rare</td>
                  <td className="py-2 pr-4 text-center">115-120°F</td>
                  <td className="py-2 pr-4 text-center">46-49°C</td>
                  <td className="py-2 pr-4 text-center">125°F</td>
                  <td className="py-2 pr-4">Cool red center</td>
                  <td className="py-2 text-xs">Loin chops</td>
                </tr>
                <tr className="border-b border-gray-100 bg-green-50">
                  <td className="py-2 pr-4 font-semibold">Medium-Rare ★</td>
                  <td className="py-2 pr-4 text-center font-semibold">125-130°F</td>
                  <td className="py-2 pr-4 text-center font-semibold">52-54°C</td>
                  <td className="py-2 pr-4 text-center font-semibold">135°F</td>
                  <td className="py-2 pr-4 font-semibold">Warm red center</td>
                  <td className="py-2 text-xs font-semibold">Rack, leg, chops</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Medium</td>
                  <td className="py-2 pr-4 text-center">135-140°F</td>
                  <td className="py-2 pr-4 text-center">57-60°C</td>
                  <td className="py-2 pr-4 text-center">145°F</td>
                  <td className="py-2 pr-4">Warm pink center</td>
                  <td className="py-2 text-xs">Leg roast</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Medium-Well</td>
                  <td className="py-2 pr-4 text-center">145-150°F</td>
                  <td className="py-2 pr-4 text-center">63-66°C</td>
                  <td className="py-2 pr-4 text-center">155°F</td>
                  <td className="py-2 pr-4">Slight pink</td>
                  <td className="py-2 text-xs">Shoulder</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Lamb Shank (braised)</td>
                  <td className="py-2 pr-4 text-center">195-205°F</td>
                  <td className="py-2 pr-4 text-center">90-96°C</td>
                  <td className="py-2 pr-4 text-center">—</td>
                  <td className="py-2 pr-4">Fall-off-bone tender</td>
                  <td className="py-2 text-xs">Braised dishes</td>
                </tr>
                <tr className="border-b border-gray-100 bg-yellow-50">
                  <td className="py-2 pr-4 font-semibold">Ground Lamb ⚠️</td>
                  <td className="py-2 pr-4 text-center font-semibold">160°F</td>
                  <td className="py-2 pr-4 text-center font-semibold">71°C</td>
                  <td className="py-2 pr-4 text-center font-semibold">—</td>
                  <td className="py-2 pr-4 font-semibold">No pink (mandatory)</td>
                  <td className="py-2 text-xs font-semibold">Kofta, burgers</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 mt-2">★ Medium-rare brings out lamb's flavor best. The slight "gamey" taste intensifies at higher temperatures.</p>
        </div>
      </section>

      {/* More Content */}
      <section className="py-8 md:py-12 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl prose prose-lg">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            Poultry Internal Temperatures
          </h2>
          <p>
            All poultry (chicken, turkey, duck, game hen) must reach a minimum of 165°F (74°C) per USDA guidelines. Unlike beef and pork, there is no rare or medium option for poultry.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Cut</th>
                  <th className="text-center py-2 pr-4">Minimum (°F)</th>
                  <th className="text-center py-2 pr-4">Minimum (°C)</th>
                  <th className="text-left py-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Whole chicken</td>
                  <td className="py-2 pr-4 text-center">165°F</td>
                  <td className="py-2 pr-4 text-center">74°C</td>
                  <td className="py-2">Measure in thickest part of thigh</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Breast</td>
                  <td className="py-2 pr-4 text-center">165°F</td>
                  <td className="py-2 pr-4 text-center">74°C</td>
                  <td className="py-2">Pull at 160°F, rest to 165°F</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Thighs/Legs</td>
                  <td className="py-2 pr-4 text-center">175–180°F</td>
                  <td className="py-2 pr-4 text-center">79–82°C</td>
                  <td className="py-2">Higher temp = better texture</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Ground chicken/turkey</td>
                  <td className="py-2 pr-4 text-center">165°F</td>
                  <td className="py-2 pr-4 text-center">74°C</td>
                  <td className="py-2">No rest needed</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Fish & Seafood
          </h3>
          <p>
            Fish has a lower safe temperature than meat. The USDA recommends 145°F (63°C) for fin fish, but many chefs serve salmon and tuna at lower temperatures.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Seafood</th>
                  <th className="text-center py-2 pr-4">USDA Min (°F)</th>
                  <th className="text-center py-2 pr-4">Chef Preferred</th>
                  <th className="text-left py-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Salmon</td>
                  <td className="py-2 pr-4 text-center">145°F</td>
                  <td className="py-2 pr-4 text-center">120–130°F</td>
                  <td className="py-2">Translucent center at preferred temp</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Tuna (steak)</td>
                  <td className="py-2 pr-4 text-center">145°F</td>
                  <td className="py-2 pr-4 text-center">115–120°F</td>
                  <td className="py-2">Often served rare/seared</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">White fish</td>
                  <td className="py-2 pr-4 text-center">145°F</td>
                  <td className="py-2 pr-4 text-center">135–140°F</td>
                  <td className="py-2">Flakes easily with fork</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Shrimp</td>
                  <td className="py-2 pr-4 text-center">145°F</td>
                  <td className="py-2 pr-4 text-center">—</td>
                  <td className="py-2">Cook until pink/opaque</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-semibold text-gray-900 mt-8 mb-4">
            Understanding Carryover Cooking
          </h3>
          <p>
            Carryover cooking is the continued rise in internal temperature after you remove meat from the heat source. The larger the cut, the more temperature rise to expect.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Cut / Size</th>
                  <th className="text-center py-2">Expected Rise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Steaks (1–1.5" thick)</td>
                  <td className="py-2 text-center">3–5°F</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Thick-cut chops</td>
                  <td className="py-2 text-center">5–8°F</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Pork loin roast</td>
                  <td className="py-2 text-center">5–10°F</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Whole chicken</td>
                  <td className="py-2 text-center">5–10°F</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Prime rib / large roast</td>
                  <td className="py-2 text-center">10–15°F</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">Fish fillets</td>
                  <td className="py-2 text-center">1–3°F</td>
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
              href="/meat-cooking-time-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Meat Cooking Time Calculator</h3>
              <p className="text-sm text-gray-600">Get exact cooking times by weight & cut</p>
            </Link>
            <Link
              href="/turkey-cooking-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Turkey Cooking Calculator</h3>
              <p className="text-sm text-gray-600">Times for whole turkey, stuffed or unstuffed</p>
            </Link>
            <Link
              href="/oven-temperature-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Oven Temperature Converter</h3>
              <p className="text-sm text-gray-600">Convert °F, °C, and Gas Mark</p>
            </Link>
            <Link
              href="/convection-oven-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Convection Oven Converter</h3>
              <p className="text-sm text-gray-600">Adjust times & temps for convection</p>
            </Link>
            <Link
              href="/air-fryer-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Air Fryer Converter</h3>
              <p className="text-sm text-gray-600">Convert oven recipes to air fryer</p>
            </Link>
            <Link
              href="/slow-cooker-to-oven-converter"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Slow Cooker Converter</h3>
              <p className="text-sm text-gray-600">Convert between slow cooker & oven</p>
            </Link>
            <Link
              href="/recipe-scaler"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Recipe Scaler</h3>
              <p className="text-sm text-gray-600">Double, halve, or resize any recipe</p>
            </Link>
            <Link
              href="/party-food-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Party Food Calculator</h3>
              <p className="text-sm text-gray-600">Calculate how much meat per guest</p>
            </Link>
            <Link
              href="/recipe-macro-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Recipe Macro Calculator</h3>
              <p className="text-sm text-gray-600">Protein, fat, calories per serving</p>
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
            The safe cooking temperatures in this guide are based on official guidelines from food safety authorities and peer-reviewed culinary science:
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/safe-minimum-internal-temperature-chart"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral-600 hover:text-coral-700 underline"
            >
              USDA Safe Minimum Temperatures
            </a>
            <a
              href="https://www.foodsafety.gov/food-safety-charts/safe-minimum-cooking-temperature"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral-600 hover:text-coral-700 underline"
            >
              FoodSafety.gov Temperature Chart
            </a>
            <a
              href="https://www.cdc.gov/food-safety/foods/meat.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral-600 hover:text-coral-700 underline"
            >
              CDC Meat Safety Guidelines
            </a>
            <a
              href="https://www.seriouseats.com/the-food-lab-complete-guide-to-sous-vide-steak"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral-600 hover:text-coral-700 underline"
            >
              Serious Eats — Steak Temperature Science
            </a>
            <a
              href="https://www.cooksillustrated.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral-600 hover:text-coral-700 underline"
            >
              Cook's Illustrated Test Kitchen
            </a>
            <a
              href="https://www.thermoworks.com/meat-temperature-guide/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral-600 hover:text-coral-700 underline"
            >
              ThermoWorks Temperature Guide
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
