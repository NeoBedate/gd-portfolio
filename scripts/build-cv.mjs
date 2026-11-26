/**
 * Prints the CV PDFs in public/cv/ from src/data/cv.ts.
 *
 *   npm run cv                 # every PDF (Level Design and Production,
 *                              # in English and Spanish)
 *   npm run cv -- --png <dir>  # also save a PNG preview of each page
 *
 * Uses Microsoft Edge (or the browser in CV_BROWSER) in headless mode, so
 * the PDF holds real, selectable text that applicant tracking systems can
 * read. Fonts: Segoe UI and Bahnschrift, which ship with Windows.
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faJira } from '@fortawesome/free-brands-svg-icons/faJira';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
import { faNotion } from '@fortawesome/free-brands-svg-icons/faNotion';
import { faUnity } from '@fortawesome/free-brands-svg-icons/faUnity';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';
import { faFileExcel } from '@fortawesome/free-regular-svg-icons/faFileExcel';
import { faFileLines } from '@fortawesome/free-regular-svg-icons/faFileLines';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const OUT_DIR = path.join(PUBLIC_DIR, 'cv');
const EDGE =
  process.env.CV_BROWSER ??
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';

/** The site's light-theme accent (--color-accent in tokens/colors.css). */
const ACCENT = '#1b2fbf';

const { cvContact, cvLocales, cvName, cvTools, cvVariants, toolNames } =
  await import(pathToFileURL(path.join(ROOT, 'src/data/cv.ts')).href);

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function faSvg({ icon }) {
  const [width, height, , , pathData] = icon;
  const paths = Array.isArray(pathData) ? pathData : [pathData];
  return `<svg viewBox="0 0 ${width} ${height}" aria-hidden="true">${paths
    .map((d) => `<path fill="currentColor" d="${d}"/>`)
    .join('')}</svg>`;
}

/**
 * Tools without a Font Awesome icon get a monogram. It is drawn to a PNG,
 * not set as text, so screening software doesn't read "Ps" or "C#" into
 * the company line. The legend at the bottom names every tool in text.
 */
async function monogram(text) {
  const size = 96;
  const fontSize = text.length > 1 ? 44 : 52;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <text x="50%" y="50%" dy="0.36em" text-anchor="middle" font-family="Segoe UI"
      font-weight="600" font-size="${fontSize}" fill="#ffffff">${text}</text>
  </svg>`;
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return `<img src="data:image/png;base64,${png.toString('base64')}" alt="">`;
}

const toolGlyphs = {
  unity: faSvg(faUnity),
  devops: await monogram('Do'),
  gdocs: faSvg(faFileLines),
  jira: faSvg(faJira),
  github: faSvg(faGithub),
  photoshop: await monogram('Ps'),
  notion: faSvg(faNotion),
  hacknplan: await monogram('H'),
  csharp: await monogram('C#'),
  excel: faSvg(faFileExcel),
};

const toolIcon = (id) => `<span class="tool">${toolGlyphs[id]}</span>`;

const contactIcons = {
  email: faSvg(faEnvelope),
  phone: `<svg viewBox="0 0 16 24" aria-hidden="true"><rect x="1.5" y="1.5" width="13" height="21" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="8" cy="18.5" r="1.4" fill="currentColor"/></svg>`,
  linkedin: faSvg(faLinkedinIn),
  site: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4.2" ry="10"/><path d="M2 12h20M4 6.5h16M4 17.5h16"/></svg>`,
  location: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 1.5a7.5 7.5 0 0 0-7.5 7.5c0 5.6 7.5 13.5 7.5 13.5s7.5-7.9 7.5-13.5A7.5 7.5 0 0 0 12 1.5zm0 10.3a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6z"/></svg>`,
};

// ---------------------------------------------------------------------------
// HTML
// ---------------------------------------------------------------------------

const escape = (text) =>
  String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

/** '2020-01' → 'January ’20' in English, 'enero 2020' in Spanish. */
function month(yyyyMm, lang) {
  const [year, monthNumber] = yyyyMm.split('-').map(Number);
  const name = cvLocales[lang].months[monthNumber - 1];
  return lang === 'es'
    ? `${name} ${year}`
    : `${name} ’${String(year).slice(2)}`;
}

/**
 * Logos are printed about 7 mm wide, so 160 px is plenty (over 500 dpi).
 * Embedding the 512 px originals tripled the size of each PDF.
 */
const logos = {};
for (const job of cvVariants.flatMap((variant) => variant.jobs)) {
  if (logos[job.logo]) continue;
  const png = await sharp(path.join(PUBLIC_DIR, job.logo))
    .resize(160, 160, { fit: 'contain', background: '#0000' })
    .png()
    .toBuffer();
  logos[job.logo] = `data:image/png;base64,${png.toString('base64')}`;
}

function renderJob(job, lang) {
  const dates = `${month(job.start, lang)} – ${
    job.end ? month(job.end, lang) : cvLocales[lang].present
  }`;
  const projects = (job.projects ?? [])
    .map(
      (project) => `
      <div class="project">
        <h4><span class="project-role">${escape(project.role)}</span>
          <span class="project-name">${escape(project.name)}</span></h4>
        <ul>${project.bullets.map((b) => `<li>${escape(b)}</li>`).join('')}</ul>
      </div>`,
    )
    .join('');
  const role = job.role ? `<p class="job-role">${escape(job.role)}</p>` : '';
  const bullets = job.bullets
    ? `<ul>${job.bullets.map((b) => `<li>${escape(b)}</li>`).join('')}</ul>`
    : '';

  return `
    <article class="job">
      <div class="job-bar">
        <h3 class="job-company">${escape(job.name)}</h3>
        <span class="job-tools">${cvTools
          .filter((id) => job.tools.includes(id))
          .map(toolIcon)
          .join('')}</span>
        <span class="job-dates">${dates}</span>
        <span class="job-logo"><img src="${logos[job.logo]}" alt=""></span>
      </div>
      <div class="job-body">${role}${bullets}${projects}</div>
    </article>`;
}

