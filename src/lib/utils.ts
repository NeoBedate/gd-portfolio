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

// Canonical one-line bio, shared across page metadata, OpenGraph, and JSON-LD.
export const SITE_DESCRIPTION =
  'Design lead with 13+ years of experience working with Unity, both in academic and professional environments.';

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
