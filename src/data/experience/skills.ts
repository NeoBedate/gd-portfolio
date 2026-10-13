export interface Skill {
  title: string;
  competency: number;
  category: string[];
}

export interface Category {
  name: string;
  color: string;
}

const skills: Skill[] = [
  // Game Engines
  {
    title: 'Unity',
    competency: 5,
    category: ['Game Engines'],
  },
  {
    title: 'Godot',
    competency: 3,
    category: ['Game Engines'],
  },
  // Version Control
  {
    title: 'Plastic SCM',
    competency: 5,
    category: ['Version Control'],
  },
  {
    title: 'GitHub',
    competency: 5,
    category: ['Version Control'],
  },
  {
    title: 'SmartGit',
    competency: 5,
    category: ['Version Control'],
  },
  // Web Development
  {
    title: 'Tortoise',
    competency: 3,
    category: ['Version Control'],
  },
  {
    title: 'SourceTree',
    competency: 4,
    category: ['Version Control'],
  },
  // Project Management
  {
    title: 'Hack N Plan',
    competency: 5,
    category: ['Project Management'],
  },
  {
    title: 'Jira',
    competency: 5,
    category: ['Project Management'],
  },
  {
    title: 'Confluence',
    competency: 5,
    category: ['Project Management'],
  },
  {
    title: 'Notion',
    competency: 5,
    category: ['Project Management'],
  },
  // Art
  {
    title: 'Photoshop',
    competency: 4,
    category: ['Art'],
  },
  {
    title: 'Premiere Pro',
    competency: 3,
    category: ['Art'],
  },
  {
    title: 'Illustrator',
    competency: 3,
    category: ['Art'],
  },
  // Infrastructure
  {
    title: 'GDocs',
    competency: 5,
    category: ['Productivity'],
  },
  {
    title: 'Excel',
    competency: 4,
    category: ['Productivity'],
  },
  {
    title: 'Draw.io',
    competency: 5,
    category: ['Productivity'],
  },
  {
    title: 'Figma',
    competency: 4,
    category: ['Productivity'],
  },
  // Languages
  {
    title: 'C#',
    competency: 5,
    category: ['Languages'],
  },
  {
    title: 'CSS',
    competency: 3,
    category: ['Languages'],
  },
  {
    title: 'HTML',
    competency: 3,
    category: ['Languages'],
  },
].map((skill) => ({ ...skill, category: skill.category.sort() }));

// this is a list of colors that I like. The length should be === to the
// number of categories. Re-arrange this list until you find a pattern you like.
const colors: string[] = [
  '#6968b3',
  '#37b1f5',
  '#40494e',
  '#515dd4',
  '#e47272',
  '#cc7b94',
  '#3896e2',
  '#c3423f',
  '#d75858',
  '#747fff',
  '#64cb7b',
];

const categories: Category[] = Array.from(
  new Set(skills.flatMap(({ category }) => category)),
)
  .sort()
  .map((category, index) => ({
    name: category,
    color: colors[index],
  }));

export { categories, skills };
