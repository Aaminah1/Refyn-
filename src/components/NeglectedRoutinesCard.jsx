import React from 'react';
import { useRefyn } from '../context/RefynContext';
import './NeglectedRoutinesCard.css';

function NeglectedRoutinesCard() {
  const { routines, progressImages } = useRefyn();
  const today = new Date();

  const neglected = routines
    .map((routine) => {
      const logs = progressImages
        .filter(img => img.routine === routine.title && !!img.date)
        .map(img => new Date(img.date));

      if (logs.length === 0) {
        return { title: routine.title, daysAgo: null };
      }

      const latest = logs.reduce((a, b) => (a > b ? a : b));
      const diffDays = Math.floor((today - latest) / (1000 * 60 * 60 * 24));

      return { title: routine.title, daysAgo: diffDays };
    })
    .filter(r => r.daysAgo === null || r.daysAgo >= 3)
    .sort((a, b) => (b.daysAgo || 999) - (a.daysAgo || 999))
    .slice(0, 3);

  return (
    <div
      className="neglected-routines"
      role="region"
      aria-labelledby="neglected-routines-heading"
    >
      <h3 id="neglected-routines-heading" className="visually-hidden">
        Neglected Routines
      </h3>

      {neglected.length === 0 ? (
        <p className="routine-empty-msg" role="status" aria-live="polite">
          All routines are on track 🎉
        </p>
      ) : (
        <ul className="neglected-list">
          {neglected.map((routine, index) => (
            <li key={index} className="neglected-item">
              <span className="routine-name">{routine.title}</span>
              <span className="routine-status">
                {routine.daysAgo === null
                  ? 'Never logged'
                  : `Last done ${routine.daysAgo} day${routine.daysAgo !== 1 ? 's' : ''} ago`}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NeglectedRoutinesCard;
