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
  eyebrow: string;
};

type SectionCard = {
  title: string;
  desc: string;
  to: string;
  badge?: string;
};

type Principle = {
  title: string;
  body: ReactNode;
};

const quickLinks: QuickLink[] = [
  {
    eyebrow: 'Operate',
    title: 'Start Operating in 15 Minutes',
    description:
      'Bootstrap the environment, run smoke checks, and classify failures without touching internal outputs first.',
    to: '/notes/library/operations/operator-start-here',
    cta: 'Open Operator Start',
  },
  {
    eyebrow: 'Automate',
    title: 'Set Up Periodic Automation',
    description:
      'Use the canonical scheduler, runtime environment, cadence, and recovery contracts for live runs.',
    to: '/notes/library/automation/automation-start-here',
    cta: 'Open Automation Guide',
  },
  {
    eyebrow: 'Consume',
    title: 'Consume Reports Safely',
    description:
      'Find published human reports, metric views, and latest snapshots without depending on backend internals.',
    to: '/notes/library/consumers/consumer-start-here',
    cta: 'Open Consumer Guide',
  },
];

const sectionCards: SectionCard[] = [
  {
    title: 'Foundations',
    desc: 'Vocabulary, role map, and pipeline abstractions for shared context.',
    to: '/notes/library/foundations/index',
  },
  {
    title: 'Operations',
    desc: 'Runbooks, stage checklists, smoke-vs-run modes, and incident-first triage.',
    to: '/notes/library/operations/operator-start-here',
    badge: 'High Impact',
  },
  {
    title: 'Automation',
    desc: 'Scheduler wiring, runtime contracts, cadence/SLO guidance, and recovery playbooks.',
    to: '/notes/library/automation/automation-start-here',
  },
  {
    title: 'Consumers',
    desc: 'Where to find latest outputs and how to answer common business questions safely.',
    to: '/notes/library/consumers/consumer-start-here',
  },
  {
    title: 'Development',
    desc: 'Refactor definition of done, contract-change protocol, and safe extension gates.',
    to: '/notes/library/development/dev-start-here',
    badge: 'Quality Gate',
  },
  {
    title: 'Governance',
    desc: 'Ownership, freshness checks, evidence maps, and documentation drift controls.',
    to: '/notes/library/governance/doc-ownership-and-review',
  },
];

const principles: Principle[] = [
  {
    title: 'Canonical command surface',
    body: (
      <>
        Prefer canonical <code>make</code> targets for operations and automation.
        This keeps docs, scripts, and incident response aligned.
      </>
    ),
  },
  {
    title: 'Consumer-safe boundary',
    body: (
      <>
        Consumers should read published latest outputs. Internal output folders are
        for debugging and forensic analysis only.
      </>
    ),
  },
  {
    title: 'Evidence-driven docs',
    body: (
      <>
        Authority pages should include validated commands, code anchors, and known
        assumptions so docs do not drift from the system.
      </>
    ),
  },
];

function HomepageHeader(): ReactNode {
  const {siteConfig} = useDocusaurusContext();

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroTopline}>
          Accounting Workflows Documentation
        </div>

        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>

        <p className="hero__subtitle">{siteConfig.tagline}</p>

        <div className={styles.heroButtons}>
          <Link
            className="button button--secondary button--lg"
            to="/notes/library/foundations/index">
            Start Here
          </Link>

          <Link
            className="button button--outline button--lg"
            to="/notes/library/operations/incidents-first-15-minutes">
            Incident First 15 Minutes
          </Link>
        </div>

        <p className={styles.heroTopline}>
          Canonical runbooks · Output contracts · Recovery playbooks · Consumer-safe reporting
        </p>
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
          Pick the path that matches your immediate job. Each track points to a
          curated sequence instead of a loose pile of pages.
        </p>

        <div className={styles.grid3}>
          {quickLinks.map((item) => (
            <article key={item.title} className={styles.card}>
              <div className={styles.heroTopline}>{item.eyebrow}</div>

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
          Files can keep numeric prefixes for stable ordering. Routes and labels
          stay clean for humans and downstream consumers.
        </p>

        <div className={styles.grid2}>
          {sectionCards.map((section) => (
            <Link key={section.title} className={styles.mapCard} to={section.to}>
              <div className={styles.mapCardHeader}>
                <Heading as="h3" className={styles.mapCardTitle}>
                  {section.title}
                </Heading>

                {section.badge ? (
                  <span className={styles.badge}>{section.badge}</span>
                ) : null}
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

        <p className={styles.sectionLead}>
          These rules protect the accounting workflow from stale outputs,
          duplicate logic, and confusing downstream artifacts.
        </p>

        <div className={styles.truths}>
          {principles.map((principle) => (
            <article key={principle.title} className={styles.truthCard}>
              <Heading as="h3">{principle.title}</Heading>
              <p>{principle.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta(): ReactNode {
  return (
    <section className={clsx(styles.section, styles.sectionAlt)}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Not sure where to go?
        </Heading>

        <p className={styles.sectionLead}>
          Start with the operator path. It links to the safest commands,
          inspection flow, and recovery sequence.
        </p>

        <div className={styles.heroButtons}>
          <Link
            className="button button--primary button--lg"
            to="/notes/library/operations/operator-start-here">
            Open Operator Start
          </Link>

          <Link
            className="button button--secondary button--lg"
            to="/notes/output_contracts">
            Review Output Contracts
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description="Accounting workflows documentation for operations, automation, output contracts, reporting consumers, and development governance.">
      <HomepageHeader />

      <main>
        <QuickStartGrid />
        <DocumentationMap />
        <OperationalTruths />
        <FinalCta />
      </main>
    </Layout>
  );
}
