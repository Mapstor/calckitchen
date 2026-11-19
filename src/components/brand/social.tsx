import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { Mark } from "./Mark";
import { SOCIAL_ALT } from "@/data/social";

export { SOCIAL_ALT };

// Social card (Open Graph and Twitter): white page, ink type, the thermometer mark and an orange rule, in Public Sans
// read from the self-hosted font files (static .woff; ImageResponse can't read .woff2). No remote fetch.

export const SOCIAL_SIZE = { width: 1200, height: 630 };

const font = (f: string) => readFile(join(process.cwd(), "src/app/(instrument)/fonts", f));

export async function socialImage() {
  const [black, medium] = await Promise.all([font("public-sans-latin-900-normal.woff"), font("public-sans-latin-500-normal.woff")]);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#FFFFFF", padding: "72px 84px", fontFamily: "Public Sans", color: "#0E1621" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <Mark h={150} />
          <div style={{ fontSize: 104, fontWeight: 900, letterSpacing: -3 }}>CalcKitchen</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ width: 160, height: 10, background: "#E35A0F" }} />
          <div style={{ display: "flex", flexDirection: "column", fontSize: 54, fontWeight: 900, letterSpacing: -1.2, lineHeight: 1.08 }}>
            <span>Kitchen calculators.</span>
            <span>Every number from its source.</span>
          </div>
          <div style={{ fontSize: 30, fontWeight: 500, color: "#4A5563" }}>Oven and air fryer conversions, roasting times, baking and recipe math.</div>
        </div>
      </div>
    ),
    {
      ...SOCIAL_SIZE,
      fonts: [
        { name: "Public Sans", data: black, weight: 900, style: "normal" },
        { name: "Public Sans", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
