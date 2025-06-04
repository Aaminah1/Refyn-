import React from 'react';
import './Library.css';

function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="category-scroll-wrapper">
      <div
        className="category-filter"
        role="tablist"
        aria-label="Routine categories"
      >
        {categories.map((category) => (
          <button
            key={category}
            role="tab"
            aria-selected={selectedCategory === category}
            tabIndex={selectedCategory === category ? 0 : -1}
            onClick={() => onSelectCategory(category)}
            className={selectedCategory === category ? 'filter-btn active' : 'filter-btn'}
            aria-label={`Filter by ${category}`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
