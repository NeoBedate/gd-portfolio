import fs from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { currently, featuredGames, stats, strengths } from '../home';
import projects from '../projects';

/** True only with the exact casing, as on the Linux host. */
function publicFileExists(publicPath: string): boolean {
  const file = path.join(process.cwd(), 'public', publicPath);
  return (
    fs.existsSync(file) &&
    fs.readdirSync(path.dirname(file)).includes(path.basename(file))
  );
}

describe('home data', () => {
  it('features three games that exist in projects', () => {
    expect(featuredGames).toHaveLength(3);
    for (const game of featuredGames) {
      expect(projects.some((p) => p.id === game.projectId)).toBe(true);
    }
  });

  it('has key art for every featured game, as WebP', () => {
    for (const game of featuredGames) {
      expect(game.image).toMatch(/\.webp$/);
      expect(publicFileExists(game.image)).toBe(true);
    }
  });

  it('gives every featured game an IP owner, a publisher and a fact', () => {
    for (const game of featuredGames) {
      expect(game.ip).not.toBe('');
      expect(game.publisher).not.toBe('');
      expect(game.facts.length).toBeGreaterThan(0);
    }
  });

  it('labels every number, once', () => {
    const labels = stats.map((s) => s.label);

    expect(new Set(labels).size).toBe(labels.length);
    for (const stat of stats) {
      expect(stat.value).not.toBe('');
    }
  });

  it('has three strengths and something current', () => {
    expect(strengths).toHaveLength(3);
    expect(currently.length).toBeGreaterThan(0);
  });
});
