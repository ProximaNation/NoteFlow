
import React from 'react';
import { ExternalLink, Heart, Users, MessageCircle } from 'lucide-react';

const SocialLinks = () => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-800 dark:to-pink-800 rounded-xl p-6 text-white">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-white/20 rounded-lg">
          <Heart size={24} className="text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold">Stay Connected</h3>
          <p className="text-white/80 text-sm">Join our community across platforms</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href="https://www.instagram.com/itx_decim/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 hover:scale-105 group"
        >
          <div className="p-2 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">Instagram</p>
            <p className="text-white/70 text-xs">@itx_decim</p>
          </div>
          <ExternalLink size={16} className="text-white/60 group-hover:text-white transition-colors" />
        </a>

        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 hover:scale-105 group"
        >
          <div className="p-2 bg-red-600 rounded-lg">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">YouTube</p>
            <p className="text-white/70 text-xs">Subscribe to our channel</p>
          </div>
          <ExternalLink size={16} className="text-white/60 group-hover:text-white transition-colors" />
        </a>
      </div>

      <div className="mt-4 p-3 bg-white/10 rounded-lg">
        <div className="flex items-center space-x-2 text-sm">
          <Users size={16} />
          <span>Join thousands of users worldwide</span>
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;
