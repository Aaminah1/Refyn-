// ✅ RefynContext.jsx — updated with routine delete and frequency update
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback
} from 'react';

const RefynContext = createContext();

export const RefynProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [routines, setRoutines] = useState([]);
  const [trackerTasks, setTrackerTasks] = useState([]);
  const [progressImages, setProgressImages] = useState([]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const todayKey = useMemo(() => {
    return `${user}-completedTasks-${selectedDate.toISOString().split('T')[0]}`;
  }, [user, selectedDate]);

  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(todayKey);
      setCompletedTasks(stored ? JSON.parse(stored) : []);
    }
  }, [todayKey, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(todayKey, JSON.stringify(completedTasks));
    }
  }, [completedTasks, todayKey, user]);

  const [selectedTask, setSelectedTask] = useState(null);

  const getTodayTasks = useCallback(() => {
    const dayIndex = selectedDate.getDay();
    const dayName = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });

    return trackerTasks.filter(task => {
      const routine = routines.find(r => r.title === task.routineTitle);
      const freq = routine?.frequency || 'Daily';
      switch (freq) {
        case 'Daily': return true;
        case 'Weekdays only': return dayIndex >= 1 && dayIndex <= 5;
        case 'Weekends only': return dayIndex === 0 || dayIndex === 6;
        case 'Weekly': return dayIndex === 1;
        case 'Every other day': return selectedDate.getDate() % 2 === 0;
        case '2x per week': return ['Monday', 'Thursday'].includes(dayName);
        case '3x per week': return ['Monday', 'Wednesday', 'Friday'].includes(dayName);
        case '4x per week': return ['Monday', 'Tuesday', 'Thursday', 'Saturday'].includes(dayName);
        default: return true;
      }
    });
  }, [selectedDate, trackerTasks, routines]);

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
        handleLogout,
        selectedDate,
        setSelectedDate,
        completedTasks,
        setCompletedTasks,
        selectedTask,
        setSelectedTask,
        getTodayTasks
      }}
    >
      {children}
    </RefynContext.Provider>
  );
};

export const useRefyn = () => useContext(RefynContext);
