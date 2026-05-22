# Reference site for aesthetic comparison

**URL:** <https://sequoiacap.com/>

The critic opens this URL side-by-side with `http://localhost:3000` on each iteration.

## What the critic should compare

The Sequoia site is the **aesthetic template**, not a content template. Compare:

- **Typography hierarchy** — serif display, careful size jumps, restrained weights, generous tracking.
- **Paper / background tone** — the warm off-white feel (note: our target is a touch warmer/creamier than Sequoia's).
- **Whitespace and column rhythm** — how much breathing room each section gets, where rules sit, how copy is set in narrow measures.
- **Restraint** — no gradients, no neon accents, no drop shadows, no "card" containers with rounded-3xl corners, no SaaS-style feature grids with icons-and-three-bullets.
- **Slow scroll feel** — sections that take a moment to read rather than fly by in 200px.
- **Navigation tone** — minimal, text-only, no boxed CTAs in the nav bar.

## What the critic should NOT directly imitate from Sequoia

- The portfolio grid layout — we don't have a portfolio.
- The "Articles" / editorial post listing — we are a single-page marketing site, not a blog.
- The exact serif Sequoia uses — pick something license-compatible (Source Serif 4, Lora, Cormorant, Spectral, Crimson Pro, or similar from Next's `next/font/google`).
- Sequoia's specific paper tone — ours should be slightly warmer/creamier per the user's instruction.

## Deviation budget

The Grid Agents page should feel *of the same world* as sequoiacap.com — institutional, editorial, sober — but it does not need to be a clone. Differences that should NOT be flagged as critique:

- We have a hero animation; Sequoia does not. That is intentional.
- Our content sections are product-focused (Problem/Solution/Outcomes); Sequoia is firm-focused.
- Our background is warmer than Sequoia's.
- We have a single primary CTA; Sequoia surfaces multiple paths.

Differences that **should** be flagged as critique:

- Use of sans-serif for body copy where serif belongs.
- Pure white (`#ffffff`) background, or any background that doesn't read as warm cream.
- Glassmorphism, gradient backgrounds, neon accents, drop shadows, rounded-3xl card containers.
- Feature-grid-with-icons-and-three-bullets layout for the USPs.
- Dense / fast-scroll layout with tight section padding.
- Marketing-y copy ("supercharge", "unlock", exclamation marks, growth-hacker phrasing).
- Cluttered nav bar with multiple CTAs.
