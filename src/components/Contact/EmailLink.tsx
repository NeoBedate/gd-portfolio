import TrackedLink from '@/components/Template/TrackedLink';
import { analyticsEvents } from '@/data/analytics';
import Profile from '@/data/profile.json';

/**
 * The contact address, shown in full as a mailto link.
 *
 * The template this site started from animated greetings ("hola", "hello"…)
 * in front of a custom domain. With a full mailbox address that produced
 * addresses like "holaname@gmail.com", so the address is now shown as is.
 */
export default function EmailLink() {
  return (
    <div className="contact-email-container">
      <TrackedLink
        href={`mailto:${Profile.email}`}
        className="contact-email-link"
        event={analyticsEvents.email}
        eventData={{ from: 'contact' }}
      >
        <span className="contact-email-domain">{Profile.email}</span>
      </TrackedLink>
    </div>
  );
}
