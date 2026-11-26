import Script from 'next/script';

import { umami } from '@/data/analytics';

/**
 * Umami's tracker. It counts page views, including client-side route
 * changes, and only on the domains listed in data/analytics.
 */
export default function Analytics() {
  return (
    <Script
      src={umami.scriptUrl}
      data-website-id={umami.websiteId}
      data-domains={umami.domains.join(',')}
      strategy="afterInteractive"
    />
  );
}
