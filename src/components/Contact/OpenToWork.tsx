import { t } from '@/data/i18n/ui';
import { openToWorkFor } from '@/data/localized';
import type { Lang } from '@/lib/i18n';

export default function OpenToWork({ lang = 'en' }: { lang?: Lang }) {
  const openToWork = openToWorkFor(lang);

  return (
    <section className="contact-open" aria-labelledby="contact-open-title">
      <h2 id="contact-open-title" className="contact-open-title">
        {t(lang).contact.openToWork}
      </h2>
      <dl className="contact-open-list">
        {openToWork.details.map((detail) => (
          <div key={detail.label} className="contact-open-row">
            <dt>{detail.label}</dt>
            <dd>{detail.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
