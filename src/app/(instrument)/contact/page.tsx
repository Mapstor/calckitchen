import type { Metadata } from "next";
import Link from "next/link";
import { Hero, Main, Sec } from "@/components/instrument/kit";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { RAIL_DEFAULT } from "@/data/site-nav";

const UPDATED = "2026-11-19"; // CK-009: contact page in the picked look
const TITLE = "Contact CalcKitchen";
const DESC = "Email CalcKitchen at hello@calckitchen.com about a wrong number, a broken calculator or a calculator you'd like to see.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  openGraph: { title: TITLE, description: DESC, url: "https://calckitchen.com/contact", siteName: "CalcKitchen", type: "website" },
  alternates: { canonical: "https://calckitchen.com/contact" },
};

const MORE = RAIL_DEFAULT;

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Contact", url: "https://calckitchen.com/contact" },
        ]}
      />

      <Hero
        visual={null}
        crumb="Contact"
        h1="Contact CalcKitchen"
        answer={
          <>
            Email <a href="mailto:hello@calckitchen.com">hello@calckitchen.com</a>.
          </>
        }
        sub="About a wrong number, a calculator that misbehaves, or a calculator you would like to see."
        updated={UPDATED}
        byline="date"
      />

      <Main more={MORE}>
        <Sec title="What helps us most">
          <ul className="p-tips">
            <li>
              <strong>A wrong number:</strong> the page, the figure, and the source you think says otherwise.
            </li>
            <li>
              <strong>A calculator that misbehaves:</strong> what you typed, what it showed and what you expected, plus your browser and device.
            </li>
            <li>
              <strong>A calculator you&apos;d like:</strong> the kitchen math you do by hand.
            </li>
          </ul>
        </Sec>

        <Sec title="Site policies">
          <p className="p-p">
            <Link href="/about">About CalcKitchen</Link> · <Link href="/privacy-policy">Privacy policy</Link> ·{" "}
            <Link href="/terms-of-use">Terms of use</Link>
          </p>
        </Sec>
      </Main>
    </>
  );
}
