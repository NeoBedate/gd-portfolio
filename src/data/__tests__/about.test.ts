import { describe, expect, it } from 'vitest';

import { aboutMarkdown } from '../about';

describe('about data', () => {
  it('exports aboutMarkdown as a string', () => {
    expect(typeof aboutMarkdown).toBe('string');
    expect(aboutMarkdown.length).toBeGreaterThan(0);
  });

  it('contains the expected sections', () => {
    for (const heading of [
      '# Intro',
      '# Historical shenanigans',
      '# Non-gaming stuff',
      '# Life inspirations',
      '# I get around',
    ]) {
      expect(aboutMarkdown).toContain(heading);
    }
  });

  it('contains properly formatted headers', () => {
    const headers = aboutMarkdown.match(/^#+ .+$/gm);

    expect(headers).not.toBeNull();
    expect(headers?.length).toBeGreaterThanOrEqual(5);
  });

  it('markdown links point to absolute URLs', () => {
    const links = [...aboutMarkdown.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)];

    expect(links.length).toBeGreaterThan(0);
    for (const [, url] of links) {
      expect(url).toMatch(/^https?:\/\/\S+$/);
    }
  });

  it('contains no lines that were removed on purpose', () => {
    for (const removed of ['gallbladder', 'furries', 'this template']) {
      expect(aboutMarkdown).not.toContain(removed);
    }
  });
});
