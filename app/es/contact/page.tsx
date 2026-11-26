import type { Metadata } from 'next';

import ContactPage, { contactMetadata } from '@/components/Pages/ContactPage';

// Content and metadata live in the component, shared with the page in the
// other language (English at /…, Spanish at /es/…).
export const metadata: Metadata = contactMetadata('es');

export default function Page() {
  return <ContactPage lang="es" />;
}
