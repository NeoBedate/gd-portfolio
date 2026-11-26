import { describe, expect, it } from 'vitest';

import companies from '../companies';
import work from '../experience/work';
import projects from '../projects';

describe('work data', () => {
  it('exports an array of positions', () => {
    expect(Array.isArray(work)).toBe(true);
    expect(work.length).toBeGreaterThan(0);
  });

  it('each position has a company id and a non-empty project list', () => {
    for (const job of work) {
      expect(typeof job.companyId).toBe('string');
      expect(Array.isArray(job.projectIds)).toBe(true);
      expect(job.projectIds.length).toBeGreaterThan(0);
    }
  });

  it('every company id exists in companies', () => {
    const companyIds = new Set(companies.map((c) => c.id));

    for (const job of work) {
      expect(companyIds.has(job.companyId)).toBe(true);
    }
  });

  it('every project id exists in projects', () => {
    const projectIds = new Set(projects.map((p) => p.id));

    for (const job of work) {
      for (const id of job.projectIds) {
        expect(projectIds.has(id)).toBe(true);
      }
    }
  });

  it('company dates are valid and in order', () => {
    for (const company of companies) {
      const start = new Date(company.startDate);

      expect(Number.isNaN(start.getTime())).toBe(false);
      // No end date means the role is ongoing.
      if (company.endDate === undefined) continue;

      const end = new Date(company.endDate);
      expect(Number.isNaN(end.getTime())).toBe(false);
      expect(end.getTime()).toBeGreaterThan(start.getTime());
    }
  });

  it('only the most recent role is ongoing, and nothing starts in the future', () => {
    const ongoing = companies.filter((c) => c.endDate === undefined);
    const latestStart = Math.max(
      ...companies.map((c) => new Date(c.startDate).getTime()),
    );

    expect(ongoing.length).toBeLessThanOrEqual(1);
    for (const company of ongoing) {
      expect(new Date(company.startDate).getTime()).toBe(latestStart);
    }
    expect(latestStart).toBeLessThanOrEqual(Date.now());
  });

  it('lists the most recent role first', () => {
    const first = companies.find((c) => c.id === work[0].companyId);
    const latestStart = Math.max(
      ...companies.map((c) => new Date(c.startDate).getTime()),
    );

    expect(new Date(first?.startDate ?? '').getTime()).toBe(latestStart);
  });
});
