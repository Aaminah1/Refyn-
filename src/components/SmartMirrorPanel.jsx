import React, { useEffect, useState, useRef } from 'react';
import './SmartMirrorPanel.css';
import { Volume2, VolumeX } from 'lucide-react';
import ambientSound from '../assets/ambient.mp3';
import Tooltip from '../components/Tooltip';
import QUOTES from '../data/quotes';



function SmartMirrorPanel({ todayTasks, completedTasks }) {
  const [time, setTime] = useState(new Date());
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const quoteTimer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
    }, 10000);
    return () => clearInterval(quoteTimer);
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const remaining = todayTasks.filter(t => !completedTasks.includes(t.id));
  const nextTask = remaining.length > 0 ? remaining[0].title : null;
  const progress = todayTasks.length === 0
    ? 0
    : Math.round((completedTasks.length / todayTasks.length) * 100);

  return (
    <section
      className={`smart-mirror-panel ${isPlaying ? 'smart-mirror-glow' : ''}`}
      aria-labelledby="mirror-heading"
    >
      <h2 id="mirror-heading" className="sr-only">Smart Mirror Panel</h2>

     <Tooltip text={isPlaying ? 'Turn off ambient sound' : 'Turn on ambient sound'}>
  <button
    className={`mirror-sound-toggle ${isPlaying ? 'playing' : ''}`}
    onClick={toggleAudio}
    aria-label={isPlaying ? "Turn off ambient sound" : "Turn on ambient sound"}
    aria-pressed={isPlaying}
    title={isPlaying ? "Sound is on" : "Sound is off"}
  >
    {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
  </button>
</Tooltip>


      <audio ref={audioRef} loop preload="auto" src={ambientSound} />

      <div className="mirror-time" aria-live="polite" aria-atomic="true">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
      <div className="mirror-date">
        {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
      </div>

      <div className="mirror-progress" aria-live="polite">
        {todayTasks.length > 0
          ? `${completedTasks.length} of ${todayTasks.length} tasks completed (${progress}%)`
          : `No tasks for today`}
      </div>

      <div className="mirror-next" aria-live="polite">
        {nextTask ? `→ Next: ${nextTask}` : '🎉 All tasks done!'}
      </div>

      <div className="mirror-quote" aria-live="polite">
        “{QUOTES[quoteIndex]}”
      </div>
    </section>
  );
}

export default SmartMirrorPanel;
