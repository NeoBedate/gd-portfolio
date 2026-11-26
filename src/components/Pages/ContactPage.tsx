import type { Metadata } from 'next';

import EmailLink from '@/components/Contact/EmailLink';
import OpenToWork from '@/components/Contact/OpenToWork';
import CvLinks from '@/components/Template/CvLinks';
import PageWrapper from '@/components/Template/PageWrapper';
import TrackedLink from '@/components/Template/TrackedLink';
import { analyticsEvents } from '@/data/analytics';
import contact from '@/data/contact';
import { t } from '@/data/i18n/ui';
import profile from '@/data/profile.json';
import type { Lang } from '@/lib/i18n';
import { createPageMetadata } from '@/lib/metadata';

const DESCRIPTION: Record<Lang, string> = {
  en: `Contact ${profile.name} via email at ${profile.email}.`,
  es: `Contacta con ${profile.name} por email en ${profile.email}.`,
};

export function contactMetadata(lang: Lang): Metadata {
  return createPageMetadata({
    title: t(lang).nav.contact,
    description: DESCRIPTION[lang],
    path: '/contact/',
    lang,
  });
}

const linkedIn = contact.find((item) => item.label === 'LinkedIn');

export default function ContactPage({ lang }: { lang: Lang }) {
  const text = t(lang);

  return (
    <PageWrapper hideFooter mainClassName="page-main--contact" lang={lang}>
      <section className="contact-page">
        <header className="contact-header">
          <h1 className="page-title">{text.contact.title}</h1>
        </header>

        <div className="contact-content">
          <div className="contact-email-block">
            <EmailLink />
            <p className="contact-hint">{text.contact.responseTime}</p>
            {linkedIn ? (
              <p className="contact-alt">
                {text.contact.findMeOn}{' '}
                <TrackedLink
                  href={linkedIn.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  event={analyticsEvents.linkedIn}
                  eventData={{ from: 'contact' }}
                >
                  LinkedIn
                  <span className="sr-only"> {text.opensInNewTab}</span>
                </TrackedLink>
              </p>
            ) : null}
            <CvLinks className="contact-alt" from="contact" lang={lang} />
          </div>

          <OpenToWork lang={lang} />
        </div>
      </section>
    </PageWrapper>
  );
}
