import Link from 'next/link';

import profile from '@/data/profile.json'

import ThemePortrait from './ThemePortrait';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid">
        <div className="hero-primary">
          <h1 className="hero-title">
            <span className="hero-name">{profile.name}</span>
          </h1>
          <p className="hero-tagline">
            Professional {profile.role_01} for {profile.professionalYears} years, holding responsibilites on several different roles while delivering results steadily. I helped to create several action-oriented, kid-friendly video games for all platforms in the last 5 years.
          </p>
        </div>

        <div>
            <div className="hero-portrait">
              <ThemePortrait width={232} height={232} priority />
            </div>
          <div className="hero-chips">
            <span className="hero-chip">{profile.role_01}</span>
            <span className="hero-chip">{profile.role_02}</span>
            <span className="hero-chip">{profile.role_03}</span>
          </div>
        </div>
        </div>
        
      <div className="hero-bg" aria-hidden="true" />
            <div className="hero-cta">
          <Link href="/resume" className="button button-secondary">
            Resume
          </Link>
          <Link href="/portfolio" className="button button-primary">
            Portfolio
             <span aria-hidden="true">→</span>
          </Link>
        </div>
    </section>
  );
};
