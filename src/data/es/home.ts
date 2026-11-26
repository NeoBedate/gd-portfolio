/**
 * Spanish version of `../home.ts`. Images, IP owners and publishers come
 * from the English file; only the text is here. Tests check that the
 * numbers and the number of facts match the English version.
 */

import type { CurrentItem, HeroTagline, Stat, Strength } from '../home';
import profile from '../profile.json';

export const heroTagline: HeroTagline = {
  before: `Diseño espacios de acción para juegos de consola: traversal, arenas de combate y cámaras. ${profile.professionalYears} años en la industria, 3 juegos de consola lanzados con licencias de DreamWorks y Nickelodeon (publicados por Outright Games), y dirigí el equipo de diseño de niveles que entregó los 40 niveles de `,
  cite: 'TMNT: Mutants Unleashed',
  after: '.',
};

/** The facts on each featured game's tile, by project id. */
export const featuredFacts: Record<string, string[]> = {
  '12_tmnt': ['Dirigí un equipo de 4 level designers', '40 niveles'],
  '11_dragons': [
    'El 60 % de los niveles',
    'Kit modular de niveles',
    'Más de 20 idiomas',
  ],
  '10_spirit': [
    'Mundo abierto de 5 km²',
    'Lanzado en plena COVID con un equipo junior',
  ],
};

export const stats: Stat[] = [
  { value: '40', label: 'niveles en TMNT, con un equipo de 4' },
  { value: '3', label: 'juegos de consola lanzados' },
  { value: '5 km²', label: 'de mundo abierto en Spirit' },
  { value: '20+', label: 'idiomas localizados en Dragons' },
  { value: '6 → 31', label: 'personas: así creció mi último estudio' },
  { value: '300+', label: 'alumnos universitarios' },
];

export const philosophy =
  'La legibilidad, lo primero: cuando el jugador entiende un espacio de un vistazo, puede disfrutar del reto.';

export const strengths: Strength[] = [
  {
    title: 'Diseño de niveles',
    body: 'Espacios de acción para juegos 3D de consola: traversal, arenas de combate y cámaras colocadas a mano. Kits modulares y reglas de blockout que mantienen a un equipo rápido y coherente.',
  },
  {
    title: 'Producción',
    body: 'Pipelines en Jira que conectan la creación de niveles, QA y el calendario. Trabajo diario con clientes externos y proveedores, y localización a más de 20 idiomas.',
  },
  {
    title: 'Liderazgo',
    body: 'Dirigí un equipo de 4 level designers en TMNT y fui mentor de perfiles junior en Spirit y Dragons. También he enseñado diseño de videojuegos en la universidad a más de 300 alumnos.',
  },
];

export const currently: CurrentItem[] = [
  { text: 'Consultoría en un juego de acción 3D sin anunciar (bajo NDA)' },
];
