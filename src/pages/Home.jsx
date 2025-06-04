import React, { useEffect, useState } from 'react';
import { useRefyn } from '../context/RefynContext';
import TodayTaskSummary from '../components/TodayTaskSummary';
import RecentProgressCard from '../components/RecentProgressCard';
import NeglectedRoutinesCard from '../components/NeglectedRoutinesCard';
import SmartMirrorPanel from '../components/SmartMirrorPanel';
import './Home.css';
import { Link } from 'react-router-dom';
import calendarImg from '../assets/onboarding-calendar.png';
import { AlertTriangle } from 'lucide-react';


function Home() {
  const { user, routines, trackerTasks, progressImages } = useRefyn();
  const [hasWaited, setHasWaited] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHasWaited(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const isLoading = routines.length === 0 && trackerTasks.length === 0 && !hasWaited;
  const isNewUser = routines.length === 0;

  const todayKey = `${user}-completedTasks-${new Date().toISOString().split('T')[0]}`;
  const completedTasks = JSON.parse(localStorage.getItem(todayKey) || '[]');

  const todayTasks = trackerTasks.filter(task => {
    const routine = routines.find(r => r.title === task.routineTitle);
    const freq = routine?.frequency || 'Daily';
    const day = new Date().getDay();
    const weekday = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    switch (freq) {
      case 'Daily': return true;
      case 'Weekdays only': return day >= 1 && day <= 5;
      case 'Weekends only': return day === 0 || day === 6;
      case 'Weekly': return day === 1;
      case 'Every other day': return new Date().getDate() % 2 === 0;
      case '2x per week': return ['Monday', 'Thursday'].includes(weekday);
      case '3x per week': return ['Monday', 'Wednesday', 'Friday'].includes(weekday);
      case '4x per week': return ['Monday', 'Tuesday', 'Thursday', 'Saturday'].includes(weekday);
      default: return true;
    }
  });

  const userImages = progressImages.filter(img => img.user === user && !!img.url);
  const latestImages = [...userImages].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
  const lastDate = latestImages[0]?.date;

  const routineCounts = {};
  userImages.forEach(img => {
    const routine = img.routine || 'Uncategorized';
    routineCounts[routine] = (routineCounts[routine] || 0) + 1;
  });

  let topRoutine = '';
  let topRoutineCount = 0;
  for (const [routine, count] of Object.entries(routineCounts)) {
    if (count > topRoutineCount) {
      topRoutine = routine;
      topRoutineCount = count;
    }
  }

  if (isLoading) {
    return (
      <div className="home-container">
        <div className="loader-container" role="status" aria-label="Loading dashboard">
          <div className="spinner" />
        </div>
      </div>
    );
  }

  return (
    <div className="home-container" role="main" aria-labelledby="welcome-heading">
      {isNewUser ? (
        <div className="onboarding-card">
          <div className="onboarding-content">
            <img src={calendarImg} alt="Calendar illustration" aria-hidden="true" className="onboarding-illustration" />
            <div className="onboarding-text">
              <h2 className="onboarding-welcome" id="welcome-heading">Welcome, {user}</h2>
              <h1>Refyn Your Routine</h1>
              <p className="onboarding-subtext">
                Begin your glow-up journey by exploring routines that fit your goals.
              </p>
              <img src={calendarImg} alt="Calendar illustration" aria-hidden="true" className="onboarding-image-inline" />
              <Link to="/library" className="onboarding-btn" aria-label="Explore routines in the library">
                Explore routines →
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="dashboard">
          <h1 id="welcome-heading">Welcome back, {user}</h1>
          <p>Here’s what’s happening today in your Refyn journey:</p>

          <div className="smart-mirror-wrapper">
            <SmartMirrorPanel todayTasks={todayTasks} completedTasks={completedTasks} />
          </div>

          <div className="dashboard-grid">
            <section aria-labelledby="task-summary-heading">
              <h2 id="task-summary-heading" className="section-title">Today’s Progress</h2>
              <TodayTaskSummary totalTasks={todayTasks.length} completedTasks={completedTasks.length} />
              <Link to="/tracker" className="manage-routines-link" aria-label="Go to today's task tracker">
                Go to Tracker →
              </Link>
            </section>

            <section aria-labelledby="recent-progress-heading">
              <h2 id="recent-progress-heading" className="section-title">Recent Progress</h2>
              <RecentProgressCard
                latestImages={latestImages}
                totalImages={userImages.length}
                lastDate={lastDate}
                topRoutine={topRoutine}
                topRoutineCount={topRoutineCount}
              />
              <Link to="/tracker?tab=progress" className="manage-routines-link" aria-label="View all uploaded progress">
                View All →
              </Link>
            </section>

            <section aria-labelledby="neglected-routines-heading">
            <h2 id="neglected-routines-heading" className="section-title">
  
  Routines You’re Ignoring
  <AlertTriangle size={20} style={{ verticalAlign: 'middle', marginRight: '0.5rem',marginLeft: '0.8rem' }} />
</h2>

              <NeglectedRoutinesCard routines={routines} progressImages={progressImages} />
              <Link to="/routines" className="manage-routines-link" aria-label="Manage your added routines">
                Manage Routines →
              </Link>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
