import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import profile from '@/data/profile.json';

import EmailLink from '../../Contact/EmailLink';

describe('EmailLink', () => {
  it('shows the address exactly as in the profile', () => {
    render(<EmailLink />);

    expect(screen.getByRole('link')).toHaveTextContent(
      new RegExp(`^${profile.email}$`),
    );
  });

  it('links to a mailto for that address', () => {
    render(<EmailLink />);

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      `mailto:${profile.email}`,
    );
  });

  it('does not prefix a greeting to the address', () => {
    render(<EmailLink />);

    expect(screen.queryByText(/^hola/i)).not.toBeInTheDocument();
    expect(document.querySelector('.contact-email-prefix')).toBeNull();
  });
});
