import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { analyticsEvents } from '@/data/analytics';
import { cvDownloadsFor } from '@/data/cv';
import { LANGS } from '@/lib/i18n';

import ContactIcons from '../../Contact/ContactIcons';
import CvLinks from '../../Template/CvLinks';
import TrackedLink from '../../Template/TrackedLink';

describe('TrackedLink', () => {
  const track = vi.fn();

  beforeEach(() => {
    window.umami = { track };
  });

  afterEach(() => {
    track.mockReset();
    delete window.umami;
  });

  it('reports the click with its event data', () => {
    render(
      <TrackedLink
        href="/cv/test.pdf"
        download
        event={analyticsEvents.cvDownload}
        eventData={{ cv: 'Level Design', from: 'hero' }}
      >
        CV
      </TrackedLink>,
    );

    fireEvent.click(screen.getByRole('link', { name: 'CV' }));

    expect(track).toHaveBeenCalledWith('CV download', {
      cv: 'Level Design',
      from: 'hero',
    });
  });

  it('leaves the link alone, so a CV still downloads', () => {
    render(
      <TrackedLink
        href="/cv/test.pdf"
        download
        event={analyticsEvents.cvDownload}
      >
        CV
      </TrackedLink>,
    );

    const link = screen.getByRole('link', { name: 'CV' });
    const click = new MouseEvent('click', { bubbles: true, cancelable: true });
    link.dispatchEvent(click);

    expect(click.defaultPrevented).toBe(false);
    expect(link).toHaveAttribute('href', '/cv/test.pdf');
    expect(link).toHaveAttribute('download');
  });

  it('still works when the Umami script is not loaded', () => {
    delete window.umami;
    render(
      <TrackedLink href="/x" event={analyticsEvents.email}>
        Mail
      </TrackedLink>,
    );

    expect(() =>
      fireEvent.click(screen.getByRole('link', { name: 'Mail' })),
    ).not.toThrow();
  });

  it.each(
    LANGS,
  )('counts each CV download with its version, language and place (%s)', (lang) => {
    render(<CvLinks from="footer" lang={lang} />);

    for (const cv of cvDownloadsFor(lang)) {
      fireEvent.click(screen.getByRole('link', { name: cv.label }));
      expect(track).toHaveBeenLastCalledWith('CV download', {
        cv: cv.label,
        lang,
        from: 'footer',
      });
    }
  });

  it('counts LinkedIn and email clicks from the footer icons, not GitHub', () => {
    render(<ContactIcons />);

    fireEvent.click(screen.getByRole('link', { name: 'LinkedIn' }));
    expect(track).toHaveBeenLastCalledWith('LinkedIn', { from: 'footer' });

    fireEvent.click(screen.getByRole('link', { name: 'Email' }));
    expect(track).toHaveBeenLastCalledWith('Email', { from: 'footer' });

    track.mockClear();
    fireEvent.click(screen.getByRole('link', { name: 'Github' }));
    expect(track).not.toHaveBeenCalled();
  });
});
