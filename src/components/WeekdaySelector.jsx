import React from 'react';
import './WeekdaySelector.css';

const WeekdaySelector = ({ weekDates, selectedDate, onSelectDate }) => {
  const today = new Date().toDateString();

  const formatDate = (date) => date.toLocaleDateString('en-US', { day: 'numeric' });
  const formatDay = (date) => date.toLocaleDateString('en-US', { weekday: 'short' });
  const formatMonth = (date) => date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="weekday-selector" role="group" aria-label="Select a date">
      <h2 className="calendar-month">{formatMonth(selectedDate)}</h2>
      <div className="weekday-row">
        {weekDates.map((d, idx) => {
          const isSelected = d.toDateString() === selectedDate.toDateString();
          const isToday = d.toDateString() === today;

          return (
            <button
              key={idx}
              onClick={() => onSelectDate(d)}
              className={`weekday-card ${isSelected ? 'active' : ''}`}
              aria-pressed={isSelected}
              aria-label={`Select ${formatDay(d)} ${formatDate(d)}${isToday ? ', today' : ''}`}
            >
              <span className="day">{formatDay(d)}</span>
              <span className="date-box">{formatDate(d)}</span>
              {isToday && <span className="today-dot" aria-hidden="true" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WeekdaySelector;
