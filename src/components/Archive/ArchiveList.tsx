"use client"

import type { ProjectDetails } from '@/data/projects';
import Cell from '@/components/Projects/Cell';


export interface ArchiveListProps{
  otherProjects: ProjectDetails[];
  learningProjects: ProjectDetails[];
}


const ArchiveList: React.FC<ArchiveListProps> = ({otherProjects, learningProjects}) => {
  return(
    <div>
      {otherProjects.length > 0 && (
        <section className="projects-other">
              <h2 className="projects-section-title">Other Projects</h2>
              <div className="projects-grid">
                {otherProjects.map((project) => (
                  <Cell data={project} key={project.name} />
                ))}
              </div>
            </section>
          )}

      {learningProjects.length > 0 && (
        <section className="projects-learning">
          <h2 className="projects-section-title">Learning Projects</h2>
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