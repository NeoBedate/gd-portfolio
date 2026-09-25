import dayjs from 'dayjs';
import Markdown from 'markdown-to-jsx';
import React from 'react';

import type { StudioJob } from '@/data/resume/work';
import type { ProjectDetails } from '@/data/projects';
import type { CompanyDetails } from '@/data/companies';

// ALL DATA
interface JobProps {
  id: StudioJob;
  projectData: ProjectProps[];
  companyData: CompanyDetails;
}

export interface ProjectProps {
  data: ProjectDetails;
}

const ProjectResume: React.FC<ProjectProps> = ({ data }) => {
  const { name, url, position, highlights } = data;
  
  return (
    <section>
      <h5> 
        <a href={url} target="_blank">{name}</a>
      </h5>
      <h6>
        {position}
      </h6>
      {highlights ? (
        <ul className="points">
          {highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      )  : null}
    </section>
  );
}

const CompanyResume: React.FC<JobProps> = ({ companyData, projectData }) => {
  const { logo, name, url, startDate, endDate, description } = companyData;

  const [ data ] = projectData;
  
  return (
    <article className="jobs-container">
      <section>
        <header>
          <h2>
            <img className='logo' src={logo}/>
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

        {description ? (
          <p>
            <Markdown
              options={{
                overrides: {
                  p: {
                    props: {
                      className: 'description',
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
              {description}
            </Markdown>
          </p>
        ) : null}
      </section>
      <section className="project-container">
          <ul className="points">
            {projectData.map((item) => (

              <ProjectResume key={item.data.name} data={item.data}></ProjectResume>

            ))}
          </ul>
      </section>
    </article>
  );
};

export default CompanyResume;
