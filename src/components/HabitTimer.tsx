import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Trash2, Clock } from 'lucide-react';
import { Habit, Session } from '../types/habit';
import { Button } from './ui/button';
import { formatDuration } from '../lib/utils';

interface HabitTimerProps {
  habit: Habit;
  onDelete: (id: string) => void;
  onSessionComplete: (habitId: string, session: Omit<Session, 'id'>) => void;
}

export const HabitTimer: React.FC<HabitTimerProps> = ({ habit, onDelete, onSessionComplete }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);

  // Calculate today's total time
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todaySessions = habit.sessions.filter(session => 
    session.timestamp >= today
  );
  const todayTotalSeconds = todaySessions.reduce((sum, session) => sum + session.duration, 0);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && startTime) {
      interval = setInterval(() => {
        const now = new Date();
        setElapsedTime(Math.floor((now.getTime() - startTime.getTime()) / 1000));
      }, 100);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  const handleStart = () => {
    setIsRunning(true);
    setStartTime(new Date());
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    if (startTime && elapsedTime > 0) {
      const session: Omit<Session, 'id'> = {
        duration: elapsedTime,
        timestamp: startTime
      };
      onSessionComplete(habit.id, session);
    }
    
    setIsRunning(false);
    setElapsedTime(0);
    setStartTime(null);
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${habit.name}"?`)) {
      onDelete(habit.id);
    }
  };

  const currentTime = isRunning ? elapsedTime : 0;
  const totalTimeToday = todayTotalSeconds + currentTime;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{habit.name}</h3>
          {habit.description && (
            <p className="text-sm text-gray-600">{habit.description}</p>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          className="text-gray-400 hover:text-red-600"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="mb-6">
        <div className="text-center">
          <div className="text-3xl font-mono font-bold text-gray-900 mb-2">
            {formatDuration(currentTime)}
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>Today: {formatDuration(totalTimeToday)}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {!isRunning ? (
          <Button onClick={handleStart} className="flex-1 gap-2">
            <Play className="h-4 w-4" />
            Start
          </Button>
        ) : (
          <>
            <Button onClick={handlePause} variant="outline" className="flex-1 gap-2">
              <Pause className="h-4 w-4" />
              Pause
            </Button>
            <Button onClick={handleStop} variant="secondary" className="flex-1 gap-2">
              <Square className="h-4 w-4" />
              Stop
            </Button>
          </>
        )}
      </div>

      {todaySessions.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="text-xs text-gray-500 mb-2">Today's sessions:</div>
          <div className="space-y-1">
            {todaySessions.map((session, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {session.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <span className="font-mono">{formatDuration(session.duration)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

