---
title: "Autonomous Documentation PR Protocol"
sidebar_label: "Agent PR protocol"
sidebar_position: 94
description: "Defines the evidence-first algorithm agents must follow for sequential accounting documentation refresh pull requests."
doc_type: "playbook"
---

# Autonomous Documentation PR Protocol

Status: active migration protocol  
Applies to: governed-spine documentation refresh PRs

## Purpose

This protocol lets documentation agents work autonomously while keeping the human owner in control through reviewable sequential pull requests.

Autonomy here means: inspect evidence, choose the next bounded task from the approved refresh program, implement it, validate it, and open a PR. It does **not** mean invent accounting semantics or silently decide contested business/legal questions.

## Start-of-PR algorithm

### 1. Synchronize state

Start from current `accounting-docs/main`.

Then inspect current `matuteiglesias/accounting-workflows/main` and record the exact upstream commit SHA used for factual verification.

Read, in order:

1. root `AGENTS.md`;
2. root `SYSTEM.yaml`;
3. `92-governed-spine-truth-baseline.md`;
4. `93-governed-spine-docs-refresh-program.md`;
5. the exact target pages;
6. relevant current upstream executable contracts/tests.

If the upstream architecture has materially moved beyond the seed baseline, update the PR's factual model from current upstream rather than forcing the seed plan onto new reality.

### 2. Select one bounded surface

Take the earliest unfinished wave whose prerequisite PR is merged.

A good PR normally answers one coherent question, for example:

- What is the current pipeline architecture?
- What commands should an operator use?
- Which artifacts are current contracts?
- How should consumers interpret funding/cash/debt?
- What may automation safely assume?

Split a wave when multiple independent review decisions would otherwise be bundled together.

### 3. Build a claim ledger before editing

For every material claim in the target pages, classify it:

| Status | Meaning | Action |
|---|---|---|
| CURRENT | Supported by current executable authority | Keep/update with evidence. |
| STALE | Contradicted by current authority | Replace or explicitly retire. |
| HISTORICAL | Was once true and still useful as history | Preserve only with visible historical framing. |
| COMPATIBILITY | Exists only for a supported compatibility boundary | State the limited scope; never present as primary authority. |
| INTENDED | Desired/future behavior not yet executable | Label as intended/planned, never current. |
| UNKNOWN | Cannot be verified from allowed evidence | Mark unknown or stop for human input. |

Do not solve UNKNOWN by extrapolating from filenames, comments, renderer labels, or old prose.

## Evidence hierarchy

For backend behavior, prefer:

1. current tests that lock the behavior;
2. typed contracts and current authority modules;
3. Makefile/CLI execution paths;
4. `accounting-workflows/AGENTS.md` and `SYSTEM.yaml`;
5. current publication/viewer contracts where relevant;
6. older docs only as historical evidence.

For a numerical example, either use a public synthetic fixture or clearly label the example as illustrative. Do not copy private/live accounting data into docs.

## Editing rules

### Preserve semantics, not old architecture

If an existing page contains valuable concepts wrapped in retired architecture, keep the useful concepts and replace the obsolete machinery.

Example:

- keep the explanation that consumers need a stable published bundle;
- remove a false requirement that this bundle must come from `metric_values.csv` or `accounting.human.document`.

### Preserve public routes by default

Do not rename/delete a page only because its filename is old. Prefer:

- rewrite in place;
- explicit historical notice;
- compatibility pointer;
- route-preserving redirect where the site supports it.

Break a route only when the migration program specifically justifies it and the PR explains the consumer impact.

### Keep accounting categories separate

Do not blur:

- operating revenue vs funding;
- core contribution vs broader support;
- property OPEX vs household/personal expense;
- draws/distributions vs OPEX;
- cash vs inferred/internal balances;
- debt position vs debt activity;
- monthly flows vs annual closing stocks;
- native currencies vs valuation layers;
- accounting facts vs legal/family-governance conclusions.

## Validation algorithm

Before opening a PR:

### Documentation repository

Run when the environment permits:

```bash
npm run typecheck
npm run build
```

Also inspect:

- changed frontmatter;
- sidebar IDs for changed/added pages;
- internal links touched by the PR;
- accidental references to retired current architecture.

If dependencies/environment prevent a command from running, report that explicitly. Do not write `pass` without execution evidence.

### Upstream consistency

Re-read the exact upstream anchors used for the PR after editing. Verify that prose did not accidentally strengthen a conditional/compatibility behavior into a universal promise.

For accounting-semantic pages, check relevant fixture/regression tests where practical. A docs PR should not require live accounting inputs merely to prove architectural claims.

## PR body template

Use this structure:

```text
## Docs refresh wave
<PR/wave name from 93-governed-spine-docs-refresh-program.md>

## Evidence baseline
accounting-docs base: <sha>
accounting-workflows truth commit: <sha>

## Changed
- ...

## Stale claims retired/reclassified
- ...

## Current claims established
- claim -> upstream path/test/command

## Routes/navigation
- unchanged | details

## Validation
- npm run typecheck: PASS / FAIL / NOT RUN + reason
- npm run build: PASS / FAIL / NOT RUN + reason
- other checks: ...

## Accounting/legal decisions
- none
or
- BLOCKED: <specific human decision>

## Live/private inputs
- not accessed

## Next bounded PR
- ...
```

## Reviewability rules

A PR should normally avoid:

- unrelated visual redesign;
- mass formatting;
- dependency upgrades;
- Docusaurus framework migrations;
- backend implementation changes;
- generated-site output commits;
- large historical deletion sweeps mixed with semantic rewrites.

If one of those becomes necessary, isolate it in its own PR and justify why it is prerequisite to the documentation truth migration.

## Human stop conditions

Do not open a definitive prose change when the only way to finish it is to decide:

- who legally owns an asset or income stream;
- whether a withdrawal was legally permissible;
- whether an accounting debt is legally enforceable;
- whether a family member has governance/inheritance rights;
- a new accounting classification absent from current authority;
- a compatibility promise for an unknown consumer;
- a live operational claim that has not been checked.

Instead, open a narrow decision note/PR comment describing the evidence conflict and the exact question the human must resolve.

## End-of-PR completion report

Every agent should conclude with:

```text
Changed:
Upstream accounting-workflows commit checked:
Claims made current:
Claims marked historical/compatibility:
Routes changed:
Typecheck:
Build:
Live/private inputs accessed:
Accounting semantics changed by docs: no
Legal/governance conclusions added: no
Blocked decision:
Next bounded action:
```

The goal is a chain of mergeable evidence-backed PRs, each leaving `main` more truthful than it found it.