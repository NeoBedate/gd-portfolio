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

/** The hero's pitch, told at more length. Keep the facts in step with it. */
const SUMMARY: Record<Lang, string> = {
  en: `I design action spaces for console games: traversal, combat arenas and cameras. In my ${profile.professionalYears} years in the industry I've shipped 3 console games for DreamWorks and Nickelodeon IPs (published by Outright Games), and I led the level design team that delivered 40 levels for TMNT: Mutants Unleashed. At AHEARTFULOFGAMES I worked a double role in design and production, from Jira pipelines to the day-to-day with external clients, while the studio grew from 6 to 31 people. I've also taught game design at university to 300+ students, and these days I consult on game and level design for an unannounced 3D action game (under NDA).`,
  es: `Diseño espacios de acción para juegos de consola: traversal, arenas de combate y cámaras. En mis ${profile.professionalYears} años en la industria he lanzado 3 juegos de consola con licencias de DreamWorks y Nickelodeon (publicados por Outright Games), y dirigí el equipo de diseño de niveles que entregó los 40 niveles de TMNT: Mutants Unleashed. En AHEARTFULOFGAMES tuve un doble rol en diseño y producción, de los pipelines en Jira al día a día con clientes externos, mientras el estudio crecía de 6 a 31 personas. También he enseñado diseño de videojuegos en la universidad a más de 300 alumnos, y ahora hago consultoría de diseño de juego y de niveles en un juego de acción 3D sin anunciar (bajo NDA).`,
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
