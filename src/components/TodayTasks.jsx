import TaskInfoModal from './TaskInfoModal';
import './TodayTasks.css';
import { ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import React, { useState, useEffect } from 'react';
import { useRefyn } from '../context/RefynContext';
import TaskCard from './TaskCard';
function TodayTasks() {
  const {
    selectedDate,
    getTodayTasks,
    completedTasks,
    setCompletedTasks,
    selectedTask,
    setSelectedTask,
    routines
  } = useRefyn();

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
      const duration = 1500;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({ particleCount: 6, angle: 60, spread: 70, origin: { x: 0 }, zIndex: 9999 });
        confetti({ particleCount: 6, angle: 120, spread: 70, origin: { x: 1 }, zIndex: 9999 });
        if (Date.now() < end) requestAnimationFrame(frame);
      };

      frame();
      localStorage.setItem(key, 'true');
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

      <div className="task-section">
        <h4 className="task-section-title">To Do</h4>
        {activeTasks.length > 0 ? (
          activeTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              isCompleted={completedTasks.includes(task.id)}
              isFading={recentlyCompleted.includes(task.id)}
             isExpanded={expandedTaskId === task.id}

              onCheck={() => handleCheck(task.id)}
              onExpand={() => toggleExpanded(task.id)}
            />
          ))
        ) : tasks.length === 0 ? (
          <p className="no-tasks-message">No tasks scheduled for this day</p>
        ) : (
          <p className="all-done-message" role="status" aria-live="polite">
            🎉 Well done! All tasks completed for today.
          </p>
        )}
      </div>

      {doneTasks.length > 0 && (
        <div className="task-section done">
          <h4 className="task-section-title done">Tasks Done</h4>
          {doneTasks.map((task) => (
            <TaskCard
  key={task.id}
  task={task}
  isCompleted={completedTasks.includes(task.id)}
  isFading={recentlyCompleted.includes(task.id)}
  isExpanded={expandedTaskId === task.id} // ✅ this is what TaskCard expects
  onCheck={() => handleCheck(task.id)}
  onExpand={() => toggleExpanded(task.id)}
/>
          ))}
        </div>
      )}

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
