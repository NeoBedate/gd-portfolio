/**
 * What I'm looking for. Shown in the home hero (short form) and on the
 * Contact page (full form), so both always say the same thing.
 */

export interface OpenToWorkDetail {
  label: string;
  value: string;
}

export interface OpenToWork {
  /** The roles, in order of preference, as one phrase for the hero. */
  roles: string;
  /** Short facts shown after the roles in the hero. */
  highlights: string[];
  /** The full list for the Contact page. */
  details: OpenToWorkDetail[];
}

const openToWork: OpenToWork = {
  roles: 'Senior/Lead Level Design, Game Design and Production roles',
  highlights: [
    'Madrid',
    'Remote or hybrid',
    'Relocation, ideally within the EU',
    'From January 2027',
  ],
  details: [
    {
      label: 'Roles',
      value: 'Senior/Lead Level Designer, then Game Designer and Producer',
    },
    { label: 'Based in', value: 'Madrid, Spain (CET)' },
    {
      label: 'Work',
      value: 'Remote or hybrid. Open to relocating, ideally within the EU',
    },
    {
      label: 'Languages',
      value: 'Spanish (native), English (professional working proficiency)',
    },
    { label: 'Available', value: 'From January 2027, earlier by agreement' },
  ],
};

export default openToWork;
