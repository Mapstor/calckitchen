import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

// Fonts, header and footer live in the route-group layouts: (classic) for pages not yet redesigned,
// (instrument) for pages in the picked look (DESIGN.md).

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
            gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'granted' });
            gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied', region: ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','IS','LI','NO','GB','CH'] });
            try { var ck = localStorage.getItem('ck-consent'); if (ck) gtag('consent', 'update', { analytics_storage: ck === 'granted' ? 'granted' : 'denied' }); } catch (e) {}
            gtag('js', new Date());
            gtag('config', 'G-K74JKGWGDQ');
          `}
        </Script>
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
