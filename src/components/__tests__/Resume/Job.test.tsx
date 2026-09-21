import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Job from '../../Resume/Experience/Job';

describe('Job', () => {
  const mockJob = {
    compLogo: '',
    name: 'Acme Corp',
    url: 'https://acme.com',
    startDate: '2011-02-15',
    endDate: '2025-06-30',
    summary: 'Supreme Designer',
    projects: [
      {
        projectName: 'Teenage Mutant Ninja Turtles: Mutants Unleashed',
        projectPosition: 'Lead Level Designer',
        projectHighlights: [
          'Lead a team of 4 level designers and a scale-up in production workflows to produce 40 levels.',
          'Assumed authorship of 30% of the game levels, plus direct supervision over the rest.',
          'Developed a documentation system to increase feedback quality between internal and external clients, and the Level Design team.',
          'Supported Production and QA through a successful Jira implementation of our Production schedule and level creation pipeline.',
        ],
      },
    ],
  };

  it('renders company name with link', () => {
    render(<Job data={mockJob} />);

    const link = screen.getByRole('link', { name: /acme corp/i });
    expect(link).toHaveAttribute('href', 'https://acme.com');
  });

  it('renders position title', () => {
    render(<Job data={mockJob} />);

    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(
      'Senior Engineer',
    );
  });

  it('formats date range correctly', () => {
    render(<Job data={mockJob} />);

    expect(screen.getByText(/january 2020/i)).toBeInTheDocument();
    expect(screen.getByText(/june 2023/i)).toBeInTheDocument();
  });

  it('shows Present for current job (no end date)', () => {
    const currentJob = {
      ...mockJob,
      endDate: undefined,
    };

    // Missing a 'currentJob' in the code. Looks like this was made for the next
    // version of the page. Maybe I can get back to it in the future.
    render(<Job data={currentJob} />);

    expect(screen.getByText(/present/i)).toBeInTheDocument();
  });

  it('renders summary with markdown', () => {
    render(<Job data={mockJob} />);

    // Summary text should be present
    expect(screen.getByText(/led development of/i)).toBeInTheDocument();
  });

  it('renders highlights as list items', () => {
    render(<Job data={mockJob} />);

    expect(screen.getByText('Shipped feature X')).toBeInTheDocument();
    expect(screen.getByText('Improved performance by 50%')).toBeInTheDocument();

    const listItems = document.querySelectorAll('.points li');
    expect(listItems.length).toBe(2);
  });

  it('handles missing summary gracefully', () => {
    const jobWithoutSummary = {
      ...mockJob,
      summary: undefined,
    };

    // Same as in line 56.
    render(<Job data={jobWithoutSummary} />);

    // Should not crash, highlights should still render
    expect(screen.getByText('Shipped feature X')).toBeInTheDocument();
  });

  it('handles missing highlights gracefully', () => {
    const jobWithoutHighlights = {
      ...mockJob,
      highlights: undefined,
    };

    render(<Job data={jobWithoutHighlights} />);

    // Should not crash, summary should still render
    expect(screen.getByText(/led development/i)).toBeInTheDocument();

    const list = document.querySelector('.points');
    expect(list).not.toBeInTheDocument();
  });

  it('renders as article element', () => {
    render(<Job data={mockJob} />);

    const article = document.querySelector('article.jobs-container');
    expect(article).toBeInTheDocument();
  });
});
