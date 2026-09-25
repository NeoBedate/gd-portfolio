import type { Metadata } from 'next';

import Cell from '@/components/Projects/Cell';
import data from '@/data/projects';

import PageWrapper from '../components/PageWrapper';
import { BrowserRouter,
        Routes,
        Route,
         Link
        } from "react-router-dom";

export const metadata: Metadata = {
  title: 'Portfolio',
  description: "Video games and other projects.",
};

export default function ProjectsPage() {
  const featuredProjects = data.filter((p) => p.featured && !p.learning);
  const otherProjects = data.filter((p) => !p.featured && !p.learning);
  const learningProjects = data.filter((p) => p.learning);

  return (
    <PageWrapper>
      <section className="projects-page">
        <header className="projects-header">
          <h1 className="page-title">Portfolio</h1>
          <p className="page-subtitle">A selection of video games I helped to create.</p>
        </header>
        {featuredProjects.length > 0 && (
          <section className="projects-featured">
            <h2 className="projects-section-title">Featured</h2>
            <div className="projects-grid projects-grid--featured">
              {featuredProjects.map((project) => (
                <Cell data={project} key={project.name} />
              ))}
            </div>
          </section>
        )}

        {otherProjects.length > 0 && (
          <section className="projects-other">
            <h2 className="projects-section-title">More Projects</h2>
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
      </section>
      
      {/* <Routing/> */}

    </PageWrapper>
  );

  function Routing () {
    return(
      <BrowserRouter>
          <Routes>
            {/* <Route path="/portfolio" element={<Project/>}/>
            <Route path="/contact" element={<Project/>}/> */}
          </Routes>
      </BrowserRouter>
    )
  }
}
