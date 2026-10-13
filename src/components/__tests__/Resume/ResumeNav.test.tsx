import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ExperienceNav from '../../Experience/ExperienceNav';

describe('ExperienceNav', () => {
  it('renders navigation element', () => {
    render(<ExperienceNav />);

    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('renders links to all resume sections', () => {
    render(<ExperienceNav />);

    expect(screen.getByRole('link', { name: /experience/i })).toHaveAttribute(
      'href',
      '#experience',
    );
    expect(screen.getByRole('link', { name: /education/i })).toHaveAttribute(
      'href',
      '#education',
    );
    expect(screen.getByRole('link', { name: /skills/i })).toHaveAttribute(
      'href',
      '#skills',
    );
    expect(screen.getByRole('link', { name: /courses/i })).toHaveAttribute(
      'href',
      '#courses',
    );
    expect(screen.getByRole('link', { name: /references/i })).toHaveAttribute(
      'href',
      '#references',
    );
  });

  it('renders 5 navigation links', () => {
    render(<ExperienceNav />);

    const links = screen.getAllByRole('link');
    expect(links.length).toBe(5);
  });

  it('has correct CSS class', () => {
    render(<ExperienceNav />);

    const nav = document.querySelector('.experience-nav');
    expect(nav).toBeInTheDocument();
  });

  it('experience link is active by default', () => {
    render(<ExperienceNav />);

    const experienceLink = screen.getByRole('link', { name: /experience/i });
    expect(experienceLink).toHaveClass('active');
  });
});
