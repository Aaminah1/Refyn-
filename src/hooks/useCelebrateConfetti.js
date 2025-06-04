import { useEffect, useRef, useMemo } from 'react';
import confetti from 'canvas-confetti';

export function useCelebrateConfetti(selectedDate, tasks, completedTasks) {
  const celebrationKey = useMemo(
    () => `${selectedDate.toDateString()}-celebrated`,
    [selectedDate]
  );

  const hasRunRef = useRef(false);

  useEffect(() => {
    const alreadyCelebrated = localStorage.getItem(celebrationKey) === 'true';
    const allDone = tasks.length > 0 && completedTasks.length === tasks.length;

    // Reset flag if tasks list changes (e.g., switching tabs)
    hasRunRef.current = alreadyCelebrated;

    if (allDone && !alreadyCelebrated && !hasRunRef.current) {
      hasRunRef.current = true;

      const duration = 1500;
      const end = Date.now() + duration;
      const frame = () => {
        confetti({ particleCount: 7, angle: 60, spread: 55, origin: { x: 0 }, zIndex: 9999 });
        confetti({ particleCount: 7, angle: 120, spread: 55, origin: { x: 1 }, zIndex: 9999 });
        if (Date.now() < end) requestAnimationFrame(frame);
      };

      frame();
      localStorage.setItem(celebrationKey, 'true');
    }
  }, [celebrationKey, tasks.length, completedTasks.length]);
}