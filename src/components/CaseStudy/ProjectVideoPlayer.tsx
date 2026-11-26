import { t } from '@/data/i18n/ui';
import type { ProjectVideo } from '@/data/projects';
import type { Lang } from '@/lib/i18n';

interface ProjectVideoPlayerProps {
  video: ProjectVideo;
  index: number;
  lang: Lang;
}

/**
 * A full video with sound and the browser's own controls. Nothing but the
 * poster downloads until the visitor presses play.
 */
export default function ProjectVideoPlayer({
  video,
  index,
  lang,
}: ProjectVideoPlayerProps) {
  const headingId = `case-study-video-${index + 1}`;

  return (
    <section
      className="game-detail-section case-study-video"
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className="game-detail-section-title">
        {video.title}
      </h2>
      <figure className="case-study-video-figure">
        <video
          className="case-study-video-player"
          controls
          preload="none"
          playsInline
          poster={video.poster}
          width={video.width}
          height={video.height}
        >
          <source src={video.src} type="video/mp4" />
        </video>
        <figcaption className="case-study-video-caption">
          <span>{video.description}</span>{' '}
          <span className="case-study-video-credit">
            {t(lang).portfolio.videoCredit}
          </span>
        </figcaption>
      </figure>
    </section>
  );
}
