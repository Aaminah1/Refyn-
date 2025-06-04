import React, { useState, useMemo, useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackToTopButton from '../components/BackToTopButton';
import RoutineCard from '../components/RoutineCard';
import { ChevronLeft, ChevronRight, SortAsc } from 'lucide-react';
import './Routines.css';

function Routines({ routines, trackerTasks, onDeleteRoutine, onUpdateFrequency }) {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [isFading, setIsFading] = useState(false);
  const [hasPageChanged, setHasPageChanged] = useState(false);
  const [sortOption, setSortOption] = useState('recent');

  const itemsPerPage = 6;

  const sortedRoutines = useMemo(() => {
    let sorted = [...routines];
    if (sortOption === 'alphabetical') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'newest') {
      sorted.reverse();
    } else if (sortOption === 'oldest') {
      // already sorted by creation by default
    }
    return sorted;
  }, [routines, sortOption]);

  const totalPages = Math.ceil(sortedRoutines.length / itemsPerPage);

  const paginatedRoutines = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedRoutines.slice(start, start + itemsPerPage);
  }, [sortedRoutines, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [routines.length]);

  useLayoutEffect(() => {
    if (hasPageChanged) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setHasPageChanged(false);
    }
  }, [hasPageChanged]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setIsFading(true);
      setTimeout(() => {
        setCurrentPage(page);
        setIsFading(false);
        setHasPageChanged(true);
      }, 200);
    }
  };

  const navigateToLibrary = () => navigate('/library');

  return (
    <div className="routines-page" role="main" aria-labelledby="routines-heading">
      <div className="library-top subtle">
        <h1 id="routines-heading" className="library-heading">Your Routines</h1>
        <p className="library-subheading">Edit frequency, view tasks, or remove them</p>

        <div className="sort-dropdown">
          <label htmlFor="sort-select">
            <SortAsc size={18} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} aria-hidden="true" />
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            aria-label="Sort routines"
          >
            <option value="recent">Default</option>
            <option value="alphabetical">A – Z </option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        <p className="routines-count">
          You’ve added <strong>{routines.length}</strong> {routines.length === 1 ? 'routine' : 'routines'}.
        </p>
      </div>

      {routines.length === 0 ? (
        <section aria-label="No routines added" className="no-routines-msg">
          <p>You haven’t added any routines yet. Add them from the library.</p>
        </section>
      ) : (
        <section
          className={`routine-results ${isFading ? 'fade-out' : ''}`}
          aria-label="List of user routines"
        >
          {paginatedRoutines.map((routine) => (
            <RoutineCard
              key={routine.id}
              routine={routine}
              trackerTasks={trackerTasks}
              onDelete={onDeleteRoutine}
              onFrequencyChange={onUpdateFrequency}
              onView={() =>
                window.dispatchEvent(new CustomEvent('navigate', {
                  detail: `/routine/${routine.id}`
                }))
              }
            />
          ))}
        </section>
      )}

      {routines.length > itemsPerPage && (
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

      <div className="fixed-library-button">
        <button
          onClick={navigateToLibrary}
          className="cta-button"
          aria-label="Add new routines from the library"
        >
          + Add From Library
        </button>
      </div>

      <BackToTopButton />
    </div>
  );
}

export default Routines;
