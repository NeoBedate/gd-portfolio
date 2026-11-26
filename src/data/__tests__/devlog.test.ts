import fs from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { DEVLOG_ROOT, getDevlogEntries, parseDevlogEntry } from '@/lib/devlog';
import { isVideo, posterFor } from '@/lib/media';

import devlogProjects, { getDevlogProject } from '../devlog';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

/** Same exact-case check as projects.test.ts: Linux hosting is case-sensitive. */
function existsWithExactCase(publicPath: string): boolean {
  let dir = PUBLIC_DIR;
  for (const segment of publicPath.split('/').filter(Boolean)) {
    if (!fs.existsSync(dir) || !fs.readdirSync(dir).includes(segment)) {
      return false;
    }
    dir = path.join(dir, segment);
  }
  return true;
}

const folders = fs.existsSync(DEVLOG_ROOT)
  ? fs
      .readdirSync(DEVLOG_ROOT, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith('_'))
      .map((entry) => entry.name)
  : [];

// Every update, drafts included, so a broken draft fails here before it is
// ever published.
const entries = folders.flatMap((project) =>
  getDevlogEntries(project, { includeDrafts: true }),
);

/** Local media referenced from Markdown: ![alt](src "caption"). */
function mediaIn(markdown: string): string[] {
  return [...markdown.matchAll(/!\[[^\]]*\]\(\s*([^)\s]+)/g)]
    .map((match) => match[1])
    .filter((src) => src.startsWith('/'));
}

describe('devlog projects', () => {
  it('have unique, URL-safe ids and a name and description', () => {
    const ids = devlogProjects.map((project) => project.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const project of devlogProjects) {
      expect(project.id).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      expect(project.name.trim()).not.toBe('');
      expect(project.description.trim()).not.toBe('');
    }
  });

  it.each(folders)('content/devlog/%s/ has a project entry', (folder) => {
    expect(getDevlogProject(folder)).toBeDefined();
  });
});

describe('devlog template', () => {
  it('parses, so a copy of it starts out valid', () => {
    const source = fs.readFileSync(
      path.join(DEVLOG_ROOT, '_template.md'),
      'utf8',
    );
    const parsed = parseDevlogEntry('ue5-level', 'week-03', source);
    expect(parsed.draft).toBe(true);
  });
});

// Skipped until the first update exists; `it.each` needs at least one row.
describe.skipIf(entries.length === 0)('devlog updates', () => {
  const cases = entries.map(
    (entry) => [`${entry.project}/${entry.slug}`, entry] as const,
  );

  it.each(cases)('%s only uses WebP and MP4 media that exists', (_, entry) => {
    for (const src of mediaIn(entry.content)) {
      expect(src, `${src} should live in /images/devlog/`).toMatch(
        new RegExp(`^/images/devlog/${entry.project}/`),
      );
      expect(src, `${src} should be .webp or .mp4`).toMatch(/\.(webp|mp4)$/);
      expect(existsWithExactCase(src), `${src} is missing`).toBe(true);
      if (isVideo(src)) {
        expect(
          existsWithExactCase(posterFor(src)),
          `${posterFor(src)} is missing`,
        ).toBe(true);
      }
    }
  });

  it('never reuse a week number within a project', () => {
    for (const project of folders) {
      const weeks = entries
        .filter((entry) => entry.project === project)
        .map((entry) => entry.week);
      expect(new Set(weeks).size, `${project} repeats a week`).toBe(
        weeks.length,
      );
    }
  });
});
