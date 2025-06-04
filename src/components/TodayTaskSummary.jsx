import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TodayTaskSummary.css';

function TodayTaskSummary({ totalTasks, completedTasks }) {
  const navigate = useNavigate();

  const percentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  const radius = 60;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
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
      aria-label="View today's task progress"
      onClick={() => navigate('/tracker')}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate('/tracker')}
    >
      <div className="progress-ring" role="img" aria-label={`Progress circle showing ${percentage}% completion`}>
        <svg height={radius * 2} width={radius * 2} aria-hidden="true">
          <circle
            stroke="#eee"
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
          />
        </svg>
        <div className="progress-text" style={{ color: textColor }}>
          {percentage}%
        </div>
      </div>

      <div className="task-details">
        <p className="task-stats">
          <strong>{completedTasks}</strong> of <strong>{totalTasks}</strong> tasks completed
        </p>
        <p className="task-motivation" style={{ color: textColor }}>
          {message}
        </p>
        <p className="task-meta">Updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
      </div>
    </div>
  );
}

export default TodayTaskSummary;
