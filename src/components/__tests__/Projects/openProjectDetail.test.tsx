import { fireEvent, render } from '@testing-library/react';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  type Mock,
  vi,
} from 'vitest';
import data from '@/data/projects';
import { openProjectDetail } from '../../Projects/openProjectDetail';
import ProjectList from '../../Projects/ProjectList';

describe('openProjectDetail', () => {
  let scrollIntoView: Mock<Element['scrollIntoView']>;
  let wrap: HTMLDivElement;

  beforeEach(() => {
    // jsdom does not implement scrolling.
    scrollIntoView = vi.fn<Element['scrollIntoView']>();
    HTMLElement.prototype.scrollIntoView = scrollIntoView;
    wrap = document.createElement('div');
    wrap.appendChild(document.createElement('div'));
    document.body.appendChild(wrap);
  });

  afterEach(() => {
    wrap.remove();
    vi.useRealTimers();
  });

  it('opens the panel and starts scrolling to its top at once', () => {
    openProjectDetail(wrap);

    expect(wrap).toHaveClass('open');
    expect(scrollIntoView).toHaveBeenCalledTimes(1);
    expect(scrollIntoView).toHaveBeenCalledWith({ block: 'start' });
  });

  it('scrolls again once the panel has finished opening', () => {
    openProjectDetail(wrap);
    fireEvent(wrap, new Event('transitionend'));

    expect(scrollIntoView).toHaveBeenCalledTimes(2);

    // Only once: the listener is removed after the panel has opened.
    fireEvent(wrap, new Event('transitionend'));
    expect(scrollIntoView).toHaveBeenCalledTimes(2);
  });

  it('ignores transitions that bubble up from inside the panel', () => {
    openProjectDetail(wrap);
    fireEvent(
      wrap.firstElementChild as Element,
      new Event('transitionend', { bubbles: true }),
    );

    expect(scrollIntoView).toHaveBeenCalledTimes(1);
  });

  it('falls back to a timer when no transition end arrives', () => {
    vi.useFakeTimers();
    openProjectDetail(wrap);
    vi.advanceTimersByTime(600);

    expect(scrollIntoView).toHaveBeenCalledTimes(2);
  });

  it('scrolls straight away when the panel is already open', () => {
    vi.useFakeTimers();
    wrap.classList.add('open');
    openProjectDetail(wrap);
    vi.advanceTimersByTime(600);

    expect(scrollIntoView).toHaveBeenCalledTimes(1);
  });

  it('scrolls to the panel from a card without a link', () => {
    const projects = data.filter((p) => p.selected);
    const unlinked = projects.find((p) => !p.url);
    expect(unlinked).toBeDefined();

    const { container } = render(<ProjectList projects={projects} />);
    const card = container.querySelector(
      `#project-card-${unlinked?.id} > div`,
    ) as HTMLElement;
    fireEvent.click(card);

    expect(container.querySelector('#game-detail-wrap')).toHaveClass('open');
    expect(scrollIntoView).toHaveBeenCalledWith({ block: 'start' });
  });
});
