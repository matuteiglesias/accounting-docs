---
title: "Backend Entrypoints"
sidebar_label: "Entrypoints"
sidebar_position: 5
description: "Catalog of current Make targets and module entrypoints used to operate the governed accounting backend."
doc_type: "reference"
---

# Accounting Backend Entrypoints

Status: current entrypoint reference  
Last reviewed: 2026-08-25  
Upstream truth checked: `accounting-workflows@b7d2c3a379f966f4d69b56c2df113714a7051452`

## Purpose

Identify which surfaces are current operator entrypoints and which are fixture checks, existing-run operations, compatibility aliases, internal module implementations, or destructive commands.

The Makefile is the command authority. Direct Python module CLIs are implementation surfaces and should normally be reached through a governed Make target.

## Status vocabulary

| Status | Meaning |
|---|---|
| fixture-safe | Intended to operate without live private ingestion. |
| live | Reads live configured inputs and/or performs a live orchestration. |
| existing-run | Operates on a selected run root without forcing live ingest. |
| publish | Changes or validates the public packaged surface. |
| compatibility | Retained alias; not a separate architecture or preferred new dependency. |
| sidecar | Bounded valuation/presentation operation outside the canonical core. |
| destructive | Deletes generated state; explicit authorization required. |

## Fixture-safe Make targets

| Target | Status | Purpose |
|---|---|---|
| `make help` | fixture-safe | Discover the current Makefile surface. |
| `make doctor` | fixture-safe | Python version + compile checks. |
| `make validate` | fixture-safe | Compile + contract + regression validation. |
| `make smoke-core` | fixture-safe | Fixture ingest and governed semantic/cash materialization. |
| `make smoke-full` | fixture-safe / partial | Fixture core + validation + publication dry-run. |

`smoke-full` is not a fixture equivalent of the full live debt/publication path.

## Current live / stage Make targets

| Target | Status | Purpose |
|---|---|---|
| `make run-ingest` | live stage | Live source -> canonical ledger. |
| `make run-materialize` | live stage | Live ingest dependency + governed materialization. |
| `make run-canonical` | live | Live ingest + governed materialization. |
| `make run-debt` | live stage | Live canonical dependency + debt resolution. |
| `make run-debt-views` | live | Debt resolution + position/activity + treasury, with live upstream dependency. |
| `make run-metrics-live` | live | Live debt upstream + governed metrics + latest-pointer update. |
| `make run-full` | live + publish | Full live orchestration through publication and release check. |

The command name `run-debt-views` is historical naming; its current output authority is debt position/activity plus treasury. It does not resurrect a generic views stage.

## Existing-run Make targets

| Target | Status | Purpose |
|---|---|---|
| `make metrics-from-run` | existing-run | Governed metrics from the selected `RUN_OUT`. |
| `make run-metrics` | existing-run | Current stage alias to `metrics-from-run`. |
| `make run-dashboard` | existing-run | Build/check metrics and assert annual dashboard outputs. |
| `make run-downstream-from-ledger` | existing-run / consequential | Rebuild materialization, debt, metrics, and latest pointers from an exact ledger run. |

Pin `RUN_STAMP` and preserve the original `BOXES`/scope for existing-run operations.

## Publication targets

| Target | Status | Purpose |
|---|---|---|
| `make publish-latest` | publish | Package selected latest artifacts into the scoped public bundle. |
| `DRY_RUN=1 make publish-latest` | fixture-safe packaging check | Exercise publication logic without writing the live public bundle. |
| `make release-check` | publish validation | Check release readiness of `public/accounting/latest_<SCOPE_TAG>`. |

Packaging success and release readiness are separate claims.

## Compatibility aliases

The current Makefile deliberately keeps aliases such as:

```text
ledger
materialize
debt
debt-views
metrics
publish
build-all
run-accounting
run-accounting-full
run-debt-balance
run
run-all
```

These map to current explicit targets. They are compatibility surfaces, not the preferred vocabulary for new operating docs.

## Sidecar Make targets

The Makefile also exposes bounded USD-CCL valuation/management flows and professional drilldown/digest targets. Use the Make targets rather than directly reconstructing their Python arguments unless debugging the implementation.

## Current module implementations

Important module CLIs invoked by the Makefile include:

| Module | Role |
|---|---|
| `python -m accounting.ledger.ingest` | canonical ledger ingest |
| `python -m accounting.stage_d.materialize` | governed materialization |
| `python -m accounting.debt.resolve` | debt resolution |
| `python -m accounting.debt.balance_views` | debt balance compatibility shapes consumed by governed debt marts |
| `python -m accounting.marts.debt` | governed debt position/activity materialization |
| `python -m accounting.marts.treasury` | governed treasury/accountability materialization |
| `python -m accounting.metrics.build` | governed metric frontier + annual artifacts |
| `python -m accounting.publish.latest` | publication packaging |
| `python -m accounting.professional.drilldown` | professional drilldown generation |
| `python -m accounting.professional.render_linked_digest` | linked presentation digest |

Direct module invocation can bypass Makefile prerequisites and scope/run wiring. Prefer Make targets for normal operation.

## Retired operational surfaces

Do not use old documentation to reintroduce:

- `accounting.views` / `run-views` as a current pipeline layer;
- legacy `metric_values`/registry/views as the primary metric engine;
- `accounting.human.*` / `run-human-report` as current accounting authority.

If a historical page or compatibility module still mentions one of these, classify the reference before relying on it.

## Destructive entrypoint

`make clean-derived` removes generated run, metrics, debt, smoke, and public latest paths. It is never part of routine validation or first-response diagnosis.
