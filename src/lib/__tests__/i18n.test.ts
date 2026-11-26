import { describe, expect, it } from 'vitest';

import {
  isTranslatedPath,
  langFromPath,
  languageAlternates,
  localizePath,
  stripLang,
  switchLangPath,
} from '../i18n';
import { createPageMetadata } from '../metadata';

describe('i18n paths', () => {
  it('reads the language from the URL', () => {
    expect(langFromPath('/')).toBe('en');
    expect(langFromPath('/about/')).toBe('en');
    expect(langFromPath('/es')).toBe('es');
    expect(langFromPath('/es/')).toBe('es');
    expect(langFromPath('/es/about/')).toBe('es');
    // Only the /es segment counts, not any path starting with "es".
    expect(langFromPath('/escape/')).toBe('en');
    expect(langFromPath(null)).toBe('en');
  });

  it('strips the language prefix', () => {
    expect(stripLang('/es/about/')).toBe('/about/');
    expect(stripLang('/es/')).toBe('/');
    expect(stripLang('/es')).toBe('/');
    expect(stripLang('/about/')).toBe('/about/');
  });

  it('localizes site paths and leaves other links alone', () => {
    expect(localizePath('/', 'es')).toBe('/es/');
    expect(localizePath('/about', 'es')).toBe('/es/about');
    expect(localizePath('/portfolio#tmnt', 'es')).toBe('/es/portfolio#tmnt');
    expect(localizePath('/es/about', 'en')).toBe('/about');
    expect(localizePath('/es/about', 'es')).toBe('/es/about');
    expect(localizePath('https://example.com/', 'es')).toBe(
      'https://example.com/',
    );
    expect(localizePath('#resume', 'es')).toBe('#resume');
  });

  it('switches to the same page, or to home where there is no translation', () => {
    expect(switchLangPath('/', 'es')).toBe('/es/');
    expect(switchLangPath('/experience', 'es')).toBe('/es/experience/');
    expect(switchLangPath('/es/contact/', 'en')).toBe('/contact/');
    expect(switchLangPath('/devlog/ue5-level/', 'es')).toBe('/es/');
    expect(isTranslatedPath('/devlog/')).toBe(false);
    expect(isTranslatedPath('/es/archive/')).toBe(true);
  });

  it('lists every language version of a page', () => {
    expect(languageAlternates('https://x.test', '/about/')).toEqual({
      en: 'https://x.test/about/',
      es: 'https://x.test/es/about/',
      'x-default': 'https://x.test/about/',
    });
  });

  it('gives a Spanish page its own canonical, locale and hreflang links', () => {
    const metadata = createPageMetadata({
      title: 'Sobre mí',
      description: 'Descripción',
      path: '/about/',
      lang: 'es',
    });

    expect(metadata.alternates?.canonical).toBe(
      'https://www.santibedate.com/es/about/',
    );
    expect(metadata.alternates?.languages).toMatchObject({
      en: 'https://www.santibedate.com/about/',
      es: 'https://www.santibedate.com/es/about/',
    });
    expect(metadata.openGraph).toMatchObject({
      locale: 'es_ES',
      url: 'https://www.santibedate.com/es/about/',
    });
  });
});
