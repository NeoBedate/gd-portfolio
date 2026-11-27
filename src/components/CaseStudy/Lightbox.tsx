'use client';

import {
  createContext,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  type TouchEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { CloseChevron, LeftChevron, RightChevron } from '@/components/Icons';
import { t } from '@/data/i18n/ui';
import { useLang } from '@/hooks/useLang';
import { isVideo, posterFor } from '@/lib/media';

import type { LightboxItem } from './caseStudyOutline';

/** Opens the lightbox on the item with this src. */
type OpenLightbox = (src: string) => void;

const LightboxContext = createContext<OpenLightbox | null>(null);

/** A horizontal swipe longer than this (in px) steps to the next item. */
const SWIPE_DISTANCE = 50;

interface LightboxProviderProps {
  /** Every item on the page, in order; the arrows step through all of them. */
  items: LightboxItem[];
  children: ReactNode;
}

/**
 * A full-screen view of the page's screenshots, images and clips, in a
 * native modal <dialog>: it traps focus, closes on Esc, and hands focus
 * back to the link that opened it. The arrow keys and a horizontal swipe
 * step through every item on the page; a click outside the media closes it.
 */
export function LightboxProvider({ items, children }: LightboxProviderProps) {
  const text = t(useLang()).portfolio;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = useCallback<OpenLightbox>(
    (src) => {
      const found = items.findIndex((item) => item.src === src);
      if (found !== -1) setIndex(found);
    },
    [items],
  );

  // `close()` fires the dialog's close event, which clears the index.
  const close = () => {
    const dialog = dialogRef.current;
    if (dialog && typeof dialog.close === 'function') dialog.close();
    else setIndex(null);
  };

  const step = (direction: number) =>
    setIndex((current) =>
      current === null
        ? current
        : (current + direction + items.length) % items.length,
    );

  // Show the dialog once there's something in it, and stop the page behind
  // it from scrolling while it's open.
  const isOpen = index !== null;
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog || dialog.open) return;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => {
      root.style.overflow = previous;
    };
  }, [isOpen]);

  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'ArrowRight') step(1);
    else if (event.key === 'ArrowLeft') step(-1);
    else return;
    event.preventDefault();
  };

  const onTouchStart = (event: TouchEvent<HTMLDialogElement>) => {
    const touch = event.touches[0];
    touchStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
  };

  const onTouchEnd = (event: TouchEvent<HTMLDialogElement>) => {
    const start = touchStart.current;
    const touch = event.changedTouches[0];
    touchStart.current = null;
    if (!start || !touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) > SWIPE_DISTANCE && Math.abs(dx) > Math.abs(dy)) {
      step(dx < 0 ? 1 : -1);
    }
  };

  // The dialog fills the screen; a click on it, not on its contents, is a
  // click on the backdrop.
  const onClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) close();
  };

  const item = index === null ? undefined : items[index];

  return (
    <LightboxContext.Provider value={open}>
      {children}
      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={text.lightbox}
        onClose={() => setIndex(null)}
        onKeyDown={onKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={onClick}
      >
        {item && index !== null && (
          <>
            <button
              type="button"
              className="lightbox-close"
              onClick={close}
              aria-label={text.closeLightbox}
            >
              <CloseChevron />
            </button>
            <figure className="lightbox-figure">
              <LightboxMedia item={item} />
              <figcaption className="lightbox-caption">
                {item.caption && <span>{item.caption}</span>}
                <span className="lightbox-counter">
                  {index + 1} / {items.length}
                </span>
              </figcaption>
            </figure>
            {items.length > 1 && (
              <>
                <button
                  type="button"
                  className="lightbox-step lightbox-step--previous"
                  onClick={() => step(-1)}
                  aria-label={text.previousItem}
                >
                  <LeftChevron />
                </button>
                <button
                  type="button"
                  className="lightbox-step lightbox-step--next"
                  onClick={() => step(1)}
                  aria-label={text.nextItem}
                >
                  <RightChevron />
                </button>
              </>
            )}
          </>
        )}
      </dialog>
    </LightboxContext.Provider>
  );
}

/** A still, or a clip that loops muted (paused, with controls, under reduced motion). */
function LightboxMedia({ item }: { item: LightboxItem }) {
  if (!isVideo(item.src)) {
    // biome-ignore lint/performance/noImgElement: static export, images are pre-optimized WebP
    return <img className="lightbox-media" src={item.src} alt={item.alt} />;
  }

  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;
  return (
    <video
      key={item.src}
      className="lightbox-media"
      src={item.src}
      poster={posterFor(item.src)}
      aria-label={item.alt || undefined}
      autoPlay={!reduceMotion}
      controls
      muted
      loop
      playsInline
    />
  );
}

interface LightboxLinkProps {
  src: string;
  className?: string;
  children: ReactNode;
}

/**
 * A link to a media file that opens it in the lightbox. Outside a
 * LightboxProvider, or with a modifier key held, it's a plain link to the file.
 */
export function LightboxLink({ src, className, children }: LightboxLinkProps) {
  const open = useContext(LightboxContext);
  const text = t(useLang()).portfolio;

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const modified =
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (!open || modified || event.button !== 0) return;
    event.preventDefault();
    open(src);
  };

  return (
    <a
      href={src}
      className={className}
      onClick={onClick}
      aria-haspopup={open ? 'dialog' : undefined}
    >
      {children}
      <span className="sr-only"> {text.enlarge}</span>
    </a>
  );
}
