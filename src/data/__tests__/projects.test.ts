import fs from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import companies from '../companies';
import projects from '../projects';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

/**
 * True only when the file exists with exactly this casing. Windows and macOS
 * ignore case, but the Linux host serving the site does not, so
 * `FireRealm.PNG` on disk and `FireRealm.png` in code works locally and 404s
 * in production. Comparing against the directory listing catches that.
 */
function existsWithExactCase(publicPath: string): boolean {
  const segments = publicPath.split('/').filter(Boolean);
  let dir = PUBLIC_DIR;
  for (const segment of segments) {
    if (!fs.existsSync(dir) || !fs.readdirSync(dir).includes(segment)) {
      return false;
    }
    dir = path.join(dir, segment);
  }
  return true;
}

function mediaPaths(): string[] {
  const paths: string[] = [];
  for (const project of projects) {
    if (project.coverImage) paths.push(project.coverImage);
    paths.push(...(project.images ?? []));
    for (const section of project.sections ?? []) {
      if (section.taskImage) paths.push(section.taskImage);
      for (const group of section.gifs) paths.push(...group);
    }
  }
  for (const company of companies) {
    if (company.logo) paths.push(company.logo);
  }
  return paths;
}

describe('projects data', () => {
  it('exports an array of projects', () => {
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
  });

  it('each project has the required properties', () => {
    for (const project of projects) {
      expect(typeof project.id).toBe('string');
      expect(typeof project.name).toBe('string');
      expect(typeof project.position).toBe('string');
      expect(typeof project.coverImage).toBe('string');
      expect(Array.isArray(project.highlights)).toBe(true);
    }
  });

  it('has unique ids and names', () => {
    const ids = projects.map((p) => p.id);
    const names = projects.map((p) => p.name);

    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(names).size).toBe(names.length);
  });

  it('project names are non-empty', () => {
    for (const project of projects) {
      expect(project.name.trim().length).toBeGreaterThan(0);
    }
  });

  it('links are absolute URLs or in-page anchors when present', () => {
    for (const project of projects) {
      for (const link of [project.url, project.steamUrl, project.trailer]) {
        if (link) {
          expect(link).toMatch(/^(https?:\/\/.+|#.+)$/);
        }
      }
    }
  });

  it('media paths are root-relative', () => {
    for (const mediaPath of mediaPaths()) {
      expect(mediaPath.startsWith('/')).toBe(true);
    }
  });

  it('every media file exists in public/ with matching case', () => {
    const missing = mediaPaths().filter((p) => !existsWithExactCase(p));

    expect(missing).toEqual([]);
  });

  it('each section pairs gifs with captions', () => {
    for (const project of projects) {
      for (const section of project.sections ?? []) {
        expect(section.captions.length).toBe(section.gifs.length);
      }
    }
  });

  it('tech is a non-empty array when present', () => {
    for (const project of projects) {
      if (project.tech) {
        expect(Array.isArray(project.tech)).toBe(true);
        expect(project.tech.length).toBeGreaterThan(0);
      }
    }
  });

  it('has at least one selected project', () => {
    expect(projects.some((p) => p.selected)).toBe(true);
  });

  it('contains no text left over from the site template', () => {
    const text = JSON.stringify(projects);

    for (const leftover of ['red-teaming', 'Plaid API', 'MongoDB']) {
      expect(text).not.toContain(leftover);
    }
  });
});
