# Accounting Workflows Documentation

Public operating and contract documentation for the governed accounting workflow estate.

> **Lifecycle:** active documentation and publication surface  
> **Authority:** curated operating guidance, architecture explanations, contract documentation, and documentation-site structure  
> **Not authoritative for:** ledger records, accounting calculations, source documents, viewer implementation, runtime success, or live publication freshness  
> **Architecture/operations evidence reviewed:** 2026-08-25 against `accounting-workflows@b7d2c3a379f966f4d69b56c2df113714a7051452`

## Current system model

The current supported backend spine is:

```text
canonical ledger ingest
  -> governed materialization
       -> semantic flow facts
       -> operating statement
       -> validated cash facts
  -> debt position/activity + treasury
  -> governed monthly frontier + annual dashboard
  -> publication bundle
  -> professional presentation + governed drilldowns
```

Generic `accounting.views` / `run-marts`, the parallel `metric_values` engine, and `accounting.human.*` report authority are retired as current accounting layers. Historical or compatibility references may remain in older pages while the governed-spine documentation refresh proceeds, but they are not current authority.

## Repository boundaries

`matuteiglesias/accounting-workflows` owns canonical transformations, accounting business-rule implementation, governed reporting calculations, professional packs, drilldowns, and publication bundle generation.

`matuteiglesias/accounting-viewer` owns viewer-specific read-only presentation over approved packaged outputs.

This repository, `matuteiglesias/accounting-docs`, owns the published guidance that explains those systems. It does not calculate accounting results and must not invent accounting, legal, ownership, or family-governance meaning.

When documentation conflicts with current executable behavior, current `accounting-workflows` tests, typed contracts, authority modules, Makefile, `AGENTS.md`, and `SYSTEM.yaml` outrank stale prose.

## Publication surface

The site is configured for:

- **Title:** Accounting Workflows Docs
- **Canonical URL:** <https://accounting-docs.matuteiglesias.link>
- **Documentation route:** `/notes`
- **Primary source directory:** `docs/notes/`

The configured URL identifies the intended publication surface. Deployment availability and freshness must be checked independently before being treated as current.

## Recommended entrances

For the current architecture and operations authority, start with:

1. **Start here** — `/notes/intro`
2. **Current state** — `/notes/current_state_map`
3. **Foundations** — `/notes/library/foundations/index`
4. **Operator start** — `/notes/library/operations/operator-start-here`
5. **Accounting spine runbook** — `/notes/accounting_spine_runbook`
6. **Governed-spine truth baseline** — `/notes/library/governance/governed-spine-truth-baseline`
7. **Documentation refresh program** — `/notes/library/governance/governed-spine-docs-refresh-program`

Architecture/foundations and the operator command/runbook surface have been cut over to the governed spine. Artifact contracts, consumer/professional guidance, automation, and historical cleanup remain later bounded waves. Where an older page disagrees, current executable upstream authority controls.

## Local documentation development

Requirements:

- Node.js 20 or newer;
- npm-compatible dependency installation from `package.json` / the repository lockfile.

Useful commands:

```bash
npm run start
npm run typecheck
npm run build
```

The governed refresh protocol requires `npm run typecheck` and `npm run build` before a docs-refresh PR when the execution environment permits them.

## Editing guidance

- Edit documentation under `docs/notes/`.
- Preserve stable public routes unless retirement is explicit and justified.
- Distinguish CURRENT, STALE, HISTORICAL, COMPATIBILITY, INTENDED, and UNKNOWN claims.
- Do not commit source documents, secrets, private financial records, or generated accounting bundles merely to make docs self-contained.
- Treat generated outputs as evidence from a run, not as hand-maintained authority.
- Do not infer legal rights, ownership, negotiation positions, or family intentions from accounting classifications.

## Governance

The governed-spine refresh is controlled by root `AGENTS.md` and:

- `docs/notes/library/90-governance/92-governed-spine-truth-baseline.md`
- `docs/notes/library/90-governance/93-governed-spine-docs-refresh-program.md`
- `docs/notes/library/90-governance/94-autonomous-doc-pr-protocol.md`

The upstream commit above is the factual baseline for the architecture and operator pages checked in the current refresh waves. Future documentation changes must re-check current `accounting-workflows/main` rather than treating that SHA as permanent truth.
