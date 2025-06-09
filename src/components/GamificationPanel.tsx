
import React, { useState, useEffect } from 'react';
import { Trophy, Star, Award, Target, Zap, Crown, Shield, Gem, Flame, Rocket, Medal } from 'lucide-react';
import { Todo } from '../types';

interface GamificationPanelProps {
  todos: Todo[];
  focusedTasks: string[];
  setFocusedTasks: (tasks: string[]) => void;
}

interface UserStats {
  xp: number;
  level: number;
  completedMissions: string[];
  unlockedBadges: string[];
  dailyTasksCompleted: number;
  lastActiveDate: string;
}

interface Mission {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  type: 'daily' | 'weekly' | 'achievement';
  requirement: number;
  category: 'tasks' | 'focus' | 'streak' | 'productivity';
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  requirement: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const GamificationPanel = ({ todos, focusedTasks, setFocusedTasks }: GamificationPanelProps) => {
  const [userStats, setUserStats] = useState<UserStats>({
    xp: 0,
    level: 1,
    completedMissions: [],
    unlockedBadges: [],
    dailyTasksCompleted: 0,
    lastActiveDate: new Date().toDateString(),
  });

  const badges: Badge[] = [
    {
      id: 'task_master',
      name: 'Task Master',
      description: 'Complete 100 tasks',
      icon: Trophy,
      color: '#FFD700',
      requirement: 'Complete 100 tasks',
      rarity: 'legendary'
    },
    {
      id: 'focus_champion',
      name: 'Focus Champion',
      description: 'Complete 50 focused tasks',
      icon: Target,
      color: '#FF6B6B',
      requirement: 'Complete 50 focused tasks',
      rarity: 'epic'
    },
    {
      id: 'speed_demon',
      name: 'Speed Demon',
      description: 'Complete 10 tasks in one day',
      icon: Zap,
      color: '#4ECDC4',
      requirement: 'Complete 10 tasks in one day',
      rarity: 'rare'
    },
    {
      id: 'consistency_king',
      name: 'Consistency King',
      description: 'Complete daily goals for 7 days',
      icon: Crown,
      color: '#45B7D1',
      requirement: '7-day streak',
      rarity: 'epic'
    },
    {
      id: 'productivity_guru',
      name: 'Productivity Guru',
      description: 'Reach level 10',
      icon: Gem,
      color: '#96CEB4',
      requirement: 'Reach level 10',
      rarity: 'legendary'
    },
    {
      id: 'early_adopter',
      name: 'Early Adopter',
      description: 'One of the first users',
      icon: Rocket,
      color: '#FFEAA7',
      requirement: 'Join the platform early',
      rarity: 'common'
    }
  ];

  const missions: Mission[] = [
    {
      id: 'daily_3_tasks',
      title: 'Daily Warrior',
      description: 'Complete 3 tasks today',
      xpReward: 50,
      type: 'daily',
      requirement: 3,
      category: 'tasks'
    },
    {
      id: 'focus_2_tasks',
      title: 'Focus Master',
      description: 'Complete 2 focused tasks',
      xpReward: 75,
      type: 'daily',
      requirement: 2,
      category: 'focus'
    },
    {
      id: 'weekly_15_tasks',
      title: 'Weekly Champion',
      description: 'Complete 15 tasks this week',
      xpReward: 200,
      type: 'weekly',
      requirement: 15,
      category: 'tasks'
    },
    {
      id: 'high_priority_5',
      title: 'Priority Expert',
      description: 'Complete 5 high priority tasks',
      xpReward: 100,
      type: 'achievement',
      requirement: 5,
      category: 'productivity'
    },
    {
      id: 'streak_7_days',
      title: 'Streak Keeper',
      description: 'Maintain a 7-day completion streak',
      xpReward: 300,
      type: 'achievement',
      requirement: 7,
      category: 'streak'
    }
  ];

  const completedTodos = todos.filter(todo => todo.completed);
  const completedFocusedTasks = todos.filter(todo => todo.completed && focusedTasks.includes(todo.id));
  const highPriorityCompleted = todos.filter(todo => todo.completed && todo.priority === 'high');

  const getXPForLevel = (level: number) => level * 100;
  const getCurrentLevel = (xp: number) => Math.floor(xp / 100) + 1;
  const getXPProgress = (xp: number) => xp % 100;

  const checkMissionProgress = (mission: Mission) => {
    switch (mission.id) {
      case 'daily_3_tasks':
        return Math.min(completedTodos.length, mission.requirement);
      case 'focus_2_tasks':
        return Math.min(completedFocusedTasks.length, mission.requirement);
      case 'weekly_15_tasks':
        return Math.min(completedTodos.length, mission.requirement);
      case 'high_priority_5':
        return Math.min(highPriorityCompleted.length, mission.requirement);
      case 'streak_7_days':
        return userStats.dailyTasksCompleted >= 3 ? 1 : 0;
      default:
        return 0;
    }
  };

  const checkBadgeUnlocked = (badge: Badge) => {
    switch (badge.id) {
      case 'task_master':
        return completedTodos.length >= 100;
      case 'focus_champion':
        return completedFocusedTasks.length >= 50;
      case 'speed_demon':
        return completedTodos.length >= 10;
      case 'consistency_king':
        return userStats.dailyTasksCompleted >= 21;
      case 'productivity_guru':
        return userStats.level >= 10;
      case 'early_adopter':
        return true;
      default:
        return false;
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-500 border-gray-300';
      case 'rare': return 'text-blue-500 border-blue-300';
      case 'epic': return 'text-purple-500 border-purple-300';
      case 'legendary': return 'text-yellow-500 border-yellow-300';
      default: return 'text-gray-500 border-gray-300';
    }
  };

  useEffect(() => {
    const currentXP = completedTodos.length * 10 + completedFocusedTasks.length * 15;
    const currentLevel = getCurrentLevel(currentXP);
    
    setUserStats(prev => ({
      ...prev,
      xp: currentXP,
      level: currentLevel,
      dailyTasksCompleted: completedTodos.length
    }));
  }, [completedTodos.length, completedFocusedTasks.length]);

  return (
    <div className="space-y-6">
      {/* Level & XP Progress */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Crown size={20} className="text-yellow-300" />
            <span className="font-bold">Level {userStats.level}</span>
          </div>
          <span className="text-sm opacity-90">{userStats.xp} XP</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-yellow-300 h-2 rounded-full transition-all duration-500"
            style={{ width: `${getXPProgress(userStats.xp)}%` }}
          />
        </div>
        <div className="text-xs opacity-75 mt-1">
          {getXPProgress(userStats.xp)}/100 XP to next level
        </div>
      </div>

      {/* Daily Missions */}
      <div>
        <h3 className="font-bold mb-3 flex items-center space-x-2 text-foreground">
          <Target size={18} className="text-orange-500" />
          <span>Daily Missions</span>
        </h3>
        <div className="space-y-2">
          {missions.filter(m => m.type === 'daily').map((mission) => {
            const progress = checkMissionProgress(mission);
            const isCompleted = progress >= mission.requirement;
            const isInCompletedMissions = userStats.completedMissions.includes(mission.id);
            
            return (
              <div
                key={mission.id}
                className={`p-3 rounded-lg border transition-all duration-300 ${
                  isCompleted ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700' : 'bg-card border-border'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm text-card-foreground">{mission.title}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">+{mission.xpReward} XP</span>
                    {isCompleted && <Award size={14} className="text-green-500" />}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{mission.description}</p>
                <div className="flex items-center justify-between">
                  <div className="w-full bg-muted rounded-full h-1.5 mr-2">
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        isCompleted ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${Math.min((progress / mission.requirement) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {progress}/{mission.requirement}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievement Badges */}
      <div>
        <h3 className="font-bold mb-3 flex items-center space-x-2 text-foreground">
          <Medal size={18} className="text-purple-500" />
          <span>Achievement Badges</span>
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {badges.map((badge) => {
            const isUnlocked = checkBadgeUnlocked(badge);
            const BadgeIcon = badge.icon;
            
            return (
              <div
                key={badge.id}
                className={`p-3 rounded-lg border text-center transition-all duration-300 ${
                  isUnlocked 
                    ? `bg-card border-2 ${getRarityColor(badge.rarity)}` 
                    : 'bg-muted/50 border-muted opacity-50'
                }`}
              >
                <BadgeIcon 
                  size={24} 
                  className={`mx-auto mb-2 ${isUnlocked ? '' : 'text-muted-foreground'}`}
                  style={{ color: isUnlocked ? badge.color : undefined }}
                />
                <h4 className="font-medium text-xs text-card-foreground">{badge.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                {isUnlocked && (
                  <div className="mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getRarityColor(badge.rarity)} bg-background/50`}>
                      {badge.rarity.toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-card rounded-lg p-4 border border-border">
        <h3 className="font-bold mb-3 text-card-foreground">Performance Stats</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Tasks Completed</span>
              <span className="font-medium text-card-foreground">{completedTodos.length}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((completedTodos.length / 10) * 100, 100)}%` }}
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Focus Achievement</span>
              <span className="font-medium text-card-foreground">{completedFocusedTasks.length}/3</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((completedFocusedTasks.length / 3) * 100, 100)}%` }}
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Priority Tasks</span>
              <span className="font-medium text-card-foreground">{highPriorityCompleted.length}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((highPriorityCompleted.length / 5) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamificationPanel;
