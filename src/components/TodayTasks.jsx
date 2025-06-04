import TaskInfoModal from './TaskInfoModal';
import './TodayTasks.css';
import { ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import React, { useState, useEffect } from 'react';

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

  const handleCheck = (taskId) => {
    if (!completedTasks.includes(taskId)) {
      setCompletedTasks((prev) => [...prev, taskId]);
      setRecentlyCompleted((prev) => [...prev, taskId]);
      if (expandedTaskId === taskId) setExpandedTaskId(null);
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

  useEffect(() => {
  const allTasksDone = tasks.length > 0 && tasks.every((task) => completedTasks.includes(task.id));
  const key = `${selectedDate.toDateString()}-confettiPlayed`;

  if (allTasksDone && !localStorage.getItem(key)) {
    // Play confetti
    const duration = 1500;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
        zIndex: 9999,
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
        zIndex: 9999,
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    };

    frame();
    localStorage.setItem(key, 'true'); // Mark confetti as played for today
  }
}, [completedTasks, tasks, selectedDate]);



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
          activeTasks.map((task) => (
            <div key={task.id}>
              <div className={`task-card ${recentlyCompleted.includes(task.id) ? 'fade-out' : ''}`}>
                <label className="task-label" htmlFor={`task-${task.id}`}>
                  <span className={`task-title ${completedTasks.includes(task.id) ? 'completed' : ''}`}>
                    <input
                      id={`task-${task.id}`}
                      type="checkbox"
                      checked={completedTasks.includes(task.id)}
                      onChange={() => handleCheck(task.id)}
                      aria-checked={completedTasks.includes(task.id)}
                      aria-label={`Mark task "${task.title}" as ${completedTasks.includes(task.id) ? 'incomplete' : 'complete'}`}
                    />{' '}
                    {task.title}
                  </span>
                </label>

                <button
                  className="task-expand-btn"
                  onClick={() => toggleExpanded(task.id)}
                  aria-label={`Toggle steps for task: ${task.title}`}
                  aria-expanded={expandedTaskId === task.id}
                  aria-controls={`steps-${task.id}`}
                >
                  <ChevronDown
                    size={18}
                    className={expandedTaskId === task.id ? 'chevron-icon rotated' : 'chevron-icon'}
                  />
                </button>
              </div>

              {expandedTaskId === task.id && (
                <div
                  id={`steps-${task.id}`}
                  className={`task-steps-panel 
                    ${completedTasks.includes(task.id) ? 'done' : ''} 
                    ${recentlyCompleted.includes(task.id) ? 'fade-out' : ''}`}
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
              )}
            </div>
          ))
        ) : tasks.length === 0 ? (
          <p className="no-tasks-message">No tasks scheduled for this day</p>
        ) : (
          <p className="all-done-message" role="status" aria-live="polite">
            🎉 Well done! All tasks completed for today.
          </p>
        )}
      </div>

      {/* Done Section */}
      {doneTasks.length > 0 && (
        <div className="task-section done">
          <h4 className="task-section-title done">Tasks Done</h4>
          {doneTasks.map((task) => (
            <div key={task.id}>
              <div className="task-card">
                <label className="task-label" htmlFor={`done-${task.id}`}>
                  <span className="task-title completed">
                    <input
                      id={`done-${task.id}`}
                      type="checkbox"
                      checked
                      onChange={() => handleCheck(task.id)}
                      aria-checked="true"
                      aria-label={`Uncheck task: ${task.title}`}
                    />{' '}
                    {task.title}
                  </span>
                </label>

                <button
                  className="task-expand-btn"
                  onClick={() => toggleExpanded(task.id)}
                  aria-label={`Toggle steps for completed task: ${task.title}`}
                  aria-expanded={expandedTaskId === task.id}
                  aria-controls={`steps-${task.id}`}
                >
                  <ChevronDown
                    size={18}
                    className={expandedTaskId === task.id ? 'chevron-icon rotated' : 'chevron-icon'}
                  />
                </button>
              </div>

              {expandedTaskId === task.id && (
                <div
                  id={`steps-${task.id}`}
                  className="task-steps-panel done"
                  role="region"
                  aria-label={`Steps for completed task: ${task.title}`}
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
          ))}
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