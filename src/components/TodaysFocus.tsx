import React from 'react';
import { Star, Check } from 'lucide-react';
import { Todo } from '../types';
import GamificationHub from './gamification/GamificationHub';
import { BookmarkSection, BookmarkCard, BookmarkIcon } from './gamification/BookmarkTheme';

interface TodaysFocusProps {
  todos: Todo[];
  focusedTasks: string[];
  setFocusedTasks: (tasks: string[]) => void;
}

const TodaysFocus = ({ todos, focusedTasks, setFocusedTasks }: TodaysFocusProps) => {
  const focusedTodos = todos.filter(todo => focusedTasks.includes(todo.id));

  return (
    <div className="space-y-6">
      {/* Today's Focus Section */}
      <BookmarkSection 
        title="Today's Focus" 
        icon={BookmarkIcon.BookOpen} 
        color="#F59E0B"
      >
        <div className="space-y-3">
          {focusedTodos.map((todo) => (
            <BookmarkCard
              key={todo.id}
              className={`transition-all duration-300 ${
                todo.completed ? 'opacity-60' : ''
              }`}
              bookmark={!todo.completed}
            >
              <div className="flex items-center space-x-3">
                <button
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    todo.completed 
                      ? 'bg-green-500 border-green-500' 
                      : 'border-amber-400 hover:border-amber-500'
                  }`}
                >
                  {todo.completed && <Check size={12} className="text-white" />}
                </button>
                <span className={`text-sm font-medium ${
                  todo.completed ? 'line-through text-muted-foreground' : 'text-card-foreground'
                }`}>
                  {todo.title}
                </span>
              </div>
            </BookmarkCard>
          ))}
        </div>

        {focusedTodos.length === 0 && (
          <BookmarkCard className="text-center">
            <Star size={32} className="mx-auto mb-2 text-amber-500" />
            <p className="text-sm text-muted-foreground">
              Select up to 3 important tasks to focus on today
            </p>
          </BookmarkCard>
        )}
      </BookmarkSection>

      {/* Gamification Hub */}
      <GamificationHub todos={todos} focusedTasks={focusedTasks} />
    </div>
  );
};

export default TodaysFocus;