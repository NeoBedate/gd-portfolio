import { describe, expect, it } from 'vitest';

import projects from '../projects';

describe('projects data', () => {
  it('exports an array of projects', () => {
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
  });

  it('each project has required properties', () => {
    for (const project of projects) {
      expect(project).toHaveProperty('title');
      expect(project).toHaveProperty('image');
      expect(project).toHaveProperty('date');
      expect(project).toHaveProperty('summary');

      expect(typeof project.name).toBe('string');
      expect(typeof project.coverImage).toBe('string');
      expect(typeof project.publishingDate).toBe('string');
      expect(typeof project.summary).toBe('string');
    }
  });

  it('project titles are non-empty', () => {
    for (const project of projects) {
      expect(project.name.trim().length).toBeGreaterThan(0);
    }
  });

  // it('project descriptions are non-empty', () => {
  //   for (const project of projects) {
  //     expect(project.desc.trim().length).toBeGreaterThan(0);
  //   }
  // });

  it('image paths start with /', () => {
    for (const project of projects) {
      expect(project.coverImage.startsWith('/')).toBe(true);
    }
  });

  // it('dates are valid date strings', () => {
  //   for (const project of projects) {
  //     const date = new Date(project.publishingDate);
  //     expect(date.toString()).not.toBe('Invalid Date');
  //   }
  // });

  it('links are valid URLs when present', () => {
    const urlRegex = /^https?:\/\/.+/;

    for (const project of projects) {
      if (project.url) {
        expect(project.url).toMatch(urlRegex);
      }
    }
  });

  it('tech is an array when present', () => {
    for (const project of projects) {
      if (project.tech) {
        expect(Array.isArray(project.tech)).toBe(true);
        expect(project.tech.length).toBeGreaterThan(0);
      }
    }
  });

  it('has unique project titles', () => {
    const titles = projects.map((p) => p.name);
    const uniqueTitles = new Set(titles);

    expect(uniqueTitles.size).toBe(titles.length);
  });

  it('featured is boolean when present', () => {
    for (const project of projects) {
      if (project.featured !== undefined) {
        expect(typeof project.featured).toBe('boolean');
      }
    }
  });

  it('has at least one featured project', () => {
    const featured = projects.filter((p) => p.featured);
    expect(featured.length).toBeGreaterThanOrEqual(1);
  });
});
