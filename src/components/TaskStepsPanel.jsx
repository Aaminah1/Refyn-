import React from 'react';


function TaskStepsPanel({ task, isCompleted, isFading }) {
  return (
    <div
      id={`steps-${task.id}`}
      className={`task-steps-panel ${isCompleted ? 'done' : ''} ${isFading ? 'fade-out' : ''}`}
      role="region"
      aria-label={`Steps for task: ${task.title}`}
    >
      <ul>
        {task.steps?.length > 0 ? (
          task.steps.map((step, idx) => <li key={idx}>{step}</li>)
        ) : (
          <li>No steps found.</li>
        )}
      </ul>
    </div>
  );
}

export default TaskStepsPanel;