import { act, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import data from '@/data/projects';

import ProjectList from '../../Projects/ProjectList';
import { portfolioHref, projectSlug } from '../../Projects/projectSlug';

describe('projectSlug', () => {
  it('drops the sort prefix from a project id', () => {
    expect(projectSlug('12_tmnt')).toBe('tmnt');
    expect(projectSlug('11_dragons')).toBe('dragons');
  });

  it('builds a portfolio link that opens the project', () => {
    expect(portfolioHref('10_spirit')).toBe('/portfolio#spirit');
  });

  it('gives every project its own slug', () => {
    const slugs = data.map((p) => projectSlug(p.id));

    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe('ProjectList deep links', () => {
  const projects = data.filter((p) => p.selected);

  /** The hash is read a frame after mount, once route-change scrolling is done. */
  const nextFrame = () =>
    act(
      () =>
        new Promise<void>((resolve) => {
          window.requestAnimationFrame(() => resolve());
        }),
    );

  beforeEach(() => {
    // jsdom does not implement scrolling.
    HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  afterEach(() => {
    window.location.hash = '';
  });

  it('opens the game named in the URL hash', async () => {
    window.location.hash = '#dragons';

    const { container } = render(<ProjectList projects={projects} />);
    await nextFrame();

    expect(container.querySelector('#game-detail-wrap')).toHaveClass('open');
    expect(container.querySelector('#game-detail-title')).toHaveTextContent(
      /dragons/i,
    );
    expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it('switches game when the hash changes on the same page', async () => {
    window.location.hash = '#dragons';
    const { container } = render(<ProjectList projects={projects} />);
    await nextFrame();

    await act(async () => {
      window.location.hash = '#spirit';
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });

    expect(container.querySelector('#game-detail-title')).toHaveTextContent(
      /spirit/i,
    );
  });

  it('stays closed without a hash', async () => {
    const { container } = render(<ProjectList projects={projects} />);
    await nextFrame();

    expect(container.querySelector('#game-detail-wrap')).not.toHaveClass(
      'open',
    );
  });

  it('ignores a hash that names no project', async () => {
    window.location.hash = '#nope';

    const { container } = render(<ProjectList projects={projects} />);
    await nextFrame();

    expect(container.querySelector('#game-detail-wrap')).not.toHaveClass(
      'open',
    );
  });
});
