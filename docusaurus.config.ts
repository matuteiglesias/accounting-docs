import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {themes as prismThemes} from 'prism-react-renderer';

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
          editUrl:
            'https://github.com/matuteiglesias/accounting-docs/tree/main/docs/notes/',
          showLastUpdateAuthor: false,
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.jpg',
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
          href: 'https://github.com/matuteiglesias/accounting-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Foundations', to: '/notes/library/00-foundations/00-index'},
            {label: 'Operations', to: '/notes/library/10-operations/10-operator-start-here'},
            {label: 'Automation', to: '/notes/library/20-automation/20-automation-start-here'},
            {label: 'Consumers', to: '/notes/library/30-consumers/30-consumer-start-here'},
          ],
        },
        {
          title: 'Project',
          items: [
            {label: 'GitHub', href: 'https://github.com/matuteiglesias/accounting-docs'},
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
