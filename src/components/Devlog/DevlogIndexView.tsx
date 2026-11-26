import Link from 'next/link';

import { SchemaGraph } from '@/components/Schema';
import type { DevlogProject } from '@/data/devlog';
import { DEVLOG_PATH, type DevlogEntry, devlogProjectPath } from '@/lib/devlog';
import {
  breadcrumbNode,
  collectionPageNode,
  HOME_URL,
  SITE_URL,
} from '@/lib/schema';

import DevlogList from './DevlogList';

export const DEVLOG_INTRO =
  'Weekly updates on projects in progress: what changed, the design decision behind it, and what comes next.';

interface DevlogIndexViewProps {
  groups: { project: DevlogProject; entries: DevlogEntry[] }[];
}

/** The devlog's front page: each project with visible updates, newest first. */
export default function DevlogIndexView({ groups }: DevlogIndexViewProps) {
  const url = `${SITE_URL}${DEVLOG_PATH}`;

  return (
    <>
      <SchemaGraph
        nodes={[
          collectionPageNode({
            url,
            name: 'Devlog',
            description: DEVLOG_INTRO,
            hasBreadcrumb: true,
          }),
          breadcrumbNode(url, [
            { name: 'Home', url: HOME_URL },
            { name: 'Devlog', url },
          ]),
        ]}
      />
      <article className="writing-page devlog-page">
        <header className="writing-header devlog-header">
          <h1 className="post-title">Devlog</h1>
          <p className="post-description">{DEVLOG_INTRO}</p>
        </header>

        {groups.length === 0 && (
          <p className="devlog-empty">No updates published yet.</p>
        )}

        {groups.map(({ project, entries }) => {
          const headingId = `devlog-${project.id}`;
          return (
            <section
              key={project.id}
              className="writing-group"
              aria-labelledby={headingId}
            >
              <h2 id={headingId} className="writing-section-label">
                <Link href={devlogProjectPath(project.id)}>{project.name}</Link>
              </h2>
              <DevlogList entries={entries} headingLevel={3} />
            </section>
          );
        })}
      </article>
    </>
  );
}
