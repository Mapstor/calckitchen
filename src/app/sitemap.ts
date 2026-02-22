import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://calckitchen.com";

  // All calculator pages
  const calculatorPages = [
    "air-fryer-converter",
    "bakers-percentage-calculator",
    "butter-converter",
    "cake-pan-converter",
    "cake-servings-calculator",
    "coffee-ratio-calculator",
    "convection-oven-converter",
    "cooking-measurement-converter",
    "meat-cooking-time-calculator",
    "meat-temperature-chart",
    "microwave-to-oven-converter",
    "oven-temperature-converter",
    "party-food-calculator",
    "pizza-dough-calculator",
    "recipe-cost-calculator",
    "recipe-macro-calculator",
    "recipe-scaler",
    "slow-cooker-to-oven-converter",
    "sourdough-calculator",
    "turkey-cooking-calculator",
  ];

  // Footer/utility pages
  const utilityPages = ["about", "contact", "privacy-policy", "terms-of-use"];

  const currentDate = new Date().toISOString();

  return [
    // Homepage - highest priority
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // Calculator pages - high priority
    ...calculatorPages.map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // Utility pages - lower priority
    ...utilityPages.map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
