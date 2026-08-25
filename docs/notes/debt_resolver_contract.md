---
title: "Debt Resolver Contract"
sidebar_label: "Debt resolver"
sidebar_position: 19
description: "Defines the current debt-engine evidence boundary and canonical debt stock/activity handoff."
doc_type: "contract"
---

# Debt Resolver Contract

Status: current contract reference  
Last reviewed: 2026-08-25  
Upstream truth checked: `accounting-workflows@b7d2c3a379f966f4d69b56c2df113714a7051452`

## Purpose

Debt handling has two distinct layers:

1. debt-engine evidence that resolves obligations/repayments and preserves auditability;
2. canonical monthly debt position/activity facts used by metrics, annual reporting, publication, and professional presentation.

Do not treat raw debt-engine tables as the final report contract.

## Input boundary

The Makefile supplies the resolver with:

```text
out/run/accounting/<RUN_ID>/ledger_canonical_all_status.csv
```

This is scoped normalized all-status evidence. It exists so debt resolution is not accidentally limited to a paid-only reporting population.

Runtime parameters currently include selected currencies, repayment statuses, and a `full-only` mode. Exact eligibility/allocation semantics remain executable authority in `accounting.debt.resolve` and its regression tests; this page does not invent additional debt families or allocation rules.

## Debt-engine evidence

Current resolver outputs under `out/debt_resolution/<RUN_ID>/` include:

```text
debt_open_items.csv
debt_allocations.csv
debt_repayment_events.csv
debt_resolution_timeline.csv
debt_status_reconciliation.csv
```

`accounting.debt.balance_views` additionally emits:

```text
debt_balance_daily.csv
debt_balance_monthly.csv
debt_balance_quarterly.csv
debt_balance_yearly.csv
```

These files support audit, reconciliation, chronology, and construction of canonical debt facts. Artifact metadata classifies raw open-item/repayment/status-reconciliation evidence as internal/diagnostic rather than dashboard truth.

## Canonical debt facts

`accounting.marts.debt` produces in the canonical run root:

```text
monthly_debt_position.csv
monthly_debt_position_qa.csv
monthly_debt_activity.csv
monthly_debt_activity_qa.csv
```

These are the downstream debt authorities.

### Position

`monthly_debt_position.csv` is a stock contract. It represents closing debt position at governed period-close grain.

Consequences:

- annual debt stock selects the latest valid closing position;
- monthly positions must not be summed into annual debt;
- missing/invalid position grain must fail visibly rather than degrade into an additive flow interpretation.

### Activity

`monthly_debt_activity.csv` is a flow contract for debt movement. It is the additive debt activity source for metric/annual reporting.

Position and activity cannot substitute for each other merely because both are denominated in money.

## Treasury cross-check

The debt stage is followed by treasury/accountability materialization, including `monthly_cash_accountability.csv` plus QA. This cross-check does not turn debt activity into cash or validated cash into debt; each authority keeps its own grain and role.

## Currency

Debt facts are by currency. No implicit cross-currency allocation or aggregation should be inferred from documentation. Any valuation/conversion requires an explicit governed valuation layer with rate/policy/provenance.

## Status reconciliation

`debt_status_reconciliation.csv` is QA/evidence comparing ledger-facing and engine-facing debt state. A discrepancy is information to investigate; downstream presentation must not silently rewrite the canonical ledger to make the states agree.

## Publication boundary

The publisher deliberately treats raw `debt_open_items.csv` and `debt_repayment_events.csv` as `unsafe_for_frontend` evidence. Report-safe debt stock/activity is published through the canonical monthly wrappers.

This separation protects privacy/detail boundaries and prevents raw engine internals from being mistaken for headline accounting facts.

## Required invariants

- required all-status debt evidence is not lost through paid-only filtering;
- native currency remains explicit;
- stock and activity remain distinct;
- canonical monthly wrappers reconcile to debt-engine evidence;
- annual stock uses closing-position semantics;
- raw debt diagnostics are not promoted to frontend fact;
- changes to debt meaning require fixture/regression evidence and downstream reconciliation.

## Accounting/legal boundary

A debt artifact records the accounting system's governed debt interpretation. It does not by itself establish legal enforceability, ownership, limitation periods, inheritance rights, or a negotiation position.

## Related docs

- `/notes/ledger_taxonomy`
- `/notes/output_contracts`
- `/notes/metric_registry_contract`
