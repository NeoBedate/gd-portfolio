/**
 * File-name conventions for site media, kept out of any 'use client' module
 * so server components can call them too (a function exported from a client
 * module can only be rendered, not called, on the server).
 */

const VIDEO_EXTENSION = /\.(mp4|webm)$/i;

/** True for the looping clips that replaced the old GIFs. */
export function isVideo(src: string): boolean {
  return VIDEO_EXTENSION.test(src);
}

/** Each clip has a first-frame poster next to it: `clip.mp4` → `clip-poster.webp`. */
export function posterFor(src: string): string {
  return src.replace(VIDEO_EXTENSION, '-poster.webp');
}
