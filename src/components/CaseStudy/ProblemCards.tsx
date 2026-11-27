import { t } from '@/data/i18n/ui';
import type { ProblemCard } from '@/data/projects';
import type { Lang } from '@/lib/i18n';

interface ProblemCardsProps {
  cards?: ProblemCard[];
  lang: Lang;
}

/** Short problem → decision → outcome cards, for readers who skim. */
export default function ProblemCards({ cards, lang }: ProblemCardsProps) {
  if (!cards || cards.length === 0) return null;
  const text = t(lang).portfolio;

  return (
    <section
      className="game-detail-section case-study-problems"
      aria-labelledby="case-study-problems"
    >
      <h2 id="case-study-problems" className="game-detail-section-title">
        {text.problems}
      </h2>
      <ol className="case-study-cards">
        {cards.map((card) => (
          <li key={card.problem} className="case-study-card">
            <dl>
              <dt>{text.problem}</dt>
              <dd>{card.problem}</dd>
              <dt>{text.decision}</dt>
              <dd>{card.decision}</dd>
              <dt>{text.outcome}</dt>
              <dd>{card.outcome}</dd>
            </dl>
          </li>
        ))}
      </ol>
    </section>
  );
}
