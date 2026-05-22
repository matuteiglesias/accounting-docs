import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

type QuickLink = {
  title: string;
  description: string;
  to: string;
  cta: string;
};

type SectionCard = {
  title: string;
  desc: string;
  to: string;
  badge?: string;
};

const quickLinks: QuickLink[] = [
  {
    title: 'Start Operating in 15 Minutes',
    description:
      'Bootstrap the environment, run smoke checks, and classify failures quickly.',
    to: '/notes/library/10-operations/10-operator-start-here',
    cta: 'Open Operator Start',
  },
  {
    title: 'Set Up Periodic Automation',
    description:
      'Use canonical scheduling wiring for systemd/cron and publish latest snapshots.',
    to: '/notes/library/20-automation/20-automation-start-here',
    cta: 'Open Automation Guide',
  },
  {
    title: 'Consume Reports Safely',
    description:
      'Find human reports, metric views, and debt snapshots without touching internals.',
    to: '/notes/library/30-consumers/30-consumer-start-here',
    cta: 'Open Consumer Guide',
  },
];

const sectionCards: SectionCard[] = [
  {
    title: 'Foundations',
    desc: 'Vocabulary, role map, and pipeline abstractions for shared context.',
    to: '/notes/library/00-foundations/00-index',
  },
  {
    title: 'Operations',
    desc: 'Runbooks, stage checklists, smoke-vs-run modes, and incident-first triage.',
    to: '/notes/library/10-operations/10-operator-start-here',
    badge: 'High Impact',
  },
  {
    title: 'Automation',
    desc: 'Scheduler wiring, env contracts, cadence/SLO guidance, and recovery playbooks.',
    to: '/notes/library/20-automation/20-automation-start-here',
  },
  {
    title: 'Consumers',
    desc: 'Where to find latest outputs and how to answer common business questions.',
    to: '/notes/library/30-consumers/30-consumer-start-here',
  },
  {
    title: 'Development',
    desc: 'Refactor Definition of Done, contract-change protocol, and release gates.',
    to: '/notes/library/40-development/40-dev-start-here',
    badge: 'Quality Gate',
  },
  {
    title: 'Governance',
    desc: 'Ownership, freshness checks, and evidence-map templates to prevent drift.',
    to: '/notes/library/90-governance/90-doc-ownership-and-review',
  },
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroTopline}>Accounting Workflows Documentation</div>
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>

        <div className={styles.heroButtons}>
          <Link className="button button--secondary button--lg" to="/notes/library/00-foundations/00-index">
            Start Here
          </Link>
          <Link className="button button--outline button--lg" to="/notes/library/10-operations/15-incidents-first-15-minutes">
            Incident First 15 Minutes
          </Link>
        </div>
      </div>
    </header>
  );
}

function QuickStartGrid(): ReactNode {
  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Quick Start by Intent
        </Heading>
        <p className={styles.sectionLead}>
          Pick the path that matches your immediate need. Each track links to a curated runbook sequence.
        </p>

        <div className={styles.grid3}>
          {quickLinks.map((item) => (
            <article key={item.title} className={styles.card}>
              <Heading as="h3" className={styles.cardTitle}>
                {item.title}
              </Heading>
              <p className={styles.cardText}>{item.description}</p>
              <Link className="button button--primary button--sm" to={item.to}>
                {item.cta}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DocumentationMap(): ReactNode {
  return (
    <section className={clsx(styles.section, styles.sectionAlt)}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Documentation Library Map
        </Heading>
        <p className={styles.sectionLead}>
          Numbered sections from 00 to 99 keep navigation stable as docs grow. Use this map as your control panel.
        </p>

        <div className={styles.grid2}>
          {sectionCards.map((section) => (
            <Link key={section.title} className={styles.mapCard} to={section.to}>
              <div className={styles.mapCardHeader}>
                <Heading as="h3" className={styles.mapCardTitle}>
                  {section.title}
                </Heading>
                {section.badge ? <span className={styles.badge}>{section.badge}</span> : null}
              </div>
              <p className={styles.mapCardText}>{section.desc}</p>
              <span className={styles.mapCardCta}>Open section →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function OperationalTruths(): ReactNode {
  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Operational Truths
        </Heading>

        <div className={styles.truths}>
          <article className={styles.truthCard}>
            <Heading as="h3">Canonical command surface</Heading>
            <p>
              Prefer canonical <code>make</code> targets for operations and automation. This keeps docs, scripts, and incident response aligned.
            </p>
          </article>

          <article className={styles.truthCard}>
            <Heading as="h3">Consumer-safe boundary</Heading>
            <p>
              Consumers should read published latest outputs. Use internal output folders for debugging and forensic analysis only.
            </p>
          </article>

          <article className={styles.truthCard}>
            <Heading as="h3">Evidence-driven docs</Heading>
            <p>
              Every authority page should include commands validated, code anchors, and known assumptions to reduce drift.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Accounting workflows docs for operations, automation, reporting consumers, and development governance.">
      <HomepageHeader />
      <main>
        <QuickStartGrid />
        <DocumentationMap />
        <OperationalTruths />
      </main>
    </Layout>
  );
}
