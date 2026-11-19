import type { Metadata } from "next";
import Link from "next/link";
import { Hero, Main, Sec, ext } from "@/components/instrument/kit";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { RAIL_DEFAULT } from "@/data/site-nav";

const UPDATED = "2026-11-19"; // CK-009: matches what runs on the site: Google Analytics 4 and Vercel hosting; no ads or affiliate links
const TITLE = "Privacy Policy";
const DESC = "What CalcKitchen collects: Google Analytics 4 usage statistics and the request data our host Vercel needs to serve pages. No accounts, no ads, no affiliate links.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: { title: `${TITLE} | CalcKitchen`, description: DESC, url: "https://calckitchen.com/privacy-policy", siteName: "CalcKitchen", type: "website" },
  alternates: { canonical: "https://calckitchen.com/privacy-policy" },
};

const MORE = RAIL_DEFAULT;

export default function PrivacyPolicyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Privacy Policy", url: "https://calckitchen.com/privacy-policy" },
        ]}
      />

      <Hero
        visual={null}
        crumb="Privacy policy"
        h1="Privacy policy"
        long
        answer="We collect usage statistics with Google Analytics, and our host handles the request data needed to serve pages. That's all."
        sub="No accounts, no forms, no ads and no affiliate links. The calculators run in your browser; what you type into them is not sent to us."
        updated={UPDATED}
        byline="date"
      />

      <Main more={MORE}>
        <Sec title="Who runs the site">
          <p className="p-p">
            CalcKitchen (calckitchen.com) is operated by Moving Data Systems d.o.o., Smolnik 62, 2342 Ruse, Slovenia, which is responsible for the
            data described here. Contact: <a href="mailto:hello@calckitchen.com">hello@calckitchen.com</a>.
          </p>
        </Sec>

        <Sec title="Google Analytics">
          <p className="p-p">
            We use Google Analytics 4 to count visits and see which pages and calculators people use. It records pages viewed, approximate location,
            device and browser, and the site you came from, and sets its own cookies (named _ga and _ga_ followed by an ID) on calckitchen.com to
            tell visits apart.
          </p>
          <p className="p-p">
            Google processes this data under its own{" "}
            <a href="https://policies.google.com/privacy" {...ext}>
              privacy policy
            </a>
            . To opt out, block cookies for this site in your browser or install Google&apos;s{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" {...ext}>
              opt-out browser add-on
            </a>
            .
          </p>
        </Sec>

        <Sec title="Hosting">
          <p className="p-p">
            The site is hosted by Vercel, which receives the technical data any website gets with each request, such as your IP address and browser,
            in order to deliver the page. See{" "}
            <a href="https://vercel.com/legal/privacy-policy" {...ext}>
              Vercel&apos;s privacy policy
            </a>
            . Fonts are served from calckitchen.com itself.
          </p>
        </Sec>

        <Sec title="What we don't do">
          <ul className="p-tips">
            <li>No accounts, sign-ups or newsletters, and no contact forms; email is the only way to reach us.</li>
            <li>No advertising and no affiliate links. If that changes, this page will name the services before they go live.</li>
            <li>We don&apos;t sell personal information or share it for advertising.</li>
          </ul>
        </Sec>

        <Sec title="Your rights">
          <p className="p-p">
            If you are in the European Economic Area or the UK, the GDPR gives you the right to access, correct, delete, restrict or object to the
            processing of your personal data, and to complain to a data protection authority; in Slovenia that is the Information Commissioner. We
            use Google Analytics on the basis of our legitimate interest in knowing how the site is used. California residents have the right to know
            what is collected and to ask for deletion; we don&apos;t sell personal information. For any request, email{" "}
            <a href="mailto:hello@calckitchen.com">hello@calckitchen.com</a>.
          </p>
          <p className="p-p">
            Google and Vercel may process data in the United States and other countries. CalcKitchen is meant for a general audience and is not
            directed at children under 13.
          </p>
        </Sec>

        <Sec title="Changes">
          <p className="p-p">
            When this policy changes, the date at the top changes with it. See also the <Link href="/terms-of-use">terms of use</Link>.
          </p>
        </Sec>
      </Main>
    </>
  );
}
