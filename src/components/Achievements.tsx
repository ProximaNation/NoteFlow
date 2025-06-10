
import React, { useState, useEffect } from 'react';
import { Trophy, Star, Target, Award, Crown, Shield, Zap, Flame, Diamond, Gem } from 'lucide-react';
import { Todo } from '../types';

interface AchievementsProps {
  todos: Todo[];
  focusedTasks: string[];
}

interface Mission {
  id: string;
  title: string;
  description: string;
  xp: number;
  type: 'daily' | 'weekly' | 'achievement';
  requirement: number;
  progress: number;
  completed: boolean;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  requirement: number;
  earned: boolean;
}

const Achievements = ({ todos, focusedTasks }: AchievementsProps) => {
  const [userXP, setUserXP] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);

  // Premium badges
  const availableBadges: Badge[] = [
    {
      id: 'taskmaster',
      name: 'Task Master',
      description: 'Complete 100 tasks',
      icon: Crown,
      color: '#FFD700',
      requirement: 100,
      earned: false
    },
    {
      id: 'streak',
      name: 'Streak Legend',
      description: 'Complete tasks for 30 days straight',
      icon: Flame,
      color: '#FF4500',
      requirement: 30,
      earned: false
    },
    {
      id: 'focus',
      name: 'Focus Master',
      description: 'Complete 50 focused tasks',
      icon: Target,
      color: '#00CED1',
      requirement: 50,
      earned: false
    },
    {
      id: 'lightning',
      name: 'Lightning Fast',
      description: 'Complete 10 tasks in one day',
      icon: Zap,
      color: '#FFFF00',
      requirement: 10,
      earned: false
    },
    {
      id: 'diamond',
      name: 'Diamond Achiever',
      description: 'Reach Level 50',
      icon: Diamond,
      color: '#B9F2FF',
      requirement: 50,
      earned: false
    },
    {
      id: 'gem',
      name: 'Gem Collector',
      description: 'Earn 10000 XP',
      icon: Gem,
      color: '#9932CC',
      requirement: 10000,
      earned: false
    }
  ];

  // Generate missions
  const generateMissions = (): Mission[] => [
    {
      id: 'daily-3',
      title: 'Daily Warrior',
      description: 'Complete 3 tasks today',
      xp: 50,
      type: 'daily',
      requirement: 3,
      progress: 0,
      completed: false
    },
    {
      id: 'daily-focus',
      title: 'Stay Focused',
      description: 'Complete all focused tasks',
      xp: 75,
      type: 'daily',
      requirement: focusedTasks.length,
      progress: 0,
      completed: false
    },
    {
      id: 'weekly-15',
      title: 'Weekly Champion',
      description: 'Complete 15 tasks this week',
      xp: 200,
      type: 'weekly',
      requirement: 15,
      progress: 0,
      completed: false
    },
    {
      id: 'weekly-priority',
      title: 'Priority Master',
      description: 'Complete 5 high-priority tasks',
      xp: 150,
      type: 'weekly',
      requirement: 5,
      progress: 0,
      completed: false
    },
    {
      id: 'achieve-streak',
      title: 'Task Streak',
      description: 'Complete tasks for 7 days in a row',
      xp: 300,
      type: 'achievement',
      requirement: 7,
      progress: 0,
      completed: false
    },
    {
      id: 'achieve-total',
      title: 'Century Club',
      description: 'Complete 100 total tasks',
      xp: 500,
      type: 'achievement',
      requirement: 100,
      progress: 0,
      completed: false
    }
  ];

  useEffect(() => {
    // Load saved data
    const savedXP = localStorage.getItem('user-xp');
    const savedLevel = localStorage.getItem('user-level');
    const savedBadges = localStorage.getItem('user-badges');
    
    if (savedXP) setUserXP(parseInt(savedXP));
    if (savedLevel) setUserLevel(parseInt(savedLevel));
    if (savedBadges) setBadges(JSON.parse(savedBadges));
    else setBadges(availableBadges);
    
    setMissions(generateMissions());
  }, []);

  useEffect(() => {
    // Calculate level from XP
    const newLevel = Math.floor(userXP / 1000) + 1;
    setUserLevel(newLevel);
    
    // Save progress
    localStorage.setItem('user-xp', userXP.toString());
    localStorage.setItem('user-level', newLevel.toString());
  }, [userXP]);

  useEffect(() => {
    // Update mission progress based on todos
    const completedTodos = todos.filter(todo => todo.completed);
    const todayCompleted = completedTodos.filter(todo => 
      new Date(todo.createdAt).toDateString() === new Date().toDateString()
    );
    
    const updatedMissions = missions.map(mission => {
      let progress = 0;
      
      switch (mission.id) {
        case 'daily-3':
          progress = Math.min(todayCompleted.length, 3);
          break;
        case 'daily-focus':
          progress = completedTodos.filter(todo => focusedTasks.includes(todo.id)).length;
          break;
        case 'weekly-15':
          progress = Math.min(completedTodos.length, 15);
          break;
        case 'weekly-priority':
          progress = completedTodos.filter(todo => todo.priority === 'high').length;
          break;
        case 'achieve-total':
          progress = completedTodos.length;
          break;
        default:
          progress = mission.progress;
      }
      
      const completed = progress >= mission.requirement;
      
      return {
        ...mission,
        progress,
        completed
      };
    });
    
    setMissions(updatedMissions);
  }, [todos, focusedTasks]);

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
    if (userLevel >= 50) return 'Legendary Master';
    if (userLevel >= 30) return 'Elite Achiever';
    if (userLevel >= 20) return 'Expert Organizer';
    if (userLevel >= 10) return 'Advanced Planner';
    if (userLevel >= 5) return 'Rising Star';
    return 'Beginner';
  };

  const completedTasks = todos.filter(todo => todo.completed).length;
  const pendingTasks = todos.filter(todo => !todo.completed).length;

  return (
    <div className="space-y-6">
      {/* Ranking Section */}
      <div className="bg-gradient-to-br from-purple-500 to-blue-600 dark:from-purple-600 dark:to-blue-700 p-6 rounded-xl text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Trophy size={24} className="text-yellow-300" />
            <div>
              <h2 className="text-lg font-bold">Level {userLevel}</h2>
              <p className="text-sm opacity-90">{getRankTitle()}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{userXP.toLocaleString()}</div>
            <div className="text-xs opacity-75">XP Points</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress to Level {userLevel + 1}</span>
            <span>{getXPToNextLevel()} XP needed</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-yellow-300 h-2 rounded-full transition-all duration-500"
              style={{ width: `${getLevelProgress()}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3 text-card-foreground flex items-center space-x-2">
          <Target size={18} className="text-blue-500" />
          <span>Performance Stats</span>
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Completed:</span>
            <span className="font-medium text-green-600 dark:text-green-400">{completedTasks}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Pending:</span>
            <span className="font-medium text-orange-600 dark:text-orange-400">{pendingTasks}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Level:</span>
            <span className="font-medium text-purple-600 dark:text-purple-400">{userLevel}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Badges:</span>
            <span className="font-medium text-blue-600 dark:text-blue-400">{badges.filter(b => b.earned).length}/6</span>
          </div>
        </div>
      </div>

      {/* Active Missions */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3 text-card-foreground flex items-center space-x-2">
          <Star size={18} className="text-yellow-500" />
          <span>Active Missions</span>
        </h3>
        <div className="space-y-3">
          {missions.slice(0, 3).map((mission) => (
            <div
              key={mission.id}
              className={`p-3 rounded-lg border transition-all duration-300 ${
                mission.completed 
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700' 
                  : 'bg-muted border-border'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-sm text-card-foreground">{mission.title}</h4>
                  <p className="text-xs text-muted-foreground">{mission.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium text-purple-600 dark:text-purple-400">+{mission.xp} XP</div>
                  <div className="text-xs text-muted-foreground">{mission.type}</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-xs text-muted-foreground">
                  {mission.progress}/{mission.requirement}
                </div>
                <div className="w-20 bg-muted rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      mission.completed ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${Math.min((mission.progress / mission.requirement) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Badges */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3 text-card-foreground flex items-center space-x-2">
          <Award size={18} className="text-purple-500" />
          <span>Premium Badges</span>
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {badges.map((badge) => {
            const IconComponent = badge.icon;
            return (
              <div
                key={badge.id}
                className={`p-3 rounded-lg border text-center transition-all duration-300 ${
                  badge.earned
                    ? 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-700'
                    : 'bg-muted border-border opacity-60'
                }`}
              >
                <IconComponent 
                  size={24} 
                  className="mx-auto mb-2"
                  style={{ color: badge.earned ? badge.color : '#9CA3AF' }}
                />
                <h4 className="text-xs font-medium text-card-foreground mb-1">{badge.name}</h4>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
