import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {themes as prismThemes} from 'prism-react-renderer';

const githubUrl = 'https://github.com/matuteiglesias/accounting-docs';

const config: Config = {
  title: 'Accounting Workflows Docs',
  tagline: 'Operations, contracts, automation, and reporting playbooks',
  favicon: 'img/favicon.ico',

  url: 'https://accounting-docs.matuteiglesias.link',
  baseUrl: '/',

  organizationName: 'matuteiglesias',
  projectName: 'accounting-docs',

  onBrokenLinks: 'warn',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: 'notes',
          path: 'docs/notes',
          sidebarPath: './sidebars.ts',
          editUrl: `${githubUrl}/tree/main/docs/notes/`,
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',

    colorMode: {
      respectPrefersColorScheme: true,
    },

    navbar: {
      title: 'Accounting Workflows',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/notes/output_contracts',
          label: 'Contracts',
          position: 'left',
        },
        {
          to: '/notes/library/operations/incidents-first-15-minutes',
          label: 'Incidents',
          position: 'left',
        },
        {
          href: githubUrl,
          label: 'GitHub',
          position: 'right',
        },
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Start',
          items: [
            {
              label: 'Start here',
              to: '/notes/library/foundations/index',
            },
            {
              label: 'Operator start',
              to: '/notes/library/operations/operator-start-here',
            },
            {
              label: 'Incident first 15 minutes',
              to: '/notes/library/operations/incidents-first-15-minutes',
            },
          ],
        },
        {
          title: 'Contracts',
          items: [
            {
              label: 'Output contracts',
              to: '/notes/output_contracts',
            },
            {
              label: 'Ledger taxonomy',
              to: '/notes/ledger_taxonomy',
            },
            {
              label: 'Debt resolver',
              to: '/notes/debt_resolver_contract',
            },
            {
              label: 'Metric registry',
              to: '/notes/metric_registry_contract',
            },
          ],
        },
        {
          title: 'Consumers',
          items: [
            {
              label: 'Human reports',
              to: '/notes/human_report_catalog',
            },
            {
              label: 'Latest outputs',
              to: '/notes/library/consumers/where-to-find-latest-outputs',
            },
            {
              label: 'Consumer guide',
              to: '/notes/library/consumers/consumer-start-here',
            },
          ],
        },
        {
          title: 'Project',
          items: [
            {
              label: 'GitHub',
              href: githubUrl,
            },
            {
              label: 'Development diary',
              to: '/notes/dev_diary',
            },
            {
              label: 'Docs governance',
              to: '/notes/docs_frontmatter_contract',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Accounting Workflows`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
