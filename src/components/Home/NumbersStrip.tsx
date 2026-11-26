import { stats } from '@/data/home';

export default function NumbersStrip() {
  return (
    <section className="home-section" aria-labelledby="home-stats-title">
      <header className="home-section-header">
        <h2 id="home-stats-title" className="home-section-kicker">
          By the numbers
        </h2>
      </header>

      {/* Label first in the markup, so screen readers announce what each
          number means; CSS shows the number on top. */}
      <dl className="home-stats-list">
        {stats.map((stat) => (
          <div key={stat.label} className="home-stat">
            <dt className="home-stat-label">{stat.label}</dt>
            <dd className="home-stat-value">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
