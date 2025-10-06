import React from 'react';
import { Clock, Target, TrendingUp } from 'lucide-react';
import { Habit } from '../types/habit';
import { formatDuration } from '../lib/utils';

interface TodaySummaryProps {
  habits: Habit[];
}

export const TodaySummary: React.FC<TodaySummaryProps> = ({ habits }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Calculate today's stats
  const todayStats = habits.reduce((stats, habit) => {
    const todaySessions = habit.sessions.filter(session => 
      session.timestamp >= today
    );
    
    const totalMinutes = todaySessions.reduce((sum, session) => sum + session.duration, 0);
    const hasTarget = habit.targetMinutes && habit.targetMinutes > 0;
    const isCompleted = hasTarget && totalMinutes >= (habit.targetMinutes! * 60);
    
    return {
      totalMinutes: stats.totalMinutes + totalMinutes,
      completedHabits: stats.completedHabits + (isCompleted ? 1 : 0),
      totalSessions: stats.totalSessions + todaySessions.length
    };
  }, { totalMinutes: 0, completedHabits: 0, totalSessions: 0 });

  const totalHours = Math.floor(todayStats.totalMinutes / 3600);
  const totalMinutes = Math.floor((todayStats.totalMinutes % 3600) / 60);

  const formatTime = (seconds: number) => {
    if (totalHours > 0) {
      return `${totalHours}h ${totalMinutes}m`;
    }
    return `${totalMinutes}m`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium">Total Time</p>
            <p className="text-2xl font-bold">{formatTime(todayStats.totalMinutes)}</p>
          </div>
          <Clock className="h-8 w-8 text-blue-200" />
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm font-medium">Completed Habits</p>
            <p className="text-2xl font-bold">{todayStats.completedHabits}</p>
          </div>
          <Target className="h-8 w-8 text-green-200" />
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm font-medium">Total Sessions</p>
            <p className="text-2xl font-bold">{todayStats.totalSessions}</p>
          </div>
          <TrendingUp className="h-8 w-8 text-purple-200" />
        </div>
      </div>
    </div>
  );
};

