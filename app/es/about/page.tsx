import type { Metadata } from 'next';

import AboutPage, { aboutMetadata } from '@/components/Pages/AboutPage';

// Content and metadata live in the component, shared with the page in the
// other language (English at /…, Spanish at /es/…).
export const metadata: Metadata = aboutMetadata('es');

export default function Page() {
  return <AboutPage lang="es" />;
}
