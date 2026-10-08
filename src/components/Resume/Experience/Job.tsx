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
      <h3> 
        <a href={url} target="_blank">{name}</a>
      </h3>
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
          <h5 className="projects-portfolio-logo">
            <img className='logo' src={logo} width={156} height={156}/>
          </h5>
          <h5 className="projects-portfolio-compName">
            <a href={url} target="_blank">{name} </a>
          </h5>
          <h2 className="projects-portfolio-daterange">            
            <a className="daterange">
              {' '}
              {dayjs(startDate).format('MMMM YYYY')} -{' '}
              {endDate ? dayjs(endDate).format('MMMM YYYY') : 'Present'}
            </a>
          </h2>
        </header>
      </section>

      <section className="projects-portfolio-container">
        {description ? (
          <p className="projects-portfolio-jobDescription">
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
