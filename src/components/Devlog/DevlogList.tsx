import Link from 'next/link';

import { getDevlogProject } from '@/data/devlog';
import { type DevlogEntry, devlogEntryPath } from '@/lib/devlog';
import { formatDate } from '@/lib/utils';

/** "Kickoff" for week 0, then "Week 01", "Week 02"… so the gutter lines up. */
export function weekLabel(week: number): string {
  return week === 0 ? 'Kickoff' : `Week ${String(week).padStart(2, '0')}`;
}

interface DevlogListProps {
  entries: DevlogEntry[];
  /** Name each update's project, for a list that mixes projects. */
  showProject?: boolean;
  /** Level of each update's title, so the list fits the page's outline. */
  headingLevel?: 2 | 3;
}

/**
 * Updates as dated rows, newest first: the week and date in the gutter, the
 * title and summary beside them. Shares the Writing list's styles, since
 * both are dated entries. A case-study page can render this with a
 * project's updates.
 */
export default function DevlogList({
  entries,
  showProject = false,
  headingLevel = 2,
}: DevlogListProps) {
  const Title = `h${headingLevel}` as const;

  return (
    <ol className="writing-list devlog-list">
      {entries.map((entry) => (
        <li key={`${entry.project}/${entry.slug}`}>
          <Link href={devlogEntryPath(entry)} className="writing-item">
            <span className="writing-meta">
              <span className="writing-date devlog-week">
                {weekLabel(entry.week)}
                {entry.draft && <span className="devlog-draft">Draft</span>}
              </span>
              <time className="writing-source" dateTime={entry.date}>
                {formatDate(entry.date)}
              </time>
            </span>
            <Title className="writing-title">
              {showProject && (
                <span className="devlog-list-project">
                  {getDevlogProject(entry.project)?.name ?? entry.project}
                </span>
              )}
              {entry.title}
            </Title>
            <span className="writing-description">{entry.summary}</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
