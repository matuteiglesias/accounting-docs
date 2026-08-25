---
title: "Governed Spine Documentation Refresh Program"
sidebar_label: "Refresh program"
sidebar_position: 93
description: "Defines the sequential pull-request program for bringing the accounting documentation library to the governed backend architecture."
doc_type: "plan"
---

# Governed Spine Documentation Refresh Program

Status: active migration plan  
Seed date: 2026-08-25

## Mission

Bring `accounting-docs` from its May/June architecture assumptions to the current governed `accounting-workflows` system while preserving useful operational knowledge, public routes, provenance, and human reviewability.

This is a **truth migration**, not a documentation rewrite for style.

The desired endpoint is a documentation site where a new operator, developer, consumer, or agent can understand the real current system without accidentally learning retired architecture.

## Operating model

Use a chain of small sequential PRs.

```text
seed governance
  -> current architecture/foundations
  -> operating commands/runbooks
  -> contracts/artifacts
  -> consumer/professional semantics
  -> automation/recovery
  -> information architecture + historical cleanup
  -> final drift/release audit
```

Human owner merges or rejects each PR. The next implementation PR should start from current `main` after the previous accepted PR is merged.

Agents may research later waves while an earlier PR is under review, but they should not create competing edits to the same pages or assume an unmerged PR is authoritative.

## Global invariants

Every wave must preserve:

- executable backend truth outranks stale prose;
- accounting semantics are not invented in docs;
- current vs historical behavior is visibly distinguished;
- native currency, stock/flow, cash, debt, funding, OPEX, draws, and lineage semantics are not blurred;
- accounting classifications do not become legal/family-governance conclusions;
- public route changes are deliberate rather than incidental;
- no live/private ledgers, source documents, generated packs, credentials, or secrets are committed;
- no `accounting-workflows` implementation changes are smuggled into a docs PR.

## Required evidence for every PR

Each PR body must record:

1. `accounting-docs` base commit;
2. `accounting-workflows` commit used as upstream truth;
3. pages inspected;
4. material stale claims removed/reclassified;
5. current claims added and their upstream anchors;
6. routes/sidebar changes, if any;
7. `npm run typecheck` result;
8. `npm run build` result;
9. explicit unknowns or human decisions;
10. recommended next bounded PR.

Use the detailed algorithm in `94-autonomous-doc-pr-protocol.md`.

---

# PR sequence

## PR 1 — Current architecture and foundations cutover

### Mission

Make the documentation's top-level mental model truthful before repairing details.

### Primary files

- `README.md`
- `SYSTEM.yaml`
- `docs/notes/intro.md` if present
- `docs/notes/current_state_map.md`
- `docs/notes/documentation_compass.md`
- `docs/notes/library/00-foundations/*`
- `docs/notes/docs_execution_plan.md` (mark superseded/rewrite as appropriate)

### Required changes

- replace the old `views -> metric_values -> human report -> frontend snapshot` ladder with the governed spine;
- document repository boundaries: workflows owns calculations, viewer owns UI, docs owns published guidance;
- preserve useful conceptual language that remains true;
- explicitly identify historical/compatibility concepts rather than silently deleting context;
- update verification dates only for checks actually performed.

### Acceptance gate

A reader entering through README/current-state/foundations can no longer mistake generic views, `metric_values`, or `accounting.human.*` for current accounting authority.

---

## PR 2 — Operator command surface and runbooks

### Mission

Make operational documentation match the current Makefile and safe/live execution classes.

### Primary files

- `docs/notes/environment_bootstrap.md`
- `docs/notes/accounting_spine_runbook.md`
- `docs/notes/canonical_commands.md`
- `docs/notes/entrypoints.md`
- `docs/notes/runbook.md`
- `docs/notes/human_agent_playbook.md` if present
- `docs/notes/library/10-operations/*`

### Required changes

Document the current official path:

```text
run-ingest -> run-materialize -> run-debt-views -> run-metrics -> run-dashboard -> publish-latest
```

Separate fixture-safe checks from live/consequential commands. Remove instructions that require a retired generic views stage or parallel metric engine. Explain exact-run versus latest-pointer behavior where current contracts establish it.

### Acceptance gate

A competent operator following the docs does not invoke retired stages and can distinguish validation/smoke work from live ingestion/publication.

---

## PR 3 — Artifact and contract authority refresh

### Mission

Rebuild the contract pages around current governed artifacts and typed authorities rather than historical file families.

### Primary files

- `docs/notes/artifact_ladder.md`
- `docs/notes/contracts.md`
- `docs/notes/output_contracts.md`
- `docs/notes/ledger_taxonomy.md`
- `docs/notes/metric_registry_contract.md`
- `docs/notes/debt_resolver_contract.md`
- `docs/notes/frontend_snapshot_contract.md`
- relevant diagrams under `docs/notes/diagrams/`

### Required changes

Audit exact current producers/consumers for:

- canonical ledger;
- semantic split and operating statement;
- cash close and QA;
- debt position and debt activity;
- treasury/FX;
- governed metric frontier;
- annual dashboard and annual-flow membership;
- artifact/source contracts;
- publication bundle;
- professional pack/drilldown artifacts.

