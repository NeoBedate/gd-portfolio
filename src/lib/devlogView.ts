import { type DevlogProject, getDevlogProject } from '@/data/devlog';
import {
  type DevlogEntry,
  getAdjacentEntries,
  getAllDevlogEntries,
  getDevlogEntries,
  getDevlogEntry,
  getDevlogProjects,
} from '@/lib/devlog';

/**
 * What the single `/devlog/[[...path]]` route renders at each depth:
 * `/devlog/`, `/devlog/<project>/` and `/devlog/<project>/<update>/`.
 *
 * One optional catch-all route rather than three files because a static
 * export refuses a dynamic route that generates no pages, which is the state
 * before the first update is published. The catch-all always generates the
 * index, so the site builds with an empty devlog.
 */
export type DevlogView =
  | {
      kind: 'index';
      groups: { project: DevlogProject; entries: DevlogEntry[] }[];
    }
  | { kind: 'project'; project: DevlogProject; entries: DevlogEntry[] }
  | {
      kind: 'entry';
      project: DevlogProject;
      entry: DevlogEntry;
      previous: DevlogEntry | null;
      next: DevlogEntry | null;
    };

/** Every path the route builds: the index, then projects, then updates. */
export function devlogStaticParams(): { path: string[] }[] {
  return [
    { path: [] },
    ...getDevlogProjects().map((project) => ({ path: [project] })),
    ...getAllDevlogEntries().map(({ project, slug }) => ({
      path: [project, slug],
    })),
  ];
}

/** The view for a path, or null when nothing visible lives there. */
export function resolveDevlogView(path: string[] = []): DevlogView | null {
  const [projectId, slug, ...rest] = path;
  if (rest.length > 0) return null;

  if (!projectId) {
    const groups = getDevlogProjects().flatMap((id) => {
      const project = getDevlogProject(id);
      return project ? [{ project, entries: getDevlogEntries(id) }] : [];
    });
    return { kind: 'index', groups };
  }

  const project = getDevlogProject(projectId);
  if (!project) return null;

  if (!slug) {
    const entries = getDevlogEntries(projectId);
    return entries.length > 0 ? { kind: 'project', project, entries } : null;
  }

  const entry = getDevlogEntry(projectId, slug);
  if (!entry) return null;
  return { kind: 'entry', project, entry, ...getAdjacentEntries(entry) };
}
