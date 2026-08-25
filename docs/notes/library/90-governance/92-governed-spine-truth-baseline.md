---
title: "Governed Spine Truth Baseline"
sidebar_label: "Backend truth baseline"
sidebar_position: 92
description: "Pins the verified accounting-workflows architecture that starts the August 2026 documentation refresh."
doc_type: "reference"
---

# Governed Spine Truth Baseline

Status: migration seed  
Baseline date: 2026-08-25  
Upstream repository: `matuteiglesias/accounting-workflows`  
Upstream commit: `b7d2c3a379f966f4d69b56c2df113714a7051452`  
Closure PR: `accounting-workflows#93`  
Post-merge CI: `accounting-ci` run 243 — success

## Purpose

This page gives documentation agents a concrete starting truth after the accounting backend simplification campaign. It is deliberately narrow: it says what the executable backend established at the baseline commit and which older documentation concepts must no longer be presented as current authority.

This page is **not** permanent authority. Before every documentation PR, re-check `accounting-workflows/main` and record the newer upstream commit if it has moved.

## Supported backend spine

The current supported architecture is:

```text
canonical ledger ingest
  -> governed materialization
       -> semantic flow facts
       -> operating statement
       -> validated cash facts
  -> debt position/activity + treasury
  -> governed monthly frontier + annual dashboard
  -> publication bundle
  -> professional presentation + governed drilldowns
```

The controlling upstream repository now states the same spine in its `AGENTS.md` and Makefile.

## Current authority boundaries

| Area | Current authority | Documentation consequence |
|---|---|---|
| Canonical ledger transformation | `accounting-workflows` | Docs describe inputs/outputs; docs never redefine ledger semantics. |
| Semantic flow classification | governed semantic materialization/contracts | Household/property OPEX, funding, draws, debt, FX and unknown/review-required distinctions must follow executable contracts. |
| Cash | governed cash artifacts | Validated cash is distinct from inferred/internal balances; docs must not invent fallback cash. |
| Debt | debt position/activity authorities | Stock and activity are different grains; annual stock is not a sum of monthly positions. |
| Monthly metrics | governed metric frontier | Current frontier consumes governed canonical sources, not a parallel legacy metric engine. |
| Annual metrics | annual dashboard + governed flow lineage | Annual flows aggregate governed monthly membership; stock semantics remain closing-position semantics. |
| Funding support | typed funding-support contract | Core contribution, direct-obligation support and debt-linked support are explicit classes; vague narrative words do not establish membership. |
| Professional output | professional pack/drilldown authorities | Drilldowns must reconcile to displayed cells and retain native currency/scope. |
| Viewer | `accounting-viewer` | Viewer-specific presentation is not owned here or in `accounting-workflows`. |
| Public operating documentation | `accounting-docs` | This repository owns explanation, not calculations. |

## Retired or non-authoritative concepts

The following must **not** be described as current accounting authorities:

- a generic `accounting.views` / `run-marts` stage between materialization and metrics;
- `metric_values.csv` as a parallel metric universe;
- `metric_registry.csv` plus legacy metric views as the primary current reporting contract;
- `accounting.human.*` as the current human-report calculation/presentation authority;
- a frontend architecture that depends on those retired layers;
- Wave-4/legacy drilldown routing as an independent semantic authority.

Historical pages may still discuss these concepts when useful, but they must be clearly marked historical/compatibility and must not appear in current runbooks or current-state diagrams as required stages.

## Current command surface

At the baseline commit, the upstream Makefile declares:

```text
Official path:
run-ingest -> run-materialize -> run-debt-views -> run-metrics -> run-dashboard -> publish-latest
```

Important safe validation commands:

```bash
make doctor
make validate
make smoke-core
make smoke-full
```

Important live/consequential commands:

```bash
make run-canonical
make run-debt-views
make run-metrics
make run-dashboard
make run-full
make publish-latest
make release-check
```

Sidecar/professional commands include USD-CCL valuation/management flows and professional drilldown/digest generation. Documentation agents must inspect the current Makefile before publishing exact invocation details.

## Baseline validation evidence

The closure PR and post-merge `main` run established:

- module compilation: pass;
- artifact/source/annual/publish contract checks: pass;
- fixture ingest -> governed materialization -> governed metrics execution: pass;
- annual year × native-currency reconciliation against the monthly operating statement: pass;
- retired metric/view outputs absent in the governed metrics smoke path: pass;
- full pytest suite: **313 passed**;
- warnings: **7**, all existing debt-position pandas date-format warnings;
- no live/private accounting inputs were required for this closure validation.

This is fixture-safe regression evidence, not proof that a particular live production snapshot is fresh.

## Accounting invariants docs must preserve

When updating explanatory pages, do not weaken these principles:

1. Household/personal withdrawals are not property OPEX merely because money left a managed box.
2. Funding is not operating revenue.
3. Core funding and broader economic support are not interchangeable.
4. Debt position is a stock; debt activity is a flow.
5. Validated cash must not silently fall back to inferred cash.
6. Native currencies stay separate unless an explicit valuation/reporting layer is invoked.
7. Annual flow totals must retain governed monthly lineage; annual stock uses closing-position semantics.
8. Unknown or ambiguous semantic rows fail closed/review-required rather than being forced into convenient categories.
9. Professional drilldowns must reconcile displayed values to explicit governed membership without semantic leakage.
10. Accounting classifications are evidence for administration; they do not decide contested legal ownership, rights, or family governance.

## Known unresolved item

Concurrency issue `accounting-workflows#44` remains a deferred operational concern: overlapping same-scope runs are not yet a supported assumption. Docs should not promise concurrent-run safety until the executable system establishes it.

## Known documentation drift at refresh start

At this baseline, several existing pages visibly predate the governed-spine architecture. For example, `current_state_map.md` still describes:

- `accounting.views` as a pipeline stage;
- debt balance compatibility views as the current debt model;
- `metric_values.csv`, `metric_registry.csv`, metric views and metric drilldowns as the primary metrics outputs;
- `accounting.human.document` / `accounting.human.tables` as current report factories;
- publication built around those older layers.

Those statements are migration targets, not reasons to reconstruct the old architecture.

Other pages named around `human_report`, `metric_registry`, old snapshots, automation, command aliases, or legacy output contracts must be audited individually. A filename can remain useful even when its content needs reinterpretation; do not rename/delete routes mechanically.

## Primary evidence anchors

Re-check these upstream sources before each PR:

- `accounting-workflows/AGENTS.md`
- `accounting-workflows/SYSTEM.yaml`
- `accounting-workflows/Makefile`
- current typed contracts under `accounting/contracts/`
- governed metric/annual/professional modules and their tests
- current publication contract and synthetic professional regression corpus

For current accounting behavior, executable tests/contracts outrank this snapshot.