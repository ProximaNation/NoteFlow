import React, { useState, useEffect } from 'react';
import { Trophy, Star, Target, Award, Crown, Shield, Zap, Flame, Diamond, Gem, Calendar, Book, Library, Scroll, Medal, Sparkles } from 'lucide-react';
import { Todo } from '../../types';
import MissionSystem from './MissionSystem';
import { BookmarkSection, BookmarkCard, BookmarkIcon } from './BookmarkTheme';

interface GamificationHubProps {
  todos: Todo[];
  focusedTasks: string[];
}

const GamificationHub = ({ todos, focusedTasks }: GamificationHubProps) => {
  const [userXP, setUserXP] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [totalXPGained, setTotalXPGained] = useState(0);

  useEffect(() => {
    // Load saved data
    const savedXP = localStorage.getItem('user-xp');
    const savedLevel = localStorage.getItem('user-level');
    const savedTotalXP = localStorage.getItem('total-xp-gained');
    
    if (savedXP) setUserXP(parseInt(savedXP));
    if (savedLevel) setUserLevel(parseInt(savedLevel));
    if (savedTotalXP) setTotalXPGained(parseInt(savedTotalXP));
  }, []);

  useEffect(() => {
    // Calculate level from XP
    const newLevel = Math.floor(userXP / 1000) + 1;
    setUserLevel(newLevel);
    
    // Save progress
    localStorage.setItem('user-xp', userXP.toString());
    localStorage.setItem('user-level', newLevel.toString());
    localStorage.setItem('total-xp-gained', totalXPGained.toString());
  }, [userXP, totalXPGained]);

  const handleXPGain = (xp: number) => {
    setUserXP(prev => prev + xp);
    setTotalXPGained(prev => prev + xp);
  };

  const getXPToNextLevel = () => {
    return (userLevel * 1000) - userXP;
  };

  const getLevelProgress = () => {
    const currentLevelXP = (userLevel - 1) * 1000;
    const nextLevelXP = userLevel * 1000;
    const progress = ((userXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
    return Math.max(0, Math.min(100, progress));
  };

  const getRankTitle = () => {
    if (userLevel >= 50) return 'Legendary Scholar';
    if (userLevel >= 30) return 'Master Librarian';
    if (userLevel >= 20) return 'Expert Reader';
    if (userLevel >= 10) return 'Advanced Learner';
    if (userLevel >= 5) return 'Apprentice Scholar';
    return 'Novice Reader';
  };

  const completedTasks = todos.filter(todo => todo.completed).length;
  const pendingTasks = todos.filter(todo => !todo.completed).length;
  const focusedCompleted = todos.filter(todo => todo.completed && focusedTasks.includes(todo.id)).length;

  return (
    <div className="space-y-6">
      {/* Scholar Profile */}
      <BookmarkSection 
        title="Scholar Profile" 
        icon={BookmarkIcon.Book} 
        color="#7C3AED"
      >
        <div className="bg-gradient-to-br from-purple-500 to-blue-600 dark:from-purple-600 dark:to-blue-700 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-white/20 rounded-full">
                <Crown size={24} className="text-yellow-300" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Level {userLevel}</h2>
                <p className="text-sm opacity-90">{getRankTitle()}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{userXP.toLocaleString()}</div>
              <div className="text-xs opacity-75">Knowledge Points</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to Level {userLevel + 1}</span>
              <span>{getXPToNextLevel()} XP needed</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-yellow-300 to-amber-400 h-3 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                style={{ width: `${getLevelProgress()}%` }}
              >
                {getLevelProgress() > 20 && (
                  <Sparkles size={12} className="text-white" />
                )}
              </div>
            </div>
          </div>
        </div>
      </BookmarkSection>

      {/* Knowledge Stats */}
      <BookmarkSection 
        title="Knowledge Statistics" 
        icon={BookmarkIcon.Library} 
        color="#10B981"
      >
        <div className="grid grid-cols-2 gap-4">
          <BookmarkCard bookmark>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">{completedTasks}</div>
              <div className="text-sm text-muted-foreground">Tasks Mastered</div>
            </div>
          </BookmarkCard>
          
          <BookmarkCard>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">{pendingTasks}</div>
              <div className="text-sm text-muted-foreground">Tasks Pending</div>
            </div>
          </BookmarkCard>
          
          <BookmarkCard>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{focusedCompleted}</div>
              <div className="text-sm text-muted-foreground">Focus Completed</div>
            </div>
          </BookmarkCard>
          
          <BookmarkCard bookmark>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">{totalXPGained}</div>
              <div className="text-sm text-muted-foreground">Total XP Earned</div>
            </div>
          </BookmarkCard>
        </div>
      </BookmarkSection>

      {/* Mission System */}
      <BookmarkSection 
        title="Scholar's Missions" 
        icon={BookmarkIcon.Scroll} 
        color="#F59E0B"
      >
        <MissionSystem
          todos={todos}
          focusedTasks={focusedTasks}
          userLevel={userLevel}
          userXP={userXP}
          onXPGain={handleXPGain}
        />
      </BookmarkSection>

      {/* Achievement Gallery */}
      <BookmarkSection 
        title="Hall of Achievements" 
        icon={BookmarkIcon.Archive} 
        color="#EF4444"
      >
        <div className="grid grid-cols-2 gap-4">
          <BookmarkCard className="text-center" bookmark={userLevel >= 5}>
            <Trophy size={32} className="mx-auto mb-2 text-yellow-500" />
            <h4 className="font-medium text-sm">Rising Scholar</h4>
            <p className="text-xs text-muted-foreground">Reach Level 5</p>
            <div className={`text-xs mt-1 ${userLevel >= 5 ? 'text-green-600' : 'text-gray-400'}`}>
              {userLevel >= 5 ? 'Achieved!' : `${userLevel}/5`}
            </div>
          </BookmarkCard>
          
          <BookmarkCard className="text-center" bookmark={completedTasks >= 10}>
            <Medal size={32} className="mx-auto mb-2 text-blue-500" />
            <h4 className="font-medium text-sm">Task Collector</h4>
            <p className="text-xs text-muted-foreground">Complete 10 tasks</p>
            <div className={`text-xs mt-1 ${completedTasks >= 10 ? 'text-green-600' : 'text-gray-400'}`}>
              {completedTasks >= 10 ? 'Achieved!' : `${completedTasks}/10`}
            </div>
          </BookmarkCard>
          
          <BookmarkCard className="text-center" bookmark={focusedCompleted >= 5}>
            <Target size={32} className="mx-auto mb-2 text-purple-500" />
            <h4 className="font-medium text-sm">Focus Master</h4>
            <p className="text-xs text-muted-foreground">Complete 5 focused tasks</p>
            <div className={`text-xs mt-1 ${focusedCompleted >= 5 ? 'text-green-600' : 'text-gray-400'}`}>
              {focusedCompleted >= 5 ? 'Achieved!' : `${focusedCompleted}/5`}
            </div>
          </BookmarkCard>
          
          <BookmarkCard className="text-center" bookmark={totalXPGained >= 1000}>
            <Diamond size={32} className="mx-auto mb-2 text-red-500" />
            <h4 className="font-medium text-sm">Knowledge Seeker</h4>
            <p className="text-xs text-muted-foreground">Earn 1000 XP</p>
            <div className={`text-xs mt-1 ${totalXPGained >= 1000 ? 'text-green-600' : 'text-gray-400'}`}>
              {totalXPGained >= 1000 ? 'Achieved!' : `${totalXPGained}/1000`}
            </div>
          </BookmarkCard>
        </div>
      </BookmarkSection>
    </div>
  );
};

export default GamificationHub;