import Link from 'next/link';

import contact from '@/data/contact';
import { currently } from '@/data/home';
import openToWork from '@/data/openToWork';
import profile from '@/data/profile.json';
import { AUTHOR_HEADLINE } from '@/lib/utils';

import ThemePortrait from './ThemePortrait';

const linkedIn = contact.find((item) => item.label === 'LinkedIn');

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid">
        <div className="hero-primary">
          <h1 className="hero-title">
            <span className="hero-name">{profile.name}</span>
            <span className="hero-headline">{AUTHOR_HEADLINE}</span>
          </h1>
          <p className="hero-tagline">
            I design action spaces for console games: traversal, combat arenas
            and cameras. {profile.professionalYears} years in the industry, 3
            console games shipped for DreamWorks and Nickelodeon IPs (published
            by Outright Games), and I led the level design team that delivered
            40 levels for <cite>TMNT: Mutants Unleashed</cite>.
          </p>

          <div className="hero-status">
            <p className="hero-open">
              <span className="hero-open-badge">Open to work</span>{' '}
              <span className="hero-open-roles">{openToWork.roles}</span>
            </p>
            <ul className="hero-open-facts">
              {openToWork.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <p className="hero-currently">
              <span className="hero-currently-label">Currently</span>{' '}
              {currently.map((item, index) => (
                <span key={item.text}>
                  {index > 0 ? ' · ' : null}
                  {item.href ? (
                    <Link href={item.href}>{item.text}</Link>
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
        <Link href="/portfolio" className="button button-primary">
          See my work <span aria-hidden="true">→</span>
        </Link>
        {linkedIn ? (
          <a
            href={linkedIn.link}
            className="button button-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn<span className="sr-only"> (opens in new tab)</span>
          </a>
        ) : null}
      </div>
    </section>
  );
}
