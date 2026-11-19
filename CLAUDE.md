# CLAUDE.md — calckitchen.com

- Push only claude/ branches. Never push main.
- Numbers: every figure traces to a row in research/data-sources.csv. Run `npm run check:numbers` (0 failed, 0 skipped) before a PR.
- Page dates: src/data/updated.ts is the one place for each page's "Updated" date and its sitemap lastmod; change a date only when that page's content changes.
- Design: follow DESIGN.md and PRODUCT.md (look picked 2026-11-17).
- Fonts are self-hosted with next/font/local (src/app/(instrument)/fonts) since CK-012, and icons/OG images fetch nothing since CK-013, so a full `npm run build` passes in a cloud shell.
- Tests: `npm run build && npm run test:e2e` (Playwright, every calculator and static page at 390 and 1280 px, plus the consent bar). In a cloud shell set PW_CHROMIUM=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome. 0 failed, 0 skipped before a PR.

## DEVLOG — mandatory
- Before any work: read DEVLOG.md §0–§5 + the last 10 §6 entries.
- After any task that changes files, data, config, deps or a decision: update DEVLOG.md per .claude/skills/devlog/SKILL.md and commit it with the work. Push only work branches; the owner merges.
- `done` only with verification that actually ran; skipped tests and UI behaviour = unverified. No secrets in DEVLOG.md.
