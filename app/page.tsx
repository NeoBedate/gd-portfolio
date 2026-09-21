import type { Metadata } from 'next';

import Hero from '@/components/Template/Hero';

import PageWrapper from './components/PageWrapper';

export const metadata: Metadata = {
  description:
    'Design lead with 14+ years of experience working with Unity, both in academic and professional environments.'
};

export default function HomePage() {
  return (
    <PageWrapper>
      <Hero />
    </PageWrapper>
  );
}
