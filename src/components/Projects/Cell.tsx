import dayjs from 'dayjs';
import Image from 'next/image';
import React from 'react';

import type { ProjectDetails } from '@/data/projects';
import { relative } from 'node:path';

interface CellProps {
  data: ProjectDetails,
  callback? : Function
}

function CardClicked(project : ProjectDetails, callback : Function | undefined){
  // Remove active classname from all cards and add active classname to clicked card
  document.querySelectorAll('.project-card').forEach(c => c.classList.remove('active'));
  document.getElementById("project-card-" + project.id)?.classList.add('active');
  
  if (callback != null) 
    callback(project.id); 
}


const Cell: React.FC<CellProps> = ({ data, callback }) => {
  const { id, url, coverImage, dimensions, genre, publishingDate, name, studio, overview, featured } = data;

  const CardWrapper = url ? 'a' : 'div';
  const cardProps = url ? { href: url, className: 'project-card-link' } : {};


  return (
    <article id={`project-card-${data.id}`} className={`project-card ${featured ? 'project-card--featured' : ''}`}>
      <CardWrapper {...cardProps} onClick={() => { CardClicked(data, callback); }}>
        <div className="project-card-content">
          <p className="project-card-tag">{dimensions} · {genre} · <time>{dayjs(publishingDate).format('YYYY')}</time></p>
          <p className="project-card-name">{name}</p>
          <p className='project-card-studio'>{studio}</p>
          <p className="project-card-overview">{overview}</p>
          <div className="project-card-details"></div>
          <div className="project-card-background">
            <Image loading="eager" className="project-card-image" src={coverImage} alt={name} width={128} height={128} />
          <div/>
          </div>
        </div>
      </CardWrapper>
    </article>
  );
};

export default Cell;
