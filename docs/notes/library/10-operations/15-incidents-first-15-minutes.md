---
title: "Incidents: First 15 Minutes"
sidebar_label: "Incidents"
sidebar_position: 15
description: "First-response checklist for failed accounting runs, missing governed artifacts, scheduler faults, and publication-readiness failures."
doc_type: "runbook"
---

# Incidents: First 15 Minutes

Status: current first-response runbook  
Last reviewed: 2026-08-25  
Upstream truth checked: `accounting-workflows@b7d2c3a379f966f4d69b56c2df113714a7051452`

## 0–5 minutes: stop overlap and establish non-live evidence

If a scheduler is involved, first determine whether a same-scope job is still active. Suppress retries/manual runs that would overlap it.

From the `accounting-workflows` root:

```bash
make help
make doctor
make validate
```

Then, when fixture execution is relevant:

```bash
make smoke-core
```

Use `make smoke-full` only when the extra validation + publication dry-run helps the diagnosis.

Do not start an incident by rerunning live ingestion, publishing, or deleting outputs.

## 5–10 minutes: classify the failure

### Runtime/bootstrap

Signals:
- `doctor` fails;
- Python/compile/dependency environment is broken.

Next action: repair/reproduce the environment boundary before touching accounting rules.

### Fixture/code regression

Signals:
- `validate` contract/pytest failure;
- `smoke-core` governed semantic/cash failure.

Next action: isolate the smallest failing contract/test and trace its source records/rule in a safe fixture.

### Live input/credential

Signals:
- configured sheet or service account cannot be read;
- live source is missing/unavailable.

Next action: keep private-source access and source correction human-authorized. A passing fixture does not prove the live source is healthy.

### Existing-run/scope

Signals:
- required artifact missing for the selected `RUN_STAMP`;
- `BOXES` resolves a different scope;
- downstream command points at the wrong run.

Next action: establish exact run ID/scope before rerunning anything. Prefer a bounded existing-run operation over live upstream when possible.

### Latest/publication/release

Signals:
- run/debt/metrics latest targets disagree;
- metrics/debt latest cannot be packaged as one run;
- public scope is absent/partial;
- publication QA or `release-check` fails.

Next action: capture current latest targets and public manifest **before** changing them. `run-full` can fail after latest promotion, so failed status alone does not prove pointers stayed on the prior run.

### Scheduler/concurrency

Signals:
- expected job did not fire;
- retry overlapped a same-scope run;
- wrong working directory/environment/scope;
- manual and scheduled runs collided.

Next action: inspect the actual deployed scheduler/job definition and logs. Do not assume a historical unit name. Serialize same-scope execution while issue #44 is open.

## 10–15 minutes: choose the smallest intervention

Examples:

- environment only -> fix environment, rerun `doctor`/`validate`;
- governed fixture regression -> fix/test the source logic, rerun bounded fixture checks;
- existing metrics failure -> `metrics-from-run` on the exact run after prerequisites are verified;
- live source failure -> resolve source/credential issue before downstream rebuild;
- coherent latest + publication-only failure -> repair publication issue, then `make publish-latest BOXES='<same scope>'` and `make release-check BOXES='<same scope>'`;
- scheduler did not fire -> repair actual scheduler wiring without changing accounting code;
- same-scope overlap -> stop/suppress the competing attempt; preserve both run traces before deciding recovery.

A full `make run-full` is appropriate only when a full live run is actually authorized and needed.

## Hard safety boundaries

- `make clean-derived` is destructive and is never a routine incident step.
- `make publish-latest` is consequential and must not be used when source latest families are incoherent.
- `run-debt-views` has live upstream dependencies.
- overlapping same-scope runs are unsupported while upstream issue #44 remains unresolved.
- `run-full` promotes producer latest pointers before publication/release checking; inspect pointer state after late failures.
- publication cleans and rebuilds the scope-qualified public directory; a partial public directory is not a completed release.
- do not reintroduce retired `run-views`, `metric_values`, or human-report stages during recovery.
- do not resolve accounting ambiguity, disputed ownership, or legal meaning through operational prose or code.

## Automation/logs

Repository inspection found no checked-in production systemd timer/service, crontab, or scheduled GitHub Actions live job. If a deployed scheduler is involved, inspect its **actual** job/unit and logs.

The upstream README keeps a `journalctl` logging convention, but that does not establish `accounting-spine-live.service` or any other unit name.

See [Recovery and Rollback](/notes/library/automation/recovery-and-rollback) for latest/publish failure cases.

## Incident evidence record

```text
What failed:
Scheduler/job:
Exact command:
RUN_STAMP / run ID:
BOXES / scope:
Same-scope run already active?:
Fixture checks:
Failure class:
Affected artifacts:
run latest target:
debt latest target:
metrics latest target:
Public manifest source_run_id:
Live inputs accessed:
Publication affected:
Release-check result:
Smallest next intervention:
Human decision required:
```
