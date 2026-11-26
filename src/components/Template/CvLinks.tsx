import { analyticsEvents, type LinkPlacement } from '@/data/analytics';
import { cvDownloads } from '@/data/cv';

import TrackedLink from './TrackedLink';

interface CvLinksProps {
  /** Reported with the download event. */
  from: LinkPlacement;
  className?: string;
}

/** "CV (PDF): Level Design · Production", each a download link. */
export default function CvLinks({
  from,
  className = 'cv-links',
}: CvLinksProps) {
  return (
    <p className={className}>
      CV (PDF):{' '}
      {cvDownloads.map((cv, index) => (
        <span key={cv.href}>
          {index > 0 ? ' · ' : null}
          <TrackedLink
            href={cv.href}
            download
            event={analyticsEvents.cvDownload}
            eventData={{ cv: cv.label, from }}
          >
            {cv.label}
          </TrackedLink>
        </span>
      ))}
    </p>
  );
}
