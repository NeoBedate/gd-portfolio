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

interface DevlogProjectViewProps {
  project: DevlogProject;
  entries: DevlogEntry[];
}

/** Every visible update on one project, newest first. */
export default function DevlogProjectView({
  project,
  entries,
}: DevlogProjectViewProps) {
  const url = `${SITE_URL}${devlogProjectPath(project.id)}`;

  return (
    <>
      <SchemaGraph
        nodes={[
          collectionPageNode({
            url,
            name: `${project.name}: weekly updates`,
            description: project.description,
            hasBreadcrumb: true,
          }),
          breadcrumbNode(url, [
            { name: 'Home', url: HOME_URL },
            { name: 'Devlog', url: `${SITE_URL}${DEVLOG_PATH}` },
            { name: project.name, url },
          ]),
        ]}
      />
      <article className="writing-page devlog-page">
        <header className="writing-header devlog-header">
          <p className="devlog-kicker">
            <Link href={DEVLOG_PATH}>Devlog</Link>
          </p>
          <h1 className="post-title">{project.name}</h1>
          <p className="post-description">{project.description}</p>
          {project.caseStudyPath && (
            <p className="devlog-back">
              <Link href={project.caseStudyPath}>Read the case study</Link>
            </p>
          )}
        </header>

        <DevlogList entries={entries} />
      </article>
    </>
  );
}
