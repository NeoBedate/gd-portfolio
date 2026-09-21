/**
 * Conforms to https://jsonresume.org/schema/
 */
export interface StudioProject {
  projectName: string;
  projectUrl: string;
  projectPosition: string;
  projectHighlights: string[];
}

export interface StudioPosition {
  compLogo: string;
  name: string;
  url: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  projects: StudioProject[];
}

const work: StudioPosition[] = [
  {
      compLogo: '/images/complogo/aheartfulofgames_complogo.png',
      name: 'AHEARTFULOFGAMES',
      url: 'https://store.steampowered.com/search/?hwtype=0&developer=AHEARTFULOFGAMES',
      startDate: '2020-01-01',
      endDate: '2025-08-15',
      summary: `AHEARTFULOFGAMES was a studio focused on action-oriented games for kids and teenagers. Our focus was on making high quality games for kids and teens, which is a market segment usually mistreated in terms of creativity, mechanic complexity and content depth. We strived for rich worlds, fun challenges and credible social and visual representations on our work for several well known IPs, while working with tight production budgets.`,
      projects: [
      {
        projectName: 'Teenage Mutant Ninja Turtles: Mutants Unleashed',
        projectUrl:'https://store.steampowered.com/app/2460130/Teenage_Mutant_Ninja_Turtles_Mutants_Unleashed/',
        projectPosition: 'Lead Level Designer',
        projectHighlights: [
          'Lead a team of 4 level designers and a scale-up in production workflows to produce 40 levels.',
          'Assumed authorship of 30% of the game levels, plus direct supervision over the rest.',
          'Developed a documentation system to increase feedback quality between internal and external clients, and the Level Design team.',
          'Supported Production and QA through a successful Jira implementation of our Production schedule and level creation pipeline.',
        ],
      },
      {
        projectName: 'DreamWorks DRAGONS: LEGENDS OF THE NINE REALMS',
        projectUrl:'https://store.steampowered.com/app/1721440/DreamWorks_Dragons_Legends_of_The_Nine_Realms/',
        projectPosition: 'Senior Game Designer',
        projectHighlights: [
          'Focused my professional path on the design aspect, assuming more responsibilities on level design.',
          'Assumed authorship of 60% of the game levels as well as integrated its gameplay content.',
          'Support to the creation of main game mechanics and development tools for its integration of levels.',
          'Built and maintained battle arenas, as well as iterated interactive gameplay elements within levels.',
        ],
      },
      { 
        projectName: 'DreamWorks SPIRIT: LUCKY`S BIG ADVENTURE',
        projectUrl:'https://store.steampowered.com/app/1270720/DreamWorks_Spirit_Luckys_Big_Adventure/',
        projectPosition: 'Game Designer & Producer',
        projectHighlights: [
          'Built production workflows and led day to day operations within the team, managing milestones and reporting to internal and external stakeholders.',
          'Mentored several game designers and took direct responsibility of a level designer.',
          'Took full ownership of the world map, designing and implementing it fully.',
          'Created several traversal puzzles and collectibles, integrating its gameplay with the world.',
        ],
      }  
    ]  
  },
  {
      compLogo: '/images/complogo/ceusanpablo_complogo.png',
      name: 'CEU San Pablo',
      url: 'https://www.uspceu.com',
      startDate: '2022-09-19',
      endDate: '2024-01-12',
      summary: `This private university gave me the chance to teach computer engineers and arquitects some basics about virtual environments through video games, as well as some notions of game production.`,
      projects: [
      {  
        projectName: 'M. D. in Virtual Reality',
        projectUrl:'This particular M. D. is no longer being offered.',
        projectPosition: 'Associate Professor',
        projectHighlights: [
          'Taught Advanced Experiences and Game Design, centered around VR video games and their interactions with real and virtual environments.',
          'Took further the role-play in production, creating a sort of campaign where every student had to deal with a series of real life situations that happened around the production of a video game.',
        ],
      }
    ]
  },
  {
      compLogo: '/images/complogo/utad_complogo.png',
      name: 'U-TAD',
      url: 'https://u-tad.com',
      startDate: '2017-02-01',
      endDate: '2019-07-31',
      summary: `I went back to the university that got me into video games to teach several subjects on Game Design. For 3 years I worked with more than 300 students on both basics and advanced subjects, usually related to core mechanics, mobile development, game production and project management.`,
      projects: [
      {
        projectName: 'B.A. in Game Design',
        projectUrl:'',
        projectPosition: 'Associate Professor',
        projectHighlights: [
          'Taught Game Mechanics (I), Design for New Platforms, Projects II and VI, A.I. for Designers and several Unity workshops.',
          'Responsible of grading assignments such as GDDs, preparing academic materials or arranging tutorships for these courses.',
          'Fostered several role-playing activities as producer, helping students to develop projects on real industry-like conditions.',
        ],
      }
    ]  
  },
  {
      compLogo: '/images/complogo/gamelearn_complogo.png',
      name: 'Gamelearn',
      url: 'https://gamestrategies.io/en/',
      startDate: '2016-03-14',
      endDate: '2017-03-10',
      summary: `This company used video games to train employees on several fields, such as negotiation, human resources, time management, customer retention and many more. During my year I helped to port an older game to improve its UX and helped develop the processes to create games way more quickly and with better technology.`,
      projects: [
      {
        projectName: '2100',
        projectUrl:'https://gamestrategies.io/en/catalog/2100-a-customer-service-course-for-companies/',
        projectPosition: 'Product Owner',
        projectHighlights: [
          'Transitioned to a more holistic role and led artists and customer success agents into the fold of game development.',
          'Supervised previous courses to create reports on game design, UX and gameplay mechanics.',
        ],
      },
      {
        projectName: 'Merchants',
        projectUrl:'https://gamestrategies.io/en/catalog/merchants-mastering-negotiation-and-closing-deals/',
        projectPosition: 'Game Designer',
        projectHighlights: [
          'Helped to port Merchants into modern web technologies, streamlining UX and setting the bases for different projects.',
          'Performed several production tasks, filling a necessary role that will point out the need for a full-time producer.',
        ]
      }
    ]
  },
  {
      compLogo: '/images/complogo/unusualwonder_complogo.png',
      name: 'Unusual Wonder',
      url: 'The Company no longer exists',
      startDate: '2013-07-18',
      endDate: '2015-10-29',
      summary: `I started my journey in video games as an intern for 11 months, performing Level Designer tasks during most of that period. After that time, I was promoted to Junior Game Designer and started working on Fútbol Cuatro Fantasy (previously Epic Eleven) for the remainder of my time in the company, expanding further my responsibilites as designer and learning art and code from several seniors`,
      projects: [
      {  
        projectName: 'Fútbol Cuatro Fantasy | Epic Eleven',
        projectUrl:'The Project has been discontinued',
        projectPosition: 'Junior Game Designer',
        projectHighlights: [
          'Own company-wide technical strategy and product roadmap, balancing open-source community, commercial product, and research investments.',
          'Led technical due diligence for $23M+ in venture financing from Insight Partners and Andreessen Horowitz.',
          'Built and scaled the engineering team from founding through Series A, including hiring, leveling, and performance management.',
          'Led development of core evaluation framework, vulnerability scanning, and automated red-teaming capabilities.',
        ],
      },
      {
        projectName: 'Fútbol Stars',
        projectUrl:'https://vimeo.com/87581171',
        projectPosition: 'Intern',
        projectHighlights: [
          'Developed nearly 280 levels in 6 months using Unity 4.6. 68 ended up in the final product.',
          'Performed QA duties during the release phase of the game.',
          'Game published on Play Store and App Store on 2014. No longer available.',
          'Led development of core evaluation framework, vulnerability scanning, and automated red-teaming capabilities.',
        ],
      }
    ]
    },
    {
      compLogo: '/images/complogo/peltagames_complogo.png',
      name: 'Pelta Games',
      url: 'The Company no longer exists',
      startDate: '2012-09-14',
      endDate: '2018-10-29',
      summary: `An informal community of wannabe developers who got together to have some fun and learn how to make games.`,
      projects: [
      {  
        projectName: 'Crownless: Knights of Hadronia',
        projectUrl:'',
        projectPosition: 'Planner',
        projectHighlights: [
          '(Our first game ever tried was a JRPG focused on replicating PSX classic vibes.)',
          'Wrote a script treatment for the whole adventure.',
          'Designed the main mechanics around the 7 playable characters.',
          'Led development in a producer capacity.',
        ],
      },
      {
        projectName: 'Mercenaries',
        projectUrl:'',
        projectPosition: 'Planner',
        projectHighlights: [
          '(Our second try was an adaptation of Crownless to the mobile market, in order to hone our skillset for mobile games)',
          'Created character arquetypes and game economy.',
          'Set up the economy as a F2P.'
        ],
      },
      {
        projectName: 'The Developers',
        projectUrl:'',
        projectPosition: 'Planner',
        projectHighlights: [
          '(Our attempt at developing a game with the help of a European grant)',
          'Created the whole game concept and GDD.',
        ],
      }
    ]
  },
];

export default work;
