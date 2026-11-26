/**
 * The CV PDFs: Level Design and Production, each in English and Spanish,
 * one A4 page each. Edit the text here, then run `npm run cv` to print the
 * PDFs into public/cv/. Dates must match companies.ts (a test checks them).
 *
 * Job titles and degree names stay in English in the Spanish CVs too.
 *
 * No imports: scripts/build-cv.mjs loads this file with plain Node.
 */

/** Same values as `Lang` in src/lib/i18n.ts. */
export type CvLang = 'en' | 'es';

export type ToolId =
  | 'unity'
  | 'devops'
  | 'gdocs'
  | 'jira'
  | 'github'
  | 'photoshop'
  | 'notion'
  | 'hacknplan'
  | 'csharp'
  | 'excel';

export interface CvProject {
  name: string;
  role: string;
  bullets: string[];
}

export interface CvJob {
  /** Id in companies.ts, so the dates can be checked against the site. */
  companyId: string;
  name: string;
  /** Path under public/. */
  logo: string;
  /** First and last month, as YYYY-MM. Omit `end` for an ongoing role. */
  start: string;
  end?: string;
  tools: ToolId[];
  /** A role line for jobs without projects, e.g. teaching. */
  role?: string;
  projects?: CvProject[];
  bullets?: string[];
}

export interface CvVariant {
  id: 'level-design' | 'production';
  lang: CvLang;
  /** How the site's download links name this CV. */
  label: string;
  /** Shown next to the name. */
  title: string;
  /** File name in public/cv/. */
  fileName: string;
  overview: string;
  jobs: CvJob[];
}

/** Everything on a CV that isn't the overview or the jobs, per language. */
export interface CvLocale {
  location: string;
  site: { label: string; url: string };
  personal: string[];
  education: { years: string; text: string }[];
  headings: {
    overview: string;
    career: string;
    personal: string;
    education: string;
    tools: string;
  };
  /** January first. */
  months: string[];
  present: string;
}

export const cvName = 'Santiago Rodríguez Bedate';

export const cvContact = {
  email: 'santiago.rodriguez.bedate@gmail.com',
  phone: '+34 627 656 000',
  linkedin: {
    label: 'linkedin.com/in/santiagorbedate',
    url: 'https://www.linkedin.com/in/santiagorbedate',
  },
  site: { label: 'santibedate.com', url: 'https://www.santibedate.com' },
  location: 'Madrid, Spain',
};

export const toolNames: Record<ToolId, string> = {
  unity: 'Unity',
  devops: 'DevOps',
  gdocs: 'GDocs',
  jira: 'Jira',
  github: 'GitHub',
  photoshop: 'Photoshop',
  notion: 'Notion',
  hacknplan: 'HackNPlan',
  csharp: 'C#',
  excel: 'Excel',
};

/** The legend at the bottom, in this order. Company bars use the same order. */
export const cvTools: ToolId[] = [
  'unity',
  'devops',
  'gdocs',
  'jira',
  'github',
  'photoshop',
  'notion',
  'hacknplan',
  'csharp',
  'excel',
];

export const cvPersonal: string[] = [
  'I consider myself an extrovert, although serious and realistic when it comes to game development. Spanish is my native language, and I have professional working proficiency in English.',
  "Over the years I've developed a special interest in economy, politics and urbanism, mostly due to my formal education in History. I've also been developing my skills as a DJ, taking advantage of my tech knowledge.",
];

export const cvEducation = [
  { years: '2012–2013', text: "Master's Degree in Game Design, U-TAD" },
  {
    years: '2004–2012',
    text: "Bachelor's Degree in History, Universidad Autónoma de Madrid",
  },
];

export const cvLocales: Record<CvLang, CvLocale> = {
  en: {
    location: cvContact.location,
    site: cvContact.site,
    personal: cvPersonal,
    education: cvEducation,
    headings: {
      overview: 'Professional Overview',
      career: 'Career',
      personal: 'Personal Information',
      education: 'Education',
      tools: 'Production Software',
    },
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    present: 'Present',
  },
  es: {
    location: 'Madrid, España',
    site: {
      label: 'santibedate.com/es',
      url: 'https://www.santibedate.com/es/',
    },
    personal: [
      'Me considero extrovertido, aunque serio y realista cuando se trata de desarrollar videojuegos. Mi lengua materna es el español y tengo un nivel profesional de inglés.',
      'Con los años he desarrollado un especial interés por la economía, la política y el urbanismo, sobre todo por mi formación en Historia. También he ido desarrollando mis habilidades como DJ, aprovechando mis conocimientos técnicos.',
    ],
    // Degree names stay in English, as in the English CV.
    education: cvEducation,
    headings: {
      overview: 'Perfil profesional',
      career: 'Trayectoria',
      personal: 'Información personal',
      education: 'Formación',
      tools: 'Software de producción',
    },
    months: [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ],
    present: 'actualidad',
  },
};

