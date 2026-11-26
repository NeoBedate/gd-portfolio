import type { Metadata } from 'next';

import Courses from '@/components/Experience/Courses';
import Education from '@/components/Experience/Education';
import ExperienceNav from '@/components/Experience/ExperienceNav';
import Resume from '@/components/Experience/Resume';
import Skills from '@/components/Experience/Skills';
import { SchemaGraph } from '@/components/Schema';
import PageWrapper from '@/components/Template/PageWrapper';
import courses from '@/data/experience/courses';
import degrees from '@/data/experience/degrees';
import { categories, skills } from '@/data/experience/skills';
import work from '@/data/experience/work';
import { t } from '@/data/i18n/ui';
import profile from '@/data/profile.json';
import { LANG_TAG, type Lang, localizePath } from '@/lib/i18n';
import { createPageMetadata } from '@/lib/metadata';
import { breadcrumbNode, profilePageNode, SITE_URL } from '@/lib/schema';
import { AUTHOR_NAME } from '@/lib/utils';

const SUMMARY: Record<Lang, string> = {
  en: `Design lead with ${profile.professionalYears} years of experience working with Unity, both in academic and professional environments. I have published 3 commercial games in consoles in the last 5 years, developing multiple skills and features with a high degree of responsibility and independence.`,
  es: `Responsable de diseño con ${profile.professionalYears} años de experiencia trabajando con Unity, tanto en el ámbito académico como en el profesional. He publicado 3 juegos comerciales para consola en los últimos 5 años, desarrollando múltiples habilidades y funcionalidades con un alto grado de responsabilidad y autonomía.`,
};

const COMPANIES =
  'AHEARTFULOFGAMES, CEU San Pablo, U-TAD, Gamelearn, Unusual Wonder';

const DESCRIPTION: Record<Lang, string> = {
  en: `${AUTHOR_NAME}'s complete resume. ${COMPANIES}.`,
  es: `Trayectoria completa de ${AUTHOR_NAME}: ${COMPANIES}.`,
};

export function experienceMetadata(lang: Lang): Metadata {
  return createPageMetadata({
    title: t(lang).experience.title,
    description: DESCRIPTION[lang],
    path: '/experience/',
    lang,
  });
}

export default function ExperiencePage({ lang }: { lang: Lang }) {
  const text = t(lang);
  const url = `${SITE_URL}${localizePath('/experience/', lang)}`;
  const homeUrl = `${SITE_URL}${localizePath('/', lang)}`;

  return (
    <PageWrapper mainClassName="page-main--experience" lang={lang}>
      <SchemaGraph
        nodes={[
          profilePageNode({
            url,
            name: lang === 'en' ? 'About' : text.experience.title,
            description: SUMMARY[lang],
            hasBreadcrumb: true,
            inLanguage: lang === 'en' ? undefined : LANG_TAG[lang],
          }),
          breadcrumbNode(url, [
            { name: lang === 'en' ? 'Home' : 'Inicio', url: homeUrl },
            { name: lang === 'en' ? 'About' : text.experience.title, url },
          ]),
        ]}
      />
      <section>
        <header>
          <h1 className="page-title">{text.experience.title}</h1>
        </header>
        <p className="experience-summary">{SUMMARY[lang]}</p>
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

        <ExperienceNav lang={lang} />

        <div className="experience-content">
          <section id="skills" className="skills-section">
            <Skills skills={skills} categories={categories} lang={lang} />
          </section>

          <section id="resume" className="resume-section">
            <Resume data={work} lang={lang} />
          </section>

          <section id="education" className="education-section">
            <Education data={degrees} lang={lang} />
          </section>

          <section id="courses" className="courses-section">
            <Courses data={courses} lang={lang} />
          </section>

          {/* <section id="references" className="references-section">
            <References />
          </section> */}
        </div>
      </section>
    </PageWrapper>
  );
}
