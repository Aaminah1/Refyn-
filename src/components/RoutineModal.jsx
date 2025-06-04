import React from 'react';


function RoutineModal({ routine, onClose, onToggleTask, selectedTaskIds, isAlreadyAdded, onAddRoutine }) {
  const isTaskSelected = (taskId) => selectedTaskIds.includes(taskId);
  const allSelected = routine.tasks.every(task => isTaskSelected(task.id));

  const handleToggleAll = () => {
    const updates = routine.tasks.map(task => {
      const shouldSelect = !allSelected;
      const isSelected = isTaskSelected(task.id);
      if (shouldSelect && !isSelected) return task;
      if (!shouldSelect && isSelected) return task;
      return null;
    }).filter(Boolean);

    // Use setTimeout to queue updates safely in one render frame
    updates.forEach((task, i) => {
      setTimeout(() => onToggleTask(task, routine), i * 0);
    });
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>{routine.title}</h2>
        <p><strong>Category:</strong> {routine.category}</p>
        <p><strong>Duration:</strong> {routine.duration}</p>
        <p>{routine.description}</p>

        <h3>Tasks</h3>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <button
            onClick={handleToggleAll}
            style={{ backgroundColor: allSelected ? '#dc3545' : '#007bff', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px' }}
          >
            {allSelected ? 'Clear All Tasks' : 'Select All Tasks'}
          </button>
        </div>

        <ul>
          {routine.tasks.map((task) => (
            <li key={task.id} style={{ marginBottom: '1rem' }}>
              <label>
                <input
                  type="checkbox"
                  checked={isTaskSelected(task.id)}
                  onChange={() => onToggleTask(task, routine)}
                />
                <strong> {task.title}</strong>
              </label>
              <ul style={{ marginLeft: '1rem' }}>
                {task.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {isAlreadyAdded ? (
           <p>
  <span role="img" aria-label="Check mark">✔</span> Already in My Routines
</p>

          ) : (
            <button
              onClick={() => onAddRoutine(routine)}
              style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px' }}
            >
              + Add to My Routines
            </button>
          )}

          <button
            onClick={onClose}
            style={{ marginLeft: '1rem', backgroundColor: '#ccc', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '5rem'
  },
  modal: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    maxWidth: '600px',
    width: '90%',
    maxHeight: '80vh',
    overflowY: 'auto'
  }
};

export default RoutineModal;
