import React, { useState, useEffect } from 'react';
import { Trophy, Star, Target, Award, Crown, Shield, Zap, Flame, Diamond, Gem, Calendar, CheckCircle, Lock, Gift, Bookmark, Book, Library, Scroll, Medal, Sparkles } from 'lucide-react';
import { Todo } from '../../types';

interface Mission {
  id: string;
  title: string;
  description: string;
  xp: number;
  type: 'daily' | 'weekly' | 'monthly' | 'achievement' | 'special';
  category: 'productivity' | 'consistency' | 'mastery' | 'exploration' | 'social' | 'milestone';
  requirement: number;
  progress: number;
  completed: boolean;
  unlocked: boolean;
  icon: React.ComponentType<any>;
  color: string;
  resetTime?: Date;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  requirement: number;
  earned: boolean;
  category: 'collector' | 'achiever' | 'master' | 'legend' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
}

interface MissionSystemProps {
  todos: Todo[];
  focusedTasks: string[];
  userLevel: number;
  userXP: number;
  onXPGain: (xp: number) => void;
}

const MissionSystem = ({ todos, focusedTasks, userLevel, userXP, onXPGain }: MissionSystemProps) => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [dailyLoginStreak, setDailyLoginStreak] = useState(0);
  const [lastLoginDate, setLastLoginDate] = useState<Date | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showCompletedMissions, setShowCompletedMissions] = useState(false);

  // Initialize missions and badges
  useEffect(() => {
    initializeMissions();
    initializeBadges();
    checkDailyLogin();
  }, []);

  // Update mission progress
  useEffect(() => {
    updateMissionProgress();
  }, [todos, focusedTasks, userLevel, userXP]);

  const checkDailyLogin = () => {
    const today = new Date();
    const lastLogin = localStorage.getItem('lastLoginDate');
    const streak = parseInt(localStorage.getItem('dailyLoginStreak') || '0');
    
    if (lastLogin) {
      const lastLoginDate = new Date(lastLogin);
      const daysDiff = Math.floor((today.getTime() - lastLoginDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === 1) {
        // Consecutive day
        const newStreak = streak + 1;
        setDailyLoginStreak(newStreak);
        localStorage.setItem('dailyLoginStreak', newStreak.toString());
        onXPGain(50); // Daily login bonus
      } else if (daysDiff > 1) {
        // Streak broken
        setDailyLoginStreak(1);
        localStorage.setItem('dailyLoginStreak', '1');
        onXPGain(25); // Login bonus
      } else {
        // Same day
        setDailyLoginStreak(streak);
      }
    } else {
      // First login
      setDailyLoginStreak(1);
      localStorage.setItem('dailyLoginStreak', '1');
      onXPGain(25);
    }
    
    localStorage.setItem('lastLoginDate', today.toISOString());
    setLastLoginDate(today);
  };

  const initializeMissions = () => {
    const allMissions: Mission[] = [
      // Daily Missions (Reset every 24 hours)
      {
        id: 'daily-login',
        title: 'Daily Scholar',
        description: 'Log in to your knowledge vault',
        xp: 25,
        type: 'daily',
        category: 'consistency',
        requirement: 1,
        progress: 0,
        completed: false,
        unlocked: true,
        icon: Calendar,
        color: '#10B981',
        resetTime: new Date(Date.now() + 24 * 60 * 60 * 1000)
      },
      {
        id: 'daily-tasks-3',
        title: 'Page Turner',
        description: 'Complete 3 tasks today',
        xp: 50,
        type: 'daily',
        category: 'productivity',
        requirement: 3,
        progress: 0,
        completed: false,
        unlocked: true,
        icon: Book,
        color: '#3B82F6'
      },
      {
        id: 'daily-tasks-5',
        title: 'Chapter Master',
        description: 'Complete 5 tasks today',
        xp: 75,
        type: 'daily',
        category: 'productivity',
        requirement: 5,
        progress: 0,
        completed: false,
        unlocked: true,
        icon: Library,
        color: '#8B5CF6'
      },
      {
        id: 'daily-focus-all',
        title: 'Focused Reader',
        description: 'Complete all focused tasks',
        xp: 100,
        type: 'daily',
        category: 'productivity',
        requirement: 1,
        progress: 0,
        completed: false,
        unlocked: true,
        icon: Target,
        color: '#F59E0B'
      },
      {
        id: 'daily-high-priority',
        title: 'Priority Scholar',
        description: 'Complete 2 high-priority tasks',
        xp: 60,
        type: 'daily',
        category: 'productivity',
        requirement: 2,
        progress: 0,
        completed: false,
        unlocked: true,
        icon: Flame,
        color: '#EF4444'
      },

      // Weekly Missions
      {
        id: 'weekly-tasks-15',
        title: 'Weekly Bibliophile',
        description: 'Complete 15 tasks this week',
        xp: 200,
        type: 'weekly',
        category: 'productivity',
        requirement: 15,
        progress: 0,
        completed: false,
        unlocked: true,
        icon: Scroll,
        color: '#06B6D4'
      },
      {
        id: 'weekly-streak-7',
        title: 'Consistent Learner',
        description: 'Complete tasks for 7 days straight',
        xp: 300,
        type: 'weekly',
        category: 'consistency',
        requirement: 7,
        progress: 0,
        completed: false,
        unlocked: true,
        icon: Calendar,
        color: '#10B981'
      },
      {
        id: 'weekly-focus-10',
        title: 'Focus Master',
        description: 'Complete 10 focused tasks this week',
        xp: 250,
        type: 'weekly',
        category: 'mastery',
        requirement: 10,
        progress: 0,
        completed: false,
        unlocked: true,
        icon: Zap,
        color: '#FBBF24'
      },

      // Monthly Missions
      {
        id: 'monthly-tasks-100',
        title: 'Century Scholar',
        description: 'Complete 100 tasks this month',
        xp: 1000,
        type: 'monthly',
        category: 'milestone',
        requirement: 100,
        progress: 0,
        completed: false,
        unlocked: true,
        icon: Crown,
        color: '#7C3AED'
      },
      {
        id: 'monthly-login-30',
        title: 'Dedicated Reader',
        description: 'Log in for 30 days this month',
        xp: 800,
        type: 'monthly',
        category: 'consistency',
        requirement: 30,
        progress: 0,
        completed: false,
        unlocked: true,
        icon: Medal,
        color: '#059669'
      },

      // Achievement Missions (Permanent)
      {
        id: 'achieve-first-task',
        title: 'First Page',
        description: 'Complete your first task',
        xp: 25,
        type: 'achievement',
        category: 'milestone',
        requirement: 1,
        progress: 0,
        completed: false,
        unlocked: true,
        icon: Star,
        color: '#F59E0B'
      },
      {
        id: 'achieve-tasks-10',
        title: 'Novice Reader',
        description: 'Complete 10 total tasks',
        xp: 100,
        type: 'achievement',
        category: 'milestone',
        requirement: 10,
        progress: 0,
        completed: false,
        unlocked: true,
        icon: Book,
        color: '#3B82F6'
      },
      {
        id: 'achieve-tasks-25',
        title: 'Apprentice Scholar',
        description: 'Complete 25 total tasks',
        xp: 200,
        type: 'achievement',
        category: 'milestone',
        requirement: 25,
        progress: 0,
        completed: false,
        unlocked: true,
        icon: Library,
        color: '#8B5CF6'
      },
      {
        id: 'achieve-tasks-50',
        title: 'Skilled Learner',
        description: 'Complete 50 total tasks',
        xp: 400,
        type: 'achievement',
        category: 'milestone',
        requirement: 50,
        progress: 0,
        completed: false,
        unlocked: true,
        icon: Scroll,
        color: '#06B6D4'
      },
      {
        id: 'achieve-tasks-100',
        title: 'Master Scholar',
        description: 'Complete 100 total tasks',
        xp: 800,
        type: 'achievement',
        category: 'milestone',
        requirement: 100,
        progress: 0,
        completed: false,
        unlocked: true,
        icon: Crown,
        color: '#7C3AED'
      },
      {
        id: 'achieve-tasks-250',
        title: 'Grand Master',
        description: 'Complete 250 total tasks',
        xp: 1500,
        type: 'achievement',
        category: 'milestone',
        requirement: 250,
        progress: 0,
        completed: false,
        unlocked: userLevel >= 10,
        icon: Diamond,
        color: '#B91C1C'
      },
      {
        id: 'achieve-tasks-500',
        title: 'Legendary Scholar',
        description: 'Complete 500 total tasks',
        xp: 3000,
        type: 'achievement',
        category: 'milestone',
        requirement: 500,
        progress: 0,
        completed: false,
        unlocked: userLevel >= 20,
        icon: Gem,
        color: '#9333EA'
      },
      {
        id: 'achieve-level-5',
        title: 'Rising Star',
        description: 'Reach Level 5',
        xp: 150,
        type: 'achievement',
        category: 'milestone',
        requirement: 5,
        progress: 0,
        completed: false,
        unlocked: true,
        icon: Star,
        color: '#F59E0B'
      },
      {
        id: 'achieve-level-10',
        title: 'Knowledge Seeker',
        description: 'Reach Level 10',
        xp: 300,
        type: 'achievement',
        category: 'milestone',
        requirement: 10,
        progress: 0,
        completed: false,
        unlocked: true,
        icon: Target,
        color: '#3B82F6'
      },
      {
        id: 'achieve-level-25',
        title: 'Wisdom Keeper',
        description: 'Reach Level 25',
        xp: 750,
        type: 'achievement',
        category: 'milestone',
        requirement: 25,
        progress: 0,
        completed: false,
        unlocked: userLevel >= 5,
        icon: Shield,
        color: '#8B5CF6'
      },
      {
        id: 'achieve-level-50',
        title: 'Enlightened Master',
        description: 'Reach Level 50',
        xp: 2000,
        type: 'achievement',
        category: 'milestone',
        requirement: 50,
        progress: 0,
        completed: false,
        unlocked: userLevel >= 15,
        icon: Crown,
        color: '#7C3AED'
      },
      {
        id: 'achieve-streak-7',
        title: 'Week Warrior',
        description: 'Complete tasks for 7 days in a row',
        xp: 300,
        type: 'achievement',
        category: 'consistency',
        requirement: 7,
        progress: 0,
        completed: false,
        unlocked: true,
        icon: Flame,
        color: '#EF4444'
      },
      {
        id: 'achieve-streak-30',
        title: 'Month Master',
        description: 'Complete tasks for 30 days in a row',
        xp: 1000,
        type: 'achievement',
        category: 'consistency',
        requirement: 30,
        progress: 0,
        completed: false,
        unlocked: userLevel >= 5,
        icon: Medal,
        color: '#059669'
      },
      {
        id: 'achieve-focus-50',
        title: 'Focus Champion',
        description: 'Complete 50 focused tasks',
        xp: 500,
        type: 'achievement',
        category: 'mastery',
        requirement: 50,
        progress: 0,
        completed: false,
        unlocked: true,
        icon: Zap,
        color: '#FBBF24'
      },
      {
        id: 'achieve-priority-high-25',
        title: 'Priority Master',
        description: 'Complete 25 high-priority tasks',
        xp: 400,
        type: 'achievement',
        category: 'mastery',
        requirement: 25,
        progress: 0,
        completed: false,
        unlocked: true,
        icon: Flame,
        color: '#EF4444'
      },
      {
        id: 'achieve-single-day-10',
        title: 'Lightning Scholar',
        description: 'Complete 10 tasks in a single day',
        xp: 250,
        type: 'achievement',
        category: 'productivity',
        requirement: 10,
        progress: 0,
        completed: false,
        unlocked: true,
        icon: Zap,
        color: '#FBBF24'
      },
      {
        id: 'achieve-xp-1000',
        title: 'Knowledge Collector',
        description: 'Earn 1000 total XP',
        xp: 200,
        type: 'achievement',
        category: 'milestone',
        requirement: 1000,
        progress: 0,
        completed: false,
        unlocked: true,
        icon: Gem,
        color: '#9333EA'
      },
      {
        id: 'achieve-xp-5000',
        title: 'Wisdom Hoarder',
        description: 'Earn 5000 total XP',
        xp: 500,
        type: 'achievement',
        category: 'milestone',
        requirement: 5000,
        progress: 0,
        completed: false,
        unlocked: userLevel >= 10,
        icon: Diamond,
        color: '#B91C1C'
      },
      {
        id: 'achieve-xp-10000',
        title: 'Infinite Learner',
        description: 'Earn 10000 total XP',
        xp: 1000,
        type: 'achievement',
        category: 'milestone',
        requirement: 10000,
        progress: 0,
        completed: false,
        unlocked: userLevel >= 20,
        icon: Sparkles,
        color: '#7C2D12'
      },

      // Special Missions
      {
        id: 'special-weekend-warrior',
        title: 'Weekend Scholar',
        description: 'Complete 5 tasks on weekend',
        xp: 150,
        type: 'special',
        category: 'exploration',
        requirement: 5,
        progress: 0,
        completed: false,
        unlocked: true,
        icon: Gift,
        color: '#EC4899'
      },
      {
        id: 'special-early-bird',
        title: 'Dawn Reader',
        description: 'Complete a task before 8 AM',
        xp: 100,
        type: 'special',
        category: 'exploration',
        requirement: 1,
        progress: 0,
        completed: false,
        unlocked: true,
        icon: Star,
        color: '#F59E0B'
      },
      {
        id: 'special-night-owl',
        title: 'Midnight Scholar',
        description: 'Complete a task after 10 PM',
        xp: 100,
        type: 'special',
        category: 'exploration',
        requirement: 1,
        progress: 0,
        completed: false,
        unlocked: true,
        icon: Crown,
        color: '#7C3AED'
      }
    ];

    setMissions(allMissions);
  };

  const initializeBadges = () => {
    const allBadges: Badge[] = [
      {
        id: 'first-steps',
        name: 'First Steps',
        description: 'Complete your first task',
        icon: Star,
        color: '#F59E0B',
        requirement: 1,
        earned: false,
        category: 'collector',
        rarity: 'common'
      },
      {
        id: 'task-novice',
        name: 'Task Novice',
        description: 'Complete 10 tasks',
        icon: Book,
        color: '#3B82F6',
        requirement: 10,
        earned: false,
        category: 'collector',
        rarity: 'common'
      },
      {
        id: 'task-apprentice',
        name: 'Task Apprentice',
        description: 'Complete 25 tasks',
        icon: Library,
        color: '#8B5CF6',
        requirement: 25,
        earned: false,
        category: 'collector',
        rarity: 'rare'
      },
      {
        id: 'task-expert',
        name: 'Task Expert',
        description: 'Complete 50 tasks',
        icon: Scroll,
        color: '#06B6D4',
        requirement: 50,
        earned: false,
        category: 'achiever',
        rarity: 'rare'
      },
      {
        id: 'task-master',
        name: 'Task Master',
        description: 'Complete 100 tasks',
        icon: Crown,
        color: '#7C3AED',
        requirement: 100,
        earned: false,
        category: 'achiever',
        rarity: 'epic'
      },
      {
        id: 'task-legend',
        name: 'Task Legend',
        description: 'Complete 250 tasks',
        icon: Diamond,
        color: '#B91C1C',
        requirement: 250,
        earned: false,
        category: 'master',
        rarity: 'legendary'
      },
      {
        id: 'task-mythic',
        name: 'Task Mythic',
        description: 'Complete 500 tasks',
        icon: Gem,
        color: '#9333EA',
        requirement: 500,
        earned: false,
        category: 'legend',
        rarity: 'mythic'
      },
      {
        id: 'streak-warrior',
        name: 'Streak Warrior',
        description: 'Complete tasks for 7 days straight',
        icon: Flame,
        color: '#EF4444',
        requirement: 7,
        earned: false,
        category: 'achiever',
        rarity: 'rare'
      },
      {
        id: 'streak-legend',
        name: 'Streak Legend',
        description: 'Complete tasks for 30 days straight',
        icon: Medal,
        color: '#059669',
        requirement: 30,
        earned: false,
        category: 'master',
        rarity: 'legendary'
      },
      {
        id: 'focus-master',
        name: 'Focus Master',
        description: 'Complete 50 focused tasks',
        icon: Target,
        color: '#FBBF24',
        requirement: 50,
        earned: false,
        category: 'master',
        rarity: 'epic'
      },
      {
        id: 'lightning-fast',
        name: 'Lightning Fast',
        description: 'Complete 10 tasks in one day',
        icon: Zap,
        color: '#FBBF24',
        requirement: 10,
        earned: false,
        category: 'achiever',
        rarity: 'rare'
      },
      {
        id: 'level-master',
        name: 'Level Master',
        description: 'Reach Level 25',
        icon: Shield,
        color: '#8B5CF6',
        requirement: 25,
        earned: false,
        category: 'master',
        rarity: 'epic'
      },
      {
        id: 'enlightened',
        name: 'Enlightened',
        description: 'Reach Level 50',
        icon: Crown,
        color: '#7C3AED',
        requirement: 50,
        earned: false,
        category: 'legend',
        rarity: 'legendary'
      },
      {
        id: 'xp-collector',
        name: 'XP Collector',
        description: 'Earn 5000 XP',
        icon: Gem,
        color: '#9333EA',
        requirement: 5000,
        earned: false,
        category: 'collector',
        rarity: 'epic'
      },
      {
        id: 'xp-hoarder',
        name: 'XP Hoarder',
        description: 'Earn 10000 XP',
        icon: Diamond,
        color: '#B91C1C',
        requirement: 10000,
        earned: false,
        category: 'legend',
        rarity: 'mythic'
      }
    ];

    setBadges(allBadges);
  };

  const updateMissionProgress = () => {
    const completedTodos = todos.filter(todo => todo.completed);
    const todayCompleted = completedTodos.filter(todo => 
      new Date(todo.createdAt).toDateString() === new Date().toDateString()
    );
    const focusedCompleted = completedTodos.filter(todo => focusedTasks.includes(todo.id));
    const highPriorityCompleted = completedTodos.filter(todo => todo.priority === 'high');

    setMissions(prevMissions => 
      prevMissions.map(mission => {
        let progress = mission.progress;
        
        switch (mission.id) {
          case 'daily-login':
            progress = dailyLoginStreak > 0 ? 1 : 0;
            break;
          case 'daily-tasks-3':
            progress = Math.min(todayCompleted.length, 3);
            break;
          case 'daily-tasks-5':
            progress = Math.min(todayCompleted.length, 5);
            break;
          case 'daily-focus-all':
            progress = focusedTasks.length > 0 && focusedCompleted.length === focusedTasks.length ? 1 : 0;
            break;
          case 'daily-high-priority':
            progress = Math.min(highPriorityCompleted.length, 2);
            break;
          case 'weekly-tasks-15':
            progress = Math.min(completedTodos.length, 15);
            break;
          case 'weekly-focus-10':
            progress = Math.min(focusedCompleted.length, 10);
            break;
          case 'achieve-first-task':
          case 'achieve-tasks-10':
          case 'achieve-tasks-25':
          case 'achieve-tasks-50':
          case 'achieve-tasks-100':
          case 'achieve-tasks-250':
          case 'achieve-tasks-500':
            progress = completedTodos.length;
            break;
          case 'achieve-level-5':
          case 'achieve-level-10':
          case 'achieve-level-25':
          case 'achieve-level-50':
            progress = userLevel;
            break;
          case 'achieve-focus-50':
            progress = focusedCompleted.length;
            break;
          case 'achieve-priority-high-25':
            progress = highPriorityCompleted.length;
            break;
          case 'achieve-single-day-10':
            progress = todayCompleted.length;
            break;
          case 'achieve-xp-1000':
          case 'achieve-xp-5000':
          case 'achieve-xp-10000':
            progress = userXP;
            break;
          case 'achieve-streak-7':
          case 'achieve-streak-30':
            progress = dailyLoginStreak;
            break;
        }

        const completed = progress >= mission.requirement;
        
        // Award XP for newly completed missions
        if (completed && !mission.completed) {
          onXPGain(mission.xp);
        }

        return {
          ...mission,
          progress,
          completed
        };
      })
    );

    // Update badges
    setBadges(prevBadges =>
      prevBadges.map(badge => {
        let earned = badge.earned;
        
        switch (badge.id) {
          case 'first-steps':
            earned = completedTodos.length >= 1;
            break;
          case 'task-novice':
            earned = completedTodos.length >= 10;
            break;
          case 'task-apprentice':
            earned = completedTodos.length >= 25;
            break;
          case 'task-expert':
            earned = completedTodos.length >= 50;
            break;
          case 'task-master':
            earned = completedTodos.length >= 100;
            break;
          case 'task-legend':
            earned = completedTodos.length >= 250;
            break;
          case 'task-mythic':
            earned = completedTodos.length >= 500;
            break;
          case 'streak-warrior':
            earned = dailyLoginStreak >= 7;
            break;
          case 'streak-legend':
            earned = dailyLoginStreak >= 30;
            break;
          case 'focus-master':
            earned = focusedCompleted.length >= 50;
            break;
          case 'lightning-fast':
            earned = todayCompleted.length >= 10;
            break;
          case 'level-master':
            earned = userLevel >= 25;
            break;
          case 'enlightened':
            earned = userLevel >= 50;
            break;
          case 'xp-collector':
            earned = userXP >= 5000;
            break;
          case 'xp-hoarder':
            earned = userXP >= 10000;
            break;
        }

        return { ...badge, earned };
      })
    );
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return '#6B7280';
      case 'rare': return '#3B82F6';
      case 'epic': return '#8B5CF6';
      case 'legendary': return '#F59E0B';
      case 'mythic': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const filteredMissions = missions.filter(mission => {
    if (selectedCategory !== 'all' && mission.category !== selectedCategory) return false;
    if (!showCompletedMissions && mission.completed) return false;
    return mission.unlocked;
  });

  const categories = [
    { id: 'all', name: 'All Missions', icon: Bookmark },
    { id: 'productivity', name: 'Productivity', icon: Target },
    { id: 'consistency', name: 'Consistency', icon: Calendar },
    { id: 'mastery', name: 'Mastery', icon: Crown },
    { id: 'milestone', name: 'Milestones', icon: Trophy },
    { id: 'exploration', name: 'Exploration', icon: Star }
  ];

  return (
    <div className="space-y-6">
      {/* Daily Login Streak */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-4 rounded-xl text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Calendar size={24} />
            <div>
              <h3 className="font-bold">Daily Login Streak</h3>
              <p className="text-sm opacity-90">{dailyLoginStreak} days in a row</p>
            </div>
          </div>
          <div className="text-2xl font-bold">{dailyLoginStreak}</div>
        </div>
      </div>

      {/* Mission Categories */}
      <div className="bg-card rounded-lg border border-border p-4">
        <h3 className="font-semibold mb-3 text-card-foreground flex items-center space-x-2">
          <Bookmark size={18} className="text-amber-500" />
          <span>Mission Categories</span>
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-2 rounded-lg text-sm transition-colors flex items-center space-x-2 ${
                selectedCategory === category.id
                  ? 'bg-amber-500 text-white'
                  : 'bg-secondary hover:bg-accent text-secondary-foreground'
              }`}
            >
              <category.icon size={14} />
              <span>{category.name}</span>
            </button>
          ))}
        </div>
        <div className="mt-3 flex items-center space-x-2">
          <input
            type="checkbox"
            id="showCompleted"
            checked={showCompletedMissions}
            onChange={(e) => setShowCompletedMissions(e.target.checked)}
            className="rounded"
          />
          <label htmlFor="showCompleted" className="text-sm text-muted-foreground">
            Show completed missions
          </label>
        </div>
      </div>

      {/* Active Missions */}
      <div className="bg-card rounded-lg border border-border p-4">
        <h3 className="font-semibold mb-3 text-card-foreground flex items-center space-x-2">
          <Target size={18} className="text-blue-500" />
          <span>Active Missions</span>
        </h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredMissions.map((mission) => {
            const IconComponent = mission.icon;
            const progressPercentage = Math.min((mission.progress / mission.requirement) * 100, 100);
            
            return (
              <div
                key={mission.id}
                className={`p-3 rounded-lg border transition-all duration-300 ${
                  mission.completed 
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700' 
                    : 'bg-secondary/50 border-border hover:border-amber-300'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${mission.color}20` }}>
                      <IconComponent size={16} style={{ color: mission.color }} />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-card-foreground">{mission.title}</h4>
                      <p className="text-xs text-muted-foreground">{mission.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-medium text-amber-600">+{mission.xp} XP</div>
                    <div className="text-xs text-muted-foreground capitalize">{mission.type}</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    {mission.progress}/{mission.requirement}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full transition-all duration-300`}
                        style={{ 
                          width: `${progressPercentage}%`,
                          backgroundColor: mission.completed ? '#10B981' : mission.color
                        }}
                      />
                    </div>
                    {mission.completed && (
                      <CheckCircle size={14} className="text-green-500" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badge Collection */}
      <div className="bg-card rounded-lg border border-border p-4">
        <h3 className="font-semibold mb-3 text-card-foreground flex items-center space-x-2">
          <Award size={18} className="text-purple-500" />
          <span>Badge Collection</span>
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
                    : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 opacity-60'
                }`}
              >
                <IconComponent 
                  size={24} 
                  className="mx-auto mb-2"
                  style={{ color: badge.earned ? badge.color : '#9CA3AF' }}
                />
                <h4 className="text-xs font-medium text-card-foreground mb-1">{badge.name}</h4>
                <p className="text-xs text-muted-foreground mb-1">{badge.description}</p>
                <div 
                  className="text-xs font-bold uppercase tracking-wide"
                  style={{ color: getRarityColor(badge.rarity) }}
                >
                  {badge.rarity}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MissionSystem;