import React from 'react';

import type { Degree as DegreeType } from '@/data/experience/degrees';

import Degree from './Education/Degree';

interface EducationProps {
  data: DegreeType[];
}

const Education: React.FC<EducationProps> = ({ data }) => (
  <div className="education">
    <div className="link-to" id="education" />
    <div className="title">
      <h2>Education</h2>
    </div>
    {data.map((degree) => (
      <Degree data={degree} key={degree.school} />
    ))}
  </div>
);

export default Education;
