import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import libraryItems from '../data/libraryData';
import './RoutineDetails.css';
import { ArrowLeft } from 'lucide-react';

function RoutineDetails({ routines, trackerTasks, onToggleTask, onAddRoutine }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const routine = libraryItems.find(r => r.id === Number(id));
  if (!routine) return <p role="alert">Routine not found.</p>;

  const isAlreadyAdded = routines.some(r => r.id === routine.id);
  const selectedTaskIds = trackerTasks.map(t => t.id);

  const handleSelectAll = () => {
    routine.tasks.forEach(task => {
      if (!selectedTaskIds.includes(task.id)) {
        onToggleTask(task, routine);
      }
    });
  };

  const handleDeselectAll = () => {
    routine.tasks.forEach(task => {
      if (selectedTaskIds.includes(task.id)) {
        onToggleTask(task, routine);
      }
    });
  };

  return (
    <div className="routine-details-container" role="region" aria-labelledby="routine-title">

    <div className="routine-header">
  <div className="routine-title-row">
    <button onClick={() => navigate(-1)} className="back-btn" aria-label="Go back">
      <ArrowLeft size={22} strokeWidth={2.2} />
    </button>
    <h1 id="routine-title" className="routine-title">{routine.title}</h1>
  </div>


        <span className="category-tag" role="note" aria-label={`Routine category: ${routine.category}`}>{routine.category}</span>
        <div className="routine-meta">
          <span><strong>Duration:</strong> {routine.duration}</span>
          <span><strong>Total Steps:</strong> {routine.totalSteps}</span>
          <span><strong>Effort:</strong> {routine.averageEffort}</span>
          <span><strong>Time per Task:</strong> {routine.timePerTask}</span>
        </div>
      </div>

      <p className="routine-description">{routine.description}</p>

      {!isAlreadyAdded && (
        <div className="sticky-routine-btn">
          <button onClick={() => onAddRoutine(routine)} className="cta-button" aria-label="Add this routine to My Routines">
            + Add to My Routines
          </button>
        </div>
      )}

      <h2 className="tasks-header" id="tasks-list-heading">Tasks</h2>
      <ul className="task-list" aria-labelledby="tasks-list-heading">
        {routine.tasks.map(task => (
          <li key={task.id} className="task-item">
            <div className="task-box">
              <div className="task-title-row">
                {isAlreadyAdded && (
                  <input
                    type="checkbox"
                    checked={selectedTaskIds.includes(task.id)}
                    onChange={() => onToggleTask(task, routine)}
                    aria-label={`Mark task '${task.title}'`}
                    className="clickable-checkbox"
                  />
                )}
                <span className="task-title">{task.title}</span>
              </div>
              {task.steps && (
                <ol className="step-list">
                  {task.steps.map((step, i) => <li key={i}>{step}</li>)}
                </ol>
              )}
            </div>
          </li>
        ))}
      </ul>

      {isAlreadyAdded && (
        <div className="task-actions-footer">
          <label className="task-title-row select-toggle">
            <input
              type="checkbox"
              checked={routine.tasks.every(task => selectedTaskIds.includes(task.id))}
              onChange={(e) => e.target.checked ? handleSelectAll() : handleDeselectAll()}
              aria-label={routine.tasks.every(task => selectedTaskIds.includes(task.id)) ? 'Deselect all tasks' : 'Select all tasks'}
            />
            <span className="task-title">
              {routine.tasks.every(task => selectedTaskIds.includes(task.id)) ? 'Deselect All' : 'Select All'}
            </span>
          </label>
        </div>
      )}
    </div>
  );
}

export default RoutineDetails;
