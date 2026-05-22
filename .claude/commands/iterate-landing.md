---
description: Run the three-agent landing-page loop (planner → executor → critic) until critic returns APPROVED or the 5-iteration cap is hit. Use `reset` to clear state, `status` to inspect the current loop.
argument-hint: "[reset|status]"
---

# /iterate-landing — orchestrator

You are now the orchestrator for the Grid Agents landing page loop. The user invoked `/iterate-landing $ARGUMENTS`. Argument handling:

- `reset` — clear `.loop/plan.md`, `.loop/critique.md`, and reset `.loop/state.json` to `{"iteration": 0, "max_iterations": 5, "status": "not_started", "last_verdict": null, ...}`. Do not touch `spec.md`, `brand-context.md`, or `reference.md`. Report what you cleared and stop.
- `status` — read `.loop/state.json` and the last entry of `.loop/iterations.log`. Print a one-screen summary. Do not run the loop.
- `(empty)` — run the loop (see below).

## The loop

You run iterations of three agents in sequence: **planner → executor → critic**. Each iteration is one full pass. Stop when the critic returns `VERDICT: APPROVED`, OR when `state.iteration >= state.max_iterations`, OR when an agent reports `BLOCKED:` and human input is required.

For each iteration:

### Step 1 — bump iteration counter

1. Read `.loop/state.json`.
2. If `iteration >= max_iterations`, stop immediately and tell the user "5-iteration cap reached without APPROVED verdict. Re-run /iterate-landing to extend, or /iterate-landing reset to start over." Do not run another iteration.
3. Increment `iteration` by 1, set `status` to `"planning"`, write back.
4. Append to `.loop/iterations.log`: `--- iteration N started at <ISO ts> ---`.

### Step 2 — dispatch landing-planner

Use the Agent tool with `subagent_type: "landing-planner"`. Prompt:

> You are running iteration N of the Grid Agents landing-page loop. The orchestrator state is at `.loop/state.json`. Follow your standing instructions: read `.loop/spec.md` and `.loop/brand-context.md` on iteration 1; on later iterations read `.loop/critique.md` and prior `.loop/plan.md` and revise. Write the new plan to `.loop/plan.md`. Return a 1-paragraph summary of what the plan covers.

Wait for the planner to finish. Read `.loop/plan.md` yourself to confirm it exists and parses. If it doesn't, append the failure to `iterations.log`, update state to `"failed"`, and surface to the user.

### Step 3 — dispatch landing-executor

Set state to `"executing"`. Use the Agent tool with `subagent_type: "landing-executor"`. Prompt:

> You are running iteration N of the Grid Agents landing-page loop. Read `.loop/plan.md` and execute every unchecked task in order. Ensure `http://localhost:3000` is reachable when you finish. Return the structured summary your standing instructions describe (Tasks completed / not completed / Files changed / Packages / Dev server).

Wait for the executor. Parse its summary. If it reports `Dev server: FAILED` or has uncompleted tasks marked `BLOCKED:`, stop the loop, write state `"blocked"`, append the executor's full summary to `iterations.log`, and surface to the user — do not proceed to the critic if the dev server isn't reachable.

### Step 4 — sanity-check the dev server

Run this in Bash before dispatching the critic:

```bash
curl -sf -o /dev/null -w "%{http_code}" http://localhost:3000
```

Expect `200`. If anything else, append to `iterations.log` and stop. Do not dispatch the critic against a broken page.

### Step 5 — dispatch landing-critic

Set state to `"critiquing"`. The critic has **no file-system access**, so you must inline all the context it needs in its invocation prompt. Use the Agent tool with `subagent_type: "landing-critic"`. The prompt template:

> You are running the iteration-N critique pass of the Grid Agents landing-page loop. You are isolated — you cannot read source code or any file on disk. Judge the rendered output only.
>
> ## Local URL to inspect
> http://localhost:3000
>
> ## Reference URL to compare against
> https://sequoiacap.com/
>
> ## Brand brief (inlined for you — do NOT try to read .loop/brand-context.md)
>
> [paste the full contents of .loop/brand-context.md here]
>
> ## Comparison brief (inlined for you — do NOT try to read .loop/reference.md)
>
> [paste the full contents of .loop/reference.md here]
>
> ## Spec deviation budget (inlined — what NOT to flag)
>
> The user has explicitly decided:
> - Background is warm/creamy off-white, slightly warmer than sequoiacap.com's. Do not flag the warm tone as "not matching Sequoia exactly".
> - Founders are intentionally hidden. Do not flag the absence of a team section.
> - Phased roadmap / £500K cost from the deck is intentionally omitted.
> - Pricing, blog, newsletter, dark mode are intentionally absent.
>
> ## Verification hints from the planner (optional)
>
> [paste the "Verification hints for the critic" section from .loop/plan.md if present; otherwise write "None provided."]
>
> ## Your task
>
> Open both URLs (local in tab A, reference in tab B). Inspect responsiveness at 1440×900, 768×1024, and 390×844. Check console, network, computed styles. Watch the "How it works" animation. Return your verdict in the exact format your standing instructions specify. End your message with the verdict block.

Wait for the critic. The critic's final message is its verdict.

### Step 6 — capture critique and decide

1. Extract the critic's full return message. Write it verbatim to `.loop/critique.md` (overwriting the previous iteration's critique).
2. Append a one-line summary to `.loop/iterations.log`: `iteration N: VERDICT=<APPROVED|NEEDS_CHANGES>, <count> critique items`.
3. Parse the `VERDICT:` line.
4. Update `.loop/state.json`: set `last_verdict` accordingly, set `status` to `"approved"` or `"needs_changes"`.
5. **If `VERDICT: APPROVED`** — stop. Tell the user "Loop converged after N iterations. Dev server at http://localhost:3000." Show them the critic's "Positive observations" + "Comparison with reference" sections.
6. **If `VERDICT: NEEDS_CHANGES`** — return to Step 1 (next iteration).

## Hard rules

- **Do not skip the critic** even if the executor reports everything went smoothly. The critic is the only objective check.
- **Do not modify the critic's prompt structure** to feed it source code, diffs, or the executor's summary. Isolation is the whole point.
- **Do not run more than one of {planner, executor, critic} in parallel.** They have a sequential data dependency.
- **Do not interpret a `BLOCKED:` from any agent as something to "work around".** Surface it to the user. The loop pauses until a human resolves.
- **Do not write to `.loop/spec.md`, `.loop/brand-context.md`, or `.loop/reference.md`** mid-loop. Those are human-edited; the agents only read them.
- **Do not auto-restart after hitting the 5-iteration cap.** The user must re-invoke.

## After the loop

When the loop converges (APPROVED) or stops (cap / blocked):

1. Print the final state and the dev server URL.
2. Suggest concrete next steps the user might want — e.g., "review the page in your own browser", "swap the placeholder `hello@gridagents.com` for a real Calendly link", "commit when you're happy".
3. Do not auto-commit, auto-push, or auto-deploy. The user owns those decisions.
