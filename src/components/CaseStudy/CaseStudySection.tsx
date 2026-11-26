import ProjectMedia from '@/components/Projects/ProjectMedia';
import type { ProjectResponsibilities } from '@/data/projects';

import SectionGallery from './SectionGallery';

interface CaseStudySectionProps {
  section: ProjectResponsibilities;
  index: number;
}

/** One section of a case study: its text, an optional image, and its media pairs. */
export default function CaseStudySection({
  section,
  index,
}: CaseStudySectionProps) {
  const headingId = `case-study-section-${index + 1}`;

  return (
    <section className="game-detail-section" aria-labelledby={headingId}>
      <h2 id={headingId} className="game-detail-section-title">
        {section.task}
      </h2>
      <div className="game-detail-section-body">
        <div className="game-detail-section-taskText">
          {section.taskExecution.map((paragraph) => (
            <p
              className="game-detail-section-task"
              key={paragraph}
              // Our own data, with <b> for emphasis.
              // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted, hand-written project text
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
        </div>
        {section.taskImage && (
          <figure className="game-detail-section-taskImage">
            <a href={section.taskImage} target="_blank" rel="noopener">
              <ProjectMedia
                src={section.taskImage}
                alt={section.taskImageAlt ?? ''}
                width={512}
                height={512}
                className="game-detail-section-taskImage-image"
              />
            </a>
            {section.taskCaption && (
              <figcaption className="game-detail-section-caption">
                {section.taskCaption}
              </figcaption>
            )}
          </figure>
        )}
      </div>
      <SectionGallery
        pairs={section.gifs}
        alts={section.alts}
        captions={section.captions}
      />
    </section>
  );
}
