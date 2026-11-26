'use client';

import Link from 'next/link';

import { t } from '@/data/i18n/ui';
import { useLang } from '@/hooks/useLang';
import { localizePath } from '@/lib/i18n';

import { MAIN_CONTENT_ID } from './mainContent';

/** The 404 page, in the language of the URL that was requested. */
export default function NotFoundContent() {
  const lang = useLang();
  const text = t(lang).notFound;

  return (
    <main id={MAIN_CONTENT_ID} tabIndex={-1} className="not-found-page">
      <div className="not-found-content">
        <span className="not-found-code">404</span>
        <h1 className="not-found-title">{text.title}</h1>
        <p className="not-found-message">{text.message}</p>
        <div className="not-found-actions">
          <Link href={localizePath('/', lang)} className="button">
            {text.home}
          </Link>
          <Link
            href={localizePath('/contact', lang)}
            className="button button-secondary"
          >
            {text.contact}
          </Link>
        </div>
      </div>
    </main>
  );
}
