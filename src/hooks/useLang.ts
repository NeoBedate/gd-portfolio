'use client';

import { usePathname } from 'next/navigation';

import { type Lang, langFromPath } from '@/lib/i18n';

/** The current page's language, read from its URL (`/es/…` is Spanish). */
export function useLang(): Lang {
  return langFromPath(usePathname());
}
