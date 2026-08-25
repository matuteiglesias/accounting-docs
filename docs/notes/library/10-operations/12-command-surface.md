---
title: "Command Surface"
sidebar_label: "Commands"
sidebar_position: 12
description: "Operational command catalog for fixture checks, live runs, existing-run work, publication, and cleanup."
doc_type: "reference"
---

# Command Surface

Status: current operations reference  
Last reviewed: 2026-08-25  
Upstream truth checked: `accounting-workflows@b7d2c3a379f966f4d69b56c2df113714a7051452`

The current Makefile is the authority. See [Canonical Commands](/notes/canonical_commands) for the fuller catalog.

## Fixture-safe

```bash
make help
make doctor
make validate
make smoke-core
make smoke-full
```

`smoke-full` remains partial by design: governed fixture core + regression validation + publication dry-run.

## Live

```bash
make run-canonical
make run-debt-views
make run-metrics-live
make run-full
```

`run-canonical` is the bounded live core. `run-full` is the full live + publication + release-readiness path.

## Existing run

```bash
make metrics-from-run RUN_STAMP=<existing-stamp> BOXES='<same scope>'
make run-metrics RUN_STAMP=<existing-stamp> BOXES='<same scope>'
make run-dashboard RUN_STAMP=<existing-stamp> BOXES='<same scope>'
```

These require the selected run's governed artifacts and must not silently switch scope.

## Publication

```bash
DRY_RUN=1 make publish-latest
make publish-latest
make release-check
```

Dry-run packaging, real publication, and release readiness are three distinct claims.

## Compatibility aliases

Short aliases such as `ledger`, `materialize`, `debt`, `debt-views`, `metrics`, `publish`, and `build-all` remain available, but they are compatibility names. New docs and automation should prefer explicit current targets.

## Destructive

```bash
make clean-derived
```

Never include cleanup in a routine diagnostic sequence.

## Retired current-path names

Do not use `run-views`, `run-human-report`, or a legacy `metric_values` engine as current pipeline stages.
