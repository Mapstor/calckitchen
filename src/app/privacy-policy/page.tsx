import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Privacy Policy | CalcKitchen',
  description: 'CalcKitchen privacy policy. Learn how we handle your data, our use of analytics and advertising, and your rights under GDPR and CCPA.',
  openGraph: {
    title: 'Privacy Policy | CalcKitchen',
    description: 'CalcKitchen privacy policy. Learn how we handle your data, our use of analytics and advertising, and your rights under GDPR and CCPA.',
    url: 'https://calckitchen.com/privacy-policy',
    siteName: 'CalcKitchen',
    type: 'website',
  },
  alternates: {
    canonical: 'https://calckitchen.com/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://calckitchen.com' },
          { name: 'Privacy Policy', url: 'https://calckitchen.com/privacy-policy' },
        ]}
      />

      <div className="min-h-screen bg-[#FAFAF8]">
        {/* Hero Section */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Privacy Policy
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
                CalcKitchen.com (&quot;CalcKitchen,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting
                your privacy. This Privacy Policy explains what information is collected when you visit our
                website and how that information is used.
              </p>

              <h2 className="font-serif text-2xl font-bold text-gray-900 mt-10 mb-4">
                Information We Do Not Collect
              </h2>
              <p className="text-gray-700">
                CalcKitchen does not require user registration, accounts, or sign-ups of any kind. We do not
                collect, store, or process any personal information such as your name, email address, phone
                number, or payment information. All of our calculators function entirely in your browser —
                your inputs are not transmitted to or stored on our servers.
              </p>

              <h2 className="font-serif text-2xl font-bold text-gray-900 mt-10 mb-4">
                Analytics
              </h2>
              <p className="text-gray-700">
                We use <strong>Google Analytics (GA4)</strong> to understand how visitors use our website.
                Google Analytics collects anonymized data including pages visited, time spent on pages,
                approximate geographic location (country/region level), device type, browser type, and
                referral sources. This information helps us improve our calculators and content.
              </p>
              <p className="text-gray-700">
                Google Analytics uses cookies to distinguish unique visitors. You can opt out of Google
                Analytics by installing the{' '}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E8604C] hover:underline"
                >
                  Google Analytics Opt-Out Browser Add-On
                </a>{' '}
                or by adjusting your browser&apos;s cookie settings.
              </p>
              <p className="text-gray-700">
                For more information, see{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E8604C] hover:underline"
                >
                  Google&apos;s Privacy Policy
                </a>.
              </p>

              <h2 className="font-serif text-2xl font-bold text-gray-900 mt-10 mb-4">
                Advertising
              </h2>
              <p className="text-gray-700">
                We use <strong>Raptive</strong> (formerly AdThrive/CafeMedia) to display advertisements on
                CalcKitchen. Raptive and its advertising partners may use cookies, web beacons, and similar
                technologies to collect information about your browsing activity across websites in order to
                provide you with relevant advertisements. This may include information such as your IP address,
                browser type, device information, pages visited, and interactions with ads.
              </p>
              <p className="text-gray-700">
                This data collection is governed by Raptive&apos;s privacy policy, which you can review at{' '}
                <a
                  href="https://raptive.com/privacy-policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E8604C] hover:underline"
                >
                  https://raptive.com/privacy-policy/
                </a>.
              </p>
              <p className="text-gray-700">You can opt out of personalized advertising by visiting:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>
                  <strong>Digital Advertising Alliance (DAA):</strong>{' '}
                  <a
                    href="https://optout.aboutads.info/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#E8604C] hover:underline"
                  >
                    https://optout.aboutads.info/
                  </a>
                </li>
                <li>
                  <strong>Network Advertising Initiative (NAI):</strong>{' '}
                  <a
                    href="https://optout.networkadvertising.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#E8604C] hover:underline"
                  >
                    https://optout.networkadvertising.org/
                  </a>
                </li>
                <li>
                  <strong>European users (EDAA):</strong>{' '}
                  <a
                    href="https://www.youronlinechoices.eu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#E8604C] hover:underline"
                  >
                    https://www.youronlinechoices.eu/
                  </a>
                </li>
              </ul>

              <h2 className="font-serif text-2xl font-bold text-gray-900 mt-10 mb-4">
                Affiliate Links
              </h2>
              <p className="text-gray-700">
                CalcKitchen participates in the <strong>Amazon Services LLC Associates Program</strong>, an
                affiliate advertising program designed to provide a means for sites to earn advertising fees
                by linking to Amazon.com and affiliated sites. When you click an affiliate link on our site
                and make a purchase, we may earn a small commission at no additional cost to you. Amazon may
                use cookies to track referrals from our site.
              </p>
              <p className="text-gray-700">
                For more information, see{' '}
                <a
                  href="https://www.amazon.com/gp/help/customer/display.html?nodeId=GX7NJQ4ZB8MHFRNJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E8604C] hover:underline"
                >
                  Amazon&apos;s Privacy Notice
                </a>.
              </p>

              <h2 className="font-serif text-2xl font-bold text-gray-900 mt-10 mb-4">
                Cookies
              </h2>
              <p className="text-gray-700">
                CalcKitchen itself does not set any first-party cookies. However, third-party cookies may be
                set by Google Analytics, Raptive, and Amazon as described above. You can manage or disable
                cookies through your browser settings. Please note that disabling cookies may affect the
                functionality of some third-party features on our site but will not affect the operation of
                our calculators.
              </p>

              <h2 className="font-serif text-2xl font-bold text-gray-900 mt-10 mb-4">
                Data Retention
              </h2>
              <p className="text-gray-700">
                Since we do not collect personal information directly, we do not maintain a personal data store.
                Any data collected by third-party services (Google Analytics, Raptive, Amazon) is retained
                according to their respective privacy policies and data retention schedules.
              </p>

              <h2 className="font-serif text-2xl font-bold text-gray-900 mt-10 mb-4">
                Children&apos;s Privacy
              </h2>
              <p className="text-gray-700">
                CalcKitchen is a general audience website and does not knowingly collect any information from
                children under the age of 13 (or 16 in the European Economic Area). If you believe we have
                inadvertently collected information from a child, please contact us and we will take steps to
                address the issue.
              </p>

              <h2 className="font-serif text-2xl font-bold text-gray-900 mt-10 mb-4">
                Your Rights Under GDPR (European Economic Area)
              </h2>
              <p className="text-gray-700">
                If you are located in the European Economic Area (EEA), you have certain rights under the
                General Data Protection Regulation (GDPR), including the right to access, rectify, erase,
                restrict processing of, and port your personal data, as well as the right to object to
                processing. Since CalcKitchen does not directly collect or store personal data, these rights
                primarily apply to data collected by our third-party partners. You may exercise your rights by
                contacting those third parties directly or by contacting us for assistance.
              </p>
              <p className="text-gray-700">
                <strong>Legal basis for processing:</strong> Where personal data is processed by our third-party
                partners, the legal bases include your consent (for cookies and personalized advertising) and
                our legitimate interests in understanding site usage and sustaining the site through advertising
                revenue.
              </p>

              <h2 className="font-serif text-2xl font-bold text-gray-900 mt-10 mb-4">
                Your Rights Under CCPA (California)
              </h2>
              <p className="text-gray-700">
                If you are a California resident, the California Consumer Privacy Act (CCPA) provides you with
                specific rights regarding your personal information. CalcKitchen does not sell personal
                information. You have the right to know what personal information is collected about you, to
                request deletion of your personal information, and to not be discriminated against for
                exercising your privacy rights. Since we do not directly collect personal data, these rights
                primarily apply to information collected by our advertising and analytics partners as described
                above.
              </p>

              <h2 className="font-serif text-2xl font-bold text-gray-900 mt-10 mb-4">
                International Users
              </h2>
              <p className="text-gray-700">
                CalcKitchen is operated from the United States. If you are visiting from outside the United
                States, please be aware that your information may be transferred to, stored, and processed in
                the United States where our servers and third-party service providers operate.
              </p>

              <h2 className="font-serif text-2xl font-bold text-gray-900 mt-10 mb-4">
                Changes to This Privacy Policy
              </h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. Changes will be posted on this page with
                an updated &quot;Last Updated&quot; date. We encourage you to review this page periodically.
              </p>

              <h2 className="font-serif text-2xl font-bold text-gray-900 mt-10 mb-4">
                Contact Us
              </h2>
              <p className="text-gray-700">
                If you have any questions or concerns about this Privacy Policy, please contact us at:
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
              href="/terms-of-use"
              className="text-[#E8604C] hover:underline font-medium"
            >
              Terms of Use &rarr;
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
