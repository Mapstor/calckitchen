import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CalcKitchen — Free Kitchen Calculators & Cooking Converters",
    template: "%s | CalcKitchen",
  },
  description:
    "20 free kitchen calculators: air fryer converter, meat cooking times, recipe scaler, cake servings, and more. Fast answers, no signup required.",
  metadataBase: new URL("https://calckitchen.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://calckitchen.com",
    siteName: "CalcKitchen",
    title: "CalcKitchen — Free Kitchen Calculators & Cooking Converters",
    description:
      "20 free kitchen calculators: air fryer converter, meat cooking times, recipe scaler, cake servings, and more. Fast answers, no signup required.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CalcKitchen — Free Kitchen Calculators & Cooking Converters",
    description:
      "20 free kitchen calculators: air fryer converter, meat cooking times, recipe scaler, cake servings, and more.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "google12f8c2f9c03913a3",
    other: {
      "msvalidate.01": "57C407E8336C4915E2D28EEA649C8078",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-K74JKGWGDQ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K74JKGWGDQ');
          `}
        </Script>
      </head>
      <body
        className={`${inter.variable} ${lora.variable} font-sans antialiased bg-warm-white text-gray-900`}
      >
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
