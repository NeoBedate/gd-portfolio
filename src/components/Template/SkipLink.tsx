'use client';

import { t } from '@/data/i18n/ui';
import { useLang } from '@/hooks/useLang';

import { MAIN_CONTENT_ID } from './mainContent';

/**
 * First focusable element on the page. The About and Resume pages are
 * thousands of pixels long, so tabbing past the nav to reach content is
 * otherwise the only route in.
 */
export default function SkipLink() {
  const lang = useLang();

  return (
    <a href={`#${MAIN_CONTENT_ID}`} className="skip-link">
      {t(lang).skipToContent}
    </a>
  );
}
