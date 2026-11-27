import { t } from '@/data/i18n/ui';
import type { ProjectLink } from '@/data/projects';
import type { Lang } from '@/lib/i18n';

interface ProjectLinksProps {
  links: ProjectLink[];
  lang: Lang;
}

/** Buttons to the project's store page, videos, documents… */
export default function ProjectLinks({ links, lang }: ProjectLinksProps) {
  if (links.length === 0) return null;
  const text = t(lang);

  return (
    <ul className="case-study-links" aria-label={text.portfolio.links}>
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            className="button button-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
            <span className="sr-only"> {text.opensInNewTab}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
