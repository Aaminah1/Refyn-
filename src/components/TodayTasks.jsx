import React, { useState, useEffect } from 'react';
import TaskInfoModal from './TaskInfoModal';
import './TodayTasks.css';
import { ChevronDown } from 'lucide-react';


function TodayTasks({
  selectedDate,
  getTodayTasks,
  completedTasks,
  setCompletedTasks,
  selectedTask,
  setSelectedTask,
  routines
}) {
  const [recentlyCompleted, setRecentlyCompleted] = useState([]);
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  // Reset expanded task when date changes
  useEffect(() => {
    setExpandedTaskId(null);
  }, [selectedDate]);

  const handleCheck = (taskId) => {
  if (!completedTasks.includes(taskId)) {
    // Immediately mark as complete visually and logically
    setCompletedTasks((prev) => [...prev, taskId]);
    setRecentlyCompleted((prev) => [...prev, taskId]);

    // Close steps if expanded
    if (expandedTaskId === taskId) {
      setExpandedTaskId(null);
    }

    // After delay, clear temporary animation flag
    setTimeout(() => {
      setRecentlyCompleted((prev) => prev.filter((id) => id !== taskId));
    }, 1500);
  } else {
    setCompletedTasks((prev) => prev.filter((id) => id !== taskId));
  }
};


  const toggleExpanded = (taskId) => {
    setExpandedTaskId((prev) => (prev === taskId ? null : taskId));
  };

  const tasks = getTodayTasks();

  const activeTasks = tasks.filter(
    (task) => !completedTasks.includes(task.id) || recentlyCompleted.includes(task.id)
  );

  const doneTasks = tasks.filter(
    (task) => completedTasks.includes(task.id) && !recentlyCompleted.includes(task.id)
  );

  return (
    <div className="today-tasks-container">
    <h3 className="today-header">
  <span className="prefix">Tasks for</span>{' '}
  <span className="date">
    {selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    })}
  </span>
</h3>


      {/* To Do Section */}
      <div className="task-section">
        <h4 className="task-section-title">To Do</h4>
        {activeTasks.length > 0 ? (
  activeTasks.map((task) => {
 
    return (
      <div key={task.id}>
        <div className={`task-card ${recentlyCompleted.includes(task.id) ? 'fade-out' : ''}`}>
          <label className="task-label">
            <span className={`task-title ${completedTasks.includes(task.id) ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={completedTasks.includes(task.id)}
                onChange={() => handleCheck(task.id)}
              />{' '}
              {task.title}
            </span>
          </label>

          <button
            className="task-expand-btn"
            onClick={() => toggleExpanded(task.id)}
            aria-label="Toggle instructions"
          >
            <ChevronDown
              size={18}
              className={expandedTaskId === task.id ? 'chevron-icon rotated' : 'chevron-icon'}
            />
          </button>
        </div>

        {/* Expanded instructions */}
        {expandedTaskId === task.id && (
          <div
            className={`task-steps-panel 
              ${completedTasks.includes(task.id) ? 'done' : ''} 
              ${recentlyCompleted.includes(task.id) ? 'fade-out' : ''}`}
          >
            <ul>
              {task.steps?.length > 0 ? (
                task.steps.map((step, idx) => <li key={idx}>{step}</li>)
              ) : (
                <li>No steps found.</li>
              )}
            </ul>
          </div>
        )}
      </div>
    );
  })
) : tasks.length === 0 ? (
  <p className="no-tasks-message">No tasks scheduled for this day</p>
) : (
  <p className="all-done-message">🎉 Well done! All tasks completed for today.</p>
)}

      </div>

      {/* Done Section */}
      {doneTasks.length > 0 && (
        <div className="task-section done">
          <h4 className="task-section-title done">Tasks Done</h4>
          {doneTasks.map((task) => {
        

            return (
              <div key={task.id}>
                <div className="task-card">
                  <label className="task-label">
                    <span className="task-title completed">
                      <input
                        type="checkbox"
                        checked
                        onChange={() => handleCheck(task.id)}
                      />{' '}
                      {task.title}
                    </span>
                  </label>

                  <button
                    className="task-expand-btn"
                    onClick={() => toggleExpanded(task.id)}
                    aria-label="Toggle instructions"
                  >
                    <ChevronDown
                      size={18}
                      className={expandedTaskId === task.id ? 'chevron-icon rotated' : 'chevron-icon'}
                    />
                  </button>
                </div>

                {/* Expanded instructions */}
                {expandedTaskId === task.id && (
                  <div className={`task-steps-panel done`}>
                    <ul>
                      {task.steps?.length > 0 ? (
                        task.steps.map((step, idx) => <li key={idx}>{step}</li>)
                      ) : (
                        <li>No steps found.</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Optional Modal */}
      {selectedTask && (
        <TaskInfoModal
          task={selectedTask}
          routine={routines.find((r) => r.title === selectedTask.routineTitle)}
          isCompleted={completedTasks.includes(selectedTask.id)}
          onCompleteToggle={() => handleCheck(selectedTask.id)}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
}

export default TodayTasks;
