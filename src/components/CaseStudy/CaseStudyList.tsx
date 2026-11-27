interface CaseStudyListProps {
  /** Used for the heading's id, e.g. 'context'. */
  id: string;
  title: string;
  items?: string[];
}

/** A titled list of short points: context, results, lessons… */
export default function CaseStudyList({
  id,
  title,
  items,
}: CaseStudyListProps) {
  if (!items || items.length === 0) return null;
  const headingId = `case-study-${id}`;

  return (
    <section
      className="game-detail-section case-study-list"
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className="game-detail-section-title">
        {title}
      </h2>
      <ul className="game-detail-tasks case-study-list-items">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
