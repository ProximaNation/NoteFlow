
import React, { useRef } from 'react';
import { Download, Upload, FileText } from 'lucide-react';
import { Note, Todo, AppData } from '../types';

interface ExportImportProps {
  notes: Note[];
  todos: Todo[];
  focusedTasks: string[];
  setNotes: (notes: Note[]) => void;
  setTodos: (todos: Todo[]) => void;
  setFocusedTasks: (tasks: string[]) => void;
}

const ExportImport = ({ 
  notes, 
  todos, 
  focusedTasks, 
  setNotes, 
  setTodos, 
  setFocusedTasks 
}: ExportImportProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const exportData = () => {
    const appData: AppData = {
      notes,
      todos,
      focusedTasks
    };

    const dataStr = JSON.stringify(appData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `noteflow-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData: AppData = JSON.parse(e.target?.result as string);
        
        if (importedData.notes) setNotes(importedData.notes);
        if (importedData.todos) setTodos(importedData.todos);
        if (importedData.focusedTasks) setFocusedTasks(importedData.focusedTasks);
        
        alert('Data imported successfully!');
      } catch (error) {
        alert('Error importing data. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      setNotes([]);
      setTodos([]);
      setFocusedTasks([]);
      localStorage.clear();
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Export & Import</h2>
        <p className="text-gray-600 mb-6">
          Backup your notes and tasks or restore from a previous backup.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3 mb-4">
              <Download size={24} style={{ color: '#10B981' }} />
              <h3 className="text-lg font-medium">Export Data</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Download all your notes and tasks as a JSON file.
            </p>
            <button
              onClick={exportData}
              className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center space-x-2"
            >
              <Download size={18} />
              <span>Export Backup</span>
            </button>
          </div>

          <div className="p-6 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3 mb-4">
              <Upload size={24} style={{ color: '#3B82F6' }} />
              <h3 className="text-lg font-medium">Import Data</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Restore your notes and tasks from a backup file.
            </p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={importData}
              accept=".json"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center space-x-2"
            >
              <Upload size={18} />
              <span>Import Backup</span>
            </button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Data Management</h2>
        
        <div className="p-6 border border-red-200 rounded-lg bg-red-50">
          <div className="flex items-center space-x-3 mb-4">
            <FileText size={24} style={{ color: '#EF4444' }} />
            <h3 className="text-lg font-medium text-red-800">Clear All Data</h3>
          </div>
          <p className="text-red-700 mb-4">
            This will permanently delete all your notes, tasks, and settings. 
            Make sure to export your data first!
          </p>
          <button
            onClick={clearAllData}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
          >
            Clear All Data
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{notes.length}</div>
            <div className="text-sm text-blue-800">Total Notes</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{todos.length}</div>
            <div className="text-sm text-green-800">Total Tasks</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">
              {todos.filter(t => t.completed).length}
            </div>
            <div className="text-sm text-purple-800">Completed</div>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg text-center">
            <div className="text-2xl font-bold text-yellow-600">{focusedTasks.length}</div>
            <div className="text-sm text-yellow-800">Focused Tasks</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportImport;
