# Iteration 1 plan (Round 2)

Generated: 2026-05-21T00:00:00Z
Addresses: initial spec — Round 2 additions (May 2026)

## Goals for this iteration

Replace the hand-rolled SVG glyphs in HowItWorksAnimation with composed Lucide icon visuals, add per-beat synchronized captions below the SVG, tighten total runtime to ~6 seconds, and deliver an end-state payoff. Separately, add five bespoke inline SVG illustrations to the Outcomes section USPs — one per USP, sitting left of the lead phrase on desktop and stacked above on mobile — without converting the section to a card grid.

## Tasks

1. [ ] **Install lucide-react** — `package.json` — Run `npm install lucide-react` to add the package. `lucide-react` exports individual icon components (e.g. `import { Zap } from "lucide-react"`) that render as `<svg>` elements. Since we need icons inside our main `<svg>` viewport, the integration strategy is: render Lucide icons as **absolutely-positioned `<div>` elements layered over the SVG** using a CSS `position: relative` wrapper on the animation container. The SVG handles all grid lines, motion paths, and structural animation; the Lucide icon `<div>` nodes are positioned over specific (x,y) coordinates via `left`/`top` CSS properties derived from the same coordinate constants (GRID_OFFSET_X, DOT_SPACING_X etc). This avoids `foreignObject` (poor cross-browser SVG support) and the complexity of extracting raw path data.

2. [ ] **Refactor HowItWorksAnimation.tsx — coordinate system and wrapper** — `src/components/HowItWorksAnimation.tsx` — Wrap the existing `<svg>` in a `<div style={{ position: "relative" }}>` container. The SVG stays `width="100%"` with `viewBox="0 0 740 360"` (add 10px height for caption slot). Export a helper `svgCoordToCss(x, y)` that converts SVG viewBox coordinates to percentage-based `left`/`top` CSS values (divide by 740 and 360 respectively) so icon overlays scale with the SVG. Apply this to each icon overlay `<div>`.

3. [ ] **Replace Pylon glyphs with Lucide RadioTower icons** — `src/components/HowItWorksAnimation.tsx` — Remove the `Pylon` component entirely. At the three pylon positions (`dotPos(1,0)`, `dotPos(3,2)`, `dotPos(0,2)`) render a `<div>` overlay with `<RadioTower size={20} strokeWidth={1.5} color="#1a1a18" />` from lucide-react. Each overlay div: `position: absolute`, `transform: translate(-50%, -100%)`, `opacity: 0`, animated to `opacity: 1` at `beat1Start + 0.9s` (matching the existing pylon fadeIn timing). This makes the pylon concept immediately legible.

4. [ ] **Replace DocumentGlyph with Lucide FileText icons (Beat 2)** — `src/components/HowItWorksAnimation.tsx` — Remove the `DocumentGlyph` component. For the three traveling documents (i=0,1,2), replace each `<g transform="translate(...)">` containing `<DocumentGlyph>` with an absolutely-positioned `<div>` overlay containing `<FileText size={16} strokeWidth={1.5} color="#1a1a18" />`. The travel animation becomes a CSS `transform: translateX` from `-30px` to `0px` combined with `opacity: 0` to `1`, matching the existing `docTravel` timing at `beat2Start + 0.3 + i * 0.2s`. Stagger the three docs at 4px horizontal offsets and 8px vertical offsets as before.

5. [ ] **Replace agent circles with Lucide Bot icons + add Flag/CheckCircle2 (Beat 3)** — `src/components/HowItWorksAnimation.tsx` — Remove bare `<circle>` agent elements and the `Tick` / `Flag` components. At each of the three agent positions (angles -30deg, 0deg, +30deg, radius 40px from DNO_NODE), render:
   - A `<div>` overlay with `<Bot size={18} strokeWidth={1.5} color="#1a1a18" />` fading in at `beat3Start + 0.2 + i * 0.3s`.
   - For agent i=1 (the flag case): a `<div>` overlay with `<Flag size={14} strokeWidth={1.5} color="#1a1a18" />` (Lucide Flag icon) fading in at `beat3Start + 0.6 + i * 0.3s`.
   - For agents i=0 and i=2 (the tick cases): a `<div>` overlay with `<CheckCircle2 size={14} strokeWidth={1.5} color="#1a1a18" />` fading in at same timing.
   Keep the existing spoke `<line>` elements in the SVG unchanged — they provide the structural connection lines.

