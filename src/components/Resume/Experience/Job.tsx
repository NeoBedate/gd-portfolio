import dayjs from 'dayjs';
import Markdown from 'markdown-to-jsx';
import React from 'react';

import type { StudioPosition } from '@/data/resume/work';
import type { StudioProject } from '@/data/resume/work';

import projects from '@/data/projects';

interface ProjectProps {
  data: StudioProject;
}

interface JobProps {
  data: StudioPosition;
}

const ProjectResume: React.FC<ProjectProps> = ({ data }) => {
  const { projectName, projectUrl, projectPosition, projectHighlights } = data;
  
  return (
    <section>
      <h5> 
        <a href={projectUrl} target="_blank">{projectName}</a>
      </h5>
      <h6>
        {projectPosition}
      </h6>
      {projectHighlights ? (
        <ul className="points">
          {projectHighlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      )  : null}
    </section>
  );
}

const Job: React.FC<JobProps> = ({ data }) => {
  const { compLogo, name, url, startDate, endDate, summary, projects } = data;

  return (
    <article className="jobs-container">
      <section>
        <header>
          <h2>
            <img className='compLogo' src={compLogo} height={64} width={64} />
            <a href={url} target="_blank">{name} </a>
          </h2>
          <h2>            
            <a className="daterange">
              {' '}
              {dayjs(startDate).format('MMMM YYYY')} -{' '}
              {endDate ? dayjs(endDate).format('MMMM YYYY') : 'Present'}
            </a>
          </h2>
        </header>

        {summary ? (
          <p>
            <Markdown
              options={{
                overrides: {
                  p: {
                    props: {
                      className: 'summary',
                    },
                  },
                  code: {
                    component: ({ children }) => <>{children}</>,
                  },
                  pre: {
                    component: ({ children }) => <>{children}</>,
                  },
                },
              }}
            >
              {summary}
            </Markdown>
          </p>
        ) : null}
      </section>
      <section className="project-container">
          <ul className="points">
            {projects.map((item) => (

              <ProjectResume key={item.projectName} data={item}></ProjectResume>

            ))}
          </ul>
      </section>
    </article>
  );
};

export default Job;
