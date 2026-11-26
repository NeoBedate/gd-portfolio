import type { Metadata } from 'next';

import CaseStudyPage, {
  caseStudyMetadata,
  caseStudyStaticParams,
} from '@/components/Pages/CaseStudyPage';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// One page per project with a slug; any other path is the static 404.
// Content and metadata live in the component, shared with the page in the
// other language (English at /…, Spanish at /es/…).
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudyStaticParams();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  return caseStudyMetadata((await params).slug, 'en');
}

export default async function Page({ params }: PageProps) {
  return <CaseStudyPage slug={(await params).slug} lang="en" />;
}
