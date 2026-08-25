---
title: "Where to Find Latest Outputs"
sidebar_label: "Latest outputs"
sidebar_position: 32
description: "Explains current governed publication paths, professional-output boundaries, and how to verify freshness before consuming accounting artifacts."
doc_type: "reference"
---

# Where to Find Latest Outputs

Status: current path/freshness reference  
Last reviewed: 2026-08-25  
Accounting truth checked: `accounting-workflows@b7d2c3a379f966f4d69b56c2df113714a7051452`  
Viewer boundary checked: `accounting-viewer@9d2dfabe3227195f7910ae362bcaaedd6c509529`

## There is no single universal "latest report" path

The current backend publishes **scope-qualified governed bundles**. Professional packs/drilldowns and the private viewer are separate presentation surfaces with their own freshness evidence.

Do not use an old unqualified path merely because it exists.

## Governed public bundle

Current producer path:

```text
public/accounting/latest_<SCOPE_TAG>/
```

Start with:

```text
manifest.json
artifact_contracts.csv
publish_contract_qa.csv
```

The current manifest schema is:

```text
accounting_public_bundle.v1
```

The manifest records the source run and published file set. Verify its `source_run_id`, `as_of_date` where present, scope, status and file classes before using a number.

## Publication classes

### `public_contract/`

Explicit downstream contracts. Current examples include:

```text
metric_contract_frontier.csv
annual_balance_dashboard_contract.csv
```

Use these to understand which governed metric families/rows are intended for downstream consumption.

### `canonical_dashboard/`

Governed/report-safe fact artifacts selected by the publisher. Current examples include:

```text
annual_balance_dashboard_metrics.csv
annual_balance_dashboard_qa.csv
frontend_metric_series.csv
monthly_operating_statement.csv
monthly_flow_semantic_split.csv
monthly_cash_close.csv
monthly_debt_position.csv
monthly_debt_activity.csv
```

A row can still carry suitability/caveat status. The directory class does not erase row-level conditions such as validated-cash safety or review-required semantics.

### `internal_diagnostic/`

Internal evidence and QA, for example:

```text
build_manifest.json
metrics_frontier_qa.csv
frontier_source_qa.csv
source_contract_qa.csv
debt_status_reconciliation.csv
```

Useful for audit and support, not automatically a headline fact surface.

### `unsafe_for_frontend/`

Evidence deliberately excluded from dashboard fact status. Current raw debt examples include:

```text
debt_open_items.csv
debt_repayment_events.csv
```

These can be important audit evidence. Their classification means a consumer must not present them as the canonical debt-stock headline merely because they are available.

## Professional pack and drilldowns

The richer human-facing professional pack is not equivalent to the public bundle directory.

Current professional reporting includes governed overview/statement/cash/debt/annual tables plus linked drilldowns. A real professional pack is generated/maintained outside fixture CI, so verify the pack's exact run/scope and drilldown index before treating it as current.

For a displayed cell, the important freshness identity is not only the HTML/table file date. Preserve:

- run/scope;
- period/year;
- native `Currency`;
- table/cell identity;
- source artifact or annual membership contract;
- drilldown status/residual.

## Producer run roots — traceability, not normal consumer handoff

Exact-run evidence lives under producer directories such as:

```text
out/run/accounting/<RUN_ID>/
out/metrics/<RUN_ID>/
out/debt_resolution/<RUN_ID>/
```

Use these when tracing a governed published/professional number back to source evidence. Do not build a new consumer that bypasses the publication/professional contracts and depends on arbitrary internal files.

## Accounting viewer

The current `accounting-viewer` repository is a private read-only review surface. Its loader still uses:

```text
accounting_surface/data/
public/accounting/latest/
```

That packaging predates the current scope-qualified publisher contract. The viewer governance also declares professional-pack/drilldown consumption, so the repository currently contains a **consumer integration mismatch** between intended authority and loader packaging.

Consequences:

- do not treat `public/accounting/latest/` inside the viewer as the current backend publication contract;
- do not infer that a successful viewer route loaded the newest governed bundle;
- verify the checked-in viewer manifest/run/cutoff independently;
- correct bundle-generation or accounting problems upstream rather than hand-editing viewer data.

## Typical lookup tasks

| Need | Start here |
|---|---|
| What did the publisher release for this scope? | `public/accounting/latest_<SCOPE_TAG>/manifest.json` |
| Which metric contracts are intended downstream? | `public_contract/metric_contract_frontier.csv` and annual contract |
| Current governed monthly/annual fact rows? | `canonical_dashboard/` files named in the manifest |
| Why is a value questionable? | QA files in `internal_diagnostic/` plus exact-run source artifacts |
| Raw debt engine evidence? | `unsafe_for_frontend/` and exact debt-resolution run, never as headline stock |
| Human-readable governed table/drilldown? | verified professional pack / linked digest for the same run/scope |
| Browser review? | viewer only after its packaged manifest/run/cutoff are verified |

## Freshness rule

A file path called `latest` is a pointer, not proof.

Before relying on any latest surface, establish:

1. requested scope;
2. source run identity;
3. reporting cutoff/as-of date;
4. relevant QA/release status;
5. whether the consumer surface actually packages that run.

A successful deployment or HTTP response proves presentation availability only.
