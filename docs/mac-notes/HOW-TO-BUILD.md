# How to Build CalcKitchen.com with Claude Code

## Setup

### 1. Create the project folder
```bash
mkdir calckitchen
cd calckitchen
```

### 2. Place these files in the folder

```
calckitchen/
├── CLAUDE.md                              ← Master build instructions (Claude Code reads this automatically)
├── homepage-spec.md                       ← Homepage layout spec
└── content/                               ← All 24 content markdown files
    ├── about.md
    ├── air-fryer-converter.md
    ├── bakers-percentage-calculator.md
    ├── butter-converter.md
    ├── cake-pan-converter.md
    ├── cake-servings-calculator.md
    ├── coffee-ratio-calculator.md
    ├── contact.md
    ├── convection-oven-converter.md
    ├── cooking-measurement-converter.md
    ├── meat-cooking-time-calculator.md
    ├── meat-temperature-chart.md
    ├── microwave-to-oven-converter.md
    ├── oven-temperature-converter.md
    ├── party-food-calculator.md
    ├── pizza-dough-calculator.md
    ├── privacy-policy.md
    ├── recipe-cost-calculator.md
    ├── recipe-macro-calculator.md
    ├── recipe-scaler.md
    ├── slow-cooker-to-oven-converter.md
    ├── sourdough-calculator.md
    ├── terms-of-use.md
    └── turkey-cooking-calculator.md
```

### 3. Open Claude Code in the project folder
```bash
cd calckitchen
claude
```

---

## Prompting Strategy — Build in Phases

Claude Code works best when you break complex projects into clear phases. Here's the exact prompts to use:

---

### PHASE 1 PROMPT (Foundation + First 3 Pages)

```
Read CLAUDE.md and homepage-spec.md, then build the CalcKitchen.com project from scratch.

Phase 1 deliverables:
1. Initialize Next.js 14+ project with App Router, Tailwind CSS, TypeScript
2. Build the complete layout: Header with category navigation, Footer with site links
3. Build the Homepage with the calculator grid (all 20 tools listed, linking to their pages)
4. Build these 3 calculator pages fully:
   - /air-fryer-converter (read content/air-fryer-converter.md for data, formulas, and content)
   - /meat-cooking-time-calculator (read content/meat-cooking-time-calculator.md)
   - /microwave-to-oven-converter (read content/microwave-to-oven-converter.md)

Each calculator page needs:
- Working interactive calculator component at the top (above the fold)
- All data tables and presets from the .md file implemented in the calculator
- SEO content rendered below the calculator (from the .md file)
- JSON-LD structured data (FAQPage + WebApplication schema)
- Proper meta tags (title, description from the .md file)
- Ad placeholder divs between sections
- Related calculators section at the bottom
- Fully mobile responsive

Start by scaffolding the project, then build the shared components, then build each page one at a time. Make sure the calculators actually work with real data from the content files.
```

---

### PHASE 2 PROMPT (Remaining Tier 1)

```
Build the next 4 calculator pages for CalcKitchen. Read each page's .md file in the content/ folder for all data, formulas, presets, and SEO content.

Build these pages:
1. /cake-servings-calculator — needs visual SVG cake diagram showing cut lines
2. /turkey-cooking-calculator — needs thawing calculator + serving size calculator + cooking time
3. /recipe-scaler — needs paste-in text input that parses ingredients, scale factor, smart rounding for eggs
4. /slow-cooker-to-oven-converter — bidirectional converter: slow cooker ↔ oven ↔ Instant Pot

Same pattern as Phase 1: working calculator component + rendered .md content + JSON-LD + meta tags + ad slots + related calculators.
```

---

### PHASE 3 PROMPT (Tier 2 — Baking + Appliance)

```
Build 8 more calculator pages. Read each content/*.md file for data and content.

1. /convection-oven-converter — bidirectional conventional ↔ convection
2. /party-food-calculator — guest count → food quantities, shopping list output
3. /cake-pan-converter — original pan → new pan → ingredient multipliers
4. /pizza-dough-calculator — style presets (Neapolitan/NY/Detroit), hydration slider, all ingredients by weight
5. /sourdough-calculator — starter feeding calc + bread recipe calc
6. /coffee-ratio-calculator — 8 brew methods, strength slider, bidirectional (coffee→water or water→coffee)
7. /recipe-cost-calculator — add ingredients with prices → cost per serving
8. /bakers-percentage-calculator — flour weight + percentages → all weights (and reverse)

Same pattern as previous phases.
```

---

### PHASE 4 PROMPT (Tier 3 + Footer Pages)

```
Build the remaining 9 pages to complete the site.

Calculator pages:
1. /cooking-measurement-converter — universal unit converter with ingredient-specific mode
2. /butter-converter — sticks ↔ cups ↔ grams ↔ tablespoons
3. /meat-temperature-chart — interactive reference chart (click to expand)
4. /oven-temperature-converter — °F ↔ °C ↔ Gas Mark with reference table
5. /recipe-macro-calculator — ingredient entry → calories/protein/carbs/fat per serving

Footer pages (just content, no calculator):
6. /about
7. /contact
8. /privacy-policy
9. /terms-of-use

Also: generate sitemap.xml, add robots.txt, verify all internal links work, add Open Graph images.
```

---

### PHASE 5 PROMPT (Polish & Deploy)

```
Final polish for CalcKitchen:

1. Run Lighthouse audit on all pages — fix any issues to get 90+ scores
2. Verify all 20 calculators work correctly with edge cases (zero input, very large numbers, unit toggles)
3. Verify all JSON-LD structured data is valid (test with Google's Rich Results tool format)
4. Verify all internal links between pages work
5. Add proper 404 page
6. Verify mobile responsiveness on all pages
7. Set up Vercel deployment configuration (vercel.json if needed)
8. Make sure all meta tags and OG tags are correct per page
```

---

## Tips for Working with Claude Code

1. **Let it read CLAUDE.md first** — it's designed to be the primary instruction file
2. **One phase at a time** — don't try to build all 24 pages in one session
3. **Check calculators work** after each phase before moving on
4. **If Claude Code hits context limits** mid-phase, start a new conversation with:
   ```
   Continue building CalcKitchen. Read CLAUDE.md for context. We completed [Phase X]. 
   Now build [specific pages] following the same patterns already established.
   ```
5. **For design tweaks**, you can say:
   ```
   The calculator cards look too generic. Make them warmer — think cookbook aesthetic, 
   not SaaS dashboard. Use the warm coral accent color more prominently.
   ```
6. **Test locally** between phases: `npm run dev` and check each page
