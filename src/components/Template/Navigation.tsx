'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { t } from '@/data/i18n/ui';
import profile from '@/data/profile.json';
import routes, { routeLabel } from '@/data/routes';
import { langFromPath, localizePath, stripLang } from '@/lib/i18n';
import { isActiveRoute } from '@/lib/routes';
import { AUTHOR_NAME } from '@/lib/utils';

import CvButton from './CvButton';
import Hamburger from './Hamburger';
import LanguageSwitch from './LanguageSwitch';
import ThemeToggle from './ThemeToggle';

// Websites Navbar, displays routes defined in 'src/data/routes'
export default function Navigation() {
  const pathname = usePathname();
  const lang = langFromPath(pathname);
  const englishPath = stripLang(pathname ?? '/');
  const text = t(lang);

  return (
    <header className="site-header">
      <Link
        href={localizePath('/', lang)}
        className="site-logo"
        aria-label={`${AUTHOR_NAME} — ${text.nav.home}`}
      >
        <span className="logo-text">{profile.logoText}</span>
      </Link>

      <nav className="nav-links" aria-label={text.nav.primary}>
        {routes
          .filter((l) => !l.index && l.primary !== false)
          .map((l) => {
            const active = isActiveRoute(englishPath, l.path);

            return (
              <Link
                key={l.path}
                href={localizePath(l.path, lang)}
                className={`nav-link ${active ? 'active' : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                {routeLabel(l, lang)}
              </Link>
            );
          })}
      </nav>

      <div className="nav-actions">
        {/* The CV is one click away on every page, phones included. */}
        <CvButton lang={lang} from="header" className="nav-cv">
          {text.cv.button} <span aria-hidden="true">↓</span>
        </CvButton>
        <LanguageSwitch />
        <ThemeToggle />
        <Hamburger />
      </div>
    </header>
  );
}
