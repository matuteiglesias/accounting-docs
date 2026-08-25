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

The top-level architecture/foundations and operator command/runbook surfaces have been cut over to the governed-spine model. Artifact contracts, consumer/professional guidance, automation, and historical cleanup remain later waves in the active refresh program.

Until those waves land, a downstream page may still contain historical architecture. Current `accounting-workflows` executable tests, typed contracts, authority modules, Makefile, `AGENTS.md`, and `SYSTEM.yaml` outrank stale prose.

## Start here by role

### Operator

Read first:

1. [Operator start](/notes/library/operations/operator-start-here)
2. [Environment bootstrap](/notes/environment_bootstrap)
3. [Accounting spine runbook](/notes/accounting_spine_runbook)
4. [Canonical commands](/notes/canonical_commands)
5. [Incidents: first 15 minutes](/notes/library/operations/incidents-first-15-minutes)

Use fixture-safe validation before live/consequential execution. Treat `run-full`, publication, cleanup, and live upstream dependency targets according to their documented safety class.

### Developer / agent

Read first:

1. root `AGENTS.md`
2. [Current state map](/notes/current_state_map)
3. [Backend entrypoints](/notes/entrypoints)
4. [Autonomous documentation PR protocol](/notes/library/governance/autonomous-doc-pr-protocol)
5. the current upstream authority relevant to the change

Do not preserve a retired layer merely because an older document or filename mentions it.

### Analyst / stakeholder / report consumer

Read first:

1. [Current state map](/notes/current_state_map)
2. [Foundations](/notes/library/foundations/index)
3. consumer pages under `library/30-consumers/` with caution until the consumer/professional refresh wave is merged

Accounting labels are reporting classifications. They do not establish legal ownership, rights, enforceability, or family-governance conclusions.

### Automation steward

Read first:

1. [Backend truth baseline](/notes/library/governance/governed-spine-truth-baseline)
2. the current upstream Makefile
3. automation pages under `library/20-automation/` only with the explicit concurrency limitation in mind

Do not assume overlapping same-scope runs are supported while upstream issue #44 remains unresolved. Do not assume a historical systemd/cron unit is currently deployed until the automation wave verifies it.

## High-level abstractions

Use these current abstractions:

1. **Governed spine:** ledger ingest -> governed materialization -> debt/treasury -> governed frontier + annual dashboard -> publication -> professional presentation/drilldowns.
2. **Authority:** executable upstream behavior and contracts outrank documentation copies of the model.
3. **Runs and outputs:** generated artifacts are evidence from a specific run, not permanent semantic authority.
4. **Repository boundaries:** workflows calculates; viewer presents; docs explains.
5. **Safety classes:** fixture-safe validation, live execution, existing-run work, publication, and destructive cleanup are distinct.

## Retired architecture warning

Generic `accounting.views` / `run-marts`, the parallel `metric_values` engine, and `accounting.human.*` report authority are not current layers. Historical or compatibility references may remain during migration but must not be treated as required current stages.

## Active documentation program

The current execution authority for documentation work is:

- [Governed-spine truth baseline](/notes/library/governance/governed-spine-truth-baseline)
- [Governed-spine documentation refresh program](/notes/library/governance/governed-spine-docs-refresh-program)
- [Autonomous documentation PR protocol](/notes/library/governance/autonomous-doc-pr-protocol)

The older `docs_execution_plan.md` is retained as a route-preserving historical planning record and is no longer the active sequence.
