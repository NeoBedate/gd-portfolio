/**
 * The two CV PDFs (Level Design and Production), one A4 page each.
 * Edit the text here, then run `npm run cv` to print the PDFs into
 * public/cv/. Dates must match companies.ts (a test checks them).
 *
 * No imports: scripts/build-cv.mjs loads this file with plain Node.
 */

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
  /** How the site's download links name this CV. */
  label: string;
  /** Shown next to the name. */
  title: string;
  /** File name in public/cv/. */
  fileName: string;
  overview: string;
  jobs: CvJob[];
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

const AVAILABILITY =
  'Based in Madrid, open to remote or hybrid work and to relocating within the EU, from January 2027.';

const freelance: CvJob = {
  companyId: '07_freelance',
  name: 'Freelance',
  logo: '/images/complogo/freelance-complogo.webp',
  start: '2025-12',
  tools: ['unity'],
  projects: [
    {
      name: 'Unannounced 3D action game (under NDA)',
      role: 'Game & Level Design Consultant',
      bullets: [
        'Designing traversal metrics, level flowcharts and blockout rules.',
        'Level design consulting: creating and setting up workflows for a team of 3 level designers.',
      ],
    },
  ],
};

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

const TMNT = 'Teenage Mutant Ninja Turtles: Mutants Unleashed';
const DRAGONS = 'DreamWorks Dragons: Legends of the Nine Realms';
const SPIRIT = "DreamWorks Spirit: Lucky's Big Adventure";

const ceu: CvJob = {
  companyId: '05_ceu',
  name: 'CEU San Pablo',
  logo: '/images/complogo/old/ceusanpablo_complogo_02.png',
  start: '2022-09',
  end: '2024-01',
  tools: ['unity', 'gdocs'],
  role: "Associate Professor, Master's Degree in Virtual Reality",
  bullets: [
    'Taught game design and VR experiences, and ran a production role-play campaign built on real-life development situations.',
  ],
};

const utad: CvJob = {
  companyId: '04_utad',
  name: 'U-TAD',
  logo: '/images/complogo/utad-complogo.webp',
  start: '2017-02',
  end: '2019-07',
  tools: ['unity', 'gdocs', 'github', 'hacknplan', 'csharp'],
  role: 'Associate Professor, B.A. in Game Design',
  bullets: [
    'Taught 8 different courses to 300+ students, from game mechanics to projects run in industry-like conditions.',
    'Created and supervised the content for those courses, both core and optional, across the degree.',
  ],
};

const gamelearn: CvJob = {
  companyId: '03_gamelearn',
  name: 'Gamelearn',
  logo: '/images/complogo/old/gamelearn_complogo_02.png',
  start: '2016-03',
  end: '2017-03',
  tools: ['jira', 'photoshop', 'excel'],
  bullets: [
    'Product Owner in the development of gamified online training courses.',
    'Helped implement production systems with Jira and Shotgun.',
  ],
};

const unusual: CvJob = {
  companyId: '02_unusualwonder',
  name: 'Unusual Wonder',
  logo: '/images/complogo/unusualwonder-complogo.webp',
  start: '2013-07',
  end: '2015-10',
  tools: ['unity', 'github', 'photoshop', 'excel'],
  bullets: [
    'Junior Game Designer on 2 football games: Fútbol Stars and Fútbol Cuatro Fantasy.',
    'As an intern, built nearly 280 levels in 6 months in Unity; 68 shipped in Fútbol Stars.',
  ],
};

export const cvVariants: CvVariant[] = [
  {
    id: 'level-design',
    label: 'Level Design',
    title: 'Lead Level Designer',
    fileName: 'Santiago-Rodriguez-Bedate_Lead-Level-Designer_CV.pdf',
    overview: `Lead Level Designer with 13 years in games. I design action spaces for console games: traversal, combat arenas and cameras. I've shipped 3 console games for DreamWorks and Nickelodeon IPs (published by Outright Games), and led the level design team that delivered 40 levels for TMNT: Mutants Unleashed. ${AVAILABILITY}`,
    jobs: [
      freelance,
      {
        ...AHOG,
        projects: [
          {
            name: TMNT,
            role: 'Lead Level Designer',
            bullets: [
              'Led a team of 4 level designers and a scale-up in production workflows to produce 40 levels.',
              "Authored 30% of the game's levels and directly supervised the rest.",
              'Developed a documentation system to improve feedback between internal and external clients and the Level Design team.',
              'Supported Production and QA with a Jira implementation of the production schedule and the level creation pipeline.',
            ],
          },
          {
            name: DRAGONS,
            role: 'Senior Level Designer & Production',
            bullets: [
              "Authored 60% of the game's levels and integrated their gameplay content: arenas, puzzles and cameras.",
              'Used a modular kit to keep production agile, building 10-minute levels in under 2 weeks.',
              'Took charge of localization into 20+ languages, as the link between our outsourcers and the external client.',
            ],
          },
          {
            name: SPIRIT,
            role: 'Producer & Game Designer',
            bullets: [
              'Owned the 25 km² world map from concept to final implementation, plus its traversal puzzles and collectibles.',
              'Built production workflows and led day-to-day operations, milestones and client communication.',
            ],
          },
        ],
      },
      ceu,
      utad,
      gamelearn,
      unusual,
    ],
  },
  {
    id: 'production',
    label: 'Production',
    title: 'Producer',
    fileName: 'Santiago-Rodriguez-Bedate_Producer_CV.pdf',
    overview: `Producer and Lead Level Designer with 13 years in games. I've produced and designed 3 console games for DreamWorks and Nickelodeon IPs (published by Outright Games): production workflows and Jira pipelines, reporting to external clients and localization into 20+ languages, while the studio grew from 6 to 31 people. ${AVAILABILITY}`,
    jobs: [
      freelance,
      {
        ...AHOG,
        projects: [
          {
            name: TMNT,
            role: 'Lead Level Designer',
            bullets: [
              'Led a team of 4 level designers and a scale-up in production workflows to produce 40 levels.',
              'Supported Production and QA with a Jira implementation of the production schedule and the level creation pipeline.',
              'Developed a documentation system to improve feedback between internal and external clients and the Level Design team.',
            ],
          },
          {
            name: DRAGONS,
            role: 'Production & Senior Level Designer',
            bullets: [
              'Took charge of localization into 20+ languages, as the link between our outsourcers and the external client.',
              'Used a modular kit to keep production agile, building 10-minute levels in under 2 weeks.',
              "Authored 60% of the game's levels while mentoring a junior level designer.",
            ],
          },
          {
            name: SPIRIT,
            role: 'Producer & Game Designer',
            bullets: [
              'Built production workflows and led day-to-day operations, managing milestones and reporting to internal and external stakeholders.',
              'Shipped through COVID with a junior-heavy team, mentoring artists and designers and building trust between Art and Code.',
            ],
          },
        ],
      },
      ceu,
      utad,
      gamelearn,
      unusual,
    ],
  },
];

export interface CvDownload {
  label: string;
  fileName: string;
  href: string;
}

/** The PDFs as the site links to them. The first is the default CV. */
export const cvDownloads: CvDownload[] = cvVariants.map(
  ({ label, fileName }) => ({ label, fileName, href: `/cv/${fileName}` }),
);
