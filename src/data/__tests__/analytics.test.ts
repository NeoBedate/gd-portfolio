import { describe, expect, it } from 'vitest';
import { umami } from '../analytics';
import profile from '../profile.json';

describe('analytics config', () => {
  it('loads the Umami Cloud script over HTTPS', () => {
    expect(umami.scriptUrl).toBe('https://cloud.umami.is/script.js');
  });

  it('has a website ID in UUID form', () => {
    expect(umami.websiteId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
    );
  });

  it('only counts visits on the live domain', () => {
    const liveHost = new URL(profile.url).hostname;

    expect(umami.domains).toContain(liveHost);
    expect(umami.domains).not.toContain('localhost');
    for (const domain of umami.domains) {
      expect(domain).not.toMatch(/vercel\.app$/);
    }
  });
});
