---
title: "Report Consumer Guide"
sidebar_label: "Report guide"
sidebar_position: 31
description: "Guide for choosing governed accounting sources, reading professional reports, and avoiding semantic or legal overreach."
doc_type: "guide"
---

# Report Consumer Guide

Status: current consumer guidance  
Last reviewed: 2026-08-25  
Accounting truth checked: `accounting-workflows@b7d2c3a379f966f4d69b56c2df113714a7051452`

## Purpose

Use this page to answer two questions in order:

1. **Which governed source is allowed to answer this accounting question?**
2. **Which presentation surface is appropriate for the audience?**

Do not reverse that order. A convenient report or viewer page cannot upgrade diagnostic evidence into accounting authority.

## Question-to-authority map

| Question | Governed authority | Human-facing surface | Do not infer |
|---|---|---|---|
| How much operating revenue occurred? | `monthly_operating_statement.csv` / governed annual flow membership | operating statement / overview | funding as revenue |
| How much rent was collected? | rent membership in `monthly_flow_semantic_split.csv` / frontier | operating statement, rent drilldown | all inflows as rent |
| What is true property OPEX? | `property_opex` semantic rows and operating statement | operating statement / OPEX detail | Household, personal draws, funding, debt or FX as OPEX |
| Who/what provided core funding? | `funding_contribution` semantic population | funding lines / governed funding detail | broader support automatically equals core contribution |
| What broader support occurred? | typed funding-support contract | annual/professional support tables | legal reimbursement or ownership right |
| What personal/family draws occurred? | governed withdrawal/distribution semantic population | overview/operating/draws detail | property expense or legal entitlement |
| How much validated cash exists? | `monthly_cash_close.csv` through validated-cash authority | cash tables / cash drilldown | inferred Box or internal-party balance as cash |
| What debt remains open? | `monthly_debt_position.csv` | debt-position tables | sum of monthly stocks, or legal enforceability |
| What debt movement occurred? | `monthly_debt_activity.csv` | debt-activity tables | closing stock |
| What happened over a year? | `annual_flow_membership.csv` for additive flows; closing-selection authorities for stocks | annual dashboard / annual companions | recomputed report-layer membership |
| What does an FX row mean? | treasury-FX semantic rows + explicit FX measure/grain authority | FX tables / bridge drilldown | default `net_amount`, cross-currency sum, or missing-Box widening |
| Which rows support this displayed number? | professional governed drilldown | linked drilldown / digest | a residual or unsupported cell as reconciled |

## Reading the professional surface

A current professional table is a projection over governed sources. It may:

- choose a useful table layout;
- label a governed metric or line;
- pivot period/currency/dimension values;
- expose a linked drilldown;
- carry caveats and QA status.

It may **not**:

- invent semantic membership from a human label;
- widen a missing dimension silently;
- substitute inferred/internal cash for validated cash;
- turn debt activity into debt stock;
- sum native currencies together;
- turn an ambiguous row into a convenient category;
- create a legal or family-governance conclusion.

## Monthly versus annual reading

### Additive flows

Operating revenue, property OPEX, core funding, draws/distributions, debt activity and governed treasury flows are flow concepts. Annual professional cells consume materialized annual membership when governed by that contract.

The report layer does not re-scan monthly rows to decide who belongs in the annual total.

### Closing stocks

Cash and debt position are stock concepts. Annual values are selected closing observations, not sums of monthly stock values.

For validated cash, the annual executor selects the latest period with validated candidates and applies the same validated-account snapshot primitive. For debt position, the annual executor selects the latest governed period and then the latest valid as-of observation in that period.

## Funding versus broader support

Keep these concepts separate:

- **Core funding:** semantic `funding_contribution`.
- **Broader support:** typed support membership that can include `core_contribution`, `direct_obligation_payment`, and `debt_linked_support` where explicit metadata satisfies the governed contract.

A direct obligation payment can support the property without cash entering a Box. A debt-linked support event can have a debt effect. Neither fact silently changes the core funding definition.

## Property OPEX versus Household/personal

The current semantic authority explicitly separates personal/family expenditure candidates from property OPEX. Property OPEX is currently limited to governed property expense categories such as taxes, services, maintenance and legal costs under the semantic rules.

Household/personal expenses, family withdrawals/distributions, debt movements, internal transfers, treasury FX and unknown/review-required rows stay outside property OPEX unless upstream accounting authority explicitly reclassifies them.

## Data-quality and fail-closed states

A report may expose:

- `ok` — governed membership reconciles to the display within tolerance;
- `residual_warning` — membership was found but does not reconcile within tolerance;
- `empty` — governed identity exists but no members matched;
- `unavailable` — required governed observation is not available;
- `unsupported` — required measure/grain/schema/identity is incomplete or conflicting;
- missing-source/error states — required artifact is absent.

Do not turn any non-OK state into an `ok` result by widening filters or borrowing a compatibility measure.

## Publication versus professional pack versus viewer

### Public bundle

The scope-qualified public bundle is an artifact handoff. It contains governed contracts, canonical dashboard facts, internal diagnostics, and explicitly unsafe-for-frontend evidence in separate classes. Read the manifest before choosing a file.

### Professional pack

The professional pack/linked digest is the richer human-facing reporting surface. It is generated from governed artifacts and drilldown contracts, but its existence/freshness must be verified for the specific run.

### Viewer

The viewer is read-only. Its current repository packaging still reflects older path conventions and may lag current publisher schema. A working viewer route proves only that a packaged snapshot can be served; it does not prove the snapshot is current or semantically complete.

## Evidence escalation

When challenged on a number, move downward through evidence rather than sideways into another report:

```text
professional cell
  -> governed drilldown identity
  -> governed source artifact / annual lineage
  -> semantic/debt/cash source rows
  -> canonical ledger/source provenance when needed
```

At every step preserve scope, period, native currency and required dimensions.

## Legal boundary

Accounting outputs can establish what the system recorded and how it classified or aggregated those records. Separate documentary/legal analysis is required for ownership, enforceability, administrator obligations, inheritance, reimbursement rights, damages, or family-governance conclusions.
