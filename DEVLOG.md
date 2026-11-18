# DEVLOG — calckitchen.com
> Handoff file. Read §0–§5 and the last 10 entries of §6 before any work. Rules: devlog skill (.claude/skills/devlog/SKILL.md).

## §0 Resume here
_last update: 2026-11-18 · CK-006_
- Step: look picked · canvas https://claude.ai/artifact/JpAWbGoAFxj77wqGc55Jb5 (boards "Pick, B with A's knob", "Pick, phone")
- Phase: live site, not on Raptive, not yet in Google's index (GSC 2026-11-18: "URL is unknown to Google"; sitemap submitted). Four-stage pass on all 25 pages started with the turkey page.
- Last confirmed: CK-002 TURKEYFIX + CK-004 TURKEYPOLISH + CK-005 LIVESYNC — live 2026-11-18: production dpl_6TXwUSCr4hAYyvaciUj2ZEcC6LsJ from main f2e9be6 (PR #1), checked on calckitchen.com in Chrome.
- In flight (handed, NOT confirmed): none
- Next action: CK-003 DESIGN1 — build the picked look on /turkey-cooking-calculator, Vercel preview, show the owner (page-looks step 7: one page, then ten, then all).
- Waiting on owner: (1) top-30 read for Raptive later (Stage 4); (2) optional: push the parent-folder notes (content/, homepage-spec.md, HOW-TO-BUILD.md) into docs/.
- Open questions: BSc Physics on the About page too (calculatemybmi shows both degrees)? Bing Webmaster account? Raptive application timing?

Scoreboard (2026-11-18)
    Stage 1 numbers and sources: 4% (1 of 25 pages, live) · bad at start 7/10
    Stage 2 anti-slop: 0 of 25 pages · bad at start 6/10 (estimate from 2 pages)
    Stage 3 impeccable and user tests: 0% · bad at start ?/10 (not measured)
    Stage 4 Raptive: 0% · bad at start 7/10
    Whole site: 1% (stage weights 30, 20, 30, 20)
    Rule: a stage that starts at 2 or below is skipped or limited to its worst pages.

## §1 Site card
- Domain · status · Raptive: calckitchen.com · live · not applied (privacy policy already names Raptive)
- Owner (pushes, runs account steps) · machine: Marko Visic · cloud sessions (claude.ai/code) + Mac (folder ?)
- Author (byline · credentials · sameAs): Marko Visic · MPharm, Faculty of Pharmacy, University of Ljubljana, Slovenia (owner's wording 2026-11-18) · https://www.linkedin.com/in/marko-visic/ · bio at /about#author-bio · headshot public/images/marko-visic.jpg (same file as calculatemybmi.net) · operator Moving Data Systems d.o.o., Smolnik 62, 2342 Ruse, Slovenia
- Repo origin · branch: https://github.com/Mapstor/calckitchen · main
- Project folder · box project · preview port: Mac /Users/markovisic/dev/calckitchen/app (the repo; the parent folder holds CLAUDE.md, HOW-TO-BUILD.md, content/, homepage-spec.md, not in git) · none · 3000 (next dev)
- Stack · Node: Next.js 16.1.6 App Router (Turbopack), React 19.2.3, Tailwind 4, Recharts 3, TypeScript 5 · Node 22 in cloud
- Commands (dev / build / test / lint): npm run dev / npm run build / npm run check:numbers / npm run lint
- Deploy (host, project, trigger): Vercel project calckitchen (prj_HYJh4OEFSWYOqVM0NXm1wBr761RL, team marko-visics-projects), connected to GitHub 2026-11-18: merges to main deploy production, branches get previews (alias calckitchen-git-<branch>-marko-visics-projects.vercel.app, behind Vercel login; the owner's Chrome passes). vercel.json present.
- Analytics / Search Console / Bing: GA4 G-K74JKGWGDQ hardcoded in src/app/layout.tsx · GSC property https://calckitchen.com/ in moving.data.systems@gmail.com (added and auto-verified by the HTML file 2026-11-18; sitemap.xml submitted, 25 URLs) · Bing msvalidate 57C407E8336C4915E2D28EEA649C8078, account ?
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
- D-07 · 2026-11-18 · Byline on every tool page: "By Marko Visic, MPharm, Faculty of Pharmacy, University of Ljubljana, Slovenia", linking to /about#author-bio; "Updated" date only after a real content change (turkey 2026-11-18) — owner's wording; raptive-ready identity standard.
- D-06 · 2026-11-18 · GitHub main is the source of truth; production deploys only from main (Vercel API until Git is connected) — the 2026-02-22 CLI deploy from a local folder carried 13 calculator files GitHub never had.

## §3 Rejected — don't re-propose
- 2026-11-17 · Look A (red enamel oven panel) and look C (Roasting Facts label) as whole looks — owner picked B and took only A's knob.
- 2026-11-17 · Spatchcock option in the turkey calculator — no primary source for times; re-add only with one.

## §4 Gotchas & hard rules
- Cloud-shell builds fail on next/font/google (Inter, Lora) and on icon/OG routes fetching cdn.jsdelivr.net. Verify on the Vercel preview, or with a temporary next/font/local swap plus moved icon routes; never commit the swap.
- fsis.usda.gov refuses WebFetch; read it in Chrome.
- USDA timetable rows share edge weights (8, 12, 14, 18, 20, 24 lb). Code uses the lighter row; examples avoid edge weights or name both rows.
- ask.usda.gov did not load in Chrome on 2026-11-17 (used on /air-fryer-converter); recheck before removing.
- Never deploy with the Vercel CLI from a local folder: it ships uncommitted files (2026-02-22: 13 calculators GitHub didn't have, fixed by CK-005). Deploy from main.
- Google had never seen the site: on 2026-11-18 URL Inspection said "URL is unknown to Google" for / and /turkey-cooking-calculator (live test: indexable). Indexing requests hit the daily quota that day; retry. Expect days to weeks before pages appear.

## §5 Backlog (priority order)
- [P1] Request indexing in GSC (daily quota) for the homepage, the turkey page and the top tool pages; check GSC Pages/Performance after a few days.
- [P1] CK-003 build the picked look on the turkey page, preview, owner review; then 10 pages, then all.
- [P1] Search Console access, then order pages by impressions.
- [P1] Stage 1 on the other 24 pages: registry rows + checks; known suspects: meat-cooking-time rest/carryover table, party-food quantities, air-fryer presets, homepage temperature tables; full external-link check.
- [P1] Author identity: byline, author page with headshot and LinkedIn, About page names the author (Raptive stage).
- [P2] Anti-slop pass (homepage "Kitchen Math, Solved", "We don't guess — we calculate"; "millions of people"; "used by professional bakers worldwide").
- [P2] Measure with portfolio-qa (prose-score, sweep) for the scoreboard.
- [P2] Stage 4 notes: About page still speaks as an anonymous "we" and needs the full rewrite (anti-slop + trust frame); privacy policy names Raptive although it isn't installed (check every service it lists against the stack); hello@calckitchen.com — confirm the mailbox works; 576 pre-existing eslint errors (unescaped apostrophes in page copy, not build-blocking).
- [P2] Stage 3 notes: /cake-servings-calculator "Calculate Servings" click changes nothing (live before CK-005 too); cake pan SVG legend swatches squash at 390 px; sitemap gives every page the build time as lastModified (use real per-page dates).
- [P2] Next.js 16.1.6 → 16.4.6: npm audit (prod) 2026-11-17 = 1 critical (next: request smuggling in rewrites, next/image disk cache growth), 4 high (sharp, postcss, nanoid, source-map-js), 1 moderate.

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

### 2026-11-17 · CK-004 TURKEYPOLISH · chat · done
- What: the preview check of CK-002 found the result heading "16.0 lb turkey, oven roast (325°f)"; now "16 lb turkey, oven roast (325°F)" (same for the thaw heading). The five turkey tables are labelled, focusable regions so keyboards can scroll them; cell padding px-3 below 640 px.
- Files: src/components/calculators/TurkeyCookingCalculator.tsx, src/app/turkey-cooking-calculator/page.tsx
- Verified: npx tsc --noEmit 0 errors; eslint 0; check:numbers 27/0/0; Vercel preview dpl_3EMjJHChz4K7svJADAz6W2VKtzv7 (9a1fb9a) READY, next build 31 routes. Chrome on the preview: single " | CalcKitchen" title; JSON-LD FAQPage (10), WebApplication, BreadcrumbList parse; all four tools return the USDA values (16 lb → 3¾–4¼ h; fridge 3–4 days; 10 guests → 15 lb with leftovers; timeline 10:25 AM / 2:10 / 2:40 / 3:00 PM for 2026-11-26); no page-level sideways scroll at 390 (two 5-column tables scroll 23 px inside their box); layout looked at 390 and 1280 in a framed view (the window can't be resized past 606 px).
- Commit: 9a1fb9a + this DEVLOG commit (pushed: yes; PR #1 open, not merged)
- Notes: not merged on purpose. Production can only be updated from GitHub after the 13 live-only calculator files are in the repo (§4).

### 2026-11-18 · CK-005 LIVESYNC · chat · live
- What: the owner pushed claude/live-sync (4cf267b) from /Users/markovisic/dev/calckitchen/app: 12 calculator files byte-identical (SHA1) to the 2026-02-22 production source; CakePanConverter.tsx is newer (an SVG pan overlay that was never deployed). Merged into PR #1 (turkey conflict → the CK-002 version; the live tool's °C equivalents ported into it). PR #1 merged as f2e9be6; production deployed through the Vercel API (dpl_6TXwUSCr4hAYyvaciUj2ZEcC6LsJ). CK-002 and CK-004 are live with it.
- Files: src/components/calculators/* (12 from the Mac), src/data/turkey-data.ts, src/components/calculators/TurkeyCookingCalculator.tsx
- Verified: tsc 0 errors; eslint 0 (turkey files); check:numbers 27/0/0; preview 1961341 READY; production READY. Chrome on the preview and on calckitchen.com: turkey tools (16 lb → 3¾–4¼ h, Oven at 325°F (163°C), timeline 10:25 AM / 2:10 / 2:40 PM); home + 13 tool pages load with 0 JS errors and single " | CalcKitchen" titles; 11 of 12 synced calculators change their output on click (cake-servings didn't before either); grams/ounces present on bakers, pizza, sourdough; cake pan SVG drawn at 390 and 1280.
- Commit: 077a269, 1961341, merge f2e9be6 (pushed: yes)
- Notes: merged branches claude/ck-002-turkeyfix and claude/live-sync are safe to delete (owner's call).

### 2026-11-18 · CK-006 AUTHOR · chat · done
- What: author identity per the owner's wording: byline under the H1 on all 20 tool pages (headshot, "By Marko Visic, MPharm, Faculty of Pharmacy, University of Ljubljana, Slovenia", link to /about#author-bio; turkey adds "Updated November 18, 2026"); About gets a "Who makes CalcKitchen" section with LinkedIn rel="me" and Person JSON-LD (alumniOf, hasCredential, sameAs); WebApplication schema names the author. Removed false lines: About "We update our data regularly" and "cross-referenced with real-world testing"; privacy said the site is operated from the United States → Moving Data Systems d.o.o., Slovenia (Last Updated November 18, 2026). GSC property added in moving.data.systems@gmail.com, sitemap submitted.
- Files: src/data/author.ts, src/components/ui/Byline.tsx, src/components/seo/JsonLd.tsx, src/app/about/page.tsx, src/app/privacy-policy/page.tsx, 20 tool pages, public/images/marko-visic.{jpg,webp}
- Verified: npx tsc --noEmit 0 errors; eslint on the new and changed files 0 errors; Vercel preview + Chrome check of byline, About and schema: see the PR (status moves to live in the next PR after the production check).
- Commit: see PR (pushed: yes)

## §7 History & archive
- 2026-02 · initial build: 20 calculators, favicon, vercel.json, GA4 and Search Console/Bing verification (4 commits, 2026-02-22)
