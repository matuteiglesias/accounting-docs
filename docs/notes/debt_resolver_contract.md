---
title: "Debt Resolver Contract"
sidebar_label: "Debt resolver"
sidebar_position: 19
description: "Contract for internal debt open items, interest, repayments, chronological allocation, outputs, and QA expectations."
doc_type: "contract"
---

# Debt Resolver Contract

This document defines the expected behavior of the internal debt resolver.

The debt resolver is a business-rule engine. It should not be treated as a display helper. It converts ledger debt events into auditable open items, repayment allocations, balances, and human-facing debt summaries.

## Purpose

The debt resolver should answer:

- Which internal debts exist?
- Which items are still open?
- Which repayments closed which items?
- How much principal remains?
- How much interest remains?
- Which party or pocket is exposed?
- Which balances can be shown to humans?
- Which rows need QA because chronology or classification is suspicious?

## Core concepts

### Open item

An open item is an obligation that can be repaid or resolved later.

Examples:

- principal loan;
- accrued interest;
- unpaid reimbursement;
- recognized internal debt ticket;
- family/PM obligation created by a prior payment.

Minimum fields:

| Field | Meaning |
|---|---|
| `open_item_id` | Stable identifier for the obligation |
| `opened_at` | Date the obligation becomes eligible for repayment |
| `debt_family` | Family/group to which the obligation belongs |
| `debtor_party` | Who owes |
| `creditor_party` | Who is owed |
| `currency` | Currency of the claim |
| `principal_amount` | Principal amount, if applicable |
| `interest_amount` | Interest amount, if applicable |
| `remaining_amount` | Unresolved balance |
| `source_transaction_id` | Ledger source |

### Repayment

A repayment is a debt-resolution event that can cancel one or more open items.

Minimum fields:

| Field | Meaning |
|---|---|
| `repayment_id` | Stable repayment event identifier |
| `repayment_date` | Date the repayment becomes available |
| `debt_family` | Eligible debt family |
| `payer_party` | Who paid |
| `receiver_party` | Who received |
| `currency` | Currency of repayment |
| `amount` | Amount available to allocate |
| `source_transaction_id` | Ledger source |

### Allocation

An allocation links a repayment to one open item.

Minimum fields:

| Field | Meaning |
|---|---|
| `repayment_id` | Repayment source |
| `open_item_id` | Item being resolved |
| `allocated_amount` | Amount applied |
| `allocation_date` | Repayment date |
| `allocation_rule` | Rule used, for example FIFO |
| `remaining_after` | Open item balance after allocation |

## Resolution rules

### Rule 1: Chronology

A repayment can only resolve an item that already exists.

```text
open_item.opened_at <= repayment.repayment_date
```

A repayment must never close future debt.

This rule is mandatory.

### Rule 2: Debt family

A repayment should only apply to open items in the same `debt_family`, unless a documented cross-family rule exists.

No implicit cross-family allocation.

### Rule 3: Currency

A repayment should only apply to open items in the same currency unless a documented FX conversion rule exists.

If a conversion exists, the conversion rate and source must be recorded.

### Rule 4: FIFO default

The default allocation rule is FIFO among eligible open items:

1. same debt family;
2. same currency;
3. opened on or before repayment date;
4. oldest open item first.

### Rule 5: Principal and interest ordering

The current simple contract can use a strict full-item FIFO rule.

Recommended conservative default:

* do not partially close principal while interest for that same item remains unresolved, unless explicitly supported;
* do not hide interest;
* if partial allocation is implemented, allocation records must make the remaining balance visible.

### Rule 6: No silent skips

If a repayment cannot be allocated, the output should record it as unallocated or partially allocated.

Skipped repayments are data quality signals, not harmless noise.

## Expected outputs

The resolver should produce at least:

| Output                           | Purpose                                                   |
| -------------------------------- | --------------------------------------------------------- |
| `debt_open_items.csv`            | Current and historical obligations with remaining balance |
| `debt_repayment_events.csv`      | Repayment events available for allocation                 |
| `debt_allocations.csv`           | Which repayments resolved which open items                |
| `debt_resolution_timeline.csv`   | Chronological story of opening and closing debt           |
| `debt_status_reconciliation.csv` | QA comparison between ledger status and resolver status   |
| `debt_balance_daily.csv`         | Optional daily debt balances                              |
| `debt_balance_monthly.csv`       | Optional monthly debt balances                            |
| `debt_balance_yearly.csv`        | Optional yearly debt balances                             |

Exact paths are defined in output contracts.

## Required QA checks

| Check                                         | Severity                                |
| --------------------------------------------- | --------------------------------------- |
| Repayment allocated to future open item       | hard error                              |
| Negative remaining amount                     | hard error                              |
| Allocation exceeds repayment amount           | hard error                              |
| Allocation exceeds open item remaining amount | hard error                              |
| Missing `debt_family` on debt row             | warning or hard error depending on mode |
| Missing currency                              | hard error for mixed-currency data      |
| Unallocated repayment                         | warning                                 |
| Open item with impossible date                | hard error                              |
| Duplicate open item ID                        | hard error                              |
| Duplicate repayment ID                        | hard error                              |

## Minimal QA fixtures

The resolver should have small fixtures for:

1. one principal, one full repayment;
2. one principal, partial repayment;
3. multiple principals, one repayment, FIFO allocation;
4. repayment before debt opening, must not allocate;
5. two debt families, repayment must not cross family;
6. principal plus interest;
7. unallocated repayment;
8. closed item still present in ledger;
9. open item excluded by `status=pagado`, must be included in debt mode;
10. mixed currencies, no silent conversion.

## Known implementation risks

| Risk                              | Consequence                                       |
| --------------------------------- | ------------------------------------------------- |
| Loading only `status=pagado`      | Open debt inventory disappears.                   |
| Ignoring chronology               | Repayments close future debts.                    |
| Weak `debt_family`                | Repayments resolve unrelated obligations.         |
| Silent partial allocation         | Human balances become hard to audit.              |
| Recomputing debt in human reports | Human report numbers drift from resolver outputs. |

## Contract boundary

The resolver may:

* consume canonical ledger debt rows;
* create debt-specific outputs;
* compute allocations;
* compute debt balances.

The resolver should not:

* mutate canonical ledger state directly;
* rewrite source ledger statuses silently;
* decide human narrative;
* publish latest artifacts by itself;
* replace metrics registry.

## Related docs

* `/notes/ledger_taxonomy`
* `/notes/output_contracts`
* `/notes/metric_registry_contract`
* `/notes/human_report_catalog`
