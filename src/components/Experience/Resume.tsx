import React from 'react';

import type { StudioJob } from '@/data/experience/work';
import type { ProjectDetails } from '@/data/projects'
import type { ProjectProps } from './Resume/Job'
import projectData from '@/data/projects';
import type { CompanyDetails } from '@/data/companies';
import companyData from '@/data/companies';
import CompanyExperience from './Resume/Job';

interface ResumeProps {
  data: StudioJob[];
}

const Resume: React.FC<ResumeProps> = ({ data }) => (
  <div className="resume">
    <div className="link-to" id="resume" />
    <div className="title">
      <h2>Resume</h2>
    </div>
      {data.map((item) => (
        <RenderDataFromStudioJob key={item.companyId} companyId={item.companyId} projectIds={item.projectIds} />
      ) )}
  </div>
);


// Find CompanyDetails and ProjectDetails[] from guven StudioJob
export function GetDataFromStudioJob (studioJob:StudioJob) {

  var company = companyData.find(item => item.id == studioJob.companyId);
  
  var projects : ProjectDetails[] = [];

  studioJob.projectIds.forEach(projectId => {
    var project;
    project = projectData.find(item => (item.id == projectId));
    projects = projects.concat(project as ProjectDetails)
  });
  
  return {company, projects};
};


// Render data from given StudioJob
export function RenderDataFromStudioJob(studioJob:StudioJob){
  // Get all data from studio jobs
  var data = GetDataFromStudioJob(studioJob);

  // Wrap ProjectDetails[] as ProjectProps[] for the liking of <CompanyExperience>
  var projectProps : ProjectProps[] = [];
  data.projects.forEach(item => projectProps = projectProps.concat({data:item}));

  //Render CompanyExperience
  return <CompanyExperience id={studioJob} companyData={data.company as CompanyDetails} projectData={projectProps} key={`${studioJob.companyId}`} />
}

export default Resume;
