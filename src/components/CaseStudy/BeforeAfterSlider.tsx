'use client';

import { type CSSProperties, useState } from 'react';

import { t } from '@/data/i18n/ui';
import type { Comparison } from '@/data/projects';
import { useLang } from '@/hooks/useLang';

interface BeforeAfterSliderProps {
  comparison: Comparison;
}

/**
 * The same view at two stages, one over the other: the "before" image is
 * clipped at a divider the visitor drags. A transparent range input covers
 * the frame, so a drag anywhere moves the divider, and the arrow keys,
 * Home and End work as on any slider.
 */
export default function BeforeAfterSlider({
  comparison,
}: BeforeAfterSliderProps) {
  const text = t(useLang()).portfolio;
  const [position, setPosition] = useState(50);
  const {
    before,
    after,
    beforeLabel,
    afterLabel,
    beforeAlt,
    afterAlt,
    caption,
    width,
    height,
  } = comparison;

  const frameStyle = {
    '--before-after-position': `${position}%`,
    aspectRatio: `${width} / ${height}`,
  } as CSSProperties;

  return (
    <figure className="before-after">
      <div className="before-after-frame" style={frameStyle}>
        {/* biome-ignore lint/performance/noImgElement: static export, images are pre-optimized WebP */}
        <img
          className="before-after-image"
          src={after}
          alt={afterAlt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
        />
        {/* biome-ignore lint/performance/noImgElement: static export, images are pre-optimized WebP */}
        <img
          className="before-after-image before-after-image--before"
          src={before}
          alt={beforeAlt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
        />
        <span
          className="before-after-label before-after-label--before"
          aria-hidden="true"
        >
          {beforeLabel}
        </span>
        <span
          className="before-after-label before-after-label--after"
          aria-hidden="true"
        >
          {afterLabel}
        </span>
        <span className="before-after-divider" aria-hidden="true" />
        <input
          className="before-after-range"
          type="range"
          min={0}
          max={100}
          step={1}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label={`${text.compare}: ${beforeLabel} / ${afterLabel}`}
          aria-valuetext={`${position}% ${beforeLabel}, ${100 - position}% ${afterLabel}`}
        />
      </div>
      <figcaption className="game-detail-section-caption">{caption}</figcaption>
    </figure>
  );
}
