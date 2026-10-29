export interface ProjectDetails {
  id: string;
  url?: string;
  steamUrl?: string;
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
  trailer?: string;
  sections?: ProjectResponsibilities[];
  tech?: string[];
  featured?: boolean;
  other?: boolean;
  learning?: boolean;
}

export interface ProjectResponsibilities {
  task: string;
  taskExecution: string[];
  pageSize: number;
  taskImage: string;
  taskCaption: string;
  gifs: string[][];
  captions: string[];
}

const data: ProjectDetails[] = [
  {
    id: '12_tmnt',
    url: '#game-detail-wrap',
    steamUrl: 'https://store.steampowered.com/app/2460130/Teenage_Mutant_Ninja_Turtles_Mutants_Unleashed/',
    coverImage: '/images/projects/projectCard_10_tmnt.png',
    dimensions: '3D',
    genre: 'Action platformer',
    startDate: '2022-03-15',
    endDate: '2024-08-15',
    publishingDate: '2024-11-20',
    name: 'Teenage Mutant Ninja Turtles: Mutants Unleashed',
    studio: 'AHEARTFULOFGAMES',
    overview: 'An action platformer where the player takes control of the four ninja turtles, battling through New York in order to uncover a conspiracy involving the `Mewbies´ and the chaos they are spreading through the city.',
    position: 'Lead Level Designer',
    summary: 'As a Lead, I was tasked with providing action-focused game spaces for a +10h game. Given the nature of the gameplay, spaces needed to be tightly designed for several traversal feats and combat abilities.',
    highlights: [
      'Led a team of 4 level designers and a scale-up in production workflows to produce 40 levels.',
      'Assumed authorship of 30% of the game levels, plus direct supervision over the rest.',
      'Developed a documentation system to increase feedback quality between internal and external clients, and the Level Design team.',
      'Supported Production and QA through a successful Jira implementation of our Production schedule and level creation pipeline.',
    ],
    images: [
      '/images/projects/12_tmnt/mutants_pc_20240122-131957x4.png',
      '/images/projects/12_tmnt/mutants_pc_20240125-164412x4.png',
      '/images/projects/12_tmnt/mutants_pc_20240119-173550x4.png',
      '/images/projects/12_tmnt/mutants_pc_20240119-175746x4.png',
      '/images/projects/12_tmnt/mutants_pc_20240119-200232x4.png',
      '/images/projects/12_tmnt/mutants_pc_20240122-140023x4.png',
    ],
    sections: [
      {
        task: 'Level Design guidelines',
        taskExecution: [
          'Our main focus was to keep upping the quality in terms of level design. However, the turtles presented a more complex challenge to tackle than Dragons.',
          'Levels where initially set to be much more open: 2 minute traversal plus 3 minute combat tops; several paths converging onto intersections; and wide arenas designed to combat multiple enemy waves. Also, camera was envisioned to move around the scenery to support action and spectacular enemy take downs.',
          'This approach provided anticipation in terms of narrative and fitted gameplay constrains; however, it put us in front of to extensive levels that needed much iteration by several departments, which led to clogs on the level pipeline.',
          'Ultimately we pivoted to smaller, more contained levels with less intertwined paths. This allowed us to iterate faster on level blocking and correct camera work and enemy placing before art passes. Polishing was up to production feedback and artistic needs after that.'],
        pageSize: 1,
        taskImage: '/images/projects/12_tmnt/BK_02_a.png',
        taskCaption: 'One of the first iterations of Brooklyn streets (blue=combat arena)',
        gifs:[
          ['/images/projects/12_tmnt/BK_02 - upview.png', '/images/projects/12_tmnt/BK_02 - Proposal.png'],
          ['/images/projects/12_tmnt/tmnt_01.png', '/images/projects/12_tmnt/tmnt_02.png'],
          ['/images/projects/12_tmnt/tmnt_02.png', '/images/projects/12_tmnt/tmnt_02.png']
        ],
        captions: [
          'We cut some corners on geometry to accommodate simpler paths (red=external bounds; yellow=specific cameras; blue=traslated geometry)', 'Dolor', 'sit amet'
        ],      },
      {
        task: 'Camera work',
        taskExecution: [
          'We took an hibrid approach to cameras, making them more cinematic while providing a sense of sturdiness needed for quick-pace action. Up to 15 entities could be on screen competing for player attention, so cameras had a pivot that anchor the center of the screen while we handcrafted camera angles, soft edges for panning and zoom levels.',
        ],
        pageSize: 1,
        taskImage: '/images/projects/12_tmnt/tmnt_04.png',
        taskCaption: 'TaskCaption TaskCaption',
        gifs:[
          ['/images/projects/12_tmnt/tmnt_03.png', '/images/projects/12_tmnt/tmnt_03.png'],
          ['/images/projects/12_tmnt/tmnt_03.png', '/images/projects/12_tmnt/tmnt_04.png'],
          ['/images/projects/12_tmnt/tmnt_04.png', '/images/projects/12_tmnt/tmnt_04.png'],
        ],
        captions: [
          'Lorem Ipsum', 'Dolor', 'sit amet'
        ],
      },
    ],
    trailer: 'https://www.youtube.com/embed/8XZhhctEr9s?si=MENWcazhr_6P71aW',
    tech: ['Unity', 'Plastic SCM', 'Jira', 'Confluence', 'GDocs', 'Excel', 'Draw.io'],
    featured: true,
  },
  {
    id: '11_dragons',
    url: '#game-detail-wrap',
    steamUrl: 'https://store.steampowered.com/app/1721440/DreamWorks_Dragons_Legends_of_The_Nine_Realms/',
    coverImage: '/images/projects/projectCard_09_dragons.png',
    dimensions: '3D',
    genre: 'Action',
    startDate: '2021-02-15',
    endDate: '2022-03-15',
    publishingDate: '2022-09-23',
    name: 'DreamWorks Dragons: Legends of the Nine Realms ',
    studio: 'AHEARTFULOFGAMES',
    overview: 'A 3D platformer with isometric(ish) view where we take control of Thunder and explore vastly different realms while collecting new allies and fighting powerful dragons.',
    position: 'Senior Level Designer',
    summary: 'Focused my professional path within the company on design, assuming all level design responsibilities with a junior level designer, while still carrying part of the production.',
    highlights: [
      'Used a modular system to tackle level design and maintain an agile production system, creating 10 minute levels in less than 2 weeks.',
      'Took charge of localization efforts, working as nexus between our outsourcers and external client, as well as taking care of its implementation.',
      'Assumed authorship of 60% of the game levels as well as integrated its gameplay content such as arenas, puzzles and cameras.',
      'Support to the creation of main game mechanics and development workflows for its integration of levels.',
      'Built and maintained battle arenas, iterating enemy placing, trap placing and camera placing.',
    ],
    images: [
      '/images/projects/11_dragons/dragons_01.png',
      '/images/projects/11_dragons/dragons_02.png',
      '/images/projects/11_dragons/dragons_03.png',
      '/images/projects/11_dragons/dragons_04.png',
    ],
    sections: [
      {
        task:'Interactivity on levels',
        taskExecution: [
          'We introduced there a key aspect of gameplay: interactables. ',
        ],
        pageSize: 0,
        taskImage: '',
        taskCaption: '',
        captions: [
          '',
        ],
        gifs:[
          [],
          [],
          []
        ]
      },
    ],
    trailer: '',
    tech: ['Unity', 'Plastic SCM', 'SourceTree', 'Hack N Plan', 'GDocs', 'Excel'],
    featured: true,
  },
  {
    id: '10_spirit',
    steamUrl: 'https://store.steampowered.com/app/1270720/DreamWorks_Spirit_Luckys_Big_Adventure/',
    coverImage: '/images/projects/projectCard_08_spirit.png',
    dimensions: '3D',
    genre: 'Open World',
    startDate: '2019-12-15',
    endDate: '2021-03-15',
    publishingDate: '2021-06-01',
    name: 'DreamWorks Spirit: Lucky´s Big Adventure',
    studio: 'AHEARTFULOFGAMES',
    overview: 'A narrative, chill open world game based on the universe of Spirit where players have the opportunity to explore the wildlife of a valley while riding Spirit and uncover the secrets of an old treasure map related to Lucky´s mom.',
    position: 'Producer & Game Designer',
    summary: ' I doubled as Game Designer and Producer while taking the production home and pushing through the COVID Pandemic with financial success.',
    highlights: [
      'Built production workflows and led day to day operations within the team, managing milestones and reporting to internal and external stakeholders.',
      'Mentored several game designers and took direct responsibility of level design.',
      'Took full ownership of the world map, carrying the process from concept design to Unity implementation.',
      'Created several traversal puzzles and collectibles, and later integrated all of them on the world map.',
    ],
    images: [
      '/images/projects/10_spirit/spirit_01.png',
      '/images/projects/10_spirit/spirit_02.png',
      '/images/projects/10_spirit/spirit_03.png',
      '/images/projects/10_spirit/spirit_04.png',
    ],
    sections: [
      {
        task:'',
        taskExecution: [
          '',
        ],
        pageSize: 0,
        taskImage: '',
        taskCaption: '',
        captions: [
          '',
        ],
        gifs:[
          [],
          [],
          []
        ]
      },
    ],
    trailer: '',
    tech: ['Unity', 'Tortoise', 'SourceTree', 'Hack N Plan', 'GDocs', 'Excel', 'Photoshop','C#'],
    featured: true,
  },
  {
    id: '09_ceuProject',
    coverImage : '',
    startDate: '2022-09-19',
    endDate: '2024-01-12',
    name: 'M. D. in Virtual Reality',
    overview: '',
    position: 'Associate Professor',
    highlights: [
      'Taught Advanced Experiences and Game Design, centered around VR video games and their interactions with real and virtual environments.',
      'Took further the role-play in production, creating a sort of campaign where every student had to deal with a series of real life situations that happened around the production of a video game.',
    ],
  },
  {
    id: '08_utadProject',
    coverImage : '',
    startDate: '2017-02-01',
    endDate: '2019-07-31',
    name: 'B.A. in Game Design',
    overview: '',
    position: 'Associate Professor',
    highlights: [
      'Built production workflows and led day to day operations within the team, managing milestones and reporting to internal and external stakeholders.',
      'Mentored several game designers and took direct responsibility of a level designer.',
      'Took full ownership of the world map, designing and implementing it fully.',
      'Created several traversal puzzles and collectibles, integrating its gameplay with the world.',
    ],
  },  
  {
    id: '07_2100',
    url: 'https://gamestrategies.io/en/catalog/2100-a-customer-service-course-for-companies/',
    coverImage: '/images/projects/projectCard_07_2100.png',
    dimensions: '2D',
    genre: 'Training course',
    startDate: '',
    endDate: '',
    publishingDate: '2017-05-30',
    name: '2100',
    studio: 'Gamelearn',
    overview: 'A training course with some progression sprinkled over it. Tailored to teach how to engage in public spaces as an employee.',
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
    url: 'https://gamestrategies.io/en/catalog/merchants-mastering-negotiation-and-closing-deals/',
    coverImage: '/images/projects/projectCard_06_merchants.png',
    dimensions: '2D',
    genre: 'Graphic Adventure / Training course',
    startDate: '',
    endDate: '',
    publishingDate: '2016-11-01',
    name: 'Merchants',
    studio: 'Gamelearn',
    overview: 'A 10h experience on how to negotiate on various instances, from tactics to overall strategy. My role was supervising the remake as a Product Manager and improving UX as a Game Designer.',
    position: 'Game Designer',
    highlights: [
      'Helped to port Merchants into modern web technologies, streamlining UX and setting the bases for different projects.',
      'Performed several production tasks, filling a necessary role that will point out the need for a full-time producer.',
    ],
    tech: ['React', 'Node.js', 'Plaid API', 'MongoDB'],
    other: true,
  },
  {
    id: '05_futbol4',
    coverImage: '/images/projects/projectCard_05_futbolcuatro.png',
    dimensions: '3D',
    genre: 'Fantasy Sport',
    startDate: '2014-12-10',
    endDate: '2016-08-26',
    publishingDate: '2016-12-16',
    name: 'Fútbol Cuatro Fantasy',
    studio: 'Unusual Wonder',
    overview: 'Also called Epic Eleven during development, this project was meant to be one of the first football fantasy games in Spain.',
    position: 'Junior Game Designer',
    highlights: [
      'Developed the core gameplay along with the CEO.',
      'Balanced player salaries and adjusted stat weight on player valuations.',
    ],
    tech: ['React', 'Node.js', 'Plaid API', 'MongoDB'],
    other: true,
  },
  {
    id: '04_futbolstars',
    url: 'https://vimeo.com/87581171',
    coverImage: '/images/projects/projectCard_04_futbolstars.png',
    dimensions: '3D',
    genre: 'Sports Puzzle',
    startDate: '',
    endDate: '',
    publishingDate: '2014-11-20',
    name: 'Fútbol Stars',
    overview: 'My first professional project, were I churned out levels like crazy and got acquainted with Unity while being surrounded by 20y+ veterans.',
    studio: 'Unusual Wonder',
    position: 'Intern',
    highlights: [
      'Developed nearly 280 levels in 6 months using Unity 4.6. 68 ended up in the final product.',
      'Performed QA duties during the release phase of the game.',
      'Game published on Play Store and App Store on 2014. No longer available.',
      'Led development of core evaluation framework, vulnerability scanning, and automated red-teaming capabilities.',
    ],
    tech: ['React', 'Node.js', 'Plaid API', 'MongoDB'],
    other: true,
  },
  {
    id: '03_developers',
    url: '',
    coverImage: '/images/projects/projectCard_03_developers.png',
    dimensions: '3D',
    genre: 'Game Tycoon',
    startDate: '2017-06-09',
    endDate: '2018-10-29',
    publishingDate: '',
    name: 'The Developers',
    studio: 'Pelta Games',
    overview: 'Our shot at developing a game with an actual budget, creating a concept in an attempt to win an European grant. As we did not get the grant, the project was shelved indefinitely.',
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
    url: '',
    coverImage: '/images/projects/projectCard_02_daredevils.png',
    dimensions: '3D',
    genre: 'Strategy RPG',
    startDate: '2014-08-15',
    endDate: '2017-05-14',
    publishingDate: '',
    name: 'Daredevils: Mercenaries of Hadronia',
    studio: 'Pelta Games',
    overview: 'Our second try was an adaptation of Crownless to the mobile market, in order to hone our skillset for mobile games.',
    position: 'Planner',
    highlights: [
      'Created character arquetypes and game economy.',
      'Set up the economy as a F2P.',
    ],
    tech: ['Unity', 'GitHub', 'SmartGit', 'Hack N Plan', 'Photoshop', 'GDocs'],
    learning: true,
  },
  {
    id: '01_crownless',
    url: '',
    coverImage: '/images/projects/projectCard_01_crownless.png',
    dimensions: '3D',
    genre: 'Action RPG',
    startDate: '2012-09-14',
    endDate: '2014-07-18',
    publishingDate: '',
    name: 'Crownless: Knights of Hadronia',
    studio: 'Pelta Games',
    overview: 'Our first game ever tried was a JRPG focused on replicating PSX classic vibes.',
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
