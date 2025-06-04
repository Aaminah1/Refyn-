import React, { createContext, useContext, useState, useEffect } from 'react';

const RefynContext = createContext();

export const RefynProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [routines, setRoutines] = useState([]);
  const [trackerTasks, setTrackerTasks] = useState([]);
  const [progressImages, setProgressImages] = useState([]);

  // Load saved data for the current user
  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`refyn-${user}`);
      if (saved) {
        const { routines, trackerTasks, progressImages } = JSON.parse(saved);
        setRoutines(routines || []);
        setTrackerTasks(trackerTasks || []);
        setProgressImages(progressImages || []);
      } else {
        setRoutines([]);
        setTrackerTasks([]);
        setProgressImages([]);
      }
    }
  }, [user]);

  // Save data whenever routines, tasks, or images change
  useEffect(() => {
    if (user) {
      const dataToSave = {
        routines,
        trackerTasks,
        progressImages
      };
      localStorage.setItem(`refyn-${user}`, JSON.stringify(dataToSave));
    }
  }, [user, routines, trackerTasks, progressImages]);

  const handleAddRoutine = (item) => {
    if (!routines.some(r => r.id === item.id)) {
      const newRoutine = { ...item, frequency: 'Daily' };
      setRoutines(prev => [...prev, newRoutine]);

      const allTasks = item.tasks.map(task => ({
        ...task,
        routineTitle: item.title
      }));
      setTrackerTasks(prev => [...prev, ...allTasks]);
    }
  };

  const handleDeleteRoutine = (id) => {
    setRoutines(prev => prev.filter(r => r.id !== id));
    setTrackerTasks(prev => prev.filter(t => {
      return !routines.find(r => r.id === id)?.tasks.some(rt => rt.id === t.id);
    }));
  };

  const handleUpdateFrequency = (id, newFreq) => {
    setRoutines(prev =>
      prev.map(r => r.id === id ? { ...r, frequency: newFreq } : r)
    );
  };

  const handleToggleTask = (task, routine) => {
    setTrackerTasks(prev => {
      const exists = prev.some(t => t.id === task.id);
      if (exists) {
        return prev.filter(t => t.id !== task.id);
      } else {
        return [...prev, { ...task, routineTitle: routine.title }];
      }
    });
  };

  // Add this logout handler
  const handleLogout = () => {
    setUser(null);
    setRoutines([]);
    setTrackerTasks([]);
    setProgressImages([]);
  };

  return (
    <RefynContext.Provider
      value={{
        user,
        setUser,
        routines,
        setRoutines,
        trackerTasks,
        setTrackerTasks,
        progressImages,
        setProgressImages,
        handleAddRoutine,
        handleDeleteRoutine,
        handleUpdateFrequency,
        handleToggleTask,
        handleLogout 
      }}
    >
      {children}
    </RefynContext.Provider>
  );
};

export const useRefyn = () => useContext(RefynContext);