Preserve stable routes where possible. A route named `metric_registry_contract` may be repurposed to explain the current governed metric contract if that is clearer than breaking links; do not preserve a false architecture merely to match a filename.

### Acceptance gate

Every artifact presented as current has a current producer and a defined consumer or reporting purpose. Retired artifacts are historical/compatibility only.

---

## PR 4 — Accounting semantics, professional reporting, and consumer guidance

### Mission

Make the human-facing explanations match the modern governed semantic authorities.

### Primary files

- `docs/notes/human_report_catalog.md`
- `docs/notes/frontend_snapshot_contract.md`
- `docs/notes/library/30-consumers/*`
- semantic/metric/debt pages touched by consumer explanations

### Required content

Explain without legal overreach:

- property OPEX versus household/personal expenditure;
- operating revenue versus funding;
- core contributions versus broader typed support;
- personal draws/distributions;
- debt stock versus debt activity;
- validated cash versus unavailable/inferred values;
- native-currency separation;
- annual flow lineage versus annual closing stock;
- unknown/review-required fail-closed behavior;
- professional table/drilldown reconciliation;
- viewer/publication boundary.

Before documenting viewer behavior, inspect current `accounting-viewer` contracts rather than extrapolating from old snapshot docs.

### Acceptance gate

A consumer can understand what a number means, what it does **not** mean, where to drill down, and which repository owns the presentation surface.

---

## PR 5 — Automation, concurrency assumptions, recovery

### Mission

Align scheduled-operation and incident guidance with the simplified command graph and current safety boundaries.

### Primary files

- `docs/notes/automation_wiring_spec.md`
- `docs/notes/library/20-automation/*`
- relevant incident/recovery sections in operations docs

### Required changes

- use current canonical commands only;
- separate scheduling policy from accounting semantics;
- make same-scope concurrency limitations explicit while upstream issue #44 remains unresolved;
- preserve atomic/latest-pointer and recovery guidance only where current implementation supports it;
- avoid claiming production scheduler/deployment state unless actually inspected.

### Acceptance gate

Automation docs cannot accidentally schedule a retired path or promise concurrency guarantees the backend does not provide.

---

## PR 6 — Information architecture and historical cleanup

### Mission

Remove navigation confusion once the substantive pages are correct.

### Primary files

- `sidebars.ts`
- `docusaurus.config.ts` where navigation is affected
- duplicated top-level pages versus `library/*` pages
- `dev_diary.md`, `journal.md`, `narrative.md`, old plans and legacy notes
- governance/freshness pages

### Required changes

For each duplicated or stale page choose deliberately:

- CURRENT — keep in primary navigation;
- HISTORICAL — preserve but label/move out of the primary operating path;
- REDIRECT/COMPATIBILITY — preserve route with a concise pointer to current authority;
- DELETE — only when no route/consumer value remains and deletion is justified.

Do not do mass renames simply to make filenames aesthetically uniform.

### Acceptance gate

Primary navigation contains one coherent current story; historical material remains accessible only where it still has evidentiary/context value.

---

## PR 7 — Drift audit and documentation release closure

### Mission

Prove the migrated documentation behaves as a coherent release and leave a repeatable maintenance baseline.

### Required checks

At minimum:

```bash
npm run typecheck
npm run build
```

Also perform repository searches for stale current-architecture claims, including terms such as:

```text
accounting.views
run-marts
metric_values.csv
metric_registry.csv
accounting.human
human-report
Wave 4
legacy drilldown
```

Do **not** require zero occurrences: historical pages and explicit retirement explanations may legitimately contain these terms. Every remaining occurrence should be classified as current, historical, compatibility, or erroneous.

Check:

- sidebar and footer routes;
- important internal links;
- frontmatter contract compliance;
- README/SYSTEM verification metadata;
- current upstream commit recorded in the final evidence map;
- whether deployed-site verification was actually performed.

### Acceptance gate

No known high-impact stale claim remains in the current operating/consumer path, build/typecheck pass, and future drift checks have an explicit evidence baseline.

---

# Agent selection rule

When choosing the next PR autonomously:

1. take the earliest uncompleted PR in this program whose predecessor is merged;
2. inspect current `main` to ensure the work was not already completed by another PR;
3. narrow the wave further if a single reviewable PR would otherwise become too large;
4. do not skip forward to cosmetic cleanup while core truth is still stale;
5. stop rather than invent accounting meaning.

A wave may therefore become PR 3A/3B or 4A/4B if the evidence shows that is safer. The sequence is semantic, not bureaucratic.

# Program completion definition

The refresh is complete when:

- current architecture, operations, contracts, consumers, and automation pages agree with current executable authorities;
- retired architecture is no longer presented as current;
- historical material is clearly separated;
- Docusaurus typecheck/build pass;
- important public routes are coherent;
- the final drift audit records its upstream commit and known unknowns;
- there is no unresolved documentation change requiring an accounting or legal interpretation from the agent.