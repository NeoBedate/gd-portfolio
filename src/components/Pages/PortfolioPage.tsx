import type { Metadata } from 'next';

import ProjectList from '@/components/Projects/ProjectList';
import { SchemaGraph } from '@/components/Schema';
import PageWrapper from '@/components/Template/PageWrapper';
import { t } from '@/data/i18n/ui';
import { localizeProject } from '@/data/localized';
import data from '@/data/projects';
import { LANG_TAG, type Lang, localizePath } from '@/lib/i18n';
import { createPageMetadata } from '@/lib/metadata';
import { breadcrumbNode, collectionPageNode, SITE_URL } from '@/lib/schema';

const DESCRIPTION: Record<Lang, string> = {
  en: 'Selected video games where I contributed.',
  es: 'Una selección de los videojuegos en los que he trabajado.',
};

export function portfolioMetadata(lang: Lang): Metadata {
  return createPageMetadata({
    title: t(lang).portfolio.title,
    description: DESCRIPTION[lang],
    path: '/portfolio/',
    lang,
  });
}

export default function PortfolioPage({ lang }: { lang: Lang }) {
  const text = t(lang);
  const url = `${SITE_URL}${localizePath('/portfolio/', lang)}`;
  const homeUrl = `${SITE_URL}${localizePath('/', lang)}`;
  const selectedProjects = data
    .filter((p) => p.selected)
    .map((p) => localizeProject(p, lang));

  return (
    <PageWrapper mainClassName="page-main--portfolio" lang={lang}>
      <SchemaGraph
        nodes={[
          collectionPageNode({
            url,
            name: text.portfolio.title,
            description: DESCRIPTION[lang],
            hasBreadcrumb: true,
            inLanguage: lang === 'en' ? undefined : LANG_TAG[lang],
          }),
          breadcrumbNode(url, [
            { name: lang === 'en' ? 'Home' : 'Inicio', url: homeUrl },
            { name: text.portfolio.title, url },
          ]),
        ]}
      />

      {/* The list reads the language from the URL (useLang). */}
      <ProjectList projects={selectedProjects} />
    </PageWrapper>
  );
}
