---
title: "Human Report Catalog"
sidebar_label: "Human reports"
sidebar_position: 21
description: "Catalog of current governed human-facing accounting surfaces, their source authority, drilldown path, and interpretation boundaries."
doc_type: "reference"
---

# Human Report Catalog

Status: current consumer/professional reporting guide  
Last reviewed: 2026-08-25  
Accounting truth checked: `accounting-workflows@b7d2c3a379f966f4d69b56c2df113714a7051452`  
Viewer boundary checked: `accounting-viewer@9d2dfabe3227195f7910ae362bcaaedd6c509529`

## Purpose

Human-facing reporting is a **projection of governed accounting facts**, not a second accounting engine.

`accounting-workflows` owns the accounting calculations, professional tables, lineage, drilldowns, and publication packaging. `accounting-viewer` is a private read-only review application. This documentation explains how to read those surfaces; it does not establish live freshness or legal meaning.

## Current reporting families

| Family | Current governed surface | Source authority | Consumer question |
|---|---|---|---|
| Overview | `overview_balance_dashboard` | governed frontier / annual dashboard plus typed debt, cash and derived authorities | What is the high-level accounting position? |
| Operating statement | `income_operating_statement`, monthly operating-statement matrices | `monthly_operating_statement.csv`, governed annual flow lineage | What operating revenue, true property OPEX, funding and draws occurred? |
| Validated cash | `monthly_tables_cash_close_matrix`, `annual_cash_close_by_box_wide` | `monthly_cash_close.csv` through validated-cash selection | What validated account cash can actually be stated? |
| Debt stock | `monthly_tables_debt_position_matrix`, `annual_debt_stock_by_pair_wide` | `monthly_debt_position.csv` | What debt remains open at the selected close? |
| Debt activity | `monthly_tables_debt_activity_matrix`, `annual_debt_activity_by_pair_wide` | `monthly_debt_activity.csv` | What debt movements occurred during the period? |
| Funding/support | funding lines in overview/operating/bridge tables and `annual_funding_by_actor_channel_wide` | semantic funding contribution plus typed broader support contract where explicitly used | What core funding or broader governed support occurred? |
| Draws / distributions | governed atomic-flow rows and annual lineage | family-withdrawal/distribution semantic rows | What personal/family withdrawal-like outflows were classified? |
| Property OPEX detail | governed atomic OPEX rows | `monthly_flow_semantic_split.csv` + semantic measure authority | Which property expenses support OPEX totals? |
| Treasury FX | FX tables and FX rows in the annual cash bridge | single FX measure/grain authority over treasury-FX semantic rows | What currency-conversion movement/cost is represented? |
| Linked evidence | professional drilldowns and linked digest | governed cell identity, lineage and source rows | Which governed members reconcile to the displayed cell? |

Table IDs are presentation identities, not accounting authority by themselves. A current row is governed only when its producer metadata, source schema and executor satisfy the current contract.

## What is not a current headline report authority

Do **not** treat the following as current human-report truth:

- `balance_humano_v2` / `accounting.human.*` as a calculation layer;
- legacy `metric_views/*`, `metric_values.csv`, or `metric_registry.csv`;
- `daily_cash_position.csv` or inferred Box balances as validated cash;
- raw `debt_open_items.csv` or repayment rows as the report-safe debt stock contract;
- generic flow/bridge/unknown-review matrices merely because a drilldown route exists;
- an old checked-in viewer package merely because the Flask application serves it successfully.

Diagnostic evidence remains useful for audit, but it does not automatically belong on the front stage.

## Interpretation invariants

### Property OPEX versus Household/personal outflows

Property OPEX is the governed `property_opex` semantic population. Personal expenses, family withdrawals/distributions, funding, debt movements, transfers, treasury FX and unknown/review-required rows are separate populations. Household/personal classification must not leak into property OPEX.

### Operating revenue versus funding