const AVAILABILITY: Record<CvLang, string> = {
  en: 'Based in Madrid, open to remote or hybrid work and to relocating within the EU, from January 2027.',
  es: 'Vivo en Madrid y estoy abierto a trabajo en remoto o híbrido y a trasladarme dentro de la UE, a partir de enero de 2027.',
};

const TMNT = 'Teenage Mutant Ninja Turtles: Mutants Unleashed';
const DRAGONS = 'DreamWorks Dragons: Legends of the Nine Realms';
const SPIRIT = "DreamWorks Spirit: Lucky's Big Adventure";

/** The bullets, per language. Both CVs pick from these. */
const lines = {
  en: {
    freelanceProject: 'Unannounced 3D action game (under NDA)',
    freelance: [
      'Designing traversal metrics, level flowcharts and blockout rules.',
      'Level design consulting: creating and setting up workflows for a team of 3 level designers.',
    ],
    tmntLead:
      'Led a team of 4 level designers and a scale-up in production workflows to produce 40 levels.',
    tmntAuthored:
      "Authored 30% of the game's levels and directly supervised the rest.",
    tmntDocs:
      'Developed a documentation system to improve feedback between internal and external clients and the Level Design team.',
    tmntJira:
      'Supported Production and QA with a Jira implementation of the production schedule and the level creation pipeline.',
    dragonsAuthored:
      "Authored 60% of the game's levels and integrated their gameplay content: arenas, puzzles and cameras.",
    dragonsKit:
      'Used a modular kit to keep production agile, building 10-minute levels in under 2 weeks.',
    dragonsLoc:
      'Took charge of localization into 20+ languages, as the link between our outsourcers and the external client.',
    dragonsMentor:
      "Authored 60% of the game's levels while mentoring a junior level designer.",
    spiritMap:
      'Owned the 5 km² world map from concept to final implementation, plus its traversal puzzles and collectibles.',
    spiritOps:
      'Built production workflows and led day-to-day operations, milestones and client communication.',
    spiritOpsProduction:
      'Built production workflows and led day-to-day operations, managing milestones and reporting to internal and external stakeholders.',
    spiritCovid:
      'Shipped through COVID with a junior-heavy team, mentoring artists and designers and building trust between Art and Code.',
    ceu: [
      'Taught game design and VR experiences, and ran a production role-play campaign built on real-life development situations.',
    ],
    utad: [
      'Taught 8 different courses to 300+ students, from game mechanics to projects run in industry-like conditions.',
      'Created and supervised the content for those courses, both core and optional, across the degree.',
    ],
    gamelearn: [
      'Product Owner in the development of gamified online training courses.',
      'Helped implement production systems with Jira and Shotgun.',
    ],
    unusual: [
      'Junior Game Designer on 2 football games: Fútbol Stars and Fútbol Cuatro Fantasy.',
      'As an intern, built nearly 280 levels in 6 months in Unity; 68 shipped in Fútbol Stars.',
    ],
    overviewLevelDesign: `Lead Level Designer with 13 years in games. I design action spaces for console games: traversal, combat arenas and cameras. I've shipped 3 console games for DreamWorks and Nickelodeon IPs (published by Outright Games), and led the level design team that delivered 40 levels for TMNT: Mutants Unleashed. ${AVAILABILITY.en}`,
    overviewProduction: `Producer and Lead Level Designer with 13 years in games. I've produced and designed 3 console games for DreamWorks and Nickelodeon IPs (published by Outright Games): production workflows and Jira pipelines, reporting to external clients and localization into 20+ languages, while the studio grew from 6 to 31 people. ${AVAILABILITY.en}`,
  },
  es: {
    freelanceProject: 'Juego de acción 3D sin anunciar (bajo NDA)',
    freelance: [
      'Diseño de métricas de traversal, diagramas de flujo de niveles y reglas de blockout.',
      'Consultoría de diseño de niveles: creación e implantación de flujos de trabajo para un equipo de 3 level designers.',
    ],
    tmntLead:
      'Dirigí un equipo de 4 level designers y el escalado de los flujos de producción para crear 40 niveles.',
    tmntAuthored:
      'Diseñé el 30 % de los niveles del juego y supervisé directamente el resto.',
    tmntDocs:
      'Creé un sistema de documentación para mejorar el feedback entre clientes internos y externos y Level Design.',
    tmntJira:
      'Apoyé a Producción y QA implantando en Jira el calendario de producción y el pipeline de creación de niveles.',
    dragonsAuthored:
      'Diseñé el 60 % de los niveles del juego e integré su contenido jugable: arenas, puzles y cámaras.',
    dragonsKit:
      'Usé un kit modular para mantener una producción ágil, con niveles de 10 minutos en menos de 2 semanas.',
    dragonsLoc:
      'Me encargué de la localización a más de 20 idiomas, como enlace entre nuestros proveedores externos y el cliente.',
    dragonsMentor:
      'Diseñé el 60 % de los niveles del juego y fui mentor de un level designer junior.',
    spiritMap:
      'Responsable del mapa del mundo de 5 km² de principio a fin, con sus puzles de traversal y coleccionables.',
    spiritOps:
      'Creé los flujos de producción y dirigí el día a día, los hitos y la comunicación con el cliente.',
    spiritOpsProduction:
      'Creé los flujos de producción y dirigí el día a día: gestión de hitos y reporting a stakeholders internos y externos.',
    spiritCovid:
      'Lanzamos el juego en plena COVID con un equipo mayoritariamente junior; fui mentor de artistas y diseñadores y generé confianza entre Arte y Programación.',
    ceu: [
      'Impartí diseño de videojuegos y experiencias VR, y dirigí una campaña de role-play de producción basada en casos reales.',
    ],
    utad: [
      'Impartí 8 asignaturas a más de 300 alumnos, de mecánicas de juego a proyectos en condiciones como las de la industria.',
      'Creé y supervisé el contenido de esas asignaturas, obligatorias y optativas, a lo largo del grado.',
    ],
    gamelearn: [
      'Product Owner en el desarrollo de cursos de formación online gamificados.',
      'Ayudé a implantar sistemas de producción con Jira y Shotgun.',
    ],
    unusual: [
      'Junior Game Designer en 2 juegos de fútbol: Fútbol Stars y Fútbol Cuatro Fantasy.',
      'En prácticas, creé casi 280 niveles en 6 meses con Unity; 68 llegaron a Fútbol Stars.',
    ],
    overviewLevelDesign: `Lead Level Designer con 13 años en la industria del videojuego. Diseño espacios de acción para juegos de consola: traversal, arenas de combate y cámaras. He lanzado 3 juegos de consola basados en licencias de DreamWorks y Nickelodeon (publicados por Outright Games) y dirigí el equipo de diseño de niveles que entregó los 40 niveles de TMNT: Mutants Unleashed. ${AVAILABILITY.es}`,
    overviewProduction: `Producer y Lead Level Designer con 13 años en la industria del videojuego. He producido y diseñado 3 juegos de consola basados en licencias de DreamWorks y Nickelodeon (publicados por Outright Games): flujos de producción y pipelines en Jira, reporting a clientes externos y localización a más de 20 idiomas, mientras el estudio crecía de 6 a 31 personas. ${AVAILABILITY.es}`,
  },
} satisfies Record<CvLang, Record<string, string | string[]>>;

