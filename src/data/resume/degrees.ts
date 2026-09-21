export interface Degree {
  school: string;
  degree: string;
  link: string;
  year: number;
}

const degrees: Degree[] = [
  {
    school: 'U-TAD (Centro Universitario de Tecnología y Arte Digital)',
    degree: 'M.D. in Game Design',
    link: 'https://u-tad.com',
    year: 2013,
  },
  {
    school: 'Universidad Autónoma de Madrid',
    degree: 'Bachelor Degree in History',
    link: 'https://www.uam.es',
    year: 2012,
  },
];

export default degrees;
