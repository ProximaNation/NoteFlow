
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Switch } from './ui/switch';

interface DarkModeToggleProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

const DarkModeToggle = ({ darkMode, setDarkMode }: DarkModeToggleProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Sun size={16} className="text-yellow-500" />
      <Switch
        checked={darkMode}
        onCheckedChange={setDarkMode}
        className="data-[state=checked]:bg-gray-800 data-[state=unchecked]:bg-gray-200"
      />
      <Moon size={16} className="text-blue-500" />
    </div>
  );
};

export default DarkModeToggle;
