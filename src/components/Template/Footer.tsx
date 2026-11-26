import Link from 'next/link';

import ContactIcons from '@/components/Contact/ContactIcons';
import routes from '@/data/routes';
import { AUTHOR_NAME, AUTHOR_ROLE, SITE_UPDATED } from '@/lib/utils';

import CvLinks from './CvLinks';
import ThemePortrait from './ThemePortrait';

// The footer renders at build time, so this is the date of the deploy.
const updatedLabel = SITE_UPDATED.toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Europe/Madrid',
}); // e.g. '26 November 2026'
const updatedIso = SITE_UPDATED.toLocaleDateString('en-CA', {
  timeZone: 'Europe/Madrid',
}); // e.g. '2026-11-26'

export default function Footer() {
  const currentRole = `${AUTHOR_ROLE}`;

  // ""at ${work[0].name}`;"" si quiero añadir más tarde un rol EN UN TRABAJO.

  return (
    <footer className="site-footer-new">
      <div className="footer-content">
        <div className="footer-identity">
          <Link href="/" className="footer-avatar">
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
                Source
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            </p>
            <p className="footer-updated">
              Last updated <time dateTime={updatedIso}>{updatedLabel}</time>
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
              Explore
            </span>
            <div className="footer-links-grid">
              {routes
                .filter((route) => !route.index)
                .map((route) => (
                  <Link key={route.path} href={route.path}>
                    {route.label}
                  </Link>
                ))}
            </div>
          </nav>

          <div
            className="footer-social"
            aria-labelledby="footer-social-heading"
          >
            <span id="footer-social-heading" className="footer-social-label">
              Connect
            </span>
            <ContactIcons />
            <CvLinks className="footer-cv" from="footer" />
          </div>
        </div>
      </div>
      <p className="footer-legal">
        All game titles, trademarks, footage and screenshots belong to their
        respective owners and are shown here for portfolio purposes only.
      </p>
    </footer>
  );
}
