/**
 * Cookieless analytics with Umami Cloud: no cookies, no personal data, so
 * no consent banner. The website ID is public; it is in every page's source.
 * Dashboard: https://cloud.umami.is
 */
export const umami = {
  scriptUrl: 'https://cloud.umami.is/script.js',
  websiteId: 'add5fa02-9c8e-4678-9a57-64ff6703f0be',
  /** Count only the live site: local builds and Vercel previews are ignored. */
  domains: ['www.santibedate.com', 'santibedate.com'],
} as const;

/** Event names as they appear in the Umami dashboard. */
export const analyticsEvents = {
  cvDownload: 'CV download',
  linkedIn: 'LinkedIn',
  email: 'Email',
} as const;

export type AnalyticsEvent =
  (typeof analyticsEvents)[keyof typeof analyticsEvents];

/** Where on the site a tracked link sits, sent with each event. */
export type LinkPlacement = 'header' | 'hero' | 'contact' | 'footer';
