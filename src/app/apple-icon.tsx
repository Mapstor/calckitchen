import { ImageResponse } from "next/og";
import { Mark } from "@/components/brand/Mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Home-screen icon: the thermometer mark on ink.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0E1621" }}>
        <Mark h={130} dark />
      </div>
    ),
    { ...size },
  );
}
