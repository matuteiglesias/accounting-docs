# Accounting Workflows Documentation

Public documentation and operating handbook for the accounting workflow estate.

> **Lifecycle:** active documentation and publication surface  
> **Authority:** operating guidance, contracts, report catalogs, and recovery playbooks  
> **Not authoritative for:** ledger data, source documents, pipeline execution, or generated accounting outputs  
> **README evidence reviewed:** 2026-08-03 — repository configuration and source files; live deployment was not rechecked

## Purpose

This repository turns the accounting system's operating knowledge into a navigable Docusaurus site. It is the front door for people who need to understand:

- how the workflows are organized;
- which output contracts consumers can rely on;
- where published reports and tables belong;
- how to begin operating or diagnosing the system;
- what to do during the first minutes of an incident;
- how documentation changes are governed.

It is intentionally separate from the pipelines that ingest documents, build ledgers, calculate metrics, and publish report bundles. Documentation may describe those processes, but it does not execute them.

## Publication surface

The site is configured for:

- **Title:** Accounting Workflows Docs
- **Canonical URL:** <https://accounting-docs.matuteiglesias.link>
- **Documentation route:** `/notes`
- **Primary source directory:** `docs/notes/`

The configured URL identifies the intended publication surface. Check the deployed site independently before treating its availability or contents as current.

## Recommended entrances

Within the documentation site, start with:

1. **Foundations** — system purpose and conceptual model.
2. **Operator start** — practical operating orientation.
3. **Output contracts** — expected files, schemas, and consumer boundaries.
4. **Incident first 15 minutes** — bounded first-response guidance.
5. **Latest outputs / consumer guide** — how downstream users locate published material.

The navigation and footer in `docusaurus.config.ts` encode the current canonical routes.

## Repository boundaries

### This repository owns

- curated accounting-system documentation;
- operator and consumer guidance;
- documentation of output, ledger, debt, and metric contracts;
- report catalogs and publication conventions;
- incident and recovery playbooks;
- the source and configuration of the documentation website.

### This repository does not own

- raw financial or source-document ingestion;
- canonical ledger records;
- transformations or accounting calculations;
- generated professional packs and drilldowns;
- credentials, production runtime state, or private source documents;
- the operational truth that a pipeline or deployment currently succeeds.

When documentation and executable behavior disagree, verify the executable system and then repair the documentation.

## Local development

Requirements:

- Node.js 20 or newer;
- Yarn.

```bash
yarn
yarn start
```

The local development server supports live reload.

Useful checks:

```bash
yarn typecheck
yarn build
yarn serve
```

`yarn build` is the minimum repository-level verification before merging documentation or configuration changes.

## Editing guidance

- Edit documentation under `docs/notes/`.
- Preserve stable routes when other documents or operational procedures link to them.
- Distinguish verified behavior from intended or historical behavior.
- Use exact dates for data cutoffs, deployment checks, and runtime verification.
- Do not commit source documents, secrets, private financial records, or generated report bundles merely to make the docs self-contained.
- Treat generated outputs as downstream evidence, not as hand-maintained documentation.

## Related system

The public workflow repository is [`accounting-workflows`](https://github.com/matuteiglesias/accounting-workflows). This documentation repository describes the broader accounting system but remains a separate publication surface with its own review and build lifecycle.

## Current verification boundary

The Docusaurus configuration, scripts, routes, and documentation structure were inspected for this README update. No accounting pipeline, production deployment, data freshness, or external link availability was executed or asserted as verified.
