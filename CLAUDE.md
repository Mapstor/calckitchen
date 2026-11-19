# CLAUDE.md — calckitchen.com

- Push only claude/ branches. Never push main.
- Numbers: every figure traces to a row in research/data-sources.csv. Run `npm run check:numbers` (0 failed, 0 skipped) before a PR.
- Design: follow DESIGN.md and PRODUCT.md (look picked 2026-11-17).
- Fonts are self-hosted with next/font/local (src/app/(instrument)/fonts) since CK-012: next/font/google broke production builds. Cloud-shell builds compile; the icon/OG routes still fetch cdn.jsdelivr.net and fail here, so verify those on the Vercel preview.

## DEVLOG — mandatory
- Before any work: read DEVLOG.md §0–§5 + the last 10 §6 entries.
- After any task that changes files, data, config, deps or a decision: update DEVLOG.md per .claude/skills/devlog/SKILL.md and commit it with the work. Push only work branches; the owner merges.
- `done` only with verification that actually ran; skipped tests and UI behaviour = unverified. No secrets in DEVLOG.md.
