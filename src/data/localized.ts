/**
 * Page content in the language of the page. English is the source; the
 * Spanish files in `es/` hold only the text, and anything they leave out
 * falls back to English.
 */

import type { Lang } from '@/lib/i18n';

import { aboutMarkdown as aboutEn } from './about';
import type { CompanyDetails } from './companies';
import { aboutMarkdown as aboutEs } from './es/about';
import {
  companyDescriptions,
  courseTitles,
  skillCategories,
} from './es/experience';
import * as homeEs from './es/home';
import openToWorkEs from './es/openToWork';
import projectsEs from './es/projects';
import type { Course } from './experience/courses';
import * as homeEn from './home';
import openToWorkEn, { type OpenToWork } from './openToWork';
import type { ProjectDetails } from './projects';

export function homeContent(lang: Lang) {
  const {
    heroTagline,
    featuredGames,
    stats,
    philosophy,
    strengths,
    currently,
  } = homeEn;
  if (lang === 'en') {
    return {
      heroTagline,
      featuredGames,
      stats,
      philosophy,
      strengths,
      currently,
    };
  }

  return {
    heroTagline: homeEs.heroTagline,
    featuredGames: featuredGames.map((game) => ({
      ...game,
      facts: homeEs.featuredFacts[game.projectId] ?? game.facts,
    })),
    stats: homeEs.stats,
    philosophy: homeEs.philosophy,
    strengths: homeEs.strengths,
    currently: homeEs.currently,
  };
}

export function openToWorkFor(lang: Lang): OpenToWork {
  return lang === 'es' ? openToWorkEs : openToWorkEn;
}

export function aboutMarkdownFor(lang: Lang): string {
  return lang === 'es' ? aboutEs : aboutEn;
}

/** A project with its text in the given language. */
export function localizeProject(
  project: ProjectDetails,
  lang: Lang,
): ProjectDetails {
  if (lang === 'en') return project;
  const { videos, sections, ...text } = projectsEs[project.id] ?? {};
  return {
    ...project,
    ...text,
    // Only the text is translated; the files come from the English entry.
    videos: project.videos?.map((video, index) => ({
      ...video,
      ...videos?.[index],
    })),
    sections: project.sections?.map((section, index) => ({
      ...section,
      ...sections?.[index],
    })),
  };
}

/** A company with its description in the given language. */
export function localizeCompany(
  company: CompanyDetails,
  lang: Lang,
): CompanyDetails {
  if (lang === 'en') return company;
  return {
    ...company,
    description: companyDescriptions[company.id] ?? company.description,
  };
}

export function courseTitle(course: Course, lang: Lang): string {
  return lang === 'es'
    ? (courseTitles[course.number] ?? course.title)
    : course.title;
}

/** A skill category's label; the English name stays its key. */
export function skillCategoryLabel(name: string, lang: Lang): string {
  return lang === 'es' ? (skillCategories[name] ?? name) : name;
}
