'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { t } from '@/data/i18n/ui';
import { LANG_TAG, LANGS, langFromPath, switchLangPath } from '@/lib/i18n';

/**
 * EN | ES. Each language is a link to the same page in that language (or
 * to its home page, for pages that exist in one language only), so the
 * switch works without JavaScript and every language has its own URL.
 */
export default function LanguageSwitch() {
  const pathname = usePathname();
  const current = langFromPath(pathname);

  return (
    <nav className="lang-switch" aria-label={t(current).languageSwitch.label}>
      {LANGS.map((lang) => {
        const isCurrent = lang === current;

        return (
          <Link
            key={lang}
            href={switchLangPath(pathname, lang)}
            hrefLang={LANG_TAG[lang]}
            lang={LANG_TAG[lang]}
            className={`lang-switch-link${isCurrent ? ' active' : ''}`}
            aria-current={isCurrent ? 'true' : undefined}
            aria-label={`${lang.toUpperCase()} (${t(lang).langName})`}
            title={isCurrent ? undefined : t(lang).languageSwitch.goTo}
          >
            {lang.toUpperCase()}
          </Link>
        );
      })}
    </nav>
  );
}
