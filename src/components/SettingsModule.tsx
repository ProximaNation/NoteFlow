
import React from 'react';
import { Settings, Palette, Shield, Download, Upload } from 'lucide-react';
import SocialLinks from './SocialLinks';
import DarkModeToggle from './DarkModeToggle';
import ExportImport from './ExportImport';

interface SettingsModuleProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  notes: any[];
  todos: any[];
  files: any[];
  links: any[];
  focusedTasks: string[];
  setNotes: (notes: any[]) => void;
  setTodos: (todos: any[]) => void;
  setFiles: (files: any[]) => void;
  setLinks: (links: any[]) => void;
  setFocusedTasks: (tasks: string[]) => void;
}

const SettingsModule = ({ 
  darkMode, 
  setDarkMode, 
  notes, 
  todos, 
  files, 
  links, 
  focusedTasks,
  setNotes,
  setTodos,
  setFiles,
  setLinks,
  setFocusedTasks
}: SettingsModuleProps) => {
  return (
    <div className="flex-1 p-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-3 mb-8">
          <Settings size={32} className="text-foreground" />
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        </div>

        <div className="space-y-8">
          {/* Appearance Settings */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Palette size={24} className="text-purple-600" />
              <h2 className="text-xl font-semibold text-card-foreground">Appearance</h2>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
              <div>
                <h3 className="font-medium text-card-foreground">Dark Mode</h3>
                <p className="text-sm text-muted-foreground">Toggle between light and dark themes</p>
              </div>
              <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>
          </div>

          {/* Data Management */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Shield size={24} className="text-green-600" />
              <h2 className="text-xl font-semibold text-card-foreground">Data Management</h2>
            </div>
            
            <ExportImport 
              notes={notes}
              todos={todos}
              files={files}
              links={links}
              focusedTasks={focusedTasks}
              setNotes={setNotes}
              setTodos={setTodos}
              setFiles={setFiles}
              setLinks={setLinks}
              setFocusedTasks={setFocusedTasks}
            />
          </div>

          {/* Social & Community */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-card-foreground">Connect With Us</h2>
            </div>
            
            <SocialLinks />
          </div>

          {/* App Information */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-xl font-semibold text-card-foreground mb-4">About NoteFlow</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>Version 2.0.0</p>
              <p>A comprehensive productivity suite for notes, tasks, file storage, and bookmarks.</p>
              <p className="text-xs">© 2024 NoteFlow. Built with ❤️ for productivity enthusiasts.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModule;
