---
title: "Operator Start Here"
sidebar_label: "Start here"
sidebar_position: 10
description: "Entry point for safely validating, running, inspecting, and recovering the governed accounting backend."
doc_type: "guide"
---

# Operator Start Here

Status: current operator entrypoint  
Last reviewed: 2026-08-25  
Upstream truth checked: `accounting-workflows@b7d2c3a379f966f4d69b56c2df113714a7051452`

## Read order

1. [Environment bootstrap](/notes/environment_bootstrap)
2. [Accounting spine runbook](/notes/accounting_spine_runbook)
3. [Command surface](/notes/library/operations/command-surface)
4. [Run modes](/notes/library/operations/run-modes-smoke-vs-run)
5. [Stage output checklist](/notes/library/operations/stage-output-checklist)
6. [Incidents: first 15 minutes](/notes/library/operations/incidents-first-15-minutes)

## Safe first commands

From the `accounting-workflows` repository root:

```bash
make help
make doctor
make validate
make smoke-core
```

Use `make smoke-full` when the additional fixture-safe validation + publication dry-run is useful.

Do not begin diagnosis with live ingestion, publication, or cleanup.

## Current live choices

When live operation is explicitly authorized:

```bash
make run-canonical   # live ingest + governed materialization
make run-full        # full live path through publication + release-check
```

For a bounded existing-run operation, pin the exact `RUN_STAMP` and preserve the original `BOXES`/scope rather than silently selecting a new run.

## Safety rules

- `run-debt-views` has live upstream dependencies.
- `run-metrics`/`metrics-from-run` operate on the selected existing run and do not force live ingest.
- `publish-latest` is consequential even though it is packaging rather than source ingestion.
- `clean-derived` is destructive.
- overlapping same-scope runs are not a supported assumption while upstream issue #44 remains unresolved.
