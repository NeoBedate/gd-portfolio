'use client';

import { useState } from 'react';

import { LeftChevron, RightChevron } from '@/components/Icons';
import ProjectMedia from '@/components/Projects/ProjectMedia';
import { t } from '@/data/i18n/ui';
import { useLang } from '@/hooks/useLang';

import { LightboxLink } from './Lightbox';

interface SectionGalleryProps {
  /** Pairs of clips or stills, shown one pair at a time. */
  pairs: string[][];
  /** Alt text for each item, in the same shape as `pairs`. */
  alts?: string[][];
  /** One caption per pair. */
  captions: string[];
}

/**
 * A case-study section's media: one pair at a time with its caption, and
 * arrows that wrap around. Each item opens large in the lightbox.
 */
export default function SectionGallery({
  pairs,
  alts,
  captions,
}: SectionGalleryProps) {
  const lang = useLang();
  const text = t(lang);
  const [index, setIndex] = useState(0);

  const count = pairs.length;
  if (count === 0) return null;

  const step = (direction: number) =>
    setIndex((current) => (current + direction + count) % count);

  return (
    <figure className="game-detail-section-gallery">
      <div className="game-detail-section-gifs">
        {count > 1 && (
          <button
            type="button"
            className="game-detail-section-nav-btn"
            onClick={() => step(-1)}
            aria-label={text.portfolio.previousMedia}
          >
            <LeftChevron />
          </button>
        )}
        {pairs[index].map((src, slot) => (
          <LightboxLink src={src} key={src}>
            <ProjectMedia
              src={src}
              alt={alts?.[index]?.[slot] ?? ''}
              width={640}
              height={360}
            />
          </LightboxLink>
        ))}
        {count > 1 && (
          <button
            type="button"
            className="game-detail-section-nav-btn"
            onClick={() => step(1)}
            aria-label={text.portfolio.nextMedia}
          >
            <RightChevron />
          </button>
        )}
      </div>
      <figcaption className="game-detail-section-caption" aria-live="polite">
        {captions[index]}
      </figcaption>
    </figure>
  );
}
