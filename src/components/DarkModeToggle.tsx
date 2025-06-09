
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Switch } from './ui/switch';

interface DarkModeToggleProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

const DarkModeToggle = ({ darkMode, setDarkMode }: DarkModeToggleProps) => {
  return (
    <div className="flex items-center space-x-2 p-2 rounded-lg bg-background border border-border">
      <Sun size={16} className={`transition-colors ${darkMode ? 'text-muted-foreground' : 'text-amber-500'}`} />
      <Switch
        checked={darkMode}
        onCheckedChange={setDarkMode}
        className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted"
      />
      <Moon size={16} className={`transition-colors ${darkMode ? 'text-blue-400' : 'text-muted-foreground'}`} />
    </div>
  );
};

export default DarkModeToggle;
