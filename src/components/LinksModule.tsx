
import React, { useState } from 'react';
import { Plus, Trash2, ExternalLink, Link as LinkIcon, Globe } from 'lucide-react';
import { StoredLink } from '../types';

interface LinksModuleProps {
  links: StoredLink[];
  setLinks: (links: StoredLink[]) => void;
}

const LinksModule = ({ links, setLinks }: LinksModuleProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLink, setNewLink] = useState({ title: '', url: '', description: '' });

  const addLink = async () => {
    if (!newLink.url.trim() || !newLink.title.trim()) return;

    let finalUrl = newLink.url.trim();
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl;
    }

    try {
      const domain = new URL(finalUrl).hostname;
      const favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

      const link: StoredLink = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        title: newLink.title,
        url: finalUrl,
        favicon,
        description: newLink.description,
        createdAt: new Date(),
      };

      setLinks([link, ...links]);
      setNewLink({ title: '', url: '', description: '' });
      setShowAddForm(false);
    } catch (error) {
      alert('Please enter a valid URL');
    }
  };

  const deleteLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const getDomainFromUrl = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  return (
    <div className="flex-1 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Saved Links</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors duration-300"
          >
            <Plus size={20} />
            <span>Add Link</span>
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Add New Link</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Link Title"
                value={newLink.title}
                onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <input
                type="url"
                placeholder="https://example.com"
                value={newLink.url}
                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <input
                type="text"
                placeholder="Description (optional)"
                value={newLink.description}
                onChange={(e) => setNewLink({ ...newLink, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <div className="flex space-x-3">
                <button
                  onClick={addLink}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                >
                  Save Link
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {links.length === 0 ? (
          <div className="text-center py-16">
            <Globe size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No links saved yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Save your important links with beautiful visual previews</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 mx-auto transition-colors duration-300"
            >
              <Plus size={20} />
              <span>Add Your First Link</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {links.map((link) => (
              <div key={link.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {link.favicon ? (
                      <img
                        src={link.favicon}
                        alt=""
                        className="w-8 h-8 rounded"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <LinkIcon size={32} className="text-yellow-600 hidden" />
                  </div>
                  <button
                    onClick={() => deleteLink(link.id)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-300"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                  {link.title}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {getDomainFromUrl(link.url)}
                </p>
                
                {link.description && (
                  <p className="text-sm text-gray-500 dark:text-gray-500 mb-4 line-clamp-2">
                    {link.description}
                  </p>
                )}
                
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
                  {new Date(link.createdAt).toLocaleDateString()}
                </p>
                
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm transition-colors duration-300"
                >
                  <ExternalLink size={16} />
                  <span>Visit Link</span>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LinksModule;
