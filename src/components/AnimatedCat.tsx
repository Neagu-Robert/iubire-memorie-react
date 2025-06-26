
import React, { useEffect, useState } from 'react';
import { Cat } from 'lucide-react';

const AnimatedCat = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [catPosition, setCatPosition] = useState({ x: 0, y: 0 });
  const [isNearCursor, setIsNearCursor] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Set cat position to center of screen
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setCatPosition({ x: centerX, y: centerY });

    const handleResize = () => {
      const newCenterX = window.innerWidth / 2;
      const newCenterY = window.innerHeight / 2;
      setCatPosition({ x: newCenterX, y: newCenterY });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Check if cursor is near the cat (within 100px)
    const dx = mousePosition.x - catPosition.x;
    const dy = mousePosition.y - catPosition.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    setIsNearCursor(distance < 100);
  }, [mousePosition, catPosition]);

  // Calculate eye rotation based on mouse position
  const getEyeRotation = () => {
    const dx = mousePosition.x - catPosition.x;
    const dy = mousePosition.y - catPosition.y;
    const angle = Math.atan2(dy, dx);
    return angle * (180 / Math.PI);
  };

  // Calculate paw position when trying to catch cursor
  const getPawPosition = () => {
    if (!isNearCursor) return { x: 0, y: 0 };
    
    const dx = mousePosition.x - catPosition.x;
    const dy = mousePosition.y - catPosition.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Normalize and scale the direction
    const scale = Math.min(distance / 2, 30);
    return {
      x: (dx / distance) * scale,
      y: (dy / distance) * scale
    };
  };

  const eyeRotation = getEyeRotation();
  const pawPosition = getPawPosition();

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
          {/* Main cat body */}
          <Cat 
            size={80} 
            className="text-purple-400 hover:text-pink-400 transition-colors duration-300" 
          />
          
          {/* Eyes that follow the cursor */}
          <div 
            className="absolute top-4 left-6 w-2 h-2 bg-yellow-400 rounded-full transition-transform duration-150"
            style={{
              transform: `rotate(${eyeRotation}deg) translateX(2px)`
            }}
          />
          <div 
            className="absolute top-4 right-6 w-2 h-2 bg-yellow-400 rounded-full transition-transform duration-150"
            style={{
              transform: `rotate(${eyeRotation}deg) translateX(2px)`
            }}
          />
          
          {/* Paw that appears when cursor is near */}
          {isNearCursor && (
            <div 
              className="absolute w-4 h-4 bg-purple-300 rounded-full transition-all duration-200 animate-pulse"
              style={{
                left: `${20 + pawPosition.x}px`,
                top: `${20 + pawPosition.y}px`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          )}
          
          {/* Cute animated hearts around the cat */}
          <div className="absolute -top-3 -right-3 text-pink-400 animate-pulse text-lg">
            💖
          </div>
          <div className="absolute -bottom-2 -left-4 text-red-400 animate-pulse delay-500 text-lg">
            ❤️
          </div>
        </div>
      </div>
      
      {/* Static content */}
      <div className="text-center text-gray-400 opacity-50">
        <p className="text-sm">🐱 Move your mouse near the cat and watch its eyes follow you!</p>
      </div>
    </div>
  );
};

export default AnimatedCat;
