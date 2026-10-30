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
      '/images/projects/12_tmnt/TMNT_MU-Title-RGB PNG.png',
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
        taskImage: '/images/projects/12_tmnt/MT_04_pre.png',
        taskCaption: 'Planning for Midtown metro level.',
        gifs:[
          ['/images/projects/12_tmnt/Map_01.png', '/images/projects/12_tmnt/Map_02.png'],
          ['/images/projects/12_tmnt/Map_03.png', '/images/projects/12_tmnt/Map_04.png'],
          ['/images/projects/12_tmnt/BK_02 - upview.png', '/images/projects/12_tmnt/BK_02_Final.png'],
          ['/images/projects/12_tmnt/BK_02_a.png', '/images/projects/12_tmnt/BK_02_e.png'],
        ],
        captions: [
          'Levels were first envisioned as part of the city and its boroughs.','After we decide how the level connects to others, we placed an early layout with portals to other levels and we ran through all the quests that will cross the level.','We cut some corners on geometry to accommodate simpler paths (red=mission path on final geometry)', 'Then we start the proper process of blockout, marking potential spots for arenas (blue), narrative and traversal puzzles.',
        ],      },
      {
        task: 'Level Design composition & iteration',
        taskExecution: [
          'With clear guidelines, my focus was to set up a workflow for the other level designers. We took a 3-pass approach to make it easier to remember, as we had to quickly try and discard ideas.',
          '1st pass for constrains: biome selection, blockout and camera set-up (more on this later). With these basics, we could start placing traversal challenges and their cameras. Narrative passes could place their first iterations of story bits or tutorials, and artists could make a pass on environment feel and camera issues that may arise.',
          '2nd pass for arenas: once the basic blockout of the level is done, we place arenas on the selected spaces and start to tweak both enemy selection and cameras to serve the story. We later ditched the enemy selection part, as the dynamic difficulty system could change enemies depending on player performance during the game.',
          '3rd pass for art & gameplay corrections: once the level is sound on gameplay, goes straight for art dressing and lighting work. Then it comes back to level design for camera corrections, collision checks and narrative adjustments.',
          'After these passes, the level is done and goes to testing. This usually took us between 2-3 weeks, depending on client feedback.',
        ],
        pageSize: 1,
        taskImage: '/images/projects/12_tmnt/Layout_A_MT_04.png',
        taskCaption: 'After 1st and 2nd pass, this level sports 3 arenas that could be used on different quests that traverse it.',
        gifs:[
          ['/images/projects/12_tmnt/BK_05 - Screenshot 2023-02-28 174057.png', '/images/projects/12_tmnt/BK_05 - Screenshot 2023-02-28 174119.png'],
          ['/images/projects/12_tmnt/BX_03 - JokerStairs.png', '/images/projects/12_tmnt/BX_03 - SkatingJoker.png'],
          ['/images/projects/12_tmnt/BX_05 - Blockout.png', '/images/projects/12_tmnt/BX_05 - cenital.png'],
          ['/images/projects/12_tmnt/Bridge-01.png', '/images/projects/12_tmnt/Bridge-02.png'],
        ],
        captions: [
          'Some screenshots of BK_05, later known in-game as The Mall, with a circular structure that was hard to honor with camera work and had to be ditched.', 'We recreated several iconic places from NY City, such as the West 167th Street Stairs (or "Joker Stairs")...', '...the Yankee Stadium...', '...and Brooklyn´s bridge, a level in which I take special pride as it is my very own reinterpretation of the famous bridge. Here we can see it fully dressed.',
        ],
      },
      {
        task: 'Camera work',
        taskExecution: [
          'We took an hibrid approach to cameras, making them more cinematic while providing a sense of sturdiness needed for quick-pace action. Up to 15 entities could be on screen competing for player attention, so cameras had a pivot that anchor the center of the screen while we handcrafted camera angles, soft edges for panning and zoom levels.',
          'On small spaces this proved to be a challenge, as the need to keep the camera close to avoid out-of-bounds shenanigans was paramount. We resolved this by playing with the aperture of the lenses, less camera movement and having some latitude on black planes that cover empty spaces.',
          'Lastly, cameras were always thought with forward action in mind. Painting invisible lines that guide the player towards the next place was of utmost importance, as we prioritize a natural pathfinding by camera rather than extradiegetic help.'
        ],
        pageSize: 1,
        taskImage: '/images/projects/12_tmnt/SUB - Start.gif',
        taskCaption: 'In this instance, the camera takes us from the bottom left to the upper right of the screen.',
        gifs:[
          ['/images/projects/12_tmnt/BK_02 - High.gif', '/images/projects/12_tmnt/BK_02 - Battle.gif'],
          ['/images/projects/12_tmnt/BX_05 - Run.gif', '/images/projects/12_tmnt/BX_05 - Battle.gif'],
          ['/images/projects/12_tmnt/BX_05 - Run_02.gif', '/images/projects/12_tmnt/BX_05 - Battle_02.gif'],
          ['/images/projects/12_tmnt/MT_04 - Combat.gif', '/images/projects/12_tmnt/AIRSHIP - Grind.gif'],
        ],
        captions: [
          'While we tried to preserve vector movement on screen, sometimes we went for a more cinematic feel on combat',
          'One of the first decisions was to have some cameras from behind to support reveals. Our first pass was crude...',
          '...but the second played better on the following cutscene.',
          'And of course, to power some special movements and situations like high stakes combats or dangerous grinds.'
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
      '/images/projects/11_dragons/Dragons_Logo_1.png',
      '/images/projects/11_dragons/FireRealm.png',
      '/images/projects/11_dragons/IceRealm.png',
      '/images/projects/11_dragons/CrystalRealm.png',
    ],
    sections: [
      {
        task:'Level Design guidelines',
        taskExecution: [
          'Unlike in Spirit, the world of Dragons was now divided into several Realms with 5 contained levels each. ',
        ],
        pageSize: 0,
        taskImage: '/images/projects/11_dragons/world_01_level_03.png',
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
      {
        task:'Interactivity on levels',
        taskExecution: [
          'We introduced there a key aspect of gameplay: interactables. ',
        ],
        pageSize: 0,
        taskImage: '/images/projects/11_dragons/world_01_level_03.png',
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
    trailer: 'https://www.youtube.com/embed/BQY01xBqb1o?si=Ok8Fn9os5_xFJmMj',
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
      '/images/projects/10_spirit/Spirit_Logo.png',
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
    trailer: 'https://www.youtube.com/embed/imX-1wNppog?si=FFlZjFhrAk8fmB4L',
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
