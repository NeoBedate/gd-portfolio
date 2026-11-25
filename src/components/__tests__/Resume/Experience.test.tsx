import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import companies from '@/data/companies';
import work from '@/data/experience/work';
import profile from '@/data/profile.json';

import Resume from '../../Experience/Resume';

// Resume looks companies and projects up by id in the real data files, so
// these tests render the real work history rather than mocks.
describe('Resume', () => {
  it('renders the section with its title', () => {
    render(<Resume data={work} />);

    expect(
      screen.getByRole('heading', { name: /resume/i, level: 2 }),
    ).toBeInTheDocument();
  });

  it('renders one entry per company', () => {
    render(<Resume data={work} />);

    expect(document.querySelectorAll('.resume-container')).toHaveLength(
      work.length,
    );
  });

  it('renders every company in the work history', () => {
    render(<Resume data={work} />);

    // Not every company has a url, so match the name text rather than a link.
    const names = [...document.querySelectorAll('.resume-compName')].map((el) =>
      el.textContent?.trim(),
    );
    for (const job of work) {
      const company = companies.find((c) => c.id === job.companyId);
      expect(names).toContain(company?.name);
    }
  });

  it('has anchor link for navigation', () => {
    render(<Resume data={work} />);

    expect(document.getElementById('resume')).toBeInTheDocument();
  });

  it('links to the MobyGames credits profile in a new tab', () => {
    render(<Resume data={work} />);

    const link = screen.getByRole('link', { name: /credits on mobygames/i });
    expect(link).toHaveAttribute('href', profile.creditsUrl);
    expect(link.getAttribute('href')).toMatch(
      /^https:\/\/www\.mobygames\.com\/person\/\d+\//,
    );
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('handles empty jobs array', () => {
    render(<Resume data={[]} />);

    expect(
      screen.getByRole('heading', { name: /resume/i }),
    ).toBeInTheDocument();
    expect(document.querySelectorAll('.resume-container')).toHaveLength(0);
  });
});
