import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import TrackedLink from '@/components/Template/TrackedLink';
import { type AnalyticsEvent, analyticsEvents } from '@/data/analytics';
import data from '@/data/contact';

/** The channels worth counting: a recruiter reaching out. */
const EVENTS: Record<string, AnalyticsEvent> = {
  LinkedIn: analyticsEvents.linkedIn,
  Email: analyticsEvents.email,
};

const ContactIcons: React.FC = () => (
  <ul className="icons">
    {data.map((s) => {
      const event = EVENTS[s.label];
      const icon = <FontAwesomeIcon icon={s.icon} />;

      return (
        <li key={s.label}>
          {event ? (
            <TrackedLink
              href={s.link}
              aria-label={s.label}
              event={event}
              eventData={{ from: 'footer' }}
            >
              {icon}
            </TrackedLink>
          ) : (
            <a href={s.link} aria-label={s.label}>
              {icon}
            </a>
          )}
        </li>
      );
    })}
  </ul>
);

export default ContactIcons;
