// Convection conversion. Every figure traces to research/data-sources.csv (FRIG-CONVBAKE, FRIG-CONVROAST, GE-AUTOCONV).
// Frigidaire, "How do I use Convection Bake?": reduce the oven temperature by 25 degrees from the recipe's, then follow the
//   recipe using the minimum cooking time; preheat for cookies, biscuits and breads.
// Frigidaire, "How do I use Convection Roast?": reduce cook times by 25% from the recipe's time and check the food then;
//   no preheating needed; the temperature is the roasting temperature you want (no reduction).
// GE Appliances: Auto Recipe Conversion sets the oven 25 degrees below the temperature entered (Convection Bake and Roast, some models).
// Checked by scripts/check-convection-data.mjs against research/sources/convection.json.

export const CONV = { bakeDropF: 25, roastTimeCutPct: 25, geAutoDropF: 25 };

export const bakeF = (recipeF: number) => recipeF - CONV.bakeDropF;
export const roastMin = (recipeMin: number) => recipeMin * (1 - CONV.roastTimeCutPct / 100);

export const SRC_CONV = {
  bake: "https://www.frigidaire.ca/Owner-Centre/FAQs/Cooking/RangesStoves-WallOvens-Cooktops/all-power-types/how-do-i-use-convection-bake/",
  roast: "https://www.frigidaire.ca/Owner-Centre/FAQs/Cooking/RangesStoves-WallOvens-Cooktops/all-power-types/how-do-i-use-convection-roast/",
  ge: "https://products.geappliances.com/appliance/gea-support-search-content?contentId=16878",
};
