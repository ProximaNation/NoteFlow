
import React from 'react';
import { Star, Check } from 'lucide-react';
import { Todo } from '../types';

interface TodaysFocusProps {
  todos: Todo[];
  focusedTasks: string[];
  setFocusedTasks: (tasks: string[]) => void;
}

const TodaysFocus = ({ todos, focusedTasks, setFocusedTasks }: TodaysFocusProps) => {
  const focusedTodos = todos.filter(todo => focusedTasks.includes(todo.id));
  const motivationalQuotes = [
    "Great things never come from comfort zones.",
    "Success is not final, failure is not fatal.",
    "The way to get started is to quit talking and begin doing.",
    "Don't watch the clock; do what it does. Keep going.",
    "The future depends on what you do today.",
  ];

  const todayQuote = motivationalQuotes[new Date().getDay() % motivationalQuotes.length];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold mb-4 flex items-center space-x-2">
          <Star size={20} style={{ color: '#F59E0B' }} />
          <span>Today's Focus</span>
        </h2>
        
        <div className="space-y-3">
          {focusedTodos.map((todo) => (
            <div
              key={todo.id}
              className={`p-3 bg-yellow-50 border border-yellow-200 rounded-lg transition-all duration-300 ${
                todo.completed ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <button
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    todo.completed 
                      ? 'bg-green-500 border-green-500' 
                      : 'border-yellow-400'
                  }`}
                >
                  {todo.completed && <Check size={12} className="text-white" />}
                </button>
                <span className={`text-sm font-medium ${
                  todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
                }`}>
                  {todo.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {focusedTodos.length === 0 && (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
            <Star size={32} className="mx-auto mb-2 text-gray-300" />
            <p className="text-sm text-gray-500">
              Select up to 3 important tasks to focus on today
            </p>
          </div>
        )}
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">Quote of the Day</h3>
        <p className="text-sm text-blue-800 italic">"{todayQuote}"</p>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium mb-3">Quick Stats</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Total Tasks:</span>
            <span className="font-medium">{todos.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Completed:</span>
            <span className="font-medium text-green-600">
              {todos.filter(t => t.completed).length}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Pending:</span>
            <span className="font-medium text-orange-600">
              {todos.filter(t => !t.completed).length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodaysFocus;
