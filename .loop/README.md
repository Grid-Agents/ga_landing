# .loop/ — shared state for the three-agent landing loop

This directory is the only thing the planner, executor, and critic agents share. The orchestrator (`/iterate-landing` slash command, run from the main session) reads and writes here too.

## Files

| File | Lifecycle | Read by | Written by |
| --- | --- | --- | --- |
| `brand-context.md` | Stable; edit when the company brief changes | planner, critic (via prompt injection — critic never reads files), executor (via planner's plan) | human |
| `spec.md` | Stable; capture of the initial design decisions | planner | human |
| `reference.md` | Stable; the aesthetic comparison brief | planner, critic (via prompt injection) | human |
| `plan.md` | Refreshed each iteration | executor | planner |
| `critique.md` | Refreshed each iteration | planner | orchestrator (from critic's return message) |
| `state.json` | Mutated each iteration | orchestrator | orchestrator |
| `iterations.log` | Appended each iteration | human, orchestrator | orchestrator |

## Invariants

- The **critic** has **no file-system access**. It receives `brand-context.md` and `reference.md` content inlined into its invocation prompt by the orchestrator. It returns its verdict as its final message; the orchestrator writes that to `critique.md`.
- The **executor** does not edit anything in `.loop/` except possibly appending to `iterations.log` for its own changes. Plan and critique files are owned by planner and orchestrator respectively.
- The **planner** does not run the dev server, run tests, or modify project source. It only reads source (to know the current state) and writes `plan.md`.

## Resetting the loop

To start a fresh loop:

```
/iterate-landing reset
```

This wipes `plan.md`, `critique.md`, and resets `state.json` to iteration 0.
