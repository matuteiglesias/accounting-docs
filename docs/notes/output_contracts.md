---
title: "Output Contracts"
sidebar_label: "Output contracts"
sidebar_position: 10
description: "Defines the current governed accounting artifact families, producers, consumers, and publication classifications."
doc_type: "contract"
---

# Accounting Backend Output Contracts

Status: current contract authority  
Last reviewed: 2026-08-25  
Upstream truth checked: `accounting-workflows@b7d2c3a379f966f4d69b56c2df113714a7051452`

## Purpose

Downstream consumers should depend on governed accounting artifacts rather than arbitrary intermediates, legacy report files, or a second metric-classification engine.

## Contract summary

| Contract | Authority | Typical path | Consumer role |
|---|---|---|---|
| canonical ledger | `accounting.ledger.ingest` | `out/run/accounting/<run_id>/ledger_canonical.csv` | transaction evidence |
| semantic monthly facts | governed semantic materialization | run-root semantic/statement CSVs | operating/funding/distribution/FX truth |
| governed cash close | cash authority via materialization | `monthly_cash_close.csv` | validated cash only |
| debt position/activity | debt authorities + `accounting.marts.debt` | `monthly_debt_position.csv`, `monthly_debt_activity.csv` | debt stock and movement truth |
| metric frontier | `accounting.metrics.frontier` | `out/metrics/<run_id>/metric_contract_frontier.csv`, `frontend_metric_series.csv` | monthly metric contract |
| annual dashboard | `accounting.metrics.annual` | annual dashboard CSVs | annual governed facts |
| annual flow membership | annual membership contract | `annual_flow_membership.csv` | lineage/drilldown evidence |
| artifact contracts | `accounting.artifacts.manifest` | `artifact_contracts.csv`, source/publish QA | role/safety metadata |
| public bundle | `accounting.publish.latest` | `public/accounting/latest_<scope>/` | packaged downstream handoff |
| professional drilldowns | `accounting.professional.drilldown` | professional/drilldown roots | human traceability |

The retired `metric_values.csv`, `metric_registry.csv`, generic Q/Y statements, generic metric views and generic marts/views outputs are not current contracts.

## Canonical ledger

Producer: `accounting.ledger.ingest`.

Required accounting evidence includes stable transaction identity, date, amount, native `Currency`, parties, status, `Box`, source provenance, and classification inputs. Exact schema authority remains executable upstream.

Validation expectations: parseable dates/amounts, explicit native currency, retained provenance, requested Box scope, and visible anomalies.

## Semantic monthly facts

Primary artifacts:

```text
monthly_flow_semantic_split.csv
monthly_operating_statement.csv
monthly_operating_statement_qa.csv
semantic_leakage_qa.csv
classification_audit.csv
classification_audit_summary.csv
```

These own the current operating/funding/distribution/treasury semantic split. Stage-D `per_*`, box-balance, and daily-position tables are diagnostic/internal evidence and must not reclassify flows in reports.

## Governed cash close

```text
monthly_cash_close.csv
monthly_cash_close_qa.csv
```

Validated cash does not silently fall back to party balances or inferred box-control balances. Annual cash is a closing stock, not a sum of monthly positions.

## Debt contracts

Resolution evidence under `out/debt_resolution/<run_id>/` includes:

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

Canonical downstream facts in the run root are:

```text
monthly_debt_position.csv
monthly_debt_position_qa.csv
monthly_debt_activity.csv
monthly_debt_activity_qa.csv
```

Position is stock authority; activity is additive movement authority. Raw open-item/repayment evidence is internal/diagnostic rather than a dashboard fact.

## Metric frontier

Primary outputs:

```text
metric_contract_frontier.csv
frontend_metric_series.csv
metrics_frontier_qa.csv
frontier_source_qa.csv
```

The frontier consumes only governed monthly semantic/cash/debt sources. Contract rows carry metric identity, semantic category, flow/stock nature, grain, currency mode, source table, calculation/lineage metadata, frontend suitability, publication/internal/legacy flags, caveats, validation status, owner, status, and notes.

Series rows carry metric ID, period/grain, native `Currency`, value, optional dimension, source table, run/as-of identity, suitability/visibility flags, caveat, and validation status.

## Annual dashboard and lineage

```text
annual_balance_dashboard_metrics.csv
annual_balance_dashboard_contract.csv
annual_balance_dashboard_qa.csv
annual_flow_membership.csv
```

Flows aggregate governed monthly facts by year and native currency. Stocks select governed closing positions. Ratios are computed from governed annual inputs rather than casually averaging monthly ratios.

`annual_flow_membership.csv` records membership/lineage for additive annual flow families and supports drilldown reconciliation.

## Artifact/source contract files

`artifact_contracts.csv` records artifact role, accounting nature, grain, currency policy, frontend suitability, source authority, and notes. `source_contract_qa.csv` checks the governed metrics handoff, including that retired metric outputs remain absent.

## Publication contract

Producer: `accounting.publish.latest`.

Current scope-qualified root:

```text
public/accounting/latest_<SCOPE_TAG>/
```

Required top-level files:

```text
manifest.json
artifact_contracts.csv
publish_contract_qa.csv
```

Current bundle classes:

- `public_contract` — explicit frontend contracts;
- `canonical_dashboard` — governed/report-safe facts;
- `internal_diagnostic` — internal evidence and QA;
- `unsafe_for_frontend` — evidence that must not be displayed as dashboard fact.

The manifest schema is `accounting_public_bundle.v1`. Publication validates that selected metrics/debt sources point to one run and that retired generic metric outputs are absent.

## Professional presentation / drilldowns

Professional tables and linked drilldowns are downstream projections of governed facts. They may format/select/explain; they may not decide accounting membership. Displayed values must remain reconcilable to governed source membership with explicit scope and currency grain.

## Compatibility rule

Historical artifacts may remain as migration evidence. They do not create a current runtime contract and should not be reconstructed unless a demonstrated consumer requires a bounded projection.

## Evidence anchors

- upstream `notes/output_contracts.md`
- `accounting/artifacts/manifest.py`
- `accounting/metrics/frontier.py`
- `accounting/metrics/annual.py`
- `accounting/metrics/build.py`
- `accounting/publish/latest.py`
- current Makefile
