# CalcKitchen.com — Build Instructions

## Project Overview

CalcKitchen.com is a kitchen calculator hub with 20 interactive calculator pages + 4 footer pages. Each page has a working JavaScript calculator at the top + SEO content below. The goal is organic Google traffic + AI citation traffic, monetized via display ads (Raptive/Ezoic) and Amazon affiliate links.

## Tech Stack

- **Framework:** Next.js 14+ (App Router) with Static Site Generation (SSG)
- **Styling:** Tailwind CSS
- **Hosting:** Vercel (deploy via GitHub)
- **Analytics:** Google Analytics 4 (GA4) + Google Search Console
- **Structured Data:** JSON-LD on every page (FAQPage, HowTo, WebApplication)
- **No database needed** — all calculator logic is client-side JavaScript
- **No authentication** — fully public site

## Project Structure

```
calckitchen/
├── app/
│   ├── layout.tsx                    # Root layout (nav, footer, fonts, GA4)
│   ├── page.tsx                      # Homepage
│   ├── air-fryer-converter/page.tsx
│   ├── microwave-to-oven-converter/page.tsx
│   ├── meat-cooking-time-calculator/page.tsx
│   ├── cake-servings-calculator/page.tsx
│   ├── turkey-cooking-calculator/page.tsx
│   ├── recipe-scaler/page.tsx
│   ├── slow-cooker-to-oven-converter/page.tsx
│   ├── convection-oven-converter/page.tsx
│   ├── party-food-calculator/page.tsx
│   ├── cake-pan-converter/page.tsx
│   ├── pizza-dough-calculator/page.tsx
│   ├── sourdough-calculator/page.tsx
│   ├── coffee-ratio-calculator/page.tsx
│   ├── recipe-cost-calculator/page.tsx
│   ├── bakers-percentage-calculator/page.tsx
│   ├── cooking-measurement-converter/page.tsx
│   ├── butter-converter/page.tsx
│   ├── meat-temperature-chart/page.tsx
│   ├── oven-temperature-converter/page.tsx
│   ├── recipe-macro-calculator/page.tsx
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── privacy-policy/page.tsx
│   └── terms-of-use/page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx                # Site header + nav
│   │   ├── Footer.tsx                # Site footer + links
│   │   └── Navigation.tsx            # Category-grouped nav
│   ├── calculators/                  # One component per calculator
│   │   ├── AirFryerConverter.tsx
│   │   ├── MeatCookingCalculator.tsx
│   │   ├── TurkeyCalculator.tsx
│   │   └── ... (one per tool)
│   ├── ui/                           # Shared UI components
│   │   ├── CalculatorCard.tsx        # Wrapper for calc tools (white card, shadow)
│   │   ├── ResultsPanel.tsx          # Output display panel
│   │   ├── SelectInput.tsx
│   │   ├── NumberInput.tsx
│   │   ├── ToggleSwitch.tsx
│   │   └── Tooltip.tsx
│   └── seo/
│       ├── JsonLd.tsx                # JSON-LD structured data component
│       └── MetaHead.tsx              # Per-page meta tags
├── data/                             # Calculator data (extracted from content .md files)
│   ├── meat-cooking-data.ts          # All meat time/temp lookup tables
│   ├── turkey-data.ts
│   ├── air-fryer-presets.ts          # 60+ food presets
│   ├── microwave-food-times.ts
│   ├── cake-serving-data.ts
│   ├── measurement-conversions.ts
│   └── ... (one per calculator)
├── content/                          # All 24 .md files (SEO content)
│   ├── air-fryer-converter.md
│   ├── meat-cooking-time-calculator.md
│   └── ... (all pages)
├── lib/
│   ├── calculator-utils.ts           # Shared math functions
│   └── format-utils.ts              # Smart rounding, fraction display
├── public/
│   ├── favicon.ico
│   ├── og-image.png                  # Default social share image
│   └── robots.txt
├── CLAUDE.md                         # THIS FILE
└── content-reference/                # Content .md files for reference
```

## Page Architecture (Every Calculator Page)

Each page follows the same layout pattern:

```
┌──────────────────────────────────┐
│  Header / Nav                     │
├──────────────────────────────────┤
│  H1 Title                        │
│  Short intro (1-2 sentences)     │
├──────────────────────────────────┤
│  ┌────────────────────────────┐  │
│  │  CALCULATOR TOOL           │  │  ← Interactive React component
│  │  (inputs, outputs, presets)│  │     White card with shadow
│  │  [Calculate Button]        │  │     This is the HERO of the page
│  │  Results panel              │  │
│  └────────────────────────────┘  │
├──────────────────────────────────┤
│  [Ad slot: Raptive leaderboard]  │  ← Placeholder div for ad
├──────────────────────────────────┤
│  SEO Content (from .md file)     │  ← Rendered markdown
│  - How to use                    │
│  - Data tables                   │
│  - Real-life examples            │
│  - FAQ section                   │
│  [Ad slots between sections]     │
├──────────────────────────────────┤
│  Related Calculators (3-4 cards) │  ← Internal linking
├──────────────────────────────────┤
│  Footer                          │
└──────────────────────────────────┘
```

## Design Direction

### Brand Identity
- **Name:** CalcKitchen
- **Tagline:** "Kitchen Math, Solved."
- **Tone:** Warm, practical, trustworthy. Like a knowledgeable friend who happens to be a great cook.

