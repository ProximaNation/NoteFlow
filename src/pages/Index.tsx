
import React, { useState, useEffect } from 'react';
import { StickyNote, CheckSquare, Settings, Search, Download, Upload, Star } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import NotesModule from '../components/NotesModule';
import TodoModule from '../components/TodoModule';
import TodaysFocus from '../components/TodaysFocus';
import SearchBar from '../components/SearchBar';
import ExportImport from '../components/ExportImport';
import { Note, Todo } from '../types';

const Index = () => {
  const [activeModule, setActiveModule] = useState<'notes' | 'todos' | 'settings'>('notes');
  const [notes, setNotes] = useState<Note[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [focusedTasks, setFocusedTasks] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('notepad-notes');
    const savedTodos = localStorage.getItem('notepad-todos');
    const savedFocus = localStorage.getItem('notepad-focus');

    if (savedNotes) setNotes(JSON.parse(savedNotes));
    if (savedTodos) setTodos(JSON.parse(savedTodos));
    if (savedFocus) setFocusedTasks(JSON.parse(savedFocus));
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('notepad-notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('notepad-todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('notepad-focus', JSON.stringify(focusedTasks));
  }, [focusedTasks]);

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
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
            <div className="w-80 border-l border-gray-200 p-6">
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
    <div className="min-h-screen bg-white flex">
      <Sidebar 
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
              >
                <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                  <div className="h-0.5 bg-black"></div>
                  <div className="h-0.5 bg-black"></div>
                  <div className="h-0.5 bg-black"></div>
                </div>
              </button>
              <h1 className="text-xl font-bold">NoteFlow</h1>
            </div>
            
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
        </div>

        {/* Main Content */}
        {renderMainContent()}
      </div>
    </div>
  );
};

export default Index;
