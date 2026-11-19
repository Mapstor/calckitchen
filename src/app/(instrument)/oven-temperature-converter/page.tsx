import { Metadata } from "next";
import Link from "next/link";
import OvenTemperatureConverter from "@/components/calculators/OvenTemperatureConverter";
import LiveKnob from "@/components/instrument/LiveKnob";
import { Faq, Hero, Main, Sec, Sources, Table, ext, type QA } from "@/components/instrument/kit";
import { BreadcrumbJsonLd, FAQPageJsonLd, WebApplicationJsonLd } from "@/components/seo/JsonLd";
import { GAS_ROWS, SRC_OVEN, cToF, fToC, fmt1 } from "@/data/oven-temps";

const URL = "https://calckitchen.com/oven-temperature-converter";
const UPDATED = "2026-11-19"; // CK-008: rebuilt on NIST, Which? and Hotpoint figures
const TITLE = "Oven Temperature Converter: Fahrenheit, Celsius and Gas Mark Chart";
const DESC =
  "Convert oven temperatures between °F, °C and gas marks. 350°F is 176.7°C; UK recipes write it as 180°C, gas mark 4. Full chart with fan oven settings.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: { title: TITLE, description: DESC, url: URL, type: "website" },
  alternates: { canonical: URL },
};

const faqs: QA[] = [
  {
    question: "What is 350°F in Celsius?",
    answer:
      "350°F is 176.7°C. UK recipes and the Which? oven chart write it as 180°C, which is gas mark 4 (160°C in a fan oven).",
  },
  {
    question: "What is 180°C in Fahrenheit?",
    answer: "180°C is 356°F. The Which? chart pairs 180°C with 350°F and gas mark 4, so set a Fahrenheit oven to 350°F.",
  },
  {
    question: "What is 200°C in Fahrenheit?",
    answer: "200°C is 392°F. On the Which? chart, 200°C is 400°F and gas mark 6.",
  },
  {
    question: "What is 425°F in Celsius?",
    answer: "425°F is 218.3°C. The Which? chart lists it as 220°C, gas mark 7, and 200°C in a fan oven.",
  },
  {
    question: "What temperature is gas mark 4?",
    answer: "Gas mark 4 is 350°F, or 180°C, on the Which? chart, and 160°C in a fan oven. Each gas mark from 1 to 9 is 25°F apart.",
  },
  {
    question: "How do I convert Celsius to Fahrenheit?",
    answer: "Multiply by 1.8 and add 32. For 220°C: 220 × 1.8 = 396, and 396 + 32 = 428°F.",
  },
  {
    question: "Should I lower the temperature for a fan oven?",
    answer:
      "Which? says fan oven temperatures are typically about 20°C lower than conventional ones, so a recipe's 180°C becomes 160°C in a fan oven. US convection ovens are covered on the convection oven converter.",
  },
];

const F_ROWS = [200, 225, 250, 275, 300, 325, 350, 375, 400, 425, 450, 475, 500, 550];
const C_ROWS = [100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260];

const MORE = [
  { href: "/convection-oven-converter", title: "Convection oven converter" },
  { href: "/air-fryer-converter", title: "Air fryer converter" },
  { href: "/turkey-cooking-calculator", title: "Turkey cooking time" },
  { href: "/meat-temperature-chart", title: "Meat temperature chart" },
  { href: "/cooking-measurement-converter", title: "Measurement converter" },
  { href: "/recipe-scaler", title: "Recipe scaler" },
];

const dash = "—";

