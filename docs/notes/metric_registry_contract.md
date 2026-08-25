---
title: "Metric Registry Contract"
sidebar_label: "Metric contract"
sidebar_position: 20
description: "Route-preserving contract for the current governed metric frontier, frontend series, annual dashboard, and lineage authority."
doc_type: "contract"
---

# Governed Metric Contract

Status: current contract; route name preserved from retired registry architecture  
Last reviewed: 2026-08-25  
Upstream truth checked: `accounting-workflows@b7d2c3a379f966f4d69b56c2df113714a7051452`

## Route compatibility note

This page remains at `/notes/metric_registry_contract` to preserve links. The old `metric_registry.csv` architecture is retired. The current contract is the governed metric frontier plus its series, QA, annual dashboard, and lineage outputs.

## Current producer chain

```text
governed monthly semantic/cash/debt facts
  -> accounting.metrics.frontier
       -> metric_contract_frontier.csv
       -> frontend_metric_series.csv
       -> metrics_frontier_qa.csv
       -> frontier_source_qa.csv
  -> accounting.metrics.annual
       -> annual_balance_dashboard_metrics.csv
       -> annual_balance_dashboard_contract.csv
       -> annual_balance_dashboard_qa.csv
       -> annual_flow_membership.csv
```

`accounting.metrics.build` orchestrates these outputs and writes the build/source artifact contracts.

## Frontier contract schema

`metric_contract_frontier.csv` carries fields including:

```text
metric_id
label
semantic_category
flow_or_stock
period_grain
currency_mode
source_table
calculation_rule
lineage_inputs
frontend_suitability
public_flag
internal_flag
legacy_flag
caveat
validation_status
owner
status
notes
```

A metric contract therefore says not only what a metric is called, but where it comes from, whether it is flow/stock/quality/mixed, its currency/grain, suitability, caveats, and validation state.

## Series schema

`frontend_metric_series.csv` carries fields including:

```text
metric_id
period_grain
period
period_end
Currency
value
dimension_name
dimension_value
source_table
run_id
as_of_date
frontend_suitability
public_flag
internal_flag
legacy_flag
caveat
validation_status
```

Money rows retain explicit native `Currency`. Dimensioned series carry explicit dimension name/value rather than encoding hidden grouping logic in labels.

## Canonical monthly sources

The current frontier is intentionally restricted to:

```text
monthly_operating_statement.csv
monthly_flow_semantic_split.csv
monthly_cash_close.csv
monthly_debt_position.csv
monthly_debt_activity.csv
```

It does not load a generic marts/views layer, `metric_registry.csv`, or `metric_values.csv`.

## Availability and fail-closed behavior

When a required canonical source is missing, the frontier can mark affected contracts unavailable rather than fabricating a value. Cash selection also respects the governed validated-cash eligibility contract; inferred/internal balance artifacts are not a fallback.

## Current metric families

The current frontier includes governed families for operating revenue/rent, true property OPEX, net operating result, funding, personal draws/distributions, coverage, validated cash, debt stock, classification quality, and treasury FX. Exact active IDs and calculation rules are executable authority in `accounting.metrics.frontier` and its tests.

Do not add IDs or semantics to this page merely because they sound economically useful.

## Annual contract

The annual dashboard is not a second metric universe. It projects governed monthly facts under annual aggregation rules:

- flows aggregate governed monthly membership;
- closing stocks use the latest governed valid position;
- ratios derive from governed annual inputs unless an explicit contract says otherwise;
- native currency remains separate.

`annual_flow_membership.csv` supplies explicit lineage for additive annual flow cells and is important drilldown evidence.

## Derived-metric authority

Derived metric behavior is additionally governed by typed contracts under `accounting/contracts/derived_metrics.py`. A derived value must use approved inputs/formulas and fail visibly when required inputs are unavailable.

## QA and source contracts

Current QA/artifact files include:

```text
metrics_frontier_qa.csv
frontier_source_qa.csv
annual_balance_dashboard_qa.csv
artifact_contracts.csv
source_contract_qa.csv
build_manifest.json
```

The build checks that governed sources are used and that retired generic metric outputs are absent.

## Retired metric universe

`accounting.metrics.build` actively removes these compatibility artifacts when rebuilding governed metrics:

```text
metric_registry.csv
metric_values.csv
metric_values.parquet
metric_values_q_wide.csv
metric_values_y_wide.csv
generic Q/Y statements
validation_report.csv
metric_views/
metric_drilldown/
```

Their historical existence does not make them current contracts.

## Adding or changing a metric

A safe change must identify the governing source artifact and semantic rule, preserve native currency/grain, add/update regression evidence, measure before/after effects, reconcile affected annual/public/professional outputs, and avoid duplicating the metric in presentation code.

## Related docs

- `/notes/output_contracts`
- `/notes/contracts`
- `/notes/ledger_taxonomy`
- `/notes/debt_resolver_contract`
