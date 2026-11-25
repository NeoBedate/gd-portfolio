import type { Metadata } from 'next';

import { AUTHOR_NAME, SITE_URL } from './utils';

interface PageMetadataOptions {
  title: string;
  description: string;
  path?: `/${string}`;
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

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataOptions): Metadata {
  const absoluteUrl = path ? new URL(path, SITE_URL).toString() : undefined;
  const pageTitle = `${title} | ${AUTHOR_NAME}`;

  return {
    title,
    description,
    // Canonical is emitted wherever the page has a stable URL. `not-found`
    // passes no path, because a 404 has no canonical route in a static export.
    ...(absoluteUrl ? { alternates: { canonical: absoluteUrl } } : {}),
    openGraph: {
      ...sharedOpenGraph,
      type: 'website',
      title: pageTitle,
      description,
      ...(absoluteUrl ? { url: absoluteUrl } : {}),
    },
  };
}
