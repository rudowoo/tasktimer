import { useState, useEffect, useCallback } from 'react';
import { Habit, Session } from '../types/habit';
import { generateId } from '../lib/utils';

const STORAGE_KEY = 'habit-hours-data';

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);

  // Load habits from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        const habitsWithDates = parsed.map((habit: any) => ({
          ...habit,
          createdAt: new Date(habit.createdAt),
          sessions: habit.sessions.map((session: any) => ({
            ...session,
            timestamp: new Date(session.timestamp)
          }))
        }));
        setHabits(habitsWithDates);
      }
    } catch (error) {
      console.error('Failed to load habits from localStorage:', error);
    }
  }, []);

  // Save habits to localStorage whenever habits change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
    } catch (error) {
      console.error('Failed to save habits to localStorage:', error);
    }
  }, [habits]);

  const addHabit = useCallback((name: string, description?: string, color?: string) => {
    const newHabit: Habit = {
      id: generateId(),
      name,
      description,
      color: color || '#3b82f6',
      sessions: [],
      createdAt: new Date(),
      targetMinutes: 30
    };
    setHabits(prev => [...prev, newHabit]);
  }, []);

  const deleteHabit = useCallback((id: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== id));
  }, []);

  const addSession = useCallback((habitId: string, session: Omit<Session, 'id'>) => {
    const newSession: Session = {
      ...session,
      id: generateId()
    };
    
    setHabits(prev => prev.map(habit => 
      habit.id === habitId 
        ? { ...habit, sessions: [...habit.sessions, newSession] }
        : habit
    ));
  }, []);

  const updateHabit = useCallback((id: string, updates: Partial<Habit>) => {
    setHabits(prev => prev.map(habit => 
      habit.id === id ? { ...habit, ...updates } : habit
    ));
  }, []);

  return {
    habits,
    addHabit,
    deleteHabit,
    addSession,
    updateHabit
  };
}
