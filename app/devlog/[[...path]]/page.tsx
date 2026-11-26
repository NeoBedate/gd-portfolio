import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import DevlogEntryView from '@/components/Devlog/DevlogEntryView';
import DevlogIndexView, {
  DEVLOG_INTRO,
} from '@/components/Devlog/DevlogIndexView';
import DevlogProjectView from '@/components/Devlog/DevlogProjectView';
import PageWrapper from '@/components/Template/PageWrapper';
import { DEVLOG_PATH, devlogEntryPath, devlogProjectPath } from '@/lib/devlog';
import { devlogStaticParams, resolveDevlogView } from '@/lib/devlogView';
import { createPageMetadata } from '@/lib/metadata';

interface PageProps {
  params: Promise<{ path?: string[] }>;
}

// Only the paths below exist; anything else is the static 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return devlogStaticParams();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const view = resolveDevlogView((await params).path);
  if (!view) return {};

  if (view.kind === 'index') {
    return {
      ...createPageMetadata({
        title: 'Devlog',
        description: DEVLOG_INTRO,
        path: DEVLOG_PATH,
      }),
      // The index builds before anything is published; keep an empty list
      // out of search results.
      ...(view.groups.length === 0
        ? { robots: { index: false, follow: true } }
        : {}),
    };
  }

  if (view.kind === 'project') {
    return createPageMetadata({
      title: `${view.project.name}: weekly updates`,
      description: view.project.description,
      path: devlogProjectPath(view.project.id),
    });
  }

  const { entry, project } = view;
  const base = createPageMetadata({
    title: `${entry.title} · ${project.name}`,
    description: entry.summary,
    path: devlogEntryPath(entry),
  });
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: 'article',
      publishedTime: entry.date,
    },
    // Drafts only build for previews; never let one be indexed.
    ...(entry.draft ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function DevlogPage({ params }: PageProps) {
  const view = resolveDevlogView((await params).path);
  if (!view) notFound();

  return (
    <PageWrapper mainClassName="page-main--devlog">
      {view.kind === 'index' && <DevlogIndexView groups={view.groups} />}
      {view.kind === 'project' && (
        <DevlogProjectView project={view.project} entries={view.entries} />
      )}
      {view.kind === 'entry' && (
        <DevlogEntryView
          project={view.project}
          entry={view.entry}
          previous={view.previous}
          next={view.next}
        />
      )}
    </PageWrapper>
  );
}
