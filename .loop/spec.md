# Landing page spec — decisions locked

This file captures the user's design and content decisions. The planner reads this on iteration 1 of each loop run to seed the plan. Subsequent iterations are driven by `critique.md`, not this file.

**Round 2 additions are at the bottom of this file** — `## Round 2 additions (May 2026)`. The planner must satisfy them as if they were part of the original spec.

## Aesthetic direction

**Sequoia editorial — light, serif, restrained.** Reference: <https://sequoiacap.com/>.

- **Background**: warm/creamy off-white (the user explicitly asked for this — not pure `#ffffff`, not Sequoia's exact paper tone, but a slightly warmer cream). Aim for something in the `#faf6ee` – `#f4ecdc` range. Tune until it reads as "expensive paper", not "yellow".
- **Type**: serif for body and most display type. Sans-serif acceptable for small UI labels (nav, tags, captions) for contrast. No Geist Sans on body copy — that's a default scaffold artefact to replace.
- **Whitespace**: generous. Wide column rules. Slow scroll. Editorial, not dense.
- **Color**: monochrome by default. Off-black text on cream. One restrained accent only if the animation calls for it.
- **No drop shadows, no glassmorphism, no gradient meshes, no rounded-3xl cards.** Sequoia's restraint is the brief.

The deck's dark/sans aesthetic is deliberately **not** used on the landing page. The deck's *content and vocabulary* still apply; the visuals depart.

## Audience

**Both DNO decision-makers and investors.** The page must read as serious and technical (DNO procurement won't trust a marketing site) AND surface the credibility signals that matter to early-stage investors (EWOR backing, regulator citation, quantified outcomes).

## Tone

**Sober & institutional.** See `brand-context.md` § "Tone & language".

## Sections (in scroll order)

1. **Hero** — wordmark, headline, sub-headline, primary CTA. No animation here; keep first paint clean.
2. **Problem** — the DNO knowledge crisis. Draws from deck slides 2–6. One long paragraph or a tight 3-beat layout.
3. **How it works — with the dynamic animation** — see § "Animation" below. This is the centrepiece.
4. **Outcomes / USPs** — the five USPs from the deck, laid out editorially (not as a feature grid with icons).
5. **Regulator proof point** — NGET 2024/25 numbers (12 untimely offers, 6.5 vs 7.7 quality score, £7.46m penalties), Ofgem's three cited root causes. Adds external urgency.
6. **Backed by EWOR** — single credibility line + EWOR mark. No founder photos or bios (user asked to hide team for now).
7. **CTA footer** — restate the ask, mailto link, minimal contact info.

## Primary CTA

**Book a pilot / demo call**, pointed at `hello@grid-agents.com`. Use `mailto:` for now; the user will swap in a Calendly URL later. Same CTA copy in the hero and the footer.

## The animation (centrepiece, "How it works" section)

User's exact ask: *"a dynamic sleek grid-related animation showing literal grids, and how a developer submits an application, and then showing Autonomous AI agents running completion checks on the application package, helping the grid operators make decision faster and flag stuff, and finally the project being built faster."*

### Constraints

- **Style**: line-art / SVG, monochrome, restrained. Thin strokes, off-black on cream. Echoes the deck's icon style and fits the editorial aesthetic. No fully-illustrated or colorful treatment.
- **Placement**: standalone "How it works" section, mid-page. Not in the hero. Auto-plays on scroll-into-view (use `IntersectionObserver`).
- **Library**: pick whichever fits cleanest with Next 16 / React 19. `motion` (formerly framer-motion) is the obvious default for SVG keyframing + scroll triggers. Avoid Lottie (requires an animator's source files we don't have). Avoid Three.js (overkill).
- **Performance**: must not block first paint of the hero. Lazy-mount via dynamic import with `ssr: false` if needed. Total animated payload < 50KB ideally.
- **Accessibility**: respect `prefers-reduced-motion` — fall back to a static labelled diagram of the five beats.

### The five beats (narrative)

1. **Grid** — a stylised electricity grid (pylons, lines, substations) drawing itself in as if traced.
2. **Developer submits an application** — a small "developer" node on the grid pushes a stack of documents (single-line diagram, planning consent, etc.) toward a DNO node. The document icons should be recognisable mini-glyphs, not blobs.
3. **AI agents review the application** — at the DNO node, several agent glyphs (small circles or hex tokens) fan out, each touching a document and lighting it up. Ticks appear for clean items, flags appear for issues. This is the "completion checks" + "flag stuff" beat.
4. **Faster decision** — the DNO node emits an approved-stamp / decision signal back toward the developer node along the grid lines. A clock/timer indicator collapses to show acceleration.
5. **Project gets built** — at the developer's location, a small generation asset (solar panel, wind turbine, or battery — pick one from the deck) is built, lights up, and starts feeding power into the grid. The grid's lines now carry that flow back through the network.

The whole sequence should be ~6–10 seconds end to end. After completion, leave the final state on screen (everything drawn, lit, flowing) — do not auto-loop.

## Out of scope (do not build)

- Team/founders section.
- Phased roadmap / £500K cost slide content.
- Pricing.
- Blog / content marketing.
- Newsletter signup (the CTA is mailto, not email capture).
- Dark mode toggle (the page is light by design).
- Internationalisation.
- Cookie banner / GDPR (not yet — pre-pilot marketing page).

## Reference site for aesthetic comparison

<https://sequoiacap.com/> — see `reference.md` for which aspects the critic should compare against.

---

## Round 2 additions (May 2026)

After the first loop run converged, the user requested two material upgrades. These must be satisfied as if they were part of the original spec.

### 1. Polish the "How it works" animation

The user's feedback on the iteration-5 animation was that **every one of these is true** and must be fixed:

- **Visual style is amateurish.** The hand-rolled SVG glyphs (pylons made of two diagonal strokes, documents as rectangles with two horizontal lines, agents as bare circles) read as a wireframe sketch, not a finished asset. Replace them with **Lucide** (https://lucide.dev) or **Phosphor** (https://phosphoricons.com) icon components — both are MIT-licensed, line-art, monochrome, and match the editorial restraint. Lucide is the strong default; `lucide-react` is the npm package. Pick icons that read clearly: a power-grid icon (zap / cable / radio-tower) for the grid, a document/file-text for submissions, a cpu/bot/check-circle for agents, a clock/timer for the decision pulse, a sun/leaf/zap for the built project.
- **Pacing is uneven.** Beats should have distinct rhythm — fast openings, brief hold for clarity, deliberate transitions. Target ~6 seconds total (not 8). Each beat gets its own duration; no uniform delays.
- **Narrative is unclear.** A viewer cannot tell beat 2 from beat 3 from the motion alone. Add **synchronized captions** that fade in/out alongside each beat — a one-line label appearing in a fixed caption slot below the SVG, synced to each beat's start. Examples: "01 — Application submitted", "02 — Agents review the pack", "03 — Issues flagged, completeness scored", "04 — Decision returned in minutes", "05 — Project enters construction". The five "01 Grid / 02 Developer submits / …" labels below the animation can stay as a static legend, but a live caption synced to the playing beat is essential.
- **No payoff.** The end-state must hold something arresting. Suggestions: after the project is built, the entire grid network "lights up" with subtle pulses propagating through every line, holding indefinitely. Or: a final stat overlays as the animation completes — "From application to decision: minutes, not months." Pick one that feels editorial, not gimmicky.
- **Animation must demonstrably play.** The previous loop hit a `visibilityState === hidden` artifact where the critic's tab being backgrounded paused CSS animations and the critic mis-reported the animation as broken. This round: the critic MUST verify playback by capturing a short GIF of the section via `gif_creator`, then visually confirming the sequence advances frame to frame. The orchestrator will instruct the critic to do this.

The 5-beat narrative itself (grid → submit → review → decision → built) is preserved. Only the production quality changes.

### 2. Bespoke SVG illustrations for each of the five USPs

The five USPs in the Outcomes section currently render as numbered prose only. Add a **bespoke 80–120px monochrome SVG illustration inline beside each USP**, sitting above or to the left of the lead phrase. Each illustration is specific to its USP:

| USP | Illustration concept |
| --- | --- |
| 1. Knowledge capture and transfer | An open book / archive with knowledge streams flowing into a node — or a brain glyph with concentric retrieval lines |
| 2. Training and onboarding acceleration | A staircase / ascending steps with a small figure climbing — or a sapling growing alongside a measure |
| 3. Capacity release (70–95%) | A gauge / meter dial sweeping from low to high — or three stacked horizontal bars with the topmost extending furthest |
| 4. Improved customer journeys / Ofgem scores | A speech bubble exchange between two figures — or a five-star rating glyph filling in |
| 5. Faster connection reviews | A stopwatch / speedometer — or a timeline collapsing from a long bar to a short one |

Constraints on the illustrations:
- Hand-crafted SVG (no PNG, no Lottie, no photography). Inline in the page, not separate files.
- Same stroke colour as the rest of the page (`#1a1a18` or token equivalent), `stroke-width: 1` or `1.5`, `fill: none` except for tiny accents. No colour.
- 80–120px square viewbox, sized down via CSS for the inline render. Not larger than the USP heading.
- Layout: illustration sits to the left of the lead phrase on desktop (≥768px), and stacks above on mobile. Do NOT switch to a card/grid layout — preserve the existing editorial long-form prose structure. The illustration is a margin asset, not a feature-card icon.

If Lucide has icons that fit cleanly, those are acceptable as a fallback for any USP where the bespoke illustration is hard to nail. But default to bespoke — the goal is "this page was thought about" not "we used Lucide for everything".

### 3. Loop hygiene

- Iteration cap stays at 5.
- The critic must use `gif_creator` on the "How it works" section to verify the animation actually advances. A single still frame is not sufficient given the iteration-5 lesson about backgrounded tabs.
- All other spec sections (sections, sober tone, cream background, serif typography, mailto CTA, no founders, no roadmap, no pricing) remain unchanged.
