import { Metadata } from "next";
import Link from "next/link";
import CakeServingsCalculator from "@/components/calculators/CakeServingsCalculator";
import LiveDial from "@/components/instrument/LiveDial";
import { Faq, Hero, Main, Sec, Sources, Table, ext, type QA } from "@/components/instrument/kit";
import { BreadcrumbJsonLd, FAQPageJsonLd, WebApplicationJsonLd } from "@/components/seo/JsonLd";
import { SRC_WILTON, WILTON } from "@/data/wilton";
import Dumbbells from "@/components/instrument/Dumbbells";
import { TONE } from "@/components/instrument/Bars";
import { OG_IMAGES, TW_IMAGES } from "@/data/social";
import { UPDATED_AT } from "@/data/updated";

const URL = "https://calckitchen.com/cake-servings-calculator";
const UPDATED = UPDATED_AT["cake-servings-calculator"];
const TITLE = "Cake Servings Calculator: Party and Wedding Servings by Pan Size";
const DESC =
  "How many people a cake feeds, from Wilton's chart: an 8-inch round two-layer cake serves 20 at a party or 24 at a wedding. Stack tiers to see the total.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: { title: TITLE, description: DESC, url: URL, type: "website", images: OG_IMAGES },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: TW_IMAGES },
  alternates: { canonical: URL },
};

const faqs: QA[] = [
  {
    question: "How many servings are in an 8-inch round cake?",
    answer: "A two-layer 8-inch round cake, about 4 inches tall, serves 20 at a party or 24 at a wedding, according to Wilton's chart.",
  },
  {
    question: "How many servings are in a 9x13 sheet cake?",
    answer: "Wilton lists a 9 x 13 in. two-layer sheet cake at 36 party servings or 50 wedding servings.",
  },
  {
    question: "How many people does a 6-inch round cake feed?",
    answer: "12 at a party and 12 at a wedding, as a two-layer cake.",
  },
  {
    question: "How many servings does a 10-inch round cake have?",
    answer: "28 party servings or 38 wedding servings, as a two-layer cake.",
  },
  {
    question: "How many servings are in a 6, 8 and 10 inch tiered cake?",
    answer: "Add the tiers: 12 + 20 + 28 = 60 party servings, or 12 + 24 + 38 = 74 wedding servings.",
  },
  {
    question: "What is the difference between party and wedding servings?",
    answer: "The slice size. Wilton's party servings are about 1½ by 2 inches and its wedding servings about 1 by 2 inches, both the full height of the cake.",
  },
  {
    question: "Does a taller cake give more servings?",
    answer: "Not on Wilton's chart: cakes 3 to 6 inches tall in the same pan give the same number of servings. A cake under 3 inches tall gives half.",
  },
];

const MORE = [
  { href: "/cake-pan-converter", title: "Cake pan converter" },
  { href: "/party-food-calculator", title: "Party food calculator" },
  { href: "/recipe-scaler", title: "Recipe scaler" },
  { href: "/butter-converter", title: "Butter converter" },
  { href: "/cooking-measurement-converter", title: "Measurement converter" },
  { href: "/oven-temperature-converter", title: "Oven temperature converter" },
];

export default function CakeServingsPage() {
  return (
    <>
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Cake Servings Calculator"
        description="Party and wedding servings, batter and icing for one cake or a tiered cake, from Wilton's cake serving chart."
        url={URL}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Cake Servings Calculator", url: URL },
        ]}
      />

      <Hero
        visual={<LiveDial liveKey="servings" min={0} max={200} major={25} minor={5} value={20} unit="servings" suffix="" label="Party servings" />}
        crumb="Baking / Cake servings"
        h1="Cake servings calculator"
        answer={
          <>
            An <span className="p-nb">8-inch</span> round cake serves <span className="p-nb">20</span> at a party,{" "}
            <span className="p-nb">24</span> at a wedding.
          </>
        }
        sub={
          <>
            That&apos;s a two-layer cake about 4 inches tall, cut the way{" "}
            <a href={SRC_WILTON} {...ext}>
              Wilton&apos;s cake serving chart
            </a>{" "}
            assumes. Add tiers to see a whole wedding cake.
          </>
        }
        updated={UPDATED}
      >
        <CakeServingsCalculator />
      </Hero>

      <Main more={MORE}>
        <Sec title="Cake servings chart">
          <p className="p-p">
            Every figure is for a two-layer cake from 2-inch-deep pans, about 4 inches tall. Batter is for one layer, so double it for the
            cake.
          </p>
          <Table
            label="Cake servings by pan shape and size"
            head={["Shape", "Size", "Party", "Wedding", "Batter per layer"]}
            hi={WILTON.findIndex((r) => r.shape === "Round" && r.size === "8 in.")}
            rows={WILTON.map((r) => [r.shape, r.size, String(r.party), String(r.wedding), `${r.cups} cups`])}
          />
          <p className="p-note">Wilton calls these counts a guide; actual results may vary.</p>
        </Sec>

        <Sec title="Party or wedding servings">
          <p className="p-p">
            The difference is the slice. Wilton&apos;s party servings are about 1½ by 2 inches and its wedding servings about 1 by 2 inches,
            both cut the full height of the cake. Height changes less than you might think: cakes 3 to 6 inches tall in the same pan give the
            same number of servings, and a cake under 3 inches tall gives half.
          </p>
          <Dumbbells
            title="Round cakes: party and wedding servings"
            label="Party and wedding servings for round two-layer cakes"
            min={0}
            step={20}
            unit="servings"
            keys={[
              { name: "Party slices, 1½ × 2 in.", tone: TONE.blue },
              { name: "Wedding slices, 1 × 2 in.", tone: TONE.orange },
            ]}
            rows={WILTON.filter((r) => r.shape === "Round").map((r) => ({
              name: `${r.size} round`,
              marks: [
                { lo: r.party, tone: TONE.blue },
                { lo: r.wedding, tone: TONE.orange },
              ],
              text: `${r.party} · ${r.wedding}`,
            }))}
          />
        </Sec>

        <Sec title="Tiered cakes">
          <p className="p-p">
            Add the servings of each tier. A 6, 8 and 10 inch round cake gives 12 + 20 + 28 = 60 party servings, or 12 + 24 + 38 = 74 wedding
            servings. Changing a recipe to fit a different pan? The <Link href="/cake-pan-converter">cake pan converter</Link> works out how
            much to scale it.
          </p>
        </Sec>

        <Faq faqs={faqs} />

        <Sources items={[{ href: SRC_WILTON, title: "Ultimate Cake Serving Chart: Our Ultimate Guide to Perfect Portions", by: "Wilton" }]} />
      </Main>
    </>
  );
}
