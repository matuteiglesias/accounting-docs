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
        'library/consumers/report-consumer-guide',
        'library/consumers/where-to-find-latest-outputs',
        'library/consumers/common-questions-and-answers',
        'frontend_snapshot_contract',
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
        'library/development/refactor-definition-of-done',
        'library/development/contract-change-protocol',
        'entrypoints',
        'canonical_commands',
        'output_contracts',
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
        'library/governance/doc-freshness-and-drift-checks',
        'library/governance/evidence-map-template',
        'documentation_compass',
        'docs_execution_plan',
      ],
    },
    {
      type: 'category',
      label: 'Architecture & Contracts',
      items: [
        'current_state_map',
        'artifact_ladder',
        'accounting_spine_runbook',
        'module_inventory',
        'contracts',
        'automation_wiring_spec',
      ],
    },
    {
      type: 'category',
      label: 'Context & Journal',
      items: [
        'narrative',
        'journal',
        'runbook',
      ],
    },
  ],
};

export default sidebars;
