---
title: "Consumer Start Here"
sidebar_label: "Start here"
sidebar_position: 30
description: "Entry point for people or tools consuming governed accounting outputs and professional reporting surfaces."
doc_type: "guide"
---

# Consumer Start Here

Status: current consumer entrypoint  
Last reviewed: 2026-08-25  
Accounting truth checked: `accounting-workflows@b7d2c3a379f966f4d69b56c2df113714a7051452`  
Viewer boundary checked: `accounting-viewer@9d2dfabe3227195f7910ae362bcaaedd6c509529`

## First rule

Choose the **governed artifact or professional surface that answers the question**. Do not start from whichever old CSV, HTML page, or viewer route happens to exist.

Normal consumers should not reinterpret raw ledger rows or internal diagnostics. Presentation layers may select, label and navigate governed facts; they may not recalculate accounting membership.

## Read order

1. [Report consumer guide](/notes/library/consumers/report-consumer-guide) — which source answers which question.
2. [Where to find latest outputs](/notes/library/consumers/where-to-find-latest-outputs) — governed bundle, professional pack and viewer boundaries.
3. [Common questions and answers](/notes/library/consumers/common-questions-and-answers) — interpretation and freshness traps.
4. [Human report catalog](/notes/human_report_catalog) — current professional/reporting families and drilldown rules.
5. [Output contracts](/notes/output_contracts) — backend artifact authority.

## Consumer paths

### Governed published bundle

The current producer handoff is scope-qualified:

```text
public/accounting/latest_<SCOPE_TAG>/
```

Read `manifest.json` first. The bundle classifies artifacts as `public_contract`, `canonical_dashboard`, `internal_diagnostic`, or `unsafe_for_frontend`.

A file being present in the bundle does not mean every class is suitable for headline display.

### Professional reporting / drilldowns

Use the professional pack and linked drilldowns for human-readable tables and evidence navigation. Professional rows must reconcile to governed source membership and preserve native currency, Box/dimension grain, stock/flow semantics and unsupported states.

### Accounting viewer

`accounting-viewer` is a private read-only review surface. It does not own calculations, corrections, or freshness. Its current loader still packages older path conventions, so verify its manifest/run/cutoff before assuming it represents the latest governed bundle.

## Semantic guardrails

- **Property OPEX** excludes Household/personal withdrawals, funding, debt, transfers, treasury FX and unknown/review-required rows.
- **Operating revenue** excludes funding.
- **Core funding** is distinct from the broader typed support surface used by some annual/professional tables.
- **Draws/distributions** are not OPEX and do not establish legal entitlement or ownership.
- **Cash** means validated account snapshots only; inferred/internal balances are not fallback cash.
- **Debt position** is closing stock; **debt activity** is additive flow.
- **Annual flows** use governed annual membership; annual stocks use closing observations.
- **Currency** stays explicit; no silent ARS+USD aggregation.
- **Unknown/review-required** stays unresolved rather than being forced into another bucket.
- **FX** needs explicit measure and explicit currency or Box × Currency grain.

## If something looks wrong

Do not patch a displayed number in docs or viewer code.

Record:

- scope / run / cutoff;
- displayed table and cell identity;
- native currency and dimensions;
- source artifact named by the contract/drilldown;
- matched value versus display value;
- status/caveat/unsupported reason.

Then route the issue upstream to `accounting-workflows` if the accounting artifact or drilldown contract is wrong. Viewer-only navigation or packaging defects belong in `accounting-viewer`.

## Legal boundary

Accounting classification is evidence about the accounting system. It is not a legal conclusion about ownership, rights, enforceability, inheritance, administration duties, family fairness, or negotiation position.
