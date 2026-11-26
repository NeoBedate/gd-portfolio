'use client';

import { useEffect, useRef } from 'react';

import { isVideo, posterFor } from '@/lib/media';

// Re-exported so existing client-side and test imports keep working; server
// code should import them from '@/lib/media'.
export { isVideo, posterFor };

interface ProjectMediaProps {
  src: string;
  alt?: string;
  width: number;
  height: number;
  className?: string;
  id?: string;
}

/**
 * A still image or a muted looping clip, chosen by file extension, so data
 * can mix both in the same slot. Clips download nothing but their poster
 * until they scroll into view, and pause again when they leave it. With
 * reduced motion they never autoplay.
 */
export default function ProjectMedia({
  src,
  alt = '',
  width,
  height,
  className,
  id,
}: ProjectMediaProps) {
  if (!isVideo(src)) {
    return (
      // biome-ignore lint/performance/noImgElement: static export, images are pre-optimized WebP
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className={className}
        id={id}
      />
    );
  }

  // Keyed by src so a new clip gets a fresh element and observer.
  return (
    <LoopingVideo
      key={src}
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      id={id}
    />
  );
}

function LoopingVideo({
  src,
  alt,
  width,
  height,
  className,
  id,
}: Required<Pick<ProjectMediaProps, 'src' | 'alt' | 'width' | 'height'>> &
  Pick<ProjectMediaProps, 'className' | 'id'>) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    // Reduced motion: keep the poster. The surrounding link still opens
    // the clip in a new tab for anyone who wants to watch it.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Autoplay refused (e.g. data saver): the poster stays.
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={posterFor(src)}
      width={width}
      height={height}
      className={className}
      id={id}
      aria-label={alt || undefined}
      muted
      loop
      playsInline
      preload="none"
    />
  );
}
