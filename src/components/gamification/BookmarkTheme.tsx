import React from 'react';
import { Bookmark, Book, Library, Scroll, BookOpen, Archive, Folder, Tag } from 'lucide-react';

interface BookmarkThemeProps {
  children: React.ReactNode;
  title: string;
  icon?: React.ComponentType<any>;
  color?: string;
}

const BookmarkTheme = ({ children, title, icon: Icon = Bookmark, color = '#F59E0B' }: BookmarkThemeProps) => {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Bookmark Tab */}
      <div className="relative">
        <div 
          className="absolute top-0 right-4 w-16 h-8 rounded-b-lg flex items-center justify-center shadow-md"
          style={{ backgroundColor: color }}
        >
          <Icon size={16} className="text-white" />
        </div>
        
        {/* Header */}
        <div className="p-4 border-b border-border bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
          <div className="flex items-center space-x-3">
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${color}20` }}
            >
              <Icon size={20} style={{ color }} />
            </div>
            <h2 className="text-lg font-bold text-card-foreground">{title}</h2>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export const BookmarkSection = ({ children, title, icon, color }: BookmarkThemeProps) => (
  <BookmarkTheme title={title} icon={icon} color={color}>
    {children}
  </BookmarkTheme>
);

export const BookmarkCard = ({ 
  children, 
  className = '',
  bookmark = false 
}: { 
  children: React.ReactNode;
  className?: string;
  bookmark?: boolean;
}) => (
  <div className={`relative bg-secondary/50 rounded-lg border border-border p-4 ${className}`}>
    {bookmark && (
      <div className="absolute -top-2 right-4 w-8 h-6 bg-amber-500 rounded-b-sm flex items-center justify-center">
        <Bookmark size={12} className="text-white" />
      </div>
    )}
    {children}
  </div>
);

export const BookmarkIcon = {
  Book,
  Library,
  Scroll,
  BookOpen,
  Archive,
  Folder,
  Tag,
  Bookmark
};

export default BookmarkTheme;