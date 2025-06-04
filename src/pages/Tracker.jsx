import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRefyn } from '../context/RefynContext';
import BackToTopButton from '../components/BackToTopButton';
import WeekdaySelector from '../components/WeekdaySelector';
import TrackerTabs from '../components/TrackerTabs';
import ProgressTimeline from '../components/ProgressTimeline';
import TodayTasks from '../components/TodayTasks';
import './Tracker.css';

function Tracker() {
  const {
    user,
    routines,
    trackerTasks,
    progressImages,
    setProgressImages
  } = useRefyn();

  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'today';
  

  const [completedTasks, setCompletedTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [routineFilter, setRoutineFilter] = useState('All');
  const [selectedTask, setSelectedTask] = useState(null);
  const [previewIndex, setPreviewIndex] = useState(null);
  const [uploading, setUploading] = useState(false);

  const todayKey = `${user}-completedTasks-${selectedDate.toISOString().split('T')[0]}`;

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - d.getDay() + i);
    return d;
  });

  useEffect(() => {
    const storedTasks = localStorage.getItem(todayKey);
    if (storedTasks) {
      setCompletedTasks(JSON.parse(storedTasks));
    }
  }, [todayKey]);

  useEffect(() => {
    localStorage.setItem(todayKey, JSON.stringify(completedTasks));
  }, [completedTasks, todayKey]);

  const getTodayTasks = () => {
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
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (routines.length === 0) {
      alert("You need to add a routine before uploading a progress image.");
      return;
    }

    if (routineFilter === 'All') {
      alert("Please select a specific routine category before uploading.");
      return;
    }

    const MAX_SIZE_MB = 5;
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
    if (file.size > MAX_SIZE_BYTES) {
      alert(`File is too large. Please upload images smaller than ${MAX_SIZE_MB}MB.`);
      return;
    }

    setUploading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      try {
        const image = new Image();
        image.onload = () => {
          const totalPixels = image.width * image.height;
          const MAX_PIXELS = 8000 * 8000;
          if (totalPixels > MAX_PIXELS) {
            alert("Image resolution is too high. Please upload a smaller image.");
            setUploading(false);
            return;
          }

          const canvas = document.createElement('canvas');
          const scale = Math.min(800 / image.width, 1);
          canvas.width = image.width * scale;
          canvas.height = image.height * scale;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

          const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.7);

          setProgressImages(prev => [
            ...prev,
            {
              url: resizedDataUrl,
              date: new Date(),
              caption: '',
              routine: routineFilter,
              user
            }
          ]);
          setUploading(false);
        };
        image.src = reader.result;
      } catch (error) {
        console.error("Image processing failed:", error);
        alert("Something went wrong while processing the image. Please try a smaller one.");
        setUploading(false);
      }
    };

    reader.onerror = () => {
      alert("Failed to read the file. Please try another image.");
      setUploading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleCaptionChange = (idx, newCaption) => {
    const imgToEdit = sortedImages[idx];
    setProgressImages(prev => prev.map(img =>
      img.url === imgToEdit.url ? { ...img, caption: newCaption } : img
    ));
  };

  const handleDeleteImage = (idx) => {
    const imgToDelete = sortedImages[idx];
    setProgressImages(prev => prev.filter(img => img.url !== imgToDelete.url));
  };

  const sortedImages = [...progressImages]
    .filter(img => img.user === user)
    .filter(img => !!img.url)
    .filter(img => routineFilter === 'All' || img.routine === routineFilter)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const showPrev = useCallback(() => {
    setPreviewIndex(i => (i > 0 ? i - 1 : i));
  }, []);

  const showNext = useCallback(() => {
    setPreviewIndex(i => (i < sortedImages.length - 1 ? i + 1 : i));
  }, [sortedImages.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (previewIndex !== null) {
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'Escape') setPreviewIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewIndex, showNext, showPrev]);

  return (
    <main className="tracker-wrapper" role="main" aria-labelledby="tracker-heading">
      <div className="tracker-content">
        <h1 id="tracker-heading" className="tracker-heading">Your Daily Tracker</h1>
        <p className="tracker-subheading">Stay on track with your routines and progress</p>

        {activeTab === 'today' && (
          <WeekdaySelector
            weekDates={weekDates}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        )}

        <TrackerTabs activeTab={activeTab} onTabChange={(tab) => setSearchParams({ tab })} />

        {activeTab === 'today' && (
          <TodayTasks
            selectedDate={selectedDate}
            getTodayTasks={getTodayTasks}
            completedTasks={completedTasks}
            setCompletedTasks={setCompletedTasks}
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
            routines={routines}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressTimeline
            routines={routines}
            routineFilter={routineFilter}
            setRoutineFilter={setRoutineFilter}
            sortedImages={sortedImages}
            handleUpload={handleUpload}
            handleCaptionChange={handleCaptionChange}
            handleDeleteImage={handleDeleteImage}
            previewIndex={previewIndex}
            setPreviewIndex={setPreviewIndex}
            showPrev={showPrev}
            showNext={showNext}
            uploading={uploading}
          />
        )}

        <BackToTopButton />
      </div>
    </main>
  );
}

export default Tracker;