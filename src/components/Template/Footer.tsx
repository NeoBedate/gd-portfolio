import Link from 'next/link';

import ContactIcons from '@/components/Contact/ContactIcons';
import { t } from '@/data/i18n/ui';
import routes, { routeLabel } from '@/data/routes';
import { DATE_LOCALE, type Lang, localizePath } from '@/lib/i18n';
import { AUTHOR_NAME, AUTHOR_ROLE, SITE_UPDATED } from '@/lib/utils';

import CvLinks from './CvLinks';
import ThemePortrait from './ThemePortrait';

// The footer renders at build time, so this is the date of the deploy.
function updatedLabel(lang: Lang): string {
  return SITE_UPDATED.toLocaleDateString(DATE_LOCALE[lang], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Madrid',
  }); // e.g. '26 November 2026', '26 de noviembre de 2026'
}
const updatedIso = SITE_UPDATED.toLocaleDateString('en-CA', {
  timeZone: 'Europe/Madrid',
}); // e.g. '2026-11-26'

export default function Footer({ lang = 'en' }: { lang?: Lang }) {
  const text = t(lang);
  const currentRole = `${AUTHOR_ROLE}`;

  // ""at ${work[0].name}`;"" si quiero añadir más tarde un rol EN UN TRABAJO.

  return (
    <footer className="site-footer-new">
      <div className="footer-content">
        <div className="footer-identity">
          <Link href={localizePath('/', lang)} className="footer-avatar">
            <ThemePortrait width={80} height={80} />
          </Link>
          <div className="footer-info">
            <span className="footer-name">{AUTHOR_NAME}</span>
            <p className="footer-role">{currentRole}</p>
            <p className="footer-copyright">
              &copy; {new Date().getFullYear()} ·{' '}
              <a
                href="https://github.com/NeoBedate/gd-portfolio"
                target="_blank"
                rel="noopener noreferrer"
              >
                {text.footer.source}
                <span className="sr-only"> {text.opensInNewTab}</span>
              </a>
            </p>
            <p className="footer-updated">
              {text.footer.lastUpdated}{' '}
              <time dateTime={updatedIso}>{updatedLabel(lang)}</time>
            </p>
          </div>
        </div>

        <div className="footer-right">
          {/* Driven from the same route registry as the header, which had
              drifted: the footer was missing Writing and Stats entirely.
              These are group labels, not document sections, so they are
              spans rather than headings. */}
          <nav className="footer-links" aria-labelledby="footer-links-heading">
            <span id="footer-links-heading" className="footer-links-label">
              {text.footer.explore}
            </span>
            <div className="footer-links-grid">
              {routes
                .filter((route) => !route.index)
                .map((route) => (
                  <Link key={route.path} href={localizePath(route.path, lang)}>
                    {routeLabel(route, lang)}
                  </Link>
                ))}
            </div>
          </nav>

          <div
            className="footer-social"
            aria-labelledby="footer-social-heading"
          >
            <span id="footer-social-heading" className="footer-social-label">
              {text.footer.connect}
            </span>
            <ContactIcons />
            <CvLinks className="footer-cv" from="footer" lang={lang} />
          </div>
        </div>
      </div>
      <p className="footer-legal">{text.footer.legal}</p>
    </footer>
  );
}
