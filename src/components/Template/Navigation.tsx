'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cvDownloads } from '@/data/cv';
import profile from '@/data/profile.json';
import routes from '@/data/routes';
import { isActiveRoute } from '@/lib/routes';
import { AUTHOR_NAME } from '@/lib/utils';

import Hamburger from './Hamburger';
import ThemeToggle from './ThemeToggle';

// Websites Navbar, displays routes defined in 'src/data/routes'
export default function Navigation() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <Link href="/" className="site-logo" aria-label={`${AUTHOR_NAME} — home`}>
        <span className="logo-text">{profile.logoText}</span>
      </Link>

      <nav className="nav-links" aria-label="Primary">
        {routes
          .filter((l) => !l.index && l.primary !== false)
          .map((l) => {
            const active = isActiveRoute(pathname, l.path);

            return (
              <Link
                key={l.label}
                href={l.path}
                className={`nav-link ${active ? 'active' : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                {l.label}
              </Link>
            );
          })}
      </nav>

      <div className="nav-actions">
        {/* The CV is one click away on every page, phones included. */}
        <a
          href={cvDownloads[0].href}
          className="nav-cv"
          download
          aria-label="Download CV (PDF)"
        >
          CV <span aria-hidden="true">↓</span>
        </a>
        <ThemeToggle />
        <Hamburger />
      </div>
    </header>
  );
}
