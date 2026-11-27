import { t } from '@/data/i18n/ui';
import type { ProjectDetails } from '@/data/projects';
import type { Lang } from '@/lib/i18n';

import { monthYear } from './monthYear';

interface CaseStudyFactsProps {
  project: ProjectDetails;
  lang: Lang;
}

interface Fact {
  label: string;
  value: string | undefined;
  /** Long values (a studio name in capitals, the platform list) get two columns. */
  wide?: boolean;
}

/**
 * The credits block under a case study's title: studio, publisher,
 * platforms, release, engine, team and my time on the project. Facts the
 * data doesn't have are left out.
 */
export default function CaseStudyFacts({ project, lang }: CaseStudyFactsProps) {
  const text = t(lang).portfolio;

  const onProject =
    project.startDate && project.endDate
      ? `${monthYear(project.startDate, lang)} – ${monthYear(project.endDate, lang)}`
      : undefined;
  const release =
    project.status === 'in-progress'
      ? text.inProgress
      : project.publishingDate
        ? monthYear(project.publishingDate, lang)
        : undefined;

  const facts: Fact[] = [
    { label: text.studio, value: project.studio, wide: true },
    { label: text.publisher, value: project.publisher },
    {
      label: text.platforms,
      value: project.platforms?.join(', '),
      wide: true,
    },
    { label: text.releaseDate, value: release },
    { label: text.engine, value: project.engine },
    { label: text.team, value: project.team },
    { label: text.onProject, value: onProject },
  ];

  return (
    <dl className="case-study-facts" aria-label={text.facts}>
      {facts
        .filter((fact) => Boolean(fact.value))
        .map(({ label, value, wide }) => (
          <div
            key={label}
            className={
              wide ? 'case-study-fact case-study-fact--wide' : 'case-study-fact'
            }
          >
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
    </dl>
  );
}
