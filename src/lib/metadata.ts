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
 * The link-preview image, the same in both languages. Its source is
 * `scripts/og-card.html`; keep the file under 300 KB, or WhatsApp drops it
 * and shows no preview at all.
 */
export const SHARE_IMAGE = {
  url: '/images/og-image.png',
  width: 1200,
  height: 630,
  alt: `${AUTHOR_NAME}: Lead Level Designer, Game Designer and Producer. TMNT: Mutants Unleashed, DreamWorks Dragons: Legends of the Nine Realms and DreamWorks Spirit: Lucky's Big Adventure.`,
};

/**
 * The OpenGraph block every page needs (the title, description and image
 * that LinkedIn, WhatsApp, Slack… show when a link is shared).
 *
 * A route-level `openGraph` object replaces the inherited one wholesale
 * rather than merging, so anything omitted here vanishes from that page.
 */
export const sharedOpenGraph: Metadata['openGraph'] = {
  locale: 'en_US',
  siteName: AUTHOR_NAME,
  images: [SHARE_IMAGE],
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
