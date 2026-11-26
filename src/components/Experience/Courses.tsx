import React from 'react';

import type { Course as CourseType } from '@/data/experience/courses';
import { t } from '@/data/i18n/ui';
import { courseTitle } from '@/data/localized';
import type { Lang } from '@/lib/i18n';

import Course from './Courses/Course';

interface CoursesProps {
  data: CourseType[];
  lang?: Lang;
}

const getRows = (courses: CourseType[], lang: Lang) =>
  courses
    .sort((a, b) => {
      let ret = 0;
      if (a.university > b.university) ret = -1;
      else if (a.university < b.university) ret = 1;
      else if (a.number > b.number) ret = 1;
      else if (a.number < b.number) ret = -1;
      return ret;
    })
    .map((course, idx) => (
      <Course
        data={{ ...course, title: courseTitle(course, lang) }}
        key={course.title}
        last={idx === courses.length - 1}
      />
    ));

const Courses: React.FC<CoursesProps> = ({ data, lang = 'en' }) => (
  <div className="courses">
    <div className="link-to" id="courses" />
    <div className="title">
      <h2>{t(lang).experience.coursesTitle}</h2>
    </div>
    <ul className="course-list">{getRows(data, lang)}</ul>
  </div>
);

export default Courses;
