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
  selected?: boolean;
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
    summary: 'As a Lead, I was tasked with providing action-focused game spaces for a +10h game. Given the nature of the gameplay, spaces needed to be tightly designed for several traversal feats and combat abilities, so I nurtured my team with clear guidelines, processes, deadlines and expectations. Additionally, I helped the Production team to create our Jira project and processes for the whole production, a key step into an 18 months project for 31 people.',
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
        task: 'Traversal and combat solutions',
        taskExecution: [
          'We tested and delivered levels as proof of concept for <b>traversal and combat</b> mainly. That led us to think of levels as solitary entities mostly, instead of connecting them, leaving traces of that interconnection only at the portals.',
          'We divided levels among ourselves, to maximize output and hit the number of 40 levels as soon as possible. Next, everyone took care of features present on every level: that way everyone knows the whole scope of the game but also each can rely on their strenghts: camera work, blockouts, arena creation, set pieces, etc...',
          'At the same time, I personally took care of some level renovations from the ground up (some levels were far off from the quality expected after initial passes) and started communicating every day with QA: documenting level layouts; expected results on traversal and combat abilities and interactive props; and critical errors on the game flow.',
          'After a year and a half, this mixed approach of responsibilities within the department made our team very flexible, focused on bringing the studio together both on features and content, and a powerhouse of reliability within our corporate structure. We delivered way more, and way better, than expected during production and post-production.'
        ],
        pageSize: 1,
        taskImage: '/images/projects/12_tmnt/Layout_A_MT_04.png',
        taskCaption: 'After 1st and 2nd pass, this level sports 3 arenas that could be used on different quests that traverse it.',
        gifs:[
          ['/images/projects/12_tmnt/BK_06 - Wind_01.gif', '/images/projects/12_tmnt/BK_06 - Wind_02.gif'],
          ['/images/projects/12_tmnt/BK_05 - Screenshot 2023-02-28 174057.png', '/images/projects/12_tmnt/BK_05 - Screenshot 2023-02-28 174119.png'],
          ['/images/projects/12_tmnt/BK_05 - Stairs_01.gif', '/images/projects/12_tmnt/BK_05 - Stairs_02.gif',],
          ['/images/projects/12_tmnt/BX_03 - JokerStairs_01.gif', '/images/projects/12_tmnt/BX_03 - JokerStairs_02.gif'],
          ['/images/projects/12_tmnt/BX_05 - Battle.gif', '/images/projects/12_tmnt/BX_05 - Battle_02.gif'],
          ['/images/projects/12_tmnt/Bridge-01.png', '/images/projects/12_tmnt/Bridge_Jumps.gif'],
        ],
        captions: [
          '1. Our blockout process let us model traversal puzzles quickly, which helped the pacing of levels.',
          '2. Some screenshots of BK_05, later known in-game as The Mall, with a circular structure that was hard to honor with camera work and had to be ditched.',
          '3. After the rebuild, we see here one of the spaces from The Mall which worked better on camera and traversal.',
          '4. We recreated several iconic places from NY City, such as the West 167th Street Stairs (or "Joker Stairs")...',
          '5. ...the Yankee Stadium...',
          '6. ...and Brooklyn´s bridge, a level in which I take special pride as it is my very own reinterpretation of the famous bridge. Here we can see it fully dressed.',
        ],
      },
      {
        task: 'Creative challenges',
        taskExecution: [
          'Portals, cameras and art dressing were the main challenges on the level design workflow.',
          'Early on development, each portal was meant to function as both entry and exit to give freedom to the Narrative Department. However, as the narrative changed from a "rogue-likesque" structure to a more linear one, we came to a point where portals were rarely used for both purposes at all. Quests demanded: one point of entry; one path; one point of exit.',
          'While this approach provided anticipation in terms of narrative and fitted gameplay constrains, the transition to a linear structure came with a hidden cost: production oversee rose, specially for levels heavy on narrative beats, so our first assesment for camera placing and blockout polishing was insufficient. Cameras needed to convey a strong sense of direction and anticipation, which increased iteration times.',
          'Lastly, level design had to implement gameplay props for traversal challenges and combat arenas, as well as dress some corners to make levels feel alive. All these aspects are where most of the iteration time was alocated.',
        ],
        pageSize: 1,
        taskImage: '/images/projects/12_tmnt/MT_04_pre.png',
        taskCaption: 'Planning for Midtown metro level, with portals marked and quests running through the level highlighted.',
        gifs:[
          ['/images/projects/12_tmnt/BK_02 - High.gif', '/images/projects/12_tmnt/BK_02 - Battle.gif'],
          ['/images/projects/12_tmnt/BK_02 - LastArc_01.gif', '/images/projects/12_tmnt/BK_02 - LastArc_02.gif'],
          ['/images/projects/12_tmnt/BK_02 - upview.png', '/images/projects/12_tmnt/BK_02_Final.png'],
        ],
        captions: [
          '1. While we tried to preserve vector movement on screen, sometimes we went for a more cinematic feel during combat',
          '2. Aside from art dressing, Level Design populated traversal sections and arenas with interactive props to keep a vibrant picture of a New York on a crisis',
          '3. After we decide how the level connects to others, we placed an early layout with portals to other levels and we ran through all the quests that will cross the level.',
        ],
      },
      {
        task: 'Level Guidelines',
        taskExecution: [
          'Our main focus was to <b>streamline level design</b> and be able to produce at least x2 to x3 levels more than needed to provide Creative Direction a selection of ideas, so we worked at 3 levels of depth.',
          '<b>At high level</b>, we were given a target ("40 to 50 levels total, plus set-pieces and bosses: most of them interconnected for quests"), so we created a <b>map of the boroughs</b> (which eventually became the game´s map) and searched for interesting places on each of them. We also looked at common environments (rooftops, streets, sewers and subway tunnels) to help art and gameplay production schedules.',
          '<b>At mid level</b>, we took a 3-pass approach designed to quickly iterate: biome and gameplay focus; camera and arena placing; and art & collision corrections. These passes, with the second being the most crucial but time consuming, helped us find a theme for each level while keeping overall cohesion between playable spaces.',
          '<b>At low level</b>, we focused on resolving action-blocks at first (traversal challenges, arenas design and narrative beats), giving space for art integration due to the unique visual identity of the franchise. Blockouts were switched for finished assets and surfaces for textures via replacing tool.',
        ],
        pageSize: 1,
        taskImage: '/images/projects/12_tmnt/Map_HUD_04.png',
        taskCaption: 'The Five Boroughs, with Manhattan partitioned into several recognizable pieces.',
        gifs:[
          ['/images/projects/12_tmnt/Map_01.png', '/images/projects/12_tmnt/Map_02.png'],
          ['/images/projects/12_tmnt/Map_03.png', '/images/projects/12_tmnt/Map_04.png'],
        ],
        captions: [
          '1. Levels were first envisioned as part of the city and its boroughs.',
          '2. After we decide how the level connects to others, we placed an early layout with portals to other levels and all the quests that will cross the level.'
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
      //   taskImage: '/images/projects/12_tmnt/SUB - Start.gif',
      //   taskCaption: 'In this instance, the camera takes us from the bottom left to the upper right of the screen.',
      //   gifs:[
      //     ['/images/projects/12_tmnt/BX_05 - Run.gif', '/images/projects/12_tmnt/BX_05 - Run_02.gif'],
      //     ['/images/projects/12_tmnt/BX_05 - Battle.gif', '/images/projects/12_tmnt/BX_05 - Battle_02.gif'],
      //     ['/images/projects/12_tmnt/MT_04 - Combat.gif', '/images/projects/12_tmnt/AIRSHIP - Grind.gif'],
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
    tech: ['Unity', 'Plastic SCM', 'Jira', 'Confluence', 'GDocs', 'Excel', 'Draw.io'],
    selected: true,
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
    summary: 'Focused my professional path within the company on level design, assuming those responsibilities along with mentoring a junior level designer, while still carrying some aspects of project production. Furthermore, I took charge of localization efforts and coordinated with external Production to bring the game to +20 languages.',
    highlights: [
      'Assumed authorship of 60% of the game levels as well as integrated its gameplay content such as arenas, puzzles and cameras.',
      'Used a modular system to tackle level design and maintain an agile production system, creating 10 minute levels in less than 2 weeks.',
      'Built and maintained battle arenas: enemy placing, trap placing and camera placing.',
      'Supported the creation of core mechanics and development workflows for its integration within levels.',
      'Took charge of localization efforts, working as nexus between our outsourcers and the external client, as well as taking care of its game implementation.',
    ],
    images: [
      '/images/projects/11_dragons/Dragons_Logo_1.png',
      '/images/projects/11_dragons/FireRealm.png',
      '/images/projects/11_dragons/IceRealm.png',
      '/images/projects/11_dragons/CrystalRealm.png',
    ],
    sections: [
      {
        task:'Camera work & set pieces',
        taskExecution: [
          'For the first time we had to work with hand-placed cameras, with an isometric view that favors quick-paced action with multiple dragons on screen.',
          'Along the way we wanted to avoid camera cuts as much as possible to help readability and avoid headaches with many camera movements. With this in mind, we created a main camera that follow the player around, showing always the path forward but turning around when necessary.',
          'When puzzles, arenas and secrets are on the front view, the camera usually conveys that something is going on in different ways. By tilting the camera slightly to put keys and locks on frame, we made puzzles easier to understand for kids.',
        ],
        pageSize: 0,
        taskImage: '/images/projects/11_dragons/Traversal_mix.gif',
        taskCaption: '',
        gifs: [
          ['/images/projects/11_dragons/dragons_set-piece_01.gif', '/images/projects/11_dragons/dragons_set-piece_02.gif'],
        ],
        captions: [
          '1. Set pieces with several gimmicks like lava or debris chasing the player, or freezing winds trying to stop them, were introduced to shake up the pacing.',
        ]
      },
      {
        task:'Level Guidelines & modularization',
        taskExecution: [
          'The world of Dragons is divided into 5 realms with 5 levels each, making a total of 25 levels. On detail, each realm has: 3 core levels (exploration, combat & narrative); 1 set piece with special mechanics; and 1 boss fight.',
          'A distribution that enhanced the adventure aspect of the game, with leaner levels at the beginning encouraging exploration. As the player progresses through the story discovering new mechanics, enemies and completing its own squad of dragons, new paths become unlockable on previous levels. To get all crystals, the player has to backtrack and use the four dragons.',
          'Along with a wide array of interactables (explosive crystals, gusts of wind, lava pits, spikes, ice walls...) we introduced a plugin to create levels modularly. This gave us the flexibility to create precise geometries without worrying much about traversal abilities getting bugged: with an array of geometry modules, we adapted to pre-stablished rules of level design, and closed traversal and combat sections much quicker.',
          'This modularization gave us time to rethink environments along with art. Every realm is underground by diegesis so we worked on several layers of visualization to match the camera FOV, with details suggesting that we were in big, complex caverns. Adjusting that to the need of clear gameplay was tricky but satisfactory.',
        ],
        pageSize: 0,
        taskImage: '/images/projects/11_dragons/world_01_level_03.png',
        taskCaption: '',
        gifs:[
          ['/images/projects/11_dragons/W01_01 - chasm.gif', '/images/projects/11_dragons/W01_01 - fly_01.gif'],
          ['/images/projects/11_dragons/W01_02 - puzzle_01.gif', '/images/projects/11_dragons/W03_01 - puzzle_01.gif'],
        ],
        captions: [
          '1. We pulled back on the camera every time we could in order to make the levels feel bigger and richer.',
          '2. Traversal puzzles imply tracking blocks and the crystals involved in activating/unlocking them.',
        ],
      },
    ],
    trailer: 'https://www.youtube.com/embed/BQY01xBqb1o?si=Ok8Fn9os5_xFJmMj',
    tech: ['Unity', 'Plastic SCM', 'SourceTree', 'Hack N Plan', 'GDocs', 'Excel'],
    selected: true,
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
    selected: true,
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
