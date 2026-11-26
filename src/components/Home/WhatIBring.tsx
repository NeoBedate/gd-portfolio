import { philosophy, strengths } from '@/data/home';

export default function WhatIBring() {
  return (
    <section className="home-section" aria-labelledby="home-strengths-title">
      <header className="home-section-header">
        <h2 id="home-strengths-title" className="home-section-kicker">
          What I bring
        </h2>
      </header>

      <p className="home-philosophy">{philosophy}</p>

      <ul className="home-strengths-list">
        {strengths.map((strength) => (
          <li key={strength.title} className="home-strength">
            <h3>{strength.title}</h3>
            <p>{strength.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
