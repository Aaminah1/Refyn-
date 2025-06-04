import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecentProgressCard.css';
import { ImageIcon, TrendingUp, CalendarDays } from 'lucide-react';
import { useRefyn } from '../context/RefynContext';

function RecentProgressCard() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const { progressImages } = useRefyn();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!progressImages.length) {
    return (
      <div className="recent-progress-card empty" role="region" aria-label="Recent progress">
        <p>No progress images yet.</p>
      </div>
    );
  }

  const sortedImages = [...progressImages].sort((a, b) => new Date(b.date) - new Date(a.date));
  const latestImages = sortedImages.slice(0, 3);
  const totalImages = progressImages.length;
  const lastDate = latestImages[0]?.date;

  const routineFrequency = progressImages.reduce((acc, img) => {
    acc[img.routine] = (acc[img.routine] || 0) + 1;
    return acc;
  }, {});

  const topRoutine = Object.entries(routineFrequency).sort((a, b) => b[1] - a[1])[0]?.[0] || '';

  const imagesToShow = isMobile ? latestImages.slice(0, 1) : latestImages;

  return (
    <div
      className="recent-progress-card"
      role="button"
      tabIndex="0"
      aria-label="View recent progress"
      onClick={() => navigate('/tracker?tab=progress')}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate('/tracker?tab=progress')}
    >
      <div className="progress-meta">
        <p><ImageIcon size={16} aria-hidden="true" /> <strong>{totalImages}</strong> total entries</p>
        <p><TrendingUp size={16} aria-hidden="true" /> Most tracked: <strong>{topRoutine}</strong></p>
        <p>
          <CalendarDays size={16} aria-hidden="true" />
          Last uploaded:
          <strong> {new Date(lastDate).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
          })}</strong>
        </p>
      </div>

      <div className="progress-image-grid" role="list">
        {imagesToShow.map((img, idx) => (
          <div key={idx} className="progress-thumb" role="listitem">
            <img
              src={img.url}
              alt={`Progress from ${new Date(img.date).toLocaleDateString()}`}
            />
            <p className="progress-date">
              {new Date(img.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentProgressCard;
