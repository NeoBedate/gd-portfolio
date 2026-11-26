import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { featuredGames, philosophy, stats, strengths } from '@/data/home';
import projects from '@/data/projects';

import FeaturedGames from '../../Home/FeaturedGames';
import NumbersStrip from '../../Home/NumbersStrip';
import WhatIBring from '../../Home/WhatIBring';

describe('FeaturedGames', () => {
  it('shows one tile per featured game, each linking to its own detail', () => {
    render(<FeaturedGames />);

    const tiles = document.querySelectorAll('.home-featured-tile');
    expect(tiles).toHaveLength(featuredGames.length);

    expect(
      screen.getByRole('link', { name: /teenage mutant ninja turtles/i }),
    ).toHaveAttribute('href', '/portfolio#tmnt');
    expect(screen.getByRole('link', { name: /dragons/i })).toHaveAttribute(
      'href',
      '/portfolio#dragons',
    );
    expect(screen.getByRole('link', { name: /spirit/i })).toHaveAttribute(
      'href',
      '/portfolio#spirit',
    );
  });

  it('names the IP owner, the publisher and my role on each tile', () => {
    render(<FeaturedGames />);

    const tiles = document.querySelectorAll<HTMLElement>('.home-featured-tile');
    featuredGames.forEach((game, index) => {
      const tile = within(tiles[index]);
      const project = projects.find((p) => p.id === game.projectId);

      expect(
        tile.getByText(`${game.ip} · ${game.publisher}`),
      ).toBeInTheDocument();
      expect(tile.getByText(project?.position ?? '')).toBeInTheDocument();
      for (const fact of game.facts) {
        expect(tile.getByText(fact)).toBeInTheDocument();
      }
    });
  });

  it('links to the whole portfolio', () => {
    render(<FeaturedGames />);

    expect(screen.getByRole('link', { name: /all projects/i })).toHaveAttribute(
      'href',
      '/portfolio',
    );
  });
});

describe('NumbersStrip', () => {
  it('pairs every number with what it counts', () => {
    render(<NumbersStrip />);

    const terms = screen.getAllByRole('term');
    const values = screen.getAllByRole('definition');
    expect(terms).toHaveLength(stats.length);

    stats.forEach((stat, index) => {
      expect(terms[index]).toHaveTextContent(stat.label);
      expect(values[index]).toHaveTextContent(stat.value);
    });
  });
});

describe('WhatIBring', () => {
  it('shows the design philosophy and the three strengths', () => {
    render(<WhatIBring />);

    expect(screen.getByText(philosophy)).toBeInTheDocument();
    for (const strength of strengths) {
      expect(
        screen.getByRole('heading', { level: 3, name: strength.title }),
      ).toBeInTheDocument();
      expect(screen.getByText(strength.body)).toBeInTheDocument();
    }
  });
});
