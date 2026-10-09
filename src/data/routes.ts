import { AUTHOR_NAME } from "@/lib/utils";

export interface Route {
  label: string;
  path: string;
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
    path: '/about',
  },
  {
    label: 'Resume',
    path: '/resume',
  },
  {
    label: 'Portfolio',
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
    path: '/archive',
    primary: true,
  },
  {
    label: 'Contact',
    path: '/contact',
  }
];

export default routes;
