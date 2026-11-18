# DESIGN.md — calckitchen.com

Picked 2026-11-17 on the canvas "calckitchen: three looks" (https://claude.ai/artifact/JpAWbGoAFxj77wqGc55Jb5): **B with A's knob**, boards "Pick, B with A's knob" (1280) and "Pick, phone" (390). This pick replaces any older brief. Reference page: /turkey-cooking-calculator.

## Idea
The page is a kitchen instrument panel. Two real instruments carry the answer: the oven knob shows the setting (325°F), the thermometer shows when it's done (165°F). Each calculator gets the instrument that measures its own answer: knob for oven settings, thermometer for doneness, a dial scale for weights, a ruler for times and amounts.

## Color
| Token | Hex | Use |
|---|---|---|
| ink | #0E1621 | text, rules, knob body, borders |
| white | #FFFFFF | page |
| paper | #F3F5F7 | ad slots, bezel, quiet fills |
| line | #D5DAE1 | hairlines, cell dividers |
| steel | #C8CED6 | knob inner ring, minor ticks |
| muted | #4A5563 | secondary text (7.6:1 on white) |
| cold | #1D5FBF | fridge zone, thaw days |
| hot | #E35A0F | thermometer column, danger-zone hatch, bulb, markers fill (no text on it) |
| hot-text | #B8430A | orange text on white (5.5:1) |
| action | #C2410C | primary button (white text 5.2:1), hover #9A3412 |
| tint | #FFF1E8 | highlighted table row, "your bird" row |

Blue and orange tell zones apart (not red/green). Links: ink text, orange underline (1px, 3px offset; 3px on hover).

## Type
- **Public Sans** 400–900 for everything people read. Answer headline 900, 70px desktop / 46px phone, line-height .98, letter-spacing −2.2px. H2 800 38px. Body 18px/1.6.
- **Michroma** only for instrument readouts: scale numerals, knob labels, result values, times, axis labels. Its degree sign sits low: always set "°F" in Public Sans.
- Lining figures, plain zero (checked for both).

## Layout
- Container 1200px, 40px gutters (20px under 860px). Full-width bands for header, hero and footer.
- Hero: knob 330px left, H1 + answer sentence + sub + byline right; full-width thermometer under it; calculator in an "instrument panel" (2px ink border, 1px dividers, 56px inputs) below.
- Main grid: content + 300px rail. Rail = sticky 300×600 ad, then "More calculators".
- Results row: readouts (Michroma value + Public Sans unit + caption) between 2px ink rules.
- Section separators: tick-mark ruler (2px ink line, ticks every 12px, long tick every 60px).
- Tables: 2px ink top and bottom header rules, 1px line rows, tint on the reader's row.
- Phone (≤860px): one column, knob 210px centered above the headline, short thermometer (0–200°F, ticks every 10), panel cells stacked, readouts 2×2, timeline vertical, rail ad hidden.

## Ads (Raptive)
Drawn from the start: sticky sidebar 300×600, in-content 336×280 after the results and between sections, sticky footer 728×90 (320×50 on phones). Page bottom padding 124px (80px phone) so the footer anchor never covers the footer.

## Motion
One moment, then quiet:
1. Knob turns OFF → 325°F (1.5s, from 0.3s), preheat lamp turns orange at 1.8s.
2. Thermometer column rises from 40°F to 165°F (2.2s, from 1.6s).
3. Quiet loop: the danger-zone stripes drift (1.4s per 10px).

CSS and SVG only, no animation libraries, nothing that shifts layout or delays the answer. `prefers-reduced-motion` shows the end state.

## Never
Emoji icons (the current site uses them), rounded soft-shadow card grids, gradient washes, small caps labels above headings, cream + serif + terracotta, near-black + neon, text under 4.5:1, links without underlines.
