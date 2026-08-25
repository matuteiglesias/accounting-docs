---
title: "Documentation Compass"
sidebar_label: "Docs compass"
sidebar_position: 2
description: "Explains how humans and agents should navigate the governed accounting documentation during the staged refresh."
doc_type: "guide"
---

# Documentation Compass (Humans + Agents)

Status: current migration guidance  
Last reviewed: 2026-08-25  
Upstream truth checked: `accounting-workflows@b7d2c3a379f966f4d69b56c2df113714a7051452`

## Migration status

The top-level architecture and foundations pages have been cut over to the governed-spine model. Operator commands, artifact contracts, consumer/professional guidance, automation, and historical cleanup are separate later waves in the active refresh program.

Until those waves land, a downstream page may still contain historical architecture. Current `accounting-workflows` executable tests, typed contracts, authority modules, Makefile, `AGENTS.md`, and `SYSTEM.yaml` outrank stale prose.

## Start here by role

### Operator

Read first:

1. [Current state map](./current_state_map.md)
2. [Backend truth baseline](./library/90-governance/92-governed-spine-truth-baseline.md)
3. `notes/accounting_spine_runbook.md` and `notes/canonical_commands.md` only with the understanding that their dedicated command-surface refresh is the next wave.

For current command names, check the upstream Makefile before live or consequential execution.

### Developer / agent

Read first:

1. root `AGENTS.md`
2. [Current state map](./current_state_map.md)
3. [Autonomous documentation PR protocol](./library/90-governance/94-autonomous-doc-pr-protocol.md)
4. the current upstream authority relevant to the change

Do not preserve a retired layer merely because an older document or filename mentions it.

### Analyst / stakeholder / report consumer

Read first:

1. [Current state map](./current_state_map.md)
2. [Foundations](./library/00-foundations/00-index.md)
3. consumer pages under `library/30-consumers/` with caution until the consumer/professional refresh wave is merged

Accounting labels are reporting classifications. They do not establish legal ownership, rights, enforceability, or family-governance conclusions.

### Automation steward

Read first:

1. [Backend truth baseline](./library/90-governance/92-governed-spine-truth-baseline.md)
2. the current upstream Makefile
3. automation pages under `library/20-automation/` only with the explicit concurrency limitation in mind

Do not assume overlapping same-scope runs are supported while upstream issue #44 remains unresolved.

## High-level abstractions

Use these current abstractions:

1. **Governed spine:** ledger ingest -> governed materialization -> debt/treasury -> governed frontier + annual dashboard -> publication -> professional presentation/drilldowns.
2. **Authority:** executable upstream behavior and contracts outrank documentation copies of the model.
3. **Runs and outputs:** generated artifacts are evidence from a specific run, not permanent semantic authority.
4. **Repository boundaries:** workflows calculates; viewer presents; docs explains.
5. **Safety classes:** fixture-safe validation and live/consequential execution must remain distinct.

## Retired architecture warning

Generic `accounting.views` / `run-marts`, the parallel `metric_values` engine, and `accounting.human.*` report authority are not current layers. Historical or compatibility references may remain during migration but must not be treated as required current stages.

## Active documentation program

The current execution authority for documentation work is:

- [Governed-spine truth baseline](./library/90-governance/92-governed-spine-truth-baseline.md)
- [Governed-spine documentation refresh program](./library/90-governance/93-governed-spine-docs-refresh-program.md)
- [Autonomous documentation PR protocol](./library/90-governance/94-autonomous-doc-pr-protocol.md)

The older `docs_execution_plan.md` is retained as a route-preserving historical planning record and is no longer the active sequence.
