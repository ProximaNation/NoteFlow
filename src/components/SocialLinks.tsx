
import React from 'react';
import { Youtube, Instagram, ExternalLink, Sparkles } from 'lucide-react';

const SocialLinks = () => {
  return (
    <div className="bg-gradient-to-br from-pink-500 to-purple-600 dark:from-pink-600 dark:to-purple-700 p-6 rounded-xl text-white">
      <div className="text-center mb-4">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Sparkles size={24} className="text-yellow-300" />
          <h3 className="text-lg font-bold">Join Our Community</h3>
          <Sparkles size={24} className="text-yellow-300" />
        </div>
        <p className="text-sm opacity-90">Follow us for productivity tips, updates & exclusive content!</p>
      </div>
      
      <div className="space-y-3">
        <a
          href="https://www.youtube.com/channel/UCi84fOMGApCB8xzbugtFElw?sub_confirmation=1"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-3 w-full px-4 py-3 bg-red-500 hover:bg-red-600 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <Youtube size={20} />
          <span className="font-medium">Subscribe on YouTube</span>
          <ExternalLink size={16} />
        </a>
        
        <a
          href="https://www.instagram.com/itx_decim/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-3 w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <Instagram size={20} />
          <span className="font-medium">Follow on Instagram</span>
          <ExternalLink size={16} />
        </a>
      </div>
      
      <div className="mt-4 text-center">
        <div className="flex items-center justify-center space-x-4 text-xs opacity-75">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>10K+ Subscribers</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span>5K+ Followers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;
