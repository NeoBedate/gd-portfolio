'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import Cell from '@/components/Projects/Cell';
import { t } from '@/data/i18n/ui';
import type { ProjectDetails } from '@/data/projects';
import { useLang } from '@/hooks/useLang';
import { caseStudyPath, legacyHash } from '@/lib/caseStudyLinks';
import { localizePath } from '@/lib/i18n';

export interface ProjectsListWrap {
  /** The selected projects, already in the page's language. */
  projects: ProjectDetails[];
}

const ProjectList: React.FC<ProjectsListWrap> = ({ projects }) => {
  const lang = useLang();
  const text = t(lang).portfolio;
  const router = useRouter();

  const pageOf = (project: ProjectDetails) =>
    project.slug ? localizePath(caseStudyPath(project.slug), lang) : undefined;

  // Old links such as /portfolio/#dragons opened the game in a panel on this
  // page. Each game has its own page now, so send them there.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const project = projects.find((p) => p.slug && legacyHash(p.id) === hash);
    if (project?.slug) {
      router.replace(localizePath(caseStudyPath(project.slug), lang));
    }
  }, [projects, router, lang]);

  return (
    <section className="portfolio-page">
      <header className="portfolio-header">
        <h1 className="page-title">{text.title}</h1>
        <p className="page-subtitle">{text.subtitle}</p>
      </header>

      {projects.length > 0 && (
        <section className="portfolio-projects">
          <h2 className="projects-section-title">{text.selectedProjects}</h2>
          <div className="projects-grid projects-grid-selected">
            {projects.map((project) => (
              <Cell data={project} key={project.id} href={pageOf(project)} />
            ))}
          </div>
        </section>
      )}
    </section>
  );
};

export default ProjectList;
