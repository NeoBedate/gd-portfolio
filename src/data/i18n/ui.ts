/**
 * Interface text in both languages: navigation, buttons, headings and
 * labels. Page content (bios, projects, the résumé) lives in the data
 * files, with Spanish versions in `src/data/es/`.
 *
 * `es` must have every key `en` has; TypeScript enforces it.
 */

import type { Lang } from '@/lib/i18n';

const en = {
  langName: 'English',
  languageSwitch: {
    label: 'Language',
    /** Tooltip on the link to the other language. */
    goTo: 'Read this site in English',
  },
  skipToContent: 'Skip to content',
  opensInNewTab: '(opens in new tab)',
  nav: {
    primary: 'Primary',
    home: 'home',
    about: 'About',
    experience: 'Experience',
    portfolio: 'Portfolio',
    archive: 'Archive',
    contact: 'Contact',
    openMenu: 'Open navigation menu',
    closeMenu: 'Close navigation menu',
    menu: 'Navigation menu',
  },
  theme: {
    toLight: 'Switch to light mode',
    toDark: 'Switch to dark mode',
  },
  cv: {
    button: 'CV',
    buttonLabel: 'Download CV (PDF, in English)',
    download: 'Download CV (PDF)',
    /** Tooltip on the CV buttons: which language the PDF is in. */
    tooltip:
      'The CV is in English. Switch the site to Spanish for the Spanish CV.',
    linksLabel: 'CV in English (PDF):',
  },
  hero: {
    openToWork: 'Open to work',
    currently: 'Currently',
    seeWork: 'See my work',
  },
  home: {
    selectedWork: 'Selected work',
    allProjects: 'All projects',
    byTheNumbers: 'By the numbers',
    whatIBring: 'What I bring',
  },
  footer: {
    source: 'Source',
    lastUpdated: 'Last updated',
    explore: 'Explore',
    connect: 'Connect',
    legal:
      'All game titles, trademarks, footage and screenshots belong to their respective owners and are shown here for portfolio purposes only.',
  },
  contact: {
    title: 'Get in Touch',
    responseTime: 'Usually respond within 24 hours',
    findMeOn: 'Or find me on',
    openToWork: 'Open to work',
  },
  about: {
    title: 'About Me',
    sectionsLabel: 'About sections',
  },
  experience: {
    title: 'Experience',
    skills: 'Skills',
    resume: 'Resume',
    education: 'Education',
    courses: 'Courses',
    coursesTitle: 'University Courses',
    credits: 'Full game credits on MobyGames',
    present: 'Present',
    allSkills: 'All',
  },
  portfolio: {
    title: 'Portfolio',
    subtitle: 'A selection of video games I helped to create.',
    selectedProjects: 'Selected Projects',
    tech: 'Tech:',
    responsibilities: 'Responsibilities',
    released: 'Released',
    close: 'Close project details',
  },
  archive: {
    title: 'Archive',
    subtitle: 'Other professional and amateur projects.',
    otherProjects: 'Other Projects',
    learningProjects: 'Learning Projects',
  },
  notFound: {
    title: 'Page Not Found',
    message: "The page you're looking for doesn't exist or has been moved.",
    home: 'Go Home',
    contact: 'Contact Me',
  },
};

export type UiStrings = typeof en;

const es: UiStrings = {
  langName: 'Español',
  languageSwitch: {
    label: 'Idioma',
    goTo: 'Leer esta web en español',
  },
  skipToContent: 'Saltar al contenido',
  opensInNewTab: '(se abre en una pestaña nueva)',
  nav: {
    primary: 'Principal',
    home: 'inicio',
    about: 'Sobre mí',
    experience: 'Experiencia',
    portfolio: 'Portfolio',
    archive: 'Archivo',
    contact: 'Contacto',
    openMenu: 'Abrir el menú de navegación',
    closeMenu: 'Cerrar el menú de navegación',
    menu: 'Menú de navegación',
  },
  theme: {
    toLight: 'Cambiar a modo claro',
    toDark: 'Cambiar a modo oscuro',
  },
  cv: {
    button: 'CV',
    buttonLabel: 'Descargar CV (PDF, en español)',
    download: 'Descargar CV (PDF)',
    tooltip:
      'El CV está en español. Cambia la web a inglés para descargar el CV en inglés.',
    linksLabel: 'CV en español (PDF):',
  },
  hero: {
    openToWork: 'Disponible',
    currently: 'Actualmente',
    seeWork: 'Ver mi trabajo',
  },
  home: {
    selectedWork: 'Trabajo destacado',
    allProjects: 'Todos los proyectos',
    byTheNumbers: 'En cifras',
    whatIBring: 'Qué aporto',
  },
  footer: {
    source: 'Código fuente',
    lastUpdated: 'Última actualización:',
    explore: 'Explorar',
    connect: 'Contacto',
    legal:
      'Todos los títulos, marcas, vídeos y capturas de los juegos pertenecen a sus respectivos propietarios y se muestran aquí solo como portfolio.',
  },
  contact: {
    title: 'Hablemos',
    responseTime: 'Suelo responder en menos de 24 horas',
    findMeOn: 'O encuéntrame en',
    openToWork: 'Qué busco',
  },
  about: {
    title: 'Sobre mí',
    sectionsLabel: 'Secciones de Sobre mí',
  },
  experience: {
    title: 'Experiencia',
    skills: 'Habilidades',
    resume: 'Trayectoria',
    education: 'Formación',
    courses: 'Asignaturas',
    coursesTitle: 'Asignaturas impartidas',
    credits: 'Créditos completos en MobyGames',
    present: 'Actualidad',
    allSkills: 'Todas',
  },
  portfolio: {
    title: 'Portfolio',
    subtitle: 'Una selección de los videojuegos en los que he trabajado.',
    selectedProjects: 'Proyectos destacados',
    tech: 'Tecnología:',
    responsibilities: 'Responsabilidades',
    released: 'Lanzado en',
    close: 'Cerrar los detalles del proyecto',
  },
  archive: {
    title: 'Archivo',
    subtitle: 'Otros proyectos, profesionales y amateur.',
    otherProjects: 'Otros proyectos',
    learningProjects: 'Proyectos de aprendizaje',
  },
  notFound: {
    title: 'Página no encontrada',
    message: 'La página que buscas no existe o se ha movido.',
    home: 'Ir al inicio',
    contact: 'Contactar',
  },
};

const ui: Record<Lang, UiStrings> = { en, es };

/** The interface text for a language. */
export function t(lang: Lang): UiStrings {
  return ui[lang];
}
