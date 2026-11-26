import type { MetadataRoute } from 'next';

import { caseStudyPath, getCaseStudies } from '@/lib/caseStudies';
import {
  DEVLOG_PATH,
  devlogEntryPath,
  devlogProjectPath,
  getAllDevlogEntries,
  getDevlogProjects,
} from '@/lib/devlog';
import {
  LANGS,
  languageAlternates,
  localizePath,
  type TRANSLATED_PATHS,
} from '@/lib/i18n';
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

/** The pages that exist in English and Spanish, with their weights. */
const TRANSLATED_PAGES: Array<{
  path: (typeof TRANSLATED_PATHS)[number];
  changeFrequency: 'monthly' | 'yearly';
  priority: number;
}> = [
  { path: '/', changeFrequency: 'monthly', priority: 1 },
  { path: '/about/', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/experience/', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/portfolio/', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/archive/', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/contact/', changeFrequency: 'yearly', priority: 0.5 },
];

/**
 * Each page in both languages. Every entry lists all its language versions,
 * which is how search engines learn that `/about/` and `/es/about/` are the
 * same page.
 */
function translatedPages(): MetadataRoute.Sitemap {
  return LANGS.flatMap((lang) =>
    TRANSLATED_PAGES.map(({ path, changeFrequency, priority }) => ({
      url: `${SITE_URL}${localizePath(path, lang)}`,
      changeFrequency,
      priority,
      alternates: { languages: languageAlternates(SITE_URL, path) },
    })),
  );
}

/** Each case study (`/portfolio/<slug>/`) in both languages. */
function caseStudyPages(): MetadataRoute.Sitemap {
  return LANGS.flatMap((lang) =>
    getCaseStudies().map(({ slug }) => {
      const path = caseStudyPath(slug);
      return {
        url: `${SITE_URL}${localizePath(path, lang)}`,
        changeFrequency: 'monthly' as const,
        priority: 0.9,
        alternates: { languages: languageAlternates(SITE_URL, path) },
      };
    }),
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [...translatedPages(), ...caseStudyPages(), ...devlogPages()];
}
