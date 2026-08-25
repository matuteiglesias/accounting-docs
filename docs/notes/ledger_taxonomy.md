---
title: "Ledger Taxonomy"
sidebar_label: "Ledger taxonomy"
sidebar_position: 18
description: "Defines the current canonical-ledger evidence boundary and how downstream governed semantics relate to ledger fields."
doc_type: "contract"
---

# Ledger Taxonomy

Status: current evidence contract  
Last reviewed: 2026-08-25  
Upstream truth checked: `accounting-workflows@b7d2c3a379f966f4d69b56c2df113714a7051452`

## Purpose

The canonical ledger is transaction evidence. It preserves normalized accounting inputs and provenance so downstream governed authorities can classify, aggregate, reconcile, and drill back to source rows.

The ledger does **not** by itself make every raw label a reporting semantic. Current semantic membership is governed downstream by explicit classification contracts.

## Canonical evidence fields

Current ingest/materialization code relies on fields including:

```text
tx_id
Date
amount
Currency
payer
receiver
Flujo
Tipo
status
Box
source_file
source_row
ingest_ts
```

Other detail/provenance columns may be present. Executable ingest and tests remain the schema authority.

Key invariants:

- transaction identity is stable enough for provenance/drilldown use;
- date and amount are parseable or visibly anomalous;
- native currency is explicit;
- payer/receiver and `Box` remain distinguishable dimensions;
- source provenance is retained;
- downstream code does not silently rewrite source records to make reports reconcile.

## Paid/scoped ledger versus all-status debt evidence

The live run emits both:

```text
ledger_canonical.csv
ledger_canonical_all_status.csv
```

`ledger_canonical_all_status.csv` is scoped normalized evidence used by the debt resolver so open/non-paid debt evidence is not lost through a paid-only reporting selection. It does not create a second canonical accounting meaning.

## `Flujo` and `Tipo`

`Flujo`/`Tipo` remain ledger classification inputs, but modern reporting membership is resolved by the governed semantic authority rather than by scattered string tests in downstream reports.

Current semantic outputs expose audited membership through artifacts such as:

```text
classification_audit.csv
classification_audit_summary.csv
monthly_flow_semantic_split.csv
monthly_operating_statement.csv
```

The exact rule vocabulary belongs to the executable semantic registry/contracts. Documentation must not invent new allowed values or map ambiguous rows by intuition.

## `Box`

`Box` is a scope and operational-accounting dimension. Current runs derive a scope tag from the requested box set and carry that scope through run/latest/publication identities.

A downstream artifact must not silently reintroduce an excluded box. In particular, household/personal evidence must not leak into property-business aggregates merely because it shares a ledger or party.

## Parties

`payer` and `receiver` are explicit transaction roles. Debt and semantic layers may derive additional role-specific fields where their contracts require them; those derived roles must trace back to canonical evidence.

Do not collapse payer, receiver, debtor, creditor, beneficiary, or administrator into one undocumented generic party meaning.

## Currency

`Currency` is native transaction/reporting grain. Cross-currency sums are forbidden unless an explicit valuation/reporting contract is invoked.

Derived USD/CCL sidecars are valuation evidence with their own policy/rate/provenance. They do not replace the native ledger amount or currency.

## Status

`status` affects workflow eligibility, but its exact vocabulary/recognition behavior is executable authority. The critical current contract is that debt resolution receives the scoped all-status evidence it needs rather than assuming the ordinary paid reporting universe is complete debt inventory.

Do not add status meanings in documentation that are not established by current code/tests.

## Semantic authority boundary

Current reports and metrics consume governed semantic/cash/debt artifacts instead of reinterpreting raw ledger rows. This prevents later layers from independently deciding whether a row is operating revenue, property OPEX, funding, a distribution/draw, treasury FX, debt, unknown, or review-required.

Unknown or ambiguous membership remains visible for review; it is not forced into a convenient bucket.

## Debt boundary

Debt resolution consumes `ledger_canonical_all_status.csv` and emits engine evidence. The canonical downstream debt stock/activity facts are produced later as `monthly_debt_position.csv` and `monthly_debt_activity.csv`.

The ledger therefore provides debt evidence, while the debt authority owns debt-specific position/activity semantics.

## Non-negotiable invariants

1. Preserve source provenance and transaction identity.
2. Preserve native currency and explicit Box scope.
3. Do not let report code redefine ledger semantics.
4. Do not infer validated cash from party/internal balances.
5. Do not drop required debt evidence merely because it is outside a paid-only reporting slice.
6. Corrections/reclassifications must remain auditable through source rows and governed classification outputs.
7. Accounting labels do not decide legal ownership, rights, or family governance.

## Related docs

- `/notes/output_contracts`
- `/notes/contracts`
- `/notes/debt_resolver_contract`
- `/notes/metric_registry_contract`
