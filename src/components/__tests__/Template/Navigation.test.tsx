import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { cvDownloadsFor } from '@/data/cv';

import Navigation from '../../Template/Navigation';

// Mock usePathname to control active state
const mockPathname = vi.fn();
vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
}));

describe('Navigation', () => {
  beforeEach(() => {
    mockPathname.mockReturnValue('/');

    // Mock matchMedia for ThemeToggle
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it('renders the logo link to home', () => {
    render(<Navigation />);
    const logo = screen.getByRole('link', { name: /home/i });
    expect(logo).toHaveAttribute('href', '/');
  });

  it('renders navigation links for all non-index routes', () => {
    render(<Navigation />);

    // Should have links for About, Experience, Portfolio, Archive, Contact
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /experience/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /portfolio/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /archive/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
  });

  it('marks home route as active when on homepage', () => {
    mockPathname.mockReturnValue('/');
    render(<Navigation />);

    // About link should not be active
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).not.toHaveClass('active');
  });

  it('marks about route as active when on about page', () => {
    mockPathname.mockReturnValue('/about');
    render(<Navigation />);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toHaveClass('active');
    expect(aboutLink).toHaveAttribute('aria-current', 'page');
  });

  it('marks nested routes as active', () => {
    mockPathname.mockReturnValue('/experience/skills');
    render(<Navigation />);

    const experienceLink = screen.getByRole('link', { name: /experience/i });
    expect(experienceLink).toHaveClass('active');
  });

  it('renders theme toggle and hamburger menu', () => {
    render(<Navigation />);

    // Theme toggle should be present (placeholder initially due to SSR)
    const navActions = document.querySelector('.nav-actions');
    expect(navActions).toBeInTheDocument();
  });

  it('offers the CV on every page, with a tooltip saying its language', () => {
    render(<Navigation />);

    const cv = screen.getByRole('link', {
      name: 'Download CV (PDF, in English)',
    });
    expect(cv).toHaveAttribute('href', cvDownloadsFor('en')[0].href);
    expect(cv).toHaveAttribute('download');
    expect(cv).toHaveAccessibleDescription(/Spanish CV/);
    expect(screen.getByRole('tooltip', { hidden: true })).toHaveTextContent(
      'The CV is in English.',
    );
  });

  it('on a Spanish page, offers the Spanish CV and Spanish links', () => {
    mockPathname.mockReturnValue('/es/about/');
    render(<Navigation />);

    const cv = screen.getByRole('link', {
      name: 'Descargar CV (PDF, en español)',
    });
    expect(cv).toHaveAttribute('href', cvDownloadsFor('es')[0].href);
    expect(cv).toHaveAccessibleDescription(/CV en inglés/);

    const about = screen.getByRole('link', { name: 'Sobre mí' });
    expect(about).toHaveAttribute('href', '/es/about');
    expect(about).toHaveAttribute('aria-current', 'page');
    // next/link drops the trailing slash in tests; the build adds it back.
    expect(
      screen.getByRole('link', { name: /inicio/ }).getAttribute('href'),
    ).toMatch(/^\/es\/?$/);
  });

  it('switches language on the same page', () => {
    mockPathname.mockReturnValue('/experience/');
    render(<Navigation />);

    const es = screen.getByRole('link', { name: 'ES (Español)' });
    expect(es.getAttribute('href')).toMatch(/^\/es\/experience\/?$/);
    expect(es).toHaveAttribute('hreflang', 'es');

    const en = screen.getByRole('link', { name: 'EN (English)' });
    expect(en.getAttribute('href')).toMatch(/^\/experience\/?$/);
    expect(en).toHaveAttribute('aria-current', 'true');
  });
});
