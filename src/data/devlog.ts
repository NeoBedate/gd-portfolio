/**
 * Projects that publish weekly updates. Each `id` matches a folder under
 * `content/devlog/`; a test fails if a folder has no entry here.
 *
 * Nothing shows on the site until the project's first update is published
 * (`draft: false`), so a project can be listed here before it starts.
 */
export interface DevlogProject {
  /** Folder name under `content/devlog/`, also used in the URL. */
  id: string;
  /** How the project is named on the site. */
  name: string;
  /** One or two sentences for the project's update list and link previews. */
  description: string;
  /** The project's case-study page, once it exists. */
  caseStudyPath?: `/${string}/`;
}

const devlogProjects: DevlogProject[] = [
  {
    // Working id and name: settle both at kickoff, before the first update is
    // published, because the id becomes part of every update's URL.
    id: 'ue5-level',
    name: 'UE5 personal level',
    description:
      'Weekly updates on a personal level built in Unreal Engine 5: what changed, the design decision behind it, and what comes next.',
  },
];

export default devlogProjects;

export function getDevlogProject(id: string): DevlogProject | undefined {
  return devlogProjects.find((project) => project.id === id);
}
