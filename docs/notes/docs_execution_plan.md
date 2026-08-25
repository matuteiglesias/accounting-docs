---
title: "Docs Execution Plan (Superseded)"
sidebar_label: "Docs plan (superseded)"
sidebar_position: 17
description: "Historical May 2026 documentation production plan, superseded by the governed-spine refresh program."
doc_type: "plan"
---

# Documentation Production Plan — Superseded

Status: HISTORICAL / superseded  
Original planning period: May 2026  
Superseded: 2026-08-25

## Why this route remains

This page originally organized documentation work around the May 2026 backend shape and a four-wave production plan. It is retained at the same public route because existing links may still point here, but it is **not** the current execution authority.

The old plan assumed architecture and consumer surfaces that have since changed, including material around generic views, the parallel metric registry/value universe, and `accounting.human.*` report production. Those assumptions must not be used to reconstruct retired backend layers.

## Current execution authority

Use these documents instead:

1. [Governed Spine Truth Baseline](/notes/library/governance/governed-spine-truth-baseline)
2. [Governed Spine Documentation Refresh Program](/notes/library/governance/governed-spine-docs-refresh-program)
3. [Autonomous Documentation PR Protocol](/notes/library/governance/autonomous-doc-pr-protocol)

The active sequence is:

```text
current architecture/foundations
  -> operator commands/runbooks
  -> artifact/contract authority
  -> consumer/professional semantics
  -> automation/recovery
  -> information architecture + historical cleanup
  -> drift audit/release closure
```

Each PR starts from current `accounting-docs/main`, re-checks current `accounting-workflows/main`, preserves routes by default, and records evidence plus validation results.

## Historical value of the old plan

The earlier plan established several practices that remain useful:

- documentation should be fact-first and tied to executable evidence;
- operators, developers, consumers, and automation stewards need distinct entrypoints;
- command and artifact names should be validated rather than copied from old prose;
- documentation work should remain separate from accounting implementation changes.

Those principles are now governed by the active refresh documents above.

## Current evidence boundary

The supersession decision was made after re-checking `accounting-workflows@b7d2c3a379f966f4d69b56c2df113714a7051452`. No live accounting inputs, deployment state, or legal/accounting interpretation was required to retire this obsolete planning sequence.
