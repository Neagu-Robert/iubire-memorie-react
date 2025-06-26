
import React, { useEffect, useState } from 'react';
import { Cat } from 'lucide-react';

const AnimatedCat = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [catPosition, setCatPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const animateCat = () => {
      setCatPosition(prev => {
        const dx = mousePosition.x - prev.x;
        const dy = mousePosition.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 5) {
          const speed = 0.05;
          return {
            x: prev.x + dx * speed,
            y: prev.y + dy * speed
          };
        }
        return prev;
      });
    };

    const interval = setInterval(animateCat, 16);
    return () => clearInterval(interval);
  }, [mousePosition]);

  return (
    <div className="flex justify-center items-center mb-8 relative min-h-[120px]">
      <div 
        className="fixed pointer-events-none z-10 transition-transform duration-100"
        style={{
          left: `${catPosition.x}px`,
          top: `${catPosition.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="relative">
          <Cat 
            size={32} 
            className="text-purple-400 hover:text-pink-400 transition-colors duration-300" 
          />
          {/* Cute animated hearts around the cat */}
          <div className="absolute -top-1 -right-1 text-pink-400 animate-pulse text-sm">
            💖
          </div>
          <div className="absolute -bottom-0 -left-2 text-red-400 animate-pulse delay-500 text-sm">
            ❤️
          </div>
        </div>
      </div>
      
      {/* Static content for when cat is chasing */}
      <div className="text-center text-gray-400 opacity-50">
        <p className="text-sm">🐱 Move your mouse and watch the magic!</p>
      </div>
    </div>
  );
};

export default AnimatedCat;
