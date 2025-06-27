import React, { useEffect, useRef, useState } from 'react';

const InteractiveCat = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isSwatting, setIsSwatting] = useState(false);
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const cursorRef = useRef<HTMLImageElement>(null);
  const leftPupilRef = useRef<HTMLDivElement>(null);
  const rightPupilRef = useRef<HTMLDivElement>(null);
  const pawRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Update cursor position
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }

      // Update pupils to follow cursor
      updatePupils(e.clientX, e.clientY);
    };

    const updatePupils = (mouseX: number, mouseY: number) => {
      const leftEye = leftPupilRef.current?.parentElement;
      const rightEye = rightPupilRef.current?.parentElement;
      
      if (leftEye && leftPupilRef.current) {
        const leftRect = leftEye.getBoundingClientRect();
        const leftCenterX = leftRect.left + leftRect.width / 2;
        const leftCenterY = leftRect.top + leftRect.height / 2;
        
        const leftAngle = Math.atan2(mouseY - leftCenterY, mouseX - leftCenterX);
        const leftDistance = Math.min(8, Math.sqrt(Math.pow(mouseX - leftCenterX, 2) + Math.pow(mouseY - leftCenterY, 2)) / 20);
        
        const leftX = Math.cos(leftAngle) * leftDistance;
        const leftY = Math.sin(leftAngle) * leftDistance;
        
        leftPupilRef.current.style.transform = `translate(${leftX}px, ${leftY}px)`;
      }
      
      if (rightEye && rightPupilRef.current) {
        const rightRect = rightEye.getBoundingClientRect();
        const rightCenterX = rightRect.left + rightRect.width / 2;
        const rightCenterY = rightRect.top + rightRect.height / 2;
        
        const rightAngle = Math.atan2(mouseY - rightCenterY, mouseX - rightCenterX);
        const rightDistance = Math.min(8, Math.sqrt(Math.pow(mouseX - rightCenterX, 2) + Math.pow(mouseY - rightCenterY, 2)) / 20);
        
        const rightX = Math.cos(rightAngle) * rightDistance;
        const rightY = Math.sin(rightAngle) * rightDistance;
        
        rightPupilRef.current.style.transform = `translate(${rightX}px, ${rightY}px)`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleButtonHover = () => {
    setIsHoveringButton(true);
    setIsSwatting(true);
  };

  const handleButtonLeave = () => {
    setIsHoveringButton(false);
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
        
        @keyframes tailWag {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(10deg); }
        }
        
        @keyframes blink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
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
        
        .tail-wag {
          animation: tailWag 2s ease-in-out infinite;
        }
        
        .blink {
          animation: blink 3s ease-in-out infinite;
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
        className={`fixed w-6 h-6 pointer-events-none z-50 transition-all duration-100 ${isHoveringButton ? 'swatted' : ''}`}
        style={{ transform: 'translate(-2px, -2px)' }}
      />

      {/* Text prompts */}
      <div id="text" className="text-center mb-8" style={{ fontFamily: 'Luckiest Guy, cursive' }}>
        <p className="text-2xl text-purple-600 mb-2">Move your mouse around!</p>
        <p className="text-lg text-purple-500">Watch the kitty's eyes follow you 👀</p>
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
            <ellipse cx="100" cy="130" rx="60" ry="50" fill="#ff9999" stroke="#ff6666" strokeWidth="2" className={isSwatting ? '' : 'blink'} />
            
            {/* Cat head */}
            <circle cx="100" cy="80" r="50" fill="#ff9999" stroke="#ff6666" strokeWidth="2" />
            
            {/* Cat ears */}
            <polygon points="70,40 85,70 55,70" fill="#ff9999" stroke="#ff6666" strokeWidth="2" />
            <polygon points="130,40 145,70 115,70" fill="#ff9999" stroke="#ff6666" strokeWidth="2" />
            
            {/* Inner ears */}
            <polygon points="73,50 80,65 66,65" fill="#ffcccc" />
            <polygon points="127,50 134,65 120,65" fill="#ffcccc" />
            
            {/* Left eye */}
            <circle cx="85" cy="75" r="12" fill="white" stroke="#333" strokeWidth="1" className="blink" />
            <div
              ref={leftPupilRef}
              id="Left-eye-pupil"
              className="absolute w-6 h-6 bg-black rounded-full transition-transform duration-100"
              style={{ left: '79px', top: '69px' }}
            />
            
            {/* Right eye */}
            <circle cx="115" cy="75" r="12" fill="white" stroke="#333" strokeWidth="1" className="blink" />
            <div
              ref={rightPupilRef}
              id="Right-eye-pupil"
              className="absolute w-6 h-6 bg-black rounded-full transition-transform duration-100"
              style={{ left: '109px', top: '69px' }}
            />
            
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
            
            {/* Tail */}
            <g
              id="Tail"
              className={`origin-bottom transition-transform ${isSwatting ? '' : 'tail-wag'}`}
              style={{ transformOrigin: '50px 140px' }}
            >
              <path d="M50,140 Q30,120 25,100 Q20,80 30,60" stroke="#ff6666" strokeWidth="12" fill="none" strokeLinecap="round" />
            </g>
          </svg>
        </div>
      </main>
    </>
  );
};

export default InteractiveCat;
