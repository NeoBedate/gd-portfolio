'use client';

import Link from 'next/link';
import React from 'react';

import ThemePortrait from './ThemePortrait';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-avatar">
          <ThemePortrait width={120} height={120} priority />
        </div>

        <h1 className="hero-title">
          <span className="hero-name">Santiago R. Bedate</span>
        </h1>

        <p className="hero-tagline">
          Professional creative at designing several action-oriented, kid-friendly video games for all platforms.
          {/* at{' '}
          <a href="https://promptfoo.dev" className="hero-highlight">
           aheartfulofgames
          </a>*/}
          <br />
        </p>

        <div className="hero-chips">
          <span className="hero-chip">Game Designer</span>
          <span className="hero-chip">Level Designer</span>
          <span className="hero-chip">Producer</span>
        </div>

        <div className="hero-cta">
          <Link href="/resume" className="button button-secondary">
            Resume
          </Link>
          <Link href="/portfolio" className="button button-primary">
            Portfolio
          </Link>
        </div>
      </div>

      <div className="hero-bg" aria-hidden="true">
        <div className="hero-gradient" />
      </div>
    </section>
  );
};

export default Hero;
