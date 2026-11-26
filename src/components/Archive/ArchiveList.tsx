'use client';

import Cell from '@/components/Projects/Cell';
import { t } from '@/data/i18n/ui';
import type { ProjectDetails } from '@/data/projects';
import type { Lang } from '@/lib/i18n';

export interface ArchiveListProps {
  otherProjects: ProjectDetails[];
  learningProjects: ProjectDetails[];
  lang?: Lang;
}

const ArchiveList: React.FC<ArchiveListProps> = ({
  otherProjects,
  learningProjects,
  lang = 'en',
}) => {
  const text = t(lang).archive;
  return (
    <div>
      {otherProjects.length > 0 && (
        <section className="projects-other">
          <h2 className="projects-section-title">{text.otherProjects}</h2>
          <div className="projects-grid">
            {otherProjects.map((project) => (
              <Cell data={project} key={project.name} />
            ))}
          </div>
        </section>
      )}

      {learningProjects.length > 0 && (
        <section className="projects-learning">
          <h2 className="projects-section-title">{text.learningProjects}</h2>
          <div className="projects-grid">
            {learningProjects.map((project) => (
              <Cell data={project} key={project.name} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ArchiveList;
