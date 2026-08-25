---
title: "Pipeline Abstractions"
sidebar_label: "Pipeline abstractions"
sidebar_position: 3
description: "Explains the current governed accounting pipeline abstractions and repository boundaries."
doc_type: "reference"
---

# Pipeline abstractions

Status: current architecture foundation  
Last reviewed: 2026-08-25  
Upstream truth checked: `accounting-workflows@b7d2c3a379f966f4d69b56c2df113714a7051452`

## Layer model

```text
canonical ledger ingest
  -> governed materialization / semantic + cash facts
  -> debt position/activity + treasury
  -> governed monthly frontier + annual dashboard
  -> publication bundle
  -> professional presentation + governed drilldowns
```

This is the supported architecture. A generic views stage, a parallel `metric_values` engine, and `accounting.human.*` report authority are retired from the current spine.

## Authority abstraction

Each layer has one governing producer/contract. Downstream reporting should consume governed artifacts and explicit contracts rather than recreate accounting membership from convenience files or legacy presentation shapes.

Compatibility code can exist only as a bounded non-authoritative interface. Its presence does not make it a parallel semantic authority.

## Run abstraction

Generated outputs belong to specific runs/scopes. They are evidence produced by executable authority, not hand-maintained sources of accounting meaning.

Fixture-safe validation and live/consequential execution are different safety classes. Detailed command guidance is owned by the operations refresh wave and must match the current upstream Makefile.

## Consumer abstraction

Publication packages approved outputs for downstream use. Viewer-specific presentation is owned by `accounting-viewer`; this repository does not infer viewer behavior from old snapshot prose.

## Repository abstraction

- `accounting-workflows`: calculations, accounting-rule implementation, governed reporting, publication generation, professional packs/drilldowns.
- `accounting-viewer`: viewer-specific presentation over approved packaged outputs.
- `accounting-docs`: public operating, architecture, and contract guidance.

## Semantic guardrails

The architecture must preserve explicit distinctions between operating revenue and funding, property OPEX and household/personal expenditure, core contribution and broader support, debt stock and debt activity, validated and inferred cash, monthly flows and annual closing stock, and native currencies versus explicit valuation layers.

Those accounting distinctions do not themselves establish legal ownership, enforceability, inheritance rights, or family-governance conclusions.
