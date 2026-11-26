import type { Metadata } from 'next';

import AboutContent from '@/components/About/Sections';
import { SchemaGraph } from '@/components/Schema';
import PageWrapper from '@/components/Template/PageWrapper';
import { t } from '@/data/i18n/ui';
import { aboutMarkdownFor } from '@/data/localized';
import profile from '@/data/profile.json';
import { LANG_TAG, type Lang, localizePath } from '@/lib/i18n';
import { createPageMetadata } from '@/lib/metadata';
import { breadcrumbNode, profilePageNode, SITE_URL } from '@/lib/schema';
import { AUTHOR_NAME } from '@/lib/utils';

const ROLES = `${profile.role_01}, ${profile.role_02}`;

const DESCRIPTION: Record<Lang, string> = {
  en: `Learn about ${AUTHOR_NAME}: ${ROLES} and ${profile.role_03} based in ${profile.currentCity}.`,
  es: `Conoce a ${AUTHOR_NAME}: ${ROLES} y ${profile.role_03} en Madrid, España.`,
};

export function aboutMetadata(lang: Lang): Metadata {
  return createPageMetadata({
    title: t(lang).nav.about,
    description: DESCRIPTION[lang],
    path: '/about/',
    lang,
  });
}

export default function AboutPage({ lang }: { lang: Lang }) {
  const text = t(lang);
  const url = `${SITE_URL}${localizePath('/about/', lang)}`;
  const homeUrl = `${SITE_URL}${localizePath('/', lang)}`;
  const inLanguage = lang === 'en' ? undefined : LANG_TAG[lang];

  return (
    <PageWrapper mainClassName="page-main--about" lang={lang}>
      <SchemaGraph
        nodes={[
          profilePageNode({
            url,
            name: text.nav.about,
            description: DESCRIPTION[lang],
            hasBreadcrumb: true,
            inLanguage,
          }),
          breadcrumbNode(url, [
            { name: lang === 'en' ? 'Home' : 'Inicio', url: homeUrl },
            { name: text.nav.about, url },
          ]),
        ]}
      />
      <section className="about-page">
        <header className="about-header">
          <h1 className="about-title">{text.about.title}</h1>
        </header>
        <p className="about-summary"></p>
        <AboutContent
          markdown={aboutMarkdownFor(lang)}
          navLabel={text.about.sectionsLabel}
        />
      </section>
    </PageWrapper>
  );
}
