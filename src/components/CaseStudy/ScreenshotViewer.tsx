'use client';

import { useState } from 'react';

import { LeftChevron, PlayChevron, RightChevron } from '@/components/Icons';
import { t } from '@/data/i18n/ui';
import { useLang } from '@/hooks/useLang';

interface ScreenshotViewerProps {
  name: string;
  images: string[];
  alts?: string[];
  /** A YouTube embed URL. It loads only when the visitor presses play. */
  trailer?: string;
}

/** The embed URL with autoplay on, so one press starts the trailer. */
function autoplayUrl(src: string): string {
  const url = new URL(src);
  url.searchParams.set('autoplay', '1');
  return url.toString();
}

/**
 * The project's screenshots, one at a time, with the trailer behind a play
 * button on the first one (usually the logo). The YouTube player loads only
 * on demand, and stepping to another screenshot stops it.
 */
export default function ScreenshotViewer({
  name,
  images,
  alts,
  trailer,
}: ScreenshotViewerProps) {
  const text = t(useLang()).portfolio;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  if (images.length === 0) return null;

  const step = (direction: number) => {
    setPlaying(false);
    setIndex(
      (current) => (current + direction + images.length) % images.length,
    );
  };

  return (
    <div className="game-detail-screenshots">
      <section className="game-detail-main" aria-label={text.screenshots}>
        {playing && trailer ? (
          <iframe
            className="game-detail-video"
            src={autoplayUrl(trailer)}
            title={`${text.trailer}: ${name}`}
            width={560}
            height={315}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          // biome-ignore lint/performance/noImgElement: static export, images are pre-optimized WebP
          <img
            src={images[index]}
            alt={alts?.[index] ?? ''}
            width={1280}
            height={720}
            decoding="async"
          />
        )}

        {images.length > 1 && (
          <div className="game-detail-img-nav">
            <button
              type="button"
              className="game-detail-img-btn"
              onClick={() => step(-1)}
              aria-label={text.previousScreenshot}
            >
              <LeftChevron />
            </button>
            <button
              type="button"
              className="game-detail-img-btn"
              onClick={() => step(1)}
              aria-label={text.nextScreenshot}
            >
              <RightChevron />
            </button>
          </div>
        )}

        {trailer && index === 0 && !playing && (
          <button
            type="button"
            className="game-detail-play-btn"
            onClick={() => setPlaying(true)}
            aria-label={text.playTrailer}
          >
            <span className="game-detail-play-btn-icon">
              <PlayChevron />
            </span>
          </button>
        )}

        <p className="sr-only" aria-live="polite">
          {index + 1} / {images.length}
        </p>
      </section>
    </div>
  );
}