const AHOG = {
  companyId: '06_ahog',
  name: 'AHEARTFULOFGAMES',
  logo: '/images/complogo/old/aheartfulofgames_complogo_02.png',
  start: '2020-01',
  end: '2025-08',
  tools: [
    'unity',
    'devops',
    'gdocs',
    'jira',
    'github',
    'photoshop',
    'notion',
    'hacknplan',
    'csharp',
    'excel',
  ] as ToolId[],
};

/** The jobs after AHEARTFULOFGAMES, the same on both CVs. */
function earlierJobs(lang: CvLang): CvJob[] {
  const text = lines[lang];

  return [
    {
      companyId: '05_ceu',
      name: 'CEU San Pablo',
      logo: '/images/complogo/old/ceusanpablo_complogo_02.png',
      start: '2022-09',
      end: '2024-01',
      tools: ['unity', 'gdocs'],
      role: "Associate Professor, Master's Degree in Virtual Reality",
      bullets: text.ceu,
    },
    {
      companyId: '04_utad',
      name: 'U-TAD',
      logo: '/images/complogo/utad-complogo.webp',
      start: '2017-02',
      end: '2019-07',
      tools: ['unity', 'gdocs', 'github', 'hacknplan', 'csharp'],
      role: 'Associate Professor, B.A. in Game Design',
      bullets: text.utad,
    },
    {
      companyId: '03_gamelearn',
      name: 'Gamelearn',
      logo: '/images/complogo/old/gamelearn_complogo_02.png',
      start: '2016-03',
      end: '2017-03',
      tools: ['jira', 'photoshop', 'excel'],
      bullets: text.gamelearn,
    },
    {
      companyId: '02_unusualwonder',
      name: 'Unusual Wonder',
      logo: '/images/complogo/unusualwonder-complogo.webp',
      start: '2013-07',
      end: '2015-10',
      tools: ['unity', 'github', 'photoshop', 'excel'],
      bullets: text.unusual,
    },
  ];
}

