import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Job from '../../Resume/Experience';

const mockJobs = [
  {
    compLogo: '',
    name: 'Acme Corp',
    url: 'https://acme.com',
    startDate: '2020-01-01',
    endDate: '2023-06-30',
    summary: 'Led engineering team.',
    projects: [
      {
        projectName: 'Built features',
        projectPosition: 'tacatacat',
        projectHighlights: ['patatati'],
      },
      {
        projectName: 'Built features',
        projectPosition: 'tacatacat',
        projectHighlights: ['patatati'],
      },
    ],
  },
];

describe('Experience', () => {
  it('renders the experience section with title', () => {
    render(<Job data={mockJobs} />);

    expect(
      screen.getByRole('heading', { name: /experience/i }),
    ).toBeInTheDocument();
  });

  it('renders all jobs', () => {
    render(<Job data={mockJobs} />);

    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.getByText('Startup Inc')).toBeInTheDocument();
  });

  it('renders job positions', () => {
    render(<Job data={mockJobs} />);

    expect(screen.getByText(/Senior Engineer/)).toBeInTheDocument();
    expect(screen.getByText(/Software Engineer/)).toBeInTheDocument();
  });

  it('has anchor link for navigation', () => {
    render(<Job data={mockJobs} />);

    const anchor = document.getElementById('experience');
    expect(anchor).toBeInTheDocument();
  });

  it('renders jobs with company links', () => {
    render(<Job data={mockJobs} />);

    const links = screen.getAllByRole('link');
    expect(
      links.some((l) => l.getAttribute('href') === 'https://acme.com'),
    ).toBe(true);
    expect(
      links.some((l) => l.getAttribute('href') === 'https://startup.com'),
    ).toBe(true);
  });

  it('handles empty jobs array', () => {
    render(<Job data={[]} />);

    expect(
      screen.getByRole('heading', { name: /experience/i }),
    ).toBeInTheDocument();
    // No job articles
    const articles = document.querySelectorAll('.jobs-container');
    expect(articles.length).toBe(0);
  });
});