6. [ ] **Replace clock glyph with Lucide Timer icon (Beat 4)** — `src/components/HowItWorksAnimation.tsx` — Remove the hand-drawn clock circle/hands group. Render a `<div>` overlay at the clock position (`DEV_NODE.x - 25`, `DEV_NODE.y - 20`) with `<Timer size={20} strokeWidth={1.5} color="#1a1a18" />`, fading in at `beat4Start + 0.5s`. The CSS `clockSweep` keyframe is no longer needed (remove it). Keep the `animateMotion` decision-signal circle traveling along `powerFlowPath` — that structural element is still the beat's main motion.

7. [ ] **Replace SolarPanel glyph with Lucide Sun icon (Beat 5)** — `src/components/HowItWorksAnimation.tsx` — Remove the `SolarPanel` component and its `<g>` wrapper. Render a `<div>` overlay at `DEV_NODE` position (offset `y - 35`) with `<Sun size={22} strokeWidth={1.5} color="#1a1a18" />`, scaling in via CSS `scaleIn` keyframe at `beat5Start`. Keep the dashed `powerOutPath` SVG `<path>` unchanged.

8. [ ] **Tighten pacing to ~6 seconds and add Developer/DNO Lucide icons** — `src/components/HowItWorksAnimation.tsx` — Revise all timing constants:
   - `MOUNT_DELAY = 0.4s` (was 0.6)
   - Beat 1 grid draw: starts at `0.4s`, grid lines stagger at `0.04s` each (was 0.06), last line completes ~1.46s
   - Beat 2 start: `1.5s` (was 2.1). Developer/DNO node fade-in at `1.5s` and `1.6s`.
   - Beat 3 start: `2.6s` (was 3.8). Agent spokes stagger at `0.25s` each, completing ~3.35s.
   - Beat 4 start: `3.8s` (was 5.6). Decision signal `animateMotion` dur `0.9s` (was 1.2).
   - Beat 5 start: `4.9s` (was 6.9). Power-out draw dur `1.0s` (was 1.2). Total: ~6.0s.
   Also replace Developer node `<circle>` with a `<Building2 size={18} />` overlay and DNO node `<circle>` with a `<Cable size={18} />` overlay, both from lucide-react, fading in at beat2Start.

9. [ ] **Add synchronized caption bar below SVG** — `src/components/HowItWorksAnimation.tsx` — Below the SVG (inside the relative wrapper), add a `<div>` caption slot with class `caption-slot`: `height: 48px`, `display: flex`, `alignItems: center`, `justifyContent: center`, `position: relative`. Inside it, render five absolutely-positioned `<span>` elements (one per beat), each with `fontFamily: var(--font-sans)`, `fontSize: 0.75rem`, `letterSpacing: 0.08em`, `opacity: 0`, `position: absolute`, `textAlign: center`, `whiteSpace: nowrap`. Use a CSS `@keyframes captionFade` defined in `globals.css`: `0% { opacity: 0 } 10% { opacity: 0.6 } 80% { opacity: 0.6 } 100% { opacity: 0 }`. Apply this keyframe to each caption span with `animationFillMode: both`.
   Caption texts and timings:
   - Span 0: `"01 — Grid network drawn"`, start `beat1Start`, dur `beat2Start - beat1Start` (= 1.1s)
   - Span 1: `"02 — Application submitted"`, start `beat2Start`, dur `beat3Start - beat2Start` (= 1.1s)
   - Span 2: `"03 — Agents review the pack"`, start `beat3Start`, dur `beat4Start - beat3Start` (= 1.2s)
   - Span 3: `"04 — Decision returned in minutes"`, start `beat4Start`, dur `beat5Start - beat4Start` (= 1.1s)
   - Span 4: `"05 — Project enters construction"`, start `beat5Start`, dur `2.5s` (holds until payoff)

