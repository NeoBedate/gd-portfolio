import dayjs from 'dayjs';
import Markdown from 'markdown-to-jsx';
import React from 'react';

import type { StudioJob } from '@/data/experience/work';
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

const ProjectExperience: React.FC<ProjectProps> = ({ data }) => {
  const { name, position, highlights } = data;
  
  return (
    <section>
      <div className="resume-exp">
        <p className="resume-position">
          {position}
        </p>
        <p className="resume-project"> 
          {name}
        </p>
      </div>
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

const CompanyExperience: React.FC<JobProps> = ({ companyData, projectData }) => {
  const { logo, name, url, startDate, endDate, description } = companyData;

  const [ data ] = projectData;
  
  return (
    <div className="resume-container">
      <div className="resume-company">
        <div className="resume-compLogo">
          <img className='logo' src={logo} />
        </div>
        <h2 className="resume-daterange">            
          <p className="daterange">
            {' '}
            {dayjs(startDate).format('MMMM YYYY')} -{' '}
            {endDate ? dayjs(endDate).format('MMMM YYYY') : 'Present'}
          </p>
        </h2>
      </div>
      <div>
        <p className="resume-compName" >
          <a target="_blank" href={url}>{name} </a>
        </p>
        <div> {description ? (
          <p className="resume-summary">
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
            <ProjectExperience key={item.data.name} data={item.data}></ProjectExperience>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CompanyExperience;
