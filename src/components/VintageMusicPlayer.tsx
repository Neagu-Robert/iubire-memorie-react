
import React, { useState } from 'react';
import { Music, Disc } from 'lucide-react';

interface VintageMusicPlayerProps {
  onOpen: () => void;
}

const VintageMusicPlayer: React.FC<VintageMusicPlayerProps> = ({ onOpen }) => {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleClick = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 1000);
    onOpen();
  };

  return (
    <div 
      className="fixed bottom-6 right-6 z-30 cursor-pointer group"
      onClick={handleClick}
    >
      <div className="relative">
        {/* Player base */}
        <div className="w-20 h-20 bg-gradient-to-br from-amber-800 to-amber-900 rounded-full shadow-2xl border-4 border-amber-700 transition-transform duration-300 group-hover:scale-110">
          {/* Vinyl disc */}
          <div className={`absolute inset-2 bg-black rounded-full transition-transform duration-1000 ${isSpinning ? 'animate-spin' : ''} group-hover:animate-spin`}>
            <div className="absolute inset-1 border border-gray-600 rounded-full">
              <div className="absolute inset-2 border border-gray-500 rounded-full">
                <div className="absolute inset-3 bg-red-900 rounded-full flex items-center justify-center">
                  <Music className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Needle */}
          <div className="absolute -top-1 right-2 w-8 h-1 bg-gray-400 rounded-full transform rotate-45 origin-left shadow-lg"></div>
        </div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-amber-400 rounded-full opacity-20 blur-xl animate-pulse"></div>
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black/80 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Music Player
      </div>
    </div>
  );
};

export default VintageMusicPlayer;
