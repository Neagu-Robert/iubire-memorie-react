
import React, { useEffect, useState, useRef } from 'react';
import { Cat } from 'lucide-react';

const AnimatedCat = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [catPosition, setCatPosition] = useState({ x: 0, y: 0 });
  const [catRotation, setCatRotation] = useState(0);
  const [isChasing, setIsChasing] = useState(false);
  const [isIdle, setIsIdle] = useState(true);
  const animationRef = useRef<number>();
  const lastMoveTime = useRef<number>(Date.now());

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsIdle(false);
      lastMoveTime.current = Date.now();
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Initialize cat position at bottom center
    const initialX = window.innerWidth / 2;
    const initialY = window.innerHeight - 100;
    setCatPosition({ x: initialX, y: initialY });

    const handleResize = () => {
      const newX = window.innerWidth / 2;
      const newY = window.innerHeight - 100;
      setCatPosition({ x: newX, y: newY });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Check if mouse has been idle for 2 seconds
    const checkIdle = () => {
      if (Date.now() - lastMoveTime.current > 2000) {
        setIsIdle(true);
        setIsChasing(false);
      }
    };

    const idleInterval = setInterval(checkIdle, 100);
    return () => clearInterval(idleInterval);
  }, []);

  useEffect(() => {
    const animateCat = () => {
      setCatPosition(prev => {
        const dx = mousePosition.x - prev.x;
        const dy = mousePosition.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 20 && !isIdle) {
          setIsChasing(true);
          
          // Calculate rotation based on movement direction
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          setCatRotation(angle);
          
          // Smooth following with elastic effect
          const speed = Math.min(distance * 0.02, 8);
          const newX = prev.x + (dx / distance) * speed;
          const newY = prev.y + (dy / distance) * speed;
          
          return { x: newX, y: newY };
        } else {
          setIsChasing(false);
          return prev;
        }
      });
    };

    animationRef.current = requestAnimationFrame(function animate() {
      animateCat();
      animationRef.current = requestAnimationFrame(animate);
    });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition, isIdle]);

  return (
    <>
      {/* Cat that follows cursor */}
      <div 
        className="fixed pointer-events-none z-50 transition-transform duration-100"
        style={{
          left: `${catPosition.x}px`,
          top: `${catPosition.y}px`,
          transform: `translate(-50%, -50%) rotate(${catRotation}deg)`,
        }}
      >
        <div className="relative">
          {/* Cat body with bounce effect when chasing */}
          <Cat 
            size={48} 
            className={`text-purple-500 transition-all duration-200 ${
              isChasing ? 'animate-bounce' : ''
            } ${isIdle ? 'text-purple-400' : 'text-pink-500'}`}
          />
          
          {/* Animated tail */}
          <div 
            className={`absolute -right-2 top-2 w-6 h-1 bg-purple-400 rounded-full origin-left transition-all duration-300 ${
              isChasing ? 'animate-pulse scale-110' : isIdle ? 'animate-pulse' : ''
            }`}
            style={{
              transform: `rotate(${isChasing ? '20deg' : isIdle ? '10deg' : '0deg'})`
            }}
          />
          
          {/* Eyes that show excitement */}
          <div className="absolute top-2 left-2 w-1 h-1 bg-yellow-400 rounded-full animate-pulse" />
          <div className="absolute top-2 right-2 w-1 h-1 bg-yellow-400 rounded-full animate-pulse" />
          
          {/* Paws that show when running */}
          {isChasing && (
            <>
              <div className="absolute -bottom-1 left-1 w-2 h-2 bg-purple-300 rounded-full animate-bounce" />
              <div className="absolute -bottom-1 right-1 w-2 h-2 bg-purple-300 rounded-full animate-bounce delay-100" />
            </>
          )}
          
          {/* Hearts when idle */}
          {isIdle && (
            <>
              <div className="absolute -top-2 -right-2 text-pink-400 animate-pulse text-sm">
                💕
              </div>
              <div className="absolute -bottom-1 -left-3 text-red-400 animate-pulse delay-500 text-xs">
                ❤️
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Instructions */}
      <div className="text-center text-gray-400 opacity-50 mb-8">
        <p className="text-sm">🐱 Move your mouse and watch the kitten chase you around!</p>
      </div>
    </>
  );
};

export default AnimatedCat;
