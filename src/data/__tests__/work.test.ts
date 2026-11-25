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
      const end = new Date(company.endDate);

      expect(Number.isNaN(start.getTime())).toBe(false);
      expect(Number.isNaN(end.getTime())).toBe(false);
      expect(end.getTime()).toBeGreaterThan(start.getTime());
    }
  });
});
