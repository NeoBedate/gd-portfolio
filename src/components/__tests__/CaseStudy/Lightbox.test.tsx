import { fireEvent, render, screen, within } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';
import CaseStudyToc from '@/components/CaseStudy/CaseStudyToc';
import {
  lightboxItems,
  tocEntries,
} from '@/components/CaseStudy/caseStudyOutline';
import {
  LightboxLink,
  LightboxProvider,
} from '@/components/CaseStudy/Lightbox';
import CaseStudyPage from '@/components/Pages/CaseStudyPage';
import { t } from '@/data/i18n/ui';
import { getCaseStudy } from '@/lib/caseStudies';

// jsdom has <dialog> but not its modal API; behave like a browser.
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.setAttribute('open', '');
  };
  HTMLDialogElement.prototype.close = function close() {
    this.removeAttribute('open');
    this.dispatchEvent(new Event('close'));
  };
});

const items = [
  { src: '/a.webp', alt: 'A rooftop.' },
  { src: '/b.webp', alt: 'A sewer.', caption: 'Second caption.' },
  { src: '/c.mp4', alt: 'A clip.', caption: 'Third caption.' },
];

function renderLightbox() {
  return render(
    <LightboxProvider items={items}>
      {items.map((item) => (
        <LightboxLink key={item.src} src={item.src}>
          {item.alt}
        </LightboxLink>
      ))}
    </LightboxProvider>,
  );
}

const dialog = () => screen.getByRole('dialog', { hidden: true });

describe('Lightbox', () => {
  it('opens on the clicked item, with its alt text and caption', () => {
    renderLightbox();
    fireEvent.click(screen.getByRole('link', { name: /A sewer/ }));

    expect(dialog()).toHaveAttribute('open');
    expect(within(dialog()).getByRole('img')).toHaveAttribute(
      'alt',
      'A sewer.',
    );
    expect(within(dialog()).getByText('Second caption.')).toBeInTheDocument();
    expect(within(dialog()).getByText('2 / 3')).toBeInTheDocument();
  });

  it('steps with the arrow keys and wraps around', () => {
    renderLightbox();
    fireEvent.click(screen.getByRole('link', { name: /A rooftop/ }));

    fireEvent.keyDown(dialog(), { key: 'ArrowLeft' });
    expect(within(dialog()).getByText('3 / 3')).toBeInTheDocument();
    expect(dialog().querySelector('video')).toHaveAttribute('src', '/c.mp4');

    fireEvent.keyDown(dialog(), { key: 'ArrowRight' });
    expect(within(dialog()).getByText('1 / 3')).toBeInTheDocument();
  });

  it('steps with a horizontal swipe, but not a vertical one', () => {
    renderLightbox();
    fireEvent.click(screen.getByRole('link', { name: /A rooftop/ }));

    fireEvent.touchStart(dialog(), {
      touches: [{ clientX: 300, clientY: 100 }],
    });
    fireEvent.touchEnd(dialog(), {
      changedTouches: [{ clientX: 120, clientY: 110 }],
    });
    expect(within(dialog()).getByText('2 / 3')).toBeInTheDocument();

    fireEvent.touchStart(dialog(), {
      touches: [{ clientX: 300, clientY: 100 }],
    });
    fireEvent.touchEnd(dialog(), {
      changedTouches: [{ clientX: 280, clientY: 400 }],
    });
    expect(within(dialog()).getByText('2 / 3')).toBeInTheDocument();
  });

  it('closes from its button, and from a click on the backdrop', () => {
    renderLightbox();
    fireEvent.click(screen.getByRole('link', { name: /A rooftop/ }));

    fireEvent.click(within(dialog()).getByRole('button', { name: 'Close' }));
    expect(dialog()).not.toHaveAttribute('open');
    expect(dialog()).toBeEmptyDOMElement();

    fireEvent.click(screen.getByRole('link', { name: /A rooftop/ }));
    fireEvent.click(dialog());
    expect(dialog()).not.toHaveAttribute('open');
  });

  it('leaves a click with a modifier key to the browser', () => {
    renderLightbox();
    fireEvent.click(screen.getByRole('link', { name: /A rooftop/ }), {
      ctrlKey: true,
    });

    expect(dialog()).not.toHaveAttribute('open');
  });

  it('is a plain link to the file outside a provider', () => {
    render(<LightboxLink src="/a.webp">A rooftop.</LightboxLink>);

    const link = screen.getByRole('link', { name: /A rooftop/ });
    expect(link).toHaveAttribute('href', '/a.webp');
    expect(link).not.toHaveAttribute('aria-haspopup');
  });
});

describe('case-study outline', () => {
  const tmnt = getCaseStudy('tmnt-mutants-unleashed');

  it('lists every image and clip on the page, captions included', () => {
    const list = lightboxItems(tmnt!);
    const sections = tmnt?.sections ?? [];
    const expected =
      (tmnt?.images?.length ?? 0) +
      sections.filter((s) => s.taskImage).length +
      sections.reduce((sum, s) => sum + s.gifs.flat().length, 0);

    expect(list).toHaveLength(expected);
    expect(list.every((item) => item.alt.trim() !== '')).toBe(true);
    expect(list.at(-1)?.caption).toBe(sections.at(-1)?.captions.at(-1));
  });

  it('links the table of contents to headings that exist', () => {
    const { container } = render(
      <CaseStudyPage slug="dragons-legends-of-the-nine-realms" lang="en" />,
    );

    const toc = screen.getByRole('navigation', { name: 'On this page' });
    const links = within(toc).getAllByRole('link');
    expect(links.length).toBeGreaterThanOrEqual(4);
    for (const link of links) {
      const id = link.getAttribute('href')?.slice(1) ?? '';
      expect(container.querySelector(`h2[id="${id}"]`), id).not.toBeNull();
    }
  });

  it('names the sections in the order they appear', () => {
    const entries = tocEntries(
      getCaseStudy('dragons-legends-of-the-nine-realms')!,
      t('en').portfolio,
    );

    expect(entries.map((entry) => entry.label)).toEqual([
      'Context and constraints',
      'Developer diary',
      'Camera work & set pieces',
      'Level Guidelines & modularization',
      'Problems, decisions, outcomes',
      'Results',
      "What I'd do differently",
    ]);
  });

  it('marks no section as current before any has been reached', () => {
    render(
      <CaseStudyToc
        entries={[
          { id: 'one', label: 'One' },
          { id: 'two', label: 'Two' },
        ]}
      />,
    );

    expect(
      screen
        .getAllByRole('link')
        .some((link) => link.hasAttribute('aria-current')),
    ).toBe(false);
  });
});
