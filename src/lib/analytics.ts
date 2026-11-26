import type { AnalyticsEvent } from '@/data/analytics';

declare global {
  interface Window {
    /** Set by the Umami script (see components/Template/Analytics). */
    umami?: {
      track: (event: string, data?: Record<string, string>) => void;
    };
  }
}

/**
 * Sends a custom event to Umami. Does nothing when the script isn't loaded
 * (local builds, previews, blockers), and never throws into a click handler.
 */
export function trackEvent(
  event: AnalyticsEvent,
  data?: Record<string, string>,
): void {
  try {
    window.umami?.track(event, data);
  } catch {
    // Analytics must never break a link.
  }
}
