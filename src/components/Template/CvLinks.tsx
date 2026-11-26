import { analyticsEvents, type LinkPlacement } from '@/data/analytics';
import { cvDownloadsFor } from '@/data/cv';
import { t } from '@/data/i18n/ui';
import type { Lang } from '@/lib/i18n';

import TrackedLink from './TrackedLink';

interface CvLinksProps {
  /** Reported with the download event. */
  from: LinkPlacement;
  className?: string;
  /** The CVs of this language are listed. */
  lang?: Lang;
}

/** "CV in English (PDF): Level Design · Production", each a download link. */
export default function CvLinks({
  from,
  className = 'cv-links',
  lang = 'en',
}: CvLinksProps) {
  return (
    <p className={className}>
      {t(lang).cv.linksLabel}{' '}
      {cvDownloadsFor(lang).map((cv, index) => (
        <span key={cv.href}>
          {index > 0 ? ' · ' : null}
          <TrackedLink
            href={cv.href}
            download
            event={analyticsEvents.cvDownload}
            eventData={{ cv: cv.label, lang, from }}
          >
            {cv.label}
          </TrackedLink>
        </span>
      ))}
    </p>
  );
}
