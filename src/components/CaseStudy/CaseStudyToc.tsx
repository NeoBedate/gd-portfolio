'use client';

import { useEffect, useRef, useState } from 'react';

import { t } from '@/data/i18n/ui';
import { useLang } from '@/hooks/useLang';

import type { TocEntry } from './caseStudyOutline';

interface CaseStudyTocProps {
  entries: TocEntry[];
}

/**
 * "On this page": links to the case study's sections, in a bar that sticks
 * under the site header and marks the section being read. On a phone the
 * bar scrolls sideways and keeps the current link in view.
 */
export default function CaseStudyToc({ entries }: CaseStudyTocProps) {
  const text = t(useLang()).portfolio;
  const navRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState<string | undefined>(undefined);

  // The current section is the last one whose heading has passed under the
  // sticky header and this bar.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const nav = navRef.current;
      if (!nav) return;
      const line = nav.getBoundingClientRect().bottom + 8;
      let found: string | undefined;
      for (const { id } of entries) {
        const heading = document.getElementById(id);
        if (heading && heading.getBoundingClientRect().top <= line) found = id;
      }
      setCurrent(found);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [entries]);

  // Keep the current link visible when the bar scrolls sideways.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav || !current) return;
    const link = nav.querySelector<HTMLElement>(`a[href="#${current}"]`);
    if (!link) return;
    const left = link.offsetLeft - nav.clientWidth / 2 + link.offsetWidth / 2;
    nav.scrollLeft = Math.max(0, left);
  }, [current]);

  return (
    <nav ref={navRef} className="case-study-toc" aria-label={text.onThisPage}>
      <ol>
        {entries.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="case-study-toc-link"
              aria-current={current === id ? 'location' : undefined}
            >
              {label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
