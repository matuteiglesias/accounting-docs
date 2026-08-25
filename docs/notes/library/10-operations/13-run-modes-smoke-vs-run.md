---
title: "Run Modes: Smoke vs Run"
sidebar_label: "Smoke vs run"
sidebar_position: 13
description: "Explains fixture-safe validation, live runs, existing-run rebuilds, publication, and cleanup safety classes."
doc_type: "guide"
---

# Run Modes: Smoke vs Run

Status: current operations guidance  
Last reviewed: 2026-08-25  
Upstream truth checked: `accounting-workflows@b7d2c3a379f966f4d69b56c2df113714a7051452`

## Fixture-safe validation

Use fixture-safe commands to establish code/contract confidence without live sheet access:

```bash
make validate
make smoke-core
make smoke-full
```

- `validate`: compile + contracts + regression suite.
- `smoke-core`: fixture ingest + governed semantic/cash materialization.
- `smoke-full`: smoke core + validation + publication dry-run.

A fixture pass does not prove live source freshness.

## Live canonical core

```bash
make run-canonical
```

This performs live ingest plus governed materialization and writes a timestamped scoped run. It does not perform debt, metrics, publication, or professional presentation.

## Full live run

```bash
make run-full
```

This is the consequential end-to-end live operation through debt, governed metrics/annual dashboard, publication, and `release-check`.

Do not use `run-full` merely to find out whether a local environment works.

## Existing-run mode

Existing-run commands reuse an already materialized run and should be pinned explicitly:

```bash
make metrics-from-run RUN_STAMP=<existing-stamp> BOXES='<same scope>'
make run-dashboard RUN_STAMP=<existing-stamp> BOXES='<same scope>'
```

The run root identity includes both `RUN_STAMP` and scope. A different `BOXES` value can select a different run root.

## Publication-only mode

```bash
DRY_RUN=1 make publish-latest
make publish-latest
make release-check
```

Publication does not read the live sheet, but a real `publish-latest` changes the packaged public surface. `release-check` is the separate readiness gate.

## Cleanup mode

```bash
make clean-derived
```

Cleanup is destructive, not a validation mode. It requires explicit authorization and inspection of the target paths.

## Concurrency

Do not overlap same-scope live runs while upstream issue #44 remains unresolved. Separate runs by scope/time rather than assuming concurrent writes are safe.
