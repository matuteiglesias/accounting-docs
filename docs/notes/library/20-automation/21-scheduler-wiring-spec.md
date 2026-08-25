---
title: "Scheduler Wiring Spec"
sidebar_label: "Scheduler wiring"
sidebar_position: 21
description: "Deployment-facing scheduler contract for current accounting commands and no-overlap execution."
doc_type: "contract"
---

# Scheduler wiring spec

Status: current deployment contract  
Last reviewed: 2026-08-25  
Upstream truth checked: `accounting-workflows@b7d2c3a379f966f4d69b56c2df113714a7051452`

The canonical policy is [Automation Wiring Spec](/notes/automation_wiring_spec). This page is the deployment checklist.

## Current deployment census

Repository evidence at the checked commit shows:

| Mechanism | Current evidence |
|---|---|
| GitHub Actions CI | CURRENT: push/PR only; runs `make validate` |
| scheduled GitHub Actions live run | ABSENT from checked-in workflows |
| systemd service/timer | UNKNOWN; no checked-in unit/timer establishes deployment |
| cron | UNKNOWN; no checked-in crontab establishes deployment |
| production host/path | UNKNOWN |
| production cadence | UNKNOWN |

Historical examples are not deployment evidence.

## Required job definition

A live recurring job should resolve to one current full-live invocation:

```bash
make run-full
```

with the intended environment and `BOXES` supplied by the deployment.

If the real deployment deliberately uses an env-file wrapper, current Makefile support is:

```bash
make run-env ENV_FILE=<private-path>
```

`run-env` already reaches the full live path. Do not chain a second `publish-latest` after it.

## Required no-overlap policy

For each scope, the scheduler must prevent a new live invocation while another invocation of the same scope is still running.

This must cover both scheduled retries and coordination with manual runs. A scheduler's local mutex/no-overlap feature is a deployment guard only; it does not change the backend's unsupported-concurrency status under issue #44.

Do not document a platform-specific lock command unless that mechanism is actually configured and inspected.

## Working directory

Run from the actual `accounting-workflows` repository root. Do not copy the historical `/workspace/accounting-workflows` path into a service definition unless that is the verified current checkout location.

## What to inspect on a live host

Before calling scheduler wiring CURRENT, inspect and record:

- scheduler mechanism and exact job/unit ID;
- enabled/disabled state;
- effective cadence;
- actual working directory;
- exact command;
- environment source without exposing secret values;
- `BOXES` / scope;
- no-overlap and retry behavior;
- log source;
- last attempted and last successful run;
- release-check result for the last success.

For systemd, inspect the real service/timer rather than guessing a name. For cron, inspect the real user/system crontab. For another scheduler, inspect its native job definition.

## Unsupported wiring

Do not deploy or retain a scheduled job that:

- calls retired `run-views`, `human-report`, or old metric paths;
- uses `build-all` merely because historical docs called it canonical;
- invokes `run-env && publish-latest` redundantly;
- starts overlapping same-scope runs;
- treats a fixed historical unit name as current without host evidence;
- publishes without preserving the same intended scope.
