import React from 'react';

import type { Degree as DegreeType } from '@/data/experience/degrees';
import { t } from '@/data/i18n/ui';
import type { Lang } from '@/lib/i18n';

import Degree from './Education/Degree';

interface EducationProps {
  data: DegreeType[];
  lang?: Lang;
}

const Education: React.FC<EducationProps> = ({ data, lang = 'en' }) => (
  <div className="education">
    <div className="link-to" id="education" />
    <div className="title">
      <h2>{t(lang).experience.education}</h2>
    </div>
    {data.map((degree) => (
      <Degree data={degree} key={degree.school} />
    ))}
  </div>
);

export default Education;
