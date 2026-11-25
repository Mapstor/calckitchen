import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Hero, Main, Sec, Table, ext, fmtDate } from "@/components/instrument/kit";
import { BreadcrumbJsonLd, OrganizationJsonLd, PersonJsonLd } from "@/components/seo/JsonLd";
import { AUTHOR } from "@/data/author";
import { CONV } from "@/data/convection";
import { GAS_ROWS } from "@/data/oven-temps";
import { groupRegistry, readRegistry } from "@/data/registry";
import { NAV, RAIL_DEFAULT } from "@/data/site-nav";
import { OG_IMAGES, TW_IMAGES } from "@/data/social";
import { UNITS } from "@/data/units";
import { UPDATED_AT } from "@/data/updated";

const UPDATED = UPDATED_AT["about"];
const TITLE = "About CalcKitchen";
const DESC =
  "Who makes CalcKitchen and how its numbers are sourced: USDA, NIST, FDA and appliance makers, each figure checked against its source and linked on its page.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  openGraph: { title: TITLE, description: DESC, url: "https://calckitchen.com/about", siteName: "CalcKitchen", type: "website", images: OG_IMAGES },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: TW_IMAGES },
  alternates: { canonical: "https://calckitchen.com/about" },
};

const MORE = RAIL_DEFAULT;

/** Exact values print without float noise: 3785.411784 / 256 -> "14.78676478125". */
const exact = (x: number) => String(Number(x.toFixed(11)));

// The units table: definitions from NIST's Guide to the SI, Appendix B (research/data-sources.csv NIST-SI-B9); values from src/data/units.ts.
const UNIT_ROWS: [string, string, string][] = [
  ["US gallon", "231 cubic inches", `${exact(UNITS.gal.base / 1000)} L`],
  ["Cup", "1/16 gallon", `${exact(UNITS.cup.base)} mL`],
  ["Tablespoon", "1/16 cup", `${exact(UNITS.tbsp.base)} mL`],
  ["Teaspoon", "1/3 tablespoon", `${exact(UNITS.tsp.base)} mL`],
  ["Fluid ounce", "1/128 gallon", `${exact(UNITS["fl oz"].base)} mL`],
  ["Pound", "0.45359237 kilogram", `${exact(UNITS.lb.base)} g`],
  ["Ounce (weight)", "1/16 pound", `${exact(UNITS.oz.base)} g`],
];

// The oven example: 350°F, its exact °C and the chart row ovens print (research/data-sources.csv NIST-SI-B9, WHICH-OVEN).
const OVEN_F = 350;
const OVEN_ROW = GAS_ROWS.find((r) => r.f === OVEN_F)!;
const OVEN_EXACT_C = ((OVEN_F - 32) / 1.8).toFixed(1);

