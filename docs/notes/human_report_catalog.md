---
title: "Human Report Catalog"
sidebar_label: "Human reports"
sidebar_position: 21
description: "Catalog of human-facing accounting reports, their audiences, source tables, questions answered, and interpretation boundaries."
doc_type: "reference"
---

# Human Report Catalog

This document catalogs human-facing accounting outputs.

The human reporting layer should help people understand the accounting system without forcing them to inspect raw ledger rows or metric internals.

Human reports should not invent accounting logic. They should consume canonical metrics, approved views, debt outputs, and data-quality artifacts.

## Purpose

This catalog should answer:

* Which human reports exist?
* Who is each report for?
* What question does each report answer?
* Which source table or metric supports it?
* What should not be inferred from it?
* Which reports are front-stage versus support/audit?

## Report families

| Report family     | Purpose                                              |
| ----------------- | ---------------------------------------------------- |
| Executive summary | Small set of numbers and claims for decision-making  |
| Cash snapshot     | Current liquidity and cash position                  |
| Income statement  | Rent, costs, operating result                        |
| Rent rollups      | Rent by property, detail, tenant, or period          |
| Flow/type rollups | Categorized inflows and outflows                     |
| Internal debt     | Open balances, repayments, and debt resolution       |
| Household         | Contributions, payments, fairness, and family burden |
| Data quality      | Missing fields, stale statuses, ambiguous rows       |
| Audit drilldowns  | Rows behind a number                                 |
| Narrative package | Tables plus message for a stakeholder                |

## Known reports and tables

| Artifact                         | Family                | Audience                   | Question answered                             | Source                          |
| -------------------------------- | --------------------- | -------------------------- | --------------------------------------------- | ------------------------------- |
| `balance_humano_v2`              | Executive / narrative | Family, Matías, reviewer   | What is the overall human-readable state?     | Human factory + metrics/views   |
| `cash_snapshot`                  | Cash                  | Operator, family, reviewer | How much cash or liquidity exists now?        | Cash metric/view                |
| `income_statement_monthly_last6` | Income statement      | Operator, family           | What happened in recent months?               | Metrics / income statement view |
| `rent_rollup_by_place_m_last6`   | Rent                  | Family, reviewer           | Which places produced rent recently?          | Rent rollup view                |
| `rent_rollup_by_detail_m_last6`  | Rent detail           | Operator, audit            | Which detailed rent lines support the rollup? | Ledger/view drilldown           |
| `flow_type_rollup_m_last6`       | Flow/type             | Operator, reviewer         | What categories explain inflows/outflows?     | Ledger/view aggregation         |
| `data_quality`                   | QA                    | Operator, developer, agent | What rows or contracts need attention?        | Validation outputs              |
| `debt_summary`                   | Internal debt         | Family, reviewer           | Who still owes what and what was repaid?      | Debt resolver outputs           |
| `debt_open_items`                | Internal debt         | Operator, audit            | Which obligations remain open?                | Debt resolver                   |
| `debt_allocations`               | Internal debt         | Operator, audit            | Which repayments closed which items?          | Debt resolver                   |
| `household_contributions`        | Household             | Siblings/family            | Who contributed what?                         | Ledger filters/views            |
| `household_payments`             | Household             | Siblings/family            | What was actually paid for household costs?   | Ledger filters/views            |

Names may differ in the current artifact tree. This catalog defines the reporting intent.

## Front-stage vs support

### Front-stage reports

Front-stage reports are safe to show in a meeting or narrative package.

They should be:

* small;
* labeled clearly;
* tied to a specific question;
* free from raw technical jargon;
* supported by drilldowns if challenged.

Examples:

* cash snapshot;
* last 6 months income statement;
* rent by place;
* internal debt summary;
* household contribution summary.

### Support reports

Support reports are for audit, QA, or debugging.

They can be wider and more technical.

Examples:

* raw debt allocations;
* data-quality warnings;
* detailed rent lines;
* transaction-level drilldowns;
* status reconciliation.

## Required metadata per report

Every report should eventually have:

| Field                   | Meaning                            |
| ----------------------- | ---------------------------------- |
| Report name             | Stable artifact/report label       |
| Audience                | Who can use it                     |
| Main question           | What it answers                    |
| Source                  | Metric/view/debt artifact          |
| Grain                   | monthly, yearly, latest, row-level |
| Refresh mode            | live, manual, historical           |
| Interpretation boundary | What not to claim from it          |
| Drilldown path          | How to verify the number           |
| Status                  | active, draft, legacy, deprecated  |

This does not need to be encoded in Docusaurus frontmatter. It can live in a table or registry.

## Report interpretation rules

1. A human report is not the source of truth.
2. A human report should cite or point to the source artifact.
3. If a number comes from metrics, it should match `metric_values`.
4. If a number comes from debt, it should match debt resolver outputs.
5. If a number comes from ledger filters, the filter should be reproducible.
6. A report can simplify language but not change accounting semantics.
7. A report should expose data quality warnings when they affect interpretation.

## Stakeholder packages

Potential packages:

| Package            | Contents                                                               |
| ------------------ | ---------------------------------------------------------------------- |
| Father meeting     | Executive summary, rent/cost view, debt summary, minimum asks          |
| Siblings meeting   | Household contributions, payments, fairness by thirds, next decisions  |
| Cousins discussion | Property-level rent/cost, administrator accountability, open questions |
| Lawyer packet      | Ledger taxonomy, debt contract, chronology, evidence drilldowns        |
| Operator review    | Data quality, latest run, output contracts, metric validation          |
| Agent handoff      | Module inventory, contracts, dev diary, frontmatter contract           |

## Known risks

| Risk                           | Consequence                                         |
| ------------------------------ | --------------------------------------------------- |
| Too many tables                | Humans lose the message                             |
| Report recomputes ledger logic | Numbers drift from canonical metrics                |
| No drilldown                   | Claims become hard to defend                        |
| Mixed audiences                | Technical report becomes unusable in family meeting |
| Data-quality warnings hidden   | Bad rows propagate into narrative                   |

## Related docs

* `/notes/ledger_taxonomy`
* `/notes/metric_registry_contract`
* `/notes/debt_resolver_contract`
* `/notes/output_contracts`
* `/notes/narrative`