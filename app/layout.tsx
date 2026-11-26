import type { Metadata } from 'next';
import Script from 'next/script';

import { SiteSchema } from '@/components/Schema';
import Analytics from '@/components/Template/Analytics';
import Navigation from '@/components/Template/Navigation';
import ScrollToTop from '@/components/Template/ScrollToTop';
import SkipLink from '@/components/Template/SkipLink';
import { sharedOpenGraph } from '@/lib/metadata';
import {
  AUTHOR_NAME,
  AUTHOR_ROLE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from '@/lib/utils';
import { bricolage, jetbrainsMono, newsreader } from './fonts';
import './tailwind.css';

export const metadata: Metadata = {
  title: {
    default: `${AUTHOR_NAME} · ${AUTHOR_ROLE}`,
    template: `%s | ${AUTHOR_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    AUTHOR_NAME,
    'Game Designer',
    'Level Designer',
    'Producer',
    'Lead',
  ],
  authors: [{ name: AUTHOR_NAME }],
  creator: AUTHOR_NAME,
  metadataBase: new URL(SITE_URL),
  // The root is the origin of the share metadata, so it uses the same shared
  // blocks as every other page. Hand-writing them here is what left the
  // homepage advertising a different og:image:alt from the rest of the site
  // for the identical image.
  openGraph: {
    ...sharedOpenGraph,
    type: 'website',
    locale: 'en_US',
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    title: `${AUTHOR_NAME} · ${AUTHOR_ROLE}`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    googleBot: {
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* CSP-safe theme initialization - prevents flash on load. It also
            marks Spanish pages (/es/…) as such: the root layout is shared by
            both languages, so the static <html lang> is the English default. */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var p=window.location.pathname;if(p==='/es'||p.indexOf('/es/')===0){document.documentElement.lang='es'}}catch(e){}try{var t=window.localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t)}else if(window.matchMedia('(prefers-color-scheme:dark)').matches){document.documentElement.setAttribute('data-theme','dark')}else{document.documentElement.setAttribute('data-theme','light')}}catch(e){}})();`}
        </Script>
        <SiteSchema />
      </head>
      <body>
        <SkipLink />
        <ScrollToTop />
        <div className="site-wrapper">
          <Navigation />
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
