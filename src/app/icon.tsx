import { ImageResponse } from "next/og";
import { Mark } from "@/components/brand/Mark";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Favicon: the thermometer mark on ink (DESIGN.md: no emoji, no gradients).
export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0E1621", borderRadius: 6 }}>
        <Mark h={26} dark />
      </div>
    ),
    { ...size },
  );
}
