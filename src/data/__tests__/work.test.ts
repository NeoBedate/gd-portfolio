import { describe, expect, it } from 'vitest';

import work from '../resume/work';

describe('work data', () => {
  it('exports an array of positions', () => {
    expect(Array.isArray(work)).toBe(true);
    expect(work.length).toBeGreaterThan(0);
  });

  it('each position has required properties', () => {
    for (const job of work) {
      expect(job).toHaveProperty('companyId');
      expect(job).toHaveProperty('projectIds');


      expect(typeof job.companyId).toBe('string');
      expect(typeof job.projectIds).toBe('string');

    }
  });

  // it('startDate is a valid date string', () => {
  //   for (const job of work) {
  //     const date = new Date(job.startDate);
  //     expect(date.toString()).not.toBe('Invalid Date');
  //   }
  // });

  // it('endDate is valid when present', () => {
  //   for (const job of work) {
  //     if (job.endDate) {
  //       const date = new Date(job.endDate);
  //       expect(date.toString()).not.toBe('Invalid Date');
  //     }
  //   }
  // });

  // it('endDate is after startDate when present', () => {
  //   for (const job of work) {
  //     if (job.endDate) {
  //       const start = new Date(job.startDate);
  //       const end = new Date(job.endDate);
  //       expect(end.getTime()).toBeGreaterThan(start.getTime());
  //     }
  //   }
  // });

  // it('urls are valid', () => {
  //   const urlRegex = /^https?:\/\/.+/;

  //   for (const job of work) {
  //     expect(job.url).toMatch(urlRegex);
  //   }
  // });

  // // Resume should show at least one current/active position
  // it('has at least one current position (no endDate)', () => {
  //   const currentJobs = work.filter((job) => !job.endDate);
  //   expect(currentJobs.length).toBeGreaterThanOrEqual(1);
  // });

  // This used to be 'hightlights' but when I changed the RESUME page, the highlights
  // went into the Project interface as projectHighlights
  it('projects are arrays when present', () => {
    for (const job of work) {
      if (job.projectIds) {
        expect(Array.isArray(job.projectIds)).toBe(true);
        expect(job.projectIds.length).toBeGreaterThan(0);
      }
    }
  });

  // it('has positions from different years', () => {
  //   const years = work.map((job) => new Date(job.startDate).getFullYear());
  //   const uniqueYears = new Set(years);

  //   // Resume should contain work from multiple years
  //   expect(uniqueYears.size).toBeGreaterThan(1);
  // });

  // it('company names are non-empty', () => {
  //   for (const job of work) {
  //     expect(job.name.trim().length).toBeGreaterThan(0);
  //   }
  // });
});
