import type { Metadata } from 'next';

import NotFoundContent from '@/components/Template/NotFoundContent';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Page Not Found',
  description: 'The page you are looking for could not be found.',
});

/**
 * A static export has a single 404 page for both languages, so the text
 * follows the URL that was requested (see NotFoundContent).
 */
export default function NotFound() {
  return <NotFoundContent />;
}
