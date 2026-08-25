---
title: "Accounting Spine Runbook"
sidebar_label: "Spine runbook"
sidebar_position: 8
description: "Operational runbook for the accounting spine from ingest through governed publication."
doc_type: "runbook"
---

# Accounting Spine Runbook

Status: current operator authority  
Last reviewed: 2026-08-25  
Upstream truth checked: `accounting-workflows@b7d2c3a379f966f4d69b56c2df113714a7051452`

## Supported spine

The current executable dependency graph is:

```text
run-ingest
  -> run-materialize
  -> run-debt-views
  -> run-metrics
  -> run-dashboard
  -> publish-latest
```

Conceptually this is:

```text
ledger ingest
  -> governed materialization / semantic + cash facts
  -> debt position/activity + treasury
  -> governed frontier + annual dashboard
  -> publication
```

There is no generic `run-views` stage, parallel `metric_values` engine, or `accounting.human.*` calculation stage in the current supported spine.

## Start with non-live validation

Before a consequential run, use fixture-safe checks:

```bash
make help
make doctor
make validate
make smoke-core
make smoke-full
```

`smoke-core` exercises fixture ingest plus governed semantic/cash materialization. `smoke-full` adds validation and a publication dry-run. Neither command establishes that live inputs, debt, publication pointers, or professional reports are current.

## Live execution classes

### Canonical live core

```bash
make run-canonical
```

This performs live ingest and governed materialization only. It requires the live sheet environment. It stops before debt, metrics, publication, and professional presentation.

### Full live run and publication

```bash
make run-full
```

This is the current full live orchestration. It runs the canonical core, debt resolution/position/activity and treasury, governed metrics and annual dashboard, latest-pointer updates, publication, and `release-check`.

Do not use `run-full` as a diagnostic substitute for fixture validation. It is live and consequential.

### Debt stage

```bash
make run-debt-views
```

This target depends on live upstream targets (`run-debt` -> `run-canonical`). Invoking it without an already coordinated Make invocation is therefore a **live operation**, not a harmless existing-run rebuild.

### Metrics on an existing run

```bash
make metrics-from-run RUN_STAMP=<existing-stamp> BOXES='<same scope>'
```

`run-metrics` resolves to the same existing-run metrics action. It does not force live ingest, but it requires the governed semantic/operating/cash artifacts at the exact run root selected by `RUN_STAMP` and scope.

To assert the annual dashboard artifacts for that same run:

```bash
make run-dashboard RUN_STAMP=<existing-stamp> BOXES='<same scope>'
```

Do not change `BOXES` between the source run and the downstream rebuild; scope changes select a different run identity.

### Live metrics orchestration

```bash
make run-metrics-live
```

This explicitly runs live debt upstream, builds metrics, and updates latest pointers. It is consequential even though it does not perform final publication.

## Publication and readiness

`publish-latest` packages the currently selected latest artifacts; it does not ingest source data.

```bash
make publish-latest
```

Publication is still consequential because it rewrites the scoped public bundle. For packaging-only validation use the implemented dry-run mode:

```bash
DRY_RUN=1 make publish-latest
```

Release readiness is a separate check:

```bash
make release-check
```

The current Makefile checks the scope-specific public root:

```text
public/accounting/latest_<SCOPE_TAG>
```

A successful packaging command is not a substitute for `release-check`.

## Stage evidence

### Governed materialization

The Makefile asserts these current artifacts in the run root:

```text
classification_audit.csv
classification_audit_summary.csv
monthly_flow_semantic_split.csv
monthly_operating_statement.csv
monthly_operating_statement_qa.csv
semantic_leakage_qa.csv
monthly_cash_close.csv
monthly_cash_close_qa.csv
```

### Debt and treasury

Debt resolution writes under `out/debt_resolution/<RUN_ID>/` and the Makefile asserts:

```text
debt_open_items.csv
debt_allocations.csv
debt_repayment_events.csv
debt_resolution_timeline.csv
debt_balance_daily.csv
debt_balance_monthly.csv
debt_balance_quarterly.csv
debt_balance_yearly.csv
```

The governed run root must then contain:

```text
monthly_debt_position.csv
monthly_debt_position_qa.csv
monthly_debt_activity.csv
monthly_debt_activity_qa.csv
monthly_cash_accountability.csv
monthly_cash_accountability_qa.csv
```

### Governed metrics and annual dashboard

The Makefile asserts these under `out/metrics/<RUN_ID>/`:

```text
build_manifest.json
metric_contract_frontier.csv
frontend_metric_series.csv
metrics_frontier_qa.csv
frontier_source_qa.csv
annual_balance_dashboard_metrics.csv
annual_balance_dashboard_contract.csv
annual_balance_dashboard_qa.csv
annual_flow_membership.csv
artifact_contracts.csv
source_contract_qa.csv
```

`run-dashboard` specifically re-checks the three annual dashboard artifacts.

## Existing-run recovery

If a canonical ledger already exists and a downstream rebuild is deliberately required, the Makefile also exposes `run-downstream-from-ledger`. That target rebuilds materialization, debt, metrics, and latest pointers from the selected run. Because it updates latest pointers, treat it as consequential and pin the exact run/scope.

Do not use a broad downstream rebuild when a narrower failing stage is known.

## Destructive cleanup

```bash
make clean-derived
```

This removes generated smoke, run, metrics, debt-resolution, and public-latest paths. It is not a recovery prerequisite and must not be run without explicit cleanup authorization and path review.

## Professional presentation

Professional drilldowns and linked digests are presentation operations over governed artifacts, not a second accounting engine:

```bash
make professional-drilldowns
make professional-linked-digest
```

Their detailed semantic/consumer contract belongs to the later professional-reporting refresh wave.

## Operational evidence record

For a consequential run, record at minimum:

- exact command;
- `RUN_STAMP` / resulting run ID;
- `BOXES` / scope;
- outputs inspected;
- validation/release-check result;
- whether live inputs were accessed;
- whether publication occurred.

Never infer a current live run or publication from the existence of old output directories.
