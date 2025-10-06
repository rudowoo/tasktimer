import React, { useState, useCallback } from 'react';
import { Todo } from './types';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

const generateId = (): string => {
  if (typeof crypto !== 'undefined') {
    if (typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
    if (typeof crypto.getRandomValues === 'function') {
      const buffer = crypto.getRandomValues(new Uint8Array(16));
      buffer[6] = (buffer[6] & 0x0f) | 0x40; // version 4
      buffer[8] = (buffer[8] & 0x3f) | 0x80; // variant 10
      const hex = Array.from(buffer, byte => byte.toString(16).padStart(2, '0'));
      return (
        hex.slice(0, 4).join('') +
        '-' +
        hex.slice(4, 6).join('') +
        '-' +
        hex.slice(6, 8).join('') +
        '-' +
        hex.slice(8, 10).join('') +
        '-' +
        hex.slice(10, 16).join('')
      );
    }
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
};

const createTodo = (text: string, isCompleted = false): Todo => ({
  id: generateId(),
  text,
  isCompleted,
});

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => [
    createTodo('Finish project proposal'),
    createTodo('Workout for 30 minutes', true),
    createTodo('Read a chapter of a book'),
  ]);

  const addTodo = useCallback((text: string) => {
    if (text.trim() === '') return;
    const newTodo = createTodo(text);
    setTodos(prevTodos => [newTodo, ...prevTodos]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 p-4 sm:p-8">
      <main className="max-w-3xl mx-auto">
        <header className="text-center my-8 sm:my-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#21638B] pb-2">
            Task Timer Pro
          </h1>
          <p className="text-[#799B96]">Add your tasks and track your time with precision.</p>
        </header>
        
        <div className="mb-8">
          <TodoInput onAddTodo={addTodo} />
        </div>

        <TodoList todos={todos} onToggleTodo={toggleTodo} onDeleteTodo={deleteTodo} />

      </main>
      <footer className="text-center mt-12 pb-4">
        <p className="text-[#799B96] text-sm">Built with React & Tailwind CSS</p>
      </footer>
    </div>
  );
};

export default App;
