import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Terms of Use | CalcKitchen',
  description: 'CalcKitchen terms of use. Understand our calculator disclaimers, food safety guidelines, and site usage policies.',
  openGraph: {
    title: 'Terms of Use | CalcKitchen',
    description: 'CalcKitchen terms of use. Understand our calculator disclaimers, food safety guidelines, and site usage policies.',
    url: 'https://calckitchen.com/terms-of-use',
    siteName: 'CalcKitchen',
    type: 'website',
  },
  alternates: {
    canonical: 'https://calckitchen.com/terms-of-use',
  },
};

export default function TermsOfUsePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://calckitchen.com' },
          { name: 'Terms of Use', url: 'https://calckitchen.com/terms-of-use' },
        ]}
      />

      <div className="min-h-screen bg-[#FAFAF8]">
        {/* Hero Section */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Terms of Use
            </h1>
            <p className="text-gray-600">
              <strong>Effective Date:</strong> February 21, 2026<br />
              <strong>Last Updated:</strong> February 21, 2026
            </p>
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700">
                Please read these Terms of Use (&quot;Terms&quot;) carefully before using CalcKitchen.com
                (&quot;CalcKitchen,&quot; &quot;the Site,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
                By accessing or using the Site, you agree to be bound by these Terms. If you do not agree with
                these Terms, please do not use the Site.
              </p>

              <h2 className="font-serif text-2xl font-bold text-gray-900 mt-10 mb-4">
                1. Nature of the Service
              </h2>
              <p className="text-gray-700">
                CalcKitchen provides free, web-based kitchen calculators and cooking reference tools for
                informational and educational purposes only. Our tools are designed to assist with common
                cooking and baking calculations, including but not limited to cooking times, temperature
                conversions, recipe scaling, serving estimates, and ingredient measurements.
              </p>

              <h2 className="font-serif text-2xl font-bold text-gray-900 mt-10 mb-4">
                2. Calculator Results Are Estimates
              </h2>
              <p className="text-gray-700">
                All calculator outputs, cooking times, temperatures, serving sizes, and other results provided
                by CalcKitchen are <strong>estimates and general guidelines only</strong>. They are not
                guarantees of specific outcomes.
              </p>
              <p className="text-gray-700">
                Actual cooking times and results may vary based on many factors, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Individual oven and appliance calibration and performance</li>
                <li>Altitude and ambient temperature</li>
                <li>Size, shape, and starting temperature of food</li>
                <li>Accuracy of user-provided inputs (weight, dimensions, etc.)</li>
                <li>Cookware material and size</li>
                <li>Food composition and moisture content</li>
              </ul>
              <p className="text-gray-700">
                We make reasonable efforts to ensure our calculators are based on accurate data and sound
                formulas, but we cannot account for every variable in every kitchen.
              </p>

              <h2 className="font-serif text-2xl font-bold text-gray-900 mt-10 mb-4">
                3. Food Safety Disclaimer
              </h2>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 my-6">
                <p className="text-amber-900 font-semibold mb-2">
                  CalcKitchen is not a substitute for safe food handling practices.
                </p>
                <p className="text-amber-800">
                  While our calculators reference guidelines from the United States Department of Agriculture
                  (USDA) and FoodSafety.gov, you are solely responsible for ensuring that food is prepared,
                  cooked, and stored safely.
                </p>
              </div>
              <p className="text-gray-700">
                <strong>Always use a food thermometer</strong> to verify that meat, poultry, seafood, and other
                perishable foods have reached safe internal temperatures before consuming. USDA-recommended
                minimum internal temperatures include:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Poultry (whole, parts, ground):</strong> 165°F (74°C)</li>
                <li><strong>Ground meats (beef, pork, lamb):</strong> 160°F (71°C)</li>
                <li><strong>Beef, pork, lamb, and veal (steaks, roasts, chops):</strong> 145°F (63°C) with a 3-minute rest</li>
                <li><strong>Fish and shellfish:</strong> 145°F (63°C)</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Calculator-generated cooking times should always be confirmed with a thermometer reading.
                <strong> Do not rely solely on time-based estimates to determine whether food is safely cooked.</strong>
              </p>

              <h2 className="font-serif text-2xl font-bold text-gray-900 mt-10 mb-4">
                4. Not Professional Advice
              </h2>
              <p className="text-gray-700">
                The information provided by CalcKitchen does not constitute professional culinary, nutritional,
                medical, or dietary advice. Our tools are intended for general informational purposes for home
                cooks and bakers.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Nutritional calculations</strong> (including macros and calories) are approximate and
                should not be used for medical dietary management. Consult a registered dietitian or healthcare
                professional for specific nutritional guidance.</li>
                <li><strong>Recipe cost estimates</strong> are approximate and based on user-provided prices.
                They should not be used as the sole basis for commercial food pricing or business decisions.</li>
                <li><strong>Serving size estimates</strong> are general guidelines and may not be appropriate
                for all events, dietary needs, or populations.</li>
              </ul>
              <p className="text-gray-700 mt-4">
                If you have food allergies, medical dietary restrictions, or other health concerns, consult a
                qualified professional before relying on any information from this Site.
              </p>

              <h2 className="font-serif text-2xl font-bold text-gray-900 mt-10 mb-4">
                5. Use of USDA and Government Data
              </h2>
              <p className="text-gray-700">
                CalcKitchen references data and guidelines from the USDA, FoodSafety.gov, and other government
                sources. We make reasonable efforts to keep this information current, but government guidelines
                may be updated without notice. CalcKitchen is not affiliated with, endorsed by, or sponsored by
                the USDA, FoodSafety.gov, or any government agency. Users are encouraged to verify current
                guidelines directly at{' '}
                <a
                  href="https://www.usda.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E8604C] hover:underline"
                >
                  USDA.gov
                </a>{' '}
                and{' '}
                <a
                  href="https://www.foodsafety.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E8604C] hover:underline"
                >
                  FoodSafety.gov
                </a>.
              </p>

              <h2 className="font-serif text-2xl font-bold text-gray-900 mt-10 mb-4">
                6. Limitation of Liability
              </h2>
              <p className="text-gray-700">
                To the fullest extent permitted by applicable law, CalcKitchen and its owners, operators,
                contributors, and affiliates shall not be liable for any direct, indirect, incidental, special,
                consequential, or punitive damages arising from or related to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Your use of or inability to use the Site or its calculators</li>
                <li>Any errors, inaccuracies, or omissions in calculator results or content</li>
                <li>Foodborne illness or food safety issues related to the preparation or consumption of food</li>
                <li>Any reliance you place on information provided by the Site</li>
                <li>Any actions you take or fail to take based on information from the Site</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Your use of CalcKitchen is at your own risk. The Site and all content, tools, and calculators
                are provided on an &quot;as is&quot; and &quot;as available&quot; basis, without warranties of any kind, either
                express or implied, including but not limited to implied warranties of merchantability, fitness
                for a particular purpose, and non-infringement.
              </p>

              <h2 className="font-serif text-2xl font-bold text-gray-900 mt-10 mb-4">
                7. Intellectual Property
              </h2>
              <p className="text-gray-700">
                All content on CalcKitchen, including but not limited to text, graphics, logos, calculator
                designs, code, and visual elements, is the property of CalcKitchen or its licensors and is
                protected by applicable intellectual property laws. You may not reproduce, distribute, modify,
                or create derivative works from our content without prior written permission.
              </p>
              <p className="text-gray-700">
                You are welcome to share links to our pages and calculators.
              </p>

              <h2 className="font-serif text-2xl font-bold text-gray-900 mt-10 mb-4">
                8. Third-Party Links and Services
              </h2>
              <p className="text-gray-700">
                CalcKitchen may contain links to third-party websites, including Amazon.com (through our
                participation in the Amazon Associates Program) and other external resources. These links are
                provided for your convenience. We are not responsible for the content, accuracy, privacy
                practices, or availability of any third-party websites. Your interaction with third-party
                sites is governed by their own terms and policies.
              </p>

              <h2 className="font-serif text-2xl font-bold text-gray-900 mt-10 mb-4">
                9. Advertising
              </h2>
              <p className="text-gray-700">
                CalcKitchen displays advertisements through Raptive and its advertising partners. We are not
                responsible for the content of advertisements displayed on the Site. The presence of an
                advertisement does not constitute an endorsement of the advertised product or service.
              </p>

              <h2 className="font-serif text-2xl font-bold text-gray-900 mt-10 mb-4">
                10. User Conduct
              </h2>
              <p className="text-gray-700">When using CalcKitchen, you agree not to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Attempt to interfere with, disrupt, or overload the Site&apos;s infrastructure</li>
                <li>Use automated systems (bots, scrapers) to access the Site in a manner that exceeds reasonable use</li>
                <li>Attempt to gain unauthorized access to any part of the Site</li>
                <li>Use the Site for any unlawful purpose</li>
              </ul>

              <h2 className="font-serif text-2xl font-bold text-gray-900 mt-10 mb-4">
                11. Modifications to the Terms
              </h2>
              <p className="text-gray-700">
                We reserve the right to modify these Terms at any time. Changes will be posted on this page
                with an updated &quot;Last Updated&quot; date. Your continued use of the Site after changes are posted
                constitutes your acceptance of the modified Terms.
              </p>

              <h2 className="font-serif text-2xl font-bold text-gray-900 mt-10 mb-4">
                12. Modifications to the Site
              </h2>
              <p className="text-gray-700">
                We reserve the right to modify, suspend, or discontinue any part of CalcKitchen at any time
                without notice. We are not liable to you or any third party for any modification, suspension,
                or discontinuation of the Site.
              </p>

              <h2 className="font-serif text-2xl font-bold text-gray-900 mt-10 mb-4">
                13. Governing Law
              </h2>
              <p className="text-gray-700">
                These Terms are governed by and construed in accordance with the laws of the United States.
                Any disputes arising from these Terms or your use of the Site shall be resolved in accordance
                with applicable law.
              </p>

              <h2 className="font-serif text-2xl font-bold text-gray-900 mt-10 mb-4">
                14. Severability
              </h2>
              <p className="text-gray-700">
                If any provision of these Terms is found to be unenforceable or invalid, that provision shall
                be limited or eliminated to the minimum extent necessary, and the remaining provisions shall
                remain in full force and effect.
              </p>

              <h2 className="font-serif text-2xl font-bold text-gray-900 mt-10 mb-4">
                15. Contact Us
              </h2>
              <p className="text-gray-700">
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:hello@calckitchen.com"
                  className="text-[#E8604C] hover:underline"
                >
                  hello@calckitchen.com
                </a>
              </p>
            </div>
          </div>

          {/* Related Links */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/privacy-policy"
              className="text-[#E8604C] hover:underline font-medium"
            >
              Privacy Policy &rarr;
            </Link>
            <Link
              href="/contact"
              className="text-[#E8604C] hover:underline font-medium"
            >
              Contact Us &rarr;
            </Link>
            <Link
              href="/about"
              className="text-[#E8604C] hover:underline font-medium"
            >
              About CalcKitchen &rarr;
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
