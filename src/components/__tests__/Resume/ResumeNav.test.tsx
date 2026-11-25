import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ExperienceNav from '../../Experience/ExperienceNav';

const SECTIONS = ['Skills', 'Resume', 'Education', 'Courses'];

describe('ExperienceNav', () => {
  it('renders navigation element', () => {
    render(<ExperienceNav />);

    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('renders links to all experience sections', () => {
    render(<ExperienceNav />);

    for (const name of SECTIONS) {
      expect(screen.getByRole('link', { name })).toHaveAttribute(
        'href',
        `#${name.toLowerCase()}`,
      );
    }
  });

  it('renders one link per section', () => {
    render(<ExperienceNav />);

    expect(screen.getAllByRole('link')).toHaveLength(SECTIONS.length);
  });

  it('has correct CSS class', () => {
    render(<ExperienceNav />);

    const nav = document.querySelector('.experience-nav');
    expect(nav).toBeInTheDocument();
  });

  it('resume link is active by default', () => {
    render(<ExperienceNav />);

    expect(screen.getByRole('link', { name: 'Resume' })).toHaveClass('active');
  });
});
