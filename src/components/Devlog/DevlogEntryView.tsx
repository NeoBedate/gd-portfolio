import Link from 'next/link';

import { SchemaGraph } from '@/components/Schema';
import type { DevlogProject } from '@/data/devlog';
import {
  DEVLOG_PATH,
  type DevlogEntry,
  devlogEntryPath,
  devlogProjectPath,
} from '@/lib/devlog';
import {
  breadcrumbNode,
  devlogPostingNode,
  HOME_URL,
  SITE_URL,
  webPageNode,
} from '@/lib/schema';
import { formatDate } from '@/lib/utils';

import DevlogBody from './DevlogBody';
import { weekLabel } from './DevlogList';

interface DevlogEntryViewProps {
  project: DevlogProject;
  entry: DevlogEntry;
  previous: DevlogEntry | null;
  next: DevlogEntry | null;
}

/** One weekly update: header, Markdown body, then links either side. */
export default function DevlogEntryView({
  project,
  entry,
  previous,
  next,
}: DevlogEntryViewProps) {
  const url = `${SITE_URL}${devlogEntryPath(entry)}`;
  const projectPath = devlogProjectPath(project.id);

  return (
    <>
      <SchemaGraph
        nodes={[
          webPageNode({
            url,
            name: entry.title,
            description: entry.summary,
            hasBreadcrumb: true,
          }),
          devlogPostingNode(entry, url),
          breadcrumbNode(url, [
            { name: 'Home', url: HOME_URL },
            { name: 'Devlog', url: `${SITE_URL}${DEVLOG_PATH}` },
            { name: project.name, url: `${SITE_URL}${projectPath}` },
            { name: entry.title, url },
          ]),
        ]}
      />
      <article className="post-page devlog-entry">
        <header className="post-header">
          <p className="devlog-kicker">
            <Link href={projectPath}>{project.name}</Link>
            <span aria-hidden="true">/</span>
            <span>{weekLabel(entry.week)}</span>
            {entry.draft && <span className="devlog-draft">Draft</span>}
          </p>
          <h1 className="post-title">{entry.title}</h1>
          <p className="post-description">{entry.summary}</p>
          <p className="devlog-meta">
            <time dateTime={entry.date}>{formatDate(entry.date)}</time>
            {entry.hours !== undefined && (
              <span>
                {entry.hours} {entry.hours === 1 ? 'hour' : 'hours'} this week
              </span>
            )}
          </p>
        </header>

        <DevlogBody markdown={entry.content} />

        {(previous || next) && (
          <nav className="devlog-pager" aria-label="Other updates">
            {previous && (
              <Link
                href={devlogEntryPath(previous)}
                className="devlog-pager-link devlog-pager-previous"
                rel="prev"
              >
                <span className="devlog-pager-label">
                  ← {weekLabel(previous.week)}
                </span>
                <span className="devlog-pager-title">{previous.title}</span>
              </Link>
            )}
            {next && (
              <Link
                href={devlogEntryPath(next)}
                className="devlog-pager-link devlog-pager-next"
                rel="next"
              >
                <span className="devlog-pager-label">
                  {weekLabel(next.week)} →
                </span>
                <span className="devlog-pager-title">{next.title}</span>
              </Link>
            )}
          </nav>
        )}

        <p className="devlog-back">
          <Link href={projectPath}>All updates on {project.name}</Link>
          {project.caseStudyPath && (
            <Link href={project.caseStudyPath}>Read the case study</Link>
          )}
        </p>
      </article>
    </>
  );
}
