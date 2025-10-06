export interface Session {
  id: string;
  duration: number; // in seconds
  timestamp: Date;
  notes?: string;
}

export interface Habit {
  id: string;
  name: string;
  description?: string;
  color: string;
  sessions: Session[];
  createdAt: Date;
  targetMinutes?: number; // daily target in minutes
}

export interface TodayStats {
  totalMinutes: number;
  completedHabits: number;
  totalSessions: number;
}
