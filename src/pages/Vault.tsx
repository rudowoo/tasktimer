import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useHabits } from '../hooks/useHabits';
import { formatDuration } from '../lib/utils';

export const Vault = () => {
  const { habits } = useHabits();

  // Get all sessions from all habits
  const allSessions = habits.flatMap(habit => 
    habit.sessions.map(session => ({
      ...session,
      habitName: habit.name,
      habitColor: habit.color
    }))
  );

  // Sort by timestamp (newest first)
  allSessions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  // Group by date
  const sessionsByDate = allSessions.reduce((groups, session) => {
    const date = session.timestamp.toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(session);
    return groups;
  }, {} as Record<string, typeof allSessions>);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Time Vault</h1>
              <p className="text-gray-600">Your complete session history</p>
            </div>
          </div>
        </div>

        {/* Sessions List */}
        {allSessions.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
              <Clock className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No sessions yet</h3>
            <p className="text-gray-600 mb-6">
              Start tracking your habits to see your sessions here
            </p>
            <Link to="/">
              <Button>Go to Habits</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(sessionsByDate).map(([date, sessions]) => (
              <div key={date} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {new Date(date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </h3>
                  <span className="text-sm text-gray-500">
                    ({sessions.length} session{sessions.length !== 1 ? 's' : ''})
                  </span>
                </div>
                
                <div className="space-y-3">
                  {sessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: session.habitColor }}
                        />
                        <span className="font-medium text-gray-900">{session.habitName}</span>
                        <span className="text-sm text-gray-500">
                          {session.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                      <span className="font-mono font-semibold text-gray-900">
                        {formatDuration(session.duration)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total time:</span>
                    <span className="font-semibold text-gray-900">
                      {formatDuration(sessions.reduce((sum, s) => sum + s.duration, 0))}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

