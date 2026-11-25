import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { CompanyDetails } from '@/data/companies';
import type { ProjectDetails } from '@/data/projects';

import Job from '../../Experience/Resume/Job';

const project: ProjectDetails = {
  id: 'xx_test',
  coverImage: '/images/test.jpg',
  name: 'Test Project',
  overview: 'Testview',
  position: 'Test Position',
  highlights: ['Pretty cool, huh', 'Yeah, pretty cool'],
};

const company: CompanyDetails = {
  id: 'xx_acme',
  url: 'https://www.coolcompany.com',
  logo: '/images/test.jpg',
  startDate: '2020-01-15',
  endDate: '2023-06-15',
  name: 'Acme Studio',
  description: 'Acme is such a **cool** company.',
};

function renderJob(
  overrides: {
    company?: Partial<CompanyDetails>;
    project?: Partial<ProjectDetails>;
  } = {},
) {
  return render(
    <Job
      id={{ companyId: company.id, projectIds: [project.id] }}
      companyData={{ ...company, ...overrides.company }}
      projectData={[{ data: { ...project, ...overrides.project } }]}
    />,
  );
}

describe('Job', () => {
  it('renders company name with link', () => {
    renderJob();

    const link = screen.getByRole('link', { name: /acme studio/i });
    expect(link).toHaveAttribute('href', company.url);
  });

  it('renders the position and project name', () => {
    renderJob();

    expect(screen.getByText('Test Position')).toBeInTheDocument();
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('formats date range correctly', () => {
    renderJob();

    expect(screen.getByText(/january 2020 - june 2023/i)).toBeInTheDocument();
  });

  it('shows Present when the company has no end date', () => {
    renderJob({ company: { endDate: '' } });

    expect(screen.getByText(/present/i)).toBeInTheDocument();
  });

  it('shows Present for an ongoing role with no end date', () => {
    renderJob({ company: { endDate: undefined } });

    expect(screen.getByText(/january 2020 - present/i)).toBeInTheDocument();
  });

  it('renders the company logo when there is one', () => {
    const { container } = renderJob();

    expect(container.querySelector('.resume-compLogo img')).toHaveAttribute(
      'src',
      company.logo,
    );
  });

  it('renders no empty logo for a role without one', () => {
    const { container } = renderJob({ company: { logo: undefined } });

    expect(container.querySelector('.resume-compLogo')).toBeNull();
    expect(container.querySelector('img')).toBeNull();
  });

  it('renders the company description as markdown', () => {
    renderJob();

    expect(screen.getByText('cool').tagName).toBe('STRONG');
  });

  it('renders project highlights as list items', () => {
    renderJob();

    expect(screen.getByText('Pretty cool, huh')).toBeInTheDocument();
    expect(screen.getByText('Yeah, pretty cool')).toBeInTheDocument();
  });

  it('handles a missing description gracefully', () => {
    renderJob({ company: { description: '' } });

    expect(document.querySelector('.resume-summary')).not.toBeInTheDocument();
    expect(screen.getByText('Pretty cool, huh')).toBeInTheDocument();
  });

  it('renders the resume container', () => {
    renderJob();

    expect(document.querySelector('.resume-container')).toBeInTheDocument();
  });
});
