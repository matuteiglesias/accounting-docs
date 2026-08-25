---
title: "Recovery and Rollback"
sidebar_label: "Recovery"
sidebar_position: 24
description: "Evidence-first recovery guidance for failed scheduled runs, moved latest pointers, and partial publication."
doc_type: "runbook"
---

# Recovery and rollback

Status: current automation recovery runbook  
Last reviewed: 2026-08-25  
Upstream truth checked: `accounting-workflows@b7d2c3a379f966f4d69b56c2df113714a7051452`

## Recovery invariant

Recover the smallest affected layer while preserving run identity, scope, source evidence, and generated-artifact traceability.

Do not treat cleanup, republishing, pointer mutation, or a second live run as a generic first response.

## 1. Stop overlap first

Before retrying a scheduled live run:

- verify whether a same-scope job is still active;
- suppress scheduler retry if it would overlap;
- coordinate any manual intervention with the scheduler;
- record `BOXES` / `SCOPE_TAG`.

Same-scope overlap is unsupported while issue #44 remains open.

## 2. Establish non-live evidence

From the repository root:

```bash
make help
make doctor
make validate
```

Use fixture checks when they help separate code regression from live-source failure:

```bash
make smoke-core
```

Do not run `make run-full` merely to see whether the error disappears.

## 3. Capture current pointer/publication state

For the affected scope, inspect the actual latest targets before changing anything. For example:

```bash
readlink out/run/accounting/latest_<SCOPE_TAG> || true
readlink out/debt_resolution/latest_<SCOPE_TAG> || true
readlink out/metrics/latest_<SCOPE_TAG> || true
```

Also inspect the scope-qualified public bundle if present:

```text
public/accounting/latest_<SCOPE_TAG>/manifest.json
public/accounting/latest_<SCOPE_TAG>/publish_contract_qa.csv
```

Record the run IDs/targets and the last `release-check` result.

Do not assume a failed `run-full` left all latest pointers unchanged.

## 4. Classify where the full path failed

Current full ordering is:

```text
live stages
  -> _update_latest
  -> publish-latest
  -> release-check
```

This creates distinct recovery cases.

### A. Failure before latest promotion

If the run failed before `_update_latest`, keep the incomplete run as evidence unless there is an explicit cleanup decision.

Fix the smallest failing prerequisite and rerun only the necessary bounded check/stage when possible. Do not publish an incomplete run.

### B. Failure after latest promotion, before successful publication/release

Producer latest pointers may already point at the new run.

Check whether run/debt/metrics latest targets are coherent and whether the intended run artifacts are complete enough for publication.

The publisher itself requires metrics and debt latest to resolve to the same run. If they do not, **do not publish**.

If the promoted source run is coherent and the publication problem has been repaired, prefer a bounded roll-forward:

```bash
make publish-latest BOXES='<same scope>'
make release-check BOXES='<same scope>'
```

This avoids unnecessary live re-ingestion.

### C. Partial public bundle

`publish-latest` currently cleans the scope-qualified public directory and rebuilds it in place. A mid-publication failure can therefore leave the public directory absent or partial.

The manifest is written near the end of successful publication. Missing/incomplete manifest or failed publication QA means the public directory is not evidence of a completed current release.

After source latest coherence is verified and the publication defect is fixed, rerun bounded publication + release check. Do not hand-edit files into the public directory.

### D. Latest pointers identify a bad/incomplete run

Do not "rollback" by manually editing generated CSV/JSON/HTML files.

The current canonical operator surface does not promise a transactional multi-family rollback command. If restoring a previous known-good run is required:

1. identify the exact known-good run ID and same scope;
2. verify its run, debt, and metrics families still exist and are coherent;
3. preserve the failed run as evidence;
4. treat any pointer restoration as an explicit consequential operator action;
5. re-publish and run `release-check` after restoration;
6. document exactly which pointers/public bundle changed.

If the exact restoration procedure is not verified for the current checkout, stop rather than inventing one from historical commands.

## Latest-pointer guarantees: narrow, not transactional

Current `accounting.support.latest` replaces each individual symlink via a temporary sibling + `os.replace`. That supports atomic replacement of one link entry.

It does **not** prove:

- unique same-scope run creation under overlap;
- transactional promotion of run/debt/metrics as one unit;
- no latest movement on every failed `run-full`;
- automatic restoration of the previous public bundle.

These limits are why issue #44 remains operationally relevant.

## Scheduler-specific failures

If the failure is "job never ran":

- inspect the actual deployed scheduler definition;
- inspect its real logs;
- verify enabled state, cadence, environment, working directory, command, and no-overlap policy.

Do not query `accounting-spine-live.service` unless that exact unit was actually inspected and confirmed current.

## Never use as generic recovery

- `make clean-derived`;
- overlapping retries;
- `build-all`/retired-stage chains copied from old docs;
- `run-env && publish-latest` double-publication;
- manual edits to latest symlinks without an explicit verified restoration decision;
- manual edits to generated accounting/public artifacts;
- changing accounting classifications to resolve an operational failure.

## Recovery evidence record

```text
Scheduler/job:
Failure time:
Exact command:
BOXES / SCOPE_TAG:
Run ID:
Failure occurred before/after latest promotion:
run latest target:
debt latest target:
metrics latest target:
Public manifest status/source_run_id:
Publication QA:
Release-check:
Live inputs accessed:
Intervention:
Pointers changed:
Public bundle changed:
Known-good run used, if any:
Remaining risk / human decision:
```

## Roll-forward preference

Prefer a bounded repair and roll-forward from coherent governed artifacts over ad-hoc rollback. Preserve evidence and scope at every layer.
