
import React, { useEffect, useRef, useState } from 'react';

const InteractiveCat = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isSwatting, setIsSwatting] = useState(false);
  const cursorRef = useRef<HTMLImageElement>(null);
  const pawRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Update cursor position
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }

      // Check if cursor is close to the paw area and trigger swatting
      checkPawProximity(e.clientX, e.clientY);
    };

    const checkPawProximity = (mouseX: number, mouseY: number) => {
      if (pawRef.current) {
        const pawRect = pawRef.current.getBoundingClientRect();
        const pawCenterX = pawRect.left + pawRect.width / 2;
        const pawCenterY = pawRect.top + pawRect.height / 2;
        
        // Calculate distance from cursor to paw center
        const distance = Math.sqrt(
          Math.pow(mouseX - pawCenterX, 2) + Math.pow(mouseY - pawCenterY, 2)
        );
        
        // If cursor is within 100px of the paw, start swatting
        if (distance < 100) {
          setIsSwatting(true);
        } else {
          setIsSwatting(false);
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleButtonHover = () => {
    setIsSwatting(true);
  };

  const handleButtonLeave = () => {
    setIsSwatting(false);
  };

  return (
    <>
      {/* Global cursor hide and font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap');
        * {
          cursor: none !important;
        }
        
        @keyframes swat {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(-20deg) scale(1.1); }
          100% { transform: rotate(0deg) scale(1); }
        }
        
        @keyframes swatted {
          0% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.2) rotate(5deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        
        .swat {
          animation: swat 0.3s ease-out;
        }
        
        .swatted {
          animation: swatted 0.3s ease-out;
        }
      `}</style>

      {/* Full page tracker */}
      <div id="tracker" className="fixed inset-0 z-10 pointer-events-none" />

      {/* Custom cursor */}
      <img
        ref={cursorRef}
        id="cursor"
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMgM0wyMSAyMUwxMyAxN0w5IDEzTDMgM1oiIGZpbGw9ImJsYWNrIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+"
        alt="cursor"
        className={`fixed w-6 h-6 pointer-events-none z-50 transition-all duration-100 ${isSwatting ? 'swatted' : ''}`}
        style={{ transform: 'translate(-2px, -2px)' }}
      />

      {/* Text prompts */}
      <div id="text" className="text-center mb-8" style={{ fontFamily: 'Luckiest Guy, cursive' }}>
        <p className="text-2xl text-purple-600 mb-2">Move your mouse around!</p>
        <p className="text-lg text-purple-500">Watch the kitty try to catch your cursor 🐾</p>
      </div>

      {/* Main cat section */}
      <main className="flex flex-col items-center justify-center" style={{ backgroundColor: '#feeeed', borderRadius: '20px', padding: '40px' }}>
        {/* Stop playing button */}
        <button
          id="target"
          className="mb-8 px-6 py-3 bg-purple-500 text-white rounded-full text-lg font-semibold hover:bg-purple-600 transition-colors pointer-events-auto"
          style={{ fontFamily: 'Luckiest Guy, cursive' }}
          onMouseEnter={handleButtonHover}
          onMouseLeave={handleButtonLeave}
        >
          Stop playing
        </button>

        {/* Cat SVG */}
        <div className="relative">
          <svg width="200" height="200" viewBox="0 0 200 200" className="relative">
            {/* Cat body */}
            <ellipse cx="100" cy="130" rx="60" ry="50" fill="#ff9999" stroke="#ff6666" strokeWidth="2" />
            
            {/* Cat head */}
            <circle cx="100" cy="80" r="50" fill="#ff9999" stroke="#ff6666" strokeWidth="2" />
            
            {/* Cat ears */}
            <polygon points="70,40 85,70 55,70" fill="#ff9999" stroke="#ff6666" strokeWidth="2" />
            <polygon points="130,40 145,70 115,70" fill="#ff9999" stroke="#ff6666" strokeWidth="2" />
            
            {/* Inner ears */}
            <polygon points="73,50 80,65 66,65" fill="#ffcccc" />
            <polygon points="127,50 134,65 120,65" fill="#ffcccc" />
            
            {/* Left eye */}
            <circle cx="85" cy="75" r="12" fill="white" stroke="#333" strokeWidth="1" />
            <circle cx="85" cy="75" r="6" fill="black" />
            
            {/* Right eye */}
            <circle cx="115" cy="75" r="12" fill="white" stroke="#333" strokeWidth="1" />
            <circle cx="115" cy="75" r="6" fill="black" />
            
            {/* Nose */}
            <polygon points="100,85 95,95 105,95" fill="#ff6666" />
            
            {/* Mouth */}
            <path d="M100,95 Q95,105 85,100" stroke="#333" strokeWidth="2" fill="none" />
            <path d="M100,95 Q105,105 115,100" stroke="#333" strokeWidth="2" fill="none" />
            
            {/* Whiskers */}
            <line x1="60" y1="80" x2="80" y2="85" stroke="#333" strokeWidth="2" />
            <line x1="60" y1="90" x2="80" y2="90" stroke="#333" strokeWidth="2" />
            <line x1="120" y1="85" x2="140" y2="80" stroke="#333" strokeWidth="2" />
            <line x1="120" y1="90" x2="140" y2="90" stroke="#333" strokeWidth="2" />
            
            {/* Paw for swatting */}
            <g
              ref={pawRef}
              id="Paw"
              className={`origin-center transition-transform duration-300 ${isSwatting ? 'swat' : ''}`}
              style={{ transformOrigin: '160px 120px' }}
            >
              <ellipse cx="160" cy="120" rx="15" ry="25" fill="#ff9999" stroke="#ff6666" strokeWidth="2" />
              <circle cx="155" cy="110" r="4" fill="#ff6666" />
              <circle cx="165" cy="110" r="4" fill="#ff6666" />
              <circle cx="160" cy="105" r="4" fill="#ff6666" />
            </g>
            
            {/* Tail - static */}
            <g id="Tail">
              <path d="M50,140 Q30,120 25,100 Q20,80 30,60" stroke="#ff6666" strokeWidth="12" fill="none" strokeLinecap="round" />
            </g>
          </svg>
        </div>
      </main>
    </>
  );
};

export default InteractiveCat;
