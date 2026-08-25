---
title: "Automation Wiring Spec"
sidebar_label: "Automation wiring"
sidebar_position: 14
description: "Governed policy for scheduled accounting execution, concurrency, deployment evidence, and recovery boundaries."
doc_type: "contract"
---

# Automation Wiring Spec

Status: current automation policy  
Last reviewed: 2026-08-25  
Upstream truth checked: `accounting-workflows@b7d2c3a379f966f4d69b56c2df113714a7051452`

## Purpose

Define what an accounting scheduler **may** assume from the repository and what must be verified on the actual deployment host.

This page governs scheduler policy. It does not claim that a particular systemd timer, cron entry, host path, cadence, or production deployment currently exists.

## Current repository evidence

At the checked upstream commit:

- `SYSTEM.yaml` names `make run-canonical`, `make run-metrics`, and `make run-full` as canonical commands;
- `make run-full` is the current full live path through publication and `release-check`;
- `make run-accounting`, `make run-accounting-full`, and `make build-all` are compatibility aliases for `run-full`;
- `make run-env` still exists as an environment-file convenience wrapper and delegates to the compatibility alias `run-accounting`;
- the only checked-in GitHub Actions workflow is `accounting-ci`, triggered by push/PR and running fixture-safe `make validate`;
- no checked-in `*.service`, `*.timer`, crontab, or scheduled GitHub Actions workflow establishes a production live scheduler;
- repository search finds the historical `accounting-spine-live` unit name only in documentation, not in deployment configuration.

Therefore current production scheduler identity, host, cadence, working directory, environment source, and unit/job name are **UNKNOWN from repository evidence alone**.

## Governed scheduled command

For a new or refreshed live scheduler, the accounting command should be the current explicit full-live target:

```bash
make run-full
```

The scheduler must provide the intended live environment and scope before invoking it.

Do not schedule retired or compatibility vocabulary as if it were a separate architecture:

```text
build-all
ledger -> materialize -> debt -> debt-views -> metrics -> human-report
run-views
metric_values
human-report
```

`build-all` still resolves to `run-full`, but new automation should use `run-full` directly so the configured job names the current supported behavior.

### `run-env` compatibility wrapper

The current Makefile also exposes:

```bash
make run-env ENV_FILE=<private-env-file>
```

It sources `ENV_FILE` (default `private/accounting.env`) and then invokes `run-accounting`, which is a compatibility alias for `run-full`.

Use this only when the **actual deployment** deliberately uses that file-based environment convention. It is a wrapper, not a second canonical pipeline.

Do **not** append another `make publish-latest` after `run-env` or `run-full`: the full target already performs latest promotion, publication, and `release-check`.

## Scheduler contract

A live recurring job must record and enforce all of the following:

| Field | Required policy |
|---|---|
| repository | `matuteiglesias/accounting-workflows` |
| working directory | actual repository root; do not hard-code an unverified host path |
| command | `make run-full` or deliberately verified `make run-env ...` wrapper |
| scope | explicit `BOXES` / resulting `SCOPE_TAG` |
| environment | explicit deployment-owned source; secrets remain outside Git |
| overlap policy | no overlapping same-scope live jobs |
| logs | actual scheduler/service logs; unit/job identifier must be inspected |
| success gate | command success **and** coherent artifacts/publication/release evidence |
| last inspected | timestamp + operator/evidence source |

If these fields are not known, the scheduler state is not documented as current.

## Same-scope concurrency: unsupported

Upstream issue #44 remains open. Current run identity uses a UTC `RUN_STAMP` with one-second resolution:

```text
out/run/accounting/<RUN_STAMP>_<SCOPE_TAG>
```

Two same-scope runs can therefore collide on run identity. Current latest-pointer replacement is atomic for an individual symlink entry, but the run/debt/metrics family is promoted sequentially rather than as one transaction.

Until #44 is resolved:

- serialize scheduled jobs per scope;
- do not launch a manual same-scope live run while a scheduled one is active;
- do not use retries that can overlap the still-running attempt;
- do not claim that systemd, cron, GitHub Actions, or a wrapper makes the backend itself concurrency-safe;
- treat scheduler-level no-overlap as a required deployment guard, not as a substitute for fixing #44.

The concurrency group in `.github/workflows/ci.yml` protects CI validation runs only. It does **not** lock live accounting execution.

## Latest-pointer and publication behavior

Current behavior matters for recovery:

1. `run-full` builds the governed live stages.
2. `_update_latest` advances run/debt/metrics latest pointers.
3. `publish-latest` packages the scope-qualified public bundle.
4. `release-check` validates the resulting public scope.

This means a late failure can occur **after producer latest pointers have moved**.

Current `accounting.support.latest` uses a temporary sibling symlink plus `os.replace`, which gives atomic replacement of each individual pointer. It does not make all latest families one atomic transaction.

Current publication also is not a transactional rollback mechanism. `publish-latest` runs with `--clean`, removes the scope-qualified public directory, and rebuilds it in place. The manifest is written near the end of successful publication.

Therefore automation must not promise:

- "failed full run means latest never changed";
- transactional rollback of all latest families;
- an always-preserved previous public directory after a failed publication.

## Publication coherence gates

Before packaging, the publisher requires metrics and debt latest pointers to resolve to the same run identity. A mixed metrics/debt source fails closed.

A scheduled run is not considered healthy merely because the process started or one directory exists. Check at least:

- run/debt/metrics latest targets for the intended scope;
- public `manifest.json` for the scope-qualified bundle;
- manifest/run identity where present;
- publication QA artifacts;
- `make release-check` result.

See [Recovery and Rollback](/notes/library/automation/recovery-and-rollback) for the late-failure procedure.

## Cadence is deployment policy, not accounting semantics

No current repository evidence establishes an hourly, daily, or other production cadence. A scheduler owner may choose a cadence, but the choice must be recorded as deployment configuration and must leave enough time to prevent same-scope overlap.

Do not infer accounting meaning, reporting materiality, or legal obligations from the scheduler cadence.

## Logging boundary

The upstream README retains `journalctl` as the operational logging convention. That is evidence for journald-oriented operations, **not** evidence for a current unit name.

If the actual deployment is systemd-based, inspect the real unit/timer and use its logs. If it is not systemd-based, use the actual scheduler's logs. Never fabricate `accounting-spine-live.service` from historical prose.

## Deployment evidence record

When an actual scheduler is inspected, record:

```text
Host / environment:
Scheduler mechanism:
Job / unit identifier:
Working directory:
Command:
Environment source:
BOXES / SCOPE_TAG:
Cadence:
No-overlap mechanism:
Retry policy:
Log source:
Last successful run ID:
Last release-check result:
Inspected at:
Evidence location:
```

Do not commit credentials, private environment files, live ledgers, or generated accounting bundles as proof of this record.

## Evidence anchors

- `accounting-workflows/SYSTEM.yaml`
- `accounting-workflows/Makefile`
- `accounting-workflows/accounting/support/latest.py`
- `accounting-workflows/accounting/publish/latest.py`
- `accounting-workflows/.github/workflows/ci.yml`
- `accounting-workflows/README.md`
- `accounting-workflows` issue #44

No live host, scheduler, credentials, or private accounting input was accessed for this documentation refresh.
