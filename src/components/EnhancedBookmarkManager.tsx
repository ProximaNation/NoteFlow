
import React, { useState, useEffect } from 'react';
import { Link, Star, StarOff, Plus, Search, Cloud, FolderOpen, ExternalLink, Trash2 } from 'lucide-react';
import { StoredLink } from '../types';

interface EnhancedBookmarkManagerProps {
  links: StoredLink[];
  setLinks: (links: StoredLink[]) => void;
}

const EnhancedBookmarkManager = ({ links, setLinks }: EnhancedBookmarkManagerProps) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'bookmarked'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [newLinkTitle, setNewLinkTitle] = useState('');
  const [isGoogleDriveConnected, setIsGoogleDriveConnected] = useState(false);

  const categories = [
    { id: 'all', label: 'All Links', icon: Link, count: links.length },
    { id: 'bookmarked', label: 'Bookmarked', icon: Star, count: links.filter(link => link.bookmarked).length }
  ];

  const filteredLinks = links.filter(link => {
    const matchesCategory = activeCategory === 'all' || (activeCategory === 'bookmarked' && link.bookmarked);
    const matchesSearch = !searchQuery || 
      link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.url.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addLink = () => {
    if (!newLinkUrl.trim() || !newLinkTitle.trim()) return;
    
    const newLink: StoredLink = {
      id: Date.now().toString(),
      url: newLinkUrl,
      title: newLinkTitle,
      description: '',
      favicon: '',
      bookmarked: false,
      createdAt: new Date().toISOString()
    };
    
    setLinks([...links, newLink]);
    setNewLinkUrl('');
    setNewLinkTitle('');
  };

  const toggleBookmark = (linkId: string) => {
    setLinks(links.map(link => 
      link.id === linkId ? { ...link, bookmarked: !link.bookmarked } : link
    ));
  };

  const deleteLink = (linkId: string) => {
    setLinks(links.filter(link => link.id !== linkId));
  };

  const connectGoogleDrive = () => {
    // Placeholder for Google Drive integration
    console.log('Connecting to Google Drive...');
    setIsGoogleDriveConnected(true);
    // In a real implementation, this would use Google Drive API
  };

  return (
    <div className="flex-1 p-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Bookmark Manager</h1>
            <p className="text-muted-foreground">Organize and access your favorite links</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={connectGoogleDrive}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isGoogleDriveConnected 
                  ? 'bg-green-500 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              <Cloud size={16} />
              <span>{isGoogleDriveConnected ? 'Drive Connected' : 'Connect Google Drive'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Categories */}
          <div className="lg:col-span-1">
            <div className="creative-card p-6">
              <h2 className="font-semibold mb-4 text-card-foreground flex items-center space-x-2">
                <FolderOpen size={18} className="text-blue-500" />
                <span>Categories</span>
              </h2>
              
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id as any)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                      activeCategory === category.id 
                        ? 'bg-primary text-primary-foreground shadow-md' 
                        : 'hover:bg-accent text-card-foreground'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <category.icon size={16} />
                      <span className="font-medium">{category.label}</span>
                    </div>
                    <span className="text-xs bg-muted px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Google Drive Integration Status */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                <div className="flex items-center space-x-2 mb-2">
                  <Cloud size={16} className="text-blue-500" />
                  <span className="text-sm font-medium text-card-foreground">Cloud Storage</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {isGoogleDriveConnected 
                    ? 'Your bookmarks are synced with Google Drive' 
                    : 'Connect Google Drive to sync your bookmarks'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Add New Link */}
            <div className="creative-card p-6 mb-6">
              <div className="flex flex-col space-y-4">
                <div className="relative">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search bookmarks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="creative-input w-full pl-10 pr-4 py-3 text-card-foreground"
                  />
                </div>
                
                <div className="flex space-x-3">
                  <input
                    type="text"
                    placeholder="Link title..."
                    value={newLinkTitle}
                    onChange={(e) => setNewLinkTitle(e.target.value)}
                    className="creative-input flex-1 px-4 py-2 text-card-foreground"
                  />
                  <input
                    type="url"
                    placeholder="https://example.com"
                    value={newLinkUrl}
                    onChange={(e) => setNewLinkUrl(e.target.value)}
                    className="creative-input flex-1 px-4 py-2 text-card-foreground"
                  />
                  <button
                    onClick={addLink}
                    className="creative-button flex items-center space-x-2"
                  >
                    <Plus size={16} />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredLinks.map((link) => (
                <div
                  key={link.id}
                  className="floating-card creative-card p-4 group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-card-foreground truncate mb-1">
                        {link.title}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate mb-2">
                        {link.url}
                      </p>
                      {link.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {link.description}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-2">
                      <button
                        onClick={() => toggleBookmark(link.id)}
                        className="p-1 hover:bg-accent rounded transition-colors duration-200"
                      >
                        {link.bookmarked ? (
                          <Star size={16} className="text-yellow-500 fill-current" />
                        ) : (
                          <StarOff size={16} className="text-muted-foreground" />
                        )}
                      </button>
                      
                      <button
                        onClick={() => window.open(link.url, '_blank')}
                        className="p-1 hover:bg-accent rounded transition-colors duration-200"
                      >
                        <ExternalLink size={16} className="text-blue-500" />
                      </button>
                      
                      <button
                        onClick={() => deleteLink(link.id)}
                        className="p-1 hover:bg-accent rounded transition-colors duration-200 opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredLinks.length === 0 && (
              <div className="creative-card p-12 text-center">
                <Link size={48} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium text-card-foreground mb-2">
                  No bookmarks found
                </h3>
                <p className="text-muted-foreground">
                  {searchQuery 
                    ? `No bookmarks match "${searchQuery}"`
                    : 'Start by adding your first bookmark above'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedBookmarkManager;
