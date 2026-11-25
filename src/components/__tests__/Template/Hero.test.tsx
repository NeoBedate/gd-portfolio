import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import profile from '@/data/profile.json';

import Hero from '../../Template/Hero';

describe('Hero', () => {
  it('renders the hero section', () => {
    render(<Hero />);

    const heroSection = document.querySelector('.hero');
    expect(heroSection).toBeInTheDocument();
  });

  it('displays the name as heading', () => {
    render(<Hero />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(profile.name);
  });

  it('displays the roles chip', () => {
    render(<Hero />);

    expect(
      screen.getByText(
        `${profile.role_01} / ${profile.role_02} / ${profile.role_03}`,
      ),
    ).toBeInTheDocument();
  });

  it('renders CTA buttons with correct links', () => {
    render(<Hero />);

    const portfolioButton = screen.getByRole('link', { name: /portfolio/i });
    expect(portfolioButton).toHaveAttribute('href', '/portfolio');
    expect(portfolioButton).toHaveClass('button-primary');

    const experienceButton = screen.getByRole('link', { name: /experience/i });
    expect(experienceButton).toHaveAttribute('href', '/experience');
    expect(experienceButton).toHaveClass('button-secondary');
  });

  it('has decorative background elements', () => {
    render(<Hero />);

    const bg = document.querySelector('.hero-bg');
    expect(bg).toBeInTheDocument();
    expect(bg).toHaveAttribute('aria-hidden', 'true');
  });
});
