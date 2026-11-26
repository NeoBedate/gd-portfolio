import React from 'react';

interface CategoryButtonProps {
  /** The category's key, passed back on click. */
  label: string;
  /** What the button shows; defaults to the key. */
  text?: string;
  handleClick: (label: string) => void;
  active: Record<string, boolean>;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  handleClick,
  active,
  label,
  text = label,
}) => (
  <button
    className={`skillbutton ${active[label] ? 'skillbutton-active' : ''}`}
    type="button"
    onClick={() => handleClick(label)}
    aria-pressed={active[label]}
  >
    {text}
  </button>
);

export default CategoryButton;
