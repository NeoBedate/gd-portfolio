import dayjs from 'dayjs';
import Markdown from 'markdown-to-jsx';
import React from 'react';
import type { CompanyDetails } from '@/data/companies';
import type { StudioJob } from '@/data/experience/work';
import { t } from '@/data/i18n/ui';
import type { ProjectDetails } from '@/data/projects';
import { DATE_LOCALE, type Lang } from '@/lib/i18n';

// ALL DATA
interface JobProps {
  id: StudioJob;
  projectData: ProjectProps[];
  companyData: CompanyDetails;
  lang?: Lang;
}

/** 'January 2020' in English, 'Enero de 2020' in Spanish. */
function monthYear(date: string, lang: Lang): string {
  if (lang === 'en') return dayjs(date).format('MMMM YYYY');
  const label = new Date(`${date}T12:00:00Z`).toLocaleDateString(
    DATE_LOCALE[lang],
    { month: 'long', year: 'numeric', timeZone: 'UTC' },
  );
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export interface ProjectProps {
  data: ProjectDetails;
}

const ProjectExperience: React.FC<ProjectProps> = ({ data }) => {
  const { name, position, highlights } = data;

  return (
    <section>
      <div className="resume-exp">
        <p className="resume-position">{position}</p>
        <p className="resume-project">{name}</p>
      </div>
      {highlights ? (
        <ul className="points">
          {highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
};

const CompanyExperience: React.FC<JobProps> = ({
  companyData,
  projectData,
  lang = 'en',
}) => {
  const { logo, name, url, startDate, endDate, description } = companyData;

  const [data] = projectData;

  return (
    <div className="resume-container">
      <div className="resume-company">
        <div className="resume-compLogo">
          <img className="logo" src={logo} alt="" />
        </div>
        <h2 className="resume-daterange">
          <p className="daterange">
            {' '}
            {monthYear(startDate, lang)} -{' '}
            {endDate ? monthYear(endDate, lang) : t(lang).experience.present}
          </p>
        </h2>
      </div>
      <div>
        <p className="resume-compName">
          <a target="_blank" href={url}>
            {name}{' '}
          </a>
        </p>
        <div>
          {' '}
          {description ? (
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
              <ProjectExperience
                key={item.data.name}
                data={item.data}
              ></ProjectExperience>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CompanyExperience;
