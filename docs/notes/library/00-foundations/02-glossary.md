---
title: "Glossary"
sidebar_label: "Glossary"
sidebar_position: 2
description: "Shared vocabulary for the governed accounting spine, runs, artifacts, and authority boundaries."
doc_type: "reference"
---

# Glossary

Status: current foundation vocabulary  
Last reviewed: 2026-08-25

- **Canonical ledger**: normalized accounting rows produced by the governed ingest authority; documentation does not independently reinterpret their accounting meaning.
- **Governed materialization**: the current transformation layer that produces semantic flow facts, the operating statement, validated cash artifacts, and related QA from the canonical ledger.
- **Semantic flow facts**: governed classifications used by downstream reporting for categories such as operating revenue, property OPEX, funding, draws, and review-required rows.
- **Operating statement**: governed flow reporting artifact derived from approved semantic membership.
- **Validated cash**: cash facts that pass the current governed cash contract; they must not silently fall back to inferred/internal balances.
- **Debt position**: stock state at a point in time.
- **Debt activity**: flow/events over a period; not interchangeable with debt position.
- **Governed metric frontier**: current monthly metric authority consuming governed sources rather than a parallel legacy metric-values engine.
- **Annual dashboard**: annual reporting layer whose flows retain governed monthly lineage and whose stock measures use closing-position semantics.
- **Publication bundle**: packaged output produced by the current publication authority for downstream consumption.
- **Professional pack / governed drilldown**: professional reporting surfaces whose displayed values and row membership must reconcile without semantic leakage.
- **Native currency**: the transaction/reporting currency preserved without conversion unless an explicit valuation layer applies.
- **Compatibility boundary**: retained code or artifact shape supported only for a bounded historical presentation need; not an independent semantic authority.
- **Historical claim**: behavior that was once current and is useful as context but is no longer executable authority.
- **Run ID**: identifier for a specific generated execution/output scope; generated outputs are evidence from that run, not permanent accounting authority.
- **Fixture-safe validation**: checks designed to avoid live/private accounting ingestion.
- **Live/consequential execution**: commands that touch real inputs, generated live outputs, latest pointers, publication, or destructive cleanup and therefore require the correct authorization/environment.
