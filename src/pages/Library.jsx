import React, { useState, useEffect, useMemo, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackToTopButton from '../components/BackToTopButton';
import Fuse from 'fuse.js';
import libraryItems from '../data/libraryData';
import LibraryRoutineCard from '../components/LibraryRoutineCard';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import { mapSearchTermToCategory } from '../utils/searchHelpers';
import './Library.css';
import { SortAsc, ChevronLeft, ChevronRight } from 'lucide-react';

function Library({ onAddRoutine, routines }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFading, setIsFading] = useState(false);
  const [hasPageChanged, setHasPageChanged] = useState(false);

  const itemsPerPage = 6;
  const navigate = useNavigate();

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleCategorySelect = (category) => setSelectedCategory(category);
  const handleSortChange = (e) => setSortOption(e.target.value);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setIsFading(true);
      setTimeout(() => {
        setCurrentPage(newPage);
        setIsFading(false);
        setHasPageChanged(true);
      }, 200);
    }
  };

  useLayoutEffect(() => {
    if (hasPageChanged) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setHasPageChanged(false);
    }
  }, [hasPageChanged]);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(libraryItems.map(r => r.category));
    return ['All', ...uniqueCategories];
  }, []);

  const fuseSearch = useMemo(() => new Fuse(libraryItems, {
    includeScore: true,
    threshold: 0.3,
    minMatchCharLength: 2,
    ignoreLocation: true,
    keys: [
      { name: 'title', weight: 0.5 },
      { name: 'description', weight: 0.3 },
      { name: 'category', weight: 0.2 }
    ]
  }), []);

  const filteredRoutines = useMemo(() => {
    let results = libraryItems;

    if (searchTerm.trim()) {
      const expanded = mapSearchTermToCategory(searchTerm.trim());
      results = fuseSearch.search(expanded)
        .sort((a, b) => a.score - b.score)
        .map(res => res.item);
    } else if (selectedCategory !== 'All') {
      results = results.filter(r => r.category === selectedCategory);
    }

    if (sortOption === 'az') {
      results = [...results].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'za') {
      results = [...results].sort((a, b) => b.title.localeCompare(a.title));
    }

    return results;
  }, [searchTerm, selectedCategory, sortOption, fuseSearch]);

  const totalPages = Math.ceil(filteredRoutines.length / itemsPerPage);
  const paginatedRoutines = filteredRoutines.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortOption]);

  return (
    <main className="library-page" role="main" aria-labelledby="library-heading">
      <div className="library-top minimal">
        <h1 id="library-heading" className="library-heading">Explore Library</h1>
        <p className="library-subheading">Browse, preview, and add routines to your plan.</p>

        <SearchBar value={searchTerm} onChange={handleSearchChange} />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />

        <div className="sort-dropdown">
          <label htmlFor="sort">
            <SortAsc size={18} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} aria-hidden="true" />
            Sort by:
          </label>
          <select id="sort" value={sortOption} onChange={handleSortChange} aria-label="Sort routines">
            <option value="default">Default</option>
            <option value="az">A–Z</option>
            <option value="za">Z–A</option>
          </select>
        </div>

        <p className="results-count" aria-live="polite">
          Showing {filteredRoutines.length} {filteredRoutines.length === 1 ? 'result' : 'results'}
        </p>
      </div>

      {filteredRoutines.length === 0 ? (
        <p style={{ marginTop: '2rem', fontStyle: 'italic' }} role="alert">
          No routines found. Try a different keyword or category.
        </p>
      ) : (
        <div className={`routine-results ${isFading ? 'fade-out' : ''}`} role="region" aria-label="Routine results">
          {paginatedRoutines.map((routine) => (
            <div key={routine.id} role="group" aria-label={`Routine titled ${routine.title}, category ${routine.category}.`}>
              <LibraryRoutineCard
                routine={routine}
                isAlreadyAdded={routines.some(r => r.id === routine.id)}
                onAddRoutine={() => onAddRoutine(routine)}
                onNavigate={() => navigate(`/routine/${routine.id}`)}
                onNavigateToRoutines={() =>
                  window.dispatchEvent(new CustomEvent('navigate', { detail: 'Routines' }))
                }
              />
            </div>
          ))}
        </div>
      )}

      {filteredRoutines.length > itemsPerPage && (
        <nav className="pagination-controls" role="navigation" aria-label="Pagination">
          <button
            className="pagination-button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <ChevronLeft size={20} />
          </button>

          <span className="pagination-text" aria-live="polite">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="pagination-button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <ChevronRight size={20} />
          </button>
        </nav>
      )}

      <BackToTopButton />
    </main>
  );
}

export default Library;
