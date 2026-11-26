/**
 * Case-study URLs, with no data import, so client components can use them
 * without bundling `projects.ts`. Data lookups live in `caseStudies.ts`.
 */

/** The English path of a case study, e.g. `/portfolio/tmnt-mutants-unleashed/`. */
export function caseStudyPath(slug: string): `/${string}/` {
  return `/portfolio/${slug}/`;
}

/**
 * Before the pages existed, a game opened in a panel on `/portfolio/` from a
 * hash made of its id without the sort prefix (`/portfolio/#dragons`). Those
 * links may live on in CVs and messages, so the portfolio still follows them.
 */
export function legacyHash(id: string): string {
  return id.replace(/^\d+_/, '');
}
