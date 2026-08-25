---
title: "Cadence, SLO, and Alerting"
sidebar_label: "Cadence + alerts"
sidebar_position: 23
description: "Deployment-owned cadence, freshness evidence, success gates, and alerting for scheduled accounting runs."
doc_type: "contract"
---

# Cadence, SLO, and alerting

Status: current automation observability contract  
Last reviewed: 2026-08-25  
Upstream truth checked: `accounting-workflows@b7d2c3a379f966f4d69b56c2df113714a7051452`

## Cadence status

No current repository evidence establishes an hourly, daily, or other production schedule.

The previous hourly systemd recommendation was an example, not verified deployment state. Production cadence is therefore **deployment policy** and must be inspected or explicitly chosen by the operator.

A valid cadence must leave enough time and scheduler protection to prevent overlapping same-scope live jobs while issue #44 remains unresolved.

## What counts as a successful scheduled run

Do not define success as "scheduler process exited" or "a latest directory exists."

For a full live scheduled job, success evidence should include:

1. intended scope/run identity established;
2. live command completed;
3. run/debt/metrics latest pointers resolve coherently for that scope;
4. scope-qualified public bundle has a completed `manifest.json`;
5. publication QA is present/acceptable;
6. `release-check` passed.

The scheduler should retain the exact run ID associated with the success when its platform supports metadata/log capture.

## Freshness SLO

A deployment may define a freshness objective relative to its chosen cadence. Measure freshness from the scope-qualified public bundle metadata, not from a historical unqualified path or a viewer page.

Useful evidence includes:

- public manifest `published_at_utc` / `built_at`;
- `source_run_id`;
- intended scope;
- most recent successful scheduler completion;
- latest release-check result.

Do not hard-code a freshness threshold in these docs without a deployment decision.

## Availability / reliability SLO

If a deployment defines job-success or availability targets, calculate them from actual scheduled attempts and the governed success gate above.

A retry that overlaps an active same-scope run is not a valid reliability strategy under the current concurrency contract.

## Alert conditions

Useful alerts include:

- scheduled job failed;
- expected run window missed according to the **configured** cadence;
- scheduler attempted or allowed overlapping same-scope execution;
- run/debt/metrics latest pointers disagree after a run;
- public manifest missing after publication was expected;
- public manifest identifies an unexpected run/scope;
- publication QA fails or is missing;
- `release-check` fails;
- repeated live credential/source failures;
- public bundle is older than the deployment's explicit freshness threshold.

Do not alert on retired `balance_humano_v2`, `metric_views/*`, or human-report files as current health contracts.

## Incident evidence packet

Capture:

```text
Scheduler/job identifier:
Configured cadence:
Attempt time:
Command:
BOXES / SCOPE_TAG:
Run ID if created:
Run/debt/metrics latest targets:
Public manifest source_run_id:
Publication QA:
Release-check result:
Log reference:
Failure class:
Retry suppressed because run active?:
```

## Logging

Use the logs of the scheduler that is actually deployed.

The upstream README retains a journald/`journalctl` logging convention, but repository evidence does not establish a current unit name. If the deployment uses systemd, inspect the real unit; otherwise use the native scheduler logs.

## What SLOs do not mean

Freshness or job success does not establish:

- accounting correctness beyond the governed QA/contracts checked by the run;
- legal rights or obligations;
- family allocation fairness;
- viewer freshness when the viewer packaging boundary differs from the current publisher.
