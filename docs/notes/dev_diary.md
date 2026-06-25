---
title: "Development Diary"
sidebar_label: "Dev diary"
sidebar_position: 22
description: "Reconstructed development diary for the accounting backend, viewer, docs, debt system, live spine, and human-reporting layer."
doc_type: "journal"
---

# Development Diary

This page reconstructs how the accounting system evolved across recent work sessions and filesystem evidence.

It is not a literal git log. It is a memory aid for humans and agents so they do not reopen settled design questions or confuse generated artifacts with source-of-truth code.

## Reading this diary

Use this page to answer:

* When did a subsystem become real?
* Which parts are old experiments?
* Which parts were consolidated later?
* Which artifacts are generated outputs?
* Which areas are mature enough to preserve?
* Which areas still need QA before relying on them?

## Phase 0: Early foundation

Approximate period: late 2025 to early 2026.

Evidence:

* fixture ledger;
* early contracts;
* initial diagrams;
* package skeleton;
* early output directories.

Interpretation:

The accounting project existed before the recent live-spine work. It already had raw materials, but not yet a fully governed backend.

Main result:

* initial accounting data and contracts existed;
* source and generated artifacts were not yet sharply separated.

## Phase 1: First reporting era

Approximate period: March 2026.

Signals:

* early `metrics` outputs;
* early `human_reports`;
* legacy `storypack`;
* multiple run IDs from historical runs.

Interpretation:

The system could generate reports, but report freshness and run identity were still fragile.

Main result:

* human reports became useful;
* old and new output worlds coexisted;
* `latest` and run identity became real concerns.

## Phase 2: Repeated live/reporting experiments

Approximate period: late March 2026.

Signals:

* repeated metrics and human report runs;
* directories generated every few minutes;
* early viewer/public snapshot work.

Interpretation:

The project began behaving like a live system. This created operational questions:

* Which run is current?
* Which output is stale?
* Are human reports reading the right data?
* Can the system run without manual intervention?

Main result:

* need for Makefile, wrapper, systemd, latest, manifests, and run discipline became visible.

## Phase 3: Accounting viewer prototype

Approximate period: March 29 and after.

Signals:

* `accounting-viewer`;
* simple app;
* routes for home and debt;
* static data snapshot;
* Vercel config.

Interpretation:

The viewer was a consumer surface, not the canonical backend. It likely consumed copied/static artifacts to make outputs easier to inspect.

Main result:

* frontend surface became possible;
* backend and viewer contracts became necessary.

## Phase 4: Debt and human-output sprint

Approximate period: April 17-18.

Signals:

* many human report runs;
* debt resolution output directories;
* front output artifacts;
* work around meeting-ready packages.

Interpretation:

The accounting system was forced to answer concrete human questions:

* who paid;
* who owes;
* what remains open;
* what can be explained to family;
* what is evidence versus interpretation.

Main result:

* internal debt became a first-class subsystem;
* human-facing tables became a major product surface.

## Phase 5: Backend modularization

Approximate period: May 10.

Signals:

* package modules under `accounting/ledger`;
* `accounting/marts`;
* `accounting/metrics`;
* `accounting/debt`;
* `accounting/human`;
* `accounting/publish`;
* `accounting/support`;
* Makefile orchestration.

Interpretation:

The system moved from scripts/reports to a spine:

```text
ledger ingest
  -> materialize / marts
  -> metrics
  -> debt
  -> human reports
  -> publish/latest
```

Main result:

* clear module ownership emerged;
* metrics became the stable middle layer;
* debt resolver became explicit;
* human reports became a rendering/selection layer.

## Phase 6: Ingest semantics correction

Approximate period: mid-May.

Signals:

* `ledger/ingest.py` touched after modularization.

Interpretation:

The ledger ingestion layer needed correction after real-world use. The likely issue was that normal paid-only accounting and debt workflows require different row universes.

Main result:

* debt workflows must not rely only on `status=pagado`;
* canonical ingest semantics became a high-risk/high-value contract.

## Phase 7: Documentation extraction

Approximate period: May 21-22.

Signals:

* `accounting-docs`;
* Docusaurus scaffold;
* notes copied from backend;
* docs build generated;
* module inventory, runbooks, contracts, output docs.

Interpretation:

The project crossed a complexity threshold. Documentation became necessary infrastructure.

Main result:

* docs became a separate surface;
* runbooks and contracts became navigable;
* agents gained a better onboarding path.

## Phase 8: Battle test and live spine

Approximate period: May 22.

Signals:

* battle-test outputs;
* env file;
* ingest/materialize check scripts;
* `BT_LIVE` and `BT_DEBT` runs;
* manifests touched.

Interpretation:

The focus shifted from architecture to operational trust.

Main result:

* environment setup was tested;
* full live runs became more repeatable;
* manifests and output contracts became more important.

## Phase 9: Mature live-output runs

Approximate period: June 2026.

Signals:

* synchronized `debt_resolution`;
* synchronized `metrics`;
* synchronized `human_reports`;
* `latest` pointing to a live run.

Interpretation:

The live spine was producing aligned downstream artifacts.

Main result:

* debt, metrics, and human reports could run together;
* remaining risks moved toward QA, contracts, and human-report selection.

## Current architectural map

```text
Long ledger
  -> canonical ingest
  -> marts/views
  -> metric values
  -> debt resolution
  -> human reports
  -> public/latest snapshots
  -> viewer/docs consumers
```

## Stable decisions

1. The long ledger is the source of truth.
2. Metrics are the stable middle layer.
3. Debt is a first-class subsystem.
4. Human reports select and explain; they should not redefine accounting.
5. `latest` must point only to complete coherent runs.
6. Docs are part of the operating system, not an afterthought.

## Known unsettled areas

| Area             | Risk                                                      |
| ---------------- | --------------------------------------------------------- |
| Ledger taxonomy  | Ambiguous fields propagate downstream.                    |
| Debt resolver    | Chronological allocation must be protected.               |
| Metric expansion | New metrics can drift if added outside registry/builders. |
| Human reports    | Too many tables can obscure the message.                  |
| Viewer           | May lag behind backend contracts.                         |
| Docs governance  | Frontmatter, links, and contracts can drift.              |

## Related docs

* `/notes/ledger_taxonomy`
* `/notes/debt_resolver_contract`
* `/notes/metric_registry_contract`
* `/notes/human_report_catalog`
* `/notes/docs_frontmatter_contract`