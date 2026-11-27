import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';

import type { ProjectDetails } from '@/data/projects';

interface CellProps {
  data: ProjectDetails;
  /**
   * A page on this site the card opens (a case study). Without it, the card
   * opens the project's first link, or links nowhere.
   */
  href?: string;
}

const Cell: React.FC<CellProps> = ({ data, href }) => {
  const url = data.links?.[0]?.href;
  const {
    id,
    coverImage,
    dimensions,
    genre,
    publishingDate,
    name,
    studio,
    overview,
    selected,
  } = data;

  const content = (
    <div className="project-card-content">
      <p className="project-card-tag">
        {dimensions} · {genre} ·{' '}
        <time>{dayjs(publishingDate).format('YYYY')}</time>
      </p>
      <p className="project-card-name">{name}</p>
      <p className="project-card-studio">{studio}</p>
      <p className="project-card-overview">{overview}</p>
      <div className="project-card-details"></div>
      <div className="project-card-background">
        <Image
          loading="eager"
          className="project-card-image"
          src={coverImage}
          alt={name}
          width={128}
          height={128}
        />
        <div />
      </div>
    </div>
  );

  return (
    <article
      id={`project-card-${id}`}
      className={`project-card ${selected ? 'project-card-selected' : ''}`}
    >
      {href ? (
        <Link href={href} className="project-card-link">
          {content}
        </Link>
      ) : url ? (
        <a href={url} className="project-card-link">
          {content}
        </a>
      ) : (
        <div>{content}</div>
      )}
    </article>
  );
};

export default Cell;