10. [ ] **Add end-state payoff: grid pulse propagation** — `src/components/HowItWorksAnimation.tsx` — After beat 5 completes (~6s mark), add a looping pulse effect on the grid lines. Add a `@keyframes gridPulse { 0%, 100% { opacity: 0.3 } 50% { opacity: 1 } }` keyframe in the SVG `<defs><style>` block. Create a second set of SVG `<path>` elements (one per grid line) that mirror all grid lines: `stroke="#1a1a18"`, `strokeWidth={1.5}`, `opacity: 0`, and at `animationDelay: (beat5Start + 1.0 + i * 0.1)s` begin `gridPulse 2s ease-in-out infinite`. Stagger each line's delay by `0.1s * i` (using the same loop index as the original draw pass) so pulses propagate as a wave. Also add a payoff text overlay `<div>` below the caption slot: `"From application to decision: minutes, not months."` in font-label style, `opacity: 0`, `textAlign: center`, animated to `opacity: 0.55` at `beat5Start + 1.5s` with a `0.8s ease` transition.

11. [ ] **Add USP illustration 1 — Knowledge capture** — `src/app/page.tsx` (Outcomes section, USP index 0) — Inline SVG: `viewBox="0 0 100 100"`, `width="72"`, `height="72"`, `stroke="#1a1a18"`, `fill="none"`, `strokeWidth={1.2}`, `strokeLinecap="round"`, `strokeLinejoin="round"`. Content: an open book — left page `M 20 72 L 20 32 Q 50 22 50 32 L 50 72 Z`, right page `M 50 72 L 50 32 Q 80 22 80 32 L 80 72 Z`, spine `M 50 32 L 50 72`. Three knowledge-stream arcs above the spine meeting point at ~(50,30): `M 50 28 C 44 18 34 16 30 22`, `M 50 28 L 50 10`, `M 50 28 C 56 18 66 16 70 22`. Small pivot circle: `cx=50 cy=28 r=2.5 fill="#1a1a18"`.

12. [ ] **Add USP illustration 2 — Training acceleration** — `src/app/page.tsx` (Outcomes section, USP index 1) — Inline SVG `viewBox="0 0 100 100"`, `width="72"`, `height="72"`. Content: a three-step ascending staircase polygon `M 18 82 L 18 64 L 38 64 L 38 47 L 58 47 L 58 32 L 80 32 L 80 82 Z` stroke no fill. Ascending figure on top step: head circle `cx=72 cy=25 r=4 fill="none"`, body `M 72 29 L 72 40`, legs `M 72 40 L 68 48 M 72 40 L 76 48`. Upward arrow right of stairs: `M 88 58 L 88 28 M 83 35 L 88 28 L 93 35`.

13. [ ] **Add USP illustration 3 — Capacity release** — `src/app/page.tsx` (Outcomes section, USP index 2) — Inline SVG `viewBox="0 0 100 100"`, `width="72"`, `height="72"`. Content: a gauge dial. Outer semicircle arc: `M 12 68 A 38 38 0 0 1 88 68`. Inner arc (swept zone showing 70-95% capacity): `M 12 68 A 38 38 0 0 1 80 42` with `strokeWidth={2}`. Tick marks at low/mid/high: short line segments at ~5-degree intervals at the 0%, 50%, 95% positions on the arc. Needle at 75% position (pointing upper-right): `M 50 68 L 76 40`. Pivot: `cx=50 cy=68 r=3 fill="#1a1a18"`. Label text `<text x="15" y="80" fontSize="8" fill="#1a1a18" fillOpacity="0.5" stroke="none">0</text>` and `<text x="72" y="80" fontSize="8" fill="#1a1a18" fillOpacity="0.5" stroke="none">95%</text>`.

14. [ ] **Add USP illustration 4 — Customer journeys** — `src/app/page.tsx` (Outcomes section, USP index 3) — Inline SVG `viewBox="0 0 100 100"`, `width="72"`, `height="72"`. Content: two speech bubbles exchanged between figures. Left figure: head `cx=18 cy=28 r=6`, body `M 18 34 L 18 50`. Right figure: head `cx=82 cy=62 r=6`, body `M 82 68 L 82 80`. Upper speech bubble (left to right): `<rect x="28" y="16" width="46" height="22" rx="4"` with tail `M 28 32 L 18 38 L 34 36`. Lower speech bubble (right to left): `<rect x="26" y="50" width="46" height="20" rx="4"` with tail `M 72 60 L 82 56 L 70 68`. Star top-right: 5-point star path centered at (86, 16) radius 7 — outer points at angles -90, -18, 54, 126, 198 degrees, inner radius 3.

