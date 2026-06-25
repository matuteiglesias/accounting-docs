---
title: "Ledger Taxonomy"
sidebar_label: "Ledger taxonomy"
sidebar_position: 18
description: "Contract for canonical ledger fields, taxonomy semantics, statuses, parties, currencies, and debt-related identifiers."
doc_type: "contract"
---

# Ledger Taxonomy

This document defines the canonical accounting vocabulary used by the long ledger and all downstream accounting artifacts.

The ledger is the source of truth. Metrics, debt resolution, human reports, and frontend snapshots should consume the ledger through canonical views or builders, not reinterpret raw rows independently.

## Purpose

The ledger taxonomy should answer:

- What economic event does this row represent?
- Which account or pocket does it affect?
- Which party paid, received, contributed, owed, or benefited?
- Is the row already paid, still open, or closed by a downstream resolution process?
- Is the row part of ordinary operations, household support, internal debt, rent, contribution, repayment, or correction?
- Can this row be safely included in metrics, debt resolution, human reports, or only in audit/debug views?

## Core fields

| Field | Meaning | Notes |
|---|---|---|
| `transaction_id` | Stable event identifier | Should identify the economic event or row family. Must not be casually regenerated. |
| `date` | Economic date | Used for period grouping, chronology, and debt allocation. |
| `Flujo` | High-level flow family | Example: rent, cost, contribution, debt, repayment, household, correction. |
| `Tipo` | More specific transaction type | Used by builders and reports to classify events. |
| `Cuenta` | Cash/accounting pocket | Should identify the account or system pocket affected by the row. |
| `Party` | Human/entity actor | Example: Matías, Alejandro, PM, FB, Primos, tenant, supplier. |
| `Currency` | Currency of the amount | Must be explicit when USD/ARS logic matters. |
| `Amount` | Signed or normalized amount | Sign conventions must be defined upstream and kept stable. |
| `status` | Operational status | Controls inclusion in different workflows. |
| `debt_family` | Debt grouping key | Used by the internal debt resolver when applicable. |

Actual column names may vary in the raw source. Canonical builders should normalize names before downstream use.

## Status semantics

`status` is not merely display metadata. It affects which rows enter which workflows.

| Status | Meaning | General accounting use | Debt resolver use |
|---|---|---|---|
| `pagado` | Paid/realized event | Usually included | Included if it represents a repayment or realized debt event |
| `abierto` | Open obligation or item | Often excluded from ordinary paid-only reports | Must be included when building open debt items |
| `cerrado` | Closed/resolved obligation | Usually excluded from cash-only reports | May be included for audit or historical resolution |
| `planeado` | Planned/forecast item | Excluded from realized accounting unless explicitly forecast mode | Excluded unless a forecast resolver exists |
| `refinanciado` | Reworked obligation | Excluded from ordinary paid-only reports unless explicitly modeled | Must be handled carefully; can create double-count risk |

Important rule: ordinary paid accounting can default to `status=pagado`, but debt workflows often need a broader universe. Debt resolution should be able to request rows with `only_status=None` or equivalent.

## Flow and type responsibilities

`Flujo` should provide the broad economic family.

`Tipo` should provide the operational subtype.

Do not let human report labels become the true taxonomy. Human labels can be nicer, but the ledger taxonomy must stay explicit and machine-checkable.

Example conceptual mapping:

| Flow family | Possible types | Downstream use |
|---|---|---|
| Rent | rent received, rent owed, tenant payment | income statement, rent rollups |
| Operating cost | services, maintenance, repairs, fees | income statement, cost reports |
| Household | household contribution, household payment | family contribution reports |
| Internal debt | loan, interest, open item | debt resolver |
| Repayment | repayment, cancellation | debt resolver, cash flow |
| Contribution | owner contribution, family contribution | balance/cash support reports |
| Correction | reclassification, duplicate fix, reversal | QA/audit reports |

The exact allowed values should be validated separately once the current sheet vocabulary is frozen.

## Party semantics

`Party` should represent the actor relevant to the accounting question. Avoid mixing payer, beneficiary, debtor, creditor, and administrator into one ambiguous label when the distinction matters.

When needed, downstream normalized views may derive richer fields such as:

| Derived role | Meaning |
|---|---|
| `payer_party` | Who paid cash |
| `receiver_party` | Who received cash |
| `debtor_party` | Who owes |
| `creditor_party` | Who is owed |
| `beneficiary_party` | Who economically benefited |
| `admin_party` | Who controlled or administered the action |

For the current accounting system, the most important distinction is between operational pockets such as `PM`/`FB` and human parties such as `Matías`, `Alejandro`, `Primos`, or tenants.

## Currency semantics

Currency should be explicit whenever the economic claim is not equivalent to the paid cash currency.

Known important case:

- Matías may advance ARS.
- The economic claim may be tracked in USD or USD-equivalent through CCL.
- Debt reports must not silently collapse ARS paid amount and USD claim amount.

A ledger row should make clear whether it represents:

- cash paid in ARS;
- nominal debt in USD;
- converted reporting value;
- interest;
- repayment;
- correction or reclassification.

## Debt fields

Rows entering debt resolution need enough structure to determine:

- when the obligation opened;
- who owes;
- who is owed;
- principal amount;
- interest amount, if any;
- repayment amount;
- debt family;
- chronological eligibility.

Minimum debt-relevant fields:

| Field | Meaning |
|---|---|
| `transaction_id` | Stable row or event identity |
| `date` | Opening or repayment date |
| `debt_family` | Which debt family the row belongs to |
| `Party` or debtor/creditor fields | Who owes / who is owed |
| `Tipo` | Principal, interest, repayment, correction |
| `Currency` | Currency of the claim |
| `Amount` | Amount to resolve |

## Non-negotiable invariants

1. `transaction_id` should be unique at the row level or explicitly documented as a family-level identifier.
2. `status=pagado` must not be the only allowed universe for debt resolution.
3. Debt rows must not be silently excluded because they are open.
4. Repayments must not resolve obligations that open in the future.
5. Human reports must not redefine ledger semantics.
6. Metrics must consume canonical fields, not raw ad hoc labels.
7. Reclassifications and corrections should be visible enough to audit.

## Known risks

| Risk | Why it matters |
|---|---|
| Ambiguous `Party` | Can invert who paid, who owed, or who benefited. |
| Mixed status semantics | Can drop debt inventory or inflate paid-only metrics. |
| Currency ambiguity | Can mix ARS cash with USD-denominated claims. |
| Debt family drift | Can allocate repayments to the wrong obligation family. |
| Recomputed human logic | Can create numbers that do not match metric values. |

## Related docs

- `/notes/output_contracts`
- `/notes/contracts`
- `/notes/debt_resolver_contract`
- `/notes/metric_registry_contract`
- `/notes/human_report_catalog`
