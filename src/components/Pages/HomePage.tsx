import type { Metadata } from 'next';

import FeaturedGames from '@/components/Home/FeaturedGames';
import NumbersStrip from '@/components/Home/NumbersStrip';
import WhatIBring from '@/components/Home/WhatIBring';
import { SchemaGraph } from '@/components/Schema';
import Hero from '@/components/Template/Hero';
import PageWrapper from '@/components/Template/PageWrapper';
import { LANG_TAG, type Lang, OG_LOCALE } from '@/lib/i18n';
import { pageAlternates, sharedOpenGraph } from '@/lib/metadata';
import { profilePageNode, SITE_URL } from '@/lib/schema';
import {
  AUTHOR_NAME,
  AUTHOR_ROLE,
  SITE_DESCRIPTION,
  SITE_DESCRIPTION_ES,
  SITE_NAME,
} from '@/lib/utils';

export function homeMetadata(lang: Lang): Metadata {
  // The English homepage builds its openGraph in the root layout, so it only
  // needs the canonical here. `trailingSlash: true` makes `/` the canonical.
  if (lang === 'en') {
    return {
      description: SITE_DESCRIPTION,
      alternates: pageAlternates('/', 'en'),
    };
  }

  const title = `${AUTHOR_NAME} · ${AUTHOR_ROLE}`;
  return {
    title: { absolute: title },
    description: SITE_DESCRIPTION_ES,
    alternates: pageAlternates('/', lang),
    openGraph: {
      ...sharedOpenGraph,
      type: 'website',
      locale: OG_LOCALE[lang],
      url: `${SITE_URL}/es/`,
      siteName: SITE_NAME,
      title,
      description: SITE_DESCRIPTION_ES,
    },
  };
}

export default function HomePage({ lang }: { lang: Lang }) {
  const url = lang === 'en' ? `${SITE_URL}/` : `${SITE_URL}/es/`;

  return (
    <PageWrapper mainClassName="page-main--hero" lang={lang}>
      <SchemaGraph
        nodes={[
          profilePageNode({
            url,
            name: AUTHOR_NAME,
            ...(lang === 'en' ? {} : { inLanguage: LANG_TAG[lang] }),
          }),
        ]}
      />
      <Hero lang={lang} />
      <FeaturedGames lang={lang} />
      <NumbersStrip lang={lang} />
      <WhatIBring lang={lang} />
    </PageWrapper>
  );
}
