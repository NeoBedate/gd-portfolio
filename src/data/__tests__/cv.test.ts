import fs from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import companies from '../companies';
import { cvDownloads, cvTools, cvVariants } from '../cv';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

/** True only with the exact casing, as on the Linux host. */
function publicFileExists(publicPath: string): boolean {
  const file = path.join(PUBLIC_DIR, publicPath);
  return (
    fs.existsSync(file) &&
    fs.readdirSync(path.dirname(file)).includes(path.basename(file))
  );
}

const jobs = cvVariants.flatMap((variant) => variant.jobs);

describe('CV data', () => {
  it('has a Level Design and a Production CV, Level Design first', () => {
    expect(cvVariants.map((v) => v.id)).toEqual(['level-design', 'production']);
    expect(cvDownloads[0].label).toBe('Level Design');
  });

  it('names each PDF after the person and the role, and has it built', () => {
    for (const cv of cvDownloads) {
      expect(cv.fileName).toMatch(
        /^Santiago-Rodriguez-Bedate_[A-Za-z-]+_CV\.pdf$/,
      );
      // Run `npm run cv` after editing src/data/cv.ts.
      expect(publicFileExists(cv.href)).toBe(true);
    }
  });

  it('uses the same dates as the Experience page', () => {
    for (const job of jobs) {
      const company = companies.find((c) => c.id === job.companyId);

      expect(company, job.companyId).toBeDefined();
      expect(job.start).toBe(company?.startDate.slice(0, 7));
      expect(job.end).toBe(company?.endDate?.slice(0, 7));
    }
  });

  it('shows tool icons in the legend order, and only tools in the legend', () => {
    for (const job of jobs) {
      const inLegendOrder = cvTools.filter((id) => job.tools.includes(id));
      expect(job.tools).toEqual(inLegendOrder);
    }
  });

  it('has a logo file for every job', () => {
    for (const job of jobs) {
      expect(publicFileExists(job.logo), job.logo).toBe(true);
    }
  });
});
