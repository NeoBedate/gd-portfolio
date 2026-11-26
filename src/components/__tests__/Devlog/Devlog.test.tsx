import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import DevlogBody from '@/components/Devlog/DevlogBody';
import DevlogEntryView from '@/components/Devlog/DevlogEntryView';
import DevlogIndexView from '@/components/Devlog/DevlogIndexView';
import DevlogList, { weekLabel } from '@/components/Devlog/DevlogList';
import type { DevlogProject } from '@/data/devlog';
import type { DevlogEntry } from '@/lib/devlog';

/**
 * next/link drops the trailing slash unless the build's `trailingSlash`
 * setting is on, which tests don't load, so accept the path either way.
 */
function expectHref(element: HTMLElement, path: string) {
  expect(element.getAttribute('href')?.replace(/\/?$/, '/')).toBe(path);
}

const project: DevlogProject = {
  id: 'ue5-level',
  name: 'UE5 personal level',
  description: 'Weekly updates.',
};

function makeEntry(week: number, overrides: Partial<DevlogEntry> = {}) {
  return {
    project: 'ue5-level',
    slug: `week-${String(week).padStart(2, '0')}`,
    week,
    title: `Week ${week} title`,
    date: `2027-01-${String(1 + week * 7).padStart(2, '0')}`,
    summary: `Summary of week ${week}.`,
    draft: false,
    content: '## What changed\n\nThe route got shorter.',
    ...overrides,
  } satisfies DevlogEntry;
}

describe('weekLabel', () => {
  it('calls week 0 the kickoff and pads the rest', () => {
    expect(weekLabel(0)).toBe('Kickoff');
    expect(weekLabel(3)).toBe('Week 03');
    expect(weekLabel(12)).toBe('Week 12');
  });
});

describe('DevlogList', () => {
  it('links each update to its page, with its week and date', () => {
    render(<DevlogList entries={[makeEntry(2), makeEntry(1)]} />);

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);

    const first = within(items[0]).getByRole('link');
    expectHref(first, '/devlog/ue5-level/week-02/');
    expect(first).toHaveTextContent('Week 02');
    expect(first).toHaveTextContent('January 15, 2027');
    expect(
      within(items[0]).getByRole('heading', { level: 2, name: 'Week 2 title' }),
    ).toBeInTheDocument();
  });

  it('marks drafts', () => {
    render(<DevlogList entries={[makeEntry(1, { draft: true })]} />);
    expect(screen.getByText('Draft')).toBeInTheDocument();
  });

  it('names the project only when asked', () => {
    const { rerender } = render(<DevlogList entries={[makeEntry(1)]} />);
    expect(screen.queryByText('UE5 personal level')).not.toBeInTheDocument();

    rerender(<DevlogList entries={[makeEntry(1)]} showProject />);
    expect(screen.getByText('UE5 personal level')).toBeInTheDocument();
  });
});

describe('DevlogBody', () => {
  it('plays an .mp4 as a looping clip with its poster, and links to it', () => {
    const { container } = render(
      <DevlogBody markdown='![Route blockout](/images/devlog/ue5-level/route.mp4 "First pass")' />,
    );

    const video = container.querySelector('video');
    expect(video).toHaveAttribute('src', '/images/devlog/ue5-level/route.mp4');
    expect(video).toHaveAttribute(
      'poster',
      '/images/devlog/ue5-level/route-poster.webp',
    );
    expect(video).toHaveAttribute('aria-label', 'Route blockout');
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/images/devlog/ue5-level/route.mp4',
    );
    expect(screen.getByText('First pass')).toBeInTheDocument();
  });

  it('shows a still as an image without a caption when none is given', () => {
    const { container } = render(
      <DevlogBody markdown="![Top-down map](/images/devlog/ue5-level/map.webp)" />,
    );

    expect(
      screen.getByRole('img', { name: 'Top-down map' }),
    ).toBeInTheDocument();
    expect(container.querySelector('.devlog-media-caption')).toBeNull();
  });

  // Prettier rewrites Markdown titles to single quotes, as in the template.
  it('reads a single-quoted caption too', () => {
    render(
      <DevlogBody markdown="![Map](/images/devlog/ue5-level/map.webp 'Before')" />,
    );
    expect(screen.getByText('Before')).toBeInTheDocument();
  });

  it('never nests a block element inside a paragraph', () => {
    const { container } = render(
      <DevlogBody markdown="![Map](/images/devlog/ue5-level/map.webp)" />,
    );
    expect(container.querySelector('p div, p figure')).toBeNull();
  });
});

describe('DevlogEntryView', () => {
  it('shows the update with its project, week, date and hours', () => {
    render(
      <DevlogEntryView
        project={project}
        entry={makeEntry(1, { hours: 12 })}
        previous={null}
        next={null}
      />,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: 'Week 1 title' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Week 01')).toBeInTheDocument();
    expect(screen.getByText('January 8, 2027')).toBeInTheDocument();
    expect(screen.getByText('12 hours this week')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'What changed' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('navigation', { name: 'Other updates' }),
    ).not.toBeInTheDocument();
  });

  it('links to the updates either side', () => {
    render(
      <DevlogEntryView
        project={project}
        entry={makeEntry(2)}
        previous={makeEntry(1)}
        next={makeEntry(3)}
      />,
    );

    const pager = screen.getByRole('navigation', { name: 'Other updates' });
    const [previous, next] = within(pager).getAllByRole('link');
    expectHref(previous, '/devlog/ue5-level/week-01/');
    expect(previous).toHaveAttribute('rel', 'prev');
    expectHref(next, '/devlog/ue5-level/week-03/');
    expect(next).toHaveAttribute('rel', 'next');
  });

  it('links to the case study once the project has one', () => {
    const { rerender } = render(
      <DevlogEntryView
        project={project}
        entry={makeEntry(1)}
        previous={null}
        next={null}
      />,
    );
    expect(
      screen.queryByRole('link', { name: 'Read the case study' }),
    ).not.toBeInTheDocument();

    rerender(
      <DevlogEntryView
        project={{ ...project, caseStudyPath: '/portfolio/ue5-level/' }}
        entry={makeEntry(1)}
        previous={null}
        next={null}
      />,
    );
    expectHref(
      screen.getByRole('link', { name: 'Read the case study' }),
      '/portfolio/ue5-level/',
    );
  });
});

describe('DevlogIndexView', () => {
  it('says so when nothing is published yet', () => {
    render(<DevlogIndexView groups={[]} />);
    expect(screen.getByText('No updates published yet.')).toBeInTheDocument();
  });

  it('groups updates under their project', () => {
    render(<DevlogIndexView groups={[{ project, entries: [makeEntry(1)] }]} />);
    expectHref(
      screen.getByRole('link', { name: 'UE5 personal level' }),
      '/devlog/ue5-level/',
    );
    expect(
      screen.getByRole('heading', { level: 3, name: 'Week 1 title' }),
    ).toBeInTheDocument();
  });
});
