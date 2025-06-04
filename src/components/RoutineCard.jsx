// ✅ RoutineCard.jsx — now using context for delete and frequency
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import ConfirmDialog from './ConfirmDialog';
import { useRefyn } from '../context/RefynContext';
import './RoutineCard.css';

const FREQUENCY_OPTIONS = [
  'Daily',
  'Every other day',
  '2x per week',
  '3x per week',
  '4x per week',
  'Weekends only',
  'Weekdays only'
];

function RoutineCard({ routine }) {
  const navigate = useNavigate();
  const { handleDeleteRoutine, handleUpdateFrequency } = useRefyn();

  const [showConfirm, setShowConfirm] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const taskCount = routine.tasks?.length || 0;

  const getNextDay = (frequency) => {
    const today = new Date();
    const weekday = today.getDay();
    switch (frequency) {
      case 'Daily': return 'Tomorrow';
      case 'Every other day': return 'In 2 days';
      case 'Weekends only': return (weekday === 6 || weekday === 0) ? 'Today' : 'Saturday';
      case 'Weekdays only': return (weekday >= 1 && weekday <= 4) ? 'Tomorrow' : 'Monday';
      default: return 'This week';
    }
  };

  const nextDay = getNextDay(routine.frequency || 'Daily');

  const handleDelete = () => {
    setFadeOut(true);
    setTimeout(() => {
      handleDeleteRoutine(routine.id);
    }, 300);
  };

  const handleFrequencyChange = (e) => {
    handleUpdateFrequency(routine.id, e.target.value);
  };

  return (
    <div
      className={`routine-item ${fadeOut ? 'fade-out' : ''}`}
      role="region"
      aria-labelledby={`routine-title-${routine.id}`}
    >
      <div className="routine-top">
        <h3 id={`routine-title-${routine.id}`} className="routine-title">
          {routine.title}
        </h3>
        <button
          className="delete-btn"
          onClick={() => setShowConfirm(true)}
          aria-label={`Delete routine "${routine.title}"`}
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="routine-meta">
        <span className="routine-count">
          {taskCount} {taskCount === 1 ? 'task' : 'tasks'}
        </span>
        <span className="routine-next">
          Next: <strong tabIndex={0} className={nextDay === "Today" ? "highlight-today" : ""}>{nextDay}</strong>
        </span>
      </div>

      <div className="routine-actions">
        <div className="routine-frequency">
          <label htmlFor={`freq-${routine.id}`}>Frequency:</label>
          <select
            id={`freq-${routine.id}`}
            value={routine.frequency || 'Daily'}
            onChange={handleFrequencyChange}
            aria-describedby={`freq-desc-${routine.id}`}
          >
            {FREQUENCY_OPTIONS.map(freq => (
              <option key={freq} value={freq}>{freq}</option>
            ))}
          </select>
          <small id={`freq-desc-${routine.id}`} className="sr-only">
            Select how often you want to repeat this routine
          </small>
        </div>

        <button
          className="view-btn"
          onClick={() => navigate(`/routine/${routine.id}`)}
          aria-label={`Edit tasks in routine "${routine.title}"`}
        >
          Edit Tasks
        </button>
      </div>

      {showConfirm && (
        <ConfirmDialog
          message={`Are you sure you want to delete "${routine.title}"?`}
          onCancel={() => setShowConfirm(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

export default RoutineCard;
