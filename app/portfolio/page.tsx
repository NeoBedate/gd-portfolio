import React from 'react';
import type { Metadata } from 'next';

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


import ProjectList from '@/components/Projects/ProjectList';

const PORTFOLIO_URL = `${SITE_URL}/portfolio/`;

const PORTFOLIO_DESCRIPTION = `Featured video games where I contributed.`;

export const metadata: Metadata = createPageMetadata ({
  title: 'Portfolio',
  description: PORTFOLIO_DESCRIPTION,
});


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

      <ProjectList projects={featuredProjects}/>

    </PageWrapper>
  );
}


