# DEVLOG — calckitchen.com
> Handoff file. Read §0–§5 and the last 10 entries of §6 before any work. Rules: devlog skill (.claude/skills/devlog/SKILL.md).

## §0 Resume here
_last update: 2026-11-19 · CK-011_
- Step: all pages: all 25 pages live in the picked look with result visuals (CK-009 + CK-010 merged 2026-11-19). Now CK-011: drawings in the page sections of 15 pages (owner: "lets do this for most pages"). canvas https://claude.ai/artifact/JpAWbGoAFxj77wqGc55Jb5
- Phase: live site, not on Raptive. GSC: sitemap /sitemap.xml read 2026-11-18, Success, 25 pages. 7 pages indexed before CK-008. Indexing requested 2026-11-19 for /, turkey, meat-temperature-chart, meat-cooking-time-calculator, air-fryer-converter, convection-oven-converter, oven-temperature-converter, pizza-dough-calculator, cake-pan-converter; daily quota then exceeded.
- Last confirmed: CK-009 REST + CK-010 VISUALS — live 2026-11-19 (PR #7 merged, main a64fb07; first production build failed on the Google Fonts fetch, redeploy dpl_GP1DpKn6MkLFJEiioVG1N7SUFRW5 READY; Chrome: cake pan visuals and turkey checkboxes correct on calckitchen.com).
- In flight (NOT merged): CK-011 BODY VISUALS — PR #8 open, Chrome-checked on its preview; merge waits for the owner's OK (Claude's merge attempt was refused by the session's permission check, 2026-11-19).
- Next action: owner says merge (or merges PR #8) → production READY + live check → GSC indexing requests in daily batches (the 14 CK-009 pages, bakers-percentage, cake-servings, recipe-cost; ~9 a day; 2026-11-19 quota already used) → Stage 2 prose-score.
- Waiting on owner: confirm hello@calckitchen.com receives mail; decide on an EU consent banner for GA4 (privacy names legitimate interest; no banner runs); confirm governing law Slovenia in the terms; top-30 read for Raptive later.
- Open questions: Bing Webmaster account? Raptive application timing?

Scoreboard (2026-11-19)
    Stage 1 numbers and sources: 25 of 25 pages live on registry rows + check scripts; npm run check:numbers 18 scripts, 0 failed · bad at start 7/10
    Stage 2 anti-slop: 25 pages rewritten plain, 0 scored (prose-score not run) · bad at start 6/10
    Stage 3 impeccable and user tests: 25 pages in the picked look, Chrome-checked at 390 and 1280 (no sideways scroll, readouts and modes tested); result visuals on 17 calculators (CK-010) and section visuals on 15 pages (CK-011), Chrome-checked at 390 and desktop; no Playwright suite yet · bad at start ?/10
    Stage 4 Raptive: ~45% (author identity sitewide, About rewritten, privacy and terms match the stack; mailbox, consent, top-30 read pending) · bad at start 7/10
    Whole site: ~72% live (stage weights 30, 20, 30, 20)
    Rule: a stage that starts at 2 or below is skipped or limited to its worst pages.

## §1 Site card
- Domain · status · Raptive: calckitchen.com · live · not applied (privacy names only GA4 and Vercel since CK-009)
- Owner (pushes, runs account steps) · machine: Marko Visic · cloud sessions (claude.ai/code) + Mac (folder ?)
- Author (byline · credentials · sameAs): Marko Visic · MPharm, Faculty of Pharmacy, University of Ljubljana, Slovenia (owner's wording 2026-11-18) · https://www.linkedin.com/in/marko-visic/ · bio at /about#author-bio · MPharm only on this site (owner 2026-11-18; his BSc Physics is used on other sites) · headshot public/images/marko-visic.jpg (same file as calculatemybmi.net) · operator Moving Data Systems d.o.o., Smolnik 62, 2342 Ruse, Slovenia
- Repo origin · branch: https://github.com/Mapstor/calckitchen · main
- Project folder · box project · preview port: Mac /Users/markovisic/dev/calckitchen/app (the repo; the parent folder holds CLAUDE.md, HOW-TO-BUILD.md, content/, homepage-spec.md, not in git) · none · 3000 (next dev)
- Stack · Node: Next.js 16.1.6 App Router (Turbopack), React 19.2.3, Tailwind 4, Recharts 3, TypeScript 5 · Node 22 in cloud
- Commands (dev / build / test / lint): npm run dev / npm run build / npm run check:numbers / npm run lint
- Deploy (host, project, trigger): Vercel project calckitchen (prj_HYJh4OEFSWYOqVM0NXm1wBr761RL, team marko-visics-projects), connected to GitHub 2026-11-18: merges to main deploy production, branches get previews (alias calckitchen-git-<branch>-marko-visics-projects.vercel.app, behind Vercel login; the owner's Chrome passes). vercel.json present.
- Analytics / Search Console / Bing: GA4 G-K74JKGWGDQ hardcoded in src/app/layout.tsx · GSC property https://calckitchen.com/ in moving.data.systems@gmail.com (added and auto-verified by the HTML file 2026-11-18; sitemap.xml submitted, 25 URLs) · Bing msvalidate 57C407E8336C4915E2D28EEA649C8078, account ?
- Data sources: research/data-sources.csv (one row per source; 32 rows) · snapshots research/sources/*.json · checks scripts/check-*.mjs (npm run check:numbers)
- Key paths: src/app/(instrument)/ = every page (layout with Public Sans + Michroma, instrument.css); the (classic) group and old chrome were removed in CK-009; src/components/instrument/* (kit, header, footer, Knob, Dial, live); src/components/calculators/*.tsx (tools); src/data/*.ts (tool data, author, site-nav); src/components/seo/JsonLd.tsx; scripts/check-*.mjs
- Skills in repo: none (account skills)
- Design system (DESIGN.md / PRODUCT.md): yes, written 2026-11-17 from the pick
- Other plans / ledgers: docs/mac-notes/ — the Feb 2026 build notes from the Mac parent folder (HOW-TO-BUILD.md, parent-CLAUDE.md, homepage-spec.md, content/*.md page drafts); history only, see its README.
- Prompt code: CK

## §2 Decisions in force
- D-01 · 2026-11-17 · Look: "B with A's knob" — white instrument page, full-width thermometer with USDA zones, oven knob turning to 325°F, Michroma + Public Sans, ink/blue/orange (DESIGN.md) — owner's pick on the canvas; replaces any older brief.
- D-02 · 2026-11-17 · All 25 pages go through the four stages (numbers, anti-slop, impeccable, Raptive) — owner: "we need to fix all pages".
- D-03 · 2026-11-17 · Turkey figures only from USDA FSIS, portions with leftovers from UW Extension MP-135; no per-lb roasting rate, no spatchcock times — no primary source for them.
- D-04 · 2026-11-17 · Claude may merge its own PR after the gates and a Chrome check of the changed pages; merged branches are kept — owner's portfolio decision of 2026-11-13.
- D-05 · 2026-11-17 · Page titles carry no " | CalcKitchen"; the layout template adds it.
- D-07 · 2026-11-18 · Byline on every tool page: "By Marko Visic, MPharm, Faculty of Pharmacy, University of Ljubljana, Slovenia", linking to /about#author-bio; "Updated" date only after a real content change (turkey 2026-11-18) — owner's wording; raptive-ready identity standard. MPharm only, no BSc Physics on this site (owner: "mpharm is better for this site").
- D-06 · 2026-11-18 · GitHub main is the source of truth; production deploys only from main (Vercel API until Git is connected) — the 2026-02-22 CLI deploy from a local folder carried 13 calculator files GitHub never had.
- D-08 · 2026-11-19 · A figure with no primary source is removed, not softened: NY/Detroit/Sicilian pizza presets, convection "25% less time" for baking, cup-to-gram densities in recipe cost, lamb leg 7-9 lb row — why: one wrong number can sink Raptive review and Google trust; the page says what was left out where it matters.
- D-09 · 2026-11-19 · Every rebuilt page has a research/sources/*.json snapshot and a scripts/check-*.mjs that checks the data and every figure written in the page text; npm run check:numbers runs them all — why: catches typos and drift; each check was tested with planted errors.

## §3 Rejected — don't re-propose
- 2026-11-17 · Look A (red enamel oven panel) and look C (Roasting Facts label) as whole looks — owner picked B and took only A's knob.
- 2026-11-17 · Spatchcock option in the turkey calculator — no primary source for times; re-add only with one.

## §4 Gotchas & hard rules
- Cloud-shell builds fail on next/font/google (Inter, Lora) and on icon/OG routes fetching cdn.jsdelivr.net. Verify on the Vercel preview, or with a temporary next/font/local swap plus moved icon routes; never commit the swap.
- fsis.usda.gov refuses WebFetch; read it in Chrome.
- USDA timetable rows share edge weights (8, 12, 14, 18, 20, 24 lb). Code uses the lighter row; examples avoid edge weights or name both rows.
- ask.usda.gov did not load in Chrome on 2026-11-17 (used on /air-fryer-converter); recheck before removing.
- Never deploy with the Vercel CLI from a local folder: it ships uncommitted files (2026-02-22: 13 calculators GitHub didn't have, fixed by CK-005). Deploy from main.
- docs/mac-notes/content/*.md are the Feb 2026 drafts the pages were generated from, with the same unsourced figures. Never use them as a source.
- Ad slots: the design reserves the rail and gaps; no empty .p-ad boxes before Raptive runs. The sticky-footer padding (124px, 80px phone) comes back with Raptive.
- GSC: 7 pages were already indexed by 2026-11-19 (Google crawled the site before 2026-11-18). URL Inspection of a page not yet indexed says "URL is unknown to Google"; that is per page, not the site. Indexing requests are capped per day: if the quota is hit, retry the next day.
- Gas mark °C values differ between UK charts (gas mark 3 is 160°C on Which?, 170°C on Currys): follow Which? only (research/sources/oven-temps.json); a new chart needs its own registry row.
- The oven dial is a component: src/components/instrument/Knob.tsx (tempF prop); LiveKnob.tsx follows the oven converter. CSS var --k turns it; the old static KNOB_325_SVG string is gone.
- Instrument page kit: src/components/instrument/kit.tsx (Hero, Main, Sec, Table, Faq, Sources), Knob/LiveKnob (oven dial), Dial/LiveDial (needle dial, any scale), live.ts (calculator -> hero instrument), Read.tsx. New page = data module + snapshot + check script + calculator + page.tsx in src/app/(instrument)/<slug>.
- Michroma has no proper degree sign: keep °F/°C in the UI font (p-read-u, tspan p-dial-vu, p-formula uses Public Sans).
- WebFetch needs the URL to have appeared in a search result; when the owner is away and a fetch needs approval, read the page in Chrome instead (Frigidaire pages were read that way). frigidaire.com FAQ URLs 404; the .ca copies are live.
- Check scripts that strip JSX tags also strip <Table rows=...> content; check table strings against the raw source (see check-cost-data.mjs).

- Node 22.18+ strips TypeScript: check scripts import src/data/*.ts directly; a module that imports ./units (no extension) is copied to a temp dir with the import rewritten first (see check-scaler-data.mjs). They call process.removeAllListeners("warning") to hide the ExperimentalWarning.
- USDA FoodData Central: from an fdc.nal.usda.gov tab in Chrome, fetch('/portal-data/external/<fdcId>') returns the food JSON (nutrients per 100 g, foodMeasures) and POST /portal-data/external/search finds IDs, no key. api.nal.usda.gov with DEMO_KEY rate-limits after ~10 calls.
- ncausa.org How-to-Brew-Coffee redirects to aboutcoffee.org/brewing/; the ratios live on the method pages (drip, pour-over, French press, cold brew, espresso).
- Kit Hero: visual={null} gives a one-column hero; byline="date" shows "Last updated" only (policy pages); crumb is optional (home).
- instrument.css is one flat stylesheet: a new rule with an existing class name silently restyles other pages (CK-009 p-checks/p-check hit the turkey and meat-time checkboxes; first CK-010 draft hit p-fig/p-bar/p-key of the turkey page and RoastChart). grep the class before adding it. Visual classes: p-viz, p-pan-, p-vbar, p-vkey, p-vsw, p-split, p-ratio, p-tier, p-stick, p-ball, p-sc-, p-th-, p-tr-.
- On main since CK-008: .p-tk-maj/.p-tk-min/.p-sc-t are defined twice (oven knob ~l.42-45, dial ~l.78-80); the later rules win on both instruments. That is what the owner approved; change only with a look.
- Michroma draws % and ° oddly: chart values go through G (HTML, Bars.tsx) or TG (SVG, Scales.tsx), which set those signs in Public Sans.
- Size strings like "12 in.": parse with /\d+(?:\.\d+)?/g; /[\d.]+/g also matches the dot of "in." and gives NaN (CK-010 cake stack drew nothing until fixed).
- Result visuals (CK-010): one figure, two SVG frames, .p-viz-wide (1000 units) above 860 px and .p-viz-tall (420 units) below; HTML charts (Bars, StackBars, Split, Ratio, Balls) reflow on their own. Temperatures go on a scale (TempCompare), never on bars from zero. Values come from the calculator's own data; a drawing adds no figure of its own.
- A production build can fail on the Google Fonts fetch ("Module not found: Can't resolve '@vercel/turbopack-next/internal/font/google/font'") while previews of the same commit pass (2026-11-19, a64fb07). The live site keeps the last READY build. Redeploy: Vercel create_deployment with deploymentId of the failed build, target production; then check READY and the live page.
- Check scripts that strip <...> from page source (check-slowcooker-data.mjs and others): a "<" in page code (m < 60) swallows text up to the next ">" and breaks the sentence checks. In those pages write comparisons with >= or move the helper to a component.

## §5 Backlog (priority order)
- [P1] Merge CK-011 after the owner's look; GSC indexing requests in daily batches (bakers-percentage, cake-servings, recipe-cost, then the 14 CK-009 pages); check Pages/Performance weekly.
- [P1] Stage 4: confirm hello@calckitchen.com works; EU consent for GA4 (banner now, or Raptive's CMP after acceptance); governing law in the terms (Slovenia assumed); owner's top-30 read logged here; then the Raptive application.
- [P2] Stage 2: run portfolio-qa prose-score on all 25 pages (needs a build the shell can't do: run in a cloud session with fonts, or against production after the merge).
- [P2] Stage 3: Playwright suite for every tool at 390 and 1280 (include each result visual: no sideways scroll, no NaN in SVG attributes); sitemap lastModified = real per-page dates.
- [P2] Full external-link check of every Sources list (ask.usda.gov on /air-fryer-converter loaded badly 2026-11-17).
- [P2] Next.js 16.1.6 → 16.4.6: npm audit (prod) 2026-11-17 = 1 critical (next: request smuggling in rewrites, next/image disk cache growth), 4 high (sharp, postcss, nanoid, source-map-js), 1 moderate.
- [P3] Visuals not done (CK-011 covers 15 page bodies): sourdough feeding, baker's percentage body, recipe cost body, recipe scaler result; home/About/policy pages need none.
- [P3] Re-measure eslint (576 errors before the rebuild, mostly unescaped apostrophes in the old page copy).

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

### 2026-11-18 · CK-007 MACNOTES · chat · done
- What: the owner pushed the Mac parent-folder notes (claude/ck-007-mac-notes, f373422: 27 files, 468K) into docs/mac-notes/; added a README marking them as history, not sources. Also logs CK-006 as live: production dpl_GaKXqxERLfMWZrmqtf6kk5xMGMMi (main 15dd9ae) READY; Chrome on calckitchen.com showed the turkey byline with "Updated November 18, 2026", About titled "About CalcKitchen" with the "Who makes CalcKitchen" section and portrait, and no "update our data regularly" / "real-world testing" lines.
- Files: docs/mac-notes/** (owner), docs/mac-notes/README.md, DEVLOG.md
- Verified: git diff main..branch = docs/ and DEVLOG.md only; no source file changed.
- Commit: f373422 (owner) + this commit (pushed: yes)

### 2026-11-18 · CK-003 DESIGN1 · chat · done (preview; waiting for owner review, not merged)
- What: the picked look ("B with A's knob", DESIGN.md) built on /turkey-cooking-calculator: route groups (instrument) and (classic); Public Sans + Michroma via next/font; instrument.css ported from the canvas board; new header (four menus, no script), footer, knob at 325°F and thermometer to 165°F (CSS motion, reduced-motion safe), calculator rebuilt as an instrument panel with four modes and live readouts (same USDA data and logic), USDA roasting chart from the data, thaw day strip, check-spot drawing, tables, examples, FAQ, sources, "More calculators" rail. Contact, Terms and Privacy titles no longer doubled.
- Files: src/app/(instrument)/**, src/app/(classic)/** (moved, unchanged except 3 titles), src/app/layout.tsx, src/components/instrument/*, src/components/calculators/TurkeyCookingCalculator.tsx, src/data/site-nav.ts
- Verified: tsc 0; eslint 0 on new files; check:numbers 27/0/0; Vercel previews READY (fc7e4e2, 84b9f71). Chrome on the preview: 1280 and 390 px, no sideways scroll, Public Sans + Michroma loaded; all four modes return the USDA values (16 lb → 3¾–4¼ h; thaw 3–4 days / 8 h; 10 guests → 15 lb; timeline 10:25 AM, 2:10, 2:40, 3:00 PM on Thursday Nov 26); 16-lb deep-fry shows the 12-lb limit; classic pages keep their header, footer and production fonts.
- Commit: fc7e4e2, 84b9f71, de27247 + this DEVLOG commit (pushed: yes; PR not merged)

### 2026-11-19 · CK-003 DESIGN1 · chat · live
- What: owner said yes ("1 yes", 2026-11-19); PR #5 merged.
- Verified: Vercel production dpl_GeNxfVKGBmpcYA39DTvUMka6wpcv READY for a98ea78; calckitchen.com/turkey-cooking-calculator checked in Chrome (new look, calculator works). GSC: indexing requested for / and the turkey page.
- Commit: a98ea78 (merge)
- Notes: corrects the 2026-11-18 note that Google had never seen the site: 7 pages were indexed.

### 2026-11-19 · CK-008 TENPAGES · chat · done (preview; waiting for owner review, not merged)
- What: 10 pages rebuilt in the picked look, each on primary sources: oven temps (NIST, Which?, Hotpoint), meat temps (FoodSafety.gov chart, Beef Checkoff, America's Test Kitchen, USDA placement), meat cooking times (FoodSafety.gov roasting charts), air fryer (Illinois Extension), convection (Frigidaire, GE), pizza dough (EU Reg. 97/2010, King Arthur), baker's % (King Arthur), cake servings and pan converter (Wilton), recipe cost (exact unit definitions). Fabricated personas/examples, unsourced presets, guides and advice removed. Shared kit, live hero dials, shared header menu fix.
- Files: src/app/(instrument)/{10 slugs}/page.tsx (moved from (classic)), src/components/calculators/{10}.tsx, src/components/instrument/{kit,Knob,LiveKnob,Dial,LiveDial,live,Read}, src/data/{oven-temps,meat-temps,roasting-times,air-fryer,convection,bakers,wilton,units}.ts, research/sources/*.json, research/data-sources.csv (+14 rows), scripts/check-*.mjs (8 new), package.json check:numbers; src/data/meat-cooking-data.ts removed.
- Verified: tsc 0; eslint 0 on new files; check:numbers 0 failed, 0 skipped across 10 scripts (turkey 27, oven 71, meat 50, roast 82, air fryer 15, convection 8, bakers 35, cake 63, cost 22), each check tested with planted errors; Vercel previews READY through 87b08eb; Chrome on the branch preview: all 10 + turkey load with correct default readouts at 390 and 1280; 390 sideways scroll found on air fryer and meat cooking time, fixed in 29313ee (re-check on the final preview); interactions checked on oven (425°F, unit switches), meat chart (tabs, dial). Unverified: prose-score (Stage 2), Playwright suite, phone tap-through of every calculator.
- Commit: 4f7eec1 … a981381 (pushed: yes; PR not opened/merged)
- Notes: UPDATED dates are 2026-11-19; change them to the merge day if later.

### 2026-11-19 · CK-008 TENPAGES · chat · live
- What: owner approved the preview ("looks good, continue"); PR #6 merged.
- Verified: production dpl_4nnmNd7Pk1ghV6R5qsR22QYpo43M READY for 1e03706; calckitchen.com: all 10 pages in the new look, default readouts correct, no sideways scroll at 390 px, Updated November 19, 2026. GSC: indexing requested for 7 of the 10 (quota exceeded for bakers-percentage, cake-servings, recipe-cost); sitemap read OK with 25 pages.
- Commit: 1e03706 (merge)

### 2026-11-19 · CK-009 REST · chat · done (preview; waiting for owner review, not merged)
- What: the other 14 pages in the picked look on primary sources. Calculators: butter (Land O'Lakes stick table, USDA FDC 173410), sourdough (King Arthur loaf and starter guide), recipe scaler (NIST cups/spoons, USDA FDC egg weights), recipe macros (23 USDA FDC SR Legacy foods), party food (FDA 21 CFR 101.12 and FSIS 9 CFR 317.312/381.412 reference amounts), measurement converter (25 USDA household measures, NIST units), coffee ratio (SCA Standard 310-2021, NCA brewing guides); microwave and slow cooker from earlier today. Home, About, Contact, Privacy (GA4 + Vercel only; Raptive and Amazon claims removed), Terms (no ads/affiliate sections; Slovenia law). Unsourced figures removed per D-08. (classic) layout and old components deleted.
- Files: src/app/(instrument)/** (14 pages), src/components/calculators/{Butter,Sourdough,RecipeScaler,RecipeMacro,PartyFood,CookingMeasurement,CoffeeRatio}*.tsx, src/data/{butter,sourdough,scaler,macros,party,measures,coffee}.ts, src/components/instrument/kit.tsx, instrument.css, research/data-sources.csv (+13 rows), research/sources/*.json (+9), scripts/check-*.mjs (+9), package.json
- Verified: npx tsc --noEmit 0 errors; eslint on src/app/(instrument), src/components, src/data 0 errors (1 old warning); npm run check:numbers 18 scripts, 0 failed, 0 skipped (each new check caught planted errors); Vercel previews READY through fdadba3; Chrome on the branch preview: 14 pages at 390 and 1280, no sideways scroll except /contact at 390 (long email in the answer; fixed in the next commit, recheck), default readouts correct, every mode exercised (sourdough feed/build/dough, butter 250 g and 1½ cups, scaler ½, macros custom row, party 50 guests, measures brown sugar and quarts, coffee cold brew and espresso).
- Commit: see PR (pushed: yes)
- Notes: prose-score not run (Stage 2 unmeasured). Owner decisions pending: consent banner, governing law, mailbox.

### 2026-11-19 · CK-010 VISUALS · chat · done (preview; waiting for owner review, not merged)
- What: owner: "we need more visualization in results ... shape of pan vividly visualised". Cake pan: both pans drawn to one scale (steel rim, flat tint, recipe's pan dashed on yours, % more/less area) + to-scale lineup; cake servings: tiered cake from the side; butter: sticks with 8 tbsp marks and the cut; sourdough, baker's %, pizza (split + dough balls), macros, cost, party, measures, coffee (ratio strip); air fryer and convection (temperatures on one scale, time bars); microwave, slow cooker (hour ranges); oven ruler (°F, gas mark, °C; upright on phones); USDA meat thermometer; roast time across the chart's weights.
- Files: src/components/instrument/{Pans,Bars,Scales,CakeStack,Sticks}.tsx (new kit), 16 calculators in src/components/calculators/, cake-pan-converter/page.tsx, page.tsx (home list class), instrument.css (renamed clashing classes; p-pcheck, p-home-list).
- Verified: npx tsc --noEmit 0 errors; eslint 0 errors (1 old warning); npm run check:numbers 18 scripts, 0 failed, 0 skipped; Vercel previews READY (87904ab, ce5af56, dcc8833); Chrome on the branch preview: every visual seen on desktop (1512 px window), phone (390 px iframe) for cake pan, cake servings, butter, meat temperature, oven ruler, air fryer, meat time; no sideways scroll on any checked page. Bugs found and fixed in Chrome: CSS class clashes, cake stack NaN, °/% glyphs, needle over gas mark, phone thermometer clipping, phone oven ruler collisions.
- Phone recheck of f0c2e9a (meat thermometer, upright oven scale) passed in Chrome. Unverified: hover tooltips; reduced-motion rendering.
- Commit: 87904ab, ce5af56, dcc8833, f0c2e9a (pushed: yes, PR #7)
- Notes: no new figures: every drawn value comes from the calculator's data and registry rows.

### 2026-11-19 · CK-010 VISUALS · chat · live
- What: PR #7 (CK-009 + CK-010) merged by Claude after the owner's "looks good, lets merge"; main a64fb07.
- Verified: first production build ERROR (Google Fonts fetch, see §4); redeploy dpl_GP1DpKn6MkLFJEiioVG1N7SUFRW5 READY, aliased to calckitchen.com; Chrome on calckitchen.com: /cake-pan-converter shows both figures, no sideways scroll; /turkey-cooking-calculator checkboxes flex column, 44 px.
- Commit: a64fb07 (merge)

### 2026-11-19 · CK-011 BODY VISUALS · chat · done (preview; PR #8 waiting for the owner's OK, not merged)
- What: owner: "lets do this for most pages". Section drawings on 15 pages: Dumbbells (oven→air fryer, recipe→convection bake, conventional→fan °C by gas mark, oven→microwave minutes, Crock-Pot chart in hours, ATK pull→serve temperatures, minutes per pound by cut, party vs wedding servings for rounds, Pizza Napoletana timeline from the EU durations); Strips (butter wrapper marks; a cup as 16 tbsp of 3 tsp); Bars (kcal per 100 g, 23 USDA foods; grams per guest; grams per cup, 23 ingredients); RatioRows (five coffee ratios on one block grid).
- Files: src/components/instrument/{Dumbbells,Strips}.tsx (new), Bars.tsx (RatioRows), 15 pages in src/app/(instrument)/, instrument.css (p-db, p-st, p-rr).
- Verified: tsc 0 errors; eslint 0 errors (1 old warning); check:numbers 18 scripts, 0 failed, 0 skipped (slow cooker check caught a "<" in page code; fixed); preview 7a71fdc READY; Chrome on the preview: all 15 section visuals on desktop, phone 390 px for slow cooker, meat temperature, butter, coffee; no sideways scroll. Fixed in Chrome: doubled °F in doneness values, crowded hour and °C axes.
- Unverified: phone view of air fryer, convection, oven fan, microwave, meat time, cake servings, pizza, scaler, macros, party, measures sections (same components as the phone-checked ones).
- Commit: 4f698f9, 7a71fdc + this DEVLOG commit (pushed: yes)

## §7 History & archive
- 2026-02 · initial build: 20 calculators, favicon, vercel.json, GA4 and Search Console/Bing verification (4 commits, 2026-02-22)
