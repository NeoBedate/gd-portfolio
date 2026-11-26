import type { Metadata } from 'next';

import ArchivePage, { archiveMetadata } from '@/components/Pages/ArchivePage';

// Content and metadata live in the component, shared with the page in the
// other language (English at /…, Spanish at /es/…).
export const metadata: Metadata = archiveMetadata('es');

export default function Page() {
  return <ArchivePage lang="es" />;
}
