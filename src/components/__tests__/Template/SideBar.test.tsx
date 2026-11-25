import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import profile from '@/data/profile.json';

import SideBar from '../../Template/SideBar';

const mockPathname = vi.fn();
vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
}));

describe('SideBar', () => {
  beforeEach(() => {
    mockPathname.mockReturnValue('/');
  });

  it('renders the sidebar section', () => {
    render(<SideBar />);

    const sidebar = document.querySelector('.site-sidebar');
    expect(sidebar).toBeInTheDocument();
  });

  it('displays the name', () => {
    render(<SideBar />);

    expect(
      screen.getByRole('heading', { name: profile.name }),
    ).toBeInTheDocument();
  });

  it('displays email link', () => {
    render(<SideBar />);

    const emailLink = screen.getByRole('link', { name: profile.email });
    expect(emailLink).toHaveAttribute('href', `mailto:${profile.email}`);
  });

  it('renders about section with bio', () => {
    render(<SideBar />);

    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByText(/Game Designer/)).toBeInTheDocument();
  });

  it('shows Learn More button when not on experience page', () => {
    mockPathname.mockReturnValue('/about');
    render(<SideBar />);

    expect(screen.getByRole('link', { name: /learn more/i })).toHaveAttribute(
      'href',
      '/experience',
    );
  });

  it('shows About Me button when on experience page', () => {
    mockPathname.mockReturnValue('/experience');
    render(<SideBar />);

    expect(screen.getByRole('link', { name: /about me/i })).toHaveAttribute(
      'href',
      '/about',
    );
  });

  it('renders contact icons', () => {
    render(<SideBar />);

    const footer = document.querySelector('.site-footer');
    expect(footer).toBeInTheDocument();
  });

  it('renders copyright notice', () => {
    render(<SideBar />);

    const copyright = document.querySelector('.copyright');
    expect(copyright).toHaveTextContent(`© ${profile.name}`);
  });

  it('has logo link to home', () => {
    render(<SideBar />);

    const logoLink = document.querySelector('.logo');
    expect(logoLink).toHaveAttribute('href', '/');
  });
});
