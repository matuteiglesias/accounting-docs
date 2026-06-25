---
title: "Docs Frontmatter Contract"
sidebar_label: "Frontmatter contract"
sidebar_position: 23
description: "Governance contract for Docusaurus frontmatter, clean routes, sidebar labels, doc types, and link hygiene."
doc_type: "contract"
---

# Docs Frontmatter Contract

This document defines the frontmatter and link hygiene rules for the accounting documentation site.

The goal is not to add metadata for its own sake. The goal is to make the docs navigable, stable, and safe for humans and agents.

## Required frontmatter

Every owned documentation page under `docs/notes` should have exactly these core fields:

```yaml
---
title: "Human Title"
sidebar_label: "Short label"
sidebar_position: 10
description: "One sentence explaining what this page is for."
doc_type: "contract"
---
```

## Field meanings

| Field              | Meaning                   |
| ------------------ | ------------------------- |
| `title`            | Human-readable page title |
| `sidebar_label`    | Short sidebar label       |
| `sidebar_position` | Ordering signal           |
| `description`      | One-sentence purpose      |
| `doc_type`         | Governance category       |

## Allowed `doc_type` values

Use a small vocabulary.

| Value       | Meaning                                                |
| ----------- | ------------------------------------------------------ |
| `guide`     | How to navigate or understand an area                  |
| `runbook`   | Operational steps for running or recovering the system |
| `contract`  | Stable rules that downstream code/docs should respect  |
| `reference` | Catalog, command list, glossary, or factual map        |
| `inventory` | List of modules, artifacts, or system parts            |
| `checklist` | Review or validation checklist                         |
| `playbook`  | Human/agent operating guidance                         |
| `narrative` | Explanatory story or system framing                    |
| `journal`   | Chronological development record                       |
| `plan`      | Execution plan or roadmap                              |
| `template`  | Reusable structure                                     |
| `faq`       | Question-and-answer page                               |
| `index`     | Section index                                          |

Do not add new values casually. If a page does not fit, prefer `guide`, `reference`, or `contract`.

## Title and sidebar rules

Titles and sidebar labels should be human-facing.

Do not use numeric filesystem prefixes in titles:

```yaml
# Bad
title: "10 operator start here"
sidebar_label: "10 operator start here"

# Good
title: "Operator Start Here"
sidebar_label: "Start here"
```

The filesystem may keep numeric prefixes for order:

```text
docs/notes/library/10-operations/10-operator-start-here.md
```

But URLs and visible labels should be clean.

## Link rules

Prefer generated clean routes over physical file paths.

Use:

```md
[Operator Start Here](/notes/library/operations/operator-start-here)
```

Avoid:

```md
[Operator Start Here](../10-operations/10-operator-start-here.md)
```

Avoid raw links to numbered physical folders:

```text
/notes/library/00-foundations/00-index
/notes/library/10-operations/10-operator-start-here
/notes/library/20-automation/20-automation-start-here
/notes/library/30-consumers/30-consumer-start-here
```

Use the clean generated routes instead:

```text
/notes/library/foundations/index
/notes/library/operations/operator-start-here
/notes/library/automation/automation-start-here
/notes/library/consumers/consumer-start-here
```

## Slug policy

Do not add `slug` unless there is a specific reason.

Docusaurus already produces clean routes for the current library pages.

Add a slug only when:

* preserving an old public URL;
* resolving a collision;
* creating a deliberate stable contract path.

## Blog and sample content

The default Docusaurus sample blog and sample markdown page are not part of the accounting documentation contract.

They should either be removed or clearly treated as scaffold content.

Owned accounting docs live under:

```text
docs/notes
```

## Review checks

Use these checks before deploy.

### Missing governed fields

```bash
for key in title sidebar_label sidebar_position description doc_type; do
  echo
  echo "Missing $key:"
  find docs/notes -type f \( -name '*.md' -o -name '*.mdx' \) -print0 \
    | sort -z \
    | while IFS= read -r -d '' f; do
        awk -v key="$key" '
          BEGIN { in_fm=0; has=0 }
          NR==1 && $0=="---" { in_fm=1; next }
          in_fm && $0=="---" { exit }
          in_fm && $0 ~ "^" key ":" { has=1 }
          END { if (!has) print FILENAME }
        ' "$f"
      done
done
```

### Numeric visible labels

```bash
rg -n '^(title|sidebar_label): "[0-9]{2} ' docs/notes
```

### Legacy physical links

```bash
rg -n '00-foundations/00-index|10-operations/10-operator-start-here|20-automation/20-automation-start-here|30-consumers/30-consumer-start-here' docs src
```

### Build

```bash
npm run build
```

## Governance rule

A documentation change should update this contract if it introduces:

* a new `doc_type`;
* a new public route convention;
* a new required frontmatter field;
* a new documentation section;
* a new class of generated docs;
* a new source of links into generated artifacts.

## Related docs

* `/notes/documentation_compass`
* `/notes/docs_execution_plan`
* `/notes/dev_diary`
* `/notes/output_contracts`