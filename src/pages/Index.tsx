import { Clock, Vault } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useHabits } from '../hooks/useHabits';
import { HabitTimer } from '../components/HabitTimer';
import { AddHabitDialog } from '../components/AddHabitDialog';
import { TodaySummary } from '../components/TodaySummary';
import { Session } from '../types/habit';

export const Index = () => {
  const { habits, addHabit, deleteHabit, addSession } = useHabits();

  const handleSessionComplete = (habitId: string, session: Session) => {
    addSession(habitId, session);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">HabitHours</h1>
                <p className="text-gray-600">Track your journey to mastery</p>
              </div>
            </div>
            <Link to="/vault">
              <Button variant="outline" className="gap-2">
                <Vault className="h-4 w-4" />
                Time Vault
              </Button>
            </Link>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mb-8">
          <TodaySummary habits={habits} />
        </div>

        {/* Add Habit Button */}
        <div className="mb-6">
          <AddHabitDialog onAdd={addHabit} />
        </div>

        {/* Habit Timers Grid */}
        {habits.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
              <Clock className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No habits yet</h3>
            <p className="text-gray-600 mb-6">
              Create your first habit to start tracking your mastery journey
            </p>
            <AddHabitDialog onAdd={addHabit} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {habits.map((habit) => (
              <HabitTimer
                key={habit.id}
                habit={habit}
                onDelete={deleteHabit}
                onSessionComplete={handleSessionComplete}
              />
            ))}
          </div>
        )}

        {/* Footer Info */}
        {habits.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              "The master has failed more times than the beginner has even tried."
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

