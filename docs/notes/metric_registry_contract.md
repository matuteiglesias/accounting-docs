---
title: "Metric Registry Contract"
sidebar_label: "Metric registry"
sidebar_position: 20
description: "Contract for metric IDs, leaf and derived metrics, builders, validation levels, and safe metric expansion."
doc_type: "contract"
---

# Metric Registry Contract

This document defines the governance contract for accounting metrics.

Metrics are the stable middle layer between canonical accounting data and human-facing reports. Human reports should consume metric values or approved report tables, not recompute business logic from raw ledger rows.

## Purpose

The metric registry should answer:

* Which metrics exist?
* How is each metric named?
* Is the metric directly built from data or derived from other metrics?
* Which builder owns the metric?
* Which dimensions and periods are valid?
* Which validation checks protect it?
* How can a new metric be safely added?

## Metric ID naming

A metric ID should be stable, explicit, and composable.

Recommended pattern:

```text
DOMAIN.GROUP.MEASURE[.DETAIL]
```

Examples:

```text
IS.RENT.TOTAL
IS.COSTS.TOTAL
BS.CASH.TOTAL
CF.NET.TOTAL
ID.DEBT.OPEN_BALANCE
ID.DEBT.REPAID
QA.LEDGER.ROW_COUNT
```

Suggested domains:

| Domain | Meaning                   |
| ------ | ------------------------- |
| `IS`   | Income statement          |
| `BS`   | Balance sheet / snapshot  |
| `CF`   | Cash flow                 |
| `ID`   | Internal debt             |
| `HH`   | Household                 |
| `QA`   | Data quality              |
| `META` | Runtime/artifact metadata |

Metric IDs are contracts. Renaming a metric should be treated as a breaking change unless an alias/migration layer exists.

## Leaf vs derived metrics

### Leaf metric

A leaf metric is computed directly from canonical artifacts or approved views.

Examples:

* rent collected from canonical ledger view;
* cash balance from daily cash position;
* open debt balance from debt balance view.

A leaf metric must declare:

* source artifact or view;
* filters;
* aggregation rule;
* dimensions;
* period grain;
* null behavior.

### Derived metric

A derived metric is computed from other metric IDs.

Examples:

* net operating result = rent total - cost total;
* debt exposure ratio = open debt / cash;
* retained amount = contribution - draw.

A derived metric must declare:

* input metric IDs;
* formula;
* behavior when inputs are missing;
* validation expectations.

## Builders

A metric builder is the only place where a metric family should be computed.

Builders may read:

* canonical ledger;
* approved marts/views;
* debt resolver outputs;
* previous metric values for derivations;
* runtime metadata needed for QA.

Builders should not read:

* human report HTML;
* frontend snapshots;
* ad hoc manually edited outputs;
* old storypack artifacts unless explicitly in legacy mode.

## Registry fields

A registry entry should ideally track:

| Field              | Meaning                                   |
| ------------------ | ----------------------------------------- |
| `metric_id`        | Stable identifier                         |
| `title`            | Human-readable name                       |
| `domain`           | IS, BS, CF, ID, HH, QA, META              |
| `builder_key`      | Builder that owns the metric              |
| `grain`            | daily, monthly, quarterly, yearly, latest |
| `dimensions`       | Allowed breakdown fields                  |
| `source`           | Source artifact or view                   |
| `agg_rule`         | Sum, last, count, ratio, derived          |
| `currency`         | ARS, USD, mixed, none                     |
| `is_derived`       | Whether metric depends on other metrics   |
| `validation_level` | hard, warning, info                       |

The implementation can keep this compact, but these concepts should exist somewhere.

## Validation levels

| Level     | Meaning                                          |
| --------- | ------------------------------------------------ |
| `hard`    | Build should fail or artifact should not publish |
| `warning` | Build may complete but must surface the issue    |
| `info`    | Useful metadata, not a correctness problem       |

Hard errors should protect contracts:

* duplicate metric ID;
* missing required source;
* invalid grain;
* impossible negative value when forbidden;
* duplicate dimensional keys;
* currency mismatch;
* derived metric missing required inputs.

Warnings should expose review needs:

* empty slice;
* unexpected new category;
* null value after aggregation;
* unallocated debt repayment;
* stale source artifact.

## Adding a new metric safely

Use this checklist:

1. Define the human question the metric answers.
2. Choose the metric ID.
3. Decide if it is leaf or derived.
4. Identify the source artifact or input metric IDs.
5. Define grain and dimensions.
6. Define aggregation rule.
7. Add registry entry.
8. Add or extend builder.
9. Add validation.
10. Add at least one small fixture or smoke expectation.
11. Export metric values.
12. Only then expose it in human reports.

Do not add metrics directly inside human report factories.

## Ownership boundaries

| Layer         | Responsibility                        |
| ------------- | ------------------------------------- |
| Ledger        | Canonical raw event semantics         |
| Marts/views   | Useful normalized slices              |
| Metrics       | Stable values and derivations         |
| Debt resolver | Debt-specific allocation and balances |
| Human reports | Selection, labels, narrative, display |
| Frontend      | Consumption and navigation            |
| Publish       | Latest and snapshot contracts         |

## Known risks

| Risk                                             | Consequence                 |
| ------------------------------------------------ | --------------------------- |
| Metric computed twice in two places              | Drift between reports       |
| Human layer reads raw ledger                     | Hidden business logic       |
| Metric IDs renamed casually                      | Broken downstream consumers |
| Missing validation                               | Silent bad numbers          |
| Builders depend on old artifacts                 | Stale reports               |
| Derived metrics tolerate missing inputs silently | False confidence            |

## Related docs

* `/notes/ledger_taxonomy`
* `/notes/debt_resolver_contract`
* `/notes/output_contracts`
* `/notes/human_report_catalog`
EOF