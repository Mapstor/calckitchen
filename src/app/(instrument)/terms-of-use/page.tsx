import type { Metadata } from "next";
import Link from "next/link";
import { Hero, Main, Sec } from "@/components/instrument/kit";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { RAIL_DEFAULT } from "@/data/site-nav";
import { OG_IMAGES, TW_IMAGES } from "@/data/social";

const UPDATED = "2026-11-19"; // CK-009: removed advertising and affiliate terms (neither runs on the site); operator and governing law match the privacy policy
const TITLE = "Terms of Use";
const DESC = "CalcKitchen's terms: the calculators give estimates for home cooking, food safety is checked with a thermometer, and the content is ours to share by link.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: { title: `${TITLE} | CalcKitchen`, description: DESC, url: "https://calckitchen.com/terms-of-use", siteName: "CalcKitchen", type: "website", images: OG_IMAGES },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: TW_IMAGES },
  alternates: { canonical: "https://calckitchen.com/terms-of-use" },
};

const MORE = RAIL_DEFAULT;

export default function TermsOfUsePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Terms of Use", url: "https://calckitchen.com/terms-of-use" },
        ]}
      />

      <Hero
        visual={null}
        crumb="Terms of use"
        h1="Terms of use"
        long
        answer="CalcKitchen's results are estimates for home cooking. Check meat, poultry and fish with a food thermometer."
        sub="Using calckitchen.com means accepting these terms. The site is operated by Moving Data Systems d.o.o., Smolnik 62, 2342 Ruse, Slovenia."
        updated={UPDATED}
        byline="date"
      />

      <Main more={MORE}>
        <Sec title="1. Estimates, not guarantees">
          <p className="p-p">
            Cooking times, temperatures, conversions, servings, costs and nutrition figures are estimates based on the sources each page names. Ovens,
            appliances, ingredients and altitude vary, and so do results. Each page links the source of its figures so you can check them.
          </p>
        </Sec>

        <Sec title="2. Food safety">
          <p className="p-p">
            A cooking time is not proof that food is safe. Check meat, poultry, fish and leftovers against the USDA&apos;s safe minimum internal
            temperatures with a food thermometer; our <Link href="/meat-temperature-chart">meat temperature chart</Link> lists them. You are
            responsible for handling, cooking and storing food safely.
          </p>
        </Sec>

        <Sec title="3. Not professional advice">
          <p className="p-p">
            CalcKitchen is for home cooks. It is not medical, dietary, nutritional or business advice. Calorie and macro figures are approximate; for a
            medical diet or a food allergy, ask a qualified professional. Recipe costs depend on the prices you enter.
          </p>
        </Sec>

        <Sec title="4. Sources">
          <p className="p-p">
            CalcKitchen quotes government data, standards and manufacturer guidance, and is not affiliated with or endorsed by USDA, FDA, NIST or any
            company it cites. Guidance can change; the source links show the current version.
          </p>
        </Sec>

        <Sec title="5. Liability">
          <p className="p-p">
            The site is provided as is, without warranties. To the extent the law allows, Moving Data Systems d.o.o. is not liable for damages arising
            from using the site or relying on its results, including errors in calculations or content.
          </p>
        </Sec>

        <Sec title="6. Content and links">
          <p className="p-p">
            The text, calculators, design and code are ours or our licensors&apos;. Linking to any page is welcome; copying content needs written
            permission. Links to other sites are for reference, and we are not responsible for their content.
          </p>
        </Sec>

        <Sec title="7. Fair use of the site">
          <p className="p-p">
            Don&apos;t disrupt or overload the site, try to access what isn&apos;t public, scrape it beyond reasonable use, or use it unlawfully.
          </p>
        </Sec>

        <Sec title="8. Changes and governing law">
          <p className="p-p">
            We may change these terms or the site at any time; the date at the top shows the latest version. These terms are governed by the laws of
            the Republic of Slovenia. Questions: <a href="mailto:info@calckitchen.com">info@calckitchen.com</a>. See also the{" "}
            <Link href="/privacy-policy">privacy policy</Link>.
          </p>
        </Sec>
      </Main>
    </>
  );
}
