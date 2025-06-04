import React, { useRef } from 'react';
import './Library.css';

function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  const tabRefs = useRef([]);

  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowRight') {
      const nextIndex = (index + 1) % categories.length;
      tabRefs.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowLeft') {
      const prevIndex = (index - 1 + categories.length) % categories.length;
      tabRefs.current[prevIndex]?.focus();
    }
  };

  return (
    <div className="category-scroll-wrapper">
      <div
        className="category-filter"
        role="tablist"
        aria-label="Routine categories"
      >
        {categories.map((category, index) => (
          <button
            key={category}
            role="tab"
            aria-selected={selectedCategory === category}
            tabIndex={selectedCategory === category ? 0 : -1}
            onClick={() => onSelectCategory(category)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={selectedCategory === category ? 'filter-btn active' : 'filter-btn'}
            aria-label={`Filter by ${category}`}
            ref={el => tabRefs.current[index] = el}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
