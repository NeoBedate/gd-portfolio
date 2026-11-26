import type { Metadata } from 'next';

import EmailLink from '@/components/Contact/EmailLink';
import OpenToWork from '@/components/Contact/OpenToWork';
import CvLinks from '@/components/Template/CvLinks';
import PageWrapper from '@/components/Template/PageWrapper';
import TrackedLink from '@/components/Template/TrackedLink';
import { analyticsEvents } from '@/data/analytics';
import contact from '@/data/contact';
import profile from '@/data/profile.json';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Contact',
  description: `Contact ${profile.name} via email at ${profile.email}.`,
  path: '/contact/',
});

const linkedIn = contact.find((item) => item.label === 'LinkedIn');

export default function ContactPage() {
  return (
    <PageWrapper hideFooter mainClassName="page-main--contact">
      <section className="contact-page">
        <header className="contact-header">
          <h1 className="page-title">Get in Touch</h1>
        </header>

        <div className="contact-content">
          <div className="contact-email-block">
            <EmailLink />
            <p className="contact-hint">Usually respond within 24 hours</p>
            {linkedIn ? (
              <p className="contact-alt">
                Or find me on{' '}
                <TrackedLink
                  href={linkedIn.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  event={analyticsEvents.linkedIn}
                  eventData={{ from: 'contact' }}
                >
                  LinkedIn<span className="sr-only"> (opens in new tab)</span>
                </TrackedLink>
              </p>
            ) : null}
            <CvLinks className="contact-alt" from="contact" />
          </div>

          <OpenToWork />
        </div>
      </section>
    </PageWrapper>
  );
}
