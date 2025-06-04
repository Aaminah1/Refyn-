import React from 'react';
import { ChevronDown } from 'lucide-react';
import TaskStepsPanel from './TaskStepsPanel'; 


function TaskCard({ task, isCompleted, isFading, isExpanded, onCheck, onExpand }) {
  return (
    <div>
      <div className={`task-card ${isFading ? 'fade-out' : ''}`}>
        <label className="task-label" htmlFor={`task-${task.id}`}>
          <span className={`task-title ${isCompleted ? 'completed' : ''}`}>
            <input
              id={`task-${task.id}`}
              type="checkbox"
              checked={isCompleted}
              onChange={onCheck}
              aria-checked={isCompleted}
              aria-label={`Mark task \"${task.title}\" as ${isCompleted ? 'incomplete' : 'complete'}`}
            />{' '}
            {task.title}
          </span>
        </label>

        <button
          className="task-expand-btn"
          onClick={onExpand}
          aria-label={`Toggle steps for task: ${task.title}`}
          aria-expanded={isExpanded}
          aria-controls={`steps-${task.id}`}
        >
          <ChevronDown
            size={18}
            className={isExpanded ? 'chevron-icon rotated' : 'chevron-icon'}
          />
        </button>
      </div>

      {/* ✅ extracted steps panel */}
      {isExpanded && (
        <TaskStepsPanel
          task={task}
          isCompleted={isCompleted}
          isFading={isFading}
        />
      )}
    </div>
  );
}

export default TaskCard;
