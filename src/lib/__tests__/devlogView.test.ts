import { describe, expect, it } from 'vitest';

import { devlogStaticParams, resolveDevlogView } from '../devlogView';

describe('devlog route', () => {
  it('always builds the index, so an empty devlog still exports', () => {
    expect(devlogStaticParams()[0]).toEqual({ path: [] });
    expect(resolveDevlogView([])?.kind).toBe('index');
    expect(resolveDevlogView(undefined)?.kind).toBe('index');
  });

  it('builds a page for every path it lists', () => {
    for (const { path } of devlogStaticParams()) {
      expect(
        resolveDevlogView(path),
        `/devlog/${path.join('/')}`,
      ).not.toBeNull();
    }
  });

  it('has nothing at unknown or over-deep paths', () => {
    expect(resolveDevlogView(['not-a-project'])).toBeNull();
    expect(resolveDevlogView(['ue5-level', 'not-an-update'])).toBeNull();
    expect(resolveDevlogView(['ue5-level', 'week-01', 'extra'])).toBeNull();
  });
});
