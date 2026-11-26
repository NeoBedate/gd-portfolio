import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import {
  devlogEntryPath,
  getAdjacentEntries,
  getAllDevlogEntries,
  getDevlogEntries,
  getDevlogEntry,
  getDevlogProjects,
  parseDevlogEntry,
} from '../devlog';

function entry(fields: Record<string, string | number | boolean>, body = '') {
  const yaml = Object.entries(fields)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join('\n');
  return `---\n${yaml}\n---\n\n${body}\n`;
}

const base = {
  title: 'Week 1: Blockout',
  date: '2027-01-08',
  week: 1,
  summary: 'First pass of the main route.',
};

describe('parseDevlogEntry', () => {
  it('reads the frontmatter and body', () => {
    const parsed = parseDevlogEntry(
      'ue5-level',
      'week-01',
      entry({ ...base, hours: 12 }, '## What changed\n\nA lot.'),
    );

    expect(parsed).toEqual({
      project: 'ue5-level',
      slug: 'week-01',
      week: 1,
      title: 'Week 1: Blockout',
      date: '2027-01-08',
      summary: 'First pass of the main route.',
      hours: 12,
      draft: false,
      content: '## What changed\n\nA lot.',
    });
  });

  it('accepts an unquoted YAML date', () => {
    const source =
      '---\ntitle: T\ndate: 2027-01-08\nweek: 0\nsummary: S\n---\n';
    expect(parseDevlogEntry('p', 'week-00', source).date).toBe('2027-01-08');
  });

  it.each([
    ['title', { ...base, title: '' }, /`title` is required/],
    ['summary', { ...base, summary: undefined }, /`summary` is required/],
    ['date format', { ...base, date: '08/01/2027' }, /`date` must be/],
    ['impossible date', { ...base, date: '2027-13-40' }, /`date` must be/],
    ['week', { ...base, week: 1.5 }, /`week` must be/],
    ['negative week', { ...base, week: -1 }, /`week` must be/],
    ['hours', { ...base, hours: 'lots' }, /`hours` must be/],
    ['draft', { ...base, draft: 'yes' }, /`draft` must be/],
  ])('rejects a bad %s, naming the file', (_, fields, message) => {
    const clean = Object.fromEntries(
      Object.entries(fields).filter(([, v]) => v !== undefined),
    ) as Record<string, string | number | boolean>;

    expect(() =>
      parseDevlogEntry('ue5-level', 'week-01', entry(clean)),
    ).toThrow(message);
    expect(() =>
      parseDevlogEntry('ue5-level', 'week-01', entry(clean)),
    ).toThrow('content/devlog/ue5-level/week-01.md');
  });

  it('rejects names that would make awkward URLs', () => {
    expect(() => parseDevlogEntry('UE5 Level', 'week-01', entry(base))).toThrow(
      /project folder/,
    );
    expect(() => parseDevlogEntry('ue5-level', 'Week_01', entry(base))).toThrow(
      /file name/,
    );
  });
});

describe('reading content/devlog', () => {
  let root: string;

  beforeAll(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'devlog-'));
    const level = path.join(root, 'ue5-level');
    const empty = path.join(root, 'only-drafts');
    fs.mkdirSync(level);
    fs.mkdirSync(empty);
    fs.mkdirSync(path.join(root, '_scratch'));

    fs.writeFileSync(
      path.join(level, 'week-00.md'),
      entry({ ...base, title: 'Week 0', week: 0, date: '2027-01-01' }),
    );
    fs.writeFileSync(path.join(level, 'week-01.md'), entry(base));
    fs.writeFileSync(
      path.join(level, 'week-02.md'),
      entry({
        ...base,
        title: 'Week 2',
        week: 2,
        date: '2027-01-15',
        draft: true,
      }),
    );
    fs.writeFileSync(path.join(level, '_template.md'), 'not frontmatter');
    fs.writeFileSync(path.join(level, 'notes.txt'), 'ignored');
    fs.writeFileSync(
      path.join(empty, 'week-01.md'),
      entry({ ...base, draft: true }),
    );
  });

  afterAll(() => {
    fs.rmSync(root, { recursive: true, force: true });
  });

  it('lists published updates newest first, skipping drafts and the template', () => {
    const entries = getDevlogEntries('ue5-level', {
      root,
      includeDrafts: false,
    });
    expect(entries.map((e) => e.slug)).toEqual(['week-01', 'week-00']);
  });

  it('includes drafts when asked', () => {
    const entries = getDevlogEntries('ue5-level', {
      root,
      includeDrafts: true,
    });
    expect(entries.map((e) => e.slug)).toEqual([
      'week-02',
      'week-01',
      'week-00',
    ]);
  });

  it('only lists projects with something to show', () => {
    expect(getDevlogProjects({ root, includeDrafts: false })).toEqual([
      'ue5-level',
    ]);
    expect(getDevlogProjects({ root, includeDrafts: true })).toEqual([
      'only-drafts',
      'ue5-level',
    ]);
  });

  it('merges every project into one newest-first list', () => {
    const all = getAllDevlogEntries({ root, includeDrafts: true });
    // Same date and week: project name breaks the tie.
    expect(all.map((e) => `${e.project}/${e.slug}`)).toEqual([
      'ue5-level/week-02',
      'only-drafts/week-01',
      'ue5-level/week-01',
      'ue5-level/week-00',
    ]);
  });

  it('hides an unpublished draft from direct lookup', () => {
    expect(
      getDevlogEntry('ue5-level', 'week-02', { root, includeDrafts: false }),
    ).toBeNull();
    expect(
      getDevlogEntry('ue5-level', 'week-02', { root, includeDrafts: true }),
    ).not.toBeNull();
    expect(getDevlogEntry('missing', 'week-01', { root })).toBeNull();
  });

  it('finds the previous and next update in reading order', () => {
    const options = { root, includeDrafts: false };
    const first = getDevlogEntry('ue5-level', 'week-00', options);
    const second = getDevlogEntry('ue5-level', 'week-01', options);
    if (!first || !second) throw new Error('fixtures missing');

    expect(getAdjacentEntries(first, options)).toEqual({
      previous: null,
      next: second,
    });
    expect(getAdjacentEntries(second, options)).toEqual({
      previous: first,
      next: null,
    });
  });

  it('returns nothing for a root that does not exist', () => {
    const missing = path.join(root, 'nope');
    expect(getDevlogProjects({ root: missing })).toEqual([]);
    expect(getAllDevlogEntries({ root: missing })).toEqual([]);
  });
});

describe('devlogEntryPath', () => {
  it('builds a trailing-slash URL to match the static export', () => {
    expect(devlogEntryPath({ project: 'ue5-level', slug: 'week-01' })).toBe(
      '/devlog/ue5-level/week-01/',
    );
  });
});
