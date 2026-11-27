import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import BeforeAfterSlider from '@/components/CaseStudy/BeforeAfterSlider';
import CaseStudyPage from '@/components/Pages/CaseStudyPage';

const comparison = {
  before: '/before.webp',
  after: '/after.webp',
  beforeLabel: 'Blockout',
  afterLabel: 'Final',
  beforeAlt: 'The blockout.',
  afterAlt: 'The final art.',
  caption: 'Blockout and final.',
  width: 1600,
  height: 900,
};

describe('BeforeAfterSlider', () => {
  it('shows both images, labelled, with the divider in the middle', () => {
    const { container } = render(<BeforeAfterSlider comparison={comparison} />);

    expect(screen.getByAltText('The blockout.')).toBeInTheDocument();
    expect(screen.getByAltText('The final art.')).toBeInTheDocument();
    expect(screen.getByText('Blockout and final.')).toBeInTheDocument();

    const slider = screen.getByRole('slider', {
      name: 'Compare: Blockout / Final',
    });
    expect(slider).toHaveValue('50');
    const frame = container.querySelector<HTMLElement>('.before-after-frame');
    expect(frame?.style.getPropertyValue('--before-after-position')).toBe(
      '50%',
    );
    expect(frame?.style.aspectRatio).toBe('1600 / 900');
  });

  it('moves the divider and says how much of each image shows', () => {
    const { container } = render(<BeforeAfterSlider comparison={comparison} />);

    fireEvent.change(screen.getByRole('slider'), { target: { value: '20' } });

    expect(screen.getByRole('slider')).toHaveAttribute(
      'aria-valuetext',
      '20% Blockout, 80% Final',
    );
    const frame = container.querySelector<HTMLElement>('.before-after-frame');
    expect(frame?.style.getPropertyValue('--before-after-position')).toBe(
      '20%',
    );
  });

  it('appears on the TMNT page, in Spanish on the Spanish page', () => {
    const { unmount } = render(
      <CaseStudyPage slug="tmnt-mutants-unleashed" lang="en" />,
    );
    expect(
      screen.getByRole('slider', { name: 'Compare: Blockout / Proposal' }),
    ).toBeInTheDocument();
    unmount();

    // The labels come from the Spanish data. "Compare" itself follows the
    // URL (useLang), which the test setup fixes at "/".
    render(<CaseStudyPage slug="tmnt-mutants-unleashed" lang="es" />);
    expect(
      screen.getByRole('slider', { name: /Blockout \/ Propuesta$/ }),
    ).toBeInTheDocument();
    expect(screen.getByAltText(/^La misma vista/)).toHaveAttribute(
      'src',
      '/images/projects/12_tmnt/bk-02-proposal-aligned.webp',
    );
  });
});
