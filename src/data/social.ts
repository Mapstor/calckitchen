// Social preview images for every page. A page's own openGraph/twitter metadata replaces the root's (Next merges
// metadata shallowly), so each page lists the images again or shares show none.
export const SOCIAL_ALT = "CalcKitchen: kitchen calculators, every number from its source";
export const OG_IMAGES = [{ url: "/opengraph-image", width: 1200, height: 630, alt: SOCIAL_ALT }];
export const TW_IMAGES = [{ url: "/twitter-image", width: 1200, height: 630, alt: SOCIAL_ALT }];
