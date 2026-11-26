import Markdown from 'markdown-to-jsx';

import ProjectMedia from '@/components/Projects/ProjectMedia';
import { isVideo } from '@/lib/media';

interface DevlogMediaProps {
  src?: string;
  alt?: string;
  title?: string;
}

/**
 * A Markdown image, `![alt](src "caption")`. A `.mp4` plays as a muted loop
 * (with its `-poster.webp` until it scrolls into view), anything else is a
 * still. Clips also link to the file, so anyone with reduced motion, who
 * only gets the poster, can still open and watch them.
 *
 * Built from spans because Markdown wraps a lone image in a paragraph, and
 * a block element inside a <p> is invalid HTML.
 */
export function DevlogMedia({ src, alt = '', title }: DevlogMediaProps) {
  if (!src) return null;

  // Most captures are 16:9. The real size takes over once the poster or
  // image loads, so this only reserves space.
  const media = (
    <ProjectMedia
      src={src}
      alt={alt}
      width={1280}
      height={720}
      className="devlog-media-asset"
    />
  );

  return (
    <span className="devlog-media">
      {isVideo(src) ? (
        <a href={src} className="devlog-media-link">
          {media}
          <span className="sr-only"> (open the clip)</span>
        </a>
      ) : (
        media
      )}
      {title && <span className="devlog-media-caption">{title}</span>}
    </span>
  );
}

const DEVLOG_MARKDOWN_OPTIONS = {
  overrides: { img: { component: DevlogMedia } },
};

/** An update's Markdown body, set in the site's reading type. */
export default function DevlogBody({ markdown }: { markdown: string }) {
  return (
    <div className="post-content prose devlog-body">
      <Markdown options={DEVLOG_MARKDOWN_OPTIONS}>{markdown}</Markdown>
    </div>
  );
}
