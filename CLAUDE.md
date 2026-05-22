# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Marketing landing page for **Grid Agents** — an EWOR-backed early-stage startup building AI agents that automate DNO (Distribution Network Operator) grid connection application reviews. Submission to Energy Innovation Basecamp 2026 / problem statement EIP176. Source pitch deck lives at `~/Downloads/Basecamp presentation.pdf`.

The full brand brief (problem, solution, USPs, tone, audience) is captured in `.loop/brand-context.md`. The locked design decisions (aesthetic, sections, animation spec) are in `.loop/spec.md`. **Read those two files before touching `src/`** — do not re-derive the brief from the deck.

## The three-agent landing loop (important)

This project is iterated by three subagents driven by the `/iterate-landing` slash command, not by ad-hoc edits. The agents:

- **`landing-planner`** — reads `spec.md` / `brand-context.md` (iter 1) or `critique.md` (iter 2+), writes `.loop/plan.md`. Has no shell access.
- **`landing-executor`** — reads `.loop/plan.md` and makes all code changes. Ensures `localhost:3000` is reachable. No browser tools.
- **`landing-critic`** — opens `localhost:3000` and `sequoiacap.com` in Chrome via MCP and returns a structured verdict. **No file-system access at all** — this isolation is the whole point. It judges only what a user sees.

The orchestrator (the `/iterate-landing` command body) runs them in sequence, max 5 iterations, stops on `VERDICT: APPROVED`. State lives in `.loop/state.json` and `.loop/iterations.log`. See `.loop/README.md` for the invariants.

**Do not bypass the loop with manual edits unless the user explicitly asks.** The critic exists to keep the page honest against the brief; ad-hoc edits skip that check.

## Commands

```bash
npm run dev      # dev server on http://localhost:3000
npm run build    # production build
npm run start    # serve production build (must run build first)
npm run lint     # ESLint (flat config in eslint.config.mjs)
```

There are no tests yet — no test runner is configured.

## Stack notes that matter

- **Next.js 16** with App Router and the `src/` directory layout. The pinned version is intentional; `AGENTS.md` warns that this release has breaking changes from older Next.js conventions in training data. Before writing non-trivial Next.js code (server components, routing, fetch caching, params handling), check `node_modules/next/dist/docs/` for the actually-current API rather than going from memory.
- **React 19** — server components are the default; only add `"use client"` when a file actually needs browser APIs or hooks like `useState`/`useEffect`.
- **Tailwind CSS v4** (not v3). `globals.css` uses the new `@import "tailwindcss"` and `@theme inline` syntax. There is **no `tailwind.config.js`** — theme tokens (`--color-background`, `--font-sans`, etc.) are declared inside `@theme inline` in `src/app/globals.css`. PostCSS config lives in `postcss.config.mjs` and uses `@tailwindcss/postcss`. Dark mode is driven by `prefers-color-scheme` via CSS custom properties, not by a `dark:` class toggle on `<html>`.
- **Import alias**: `@/*` resolves to `src/*` (see `tsconfig.json`).
- **Turbopack is off** (scaffolded with `--no-turbopack`); `next dev` uses webpack. Don't add `--turbo` flags without a reason.
