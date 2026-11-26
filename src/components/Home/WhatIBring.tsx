import { t } from '@/data/i18n/ui';
import { homeContent } from '@/data/localized';
import type { Lang } from '@/lib/i18n';

export default function WhatIBring({ lang = 'en' }: { lang?: Lang }) {
  const { philosophy, strengths } = homeContent(lang);

  return (
    <section className="home-section" aria-labelledby="home-strengths-title">
      <header className="home-section-header">
        <h2 id="home-strengths-title" className="home-section-kicker">
          {t(lang).home.whatIBring}
        </h2>
      </header>

      <p className="home-philosophy">{philosophy}</p>

      <ul className="home-strengths-list">
        {strengths.map((strength) => (
          <li key={strength.title} className="home-strength">
            <h3>{strength.title}</h3>
            <p>{strength.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
