// Site menu: four groups, every calculator once.
export const NAV = [
  {
    name: "Appliance converters",
    links: [
      { name: "Air fryer converter", href: "/air-fryer-converter" },
      { name: "Microwave to oven", href: "/microwave-to-oven-converter" },
      { name: "Slow cooker to oven", href: "/slow-cooker-to-oven-converter" },
      { name: "Convection oven", href: "/convection-oven-converter" },
      { name: "Oven temperature", href: "/oven-temperature-converter" },
    ],
  },
  {
    name: "Cooking time",
    links: [
      { name: "Meat cooking time", href: "/meat-cooking-time-calculator" },
      { name: "Turkey cooking time", href: "/turkey-cooking-calculator" },
      { name: "Meat temperature chart", href: "/meat-temperature-chart" },
    ],
  },
  {
    name: "Baking",
    links: [
      { name: "Cake servings", href: "/cake-servings-calculator" },
      { name: "Cake pan converter", href: "/cake-pan-converter" },
      { name: "Pizza dough", href: "/pizza-dough-calculator" },
      { name: "Sourdough", href: "/sourdough-calculator" },
      { name: "Baker's percentage", href: "/bakers-percentage-calculator" },
    ],
  },
  {
    name: "Recipe tools",
    links: [
      { name: "Recipe scaler", href: "/recipe-scaler" },
      { name: "Recipe cost", href: "/recipe-cost-calculator" },
      { name: "Recipe macros", href: "/recipe-macro-calculator" },
      { name: "Party food", href: "/party-food-calculator" },
      { name: "Measurement converter", href: "/cooking-measurement-converter" },
      { name: "Butter converter", href: "/butter-converter" },
      { name: "Coffee ratio", href: "/coffee-ratio-calculator" },
    ],
  },
] as const;

/** every calculator, in menu order */
export const ALL_TOOLS: { name: string; href: string }[] = NAV.reduce<{ name: string; href: string }[]>((a, g) => [...a, ...g.links], []);
/** the rail on pages that aren't calculators */
export const RAIL_DEFAULT = ALL_TOOLS.slice(0, 6).map((l) => ({ href: l.href, title: l.name }));
