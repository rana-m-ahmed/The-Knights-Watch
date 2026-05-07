import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for countdown timer
 * @param {Object} config - { timeLimit, active, onExpire, resetKey }
 * @returns {Object} { timeElapsed, timeRemaining, timeRatio }
 */
export function useTimer({ timeLimit, active, onExpire, resetKey }) {
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    if (!active || timeLimit === null) return;

    const interval = setInterval(() => {
      setTimeElapsed(prev => {
        const next = prev + 0.1; // 100ms update

        if (next >= timeLimit) {
          if (onExpire) onExpire();
          return timeLimit;
        }

        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [active, timeLimit, onExpire]);

  useEffect(() => {
    setTimeElapsed(0);
  }, [resetKey]);

  // Reset timer when level changes and active becomes true
  useEffect(() => {
    if (!active) {
      setTimeElapsed(0);
    }
  }, [active]);

  const penalizeTime = useCallback((seconds) => {
    if (timeLimit === null) return;
    setTimeElapsed(prev => {
      const next = Math.min(prev + Number(seconds || 0), timeLimit);
      if (next >= timeLimit && onExpire) onExpire();
      return next;
    });
  }, [timeLimit, onExpire]);

  const timeRemaining = timeLimit !== null ? Math.max(0, timeLimit - timeElapsed) : 0;
  const timeRatio = timeLimit !== null ? timeElapsed / timeLimit : 0;

  return { timeElapsed, timeRemaining, timeRatio, penalizeTime };
}
