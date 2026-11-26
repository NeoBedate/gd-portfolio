import type { MetadataRoute } from 'next';

import {
  DEVLOG_PATH,
  devlogEntryPath,
  devlogProjectPath,
  getAllDevlogEntries,
  getDevlogProjects,
} from '@/lib/devlog';
import { SITE_URL } from '@/lib/utils';

export const dynamic = 'force-static';

/**
 * Published devlog pages. None until the first update is out: the index
 * builds regardless but stays unlisted (and noindex) while it is empty.
 */
function devlogPages(): MetadataRoute.Sitemap {
  const entries = getAllDevlogEntries({ includeDrafts: false });
  if (entries.length === 0) return [];

  return [
    {
      url: `${SITE_URL}${DEVLOG_PATH}`,
      lastModified: entries[0].date,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    ...getDevlogProjects({ includeDrafts: false }).map((project) => ({
      url: `${SITE_URL}${devlogProjectPath(project)}`,
      lastModified: entries.find((entry) => entry.project === project)?.date,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
    ...entries.map((entry) => ({
      url: `${SITE_URL}${devlogEntryPath(entry)}`,
      lastModified: entry.date,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    })),
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/about/`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/experience/`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/portfolio/`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/archive/`,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact/`,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    ...devlogPages(),
  ];
}
