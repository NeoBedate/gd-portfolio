import dayjs from 'dayjs';

import { DATE_LOCALE, type Lang } from '@/lib/i18n';

/** A date as month and year: 'Oct 2024' in English, 'oct 2024' in Spanish. */
export function monthYear(date: string, lang: Lang): string {
  if (lang === 'en') return dayjs(date).format('MMM YYYY');
  return new Date(`${date}T12:00:00Z`)
    .toLocaleDateString(DATE_LOCALE[lang], {
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    })
    .replace(' de ', ' ')
    .replace('.', '');
}
