---
title: "Foundations"
sidebar_label: "Foundations"
sidebar_position: 0
description: "Foundational map for the governed accounting system, its concepts, roles, and authority boundaries."
doc_type: "index"
---

# Foundations

Status: current architecture foundation  
Last reviewed: 2026-08-25  
Upstream truth checked: `accounting-workflows@b7d2c3a379f966f4d69b56c2df113714a7051452`

## Start with current truth

- [Current state map](../../current_state_map.md)
- [Doc map by role](./01-doc-map-by-role.md)
- [Glossary](./02-glossary.md)
- [Pipeline abstractions](./03-pipeline-abstractions.md)
- [Governed-spine truth baseline](../90-governance/92-governed-spine-truth-baseline.md)

## Repository boundaries

- `accounting-workflows` owns canonical transformations and governed accounting/reporting calculations.
- `accounting-viewer` owns viewer-specific presentation.
- `accounting-docs` owns public operating and contract guidance.

This documentation does not decide accounting classifications independently and does not convert accounting classifications into legal or family-governance conclusions.

## Migration note

The architecture/foundations surface is current to the upstream commit above. Operations, contract, consumer, automation, and historical sections are refreshed in later governed waves; older pages in those sections may still contain retired architecture until their wave lands.
