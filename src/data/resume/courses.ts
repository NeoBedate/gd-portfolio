export interface Course {
  title: string;
  number: string;
  link: string;
  university: string;
}

const courses: Course[] = [
  {
    title: 'Game Mechanics (I)',
    number: 'DIVI_2_1_DVI',
    link: 'https://st1.u-tad.com/media/2026/02/DIPI_2_1_Diseno_de_Videojuegos_I.pdf',
    university: 'U-TAD',
  },
  {
    title: 'Projects II',
    number: 'DIVI_2_A_PII',
    link: 'https://st1.u-tad.com/media/2025/08/DIVI_2_A_Proyectos_II.pdf',
    university: 'U-TAD',
  },
  {
    title: 'Design for New Platforms',
    number: 'DIVI_3_1_DNP',
    link: 'https://st1.u-tad.com/media/2025/08/DIVI_3_1_Diseno_de_sistemas_economia_y_mecanicas_avanzadas.pdf',
    university: 'U-TAD',
  },
  {
    title: 'A.I. for Game Designers',
    number: 'DIPI_4_2_PA',
    link: 'https://st1.u-tad.com/media/2026/02/DIPI_4_2_Programacion_Avanzada.pdf',
    university: 'U-TAD',
  },
  {
    title: '2D Game Design',
    number: 'DIVI_1_1_F2D3D',
    link: 'https://st1.u-tad.com/media/2025/08/DIVI_1_1_Fundamentos_de_2D_y_3D_para_videojuegos_I.pdf',
    university: 'U-TAD',
  },
  {
    title: 'Projects VI',
    number: 'DIVI_3_B_PVI',
    link: 'https://st1.u-tad.com/media/2025/08/DIVI_3_A_Proyectos_III.pdf',
    university: 'U-TAD',
  },
  {
    title: 'Game Mechanics',
    number: 'MA_GD_GM',
    link: 'https://u-tad.com/en/studies/masters-in-game-design',
    university: 'U-TAD',
  },
];

export default courses;