export default function OvenTemperatureConverterPage() {
  return (
    <>
      <FAQPageJsonLd faqs={faqs} />
      <WebApplicationJsonLd
        name="Oven Temperature Converter"
        description="Converts oven temperatures between Fahrenheit, Celsius and gas marks, with fan oven settings."
        url={URL}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://calckitchen.com" },
          { name: "Oven Temperature Converter", url: URL },
        ]}
      />

      <Hero
        visual={<LiveKnob />}
        crumb="Appliance converters / Oven temperature"
        h1="Oven temperature converter"
        answer={
          <>
            <span className="p-nb">350°F</span> is <span className="p-nb">176.7°C.</span>
          </>
        }
        sub={
          <>
            UK recipes write it as 180°C, or gas mark 4. The °C figures use the{" "}
            <a href={SRC_OVEN.nist} {...ext}>
              NIST conversion formula
            </a>
            ; gas marks and fan settings come from the{" "}
            <a href={SRC_OVEN.which} {...ext}>
              Which? oven chart
            </a>
            .
          </>
        }
        updated={UPDATED}
      >
        <OvenTemperatureConverter />
      </Hero>

      <Main more={MORE}>
        <Sec title="Oven temperature conversion chart">
          <p className="p-p">
            The exact column is the arithmetic. The UK column is what British recipes and the Which? chart print: it rounds to a tidy
            number, so 350°F appears as 180°C rather than 176.7°C. Gas marks run in 25°F steps from gas mark 1 at 275°F to gas mark 9
            at 475°F.
          </p>
          <Table
            label="Oven temperature conversion chart"
            head={["°F", "°C exact", "°C, UK chart", "Gas mark", "Fan oven °C"]}
            hi={F_ROWS.indexOf(350)}
            rows={F_ROWS.map((f) => {
              const r = GAS_ROWS.find((g) => g.f === f);
              return [`${f}°F`, `${fmt1(fToC(f))}°C`, r ? `${r.c}°C` : dash, r ? r.gm : dash, r ? `${r.fan}°C` : dash];
            })}
          />
          <p className="p-note">
            Gas marks 1 to 9 and their °C and fan settings are from Which?. Gas mark ½ is from{" "}
            <a href={SRC_OVEN.hotpoint} {...ext}>
              Hotpoint&apos;s cooker manual
            </a>
            ; Which? starts at gas mark 1. A dash means the chart has no gas mark for that temperature.
          </p>
        </Sec>

        <Sec title="How to convert Fahrenheit to Celsius">
          <p className="p-p">Subtract 32, then divide by 1.8. This is the formula in NIST&apos;s guide to the SI units.</p>
          <p className="p-formula">°C = (°F − 32) ÷ 1.8</p>
          <p className="p-p">
            For 350°F: 350 − 32 = 318, and 318 ÷ 1.8 = 176.7°C. For 400°F: 368 ÷ 1.8 = 204.4°C, which the Which? chart prints as 200°C.
          </p>
        </Sec>

        <Sec title="How to convert Celsius to Fahrenheit">
          <p className="p-p">Multiply by 1.8, then add 32.</p>
          <p className="p-formula">°F = °C × 1.8 + 32</p>
          <p className="p-p">
            For 180°C: 180 × 1.8 = 324, and 324 + 32 = 356°F. The Which? chart pairs 180°C with 350°F, the usual US setting. The chart
            column below shows that pairing for every °C value Which? lists.
          </p>
          <Table
            label="Celsius to Fahrenheit oven temperatures"
            head={["°C", "°F exact", "°F, UK chart", "Gas mark"]}
            hi={C_ROWS.indexOf(180)}
            rows={C_ROWS.map((c) => {
              const r = GAS_ROWS.find((g) => g.c === c);
              return [`${c}°C`, `${fmt1(cToF(c))}°F`, r ? `${r.f}°F` : dash, r ? r.gm : dash];
            })}
          />
        </Sec>

        <Sec title="Fan and convection ovens">
          <p className="p-p">
            Which? says fan oven temperatures are typically about 20°C lower than conventional ones, and its chart&apos;s fan column
            follows that: gas mark 4 is 180°C, or 160°C with the fan on. US recipes for convection ovens use Fahrenheit; the{" "}
            <Link href="/convection-oven-converter">convection oven converter</Link> handles those.
          </p>
        </Sec>

        <Faq faqs={faqs} />

        <Sources
          items={[
            { href: SRC_OVEN.nist, title: "NIST Guide to the SI, Appendix B.9: Factors for units listed by kind of quantity", by: "National Institute of Standards and Technology" },
            { href: SRC_OVEN.which, title: "Oven temperature conversion table", by: "Which?" },
            { href: SRC_OVEN.hotpoint, title: "Hotpoint DQ47 instructions, temperature conversion chart", by: "Hotpoint (via ManualsLib)" },
          ]}
        />
      </Main>
    </>
  );
}
