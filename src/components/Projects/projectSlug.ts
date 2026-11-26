/** The project id without its sort prefix: '12_tmnt' → 'tmnt'. */
export function projectSlug(id: string): string {
  return id.replace(/^\d+_/, '');
}

/**
 * A link that opens the portfolio with this project's detail panel. Written
 * like the site's other links; the build adds the trailing slash.
 */
export function portfolioHref(id: string): string {
  return `/portfolio#${projectSlug(id)}`;
}
