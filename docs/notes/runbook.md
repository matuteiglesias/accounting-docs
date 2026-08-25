---
title: "Runbook"
sidebar_label: "Runbook"
sidebar_position: 9
description: "Historical runbook route retained for compatibility, with pointers to the current governed operator runbooks."
doc_type: "runbook"
---

# Runbook — Historical Route

Status: **HISTORICAL / superseded for current operation**  
Original reference date: 2026-01-09  
Reclassified: 2026-08-25

## Why this route remains

This URL previously carried the January 2026 “Output Contracts v1” runbook. Existing links may still point here, so the route is preserved rather than deleted during the governed-spine migration.

The old runbook described a Stage A / Stage D / Stage E / Stage V architecture with generic reports, `accounting.views`, `views_sanity.json`, and storypack-style outputs. Those descriptions are historical evidence of an earlier architecture and **must not be followed as current operating instructions**.

## Current operator authorities

Use these pages instead:

- [Environment bootstrap](/notes/environment_bootstrap)
- [Accounting spine runbook](/notes/accounting_spine_runbook)
- [Canonical commands](/notes/canonical_commands)
- [Backend entrypoints](/notes/entrypoints)
- [Operator start](/notes/library/operations/operator-start-here)
- [Stage output checklist](/notes/library/operations/stage-output-checklist)
- [Incidents: first 15 minutes](/notes/library/operations/incidents-first-15-minutes)

The current executable backend is governed by `matuteiglesias/accounting-workflows` and uses:

```text
ledger ingest
  -> governed materialization / semantic + cash facts
  -> debt position/activity + treasury
  -> governed frontier + annual dashboard
  -> publication
```

Generic views, the parallel `metric_values` engine, and `accounting.human.*` report authority are retired from the supported spine.

## Historical value retained

The January runbook remains relevant only as provenance for earlier design assumptions such as:

- CSV-first materialization;
- explicit currency and scope propagation;
- per-run artifact traceability;
- the evolution from generic view/report layers toward governed semantic, debt, metric, and publication authorities.

Those concepts do not override current executable contracts. Any old field list, filename, module path, validation rule, or stage name must be re-verified before reuse.

## Current truth baseline

See [Governed Spine Truth Baseline](/notes/library/governance/governed-spine-truth-baseline) and the current upstream `AGENTS.md`, `SYSTEM.yaml`, and Makefile.
