import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

export const useTimer = (initialTime = 0) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const timerApisAvailable = useMemo(
    () =>
      typeof globalThis !== 'undefined' &&
      typeof globalThis.setInterval === 'function' &&
      typeof globalThis.clearInterval === 'function',
    []
  );

  const startTimer = useCallback(() => {
    if (isRunning || !timerApisAvailable) {
      return;
    }
    setIsRunning(true);
  }, [isRunning, timerApisAvailable]);

  const pauseTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTime(0);
  }, []);

  useEffect(() => {
    if (!timerApisAvailable) {
      return undefined;
    }

    if (isRunning) {
      timerRef.current = globalThis.setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (timerRef.current) {
      globalThis.clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        globalThis.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRunning, timerApisAvailable]);

  return { time, isRunning, startTimer, pauseTimer, resetTimer };
};
