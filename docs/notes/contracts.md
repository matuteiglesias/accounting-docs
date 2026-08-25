---
title: "Contracts"
sidebar_label: "Contracts"
sidebar_position: 11
description: "Maps current accounting authorities, artifact roles, and contract boundaries across the governed backend."
doc_type: "contract"
---

# Accounting Contracts

Status: current authority map  
Last reviewed: 2026-08-25  
Upstream truth checked: `accounting-workflows@b7d2c3a379f966f4d69b56c2df113714a7051452`

## Contract hierarchy

Current accounting truth is established through executable producers, typed rule contracts, artifact metadata, and QA—not by documentation filenames.

| Family | Current authority | Main contract output |
|---|---|---|
| transaction evidence | `accounting.ledger.ingest` | `ledger_canonical.csv` |
| all-status debt evidence | ingest/run boundary | `ledger_canonical_all_status.csv` |
| semantic flows | governed semantic mart | `monthly_flow_semantic_split.csv`, `monthly_operating_statement.csv` |
| cash | governed cash authority | `monthly_cash_close.csv` |
| debt stock/activity | debt resolver + `accounting.marts.debt` | `monthly_debt_position.csv`, `monthly_debt_activity.csv` |
| treasury/accountability | treasury authorities | monthly treasury/accountability artifacts |
| monthly metric contract | `accounting.metrics.frontier` | `metric_contract_frontier.csv`, `frontend_metric_series.csv` |
| annual reporting contract | `accounting.metrics.annual` | annual dashboard files + `annual_flow_membership.csv` |
| artifact metadata | `accounting.artifacts.manifest` | `artifact_contracts.csv`, contract QA |
| publication | `accounting.publish.latest` | `accounting_public_bundle.v1` |
| professional traceability | `accounting.professional.*` | pack/drilldown presentation artifacts |

## Typed rule authorities

Current typed contracts under `accounting/contracts/` include authorities for:

- annual flow membership;
- atomic-flow drilldowns;
- cash-position control;
- debt position/activity;
- derived metrics;
- funding support;
- semantic measure selection.

These modules govern specific semantics. Documentation should describe them but must not expand their membership rules by prose.

## Artifact metadata contract

`accounting.artifacts.manifest.artifact_contract_for_name()` classifies known artifacts using fields including:

```text
artifact_role
accounting_nature
grain
currency_policy
frontend_suitability
source_authority
notes
```

Representative policies include explicit native currency, by-currency aggregation, no cross-currency sum, converted valuation, and non-money artifacts.

Representative suitability states include safe, safe-with-caveat, internal-only, unavailable, forbidden, and row/metric-level suitability.

## Canonical versus diagnostic evidence

A generated artifact is not authoritative merely because it exists.

Examples:

- `monthly_operating_statement.csv` is a canonical monthly flow source;
- `monthly_cash_close.csv` is cash authority only under its governed validated-cash rules;
- `daily_cash_position.csv` is internal-balance evidence, not validated cash;
- `debt_open_items.csv` is debt-engine evidence, while `monthly_debt_position.csv` is the canonical report-safe debt stock wrapper;
- `metric_contract_frontier.csv` is the current metric contract, while `metric_registry.csv` is retired.

## Fail-closed boundary

Missing or ambiguous accounting meaning is not repaired by downstream convenience logic. Current contracts explicitly preserve unavailable/review-required states and distinguish canonical facts from diagnostics, inferred balances, presentation-only projections, and legacy outputs.

## Currency and grain boundary

Money artifacts retain explicit native currency unless an approved valuation layer is invoked. Stock and flow grains remain distinct. In particular:

- cash and debt positions are closing stocks;
- debt activity and semantic operating/funding/distribution rows are flows;
- annual flows aggregate governed monthly membership;
- annual stock uses a governed closing position, not a monthly sum.

## Valuation boundary

USD/CCL valuation outputs are derived valuation evidence. They do not replace native transaction truth. Any converted reporting layer must carry its explicit rate/policy/provenance rather than silently altering the canonical ledger.

## Publication boundary

Publication is classification and packaging. It does not recalculate accounting semantics. `artifact_contracts.csv` and `publish_contract_qa.csv` make the public handoff auditable and prevent unsafe or retired artifacts from being mistaken for dashboard facts.

## Legal/governance boundary

Accounting contracts establish reporting membership and provenance. They do not establish legal ownership, enforceability, inheritance rights, family intentions, or negotiation positions.

## Retired contracts

The following are historical/compatibility concepts, not current authorities:

```text
accounting.views / run-marts
metric_values.csv
metric_registry.csv
validation_report.csv as the primary metric QA universe
metric_views/*
metric_drilldown/*
accounting.human.* as a calculation authority
```

## Evidence anchors

- `accounting/contracts/*`
- `accounting/artifacts/manifest.py`
- `accounting/metrics/build.py`
- upstream `notes/output_contracts.md`
- current Makefile and regression suite
