/**
 * Shared utility functions and constants
 */

import profile from '@/data/profile.json';

// Site configuration
export const SITE_URL = profile.url;
export const SITE_NAME = profile.siteName;
export const AUTHOR_NAME = profile.name;
export const AUTHOR_ROLE = profile.role_01;
export const AUTHOR_PROYEARS = profile.professionalYears;
/** Public game-credits profile, so recruiters can check shipped credits. */
export const CREDITS_URL = profile.creditsUrl;
/**
 * The portrait. Used for JSON-LD `image`, where the value should be a picture
 * of the person, not a designed card.
 */
export const SITE_IMAGE_PATH = '/images/me.png';
export const SITE_IMAGE_DIMENSIONS = {
  width: 256,
  height: 256,
} as const;

/** The site's headline: the three roles, most important first. */
export const AUTHOR_HEADLINE = [
  profile.role_01,
  profile.role_02,
  profile.role_03,
].join(' · ');

// Canonical one-line bio, shared across page metadata, OpenGraph, and JSON-LD.
export const SITE_DESCRIPTION = `${profile.role_01}, ${profile.role_02} and ${profile.role_03}. ${profile.professionalYears} years in games and 3 console games for DreamWorks and Nickelodeon IPs, including TMNT: Mutants Unleashed.`;
export const SITE_DESCRIPTION_ES = `${profile.role_01}, ${profile.role_02} y ${profile.role_03}. ${profile.professionalYears} años en la industria y 3 juegos de consola con licencias de DreamWorks y Nickelodeon, entre ellos TMNT: Mutants Unleashed.`;

/** When this build ran: the footer's "last updated" date. */
export const SITE_UPDATED = new Date();

// Image dimension constants
export const PROJECT_IMAGE = {
  width: 600,
  height: 400,
} as const;

// Skill competency
export const MAX_COMPETENCY = 5;

/**
 * Formats a date string to a human-readable format.
 * Parses as UTC to avoid timezone shifts.
 */
export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  // Parse as UTC to avoid timezone shifts
  const date = new Date(`${dateStr}T12:00:00`);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
