import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbJsonLd, OrganizationJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'About CalcKitchen | Kitchen Math, Solved',
  description: 'CalcKitchen offers 20 free kitchen calculators for cooking times, temperature conversions, recipe scaling, and more. Built on USDA data and professional culinary standards.',
  openGraph: {
    title: 'About CalcKitchen | Kitchen Math, Solved',
    description: 'CalcKitchen offers 20 free kitchen calculators for cooking times, temperature conversions, recipe scaling, and more. Built on USDA data and professional culinary standards.',
    url: 'https://calckitchen.com/about',
    siteName: 'CalcKitchen',
    type: 'website',
  },
  alternates: {
    canonical: 'https://calckitchen.com/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://calckitchen.com' },
          { name: 'About', url: 'https://calckitchen.com/about' },
        ]}
      />
      <OrganizationJsonLd
        name="CalcKitchen"
        url="https://calckitchen.com"
        description="Free kitchen calculators for cooking times, temperature conversions, recipe scaling, and more."
      />

      <div className="min-h-screen bg-[#FAFAF8]">
        {/* Hero Section */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              About CalcKitchen
            </h1>
            <p className="text-2xl text-[#E8604C] font-medium">
              Kitchen Math, Solved.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-12">
          {/* Introduction */}
          <section className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-gray-700 leading-relaxed">
              There&apos;s a moment every home cook knows too well. You&apos;re standing in the kitchen,
              recipe in hand, staring at a 14-pound turkey and wondering — how long does this actually
              need to cook? Or you&apos;ve just bought an air fryer and every recipe you find is for a
              conventional oven. Or you&apos;re halving a cake recipe and trying to figure out what
              &quot;half of ¾ cup&quot; actually looks like.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              We&apos;ve been there. And we built CalcKitchen to make sure nobody has to guess.
            </p>
          </section>

          {/* Our Story */}
          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                CalcKitchen was born out of a simple frustration: the math behind cooking shouldn&apos;t
                be harder than the cooking itself. Cook a roast too long and it&apos;s dry. Undershoot
                the internal temperature and you&apos;ve got a food safety problem. Get the hydration
                wrong on your pizza dough and you&apos;ll end up with a cracker instead of a crust.
              </p>
              <p>
                We believe cooking should be accessible, enjoyable, and stress-free — and that starts
                with getting the fundamentals right. No one should have to dig through five blog posts,
                scroll past someone&apos;s life story, and still not find a clear answer to &quot;how long
                do I cook a 6-pound pork shoulder in a slow cooker?&quot;
              </p>
              <p>
                That&apos;s why we built a suite of free, fast, and reliable kitchen calculators —
                designed to give you the answer you need in seconds, so you can get back to making
                great food for the people you love.
              </p>
            </div>
          </section>

          {/* What We Offer */}
          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">What We Offer</h2>
            <p className="text-lg text-gray-700 mb-8">
              CalcKitchen is home to <strong>20 purpose-built kitchen calculators</strong> spanning
              every corner of home cooking and baking:
            </p>

            <div className="space-y-8">
              {/* Appliance Converters */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-xl text-gray-900 mb-3">Appliance Converters</h3>
                <p className="text-gray-700">
                  Switching between appliances shouldn&apos;t require a math degree. Our{' '}
                  <Link href="/air-fryer-converter" className="text-[#E8604C] hover:underline">Air Fryer Converter</Link>,{' '}
                  <Link href="/microwave-to-oven-converter" className="text-[#E8604C] hover:underline">Microwave to Oven Converter</Link>,{' '}
                  <Link href="/slow-cooker-to-oven-converter" className="text-[#E8604C] hover:underline">Slow Cooker to Oven Converter</Link>,{' '}
                  <Link href="/convection-oven-converter" className="text-[#E8604C] hover:underline">Convection Oven Converter</Link>, and{' '}
                  <Link href="/oven-temperature-converter" className="text-[#E8604C] hover:underline">Oven Temperature Converter</Link>{' '}
                  handle the translation so you can cook any recipe with whatever equipment you have.
                </p>
              </div>

              {/* Cooking Time Calculators */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-xl text-gray-900 mb-3">Cooking Time Calculators</h3>
                <p className="text-gray-700">
                  Our <Link href="/meat-cooking-time-calculator" className="text-[#E8604C] hover:underline">Meat Cooking Time Calculator</Link>{' '}
                  takes the guesswork out of roasting by weight, delivering precise times and temperatures
                  for beef, pork, chicken, lamb, and more. The{' '}
                  <Link href="/turkey-cooking-calculator" className="text-[#E8604C] hover:underline">Turkey Cooking Calculator</Link>{' '}
                  covers everything from thawing to resting, including stuffed vs. unstuffed and multiple
                  cooking methods. And the{' '}
                  <Link href="/meat-temperature-chart" className="text-[#E8604C] hover:underline">Meat Temperature Chart</Link>{' '}
                  gives you an instant reference for USDA-recommended safe internal temperatures.
                </p>
              </div>

              {/* Baking Calculators */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-xl text-gray-900 mb-3">Baking Calculators</h3>
                <p className="text-gray-700">
                  Baking is science, and science demands precision. Our{' '}
                  <Link href="/cake-servings-calculator" className="text-[#E8604C] hover:underline">Cake Servings Calculator</Link>{' '}
                  tells you exactly how many people your cake will feed (with visual cut guides), while the{' '}
                  <Link href="/cake-pan-converter" className="text-[#E8604C] hover:underline">Cake Pan Converter</Link>{' '}
                  lets you resize any recipe to fit whatever pan you have. For bread bakers, the{' '}
                  <Link href="/pizza-dough-calculator" className="text-[#E8604C] hover:underline">Pizza Dough Calculator</Link>,{' '}
                  <Link href="/sourdough-calculator" className="text-[#E8604C] hover:underline">Sourdough Calculator</Link>, and{' '}
                  <Link href="/bakers-percentage-calculator" className="text-[#E8604C] hover:underline">Baker&apos;s Percentage Calculator</Link>{' '}
                  bring professional-grade precision to your home kitchen.
                </p>
              </div>

              {/* Recipe Tools */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-xl text-gray-900 mb-3">Recipe Tools</h3>
                <p className="text-gray-700">
                  The <Link href="/recipe-scaler" className="text-[#E8604C] hover:underline">Recipe Scaler</Link>{' '}
                  lets you double, halve, or resize any recipe with smart rounding (because nobody wants to
                  measure 0.37 of an egg). The{' '}
                  <Link href="/recipe-cost-calculator" className="text-[#E8604C] hover:underline">Recipe Cost Calculator</Link>{' '}
                  tracks what your meals cost per serving. And the{' '}
                  <Link href="/recipe-macro-calculator" className="text-[#E8604C] hover:underline">Recipe Macro Calculator</Link>{' '}
                  breaks down the nutrition.
                </p>
              </div>

              {/* Planning & Reference */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-xl text-gray-900 mb-3">Planning & Reference</h3>
                <p className="text-gray-700">
                  Hosting a party? The{' '}
                  <Link href="/party-food-calculator" className="text-[#E8604C] hover:underline">Party Food Calculator</Link>{' '}
                  tells you how much to buy for any number of guests. The{' '}
                  <Link href="/cooking-measurement-converter" className="text-[#E8604C] hover:underline">Cooking Measurement Converter</Link>{' '}
                  handles every unit you&apos;ll encounter. The{' '}
                  <Link href="/butter-converter" className="text-[#E8604C] hover:underline">Butter Converter</Link>{' '}
                  translates between sticks, cups, grams, and tablespoons. And the{' '}
                  <Link href="/coffee-ratio-calculator" className="text-[#E8604C] hover:underline">Coffee Ratio Calculator</Link>{' '}
                  dials in the perfect brew for any method.
                </p>
              </div>
            </div>
          </section>

          {/* Built on Authoritative Data */}
          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">Built on Authoritative Data</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                We take accuracy seriously — because in the kitchen, a few degrees or a few minutes
                can be the difference between perfectly cooked and overcooked, between safe to eat and not.
              </p>
              <p>Every calculator on CalcKitchen is built on data from trusted, authoritative sources:</p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-4 bg-white rounded-lg p-4 border border-gray-100">
                <div className="w-2 h-2 rounded-full bg-[#E8604C] mt-2.5 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">USDA (United States Department of Agriculture)</strong>
                  <p className="text-gray-600 mt-1">
                    Our meat cooking temperatures, safe handling guidelines, and food composition data
                    come directly from USDA recommendations. When we tell you a chicken needs to reach
                    165°F internally, that&apos;s the science-backed standard.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white rounded-lg p-4 border border-gray-100">
                <div className="w-2 h-2 rounded-full bg-[#E8604C] mt-2.5 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">FoodSafety.gov</strong>
                  <p className="text-gray-600 mt-1">
                    For thawing guidelines, storage times, and safe cooking practices, we reference
                    the federal interagency food safety guidelines.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white rounded-lg p-4 border border-gray-100">
                <div className="w-2 h-2 rounded-full bg-[#E8604C] mt-2.5 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">Professional cooking standards</strong>
                  <p className="text-gray-600 mt-1">
                    Our conversion formulas, appliance adjustment factors, baker&apos;s percentages,
                    and serving size guidelines are drawn from professional culinary industry standards,
                    cross-referenced with real-world testing.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mt-6">
              We update our data regularly. When we recommend you use a food thermometer (and we will — often),
              it&apos;s because no calculator can replace one. We give you the best possible estimate;
              the thermometer gives you the confirmation.
            </p>
          </section>

          {/* Our Design Philosophy */}
          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">Our Design Philosophy</h2>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Fast answers, no friction</h3>
                <p className="text-gray-600">
                  Every CalcKitchen calculator is designed to get you from question to answer in seconds.
                  No pop-ups. No &quot;sign up to see your results.&quot; No walls of text before the tool.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Mobile-first</h3>
                <p className="text-gray-600">
                  We know where you are when you need a cooking calculator — in the kitchen, phone in one hand,
                  spatula in the other. Every tool works beautifully on a phone screen.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Free forever</h3>
                <p className="text-gray-600">
                  CalcKitchen is and will always be completely free to use. No accounts, no paywalls,
                  no email required to show you results. Every calculator, every feature — free and open to everyone.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Beautiful and functional</h3>
                <p className="text-gray-600">
                  We believe tools can be both useful and pleasant to use. Our calculators feature clean,
                  modern design with visual elements that make information intuitive.
                </p>
              </div>
            </div>
          </section>

          {/* Who We're For */}
          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">Who We&apos;re For</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                CalcKitchen is for everyone who cooks. The college student roasting their first whole chicken.
                The parent figuring out how much food to make for a birthday party. The weekend baker
                experimenting with sourdough. The host planning Thanksgiving for 20. The home pizza maker
                obsessing over dough hydration.
              </p>
              <p>
                If you&apos;ve ever found yourself mid-recipe, reaching for your phone to look up a
                conversion or cooking time, we built CalcKitchen for you.
              </p>
            </div>
          </section>

          {/* Our Commitment */}
          <section className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">Our Commitment</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                We&apos;re committed to keeping CalcKitchen accurate, up to date, and genuinely useful —
                continuously expanding our calculators, updating data when guidelines change, and building
                the tools our users actually need.
              </p>
              <p>
                Cooking is one of the most fundamental human acts — it nourishes us, brings us together,
                and connects us to culture and tradition. It shouldn&apos;t be derailed by math. We&apos;re
                here to handle the numbers, so you can focus on the food.
              </p>
              <p className="text-xl font-medium text-gray-900 mt-6">
                Welcome to CalcKitchen. Let&apos;s cook.
              </p>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
