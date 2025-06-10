import React from 'react';
import { StickyNote, CheckSquare, Settings, Star, FolderLock, Link, LogOut, Trophy, Target, Award } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface SidebarProps {
  activeModule: 'notes' | 'todos' | 'locker' | 'links' | 'settings';
  setActiveModule: (module: 'notes' | 'todos' | 'locker' | 'links' | 'settings') => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar = ({ activeModule, setActiveModule, isOpen, setIsOpen }: SidebarProps) => {
  const { signOut, user } = useAuth();

  const menuItems = [
    { id: 'notes', label: 'Scholar\'s Notes', icon: StickyNote, color: '#3B82F6', description: 'Your knowledge vault' },
    { id: 'todos', label: 'Task Scrolls', icon: CheckSquare, color: '#10B981', description: 'Quests to complete' },
    { id: 'locker', label: 'Archive Vault', icon: FolderLock, color: '#8B5CF6', description: 'Secure storage' },
    { id: 'links', label: 'Reference Library', icon: Link, color: '#F59E0B', description: 'Bookmarked wisdom' },
    { id: 'settings', label: 'Scholar Settings', icon: Settings, color: '#6B7280', description: 'Customize your study' },
  ];

  if (!isOpen) {
    return (
      <div className="w-16 border-r border-border bg-card flex flex-col items-center py-6 space-y-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveModule(item.id as any)}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 relative group ${
              activeModule === item.id ? 'bg-accent shadow-md' : 'hover:bg-accent'
            }`}
          >
            <item.icon 
              size={20} 
              style={{ color: item.color }}
            />
            {/* Bookmark indicator for active item */}
            {activeModule === item.id && (
              <div 
                className="absolute -top-1 -right-1 w-3 h-4 rounded-b-sm flex items-center justify-center"
                style={{ backgroundColor: item.color }}
              >
                <Star size={8} className="text-white" />
              </div>
            )}
          </button>
        ))}
        
        <div className="flex-1"></div>
        
        <button
          onClick={signOut}
          className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-accent text-destructive"
        >
          <LogOut size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="w-64 border-r border-border bg-card flex flex-col">
      <div className="p-6 border-b border-border bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Star size={16} className="text-white" />
            </div>
            {/* Bookmark corner */}
            <div className="absolute -top-1 -right-1 w-3 h-4 bg-amber-600 rounded-b-sm"></div>
          </div>
          <div>
            <span className="font-bold text-lg text-card-foreground">Scholar's Desk</span>
            <p className="text-xs text-muted-foreground">Knowledge Management</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-6">
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveModule(item.id as any)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 hover:scale-[1.02] relative group ${
                  activeModule === item.id 
                    ? 'bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 shadow-sm border border-amber-200 dark:border-amber-700' 
                    : 'hover:bg-accent'
                }`}
              >
                {/* Bookmark tab for active item */}
                {activeModule === item.id && (
                  <div 
                    className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-8 rounded-r-lg flex items-center justify-center"
                    style={{ backgroundColor: item.color }}
                  >
                    <div className="w-1 h-4 bg-white/30 rounded-full"></div>
                  </div>
                )}
                
                <div 
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  <item.icon 
                    size={20} 
                    style={{ color: item.color }}
                  />
                </div>
                
                <div className="flex-1 text-left">
                  <span className="font-medium text-card-foreground block">{item.label}</span>
                  <span className="text-xs text-muted-foreground">{item.description}</span>
                </div>

                {/* Achievement indicator */}
                {activeModule === item.id && (
                  <div className="flex items-center space-x-1">
                    <Trophy size={12} className="text-amber-500" />
                  </div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-6 border-t border-border bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/50 dark:to-gray-900/50">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center relative">
            <span className="text-xs font-bold text-white">
              {user?.email?.charAt(0).toUpperCase()}
            </span>
            {/* Scholar badge */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full flex items-center justify-center">
              <Award size={8} className="text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-card-foreground truncate">
              Scholar
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email}
            </p>
          </div>
          <button
            onClick={signOut}
            className="p-1 hover:bg-accent rounded text-muted-foreground hover:text-destructive transition-colors"
          >
            <LogOut size={16} />
          </button>
        </div>
        <div className="text-xs text-muted-foreground text-center bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg">
          <Star size={12} className="inline mr-1 text-amber-500" />
          Scholar's Desk © 2024
        </div>
      </div>
    </div>
  );
};

export default Sidebar;