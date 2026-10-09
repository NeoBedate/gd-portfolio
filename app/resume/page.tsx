import type { Metadata } from 'next';

import { SchemaGraph } from '@/components/Schema';
import Courses from '@/components/Resume/Courses';
import Education from '@/components/Resume/Education';
import Experience from '@/components/Resume/Experience';
import References from '@/components/Resume/References';
import ResumeNav from '@/components/Resume/ResumeNav';
import Skills from '@/components/Resume/Skills';
import PageWrapper from '@/components/Template/PageWrapper';
import profile from '@/data/profile.json';
import courses from '@/data/resume/courses';
import degrees from '@/data/resume/degrees';
import { categories, skills } from '@/data/resume/skills';
import work from '@/data/resume/work';
import { createPageMetadata } from '@/lib/metadata';
import {
  breadcrumbNode,
  HOME_URL,
  profilePageNode,
  SITE_URL,
} from '@/lib/schema';
import { AUTHOR_NAME } from '@/lib/utils';

const RESUME_URL = `${SITE_URL}/resume/`;

const RESUME_DESCRIPTION = `Design lead with ${profile.professionalYears} years of experience working with Unity, both in academic and professional environments. I have published 3 commercial games in consoles in the last 5 years, developing multiple skills and features with a high degree of responsibility and independence.`;

export const metadata: Metadata = createPageMetadata ({
  title: 'Resume',
  description:
    `${AUTHOR_NAME}'s Resume. AHEARTFULOFGAMES, CEU San Pablo, U-TAD, Gamelearn, Unusual Studios.`,
    path: '/resume/',
});

export default function ResumePage() {
  return (
    <PageWrapper mainClassName='page-main--resume'>
      <SchemaGraph
        nodes={[
          profilePageNode({
            url: RESUME_URL,
            name: 'About',
            description: RESUME_DESCRIPTION,
            hasBreadcrumb: true,
          }),
          breadcrumbNode(RESUME_URL, [
            { name: 'Home', url: HOME_URL },
            { name: 'About', url: RESUME_URL },
          ]),
        ]}
      />
      <section className="resume-page">
        <header className="resume-header">
          <h1 className="resume-title">Resume</h1>
        </header>
          <p className="resume-summary">
            {RESUME_DESCRIPTION}
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


        <ResumeNav />

        <div className="resume-content">
          <section id="experience" className="resume-section">
            <Experience data={work} />
          </section>

          <section id="education" className="resume-section">
            <Education data={degrees} />
          </section>

          <section id="skills" className="resume-section">
            <Skills skills={skills} categories={categories} />
          </section>

          <section id="courses" className="resume-section">
            <Courses data={courses} />
          </section>

          <section id="references" className="resume-section">
            <References />
          </section>
        </div>
      </section>
    </PageWrapper>
  );
}
