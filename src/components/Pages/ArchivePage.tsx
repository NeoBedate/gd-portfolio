import type { Metadata } from 'next';

import ArchiveList from '@/components/Archive/ArchiveList';
import { SchemaGraph } from '@/components/Schema';
import PageWrapper from '@/components/Template/PageWrapper';
import { t } from '@/data/i18n/ui';
import { localizeProject } from '@/data/localized';
import data from '@/data/projects';
import { LANG_TAG, type Lang, localizePath } from '@/lib/i18n';
import { createPageMetadata } from '@/lib/metadata';
import { breadcrumbNode, collectionPageNode, SITE_URL } from '@/lib/schema';
import { AUTHOR_NAME } from '@/lib/utils';

const DESCRIPTION: Record<Lang, string> = {
  en: `Early professional and amateur projects from ${AUTHOR_NAME} (2017 and earlier).`,
  es: `Primeros proyectos profesionales y amateur de ${AUTHOR_NAME} (2017 y anteriores).`,
};

export function archiveMetadata(lang: Lang): Metadata {
  return createPageMetadata({
    title: t(lang).archive.title,
    description: DESCRIPTION[lang],
    path: '/archive/',
    lang,
  });
}

export default function ArchivePage({ lang }: { lang: Lang }) {
  const text = t(lang);
  const url = `${SITE_URL}${localizePath('/archive/', lang)}`;
  const homeUrl = `${SITE_URL}${localizePath('/', lang)}`;
  const localized = data.map((p) => localizeProject(p, lang));
  const otherProjects = localized.filter((p) => p.other);
  const learningProjects = localized.filter((p) => p.learning);

  return (
    <PageWrapper mainClassName="page-main--archive" lang={lang}>
      <SchemaGraph
        nodes={[
          collectionPageNode({
            url,
            name: text.archive.title,
            description: DESCRIPTION[lang],
            hasBreadcrumb: true,
            inLanguage: lang === 'en' ? undefined : LANG_TAG[lang],
          }),
          breadcrumbNode(url, [
            { name: lang === 'en' ? 'Home' : 'Inicio', url: homeUrl },
            { name: text.archive.title, url },
          ]),
        ]}
      />
      <section className="projects-archive-page">
        <header className="projects-archive-header">
          <h1 className="page-title">{text.archive.title}</h1>
          <p className="page-subtitle">{text.archive.subtitle}</p>
        </header>

        <ArchiveList
          otherProjects={otherProjects}
          learningProjects={learningProjects}
          lang={lang}
        />
      </section>
    </PageWrapper>
  );
}
