import { t } from '@/data/i18n/ui';
import type { ProjectDetails } from '@/data/projects';
import type { Lang } from '@/lib/i18n';

import ProjectLinks from './ProjectLinks';

interface CaseStudyRoleProps {
  project: ProjectDetails;
  lang: Lang;
}

/**
 * My role on the project, what I owned (or, until that's written, the
 * responsibilities from the résumé) and the project's links.
 */
export default function CaseStudyRole({ project, lang }: CaseStudyRoleProps) {
  const text = t(lang).portfolio;

  return (
    <div className="case-study-role">
      <p className="game-detail-tasks-label">{text.myRole}</p>
      <p className="game-detail-role">{project.position}</p>
      {project.roleDetail && (
        <p className="case-study-role-detail">{project.roleDetail}</p>
      )}
      {project.summary && (
        <p className="game-detail-overview">{project.summary.trim()}</p>
      )}
      <h2 className="game-detail-tasks-label">
        {project.ownership ? text.owned : text.responsibilities}
      </h2>
      <ul className="game-detail-tasks">
        {(project.ownership ?? project.highlights).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <ProjectLinks links={project.links ?? []} lang={lang} />
    </div>
  );
}
