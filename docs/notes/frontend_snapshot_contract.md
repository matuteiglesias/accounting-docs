---
title: "Frontend Snapshot Contract"
sidebar_label: "Public bundle"
sidebar_position: 13
description: "Route-preserving contract for the current scope-qualified accounting public bundle and artifact safety classes."
doc_type: "contract"
---

# Accounting Public Bundle Contract

Status: current publication contract; route name preserved from earlier snapshot terminology  
Last reviewed: 2026-08-25  
Upstream truth checked: `accounting-workflows@b7d2c3a379f966f4d69b56c2df113714a7051452`

## Route compatibility note

This page remains at `/notes/frontend_snapshot_contract` to preserve links. The current producer emits `accounting_public_bundle.v1`, not the older `accounting_frontend_snapshot.v1` contract.

## Producer and command

Producer: `accounting.publish.latest`.

Canonical Make target:

```bash
make publish-latest
```

Fixture-safe packaging planning is available through:

```bash
DRY_RUN=1 make publish-latest
```

Publication is packaging only; it does not recalculate accounting semantics.

## Scope-qualified path

Current public root:

```text
public/accounting/latest_<SCOPE_TAG>/
```

The publisher resolves scope-qualified latest metrics and debt inputs and rejects a strict publication when they point to different run identities.

A primary-scope compatibility `latest` pointer may exist, but new documentation and integrations should reason in terms of the explicit scope-qualified bundle.

## Manifest

Required manifest:

```text
public/accounting/latest_<SCOPE_TAG>/manifest.json
```

Current schema:

```text
accounting_public_bundle.v1
```

The manifest records bundle status, build/publication metadata, source run identity/paths, published files, metric/debt sections, publication mode, artifact-contract references, and class summaries.

Exact JSON shape is executable authority in `accounting.publish.manifest` / `accounting.publish.latest`; consumers should not depend on undocumented incidental keys.

## Publication classes

### `public_contract/`

Explicit frontend contracts, currently including contract-level metric/annual files such as:

```text
annual_balance_dashboard_contract.csv
metric_contract_frontier.csv
```

### `canonical_dashboard/`

Governed/report-safe facts selected for downstream use, including current dashboard metric series and canonical monthly semantic/cash/debt facts where present.

### `internal_diagnostic/`

Build manifests and QA evidence. These support audit/debugging but are not headline dashboard facts.

### `unsafe_for_frontend/`

Evidence that must not be displayed as a canonical dashboard fact. Current raw debt open items and repayment events are deliberately classified here.

## Artifact contracts

The bundle writes:

```text
artifact_contracts.csv
publish_contract_qa.csv
```

`artifact_contracts.csv` records artifact role, accounting nature, grain, currency policy, frontend suitability, source authority, and notes for the published files.

`publish_contract_qa.csv` checks, among other things, that artifacts are classed, raw unsafe debt evidence is not promoted to `public_contract`, retired generic metric outputs are absent, and debt stock/activity remain separated.

## Current selected metric/debt facts

The publisher selects current governed outputs rather than the retired metric universe. Representative current files include:

```text
metric_contract_frontier.csv
frontend_metric_series.csv
annual_balance_dashboard_metrics.csv
annual_balance_dashboard_contract.csv
annual_balance_dashboard_qa.csv
monthly_operating_statement.csv
monthly_flow_semantic_split.csv
monthly_cash_close.csv
monthly_debt_position.csv
monthly_debt_activity.csv
```

Presence depends on the selected source run and the publisher's explicit file-class lists.

## Retired publication assumptions

Do not expect the current publisher to expose:

```text
metric_values.csv
metric_registry.csv
income_statement_y.csv
balance_cash_y.csv
```

The publication QA explicitly guards against retired generic metric statements being included.

## Viewer boundary

This repository documents the producer-side public bundle. Detailed `accounting-viewer` consumption behavior belongs to the next consumer/professional wave and must be verified from the current viewer repository before it is presented as current fact.

Do not infer that every file inside the bundle is appropriate for the same UI use. The publication class and per-artifact frontend suitability are part of the contract.

## Privacy and provenance

The bundle must not expose credentials/private source documents. It carries enough run/source metadata to trace published facts back to governed producer artifacts without making internal local evidence a public accounting authority.

## Readiness

`make publish-latest` packages the bundle. `make release-check` is the separate release-readiness check over the scope-qualified public root. Successful packaging alone is not readiness evidence.

## Evidence anchors

- `accounting/publish/latest.py`
- `accounting/publish/manifest.py`
- `accounting/artifacts/manifest.py`
- `scripts/check_release.py`
- current Makefile
