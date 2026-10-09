import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Job from '../../Resume/Experience/Job';

describe('Job', () => {
  const mockJob = {
    id:{
      companyId:'xx_acme',
      projectIds:['x0_acmeProject', 'x1_acmeProject'],
    },
    projectData:[{data:{
      id: 'xx_test',
      url: 'https://www.as.com',
      coverImage: '/images/test.jpg',
      dimensions: '3D',
      genre: 'action',
      startDate: '0001-01-01',
      endDate: '2026-01-11',
      publishingDate: '2011-11-11',
      name:'Test Project',
      studio: 'Testudio',
      position:'Test Position',
     summary:'Test summary for a game',
      highlights: ['Pretty cool, huh', 'Yeah, pretty cool'],
      tech: ['Cool Engine', 'Great Processor'],
      featured: true,
      other: false,
      learning: false,
    }}],
    companyData:{
      id: 'xx_acme',
      url: 'https://www.coolcompany.com',
      logo: '/images/test.jpg',
      startDate: '2020-01-01',
      endDate: '2005-08-15',
      name: 'x0_acmeProject',
      description: 'Acme is such a cool company.',
    }
  };

  it('renders company name with link', () => {
    render(<Job id={mockJob.id} companyData={mockJob.companyData} projectData={mockJob.projectData} />);

    const link = screen.getByRole('link', { name: /acme corp/i });
    expect(link).toHaveAttribute('href', 'https://acme.com');
  });

  it('renders position title', () => {
    render(<Job id={mockJob.id} companyData={mockJob.companyData} projectData={mockJob.projectData} />);

    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(
      'Senior Engineer',
    );
  });

  it('formats date range correctly', () => {
    render(<Job id={mockJob.id} companyData={mockJob.companyData} projectData={mockJob.projectData} />);

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
    render(<Job id={mockJob.id} companyData={mockJob.companyData} projectData={mockJob.projectData} />);

    expect(screen.getByText(/present/i)).toBeInTheDocument();
  });

  it('renders summary with markdown', () => {
    render(<Job id={mockJob.id} companyData={mockJob.companyData} projectData={mockJob.projectData} />);

    // Summary text should be present
    expect(screen.getByText(/led development of/i)).toBeInTheDocument();
  });

  it('renders highlights as list items', () => {
    render(<Job id={mockJob.id} companyData={mockJob.companyData} projectData={mockJob.projectData} />);

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
    render(<Job id={mockJob.id} companyData={mockJob.companyData} projectData={mockJob.projectData} />);

    // Should not crash, highlights should still render
    expect(screen.getByText('Shipped feature X')).toBeInTheDocument();
  });

  it('handles missing highlights gracefully', () => {
    const jobWithoutHighlights = {
      ...mockJob,
      highlights: undefined,
    };

    render(<Job id={mockJob.id} companyData={mockJob.companyData} projectData={mockJob.projectData} />);

    // Should not crash, summary should still render
    expect(screen.getByText(/led development/i)).toBeInTheDocument();

    const list = document.querySelector('.points');
    expect(list).not.toBeInTheDocument();
  });

  it('renders as article element', () => {
    render(<Job id={mockJob.id} companyData={mockJob.companyData} projectData={mockJob.projectData} />);

    const article = document.querySelector('article.jobs-container');
    expect(article).toBeInTheDocument();
  });
});
