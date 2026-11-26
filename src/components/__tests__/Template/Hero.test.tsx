import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import contact from '@/data/contact';
import { currently } from '@/data/home';
import openToWork from '@/data/openToWork';
import profile from '@/data/profile.json';
import { AUTHOR_HEADLINE } from '@/lib/utils';

import Hero from '../../Template/Hero';

describe('Hero', () => {
  it('renders the hero section', () => {
    render(<Hero />);

    const heroSection = document.querySelector('.hero');
    expect(heroSection).toBeInTheDocument();
  });

  it('puts the name and the headline in the heading', () => {
    render(<Hero />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(profile.name);
    expect(heading).toHaveTextContent(AUTHOR_HEADLINE);
  });

  it('leads the headline with the target role', () => {
    expect(AUTHOR_HEADLINE).toBe(
      'Lead Level Designer · Game Designer · Producer',
    );
  });

  it('says what roles I am open to, and from when', () => {
    render(<Hero />);

    expect(screen.getByText('Open to work')).toBeInTheDocument();
    expect(screen.getByText(openToWork.roles)).toBeInTheDocument();
    for (const highlight of openToWork.highlights) {
      expect(screen.getByText(highlight)).toBeInTheDocument();
    }
  });

  it('shows what I am working on now', () => {
    render(<Hero />);

    for (const item of currently) {
      expect(screen.getByText(item.text)).toBeInTheDocument();
    }
  });

  it('leads with the portfolio, then LinkedIn', () => {
    render(<Hero />);

    const links = document.querySelectorAll('.hero-cta a');
    expect(links).toHaveLength(2);

    const [portfolio, linkedIn] = links;
    expect(portfolio).toHaveAttribute('href', '/portfolio');
    expect(portfolio).toHaveClass('button-primary');

    const linkedInUrl = contact.find((c) => c.label === 'LinkedIn')?.link;
    expect(linkedIn).toHaveAttribute('href', linkedInUrl);
    expect(linkedIn).toHaveAttribute('target', '_blank');
    expect(linkedIn).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('has decorative background elements', () => {
    render(<Hero />);

    const bg = document.querySelector('.hero-bg');
    expect(bg).toBeInTheDocument();
    expect(bg).toHaveAttribute('aria-hidden', 'true');
  });
});
