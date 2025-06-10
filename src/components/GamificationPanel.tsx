import React from 'react';
import { Trophy, Star, Target, Award, Crown, Shield, Zap, Flame, Diamond, Gem, Book, Scroll, Medal } from 'lucide-react';
import { Todo } from '../types';
import { BookmarkSection, BookmarkCard, BookmarkIcon } from './gamification/BookmarkTheme';

interface GamificationPanelProps {
  todos: Todo[];
  focusedTasks: string[];
}

const GamificationPanel = ({ todos, focusedTasks }: GamificationPanelProps) => {
  // This component is now replaced by the new GamificationHub
  // Keeping it for backward compatibility but redirecting to the new system
  
  const completedTasks = todos.filter(todo => todo.completed).length;
  const pendingTasks = todos.filter(todo => !todo.completed).length;
  const focusedCompleted = todos.filter(todo => todo.completed && focusedTasks.includes(todo.id)).length;

  return (
    <BookmarkSection 
      title="Scholar's Progress" 
      icon={BookmarkIcon.Book} 
      color="#7C3AED"
    >
      <div className="grid grid-cols-2 gap-4">
        <BookmarkCard bookmark>
          <div className="text-center">
            <Trophy size={24} className="mx-auto mb-2 text-yellow-500" />
            <div className="text-lg font-bold text-card-foreground">{completedTasks}</div>
            <div className="text-xs text-muted-foreground">Tasks Completed</div>
          </div>
        </BookmarkCard>
        
        <BookmarkCard>
          <div className="text-center">
            <Target size={24} className="mx-auto mb-2 text-blue-500" />
            <div className="text-lg font-bold text-card-foreground">{pendingTasks}</div>
            <div className="text-xs text-muted-foreground">Tasks Pending</div>
          </div>
        </BookmarkCard>
        
        <BookmarkCard>
          <div className="text-center">
            <Star size={24} className="mx-auto mb-2 text-amber-500" />
            <div className="text-lg font-bold text-card-foreground">{focusedCompleted}</div>
            <div className="text-xs text-muted-foreground">Focus Completed</div>
          </div>
        </BookmarkCard>
        
        <BookmarkCard bookmark>
          <div className="text-center">
            <Medal size={24} className="mx-auto mb-2 text-purple-500" />
            <div className="text-lg font-bold text-card-foreground">{focusedTasks.length}</div>
            <div className="text-xs text-muted-foreground">Focused Tasks</div>
          </div>
        </BookmarkCard>
      </div>
    </BookmarkSection>
  );
};

export default GamificationPanel;