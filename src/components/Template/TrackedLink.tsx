'use client';

import type { AnchorHTMLAttributes } from 'react';

import type { AnalyticsEvent } from '@/data/analytics';
import { trackEvent } from '@/lib/analytics';

interface TrackedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  event: AnalyticsEvent;
  eventData?: Record<string, string>;
}

/**
 * A plain link that also reports its click to Umami.
 *
 * Umami's own `data-umami-event` attribute cancels the click and then sets
 * `location.href`, which would open a CV PDF in place of the site instead of
 * downloading it. Tracking from onClick leaves the link's behaviour alone.
 */
export default function TrackedLink({
  event,
  eventData,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <a
      {...props}
      onClick={(e) => {
        trackEvent(event, eventData);
        onClick?.(e);
      }}
    />
  );
}
