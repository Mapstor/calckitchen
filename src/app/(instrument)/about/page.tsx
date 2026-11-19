import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Hero, Main, Sec } from "@/components/instrument/kit";
import { BreadcrumbJsonLd, OrganizationJsonLd, PersonJsonLd } from "@/components/seo/JsonLd";
import { AUTHOR } from "@/data/author";
import { NAV, RAIL_DEFAULT } from "@/data/site-nav";
import { OG_IMAGES, TW_IMAGES } from "@/data/social";

const UPDATED = "2026-11-19"; // CK-009: About rewritten for the picked look; sourcing section matches the rebuilt pages
const TITLE = "About CalcKitchen";
const DESC =
  "Who makes CalcKitchen: Marko Visic, MPharm (Faculty of Pharmacy, University of Ljubljana, Slovenia). 20 free kitchen calculators and where every figure comes from.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  openGraph: { title: TITLE, description: DESC, url: "https://calckitchen.com/about", siteName: "CalcKitchen", type: "website", images: OG_IMAGES },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: TW_IMAGES },
  alternates: { canonical: "https://calckitchen.com/about" },
};

const SOURCES: [string, string, string][] = [
  ["USDA Food Safety and Inspection Service and FoodSafety.gov", "safe internal temperatures, roasting and thawing times, slow cooker safety", "/meat-temperature-chart"],
  ["FDA and USDA labeling rules (21 CFR 101.12, 9 CFR 317.312 and 381.412)", "reference serving sizes for party amounts", "/party-food-calculator"],
  ["USDA FoodData Central", "ingredient weights per cup and nutrients", "/cooking-measurement-converter"],
  ["NIST Guide to the SI", "temperature, volume and weight units", "/oven-temperature-converter"],
  ["University of Illinois Extension", "the air fryer rule", "/air-fryer-converter"],
  ["GE Appliances, Frigidaire, Crock-Pot", "microwave, convection and slow cooker conversions from their manuals and help pages", "/microwave-to-oven-converter"],
  ["Wilton, King Arthur Baking, Land O'Lakes, the EU Pizza Napoletana rules", "cake servings and pans, sourdough and baker's percentages, butter sticks, Neapolitan dough", "/cake-servings-calculator"],
  ["Specialty Coffee Association, National Coffee Association", "coffee to water ratios", "/coffee-ratio-calculator"],
];

const MORE = RAIL_DEFAULT;

export default function AboutPage() {
  const count = NAV.reduce((a, g) => a + g.links.length, 0);
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "About", url: "https://calckitchen.com/about" },
        ]}
      />
      <OrganizationJsonLd name="CalcKitchen" url="https://calckitchen.com" description="Free kitchen calculators for cooking times, oven and appliance conversions, baking and recipes." />
      <PersonJsonLd />

      <Hero
        visual={null}
        crumb="About"
        h1="About CalcKitchen"
        answer={
          <>
            {count} kitchen calculators, made by <span className="p-nb">{AUTHOR.name}</span>.
          </>
        }
        sub="Cooking times, oven and appliance conversions, baking and recipe math, each answer stated up front and each figure linked to the source it came from."
        updated={UPDATED}
      />

      <Main more={MORE}>
        <Sec title="Who makes CalcKitchen" id="author-bio">
          <div className="p-author">
            <Image src={AUTHOR.image} alt={`Portrait of ${AUTHOR.name}`} width={120} height={120} />
            <div>
              <p className="p-p">
                <strong>
                  {AUTHOR.name}, {AUTHOR.credential}
                </strong>
              </p>
              <p className="p-p">
                Marko holds an MPharm from the {AUTHOR.school}. He builds CalcKitchen&apos;s calculators and writes its pages.
              </p>
              <p className="p-p">
                <a href={AUTHOR.linkedin} rel="me noopener noreferrer" target="_blank">
                  Marko Visic on LinkedIn
                </a>
              </p>
            </div>
          </div>
        </Sec>

        <Sec title="Where the figures come from">
          <p className="p-p">
            Every number on a calculator page traces to a published source, named on that page with a link. A figure we can&apos;t trace doesn&apos;t
            go on the site. The main sources:
          </p>
          <ul className="p-tips">
            {SOURCES.map(([who, what, href]) => (
              <li key={who}>
                <strong>{who}:</strong> <Link href={href}>{what}</Link>.
              </li>
            ))}
          </ul>
          <p className="p-p p-mt">
            Calculator results are estimates for home cooking. For meat, poultry and fish, check the internal temperature with a food thermometer.
          </p>
        </Sec>

        <Sec title="The calculators">
          {NAV.map((g) => (
            <p className="p-p" key={g.name}>
              <strong>{g.name}:</strong>{" "}
              {g.links.map((l, i) => (
                <span key={l.href}>
                  <Link href={l.href}>{l.name}</Link>
                  {i < g.links.length - 1 ? ", " : "."}
                </span>
              ))}
            </p>
          ))}
        </Sec>

        <Sec title="Contact">
          <p className="p-p">
            Found a wrong number or a broken calculator? Email <a href="mailto:info@calckitchen.com">info@calckitchen.com</a>. CalcKitchen is run by
            Moving Data Systems d.o.o., Slovenia; see the <Link href="/privacy-policy">privacy policy</Link> and{" "}
            <Link href="/terms-of-use">terms of use</Link>.
          </p>
        </Sec>
      </Main>
    </>
  );
}
