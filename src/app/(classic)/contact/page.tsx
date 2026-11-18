import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Contact Us | CalcKitchen',
  description: 'Get in touch with CalcKitchen. Report bugs, suggest new calculators, or share feedback about our free kitchen calculation tools.',
  openGraph: {
    title: 'Contact Us | CalcKitchen',
    description: 'Get in touch with CalcKitchen. Report bugs, suggest new calculators, or share feedback about our free kitchen calculation tools.',
    url: 'https://calckitchen.com/contact',
    siteName: 'CalcKitchen',
    type: 'website',
  },
  alternates: {
    canonical: 'https://calckitchen.com/contact',
  },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://calckitchen.com' },
          { name: 'Contact', url: 'https://calckitchen.com/contact' },
        ]}
      />

      <div className="min-h-screen bg-[#FAFAF8]">
        {/* Hero Section */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600">
              We&apos;d love to hear from you!
            </p>
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-12">
            <p className="text-lg text-gray-700 mb-8">
              Whether you&apos;ve spotted a bug, have feedback on one of our calculators,
              or want to suggest a new tool — we&apos;re all ears.
            </p>

            {/* Email CTA */}
            <div className="bg-[#FAFAF8] rounded-lg p-6 mb-8">
              <p className="text-gray-600 mb-2">Email us at:</p>
              <a
                href="mailto:hello@calckitchen.com"
                className="text-2xl sm:text-3xl font-semibold text-[#E8604C] hover:underline"
              >
                hello@calckitchen.com
              </a>
            </div>

            {/* What We Want to Hear */}
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
              Here are a few things we especially appreciate hearing about:
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E8604C]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#E8604C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Bug reports</h3>
                  <p className="text-gray-600">
                    If a calculator is giving you unexpected results, let us know what inputs you used
                    and what you expected. It helps us fix things fast.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E8604C]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#E8604C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">New calculator ideas</h3>
                  <p className="text-gray-600">
                    Is there a kitchen calculation you&apos;re always doing by hand? Tell us about it.
                    Our best tools have come from user suggestions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E8604C]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#E8604C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">General feedback</h3>
                  <p className="text-gray-600">
                    Love something? Hate something? We want to know.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <p className="text-gray-600">
                We read every email and do our best to respond within a few business days.
                Thanks for helping us make CalcKitchen better for everyone.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
              Looking for something else?
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link
                href="/about"
                className="bg-white rounded-lg p-4 border border-gray-100 hover:border-[#E8604C] hover:shadow-sm transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-1">About Us</h3>
                <p className="text-sm text-gray-600">Learn more about CalcKitchen</p>
              </Link>
              <Link
                href="/privacy-policy"
                className="bg-white rounded-lg p-4 border border-gray-100 hover:border-[#E8604C] hover:shadow-sm transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-1">Privacy Policy</h3>
                <p className="text-sm text-gray-600">How we handle your data</p>
              </Link>
              <Link
                href="/terms-of-use"
                className="bg-white rounded-lg p-4 border border-gray-100 hover:border-[#E8604C] hover:shadow-sm transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-1">Terms of Use</h3>
                <p className="text-sm text-gray-600">Site usage guidelines</p>
              </Link>
            </div>
          </section>

          {/* Popular Calculators */}
          <section>
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
              Popular Calculators
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/air-fryer-converter"
                className="bg-white rounded-lg p-4 border border-gray-100 hover:border-[#E8604C] hover:shadow-sm transition-all text-center"
              >
                <span className="text-gray-900 font-medium">Air Fryer Converter</span>
              </Link>
              <Link
                href="/meat-cooking-time-calculator"
                className="bg-white rounded-lg p-4 border border-gray-100 hover:border-[#E8604C] hover:shadow-sm transition-all text-center"
              >
                <span className="text-gray-900 font-medium">Meat Cooking Time</span>
              </Link>
              <Link
                href="/recipe-scaler"
                className="bg-white rounded-lg p-4 border border-gray-100 hover:border-[#E8604C] hover:shadow-sm transition-all text-center"
              >
                <span className="text-gray-900 font-medium">Recipe Scaler</span>
              </Link>
              <Link
                href="/cooking-measurement-converter"
                className="bg-white rounded-lg p-4 border border-gray-100 hover:border-[#E8604C] hover:shadow-sm transition-all text-center"
              >
                <span className="text-gray-900 font-medium">Measurement Converter</span>
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
