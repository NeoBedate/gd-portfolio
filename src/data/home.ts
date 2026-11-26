/**
 * Home page content below the hero. Every number here is backed by the
 * Experience or Portfolio pages; keep them in step. The Spanish version
 * is in `es/home.ts`.
 */

import profile from './profile.json';

export interface FeaturedGame {
  /** Id in `projects.ts`: the tile takes the name and role from there. */
  projectId: string;
  /** Key art, 16:9. */
  image: string;
  /** Who owns the IP. */
  ip: string;
  publisher: string;
  /** One to three short facts, the first one the strongest. */
  facts: string[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface Strength {
  title: string;
  body: string;
}

/** The hero's pitch, split around the cited game title. */
export interface HeroTagline {
  before: string;
  cite: string;
  after: string;
}

export interface CurrentItem {
  text: string;
  /** Optional link, e.g. to a devlog or case study once one exists. */
  href?: string;
}

export const heroTagline: HeroTagline = {
  before: `I design action spaces for console games: traversal, combat arenas and cameras. ${profile.professionalYears} years in the industry, 3 console games shipped for DreamWorks and Nickelodeon IPs (published by Outright Games), and I led the level design team that delivered 40 levels for `,
  cite: 'TMNT: Mutants Unleashed',
  after: '.',
};

export const featuredGames: FeaturedGame[] = [
  {
    projectId: '12_tmnt',
    image: '/images/home/featured-tmnt.webp',
    ip: 'Nickelodeon',
    publisher: 'Outright Games',
    facts: ['Led a team of 4 level designers', '40 levels'],
  },
  {
    projectId: '11_dragons',
    image: '/images/home/featured-dragons.webp',
    ip: 'DreamWorks',
    publisher: 'Outright Games',
    facts: ['60% of the levels', 'Modular level kit', '20+ languages'],
  },
  {
    projectId: '10_spirit',
    image: '/images/home/featured-spirit.webp',
    ip: 'DreamWorks',
    publisher: 'Outright Games',
    facts: ['5 km² open world', 'Shipped through COVID with a junior team'],
  },
];

export const stats: Stat[] = [
  { value: '40', label: 'levels on TMNT, with a team of 4' },
  { value: '3', label: 'console games shipped' },
  { value: '5 km²', label: 'open world on Spirit' },
  { value: '20+', label: 'languages localized on Dragons' },
  { value: '6 → 31', label: 'people: how my last studio grew' },
  { value: '300+', label: 'university students taught' },
];

export const philosophy =
  "Readability first: when players can read a space at a glance, they're free to enjoy the challenge.";

export const strengths: Strength[] = [
  {
    title: 'Level Design',
    body: 'Action spaces for 3D console games: traversal, combat arenas and hand-placed cameras. Modular kits and blockout rules that keep a team fast and consistent.',
  },
  {
    title: 'Production',
    body: 'Jira pipelines that tie level creation, QA and the schedule together. Day-to-day work with external clients and outsourcers, and localization into 20+ languages.',
  },
  {
    title: 'Leadership',
    body: "Led a team of 4 level designers on TMNT and mentored juniors through Spirit and Dragons. I've also taught game design at university to 300+ students.",
  },
];

export const currently: CurrentItem[] = [
  { text: 'Consulting on an unannounced 3D action game (under NDA)' },
];
