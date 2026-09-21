import dayjs from 'dayjs';
import Image from 'next/image';
import React from 'react';

import type { projectDetails } from '@/data/projects';

interface CellProps {
  data: projectDetails;
}

const Cell: React.FC<CellProps> = ({ data }) => {
  const { coverImage, link, subtitle, desc, genre, publishingDate, name, studio, position, tech, featured } = data;

  const CardWrapper = link ? 'a' : 'div';
  const cardProps = link ? { href: link, className: 'project-card-link' } : {};

  return (
    <article
      className={`project-card ${featured ? 'project-card--featured' : ''}`}
    >
      <CardWrapper {...cardProps}>
        <div className="project-card-image">
          <Image src={coverImage} alt={name} width={600} height={400} />
          <div className="project-card-overlay" />
        </div>

        <div className="project-card-content">
          <header className="project-card-header">
            <h3 className="project-card-title">{name}</h3>
            {subtitle && <p className="project-card-subtitle">{subtitle}</p>}
          </header>

          <p className="project-card-desc">{desc}</p>

          {tech && tech.length > 0 && (
            <div className="project-card-tech">
              {tech.map((t) => (
                <span key={t} className="tech-tag">
                  {t}
                </span>
              ))}
            </div>
          )}

          <time className="project-card-date">
            {dayjs(publishingDate).format('YYYY')}
          </time>
        </div>
      </CardWrapper>
    </article>
  );
};

export default Cell;
