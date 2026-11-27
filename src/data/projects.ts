export type ProjectLinkKind =
  | 'steam'
  | 'itch'
  | 'youtube'
  | 'doc'
  | 'press'
  | 'other';

/** A link out: a store page, a video, a document, press coverage… */
export interface ProjectLink {
  label: string;
  href: string;
  kind: ProjectLinkKind;
}

/** One problem → decision → outcome card on a case study. */
export interface ProblemCard {
  problem: string;
  decision: string;
  outcome: string;
}

export interface ProjectDetails {
  id: string;
  /**
   * The project's page: `/portfolio/<slug>/`. Projects without one have no
   * page (see `src/lib/caseStudies.ts`).
   */
  slug?: string;
  /** Absent means released. */
  status?: 'released' | 'in-progress';
  /** The first link is where the project's card leads when it has no page. */
  links?: ProjectLink[];
  publisher?: string;
  platforms?: string[];
  engine?: string;
  /** The whole team, e.g. '31 people'. */
  team?: string;
  /** Shown after the role, e.g. 'Level design team of 4, including me'. */
  roleDetail?: string;
  /**
   * What was mine, stated plainly. When present, the case study shows it
   * instead of `highlights`.
   */
  ownership?: string[];
  /** Case study: context and constraints. */
  context?: string[];
  /** Case study: problem → decision → outcome cards. */
  problems?: ProblemCard[];
  /** Case study: what shipped and how it went. */
  results?: string[];
  /** Case study: what I'd do differently. */
  lessons?: string[];
  coverImage: string;
  dimensions?: string;
  genre?: string;
  startDate?: string;
  endDate?: string;
  publishingDate?: string;
  name: string;
  studio?: string;
  overview: string;
  position: string;
  summary?: string;
  highlights: string[];
  quote?: string;
  images?: string[];
  /** Alt text for each of `images`, in the same order. */
  imageAlts?: string[];
  trailer?: string;
  /** Videos shown in full, with sound and controls (not looping clips). */
  videos?: ProjectVideo[];
  sections?: ProjectResponsibilities[];
  tech?: string[];
  selected?: boolean;
  other?: boolean;
  learning?: boolean;
}

export interface ProjectVideo {
  title: string;
  description: string;
  src: string;
  poster: string;
  width: number;
  height: number;
}

export interface ProjectResponsibilities {
  task: string;
  taskExecution: string[];
  pageSize: number;
  taskImage?: string;
  taskImageAlt?: string;
  taskCaption?: string;
  gifs: string[][];
  /** Alt text for each clip or still in `gifs`, in the same shape. */
  alts?: string[][];
  captions: string[];
  /** The same view at two stages, compared with a slider. */
  comparisons?: Comparison[];
}

/**
 * Two images of exactly the same view (same camera, same crop), e.g. a
 * blockout and its final art, shown one over the other with a divider.
 */
export interface Comparison {
  before: string;
  after: string;
  beforeLabel: string;
  afterLabel: string;
  beforeAlt: string;
  afterAlt: string;
  caption: string;
  /** Size of both images, for the frame's aspect ratio. */
  width: number;
  height: number;
}

