import React from 'react';

import type { StudioPosition } from '@/data/resume/work';

import Job from './Experience/Job';

interface ExperienceProps {
  data: StudioPosition[];
}

const Experience: React.FC<ExperienceProps> = ({ data }) => (
  <div className="experience">
    <div className="link-to" id="Experience" />
    <div className="title">
      <h3>Curriculum Vitae</h3>
    </div>
    {data.map((job) => (
      <Job data={job} key={`${job.name}-${job.projects}`} />
    ))}
  </div>
);

export default Experience;
