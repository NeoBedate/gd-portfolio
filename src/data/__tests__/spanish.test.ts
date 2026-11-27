import fs from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';
import { TRANSLATED_PATHS } from '@/lib/i18n';
import { aboutMarkdown as aboutEn } from '../about';
import companies from '../companies';
import { aboutMarkdown as aboutEs } from '../es/about';
import {
  companyDescriptions,
  courseTitles,
  skillCategories,
} from '../es/experience';
import * as homeEs from '../es/home';
import openToWorkEs from '../es/openToWork';
import projectsEs from '../es/projects';
import courses from '../experience/courses';
import { categories } from '../experience/skills';
import * as homeEn from '../home';
import openToWorkEn from '../openToWork';
import projects from '../projects';

/**
 * The Spanish files hold only text, keyed to the English data. These tests
 * catch the two ways they drift: a key that no longer exists in English,
 * or a list that gained or lost an item on one side only.
 */
describe('Spanish content', () => {
  it('translates only projects that exist, item for item', () => {
    for (const [id, translation] of Object.entries(projectsEs)) {
      const project = projects.find((p) => p.id === id);
      expect(project, id).toBeDefined();
      if (translation.highlights) {
        expect(translation.highlights, id).toHaveLength(
          project?.highlights.length ?? -1,
        );
      }
      if (translation.videos) {
        expect(translation.videos, id).toHaveLength(
          project?.videos?.length ?? -1,
        );
      }
      // Case-study lists are optional in Spanish, but a translated list
      // must match the English one item for item.
      for (const key of [
        'ownership',
        'context',
        'problems',
        'results',
        'lessons',
      ] as const) {
        if (translation[key]) {
          expect(translation[key], `${id}.${key}`).toHaveLength(
            project?.[key]?.length ?? -1,
          );
        }
      }
    }
  });

  it('translates the text of every video', () => {
    for (const project of projects) {
      if (!project.videos) continue;
      expect(projectsEs[project.id]?.videos, project.id).toHaveLength(
        project.videos.length,
      );
    }
  });

  it('has the highlights of every project shown on Experience', () => {
    for (const project of projects) {
      if (project.highlights.length === 0) continue;
      expect(projectsEs[project.id]?.highlights, project.id).toBeDefined();
    }
  });

  it('describes every company, and only those', () => {
    expect(Object.keys(companyDescriptions).sort()).toEqual(
      companies.map((c) => c.id).sort(),
    );
  });

  it('names every course and every skill category', () => {
    for (const course of courses) {
      expect(courseTitles[course.number], course.number).toBeTruthy();
    }
    for (const category of categories) {
      expect(skillCategories[category.name], category.name).toBeTruthy();
    }
  });

  it('keeps the home page numbers and facts in step with English', () => {
    expect(homeEs.stats.map((s) => s.value)).toEqual(
      homeEn.stats.map((s) => s.value),
    );
    for (const game of homeEn.featuredGames) {
      expect(homeEs.featuredFacts[game.projectId], game.projectId).toHaveLength(
        game.facts.length,
      );
    }
    expect(homeEs.strengths).toHaveLength(homeEn.strengths.length);
    expect(homeEs.currently).toHaveLength(homeEn.currently.length);
    expect(homeEs.heroTagline.cite).toBe(homeEn.heroTagline.cite);
  });

  it('says the same things in Open to work', () => {
    expect(openToWorkEs.highlights).toHaveLength(
      openToWorkEn.highlights.length,
    );
    expect(openToWorkEs.details).toHaveLength(openToWorkEn.details.length);
  });

  it('has the same About sections and links', () => {
    const headings = (md: string) => md.match(/^# .+$/gm) ?? [];
    const links = (md: string) =>
      [...md.matchAll(/\]\((https?:[^)]+)\)/g)].map((m) => m[1]);
    const items = (md: string) => md.match(/^- /gm)?.length;

    expect(headings(aboutEs)).toHaveLength(headings(aboutEn).length);
    expect(headings(aboutEs)[0]).toBe('# Intro');
    expect(links(aboutEs)).toEqual(links(aboutEn));
    expect(items(aboutEs)).toBe(items(aboutEn));
  });

  it('has a Spanish route for every translated page', () => {
    for (const englishPath of TRANSLATED_PATHS) {
      const page = path.join(
        process.cwd(),
        'app',
        'es',
        englishPath,
        'page.tsx',
      );
      expect(fs.existsSync(page), page).toBe(true);
    }
  });
});
