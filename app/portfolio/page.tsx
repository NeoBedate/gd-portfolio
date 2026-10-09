import React from 'react';
import type { Metadata } from 'next';

import Cell from '@/components/Projects/Cell';
import { SchemaGraph } from '@/components/Schema';
import PageWrapper from '@/components/Template/PageWrapper';
import data from '@/data/projects';
import { createPageMetadata } from '@/lib/metadata';
import { 
  breadcrumbNode,
  collectionPageNode,
  HOME_URL,
  SITE_URL,
} from "@/lib/schema";
//import ProjectDetailWrap from '@/components/Projects/ProjectDetailWrap';

const PORTFOLIO_URL = `${SITE_URL}/portfolio/`;

const PORTFOLIO_DESCRIPTION = `Featured video games where I contributed.`;

export const metadata: Metadata = createPageMetadata ({
  title: 'Portfolio',
  description: PORTFOLIO_DESCRIPTION,
});

var selectedProjectId : string = "12_tmnt";

export default function ProjectsPage() {
  const featuredProjects = data.filter((p) => p.featured);

  return (
    <PageWrapper mainClassName="page-main--portfolio">
      <SchemaGraph
        nodes={[
          collectionPageNode({
            url: PORTFOLIO_URL,
            name: 'Portfolio',
            description: PORTFOLIO_DESCRIPTION,
            hasBreadcrumb: true,
          }),
          breadcrumbNode(PORTFOLIO_URL, [
            { name: 'Home', url: HOME_URL },
            { name: 'Portfolio', url: PORTFOLIO_URL },
          ])
        ]}
      />
      <section className="projects-portfolio-page">
        <header className="projects-portfolio-header">
          <h1 className="page-title">Portfolio</h1>
          <p className="page-subtitle">A selection of video games I helped to create.</p>
        </header>
        {featuredProjects.length > 0 && (
          <section className="projects-portfolio">
            <h2 className="projects-section-title">Featured</h2>
            <div className="projects-grid projects-grid--featured">
              {featuredProjects.map((project) => (
                <Cell data={project} key={project.name} />
              ))}
            </div>
          </section>
        )}
      </section>
      {/* <ProjectDetailWrap id = {selectedProjectId}/> */}
    </PageWrapper>
  );
}
