import React from 'react';
import type { CompanyDetails } from '@/data/companies';
import companyData from '@/data/companies';
import type { StudioJob } from '@/data/experience/work';
import { t } from '@/data/i18n/ui';
import { localizeCompany, localizeProject } from '@/data/localized';
import type { ProjectDetails } from '@/data/projects';
import projectData from '@/data/projects';
import type { Lang } from '@/lib/i18n';
import { CREDITS_URL } from '@/lib/utils';
import type { ProjectProps } from './Resume/Job';
import CompanyExperience from './Resume/Job';

interface ResumeProps {
  data: StudioJob[];
  lang?: Lang;
}

const Resume: React.FC<ResumeProps> = ({ data, lang = 'en' }) => (
  <div className="resume">
    <div className="link-to" id="resume" />
    <div className="title">
      <h2>{t(lang).experience.resume}</h2>
    </div>
    <p className="resume-credits">
      <a href={CREDITS_URL} target="_blank" rel="noopener noreferrer">
        {t(lang).experience.credits}
        <span aria-hidden="true"> ↗</span>
      </a>
    </p>
    {data.map((item) => (
      <RenderDataFromStudioJob
        key={item.companyId}
        companyId={item.companyId}
        projectIds={item.projectIds}
        lang={lang}
      />
    ))}
  </div>
);

// Find CompanyDetails and ProjectDetails[] from guven StudioJob
export function GetDataFromStudioJob(studioJob: StudioJob, lang: Lang = 'en') {
  const found = companyData.find((item) => item.id == studioJob.companyId);
  var company = found ? localizeCompany(found, lang) : undefined;

  var projects: ProjectDetails[] = [];

  studioJob.projectIds.forEach((projectId) => {
    const project = projectData.find((item) => item.id == projectId);
    // A test checks that every id in work.ts exists in projects.ts.
    if (project) projects = projects.concat(localizeProject(project, lang));
  });

  return { company, projects };
}

// Render data from given StudioJob
export function RenderDataFromStudioJob(
  studioJob: StudioJob & { lang?: Lang },
) {
  const { lang = 'en' } = studioJob;
  // Get all data from studio jobs
  var data = GetDataFromStudioJob(studioJob, lang);

  // Wrap ProjectDetails[] as ProjectProps[] for the liking of <CompanyExperience>
  var projectProps: ProjectProps[] = [];
  data.projects.forEach(
    (item) => (projectProps = projectProps.concat({ data: item })),
  );

  //Render CompanyExperience
  return (
    <CompanyExperience
      id={studioJob}
      companyData={data.company as CompanyDetails}
      projectData={projectProps}
      lang={lang}
      key={`${studioJob.companyId}`}
    />
  );
}

export default Resume;
