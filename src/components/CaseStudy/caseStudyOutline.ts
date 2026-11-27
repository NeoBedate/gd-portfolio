/**
 * What a case-study page contains, in page order: the media the lightbox
 * steps through, and the sections the table of contents links to. Kept
 * next to the components that render those ids, and free of React so it
 * runs on the server and in tests.
 */

import type { UiStrings } from '@/data/i18n/ui';
import type { ProjectDetails } from '@/data/projects';

export interface LightboxItem {
  src: string;
  alt: string;
  caption?: string;
}

export interface TocEntry {
  id: string;
  label: string;
}

/** Every screenshot, image and clip on the page, in the order they appear. */
export function lightboxItems(project: ProjectDetails): LightboxItem[] {
  const items: LightboxItem[] = (project.images ?? []).map((src, index) => ({
    src,
    alt: project.imageAlts?.[index] ?? '',
  }));

  for (const section of project.sections ?? []) {
    if (section.taskImage) {
      items.push({
        src: section.taskImage,
        alt: section.taskImageAlt ?? '',
        caption: section.taskCaption,
      });
    }
    section.gifs.forEach((pair, pairIndex) => {
      pair.forEach((src, slot) => {
        items.push({
          src,
          alt: section.alts?.[pairIndex]?.[slot] ?? '',
          caption: section.captions[pairIndex],
        });
      });
    });
  }

  return items;
}

/**
 * The page's sections, by the ids their headings carry (see CaseStudyList,
 * ProjectVideoPlayer, CaseStudySection and ProblemCards).
 */
export function tocEntries(
  project: ProjectDetails,
  text: UiStrings['portfolio'],
): TocEntry[] {
  const entries: TocEntry[] = [];
  const has = (list?: unknown[]) => Boolean(list && list.length > 0);

  if (has(project.context)) {
    entries.push({ id: 'case-study-context', label: text.context });
  }
  project.videos?.forEach((video, index) => {
    entries.push({ id: `case-study-video-${index + 1}`, label: video.title });
  });
  project.sections?.forEach((section, index) => {
    entries.push({
      id: `case-study-section-${index + 1}`,
      label: section.task,
    });
  });
  if (has(project.problems)) {
    entries.push({ id: 'case-study-problems', label: text.problems });
  }
  if (has(project.results)) {
    entries.push({ id: 'case-study-results', label: text.results });
  }
  if (has(project.lessons)) {
    entries.push({ id: 'case-study-lessons', label: text.lessons });
  }

  return entries;
}
