import React from 'react';

import type { Course as CourseType } from '@/data/resume/courses';

interface CourseProps {
  data: CourseType;
  last?: boolean;
}

const Course: React.FC<CourseProps> = ({ data, last = false }) => (
  <li className="course-container">

      <div className="course-dot">
          <a href={data.link}>
            <h4 className="course-number">{data.number}:</h4>
        <p className="course-name">{data.title}</p>
          </a>
      </div>
    
  </li>
);

export default Course;
