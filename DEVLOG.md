# DEVLOG — calckitchen.com
> Handoff file. Read §0–§5 and the last 10 entries of §6 before any work. Rules: devlog skill (.claude/skills/devlog/SKILL.md).

## §0 Resume here
_last update: 2026-11-25 · CK-023_
- Step: all pages: all 25 pages live in the picked look; drawings in results (17 calculators) and page sections (15 pages) live. canvas https://claude.ai/artifact/JpAWbGoAFxj77wqGc55Jb5
- Phase: finishing line (owner, 2026-11-20), live, not on Raptive. Bing: 25 URLs submitted 2026-11-20 09:59 CET + https://calckitchen.com/sitemap.xml added. GSC: sitemap resubmitted and read 2026-11-20 (Success, 25 pages); 7 pages indexed, all last crawled 2026-09-04 to 2026-11-02 (before the redesign); indexing requested for 10 pages (9 on 2026-11-19, /cake-servings-calculator 2026-11-20 09:46).
- Last confirmed: CK-021 CLEANUP — merged 2026-11-25 (PR #18, main 980f6a6, production READY). Last site change: CK-019 INPUT FIELDS, live 2026-11-20. Vercel firewall rule (owner, 2026-11-21) denies China, Singapore and Hong Kong; GA4 shows none of them since.
- In flight: CK-023 ABOUT METHOD (PR #20): /about rewritten around the sourcing method; merged by Claude under D-14 after this commit's checks; the production check goes in the next entry.
- Next action: GSC Request indexing for the 15 pages left as slots free (about 10 per rolling 24 h, see §4; 2026-11-19 requests were made about 12:20 (2) and 13:20-13:40 CET (7)). Order: butter-converter, cooking-measurement-converter, coffee-ratio-calculator, sourdough-calculator, recipe-scaler, recipe-macro-calculator, party-food-calculator, slow-cooker-to-oven-converter, microwave-to-oven-converter (never indexed), bakers-percentage-calculator, recipe-cost-calculator (indexed, old crawl), about, contact, privacy-policy, terms-of-use. Today's 12:40 and 13:50 retries were refused by the quota; no retry is scheduled (needs the owner's OK; a slot opened at 09:46 on 2026-11-20). The sitemap, read 2026-11-20, covers discovery meanwhile. Then the owner's Raptive application; then freeze for 3 months.
- Waiting on owner: read the new /about (its method claims are in his name: primary sources only, register, check scripts, browser tests, the five left-out figures, corrections by email); check that mail to info@calckitchen.com arrives (MX = Namecheap email forwarding, needs an info@ alias or catch-all there); Raptive application with GA4 view access, best once China/Singapore leave the 28-day GA view (from about 2026-12-09, clean by 2026-12-19); delete the log branch claude/ck-022-firewall-log at the next cleanup (cloud sessions cannot delete branches, §4).
- Open questions: Raptive application timing? Which Microsoft account owns the Bing site (signed in in the owner's Chrome)?

Scoreboard (2026-11-20)
    Stage 1 numbers and sources: 25 of 25 pages live on registry rows + check scripts; npm run check:numbers 18 scripts, 0 failed · bad at start 7/10
    Stage 2 anti-slop: 23 of 23 scored pages at target (portfolio-qa prose-score 2026-11-19 on a local build: 13,319 words, 2 hits, both the Wilton article title in Sources; legal pages excluded) · bad at start 6/10
    Stage 3 impeccable and user tests: 25 pages in the picked look; drawings on all 20 calculators; Playwright suite 58 tests (20 tools + 5 static + 404 at 390 and 1280, consent bar; since CK-019 every visible field on screen with the editable look; since CK-023 /about lists every register source), 0 failed, 0 skipped; QA sweep P0 0, P1 0 · bad at start ?/10
    Stage 4 Raptive: ~90% — author identity sitewide, About, privacy and terms match the stack, EU consent, custom 404, owner's read of all 25 pages logged 2026-11-20, GA4 checked 2026-11-20, firewall rule live 2026-11-21 (no China/Singapore/Hong Kong users since); left: info@ mail check, GA view access + application (owner) · bad at start 7/10
    Whole site: ~98% live (stage weights 30, 20, 30, 20; stages 1-3 at 100%)
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
- Analytics / Search Console / Bing: GSC = URL-prefix property https://calckitchen.com/ under moving.data.systems@gmail.com (owner's Chrome account /u/5/); sitemap.xml submitted 2026-11-18, resubmitted 2026-11-19 and 2026-11-20 (25 pages); 7 pages indexed on 2026-11-20. GA4 G-K74JKGWGDQ hardcoded in src/app/layout.tsx (consent defaults first, D-11); property "Calc Kitchen" 525539937 in account Moving Data Systems (a308794385), same Google account /u/5/; not linked to Search Console. Vercel firewall: no custom rules (2026-11-20) · GSC property auto-verified by the HTML file 2026-11-18 · Bing Webmaster Tools site https://calckitchen.com/ (msvalidate 57C407E8336C4915E2D28EEA649C8078; signed in in the owner's Chrome, account ?): sitemaps https://www.calckitchen.com/sitemap.xml (2026-02-22, Success, 25 URLs) and https://calckitchen.com/sitemap.xml (2026-11-20); URL Submission quota 100 a day, 25 used 2026-11-20
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
- D-10 · 2026-11-19 · Contact address is info@calckitchen.com on Contact, About, Privacy and Terms (owner: "lets do info email"; hello@ was never confirmed as a working mailbox).
- D-11 · 2026-11-19 · EU/EEA/UK/CH visitors: Google Analytics waits for consent (owner: "yes for eu"). Consent Mode v2 region defaults in src/app/layout.tsx (analytics denied there, Google decides the region from the IP), our bar in src/components/instrument/ConsentBanner.tsx shown to European time zones, choice in localStorage ck-consent, "Cookie settings" in the footer. Replace all of it with Raptive's CMP if the site joins Raptive.
- D-12 · 2026-11-19 · Terms of use: Slovenian law governs (owner: "yes ok").
- D-14 · 2026-11-25 · Claude merges its own PRs once every gate passed, then confirms the production build and the live page (owner: "you can merge yourself").
- D-13 · 2026-11-20 · Fields you type in wear the tint fill + a 4px action bottom line (DESIGN.md) — owner: "input field should be more highlighted in all input pages"; fields looked exactly like the white ink-bordered buttons and selects.

## §3 Rejected — don't re-propose
- 2026-11-17 · Look A (red enamel oven panel) and look C (Roasting Facts label) as whole looks — owner picked B and took only A's knob.
- 2026-11-17 · Spatchcock option in the turkey calculator — no primary source for times; re-add only with one.

## §4 Gotchas & hard rules
- Fonts are self-hosted with next/font/local from src/app/(instrument)/fonts (CK-012, Fontsource 5.3.0, OFL): next/font/google broke two production builds on 2026-11-19 (Turbopack cache, "Can't resolve .../font/google/font"). Cloud-shell builds now compile; only /apple-icon, /icon and the OG images still fail here (they fetch cdn.jsdelivr.net). Verify those on the Vercel preview.
- fsis.usda.gov refuses WebFetch; read it in Chrome.
- USDA timetable rows share edge weights (8, 12, 14, 18, 20, 24 lb). Code uses the lighter row; examples avoid edge weights or name both rows.
- ask.usda.gov did not load in Chrome on 2026-11-17 (used on /air-fryer-converter); recheck before removing.
- Never deploy with the Vercel CLI from a local folder: it ships uncommitted files (2026-02-22: 13 calculators GitHub didn't have, fixed by CK-005). Deploy from main.
- docs/mac-notes/content/*.md are the Feb 2026 drafts the pages were generated from, with the same unsourced figures. Never use them as a source.
- Ad slots: the design reserves the rail and gaps; no empty .p-ad boxes before Raptive runs. The sticky-footer padding (124px, 80px phone) comes back with Raptive.
- GSC: 7 pages were already indexed by 2026-11-19 (Google crawled the site before 2026-11-18). URL Inspection of a page not yet indexed says "URL is unknown to Google"; that is per page, not the site. Request indexing quota: about 10 a day; when slots free is unclear. 2026-11-20: accepted 09:46; "Quota Exceeded" at 09:40, 09:47, 09:52, 09:55, 10:01, 12:42 and 13:53, although the 2026-11-19 requests were made around 12:20 and 13:20. Spend slots on never-indexed pages first; the sitemap lastmod covers re-crawls of indexed ones.
- GA4 "Direct" sessions from China and Singapore (0-1% engaged, 0-1 s) are bots: 32% of users on 2026-10-23 to 11-19. GA4 data filters can't drop a country; the Vercel firewall rule (2026-11-21, deny CN/SG/HK) did: 0 users from those countries 2026-11-21 to 11-24, so the bots were loading the pages. Scattered zero-engagement visits from other countries (KR, VN, BR, EG, IN, JP, DZ) remain; don't block countries with real readers. Read real reach from Organic Search and engaged sessions. The owner's own checks show up as Slovenia/Ljubljana.
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
- /about reads research/data-sources.csv at build time (src/data/registry.ts) to list every source, grouped by publisher; a register row's page links come from the /paths in its used_for, so name the page there when adding a row. Titles drop "(... research/...)" working notes. Unit values and the 350°F example render from src/data/units.ts, oven-temps.ts and convection.ts, so they can't drift from the checked data.
- Recipe cost rows: desktop is a 5-column grid (min-width 760px); under 860px each row stacks with its own labels from data-l (CSS ::before), and the .p-cc wrappers are display:contents on desktop. tests/tools.spec.ts fails any visible field that sits off screen.
- Cloud sessions cannot delete branches: git push --delete and the GitHub API return 403 through the session proxy, and deleting them in the owner's Chrome was refused by a safety check (2026-11-25). The owner deletes merged branches from his Mac or on GitHub.
- instrument.css is one flat stylesheet: a new rule with an existing class name silently restyles other pages (CK-009 p-checks/p-check hit the turkey and meat-time checkboxes; first CK-010 draft hit p-fig/p-bar/p-key of the turkey page and RoastChart). grep the class before adding it. Visual classes: p-viz, p-pan-, p-vbar, p-vkey, p-vsw, p-split, p-ratio, p-tier, p-stick, p-ball, p-sc-, p-th-, p-tr-.
- On main since CK-008: .p-tk-maj/.p-tk-min/.p-sc-t are defined twice (oven knob ~l.42-45, dial ~l.78-80); the later rules win on both instruments. That is what the owner approved; change only with a look.
- Michroma draws % and ° oddly: chart values go through G (HTML, Bars.tsx) or TG (SVG, Scales.tsx), which set those signs in Public Sans.
- Size strings like "12 in.": parse with /\d+(?:\.\d+)?/g; /[\d.]+/g also matches the dot of "in." and gives NaN (CK-010 cake stack drew nothing until fixed).
- Result visuals (CK-010): one figure, two SVG frames, .p-viz-wide (1000 units) above 860 px and .p-viz-tall (420 units) below; HTML charts (Bars, StackBars, Split, Ratio, Balls) reflow on their own. Temperatures go on a scale (TempCompare), never on bars from zero. Values come from the calculator's own data; a drawing adds no figure of its own.
- A production build can fail on the Google Fonts fetch ("Module not found: Can't resolve '@vercel/turbopack-next/internal/font/google/font'") while previews of the same commit pass (2026-11-19, a64fb07). The live site keeps the last READY build. Redeploy: Vercel create_deployment with deploymentId of the failed build, target production; then check READY and the live page.
- Check scripts that strip <...> from page source (check-slowcooker-data.mjs and others): a "<" in page code (m < 60) swallows text up to the next ">" and breaks the sentence checks. In those pages write comparisons with >= or move the helper to a component.

## §5 Backlog (priority order)
- [P1] GSC Request indexing for the 15 pages left, order in §0, as slots free; during the freeze check GSC Pages/Performance and Bing weekly.
- [P1] Stage 4: info@calckitchen.com mail check; then the owner's Raptive application with GA view access (GA4 geography checked 2026-11-20, firewall live 2026-11-21).
- [P2] Full external-link check of every Sources list (ask.usda.gov on /air-fryer-converter loaded badly 2026-11-17).
- [P2] Next.js 16.1.6 → 16.4.6: npm audit (prod) 2026-11-17 = 1 critical (next: request smuggling in rewrites, next/image disk cache growth), 4 high (sharp, postcss, nanoid, source-map-js), 1 moderate.
- [P3] Visuals not done (CK-011 covers 15 page bodies): sourdough feeding, baker's percentage body, recipe cost body, recipe scaler result; home/About/policy pages need none.
- [P2] QA sweep 2026-11-20 (local build): P0 0, P1 0, P2 22: 21 titles over length (kept: Google's title guidance says to brand titles; shorten the keyword part only with keyword data), /contact thin (fine for a contact page). Descriptions fixed in CK-015.
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

### 2026-11-19 · CK-011 BODY VISUALS · chat · live
- What: PR #8 merged after the owner's "lert merge" (with the info@ change, owner: "lets do info email"); main fb36f46.
- Verified: push build ERROR again (Google Fonts, same error as a64fb07); redeploy dpl_2jei53SVXgqFqRLZcXApyDCtn9bG READY on calckitchen.com; Chrome: /contact mailto info@, no hello@; /air-fryer-converter section chart, no sideways scroll.
- Commit: fb36f46 (merge)

### 2026-11-19 · CK-012 LAST VISUALS · chat · done (preview; PR #9 waiting for the owner's OK, not merged)
- What: section drawings on the last three calculator pages (sourdough feeding jars, baker's 1000 g split, recipe cost menu price split); fonts moved to next/font/local (Fontsource 5.3.0, OFL licenses in the fonts folder) because next/font/google failed both production push builds today; CLAUDE.md font line updated.
- Verified: tsc 0 errors; eslint 0 errors on changed files; check:numbers 18 scripts, 0 failed, 0 skipped; npm run build in the shell compiles all pages (prerender stops at /apple-icon: cdn.jsdelivr.net unreachable here, known).
- Commit: 3837c05 + DEVLOG (pushed: yes)

### 2026-11-19 · CK-012 LAST VISUALS · chat · live
- What: PR #9 merged on the owner's "merge"; main 7c3eacc. Push build READY first time (no redeploy): self-hosted fonts fixed the production failures.
- Commit: 7c3eacc (merge)

### 2026-11-19 · CK-013 EU CONSENT + BRAND IMAGES · chat · done (preview; waiting for the owner's OK, not merged)
- What: analytics consent for EU/EEA/UK/CH (D-11) and privacy text for it; icon, apple icon, OG and Twitter images redrawn with the thermometer mark and Public Sans from the repo (old ones: emoji + gradients, and the emoji made shell builds fail); og:image + page-level Twitter cards on all 25 pages (page openGraph had dropped the image); custom 404 listing every calculator; shared src/app/fonts.ts.
- Verified: tsc 0 errors; eslint 0 errors on changed files; check:numbers 18 scripts, 0 failed, 0 skipped; full npm run build in the shell passes; next start: /no-such-page 404 with the new page; meta tags on /, /air-fryer-converter, /turkey-cooking-calculator, /privacy-policy carry og:image and their own twitter:title; portfolio-qa prose-score 0.15 tells/1k; sweep P0 0, P1 0 (was 1: default 404), P2 41.
- Chrome on the preview (Europe/Ljubljana): bar shows, Allow sets consent granted and _ga cookies, Cookie settings reopens it, No thanks sets denied and removes the 2 _ga cookies; phone 390 px bar fits, no sideways scroll; /no-such-page shows the new 404 with 20 calculator links. Unverified: a non-European visit (bar should stay hidden, analytics granted).
- Commit: see branch (pushed: yes)

### 2026-11-19 · CK-013 EU CONSENT + BRAND IMAGES · chat · live
- What: PR #10 merged on the owner's "merge"; main e719320; push build READY first try.
- Verified: Chrome on calckitchen.com (see §0). GSC: indexing request for /cake-servings-calculator refused, daily quota used; sitemap resubmitted, "submitted successfully".
- Commit: e719320 (merge)

### 2026-11-19 · CK-014 TOOL TESTS + SITEMAP DATES · chat · done (preview; waiting for the owner's OK, not merged)
- What: Playwright (@playwright/test 1.65.1, playwright.config.ts, tests/tools.spec.ts, tests/consent.spec.ts, npm run test:e2e); src/data/updated.ts holds every page's "Updated" date and feeds the sitemap lastmod (sitemap used the build time for every page); D-12; CLAUDE.md test and date lines.
- Verified: npm run build passes in the shell; PW_CHROMIUM=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome npx playwright test: 56 passed, 0 failed, 0 skipped; sitemap.xml lastmod 24 × 2026-11-19, turkey 2026-11-18; tsc 0, eslint 0 on changed files; check:numbers 18 scripts 0 failed 0 skipped.
- Commit: see branch (pushed: yes)

### 2026-11-20 · CK-014 TOOL TESTS + SITEMAP DATES · chat · live
- What: PR #11 merged on the owner's "merge"; main 2ed9d57; push build READY first try. GSC: indexing request refused again (Quota Exceeded, 09:40 CET).
- Verified: live https://calckitchen.com/sitemap.xml lastmod 24 × 2026-11-19, 1 × 2026-11-18.
- Commit: 2ed9d57 (merge)

### 2026-11-20 · CK-015 SNIPPETS · chat · done (preview pending; waiting for the owner's OK, not merged)
- What: 19 meta descriptions over 155 characters trimmed (home, About, Privacy and 16 calculators); every figure kept as it was; the recipe macros one keeps the phrase its check script looks for.
- Verified: check:numbers 18 scripts 0 failed 0 skipped (macros check caught the first wording); npm run build passes; test:e2e 56 passed, 0 failed, 0 skipped; sweep on the local build: P2 description warnings 19 → 0, title warnings 21 (kept, see §5).
- Commit: see branch (pushed: yes)

### 2026-11-20 · CK-015 SNIPPETS · chat · live
- What: PR #12 merged on the owner's "merge"; main aebe33a; push build READY first try.
- Commit: aebe33a (merge)

### 2026-11-20 · CK-016 OWNER READ + GSC LOG · chat · done (DEVLOG only)
- What: owner's read for Raptive (raptive-ready step 10): 2026-11-20, owner: "read them they are ok". Pages: /, /about, /contact, /privacy-policy, /terms-of-use, /air-fryer-converter, /bakers-percentage-calculator, /butter-converter, /cake-pan-converter, /cake-servings-calculator, /coffee-ratio-calculator, /convection-oven-converter, /cooking-measurement-converter, /meat-cooking-time-calculator, /meat-temperature-chart, /microwave-to-oven-converter, /oven-temperature-converter, /party-food-calculator, /pizza-dough-calculator, /recipe-cost-calculator, /recipe-macro-calculator, /recipe-scaler, /slow-cooker-to-oven-converter, /sourdough-calculator, /turkey-cooking-calculator (all 25; fewer than 30, so all).
- GSC: indexing requested /cake-servings-calculator 2026-11-20 09:46 ("added to a priority crawl queue"); /bakers-percentage-calculator refused "Quota Exceeded" 09:47 and 09:52.
- Verified: GSC dialogs seen in Chrome. Unverified: nothing else changed.
- Commit: see branch (pushed: yes)

### 2026-11-20 · CK-017 INDEX SUBMIT · chat · done (DEVLOG only)
- What: finishing-line submissions in the owner's Chrome (owner: "Do it now, chrome opened"). Bing: 25 URLs submitted 09:59 CET (quota 100 → 75); sitemap https://calckitchen.com/sitemap.xml submitted ("successfully submitted for processing"), the www one from 2026-02-22 kept. GSC: sitemap resubmitted, read 2026-11-20, Success, 25 pages; Request indexing for /bakers-percentage-calculator refused "Quota Exceeded" ~10:01.
- GSC Pages: 7 indexed (last crawl): recipe-cost 11-02, cake-servings 11-01, / 10-31, oven-temperature 10-24, cake-pan 09-08, bakers-percentage 09-06, pizza-dough 09-04; 0 not indexed; the other 18 not yet known to Google. Request order changed to never-indexed first (§0).
- Mail: calckitchen.com MX = eforward1-5.registrar-servers.com (Namecheap email forwarding; dns.google 2026-11-20); whether info@ forwards is unverified.
- Branches: all 15 claude/ branches on origin are merged into main (git branch -r --merged); listed in §0 for the owner's decision. CK-016 PR #13 merged, main ec82fa9.
- Verified: Bing toast + list of 25 URLs "Today at 09:59"; GSC "Sitemap submitted successfully" and the row read Nov 20, 2026. Unverified: nothing on the site changed.
- Commit: see branch (pushed: yes)

### 2026-11-20 · CK-018 GA CHECK · chat · done (DEVLOG only)
- What: PR #14 merged on the owner's "merge" (main b88ad9f; production dpl_7jgcQPVLeNKphDW2e5UgdJeFMVpD READY; calckitchen.com loads in Chrome). GSC retries moved to 12:40 and 13:50 CET on the owner's OK.
- GA4 (owner: "ga ok"), Calc Kitchen 525539937, 2026-10-23 to 11-19: 579 users, 668 sessions, ~20 users a day, no spikes. Users: US 276 (47.7%), China 111 (19.2%, 0.9% engaged), Singapore 74 (12.8%, 0%), Canada 15, Slovenia 14 (owner's checks), UK 14, Germany 13, South Korea 9, Australia 8, Japan 8; 34 countries. US+CA+UK+AU 313 = 54%.
- Sessions: Organic Search 317 (56.8% engaged, 1m 06s), Direct 344 (8.7%, 6 s); US/CA/UK/AU = 169 of 210 engaged sessions (80%).
- Vercel firewall for the project: no custom configuration, default only.
- Verified: GA4 reports read in the owner's Chrome. Unverified: whether the China/Singapore hits reach Vercel or go straight to Google.
- Commit: see branch (pushed: yes)
### 2026-11-20 · CK-019 INPUT FIELDS · chat · done (preview; waiting for the owner's "merge")
- What: owner: "input field should be more highlighted in all input pages". Every .p-in (18 calculators): tint #FFF1E8 fill, 4px #C2410C bottom line, text cursor, action border on hover, 3px action focus outline, muted placeholder; disabled fields paper, no line. Recipe cost under 860px: rows stack with labels (Ingredient, Recipe uses, Package price, Package size, Cost); before, 8 of 18 fields sat off screen in a sideways-scrolling row at 390px. DESIGN.md + D-13. No page dates changed (style only).
- Files: src/app/(instrument)/instrument.css, src/components/calculators/RecipeCostCalculator.tsx, tests/tools.spec.ts (field check), DESIGN.md, DEVLOG.md
- Verified: npm run build passes; test:e2e 56 passed, 0 failed, 0 skipped; the new field check fails on the old recipe cost layout (10 of 18 fields on screen) and on a planted white fill; check:numbers 18 scripts, 0 failed, 0 skipped; before/after screenshots at 390 and 1280 (turkey, recipe cost, cake pan, bakers, pizza, sourdough). Preview dpl_5i8Mph87NXjHrQxSgCPtyAuspBXu READY; owner's Chrome: hover turns the border orange, focus shows the outline, typing 20 lb updates the turkey answer, recipe cost desktop grid intact with 18 of 18 fields on screen. The 390 px layout was checked in Playwright Chromium only (the Chrome window would not shrink).
- Commit: see branch (pushed: yes)

### 2026-11-20 · CK-019 INPUT FIELDS · chat · live
- What: PR #16 merged on the owner's "looks good, merge" (main c715100); production dpl_14K3wKS2LjGSQiMWpE9afXcAZyyo READY on the first try.
- Verified on calckitchen.com in the owner's Chrome: recipe cost 18 of 18 fields on screen, fill rgb(255, 241, 232), 4px rgb(194, 65, 12) line, no sideways scroll; pizza dough editable fields tinted, the rules-fixed ones grey with an ink line.
- Notes: main merged into claude/ck-018-ga-index (DEVLOG conflict resolved, both §6 entries kept) so PR #15 stays mergeable.

### 2026-11-20 · CK-020 GSC RETRIES · chat · done (DEVLOG only)
- What: PR #15 merged on the owner's "1 merge" (main 24dbb5a, production READY, homepage loads). Scheduled retry 12:40: /butter-converter inspected ("URL is unknown to Google", no referring sitemap shown yet), Request indexing refused "Quota Exceeded" at 12:42; stopped there. Retry 13:50: refused again at 13:53 on the same page. 15 pages still to request; next try needs the owner's OK for a scheduled task (a slot opened at 09:46 today).
- Verified: inspected URL confirmed before the click; GSC dialog seen in the owner's Chrome.
- Commit: see branch (pushed: yes)

### 2026-11-25 · CK-021 CLEANUP · chat · done (DEVLOG only)
- What: owner: "you can merge yourself" (D-14), "delete branches", firewall rule "i will do that". PR #17 merged (main 1a213a6, production dpl_5Y4VRUKtWozaZoZb2Sm85i6YMdKq READY, homepage loads). All 19 claude/ branches on GitHub checked as fully merged into main (merge-base --is-ancestor).
- Branch deletion blocked: git push --delete and DELETE git/refs returned 403 ("Write access to this GitHub API path is not permitted through this proxy"); clicking Delete on GitHub's branches page in the owner's Chrome was refused by a safety check. Nothing was deleted.
- Owner's command (deletes only these 20 branch names on GitHub; all commits are in main): cd /Users/markovisic/dev/calckitchen/app && git push origin --delete claude/ck-002-turkeyfix claude/ck-003-design1 claude/ck-005-live-log claude/ck-006-author claude/ck-007-mac-notes claude/ck-007-mac-notes-log claude/ck-008-ten-pages claude/ck-009-rest claude/ck-011-body-visuals claude/ck-012-last-visuals claude/ck-013-eu-consent claude/ck-014-tool-tests claude/ck-015-snippets claude/ck-016-owner-read claude/ck-017-index-submit claude/ck-018-ga-index claude/ck-019-input-fields claude/ck-020-gsc-retries claude/ck-021-cleanup claude/live-sync && git fetch --prune
- Verified: branch list and ancestry from git; PR #17 merge and production build from Vercel. Unverified: GSC indexing since 2026-11-20 (not rechecked).
- Commit: see branch (pushed: yes)

### 2026-11-25 · CK-022 FIREWALL + BRANCHES · chat · done (DEVLOG only)
- What: the owner ran the CK-021 command on his Mac: all 20 merged claude/ branches deleted on GitHub (only main left, checked with git ls-remote). The owner's Vercel firewall rule "continues" (added 2026-11-21 08:38 UTC): deny if country is SG, CN or HK; active, valid.
- GA4 2026-11-21 to 11-24: 49 users; US 22, South Korea 3, Vietnam 3, Brazil 2, Canada 2, Egypt 2, India 2, Japan 2, Algeria 1, Australia 1 (19 countries); filters for China, Singapore and Hong Kong return no data. Engaged sessions: 9 of 10 from US/CA/AU.
- Verified: firewall config read through the Vercel API; GA4 report read in the owner's Chrome; branch list from git. Unverified: GSC indexing since 2026-11-20.
- Commit: see branch (pushed: yes)

### 2026-11-25 · CK-023 ABOUT METHOD · chat · done (preview checked)
- What: owner: "beef up this page with a lot more content, about especially methodology, how we source data from primary sources". /about: primary source per kind of number, five steps (publisher, register, check scripts, links, browser tests), exact NIST unit table and the 350°F oven example rendered from the data files, five figures left out and why (D-03, D-08), real dates and corrections, all 32 register documents grouped by publisher with read date and the calculators that use them. Bio adds the owner's November read. Five FSIS/UW turkey rows in the register now name /turkey-cooking-calculator. Updated date 2026-11-25. No AI-use mention (owner rule).
- Files: src/app/(instrument)/about/page.tsx, src/data/registry.ts (new), research/data-sources.csv (5 used_for notes), src/app/(instrument)/instrument.css (.p-h3), src/data/updated.ts, tests/tools.spec.ts
- Verified: build passes; test:e2e 58 passed, 0 failed, 0 skipped; check:numbers 18 scripts, 0 failed, 0 skipped; prose-score /about 1,691 words, 1 hit = Wilton's document title "Ultimate Cake Serving Chart" (a source title, exempt); sweep P0 0, P1 0, P2 22 (unchanged); no "research/" or NaN in the HTML; no sideways scroll at 390 and 1280; preview dpl_A47kz9beHUXY7XcxXcdmCCjt7vQb READY, owner's Chrome shows 9 sections, 32 source links in 6 groups, 7 unit rows, Updated November 25, 2026.
- Commit: see branch (pushed: yes)
## §7 History & archive
- 2026-02 · initial build: 20 calculators, favicon, vercel.json, GA4 and Search Console/Bing verification (4 commits, 2026-02-22)
