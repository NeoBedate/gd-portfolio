import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import CaseStudyFacts from '@/components/CaseStudy/CaseStudyFacts';
import CaseStudyList from '@/components/CaseStudy/CaseStudyList';
import CaseStudyPager from '@/components/CaseStudy/CaseStudyPager';
import CaseStudyRole from '@/components/CaseStudy/CaseStudyRole';
import CaseStudySection from '@/components/CaseStudy/CaseStudySection';
import ProblemCards from '@/components/CaseStudy/ProblemCards';
import ProjectVideoPlayer from '@/components/CaseStudy/ProjectVideoPlayer';
import ScreenshotViewer from '@/components/CaseStudy/ScreenshotViewer';
import { SchemaGraph } from '@/components/Schema';
import PageWrapper from '@/components/Template/PageWrapper';
import { t } from '@/data/i18n/ui';
import { localizeProject } from '@/data/localized';
import type { ProjectDetails } from '@/data/projects';
import {
  caseStudyNeighbours,
  caseStudyPath,
  getCaseStudies,
  getCaseStudy,
} from '@/lib/caseStudies';
import { LANG_TAG, type Lang, localizePath } from '@/lib/i18n';
import { createPageMetadata } from '@/lib/metadata';
import { breadcrumbNode, SITE_URL, webPageNode } from '@/lib/schema';

/** One page per project with a slug, in each language. */
export function caseStudyStaticParams(): Array<{ slug: string }> {
  return getCaseStudies().map(({ slug }) => ({ slug }));
}

/** "Game · Role", e.g. for the page title. */
function caseStudyTitle(project: ProjectDetails): string {
  return `${project.name.trim()} · ${project.position}`;
}

/** The role, the game and the first highlight, for search and link previews. */
function caseStudyDescription(project: ProjectDetails, lang: Lang): string {
  const on = lang === 'es' ? 'en' : 'on';
  const lead = `${project.position} ${on} ${project.name.trim()}.`;
  return project.highlights[0] ? `${lead} ${project.highlights[0]}` : lead;
}

export function caseStudyMetadata(slug: string, lang: Lang): Metadata {
  const found = getCaseStudy(slug);
  if (!found) return {};
  const project = localizeProject(found, lang);

  return createPageMetadata({
    title: caseStudyTitle(project),
    description: caseStudyDescription(project, lang),
    path: caseStudyPath(slug),
    lang,
  });
}

export default function CaseStudyPage({
  slug,
  lang,
}: {
  slug: string;
  lang: Lang;
}) {
  const found = getCaseStudy(slug);
  if (!found) notFound();

  const project = localizeProject(found, lang);
  const text = t(lang);
  const name = project.name.trim();
  const { previous, next } = caseStudyNeighbours(slug);

  const portfolioPath = localizePath('/portfolio/', lang);
  const url = `${SITE_URL}${localizePath(caseStudyPath(slug), lang)}`;

  return (
    <PageWrapper mainClassName="page-main--portfolio" lang={lang}>
      <SchemaGraph
        nodes={[
          webPageNode({
            url,
            name: caseStudyTitle(project),
            description: caseStudyDescription(project, lang),
            hasBreadcrumb: true,
            inLanguage: lang === 'en' ? undefined : LANG_TAG[lang],
          }),
          breadcrumbNode(url, [
            {
              name: lang === 'en' ? 'Home' : 'Inicio',
              url: `${SITE_URL}${localizePath('/', lang)}`,
            },
            {
              name: text.portfolio.title,
              url: `${SITE_URL}${portfolioPath}`,
            },
            { name, url },
          ]),
        ]}
      />

      <article className="game-detail case-study">
        <p className="case-study-back case-study-back--top">
          <Link href={portfolioPath}>
            <span aria-hidden="true">←</span>
            {text.portfolio.allProjects}
          </Link>
        </p>

        <header className="case-study-header">
          <h1 className="game-detail-title case-study-title">{name}</h1>
          <p className="game-detail-tag">
            {[project.dimensions, project.genre].filter(Boolean).join(' · ')}
          </p>
          <CaseStudyFacts project={project} lang={lang} />
          {project.tech && project.tech.length > 0 && (
            <div className="game-detail-tech">
              <p className="game-detail-tech-label">{text.portfolio.tech}</p>
              {project.tech.map((tool) => (
                <span key={tool} className="tech-tag">
                  {tool}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="game-detail-responsibilities">
          <ScreenshotViewer
            name={name}
            images={project.images ?? []}
            alts={project.imageAlts}
            trailer={project.trailer}
          />
          <CaseStudyRole project={project} lang={lang} />
        </div>

        <CaseStudyList
          id="context"
          title={text.portfolio.context}
          items={project.context}
        />

        {project.videos?.map((video, index) => (
          <ProjectVideoPlayer
            key={video.src}
            video={video}
            index={index}
            lang={lang}
          />
        ))}

        {project.sections?.map((section, index) => (
          <CaseStudySection
            key={section.task}
            section={section}
            index={index}
          />
        ))}

        <ProblemCards cards={project.problems} lang={lang} />
        <CaseStudyList
          id="results"
          title={text.portfolio.results}
          items={project.results}
        />
        <CaseStudyList
          id="lessons"
          title={text.portfolio.lessons}
          items={project.lessons}
        />

        <CaseStudyPager previous={previous} next={next} lang={lang} />
      </article>
    </PageWrapper>
  );
}
