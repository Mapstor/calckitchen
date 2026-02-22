import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "CalcKitchen - Free Kitchen Calculators";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FAFAF8",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #FEF3C7 0%, transparent 50%), radial-gradient(circle at 75% 75%, #DCFCE7 0%, transparent 50%)",
        }}
      >
        {/* Main content container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
          }}
        >
          {/* Icon row */}
          <div
            style={{
              display: "flex",
              gap: "24px",
              marginBottom: "32px",
              fontSize: "64px",
            }}
          >
            <span>🍳</span>
            <span>📐</span>
            <span>🥧</span>
            <span>⏱️</span>
            <span>🍰</span>
          </div>

          {/* Logo / Title */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "20px",
                background: "linear-gradient(135deg, #E8604C 0%, #D44A37 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "48px",
                boxShadow: "0 8px 32px rgba(232, 96, 76, 0.3)",
              }}
            >
              🧮
            </div>
            <span
              style={{
                fontSize: "72px",
                fontWeight: "bold",
                color: "#1a1a1a",
                letterSpacing: "-2px",
              }}
            >
              CalcKitchen
            </span>
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: "36px",
              color: "#4B5563",
              marginBottom: "40px",
            }}
          >
            Kitchen Math, Solved.
          </div>

          {/* Features */}
          <div
            style={{
              display: "flex",
              gap: "32px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {[
              "Air Fryer Converter",
              "Meat Cooking Times",
              "Recipe Scaler",
              "Cake Servings",
            ].map((feature) => (
              <div
                key={feature}
                style={{
                  backgroundColor: "white",
                  padding: "12px 24px",
                  borderRadius: "100px",
                  fontSize: "24px",
                  color: "#374151",
                  border: "2px solid #E5E7EB",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                {feature}
              </div>
            ))}
          </div>

          {/* Bottom text */}
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              fontSize: "24px",
              color: "#9CA3AF",
            }}
          >
            20 Free Kitchen Calculators • No Signup Required
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
