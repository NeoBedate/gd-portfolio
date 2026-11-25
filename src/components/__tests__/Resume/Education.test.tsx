import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Education from '../../Experience/Education';
import Degree from '../../Experience/Education/Degree';

const mockDegrees = [
  {
    school: 'Test University',
    degree: "Master's Degree in Testing",
    degreeLink: 'https://test.edu/masters',
    uniLink: 'https://test.edu',
    year: 2020,
  },
  {
    school: 'Other College',
    degree: "Bachelor's Degree in History",
    degreeLink: 'https://other.edu/history',
    uniLink: 'https://other.edu',
    year: 2016,
  },
];

describe('Education', () => {
  it('renders the education section with title', () => {
    render(<Education data={mockDegrees} />);

    expect(
      screen.getByRole('heading', { name: /education/i }),
    ).toBeInTheDocument();
  });

  it('renders all degrees', () => {
    render(<Education data={mockDegrees} />);

    expect(screen.getByText("Master's Degree in Testing")).toBeInTheDocument();
    expect(
      screen.getByText("Bachelor's Degree in History"),
    ).toBeInTheDocument();
  });

  it('renders school links', () => {
    render(<Education data={mockDegrees} />);

    expect(
      screen.getByRole('link', { name: 'Test University' }),
    ).toHaveAttribute('href', 'https://test.edu');
    expect(screen.getByRole('link', { name: 'Other College' })).toHaveAttribute(
      'href',
      'https://other.edu',
    );
  });

  it('has anchor link for navigation', () => {
    render(<Education data={mockDegrees} />);

    expect(document.getElementById('education')).toBeInTheDocument();
  });
});

describe('Degree', () => {
  const [mockDegree] = mockDegrees;

  it('renders degree title linked to the programme page', () => {
    render(<Degree data={mockDegree} />);

    expect(
      screen.getByRole('link', { name: mockDegree.degree }),
    ).toHaveAttribute('href', mockDegree.degreeLink);
  });

  it('renders school name with link', () => {
    render(<Degree data={mockDegree} />);

    expect(
      screen.getByRole('link', { name: mockDegree.school }),
    ).toHaveAttribute('href', mockDegree.uniLink);
  });

  it('displays year', () => {
    render(<Degree data={mockDegree} />);

    expect(screen.getByText(/2020/)).toBeInTheDocument();
  });

  it('renders the degree container', () => {
    render(<Degree data={mockDegree} />);

    expect(document.querySelector('.degree-container')).toBeInTheDocument();
  });
});
