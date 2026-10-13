import type { Metadata } from 'next';

import { SchemaGraph } from '@/components/Schema';
import Courses from '@/components/Experience/Courses';
import Education from '@/components/Experience/Education';
import Resume from '@/components/Experience/Resume';
import References from '@/components/Experience/References';
import ExperienceNav from '@/components/Experience/ExperienceNav';
import Skills from '@/components/Experience/Skills';
import PageWrapper from '@/components/Template/PageWrapper';
import profile from '@/data/profile.json';
import courses from '@/data/experience/courses';
import degrees from '@/data/experience/degrees';
import { categories, skills } from '@/data/experience/skills';
import work from '@/data/experience/work';
import { createPageMetadata } from '@/lib/metadata';
import {
  breadcrumbNode,
  HOME_URL,
  profilePageNode,
  SITE_URL,
} from '@/lib/schema';
import { AUTHOR_NAME } from '@/lib/utils';

const EXPERIENCE_URL = `${SITE_URL}/experience/`;

const EXPERIENCE_DESCRIPTION = `Design lead with ${profile.professionalYears} years of experience working with Unity, both in academic and professional environments. I have published 3 commercial games in consoles in the last 5 years, developing multiple skills and features with a high degree of responsibility and independence.`;

export const metadata: Metadata = createPageMetadata ({
  title: 'Experience',
  description:
    `${AUTHOR_NAME}'s complete resume. AHEARTFULOFGAMES, CEU San Pablo, U-TAD, Gamelearn, Unusual Studios.`,
    path: '/experience/',
});

export default function ExperiencePage() {
  return (
    <PageWrapper mainClassName='page-main--experience'>
      <SchemaGraph
        nodes={[
          profilePageNode({
            url: EXPERIENCE_URL,
            name: 'About',
            description: EXPERIENCE_DESCRIPTION,
            hasBreadcrumb: true,
          }),
          breadcrumbNode(EXPERIENCE_URL, [
            { name: 'Home', url: HOME_URL },
            { name: 'About', url: EXPERIENCE_URL },
          ]),
        ]}
      />
      <section>
        <header>
          <h1 className="page-title">Experience</h1>
        </header>
          <p className="experience-summary">
            {EXPERIENCE_DESCRIPTION}
          </p>
          {/* Print-only, but real markup rather than CSS `content`, so it is
              selectable, linkable, and reads from the shared profile. The
              screen layout carries these in the footer, which print hides. */}
          <address className="resume-print-contact">
            <a href={`${SITE_URL}/`}>{SITE_URL.replace(/^https?:\/\//, '')}</a>
            <span aria-hidden="true"> · </span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <span aria-hidden="true"> · </span>
            <a href={SITE_URL}>{SITE_URL}</a>
          </address>


        <ExperienceNav />

        <div className="experience-content">
          <section id="resume" className="resume-section">
            <Resume data={work} />
          </section>

          <section id="education" className="education-section">
            <Education data={degrees} />
          </section>

          <section id="skills" className="skills-section">
            <Skills skills={skills} categories={categories} />
          </section>

          <section id="courses" className="courses-section">
            <Courses data={courses} />
          </section>

          <section id="references" className="references-section">
            <References />
          </section>
        </div>
      </section>
    </PageWrapper>
  );
}
