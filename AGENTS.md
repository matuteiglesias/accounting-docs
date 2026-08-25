# AGENTS.md — Accounting Documentation

## Mission

Keep the public accounting documentation aligned with the current governed accounting backend without inventing accounting meaning, operational success, legal conclusions, or compatibility requirements that the executable system does not establish.

This repository owns curated operating guidance, contract documentation, architecture explanations, and the Docusaurus publication surface. It does **not** own ledger records, accounting calculations, source documents, viewer implementation, or runtime truth.

The current documentation library contains useful material from earlier architecture generations. Treat it as material to verify and migrate, not as authority merely because it already exists.

## Authority order

When facts conflict, use this order:

1. current `matuteiglesias/accounting-workflows` executable behavior, tests, contracts, `AGENTS.md`, `SYSTEM.yaml`, and Makefile;
2. explicit current interfaces of `accounting-viewer` when documenting viewer consumption;
3. verified current pages in this repository;
4. historical documentation, development diaries, old plans, and compatibility notes.

A generated accounting output is evidence from a run, not a replacement for the governing code/contract. Never use old documentation to resurrect a retired backend layer.

## Current backend baseline

As of the seed baseline documented in `docs/notes/library/90-governance/92-governed-spine-truth-baseline.md`, the supported backend spine is:

```text
ledger ingest
  -> governed materialization / semantic + cash facts
  -> debt position/activity + treasury
  -> governed frontier + annual dashboard
  -> publication
  -> professional presentation / drilldowns
```

Generic views, the parallel `metric_values` engine, and `accounting.human.*` report authority have been retired. Compatibility code may remain only as an explicit non-authoritative boundary for supported historical presentation shapes.

Every documentation PR must re-check upstream `accounting-workflows/main`; the seed baseline is a starting snapshot, not permanent truth.

## Accounting and governance safety

Documentation must keep these categories separate:

- established accounting behavior or tested facts;
- documentary/system contract facts;
- disputed or uncertain claims;
- strategic, operational, or personal choices.

Do not infer family intentions, ownership rights, legal rights, negotiation positions, or inheritance consequences from accounting classifications. Do not convert an accounting label such as funding, withdrawal, distribution, debt, or property OPEX into a legal conclusion.

If accounting meaning is ambiguous, document the ambiguity or stop for human review. Do not resolve it through prose.

## Autonomous refresh workflow

For each bounded PR:

1. read `SYSTEM.yaml`, this file, the truth baseline, refresh program, and autonomous PR protocol;
2. fetch current `accounting-workflows/main` and record the upstream commit used;
3. inspect the exact docs being changed and their inbound/sidebar links;
4. classify each material claim as current, stale, historical, intended, or unknown;
5. update only one coherent documentation surface;
6. preserve stable public routes unless route retirement is explicit and justified;
7. add or refresh evidence notes for important factual claims;
8. run `npm run typecheck` and `npm run build` when the environment permits;
9. report what was verified, what was not verified, and the next bounded PR.

Prefer several reviewable sequential PRs over one repository-wide rewrite. Start every new PR from current `main` after the prior accepted PR has landed.

## Prohibited shortcuts

Agents must not:

- change `accounting-workflows` code from a docs migration PR;
- hand-edit or commit private ledgers, source documents, credentials, generated accounting packs, or live output bundles;
- claim that a live accounting run, deployment, latest pointer, or external site is current unless it was explicitly checked;
- keep a false statement merely to preserve old wording;
- delete historical context that remains useful without either relocating it or clearly marking it historical;
- recreate retired concepts such as generic views, `metric_values`, or human-report authority as if they were current architecture;
- broaden a bounded PR into unrelated site redesign or framework work.

## Human stop conditions

Stop and ask for human review when a proposed documentation change requires:

- a new accounting classification or interpretation;
- a decision about contested ownership/governance semantics;
- a legal conclusion;
- access to private/live accounting inputs;
- a new public compatibility promise not present in current executable contracts;
- destructive route removal where current consumers are unknown;
- a contradiction between current executable authorities that cannot be resolved from tests/contracts.

## Definition of done for a docs-refresh PR

A PR is ready for human merge when:

- its upstream backend commit is stated;
- stale/current distinctions are explicit;
- changed claims have evidence anchors;
- links/sidebar/routes remain coherent;
- no private or generated accounting data was added;
- build/typecheck results are reported honestly;
- the PR body names the next recommended bounded step.

Use the completion format in `94-autonomous-doc-pr-protocol.md`.