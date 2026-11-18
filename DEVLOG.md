# DEVLOG — calckitchen.com
> Handoff file. Read §0–§5 and the last 10 entries of §6 before any work. Rules: devlog skill (.claude/skills/devlog/SKILL.md).

## §0 Resume here
_last update: 2026-11-17 · CK-004_
- Step: look picked · canvas https://claude.ai/artifact/JpAWbGoAFxj77wqGc55Jb5 (boards "Pick, B with A's knob", "Pick, phone")
- Phase: live site, not on Raptive. Four-stage pass on all 25 pages started with the turkey page.
- Last confirmed: CK-002 TURKEYFIX + CK-004 TURKEYPOLISH — turkey page on USDA figures, checked on the Vercel preview in Chrome — done (claude/ck-002-turkeyfix @ 9a1fb9a, PR #1 open). NOT merged, NOT live: blocked by the live-calculator gap below.
- In flight (handed, NOT confirmed): none
- Next action: get the 13 live calculator files onto GitHub (owner pushes claude/live-sync from the Mac folder, or approves a production deploy that reuses those files from the 2026-02-22 deployment); then merge PR #1, deploy production, check live. After that CK-003 DESIGN1 (picked look on the turkey page, preview, owner review).
- Waiting on owner: (1) live calculators — production runs 13 calculator files that GitHub doesn't have (CLI deploy 2026-02-22 from a folder with uncommitted changes; e.g. live pizza dough has a grams/ounces toggle) — push them or approve the reuse deploy; (2) don't connect Vercel to GitHub until main holds them; (3) Search Console — not in any of the 9 Google accounts in Chrome (2026-11-17); (4) author details for byline and About page.
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
- Deploy (host, project, trigger): Vercel project calckitchen (prj_HYJh4OEFSWYOqVM0NXm1wBr761RL, team marko-visics-projects). NOT connected to GitHub: pushes and merges deploy nothing. Production = Vercel CLI deploy 2026-02-22 (dpl_EjEJjzWCvDGfmapgM1wC8LdJjk8Q: git 8d7ae9e + 13 uncommitted files in src/components/calculators). Previews are created through the Vercel API from a GitHub ref (alias calckitchen-git-<branch>-marko-visics-projects.vercel.app, behind Vercel login; the owner's Chrome passes). vercel.json present.
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
- Live ≠ GitHub: 13 files in src/components/calculators differ from 8d7ae9e (SHA1 vs the deployment's file uids; line counts +3 to +74). Never deploy production from GitHub, and don't connect Git in Vercel, until main holds the live versions — it would strip live features (grams/ounces toggle seen on pizza dough).
- No Git link on Vercel: make previews with the Vercel API (gitSource Mapstor/calckitchen, ref + full sha); a build takes about 40 s.

## §5 Backlog (priority order)
- [P0] Live calculator files onto GitHub (blocks every production deploy; on conflict keep the CK-002 TurkeyCookingCalculator.tsx), then merge PR #1 and deploy; then the owner connects Vercel to GitHub.
- [P1] CK-003 build the picked look on the turkey page, preview, owner review; then 10 pages, then all.
- [P1] Search Console access, then order pages by impressions.
- [P1] Stage 1 on the other 24 pages: registry rows + checks; known suspects: meat-cooking-time rest/carryover table, party-food quantities, air-fryer presets, homepage temperature tables; full external-link check.
- [P1] Author identity: byline, author page with headshot and LinkedIn, About page names the author (Raptive stage).
- [P2] Anti-slop pass (homepage "Kitchen Math, Solved", "We don't guess — we calculate"; "millions of people"; "used by professional bakers worldwide").
- [P2] Measure with portfolio-qa (prose-score, sweep) for the scoreboard.
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

## §7 History & archive
- 2026-02 · initial build: 20 calculators, favicon, vercel.json, GA4 and Search Console/Bing verification (4 commits, 2026-02-22)
