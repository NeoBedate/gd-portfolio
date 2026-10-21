"use client"

import { useState } from "react";
import type { ProjectDetails } from '@/data/projects';
import Cell from '@/components/Projects/Cell';
import ProjectDetailWrap from '@/components/Projects/ProjectDetailWrap';
import data from '@/data/projects';

export interface ProjectsListWrap{
  projects: ProjectDetails[];
}


const ProjectList: React.FC<ProjectsListWrap> = ({projects}) => {
    
  const [selectedProject, setSelectedProject] = useState (
                data.find(p => p.id == "12_tmnt")
        );


  function UpdateProjectFromID(id:string) {
    var project = data.find(p => p.id == id);
    const wrap = document.getElementById('game-detail-wrap');
    if (!wrap) return;
    if (!wrap.classList.contains('open'))
      wrap.classList.add('open');
    
    setSelectedProject(project);
  }

  return (
    <div>
        <section className="portfolio-page">
        <header className="portfolio-header">
          <h1 className="page-title">Portfolio</h1>
          <p className="page-subtitle">A selection of video games I helped to create.</p>
        </header>
       

       {projects.length > 0 && (
          <section className="portfolio-projects">
            <h2 className="projects-section-title">Featured</h2>
            <div className="projects-grid projects-grid--featured">
              {projects.map((project) => (
                <Cell data={project} key={project.name}
                      callback={ (id:string) => UpdateProjectFromID(id) }/>
              ))}
            </div>
          </section>
        )}

      </section>
      
      <ProjectDetailWrap project = {selectedProject}/>

    </div>
    
  );

}


export default ProjectList;