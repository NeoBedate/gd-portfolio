import Link from 'next/link';

import { t } from '@/data/i18n/ui';
import { homeContent, localizeProject } from '@/data/localized';
import projects from '@/data/projects';
import { caseStudyPath } from '@/lib/caseStudies';
import { type Lang, localizePath } from '@/lib/i18n';

export default function FeaturedGames({ lang = 'en' }: { lang?: Lang }) {
  const text = t(lang).home;
  const { featuredGames } = homeContent(lang);

  return (
    <section className="home-section" aria-labelledby="home-featured-title">
      <header className="home-section-header">
        <h2 id="home-featured-title" className="home-section-kicker">
          {text.selectedWork}
        </h2>
        <Link
          href={localizePath('/portfolio', lang)}
          className="home-section-all"
        >
          {text.allProjects} <span aria-hidden="true">→</span>
        </Link>
      </header>

      <ul className="home-featured-list">
        {featuredGames.map((game) => {
          const found = projects.find((p) => p.id === game.projectId);
          if (!found) return null;
          const project = localizeProject(found, lang);

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
                  href={localizePath(
                    project.slug ? caseStudyPath(project.slug) : '/portfolio/',
                    lang,
                  )}
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
