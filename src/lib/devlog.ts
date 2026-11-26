import fs from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';

/**
 * Weekly development updates for a project that is still being built.
 *
 * Each update is a Markdown file at `content/devlog/<project>/<slug>.md`.
 * The folder name is the project's id, so an update can't be filed under
 * the wrong project by a typo in its frontmatter. Files whose name starts
 * with `_` (the template) are never read.
 *
 * Frontmatter is validated when the site builds: a missing title or a
 * malformed date stops the build with the file's path, rather than
 * shipping a page with "undefined" in it.
 */

export interface DevlogEntry {
  /** Folder name under `content/devlog/`, e.g. `ue5-level`. */
  project: string;
  /** File name without `.md`, e.g. `week-01`. Used in the URL. */
  slug: string;
  /** Week number. 0 is the kickoff post (the plan, before any building). */
  week: number;
  title: string;
  /** Publication date, `YYYY-MM-DD`. */
  date: string;
  /** One or two sentences, shown in lists and in link previews. */
  summary: string;
  /** Hours spent that week, when logged. */
  hours?: number;
  draft: boolean;
  /** The Markdown body. */
  content: string;
}

interface DevlogOptions {
  /** Directory holding one folder per project. Tests point this at fixtures. */
  root?: string;
  /** Defaults to {@link showDrafts}. */
  includeDrafts?: boolean;
}

export const DEVLOG_ROOT = path.join(process.cwd(), 'content/devlog');

const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Drafts render in `npm run dev` and on Vercel preview deployments, so an
 * update can be checked on a pull request's preview before it is published.
 * Production builds leave them out entirely.
 */
export function showDrafts(): boolean {
  return (
    process.env.NODE_ENV === 'development' ||
    process.env.VERCEL_ENV === 'preview'
  );
}

/** Parses and validates one update. Throws, naming the file, on bad input. */
export function parseDevlogEntry(
  project: string,
  slug: string,
  source: string,
): DevlogEntry {
  const file = `content/devlog/${project}/${slug}.md`;
  const fail = (problem: string): never => {
    throw new Error(`${file}: ${problem}`);
  };

  if (!KEBAB.test(project)) {
    fail('the project folder name must be lowercase-kebab-case');
  }
  if (!KEBAB.test(slug)) {
    fail('the file name must be lowercase-kebab-case');
  }

  const { data, content } = matter(source);

  const text = (key: string): string => {
    const value = data[key];
    if (typeof value !== 'string' || value.trim() === '') {
      return fail(`\`${key}\` is required`);
    }
    return value.trim();
  };

  // YAML reads an unquoted 2027-01-08 as a Date, so accept both forms.
  const rawDate: unknown =
    data.date instanceof Date
      ? data.date.toISOString().slice(0, 10)
      : data.date;
  if (
    typeof rawDate !== 'string' ||
    !ISO_DATE.test(rawDate) ||
    Number.isNaN(Date.parse(rawDate))
  ) {
    fail('`date` must be a real date written as YYYY-MM-DD');
  }
  const date = rawDate as string;

  const week: unknown = data.week;
  if (typeof week !== 'number' || !Number.isInteger(week) || week < 0) {
    fail('`week` must be a whole number, 0 or more');
  }

  const hours: unknown = data.hours;
  if (hours !== undefined && (typeof hours !== 'number' || hours < 0)) {
    fail('`hours` must be a number, 0 or more, when given');
  }

  const draft: unknown = data.draft ?? false;
  if (typeof draft !== 'boolean') {
    fail('`draft` must be true or false');
  }

  return {
    project,
    slug,
    week: week as number,
    title: text('title'),
    date,
    summary: text('summary'),
    ...(hours !== undefined ? { hours: hours as number } : {}),
    draft: draft as boolean,
    content: content.trim(),
  };
}

function isPublic(name: string): boolean {
  return !name.startsWith('_') && !name.startsWith('.');
}

/** Project folders that hold at least one visible update. */
export function getDevlogProjects(options: DevlogOptions = {}): string[] {
  const root = options.root ?? DEVLOG_ROOT;
  if (!fs.existsSync(root)) return [];

  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && isPublic(entry.name))
    .map((entry) => entry.name)
    .filter((project) => getDevlogEntries(project, options).length > 0)
    .sort();
}

/**
 * Newest first: by date, then by week for two updates on the same day, then
 * by project and slug so the order never depends on the file system's.
 */
function newestFirst(a: DevlogEntry, b: DevlogEntry): number {
  return (
    b.date.localeCompare(a.date) ||
    b.week - a.week ||
    a.project.localeCompare(b.project) ||
    a.slug.localeCompare(b.slug)
  );
}

/** A project's visible updates, newest first. */
export function getDevlogEntries(
  project: string,
  options: DevlogOptions = {},
): DevlogEntry[] {
  const root = options.root ?? DEVLOG_ROOT;
  const includeDrafts = options.includeDrafts ?? showDrafts();
  const dir = path.join(root, project);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md') && isPublic(file))
    .map((file) =>
      parseDevlogEntry(
        project,
        file.replace(/\.md$/, ''),
        fs.readFileSync(path.join(dir, file), 'utf8'),
      ),
    )
    .filter((entry) => includeDrafts || !entry.draft)
    .sort(newestFirst);
}

/** Every visible update across all projects, newest first. */
export function getAllDevlogEntries(
  options: DevlogOptions = {},
): DevlogEntry[] {
  return getDevlogProjects(options)
    .flatMap((project) => getDevlogEntries(project, options))
    .sort(newestFirst);
}

/** One visible update, or null if it doesn't exist or is an unshown draft. */
export function getDevlogEntry(
  project: string,
  slug: string,
  options: DevlogOptions = {},
): DevlogEntry | null {
  return (
    getDevlogEntries(project, options).find((entry) => entry.slug === slug) ??
    null
  );
}

/** The updates either side of `entry` in its project, in reading order. */
export function getAdjacentEntries(
  entry: DevlogEntry,
  options: DevlogOptions = {},
): { previous: DevlogEntry | null; next: DevlogEntry | null } {
  const entries = getDevlogEntries(entry.project, options);
  const index = entries.findIndex((e) => e.slug === entry.slug);
  if (index === -1) return { previous: null, next: null };

  // The list is newest first, so the older update sits after this one.
  return {
    previous: entries[index + 1] ?? null,
    next: entries[index - 1] ?? null,
  };
}

/** Site path of the devlog index. */
export const DEVLOG_PATH = '/devlog/';

/** Site path of a project's update list, e.g. `/devlog/ue5-level/`. */
export function devlogProjectPath(project: string) {
  return `${DEVLOG_PATH}${project}/` as const;
}

/** Site path of an update, e.g. `/devlog/ue5-level/week-01/`. */
export function devlogEntryPath(entry: Pick<DevlogEntry, 'project' | 'slug'>) {
  return `${devlogProjectPath(entry.project)}${entry.slug}/` as const;
}
