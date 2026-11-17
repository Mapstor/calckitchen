# DEVLOG — calckitchen.com
> Handoff file. Read §0–§5 and the last 10 entries of §6 before any work. Rules: devlog skill (.claude/skills/devlog/SKILL.md).

## §0 Resume here
_last update: 2026-11-17 · CK-002_
- Step: look picked · canvas https://claude.ai/artifact/JpAWbGoAFxj77wqGc55Jb5 (boards "Pick, B with A's knob", "Pick, phone")
- Phase: live site, not on Raptive. Four-stage pass on all 25 pages started with the turkey page.
- Last confirmed: CK-002 TURKEYFIX — turkey page and calculator on USDA figures, dead links, doubled titles — done (branch claude/ck-002-turkeyfix); live only after merge + production check.
- In flight (handed, NOT confirmed): none
- Next action: CK-003 DESIGN1 — build the picked look on /turkey-cooking-calculator, Vercel preview, show the owner (page-looks step 7: one page, then ten, then all).
- Waiting on owner: Search Console — calckitchen.com was not found in any of the 9 Google accounts signed into Chrome (2026-11-17); say which account owns it or add it. Author details for the byline and About page.
- Open questions: GSC account? Bing Webmaster account? Raptive application timing?

Scoreboard (2026-11-17)
    Stage 1 numbers and sources: 4% (1 of 25 pages) · bad at start 7/10
    Stage 2 anti-slop: 0 of 25 pages · bad at start 6/10 (estimate from 2 pages)
    Stage 3 impeccable and user tests: 0% · bad at start ?/10 (not measured)
    Stage 4 Raptive: 0% · bad at start 7/10
    Whole site: 1% (stage weights 30, 20, 30, 20)
    Rule: a stage that starts at 2 or below is skipped or limited to its worst pages.

