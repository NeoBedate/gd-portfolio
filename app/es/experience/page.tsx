import type { Metadata } from 'next';

import ExperiencePage, {
  experienceMetadata,
} from '@/components/Pages/ExperiencePage';

// Content and metadata live in the component, shared with the page in the
// other language (English at /…, Spanish at /es/…).
export const metadata: Metadata = experienceMetadata('es');

export default function Page() {
  return <ExperiencePage lang="es" />;
}
