import React from 'react';

import type { Degree as DegreeType } from '@/data/experience/degrees';

interface DegreeProps {
  data: DegreeType;
}

const Degree: React.FC<DegreeProps> = ({ data }) => (
  <div>
    <div className="degree-container">
      <p className="degree">
        <a href={data.degreeLink}>{data.degree}</a>
      </p>
      <p className="school">
        <a href={data.uniLink}>{data.school}</a>, {data.year}
      </p>
    </div>
  </div>
);

export default Degree;
