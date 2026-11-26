import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import data from '@/data/projects';
import { caseStudyPath, legacyHash } from '@/lib/caseStudyLinks';

import ProjectList from '../../Projects/ProjectList';

const replace = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace, push: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => '/portfolio/',
}));

const projects = data.filter((p) => p.selected);

describe('case-study links', () => {
  it('builds the page path from a slug', () => {
    expect(caseStudyPath('tmnt-mutants-unleashed')).toBe(
      '/portfolio/tmnt-mutants-unleashed/',
    );
  });

  it('keeps the old hash of each game: its id without the sort prefix', () => {
    expect(legacyHash('12_tmnt')).toBe('tmnt');
    expect(legacyHash('11_dragons')).toBe('dragons');
  });
});

describe('ProjectList', () => {
  it('links every card to its game page', () => {
    render(<ProjectList projects={projects} />);

    const links = screen.getAllByRole('link');
    expect(links.map((link) => link.getAttribute('href'))).toEqual(
      // next/link drops the trailing slash in tests; the export adds it back.
      projects.map((p) => `/portfolio/${p.slug}`),
    );
  });
});

describe('ProjectList: old /portfolio/#game links', () => {
  beforeEach(() => {
    replace.mockClear();
  });

  afterEach(() => {
    window.location.hash = '';
  });

  it('sends #dragons to the Dragons page', () => {
    window.location.hash = '#dragons';
    render(<ProjectList projects={projects} />);

    expect(replace).toHaveBeenCalledWith(
      '/portfolio/dragons-legends-of-the-nine-realms/',
    );
  });

  it('stays put without a hash', () => {
    render(<ProjectList projects={projects} />);

    expect(replace).not.toHaveBeenCalled();
  });

  it('ignores a hash that names no game', () => {
    window.location.hash = '#nope';
    render(<ProjectList projects={projects} />);

    expect(replace).not.toHaveBeenCalled();
  });
});
