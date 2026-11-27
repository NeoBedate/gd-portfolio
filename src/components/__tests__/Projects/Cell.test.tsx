import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { ProjectDetails } from '@/data/projects';

import Cell from '../../Projects/Cell';

describe('Cell', () => {
  const url = 'https://www.coolcompany.com';
  const mockProject: ProjectDetails = {
    id: 'xx_test',
    links: [{ label: 'Website', href: url, kind: 'other' }],
    coverImage: '/images/test.jpg',
    publishingDate: '2026',
    name: 'Test Project',
    overview: 'Test-Overview',
    position: 'Test Position',
    summary: 'Test summary for a game',
    highlights: ['Test Array of Highlights'],
  };

  it("links the card to the project's first link", () => {
    render(<Cell data={mockProject} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', url);
    expect(link).toHaveClass('project-card-link');
  });

  it('renders no link when the project has none', () => {
    render(<Cell data={{ ...mockProject, links: undefined }} />);
    expect(screen.queryByRole('link')).toBeNull();
  });

  it('links to a page on the site instead, when given one', () => {
    render(<Cell data={mockProject} href="/portfolio/test-project/" />);
    const link = screen.getByRole('link');
    // next/link drops the trailing slash in tests; the export adds it back
    // (trailingSlash: true).
    expect(link).toHaveAttribute('href', '/portfolio/test-project');
    expect(link).toHaveClass('project-card-link');
  });

  it('renders the project overview on the card', () => {
    render(<Cell data={mockProject} />);
    expect(screen.getByText(mockProject.overview)).toBeInTheDocument();
  });

  it('renders project date in correct format', () => {
    render(<Cell data={mockProject} />);
    expect(screen.getByText('2026')).toBeInTheDocument();
  });

  it('renders project image with alt text', () => {
    render(<Cell data={mockProject} />);
    const image = screen.getByAltText(mockProject.name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('test.jpg'));
  });
});