export default function AboutPage() {
  const count = NAV.reduce((a, g) => a + g.links.length, 0);
  const registry = readRegistry();
  const groups = groupRegistry(registry);
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
        sub="Each answer is stated up front, and each figure comes from the agency, manufacturer or standards body that published it, with a link on the page that uses it."
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
                Marko holds an MPharm from the {AUTHOR.school}. He builds CalcKitchen&apos;s calculators and writes its pages, and he read every page on
                the site in November 2026.
              </p>
              <p className="p-p">
                <a href={AUTHOR.linkedin} rel="me noopener noreferrer" target="_blank">
                  Marko Visic on LinkedIn
                </a>
              </p>
            </div>
          </div>
        </Sec>

        <Sec title="Where the numbers come from" id="methodology">
          <p className="p-p">
            Every figure on a calculator page comes from a <strong>primary source</strong>: the agency, university, manufacturer or standards body
            that published it. When no primary source gives a figure, it stays off the site, even if other cooking sites print it. Right now that
            means {registry.length} documents, each listed <a href="#all-sources">at the bottom of this page</a> with the
            date it was read.
          </p>
          <p className="p-p">The primary source for each kind of number:</p>
          <ul className="p-tips">
            <li>
              <strong>Food safety:</strong> the USDA Food Safety and Inspection Service and FoodSafety.gov, for safe internal temperatures, roasting
              and thawing times and slow cooker safety.
            </li>
            <li>
              <strong>Units:</strong> the National Institute of Standards and Technology (NIST), which defines the US cup, tablespoon, ounce and
              pound and gives the °F to °C formula.
            </li>
            <li>
              <strong>Food weights and nutrients:</strong> USDA FoodData Central.
            </li>
            <li>
              <strong>Serving sizes:</strong> the FDA and USDA labeling rules (21 CFR 101.12, 9 CFR 317.312 and 381.412).
            </li>
            <li>
              <strong>Appliances:</strong> the maker&apos;s own manual or help page (GE Appliances, Frigidaire, Hotpoint, Crock-Pot), and University
              of Illinois Extension for air fryers.
            </li>
            <li>
              <strong>Doneness and oven dials:</strong> the Beef Checkoff and America&apos;s Test Kitchen for doneness levels such as medium-rare,
              shown next to USDA&apos;s safe minimums, and Which? and a Hotpoint oven manual for gas marks and fan-oven settings.
            </li>
            <li>
              <strong>Baking and coffee:</strong> Wilton for cake servings and pans, King Arthur Baking for baker&apos;s percentages and sourdough,
              the EU&apos;s Pizza Napoletana specification, and the Specialty Coffee Association and National Coffee Association for brewing ratios.
            </li>
          </ul>
        </Sec>

        <Sec title="From the source to the calculator" id="process">
          <ol className="p-tips">
            <li>
              <strong>Go to the publisher.</strong> A figure is traced to the organization that published it. A blog post or a chart that copies
              USDA doesn&apos;t count; the USDA page does.
            </li>
            <li>
              <strong>Record it.</strong> Each source gets an entry in CalcKitchen&apos;s source register: title, publisher, link, the date it was read
              and the values taken from it. The values it publishes are copied into a data record, in the source&apos;s own units and ranges.
            </li>
            <li>
              <strong>Check every number.</strong> Each calculator reads its numbers from a data file. A check script compares every number in that
              file, and every figure written in the page text, with the data record, and a change that fails the check doesn&apos;t go live. Each
              check was tested by planting a wrong number to make sure it fails.
            </li>
            <li>
              <strong>Link it.</strong> Each calculator page lists its sources at the bottom with links to the original documents, so any figure can
              be checked where it came from.
            </li>
            <li>
              <strong>Test the calculator.</strong> Before a change goes live, every calculator is opened in a browser at phone and desktop sizes. It
              has to load, accept a new number, update its answer and fit the screen.
            </li>
          </ol>
        </Sec>

        <Sec title="How the math works" id="math">
          <p className="p-p">
            <strong>Units are exact.</strong> The converters use NIST&apos;s definitions of US kitchen units, which are exact definitions, not rounded
            approximations:
          </p>
          <Table label="US kitchen units as NIST defines them" head={["Unit", "Defined as", "Metric"]} rows={UNIT_ROWS} />
          <p className="p-p p-mt">
            <strong>Temperatures use NIST&apos;s formula</strong>, °C = (°F − 32) ÷ 1.8, shown to one decimal: {OVEN_F}°F is {OVEN_EXACT_C}°C. When a
            temperature is on a published oven chart, the <Link href="/oven-temperature-converter">oven temperature converter</Link> also shows the
            setting ovens print, which for {OVEN_F}°F is {OVEN_ROW.c}°C, gas mark {OVEN_ROW.gm} or {OVEN_ROW.fan}°C on a fan oven.
          </p>
          <p className="p-p">
            <strong>Weight and volume stay apart.</strong> A cup of flour and a cup of honey weigh different amounts. The{" "}
            <Link href="/cooking-measurement-converter">cooking measurement converter</Link> turns cups into grams only for ingredients that USDA
            FoodData Central lists with a weight per cup, and the <Link href="/recipe-cost-calculator">recipe cost calculator</Link> converts within
            weight or within volume, never between them.
          </p>
          <p className="p-p">
            <strong>Ranges stay ranges.</strong> USDA gives roasting and thawing times as ranges, and the calculators answer with the same range
            rather than one precise-looking minute count.
          </p>
          <p className="p-p">
            <strong>Doneness is a temperature.</strong> Cooking times are estimates. The meat and turkey pages tell you to check the internal
            temperature with a food thermometer against USDA&apos;s safe minimum.
          </p>
        </Sec>

        <Sec title="What stays off the site" id="left-out">
          <p className="p-p">Some kitchen numbers get repeated across the web with no primary source behind them. CalcKitchen leaves these out:</p>
          <ul className="p-tips">
            <li>A per-pound turkey roasting rate and spatchcocked turkey times. USDA&apos;s turkey guidance gives neither.</li>
            <li>
              A {CONV.roastTimeCutPct}% time cut for convection baking. Frigidaire gives that cut for convection roasting; for baking it says to lower
              the temperature by {CONV.bakeDropF}°F and use the recipe&apos;s shortest time.
            </li>
            <li>
              New York, Detroit and Sicilian pizza presets. CalcKitchen found no primary source for their dough ratios; the Neapolitan preset follows
              the EU&apos;s Pizza Napoletana rules.
            </li>
            <li>Cup-to-gram weights in the recipe cost calculator, which would need a guess for every ingredient.</li>
            <li>A roasting time for 7 to 9 lb legs of lamb, which the USDA roasting chart doesn&apos;t list.</li>
          </ul>
          <p className="p-p p-mt">Where a missing figure matters to your answer, the calculator page says so.</p>
        </Sec>

        <Sec title="Dates, corrections and limits" id="corrections">
          <p className="p-p">
            <strong>Updated dates are real.</strong> The date under each page title changes only when that page&apos;s content changes. Design and
            code fixes don&apos;t move it.
          </p>
          <p className="p-p">
            <strong>Corrections.</strong> If a figure doesn&apos;t match its source, email <a href="mailto:info@calckitchen.com">info@calckitchen.com</a>{" "}
            with the page and the number. When the source confirms it, the page is corrected and its date changes.
          </p>
          <p className="p-p">
            <strong>Limits.</strong> The calculators are for home cooking, and their results are estimates. Meat, poultry and fish are done when a
            food thermometer says so, and nutrition figures describe the ingredients you enter; they aren&apos;t diet advice.
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

        <Sec title="Every source behind the numbers" id="all-sources">
          <p className="p-p">
            All {registry.length} documents in CalcKitchen&apos;s source register, grouped by who published them, with the date each one was read and
            the calculators that use it.
          </p>
          {groups.map((g) => (
            <div key={g.name}>
              <h3 className="p-h3">{g.name}</h3>
              <ul className="p-tips">
                {g.rows.map((r) => (
                  <li key={r.id}>
                    <a href={r.url} {...ext}>
                      {r.title}
                    </a>
                    , {r.publisher}. Read {fmtDate(r.retrieved)}.
                    {r.pages.length > 0 && (
                      <>
                        {" "}
                        Used on{" "}
                        {r.pages.map((p, i) => (
                          <span key={p.href}>
                            <Link href={p.href}>{p.name}</Link>
                            {i < r.pages.length - 2 ? ", " : i === r.pages.length - 2 ? " and " : ""}
                          </span>
                        ))}
                        {r.everyPage ? ", and for every °F and °C conversion on the site" : ""}.
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
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
