import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Sidebar tuned for accounting-workflows docs migration.
 *
 * Important:
 * - docs.path is docs/notes
 * - routeBasePath is /notes
 * - Docusaurus strips number prefixes from doc IDs:
 *   library/00-foundations/00-index.md -> library/foundations/index
 */
const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',

    {
      type: 'category',
      label: 'Foundations',
      link: {
        type: 'doc',
        id: 'library/foundations/index',
      },
      items: [
        'library/foundations/doc-map-by-role',
        'library/foundations/glossary',
        'library/foundations/pipeline-abstractions',
      ],
    },

    {
      type: 'category',
      label: 'Operations',
      link: {
        type: 'doc',
        id: 'library/operations/operator-start-here',
      },
      items: [
        'environment_bootstrap',
        'human_agent_playbook',
        'accounting_spine_runbook',
        'library/operations/environment-bootstrap',
        'library/operations/command-surface',
        'library/operations/run-modes-smoke-vs-run',
        'library/operations/stage-output-checklist',
        'library/operations/incidents-first-15-minutes',
      ],
    },

    {
      type: 'category',
      label: 'Automation',
      link: {
        type: 'doc',
        id: 'library/automation/automation-start-here',
      },
      items: [
        'automation_wiring_spec',
        'library/automation/scheduler-wiring-spec',
        'library/automation/runtime-env-contract',
        'library/automation/cadence-slo-and-alerting',
        'library/automation/recovery-and-rollback',
      ],
    },

    {
      type: 'category',
      label: 'Consumers',
      link: {
        type: 'doc',
        id: 'library/consumers/consumer-start-here',
      },
      items: [
        'human_report_catalog',
        'frontend_snapshot_contract',
        'library/consumers/report-consumer-guide',
        'library/consumers/where-to-find-latest-outputs',
        'library/consumers/common-questions-and-answers',
      ],
    },

    {
      type: 'category',
      label: 'Development',
      link: {
        type: 'doc',
        id: 'library/development/dev-start-here',
      },
      items: [
        'entrypoints',
        'canonical_commands',
        'module_inventory',
        'library/development/refactor-definition-of-done',
        'library/development/contract-change-protocol',
      ],
    },

    {
      type: 'category',
      label: 'Governance',
      link: {
        type: 'doc',
        id: 'library/governance/doc-ownership-and-review',
      },
      items: [
        'docs_frontmatter_contract',
        'documentation_compass',
        'docs_execution_plan',
        'library/governance/doc-freshness-and-drift-checks',
        'library/governance/evidence-map-template',
      ],
    },

    {
      type: 'category',
      label: 'Architecture & Contracts',
      items: [
        'current_state_map',
        'artifact_ladder',
        'contracts',
        'output_contracts',
        'ledger_taxonomy',
        'metric_registry_contract',
        'debt_resolver_contract',
      ],
    },

    {
      type: 'category',
      label: 'Context & Journal',
      items: [
        'narrative',
        'dev_diary',
        'journal',
        'runbook',
      ],
    },
  ],
};

export default sidebars;