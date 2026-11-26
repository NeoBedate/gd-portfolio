import { cvDownloads } from '@/data/cv';

interface CvLinksProps {
  className?: string;
}

/** "CV (PDF): Level Design · Production", each a download link. */
export default function CvLinks({ className = 'cv-links' }: CvLinksProps) {
  return (
    <p className={className}>
      CV (PDF):{' '}
      {cvDownloads.map((cv, index) => (
        <span key={cv.href}>
          {index > 0 ? ' · ' : null}
          <a href={cv.href} download>
            {cv.label}
          </a>
        </span>
      ))}
    </p>
  );
}
