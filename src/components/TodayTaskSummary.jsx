import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRefyn } from '../context/RefynContext';
import './TodayTaskSummary.css';

function TodayTaskSummary() {
  const navigate = useNavigate();
  const { user, trackerTasks, routines } = useRefyn();

  const todayKey = `${user}-completedTasks-${new Date().toISOString().split('T')[0]}`;
  const completedTasks = JSON.parse(localStorage.getItem(todayKey) || '[]');

  const todayTasks = trackerTasks.filter(task => {
    const routine = routines.find(r => r.title === task.routineTitle);
    if (!routine) return false;
    const freq = routine.frequency || 'Daily';
    const day = new Date().getDay();

    switch (freq) {
      case 'Daily':
        return true;
      case 'Every other day':
        return day % 2 === 0;
      case '2x per week':
        return day === 1 || day === 4;
      case '3x per week':
        return day === 1 || day === 3 || day === 5;
      case '4x per week':
        return day === 1 || day === 2 || day === 4 || day === 5;
      case 'Weekends only':
        return day === 0 || day === 6;
      case 'Weekdays only':
        return day >= 1 && day <= 5;
      default:
        return true;
    }
  });

  const totalTasks = todayTasks.length;
  const completed = completedTasks.length;
  const percentage = totalTasks === 0 ? 0 : Math.round((completed / totalTasks) * 100);

  const radius = 60;
  const stroke = 6;
  const normalizedRadius = radius - stroke;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  let strokeColor = '#f03e3e';
  let textColor = '#f03e3e';
  let message = "Let’s get started!";

  if (percentage >= 90) {
    strokeColor = textColor = '#16a34a';
    message = "Outstanding progress!";
  } else if (percentage >= 70) {
    strokeColor = textColor = '#16a34a';
    message = "You’re doing great!";
  } else if (percentage >= 40) {
    strokeColor = textColor = '#facc15';
    message = "Halfway there — keep going!";
  } else if (percentage > 0) {
    strokeColor = textColor = '#f97316';
    message = "Nice start! Let’s keep it up.";
  }

  return (
    <div
      className="task-summary-card"
      role="button"
      tabIndex="0"
      aria-label={`View today's task progress: ${completed} of ${totalTasks} tasks completed, ${percentage}%`}
      aria-describedby="motivation-text"
      onClick={() => navigate('/tracker')}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate('/tracker')}
    >
      <div
        className="progress-ring"
        role="img"
        aria-label={`Progress circle showing ${percentage}% completion`}
      >
        <svg
          viewBox={`0 0 ${radius * 2} ${radius * 2}`}
          preserveAspectRatio="xMidYMid meet"
          height={radius * 2}
          width={radius * 2}
        >
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#f03e3e" />
            </linearGradient>
          </defs>

          <circle
            stroke="#f0f0f0"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke={strokeColor}
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="animated-progress"
          />
        </svg>

        <div className="progress-text">
          <div className="percent" style={{ color: textColor }}>{percentage}%</div>
          <div className="label">Today</div>
        </div>
      </div>

      <div className="task-details">
        <p className="task-stats">
          <strong>{completed}</strong> of <strong>{totalTasks}</strong> tasks completed
        </p>
        <p
          id="motivation-text"
          className="task-motivation"
          style={{ color: textColor }}
          aria-live="polite"
        >
          {message}
        </p>
        <p className="task-meta">
          Updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </p>
      </div>
    </div>
  );
}

export default TodayTaskSummary;
