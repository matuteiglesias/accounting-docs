---
title: "Artifact Ladder"
sidebar_label: "Artifact ladder"
sidebar_position: 12
description: "Explains the current governed artifact chain, diagnostic evidence, and downstream authority boundaries."
doc_type: "reference"
---

# Accounting Artifact Ladder

Status: current contract reference  
Last reviewed: 2026-08-25  
Upstream truth checked: `accounting-workflows@b7d2c3a379f966f4d69b56c2df113714a7051452`

## Purpose

Read the backend as a chain of governed facts and explicit projections, not as a flat folder of CSVs.

```text
approved inputs
  -> canonical ledger
  -> governed semantic + cash facts
  -> debt position/activity + treasury
  -> governed metric frontier + annual dashboard
  -> scope-qualified public bundle
  -> professional presentation + drilldowns
```

Diagnostic material may exist beside these layers. Diagnostic existence does not make an artifact accounting authority.

## Level 0 — approved inputs

The configured live sheet and fixture CSVs are evidence inputs to `accounting.ledger.ingest`, not stable downstream contracts.

## Level 1 — canonical transaction evidence

Primary artifacts:

```text
ledger_canonical.csv
ledger_canonical_all_status.csv
```

`ledger_canonical.csv` is canonical transaction evidence. `ledger_canonical_all_status.csv` is scoped all-status evidence used by debt resolution; it is not a separate recognition rule.

## Level 2 — governed monthly semantic and cash facts

Primary semantic artifacts:

```text
monthly_flow_semantic_split.csv
monthly_operating_statement.csv
monthly_operating_statement_qa.csv
semantic_leakage_qa.csv
classification_audit.csv
classification_audit_summary.csv
semantic_rule_registry.csv          # where emitted
semantic_dashboard_coverage.csv     # where emitted
```

Primary governed cash artifacts:

```text
monthly_cash_close.csv
monthly_cash_close_qa.csv
```

Old `per_flow_time_long*`, `per_party_time_long*`, `daily_cash_position.csv`, box-balance motors, and similar Stage-D tables remain useful diagnostic/internal evidence where present. They are not substitutes for semantic truth or validated cash.

## Level 3 — debt and treasury authorities

Debt engine evidence under `out/debt_resolution/<RUN_ID>/` includes:

```text
debt_open_items.csv
debt_allocations.csv
debt_repayment_events.csv
debt_resolution_timeline.csv
debt_status_reconciliation.csv
debt_balance_daily.csv
debt_balance_monthly.csv
debt_balance_quarterly.csv
debt_balance_yearly.csv
```

Canonical downstream debt facts in the run root are:

```text
monthly_debt_position.csv
monthly_debt_position_qa.csv
monthly_debt_activity.csv
monthly_debt_activity_qa.csv
```

Treasury/accountability artifacts include `monthly_cash_accountability.csv` plus QA and, where emitted, governed Box treasury-flow artifacts.

`monthly_debt_position` is stock authority; `monthly_debt_activity` is movement authority. Raw debt-engine rows are audit evidence and are not automatically frontend-safe facts.

## Level 4 — governed metrics and annual lineage

Current outputs under `out/metrics/<RUN_ID>/`:

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

Producer: `accounting.metrics.build`, delegating to `accounting.metrics.frontier` and `accounting.metrics.annual`.

The build explicitly removes the retired generic metric universe on start. `metric_registry.csv`, `metric_values.csv`, generic Q/Y statements, `metric_views/`, and `metric_drilldown/` are not current governed products.

`artifact_contracts.csv` classifies known artifacts by role, accounting nature, grain, currency policy, frontend suitability, and source authority. `source_contract_qa.csv` verifies the governed handoff and checks that legacy metric outputs have not survived the build.

## Level 5 — scope-qualified public bundle

Producer: `accounting.publish.latest`.

Current path:

```text
public/accounting/latest_<SCOPE_TAG>/
```

Current top-level contract artifacts:

```text
manifest.json              # schema accounting_public_bundle.v1
artifact_contracts.csv
publish_contract_qa.csv
```

The bundle classifies files into `public_contract/`, `canonical_dashboard/`, `internal_diagnostic/`, and `unsafe_for_frontend/`. Publication packages existing governed facts; it does not recalculate accounting semantics.

## Level 6 — professional presentation and drilldowns

`accounting.professional.drilldown` and `accounting.professional.render_linked_digest` operate over governed artifacts and an existing professional pack. They may format, select, link, and explain; they may not silently change accounting membership.

## Artifact-role vocabulary

The upstream artifact registry distinguishes roles including `canonical_source`, `canonical_rule_contract`, `diagnostic`, `internal_balance`, `inferred_reconciliation`, `presentation_only`, `legacy`, `unsafe_for_frontend`, `qa`, `meta`, and `derived_valuation`.

The role matters more than physical proximity. A CSV beside canonical facts can still be diagnostic-only or forbidden for frontend use.

## Compatibility rule

Historical files and old documentation routes can remain as migration evidence. Their existence does not recreate a current backend contract.

## Evidence anchors

- upstream `notes/accounting_spine_runbook.md`
- upstream `notes/output_contracts.md`
- `accounting/artifacts/manifest.py`
- `accounting/metrics/build.py`
- `accounting/publish/latest.py`
- current Makefile assertions
