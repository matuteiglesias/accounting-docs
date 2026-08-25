---
title: "Automation Start Here"
sidebar_label: "Start here"
sidebar_position: 20
description: "Entry point for governed scheduled accounting execution, deployment evidence, concurrency, and recovery."
doc_type: "guide"
---

# Automation start here

Status: current automation guidance  
Last reviewed: 2026-08-25  
Upstream truth checked: `accounting-workflows@b7d2c3a379f966f4d69b56c2df113714a7051452`

## Read order

1. [Automation wiring](/notes/automation_wiring_spec)
2. [Scheduler wiring](/notes/library/automation/scheduler-wiring-spec)
3. [Runtime environment](/notes/library/automation/runtime-env-contract)
4. [Cadence, SLO, and alerting](/notes/library/automation/cadence-slo-and-alerting)
5. [Recovery and rollback](/notes/library/automation/recovery-and-rollback)
6. [Incidents: first 15 minutes](/notes/library/operations/incidents-first-15-minutes)

## Current automation truth

The repository establishes the accounting command graph, but it does **not** establish a current production scheduler deployment.

Current source evidence supports:

- `make run-full` as the explicit full live command;
- `make run-env` as a file-based environment wrapper that ultimately delegates to `run-full` through a compatibility alias;
- scope-qualified run/latest/publication behavior;
- fixture-safe CI on push/PR;
- an explicit warning that overlapping same-scope live runs are unsupported while issue #44 is open.

Repository evidence does **not** establish:

- a current systemd unit or timer;
- a current crontab;
- a scheduled GitHub Actions live job;
- an hourly or other production cadence;
- a specific production working directory or host.

Treat those fields as UNKNOWN until the actual deployment is inspected.

## Non-negotiable scheduler rules

- Use current commands; do not schedule retired `run-views`, `human-report`, or parallel metric paths.
- Prefer `make run-full` over compatibility alias `build-all` in new wiring.
- Do not append a second publication after `run-full`/`run-env`.
- Serialize same-scope live runs externally until issue #44 is resolved.
- Coordinate manual and scheduled runs so they cannot overlap on the same scope.
- A successful scheduler exit is insufficient: verify coherent run identity, publication manifest/QA, and `release-check`.
- Do not infer systemd/cron state from historical documentation.

## Accounting boundary

Scheduling changes when the pipeline runs; it does not define accounting classifications, ownership, legal rights, family allocations, or reporting semantics.
