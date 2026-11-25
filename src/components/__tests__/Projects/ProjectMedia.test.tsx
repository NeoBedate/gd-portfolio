import { render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import ProjectMedia, { isVideo, posterFor } from '../../Projects/ProjectMedia';

type ObserverCallback = (entries: { isIntersecting: boolean }[]) => void;

describe('ProjectMedia', () => {
  let observerCallback: ObserverCallback | undefined;
  let observersCreated = 0;
  let reducedMotion = false;

  beforeEach(() => {
    observerCallback = undefined;
    observersCreated = 0;
    reducedMotion = false;
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(callback: ObserverCallback) {
          observerCallback = callback;
          observersCreated += 1;
        }
        observe() {}
        disconnect() {}
      },
    );
    vi.stubGlobal('matchMedia', () => ({ matches: reducedMotion }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('tells clips from stills by extension', () => {
    expect(isVideo('/images/a/clip.mp4')).toBe(true);
    expect(isVideo('/images/a/still.webp')).toBe(false);
    expect(posterFor('/images/a/clip.mp4')).toBe('/images/a/clip-poster.webp');
  });

  it('renders stills as lazy images', () => {
    const { container } = render(
      <ProjectMedia src="/images/a/still.webp" width={640} height={360} />,
    );
    const img = container.querySelector('img');

    expect(img).toHaveAttribute('src', '/images/a/still.webp');
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(container.querySelector('video')).toBeNull();
  });

  it('renders clips as muted looping videos that load nothing up front', () => {
    const { container } = render(
      <ProjectMedia src="/images/a/clip.mp4" width={640} height={360} />,
    );
    const video = container.querySelector('video') as HTMLVideoElement;

    expect(video).toHaveAttribute('src', '/images/a/clip.mp4');
    expect(video).toHaveAttribute('poster', '/images/a/clip-poster.webp');
    expect(video).toHaveAttribute('preload', 'none');
    expect(video).toHaveAttribute('loop');
    expect(video).toHaveAttribute('playsinline');
    expect(video.muted).toBe(true);
    expect(video).not.toHaveAttribute('autoplay');
  });

  it('plays a clip only while it is on screen', () => {
    const play = vi
      .spyOn(HTMLMediaElement.prototype, 'play')
      .mockResolvedValue(undefined);
    const pause = vi
      .spyOn(HTMLMediaElement.prototype, 'pause')
      .mockImplementation(() => {});
    render(<ProjectMedia src="/images/a/clip.mp4" width={640} height={360} />);

    observerCallback?.([{ isIntersecting: true }]);
    expect(play).toHaveBeenCalledTimes(1);

    observerCallback?.([{ isIntersecting: false }]);
    expect(pause).toHaveBeenCalledTimes(1);
  });

  it('never autoplays when the visitor prefers reduced motion', () => {
    reducedMotion = true;
    render(<ProjectMedia src="/images/a/clip.mp4" width={640} height={360} />);

    expect(observersCreated).toBe(0);
  });
});