function renderCv(variant, css) {
  const locale = cvLocales[variant.lang];
  const contact = [
    [
      'email',
      `<a href="mailto:${cvContact.email}">${escape(cvContact.email)}</a>`,
    ],
    [
      'phone',
      `<a href="tel:${cvContact.phone.replaceAll(' ', '')}">${escape(cvContact.phone)}</a>`,
    ],
    [
      'linkedin',
      `<a href="${cvContact.linkedin.url}">${escape(cvContact.linkedin.label)}</a>`,
    ],
    ['site', `<a href="${locale.site.url}">${escape(locale.site.label)}</a>`],
    ['location', escape(locale.location)],
  ]
    .map(([key, html]) => `<li>${contactIcons[key]}<span>${html}</span></li>`)
    .join('');

  return `<!doctype html>
<html lang="${variant.lang}">
<head>
<meta charset="utf-8">
<title>${escape(`${cvName} · ${variant.title} · CV`)}</title>
<meta name="author" content="${escape(cvName)}">
<style>:root { --cv-accent: ${ACCENT}; }
${css}</style>
</head>
<body>
<main class="cv">
  <header class="cv-header">
    <h1>${escape(cvName)}</h1>
    <p class="cv-title">${escape(variant.title)}</p>
  </header>
  <ul class="cv-contact">${contact}</ul>

  <section>
    <h2>${escape(locale.headings.overview)}</h2>
    <p class="cv-overview">${escape(variant.overview)}</p>
  </section>

  <section>
    <h2>${escape(locale.headings.career)}</h2>
    ${variant.jobs.map((job) => renderJob(job, variant.lang)).join('')}
  </section>

  <div class="cv-bottom">
    <section>
      <h2>${escape(locale.headings.personal)}</h2>
      ${locale.personal.map((p) => `<p>${escape(p)}</p>`).join('')}
    </section>
    <div>
      <section>
        <h2>${escape(locale.headings.education)}</h2>
        <ul>${locale.education
          .map((e) => `<li>${escape(e.years)} | ${escape(e.text)}</li>`)
          .join('')}</ul>
      </section>
      <section>
        <h2>${escape(locale.headings.tools)}</h2>
        <ul class="cv-tools">${cvTools
          .map((id) => `<li>${toolIcon(id)}${escape(toolNames[id])}</li>`)
          .join('')}</ul>
      </section>
    </div>
  </div>
</main>
<script>
  // Read by assertFitsOnePage in the build script.
  document.fonts.ready.then(() => {
    const page = document.querySelector('.cv');
    document.documentElement.dataset.fits = String(
      page.scrollHeight <= page.clientHeight,
    );
  });
</script>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Print
// ---------------------------------------------------------------------------

/** Runs the browser headless and returns what it printed to stdout. */
function runBrowser(args) {
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'cv-browser-'));
  try {
    return execFileSync(
      EDGE,
      [
        '--headless=new',
        '--disable-gpu',
        '--no-first-run',
        '--no-default-browser-check',
        `--user-data-dir=${profile}`,
        ...args,
      ],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] },
    );
  } finally {
    fs.rmSync(profile, { recursive: true, force: true });
  }
}

/**
 * The page clips anything past one A4 page, so a CV that grows too long
 * would lose its last lines silently. The page's own script marks whether
 * the content fits; read that back from the rendered DOM.
 */
function assertFitsOnePage(htmlUrl, variant) {
  const dom = runBrowser(['--virtual-time-budget=3000', '--dump-dom', htmlUrl]);
  if (!dom.includes('data-fits="true"')) {
    console.error(
      `✗ The ${variant.id} CV (${variant.lang}) runs past one page. Shorten the text in src/data/cv.ts.`,
    );
    process.exit(1);
  }
}

if (!fs.existsSync(EDGE)) {
  console.error(`No browser at ${EDGE}. Set CV_BROWSER to a Chromium browser.`);
  process.exit(1);
}

const pngIndex = process.argv.indexOf('--png');
const pngDir = pngIndex > -1 ? path.resolve(process.argv[pngIndex + 1]) : null;

const css = fs.readFileSync(path.join(ROOT, 'scripts/cv.css'), 'utf8');
const buildDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cv-html-'));
fs.mkdirSync(OUT_DIR, { recursive: true });

for (const variant of cvVariants) {
  const name = `${variant.id}-${variant.lang}`;
  const htmlPath = path.join(buildDir, `${name}.html`);
  fs.writeFileSync(htmlPath, renderCv(variant, css));
  const htmlUrl = pathToFileURL(htmlPath).href;
  assertFitsOnePage(htmlUrl, variant);

  const pdfPath = path.join(OUT_DIR, variant.fileName);
  runBrowser(['--no-pdf-header-footer', `--print-to-pdf=${pdfPath}`, htmlUrl]);
  console.log(`✓ ${path.relative(ROOT, pdfPath)}`);

  if (pngDir) {
    fs.mkdirSync(pngDir, { recursive: true });
    const pngPath = path.join(pngDir, `${name}.png`);
    // A4 at 96 dpi is 794 × 1123 px; render it at twice that.
    runBrowser([
      '--window-size=794,1123',
      '--force-device-scale-factor=2',
      '--hide-scrollbars',
      `--screenshot=${pngPath}`,
      htmlUrl,
    ]);
    console.log(`  preview: ${pngPath}`);
  }
}

fs.rmSync(buildDir, { recursive: true, force: true });
