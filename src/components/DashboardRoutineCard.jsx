import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardRoutineCard.css';
import { CalendarDays } from 'lucide-react';


function DashboardRoutineCard({ routine }) {
  const navigate = useNavigate();
  const taskCount = routine.tasks?.length || 0;

  const getNextDay = (frequency) => {
    const today = new Date();
    const weekday = today.getDay(); // 0 = Sun, 6 = Sat

    switch (frequency) {
      case 'Daily': return 'Tomorrow';
      case 'Every other day': return 'In 2 days';
      case 'Weekends only': return (weekday === 6 || weekday === 0) ? 'Today' : 'Saturday';
      case 'Weekdays only': return (weekday >= 1 && weekday <= 4) ? 'Tomorrow' : 'Monday';
      default: return 'This week';
    }
  };

  const next = getNextDay(routine.frequency);

  return (
    <div
      className="dashboard-routine-card"
      tabIndex="0"
      role="button"
      onClick={() => navigate(`/routine/${routine.id}`)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate(`/routine/${routine.id}`)}
      aria-label={`Routine: ${routine.title}, ${taskCount} tasks, next on ${next}`}
    >
      <div className="routine-card-header">
       <h3 className="routine-title">{routine.title}</h3>

        <span className="routine-tag">{routine.frequency}</span>
      </div>

      <div className="routine-card-details">
  <p className="routine-tasks">
   
    {taskCount} {taskCount === 1 ? 'task' : 'tasks'}
  </p>
  <p className="routine-next">
    <CalendarDays size={16} style={{ marginRight: '6px' }} />
    Next: <strong className={next === 'Today' ? 'highlight' : ''}>{next}</strong>
  </p>
</div>

    </div>
  );
}

export default DashboardRoutineCard;
