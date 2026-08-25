---
title: "Stage Output Checklist"
sidebar_label: "Stage outputs"
sidebar_position: 14
description: "Checklist for verifying governed artifacts after each current accounting pipeline stage."
doc_type: "checklist"
---

# Stage Output Checklist

Status: current executable checklist  
Last reviewed: 2026-08-25  
Upstream truth checked: `accounting-workflows@b7d2c3a379f966f4d69b56c2df113714a7051452`

## Purpose

Check the artifacts the current Makefile itself asserts. This is an operator existence/QA checklist, not a replacement for reconciliation or semantic review.

Use the exact scoped run ID:

```text
<RUN_ID> = <RUN_STAMP>_<SCOPE_TAG>
```

## Ingest / canonical run root

After current live ingest, verify the selected run root exists and contains the canonical ledger evidence required by downstream stages:

```text
out/run/accounting/<RUN_ID>/ledger_canonical.csv
out/run/accounting/<RUN_ID>/ledger_canonical_all_status.csv
```

The all-status ledger is specifically required by the current debt path.

## Governed materialization

The Makefile asserts these in `out/run/accounting/<RUN_ID>/`:

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

These replace the old generic-views checkpoint as the current semantic/cash evidence boundary.

## Debt resolution / compatibility balances

Under `out/debt_resolution/<RUN_ID>/` the current path asserts:

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

The balance CSVs are an input/compatibility shape for the governed debt marts; they are not the final semantic authority by themselves.

## Governed debt + treasury run-root artifacts

The selected run root must then contain:

```text
monthly_debt_position.csv
monthly_debt_position_qa.csv
monthly_debt_activity.csv
monthly_debt_activity_qa.csv
monthly_cash_accountability.csv
monthly_cash_accountability_qa.csv
```

Remember: debt position is stock and debt activity is flow. Do not reconcile them as if they had the same grain.

## Governed metrics

Under `out/metrics/<RUN_ID>/` the Makefile asserts:

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

Legacy `metric_values.csv`, `metric_registry.csv`, and `metric_views/*` are not current required outputs.

## Annual dashboard gate

`make run-dashboard` explicitly re-checks:

```text
annual_balance_dashboard_metrics.csv
annual_balance_dashboard_contract.csv
annual_balance_dashboard_qa.csv
```

Do not treat an annual stock as the sum of monthly positions; the governing annual contract determines stock versus flow behavior.

## Publication / release

The current Makefile publishes a scope-specific public root and checks it with:

```bash
make release-check
```

against:

```text
public/accounting/latest_<SCOPE_TAG>
```

Do not guess publication completeness from directory existence alone. Use the current publication contract and release check.

## Checklist rule

At every affected layer verify both:

1. expected artifact/QA presence; and
2. the accounting/reporting invariant relevant to the change.

A successful command exit is not sufficient evidence if totals, scope, currencies, stock/flow grain, or drilldown membership are wrong.