### Visual Design
- **Clean and modern** — NOT generic calculator site aesthetic
- **Color palette:** Warm neutrals + one accent color. Suggestion: warm white backgrounds (#FAFAF8), dark text (#1a1a1a), accent coral/orange (#E8604C) or sage green (#5B8C5A) for CTAs and highlights
- **Typography:** Use a distinctive serif or slab-serif for H1s (like Fraunces, Lora, or Playfair Display) paired with a clean sans-serif for body (Inter, DM Sans, or Source Sans)
- **Calculator cards:** White cards with subtle shadows, rounded corners (12-16px), clear input fields
- **Mobile-first:** 70%+ traffic will be mobile. Large tap targets (min 44px), clear inputs, results visible without scrolling
- **Food-appropriate:** Subtle warm tones, no harsh blues/purples. Think cookbook, not SaaS dashboard

### Calculator UX Principles
1. **Calculator is ABOVE the fold** — users see the tool immediately, not content
2. **Instant results** — calculate on input change, no "submit" button needed (but include one for clarity)
3. **Smart defaults** — pre-fill with common values (e.g., 350°F oven, 5 lb chicken)
4. **Unit toggles** — °F/°C, lbs/kg, cups/grams on every relevant calculator
5. **Presets** — quick-click buttons for common foods/scenarios
6. **Results are prominent** — large text, color-coded, with context ("Your 5 lb chicken needs 1 hr 40 min at 350°F")
7. **Print-friendly** — results section should be printable

### Ad Placement Strategy
- Place `<div id="raptive-ad-slot-1" class="ad-placeholder">` divs where ads will go
- Between calculator and content
- Between major content sections (every ~800 words)
- Before FAQ section
- Minimum 3 ad slots per page, maximum 5
- Make them easily identifiable with comments for ad network integration

## SEO Requirements

### Every page must have:
1. **Unique `<title>` tag** — from SEO Title in .md file
2. **Meta description** — from Meta Description in .md file  
3. **Canonical URL** — `https://calckitchen.com/[slug]`
4. **Open Graph tags** — title, description, image, url
5. **JSON-LD structured data:**
   - `FAQPage` schema (from FAQ section)
   - `WebApplication` schema (for the calculator tool)
   - `HowTo` schema (for "How to Use" section where applicable)
   - `BreadcrumbList` schema
6. **Semantic HTML** — proper heading hierarchy (single H1, H2s for sections, H3s for subsections)
7. **Internal links** — all internal links from the .md content must be implemented as Next.js `<Link>` components
8. **External links** — open in new tab, include `rel="noopener noreferrer"`
9. **Image alt text** on all images
10. **Sitemap.xml** — auto-generated by Next.js

### robots.txt
```
User-agent: *
Allow: /
Sitemap: https://calckitchen.com/sitemap.xml
```

## Build Phases

### Phase 1: Foundation + First 3 Pages
Build the complete project scaffolding and these 3 pages:
1. `/air-fryer-converter` — highest ROI (40K vol, beatable competitors)
2. `/meat-cooking-time-calculator` — complex calculator, proves the architecture
3. `/microwave-to-oven-converter` — wide open niche

**Deliverables:**
- Complete Next.js project with all shared components
- Working homepage with links to all 20 tools (even if pages aren't built yet)
- 3 fully functional calculator pages with content
- Header, footer, navigation
- JSON-LD on all pages
- Mobile responsive
- Deployable to Vercel

### Phase 2: Remaining Tier 1 Pages (4 more)
4. `/cake-servings-calculator`
5. `/turkey-cooking-calculator`
6. `/recipe-scaler`
7. `/slow-cooker-to-oven-converter`

### Phase 3: Tier 2 Pages (8 more)
8-15: convection, party-food, cake-pan, pizza-dough, sourdough, coffee, recipe-cost, bakers-percentage

### Phase 4: Tier 3 + Footer Pages (9 more)
16-20: measurement-converter, butter, meat-temp-chart, oven-temp, recipe-macro
21-24: about, contact, privacy, terms

## Content Integration

All 24 markdown files are in the `/content/` directory. Each file contains the full SEO content for one page. The calculator components should be built separately and placed above the content.

To render content: use a markdown renderer (like `react-markdown` or `next-mdx-remote`) to render the .md files within each page. Strip the H1 (it's in the page component) and render everything below the first `---` separator.

The .md files also contain:
- **Calculator specifications** — inputs, outputs, formulas, presets (in files that have a "Calculator Specification" section)
- **Data tables** — use these to populate the `data/` TypeScript files
- **FAQ content** — extract for JSON-LD FAQPage schema

## Calculator Data Sources

All calculator logic and data comes from the .md content files. Key data to extract into TypeScript:

- **Meat cooking times:** time-per-pound for each cut at each doneness level (from meat-cooking-time-calculator.md)
- **Turkey times:** stuffed/unstuffed × weight × method (from turkey-cooking-calculator.md)
- **Air fryer presets:** 60+ food items with temp + time (from air-fryer-converter.md)
- **Microwave food times:** common foods at different wattages (from microwave-to-oven-converter.md)
- **Cake servings:** round/square/sheet × size → servings (from cake-servings-calculator.md)
- **Measurement conversions:** volume + ingredient-specific weight tables (from cooking-measurement-converter.md)

## Performance Requirements

- **Lighthouse score:** 90+ on all categories
- **Core Web Vitals:** Pass on all metrics
- **First Contentful Paint:** < 1.5s
- **No layout shift** from calculator loading
- **Images:** Use Next.js Image component, WebP format, lazy loading below fold

## Important Notes

- All temperatures default to °F (US audience primary) with °C toggle
- All weights default to pounds with kg toggle
- The site must work perfectly without JavaScript for SEO (SSG content), but calculators obviously need JS
- No user accounts, no database, no server-side computation
- Keep bundle size small — no heavy libraries for calculators (pure JS math)
- Ad placeholder divs should have min-height to prevent layout shift
