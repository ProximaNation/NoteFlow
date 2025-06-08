
import React from 'react';
import { StickyNote, CheckSquare, Settings, Star } from 'lucide-react';

interface SidebarProps {
  activeModule: 'notes' | 'todos' | 'settings';
  setActiveModule: (module: 'notes' | 'todos' | 'settings') => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar = ({ activeModule, setActiveModule, isOpen, setIsOpen }: SidebarProps) => {
  const menuItems = [
    { id: 'notes', label: 'Notes', icon: StickyNote, color: '#3B82F6' },
    { id: 'todos', label: 'To-Do List', icon: CheckSquare, color: '#10B981' },
    { id: 'settings', label: 'Settings', icon: Settings, color: '#6B7280' },
  ];

  if (!isOpen) {
    return (
      <div className="w-16 border-r border-gray-200 bg-white flex flex-col items-center py-6 space-y-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveModule(item.id as any)}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 ${
              activeModule === item.id ? 'bg-gray-100' : 'hover:bg-gray-50'
            }`}
          >
            <item.icon 
              size={20} 
              style={{ color: item.color }}
            />
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="w-64 border-r border-gray-200 bg-white flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <Star size={16} className="text-white" />
          </div>
          <span className="font-bold text-lg">NoteFlow</span>
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
                    ? 'bg-gray-100 shadow-sm' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <item.icon 
                  size={20} 
                  style={{ color: item.color }}
                />
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-6 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          © 2024 NoteFlow
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
