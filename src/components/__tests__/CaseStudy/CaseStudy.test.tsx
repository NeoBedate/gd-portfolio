import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ScreenshotViewer from '@/components/CaseStudy/ScreenshotViewer';
import SectionGallery from '@/components/CaseStudy/SectionGallery';
import CaseStudyPage, {
  caseStudyMetadata,
  caseStudyStaticParams,
} from '@/components/Pages/CaseStudyPage';
import { caseStudyNeighbours, getCaseStudies } from '@/lib/caseStudies';

const TMNT = 'tmnt-mutants-unleashed';
const DRAGONS = 'dragons-legends-of-the-nine-realms';
const SPIRIT = 'spirit-luckys-big-adventure';

describe('case-study pages', () => {
  it('exist for the three games, at the planned URLs, in portfolio order', () => {
    expect(getCaseStudies().map((p) => p.slug)).toEqual([
      TMNT,
      DRAGONS,
      SPIRIT,
    ]);
    expect(caseStudyStaticParams()).toEqual([
      { slug: TMNT },
      { slug: DRAGONS },
      { slug: SPIRIT },
    ]);
  });

  it('chain each game to the one before and after it', () => {
    expect(caseStudyNeighbours(TMNT).previous).toBeUndefined();
    expect(caseStudyNeighbours(TMNT).next?.slug).toBe(DRAGONS);
    expect(caseStudyNeighbours(DRAGONS).previous?.slug).toBe(TMNT);
    expect(caseStudyNeighbours(DRAGONS).next?.slug).toBe(SPIRIT);
    expect(caseStudyNeighbours(SPIRIT).next).toBeUndefined();
  });

  it('give each page its own title, description and canonical URL', () => {
    const metadata = caseStudyMetadata(TMNT, 'en');

    expect(metadata.title).toBe(
      'Teenage Mutant Ninja Turtles: Mutants Unleashed · Lead Level Designer',
    );
    expect(metadata.description).toMatch(
      /^Lead Level Designer on Teenage Mutant Ninja Turtles: Mutants Unleashed\. Led a team of 4/,
    );
    expect(metadata.alternates?.canonical).toBe(
      'https://www.santibedate.com/portfolio/tmnt-mutants-unleashed/',
    );
    expect(caseStudyMetadata(TMNT, 'es').alternates?.canonical).toBe(
      'https://www.santibedate.com/es/portfolio/tmnt-mutants-unleashed/',
    );
  });
});

// next/link drops the trailing slash in tests; the export adds it back.
describe('CaseStudyPage', () => {
  it('shows the game, my role and links to the next game and the portfolio', () => {
    render(<CaseStudyPage slug={TMNT} lang="en" />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Teenage Mutant Ninja Turtles: Mutants Unleashed',
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText('Lead Level Designer').length).toBeGreaterThan(
      0,
    );

    const pager = screen.getByRole('navigation', { name: 'Other projects' });
    expect(within(pager).getAllByRole('link')).toHaveLength(1);
    expect(
      within(pager).getByRole('link', { name: /next project/i }),
    ).toHaveAttribute('href', `/portfolio/${DRAGONS}`);

    for (const link of screen.getAllByRole('link', { name: /all projects/i })) {
      expect(link).toHaveAttribute('href', '/portfolio');
    }
  });

  it('links between the Spanish pages on the Spanish site', () => {
    render(<CaseStudyPage slug={DRAGONS} lang="es" />);

    const pager = screen.getByRole('navigation', { name: 'Otros proyectos' });
    expect(
      within(pager).getByRole('link', { name: /proyecto anterior/i }),
    ).toHaveAttribute('href', `/es/portfolio/${TMNT}`);
    expect(
      within(pager).getByRole('link', { name: /proyecto siguiente/i }),
    ).toHaveAttribute('href', `/es/portfolio/${SPIRIT}`);
  });

  it('plays the Dragons developer diary with sound and controls, credited', () => {
    render(<CaseStudyPage slug={DRAGONS} lang="en" />);

    const heading = screen.getByRole('heading', { name: 'Developer diary' });
    const section = heading.closest('section') as HTMLElement;
    const video = section.querySelector('video');

    expect(video).toHaveAttribute('controls');
    expect(video).not.toHaveAttribute('muted');
    expect(video).toHaveAttribute('preload', 'none');
    expect(
      within(section).getByText(/All rights belong to their owners/),
    ).toBeInTheDocument();
  });

  it('gives every image and clip on the page alt text', () => {
    const { container } = render(<CaseStudyPage slug={TMNT} lang="en" />);

    const media = container.querySelectorAll('article img, article video');
    expect(media.length).toBeGreaterThan(0);
    for (const element of media) {
      const label =
        element.getAttribute('alt') ?? element.getAttribute('aria-label');
      expect(label, element.outerHTML).toBeTruthy();
    }
  });
});

describe('ScreenshotViewer', () => {
  const images = ['/a.webp', '/b.webp', '/c.webp'];
  const alts = ['Logo.', 'A rooftop.', 'A sewer.'];
  const trailer = 'https://www.youtube.com/embed/abc?si=x';

  it('steps through the screenshots with labelled buttons, wrapping around', () => {
    render(<ScreenshotViewer name="Game" images={images} alts={alts} />);

    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Logo.');
    fireEvent.click(screen.getByRole('button', { name: 'Next screenshot' }));
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'A rooftop.');
    fireEvent.click(
      screen.getByRole('button', { name: 'Previous screenshot' }),
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Previous screenshot' }),
    );
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'A sewer.');
  });

  it('loads the trailer only when asked, and stops it on the next screenshot', () => {
    const { container } = render(
      <ScreenshotViewer
        name="Game"
        images={images}
        alts={alts}
        trailer={trailer}
      />,
    );
    expect(container.querySelector('iframe')).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Play the trailer' }));
    const iframe = screen.getByTitle('Trailer: Game');
    expect(iframe.getAttribute('src')).toContain('autoplay=1');

    fireEvent.click(screen.getByRole('button', { name: 'Next screenshot' }));
    expect(container.querySelector('iframe')).toBeNull();
    expect(
      screen.queryByRole('button', { name: 'Play the trailer' }),
    ).toBeNull();
  });
});

describe('SectionGallery', () => {
  const pairs = [
    ['/one.webp', '/two.webp'],
    ['/three.webp', '/four.webp'],
  ];
  const alts = [
    ['One.', 'Two.'],
    ['Three.', 'Four.'],
  ];
  const captions = ['First pair.', 'Second pair.'];

  it('shows one pair and its caption at a time', () => {
    render(<SectionGallery pairs={pairs} alts={alts} captions={captions} />);

    expect(screen.getByText('First pair.')).toBeInTheDocument();
    expect(screen.getByAltText('One.')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Next images' }));
    expect(screen.getByText('Second pair.')).toBeInTheDocument();
    expect(screen.getByAltText('Four.')).toBeInTheDocument();
    expect(screen.queryByAltText('One.')).toBeNull();
  });

  it('has no arrows when there is a single pair', () => {
    render(
      <SectionGallery
        pairs={pairs.slice(0, 1)}
        alts={alts.slice(0, 1)}
        captions={captions.slice(0, 1)}
      />,
    );

    expect(screen.queryByRole('button')).toBeNull();
  });
});
