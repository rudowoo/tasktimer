import React, { useState } from 'react';

interface TodoInputProps {
  onAddTodo: (text: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTodo(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-grow bg-white border border-[#799B96]/60 rounded-lg px-4 py-3 text-[#21638B] placeholder-[#799B96] focus:outline-none focus:ring-2 focus:ring-[#6BAEAA] focus:border-transparent transition duration-200"
      />
      <button
        type="submit"
        className="bg-[#21638B] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#1a557a] transition-all duration-300 disabled:opacity-60 disabled:bg-[#799B96] disabled:cursor-not-allowed"
        disabled={!text.trim()}
      >
        Add
      </button>
    </form>
  );
};

export default TodoInput;
