import type { Metadata } from 'next';

import PortfolioPage, {
  portfolioMetadata,
} from '@/components/Pages/PortfolioPage';

// Content and metadata live in the component, shared with the page in the
// other language (English at /…, Spanish at /es/…).
export const metadata: Metadata = portfolioMetadata('en');

export default function Page() {
  return <PortfolioPage lang="en" />;
}