const data: ProjectDetails[] = [
  {
    // Under NDA: describe the work, never the game, until it's announced.
    id: '13_freelanceNda',
    coverImage: '',
    startDate: '2025-12-01',
    name: 'Unannounced 3D action game (under NDA)',
    overview: '',
    position: 'Game & Level Design Consultant',
    highlights: [
      'Designing traversal metrics, level flowcharts and blockout rules for an unannounced 3D action game.',
      'Level design consulting: creating and setting up workflows for a team of 3 level designers.',
    ],
  },
  {
    id: '12_tmnt',
    slug: 'tmnt-mutants-unleashed',
    links: [
      {
        label: 'Steam',
        href: 'https://store.steampowered.com/app/2460130/Teenage_Mutant_Ninja_Turtles_Mutants_Unleashed/',
        kind: 'steam',
      },
    ],
    publisher: 'Outright Games',
    platforms: [
      'PC',
      'PlayStation 4',
      'PlayStation 5',
      'Xbox One',
      'Xbox Series X|S',
      'Nintendo Switch',
    ],
    engine: 'Unity',
    team: '31 people',
    roleDetail: 'Level design team of 4, including me',
    ownership: [
      '12 of the 40 levels end-to-end, and direct supervision of the other 28.',
      "The level design team's guidelines, processes and deadlines.",
      'A documentation system for feedback between the level design team and internal and external clients.',
    ],
    context: [
      'A 10+ hour action platformer on a Nickelodeon license, published by Outright Games.',
      'The target: 40 to 50 levels, plus set pieces and bosses, most of them connected for quests.',
      'Spaces had to be built tightly around several traversal feats and combat abilities.',
      "The franchise's unique visual identity meant leaving room for art in every level.",
      'An 18-month production for 31 people.',
    ],
    problems: [
      {
        problem:
          'The Mall was built around a circular structure that was hard to honor with camera work.',
        decision:
          'We ditched the circular layout and rebuilt the level from the ground up.',
        outcome:
          'The rebuilt spaces worked better on camera and for traversal.',
      },
      {
        problem:
          'Portals were built as both entry and exit, but once the story went from a rogue-like structure to a linear one, they were rarely used both ways.',
        decision:
          'Quests went linear: one point of entry, one path, one point of exit.',
        outcome:
          'It built anticipation and fit the gameplay constraints, but raised production overhead on levels heavy on narrative beats.',
      },
      {
        problem:
          '40 to 50 levels, plus set pieces and bosses, for a level design team of 4.',
        decision:
          'We split the levels among ourselves, and each of us also took a feature present in every level (camera work, blockouts, arenas, set pieces), playing to our strengths. I talked with QA every day.',
        outcome:
          'A flexible, reliable team that delivered more, and better, than expected in production and post-production.',
      },
    ],
    results: [
      'Shipped on 18 October 2024 on PC, PlayStation 4 and 5, Xbox One, Xbox Series X|S and Nintendo Switch.',
      '40 levels delivered, 12 of them mine end-to-end.',
    ],
    lessons: [
      'Polish the camera feel later. We spent a lot of time on it too early, and it cost us time.',
      "Don't design around features that aren't ready. We designed around interactables and props we were still waiting for, which caused a lot of back and forth.",
    ],
    coverImage: '/images/projects/project-card-10-tmnt.webp',
    dimensions: '3D',
    genre: 'Action platformer',
    startDate: '2022-03-15',
    endDate: '2024-08-15',
    publishingDate: '2024-10-18',
    name: 'Teenage Mutant Ninja Turtles: Mutants Unleashed',
    studio: 'AHEARTFULOFGAMES',
    overview:
      'An action platformer where the player takes control of the four ninja turtles, battling through New York in order to uncover a conspiracy involving the "Mewbies" and the chaos they are spreading through the city.',
    position: 'Lead Level Designer',
    summary:
      'As a Lead, I was tasked with providing action-focused game spaces for a 10+ hour game. Given the nature of the gameplay, spaces needed to be tightly designed for several traversal feats and combat abilities, so I nurtured my team with clear guidelines, processes, deadlines and expectations. Additionally, I helped the Production team to create our Jira project and processes for the whole production, a key step in an 18-month project for 31 people.',
    highlights: [
      'Led a team of 4 level designers and a scale-up in production workflows to produce 40 levels.',
      "Authored 30% of the game's levels and directly supervised the rest.",
      'Developed a documentation system to increase feedback quality between internal and external clients, and the Level Design team.',
      'Supported Production and QA through a successful Jira implementation of our Production schedule and level creation pipeline.',
    ],
    images: [
      '/images/projects/12_tmnt/tmnt-mu-title.webp',
      '/images/projects/12_tmnt/mutants-pc-20240122-131957x4.webp',
      '/images/projects/12_tmnt/mutants-pc-20240125-164412x4.webp',
      '/images/projects/12_tmnt/mutants-pc-20240119-173550x4.webp',
      '/images/projects/12_tmnt/mutants-pc-20240119-175746x4.webp',
      '/images/projects/12_tmnt/mutants-pc-20240119-200232x4.webp',
      '/images/projects/12_tmnt/mutants-pc-20240122-140023x4.webp',
    ],
    imageAlts: [
      'Teenage Mutant Ninja Turtles: Mutants Unleashed logo.',
      'A turtle in a misty subway station.',
      'Leo and Raph fighting enemies in a sewer hideout strung with lights.',
      'A turtle on a neon-lit Uptown street at dusk.',
      'A turtle on a street corner below a neon Coffee Shop sign.',
      'Donnie swinging his staff at a large mutant in a floodlit stadium.',
      'A turtle running out of a round sewer pipe.',
    ],
    sections: [
      {
        task: 'Traversal and combat solutions',
        taskExecution: [
          'We tested and delivered levels as proof of concept for <b>traversal and combat</b> mainly. That led us to think of levels as solitary entities mostly, instead of connecting them, leaving traces of that interconnection only at the portals.',
          'We divided levels among ourselves, to maximize output and hit the number of 40 levels as soon as possible. Next, everyone took care of features present on every level: that way everyone knows the whole scope of the game but also each can rely on their strengths: camera work, blockouts, arena creation, set pieces, etc...',
          'At the same time, I personally took care of some level renovations from the ground up (some levels were far off from the quality expected after initial passes) and started communicating every day with QA: documenting level layouts; expected results on traversal and combat abilities and interactive props; and critical errors on the game flow.',
          'After a year and a half, this mixed approach of responsibilities within the department made our team very flexible, focused on bringing the studio together both on features and content, and a powerhouse of reliability within our corporate structure. We delivered way more, and way better, than expected during production and post-production.',
        ],
        pageSize: 1,
        gifs: [
          [
            '/images/projects/12_tmnt/bk-06-wind-01.mp4',
            '/images/projects/12_tmnt/bk-06-wind-02.mp4',
          ],
          [
            '/images/projects/12_tmnt/bk-05-screenshot-2023-02-28-174057.webp',
            '/images/projects/12_tmnt/bk-05-screenshot-2023-02-28-174119.webp',
          ],
          [
            '/images/projects/12_tmnt/bk-05-stairs-01.mp4',
            '/images/projects/12_tmnt/bk-05-stairs-02.mp4',
          ],
          [
            '/images/projects/12_tmnt/bx-03-joker-stairs-01.mp4',
            '/images/projects/12_tmnt/bx-03-joker-stairs-02.mp4',
          ],
          [
            '/images/projects/12_tmnt/bx-05-battle.mp4',
            '/images/projects/12_tmnt/bx-05-battle-02.mp4',
          ],
          [
            '/images/projects/12_tmnt/bridge-01.webp',
            '/images/projects/12_tmnt/bridge-jumps.mp4',
          ],
        ],
        alts: [
          [
            'Blockout: Leo riding wind gusts past spinning fans.',
            'Leo crossing a rooftop wind-gust jump by a water tower.',
          ],
          [
            "Blockout of The Mall's circular atrium, with ring-shaped floors.",
            'Another view of The Mall blockout, its round balconies around a central void.',
          ],
          [
            'Leo running up a staircase in The Mall blockout.',
            'Leo running up a staircase in The Mall, with final art.',
          ],
          [
            'Blockout: Donnie climbing a long staircase.',
            'Leo grinding down the rail of a graffiti-covered staircase.',
          ],
          [
            'Blockout: a turtle walking down a corridor into the stadium.',
            'Leo walking down a dark passage, with final art.',
          ],
          [
            'The four turtles walking onto the bridge.',
            "A turtle jumping along the bridge's cables.",
          ],
        ],
        captions: [
          '1. Our blockout process let us model traversal puzzles quickly, which helped the pacing of levels.',
          '2. Some screenshots of BK_05, later known in-game as The Mall, with a circular structure that was hard to honor with camera work and had to be ditched.',
          '3. After the rebuild, we see here one of the spaces from The Mall which worked better on camera and traversal.',
          '4. We recreated several iconic places from NY City, such as the West 167th Street Stairs (or "Joker Stairs")...',
          '5. ...the Yankee Stadium...',
          "6. ...and Brooklyn's bridge, a level in which I take special pride as it is my very own reinterpretation of the famous bridge. Here we can see it fully dressed.",
        ],
      },
      {
        task: 'Creative challenges',
        taskExecution: [
          'Portals, cameras and art dressing were the main challenges on the level design workflow.',
          'Early on development, each portal was meant to function as both entry and exit to give freedom to the Narrative Department. However, as the narrative changed from a "rogue-likesque" structure to a more linear one, we came to a point where portals were rarely used for both purposes at all. Quests demanded: one point of entry; one path; one point of exit.',
          'While this approach provided anticipation in terms of narrative and fitted gameplay constraints, the transition to a linear structure came with a hidden cost: production overhead rose, especially for levels heavy on narrative beats, so our first assessment of camera placement and blockout polishing was insufficient. Cameras needed to convey a strong sense of direction and anticipation, which increased iteration times.',
          'Lastly, level design had to implement gameplay props for traversal challenges and combat arenas, as well as dress some corners to make levels feel alive. All these aspects are where most of the iteration time was allocated.',
        ],
        pageSize: 1,
        taskImage: '/images/projects/12_tmnt/mt-04-pre.webp',
        taskImageAlt:
          'Planning sheet for the Midtown metro level: a layout diagram with portals, quest routes and reference photos.',
        taskCaption:
          'Planning for Midtown metro level, with portals marked and quests running through the level highlighted.',
        gifs: [
          [
            '/images/projects/12_tmnt/bk-02-high.mp4',
            '/images/projects/12_tmnt/bk-02-battle.mp4',
          ],
          [
            '/images/projects/12_tmnt/bk-02-last-arc-01.mp4',
            '/images/projects/12_tmnt/bk-02-last-arc-02.mp4',
          ],
          [
            '/images/projects/12_tmnt/bk-02-upview.webp',
            '/images/projects/12_tmnt/bk-02-final.webp',
          ],
        ],
        alts: [
          [
            'Leo running across a rooftop with skylights.',
            'A turtle fighting on a rooftop among barrels and skylights.',
          ],
          [
            'The turtles running along a rooftop beside the railway tracks.',
            'A turtle racing down a street full of debris.',
          ],
          [
            'Top-down view of the BK_02 blockout.',
            'Top-down view of BK_02 with its arenas and portals marked in red.',
          ],
        ],
        captions: [
          '1. While we tried to preserve vector movement on screen, sometimes we went for a more cinematic feel during combat',
          '2. Aside from art dressing, Level Design populated traversal sections and arenas with interactive props to keep a vibrant picture of a New York on a crisis',
          '3. After we decide how the level connects to others, we placed an early layout with portals to other levels and we ran through all the quests that will cross the level.',
        ],
        comparisons: [
          {
            before: '/images/projects/12_tmnt/bk-02-upview.webp',
            after: '/images/projects/12_tmnt/bk-02-proposal-aligned.webp',
            beforeLabel: 'Blockout',
            afterLabel: 'Proposal',
            beforeAlt: 'Top-down view of the BK_02 blockout.',
            afterAlt:
              'The same view with the proposal drawn over it in red, orange and blue lines.',
            caption:
              'BK_02 from above: the blockout, and the proposal drawn over it. Red marks the part of the level that is playable as a whole, orange the blocks of geometry that were relocated, and blue the portals relocated within the level.',
            width: 1181,
            height: 664,
          },
        ],
      },
      {
        task: 'Level Guidelines',
        taskExecution: [
          'Our main focus was to <b>streamline level design</b> and be able to produce at least x2 to x3 levels more than needed to provide Creative Direction a selection of ideas, so we worked at 3 levels of depth.',
          '<b>At high level</b>, we were given a target ("40 to 50 levels total, plus set-pieces and bosses: most of them interconnected for quests"), so we created a <b>map of the boroughs</b> (which eventually became the game\'s map) and searched for interesting places on each of them. We also looked at common environments (rooftops, streets, sewers and subway tunnels) to help art and gameplay production schedules.',
          '<b>At mid level</b>, we took a 3-pass approach designed to quickly iterate: biome and gameplay focus; camera and arena placing; and art & collision corrections. These passes, with the second being the most crucial but time consuming, helped us find a theme for each level while keeping overall cohesion between playable spaces.',
          '<b>At low level</b>, we focused on resolving action-blocks at first (traversal challenges, arenas design and narrative beats), giving space for art integration due to the unique visual identity of the franchise. Blockouts were switched for finished assets and surfaces for textures via replacing tool.',
        ],
        pageSize: 1,
        taskImage: '/images/projects/12_tmnt/map-hud-04.webp',
        taskImageAlt:
          "Illustrated map of New York's boroughs: Uptown, Midtown, Hell's Kitchen, Downtown, the Bronx, Queens, Brooklyn and Staten Island.",
        taskCaption:
          'The Five Boroughs, with Manhattan partitioned into several recognizable pieces.',
        gifs: [
          [
            '/images/projects/12_tmnt/map-01.webp',
            '/images/projects/12_tmnt/map-02.webp',
          ],
          [
            '/images/projects/12_tmnt/map-03.webp',
            '/images/projects/12_tmnt/map-04.webp',
          ],
          [
            '/images/projects/12_tmnt/hk-01-pass-3.webp',
            '/images/projects/12_tmnt/hk-01-final.webp',
          ],
          [
            '/images/projects/12_tmnt/dt-06-pass-2.webp',
            '/images/projects/12_tmnt/dt-06-final.webp',
          ],
          [
            '/images/projects/12_tmnt/bk-05-pass-1.webp',
            '/images/projects/12_tmnt/bk-05-final.webp',
          ],
        ],
        alts: [
          [
            'Diagram of the city map and level typology, with the levels grouped by borough.',
            'Level connection diagram for Downtown, Brooklyn and Staten Island.',
          ],
          [
            "Connection diagram of Brooklyn's levels, with the Streets level highlighted.",
            'Layout diagram of BK_02 with its numbered portals to other levels.',
          ],
          [
            'HK_01 docks in pass 3: a large green container in the middle of the arena, next to a white van.',
            'The same docks in the final, with dressed ground: the middle is clear, with a smaller metal container to the left and the van to the right.',
          ],
          [
            'DT_06 in pass 2: Donnie fighting on a round raised plaza with plain grey ground.',
            'The round plaza in the final, painted with a large sugar skull and hung with bunting, with Leo fighting on it.',
          ],
          [
            'BK_05 in pass 1: Leo among café tables and planters under flat blue lighting.',
            'The same café area in the final: Leo fighting an enemy beside the escalator, among tables, a pillar and shop windows.',
          ],
        ],
        captions: [
          '1. Levels were first envisioned as part of the city and its boroughs.',
          '2. After we decide how the level connects to others, we placed an early layout with portals to other levels and all the quests that will cross the level.',
          '3. HK_01, the docks, in pass 3 and in the final, after a later art pass. The container in the middle was interesting, but it ended up causing a lot of camera issues.',
          '4. DT_06 in pass 2 and in the final. Its round plaza worked as a rare open space for the first fight against the hippo.',
          '5. BK_05, The Mall, in pass 1 and in the final. The characters read far more clearly in the final, in a level that suits throwing objects at enemies.',
        ],
      },
      // {
      //   task: 'Camera work',
      //   taskExecution: [
      //     'We took an hibrid approach to cameras, making them more cinematic while providing a sense of sturdiness needed for quick-pace action. Up to 15 entities could be on screen competing for player attention, so cameras had a pivot that anchor the center of the screen while we handcrafted camera angles, soft edges for panning and zoom levels.',
      //    '1st pass for constrains: biome selection, blockout and camera set-up (more on this later). With these basics, we could start placing traversal challenges and their cameras. Narrative passes could place their first iterations of story bits or tutorials, and artists could make a pass on environment feel and camera issues that may arise.',
      //    '2nd pass for arenas: once the basic blockout of the level is done, we place arenas on the selected spaces and start to tweak both enemy selection and cameras to serve the story. We later ditched the enemy selection part, as the dynamic difficulty system could change enemies depending on player performance during the game.',
      //    '3rd pass for art & gameplay corrections: once the level is sound on gameplay, goes straight for art dressing and lighting work. Then it comes back to level design for camera corrections, collision checks and narrative adjustments.',
      //    'After these passes, the level is done and goes to testing. This usually took us between 2-3 weeks, depending on client feedback.',
      //     'On small spaces this proved to be a challenge, as the need to keep the camera close to avoid out-of-bounds shenanigans was paramount. We resolved this by playing with the aperture of the lenses, less camera movement and having some latitude on black planes that cover empty spaces.',
      //     'Lastly, cameras were always thought with forward action in mind. Painting invisible lines that guide the player towards the next place was of utmost importance, as we prioritize a natural pathfinding by camera rather than extradiegetic help.'
      //     /////////////'Now, levels weren´t built on the air. Well except for the Airship. Ehem.',
      //   ],
      //   pageSize: 1,
      //   taskImage: '/images/projects/12_tmnt/sub-start.mp4',
      //   taskCaption: 'In this instance, the camera takes us from the bottom left to the upper right of the screen.',
      //   gifs:[
      //     ['/images/projects/12_tmnt/bx-05-run.mp4', '/images/projects/12_tmnt/bx-05-run-02.mp4'],
      //     ['/images/projects/12_tmnt/bx-05-battle.mp4', '/images/projects/12_tmnt/bx-05-battle-02.mp4'],
      //     ['/images/projects/12_tmnt/mt-04-combat.mp4', '/images/projects/12_tmnt/airship-grind.mp4'],
      //   ],
      //   captions: [
      //     'While we tried to preserve vector movement on screen, sometimes we went for a more cinematic feel during combat',
      //     'One of the first decisions was to have some cameras from behind to support reveals. Our first pass was crude...',
      //     '...but the second played better on the following cutscene.',
      //     'And of course, to power some special movements and situations like high stakes combats or dangerous grinds.'
      //   ],
      // },
    ],
    trailer: 'https://www.youtube.com/embed/8XZhhctEr9s?si=MENWcazhr_6P71aW',
    tech: [
      'Unity',
      'Plastic SCM',
      'Jira',
      'Confluence',
      'GDocs',
      'Excel',
      'Draw.io',
    ],
    selected: true,
  },
  {
    id: '11_dragons',
    slug: 'dragons-legends-of-the-nine-realms',
    links: [
      {
        label: 'Steam',
        href: 'https://store.steampowered.com/app/1721440/DreamWorks_Dragons_Legends_of_The_Nine_Realms/',
        kind: 'steam',
      },
    ],
    publisher: 'Outright Games',
    engine: 'Unity',
    platforms: [
      'PC',
      'PlayStation 4',
      'PlayStation 5',
      'Xbox One',
      'Xbox Series X|S',
      'Nintendo Switch',
    ],
    team: 'About 13 people, plus contractors',
    ownership: [
      '15 of the 25 levels, with their arenas, puzzles and cameras.',
      'Mentoring a junior level designer.',
      'Localization into 20+ languages: implementing it in the engine, and keeping in touch with the localization company hired by our publisher, so translations reached the studio on time.',
    ],
    context: [
      'A 3D action platformer for kids on a DreamWorks license, published by Outright Games.',
      'A 12-month production for about 13 people, plus a couple of contractors.',
      '25 levels: 5 realms with 5 levels each (3 core levels, 1 set piece and 1 boss fight).',
      'Hand-placed isometric cameras, for quick-paced action with several dragons on screen.',
      'New paths open on earlier levels as the player gathers four dragons, so levels had to support backtracking.',
    ],
    problems: [
      {
        problem:
          '25 levels in 12 months, with traversal abilities that bugged out easily on imprecise geometry.',
        decision:
          'We built levels with a modular kit the studio bought, following level design rules we wrote as a team.',
        outcome:
          'Traversal and combat sections closed much quicker, with 10-minute levels done in under 2 weeks. But learning the kit and working around its bugs kept us chasing our schedule.',
      },
      {
        problem:
          'Puzzles had to read clearly for kids, from a fixed isometric camera.',
        decision:
          'We tilted the camera slightly to put keys and locks in frame.',
        outcome:
          "Puzzles were easier for kids to understand, but we couldn't hide solutions or use complex layouts to encourage exploration.",
      },
      {
        problem:
          'Every realm is underground, yet the caverns had to feel big under a fixed camera.',
        decision:
          "With the time the modular kit saved, we worked with art on several layers of visualization matched to the camera's field of view.",
        outcome:
          'Big, complex-looking caverns. Balancing them with clear gameplay was tricky, but it worked.',
      },
    ],
    results: [
      'Shipped on 23 September 2022 on PC, PlayStation 4 and 5, Xbox One, Xbox Series X|S and Nintendo Switch.',
      '25 levels across 5 realms, 15 of them mine.',
      'Localized into 20+ languages.',
    ],
    lessons: [
      "Leave time to learn a new tool. The modular kit was a good idea, but in a 12-month project we couldn't learn it fully or fix the bugs that plagued it, and we chased our own schedule for most of the project.",
    ],
    coverImage: '/images/projects/project-card-09-dragons.webp',
    dimensions: '3D',
    genre: 'Action',
    startDate: '2021-02-15',
    endDate: '2022-03-15',
    publishingDate: '2022-09-23',
    name: 'DreamWorks Dragons: Legends of the Nine Realms ',
    studio: 'AHEARTFULOFGAMES',
    overview:
      'A 3D platformer with isometric(ish) view where we take control of Thunder and explore vastly different realms while collecting new allies and fighting powerful dragons.',
    position: 'Senior Level Designer & Production',
    summary:
      'Focused my professional path within the company on level design, assuming those responsibilities along with mentoring a junior level designer, while still carrying some aspects of project production. Furthermore, I took charge of localization efforts and coordinated with external Production to bring the game to 20+ languages.',
    highlights: [
      "Authored 60% of the game's levels and integrated their gameplay content, such as arenas, puzzles and cameras.",
      'Used a modular system to tackle level design and maintain an agile production system, creating 10 minute levels in less than 2 weeks.',
      'Built and maintained battle arenas: enemy placing, trap placing and camera placing.',
      'Supported the creation of core mechanics and development workflows for its integration within levels.',
      'Took charge of localization efforts, working as nexus between our outsourcers and the external client, as well as taking care of its game implementation.',
    ],
    images: [
      '/images/projects/11_dragons/dragons-logo-1.webp',
      '/images/projects/11_dragons/fire-realm.webp',
      '/images/projects/11_dragons/ice-realm.webp',
      '/images/projects/11_dragons/crystal-realm.webp',
    ],
    imageAlts: [
      'DreamWorks Dragons: Legends of the Nine Realms logo.',
      'A rocky path between pools of lava in the fire realm.',
      'Ice spires and a frozen arch in the ice realm.',
      'A cavern wall of crystals and twisted roots.',
    ],
    videos: [
      {
        title: 'Developer diary',
        description:
          "The game's official developer diary (2022). Juan Raigada, the studio's CEO and Creative Director, and I talk about how the game was conceived and made. I'm on screen from 0:35.",
        src: '/images/projects/11_dragons/dragons-dev-diary.mp4',
        poster: '/images/projects/11_dragons/dragons-dev-diary-poster.webp',
        width: 1280,
        height: 720,
      },
    ],
    sections: [
      {
        task: 'Camera work & set pieces',
        taskExecution: [
          'For this project we needed to work with hand-placed cameras, with an isometric view that favors quick-paced action with multiple dragons on screen.',
          'Along the way we wanted to avoid camera cuts as much as possible to help readability and avoid headaches with many camera movements. With this in mind, we created a main camera that follow the player around, showing always the path forward but turning around when necessary.',
          'When puzzles, arenas and secrets are on the front view, the camera usually conveys that something is going on in different ways. By tilting the camera slightly to put keys and locks on frame, we made puzzles easier to understand for kids.',
        ],
        pageSize: 0,
        taskImage: '/images/projects/11_dragons/traversal-mix.mp4',
        taskImageAlt:
          'A montage of the dragons traversing caverns in several realms, seen from the isometric camera.',
        gifs: [
          [
            '/images/projects/11_dragons/w01-04-set-piece-01.mp4',
            '/images/projects/11_dragons/w02-04-set-piece-02.mp4',
          ],
          [
            '/images/projects/11_dragons/w03-04-set-piece-03.mp4',
            '/images/projects/11_dragons/w02-02-puzzle-01.mp4',
          ],
        ],
        alts: [
          [
            'Set piece: Thunder racing through a dark cavern.',
            'Set piece: Plowhorn crossing a frozen cavern.',
          ],
          [
            'A camera cut to rising lava, with the line "Watch out, Thunder! That doesn\'t look good!"',
            'Puzzle: Plowhorn among ice and fire crystals.',
          ],
        ],
        captions: [
          '1. Set pieces with several gimmicks like lava or debris chasing the player, or freezing winds trying to stop them, were introduced to shake up the pacing.',
          '2. Camera cuts were kept for key moments, like a hazard about to reach the player or a puzzle reveal that shows what a switch just unlocked.',
        ],
      },
      {
        task: 'Level Guidelines & modularization',
        taskExecution: [
          'The world of Dragons is divided into 5 realms with 5 levels each, making a total of 25 levels. On detail, each realm has: 3 core levels (exploration, combat & narrative); 1 set piece with special mechanics; and 1 boss fight.',
          'A distribution that enhanced the adventure aspect of the game, with leaner levels at the beginning encouraging exploration. As the player progresses through the story discovering new mechanics, enemies and completing its own squad of dragons, new paths become unlockable on previous levels. To get all crystals, the player has to backtrack and use the four dragons.',
          'Along with a wide array of interactables (explosive crystals, gusts of wind, lava pits, spikes, ice walls...) we introduced a plugin to create levels modularly. This gave us the flexibility to create precise geometries without worrying much about traversal abilities getting bugged: with an array of geometry modules, we adapted to pre-established rules of level design, and closed traversal and combat sections much quicker.',
          'This modularization gave us time to rethink environments along with art. Every realm is underground by diegesis so we worked on several layers of visualization to match the camera FOV, with details suggesting that we were in big, complex caverns. Adjusting that to the need of clear gameplay was tricky but satisfactory.',
        ],
        pageSize: 0,
        gifs: [
          [
            '/images/projects/11_dragons/w01-01-chasm.mp4',
            '/images/projects/11_dragons/w01-01-fly-01.mp4',
          ],
          [
            '/images/projects/11_dragons/w01-02-puzzle-01.mp4',
            '/images/projects/11_dragons/w03-01-puzzle-01.mp4',
          ],
        ],
        alts: [
          [
            'Thunder crossing a cavern path, with the hint "The dragons must keep moving".',
            'Thunder flying across a wide cavern.',
          ],
          [
            'Puzzle: a movable block next to a crystal-blocked path.',
            'Puzzle: a movable block beside a lava pool in the fire realm.',
          ],
        ],
        captions: [
          '1. We pulled back on the camera every time we could in order to make the levels feel bigger and richer.',
          '2. Traversal puzzles imply tracking blocks and the crystals involved in activating/unlocking them.',
        ],
      },
    ],
    trailer: 'https://www.youtube.com/embed/BQY01xBqb1o?si=Ok8Fn9os5_xFJmMj',
    tech: [
      'Unity',
      'Plastic SCM',
      'SourceTree',
      'Hack N Plan',
      'GDocs',
      'Excel',
    ],
    selected: true,
  },
  {
    id: '10_spirit',
    slug: 'spirit-luckys-big-adventure',
    links: [
      {
        label: 'Steam',
        href: 'https://store.steampowered.com/app/1270720/DreamWorks_Spirit_Luckys_Big_Adventure/',
        kind: 'steam',
      },
    ],
    publisher: 'Outright Games',
    engine: 'Unity',
    platforms: [
      'PC',
      'PlayStation 4',
      'Xbox One',
      'Xbox Series X|S',
      'Nintendo Switch',
      'Stadia',
      'Amazon Luna',
    ],
    team: '11 core members',
    ownership: [
      'The world map, from concept to final implementation, including its 5 km² size.',
      'Level design, shared with another designer: traversal puzzles, animals and collectibles across the map.',
      'Production: workflows, milestones, day-to-day operations, and reporting to internal and external stakeholders.',
      'Localization, UI tasks and meetings with the external client.',
    ],
    context: [
      'A narrative open-world game on a DreamWorks license, published by Outright Games.',
      'The external client asked for riding Spirit to feel like an experience within nature, with sightseeing and room to roam.',
      'A core team of 11, taking the production home through the COVID pandemic.',
      'Seven platforms, including cloud streaming on Stadia and Amazon Luna.',
    ],
    problems: [
      {
        problem:
          'Riding Spirit had to feel like a journey through nature, with sightseeing and room to roam.',
        decision:
          'After some tests, I set the world map at 5 km², with different biomes around a central lake.',
        outcome:
          'It felt like riding through a real region. The Code team had to stream the terrain in chunks, which worked on every platform and allowed more detail, but held us back for a while.',
      },
      {
        problem: 'The COVID pandemic sent the production home mid-project.',
        decision:
          'I built production workflows and ran day-to-day operations, managing milestones and reporting to internal and external stakeholders.',
        outcome: 'We pushed through and shipped on seven platforms.',
      },
    ],
    results: [
      'Shipped in June 2021 on PC, PlayStation 4, Xbox One, Xbox Series X|S, Nintendo Switch, Stadia and Amazon Luna.',
      'A 5 km² world map, streamed in chunks on every platform.',
    ],
    lessons: [
      'Watch ambition in pre-production. The 5 km² map needed terrain streamed in chunks, which ended up working on every platform but held us back for some time.',
      'Start UI early. It mattered far more to our publisher than to us, and on the next projects we started on it earlier.',
    ],
    coverImage: '/images/projects/project-card-08-spirit.webp',
    dimensions: '3D',
    genre: 'Open World',
    startDate: '2019-12-04',
    endDate: '2021-03-15',
    publishingDate: '2021-06-01',
    name: "DreamWorks Spirit: Lucky's Big Adventure",
    studio: 'AHEARTFULOFGAMES',
    overview:
      "A narrative, chill open world game based on the universe of Spirit where players have the opportunity to explore the wildlife of a valley while riding Spirit and uncover the secrets of an old treasure map related to Lucky's mom.",
    position: 'Producer & Game Designer',
    summary:
      'I doubled as Game Designer and Producer while taking the production home and pushing through the COVID Pandemic. I handled localization, project tasks, external client meetings, UI tasks and, with another designer, level design.',
    highlights: [
      'Built production workflows and led day to day operations within the team, managing milestones and reporting to internal and external stakeholders.',
      'Mentored artists and game designers alike, built trust with the Art & Code teams and helped to nurture a healthy culture within the company.',
      'Assumed direct control of Level Design, taking full ownership of the world map: developed the feature from concept to final implementation.',
      'Created several traversal puzzles, animals and collectibles, populating the world map.',
    ],
    images: [
      '/images/projects/10_spirit/spirit-logo.webp',
      '/images/projects/10_spirit/showcase-01.webp',
      '/images/projects/10_spirit/showcase-02.webp',
      '/images/projects/10_spirit/showcase-03.webp',
      '/images/projects/10_spirit/showcase-04.webp',
    ],
    imageAlts: [
      "DreamWorks Spirit: Lucky's Big Adventure logo.",
      'Three riders on horseback overlooking a valley of blossoming trees.',
      'Lucky greeting Spirit in a meadow.',
      'Lucky riding Spirit on the lake shore.',
      'Horses and riders gathered in a forest clearing.',
    ],
    sections: [
      {
        task: 'The World Map',
        taskExecution: [
          'Spirit has a 5 km² map, which was one of the main challenges of the project. I was in charge of the feature, and decided this size because one of the mandates from the external client was that riding Spirit had to be an experience within nature, with sightseeing and enough space to roam. After some tests, we were very happy with the feeling of going through a real region with different biomes and cute corners, so we went with that.',
          'However, this did not come for free: the Code team had to go for a partition of the map that loads and unloads chunks of terrain in real time. It ended up working on all platforms and allowed for better detailing but was a hindrance for some time. This was a very humbling lesson about the dangers of being very ambitious in pre-production.',
        ],
        pageSize: 0,
        gifs: [
          [
            '/images/projects/10_spirit/spirit-run-01.mp4',
            '/images/projects/10_spirit/spirit-run-02.mp4',
          ],
          [
            '/images/projects/10_spirit/spirit-run-03.mp4',
            '/images/projects/10_spirit/spirit-run-04.mp4',
          ],
          [
            '/images/projects/10_spirit/early-corner-01.webp',
            '/images/projects/10_spirit/early-corner-02.webp',
          ],
        ],
        alts: [
          [
            'Riding Spirit across the valley at night, toward a quest marker.',
            'Riding Spirit along a dirt path, toward a quest marker.',
          ],
          [
            'Riding past the lake, toward a quest marker.',
            'Riding through a rocky canyon at sunset.',
          ],
          [
            'A stream running past rocks and ferns.',
            'A forest path between rocks and trees.',
          ],
        ],
        captions: [
          '1. We wanted to provide a very smooth sensation of riding Spirit, so the camera leaned back to allow players to appreciate the scenery.',
          '2. The lake was a central element in the game, as every biome envelops the lake from one side or another, providing very different sceneries.',
          '3. We worked alongside environmental artist to create cute corners on several key places that the player would traverse often.',
        ],
      },
    ],
    trailer: 'https://www.youtube.com/embed/imX-1wNppog?si=FFlZjFhrAk8fmB4L',
    tech: [
      'Unity',
      'Tortoise',
      'SourceTree',
      'Hack N Plan',
      'GDocs',
      'Excel',
      'Photoshop',
      'C#',
    ],
    selected: true,
  },
  {
    id: '09_ceuProject',
    coverImage: '',
    startDate: '2022-09-19',
    endDate: '2024-01-12',
    name: "Master's Degree in Virtual Reality",
    overview: '',
    position: 'Associate Professor',
    highlights: [
      'Taught Advanced Experiences and Game Design, centered around VR video games and their interactions with real and virtual environments.',
      'Extended the production role-play into a campaign where every student had to deal with a series of real-life situations that happen during the production of a video game.',
    ],
  },
  {
    id: '08_utadProject',
    coverImage: '',
    startDate: '2017-02-01',
    endDate: '2019-07-31',
    name: 'B.A. in Game Design',
    overview: '',
    position: 'Associate Professor',
    highlights: [
      'Taught Game Mechanics (I), Design for New Platforms, Projects II and VI, A.I. for Designers and several Unity workshops.',
      'Responsible for grading assignments such as GDDs, preparing academic materials and arranging tutorships for these courses.',
      'Fostered several role-playing activities as producer, helping students to develop projects on real industry-like conditions.',
    ],
  },
  {
    id: '07_2100',
    links: [
      {
        label: 'Course page',
        href: 'https://gamestrategies.io/en/catalog/2100-a-customer-service-course-for-companies/',
        kind: 'other',
      },
    ],
    coverImage: '/images/projects/project-card-07-2100.webp',
    dimensions: '2D',
    genre: 'Training course',
    startDate: '',
    endDate: '',
    publishingDate: '2017-05-30',
    name: '2100',
    studio: 'Gamelearn',
    overview:
      'A training course with some progression sprinkled over it. Tailored to teach how to engage in public spaces as an employee.',
    position: 'Game Designer',
    highlights: [
      'Transitioned to a more holistic role and led artists and customer success agents into the fold of game development.',
      'Supervised previous courses to create reports on game design, UX and gameplay mechanics.',
    ],
    tech: ['SourceTree', 'GDocs', 'Photoshop', 'Excel', 'Shotgun'],
    other: true,
  },
  {
    id: '06_merchants2',
    links: [
      {
        label: 'Course page',
        href: 'https://gamestrategies.io/en/catalog/merchants-mastering-negotiation-and-closing-deals/',
        kind: 'other',
      },
    ],
    coverImage: '/images/projects/project-card-06-merchants.webp',
    dimensions: '2D',
    genre: 'Graphic Adventure / Training course',
    startDate: '',
    endDate: '',
    publishingDate: '2016-11-01',
    name: 'Merchants',
    studio: 'Gamelearn',
    overview:
      'A 10h experience on how to negotiate on various instances, from tactics to overall strategy. My role was supervising the remake as a Product Manager and improving UX as a Game Designer.',
    position: 'Game Designer',
    highlights: [
      'Helped to port Merchants into modern web technologies, streamlining UX and setting the bases for different projects.',
      'Performed several production tasks, filling a necessary role, which highlighted the need for a full-time producer.',
    ],
    other: true,
  },
  {
    id: '05_futbol4',
    coverImage: '/images/projects/project-card-05-futbolcuatro.webp',
    dimensions: '3D',
    genre: 'Fantasy Sport',
    startDate: '2014-12-10',
    endDate: '2016-08-26',
    publishingDate: '2016-12-16',
    name: 'Fútbol Cuatro Fantasy',
    studio: 'Unusual Wonder',
    overview:
      'Also called Epic Eleven during development, this project was meant to be one of the first football fantasy games in Spain.',
    position: 'Junior Game Designer',
    highlights: [
      'Developed the core gameplay along with the CEO.',
      'Balanced player salaries and adjusted stat weight on player valuations.',
    ],
    other: true,
  },
  {
    id: '04_futbolstars',
    links: [
      {
        label: 'Video',
        href: 'https://vimeo.com/87581171',
        kind: 'other',
      },
    ],
    coverImage: '/images/projects/project-card-04-futbolstars.webp',
    dimensions: '3D',
    genre: 'Sports Puzzle',
    startDate: '',
    endDate: '',
    publishingDate: '2014-11-20',
    name: 'Fútbol Stars',
    overview:
      'My first professional project, where I churned out levels like crazy and got acquainted with Unity while surrounded by veterans with 20+ years of experience.',
    studio: 'Unusual Wonder',
    position: 'Intern',
    highlights: [
      'Developed nearly 280 levels in 6 months using Unity 4.6. 68 ended up in the final product.',
      'Performed QA duties during the release phase of the game.',
      'Game published on the Play Store and App Store in 2014. No longer available.',
    ],
    tech: ['Unity'],
    other: true,
  },
  {
    id: '03_developers',
    coverImage: '/images/projects/project-card-03-developers.webp',
    dimensions: '3D',
    genre: 'Game Tycoon',
    startDate: '2017-06-09',
    endDate: '2018-10-29',
    publishingDate: '',
    name: 'The Developers',
    studio: 'Pelta Games',
    overview:
      'Our shot at developing a game with an actual budget, creating a concept in an attempt to win a European grant. As we did not get the grant, the project was shelved indefinitely.',
    position: 'Planner',
    highlights: [
      'Created the whole game concept and GDD.',
      'Documented every game system.',
    ],
    tech: ['Unity', 'GitHub', 'SmartGit', 'Hack N Plan', 'Photoshop', 'GDocs'],
    learning: true,
  },
  {
    id: '02_mercenaries',
    coverImage: '/images/projects/project-card-02-daredevils.webp',
    dimensions: '3D',
    genre: 'Strategy RPG',
    startDate: '2014-08-15',
    endDate: '2017-05-14',
    publishingDate: '',
    name: 'Daredevils: Mercenaries of Hadronia',
    studio: 'Pelta Games',
    overview:
      'Our second try was an adaptation of Crownless to the mobile market, in order to hone our skillset for mobile games.',
    position: 'Planner',
    highlights: [
      'Created character archetypes and game economy.',
      'Set up the economy as a F2P.',
    ],
    tech: ['Unity', 'GitHub', 'SmartGit', 'Hack N Plan', 'Photoshop', 'GDocs'],
    learning: true,
  },
  {
    id: '01_crownless',
    coverImage: '/images/projects/project-card-01-crownless.webp',
    dimensions: '3D',
    genre: 'Action RPG',
    startDate: '2012-09-14',
    endDate: '2014-07-18',
    publishingDate: '',
    name: 'Crownless: Knights of Hadronia',
    studio: 'Pelta Games',
    overview:
      'Our first game ever tried was a JRPG focused on replicating PSX classic vibes.',
    position: 'Planner',
    highlights: [
      'Wrote a script treatment for the whole adventure.',
      'Designed the main mechanics around the 7 playable characters.',
      'Led development in a producer capacity.',
    ],
    tech: ['Unity', 'GitHub', 'SmartGit', 'Hack N Plan', 'Photoshop', 'GDocs'],
    learning: true,
  },
];

export default data;
