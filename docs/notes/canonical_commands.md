---
title: "Canonical Commands"
sidebar_label: "Commands"
sidebar_position: 6
description: "Current command surface for validating, running, publishing, and recovering accounting workflows."
doc_type: "reference"
---

# Accounting Canonical Commands

Status: current command reference  
Last reviewed: 2026-08-25  
Upstream truth checked: `accounting-workflows@b7d2c3a379f966f4d69b56c2df113714a7051452`

## Command authority

The current `accounting-workflows/Makefile` is the operator command authority. Start with:

```bash
make help
```

The explicit `run-*` targets are the current governed execution surface. Short names such as `ledger`, `metrics`, `publish`, and `build-all` remain compatibility aliases; new operating guidance should not prefer them over the explicit targets.

## Fixture-safe validation

```bash
make doctor
make validate
make smoke-core
make smoke-full
```

| Command | Current behavior |
|---|---|
| `make doctor` | Print Python version and compile-check command modules/scripts/tests. |
| `make validate` | `doctor` + contract checks + pytest regression suite. |
| `make smoke-core` | Fixture ingest -> governed semantic/cash materialization checks. |
| `make smoke-full` | `smoke-core` + `validate` + publication dry-run. Partial by design. |

These commands do not establish live source freshness or a live publication.

## Live orchestration

```bash
make run-canonical
make run-debt-views
make run-metrics-live
make run-full
```

| Command | Safety / scope |
|---|---|
| `run-canonical` | Live ingest + governed materialization; stops before debt/metrics/publish. |
| `run-debt-views` | Live canonical upstream + debt resolution/position/activity + treasury. |
| `run-metrics-live` | Live debt upstream + governed metrics + latest-pointer update. |
| `run-full` | Full live path through publication and `release-check`. |

All live commands require explicit authorization and the correct private environment.

## Existing-run operations

```bash
make metrics-from-run RUN_STAMP=<existing-stamp> BOXES='<same scope>'
make run-metrics RUN_STAMP=<existing-stamp> BOXES='<same scope>'
make run-dashboard RUN_STAMP=<existing-stamp> BOXES='<same scope>'
```

`run-metrics` is the current stage target for the existing `RUN_OUT`; it resolves to `metrics-from-run`. These commands do not force live ingest, but they fail closed when required governed run artifacts are missing.

`run-downstream-from-ledger` is an advanced existing-run rebuild. It also updates latest pointers, so it is consequential and should be used only with an exact run/scope.

## Publication

```bash
make publish-latest
make release-check
```

`publish-latest` packages the currently selected latest artifacts into the scoped public bundle. It is packaging, not source ingestion, but it changes public output unless run in dry-run mode:

```bash
DRY_RUN=1 make publish-latest
```

`release-check` is the separate current release-readiness check.

## Sidecar / professional commands

Current Makefile commands include:

```bash
make smoke-usd-ccl-valuation
make smoke-usd-ccl-management-flows
make run-usd-ccl-valuation RUN_ROOT=<exact-run> CCL_RATES=<local.csv>
make run-usd-ccl-management-flows RUN_ROOT=<exact-run> CCL_RATES=<local.csv>
make professional-drilldowns
make professional-linked-digest
```

The smoke USD-CCL targets are isolated fixture checks. The `run-*` USD-CCL targets operate on an explicitly selected run and local rates. Professional commands are presentation operations over governed artifacts; their detailed semantics belong to the professional-reporting documentation wave.

## Compatibility aliases

The Makefile retains compatibility names including:

```text
ledger -> run-ingest
materialize -> run-materialize
debt -> run-debt
debt-views -> run-debt-views
metrics -> run-metrics
publish -> publish-latest
build-all -> run-full
run-accounting -> run-full
run-accounting-full -> run-full
run-debt-balance -> run-debt-views
run / run-all -> run-accounting
```

These aliases are not evidence of a separate architecture. Prefer the explicit current targets in new runbooks and automation.

## Destructive command

```bash
make clean-derived
```

This deletes generated accounting outputs and public latest paths. Never use it as a generic first-response command.

## Retired command concepts

Do not document or restore these as current execution stages:

- `run-views` / generic `accounting.views` stage;
- `metric_values` / registry engine as a parallel reporting path;
- `run-human-report` or `accounting.human.*` as current accounting authority.

Historical notes may still contain those names until later cleanup waves classify them.
