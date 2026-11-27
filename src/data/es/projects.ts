/**
 * Spanish text for `../projects.ts`, by project id. Only the fields listed
 * in `ProjectTranslation` are translated; everything else (dates, media,
 * links, job titles, game names) comes from the English entry.
 *
 * Case studies translate their sections too, by position: `sections[0]`
 * holds the text of the English `sections[0]`. Media paths, page sizes and
 * layout always come from English. Game names, job titles, platforms and
 * in-game text stay in English.
 *
 * Tests check that every id exists and that each translated list has as
 * many items as the English one, section by section.
 */

import type {
  Comparison,
  ProjectDetails,
  ProjectResponsibilities,
  ProjectVideo,
} from '../projects';

/** The text of one case-study section. */
export type SectionTranslation = Partial<
  Pick<
    ProjectResponsibilities,
    | 'task'
    | 'taskExecution'
    | 'taskCaption'
    | 'taskImageAlt'
    | 'captions'
    | 'alts'
  > & {
    /** The text of each of the section's `comparisons`, in the same order. */
    comparisons: Array<
      Pick<
        Comparison,
        'beforeLabel' | 'afterLabel' | 'beforeAlt' | 'afterAlt' | 'caption'
      >
    >;
  }
>;

export type ProjectTranslation = Partial<
  Pick<
    ProjectDetails,
    | 'name'
    | 'genre'
    | 'overview'
    | 'summary'
    | 'highlights'
    | 'team'
    | 'roleDetail'
    | 'ownership'
    | 'context'
    | 'problems'
    | 'results'
    | 'lessons'
    | 'imageAlts'
  > & {
    /** The text of each of the project's `videos`, in the same order. */
    videos: Array<Pick<ProjectVideo, 'title' | 'description'>>;
    /** The text of each of the project's `sections`, in the same order. */
    sections: SectionTranslation[];
  }
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
    team: '31 personas',
    roleDetail: 'Equipo de diseño de niveles de 4 personas, incluido yo',
    ownership: [
      '12 de los 40 niveles de principio a fin, y la supervisión directa de los otros 28.',
      'Las pautas, los procesos y los plazos del equipo de diseño de niveles.',
      'Un sistema de documentación para el feedback entre el equipo de diseño de niveles y los clientes internos y externos.',
    ],
    context: [
      'Un plataformas de acción de más de 10 horas con licencia de Nickelodeon, publicado por Outright Games.',
      'El objetivo: de 40 a 50 niveles, además de set pieces y jefes, la mayoría conectados entre sí para las misiones.',
      'Los espacios tenían que construirse con precisión en torno a varias habilidades de traversal y de combate.',
      'La identidad visual única de la franquicia obligaba a dejar espacio al arte en cada nivel.',
      'Una producción de 18 meses para 31 personas.',
    ],
    problems: [
      {
        problem:
          'The Mall se construyó en torno a una estructura circular difícil de respetar con el trabajo de cámaras.',
        decision:
          'Descartamos la estructura circular y rehicimos el nivel desde cero.',
        outcome:
          'Los espacios rehechos funcionaban mejor con la cámara y para el traversal.',
      },
      {
        problem:
          'Los portales se crearon para servir de entrada y de salida, pero cuando la historia pasó de una estructura tipo rogue-like a una lineal, rara vez se usaban en los dos sentidos.',
        decision:
          'Las misiones pasaron a ser lineales: un punto de entrada, un camino, un punto de salida.',
        outcome:
          'Generó expectación y encajó con las restricciones de gameplay, pero aumentó la carga de producción en los niveles con muchos momentos narrativos.',
      },
      {
        problem:
          'De 40 a 50 niveles, además de set pieces y jefes, para un equipo de diseño de niveles de 4 personas.',
        decision:
          'Nos repartimos los niveles y, además, cada uno asumió una funcionalidad presente en todos ellos (cámaras, blockouts, arenas, set pieces), según sus puntos fuertes. Yo hablaba con QA a diario.',
        outcome:
          'Un equipo flexible y fiable que entregó más, y mejor, de lo esperado en producción y postproducción.',
      },
    ],
    results: [
      'Lanzado el 18 de octubre de 2024 en PC, PlayStation 4 y 5, Xbox One, Xbox Series X|S y Nintendo Switch.',
      '40 niveles entregados, 12 de ellos míos de principio a fin.',
    ],
    lessons: [
      'Pulir la sensación de la cámara más tarde. Le dedicamos mucho tiempo demasiado pronto, y nos costó tiempo.',
      'No diseñar en torno a funcionalidades que no están listas. Diseñamos alrededor de interactuables y props que aún estábamos esperando, y eso provocó muchas idas y venidas.',
    ],
    imageAlts: [
      'Logo de Teenage Mutant Ninja Turtles: Mutants Unleashed.',
      'Una tortuga en una estación de metro con niebla.',
      'Leo y Raph luchando contra enemigos en una guarida de las alcantarillas adornada con luces.',
      'Una tortuga en una calle de Uptown iluminada con neones al atardecer.',
      'Una tortuga en una esquina, bajo el letrero de neón de un Coffee Shop.',
      'Donnie golpeando con su bastón a un gran mutante en un estadio iluminado por focos.',
      'Una tortuga saliendo a la carrera de una tubería circular de las alcantarillas.',
    ],
    sections: [
      {
        task: 'Soluciones de traversal y combate',
        taskExecution: [
          'Probamos y entregamos niveles como prueba de concepto, sobre todo de <b>traversal y combate</b>. Eso nos llevó a pensar en los niveles principalmente como entidades aisladas, en lugar de conectarlos, y a dejar rastro de esa interconexión solo en los portales.',
          'Nos repartimos los niveles para maximizar la producción y llegar cuanto antes a los 40 niveles. Después, cada uno se ocupó de funcionalidades presentes en todos los niveles: así todos conocían el alcance completo del juego, pero cada uno podía apoyarse en sus puntos fuertes: cámaras, blockouts, creación de arenas, set pieces, etc.',
          'Al mismo tiempo, me encargué personalmente de rehacer algunos niveles desde cero (algunos estaban muy lejos de la calidad esperada tras las primeras pasadas) y empecé a comunicarme a diario con QA: documentando el layout de los niveles; los resultados esperados de las habilidades de traversal y combate y de los props interactivos; y los errores críticos en el flujo del juego.',
          'Tras año y medio, este enfoque mixto de responsabilidades dentro del departamento hizo de nuestro equipo un grupo muy flexible, centrado en unir al estudio tanto en funcionalidades como en contenido, y un pilar de fiabilidad dentro de nuestra estructura corporativa. Entregamos mucho más, y mucho mejor, de lo esperado durante la producción y la postproducción.',
        ],
        alts: [
          [
            'Blockout: Leo aprovechando ráfagas de viento para pasar junto a ventiladores que giran.',
            'Leo cruzando un salto con ráfagas de viento en una azotea, junto a un depósito de agua.',
          ],
          [
            'Blockout del atrio circular de The Mall, con plantas en forma de anillo.',
            'Otra vista del blockout de The Mall, con sus balcones redondos alrededor de un vacío central.',
          ],
          [
            'Leo subiendo a la carrera una escalera en el blockout de The Mall.',
            'Leo subiendo a la carrera una escalera en The Mall, con el arte final.',
          ],
          [
            'Blockout: Donnie subiendo una larga escalera.',
            'Leo deslizándose por la barandilla de una escalera llena de grafitis.',
          ],
          [
            'Blockout: una tortuga avanzando por un pasillo hacia el estadio.',
            'Leo avanzando por un pasaje oscuro, con el arte final.',
          ],
          [
            'Las cuatro tortugas entrando en el puente.',
            'Una tortuga saltando por los cables del puente.',
          ],
        ],
        captions: [
          '1. Nuestro proceso de blockout nos permitía modelar puzles de traversal rápidamente, lo que ayudó al ritmo de los niveles.',
          '2. Algunas capturas de BK_05, más tarde conocido en el juego como The Mall, con una estructura circular difícil de respetar con el trabajo de cámaras que tuvimos que descartar.',
          '3. Tras rehacerlo, aquí vemos uno de los espacios de The Mall, que funcionaba mejor con la cámara y para el traversal.',
          '4. Recreamos varios lugares icónicos de Nueva York, como las escaleras de West 167th Street (las «Joker Stairs»)...',
          '5. ...el Yankee Stadium...',
          '6. ...y el puente de Brooklyn, un nivel del que estoy especialmente orgulloso porque es mi propia reinterpretación del famoso puente. Aquí lo vemos con todo el arte.',
        ],
      },
      {
        task: 'Retos creativos',
        taskExecution: [
          'Los portales, las cámaras y el dressing artístico fueron los principales retos del flujo de trabajo de diseño de niveles.',
          'Al principio del desarrollo, cada portal debía servir a la vez de entrada y de salida para dar libertad al departamento de Narrativa. Sin embargo, cuando la narrativa pasó de una estructura «tipo rogue-like» a una más lineal, llegamos a un punto en el que los portales casi nunca se usaban para ambas cosas. Las misiones exigían: un punto de entrada; un camino; un punto de salida.',
          'Aunque este enfoque generaba expectación en lo narrativo y encajaba con las restricciones de gameplay, el paso a una estructura lineal tuvo un coste oculto: la carga de producción aumentó, sobre todo en los niveles con muchos momentos narrativos, así que nuestra primera estimación para la colocación de cámaras y el pulido de los blockouts se quedó corta. Las cámaras tenían que transmitir una fuerte sensación de dirección y de expectación, lo que alargó los tiempos de iteración.',
          'Por último, el equipo de diseño de niveles tenía que implementar props de gameplay para los retos de traversal y las arenas de combate, además de ambientar algunos rincones para que los niveles parecieran vivos. En todos estos aspectos se concentró la mayor parte del tiempo de iteración.',
        ],
        taskImageAlt:
          'Hoja de planificación del nivel del metro de Midtown: un diagrama del layout con los portales, las rutas de las misiones y fotos de referencia.',
        taskCaption:
          'Planificación del nivel del metro de Midtown, con los portales marcados y las misiones que lo atraviesan resaltadas.',
        alts: [
          [
            'Leo corriendo por una azotea con claraboyas.',
            'Una tortuga luchando en una azotea entre barriles y claraboyas.',
          ],
          [
            'Las tortugas corriendo por una azotea junto a las vías del tren.',
            'Una tortuga corriendo a toda velocidad por una calle llena de escombros.',
          ],
          [
            'Vista cenital del blockout de BK_02.',
            'Vista cenital de BK_02 con sus arenas y portales marcados en rojo.',
          ],
        ],
        captions: [
          '1. Aunque intentamos mantener el movimiento vectorial en pantalla, a veces optamos por una sensación más cinematográfica durante el combate',
          '2. Además del dressing artístico, el equipo de diseño de niveles llenó las secciones de traversal y las arenas de props interactivos para mantener la imagen vibrante de una Nueva York en crisis',
          '3. Después de decidir cómo se conecta el nivel con los demás, colocamos un primer layout con los portales a otros niveles y recorrimos todas las misiones que lo atravesarían.',
        ],
        comparisons: [
          {
            beforeLabel: 'Blockout',
            afterLabel: 'Propuesta',
            beforeAlt: 'Vista cenital del blockout de BK_02.',
            afterAlt:
              'La misma vista con la propuesta dibujada encima en líneas rojas, naranjas y azules.',
            caption:
              'BK_02 desde arriba: el blockout y la propuesta dibujada encima. En rojo, la parte del nivel jugable en conjunto; en naranja, los bloques de geometría recolocados; en azul, los portales recolocados dentro del nivel.',
          },
        ],
      },
      {
        task: 'Pautas de diseño de niveles',
        taskExecution: [
          'Nuestro objetivo principal era <b>agilizar el diseño de niveles</b> y poder producir al menos el doble o el triple de los niveles necesarios, para ofrecer a Dirección Creativa una selección de ideas, así que trabajamos a 3 niveles de profundidad.',
          '<b>A alto nivel</b>, partimos de un objetivo («de 40 a 50 niveles en total, además de set pieces y jefes: la mayoría interconectados para las misiones»), así que creamos un <b>mapa de los distritos</b> (que acabó siendo el mapa del juego) y buscamos lugares interesantes en cada uno. También estudiamos entornos comunes (azoteas, calles, alcantarillas y túneles de metro) para ayudar a los calendarios de producción de arte y gameplay.',
          '<b>A nivel intermedio</b>, seguimos un enfoque de 3 pasadas pensado para iterar rápido: bioma y foco de gameplay; colocación de cámaras y arenas; y correcciones de arte y colisiones. En la práctica, solían servir para probar la geometría y la cámara: según el feedback de producción de Outright Games, metimos en el calendario tantas pasadas como nos pidieron, perfeccionando primero la geometría y la cámara de las rutas. Estas pasadas, de las que la segunda era la más crucial pero también la que más tiempo llevaba, nos ayudaron a encontrar un tema para cada nivel sin perder la cohesión entre los espacios jugables.',
          '<b>A bajo nivel</b>, nos centramos primero en resolver los bloques de acción (retos de traversal, diseño de arenas y momentos narrativos), dejando espacio a la integración del arte por la identidad visual única de la franquicia. Los blockouts se sustituían por assets finales, y las superficies por texturas, con una herramienta de reemplazo.',
        ],
        taskImageAlt:
          "Mapa ilustrado de los distritos de Nueva York: Uptown, Midtown, Hell's Kitchen, Downtown, el Bronx, Queens, Brooklyn y Staten Island.",
        taskCaption:
          'Los cinco distritos, con Manhattan dividido en varias zonas reconocibles.',
        alts: [
          [
            'Diagrama del mapa de la ciudad y de la tipología de niveles, con los niveles agrupados por distrito.',
            'Diagrama de conexiones entre los niveles de Downtown, Brooklyn y Staten Island.',
          ],
          [
            'Diagrama de conexiones entre los niveles de Brooklyn, con el nivel Streets resaltado.',
            'Diagrama del layout de BK_02 con sus portales numerados a otros niveles.',
          ],
          [
            'Los muelles de HK_01 en la tercera pasada: un gran contenedor verde en el centro de la arena, junto a una furgoneta blanca.',
            'Los mismos muelles en la versión final, con el suelo ya decorado: el centro queda despejado, con un contenedor metálico más pequeño a la izquierda y la furgoneta a la derecha.',
          ],
          [
            'DT_06 en la segunda pasada: Donnie peleando en una plaza redonda elevada, con el suelo gris liso.',
            'La plaza redonda en la versión final, pintada con una gran calavera mexicana y adornada con banderines, con Leo peleando en ella.',
          ],
          [
            'BK_05 en la primera pasada: Leo entre mesas de cafetería y jardineras, con una iluminación azul plana.',
            'La misma zona de cafetería en la versión final: Leo peleando contra un enemigo junto a la escalera mecánica, entre mesas, una columna y escaparates.',
          ],
        ],
        captions: [
          '1. Los niveles se concibieron primero como parte de la ciudad y sus distritos.',
          '2. Después de decidir cómo se conecta el nivel con los demás, colocamos un primer layout con los portales a otros niveles y todas las misiones que lo atravesarían.',
          '3. HK_01, los muelles, en la tercera pasada y en la versión final, tras una pasada de arte posterior. El contenedor del centro era interesante, pero acabó dando muchos problemas de cámara.',
          '4. DT_06 en la segunda pasada y en la versión final. Su plaza redonda funcionó como un espacio abierto poco habitual para el primer combate contra el hipopótamo.',
          '5. BK_05, The Mall, en la primera pasada y en la versión final. Los personajes se leen mucho mejor en la versión final, en un nivel que se presta a lanzar objetos a los enemigos.',
        ],
      },
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
    videos: [
      {
        title: 'Diario de desarrollo',
        description:
          'El diario de desarrollo oficial del juego (2022). Juan Raigada, CEO y director creativo del estudio, y yo contamos cómo se concibió y se hizo el juego. Salgo a partir del 0:35.',
      },
    ],
    team: 'Unas 13 personas, más colaboradores externos',
    ownership: [
      '15 de los 25 niveles, con sus arenas, puzles y cámaras.',
      'La mentoría de un level designer junior.',
      'La localización a más de 20 idiomas: su implementación en el motor y el contacto con la empresa de localización que contrató nuestra editora, para que las traducciones llegaran a tiempo al estudio.',
    ],
    context: [
      'Un plataformas de acción 3D para niños con licencia de DreamWorks, publicado por Outright Games.',
      'Una producción de 12 meses para unas 13 personas, más un par de colaboradores externos.',
      '25 niveles: 5 reinos con 5 niveles cada uno (3 niveles principales, 1 set piece y 1 combate contra un jefe).',
      'Cámaras isométricas colocadas a mano, para una acción de ritmo rápido con varios dragones en pantalla.',
      'Se abren nuevos caminos en niveles anteriores a medida que el jugador reúne cuatro dragones, así que los niveles tenían que permitir volver atrás.',
    ],
    problems: [
      {
        problem:
          '25 niveles en 12 meses, con habilidades de traversal que fallaban con facilidad ante una geometría imprecisa.',
        decision:
          'Construimos los niveles con un kit modular que compró el estudio, siguiendo unas reglas de diseño de niveles que escribimos en equipo.',
        outcome:
          'Las secciones de traversal y combate se cerraban mucho más rápido, con niveles de 10 minutos terminados en menos de 2 semanas. Pero aprender a usar el kit y sortear sus bugs nos tuvo persiguiendo el calendario.',
      },
      {
        problem:
          'Los puzles tenían que entenderse con claridad para niños, desde una cámara isométrica fija.',
        decision:
          'Inclinamos ligeramente la cámara para encuadrar llaves y cerraduras.',
        outcome:
          'Los puzles eran más fáciles de entender para los niños, pero no podíamos esconder las soluciones ni usar layouts complejos para animar a explorar.',
      },
      {
        problem:
          'Todos los reinos son subterráneos, pero las cavernas tenían que parecer grandes con una cámara fija.',
        decision:
          'Con el tiempo que nos ahorró el kit modular, trabajamos con Arte en varias capas de visualización ajustadas al campo de visión de la cámara.',
        outcome:
          'Cavernas grandes y de aspecto complejo. Equilibrarlas con un gameplay claro fue difícil, pero funcionó.',
      },
    ],
    results: [
      'Lanzado el 23 de septiembre de 2022 en PC, PlayStation 4 y 5, Xbox One, Xbox Series X|S y Nintendo Switch.',
      '25 niveles en 5 reinos, 15 de ellos míos.',
      'Localizado a más de 20 idiomas.',
    ],
    lessons: [
      'Dejar tiempo para aprender una herramienta nueva. El kit modular fue una buena idea, pero en un proyecto de 12 meses no pudimos aprender a usarlo del todo ni arreglar los bugs que lo plagaban, y perseguimos nuestro propio calendario durante casi todo el proyecto.',
    ],
    imageAlts: [
      'Logo de DreamWorks Dragons: Legends of the Nine Realms.',
      'Un camino rocoso entre charcas de lava en el reino de fuego.',
      'Agujas de hielo y un arco helado en el reino de hielo.',
      'Una pared de caverna cubierta de cristales y raíces retorcidas.',
    ],
    sections: [
      {
        task: 'Cámaras y set pieces',
        taskExecution: [
          'En este proyecto teníamos que trabajar con cámaras colocadas a mano, con una vista isométrica que favorece la acción de ritmo rápido con varios dragones en pantalla.',
          'Por el camino quisimos evitar los cortes de cámara todo lo posible, para ayudar a la legibilidad y no marear con demasiados movimientos de cámara. Con esto en mente, creamos una cámara principal que sigue al jugador, mostrando siempre el camino hacia delante pero girándose cuando hace falta.',
          'Cuando hay puzles, arenas y secretos a la vista, la cámara suele transmitir de distintas formas que algo está pasando. Inclinando ligeramente la cámara para encuadrar llaves y cerraduras, hicimos que los puzles fueran más fáciles de entender para los niños.',
        ],
        taskImageAlt:
          'Un montaje de los dragones recorriendo cavernas de varios reinos, visto desde la cámara isométrica.',
        alts: [
          [
            'Set piece: Thunder a toda velocidad por una caverna oscura.',
            'Set piece: Plowhorn cruzando una caverna helada.',
          ],
          [
            "Un corte de cámara a la lava que sube, con la frase «Watch out, Thunder! That doesn't look good!».",
            'Puzle: Plowhorn entre cristales de hielo y de fuego.',
          ],
        ],
        captions: [
          '1. Para variar el ritmo, introdujimos set pieces con varios elementos, como lava o escombros que persiguen al jugador, o vientos helados que intentan frenarlo.',
          '2. Reservamos los cortes de cámara para momentos clave, como un peligro a punto de alcanzar al jugador o la revelación de un puzle que muestra lo que acaba de desbloquear un interruptor.',
        ],
      },
      {
        task: 'Pautas de diseño de niveles y modularización',
        taskExecution: [
          'El mundo de Dragons se divide en 5 reinos con 5 niveles cada uno, 25 niveles en total. En detalle, cada reino tiene: 3 niveles principales (exploración, combate y narrativa); 1 set piece con mecánicas especiales; y 1 combate contra un jefe.',
          'Una distribución que reforzaba el aspecto de aventura del juego, con niveles más sencillos al principio que animaban a explorar. A medida que el jugador avanza en la historia, descubriendo nuevas mecánicas y enemigos y completando su propio escuadrón de dragones, se pueden desbloquear nuevos caminos en niveles anteriores. Para conseguir todos los cristales, el jugador tiene que volver atrás y usar los cuatro dragones.',
          'Junto a una amplia variedad de interactuables (cristales explosivos, ráfagas de viento, pozos de lava, pinchos, muros de hielo...), introdujimos un plugin para crear niveles de forma modular. Esto nos dio flexibilidad para crear geometrías precisas sin preocuparnos demasiado de que las habilidades de traversal fallaran: con un conjunto de módulos de geometría, nos adaptamos a unas reglas de diseño de niveles preestablecidas y cerramos las secciones de traversal y combate mucho más rápido.',
          'Esta modularización nos dio tiempo para repensar los entornos junto con Arte. Por diégesis, todos los reinos son subterráneos, así que trabajamos en varias capas de visualización ajustadas al FOV de la cámara, con detalles que sugerían que estábamos en cavernas grandes y complejas. Ajustarlo a la necesidad de un gameplay claro fue difícil, pero satisfactorio.',
        ],
        alts: [
          [
            'Thunder cruzando un camino de la caverna, con la pista «The dragons must keep moving».',
            'Thunder volando sobre una amplia caverna.',
          ],
          [
            'Puzle: un bloque móvil junto a un camino bloqueado por cristales.',
            'Puzle: un bloque móvil junto a una charca de lava en el reino de fuego.',
          ],
        ],
        captions: [
          '1. Alejábamos la cámara siempre que podíamos para que los niveles parecieran más grandes y ricos.',
          '2. Los puzles de traversal consisten en seguir la pista de los bloques y de los cristales que los activan o desbloquean.',
        ],
      },
    ],
  },
  '10_spirit': {
    genre: 'Mundo abierto',
    overview:
      'Un juego de mundo abierto narrativo y relajado, basado en el universo de Spirit, en el que los jugadores exploran la fauna de un valle a lomos de Spirit y descubren los secretos de un antiguo mapa del tesoro relacionado con la madre de Lucky.',
    summary:
      'Hice a la vez de Game Designer y Producer mientras nos llevábamos la producción a casa y sacábamos adelante el proyecto durante la pandemia de COVID. Me ocupé de la localización, las tareas del proyecto, las reuniones con el cliente externo, la UI y, junto a otro diseñador, el diseño de niveles.',
    highlights: [
      'Creé los flujos de producción y dirigí el día a día del equipo, gestionando los hitos y el reporting a stakeholders internos y externos.',
      'Fui mentor de artistas y game designers, generé confianza con los equipos de Arte y Programación y ayudé a cultivar una cultura sana en la empresa.',
      'Asumí el control directo del diseño de niveles y la responsabilidad completa del mapa del mundo: desarrollé la funcionalidad desde el concepto hasta la implementación final.',
      'Creé varios puzles de traversal, animales y coleccionables para poblar el mapa del mundo.',
    ],
    team: '11 personas en el equipo principal',
    ownership: [
      'El mapa del mundo, desde el concepto hasta la implementación final, incluido su tamaño de 5 km².',
      'El diseño de niveles, compartido con otro diseñador: puzles de traversal, animales y coleccionables por todo el mapa.',
      'La producción: flujos de trabajo, hitos, el día a día y el reporting a stakeholders internos y externos.',
      'La localización, tareas de UI y las reuniones con el cliente externo.',
    ],
    context: [
      'Un juego narrativo de mundo abierto con licencia de DreamWorks, publicado por Outright Games.',
      'El cliente externo pidió que montar a Spirit se sintiera como una experiencia en plena naturaleza, con paisajes que contemplar y espacio para recorrer.',
      'Un equipo principal de 11 personas que se llevó la producción a casa durante la pandemia de COVID.',
      'Siete plataformas, incluido el streaming en la nube en Stadia y Amazon Luna.',
    ],
    problems: [
      {
        problem:
          'Montar a Spirit tenía que sentirse como un viaje por la naturaleza, con paisajes que contemplar y espacio para recorrer.',
        decision:
          'Tras algunas pruebas, fijé el mapa del mundo en 5 km², con distintos biomas alrededor de un lago central.',
        outcome:
          'Daba la sensación de cabalgar por una región real. El equipo de Programación tuvo que cargar el terreno por fragmentos, lo que funcionó en todas las plataformas y permitió más detalle, pero nos frenó durante un tiempo.',
      },
      {
        problem:
          'La pandemia de COVID mandó la producción a casa en mitad del proyecto.',
        decision:
          'Creé los flujos de producción y dirigí el día a día, gestionando los hitos y el reporting a stakeholders internos y externos.',
        outcome:
          'Sacamos el proyecto adelante y lo lanzamos en siete plataformas.',
      },
    ],
    results: [
      'Lanzado en junio de 2021 en PC, PlayStation 4, Xbox One, Xbox Series X|S, Nintendo Switch, Stadia y Amazon Luna.',
      'Un mapa del mundo de 5 km², cargado por fragmentos en todas las plataformas.',
    ],
    lessons: [
      'Vigilar la ambición en la preproducción. El mapa de 5 km² necesitaba cargar el terreno por fragmentos, algo que acabó funcionando en todas las plataformas pero nos frenó durante un tiempo.',
      'Empezar pronto con la UI. Le importaba mucho más a nuestra editora que a nosotros, y en los siguientes proyectos empezamos con ella antes.',
    ],
    imageAlts: [
      "Logo de DreamWorks Spirit: Lucky's Big Adventure.",
      'Tres jinetes a caballo contemplando un valle de árboles en flor.',
      'Lucky saludando a Spirit en un prado.',
      'Lucky montando a Spirit a orillas del lago.',
      'Caballos y jinetes reunidos en un claro del bosque.',
    ],
    sections: [
      {
        task: 'El mapa del mundo',
        taskExecution: [
          'Spirit tiene un mapa de 5 km², uno de los principales retos del proyecto. Yo estaba a cargo de la funcionalidad y decidí ese tamaño porque uno de los mandatos del cliente externo era que montar a Spirit fuera una experiencia en plena naturaleza, con paisajes que contemplar y espacio suficiente para recorrer. Tras algunas pruebas, nos convenció mucho la sensación de atravesar una región real, con distintos biomas y rincones con encanto, así que nos quedamos con ese tamaño.',
          'Sin embargo, esto no salió gratis: el equipo de Programación tuvo que optar por una partición del mapa que carga y descarga fragmentos de terreno en tiempo real. Acabó funcionando en todas las plataformas y permitió más detalle, pero fue un lastre durante un tiempo. Fue una lección de humildad sobre los peligros de ser demasiado ambicioso en la preproducción.',
        ],
        alts: [
          [
            'Montando a Spirit por el valle de noche, hacia un marcador de misión.',
            'Montando a Spirit por un camino de tierra, hacia un marcador de misión.',
          ],
          [
            'Cabalgando junto al lago, hacia un marcador de misión.',
            'Cabalgando por un cañón rocoso al atardecer.',
          ],
          [
            'Un arroyo que corre entre rocas y helechos.',
            'Un sendero del bosque entre rocas y árboles.',
          ],
        ],
        captions: [
          '1. Queríamos que montar a Spirit se sintiera muy fluido, así que la cámara se alejaba para que los jugadores pudieran disfrutar del paisaje.',
          '2. El lago era un elemento central del juego: todos los biomas lo rodean por un lado u otro, con paisajes muy distintos.',
          '3. Trabajamos con artistas de entornos para crear rincones con encanto en varios lugares clave por los que el jugador pasaría a menudo.',
        ],
      },
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
