import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Cell from '../../Projects/Cell';

describe('Cell', () => {
  const mockProject = {
    id:'xx_test',
    url: 'https://www.coolcompany.com',
    coverImage:'/images/test.jpg',
    publishingDate:'2026',
    name:'Test Project',
    position:'Test Position',
    summary:'Test summary for a game',
    highlights:['Test Array of Highlights'],
  };

  it('renders project as a clickable card with link', () => {
    render(<Cell data={mockProject} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', mockProject.url);
    expect(link).toHaveClass('project-card-link');
  });

  it('renders project description', () => {
    render(<Cell data={mockProject} />);
    expect(screen.getByText(mockProject.summary)).toBeInTheDocument();
  });

  it('renders project date in correct format', () => {
    render(<Cell data={mockProject} />);
    expect(screen.getByText(mockProject.publishingDate)).toBeInTheDocument();
  });

  it('renders project image with alt text', () => {
    render(<Cell data={mockProject} />);
    const image = screen.getByAltText(mockProject.name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('test.jpg'));
  });
});
