---
title: "Current State Map"
sidebar_label: "Current state"
sidebar_position: 3
description: "Summarizes the current governed accounting backend architecture, authority boundaries, and retired layers."
doc_type: "inventory"
---

# Accounting Backend Current State Map

Status: current architecture reference  
Last reviewed: 2026-08-25  
Upstream truth checked: `accounting-workflows@b7d2c3a379f966f4d69b56c2df113714a7051452`

## Purpose

This page gives the top-level mental model for the current governed backend. It describes architecture and authority boundaries; detailed command, artifact, consumer, and automation contracts are refreshed in later waves and must be checked against current upstream authority when they disagree with this page.

## Supported backend spine

```text
approved accounting input
  -> canonical ledger ingest
  -> governed materialization
       -> semantic flow facts
       -> monthly operating statement
       -> validated cash facts + QA
  -> debt position/activity + treasury
  -> governed monthly frontier
  -> annual dashboard / governed annual lineage
  -> publication bundle
  -> professional presentation + governed drilldowns
```

The current upstream Makefile declares the official execution path as:

```text
run-ingest -> run-materialize -> run-debt-views -> run-metrics -> run-dashboard -> publish-latest
```

`run-debt-views` remains the command name, but the current architecture is debt resolution/position/activity authority; it is not evidence that a retired generic views layer remains part of the pipeline.

## Authority boundaries

| Area | Current authority | Boundary |
|---|---|---|
| Canonical ledger | `accounting-workflows` ledger ingest | Docs describe the contract; docs do not classify source records independently. |
| Semantic materialization | governed semantic/cash materialization and contracts | Operating revenue, funding, OPEX, draws, unknown/review-required, cash, currency, and scope follow executable rules. |
| Cash | validated cash artifacts and QA | No silent fallback to inferred/internal balances. |
| Debt | debt position/activity authorities | Position is stock; activity is flow. |
| Treasury / FX | governed treasury and valuation authorities | Native currencies remain separate unless an explicit valuation/reporting layer applies. |
| Monthly metrics | governed frontier | No parallel legacy metric universe is current authority. |
| Annual metrics | annual dashboard plus governed monthly lineage | Flows aggregate governed membership; stocks use closing-position semantics. |
| Publication | current publication contract | Generated bundles are outputs from a run, not hand-maintained truth. |
| Professional reporting | professional pack and governed drilldowns | Drilldowns must reconcile displayed values to explicit governed membership. |
| Viewer presentation | `accounting-viewer` | Viewer-specific UI behavior is outside this repository and outside `accounting-workflows`. |
| Public guidance | `accounting-docs` | Explanation only; calculations and accounting-rule authority remain upstream. |

## Retired or compatibility-only concepts

The following are not current accounting authorities:

- a generic `accounting.views` or `run-marts` stage between materialization and metrics;
- `metric_values.csv` as a parallel metric engine;
- `metric_registry.csv` plus legacy metric views as the primary current reporting universe;
- `accounting.human.document`, `accounting.human.tables`, or other `accounting.human.*` modules as the current report-calculation authority;
- Wave-4/legacy drilldown routing as an independent semantic authority.

Compatibility code or historical documentation may still mention some of these shapes. Such references must be visibly bounded as historical/compatibility and must not be used to reconstruct a retired parallel pipeline.

## Repository responsibilities

### `accounting-workflows`

Owns canonical accounting transformation and reporting workflow, accounting business-rule implementation, professional pack/drilldown artifacts, and publication generation.

### `accounting-viewer`

Owns viewer-specific read-only presentation over an approved packaged snapshot. Viewer behavior must be verified from that repository before being documented as current.

### `accounting-docs`

Owns public operating guidance, contract explanation, architecture documentation, and the documentation-site structure. It does not own ledger data, calculations, runtime success, or live publication freshness.

## Accounting invariants this architecture must not blur

- Household/personal expenditure is not property OPEX merely because money left a managed box.
- Funding is not operating revenue.
- Core contribution and broader typed support are distinct governed concepts.
- Debt position is stock; debt activity is flow.
- Validated cash does not silently fall back to inferred cash.
- Native currencies remain separate unless an explicit valuation layer is invoked.
- Annual flows retain governed monthly lineage; annual stock uses closing-position semantics.
- Unknown or ambiguous semantic rows fail closed/review-required rather than being forced into convenient categories.
- Professional drilldowns must reconcile to displayed cells without semantic leakage.
- Accounting classifications do not decide legal ownership, rights, enforceability, inheritance, or family governance.

## Known operational boundary

Upstream concurrency issue `accounting-workflows#44` remains unresolved at this baseline. Overlapping same-scope runs are therefore not a supported assumption.

## Evidence anchors

Architecture claims on this page were checked against current upstream:

- `accounting-workflows/AGENTS.md`
- `accounting-workflows/SYSTEM.yaml`
- `accounting-workflows/Makefile`
- governed-spine truth baseline in this repository

The upstream commit above is a source-verification baseline, not proof of a fresh live run or deployment.
