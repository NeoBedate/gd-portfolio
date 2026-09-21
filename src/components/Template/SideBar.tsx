'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import ContactIcons from '../Contact/ContactIcons';
import ThemePortrait from './ThemePortrait';

const SideBar: React.FC = () => {
  const pathname = usePathname();

  return (
    <section className="site-sidebar">
      <section className="site-intro">
        <Link href="/" className="logo">
          <ThemePortrait width={200} height={200} priority />
        </Link>
        <header>
          <h2>Santiago R. Bedate</h2>
          <p>
            <a href="mailto:santiago.rodriguez.bedate@gmail.com">santiago.rodriguez.bedate@gmail.com</a>
          </p>
        </header>
      </section>

      <section className="blurb">
        <h2>About</h2>
        <p>
          Hi, I&apos;m Santiago.
          I am a Game Designer with 14yrs of experience
          making games and teaching at university.
          I&apos;ve specialized myself in Level Design as
          well as several aspects of production.
        </p>
        <ul className="actions">
          <li>
            {pathname && !pathname.includes('/resume') ? (
              <Link href="/resume" className="button">
                Learn More
              </Link>
            ) : (
              <Link href="/about" className="button">
                About Me
              </Link>
            )}
          </li>
        </ul>
      </section>

      <section className="site-footer">
        <ContactIcons />
        <p className="copyright">
          &copy; Santiago R. Bedate <Link href="/">santibedate.com</Link>.
        </p>
      </section>
    </section>
  );
};

export default SideBar;
