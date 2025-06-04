import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useRefyn } from './context/RefynContext';
import ScrollToTop from './components/ScrollToTop'; 

import Navbar from './components/Navbar';
import RoutineDetails from './pages/RoutineDetails';
import Auth from './pages/Auth.jsx';
import Home from './pages/Home.jsx';
import Tracker from './pages/Tracker.jsx';
import Routines from './pages/Routines.jsx';
import Library from './pages/Library.jsx';
import Settings from './pages/Settings.jsx';
import RoutineModal from './components/RoutineModal.jsx';
import BottomNav from './components/BottomNav';

function App() {
  const {
    user,
    setUser,
    routines,
    trackerTasks,
    handleLogout,
    handleAddRoutine,
    handleDeleteRoutine,
    handleUpdateFrequency,
    handleToggleTask
  } = useRefyn();

  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [wasJustLoggedIn, setWasJustLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (username) => {
    setUser(username);
    setWasJustLoggedIn(true);
  };

  React.useEffect(() => {
    if (wasJustLoggedIn) {
      navigate('/');
      setWasJustLoggedIn(false);
    }
  }, [wasJustLoggedIn, navigate]);

  if (!user) return <Auth onLogin={handleLogin} />;

  return (
    <>
      <ScrollToTop />
      <div className="App" role="application" aria-label="Routine tracking application">
        <Navbar user={user} handleLogout={handleLogout} />

        <main className="content" id="main-content" aria-live="polite">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tracker" element={<Tracker date={selectedDate} />} />
            <Route path="/routines" element={
              <Routines
                routines={routines}
                trackerTasks={trackerTasks}
                onDeleteRoutine={handleDeleteRoutine}
                onUpdateFrequency={handleUpdateFrequency}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
            } />
            <Route path="/library" element={
              <Library
                onAddRoutine={handleAddRoutine}
                onSelectRoutine={setSelectedRoutine}
                routines={routines}
              />
            } />
            <Route path="/settings" element={
              <Settings username={user} onClose={() => window.history.back()} />
            } />
            <Route path="/routine/:id" element={
              <RoutineDetails
                routines={routines}
                trackerTasks={trackerTasks}
                onAddRoutine={handleAddRoutine}
                onToggleTask={handleToggleTask}
              />
            } />
          </Routes>
        </main>

        <BottomNav />

        {selectedRoutine && (
          <RoutineModal
            routine={selectedRoutine}
            onClose={() => setSelectedRoutine(null)}
            onToggleTask={handleToggleTask}
            isAlreadyAdded={routines.some(r => r.id === selectedRoutine.id)}
            onAddRoutine={handleAddRoutine}
          />
        )}
      </div>
    </>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
