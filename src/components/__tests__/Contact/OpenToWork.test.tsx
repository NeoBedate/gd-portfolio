import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import openToWork from '@/data/openToWork';

import OpenToWork from '../../Contact/OpenToWork';

describe('OpenToWork', () => {
  it('lists every detail under its label', () => {
    render(<OpenToWork />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Open to work' }),
    ).toBeInTheDocument();

    const terms = screen.getAllByRole('term');
    const values = screen.getAllByRole('definition');
    expect(terms).toHaveLength(openToWork.details.length);

    openToWork.details.forEach((detail, index) => {
      expect(terms[index]).toHaveTextContent(detail.label);
      expect(values[index]).toHaveTextContent(detail.value);
    });
  });

  it('covers what recruiters ask first', () => {
    const labels = openToWork.details.map((d) => d.label);

    expect(labels).toEqual(
      expect.arrayContaining(['Roles', 'Based in', 'Languages', 'Available']),
    );
  });
});
