import dayjs from 'dayjs';
import Image from 'next/image';
import React from 'react';

import type { ProjectDetails } from '@/data/projects';
import { relative } from 'node:path';

interface CellProps {
  data: ProjectDetails;
}

const Cell: React.FC<CellProps> = ({ data }) => {
  const { coverImage, url, dimensions, genre, publishingDate, name, studio, position, summary, featured } = data;

  const CardWrapper = url ? 'a' : 'div';
  const cardProps = url ? { href: url, className: 'project-card-link' } : {};

  return (
    <article className={`project-card ${featured ? 'project-card--featured' : ''}`}>
      <CardWrapper {...cardProps}>
        <div> 
          <div className="project-card-content">
            <p className="project-card-tag">{dimensions} · {genre} · <time>{dayjs(publishingDate).format('YYYY')}</time></p>
            <p className="project-card-title">{name}</p>
            <p className='project-card-studio'>{studio}</p>
            <p className="project-card-description">{summary}</p>
            <div className="project-card-details"></div>
            <div className="project-card-background">
              <Image className="project-card-image" src={coverImage} alt={name} width={128} height={128} />
            <div/>
            </div>
          </div>
        </div>
      </CardWrapper>
    </article>
  );
};

{/* {tech && tech.length > 0 && (
            <div className="project-card-tech">
              {tech.map((t) => (
                <span key={t} className="tech-tag">
                  {t}
                </span>
              ))}
            </div>
          )} */}

export default Cell;
