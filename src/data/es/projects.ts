/**
 * Spanish text for `../projects.ts`, by project id. Only the fields listed
 * in `ProjectTranslation` are translated; everything else (dates, media,
 * links, job titles, game names) comes from the English entry.
 *
 * The case-study sections of TMNT, Dragons and Spirit are not translated
 * yet: they are being rewritten in English first, and fall back to it.
 *
 * Tests check that every id exists and that each translated list has as
 * many items as the English one.
 */

import type { ProjectDetails } from '../projects';

export type ProjectTranslation = Partial<
  Pick<ProjectDetails, 'name' | 'genre' | 'overview' | 'summary' | 'highlights'>
>;

const projects: Record<string, ProjectTranslation> = {
  '13_freelanceNda': {
    name: 'Juego de acción 3D sin anunciar (bajo NDA)',
    highlights: [
      'Diseño de métricas de traversal, diagramas de flujo de niveles y reglas de blockout para un juego de acción 3D sin anunciar.',
      'Consultoría de diseño de niveles: creación e implantación de flujos de trabajo para un equipo de 3 level designers.',
    ],
  },
  '12_tmnt': {
    genre: 'Plataformas de acción',
    overview:
      'Un plataformas de acción en el que el jugador controla a las cuatro tortugas ninja y lucha por Nueva York para destapar una conspiración en torno a los "Mewbies" y el caos que están sembrando en la ciudad.',
    summary:
      'Como Lead, mi tarea era crear espacios de juego centrados en la acción para un juego de más de 10 horas. Por la naturaleza del gameplay, los espacios debían estar diseñados con precisión para varias habilidades de traversal y de combate, así que guie a mi equipo con pautas, procesos, plazos y expectativas claros. Además, ayudé al equipo de Producción a crear nuestro proyecto de Jira y los procesos de toda la producción, un paso clave en un proyecto de 18 meses para 31 personas.',
    highlights: [
      'Dirigí un equipo de 4 level designers y el escalado de los flujos de producción para crear 40 niveles.',
      'Diseñé el 30 % de los niveles del juego y supervisé directamente el resto.',
      'Desarrollé un sistema de documentación para mejorar la calidad del feedback entre los clientes internos y externos y el equipo de diseño de niveles.',
      'Apoyé a Producción y QA con una implantación exitosa en Jira de nuestro calendario de producción y del pipeline de creación de niveles.',
    ],
  },
  '11_dragons': {
    genre: 'Acción',
    overview:
      'Un plataformas 3D con vista (casi) isométrica en el que controlamos a Thunder y exploramos reinos muy distintos mientras reunimos nuevos aliados y luchamos contra dragones poderosos.',
    summary:
      'Centré mi carrera en la empresa en el diseño de niveles: asumí esas responsabilidades y fui mentor de un level designer junior, sin dejar algunas tareas de producción del proyecto. Además, me encargué de la localización y coordiné con la producción externa para llevar el juego a más de 20 idiomas.',
    highlights: [
      'Diseñé el 60 % de los niveles del juego e integré su contenido jugable, como arenas, puzles y cámaras.',
      'Usé un sistema modular para el diseño de niveles y para mantener una producción ágil, creando niveles de 10 minutos en menos de 2 semanas.',
      'Construí y mantuve las arenas de combate: colocación de enemigos, trampas y cámaras.',
      'Apoyé la creación de las mecánicas principales y de los flujos de desarrollo para integrarlas en los niveles.',
      'Me encargué de la localización, como enlace entre nuestros proveedores externos y el cliente externo, y de su implementación en el juego.',
    ],
  },
  '10_spirit': {
    genre: 'Mundo abierto',
    overview:
      'Un juego de mundo abierto narrativo y relajado, basado en el universo de Spirit, en el que los jugadores exploran la fauna de un valle a lomos de Spirit y descubren los secretos de un antiguo mapa del tesoro relacionado con la madre de Lucky.',
    summary:
      'Hice a la vez de Game Designer y Producer mientras nos llevábamos la producción a casa y sacábamos adelante el proyecto durante la pandemia de COVID, con éxito económico. Me ocupé de la localización, las tareas del proyecto, las reuniones con el cliente externo, la UI y todo el diseño de niveles.',
    highlights: [
      'Creé los flujos de producción y dirigí el día a día del equipo, gestionando los hitos y el reporting a stakeholders internos y externos.',
      'Fui mentor de artistas y game designers, generé confianza con los equipos de Arte y Programación y ayudé a cultivar una cultura sana en la empresa.',
      'Asumí el control directo del diseño de niveles y la responsabilidad completa del mapa del mundo: desarrollé la funcionalidad desde el concepto hasta la implementación final.',
      'Creé varios puzles de traversal, animales y coleccionables para poblar el mapa del mundo.',
    ],
  },
  '09_ceuProject': {
    highlights: [
      'Impartí Experiencias Avanzadas y Diseño de Videojuegos, centradas en los videojuegos de realidad virtual y su interacción con entornos reales y virtuales.',
      'Amplié el role-play de producción hasta convertirlo en una campaña en la que cada alumno afrontaba situaciones reales de la producción de un videojuego.',
    ],
  },
  '08_utadProject': {
    highlights: [
      'Impartí Mecánicas de Juego (I), Diseño para Nuevas Plataformas, Proyectos II y VI, IA para Diseñadores y varios talleres de Unity.',
      'Responsable de evaluar trabajos como GDD, preparar materiales académicos y organizar tutorías en estas asignaturas.',
      'Impulsé varias actividades de role-play como productor, ayudando a los alumnos a desarrollar proyectos en condiciones similares a las de la industria.',
    ],
  },
  '07_2100': {
    genre: 'Curso de formación',
    overview:
      'Un curso de formación con algo de progresión. Diseñado para enseñar a los empleados a desenvolverse de cara al público.',
    highlights: [
      'Pasé a un rol más integral y acerqué a artistas y agentes de customer success al desarrollo de videojuegos.',
      'Revisé cursos anteriores para elaborar informes sobre diseño, UX y mecánicas de juego.',
    ],
  },
  '06_merchants2': {
    genre: 'Aventura gráfica / Curso de formación',
    overview:
      'Una experiencia de 10 horas sobre cómo negociar en distintas situaciones, de la táctica a la estrategia general. Mi papel fue supervisar el remake como Product Manager y mejorar la UX como Game Designer.',
    highlights: [
      'Ayudé a portar Merchants a tecnologías web modernas, simplificando la UX y sentando las bases de otros proyectos.',
      'Asumí varias tareas de producción para cubrir un rol necesario, lo que puso de manifiesto la necesidad de un productor a tiempo completo.',
    ],
  },
  '05_futbol4': {
    genre: 'Fútbol fantasy',
    overview:
      'Llamado Epic Eleven durante el desarrollo, este proyecto aspiraba a ser uno de los primeros juegos de fútbol fantasy de España.',
    highlights: [
      'Desarrollé el gameplay principal junto con el CEO.',
      'Equilibré los salarios de los jugadores y ajusté el peso de las estadísticas en su valoración.',
    ],
  },
  '04_futbolstars': {
    genre: 'Puzle deportivo',
    overview:
      'Mi primer proyecto profesional, en el que creé niveles sin parar y me familiaricé con Unity rodeado de veteranos con más de 20 años de experiencia.',
    highlights: [
      'Creé casi 280 niveles en 6 meses con Unity 4.6; 68 llegaron al producto final.',
      'Hice tareas de QA durante la fase de lanzamiento del juego.',
      'Publicado en Play Store y App Store en 2014. Ya no está disponible.',
    ],
  },
  '03_developers': {
    genre: 'Tycoon',
    overview:
      'Nuestro intento de desarrollar un juego con un presupuesto real: creamos un concepto para optar a una ayuda europea. Como no la conseguimos, el proyecto quedó aparcado indefinidamente.',
    highlights: [
      'Creé todo el concepto del juego y el GDD.',
      'Documenté todos los sistemas del juego.',
    ],
  },
  '02_mercenaries': {
    genre: 'RPG de estrategia',
    overview:
      'Nuestro segundo intento fue una adaptación de Crownless al mercado móvil, para pulir nuestras habilidades en juegos para móviles.',
    highlights: [
      'Creé los arquetipos de personajes y la economía del juego.',
      'Planteé la economía como F2P.',
    ],
  },
  '01_crownless': {
    genre: 'RPG de acción',
    overview:
      'Nuestro primer juego fue un JRPG que buscaba recrear el espíritu de los clásicos de PSX.',
    highlights: [
      'Escribí el tratamiento del guion de toda la aventura.',
      'Diseñé las mecánicas principales en torno a los 7 personajes jugables.',
      'Dirigí el desarrollo como productor.',
    ],
  },
};

export default projects;
