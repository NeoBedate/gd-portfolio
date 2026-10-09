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
} from '@/lib/schema';
import { AUTHOR_NAME } from '@/lib/utils';

const ARCHIVE_URL = `${SITE_URL}/archive/`;

const ARCHIVE_DESCRIPTION = `Early professional and amateur projects from ${AUTHOR_NAME} (2017 and earlier).`;

export const metadata: Metadata = createPageMetadata({
  title: 'Archive',
  description: ARCHIVE_DESCRIPTION,
  path: '/archive/',
});

export default function ProjectsPage() {
  const otherProjects = data.filter((p) => p.other);
  const learningProjects = data.filter((p) => p.learning);


  return (
    <PageWrapper mainClassName='page-main--archive'>
      <SchemaGraph
        nodes={[
          collectionPageNode({
            url: ARCHIVE_URL,
            name: 'Archive',
            description: ARCHIVE_DESCRIPTION,
            hasBreadcrumb: true,
          }),
          breadcrumbNode(ARCHIVE_URL, [
            { name: 'Home', url: HOME_URL },
            { name: 'Archive', url: ARCHIVE_URL },
          ]),
        ]}
      />
      <section className="projects-archive-page">
        <header className="projects-archive-header">
          <h1 className="page-title">Archive</h1>
          <p className="page-subtitle">
            Other professional and amateur projects.
          </p>
        </header>

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
      </section>
    </PageWrapper>
  );
}