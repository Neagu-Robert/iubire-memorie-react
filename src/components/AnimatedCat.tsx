
import React from 'react';
import { Cat } from 'lucide-react';

const AnimatedCat = () => {
  return (
    <div className="flex justify-center items-center mb-8">
      <div className="relative">
        <div className="animate-bounce">
          <Cat 
            size={64} 
            className="text-purple-300 hover:text-pink-300 transition-colors duration-300" 
          />
        </div>
        {/* Cute animated hearts around the cat */}
        <div className="absolute -top-2 -right-2 text-pink-400 animate-pulse">
          💖
        </div>
        <div className="absolute -bottom-1 -left-3 text-red-400 animate-pulse delay-500">
          ❤️
        </div>
      </div>
    </div>
  );
};

export default AnimatedCat;
