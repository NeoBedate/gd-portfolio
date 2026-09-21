import type { Metadata } from 'next';
import { Raleway, Source_Sans_3 } from 'next/font/google';
import React from 'react';

import GoogleAnalytics from '@/components/Template/GoogleAnalytics';
import Navigation from '@/components/Template/Navigation';
import './tailwind.css';

const sourceSans = Source_Sans_3({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-source-sans',
  display: 'swap',
});

const raleway = Raleway({
  weight: ['400', '800', '900'],
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Santiago R. Bedate",
    template: "%s | Santiago R. Bedate",
  },
  description:
    'Professional creative at designing several action-oriented, kid-friendly video games for all platforms.',
  keywords: [
    "Santiago R. Bedate",
    'Game Designer',
    'Level Designer',
    'Producer',
    'Lead',
  ],
  authors: [{ name: "Santiago R. Bedate" }],
  creator: "Santiago R. Bedate",
  metadataBase: new URL('https://www.santibedate.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.santibedate.com',
    siteName: "Santiago Rodríguez Bedate",
    title: "Santiago Rodríguez Bedate",
    description:
      'Professional creative at designing several action-oriented, kid-friendly video games for all platforms.',
    images: [
      {
        url: '/images/me.jpg',
        width: 1200,
        height: 630,
        alt: "Santiago Rodríguez Bedate",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Inline script to prevent theme flash on load
const themeInitScript = `
(function() {
  try {
    var theme = localStorage.getItem('theme');
    if (theme === 'dark' || theme === 'light') {
      document.documentElement.setAttribute('data-theme', theme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${raleway.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <div className="site-wrapper">
          <Navigation />
          {children}
        </div>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
