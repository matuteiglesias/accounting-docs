---
title: "Environment Bootstrap"
sidebar_label: "Environment"
sidebar_position: 7
description: "Environment setup, secrets, paths, and runtime assumptions required for accounting operations."
doc_type: "runbook"
---

# Environment Bootstrap

Status: current operations reference  
Last reviewed: 2026-08-25  
Upstream truth checked: `accounting-workflows@b7d2c3a379f966f4d69b56c2df113714a7051452`

## Purpose

Establish enough runtime confidence to distinguish an environment problem from an accounting-pipeline regression **without touching live accounting inputs**.

Commands on this page are run from the root of `matuteiglesias/accounting-workflows`, not from this documentation repository.

## Current evidence boundary

At the checked upstream commit:

- GitHub CI runs Python **3.12**;
- the bounded validation job installs `pandas` and `pytest` after upgrading `pip`;
- CI then runs `make validate`;
- the repository root does not expose a `requirements*.txt` or `pyproject.toml` dependency manifest;
- therefore the CI install is evidence for the **fixture-safe validation environment**, not a complete live-production dependency contract.

Do not turn a missing live dependency into an accounting-code change merely to make a local environment pass.

## Fixture-safe bootstrap

A local environment matching the current CI validation boundary can be created with:

```bash
python3.12 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip pandas pytest
```

Then inspect and validate the command surface:

```bash
make help
make doctor
make validate
make smoke-core
make smoke-full
```

Interpretation:

- `make doctor` prints the active Python version and compile-checks `accounting`, `scripts`, and `tests`;
- `make validate` adds contract checks and the regression suite;
- `make smoke-core` uses the fixture ledger and checks governed semantic and cash materialization;
- `make smoke-full` adds repository validation and a **publication dry-run**.

`smoke-full` is intentionally partial: it is not proof of live ingest, live debt generation, a current publication, or professional-report freshness.

## Live environment inputs

Live ingest is a different safety class. The current Makefile uses:

- `ACCOUNT_SHEET_URL` — required by `run-ingest`;
- `ACCOUNT_SA` — service-account path/value passed to live ingest;
- `ACCOUNT_SHEET_NAME` — defaults to `C. Long Ledger`;
- `BOXES` — defaults to `Family Business,Property Management`;
- `OUT` — defaults to `out`;
- `FREQ` — defaults to `M`.

The Makefile optionally includes a root `.env`. Any local credential file remains private and must not be committed. The presence of an env file is not evidence that its credentials are valid or that the live source is current.

Do **not** run `make run-canonical`, `make run-full`, or `make publish-latest` merely to test whether bootstrap succeeded.

## Exact-run variables

The live run root is derived from `RUN_STAMP` and the scope resolved from `BOXES`:

```text
out/run/accounting/<RUN_STAMP>_<SCOPE_TAG>
```

Debt and metric output roots use the same run identifier under `out/debt_resolution/` and `out/metrics/`.

When operating on an existing run, pin the exact `RUN_STAMP` and preserve the same `BOXES`/scope. Do not let an unpinned new timestamp silently select a different run.

## Failure classification

| Failure | First classification |
|---|---|
| Python/compile failure in `make doctor` | runtime/bootstrap |
| missing `pandas`/`pytest` in fixture validation | validation environment |
| contract or pytest failure in `make validate` | code/contract regression candidate |
| semantic/cash artifact failure in `make smoke-core` | governed fixture regression candidate |
| live credential/source error | live environment/source issue; fixture results do not settle it |
| missing existing-run artifact | run selection or upstream-stage issue; verify exact run before rebuilding |

## Safety boundaries

- Fixture checks do not authorize live ingestion.
- Live ingestion does not authorize publication.
- Publication does not prove release readiness; `make release-check` is the current readiness check.
- `make clean-derived` deletes generated outputs and requires explicit cleanup authorization.
- Overlapping same-scope runs are not a supported assumption while upstream concurrency issue #44 remains unresolved.

## Evidence anchors

Checked at the upstream commit above:

- `accounting-workflows/.github/workflows/ci.yml`
- `accounting-workflows/Makefile`
- `accounting-workflows/AGENTS.md`
- `accounting-workflows/SYSTEM.yaml`
- `accounting-workflows/README.md`

No live/private accounting input was accessed to refresh this page.
