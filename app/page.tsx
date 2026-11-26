import type { Metadata } from 'next';

import HomePage, { homeMetadata } from '@/components/Pages/HomePage';

// Content and metadata live in the component, shared with the page in the
// other language (English at /…, Spanish at /es/…).
export const metadata: Metadata = homeMetadata('en');

export default function Page() {
  return <HomePage lang="en" />;
}
