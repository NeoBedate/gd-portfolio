/**
 * The site's two languages. English lives at the root (`/about/`), Spanish
 * under `/es/` (`/es/about/`), so the language is always in the URL: links
 * can be shared in either language, and every page knows its language at
 * build time without any client state.
 */

export const LANGS = ['en', 'es'] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = 'en';

/** The URL prefix of each language. English has none. */
const PREFIX: Record<Lang, string> = { en: '', es: '/es' };

/** For `<html lang>`, `hreflang` and JSON-LD `inLanguage`. */
export const LANG_TAG: Record<Lang, string> = { en: 'en', es: 'es' };

/** For OpenGraph `og:locale`. */
export const OG_LOCALE: Record<Lang, string> = { en: 'en_US', es: 'es_ES' };

/** For `Intl` date formatting. */
export const DATE_LOCALE: Record<Lang, string> = { en: 'en-GB', es: 'es-ES' };

/**
 * Pages that exist in both languages, as English paths with a trailing
 * slash. The devlog stays in English only; switching language there leads
 * to the other language's home page.
 */
export const TRANSLATED_PATHS = [
  '/',
  '/about/',
  '/experience/',
  '/portfolio/',
  '/archive/',
  '/contact/',
] as const;

export function isLang(value: unknown): value is Lang {
  return LANGS.includes(value as Lang);
}

/** The language of a pathname: `/es` and `/es/…` are Spanish. */
export function langFromPath(pathname: string | null | undefined): Lang {
  return pathname === '/es' || pathname?.startsWith('/es/') ? 'es' : 'en';
}

/** The English form of a pathname: `/es/about/` → `/about/`, `/es` → `/`. */
export function stripLang(pathname: string): string {
  if (langFromPath(pathname) !== 'es') return pathname;
  const rest = pathname.slice(PREFIX.es.length);
  return rest === '' ? '/' : rest;
}

/**
 * A site path in the given language. Takes paths as the site writes them
 * (`/portfolio`, `/portfolio#tmnt`, `/`), and leaves external links, mail
 * links and in-page anchors alone.
 */
export function localizePath(path: string, lang: Lang): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  const english = stripLang(path);
  if (lang === 'en') return english;
  return english === '/' ? `${PREFIX.es}/` : `${PREFIX.es}${english}`;
}

/** Normalizes a pathname to end in exactly one slash. */
function withTrailingSlash(pathname: string): string {
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

/** Whether a page exists in both languages. */
export function isTranslatedPath(pathname: string): boolean {
  const english = withTrailingSlash(stripLang(pathname));
  return (TRANSLATED_PATHS as readonly string[]).includes(english);
}

/**
 * Where the language switch leads from the current page: the same page in
 * the other language, or that language's home page when the current page
 * only exists in one language.
 */
export function switchLangPath(pathname: string | null, target: Lang): string {
  const current = pathname ?? '/';
  if (!isTranslatedPath(current)) return localizePath('/', target);
  return localizePath(withTrailingSlash(stripLang(current)), target);
}

/** Absolute URLs of a page in every language, for `hreflang` alternates. */
export function languageAlternates(
  siteUrl: string,
  englishPath: `/${string}`,
): Record<string, string> {
  return {
    [LANG_TAG.en]: `${siteUrl}${localizePath(englishPath, 'en')}`,
    [LANG_TAG.es]: `${siteUrl}${localizePath(englishPath, 'es')}`,
    'x-default': `${siteUrl}${localizePath(englishPath, 'en')}`,
  };
}
