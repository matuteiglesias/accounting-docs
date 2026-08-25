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
Accounting truth checked: `accounting-workflows@b7d2c3a379f966f4d69b56c2df113714a7051452`  
Viewer boundary checked: `accounting-viewer@9d2dfabe3227195f7910ae362bcaaedd6c509529`

## Migration status

The top-level architecture/foundations, operator command/runbook surface, artifact/contract authority, consumer/professional semantics, and automation/recovery policy have been cut over to the governed-spine model. Historical/IA cleanup and final drift/release closure remain later waves in the active refresh program.

Until those waves land, historical/context pages may still contain stale architecture. Current executable tests, typed contracts, authority modules, Makefile, `AGENTS.md`, and `SYSTEM.yaml` outrank stale prose.

## Start here by role

### Operator

Read first:

1. [Operator start](/notes/library/operations/operator-start-here)
2. [Environment bootstrap](/notes/environment_bootstrap)
3. [Accounting spine runbook](/notes/accounting_spine_runbook)
4. [Canonical commands](/notes/canonical_commands)
5. [Output contracts](/notes/output_contracts)
6. [Incidents: first 15 minutes](/notes/library/operations/incidents-first-15-minutes)

Use fixture-safe validation before live/consequential execution. Treat `run-full`, publication, cleanup, and live upstream dependency targets according to their documented safety class.

### Developer / agent

Read first:

1. root `AGENTS.md`
2. [Current state map](/notes/current_state_map)
3. [Artifact ladder](/notes/artifact_ladder)
4. [Contracts](/notes/contracts)
5. [Output contracts](/notes/output_contracts)
6. [Metric contract](/notes/metric_registry_contract) or [Debt resolver contract](/notes/debt_resolver_contract) as relevant
7. [Human report catalog](/notes/human_report_catalog) when changing professional/consumer behavior
8. [Automation wiring](/notes/automation_wiring_spec) when changing scheduler/runtime/recovery behavior
9. [Autonomous documentation PR protocol](/notes/library/governance/autonomous-doc-pr-protocol)
10. the current upstream authority relevant to the change

Artifact existence does not establish authority. Check artifact role, grain, currency policy, source authority, frontend suitability, governed drilldown identity, run/scope identity, and latest/publication behavior before using it downstream.

### Analyst / stakeholder / report consumer

Read first:

1. [Consumer start](/notes/library/consumers/consumer-start-here)
2. [Report consumer guide](/notes/library/consumers/report-consumer-guide)
3. [Human report catalog](/notes/human_report_catalog)
4. [Where to find latest outputs](/notes/library/consumers/where-to-find-latest-outputs)
5. [Public bundle contract](/notes/frontend_snapshot_contract)

Keep property OPEX separate from Household/personal withdrawals, operating revenue separate from funding, core funding separate from broader typed support, validated cash separate from inferred/internal balances, and debt stock separate from debt activity. Preserve native currency and governed annual lineage.

Accounting labels are reporting classifications. They do not establish legal ownership, rights, enforceability, reimbursement entitlement, inheritance, or family-governance conclusions.

The private `accounting-viewer` is read-only. Its current loader still reflects older package paths, so verify its manifest/run/cutoff before treating it as the latest governed accounting surface.

### Automation steward

Read first:

1. [Automation start](/notes/library/automation/automation-start-here)
2. [Automation wiring](/notes/automation_wiring_spec)
3. [Scheduler wiring](/notes/library/automation/scheduler-wiring-spec)
4. [Runtime environment](/notes/library/automation/runtime-env-contract)
5. [Cadence, SLO, and alerting](/notes/library/automation/cadence-slo-and-alerting)
6. [Recovery and rollback](/notes/library/automation/recovery-and-rollback)
7. [Accounting spine runbook](/notes/accounting_spine_runbook)
8. current upstream Makefile / `SYSTEM.yaml` / issue #44

Current scheduler policy is now documented, but **production deployment state is not inferred from the repository**. Checked-in evidence contains no production systemd service/timer, crontab, or scheduled GitHub Actions live job. Actual scheduler identity, host path, cadence, environment source, and unit/job name remain UNKNOWN until inspected on the deployment.

Do not permit overlapping same-scope live runs while issue #44 remains unresolved. `run-full` promotes producer latest pointers before publication/release checking, so late failures require pointer/publication inspection before retry.

## High-level abstractions

Use these current abstractions:

1. **Governed spine:** ledger ingest -> governed materialization -> debt/treasury -> governed frontier + annual dashboard -> publication -> professional presentation/drilldowns.
2. **Authority:** executable upstream behavior and typed/artifact contracts outrank documentation copies of the model.
3. **Artifact roles:** canonical source, diagnostic/internal evidence, QA, presentation-only, legacy, unsafe-for-frontend, and derived valuation are deliberately distinct.
4. **Consumer semantics:** reports select and explain governed facts; they do not invent accounting membership.
5. **Drilldown reconciliation:** a displayed cell is traceable through explicit identity, grain, measure, source membership and residual status; ambiguous governed rows fail closed.
6. **Automation boundary:** scheduling policy can select when/how a current command runs, but repository evidence does not prove a production scheduler deployment.
7. **Concurrency boundary:** same-scope live jobs are serialized externally while issue #44 remains unresolved; CI concurrency is not a live-run lock.
8. **Latest/release boundary:** individual pointer replacement is narrower than transactional run-family/publication rollback; late failures require explicit evidence checks.
9. **Runs and outputs:** generated artifacts are evidence from a specific run, not permanent semantic authority.
10. **Repository boundaries:** workflows calculates; viewer presents; docs explains.
11. **Safety classes:** fixture-safe validation, live execution, existing-run work, publication, scheduler deployment, and destructive cleanup are distinct.

## Retired architecture warning

Generic `accounting.views` / `run-marts`, the parallel `metric_values`/`metric_registry` engine, and `accounting.human.*` report authority are not current layers. Historical or compatibility references may remain during migration but must not be treated as required current stages, contracts, consumer surfaces, or scheduler targets.

Historical service/timer/cron examples likewise do not establish current deployment state.

## Active documentation program

The current execution authority for documentation work is:

- [Governed-spine truth baseline](/notes/library/governance/governed-spine-truth-baseline)
- [Governed-spine documentation refresh program](/notes/library/governance/governed-spine-docs-refresh-program)
- [Autonomous documentation PR protocol](/notes/library/governance/autonomous-doc-pr-protocol)

The older `docs_execution_plan.md` is retained as a route-preserving historical planning record and is no longer the active sequence.
