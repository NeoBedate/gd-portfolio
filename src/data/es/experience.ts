/**
 * Spanish text for the Experience page: company descriptions, course
 * titles and skill categories. Keyed by the ids and names the English data
 * uses, so the English files stay the single source for everything else
 * (dates, logos, links). Job titles and degree names stay in English.
 */

/** Company descriptions, by id in `../companies.ts`. */
export const companyDescriptions: Record<string, string> = {
  '07_freelance':
    'Consultoría en un juego de acción 3D sin anunciar, bajo NDA.',
  '06_ahog':
    'AHEARTFULOFGAMES fue un estudio centrado en juegos de acción para niños y adolescentes. Nuestro objetivo era hacer juegos de calidad para ese público, un segmento del mercado al que se suele tratar mal en creatividad, complejidad de mecánicas y profundidad de contenido. Buscábamos mundos ricos, retos divertidos y representaciones sociales y visuales creíbles en nuestro trabajo con varias licencias conocidas, siempre con presupuestos de producción ajustados.',
  '05_ceu':
    'Esta universidad privada me dio la oportunidad de enseñar a ingenieros informáticos y arquitectos los fundamentos de los entornos virtuales a través de los videojuegos y el diseño de niveles, además de algunas nociones de producción de videojuegos.',
  '04_utad':
    'Volví a la universidad que me abrió las puertas de los videojuegos para impartir varias asignaturas de diseño de videojuegos. Durante 3 años trabajé con más de 300 alumnos en asignaturas básicas y avanzadas, sobre todo de mecánicas, desarrollo para móviles, producción y gestión de proyectos. Todas las asignaturas que impartí están al final de esta página.',
  '03_gamelearn':
    'Esta empresa usaba videojuegos para formar a empleados en campos como la negociación, los recursos humanos, la gestión del tiempo o la fidelización de clientes, entre muchos otros. Durante mi año allí ayudé a portar un juego antiguo para mejorar su UX y a desarrollar los procesos para crear juegos mucho más rápido y con mejor tecnología.',
  '02_unusualwonder':
    'Empecé en los videojuegos con 11 meses de prácticas, haciendo tareas de Level Designer durante la mayor parte de ese tiempo. Después me ascendieron a Junior Game Designer y trabajé en Fútbol Cuatro Fantasy (antes Epic Eleven) el resto de mi etapa en la empresa, ampliando mis responsabilidades como diseñador y aprendiendo arte y programación de varios seniors.',
  '01_pelta':
    'Una comunidad informal de aspirantes a desarrolladores que se juntaron para pasarlo bien y aprender a hacer juegos.',
};

/** Course titles, by course code in `../experience/courses.ts`. */
export const courseTitles: Record<string, string> = {
  DIVI_2_1_DVI: 'Mecánicas de Juego (I)',
  DIVI_2_A_PII: 'Proyectos II',
  DIVI_3_1_DNP: 'Diseño para Nuevas Plataformas',
  DIPI_4_2_PA: 'IA para Game Designers',
  DIVI_1_1_F2D3D: 'Diseño de Juegos 2D',
  DIVI_3_B_PVI: 'Proyectos VI',
  MA_GD_GM: 'Mecánicas de Juego',
};

/** Skill category labels, by the English category name. */
export const skillCategories: Record<string, string> = {
  Art: 'Arte',
  'Game Engines': 'Motores de juego',
  Languages: 'Lenguajes',
  Productivity: 'Productividad',
  'Project Management': 'Gestión de proyectos',
  'Version Control': 'Control de versiones',
};
