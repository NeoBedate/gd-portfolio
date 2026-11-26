import type { Lang } from '@/lib/i18n';

import Footer from './Footer';
import { MAIN_CONTENT_ID } from './mainContent';

export { MAIN_CONTENT_ID };

interface PageWrapperProps {
  children: React.ReactNode;
  fullPage?: boolean;
  hideFooter?: boolean;
  mainClassName?: string;
  lang?: Lang;
}

/**
 * Server component wrapper for page layout.
 * Provides consistent page structure with optional footer.
 * Relies on Next.js built-in scroll restoration for navigation.
 */
export default function PageWrapper({
  children,
  fullPage = false,
  hideFooter = false,
  mainClassName,
  lang = 'en',
}: PageWrapperProps) {
  return (
    <div className="page-container">
      <main
        id={MAIN_CONTENT_ID}
        tabIndex={-1}
        className={['page-main', mainClassName].filter(Boolean).join(' ')}
      >
        {children}
      </main>
      {!hideFooter && <Footer lang={lang} />}
    </div>
  );
}
