
import React, { useState, useEffect } from 'react';
import { StickyNote, CheckSquare, Settings, Search, Download, Upload, Star } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import NotesModule from '../components/NotesModule';
import TodoModule from '../components/TodoModule';
import LockerModule from '../components/LockerModule';
import LinksModule from '../components/LinksModule';
import TodaysFocus from '../components/TodaysFocus';
import SearchBar from '../components/SearchBar';
import ExportImport from '../components/ExportImport';
import DarkModeToggle from '../components/DarkModeToggle';
import { Note, Todo, StoredFile, StoredLink } from '../types';

const Index = () => {
  const [activeModule, setActiveModule] = useState<'notes' | 'todos' | 'locker' | 'links' | 'settings'>('notes');
  const [notes, setNotes] = useState<Note[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [links, setLinks] = useState<StoredLink[]>([]);
  const [focusedTasks, setFocusedTasks] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('notepad-notes');
    const savedTodos = localStorage.getItem('notepad-todos');
    const savedFiles = localStorage.getItem('notepad-files');
    const savedLinks = localStorage.getItem('notepad-links');
    const savedFocus = localStorage.getItem('notepad-focus');
    const savedDarkMode = localStorage.getItem('notepad-darkmode');

    if (savedNotes) setNotes(JSON.parse(savedNotes));
    if (savedTodos) setTodos(JSON.parse(savedTodos));
    if (savedFiles) setFiles(JSON.parse(savedFiles));
    if (savedLinks) setLinks(JSON.parse(savedLinks));
    if (savedFocus) setFocusedTasks(JSON.parse(savedFocus));
    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('notepad-notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('notepad-todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('notepad-files', JSON.stringify(files));
  }, [files]);

  useEffect(() => {
    localStorage.setItem('notepad-links', JSON.stringify(links));
  }, [links]);

  useEffect(() => {
    localStorage.setItem('notepad-focus', JSON.stringify(focusedTasks));
  }, [focusedTasks]);

  useEffect(() => {
    localStorage.setItem('notepad-darkmode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLinks = links.filter(link =>
    link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderMainContent = () => {
    switch (activeModule) {
      case 'notes':
        return (
          <div className="flex-1 flex">
            <div className="flex-1">
              <NotesModule 
                notes={filteredNotes} 
                setNotes={setNotes} 
                searchQuery={searchQuery}
              />
            </div>
            <div className="w-80 border-l border-gray-200 dark:border-gray-700 p-6">
              <TodaysFocus 
                todos={todos}
                focusedTasks={focusedTasks}
                setFocusedTasks={setFocusedTasks}
              />
            </div>
          </div>
        );
      case 'todos':
        return (
          <TodoModule 
            todos={filteredTodos} 
            setTodos={setTodos}
            searchQuery={searchQuery}
            focusedTasks={focusedTasks}
            setFocusedTasks={setFocusedTasks}
          />
        );
      case 'locker':
        return (
          <LockerModule 
            files={filteredFiles}
            setFiles={setFiles}
          />
        );
      case 'links':
        return (
          <LinksModule 
            links={filteredLinks}
            setLinks={setLinks}
          />
        );
      case 'settings':
        return (
          <div className="flex-1 p-8">
            <h1 className="text-2xl font-bold mb-8">Settings</h1>
            <ExportImport 
              notes={notes}
              todos={todos}
              focusedTasks={focusedTasks}
              setNotes={setNotes}
              setTodos={setTodos}
              setFocusedTasks={setFocusedTasks}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black flex transition-colors duration-300">
      <Sidebar 
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black sticky top-0 z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors duration-300"
              >
                <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                  <div className="h-0.5 bg-black dark:bg-white"></div>
                  <div className="h-0.5 bg-black dark:bg-white"></div>
                  <div className="h-0.5 bg-black dark:bg-white"></div>
                </div>
              </button>
              <h1 className="text-xl font-bold text-black dark:text-white">NoteFlow</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>
          </div>
        </div>

        {/* Main Content */}
        {renderMainContent()}
      </div>
    </div>
  );
};

export default Index;