## §1 Site card
- Domain · status · Raptive: calckitchen.com · live · not applied (privacy policy already names Raptive)
- Owner (pushes, runs account steps) · machine: Marko Visic · cloud sessions (claude.ai/code) + Mac (folder ?)
- Author (byline · credentials · sameAs): none on the site yet. Planned per owner's portfolio standard: Marko Visic, MPharm, BSc Physics · https://www.linkedin.com/in/marko-visic/
- Repo origin · branch: https://github.com/Mapstor/calckitchen · main
- Project folder · box project · preview port: ? · none · 3000 (next dev)
- Stack · Node: Next.js 16.1.6 App Router (Turbopack), React 19.2.3, Tailwind 4, Recharts 3, TypeScript 5 · Node 22 in cloud
- Commands (dev / build / test / lint): npm run dev / npm run build / npm run check:numbers / npm run lint
- Deploy (host, project, trigger): Vercel, auto-deploy from main (project name ?); vercel.json present
- Analytics / Search Console / Bing: GA4 G-K74JKGWGDQ hardcoded in src/app/layout.tsx · GSC verification google12f8c2f9c03913a3 (meta + public file), owning account ? · Bing msvalidate 57C407E8336C4915E2D28EEA649C8078, account ?
- Data sources: research/data-sources.csv (turkey rows so far) · snapshot research/sources/usda-fsis-turkey.json
- Key paths: src/app/<slug>/page.tsx (page copy, FAQ + JSON-LD), src/components/calculators/*.tsx (tools), src/data/*.ts (tool data), src/components/charts, src/components/seo/JsonLd.tsx, scripts/check-turkey-data.mjs
- Skills in repo: none (account skills)
- Design system (DESIGN.md / PRODUCT.md): yes, written 2026-11-17 from the pick
- Other plans / ledgers: none
- Prompt code: CK

## §2 Decisions in force
- D-01 · 2026-11-17 · Look: "B with A's knob" — white instrument page, full-width thermometer with USDA zones, oven knob turning to 325°F, Michroma + Public Sans, ink/blue/orange (DESIGN.md) — owner's pick on the canvas; replaces any older brief.
- D-02 · 2026-11-17 · All 25 pages go through the four stages (numbers, anti-slop, impeccable, Raptive) — owner: "we need to fix all pages".
- D-03 · 2026-11-17 · Turkey figures only from USDA FSIS, portions with leftovers from UW Extension MP-135; no per-lb roasting rate, no spatchcock times — no primary source for them.
- D-04 · 2026-11-17 · Claude may merge its own PR after the gates and a Chrome check of the changed pages; merged branches are kept — owner's portfolio decision of 2026-11-13.
- D-05 · 2026-11-17 · Page titles carry no " | CalcKitchen"; the layout template adds it.

## §3 Rejected — don't re-propose
- 2026-11-17 · Look A (red enamel oven panel) and look C (Roasting Facts label) as whole looks — owner picked B and took only A's knob.
- 2026-11-17 · Spatchcock option in the turkey calculator — no primary source for times; re-add only with one.

## §4 Gotchas & hard rules
- Cloud-shell builds fail on next/font/google (Inter, Lora) and on icon/OG routes fetching cdn.jsdelivr.net. Verify on the Vercel preview, or with a temporary next/font/local swap plus moved icon routes; never commit the swap.
- fsis.usda.gov refuses WebFetch; read it in Chrome.
- USDA timetable rows share edge weights (8, 12, 14, 18, 20, 24 lb). Code uses the lighter row; examples avoid edge weights or name both rows.
- ask.usda.gov did not load in Chrome on 2026-11-17 (used on /air-fryer-converter); recheck before removing.

## §5 Backlog (priority order)
- [P1] CK-003 build the picked look on the turkey page, preview, owner review; then 10 pages, then all.
- [P1] Search Console access, then order pages by impressions.
- [P1] Stage 1 on the other 24 pages: registry rows + checks; known suspects: meat-cooking-time rest/carryover table, party-food quantities, air-fryer presets, homepage temperature tables; full external-link check.
- [P1] Author identity: byline, author page with headshot and LinkedIn, About page names the author (Raptive stage).
- [P2] Anti-slop pass (homepage "Kitchen Math, Solved", "We don't guess — we calculate"; "millions of people"; "used by professional bakers worldwide").
- [P2] Measure with portfolio-qa (prose-score, sweep) for the scoreboard.

## §6 Log (append-only, newest at bottom)
### 2026-11-17 · CK-001 BOOTSTRAP · chat · done
- What: DEVLOG.md, CLAUDE.md, DESIGN.md and PRODUCT.md from the picked look; research/data-sources.csv (5 sources) and research/sources/usda-fsis-turkey.json; scripts/check-turkey-data.mjs + npm run check:numbers.
- Files: DEVLOG.md, CLAUDE.md, DESIGN.md, PRODUCT.md, research/*, scripts/check-turkey-data.mjs, package.json
- Verified: npm run check:numbers → 27 checked, 0 failed, 0 skipped
- Commit: see git log on claude/ck-002-turkeyfix (pushed: yes)
- Notes: canvas with looks A, B, C and the pick: https://claude.ai/artifact/JpAWbGoAFxj77wqGc55Jb5

### 2026-11-17 · CK-002 TURKEYFIX · chat · done
- What: turkey calculator and page now use USDA FSIS figures only (roast table by weight, stuffed table, thaw tables, fry/grill/smoke rates and size limits, 165°F, stand 20 min, frozen +50%). Removed: per-lb roast rates, spatchcock, 30–60 min rests, 160°F breast, "room temperature" step, 70% yield, basting/crispy-skin numbers, examples without sources. Fixed dead links (FSIS roasting times, FSIS safe-minimum temps x2, FoodSafety.gov thawing, AskKaren). Removed the fake "500,000 home cooks" claim (air fryer). Removed doubled site name from 17 titles. Turkey lines fixed on home, party-food and meat-cooking pages.
- Files: src/data/turkey-data.ts, src/components/calculators/TurkeyCookingCalculator.tsx, src/app/turkey-cooking-calculator/page.tsx, 17 page.tsx titles, src/app/page.tsx, party-food, meat-cooking-time, meat-temperature-chart, air-fryer-converter
- Verified: npx tsc --noEmit (0 errors); eslint on the three turkey files (0 errors); next build with temporary local fonts and icon routes moved → 29 static pages, built title "Turkey Cooking Time Calculator by Weight (+ Thawing Times) | CalcKitchen"; tsx run of the logic: 16 lb → 3¾–4¼ h, timeline 10:25 AM / 2:10 PM / 2:40 PM / 3:00 PM, fridge start Sun Nov 22; check:numbers 27/0/0. Unverified: Vercel preview and production pages in Chrome (next step), layout at 390/1280.
- Commit: see git log on claude/ck-002-turkeyfix (pushed: yes)
- Notes: the calculator UI keeps the current site styling; the new look comes with CK-003.

## §7 History & archive
- 2026-02 · initial build: 20 calculators, favicon, vercel.json, GA4 and Search Console/Bing verification (4 commits, 2026-02-22)
