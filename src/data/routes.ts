export interface Route {
  label: string;
  path: string;
  index?: boolean;
}

const routes: Route[] = [
  {
    index: true,
    label: "Santiago R. Bedate",
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
    label: 'Contact',
    path: '/contact',
  },
];

export default routes;
