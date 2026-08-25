---
title: "Human + Agent Playbook"
sidebar_label: "Agent playbook"
sidebar_position: 15
description: "Operating guidance for humans and coding agents diagnosing and running the governed accounting system safely."
doc_type: "playbook"
---

# Human + Agent Operations Playbook

Status: current operations and automation guidance  
Last reviewed: 2026-08-25  
Upstream truth checked: `accounting-workflows@b7d2c3a379f966f4d69b56c2df113714a7051452`

## Purpose

Give humans and coding agents a shared first-response sequence that produces useful evidence without accidentally turning diagnosis into live ingestion, publication, destructive cleanup, overlapping automation, or an accounting-policy decision.

## First-response sequence: non-live first

From the `accounting-workflows` root:

```bash
make help
make doctor
make validate
make smoke-core
```

If broader fixture-safe confidence is needed:

```bash
make smoke-full
```

`smoke-full` adds a publication dry-run. It does not prove the live source, live debt path, latest pointers, scoped public bundle, scheduler wiring, or professional presentation is fresh.

Do not start with `run-full` merely because a live or scheduled run is failing.

## Failure taxonomy

### 1. Runtime / bootstrap

Examples:

- Python/compile failure in `make doctor`;
- missing validation dependency;
- local path/environment setup failure.

Action: repair or reproduce the environment boundary first. Do not reinterpret accounting data.

### 2. Fixture / executable regression

Examples:

- contract or pytest failure in `make validate`;
- semantic/cash artifact failure in `make smoke-core`.

Action: identify the smallest failing contract/test and trace the source rule before changing code.

### 3. Live source / credential failure

Examples:

- inaccessible configured sheet;
- credential/service-account failure;
- source data not available at the expected live boundary.

Action: keep this separate from fixture regression evidence. Access to private/live inputs and any source correction remain human-authorized actions.

### 4. Existing-run / scope failure

Examples:

- `RUN_STAMP` selects no governed run;
- `BOXES` resolves a different scope than the source run;
- required semantic/cash/debt artifact is missing.

Action: verify exact run identity and scope before rebuilding. Do not silently fall forward to a different latest run.

### 5. Publication / readiness failure

Examples:

- metrics/debt latest do not resolve to one run;
- scope-qualified public bundle is incomplete;
- publication QA or `release-check` fails.

Action: distinguish producer/latest selection from packaging failure. Remember that `run-full` promotes producer latest pointers before publication and release checking. Do not hand-edit generated public artifacts.

### 6. Scheduler / concurrency failure

Examples:

- configured job did not fire;
- scheduler used the wrong working directory/environment/scope;
- retry overlaps an active same-scope run;
- manual run overlaps the scheduled job.

Action: inspect the scheduler that is **actually deployed**, suppress same-scope overlap, and use [Automation Wiring Spec](/notes/automation_wiring_spec). Do not infer a historical unit name.

## Live operation requires an explicit choice

Once non-live checks are understood, a human operator may authorize one of the current live classes:

```bash
make run-canonical   # live ingest + governed materialization only
make run-full        # full live path + latest promotion + publication + release check
```

Other live targets, including `run-debt-views` and `run-metrics-live`, have live upstream dependencies or update latest pointers and should be treated accordingly.

For an existing run, prefer an exact bounded command such as:

```bash
make metrics-from-run RUN_STAMP=<existing-stamp> BOXES='<same scope>'
```

rather than rerunning live upstream unnecessarily.

## Human / agent responsibility split

### Human owner/operator

Owns or explicitly authorizes:

- accounting semantics, scope, classification policy, and source corrections;
- access to private/live accounting inputs and credentials;
- live ingestion;
- production scheduler deployment/cadence decisions;
- publication approval;
- destructive cleanup;
- consequential latest-pointer restoration;
- any decision about contested legal, ownership, or family-governance meaning.

### Coding/documentation agent

May autonomously:

- inspect current executable contracts and Makefile wiring;
- inspect repository scheduler/deployment evidence without claiming unavailable host state;
- run fixture-safe validation when the environment permits;
- reproduce a defect with safe fixtures;
- trace producer/consumer dependencies;
- propose or implement an already-governed technical repair;
- update documentation to match verified executable behavior.

An agent must not invent accounting meaning, access live/private inputs without authorization, or hand-edit generated reports/public bundles.

## Evidence packet for a consequential operation

Record:

```text
Command:
Scheduler/job, if any:
RUN_STAMP / run ID:
BOXES / scope:
Fixture checks run:
Live inputs accessed:
Outputs inspected:
run/debt/metrics latest targets:
Latest pointers changed:
Publication performed:
Public manifest source_run_id:
Release check:
Accounting rule changed:
Blocked decision:
```

A successful process exit alone is not enough. Inspect the expected artifacts and QA/release evidence for the affected layer.

## Concurrency boundary

Current upstream `SYSTEM.yaml` states that overlapping same-scope runs remain unsupported while issue #44 is unresolved. Do not launch competing same-scope live jobs as a recovery tactic.

A scheduler must serialize same-scope live execution and coordinate with manual runs. GitHub Actions CI concurrency protects CI validation only; it is not a live accounting lock.

## Automation boundary

Current repository inspection found no checked-in production systemd unit/timer, crontab, or scheduled GitHub Actions live workflow. Production scheduler identity, cadence, host path, and job/unit name therefore remain UNKNOWN until the actual deployment is inspected.

Use:

- [Automation Wiring Spec](/notes/automation_wiring_spec)
- [Scheduler Wiring](/notes/library/automation/scheduler-wiring-spec)
- [Recovery and Rollback](/notes/library/automation/recovery-and-rollback)

Do not append a redundant `publish-latest` after `run-full` or `run-env`; both full paths already publish.

## Never use these as first-response shortcuts

- `make run-full` before fixture-safe diagnosis;
- `make publish-latest` to hide producer/latest incoherence;
- `make clean-derived` to clear an unexplained state;
- overlapping retries;
- a retired `run-views`, `metric_values`, or human-report path;
- a historical systemd/cron command copied without deployment inspection;
- manual edits to generated accounting artifacts.
