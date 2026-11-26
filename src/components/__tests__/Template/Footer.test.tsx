import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { cvDownloads } from '@/data/cv';
import { AUTHOR_NAME, AUTHOR_ROLE } from '@/lib/utils';

import Footer from '../../Template/Footer';

describe('Footer', () => {
  it('renders the footer with correct structure', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('displays the name and role', () => {
    render(<Footer />);

    expect(screen.getByText(AUTHOR_NAME)).toBeInTheDocument();
    expect(screen.getByText(AUTHOR_ROLE)).toBeInTheDocument();
  });

  it('displays the current year in copyright', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear().toString();
    expect(
      screen.getByText(new RegExp(`© ${currentYear}`)),
    ).toBeInTheDocument();
  });

  it('says when the site was last updated', () => {
    render(<Footer />);

    const time = document.querySelector('.footer-updated time');
    expect(screen.getByText(/last updated/i)).toBeInTheDocument();
    expect(time?.getAttribute('datetime')).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(time).toHaveTextContent(/^\d{1,2} [A-Z][a-z]+ \d{4}$/);
  });

  it('links both CVs', () => {
    render(<Footer />);

    for (const cv of cvDownloads) {
      const link = screen.getByRole('link', { name: cv.label });
      expect(link).toHaveAttribute('href', cv.href);
      expect(link).toHaveAttribute('download');
    }
  });

  it('renders navigation links', () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute(
      'href',
      '/about',
    );
    expect(screen.getByRole('link', { name: /experience/i })).toHaveAttribute(
      'href',
      '/experience',
    );
    expect(screen.getByRole('link', { name: /portfolio/i })).toHaveAttribute(
      'href',
      '/portfolio',
    );
    expect(screen.getByRole('link', { name: /archive/i })).toHaveAttribute(
      'href',
      '/archive',
    );
    expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute(
      'href',
      '/contact',
    );
  });

  it('renders contact icons section', () => {
    render(<Footer />);

    // Contact icons are rendered via ContactIcons component
    const socialSection = document.querySelector('.footer-social');
    expect(socialSection).toBeInTheDocument();
    expect(screen.getByText('Connect')).toBeInTheDocument();
  });

  it('credits game media to its owners', () => {
    render(<Footer />);

    expect(
      screen.getByText(/belong to their respective owners/i),
    ).toBeInTheDocument();
  });

  it('has link to home from avatar', () => {
    render(<Footer />);

    const avatarLink = document.querySelector('.footer-avatar');
    expect(avatarLink).toHaveAttribute('href', '/');
  });
});
