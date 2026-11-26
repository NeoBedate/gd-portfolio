import Link from 'next/link';

import { portfolioHref } from '@/components/Projects/projectSlug';
import { featuredGames } from '@/data/home';
import projects from '@/data/projects';

export default function FeaturedGames() {
  return (
    <section className="home-section" aria-labelledby="home-featured-title">
      <header className="home-section-header">
        <h2 id="home-featured-title" className="home-section-kicker">
          Selected work
        </h2>
        <Link href="/portfolio" className="home-section-all">
          All projects <span aria-hidden="true">→</span>
        </Link>
      </header>

      <ul className="home-featured-list">
        {featuredGames.map((game) => {
          const project = projects.find((p) => p.id === game.projectId);
          if (!project) return null;

          return (
            <li key={game.projectId} className="home-featured-tile">
              {/* biome-ignore lint/performance/noImgElement: Using native img to avoid next/image runtime overhead for static export */}
              <img
                className="home-featured-image"
                src={game.image}
                alt=""
                width={960}
                height={540}
                loading="lazy"
                decoding="async"
              />
              <p className="home-featured-meta">
                {game.ip} · {game.publisher}
              </p>
              <h3 className="home-featured-name">
                {/* The link covers the whole tile (see home.css). */}
                <Link
                  href={portfolioHref(project.id)}
                  className="home-featured-link"
                >
                  {project.name.trim()}
                </Link>
              </h3>
              <p className="home-featured-role">{project.position}</p>
              <ul className="home-featured-facts">
                {game.facts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
