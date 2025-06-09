
import React from 'react';
import { StickyNote, CheckSquare, Settings, Star, FolderLock, Link, LogOut } from 'lucide-react';
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
    { id: 'notes', label: 'Notes', icon: StickyNote, color: '#3B82F6' },
    { id: 'todos', label: 'To-Do List', icon: CheckSquare, color: '#10B981' },
    { id: 'locker', label: 'Locker', icon: FolderLock, color: '#8B5CF6' },
    { id: 'links', label: 'Bookmarks', icon: Link, color: '#F59E0B' },
    { id: 'settings', label: 'Settings', icon: Settings, color: '#6B7280' },
  ];

  if (!isOpen) {
    return (
      <div className="w-16 border-r border-border bg-card flex flex-col items-center py-6 space-y-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveModule(item.id as any)}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 ${
              activeModule === item.id ? 'bg-accent' : 'hover:bg-accent'
            }`}
          >
            <item.icon 
              size={20} 
              style={{ color: item.color }}
            />
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
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <StickyNote size={16} className="text-white" />
          </div>
          <span className="font-bold text-lg text-card-foreground">NoteFlow</span>
        </div>
      </div>

      <nav className="flex-1 p-6">
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveModule(item.id as any)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 hover:scale-[1.02] ${
                  activeModule === item.id 
                    ? 'bg-accent shadow-sm' 
                    : 'hover:bg-accent'
                }`}
              >
                <item.icon 
                  size={20} 
                  style={{ color: item.color }}
                />
                <span className="font-medium text-card-foreground">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-6 border-t border-border">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-secondary-foreground">
              {user?.email?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-card-foreground truncate">
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
        <div className="text-xs text-muted-foreground text-center">
          © 2024 NoteFlow
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
