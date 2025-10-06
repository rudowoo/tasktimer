import React from 'react';
import { Todo } from '../types';
import { useTimer } from '../hooks/useTimer';
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';
import ResetIcon from './icons/ResetIcon';
import TrashIcon from './icons/TrashIcon';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const formatTime = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds]
    .map(val => val.toString().padStart(2, '0'))
    .join(':');
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const { time, isRunning, startTimer, pauseTimer, resetTimer } = useTimer();

  const handleToggle = () => onToggle(todo.id);
  const handleDelete = () => onDelete(todo.id);

  return (
    <div className="bg-white p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center gap-4 border border-[#799B96]/40 transition-colors duration-200 group">
      <div className="flex-grow flex items-center gap-4 w-full">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={handleToggle}
          className="h-6 w-6 rounded border-[#799B96]/60 bg-white text-[#6BAEAA] focus:ring-[#6BAEAA] cursor-pointer transition-all"
        />
        <span className={`flex-1 ${todo.isCompleted ? 'line-through text-[#799B96]' : 'text-[#21638B]'}`}>
          {todo.text}
        </span>
      </div>
      
      <div className="flex items-center gap-3 w-full sm:w-auto justify-between">
        <div className="bg-[#799B96]/10 px-3 py-1 rounded-md">
            <span className="font-mono text-lg text-[#21638B]">{formatTime(time)}</span>
        </div>
        <div className="flex items-center gap-2">
          {!isRunning ? (
            <button onClick={startTimer} className="p-2 rounded-full bg-[#799B96]/10 hover:bg-[#799B96]/20 text-[#799B96] hover:text-[#6BAEAA] transition-colors" aria-label="Start timer">
              <PlayIcon />
            </button>
          ) : (
            <button onClick={pauseTimer} className="p-2 rounded-full bg-[#799B96]/10 hover:bg-[#799B96]/20 text-[#799B96] hover:text-[#6BAEAA] transition-colors" aria-label="Pause timer">
              <PauseIcon />
            </button>
          )}
          <button onClick={resetTimer} className="p-2 rounded-full bg-[#799B96]/10 hover:bg-[#799B96]/20 text-[#799B96] hover:text-[#6BAEAA] transition-colors" aria-label="Reset timer">
            <ResetIcon />
          </button>
          <button onClick={handleDelete} className="p-2 rounded-full bg-[#799B96]/10 hover:bg-[#799B96]/20 text-[#799B96] hover:text-[#6BAEAA] transition-colors" aria-label="Delete task">
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
