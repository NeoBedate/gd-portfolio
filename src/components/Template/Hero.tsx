import Link from 'next/link';

import { analyticsEvents } from '@/data/analytics';
import contact from '@/data/contact';
import { t } from '@/data/i18n/ui';
import { homeContent, openToWorkFor } from '@/data/localized';
import profile from '@/data/profile.json';
import { type Lang, localizePath } from '@/lib/i18n';
import { AUTHOR_HEADLINE } from '@/lib/utils';

import CvButton from './CvButton';
import ThemePortrait from './ThemePortrait';
import TrackedLink from './TrackedLink';

const linkedIn = contact.find((item) => item.label === 'LinkedIn');

export default function Hero({ lang = 'en' }: { lang?: Lang }) {
  const text = t(lang);
  const { heroTagline, currently } = homeContent(lang);
  const openToWork = openToWorkFor(lang);

  return (
    <section className="hero">
      <div className="hero-grid">
        <div className="hero-primary">
          <h1 className="hero-title">
            <span className="hero-name">{profile.name}</span>
            <span className="hero-headline">{AUTHOR_HEADLINE}</span>
          </h1>
          <p className="hero-tagline">
            {heroTagline.before}
            <cite>{heroTagline.cite}</cite>
            {heroTagline.after}
          </p>

          <div className="hero-status">
            <p className="hero-open">
              <span className="hero-open-badge">{text.hero.openToWork}</span>{' '}
              <span className="hero-open-roles">{openToWork.roles}</span>
            </p>
            <ul className="hero-open-facts">
              {openToWork.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <p className="hero-currently">
              <span className="hero-currently-label">
                {text.hero.currently}
              </span>{' '}
              {currently.map((item, index) => (
                <span key={item.text}>
                  {index > 0 ? ' · ' : null}
                  {item.href ? (
                    <Link href={localizePath(item.href, lang)}>
                      {item.text}
                    </Link>
                  ) : (
                    item.text
                  )}
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="hero-portrait">
          <ThemePortrait width={256} height={256} priority />
        </div>
      </div>

      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-cta">
        <Link
          href={localizePath('/portfolio', lang)}
          className="button button-primary"
        >
          {text.hero.seeWork} <span aria-hidden="true">→</span>
        </Link>
        <CvButton
          lang={lang}
          from="hero"
          className="button button-secondary"
          tooltipAlign="start"
        >
          {text.cv.download}
        </CvButton>
        {linkedIn ? (
          <TrackedLink
            href={linkedIn.link}
            className="button button-secondary"
            target="_blank"
            rel="noopener noreferrer"
            event={analyticsEvents.linkedIn}
            eventData={{ from: 'hero' }}
          >
            LinkedIn<span className="sr-only"> {text.opensInNewTab}</span>
          </TrackedLink>
        ) : null}
      </div>
    </section>
  );
}
