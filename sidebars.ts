import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Sidebar tuned for accounting-workflows docs migration.
 *
 * Important:
 * - docs.path is docs/notes
 * - routeBasePath is /notes
 * - therefore sidebar doc IDs are relative to docs/notes and do NOT include "notes/"
 */
const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Foundations',
      link: {
        type: 'doc',
        id: 'library/00-foundations/00-index',
      },
      items: [
        'library/00-foundations/01-doc-map-by-role',
        'library/00-foundations/02-glossary',
        'library/00-foundations/03-pipeline-abstractions',
      ],
    },
    {
      type: 'category',
      label: 'Operations',
      link: {
        type: 'doc',
        id: 'library/10-operations/10-operator-start-here',
      },
      items: [
        'environment_bootstrap',
        'human_agent_playbook',
        'library/10-operations/11-environment-bootstrap',
        'library/10-operations/12-command-surface',
        'library/10-operations/13-run-modes-smoke-vs-run',
        'library/10-operations/14-stage-output-checklist',
        'library/10-operations/15-incidents-first-15-minutes',
      ],
    },
    {
      type: 'category',
      label: 'Automation',
      link: {
        type: 'doc',
        id: 'library/20-automation/20-automation-start-here',
      },
      items: [
        'automation_wiring_spec',
        'library/20-automation/21-scheduler-wiring-spec',
        'library/20-automation/22-runtime-env-contract',
        'library/20-automation/23-cadence-slo-and-alerting',
        'library/20-automation/24-recovery-and-rollback',
      ],
    },
    {
      type: 'category',
      label: 'Consumers',
      link: {
        type: 'doc',
        id: 'library/30-consumers/30-consumer-start-here',
      },
      items: [
        'library/30-consumers/31-report-consumer-guide',
        'library/30-consumers/32-where-to-find-latest-outputs',
        'library/30-consumers/33-common-questions-and-answers',
        'frontend_snapshot_contract',
      ],
    },
    {
      type: 'category',
      label: 'Development',
      link: {
        type: 'doc',
        id: 'library/40-development/40-dev-start-here',
      },
      items: [
        'library/40-development/41-refactor-definition-of-done',
        'library/40-development/42-contract-change-protocol',
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
        id: 'library/90-governance/90-doc-ownership-and-review',
      },
      items: [
        'library/90-governance/91-doc-freshness-and-drift-checks',
        'library/90-governance/99-evidence-map-template',
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
