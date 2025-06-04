import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRefyn } from '../context/RefynContext';
import './Library.css';

function LibraryRoutineCard({ routine }) {
  const navigate = useNavigate();
  const { routines, handleAddRoutine } = useRefyn();


  const isAlreadyAdded = routines.some(r => r.id === routine.id);

  const handleNavigateToRoutines = () => {
    navigate('/routines');
  };

  return (
    <article
      className="library-card"
      tabIndex="0"
      role="group"
      aria-labelledby={`routine-title-${routine.id}`}
      aria-describedby={`routine-desc-${routine.id}`}
    >
      <h3 id={`routine-title-${routine.id}`}>{routine.title}</h3>
      <p className="category-pill">{routine.category}</p>
      <p className="description" id={`routine-desc-${routine.id}`}>{routine.description}</p>

      <div className="library-button-row">
        <button
          type="button"
          onClick={() => navigate(`/routine/${routine.id}`)}
          className="btn-secondary"
          aria-label={`View more details about ${routine.title}`}
        >
          View Details
        </button>

        {isAlreadyAdded ? (
          <div className="added-pill" role="status" aria-live="polite">
            ✔ Added to{' '}
            <button
              type="button"
              onClick={handleNavigateToRoutines}
              className="go-link"
              aria-label={`Go to your routines to view ${routine.title}`}
            >
              Routines
            </button>
          </div>
        ) : (
          <button
            type="button"
         onClick={() => handleAddRoutine(routine)}

            className="btn-primary"
            aria-label={`Add ${routine.title} to My Routines`}
          >
            + Add to My Routines
          </button>
        )}
      </div>
    </article>
  );
}

export default LibraryRoutineCard;
