import { t } from '@/data/i18n/ui';
import type { Lang } from '@/lib/i18n';
import { AUTHOR_NAME } from '@/lib/utils';

type NavKey = 'about' | 'experience' | 'portfolio' | 'archive' | 'contact';

export interface Route {
  /** The English label. Use {@link routeLabel} to show it. */
  label: string;
  /** The English path. Use `localizePath` to link to it. */
  path: string;
  /** Key of the label in the interface text (`t(lang).nav`). */
  key?: NavKey;
  index?: boolean;
  primary?: boolean;
}

const routes: Route[] = [
  {
    index: true,
    label: AUTHOR_NAME,
    path: '/',
  },
  {
    label: 'About',
    key: 'about',
    path: '/about',
  },
  {
    label: 'Experience',
    key: 'experience',
    path: '/experience',
  },
  {
    label: 'Portfolio',
    key: 'portfolio',
    path: '/portfolio',
  },
  /*{
    label: 'Writing',
    path: '/writing',
  },
  {
    label: 'Stats',
    path: '/stats',
  },*/
  {
    label: 'Archive',
    key: 'archive',
    path: '/archive',
    primary: true,
  },
  {
    label: 'Contact',
    key: 'contact',
    path: '/contact',
  },
];

/** A route's label in the given language. */
export function routeLabel(route: Route, lang: Lang): string {
  return route.key ? t(lang).nav[route.key] : route.label;
}

export default routes;
