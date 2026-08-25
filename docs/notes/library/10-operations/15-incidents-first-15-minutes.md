---
title: "Incidents: First 15 Minutes"
sidebar_label: "Incidents"
sidebar_position: 15
description: "First-response checklist for failed accounting runs, missing governed artifacts, and publication-readiness failures."
doc_type: "runbook"
---

# Incidents: First 15 Minutes

Status: current first-response runbook  
Last reviewed: 2026-08-25  
Upstream truth checked: `accounting-workflows@b7d2c3a379f966f4d69b56c2df113714a7051452`

## 0–5 minutes: establish non-live evidence

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

### Publication/release

Signals:
- latest artifacts cannot be packaged;
- public scope is incomplete;
- `release-check` fails.

Next action: identify the missing/invalid producer artifact. Do not hand-edit the public bundle.

## 10–15 minutes: choose the smallest intervention

Examples:

- environment only -> fix environment, rerun `doctor`/`validate`;
- governed fixture regression -> fix/test the source logic, rerun the bounded fixture checks;
- existing metrics failure -> `metrics-from-run` on the exact run after prerequisites are verified;
- live source failure -> resolve source/credential issue before any downstream rebuild;
- publication failure -> repair producer/latest selection, then package and run `release-check`.

A full `make run-full` is appropriate only when a full live run is actually authorized and needed.

## Hard safety boundaries

- `make clean-derived` is destructive and is never a routine incident step.
- `make publish-latest` is consequential and must not be used to cover an upstream failure.
- `run-debt-views` has live upstream dependencies.
- overlapping same-scope runs are unsupported while upstream issue #44 remains unresolved.
- do not reintroduce retired `run-views`, `metric_values`, or human-report stages during recovery.
- do not resolve accounting ambiguity, disputed ownership, or legal meaning through operational prose or code.

## Automation/logs

If a deployed scheduler is involved, inspect the **actually configured** scheduler/service logs. Do not assume an older documented systemd unit name is still live. Automation wiring and concurrency recovery are governed in a later refresh wave.

## Incident evidence record

Record:

```text
What failed:
Exact command:
RUN_STAMP / run ID:
BOXES / scope:
Fixture checks:
Failure class:
Affected artifacts:
Live inputs accessed:
Publication affected:
Smallest next intervention:
Human decision required:
```
