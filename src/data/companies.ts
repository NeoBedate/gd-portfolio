export interface CompanyDetails {
  id: string;
  url?: string;
  logo: string;
  startDate: string;
  endDate: string;
  name: string;
  description: string;
}

const data: CompanyDetails[] = [
  {
    id: '06_ahog',
    logo: '/images/complogo/aheartfulofgames_complogo.png',
    startDate: '2020-01-01',
    endDate: '2025-08-15',
    name: 'AHEARTFULOFGAMES',
    description: `AHEARTFULOFGAMES was a studio focused on action-oriented games for kids and teenagers. Our focus was on making high quality games for kids and teens, which is a market segment usually mistreated in terms of creativity, mechanic complexity and content depth. We strived for rich worlds, fun challenges and credible social and visual representations on our work for several well known IPs, while working with tight production budgets.`,
  },
  {
    id: '05_ceu',
    url: 'https://www.uspceu.com',
    logo: '/images/complogo/ceusanpablo_complogo.png',
    startDate: '2022-09-19',
    endDate: '2024-01-12',
    name: 'CEU San Pablo',
    description: `This private university gave me the chance to teach computer engineers and arquitects some basics about virtual environments through video games and level design, as well as some notions of game production.`,
  },
  {
    id: '04_utad',
    url: 'https://u-tad.com',
    logo: '/images/complogo/utad_complogo.png',
    startDate: '2017-02-01',
    endDate: '2019-07-31',
    name: 'U-TAD',
    description: `I went back to the university that got me into video games to teach several subjects on Game Design. For 3 years I worked with more than 300 students on both basics and advanced subjects, usually related to core mechanics, mobile development, game production and project management.`,
  },
  {
    id: '03_gamelearn',
    url: 'https://gamestrategies.io/en/',
    logo: '/images/complogo/gamelearn_complogo.png',
    startDate: '2016-03-14',
    endDate: '2017-03-10',
    name: 'Gamelearn',
    description: `This company used video games to train employees on several fields, such as negotiation, human resources, time management, customer retention and many more. During my year I helped to port an older game to improve its UX and helped develop the processes to create games way more quickly and with better technology.`,
  },  
  {
    id: '02_unusualwonder',
    logo: '/images/complogo/unusualwonder_complogo.png',
    startDate: '2013-07-18',
    endDate: '2015-10-29',
    name: 'Unusual Wonder',
    description: `I started my journey in video games as an intern for 11 months, performing Level Designer tasks during most of that period. After that time, I was promoted to Junior Game Designer and started working on Fútbol Cuatro Fantasy (previously Epic Eleven) for the remainder of my time in the company, expanding further my responsibilites as designer and learning art and code from several seniors`,
  }, 
  {
    id: '01_pelta',
    logo: '/images/complogo/peltagames_complogo.png',
    startDate: '2012-09-14',
    endDate: '2018-10-29',
    name: 'Pelta Games',
    description: `An informal community of wannabe developers who got together to have some fun and learn how to make games.`,
  }, 
]

export default data;