function freelance(lang: CvLang): CvJob {
  return {
    companyId: '07_freelance',
    name: 'Freelance',
    logo: '/images/complogo/freelance-complogo.webp',
    start: '2025-12',
    tools: ['unity'],
    projects: [
      {
        name: lines[lang].freelanceProject,
        role: 'Game & Level Design Consultant',
        bullets: lines[lang].freelance,
      },
    ],
  };
}

function levelDesignCv(lang: CvLang): CvVariant {
  const text = lines[lang];

  return {
    id: 'level-design',
    lang,
    label: lang === 'en' ? 'Level Design' : 'Diseño de niveles',
    title: 'Lead Level Designer',
    fileName:
      lang === 'en'
        ? 'Santiago-Rodriguez-Bedate_Lead-Level-Designer_CV.pdf'
        : 'Santiago-Rodriguez-Bedate_Lead-Level-Designer_CV_ES.pdf',
    overview: text.overviewLevelDesign,
    jobs: [
      freelance(lang),
      {
        ...AHOG,
        projects: [
          {
            name: TMNT,
            role: 'Lead Level Designer',
            bullets: [
              text.tmntLead,
              text.tmntAuthored,
              text.tmntDocs,
              text.tmntJira,
            ],
          },
          {
            name: DRAGONS,
            role: 'Senior Level Designer & Production',
            bullets: [text.dragonsAuthored, text.dragonsKit, text.dragonsLoc],
          },
          {
            name: SPIRIT,
            role: 'Producer & Game Designer',
            bullets: [text.spiritMap, text.spiritOps],
          },
        ],
      },
      ...earlierJobs(lang),
    ],
  };
}

function productionCv(lang: CvLang): CvVariant {
  const text = lines[lang];

  return {
    id: 'production',
    lang,
    label: lang === 'en' ? 'Production' : 'Producción',
    title: 'Producer',
    fileName:
      lang === 'en'
        ? 'Santiago-Rodriguez-Bedate_Producer_CV.pdf'
        : 'Santiago-Rodriguez-Bedate_Producer_CV_ES.pdf',
    overview: text.overviewProduction,
    jobs: [
      freelance(lang),
      {
        ...AHOG,
        projects: [
          {
            name: TMNT,
            role: 'Lead Level Designer',
            bullets: [text.tmntLead, text.tmntJira, text.tmntDocs],
          },
          {
            name: DRAGONS,
            role: 'Production & Senior Level Designer',
            bullets: [text.dragonsLoc, text.dragonsKit, text.dragonsMentor],
          },
          {
            name: SPIRIT,
            role: 'Producer & Game Designer',
            bullets: [text.spiritOpsProduction, text.spiritCovid],
          },
        ],
      },
      ...earlierJobs(lang),
    ],
  };
}

/** Every CV, English first. Within a language, Level Design first. */
export const cvVariants: CvVariant[] = [
  levelDesignCv('en'),
  productionCv('en'),
  levelDesignCv('es'),
  productionCv('es'),
];

export interface CvDownload {
  id: CvVariant['id'];
  lang: CvLang;
  label: string;
  fileName: string;
  href: string;
}

/** The PDFs as the site links to them. */
export const cvDownloads: CvDownload[] = cvVariants.map(
  ({ id, lang, label, fileName }) => ({
    id,
    lang,
    label,
    fileName,
    href: `/cv/${fileName}`,
  }),
);

/** The CVs in one language, Level Design first: the first is the default. */
export function cvDownloadsFor(lang: CvLang): CvDownload[] {
  return cvDownloads.filter((cv) => cv.lang === lang);
}
