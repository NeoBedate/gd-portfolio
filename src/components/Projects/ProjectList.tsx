'use client';

import { useEffect, useState } from 'react';
import Cell from '@/components/Projects/Cell';
import { openProjectDetail } from '@/components/Projects/openProjectDetail';
import ProjectDetailWrap from '@/components/Projects/ProjectDetailWrap';
import { projectSlug } from '@/components/Projects/projectSlug';
import { t } from '@/data/i18n/ui';
import type { ProjectDetails } from '@/data/projects';
import { useLang } from '@/hooks/useLang';

export interface ProjectsListWrap {
  /** The selected projects, already in the page's language. */
  projects: ProjectDetails[];
}

const ProjectList: React.FC<ProjectsListWrap> = ({ projects }) => {
  const text = t(useLang()).portfolio;
  const [selectedProject, setSelectedProject] = useState(
    projects.find((p) => p.id == '12_tmnt'),
  );

  function UpdateProjectFromID(id: string) {
    var project = projects.find((p) => p.id == id);
    const wrap = document.getElementById('game-detail-wrap');
    if (!wrap) return;
    openProjectDetail(wrap);

    setSelectedProject(project);
  }

  // A link like /portfolio/#dragons (the home page tiles) opens that game.
  useEffect(() => {
    const openFromHash = () => {
      const slug = window.location.hash.slice(1);
      if (!slug) return;

      const project = projects.find((p) => projectSlug(p.id) === slug);
      const wrap = document.getElementById('game-detail-wrap');
      if (!project || !wrap) return;

      setSelectedProject(project);
      openProjectDetail(wrap);
    };

    // Wait a frame: after a route change, ScrollToTop resets the scroll in
    // an effect that runs after this one and would undo the scroll.
    const frame = window.requestAnimationFrame(openFromHash);
    window.addEventListener('hashchange', openFromHash);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('hashchange', openFromHash);
    };
  }, [projects]);

  return (
    <div>
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
                <Cell
                  data={project}
                  key={project.name}
                  callback={(id: string) => UpdateProjectFromID(id)}
                />
              ))}
            </div>
          </section>
        )}
      </section>

      <ProjectDetailWrap project={selectedProject} />
    </div>
  );
};

export default ProjectList;