15. [ ] **Add USP illustration 5 — Faster connection reviews** — `src/app/page.tsx` (Outcomes section, USP index 4) — Inline SVG `viewBox="0 0 100 100"`, `width="72"`, `height="72"`. Content: a stopwatch. Outer circle: `cx=50 cy=62 r=30`. Crown button rect: `<rect x="43" y="28" width="14" height="8" rx="2"`. Loop lug: `M 38 30 Q 30 20 38 14`. Four minute marks: short lines at 12 o'clock `M 50 33 L 50 38`, 3 o'clock `M 79 62 L 74 62`, 6 o'clock `M 50 91 L 50 86`, 9 o'clock `M 21 62 L 26 62`. Elapsed hand at ~11-o'clock position (fast sweep): `M 50 62 L 35 40`. A partial arc suggesting motion: `M 50 34 A 28 28 0 0 0 25 74` with `strokeDasharray="20 60"` and `strokeWidth={1}`. Pivot circle: `cx=50 cy=62 r=3 fill="#1a1a18"`.

16. [ ] **Update Outcomes USP list layout for illustration integration** — `src/app/globals.css` and `src/app/page.tsx` — Add two utility classes to `globals.css`: `.usp-row { display: flex; gap: 2rem; align-items: flex-start; }` and `@media (max-width: 767px) { .usp-row { flex-direction: column; } }`. In `page.tsx`, restructure each `<li>` in the Outcomes `<ol>` to contain `<div className="usp-row">` with the illustration SVG on the left and the existing `<p>` on the right. Set `flexShrink: 0` on the SVG wrapper div. The `<li>` border-top and padding are unchanged.

17. [ ] **Verify reduced-motion fallback still works after animation overhaul** — `src/components/HowItWorksAnimation.tsx` — The existing `@media (prefers-reduced-motion: reduce)` block in the SVG `<defs><style>` block must be extended to also cover the new overlay divs. Add `.icon-overlay` class to every Lucide icon overlay `<div>` and add to the CSS (in `globals.css` or the SVG style block): `@media (prefers-reduced-motion: reduce) { .icon-overlay { animation: none !important; opacity: 1 !important; } .caption-slot span { animation: none !important; opacity: 0.6 !important; } .payoff-text { animation: none !important; opacity: 0.55 !important; } }`. Also add `class="payoff-text"` to the payoff text overlay div.

## Out of scope this iteration

- Hero, Problem, Regulator, EWOR, Footer sections — do not touch.
- Cream background color, serif typography, nav, CTA links — do not touch.
- The static beat legend (`01 Grid / 02 Developer submits / ...`) in `page.tsx` under the animation — keep it exactly as is.
- Section order — unchanged.
- `HowItWorksAnimationLoader.tsx` — no changes needed; the dynamic import wrapper is fine.
- Any new routes, pages, or API routes.
- Dark mode, internationalisation, cookie banner, pricing, blog.
- The `motion` package (already installed) — no need to use it this round; CSS animations are sufficient.

## Verification hints for the critic

- Capture a short GIF of the "How it works" section using `gif_creator` and confirm the animation visibly advances through at least three distinct beat states frame-to-frame. A still frame is not sufficient.
- Confirm that each of the five USP rows in the Outcomes section shows an SVG illustration to the left of the lead phrase on a desktop viewport, and that the overall section still reads as editorial prose (not a feature-grid with icon-and-bullets cards).
- Confirm the caption slot below the animation shows one caption at a time cycling through five beat labels, not a static list (it should read differently at 1s, 3s, and 5s into the play).
- Confirm the end state (after ~6 seconds) shows the grid lines in a subtle pulsing or glowing state and the payoff text "From application to decision: minutes, not months." is visible below the SVG.
- Confirm no regression on typography (serif body, cream background, restrained whitespace) across all sections.
