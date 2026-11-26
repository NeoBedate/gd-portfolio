import Link from 'next/link';

import { t } from '@/data/i18n/ui';
import { localizeProject } from '@/data/localized';
import { type CaseStudyProject, caseStudyPath } from '@/lib/caseStudies';
import { type Lang, localizePath } from '@/lib/i18n';

interface CaseStudyPagerProps {
  previous?: CaseStudyProject;
  next?: CaseStudyProject;
  lang: Lang;
}

/** Links to the previous and next case studies, and back to the portfolio. */
export default function CaseStudyPager({
  previous,
  next,
  lang,
}: CaseStudyPagerProps) {
  const text = t(lang).portfolio;
  const href = (project: CaseStudyProject) =>
    localizePath(caseStudyPath(project.slug), lang);
  const name = (project: CaseStudyProject) =>
    localizeProject(project, lang).name.trim();

  return (
    <footer className="case-study-footer">
      {(previous || next) && (
        <nav className="case-study-pager" aria-label={text.otherProjects}>
          {previous && (
            <Link
              href={href(previous)}
              className="case-study-pager-link case-study-pager-previous"
              rel="prev"
            >
              <span className="case-study-pager-label">
                <span aria-hidden="true">← </span>
                {text.previousProject}
              </span>
              <span className="case-study-pager-title">{name(previous)}</span>
            </Link>
          )}
          {next && (
            <Link
              href={href(next)}
              className="case-study-pager-link case-study-pager-next"
              rel="next"
            >
              <span className="case-study-pager-label">
                {text.nextProject}
                <span aria-hidden="true"> →</span>
              </span>
              <span className="case-study-pager-title">{name(next)}</span>
            </Link>
          )}
        </nav>
      )}
      <p className="case-study-back">
        <Link href={localizePath('/portfolio/', lang)}>
          <span aria-hidden="true">←</span>
          {text.allProjects}
        </Link>
      </p>
    </footer>
  );
}
