import type { Metadata } from 'next';

import {
  isTranslatedPath,
  type Lang,
  languageAlternates,
  localizePath,
  OG_LOCALE,
} from './i18n';
import { AUTHOR_NAME, SITE_URL } from './utils';

interface PageMetadataOptions {
  title: string;
  description: string;
  /** The page's English path; the Spanish one is derived from it. */
  path?: `/${string}`;
  lang?: Lang;
}

/**
 * The OpenGraph block every page needs (the title and description that
 * LinkedIn, WhatsApp, Slack… show when a link is shared).
 *
 * No share image is set: none exists in `public/`, and pointing at a missing
 * file gives a broken preview. Add an `images` entry here if one is made.
 *
 * A route-level `openGraph` object replaces the inherited one wholesale
 * rather than merging, so anything omitted here vanishes from that page.
 */
export const sharedOpenGraph: Metadata['openGraph'] = {
  locale: 'en_US',
  siteName: AUTHOR_NAME,
};

/**
 * Canonical URL plus `hreflang` links to the page in every language, for
 * pages that exist in both. Search engines use them to show each visitor
 * the right language.
 */
export function pageAlternates(
  path: `/${string}`,
  lang: Lang,
): Metadata['alternates'] {
  const canonical = new URL(localizePath(path, lang), SITE_URL).toString();
  return isTranslatedPath(path)
    ? { canonical, languages: languageAlternates(SITE_URL, path) }
    : { canonical };
}

export function createPageMetadata({
  title,
  description,
  path,
  lang = 'en',
}: PageMetadataOptions): Metadata {
  const absoluteUrl = path
    ? new URL(localizePath(path, lang), SITE_URL).toString()
    : undefined;
  const pageTitle = `${title} | ${AUTHOR_NAME}`;

  return {
    title,
    description,
    // Canonical is emitted wherever the page has a stable URL. `not-found`
    // passes no path, because a 404 has no canonical route in a static export.
    ...(path ? { alternates: pageAlternates(path, lang) } : {}),
    openGraph: {
      ...sharedOpenGraph,
      locale: OG_LOCALE[lang],
      type: 'website',
      title: pageTitle,
      description,
      ...(absoluteUrl ? { url: absoluteUrl } : {}),
    },
  };
}
