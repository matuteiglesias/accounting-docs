---
title: "Runtime Environment Contract"
sidebar_label: "Runtime env"
sidebar_position: 22
description: "Contract for live scheduler environment, scope, secrets, working directory, and run identity assumptions."
doc_type: "contract"
---

# Runtime environment contract

Status: current automation environment contract  
Last reviewed: 2026-08-25  
Upstream truth checked: `accounting-workflows@b7d2c3a379f966f4d69b56c2df113714a7051452`

## Authority boundary

Use [Environment Bootstrap](/notes/environment_bootstrap) for fixture-safe setup. This page covers the extra requirements imposed by a **live scheduled** run.

The repository does not contain a complete production dependency manifest or a verified production env file. Do not infer a working live environment from CI.

## Live inputs used by the current Makefile

| Variable | Current behavior |
|---|---|
| `ACCOUNT_SHEET_URL` | explicitly required by `run-ingest` |
| `ACCOUNT_SA` | passed to Google Sheets ingest as the service-account file/path |
| `ACCOUNT_SHEET_NAME` | defaults to `C. Long Ledger` |
| `BOXES` | defaults to `Family Business,Property Management` |
| `OUT` | defaults to `out` |
| `FREQ` | defaults to `M` |
| `RUN_STAMP` | defaults to UTC timestamp with one-second resolution |
| `SCOPE_TAG` | derived from `BOXES` for ordinary runs |

The current Google Sheets loader uses `Credentials.from_service_account_file(...)`; therefore a usable service-account file is required for that live source path even though the Makefile's explicit `require_var` guard is on `ACCOUNT_SHEET_URL`.

## Secret handling

Secrets and private source configuration remain deployment-owned and must not be committed.

The Makefile:

- optionally includes a root `.env`;
- exposes `ENV_FILE ?= private/accounting.env`;
- exposes `make run-env`, which sources that file and delegates to the full live path through a compatibility alias.

A scheduler may instead inject environment variables through its own secret/environment mechanism. The documentation does not require one deployment mechanism over another.

Do not commit an env file merely to make automation reproducible.

## Scope contract

Every scheduled job must have an explicit intended scope.

Record:

```text
BOXES=<...>
SCOPE_TAG=<resolved scope>
```

Do not let a scheduler silently switch scope because an environment variable disappeared. Recovery and publication checks must use the same scope as the run being inspected.

## Run identity and concurrency

For a new live run, normally let the Makefile create `RUN_STAMP`. Do not deliberately reuse a run stamp for an unrelated new run.

Current run IDs have one-second timestamp resolution. Because same-scope collision safety is unresolved in issue #44, runtime configuration must not permit overlapping same-scope live invocations.

A fixed scheduler-provided `RUN_STAMP` does not solve concurrency and can make collisions more likely.

## Working directory

The working directory is the actual repository root because the Makefile resolves relative project paths from there.

The historical `/workspace/accounting-workflows` path is not a repository contract. Record the real checkout path on the deployment host.

## Environment preflight

A deployment preflight should establish, without printing secret values:

- repository root is the intended checkout;
- Python/runtime dependencies required by the live path are available;
- live source URL is configured;
- service-account file exists and is readable by the scheduled process;
- intended `BOXES`/scope is configured;
- output root is writable;
- no same-scope live run is already active;
- scheduler logs can be retrieved.

Fixture-safe `make doctor` / `make validate` are useful evidence, but they do not authorize or prove live source access.

## Environment failure policy

If the live environment is incomplete:

- fail the scheduled run;
- do not fall back to a fixture;
- do not publish old or partial outputs as if they were fresh;
- do not broaden scope;
- do not change accounting classifications to make the run pass.

Record the environment failure separately from accounting or data-shape failures.
