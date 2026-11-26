/**
 * The case-study pages: one per project that has a `slug`, at
 * `/portfolio/<slug>/` (and `/es/portfolio/<slug>/`), in the order the
 * projects appear in `projects.ts`.
 */

import data, { type ProjectDetails } from '@/data/projects';

export { caseStudyPath, legacyHash } from './caseStudyLinks';

/** A project that has its own page. */
export type CaseStudyProject = ProjectDetails & { slug: string };

export function hasCaseStudy(
  project: ProjectDetails,
): project is CaseStudyProject {
  return Boolean(project.slug);
}

/** Every project with a page, in portfolio order. */
export function getCaseStudies(): CaseStudyProject[] {
  return data.filter(hasCaseStudy);
}

export function getCaseStudy(slug: string): CaseStudyProject | undefined {
  return getCaseStudies().find((project) => project.slug === slug);
}

/** The pages before and after this one, for previous/next links. */
export function caseStudyNeighbours(slug: string): {
  previous?: CaseStudyProject;
  next?: CaseStudyProject;
} {
  const all = getCaseStudies();
  const index = all.findIndex((project) => project.slug === slug);
  if (index === -1) return {};
  return { previous: all[index - 1], next: all[index + 1] };
}
