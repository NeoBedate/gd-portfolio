import fs from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { isVideo, posterFor } from '@/components/Projects/ProjectMedia';

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
    for (const video of project.videos ?? []) {
      paths.push(video.src, video.poster);
    }
    for (const section of project.sections ?? []) {
      if (section.taskImage) paths.push(section.taskImage);
      for (const group of section.gifs) paths.push(...group);
      for (const comparison of section.comparisons ?? []) {
        paths.push(comparison.before, comparison.after);
      }
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

  it('links are absolute URLs with a label', () => {
    for (const project of projects) {
      for (const link of project.links ?? []) {
        expect(link.href, project.id).toMatch(/^https:\/\/.+/);
        expect(link.label.trim(), project.id).not.toBe('');
      }
      if (project.trailer) {
        expect(project.trailer, project.id).toMatch(/^https:\/\/.+/);
      }
    }
  });

  it('gives the case-study cards all three parts', () => {
    for (const project of projects) {
      for (const card of project.problems ?? []) {
        for (const part of [card.problem, card.decision, card.outcome]) {
          expect(part.trim(), project.id).not.toBe('');
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

  it('media is served as WebP stills or MP4 clips, never GIF or PNG', () => {
    // A single GIF here weighed up to 40 MB; see the media conversion PR.
    const heavy = mediaPaths().filter((p) => !/\.(webp|mp4)$/.test(p));

    expect(heavy).toEqual([]);
  });

  it('media filenames are lowercase-kebab-case', () => {
    const badNames = mediaPaths().filter(
      (p) => !/^[a-z0-9]+(-[a-z0-9]+)*\.[a-z0-9]+$/.test(path.basename(p)),
    );

    expect(badNames).toEqual([]);
  });

  it('every clip has a poster next to it', () => {
    const withoutPoster = mediaPaths()
      .filter(isVideo)
      .filter((p) => !existsWithExactCase(posterFor(p)));

    expect(withoutPoster).toEqual([]);
  });

  it('each section pairs gifs with captions', () => {
    for (const project of projects) {
      for (const section of project.sections ?? []) {
        expect(section.captions.length).toBe(section.gifs.length);
      }
    }
  });

  it('gives every selected project its own page slug', () => {
    const slugs = projects.filter((p) => p.selected).map((p) => p.slug);

    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('describes every image and clip on a case study in alt text', () => {
    const hasText = (alt: string | undefined) =>
      typeof alt === 'string' && alt.trim().length > 0;

    for (const project of projects.filter((p) => p.slug)) {
      const images = project.images ?? [];
      expect(project.imageAlts?.length ?? 0, project.id).toBe(images.length);
      expect(project.imageAlts?.every(hasText) ?? true, project.id).toBe(true);

      for (const section of project.sections ?? []) {
        const where = `${project.id}: ${section.task}`;
        for (const comparison of section.comparisons ?? []) {
          expect(hasText(comparison.beforeAlt), where).toBe(true);
          expect(hasText(comparison.afterAlt), where).toBe(true);
          expect(hasText(comparison.caption), where).toBe(true);
        }
        if (section.taskImage) {
          expect(hasText(section.taskImageAlt), where).toBe(true);
        }
        expect(section.alts?.length, where).toBe(section.gifs.length);
        section.gifs.forEach((pair, index) => {
          const alts = section.alts?.[index] ?? [];
          expect(alts.length, `${where} #${index + 1}`).toBe(pair.length);
          expect(alts.every(hasText), `${where} #${index + 1}`).toBe(true);
        });
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
