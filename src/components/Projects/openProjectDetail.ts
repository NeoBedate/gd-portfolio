/** The panel's open transition is 0.45s (.game-detail-wrap in portfolio.css). */
const OPEN_FALLBACK_MS = 600;

/**
 * Opens the project detail panel and scrolls its top into view.
 *
 * While the panel expands, the page below the cards is still short, so a
 * scroll started on click stops early at the old page height. On a phone that
 * left the panel below the fold. The scroll is therefore repeated once the
 * panel has finished opening. No scroll behaviour is passed, so the page's
 * own smooth scrolling and its reduced-motion override still apply.
 */
export function openProjectDetail(wrap: HTMLElement): void {
  const reveal = () => wrap.scrollIntoView({ block: 'start' });

  if (wrap.classList.contains('open')) {
    reveal();
    return;
  }

  wrap.classList.add('open');
  reveal();

  const onOpened = (event: Event) => {
    // Transitions inside the panel bubble up here too.
    if (event.target !== wrap) return;
    window.clearTimeout(fallback);
    wrap.removeEventListener('transitionend', onOpened);
    reveal();
  };

  const fallback = window.setTimeout(() => {
    wrap.removeEventListener('transitionend', onOpened);
    reveal();
  }, OPEN_FALLBACK_MS);

  wrap.addEventListener('transitionend', onOpened);
}
