import openToWork from '@/data/openToWork';

export default function OpenToWork() {
  return (
    <section className="contact-open" aria-labelledby="contact-open-title">
      <h2 id="contact-open-title" className="contact-open-title">
        Open to work
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
