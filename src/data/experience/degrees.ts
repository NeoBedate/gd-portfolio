export interface Degree {
  school: string;
  degree: string;
  degreeLink: string;
  uniLink: string;
  year: number;
}

const degrees: Degree[] = [
  {
    school: 'U-TAD (Centro Universitario de Tecnología y Arte Digital)',
    degree: 'M.D. in Game Design',
    degreeLink: 'https://u-tad.com/en/studies/masters-in-game-design',
    uniLink: 'https://u-tad.com',
    year: 2013,
  },
  {
    school: 'Universidad Autónoma de Madrid',
    degree: 'Bachelor Degree in History',
    degreeLink: 'https://www.uam.es/uam/historia',
    uniLink: 'https://www.uam.es',
    year: 2012,
  },
];

export default degrees;
