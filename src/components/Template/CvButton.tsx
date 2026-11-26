import type { ReactNode } from 'react';

import { analyticsEvents, type LinkPlacement } from '@/data/analytics';
import { cvDownloadsFor } from '@/data/cv';
import { t } from '@/data/i18n/ui';
import type { Lang } from '@/lib/i18n';

import TrackedLink from './TrackedLink';

interface CvButtonProps {
  lang: Lang;
  /** Reported with the download event; also keeps the tooltip id unique. */
  from: LinkPlacement;
  className: string;
  /** Which edge of the button the tooltip lines up with. */
  tooltipAlign?: 'start' | 'end';
  children: ReactNode;
}

/**
 * Downloads the default (Level Design) CV in the page's language, with a
 * tooltip saying which language that is and how to get the other one.
 */
export default function CvButton({
  lang,
  from,
  className,
  tooltipAlign = 'end',
  children,
}: CvButtonProps) {
  const [cv] = cvDownloadsFor(lang);
  const text = t(lang).cv;
  const tooltipId = `cv-tooltip-${from}`;

  return (
    <span className="cv-button">
      <TrackedLink
        href={cv.href}
        className={className}
        download
        aria-label={text.buttonLabel}
        aria-describedby={tooltipId}
        event={analyticsEvents.cvDownload}
        eventData={{ cv: cv.label, lang, from }}
      >
        {children}
      </TrackedLink>
      <span
        id={tooltipId}
        role="tooltip"
        className={`cv-tooltip cv-tooltip--${tooltipAlign}`}
      >
        {text.tooltip}
      </span>
    </span>
  );
}