Operating revenue and funding are separate accounting categories. Core funding is the `funding_contribution` semantic bucket and is **not operating revenue**.

Some annual/professional surfaces deliberately expose a broader support contract. That broader contract has three governed kinds: core contribution, direct obligation payment, and debt-linked support. Broader support does not redefine every support-like event as core funding.

### Draws / distributions

Draws and distribution-like outflows are not property OPEX. A reporting classification such as personal draw, family withdrawal, or distribution does **not** by itself establish a legal entitlement, ownership share, breach, reimbursement right, or negotiation position.

### Validated cash

Cash headlines use explicitly validated account snapshots only. Inferred Box-control rows and internal party balances are excluded and are never fallback cash. If the validated schema or required identity is unavailable, the correct result is unavailable/unsupported rather than a substituted balance.

### Debt stock versus debt activity

Debt position is a stock. Monthly position selects the governed closing observation; annual debt stock selects the latest governed period and latest valid as-of observation in that period. Monthly stock values are never summed to create annual debt.

Debt activity is a flow. Governed monthly activity rows are additive; annual activity is the sum of governed monthly activity for the year.

Neither accounting debt classification nor resolver output establishes legal enforceability without separate documentary/legal analysis.

### Native currency

Money remains in explicit native `Currency` grain unless a separate governed conversion contract says otherwise. Missing currency is a fail-closed condition for governed professional flow, debt and FX execution. Do not silently sum ARS and USD.

### Annual lineage

Annual additive-flow cells consume `annual_flow_membership.csv`. Professional reporting does not reclassify monthly semantic rows to manufacture annual membership. Missing, ambiguous or incompatible governed lineage is unsupported.

### Unknown / review-required

Ambiguous semantic rows remain visible as unknown/review-required. They are not forced into OPEX, funding, draws or another convenient line simply to make a report balance.

### FX drilldowns

FX rows require an explicit recognized measure (`amount_in`, `amount_out`, `net_amount`, or `amount_abs`) and explicit currency-total or Box × Currency grain. Ambiguous measure, missing currency, missing required Box, or conflicting metadata fails closed.

## Drilldown reading rule

A professional cell is trustworthy only when the displayed value and its governed membership reconcile within the applicable tolerance.

A drilldown should show enough evidence to answer:

- which contract/executor was used;
- period/year and native currency;
- required dimensions such as Box, actor, category, debtor/creditor or FX grain;
- governed source artifact;
- selected/matched members;
- residual between matched and displayed value;
- caveat or unsupported reason.

`residual_warning`, `unsupported`, `unavailable`, or missing-source states are evidence to investigate. They are not permission to widen filters or invent fallback membership.

## Viewer boundary and current integration gap

`accounting-viewer` is explicitly read-only and does not own accounting calculations or freshness. Its repository governance declares consumption of the professional pack/drilldowns, but its current loader still hardcodes older checked-in package roots (`accounting_surface/data/` and `public/accounting/latest/`).

The current upstream publisher, by contrast, produces scope-qualified governed bundles under `public/accounting/latest_<SCOPE_TAG>/` with `accounting_public_bundle.v1`.

Treat that as an **integration gap**, not as evidence that either side may silently reinterpret the other. Until viewer packaging is reconciled, verify the viewer bundle manifest/run/cutoff independently and do not use viewer availability as proof that the current governed publication was loaded.

## Legal and governance boundary

These reports are accounting evidence. They can support factual questions about recorded rents, OPEX, funding, draws, cash, debt activity, and drilldown membership. They do not by themselves determine ownership, inheritance rights, administrator duties, enforceability, fairness, family allocations, or legal remedies.

## Related docs

- [Output contracts](/notes/output_contracts)
- [Governed metric contract](/notes/metric_registry_contract)
- [Debt contract](/notes/debt_resolver_contract)
- [Published bundle contract](/notes/frontend_snapshot_contract)
- [Consumer start](/notes/library/consumers/consumer-start-here)
